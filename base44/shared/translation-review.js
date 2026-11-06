/**
 * Shared vocabulary for reviewed course translations.
 *
 * A cached translation is identified by a stable source key — course, module
 * and the field path inside that module — rather than by the hash of its
 * English alone. The English can be rewritten without losing the trail: the
 * same key is found again, its hash no longer matches, and the stored
 * translation is flagged outdated so it is redone and reviewed once more.
 *
 * Nothing here reads or writes learner progress. Only English curriculum text
 * and its translations pass through.
 */

/** Languages the course content is offered in. */
export const REVIEW_LANGUAGES = ['sw', 'es', 'fr', 'pt', 'ar', 'am'];

/** How each language is named in the review sheet and its CSV. */
export const REVIEW_LANGUAGE_LABELS = {
  sw: 'Kiswahili',
  es: 'Español',
  fr: 'Français',
  pt: 'Português',
  ar: 'العربية',
  am: 'አማርኛ',
};

export const REVIEW_STATUSES = ['unreviewed', 'reviewed', 'outdated'];

/** The stable identity of one translatable curriculum string. */
export function buildSourceKey(courseSlug, moduleSlug, fieldPath) {
  if (!courseSlug || !moduleSlug || !fieldPath) return null;
  return `course:${courseSlug}|module:${moduleSlug}|field:${fieldPath}`;
}

/**
 * Every reviewed translation unit for one language, newest page by page. Only
 * course translations are returned: page text has no unit identity to review.
 */
export async function fetchCourseTranslations(base44, language, maxRows = 2000) {
  const rows = [];
  let cursor = null;
  while (rows.length < maxRows) {
    const page = await base44.asServiceRole.entities.TranslationCache.filter(
      { language, source_key: { $exists: true } },
      { limit: 500, ...(cursor ? { cursor } : {}) },
    );
    const items = Array.isArray(page) ? page : (page && page.items) || [];
    rows.push(...items);
    cursor = page && page.next_cursor;
    if (!cursor || items.length === 0) break;
  }
  return rows.slice(0, maxRows);
}

/** Reviewed, unreviewed and outdated counts, in total and per course. */
export function countTranslations(rows) {
  const blank = () => ({ reviewed: 0, unreviewed: 0, outdated: 0, total: 0 });
  const total = blank();
  const byCourse = {};

  for (const row of rows) {
    const course = row.course_slug || 'unknown';
    if (!byCourse[course]) byCourse[course] = blank();
    const status = REVIEW_STATUSES.includes(row.status) ? row.status : 'unreviewed';
    for (const bucket of [total, byCourse[course]]) {
      bucket[status] += 1;
      bucket.total += 1;
    }
  }
  return { total, byCourse };
}

/** The CSV header, in the order outside reviewers see it. */
export const CSV_COLUMNS = [
  'id',
  'language',
  'course',
  'module',
  'field',
  'status',
  'english',
  'translation',
];

function escapeCell(value) {
  const text = value === null || value === undefined ? '' : String(value);
  if (/[",\r\n]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
  return text;
}

/** Build the reviewer CSV for a set of translation rows. */
export function buildCsv(rows) {
  const lines = [CSV_COLUMNS.join(',')];
  for (const row of rows) {
    lines.push(
      [
        row.id,
        row.language,
        row.course_slug,
        row.module_slug,
        row.field_path,
        row.status,
        row.source_text,
        row.translated_text,
      ]
        .map(escapeCell)
        .join(','),
    );
  }
  return lines.join('\r\n');
}

/**
 * Parse a reviewer CSV back into objects keyed by the header names. Handles
 * quoted cells, escaped quotes and both line endings; a malformed file yields
 * whatever could be read rather than throwing.
 */
export function parseCsv(text) {
  const rows = [];
  let cell = '';
  let row = [];
  let quoted = false;

  const pushCell = () => {
    row.push(cell);
    cell = '';
  };
  const pushRow = () => {
    pushCell();
    if (row.some((value) => value.trim().length > 0)) rows.push(row);
    row = [];
  };

  const source = String(text || '').replace(/^\uFEFF/, '');
  for (let i = 0; i < source.length; i += 1) {
    const char = source[i];
    if (quoted) {
      if (char === '"') {
        if (source[i + 1] === '"') {
          cell += '"';
          i += 1;
        } else {
          quoted = false;
        }
      } else {
        cell += char;
      }
      continue;
    }
    if (char === '"') {
      quoted = true;
    } else if (char === ',') {
      pushCell();
    } else if (char === '\n') {
      pushRow();
    } else if (char === '\r') {
      // handled by the following \n
    } else {
      cell += char;
    }
  }
  if (cell.length > 0 || row.length > 0) pushRow();
  if (rows.length === 0) return [];

  const header = rows[0].map((name) => name.trim().toLowerCase());
  return rows.slice(1).map((values) => {
    const record = {};
    header.forEach((name, index) => {
      record[name] = values[index] === undefined ? '' : values[index];
    });
    return record;
  });
}