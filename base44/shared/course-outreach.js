/**
 * course-outreach — shared helpers for Tamu Academy's automated learner
 * outreach emails (progress reminders and completion follow-ups).
 *
 * Imported ONLY by Base44 backend functions. Never imported by src/.
 *
 * Keeps the Gmail connection, raw-MIME delivery, open tracking, and
 * course/module lookups in one place, so each outreach function only has
 * to decide who to write to and what to say.
 */
import { getCourseConfig, getRequiredModuleRoutes } from './course-registry.js';
import { buildRawMime, trackingPixel } from './gmail-mime.js';

export const SITE_URL = 'https://tamuacademy.org';
export const FROM_NAME = 'Tex Wambui | Tamu Academy';

export const SIGNATURE_TEXT = `Tex Wambui, MPA
Tamu Academy
Voices of Change
https://tamuacademy.org`;

export const SIGNATURE_HTML =
  '<p>Asante,<br/><strong>Tex Wambui, MPA</strong><br/>Tamu Academy<br/>Voices of Change<br/>' +
  `<a href="${SITE_URL}" style="color:#D4A12A;">${SITE_URL}</a></p>`;

/** Body wrapper shared by every outreach email. */
export function emailShell(inner) {
  return `<div style="font-family:Arial,Helvetica,sans-serif;color:#1A130E;line-height:1.7;max-width:600px;">${inner}</div>`;
}

/** The learner's given name, or a warm fallback when no name is on file. */
export function firstNameOf(name) {
  const trimmed = typeof name === 'string' ? name.trim() : '';
  return trimmed ? trimmed.split(' ')[0] : 'friend';
}

export function courseTitleOf(courseSlug) {
  const config = getCourseConfig(courseSlug);
  return config ? config.title : courseSlug;
}

/** "Module 3" for the module at that position in its course. */
export function moduleLabel(courseSlug, moduleRoute) {
  const routes = getRequiredModuleRoutes(courseSlug);
  const index = routes.indexOf(moduleRoute);
  return index >= 0 ? `Module ${index + 1}` : moduleRoute;
}

export function moduleUrl(courseSlug, moduleRoute) {
  return `${SITE_URL}/courses/${courseSlug}/${moduleRoute}`;
}

export function certificateUrl(courseSlug) {
  return `${SITE_URL}/courses/${courseSlug}/certificate`;
}

export function storiesUrl() {
  return `${SITE_URL}/stories`;
}

export function coursesUrl() {
  return `${SITE_URL}/courses`;
}

/** The Gmail account all community email is sent from. */
export async function getGmailSender(base44) {
  const { accessToken } = await base44.asServiceRole.connectors.getConnection('gmail');
  const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error('Gmail account error');
  const info = await res.json();
  if (!info.email) throw new Error('Gmail account error');
  return { accessToken, fromEmail: info.email };
}

/**
 * Sends one tracked outreach email through Gmail. The EmailOpenEvent
 * record is written only after the send succeeds, so the tracking panel
 * never counts an email that was never delivered.
 */
export async function sendTrackedEmail(
  base44,
  { accessToken, fromEmail, to, subject, text, html, messageType }
) {
  const token = crypto.randomUUID();
  const raw = buildRawMime(FROM_NAME, fromEmail, to, subject, text, html + trackingPixel(token));

  const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ raw }),
  });
  if (!res.ok) throw new Error('Gmail send failed');

  await base44.asServiceRole.entities.EmailOpenEvent.create({
    tracking_token: token,
    recipient_email: to,
    message_type: messageType,
    sent_at: new Date().toISOString(),
    open_count: 0,
  });
}