/**
 * sendHistoricalCourseInvitation — reconnects with people who were written
 * to about Tamu Academy's first two courses before those courses were
 * complete, and who never went on to enrol.
 *
 * The audience is derived entirely on the server, never from the request
 * body. It is the union of:
 *   - everyone already emailed about the two courses (the announcement and
 *     follow-up sends recorded in EmailOpenEvent)
 *   - everyone who signed up for early access through a contact inquiry and
 *     consented to updates
 *
 * Excluded, so nobody is written to twice:
 *   - registered learners, who the learner outreach streams already cover
 *   - anyone who has already received this invitation, which is recorded as
 *     an EmailOpenEvent of type 'course_invitation'. That record is the only
 *     state this campaign keeps, so a re-run can never double-send.
 *   - malformed addresses, which would only bounce
 *
 * Each run is capped so a large list drains over several reviewed sends
 * rather than in one burst, which also keeps Gmail delivery healthy.
 *
 * Admin-only, with a dry_run preview. Open tracking is recorded via
 * EmailOpenEvent and the trackEmailOpen pixel endpoint.
 */
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';
import {
  SITE_URL,
  SIGNATURE_TEXT,
  SIGNATURE_HTML,
  emailShell,
  firstNameOf,
  getGmailSender,
  sendTrackedEmail,
} from '../../shared/course-outreach.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_PER_RUN = 40;
const SEND_BATCH = 10;

const PRIOR_TYPES = new Set(['announcement', 'follow_up']);
const CAMPAIGN_TYPE = 'course_invitation';

const WARM_SOURCE = 'early access signup';
const COOL_SOURCE = 'previously emailed about the courses';

const ECONOMICS_URL = `${SITE_URL}/courses/understanding-african-economies-and-the-global-system`;
const MH_URL = `${SITE_URL}/courses/mental-health-community-and-culture`;
const COURSES_URL = `${SITE_URL}/courses`;

const buildEmail = (name) => {
  const greeting = name ? `Hello ${firstNameOf(name)},` : 'Hello,';
  const subject = 'Your invitation to Tamu Academy is still open';

  const text = `${greeting}

Thank you for your interest in Tamu Academy, an extension of the Voices of Change education platform.

When we last wrote, our first two courses were just opening. Both are now complete, and learners who finish receive a certificate of completion.

Understanding African Economies and the Global System
Six modules on how African economies really work, and how they connect to the global system.
Start this course: ${ECONOMICS_URL}

Mental Health, Community and Culture
Seven modules on mental health grounded in African thought and community practice.
Start this course: ${MH_URL}

Both courses are free and self-paced, with no deadlines. You can begin whenever you are ready, at ${COURSES_URL}.

If this is no longer of interest, simply reply and let us know, and we will take you off this list.

Asante,
${SIGNATURE_TEXT}`;

  const html = emailShell(
    `<p>${greeting}</p>` +
      `<p>Thank you for your interest in Tamu Academy, an extension of the Voices of Change education platform.</p>` +
      `<p>When we last wrote, our first two courses were just opening. Both are now complete, and learners who finish receive a certificate of completion.</p>` +
      `<p><strong style="color:#1A130E;">Understanding African Economies and the Global System</strong><br/>` +
      `Six modules on how African economies really work, and how they connect to the global system.<br/>` +
      `<a href="${ECONOMICS_URL}" style="color:#D4A12A;">Start this course</a></p>` +
      `<p><strong style="color:#1A130E;">Mental Health, Community and Culture</strong><br/>` +
      `Seven modules on mental health grounded in African thought and community practice.<br/>` +
      `<a href="${MH_URL}" style="color:#D4A12A;">Start this course</a></p>` +
      `<p style="color:#4a3a2a;">Both courses are free and self-paced, with no deadlines. You can begin whenever you are ready, at ` +
      `<a href="${COURSES_URL}" style="color:#D4A12A;">tamuacademy.org/courses</a>.</p>` +
      `<p style="color:#4a3a2a;">If this is no longer of interest, simply reply and let us know, and we will take you off this list.</p>` +
      SIGNATURE_HTML
  );

  return { subject, text, html };
};

export default async function (req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const dryRun = body.dry_run === true;

    // --- Authentication / Authorization ---
    // Admin-only. The recipient list is never taken from the request, so a
    // caller cannot redirect this campaign at an address of their choosing.
    const user = await base44.auth.me().catch(() => null);
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    // --- Gmail connection ---
    const { accessToken, fromEmail } = await getGmailSender(base44);

    // --- Derive the audience server-side ---
    const events = await base44.asServiceRole.entities.EmailOpenEvent.list();
    const inquiries = await base44.asServiceRole.entities.ContactInquiry.list();
    const users = await base44.asServiceRole.entities.User.list();

    const registered = new Set();
    for (const u of users || []) {
      if (u.email) registered.add(String(u.email).trim().toLowerCase());
    }

    const alreadyInvited = new Set();
    const audience = new Map();

    for (const event of events || []) {
      const email = String(event.recipient_email || '').trim().toLowerCase();
      if (!email) continue;
      if (event.message_type === CAMPAIGN_TYPE) {
        alreadyInvited.add(email);
        continue;
      }
      if (!PRIOR_TYPES.has(event.message_type)) continue;
      if (!audience.has(email)) audience.set(email, { name: '', source: COOL_SOURCE });
    }

    for (const inquiry of inquiries || []) {
      if (inquiry.updates_consent !== true) continue;
      const email = String(inquiry.email || '').trim().toLowerCase();
      if (!email) continue;
      const known = audience.get(email);
      audience.set(email, {
        name: inquiry.full_name || (known ? known.name : ''),
        source: WARM_SOURCE,
      });
    }

    const targets = [];
    for (const [email, meta] of audience) {
      if (!EMAIL_RE.test(email)) continue;
      if (registered.has(email)) continue;
      if (alreadyInvited.has(email)) continue;
      targets.push({ email, name: meta.name, source: meta.source });
    }

    // Early access signups are the warmest leads, so they go first.
    targets.sort((a, b) => {
      const aWarm = a.source === WARM_SOURCE ? 0 : 1;
      const bWarm = b.source === WARM_SOURCE ? 0 : 1;
      if (aWarm !== bWarm) return aWarm - bWarm;
      return a.email.localeCompare(b.email);
    });

    const audienceTotal = targets.length;
    const batch = targets.slice(0, MAX_PER_RUN);

    if (dryRun) {
      return Response.json({
        dry_run: true,
        eligible_count: batch.length,
        audience_total: audienceTotal,
        remaining_after: Math.max(0, audienceTotal - batch.length),
        sender: fromEmail,
        targets: batch.map((t) => ({
          learner_id: t.email,
          name: t.name,
          email: t.email,
          detail: t.source,
        })),
      });
    }

    if (batch.length === 0) {
      return Response.json({ sent: 0, failed: 0, eligible: 0, audience_total: audienceTotal, sender: fromEmail });
    }

    // --- Send, in small batches to keep Gmail delivery healthy ---
    let sent = 0;
    let failed = 0;
    const errors = [];

    for (let i = 0; i < batch.length; i += SEND_BATCH) {
      const slice = batch.slice(i, i + SEND_BATCH);
      const results = await Promise.all(
        slice.map(async (recipient) => {
          const email = buildEmail(recipient.name);
          try {
            await sendTrackedEmail(base44, {
              accessToken,
              fromEmail,
              to: recipient.email,
              subject: email.subject,
              text: email.text,
              html: email.html,
              messageType: CAMPAIGN_TYPE,
            });
            return { ok: true };
          } catch (e) {
            return { ok: false, email: recipient.email, error: e.message };
          }
        })
      );

      for (const result of results) {
        if (result.ok) sent++;
        else {
          failed++;
          errors.push({ email: result.email, error: result.error });
        }
      }
    }

    return Response.json({
      sent,
      failed,
      eligible: batch.length,
      audience_total: audienceTotal,
      remaining_after: Math.max(0, audienceTotal - sent),
      sender: fromEmail,
      errors,
    });
  } catch (error) {
    console.error('[sendHistoricalCourseInvitation] error:', error.message);
    return Response.json({ error: 'An error occurred.' }, { status: 500 });
  }
}