/**
 * sendInactiveLearnerCheckIn — one motivational email per learner per week,
 * naming every course they have drifted from, from sustainthevoices@gmail.com
 * (display name "Tex Wambui | Tamu Academy").
 *
 * A learner is written to when at least one active enrollment has been
 * inactive for 7 days. All of that learner's inactive courses travel in the
 * same email, so a learner with four courses receives one message, not four.
 *
 * The per-learner bookkeeping lives on EmailPreference:
 *   - last_check_in_at  at most one check-in a week, across all courses
 *   - check_in_streak   check-ins sent without any course activity between
 *                       them. Any activity resets it, and at three check-ins
 *                       stop until the learner returns.
 *   - status 'stopped'  the learner asked us to stop; nothing is sent.
 *
 * Invocation modes:
 *   1. Admin (dashboard): authenticated admin can run a dry_run to preview.
 *   2. Workflow (scheduled): daily scheduled call.
 *
 * Open tracking is recorded via EmailOpenEvent (message_type 'follow_up')
 * and the trackEmailOpen pixel endpoint.
 */
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';
import {
  getCourseConfig,
  getRequiredModuleRoutes,
} from '../../shared/course-registry.js';
import { SOKO_PEER_COURSE_SLUG } from '../../shared/sauti-za-soko-config.js';
import { buildRawMime, trackingPixel } from '../../shared/gmail-mime.js';
import { emailCopyCache, learnerLanguage } from '../../shared/email-localization.js';
import { CHECK_IN_COPY, buildCheckInEmail } from '../../shared/learner-emails.js';
import {
  getOrCreatePreference,
  isStopped,
  loadPreferences,
  stopEmailsUrl,
  MAX_CHECK_INS_WITHOUT_ACTIVITY,
} from '../../shared/email-preferences.js';

const SITE_URL = 'https://tamuacademy.org';
const FROM_NAME = 'Tex Wambui | Tamu Academy';
const INACTIVITY_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000; // 7 days between check-ins

const courseTitleOf = (courseSlug) => {
  const config = getCourseConfig(courseSlug);
  return config ? config.title : courseSlug;
};

/**
 * Where the learner continues: the module they last touched, then the slug
 * saved on their enrollment, then the course's first required module.
 *
 * The Peer Facilitator track is a separate course whose single module lives
 * inside the Sauti za Soko pathway, so it links to that page.
 */
const resumeUrl = (courseSlug, lastModuleSlug) => {
  if (courseSlug === SOKO_PEER_COURSE_SLUG) {
    return `${SITE_URL}/courses/sauti-za-soko/peer-facilitator`;
  }

  const routes = getRequiredModuleRoutes(courseSlug);
  const moduleSlug = lastModuleSlug && routes.includes(lastModuleSlug) ? lastModuleSlug : routes[0];

  if (moduleSlug) return `${SITE_URL}/courses/${courseSlug}/${moduleSlug}`;
  return `${SITE_URL}/courses/${courseSlug}`;
};

export default async function (req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const dryRun = body.dry_run === true;

    // --- Authentication / Authorization ---
    // Admin-only: this function is triggered by a scheduled workflow that
    // injects admin auth. Reject any direct call from non-admin or anonymous callers.
    const user = await base44.auth.me().catch(() => null);
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    // --- Gmail connection ---
    const { accessToken } = await base44.asServiceRole.connectors.getConnection('gmail');
    const infoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!infoRes.ok) {
      return Response.json({ error: 'Gmail account error' }, { status: 502 });
    }
    const info = await infoRes.json();
    const fromEmail = info.email;

    // --- Gather data ---
    const [enrollments, allProgress, users] = await Promise.all([
      base44.asServiceRole.entities.CourseEnrollment.filter({ status: 'active' }),
      base44.asServiceRole.entities.ModuleProgress.list(),
      base44.asServiceRole.entities.User.list(),
    ]);

    // Latest activity per course, and per learner across every course.
    const progressMap = {};
    const latestActivity = {};
    for (const p of allProgress || []) {
      const touched = p.updated_at || p.updated_date || p.created_date;
      if (!touched) continue;

      const key = `${p.learner_id}|${p.course_slug}`;
      const current = progressMap[key];
      if (!current || new Date(touched) > new Date(current.touched)) {
        progressMap[key] = { touched, module_slug: p.module_slug };
      }

      const learnerLatest = latestActivity[p.learner_id];
      if (!learnerLatest || new Date(touched) > new Date(learnerLatest)) {
        latestActivity[p.learner_id] = touched;
      }
    }

    const userMap = {};
    for (const u of users || []) userMap[u.id] = u;

    // --- Determine who is inactive, grouped by learner ---
    const now = Date.now();
    const inactiveThreshold = now - INACTIVITY_MS;
    const cooldownThreshold = now - COOLDOWN_MS;
    const groups = new Map();

    for (const e of enrollments || []) {
      const key = `${e.learner_id}|${e.course_slug}`;
      const lastActivity = progressMap[key]?.touched || e.enrolled_at;
      if (!lastActivity) continue;
      if (new Date(lastActivity).getTime() > inactiveThreshold) continue;

      if (e.last_check_in_sent_at && new Date(e.last_check_in_sent_at).getTime() > cooldownThreshold) {
        continue;
      }

      // Share one fortnightly cooldown with the progress-reminder stream so
      // the same learner never receives both messages close together.
      if (e.last_reminder_sent_at && new Date(e.last_reminder_sent_at).getTime() > cooldownThreshold) {
        continue;
      }

      const learner = userMap[e.learner_id];
      if (!learner || !learner.email) continue;

      const group = groups.get(e.learner_id) || { learner, courses: [] };
      group.courses.push({
        enrollment: e,
        courseSlug: e.course_slug,
        lastModule: progressMap[key]?.module_slug || e.last_module_slug || null,
      });
      groups.set(e.learner_id, group);
    }

    // --- Apply the learner's own settings and the check-in limit ---
    const preferences = await loadPreferences(base44);
    const targets = [];
    const skipped = { stopped: 0, recent_check_in: 0, no_activity: 0 };

    for (const [learnerId, group] of groups) {
      const preference = preferences.byLearner.get(learnerId) || null;

      if (isStopped(preference)) {
        skipped.stopped++;
        continue;
      }

      const lastCheckInMs = preference?.last_check_in_at
        ? new Date(preference.last_check_in_at).getTime()
        : null;

      // One check-in a week for this learner, whichever courses are waiting.
      if (lastCheckInMs && lastCheckInMs > cooldownThreshold) {
        skipped.recent_check_in++;
        continue;
      }

      // A check-in that went unanswered keeps the streak; any activity since
      // the last one starts the count again.
      let streak = Number(preference?.check_in_streak || 0);
      if (!Number.isFinite(streak) || streak < 0) streak = 0;

      const activityMs = latestActivity[learnerId]
        ? new Date(latestActivity[learnerId]).getTime()
        : null;
      if (lastCheckInMs && activityMs && activityMs > lastCheckInMs) streak = 0;

      if (streak >= MAX_CHECK_INS_WITHOUT_ACTIVITY) {
        skipped.no_activity++;
        continue;
      }

      targets.push({ learner: group.learner, preference, streak, courses: group.courses });
    }

    if (dryRun) {
      return Response.json({
        dry_run: true,
        eligible_count: targets.length,
        sender: fromEmail,
        skipped,
        targets: targets.map((t) => ({
          learner_id: t.learner.id,
          email: t.learner.email,
          name: t.learner.full_name,
          language: learnerLanguage(t.learner),
          courses: t.courses.map((c) => ({
            course_slug: c.courseSlug,
            last_module: c.lastModule,
          })),
          check_ins_without_activity: t.streak,
          last_check_in: t.preference?.last_check_in_at || null,
        })),
      });
    }

    if (targets.length === 0) {
      return Response.json({
        sent: 0,
        failed: 0,
        eligible: 0,
        sender: fromEmail,
        skipped,
      });
    }

    // --- Create tracking records: one per learner, not one per course ---
    const nowIso = new Date().toISOString();
    const trackingRecords = targets.map((t) => ({
      tracking_token: crypto.randomUUID(),
      recipient_email: t.learner.email,
      message_type: 'follow_up',
      sent_at: nowIso,
      open_count: 0,
    }));
    await base44.asServiceRole.entities.EmailOpenEvent.bulkCreate(trackingRecords);

    // --- Send ---
    let sent = 0;
    let failed = 0;
    const errors = [];
    const copyFor = emailCopyCache(base44);

    for (let i = 0; i < targets.length; i++) {
      const { learner, courses } = targets[i];

      try {
        const preference =
          targets[i].preference ||
          (await getOrCreatePreference(base44, {
            learnerId: learner.id,
            email: learner.email,
          }));

        const resume = courses.map((c) => ({
          title: courseTitleOf(c.courseSlug),
          url: resumeUrl(c.courseSlug, c.lastModule),
        }));

        const copy = await copyFor(learnerLanguage(learner), CHECK_IN_COPY);
        const email = buildCheckInEmail(copy, {
          learnerName: learner.full_name,
          courseTitle: resume[0].title,
          url: resume[0].url,
          courses: resume,
          stopUrl: stopEmailsUrl(preference.stop_token),
        });

        const finalHtml = email.html + trackingPixel(trackingRecords[i].tracking_token);
        const raw = buildRawMime(FROM_NAME, fromEmail, learner.email, email.subject, email.text, finalHtml);

        const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
          method: 'POST',
          headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ raw }),
        });
        if (!res.ok) throw new Error('Gmail send failed');

        sent++;

        await base44.asServiceRole.entities.EmailPreference.update(preference.id, {
          last_check_in_at: nowIso,
          check_in_streak: targets[i].streak + 1,
          learner_email: String(learner.email).toLowerCase(),
        });

        await Promise.all(
          courses.map((c) =>
            base44.asServiceRole.entities.CourseEnrollment.update(c.enrollment.id, {
              last_check_in_sent_at: nowIso,
            })
          )
        );
      } catch (e) {
        failed++;
        errors.push({ email: learner.email, error: e.message });
      }
    }

    return Response.json({
      sent,
      failed,
      eligible: targets.length,
      sender: fromEmail,
      skipped,
      errors,
    });
  } catch (error) {
    console.error('[sendInactiveLearnerCheckIn] error:', error.message);
    return Response.json({ error: 'An error occurred.' }, { status: 500 });
  }
}