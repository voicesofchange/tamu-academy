import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';

// Public site URL used in the email body.
const SITE_URL = 'https://tamuacademy.org';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_RECIPIENTS = 200;

const MESSAGES = {
  announcement: {
    subject: 'From Voices of Change to Tamu Academy — our courses are now live',
    body: `Hello,

Your engagement with Voices of Change has meant a great deal to us — and we want to share where that work has grown.

Tamu Academy is our new educational arm: a free learning platform grounded in diaspora perspectives, exploring economics, governance, and global affairs and the public good. Our first courses are now live and open for enrollment.

Explore them here: ${SITE_URL}/courses

More courses will follow soon. We would be glad to have you learn with us.

Warm regards,
The Tamu Academy team
${SITE_URL}`,
  },
  follow_up: {
    subject: 'A reminder: your courses at Tamu Academy are waiting',
    body: `Hello,

A short while ago we wrote to share that Tamu Academy — an extension of the Voices of Change education platform — is now live with its first two courses.

If you haven't had a chance to start yet, we'd love for you to begin today:

Understanding African Economies and the Global System
Ubuntu Mental Health: Mental Health, Community and Culture

Both courses are open now — explore and start learning today. More learning areas are on the way, spanning economics, governance, technology, wellbeing, history, and global affairs, all grounded in African thought and experience.

Explore everything at tamuacademy.org/courses.

Asante,
The Tamu Academy Team
An extension of the Voices of Change education platform`,
  },
};

// Parse a free-form list (array, comma/semicolon/newline/whitespace separated string)
// into a deduplicated, validated array of email addresses.
const parseEmails = (raw) => {
  let list = [];
  if (Array.isArray(raw)) {
    list = raw;
  } else if (typeof raw === 'string') {
    list = raw.split(/[\s,;]+/);
  }
  const seen = new Set();
  const result = [];
  for (const item of list) {
    const email = String(item || '').trim().toLowerCase();
    if (!email) continue;
    if (!EMAIL_RE.test(email)) continue;
    if (seen.has(email)) continue;
    seen.add(email);
    result.push(email);
  }
  return result;
};

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    if (user.role !== 'admin') return Response.json({ error: 'Forbidden' }, { status: 403 });

    const body = await req.json().catch(() => ({}));
    const dryRun = body.dry_run === true;
    const messageType = body.message_type === 'follow_up' ? 'follow_up' : 'announcement';
    const message = MESSAGES[messageType];

    const emails = parseEmails(body.emails).slice(0, MAX_RECIPIENTS);

    if (dryRun) {
      return Response.json({
        dry_run: true,
        eligible_count: emails.length,
        recipients: emails.map((email) => ({ email })),
      });
    }

    let sent = 0;
    let failed = 0;
    const errors = [];

    for (const email of emails) {
      try {
        await base44.asServiceRole.integrations.Core.SendEmail({
          to: email,
          subject: message.subject,
          body: message.body,
        });
        sent++;
      } catch (err) {
        failed++;
        errors.push({ email, error: err && err.message ? err.message : 'Unknown error' });
      }
    }

    return Response.json({
      sent,
      failed,
      eligible: emails.length,
      errors: errors.slice(0, 20),
    });
  } catch (error) {
    console.error('[sendVoicesOfChangeAnnouncement] error:', error.message);
    return Response.json({ error: 'An error occurred.' }, { status: 500 });
  }
}