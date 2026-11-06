/**
 * manageEmailPreferences — reads and changes whether a learner receives Tamu
 * Academy's automated reminder emails.
 *
 * Two ways in:
 *   1. Signed in (the Profile page): no token, the call acts on the caller's
 *      own record.
 *   2. From an email link: the stop token saved on the learner's
 *      EmailPreference record. The token is the whole credential, so the link
 *      works without signing in.
 *
 * Actions: 'status' (default, reads only), 'stop', 'resume'. Only the
 * preference status is returned — never the learner's address.
 */
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';
import { getOrCreatePreference } from '../../shared/email-preferences.js';

const ACTIONS = new Set(['status', 'stop', 'resume']);

function summary(preference) {
  return {
    status: preference.status === 'stopped' ? 'stopped' : 'active',
    stopped_at: preference.stopped_at || null,
    resumed_at: preference.resumed_at || null,
  };
}

export default async function (req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const action = ACTIONS.has(body.action) ? body.action : 'status';
    const token = typeof body.token === 'string' ? body.token.trim() : '';

    let preference = null;

    if (token) {
      const matches = await base44.asServiceRole.entities.EmailPreference.filter({
        stop_token: token,
      });
      preference = Array.isArray(matches) && matches.length > 0 ? matches[0] : null;
      if (!preference) {
        return Response.json({ error: 'This link is not valid.' }, { status: 404 });
      }
    } else {
      const user = await base44.auth
        .me()
        .catch((error) => (error.status === 401 ? null : Promise.reject(error)));
      if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
      if (!user.email) return Response.json({ error: 'No email on file' }, { status: 400 });

      preference = await getOrCreatePreference(base44, {
        learnerId: user.id,
        email: user.email,
      });
    }

    if (action === 'stop' || action === 'resume') {
      const now = new Date().toISOString();
      const changes =
        action === 'stop'
          ? { status: 'stopped', stopped_at: now }
          : { status: 'active', resumed_at: now };

      preference = await base44.asServiceRole.entities.EmailPreference.update(
        preference.id,
        changes
      );
    }

    return Response.json(summary(preference));
  } catch (error) {
    console.error('[manageEmailPreferences] error:', error.message);
    return Response.json({ error: 'An error occurred.' }, { status: 500 });
  }
}