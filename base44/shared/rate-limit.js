/**
 * Durable, server-side rate limiting shared by the app's public backend
 * endpoints.
 *
 * Every backend function has its own URL that anyone on the internet can
 * reach, so the app's public endpoints (contact inquiries, page
 * translation) are guarded here instead of trusting the client. Hits are
 * recorded as RateLimitEvent rows and counted over a rolling window, so a
 * limit holds across requests, users and function instances. Nothing is
 * kept in memory and nothing is enforced client-side.
 *
 * The raw client IP is never stored — it is hashed before it reaches the
 * database. Only the service role reads or writes these rows; the entity's
 * RLS keeps them invisible to app users.
 */

const HASH_SALT = 'tamu-rate-limit';

/**
 * Derive a stable, non-reversible key for the calling client.
 * Prefers the platform-provided client IP headers, falling back to
 * 'unknown' so an absent header still lands under one shared bucket
 * rather than bypassing the limit.
 */
export async function clientKeyFromRequest(req) {
  const headers = req && req.headers;
  let ip = '';
  if (headers) {
    ip =
      (headers.get('cf-connecting-ip') || '').trim() ||
      (headers.get('x-real-ip') || '').trim() ||
      ((headers.get('x-forwarded-for') || '').split(',')[0] || '').trim();
  }
  const value = ip || 'unknown';
  try {
    const bytes = new TextEncoder().encode(`${HASH_SALT}:${value}`);
    const digest = await crypto.subtle.digest('SHA-256', bytes);
    return Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
      .slice(0, 32);
  } catch (_) {
    return 'unknown';
  }
}

/**
 * Record one hit against `key` and report whether it is still within
 * `limit` for the trailing `windowMs`. Returns true when the request may
 * proceed.
 *
 * Fails open on a storage error: a database hiccup must not take the
 * public site down, and the limits stay server-side either way.
 */
export async function allowRequest(base44, { scope, key, limit, windowMs }) {
  const now = Date.now();
  const windowStart = new Date(now - windowMs).toISOString();
  try {
    const recent = await base44.asServiceRole.entities.RateLimitEvent.filter({
      scope,
      limit_key: key,
      created_date: { $gte: windowStart },
    });
    const count = Array.isArray(recent) ? recent.length : 0;
    if (count >= limit) return false;

    await base44.asServiceRole.entities.RateLimitEvent.create({
      scope,
      limit_key: key,
      expires_at: new Date(now + windowMs).toISOString(),
    });

    // Opportunistic cleanup of expired rows, sampled so a delete is not
    // added to every single request. Best effort only.
    if (Math.random() < 0.05) {
      try {
        await base44.asServiceRole.entities.RateLimitEvent.deleteMany({
          scope,
          expires_at: { $lt: new Date(now).toISOString() },
        });
      } catch (_) {
        // Cleanup never blocks the request.
      }
    }

    return true;
  } catch (err) {
    console.warn('[rate-limit] check failed:', err && err.message);
    return true;
  }
}

/**
 * Apply an ordered list of limits for one endpoint — the first rule that
 * is exhausted rejects the request, so a per-client limit and an
 * aggregate cap can both be enforced. Each rule is
 * { key, limit, windowMs } and `scope` names the endpoint being protected.
 */
export async function allowRequestWithinLimits(base44, scope, rules) {
  for (const rule of rules) {
    const ok = await allowRequest(base44, {
      scope,
      key: rule.key,
      limit: rule.limit,
      windowMs: rule.windowMs,
    });
    if (!ok) return false;
  }
  return true;
}