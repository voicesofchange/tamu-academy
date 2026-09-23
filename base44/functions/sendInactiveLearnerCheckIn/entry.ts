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
  ECONOMICS_CERTIFICATE_COURSE_SLUG,
  ECONOMICS_CERTIFICATE_COURSE_TITLE,
  ECONOMICS_CERTIFICATE_MODULE_ROUTES,
} from '../../shared/economics-course-config.js';
import {
  MENTAL_HEALTH_CERTIFICATE_COURSE_SLUG,
  MENTAL_HEALTH_CERTIFICATE_COURSE_TITLE,
  MENTAL_HEALTH_CERTIFICATE_MODULE_ROUTES,
} from '../../shared/mental-health-certificate.js';
import { buildRawMime, trackingPixel } from '../../shared/gmail-mime.js';

const SITE_URL = 'https://tamuacademy.org';
const FROM_NAME = 'Tex Wambui | Tamu Academy';
const SUBJECT = 'A gentle nudge from Tamu Academy — your journey continues';
const INACTIVITY_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000; // 7 days between check-ins

const COURSE_MAP = {
  [ECONOMICS_CERTIFICATE_COURSE_SLUG]: {
    title: ECONOMICS_CERTIFICATE_COURSE_TITLE,
    firstModuleRoute: ECONOMICS_CERTIFICATE_MODULE_ROUTES[0],
  },
  [MENTAL_HEALTH_CERTIFICATE_COURSE_SLUG]: {
    title: MENTAL_HEALTH_CERTIFICATE_COURSE_TITLE,
    firstModuleRoute: MENTAL_HEALTH_CERTIFICATE_MODULE_ROUTES[0],
  },
};

const resumeUrl = (slug, lastModuleSlug) => {
  if (lastModuleSlug) return `${SITE_URL}/courses/${slug}/${lastModuleSlug}`;
  const c = COURSE_MAP[slug];
  if (c) return `${SITE_URL}/courses/${slug}/${c.firstModuleRoute}`;
  return `${SITE_URL}/courses/${slug}`;
};

const SIGNATURE_TEXT = `Tex Wambui, MPA
Tamu Academy
Voices of Change
https://tamuacademy.org`;

const buildEmail = (learnerName, courseTitle, url) => {
  const firstName = learnerName ? learnerName.split(' ')[0] : 'friend';

  const text = `Dear ${firstName},

It's been a little while since you last visited Tamu Academy — and we wanted to check in.

Learning is a journey, not a race. Life gets busy, and stepping away is natural. What matters is that you come back when you're ready.

You're partway through ${courseTitle}, and your progress is saved. Whenever you're ready, you can pick up right where you left off:

${url}

No pressure, no deadlines — just an open door. We believe in your capacity to grow, and we're here whenever you're ready to take the next step.

Asante,
${SIGNATURE_TEXT}`;

  const html = `<div style="font-family:Arial,Helvetica,sans-serif;color:#1A130E;line-height:1.7;max-width:600px;">
<p>Dear ${firstName},</p>
<p>It's been a little while since you last visited Tamu Academy — and we wanted to check in.</p>
<p>Learning is a journey, not a race. Life gets busy, and stepping away is natural. What matters is that you come back when you're ready.</p>
<p>You're partway through <strong style="color:#1A130E;">${courseTitle}</strong>, and your progress is saved. Whenever you're ready, you can pick up right where you left off:</p>
<p><a href="${url}" style="color:#D4A12A;">Continue your course</a></p>
<p style="color:#4a3a2a;">No pressure, no deadlines — just an open door. We believe in your capacity to grow, and we're here whenever you're ready to take the next step.</p>
<p>Asante,<br/><strong>Tex Wambui, MPA</strong><br/>Tamu Academy<br/>Voices of Change<br/><a href="https://tamuacademy.org" style="color:#D4A12A;">https://tamuacademy.org</a></p>
</div>`;

  return { text, html };
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
      if (!progressMap[key] || new Date(p.updated_at) > new Date(progressMap[key])) {
        progressMap[key] = p.updated_at;
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
      const lastActivity = progressMap[key] || e.enrolled_at;
      if (!lastActivity) continue;
      if (new Date(lastActivity).getTime() > inactiveThreshold) continue;

      if (e.last_check_in_sent_at && new Date(e.last_check_in_sent_at).getTime() > cooldownThreshold) {
        continue;
      }

      const learner = userMap[e.learner_id];
      if (!learner || !learner.email) continue;

      targets.push({ enrollment: e, learner, lastActivity });
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
          course_slug: t.enrollment.course_slug,
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
    for (let i = 0; i < targets.length; i++) {
      const { enrollment, learner } = targets[i];
      const course = COURSE_MAP[enrollment.course_slug];
      const courseTitle = course ? course.title : enrollment.course_slug;
      const url = resumeUrl(enrollment.course_slug, enrollment.last_module_slug);
      const { text, html } = buildEmail(learner.full_name, courseTitle, url);
      const finalHtml = html + trackingPixel(trackingRecords[i].tracking_token);
      const raw = buildRawMime(FROM_NAME, fromEmail, learner.email, SUBJECT, text, finalHtml);
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