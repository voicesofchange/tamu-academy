/**
 * sendInactiveLearnerCheckIn — finds learners with an active course
 * enrollment who have been inactive for more than 7 days (no ModuleProgress
 * update in that window) and sends them a motivational check-in email from
 * sustainthevoices@gmail.com (display name "Tex Wambui | Tamu Academy").
 *
 * A 7-day cooldown per enrollment (tracked via last_check_in_sent_at on
 * CourseEnrollment) prevents the same learner from receiving more than one
 * check-in per week.
 *
 * Invocation modes:
 *   1. Admin (dashboard): authenticated admin can run a dry_run to preview.
 *   2. Workflow (scheduled): unauthenticated call from the daily workflow.
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

const SITE_URL = 'https://tamuacademy.org';
const FROM_NAME = 'Tex Wambui | Tamu Academy';
const INACTIVITY_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000; // 7 days between check-ins

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
    const enrollments = await base44.asServiceRole.entities.CourseEnrollment.filter({
      status: 'active',
    });

    const allProgress = await base44.asServiceRole.entities.ModuleProgress.list();
    const progressMap = {};
    for (const p of allProgress || []) {
      const key = `${p.learner_id}|${p.course_slug}`;
      const touched = p.updated_at || p.updated_date || p.created_date;
      if (!touched) continue;
      const current = progressMap[key];
      if (!current || new Date(touched) > new Date(current.touched)) {
        progressMap[key] = { touched, module_slug: p.module_slug };
      }
    }

    const users = await base44.asServiceRole.entities.User.list();
    const userMap = {};
    for (const u of users || []) userMap[u.id] = u;

    // --- Determine inactive targets ---
    const now = Date.now();
    const inactiveThreshold = now - INACTIVITY_MS;
    const cooldownThreshold = now - COOLDOWN_MS;
    const targets = [];

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

      // The module they last touched is the truest place to resume, with the
      // enrollment's saved slug as a fallback for older records.
      const lastModule = progressMap[key]?.module_slug || e.last_module_slug || null;

      targets.push({ enrollment: e, learner, lastActivity, lastModule });
    }

    if (dryRun) {
      return Response.json({
        dry_run: true,
        eligible_count: targets.length,
        sender: fromEmail,
        targets: targets.map((t) => ({
          learner_id: t.learner.id,
          email: t.learner.email,
          name: t.learner.full_name,
          language: learnerLanguage(t.learner),
          course_slug: t.enrollment.course_slug,
          last_module: t.lastModule,
          last_activity: t.lastActivity,
          last_check_in: t.enrollment.last_check_in_sent_at || null,
        })),
      });
    }

    if (targets.length === 0) {
      return Response.json({ sent: 0, failed: 0, eligible: 0, sender: fromEmail });
    }

    // --- Create tracking records ---
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
      const { enrollment, learner, lastModule } = targets[i];
      const config = getCourseConfig(enrollment.course_slug);
      const courseTitle = config ? config.title : enrollment.course_slug;
      const url = resumeUrl(enrollment.course_slug, lastModule);
      const copy = await copyFor(learnerLanguage(learner), CHECK_IN_COPY);
      const { subject, text, html } = buildCheckInEmail(copy, {
        learnerName: learner.full_name,
        courseTitle,
        url,
      });
      const finalHtml = html + trackingPixel(trackingRecords[i].tracking_token);
      const raw = buildRawMime(FROM_NAME, fromEmail, learner.email, subject, text, finalHtml);
      try {
        const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
          method: 'POST',
          headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ raw }),
        });
        if (res.ok) {
          sent++;
          await base44.asServiceRole.entities.CourseEnrollment.update(enrollment.id, {
            last_check_in_sent_at: nowIso,
          });
        } else {
          failed++;
          errors.push({ email: learner.email, error: 'Gmail send failed' });
        }
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
      errors,
    });
  } catch (error) {
    console.error('[sendInactiveLearnerCheckIn] error:', error.message);
    return Response.json({ error: 'An error occurred.' }, { status: 500 });
  }
}