/**
 * Tamu Academy — availability vocabulary (single source of truth)
 *
 * Every place the site names how far along a course, module or piece of
 * learning content is must use one of these three labels, so the same state
 * never reads "In Development", "In development" and "Coming Soon" in
 * different places. Sentence case throughout.
 */

export const AVAILABLE_NOW = 'Available now';
export const IN_DEVELOPMENT = 'In development';
export const COMING_SOON = 'Coming soon';

/**
 * Maps the historical spellings still carried in course and content data to
 * the canonical label. Unknown values are returned unchanged so nothing is
 * silently relabelled into the wrong state.
 */
const LEGACY_MAP = {
  available: AVAILABLE_NOW,
  'available now': AVAILABLE_NOW,
  'now available': AVAILABLE_NOW,
  live: AVAILABLE_NOW,
  'in development': IN_DEVELOPMENT,
  'under development': IN_DEVELOPMENT,
  'in progress': IN_DEVELOPMENT,
  'coming soon': COMING_SOON,
};

export function normalizeStatus(label) {
  if (!label) return label;
  return LEGACY_MAP[String(label).trim().toLowerCase()] || label;
}