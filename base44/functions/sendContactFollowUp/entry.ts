import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';

// Public site URL used in the email body. Matches the canonical domain
// referenced across the app (PageMeta, sitemap, structured data).
const SITE_URL = 'https://tamuacademy.org';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const buildMessage = (firstName) => {
  const greeting = firstName ? `Hello ${firstName},` : 'Hello,';
  return `${greeting}

Thank you for reaching out to Tamu Academy. We are writing to let you know that our first courses are now live and open for enrollment.

You can explore them here: ${SITE_URL}/courses

We are glad to share that more courses will be added soon, expanding our curriculum in economics, governance, and global affairs — all grounded in diaspora perspectives and the public good.

We are looking forward to having you engage with the material, and to learning alongside this community.

Warm regards,
The Tamu Academy team
${SITE_URL}`;
};

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    if (user.role !== 'admin') return Response.json({ error: 'Forbidden' }, { status: 403 });

    const body = await req.json().catch(() => ({}));
    const dryRun = body.dry_run === true;
    const limit = Math.min(Math.max(parseInt(body.limit, 10) || 200, 1), 500);

    // Select inquiries not yet followed up, with a valid email address.
    // Dedupe by email so the same person never receives two copies.
    const inquiries = await base44.asServiceRole.entities.ContactInquiry.list('-created_date', 500);
    const seenEmails = new Set();
    const eligible = inquiries
      .filter((i) =>
        !i.followup_sent_at &&
        i.followup_status !== 'sent' &&
        i.email &&
        EMAIL_RE.test(i.email) &&
        !seenEmails.has(i.email.toLowerCase()) &&
        seenEmails.add(i.email.toLowerCase())
      )
      .slice(0, limit);

    if (dryRun) {
      return Response.json({
        dry_run: true,
        eligible_count: eligible.length,
        recipients: eligible.map((i) => ({
          email: i.email,
          name: i.full_name,
          inquiry_type: i.inquiry_type,
        })),
      });
    }

    let sent = 0;
    let failed = 0;
    const errors = [];

    for (const inq of eligible) {
      const firstName = (inq.full_name || '').split(' ')[0].trim();
      try {
        await base44.asServiceRole.integrations.Core.SendEmail({
          to: inq.email,
          subject: 'Your courses at Tamu Academy are now live',
          body: buildMessage(firstName),
        });
        await base44.asServiceRole.entities.ContactInquiry.update(inq.id, {
          followup_sent_at: new Date().toISOString(),
          followup_status: 'sent',
        });
        sent++;
      } catch (err) {
        failed++;
        errors.push({ email: inq.email, error: err && err.message ? err.message : 'Unknown error' });
        try {
          await base44.asServiceRole.entities.ContactInquiry.update(inq.id, {
            followup_status: 'failed',
          });
        } catch (_) {
          /* ignore secondary update failure */
        }
      }
    }

    return Response.json({
      sent,
      failed,
      eligible: eligible.length,
      errors: errors.slice(0, 20),
    });
  } catch (error) {
    console.error('[sendContactFollowUp] error:', error.message);
    return Response.json({ error: 'An error occurred.' }, { status: 500 });
  }
}