import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';
import { clientKeyFromRequest, allowRequestWithinLimits } from '../../shared/rate-limit.js';

/**
 * verifyCertificate — public, non-authenticated endpoint behind
 * /verify?code=… and the QR code printed on each certificate.
 *
 * Request body: { code: "TAMU-XXXXXXXX" }
 *
 * Response (200), the certificate's public fields only:
 *   { found: true, certificate: { learner_name, course_title, issued_at,
 *     completed_at, status, verification_code } }
 * Response (404): { found: false } for a well-formed code with no certificate.
 *
 * PRIVACY:
 *   - Reachable by anyone, so the record is read with the service role and
 *     only the six fields above are returned. learner_id, certificate_id,
 *     course_enrollment_id, the record id, the completion statement and the
 *     name-correction audit fields never leave the server.
 *   - The code is the only input. No search by name, email or course is
 *     offered, so a certificate can be checked only by someone who holds
 *     its code.
 *   - A malformed code is rejected before any lookup, and lookups are
 *     rate-limited per client and in aggregate, so codes cannot be guessed
 *     at scale.
 *   - Read-only: nothing is created or changed apart from the rate-limit
 *     counter.
 */

const CODE_PATTERN = /^TAMU-[0-9A-F]{8}$/;

export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);

    let body: Record<string, unknown> = {};
    try {
      body = await req.json();
    } catch (_) {
      body = {};
    }

    const code = typeof body.code === 'string' ? body.code.trim().toUpperCase() : '';
    if (!CODE_PATTERN.test(code)) {
      return Response.json({ error: 'Invalid code' }, { status: 400 });
    }

    const clientKey = await clientKeyFromRequest(req);
    const withinLimits = await allowRequestWithinLimits(base44, 'certificate_verification', [
      { key: `client:${clientKey}`, limit: 30, windowMs: 10 * 60 * 1000 },
      { key: 'global', limit: 2000, windowMs: 60 * 60 * 1000 },
    ]);
    if (!withinLimits) {
      return Response.json({ error: 'Too many requests' }, { status: 429 });
    }

    const rows = await base44.asServiceRole.entities.CourseCertificate.filter({
      verification_code: code,
    });
    const cert = Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
    if (!cert) {
      return Response.json({ found: false }, { status: 404 });
    }

    return Response.json({
      found: true,
      certificate: {
        learner_name: cert.learner_name || '',
        course_title: cert.course_title || '',
        issued_at: cert.issued_at || null,
        completed_at: cert.completed_at || null,
        // Records issued before status existed are valid unless revoked.
        status: cert.status === 'revoked' ? 'revoked' : 'valid',
        verification_code: cert.verification_code,
      },
    });
  } catch (error) {
    console.error('[verifyCertificate] Error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}
