/**
 * Shared course-translation layer.
 *
 * One place that turns a server-side course module into the learner's
 * selected language, modelled on the approach already used by getSokoModule:
 *
 *   - every learner-facing string under the named sections is collected by
 *     its dotted path and sent for translation in bounded batches, so one
 *     oversized response cannot fail a whole module;
 *   - each field falls back to its own English text if the model fails,
 *     returns nothing usable, or returns a string that lost a protected name;
 *   - results are cached per string in TranslationCache by translateTextBatch
 *     (shared/translate-content.js), so a module is translated once and later
 *     views are served from the cache;
 *   - structural values are never sent: identifiers, routes, module numbers,
 *     statuses, URLs, passing scores and answer keys. The time estimate is
 *     translated, since it is read by the learner rather than acted on.
 *
 * Protected names — Tamu Academy, Ubuntu, Safari ya Utu, Kioo, Sauti za Soko,
 * Waiyaki wa Hinga, Manguo Wetland — and any Kiswahili words embedded in
 * English text are held behind stable tokens while the text is translated, so
 * they always come back verbatim. Token numbers are derived from the fixed
 * term list, so a cached translation restores to the same names every time.
 *
 * Answer keys are never sent: callers strip them before translating, and any
 * key field that somehow remains is skipped by STRUCTURAL_KEYS below.
 *
 * Nothing here reads or writes learner progress.
 */

import { translateTextBatch } from './translate-content.js';

/** Languages the course content is offered in. */
export const COURSE_TRANSLATABLE_LANGUAGES = new Set(['sw', 'es', 'fr', 'pt', 'ar', 'am']);

/**
 * Names that are part of the curriculum's identity and are never translated.
 * The index in this list fixes the token used in the prompt, so the same name
 * always maps to the same token across calls and across cached results.
 */
export const PROTECTED_TERMS = [
  'Tamu Academy',
  'Safari ya Utu',
  'Sauti za Soko',
  'Waiyaki wa Hinga',
  'Manguo Wetland',
  'Ubuntu',
  'Kioo',
  'M-Pesa',
  'boda boda',
  'jua kali',
  'harambee',
];

/**
 * Keys whose values are identifiers, addresses, numbers or answers — never
 * translated, whatever section carries them.
 */
const STRUCTURAL_KEYS = new Set([
  'id',
  'route',
  'number',
  'status',
  'slug',
  'courseSlug',
  'moduleRoute',
  'language',
  'url',
  'embedUrl',
  'watchUrl',
  'href',
  'src',
  'videoId',
  'passingScore',
  'correctIndex',
  'correctAnswerIndex',
  'formatVersion',
  'publishedAt',
]);

/**
 * Sections that hold citations and bibliographic detail only — wherever they
 * sit in a module (top level or nested inside a lesson). Works of reference are
 * cited in their published language.
 */
const REFERENCE_SECTIONS = new Set([
  'sources',
  'citations',
  'references',
  'sourcesFurtherLearning',
]);

const NUMBER_ONLY = /^[\s\d.,:;%()\u2013\u2014/-]*$/;

const PROTECTED_TERM_PATTERN = new RegExp(
  `(${[...PROTECTED_TERMS]
    .sort((a, b) => b.length - a.length)
    .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|')})`,
  'gi',
);

const TOKEN_PATTERN = /\u00ab\s*T(\d+)\s*\u00bb/g;

/**
 * The same do-not-translate rules, for the page-content endpoint that
 * translates the Learner's Guide and other static page text.
 */
export const PAGE_TRANSLATION_INSTRUCTIONS = [
  'Page rules:',
  `- Leave these names exactly as written and never translate them: ${PROTECTED_TERMS.join(', ')}.`,
  '- Leave Kiswahili (Swahili) words and phrases exactly as written, including section names such as Karibu, Kioo, Kurudi, Utu and Ujima.',
  '- Never translate anything a learner wrote themselves: only the interface labels and guide text in this payload may change.',
].join('\n');

/** What the model is told about names it must leave alone. */
const TRANSLATOR_INSTRUCTIONS = [
  `Course rules:`,
  `- Leave these names exactly as written and never translate them: ${PROTECTED_TERMS.join(', ')}.`,
  `- Leave Kiswahili (Swahili) words and phrases that appear inside the English text unchanged.`,
  `- Tokens such as \u00abT0\u00bb stand for protected names. Keep every token exactly as written, in the same position.`,
].join('\n');

/** Wrap protected names in stable tokens before the text reaches the model. */
function protectTerms(value) {
  return value.replace(PROTECTED_TERM_PATTERN, (match) => {
    const index = PROTECTED_TERMS.findIndex((term) => term.toLowerCase() === match.toLowerCase());
    return index === -1 ? match : `\u00abT${index}\u00bb`;
  });
}

/**
 * Put the protected names back. Returns null when the model dropped or mangled
 * a token — the caller then keeps the English text for that field rather than
 * showing a half-restored sentence.
 */
function restoreTerms(value) {
  let broken = false;
  const restored = value.replace(TOKEN_PATTERN, (_match, digits) => {
    const term = PROTECTED_TERMS[Number(digits)];
    if (!term) {
      broken = true;
      return _match;
    }
    return term;
  });
  if (broken || restored.includes('\u00ab') || restored.includes('\u00bb')) return null;
  return restored;
}

function isTranslatableLeaf(path) {
  const segments = path.split('.').filter((segment) => !/^\d+$/.test(segment));
  if (segments.length === 0) return false;
  if (segments.some((segment) => REFERENCE_SECTIONS.has(segment))) return false;
  const key = segments[segments.length - 1];
  return !STRUCTURAL_KEYS.has(key);
}

function looksLikeText(value) {
  const text = value.trim();
  if (text.length === 0 || NUMBER_ONLY.test(text)) return false;
  if (/^(https?:\/\/|mailto:|www\.)/i.test(text)) return false;
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) return false;
  return /\p{L}/u.test(text);
}

/**
 * Collect every translatable string under the named top-level sections, keyed
 * by its dotted path so it can be written back to the same place.
 */
export function collectTranslatableStrings(source, sections) {
  const out = {};

  const walk = (value, path) => {
    if (typeof value === 'string') {
      if (isTranslatableLeaf(path) && looksLikeText(value)) out[path] = value;
      return;
    }
    if (Array.isArray(value)) {
      value.forEach((item, index) => walk(item, `${path}.${index}`));
      return;
    }
    if (value && typeof value === 'object') {
      for (const key of Object.keys(value)) walk(value[key], `${path}.${key}`);
    }
  };

  for (const section of sections) {
    const value = source ? source[section] : undefined;
    if (value === undefined || value === null) continue;
    if (typeof value === 'string') {
      if (isTranslatableLeaf(section) && looksLikeText(value)) out[section] = value;
      continue;
    }
    walk(value, section);
  }
  return out;
}

/**
 * Write translated strings back into the sections they came from. A missing or
 * empty translation leaves that field's original English text in place.
 */
export function applyTranslatedStrings(source, sections, translations) {
  const apply = (value, path) => {
    if (typeof value === 'string') {
      const translated = translations[path];
      if (typeof translated === 'string' && translated.trim().length > 0) return translated;
      return value;
    }
    if (Array.isArray(value)) return value.map((item, index) => apply(item, `${path}.${index}`));
    if (value && typeof value === 'object') {
      const next = {};
      for (const key of Object.keys(value)) next[key] = apply(value[key], `${path}.${key}`);
      return next;
    }
    return value;
  };

  const merged = { ...source };
  for (const section of sections) {
    const value = merged[section];
    if (value === undefined || value === null) continue;
    merged[section] = apply(value, section);
  }
  return merged;
}

const MAX_FIELDS_PER_BATCH = 30;
const MAX_CHARS_PER_BATCH = 8000;

/** Split the collected strings into bounded batches for the model. */
function batchStrings(fields) {
  const batches = [];
  let current = {};
  let chars = 0;

  for (const [path, value] of Object.entries(fields)) {
    const size = value.length;
    const full =
      Object.keys(current).length >= MAX_FIELDS_PER_BATCH ||
      (chars + size > MAX_CHARS_PER_BATCH && Object.keys(current).length > 0);
    if (full) {
      batches.push(current);
      current = {};
      chars = 0;
    }
    current[path] = value;
    chars += size;
  }
  if (Object.keys(current).length > 0) batches.push(current);
  return batches;
}

/**
 * Translate the learner-facing fields of one course module.
 *
 * @param {Object} base44 - Base44 client (uses asServiceRole internally).
 * @param {Object} content - Module content, answer keys already stripped.
 * @param {string} language - Target language code ('en', 'sw', 'es', ...).
 * @param {string[]} sections - Top-level sections that may be translated.
 * @returns {Promise<Object>} The module with translated fields; English
 *   wherever a translation was unavailable.
 */
export async function translateCourseSections(base44, content, language, sections) {
  if (!content || !language || language === 'en') return content;
  if (!COURSE_TRANSLATABLE_LANGUAGES.has(language)) return content;
  if (!Array.isArray(sections) || sections.length === 0) return content;

  try {
    const fields = collectTranslatableStrings(content, sections);
    if (Object.keys(fields).length === 0) return content;

    const protectedFields = {};
    for (const [path, value] of Object.entries(fields)) protectedFields[path] = protectTerms(value);

    const batches = batchStrings(protectedFields);
    const results = await Promise.all(
      batches.map((batch) => translateTextBatch(base44, batch, language, TRANSLATOR_INSTRUCTIONS)),
    );

    const translated = {};
    for (const result of results) Object.assign(translated, result);

    // Restore protected names field by field; a field whose tokens did not
    // survive keeps its English text.
    const usable = {};
    for (const path of Object.keys(fields)) {
      const value = translated[path];
      if (typeof value !== 'string' || value.trim().length === 0) continue;
      const restored = restoreTerms(value);
      if (restored) usable[path] = restored;
    }

    if (Object.keys(usable).length === 0) return content;
    return applyTranslatedStrings(content, sections, usable);
  } catch (error) {
    console.error('[course-translation] Translation failed:', error && error.message);
    return content;
  }
}