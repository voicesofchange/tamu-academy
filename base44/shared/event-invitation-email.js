/**
 * event-invitation-email — the branded "Learning Without Barriers" event
 * invitation, as HTML and plain text.
 *
 * Imported ONLY by Base44 backend functions. Never imported by src/.
 *
 * The wording, links and artwork live here so the sending function only has to
 * decide who receives it. Delivery goes through the app's connected Gmail
 * account (see course-outreach.js), which is why the message is written as
 * email-safe HTML here rather than as a platform template.
 *
 * Visual identity follows the event flyer: cream ground, forest green, gold.
 */

export const EVENT_INVITATION_SUBJECT = 'You are registered: Learning Without Barriers';

const SITE_URL = 'https://tamuacademy.org';
const LOGO_URL =
  'https://media.base44.com/images/public/6a3c91b4c28c3d06e2889307/c6e9f2fb7_logo.png';
const FLYER_URL =
  'https://media.base44.com/images/public/6a3c91b4c28c3d06e2889307/e6915676e_Freecommunitylearningeventflyer.png';
const JOIN_URL = 'https://meet.google.com/brn-zhys-mmd';
const REGISTER_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLScdc28L-GxhlwBYT_bnUbT0401rFs6kquR9E6_EgspFxIfLHA/viewform?usp=header';

/**
 * The address the invitation is sent from. It is a verified alias on the Gmail
 * mailbox connected to this app, so the message leaves from the Voices of
 * Change address and replies arrive in that same inbox.
 */
export const EVENT_FROM_ADDRESS = 'tex@sustainthevoices.org';

const BENEFITS = [
  'Connect with our community',
  'Explore free online courses',
  'Learn at your own pace',
  'Earn a certificate upon successful course completion',
];

const COURSES = [
  {
    title: 'Understanding African Economies and the Global System',
    url: `${SITE_URL}/courses/understanding-african-economies-and-the-global-system`,
    summary: 'Six modules on how African economies work and how they connect to the global system.',
  },
  {
    title: 'Mental Health, Community and Culture',
    url: `${SITE_URL}/courses/mental-health-community-and-culture`,
    summary: 'Seven modules on mental health grounded in African thought and community practice.',
  },
  {
    title: 'Waiyaki wa Hinga: Leadership, Resistance and Historical Memory',
    url: `${SITE_URL}/courses/waiyaki-wa-hinga`,
    summary: 'Five modules on a nineteenth century Kikuyu leader and the record that survives of him.',
  },
  {
    title: 'Building Wealth Together: Money, Enterprise and Community Leadership',
    url: `${SITE_URL}/courses/building-wealth-together`,
    summary: 'Nine modules on household money, small enterprise and shared community risk.',
  },
  {
    title: 'Sauti za Soko: Markets, Climate and Community Power',
    url: `${SITE_URL}/courses/sauti-za-soko`,
    summary: 'Seven modules built with young market vendors in Kiambu.',
  },
];

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

function factCell(label, value) {
  return (
    '<td width="33%" style="padding:22px 12px;text-align:center;vertical-align:top;">' +
    `<div style="font-size:10px;letter-spacing:2px;text-transform:uppercase;font-weight:700;color:#d4af37;padding-bottom:6px;">${label}</div>` +
    `<div style="font-size:15px;line-height:1.4;color:#f7f3e8;">${value}</div>` +
    '</td>'
  );
}

function button(url, label, background, color, block) {
  const display = block ? 'block' : 'inline-block';
  return (
    `<a href="${url}" style="display:${display};text-align:center;background:${background};color:${color};` +
    `border-radius:24px;padding:14px 22px;font-size:15px;font-weight:700;text-decoration:none;">${label}</a>`
  );
}

function sectionLabel(text) {
  return (
    '<div style="background:#283e29;color:#f7f3e8;font-size:11px;letter-spacing:2px;' +
    `text-transform:uppercase;font-weight:700;padding:10px 14px;border-radius:6px;">${text}</div>`
  );
}

function benefitCard(text) {
  return (
    '<div style="background:#ffffff;border:1px solid #e6dcc4;border-radius:14px;padding:18px;' +
    'margin-bottom:12px;font-size:15px;line-height:1.5;color:#283e29;">' +
    `<span style="color:#d4af37;">&#9670;</span>&nbsp; ${text}</div>`
  );
}

function courseCard(course) {
  return (
    '<div class="course" style="background:#ffffff;border:1px solid #e6dcc4;border-left:3px solid #d4af37;' +
    'border-radius:14px;padding:16px 18px;margin-bottom:12px;font-size:15px;line-height:1.55;">' +
    `<a href="${course.url}" style="color:#283e29;text-decoration:none;font-weight:700;">${course.title}</a><br/>` +
    `<span style="color:#3f5140;font-size:14px;">${course.summary}</span></div>`
  );
}

/** The invitation as email-safe HTML. */
export function buildEventInvitationHtml({ firstName } = {}) {
  const name = greetingName(firstName);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${EVENT_INVITATION_SUBJECT}</title>
<style>
  body { margin:0; padding:0; background:#f7f3e8; }
  a { color:#8a6a15; }
  .course a { color:#283e29; text-decoration:none; font-weight:700; }
  @media (max-width:600px) {
    .stack { display:block !important; width:100% !important; padding:0 0 12px 0 !important; }
    .hero { font-size:32px !important; line-height:1.12 !important; }
    .gutter { padding-left:20px !important; padding-right:20px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:#f7f3e8;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f7f3e8;">
<tr><td align="center" style="padding:28px 12px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;font-family:'DM Sans',Helvetica,Arial,sans-serif;">

<tr><td class="gutter" style="background:#283e29;border-radius:24px 24px 0 0;padding:28px 32px 22px;text-align:center;">
  <img src="${LOGO_URL}" alt="Tamu Academy" width="44" style="display:inline-block;width:44px;height:auto;border:0;" />
  <div style="font-size:12px;letter-spacing:4px;font-weight:700;text-transform:uppercase;color:#f7f3e8;padding:12px 0 14px;">Tamu Academy</div>
  <div style="width:64px;height:1px;background:#d4af37;margin:0 auto;"></div>
</td></tr>

<tr><td class="gutter" style="padding:38px 32px 22px;text-align:center;">
  <div style="font-size:11px;letter-spacing:3px;text-transform:uppercase;font-weight:700;color:#8a6a15;padding-bottom:12px;">Voices of Change and Tamu Academy</div>
  <div class="hero" style="font-family:'Cormorant Garamond',Georgia,serif;font-weight:700;font-size:44px;line-height:1.08;color:#283e29;padding-bottom:14px;">Learning Without Barriers.</div>
  <div style="font-size:17px;line-height:1.55;color:#3f5140;">A Voices of Change community learning event in partnership with Tamu Academy.</div>
</td></tr>

<tr><td class="gutter" style="padding:4px 32px 26px;text-align:center;">
  <img src="${FLYER_URL}" alt="Learning Without Barriers: a free community learning event flyer with the event date, time and courses" width="536" style="display:block;width:100%;max-width:536px;height:auto;border:1px solid #d4af37;border-radius:14px;" />
</td></tr>

<tr><td class="gutter" style="padding:0 32px 18px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#283e29;border-radius:18px;">
    <tr>
      ${factCell('Date', 'Saturday<br/>21 November 2026')}
      ${factCell('Time', '9:00 AM<br/>East Africa Time')}
      ${factCell('Cost', 'Free<br/>open to all')}
    </tr>
  </table>
</td></tr>

<tr><td class="gutter" style="padding:0 32px 18px;text-align:center;font-size:14px;color:#3f5140;">Speaker: Tex Wambui, MPA. Hosted on Google Meet.</td></tr>

<tr><td class="gutter" style="padding:0 32px 26px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td class="stack" width="50%" style="padding-right:6px;">${button(JOIN_URL, 'Join on Google Meet', '#283e29', '#f7f3e8', true)}</td>
      <td class="stack" width="50%" style="padding-left:6px;">${button(REGISTER_URL, 'Register for the event', '#d9a02d', '#283e29', true)}</td>
    </tr>
  </table>
</td></tr>

<tr><td class="gutter" style="padding:0 32px 26px;font-size:16px;line-height:1.75;color:#283e29;">
  <p style="margin:0 0 14px;">Thank you, ${name}. Your place is registered, and we are looking forward to meeting you.</p>
  <p style="margin:0 0 14px;">This registration form is how people sign up for the event. If you would like to bring a colleague, a friend or a family member along, share it with them.</p>
  <p style="margin:0;">Tamu Academy is a free online learning platform developed through Waiyaki House. Our courses are open now, so you are welcome to create a free learner account and begin at your own pace before we meet.</p>
</td></tr>

<tr><td class="gutter" style="padding:0 32px 16px;">${sectionLabel('Benefits')}</td></tr>
<tr><td class="gutter" style="padding:0 32px;">${BENEFITS.map(benefitCard).join('')}</td></tr>

<tr><td class="gutter" style="padding:12px 32px 16px;">${sectionLabel('Featured courses')}</td></tr>
<tr><td class="gutter" style="padding:0 32px 14px;font-size:14px;color:#3f5140;">These courses are open now, and every one of them is free.</td></tr>
<tr><td class="gutter" style="padding:0 32px;">${COURSES.map(courseCard).join('')}</td></tr>

<tr><td class="gutter" style="padding:14px 32px 26px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff;border:1px solid #e6dcc4;border-radius:16px;">
    <tr><td style="padding:22px;">
      ${sectionLabel('Your free account')}
      <p style="margin:18px 0;font-size:16px;line-height:1.75;color:#283e29;">The course pages are open to read. To enrol and work through the lessons, create a free learner account.</p>
      ${button(`${SITE_URL}/register`, 'Create a free account', '#d9a02d', '#283e29', true)}
      <p style="margin:18px 0 0;font-size:14px;line-height:1.7;color:#3f5140;">Once you are signed in, the <a href="${SITE_URL}/learners-guide">Learner's Guide</a> walks you through the platform and how to study.</p>
    </td></tr>
  </table>
</td></tr>

<tr><td class="gutter" style="padding:0 32px 30px;font-size:16px;line-height:1.75;color:#283e29;">
  <p style="margin:0 0 14px;">During the session we will introduce Voices of Change and Tamu Academy, talk through the courses that are open now, and look ahead to what is coming.</p>
  <p style="margin:0 0 14px;">We look forward to seeing you there.</p>
  <p style="margin:16px 0 0;">Warm regards,<br/><strong>Tex Wambui, MPA</strong><br/>Tamu Academy and Voices of Change</p>
</td></tr>

<tr><td class="gutter" style="background:#283e29;border-radius:0 0 24px 24px;padding:26px 32px 28px;text-align:center;">
  <div style="width:64px;height:1px;background:#d4af37;margin:0 auto 16px;"></div>
  <div style="font-family:'Cormorant Garamond',Georgia,serif;font-weight:700;font-size:18px;color:#f7f3e8;">Tamu Academy</div>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

/** The same invitation for readers whose mail client shows plain text. */
export function buildEventInvitationText({ firstName } = {}) {
  const raw = typeof firstName === 'string' ? firstName.trim() : '';
  const name = raw || 'friend';

  const courseLines = COURSES.map((course) => `- ${course.title}\n  ${course.summary}\n  ${course.url}`).join(
    '\n'
  );
  const benefitLines = BENEFITS.map((benefit) => `- ${benefit}`).join('\n');

  return `Learning Without Barriers.
A Voices of Change community learning event in partnership with Tamu Academy.

Thank you, ${name}. Your place is registered, and we are looking forward to meeting you.

EVENT DETAILS
Date: Saturday, 21 November 2026
Time: 9:00 AM East Africa Time
Platform: Google Meet
Speaker: Tex Wambui, MPA
Cost: Free and open to all

Join on Google Meet: ${JOIN_URL}

This registration form is how people sign up for the event. If you would like to bring a colleague, a friend or a family member along, share it with them:
${REGISTER_URL}

BENEFITS
${benefitLines}

FEATURED COURSES
These courses are open now, and every one of them is free.
${courseLines}

YOUR FREE ACCOUNT
The course pages are open to read. To enrol and work through the lessons, create a free learner account:
${SITE_URL}/register

Once you are signed in, the Learner's Guide walks you through the platform:
${SITE_URL}/learners-guide

Tamu Academy is a free online learning platform developed through Waiyaki House. Our courses are open now, so you are welcome to create a free learner account and begin at your own pace before we meet.

During the session we will introduce Voices of Change and Tamu Academy, talk through the courses that are open now, and look ahead to what is coming.

We look forward to seeing you there.

Warm regards,
Tex Wambui, MPA
Tamu Academy and Voices of Change
${SITE_URL}`;
}