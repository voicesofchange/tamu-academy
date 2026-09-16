/**
 * gmail-mime.js — shared helpers for building raw Gmail MIME messages
 * with per-recipient open-tracking pixels.
 *
 * Used by backend functions that send email via the Gmail connector's
 * raw API (gmail.users.messages.send) and need per-recipient tracking.
 *
 * Server-side only — never import from src/.
 */

export const TRACKING_PIXEL_BASE = 'https://tamu-learn-global.base44.app/functions/trackEmailOpen';

/**
 * Base64-encode a UTF-8 string for MIME Content-Transfer-Encoding.
 */
export function utf8Base64(str) {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary);
}

/**
 * Build a raw RFC 2822 MIME message (URL-safe base64) addressed to a
 * single recipient, with multipart/alternative text + HTML bodies.
 */
export function buildRawMime(fromName, fromEmail, toEmail, subject, text, html) {
  const boundary = 'tamu_boundary_' + Math.random().toString(36).slice(2);
  const mime = [
    `From: "${fromName}" <${fromEmail}>`,
    `To: ${toEmail}`,
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
}

/**
 * Build a 1x1 transparent tracking pixel <img> tag for a given token.
 */
export function trackingPixel(token) {
  return `<img src="${TRACKING_PIXEL_BASE}?t=${token}" width="1" height="1" alt="" style="display:none;border:0;outline:none;" />`;
}