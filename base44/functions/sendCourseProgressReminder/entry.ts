/**
 * sendCourseProgressReminder — encourages learners who are partway
 * through an active course and still working on it.
 *
 * Targets an enrollment when ALL of the following hold:
 *   - the enrollment is 'active'
 *   - the learner has completed at least one module (they have begun) but
 *     not yet all of them (the completion follow-up covers finished courses)
 *   - their latest module activity is within the last 30 days, so this
 *     reaches learners who are still moving rather than dormant ones
 *     (sendInactiveLearnerCheckIn covers those)
 *   - no reminder in the last 14 days (last_reminder_sent_at)
 *   - no motivational check-in in the last 14 days, so the two outreach
 *     streams never write to the same learner in the same fortnight
 *
 * The email names the learner's progress and links straight to the next
 * module they have not finished.
 *
 * Invocation modes:
 *   1. Admin (dashboard): authenticated admin can run a dry_run to preview.
 *   2. Workflow (scheduled): weekly call from the scheduled workflow.
 *
 * Open tracking is recorded via EmailOpenEvent (message_type
 * 'course_reminder') and the trackEmailOpen pixel endpoint.
 */
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';
import { getRequiredModuleRoutes } from '../../shared/course-registry.js';
import { resolvePreferredName } from '../../shared/learner-name.js';
import {
  SIGNATURE_TEXT,
  SIGNATURE_HTML,
  emailShell,
  firstNameOf,
  courseTitleOf,
  moduleLabel,
  moduleUrl,
  getGmailSender,
  sendTrackedEmail,
} from '../../shared/course-outreach.js';

const ACTIVE_WINDOW_MS = 30 * 24 * 60 * 60 * 1000; // still working: activity within 30 days
const COOLDOWN_MS = 14 * 24 * 60 * 60 * 1000; // at most one reminder a fortnight

const buildEmail = ({ learnerName, courseTitle, doneCount, totalCount, nextLabel, url }) => {
  const firstName = firstNameOf(learnerName);
  const subject = `Your progress in ${courseTitle}, ${nextLabel} is next`;

  const text = `Dear ${firstName},

You're making real progress. You've completed ${doneCount} of ${totalCount} modules in ${courseTitle}. Well done.

Your next step is ${nextLabel}:

${url}

There's no deadline and nothing to catch up on. Take it at your own pace, and write back anytime if a question comes up.

Asante,
${SIGNATURE_TEXT}`;

  const html = emailShell(
    `<p>Dear ${firstName},</p>` +
      `<p>You're making real progress. You've completed <strong>${doneCount} of ${totalCount} modules</strong> in ${courseTitle}. Well done.</p>` +
      `<p>Your next step is <strong>${nextLabel}</strong>:</p>` +
      `<p><a href="${url}" style="color:#D4A12A;">Continue ${nextLabel}</a></p>` +
      `<p style="color:#4a3a2a;">There's no deadline and nothing to catch up on. Take it at your own pace, and write back anytime if a question comes up.</p>` +
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

    // --- Gather data ---
    const enrollments = await base44.asServiceRole.entities.CourseEnrollment.filter({
      status: 'active',
    });
    const progressRows = await base44.asServiceRole.entities.ModuleProgress.list();

    const users = await base44.asServiceRole.entities.User.list();
    const userMap = {};
    for (const u of users || []) userMap[u.id] = u;

    // Completed modules and latest activity, per learner + course.
    const byLearnerCourse = {};
    for (const row of progressRows || []) {
      const key = `${row.learner_id}|${row.course_slug}`;
      if (!byLearnerCourse[key]) byLearnerCourse[key] = { completed: new Set(), lastActivity: null };
      const entry = byLearnerCourse[key];
      if (row.status === 'completed') entry.completed.add(row.module_slug);
      if (row.updated_at) {
        if (!entry.lastActivity || new Date(row.updated_at) > new Date(entry.lastActivity)) {
          entry.lastActivity = row.updated_at;
        }
      }
    }

    // --- Determine who to encourage ---
    const now = Date.now();
    const targets = [];

    for (const enrollment of enrollments || []) {
      const required = getRequiredModuleRoutes(enrollment.course_slug);
      if (required.length === 0) continue;

      const entry = byLearnerCourse[`${enrollment.learner_id}|${enrollment.course_slug}`];
      const completed = entry ? entry.completed : new Set();
      const doneCount = required.filter((route) => completed.has(route)).length;

      // Nothing finished yet (the welcome email covers that) or already
      // finished (the completion follow-up covers that).
      if (doneCount === 0 || doneCount >= required.length) continue;

      const lastActivity = (entry && entry.lastActivity) || enrollment.enrolled_at;
      if (!lastActivity) continue;
      if (now - new Date(lastActivity).getTime() > ACTIVE_WINDOW_MS) continue;

      if (
        enrollment.last_reminder_sent_at &&
        now - new Date(enrollment.last_reminder_sent_at).getTime() < COOLDOWN_MS
      ) {
        continue;
      }
      if (
        enrollment.last_check_in_sent_at &&
        now - new Date(enrollment.last_check_in_sent_at).getTime() < COOLDOWN_MS
      ) {
        continue;
      }

      const learner = userMap[enrollment.learner_id];
      if (!learner || !learner.email) continue;

      targets.push({
        enrollment,
        learner,
        doneCount,
        totalCount: required.length,
        nextRoute: required.find((route) => !completed.has(route)),
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
          course_slug: t.enrollment.course_slug,
          detail: `${moduleLabel(t.enrollment.course_slug, t.nextRoute)} next, ${t.doneCount} of ${t.totalCount} complete`,
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
      const { enrollment, learner, doneCount, totalCount, nextRoute } = target;
      const courseTitle = courseTitleOf(enrollment.course_slug);
      const nextLabel = moduleLabel(enrollment.course_slug, nextRoute);

      const email = buildEmail({
        learnerName: resolvePreferredName(learner, learner.full_name),
        courseTitle,
        doneCount,
        totalCount,
        nextLabel,
        url: moduleUrl(enrollment.course_slug, nextRoute),
      });

      try {
        await sendTrackedEmail(base44, {
          accessToken,
          fromEmail,
          to: learner.email,
          subject: email.subject,
          text: email.text,
          html: email.html,
          messageType: 'course_reminder',
        });
        await base44.asServiceRole.entities.CourseEnrollment.update(enrollment.id, {
          last_reminder_sent_at: sentAt,
        });
        sent++;
      } catch (e) {
        failed++;
        errors.push({ email: learner.email, error: e.message });
      }
    }

    return Response.json({ sent, failed, eligible: targets.length, sender: fromEmail, errors });
  } catch (error) {
    console.error('[sendCourseProgressReminder] error:', error.message);
    return Response.json({ error: 'An error occurred.' }, { status: 500 });
  }
}