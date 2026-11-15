/**
 * event-reminder-email — the "the event is nearly here" reminder for
 * "Learning Without Barriers: Voices of Change and Tamu Academy", as HTML and
 * plain text.
 *
 * Imported ONLY by Base44 backend functions. Never imported by src/.
 *
 * The wording lives in EVENT_REMINDER_COPY, which is sent to the translator
 * when a recipient reads another language (see email-localization.js). Event
 * facts (date, time, speaker, join link) are never translated, so the details
 * always match the invitation and the flyer.
 *
 * Visual identity follows the invitation: cream ground, forest green, gold.
 */

export const EVENT_REMINDER_SUBJECT = 'This Saturday: Learning Without Barriers';

const SITE_URL = 'https://tamuacademy.org';
const LOGO_URL =
  'https://media.base44.com/images/public/6a3c91b4c28c3d06e2889307/c6e9f2fb7_logo.png';

/** Event facts. Never translated. */
const EVENT_FACTS = {
  date: 'Saturday 21 November 2026',
  time: '9:00 AM East Africa Time',
  speaker: 'Tex Wambui, MPA',
  joinUrl: 'https://meet.google.com/brn-zhys-mmd',
};

/** Every translatable string of the reminder, as flat keys. */
export const EVENT_REMINDER_COPY = {
  subject: EVENT_REMINDER_SUBJECT,
  eyebrow: 'Voices of Change and Tamu Academy',
  headline: 'See you this Saturday.',
  deck: 'Learning Without Barriers is almost here, and your place is registered.',
  dateLabel: 'Date',
  timeLabel: 'Time',
  speakerLabel: 'Speaker',
  coverLabel: "What we'll cover",
  cover1: 'A welcome from Voices of Change and Tamu Academy, and how the two work together.',
  cover2: 'The courses that are open now, what each one teaches and how to enrol.',
  cover3: 'What is being built next, including the programmes still in development.',
  cover4: 'Time for your questions, and how to keep studying after the session.',
  joinCta: 'Join on Google Meet',
  joinNote:
    'The session is on Google Meet. You can join from a phone, a laptop or a community centre computer, and you do not need an account to join.',
  noteBody:
    'The event is free and open to all. Nothing needs to be prepared beforehand, and there is no cost to attend.',
  coursesNote:
    'Every course on the platform is free to read. To enrol and work through the lessons, create a free learner account at {site}.',
  closing: 'We look forward to seeing you there.',
  regards: 'Warm regards,',
  signoff: 'Tex Wambui, MPA',
  signoffNote: 'Voices of Change and Tamu Academy',
  textDetails: 'EVENT DETAILS',
  textCover: "WHAT WE'LL COVER",
  textJoin: 'Join on Google Meet',
};

/** The greeting name, kept safe for HTML. */
function greetingName(firstName) {
  const raw = typeof firstName === 'string' ? firstName.trim() : '';
  const name = raw || 'friend';
  return name
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Fill {placeholders} in translated copy. */
function fill(template, vars = {}) {
  return String(template == null ? '' : template).replace(/\{(\w+)\}/g, (match, key) =>
    Object.prototype.hasOwnProperty.call(vars, key) ? String(vars[key]) : match
  );
}

function factCell(label, value) {
  return (
    '<td width="33%" style="padding:18px 10px;text-align:center;vertical-align:top;">' +
    `<div style="font-size:10px;letter-spacing:2px;text-transform:uppercase;font-weight:700;color:#d4af37;padding-bottom:6px;">${label}</div>` +
    `<div style="font-size:15px;line-height:1.4;color:#f7f3e8;">${value}</div>` +
    '</td>'
  );
}

function coverRow(text) {
  return (
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:10px;">' +
    '<tr>' +
    '<td width="22" valign="top" style="color:#d4af37;font-size:15px;line-height:1.6;">&#9670;</td>' +
    `<td style="color:#283e29;font-size:15px;line-height:1.6;">${text}</td>` +
    '</tr></table>'
  );
}

/** The reminder as email-safe HTML. */
export function buildEventReminderHtml({ firstName, copy = EVENT_REMINDER_COPY, language = 'en' } = {}) {
  const name = greetingName(firstName);
  const cover = [copy.cover1, copy.cover2, copy.cover3, copy.cover4];
  const coursesNote = fill(copy.coursesNote, { site: `<a href="${SITE_URL}" style="color:#8a6a15;">${SITE_URL.replace('https://', '')}</a>` });

  return `<!DOCTYPE html>
<html lang="${language}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${copy.subject}</title>
<style>
  body { margin:0; padding:0; background:#f7f3e8; }
  a { color:#8a6a15; }
  @media (max-width:600px) {
    .stack { display:block !important; width:100% !important; padding:0 0 10px 0 !important; }
    .hero { font-size:30px !important; line-height:1.14 !important; }
    .gutter { padding-left:20px !important; padding-right:20px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:#f7f3e8;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${copy.deck}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f7f3e8;">
<tr><td align="center" style="padding:0;">

<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background:#f7f3e8;">

  <tr><td style="background:#283e29;padding:18px 28px;text-align:center;">
    <img src="${LOGO_URL}" alt="Tamu Academy" width="132" style="display:inline-block;border:0;max-width:132px;height:auto;" />
    <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#d4af37;font-weight:700;padding-top:10px;">${copy.eyebrow}</div>
  </td></tr>

  <tr><td class="gutter" style="padding:32px 36px 8px;text-align:center;">
    <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#8a6a15;font-weight:700;padding-bottom:12px;">${copy.dateLabel}: ${EVENT_FACTS.date}</div>
    <h1 class="hero" style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:38px;line-height:1.12;font-weight:400;color:#283e29;letter-spacing:-0.5px;">${copy.headline}</h1>
    <p style="margin:14px 0 0;font-size:16px;line-height:1.6;color:#3f5140;">${copy.deck}</p>
  </td></tr>

  <tr><td class="gutter" style="padding:24px 36px 4px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#283e29;border-radius:16px;">
      <tr>
        ${factCell(copy.dateLabel, EVENT_FACTS.date)}
        ${factCell(copy.timeLabel, EVENT_FACTS.time)}
        ${factCell(copy.speakerLabel, EVENT_FACTS.speaker)}
      </tr>
    </table>
  </td></tr>

  <tr><td class="gutter" style="padding:26px 36px 0;">
    <p style="margin:0 0 8px;font-size:17px;line-height:1.6;color:#283e29;">Hello ${name},</p>
    <div style="background:#f7f3e8;border:1px solid #e6dcc4;border-radius:14px;padding:18px 20px;margin:14px 0 22px;">
      <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;font-weight:700;color:#8a6a15;padding-bottom:10px;">${copy.coverLabel}</div>
      ${cover.map(coverRow).join('')}
    </div>
  </td></tr>

  <tr><td class="gutter" style="padding:0 36px;text-align:center;">
    <a href="${EVENT_FACTS.joinUrl}" style="display:inline-block;text-align:center;background:#d4af37;color:#283e29;border-radius:24px;padding:15px 30px;font-size:16px;font-weight:700;text-decoration:none;">${copy.joinCta}</a>
    <p style="margin:14px 0 0;font-size:13px;line-height:1.6;color:#3f5140;">${copy.joinNote}</p>
  </td></tr>

  <tr><td class="gutter" style="padding:24px 36px 0;">
    <p style="margin:0 0 12px;font-size:15px;line-height:1.65;color:#3f5140;">${copy.noteBody}</p>
    <p style="margin:0;font-size:15px;line-height:1.65;color:#3f5140;">${coursesNote}</p>
  </td></tr>

  <tr><td class="gutter" style="padding:22px 36px 34px;">
    <p style="margin:0 0 4px;font-size:15px;line-height:1.65;color:#283e29;">${copy.closing}</p>
    <p style="margin:14px 0 2px;font-size:15px;line-height:1.6;color:#3f5140;">${copy.regards}</p>
    <p style="margin:0;font-size:15px;line-height:1.6;color:#283e29;font-weight:700;">${copy.signoff}</p>
    <p style="margin:2px 0 0;font-size:13px;line-height:1.6;color:#6b7a6c;">${copy.signoffNote}</p>
  </td></tr>

  <tr><td style="background:#283e29;padding:18px 28px;text-align:center;">
    <div style="font-size:12px;line-height:1.6;color:#cfd8cf;">${copy.signoffNote}</div>
    <div style="font-size:12px;line-height:1.6;color:#cfd8cf;padding-top:4px;"><a href="${SITE_URL}" style="color:#d4af37;text-decoration:none;">${SITE_URL.replace('https://', '')}</a></div>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

/** The reminder as plain text, for clients that do not render HTML. */
export function buildEventReminderText({ firstName, copy = EVENT_REMINDER_COPY } = {}) {
  const raw = typeof firstName === 'string' ? firstName.trim() : '';
  const name = raw || 'friend';

  return [
    `Hello ${name},`,
    '',
    `${copy.headline} ${copy.deck}`,
    '',
    copy.textDetails,
    `${copy.dateLabel}: ${EVENT_FACTS.date}`,
    `${copy.timeLabel}: ${EVENT_FACTS.time}`,
    `${copy.speakerLabel}: ${EVENT_FACTS.speaker}`,
    '',
    copy.textCover,
    `- ${copy.cover1}`,
    `- ${copy.cover2}`,
    `- ${copy.cover3}`,
    `- ${copy.cover4}`,
    '',
    `${copy.textJoin}: ${EVENT_FACTS.joinUrl}`,
    copy.joinNote,
    '',
    copy.noteBody,
    '',
    fill(copy.coursesNote, { site: SITE_URL }),
    '',
    copy.closing,
    '',
    copy.regards,
    copy.signoff,
    copy.signoffNote,
  ].join('\n');
}