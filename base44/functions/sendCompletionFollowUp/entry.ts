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
import { emailCopyCache, learnerLanguage } from '../../shared/email-localization.js';
import { CELEBRATION_COPY, buildCelebrationEmail } from '../../shared/learner-emails.js';
import {
  courseTitleOf,
  certificateUrl,
  storiesUrl,
  coursesUrl,
  getGmailSender,
  sendTrackedEmail,
} from '../../shared/course-outreach.js';
import {
  getOrCreatePreference,
  isStopped,
  loadPreferences,
  stopEmailsUrl,
} from '../../shared/email-preferences.js';

const FOLLOW_UP_DELAY_MS = 3 * 24 * 60 * 60 * 1000; // at least 3 days after completion

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

    // Who has asked us to stop these emails.
    const preferences = await loadPreferences(base44);

    const now = Date.now();
    const targets = [];

    for (const enrollment of enrollments || []) {
      if (enrollment.completion_followup_sent_at) continue;

      const completedAt = enrollment.completed_at || enrollment.updated_at;
      if (!completedAt) continue;
      if (now - new Date(completedAt).getTime() < FOLLOW_UP_DELAY_MS) continue;

      const learner = userMap[enrollment.learner_id];
      if (!learner || !learner.email) continue;

      // The learner asked us to stop these emails: leave them out entirely.
      if (isStopped(preferences.byLearner.get(learner.id))) continue;

      targets.push({
        enrollment,
        learner,
        preference: preferences.byLearner.get(learner.id) || null,
        completedAt,
      });
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
          language: learnerLanguage(t.learner),
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
    const copyFor = emailCopyCache(base44);

    for (const target of targets) {
      const { enrollment, learner } = target;
      const copy = await copyFor(learnerLanguage(learner), CELEBRATION_COPY);

      try {
        // The learner's own stop link, created on first use.
        const preference =
          target.preference ||
          (await getOrCreatePreference(base44, {
            learnerId: learner.id,
            email: learner.email,
          }));

        const email = buildCelebrationEmail(copy, {
          learnerName: resolvePreferredName(learner, learner.full_name),
          courseTitle: courseTitleOf(enrollment.course_slug),
          certificateLink: certificateUrl(enrollment.course_slug),
          storiesLink: storiesUrl(),
          coursesLink: coursesUrl(),
          stopUrl: stopEmailsUrl(preference.stop_token),
        });

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