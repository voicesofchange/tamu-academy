/**
 * sendCompletionFollowUp — a separate follow-up written for learners who
 * have already finished a course.
 *
 * Targets an enrollment when ALL of the following hold:
 *   - the enrollment is 'completed'
 *   - no follow-up has been sent for it yet (completion_followup_sent_at),
 *     so this is a once-per-course note rather than a recurring nudge
 *   - the course was completed at least 3 days ago, so it never lands in
 *     the same week as the certificate email that goes out on completion
 *
 * The email congratulates the learner, links to their certificate and to
 * My Courses for the PDF, invites them to share their experience, and
 * points them at the rest of the catalogue.
 *
 * Invocation modes:
 *   1. Admin (dashboard): authenticated admin can run a dry_run to preview.
 *  2. Workflow (scheduled): daily call from the scheduled workflow.
 *
 * Open tracking is recorded via EmailOpenEvent (message_type
 * 'completion_followup') and the trackEmailOpen pixel endpoint.
 */
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';
import { resolvePreferredName } from '../../shared/learner-name.js';
import {
  SITE_URL,
  SIGNATURE_TEXT,
  SIGNATURE_HTML,
  emailShell,
  firstNameOf,
  courseTitleOf,
  certificateUrl,
  storiesUrl,
  coursesUrl,
  getGmailSender,
  sendTrackedEmail,
} from '../../shared/course-outreach.js';

const FOLLOW_UP_DELAY_MS = 3 * 24 * 60 * 60 * 1000; // at least 3 days after completion

const buildEmail = ({ learnerName, courseTitle, certificateLink }) => {
  const firstName = firstNameOf(learnerName);
  const subject = `Congratulations again on completing ${courseTitle}`;

  const storiesLink = storiesUrl();
  const coursesLink = coursesUrl();

  const text = `Dear ${firstName},

Congratulations again on completing ${courseTitle}. Finishing a course takes real commitment, and we're glad you chose to learn with Tamu Academy.

Your certificate is yours to keep and share, and it stays available to you:

${certificateLink}

If you'd like to stay connected, there are two easy next steps.

Share your experience. A few words from you help other learners decide whether this course is for them:
${storiesLink}

Keep learning. Our other course is free and self-paced:
${coursesLink}

Whatever you choose next, thank you for being part of this community.

Asante,
${SIGNATURE_TEXT}

${SITE_URL}`;

  const html = emailShell(
    `<p>Dear ${firstName},</p>` +
      `<p>Congratulations again on completing <strong>${courseTitle}</strong>. Finishing a course takes real commitment, and we're glad you chose to learn with Tamu Academy.</p>` +
      `<p>Your certificate is yours to keep and share, and it stays available to you:</p>` +
      `<p><a href="${certificateLink}" style="color:#D4A12A;">View your certificate</a></p>` +
      `<p style="color:#4a3a2a;">If you'd like to stay connected, there are two easy next steps.</p>` +
      `<p><strong style="color:#1A130E;">Share your experience</strong><br/>A few words from you help other learners decide whether this course is for them.<br/>` +
      `<a href="${storiesLink}" style="color:#D4A12A;">Tell us how it went</a></p>` +
      `<p><strong style="color:#1A130E;">Keep learning</strong><br/>Our other course is free and self-paced.<br/>` +
      `<a href="${coursesLink}" style="color:#D4A12A;">Explore the catalogue</a></p>` +
      `<p style="color:#4a3a2a;">Whatever you choose next, thank you for being part of this community.</p>` +
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
    // Admin-only: the scheduled workflow injects admin auth. Reject direct
    // calls from non-admin or anonymous callers.
    const user = await base44.auth.me().catch(() => null);
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    // --- Gmail connection ---
    const { accessToken, fromEmail } = await getGmailSender(base44);

    // --- Determine who to follow up with ---
    const enrollments = await base44.asServiceRole.entities.CourseEnrollment.filter({
      status: 'completed',
    });

    const users = await base44.asServiceRole.entities.User.list();
    const userMap = {};
    for (const u of users || []) userMap[u.id] = u;

    const now = Date.now();
    const targets = [];

    for (const enrollment of enrollments || []) {
      if (enrollment.completion_followup_sent_at) continue;

      const completedAt = enrollment.completed_at || enrollment.updated_at;
      if (!completedAt) continue;
      if (now - new Date(completedAt).getTime() < FOLLOW_UP_DELAY_MS) continue;

      const learner = userMap[enrollment.learner_id];
      if (!learner || !learner.email) continue;

      targets.push({ enrollment, learner, completedAt });
    }

    if (dryRun) {
      return Response.json({
        dry_run: true,
        eligible_count: targets.length,
        sender: fromEmail,
        targets: targets.map((t) => ({
          learner_id: t.learner.id,
          name: resolvePreferredName(t.learner, t.learner.full_name),
          email: t.learner.email,
          course_slug: t.enrollment.course_slug,
          detail: `${courseTitleOf(t.enrollment.course_slug)}, completed ${String(t.completedAt).slice(0, 10)}`,
        })),
      });
    }

    if (targets.length === 0) {
      return Response.json({ sent: 0, failed: 0, eligible: 0, sender: fromEmail });
    }

    // --- Send ---
    let sent = 0;
    let failed = 0;
    const errors = [];
    const sentAt = new Date().toISOString();

    for (const target of targets) {
      const { enrollment, learner } = target;
      const email = buildEmail({
        learnerName: resolvePreferredName(learner, learner.full_name),
        courseTitle: courseTitleOf(enrollment.course_slug),
        certificateLink: certificateUrl(enrollment.course_slug),
      });

      try {
        await sendTrackedEmail(base44, {
          accessToken,
          fromEmail,
          to: learner.email,
          subject: email.subject,
          text: email.text,
          html: email.html,
          messageType: 'completion_followup',
        });
        await base44.asServiceRole.entities.CourseEnrollment.update(enrollment.id, {
          completion_followup_sent_at: sentAt,
        });
        sent++;
      } catch (e) {
        failed++;
        errors.push({ email: learner.email, error: e.message });
      }
    }

    return Response.json({ sent, failed, eligible: targets.length, sender: fromEmail, errors });
  } catch (error) {
    console.error('[sendCompletionFollowUp] error:', error.message);
    return Response.json({ error: 'An error occurred.' }, { status: 500 });
  }
}