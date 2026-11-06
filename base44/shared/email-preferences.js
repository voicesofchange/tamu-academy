/**
 * email-preferences — the learner's own control over Tamu Academy's automated
 * emails: whether reminders, check-ins, follow-ups and announcements are on,
 * and the one link inside each email that turns them off.
 *
 * Imported ONLY by Base44 backend functions. Never imported by src/.
 *
 * The link carries a long random token saved on the learner's EmailPreference
 * record. The token is the whole credential, so the link works without signing
 * in, cannot be guessed, and can be replaced by clearing the field. Welcome
 * emails and certificates never consult these records and always send.
 */

import { SITE_URL } from './learner-emails.js';

export const PREFERENCES_PATH = '/email-preferences';

/** After this many unanswered check-ins, we wait for the learner to return. */
export const MAX_CHECK_INS_WITHOUT_ACTIVITY = 3;

export const STOP_LINE = 'You can stop these emails at any time.';
export const STOP_LABEL = 'Stop these emails';

export function newStopToken() {
  return `${crypto.randomUUID().replace(/-/g, '')}${crypto.randomUUID().replace(/-/g, '')}`;
}

export function preferencesUrl(token) {
  return `${SITE_URL}${PREFERENCES_PATH}?token=${encodeURIComponent(token)}`;
}

export function stopEmailsUrl(token) {
  return `${preferencesUrl(token)}&action=stop`;
}

/**
 * The footer that turns these emails off, in the plain-text and HTML parts.
 * Returns empty strings when no link is available, so a caller can never
 * print a dead link.
 */
export function stopFooter({ url, line = STOP_LINE, label = STOP_LABEL }) {
  if (!url) return { text: '', html: '' };
  return {
    text: `\n\n${line}\n${label}: ${url}`,
    html:
      `<p style="margin-top:1.5rem;font-size:0.85em;color:#4a3a2a;">${line}<br/>` +
      `<a href="${url}" style="color:#D4A12A;">${label}</a></p>`,
  };
}

export function isStopped(preference) {
  return !!preference && preference.status === 'stopped';
}

function firstRecord(page) {
  const items = page && page.items ? page.items : page;
  return Array.isArray(items) && items.length > 0 ? items[0] : null;
}

/** Finds one record without paging options, which older SDKs do not accept. */
async function findPreference(base44, query) {
  return firstRecord(await base44.asServiceRole.entities.EmailPreference.filter(query));
}

/**
 * The learner's preference record, created on first use with a fresh stop
 * token. Called only by backend functions, so it runs with the service role.
 */
export async function getOrCreatePreference(base44, { learnerId, email }) {
  const existing = await findPreference(base44, { learner_id: learnerId });
  if (existing) return existing;

  const record = {
    learner_id: learnerId,
    learner_email: String(email || '').toLowerCase(),
    stop_token: newStopToken(),
    status: 'active',
    check_in_streak: 0,
  };

  try {
    return await base44.asServiceRole.entities.EmailPreference.create(record);
  } catch (error) {
    // A concurrent send may have created it a moment ago; use that record.
    const retry = await findPreference(base44, { learner_id: learnerId });
    if (retry) return retry;
    throw error;
  }
}

/** Every preference, indexed by learner id and by email, for one sending run. */
export async function loadPreferences(base44) {
  const list = await base44.asServiceRole.entities.EmailPreference.list();
  const byLearner = new Map();
  const byEmail = new Map();

  for (const preference of list || []) {
    if (preference.learner_id) byLearner.set(preference.learner_id, preference);
    if (preference.learner_email) byEmail.set(String(preference.learner_email).toLowerCase(), preference);
  }

  return { byLearner, byEmail };
}