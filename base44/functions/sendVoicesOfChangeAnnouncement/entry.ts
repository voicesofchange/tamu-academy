import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';

// Public site URL used in the email body.
const SITE_URL = 'https://tamuacademy.org';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_RECIPIENTS = 200;

const COURSES_URL = `${SITE_URL}/courses`;
const ECONOMICS_URL = `${SITE_URL}/courses/understanding-african-economies-and-the-global-system`;
const MH_URL = `${SITE_URL}/courses/mental-health-community-and-culture`;

const buildEmail = (opening) => {
  const text = `Hello,

${opening}

Understanding African Economies and the Global System
Start this course: ${ECONOMICS_URL}

Ubuntu Mental Health: Mental Health, Community and Culture
Start this course: ${MH_URL}

Both courses are open now — explore and start learning today. More learning areas are on the way, spanning economics, governance, technology, wellbeing, history, and global affairs, all grounded in African thought and experience.

Explore everything at ${COURSES_URL}.

Asante,
The Tamu Academy Team
An extension of the Voices of Change education platform`;

  const html = `<div style="font-family:Arial,Helvetica,sans-serif;color:#1A130E;line-height:1.7;">
<p>Hello,</p>
<p>${opening}</p>
<p><strong>Understanding African Economies and the Global System</strong><br/><a href="${ECONOMICS_URL}" style="color:#D4A12A;">Start this course</a></p>
<p><strong>Ubuntu Mental Health: Mental Health, Community and Culture</strong><br/><a href="${MH_URL}" style="color:#D4A12A;">Start this course</a></p>
<p>Both courses are open now — explore and start learning today. More learning areas are on the way, spanning economics, governance, technology, wellbeing, history, and global affairs, all grounded in African thought and experience.</p>
<p>Explore everything at <a href="${COURSES_URL}" style="color:#D4A12A;">tamuacademy.org/courses</a>.</p>
<p>Asante,<br/>The Tamu Academy Team<br/>An extension of the Voices of Change education platform</p>
</div>`;

  return { text, html };
};

const MESSAGES = {
  announcement: {
    subject: 'Tamu Academy courses are now live',
    ...buildEmail("We're reaching out personally because you've been part of our journey — thank you. We're excited to share some news: Tamu Academy, an extension of the Voices of Change education platform, is now live with its first courses."),
  },
  follow_up: {
    subject: 'A reminder: Tamu Academy courses are now live',
    ...buildEmail("We're writing to you again because you've been part of our journey — and we'd love for you to join in. As a reminder, Tamu Academy, an extension of the Voices of Change education platform, is now live with its first courses."),
  },
};

// Parse a free-form list (array, comma/semicolon/newline/whitespace separated string)
// into a deduplicated, validated array of email addresses.
const parseEmails = (raw) => {
  let list = [];
  if (Array.isArray(raw)) {
    list = raw;
  } else if (typeof raw === 'string') {
    list = raw.split(/[\s,;]+/);
  }
  const seen = new Set();
  const result = [];
  for (const item of list) {
    const email = String(item || '').trim().toLowerCase();
    if (!email) continue;
    if (!EMAIL_RE.test(email)) continue;
    if (seen.has(email)) continue;
    seen.add(email);
    result.push(email);
  }
  return result;
};

const utf8Base64 = (str) => {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary);
};

const foldHeader = (value) => {
  const maxLine = 78;
  if (value.length <= maxLine) return value;
  const parts = value.split(', ');
  let result = '';
  let line = '';
  for (const part of parts) {
    if (line && line.length + part.length + 2 > maxLine) {
      result += line + '\r\n ';
      line = '';
    }
    line = line ? line + ', ' + part : part;
  }
  return result + line;
};

const buildRawMime = (fromEmail, bccList, subject, text, html) => {
  const boundary = 'tamu_boundary_' + Math.random().toString(36).slice(2);
  const bcc = foldHeader(bccList.join(', '));
  const mime = [
    `From: Tamu Academy <${fromEmail}>`,
    `To: ${fromEmail}`,
    `Bcc: ${bcc}`,
    `Subject: ${subject}`,
    `MIME-Version: 1.0`,
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    '',
    `--${boundary}`,
    `Content-Type: text/plain; charset=UTF-8`,
    `Content-Transfer-Encoding: base64`,
    '',
    utf8Base64(text),
    `--${boundary}`,
    `Content-Type: text/html; charset=UTF-8`,
    `Content-Transfer-Encoding: base64`,
    '',
    utf8Base64(html),
    `--${boundary}--`,
    '',
  ].join('\r\n');
  return btoa(mime).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    if (user.role !== 'admin') return Response.json({ error: 'Forbidden' }, { status: 403 });

    const body = await req.json().catch(() => ({}));
    const dryRun = body.dry_run === true;
    const messageType = body.message_type === 'follow_up' ? 'follow_up' : 'announcement';
    const message = MESSAGES[messageType];

    const emails = parseEmails(body.emails).slice(0, MAX_RECIPIENTS);

    const { accessToken } = await base44.asServiceRole.connectors.getConnection('gmail');

    const infoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!infoRes.ok) {
      const iErr = await infoRes.json().catch(() => ({}));
      return Response.json({ error: `Gmail account error: ${iErr.error?.message || infoRes.status}` }, { status: 502 });
    }
    const info = await infoRes.json();
    const fromEmail = info.email;

    if (dryRun) {
      return Response.json({
        dry_run: true,
        eligible_count: emails.length,
        sender: fromEmail,
        recipients: emails.map((email) => ({ email })),
      });
    }

    const raw = buildRawMime(fromEmail, emails, message.subject, message.text, message.html);

    const sendRes = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ raw }),
    });

    if (!sendRes.ok) {
      const sErr = await sendRes.json().catch(() => ({}));
      return Response.json({
        sent: 0,
        failed: emails.length,
        eligible: emails.length,
        sender: fromEmail,
        errors: [{ error: sErr.error?.message || `Gmail send failed (${sendRes.status})` }],
      }, { status: 502 });
    }

    const sendResult = await sendRes.json();
    return Response.json({
      sent: emails.length,
      failed: 0,
      eligible: emails.length,
      sender: fromEmail,
      gmail_message_id: sendResult.id,
    });
  } catch (error) {
    console.error('[sendVoicesOfChangeAnnouncement] error:', error.message);
    return Response.json({ error: 'An error occurred.' }, { status: 500 });
  }
}