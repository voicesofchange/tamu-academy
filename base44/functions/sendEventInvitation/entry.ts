/**
 * sendEventInvitation — sends the branded event invitation for
 * "Learning Without Barriers: Voices of Change and Tamu Academy" to a bounded
 * list of addresses supplied by an administrator.
 *
 * Delivery goes through the app's connected Gmail account, sending as
 * tex@sustainthevoices.org (a verified alias on that mailbox), so the
 * invitation arrives from the Voices of Change address rather than the
 * platform's sending address, and replies come back to that same inbox.
 *
 * The message itself comes entirely from
 * base44/shared/event-invitation-email.js: the caller supplies only who should
 * receive it, so the subject, wording and links cannot be rewritten by a
 * request. Every address is validated and deduplicated, and one run is capped,
 * so re-running the campaign cannot flood an address.
 *
 * A dry run reports the sending account and previews exactly who would receive
 * the invitation while sending nothing, so the list can be reviewed first.
 *
 * Admin-only.
 */
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';
import { getGmailSender, sendTrackedEmail } from '../../shared/course-outreach.js';
import {
  EVENT_FROM_ADDRESS,
  EVENT_INVITATION_SUBJECT,
  buildEventInvitationHtml,
  buildEventInvitationText,
} from '../../shared/event-invitation-email.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_PER_RUN = 50;
const SEND_BATCH = 6;
const MESSAGE_TYPE = 'course_invitation';

/** The given name to greet with, or a warm fallback when none is on file. */
function firstNameOf(name) {
  const trimmed = typeof name === 'string' ? name.trim() : '';
  return trimmed ? trimmed.split(/\s+/)[0] : 'friend';
}

export default async function (req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));

    // --- Authentication / Authorization ---
    const user = await base44.auth.me().catch(() => null);
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    // --- Validate and deduplicate the supplied recipients ---
    const incoming = Array.isArray(body.recipients) ? body.recipients : [];
    const seen = new Set();
    const targets = [];
    for (const entry of incoming) {
      const email = String((entry && entry.email) || entry || '').trim().toLowerCase();
      if (!EMAIL_RE.test(email) || seen.has(email)) continue;
      seen.add(email);
      targets.push({ email, firstName: firstNameOf(entry && entry.name) });
    }

    if (targets.length === 0) {
      return Response.json({ error: 'No valid recipients were supplied.' }, { status: 400 });
    }

    const batch = targets.slice(0, MAX_PER_RUN);

    // --- The Gmail account the invitation is sent from ---
    let sender;
    try {
      sender = await getGmailSender(base44);
    } catch (error) {
      console.error('[sendEventInvitation] gmail connection error:', error && error.message);
      return Response.json(
        { error: 'The connected Gmail account could not be reached. Reconnect Gmail and try again.' },
        { status: 502 }
      );
    }

    if (body.dry_run === true) {
      return Response.json({
        dry_run: true,
        sender: EVENT_FROM_ADDRESS,
        mailbox: sender.fromEmail,
        eligible: batch.length,
        remaining_after: Math.max(0, targets.length - batch.length),
        recipients: batch.map((t) => ({ email: t.email, first_name: t.firstName })),
      });
    }

    // --- Send, in small batches to keep delivery healthy ---
    let sent = 0;
    let failed = 0;
    const errors = [];

    for (let i = 0; i < batch.length; i += SEND_BATCH) {
      const slice = batch.slice(i, i + SEND_BATCH);
      const results = await Promise.allSettled(
        slice.map((recipient) =>
          sendTrackedEmail(base44, {
            accessToken: sender.accessToken,
            fromEmail: EVENT_FROM_ADDRESS,
            to: recipient.email,
            subject: EVENT_INVITATION_SUBJECT,
            text: buildEventInvitationText({ firstName: recipient.firstName }),
            html: buildEventInvitationHtml({ firstName: recipient.firstName }),
            messageType: MESSAGE_TYPE,
          })
        )
      );

      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          sent++;
        } else {
          failed++;
          errors.push({
            email: slice[index].email,
            error: result.reason && result.reason.message ? result.reason.message : 'Send failed',
          });
        }
      });
    }

    return Response.json({
      sent,
      failed,
      sender: EVENT_FROM_ADDRESS,
      mailbox: sender.fromEmail,
      eligible: batch.length,
      remaining_after: Math.max(0, targets.length - batch.length),
      errors,
    });
  } catch (error) {
    console.error('[sendEventInvitation] error:', error && error.message);
    return Response.json({ error: 'An error occurred.' }, { status: 500 });
  }
}