/**
 * learner-emails — the fixed wording of every automated learner email, and
 * the builders that turn that wording into a message.
 *
 * Imported ONLY by Base44 backend functions. Never imported by src/.
 *
 * The copy objects hold English text with {placeholders}. A caller translates
 * the copy into the learner's language (email-localization.js), then passes it
 * here; the placeholder values — the learner's name, course titles, module
 * labels, URLs and dates — are filled in afterwards, so they always arrive
 * exactly as recorded.
 */

import { fillCopy } from './email-localization.js';

export const SITE_URL = 'https://tamuacademy.org';
const SIGNATURE_NAME = 'Tex Wambui, MPA';

function signatureText(signoff) {
  return `${signoff}
${SIGNATURE_NAME}
Tamu Academy
Voices of Change
${SITE_URL}`;
}

function signatureHtml(signoff) {
  return (
    `<p>${signoff}<br/><strong>${SIGNATURE_NAME}</strong><br/>Tamu Academy<br/>Voices of Change<br/>` +
    `<a href="${SITE_URL}" style="color:#D4A12A;">${SITE_URL}</a></p>`
  );
}

function shell(inner) {
  return `<div style="font-family:Arial,Helvetica,sans-serif;color:#1A130E;line-height:1.7;max-width:600px;">${inner}</div>`;
}

/**
 * The "stop these emails" footer. The link is the learner's own, so one tap
 * turns reminders, check-ins, follow-ups and announcements off for them.
 * Welcome emails and certificates never carry it and never consult it.
 */
function stopFooter(copy, stopUrl) {
  if (!stopUrl) return { text: '', html: '' };
  const line = copy.stopLine || 'You can stop these emails at any time.';
  const label = copy.stopLabel || 'Stop these emails';
  return {
    text: `\n\n${line}\n${label}: ${stopUrl}`,
    html:
      `<p style="margin-top:1.5rem;font-size:0.85em;color:#4a3a2a;">${line}<br/>` +
      `<a href="${stopUrl}" style="color:#D4A12A;">${label}</a></p>`,
  };
}

const startsCourseLine = (title, url, label) =>
  `<p style="margin:0.75rem 0;"><strong style="color:#1A130E;">${title}</strong><br/>` +
  `<a href="${url}" style="color:#D4A12A;">${label}</a></p>`;

// ── Welcome / course start ─────────────────────────────────────────────────
export const WELCOME_COPY = {
  subject: 'Welcome to Tamu Academy \u2014 let\u2019s begin',
  greeting: 'Dear {name},',
  intro:
    'Welcome to Tamu Academy \u2014 thank you for joining our community of learners. We\u2019re glad you\u2019re here.',
  enrolledLead: 'You\u2019re enrolled and ready to begin. Here\u2019s how to start:',
  startModule: 'Start your first module',
  enrolledNote:
    'Each module includes a short lesson, reflection prompts, and a knowledge check. Work at your own pace \u2014 there\u2019s no deadline, and you can return whenever you\u2019re ready.',
  closing: 'We\u2019re with you every step of the way.',
  noEnrollLead:
    'You haven\u2019t enrolled in a course yet, and that\u2019s perfectly okay. Here\u2019s where to begin:',
  exploreCourses: 'Explore our courses',
  catalogueNote:
    'We currently offer {courses}, with more on the way. Each is self-paced and free to start.',
  chooseCourse:
    'When you\u2019re ready, choose the course that speaks to you and begin your first module.',
  signoff: 'Asante,',
};

export function buildWelcomeEmail(copy, { learnerName, enrolledCourses = [], catalogueCourses = '', catalogueUrl }) {
  const firstName = typeof learnerName === 'string' && learnerName.trim()
    ? learnerName.trim().split(' ')[0]
    : 'friend';

  if (enrolledCourses.length > 0) {
    const textCourses = enrolledCourses
      .map((course) => `${course.title}\n${copy.startModule}: ${course.url}`)
      .join('\n\n');

    const htmlCourses = enrolledCourses
      .map((course) => startsCourseLine(course.title, course.url, copy.startModule))
      .join('');

    const text = `${fillCopy(copy.greeting, { name: firstName })}

${copy.intro}

${copy.enrolledLead}

${textCourses}

${copy.enrolledNote}

${copy.closing}

${signatureText(copy.signoff)}`;

    const html = shell(
      `<p>${fillCopy(copy.greeting, { name: firstName })}</p>` +
        `<p>${copy.intro}</p>` +
        `<p>${copy.enrolledLead}</p>` +
        htmlCourses +
        `<p style="color:#4a3a2a;">${copy.enrolledNote}</p>` +
        `<p style="color:#4a3a2a;">${copy.closing}</p>` +
        signatureHtml(copy.signoff)
    );

    return { subject: copy.subject, text, html };
  }

  const text = `${fillCopy(copy.greeting, { name: firstName })}

${copy.intro}

${copy.noEnrollLead}

${copy.exploreCourses}: ${catalogueUrl}

${fillCopy(copy.catalogueNote, { courses: catalogueCourses })}

${copy.chooseCourse}

${signatureText(copy.signoff)}`;

  const html = shell(
    `<p>${fillCopy(copy.greeting, { name: firstName })}</p>` +
      `<p>${copy.intro}</p>` +
      `<p>${copy.noEnrollLead}</p>` +
      `<p><a href="${catalogueUrl}" style="color:#D4A12A;">${copy.exploreCourses}</a></p>` +
      `<p style="color:#4a3a2a;">${fillCopy(copy.catalogueNote, { courses: catalogueCourses })}</p>` +
      `<p style="color:#4a3a2a;">${copy.chooseCourse}</p>` +
      signatureHtml(copy.signoff)
  );

  return { subject: copy.subject, text, html };
}

// ── Progress milestone reminder ────────────────────────────────────────────
export const PROGRESS_COPY = {
  subject: 'Your progress in {course}, {module} is next',
  moduleName: 'Module {n}',
  greeting: 'Dear {name},',
  progress:
    'You\u2019re making real progress. You\u2019ve completed {done} of {total} modules in {course}. Well done.',
  nextStep: 'Your next step is {module}:',
  cta: 'Continue {module}',
  note:
    'There\u2019s no deadline and nothing to catch up on. Take it at your own pace, and write back anytime if a question comes up.',
  stopLine: 'You can stop these emails at any time.',
  stopLabel: 'Stop these emails',
  signoff: 'Asante,',
};

export function buildProgressEmail(copy, { firstName, courseTitle, doneCount, totalCount, nextLabel, url, stopUrl }) {
  const greeting = fillCopy(copy.greeting, { name: firstName });
  const footer = stopFooter(copy, stopUrl);

  const text = `${greeting}

${fillCopy(copy.progress, { done: doneCount, total: totalCount, course: courseTitle })}

${fillCopy(copy.nextStep, { module: nextLabel })}

${url}

${copy.note}

${signatureText(copy.signoff)}${footer.text}`;

  const html = shell(
    `<p>${greeting}</p>` +
      `<p>${fillCopy(copy.progress, { done: doneCount, total: totalCount, course: courseTitle })}</p>` +
      `<p>${fillCopy(copy.nextStep, { module: nextLabel })}</p>` +
      `<p><a href="${url}" style="color:#D4A12A;">${fillCopy(copy.cta, { module: nextLabel })}</a></p>` +
      `<p style="color:#4a3a2a;">${copy.note}</p>` +
      signatureHtml(copy.signoff) +
      footer.html
  );

  return {
    subject: fillCopy(copy.subject, { course: courseTitle, module: nextLabel }),
    text,
    html,
  };
}

// ── Inactive learner check-in ──────────────────────────────────────────────
export const CHECK_IN_COPY = {
  subject: 'A gentle nudge from Tamu Academy \u2014 your journey continues',
  greeting: 'Dear {name},',
  opening: 'It\u2019s been a little while since you last visited Tamu Academy \u2014 and we wanted to check in.',
  reassurance:
    'Learning is a journey, not a race. Life gets busy, and stepping away is natural. What matters is that you come back when you\u2019re ready.',
  whereYouLeftOff:
    'You\u2019re partway through {course}, and your progress is saved. Whenever you\u2019re ready, you can pick up right where you left off:',
  cta: 'Continue your course',
  closing:
    'No pressure, no deadlines \u2014 just an open door. We believe in your capacity to grow, and we\u2019re here whenever you\u2019re ready to take the next step.',
  whereYouLeftOffMany:
    'Here are the courses waiting for you. Your progress is saved in each one, and you can pick any of them up right where you left off:',
  stopLine: 'You can stop these emails at any time.',
  stopLabel: 'Stop these emails',
  signoff: 'Asante,',
};

export function buildCheckInEmail(copy, { learnerName, courseTitle, url, courses = [], stopUrl }) {
  const firstName = typeof learnerName === 'string' && learnerName.trim()
    ? learnerName.trim().split(' ')[0]
    : 'friend';
  const greeting = fillCopy(copy.greeting, { name: firstName });
  const footer = stopFooter(copy, stopUrl);

  // One email for every course the learner has drifted from, so a learner
  // with several courses still hears from us only once.
  const listed = Array.isArray(courses) ? courses.filter((c) => c && c.title && c.url) : [];
  const several = listed.length > 1;

  const where = several
    ? copy.whereYouLeftOffMany || copy.whereYouLeftOff
    : fillCopy(copy.whereYouLeftOff, { course: courseTitle });

  const textCourses = several
    ? listed.map((course) => `${course.title}\n${copy.cta}: ${course.url}`).join('\n\n')
    : url;

  const htmlCourses = several
    ? listed
        .map(
          (course) =>
            `<p style="margin:0.75rem 0;"><strong style="color:#1A130E;">${course.title}</strong><br/>` +
            `<a href="${course.url}" style="color:#D4A12A;">${copy.cta}</a></p>`
        )
        .join('')
    : `<p><a href="${url}" style="color:#D4A12A;">${copy.cta}</a></p>`;

  const text = `${greeting}

${copy.opening}

${copy.reassurance}

${where}

${textCourses}

${copy.closing}

${signatureText(copy.signoff)}${footer.text}`;

  const html = shell(
    `<p>${greeting}</p>` +
      `<p>${copy.opening}</p>` +
      `<p>${copy.reassurance}</p>` +
      `<p>${where}</p>` +
      htmlCourses +
      `<p style="color:#4a3a2a;">${copy.closing}</p>` +
      signatureHtml(copy.signoff) +
      footer.html
  );

  return { subject: copy.subject, text, html };
}

// ── Course celebration and completion follow-up ────────────────────────────
export const CELEBRATION_COPY = {
  subject: 'Congratulations again on completing {course}',
  greeting: 'Dear {name},',
  congratulations:
    'Congratulations again on completing {course}. Finishing a course takes real commitment, and we\u2019re glad you chose to learn with Tamu Academy.',
  certificateIntro:
    'Your certificate is yours to keep and share, and it stays available to you:',
  certificateCta: 'View your certificate',
  twoSteps: 'If you\u2019d like to stay connected, there are two easy next steps.',
  shareTitle: 'Share your experience',
  shareBody:
    'A few words from you help other learners decide whether this course is for them.',
  shareCta: 'Tell us how it went',
  keepTitle: 'Keep learning',
  keepBody: 'Our other course is free and self-paced.',
  keepCta: 'Explore the catalogue',
  thanks: 'Whatever you choose next, thank you for being part of this community.',
  stopLine: 'You can stop these emails at any time.',
  stopLabel: 'Stop these emails',
  signoff: 'Asante,',
};

export function buildCelebrationEmail(copy, { learnerName, courseTitle, certificateLink, storiesLink, coursesLink, stopUrl }) {
  const footer = stopFooter(copy, stopUrl);
  const firstName = typeof learnerName === 'string' && learnerName.trim()
    ? learnerName.trim().split(' ')[0]
    : 'friend';
  const greeting = fillCopy(copy.greeting, { name: firstName });
  const congratulations = fillCopy(copy.congratulations, { course: courseTitle });

  const text = `${greeting}

${congratulations}

${copy.certificateIntro}

${certificateLink}

${copy.twoSteps}

${copy.shareTitle}. ${copy.shareBody}
${storiesLink}

${copy.keepTitle}. ${copy.keepBody}
${coursesLink}

${copy.thanks}

${signatureText(copy.signoff)}

${SITE_URL}${footer.text}`;

  const html = shell(
    `<p>${greeting}</p>` +
      `<p>${congratulations}</p>` +
      `<p>${copy.certificateIntro}</p>` +
      `<p><a href="${certificateLink}" style="color:#D4A12A;">${copy.certificateCta}</a></p>` +
      `<p style="color:#4a3a2a;">${copy.twoSteps}</p>` +
      `<p><strong style="color:#1A130E;">${copy.shareTitle}</strong><br/>${copy.shareBody}<br/>` +
      `<a href="${storiesLink}" style="color:#D4A12A;">${copy.shareCta}</a></p>` +
      `<p><strong style="color:#1A130E;">${copy.keepTitle}</strong><br/>${copy.keepBody}<br/>` +
      `<a href="${coursesLink}" style="color:#D4A12A;">${copy.keepCta}</a></p>` +
      `<p style="color:#4a3a2a;">${copy.thanks}</p>` +
      signatureHtml(copy.signoff) +
      footer.html
  );

  return {
    subject: fillCopy(copy.subject, { course: courseTitle }),
    text,
    html,
  };
}

// ── Certificate issued ─────────────────────────────────────────────────────
export const CERTIFICATE_EMAIL_COPY = {
  subject: 'Your Tamu Academy Certificate \u2014 {course}',
  greeting: 'Dear {name},',
  congratulations:
    'Congratulations on completing {course}! Your certificate of completion is attached to this email as a PDF.',
  access:
    'You can also access it anytime from My Courses after signing in at {site}.',
  signoff: 'Asante for learning with us,',
};

export function buildCertificateEmail(copy, { learnerName, courseTitle }) {
  const firstName = typeof learnerName === 'string' && learnerName.trim()
    ? learnerName.trim().split(' ')[0]
    : 'there';
  const greeting = fillCopy(copy.greeting, { name: firstName });
  const congratulations = fillCopy(copy.congratulations, { course: courseTitle });
  const access = fillCopy(copy.access, { site: SITE_URL });

  const text = `${greeting}

${congratulations}

${access}

${signatureText(copy.signoff)}`;

  const html = shell(
    `<p>${greeting}</p>` +
      `<p>${congratulations}</p>` +
      `<p style="color:#4a3a2a;">${access.replace(
        SITE_URL,
        `<a href="${SITE_URL}" style="color:#D4A12A;">tamuacademy.org</a>`
      )}</p>` +
      signatureHtml(copy.signoff)
  );

  return {
    subject: fillCopy(copy.subject, { course: courseTitle }),
    text,
    html,
  };
}