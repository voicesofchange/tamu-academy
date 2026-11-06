/**
 * Client-side helpers for translating a data object's learner-facing text.
 *
 * Only display strings are collected. Identifiers, routes, URLs, dates,
 * statuses and — critically — table row labels (which the guide uses as the
 * storage key for a learner's answers) are never sent, so a learner's saved
 * work reads back exactly as they wrote it.
 */

/** Keys whose values are structural — never translated, never recursed into. */
const SKIP_KEYS = new Set([
  'id',
  'ids',
  'key',
  'route',
  'routes',
  'href',
  'url',
  'embedUrl',
  'watchUrl',
  'src',
  'slug',
  'courseSlug',
  'moduleSlug',
  'course_slug',
  'module_slug',
  'sectionIds',
  'type',
  'format',
  'status',
  'state',
  'to',
  'color',
  'border',
  'background',
  'accent',
  'tone',
  'icon',
  'language',
  'value',
  'values',
  'passingScore',
  'correctIndex',
  'attempt_type',
  'attempt_date',
  'section_id',
  'exercise_id',
  'field_id',
  'learner_id',
  'formatVersion',
  'publishedAt',
  // Table row labels are the key a learner's answers are stored under.
  // Translating them would orphan every answer already written. Column
  // labels are display-only, so those are translated (their ids are not).
  'rows',
]);

const SKIP_PATTERN = /(_id$|Id$|_at$|_date$)/;
const NUMBER_ONLY = /^[\s\d.,:;%()\u2013\u2014/+-]*$/;

function skipKey(key) {
  return SKIP_KEYS.has(key) || SKIP_PATTERN.test(key);
}

/** Whether a string carries prose worth translating. */
export function isTranslatableText(value) {
  const text = value.trim();
  if (text.length === 0 || NUMBER_ONLY.test(text)) return false;
  if (/^(https?:\/\/|mailto:|www\.)/i.test(text)) return false;
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) return false;
  return /\p{L}/u.test(text);
}

/**
 * Collect every translatable string in an object, keyed by dotted path.
 * Returns a flat object of the shape translatePageContent expects.
 */
export function flattenStrings(source) {
  const out = {};

  const walk = (value, path) => {
    if (typeof value === 'string') {
      if (path && isTranslatableText(value)) out[path] = value;
      return;
    }
    if (Array.isArray(value)) {
      value.forEach((item, index) => walk(item, path ? `${path}.${index}` : String(index)));
      return;
    }
    if (value && typeof value === 'object') {
      for (const key of Object.keys(value)) {
        if (skipKey(key)) continue;
        walk(value[key], path ? `${path}.${key}` : key);
      }
    }
  };

  walk(source, '');
  return out;
}

/**
 * Write translations back into a copy of the source object. A missing or empty
 * translation leaves that field's original text in place.
 */
export function applyStrings(source, translations, prefix = '') {
  if (typeof source === 'string') {
    const translated = translations[prefix];
    return typeof translated === 'string' && translated.trim().length > 0 ? translated : source;
  }
  if (Array.isArray(source)) {
    return source.map((item, index) =>
      applyStrings(item, translations, prefix ? `${prefix}.${index}` : String(index)),
    );
  }
  if (source && typeof source === 'object') {
    const next = {};
    for (const key of Object.keys(source)) {
      if (skipKey(key)) {
        next[key] = source[key];
        continue;
      }
      const path = prefix ? `${prefix}.${key}` : key;
      next[key] = applyStrings(source[key], translations, path);
    }
    return next;
  }
  return source;
}

/**
 * Split a flat string map into requests the translation endpoint accepts:
 * at most 90 keys and 16,000 characters each.
 */
export function chunkStrings(fields, maxKeys = 90, maxChars = 16000) {
  const chunks = [];
  let current = {};
  let chars = 0;

  for (const [path, value] of Object.entries(fields)) {
    const size = value.length;
    const full =
      Object.keys(current).length >= maxKeys ||
      (chars + size > maxChars && Object.keys(current).length > 0);
    if (full) {
      chunks.push(current);
      current = {};
      chars = 0;
    }
    current[path] = value;
    chars += size;
  }
  if (Object.keys(current).length > 0) chunks.push(current);
  return chunks;
}