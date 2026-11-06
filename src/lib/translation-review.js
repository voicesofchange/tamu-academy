/**
 * Front-end vocabulary for the Translation Review page. The backend keeps its
 * own copy in base44/shared/translation-review.js; this one only labels what
 * the page shows.
 */

export const REVIEW_LANGUAGES = [
  { code: 'sw', label: 'Kiswahili' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'pt', label: 'Português' },
  { code: 'ar', label: 'العربية' },
  { code: 'am', label: 'አማርኛ' },
];

const COURSE_LABELS = {
  'understanding-african-economies-and-the-global-system':
    'Understanding African Economies and the Global System',
  'building-wealth-together': 'Building Wealth Together',
  'mental-health-community-and-culture': 'Mental Health, Community and Culture',
  'waiyaki-wa-hinga': 'Waiyaki wa Hinga',
  'sauti-za-soko': 'Sauti za Soko',
};

/** A readable course name from its slug. */
export function courseLabel(slug) {
  if (!slug) return 'Unassigned';
  if (COURSE_LABELS[slug]) return COURSE_LABELS[slug];
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/** A readable field name from a dotted path, e.g. lesson.2.title. */
export function fieldLabel(path) {
  if (!path) return 'Field';
  const parts = String(path).split('.');
  const out = [];
  for (const part of parts) {
    if (/^\d+$/.test(part)) {
      const last = out.length - 1;
      if (last >= 0) out[last] = `${out[last]} ${Number(part) + 1}`;
      continue;
    }
    out.push(part.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase());
  }
  const [first, ...rest] = out;
  return [first.charAt(0).toUpperCase() + first.slice(1), ...rest].join(' · ');
}

const EMPTY = () => ({ reviewed: 0, unreviewed: 0, outdated: 0, total: 0 });

/** Reviewed, unreviewed and outdated counts, in total and per course. */
export function countTranslations(rows) {
  const total = EMPTY();
  const byCourse = {};

  for (const row of rows) {
    const course = row.course_slug || 'unknown';
    if (!byCourse[course]) byCourse[course] = EMPTY();
    const status = ['reviewed', 'unreviewed', 'outdated'].includes(row.status)
      ? row.status
      : 'unreviewed';
    for (const bucket of [total, byCourse[course]]) {
      bucket[status] += 1;
      bucket.total += 1;
    }
  }
  return { total, byCourse };
}