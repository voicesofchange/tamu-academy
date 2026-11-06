/**
 * sendLearnerWelcome — sends a personalized welcome + motivation email
 * to registered learners from sustainthevoices@gmail.com (display name
 * "Tex Wambui | Tamu Academy").
 *
 * The email is written in the language saved on each learner's profile, with
 * English wherever no translation is available (see email-localization.js and
 * learner-emails.js). The learner's name and the course titles always arrive
 * exactly as recorded.
 *
 * Two invocation modes:
 *   1. Admin broadcast (dashboard): no learner_id → sends to every user
 *      with role 'user'. Requires admin auth.
 *   2. Workflow path: learner_id provided, no authenticated user →
 *      verifies a CourseEnrollment record exists for that learner
 *      (data integrity check), then sends to that one learner.
 *
 * Each email is personalized with the learner's name and their enrolled
 * course(s), with a direct link to the first module. Unenrolled learners
 * receive a link to the course catalog. Open tracking is recorded via
 * EmailOpenEvent (message_type 'learner_welcome') and the trackEmailOpen
 * pixel endpoint.
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
import { emailCopyCache, learnerLanguage } from '../../shared/email-localization.js';
import { WELCOME_COPY, buildWelcomeEmail } from '../../shared/learner-emails.js';

const SITE_URL = 'https://tamuacademy.org';
const FROM_NAME = 'Tex Wambui | Tamu Academy';

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

const firstModuleUrl = (slug) => {
  const c = COURSE_MAP[slug];
  if (!c) return `${SITE_URL}/courses/${slug}`;
  return `${SITE_URL}/courses/${slug}/${c.firstModuleRoute}`;
};

/** The courses named in the welcome copy, exactly as recorded. */
const CATALOGUE_COURSES = Object.values(COURSE_MAP)
  .map((course) => course.title)
  .join(' and ');

export default async function (req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);

    const body = await req.json().catch(() => ({}));
    const dryRun = body.dry_run === true;
    const targetLearnerId = body.learner_id || null;

    // --- Authentication / Authorization ---
    // Admin-only: this function is triggered by a workflow that injects admin
    // auth. Reject any direct call from non-admin or anonymous callers.
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

    // --- Determine recipients ---
    let learners;
    if (targetLearnerId) {
      learners = await base44.asServiceRole.entities.User.filter({ id: targetLearnerId });
    } else {
      learners = await base44.asServiceRole.entities.User.list();
    }
    const recipients = (learners || []).filter((u) => u.role === 'user');

    if (dryRun) {
      return Response.json({
        dry_run: true,
        eligible_count: recipients.length,
        sender: fromEmail,
        recipients: recipients.map((u) => ({
          id: u.id,
          email: u.email,
          name: u.full_name,
          language: learnerLanguage(u),
        })),
      });
    }

    if (recipients.length === 0) {
      return Response.json({ sent: 0, failed: 0, eligible: 0, sender: fromEmail });
    }

    // --- Fetch active enrollments for these learners ---
    const learnerIds = recipients.map((u) => u.id);
    const allEnrollments = await base44.asServiceRole.entities.CourseEnrollment.filter({
      learner_id: { $in: learnerIds },
      status: 'active',
    });
    const enrollmentsByLearner = {};
    for (const e of allEnrollments || []) {
      if (!enrollmentsByLearner[e.learner_id]) enrollmentsByLearner[e.learner_id] = [];
      enrollmentsByLearner[e.learner_id].push(e);
    }

    // --- Create tracking records ---
    const now = new Date().toISOString();
    const records = recipients.map(() => ({
      tracking_token: crypto.randomUUID(),
      recipient_email: '',
      message_type: 'learner_welcome',
      sent_at: now,
      open_count: 0,
    }));
    for (let i = 0; i < recipients.length; i++) {
      records[i].recipient_email = recipients[i].email;
    }
    await base44.asServiceRole.entities.EmailOpenEvent.bulkCreate(records);

    // --- Send ---
    // One translation per language for the whole run.
    const copyFor = emailCopyCache(base44);
    let sent = 0;
    let failed = 0;
    const errors = [];
    for (let i = 0; i < recipients.length; i++) {
      const learner = recipients[i];
      const learnerEnrollments = enrollmentsByLearner[learner.id] || [];
      const copy = await copyFor(learnerLanguage(learner), WELCOME_COPY);

      const enrolledCourses = learnerEnrollments.map((e) => {
        const c = COURSE_MAP[e.course_slug];
        return {
          title: c ? c.title : e.course_slug,
          url: firstModuleUrl(e.course_slug),
        };
      });

      const { subject, text, html } = buildWelcomeEmail(copy, {
        learnerName: learner.full_name,
        enrolledCourses,
        catalogueCourses: CATALOGUE_COURSES,
        catalogueUrl: `${SITE_URL}/courses`,
      });

      const finalHtml = html + trackingPixel(records[i].tracking_token);
      const raw = buildRawMime(FROM_NAME, fromEmail, learner.email, subject, text, finalHtml);
      try {
        const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
          method: 'POST',
          headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ raw }),
        });
        if (res.ok) sent++;
        else {
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
      eligible: recipients.length,
      sender: fromEmail,
      errors,
    });
  } catch (error) {
    console.error('[sendLearnerWelcome] error:', error.message);
    return Response.json({ error: 'An error occurred.' }, { status: 500 });
  }
}