/**
 * email-localization — writes every automated learner email in the language
 * the learner chose on their profile, falling back to English.
 *
 * Imported ONLY by Base44 backend functions. Never imported by src/.
 *
 * Only the fixed wording of an email is ever sent for translation. The
 * learner's name, course titles, module labels, dates and URLs are filled in
 * afterwards from {placeholders}, so they always arrive exactly as recorded.
 * Translations are cached per string (see translate-content.js), so a run with
 * many learners costs one translation per language rather than one per inbox.
 */

import { translateTextBatch } from './translate-content.js';

/** The languages the platform offers; anything else falls back to English. */
export const EMAIL_LANGUAGES = new Set(['en', 'sw', 'es', 'fr', 'pt', 'ar', 'am']);

/**
 * Fixed rules for every automated email. Callers cannot change them.
 */
const EMAIL_RULES = [
  'Email rules:',
  '- Keep every {placeholder} exactly as written, braces included. Never translate, remove or reorder a placeholder.',
  '- Keep these names exactly as written: Tamu Academy, Waiyaki House, Voices of Change, Safari ya Utu, My Courses, Learner\'s Guide.',
  '- Keep the sign-off name "Tex Wambui, MPA", all email addresses, all URLs and the Kiswahili word "Asante" unchanged.',
  '- Keep the warm, plain, respectful tone of the English original, sentence for sentence.',
].join('\n');

/**
 * The language saved on a learner's profile, or 'en' when they have not
 * chosen one (or chose one this app does not serve).
 */
export function learnerLanguage(user) {
  if (!user) return 'en';
  const direct = user.preferred_language;
  const nested =
    user.data && typeof user.data === 'object' ? user.data.preferred_language : undefined;
  const value = typeof direct === 'string' && direct ? direct : nested;
  return typeof value === 'string' && EMAIL_LANGUAGES.has(value) ? value : 'en';
}

/**
 * Fill the {placeholders} in an email's copy with its real values. Values are
 * inserted after translation, so they are never altered by the model.
 */
export function fillCopy(template, vars = {}) {
  return String(template == null ? '' : template).replace(/\{(\w+)\}/g, (match, key) =>
    Object.prototype.hasOwnProperty.call(vars, key) ? String(vars[key]) : match
  );
}

/**
 * Translate one email's fixed wording. Any string the translator could not
 * return keeps its English text, so an email is never sent blank or blocked.
 */
export async function localizeEmailCopy(base44, language, copy) {
  if (!language || language === 'en' || !EMAIL_LANGUAGES.has(language)) return copy;
  try {
    const translated = await translateTextBatch(base44, copy, language, EMAIL_RULES);
    const out = {};
    for (const key of Object.keys(copy)) {
      const value = translated[key];
      out[key] = typeof value === 'string' && value.trim().length > 0 ? value : copy[key];
    }
    return out;
  } catch (error) {
    console.warn('[email-localization] translation failed:', error && error.message);
    return copy;
  }
}

/**
 * One localized copy per language for a whole sending run, so a broadcast to
 * hundreds of learners translates each language once.
 */
export function emailCopyCache(base44) {
  const cache = new Map();
  return async function copyFor(language, copy) {
    const key = `${language}`;
    if (!cache.has(key)) cache.set(key, await localizeEmailCopy(base44, language, copy));
    return cache.get(key);
  };
}