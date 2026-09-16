/**
 * sendLearnerWelcome — sends a personalized welcome + motivation email
 * to registered learners from sustainthevoices@gmail.com (display name
 * "Tex Wambui | Tamu Academy").
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

const SITE_URL = 'https://tamuacademy.org';
const FROM_NAME = 'Tex Wambui | Tamu Academy';
const SUBJECT = 'Welcome to Tamu Academy — let\u2019s begin';

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

const SIGNATURE_TEXT = `Tex Wambui, MPA
Tamu Academy
Voices of Change
https://tamuacademy.org`;

const buildEmail = (learnerName, enrollments) => {
  const firstName = learnerName ? learnerName.split(' ')[0] : 'friend';
  const hasEnrollments = enrollments.length > 0;

  if (hasEnrollments) {
    const courseLines = enrollments.map((e) => {
      const c = COURSE_MAP[e.course_slug];
      const title = c ? c.title : e.course_slug;
      return { title, url: firstModuleUrl(e.course_slug) };
    });

    const textCourses = courseLines
      .map((c) => `${c.title}\nStart here: ${c.url}`)
      .join('\n\n');

    const htmlCourses = courseLines
      .map(
        (c) =>
          `<p style="margin:0.75rem 0;"><strong style="color:#1A130E;">${c.title}</strong><br/><a href="${c.url}" style="color:#D4A12A;">Start your first module</a></p>`
      )
      .join('');

    const text = `Dear ${firstName},

Welcome to Tamu Academy — thank you for joining our community of learners. We're glad you're here.

You're enrolled and ready to begin. Here's how to start:

${textCourses}

Each module includes a short lesson, reflection prompts, and a knowledge check. Work at your own pace — there's no deadline, and you can return whenever you're ready.

We're with you every step of the way.

Asante,
${SIGNATURE_TEXT}`;

    const html = `<div style="font-family:Arial,Helvetica,sans-serif;color:#1A130E;line-height:1.7;max-width:600px;">
<p>Dear ${firstName},</p>
<p>Welcome to Tamu Academy — thank you for joining our community of learners. We're glad you're here.</p>
<p>You're enrolled and ready to begin. Here's how to start:</p>
${htmlCourses}
<p style="color:#4a3a2a;">Each module includes a short lesson, reflection prompts, and a knowledge check. Work at your own pace — there's no deadline, and you can return whenever you're ready.</p>
<p style="color:#4a3a2a;">We're with you every step of the way.</p>
<p>Asante,<br/><strong>Tex Wambui, MPA</strong><br/>Tamu Academy<br/>Voices of Change<br/><a href="https://tamuacademy.org" style="color:#D4A12A;">https://tamuacademy.org</a></p>
</div>`;

    return { text, html };
  }

  const coursesUrl = `${SITE_URL}/courses`;
  const text = `Dear ${firstName},

Welcome to Tamu Academy — thank you for joining our community of learners. We're glad you're here.

You haven't enrolled in a course yet, and that's perfectly okay. Here's where to begin:

Explore our courses: ${coursesUrl}

We currently offer two courses — Understanding African Economies and the Global System, and Mental Health, Community and Culture — with more on the way. Each is self-paced and free to start.

When you're ready, choose the course that speaks to you and begin your first module.

Asante,
${SIGNATURE_TEXT}`;

  const html = `<div style="font-family:Arial,Helvetica,sans-serif;color:#1A130E;line-height:1.7;max-width:600px;">
<p>Dear ${firstName},</p>
<p>Welcome to Tamu Academy — thank you for joining our community of learners. We're glad you're here.</p>
<p>You haven't enrolled in a course yet, and that's perfectly okay. Here's where to begin:</p>
<p><a href="${coursesUrl}" style="color:#D4A12A;">Explore our courses</a></p>
<p style="color:#4a3a2a;">We currently offer two courses — Understanding African Economies and the Global System, and Mental Health, Community and Culture — with more on the way. Each is self-paced and free to start.</p>
<p style="color:#4a3a2a;">When you're ready, choose the course that speaks to you and begin your first module.</p>
<p>Asante,<br/><strong>Tex Wambui, MPA</strong><br/>Tamu Academy<br/>Voices of Change<br/><a href="https://tamuacademy.org" style="color:#D4A12A;">https://tamuacademy.org</a></p>
</div>`;

  return { text, html };
};

export default async function (req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);

    const body = await req.json().catch(() => ({}));
    const dryRun = body.dry_run === true;
    const targetLearnerId = body.learner_id || null;

    // --- Authentication / Authorization ---
    let user = null;
    try {
      user = await base44.auth.me();
    } catch (_) {
      user = null;
    }

    if (user) {
      // Authenticated direct call — admin only.
      if (user.role !== 'admin') {
        return Response.json({ error: 'Forbidden' }, { status: 403 });
      }
    } else {
      // Unauthenticated call (workflow path) — must pass a data integrity
      // check: a CourseEnrollment record must exist for the given learner.
      if (!targetLearnerId) {
        return Response.json({ error: 'Forbidden' }, { status: 403 });
      }
      const enrollments = await base44.asServiceRole.entities.CourseEnrollment.filter({
        learner_id: targetLearnerId,
      }).catch(() => []);
      if (!enrollments || enrollments.length === 0) {
        return Response.json({ error: 'Forbidden' }, { status: 403 });
      }
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
    let sent = 0;
    let failed = 0;
    const errors = [];
    for (let i = 0; i < recipients.length; i++) {
      const learner = recipients[i];
      const learnerEnrollments = enrollmentsByLearner[learner.id] || [];
      const { text, html } = buildEmail(learner.full_name, learnerEnrollments);
      const finalHtml = html + trackingPixel(records[i].tracking_token);
      const raw = buildRawMime(FROM_NAME, fromEmail, learner.email, SUBJECT, text, finalHtml);
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