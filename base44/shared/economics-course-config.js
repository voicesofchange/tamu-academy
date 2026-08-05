/**
 * Server-side-only configuration for the Understanding African Economies
 * and the Global System course learner flow: enrollment, progress
 * tracking, knowledge-check grading, module completion, course
 * completion, and certificate issuance.
 *
 * Imported ONLY by Base44 backend functions. Never imported by src/ and
 * never bundled into the public client JavaScript.
 *
 * The full module content — including quiz answer keys — lives in
 * base44/shared/economics-curriculum.js, which is also server-side only.
 *
 * TRUST BOUNDARY: this module holds the canonical course slug, module
 * routes, uniform completion keys, server-controlled publication and
 * enrollment flags, prerequisite chain, and certificate metadata. No
 * browser-supplied value can override the publication or enrollment
 * flags; they are decided here on the server.
 */

export const ECONOMICS_COURSE_SLUG =
  'understanding-african-economies-and-the-global-system';

export const ECONOMICS_CERTIFICATE_COURSE_SLUG = ECONOMICS_COURSE_SLUG;
export const ECONOMICS_CERTIFICATE_COURSE_TITLE =
  'Understanding African Economies and the Global System';
export const ECONOMICS_CERTIFICATE_STATEMENT =
  'This certifies that the learner named below has completed all six modules of the course Understanding African Economies and the Global System, including the required media, reflection prompts, applied activities, and knowledge checks. This certificate confirms completion of an educational course. It does not constitute professional licensing, accreditation, or authorization to provide economic, financial, or investment advice.';

export const ECONOMICS_CERTIFICATE_MODULE_ROUTES = [
  'module-1',
  'module-2',
  'module-3',
  'module-4',
  'module-5',
  'module-6',
];

export const ECONOMICS_MODULE_ROUTES = ECONOMICS_CERTIFICATE_MODULE_ROUTES;

/**
 * Uniform completion keys for every Economics module. A module is
 * complete when all five keys are satisfied on the learner's
 * ModuleProgress row. This is simpler than the Mental Health course,
 * which varies its keys per module.
 */
export const ECONOMICS_COMPLETION_KEYS = [
  'core_media_reviewed',
  'lesson_reviewed',
  'reflection_acknowledged',
  'knowledge_check_passed',
  'activity_acknowledged',
];

/**
 * Public module metadata (number + title) for response shaping. Mirrors
 * the preview metadata in src/lib/economics-tracks.js but kept here so
 * backend functions never depend on the client bundle.
 */
export const ECONOMICS_MODULE_META = {
  'module-1': { number: 'Module 1', title: 'Economics Is About More Than Money' },
  'module-2': { number: 'Module 2', title: 'How African Economies Actually Work' },
  'module-3': { number: 'Module 3', title: 'Inflation, Employment and the Cost of Living' },
  'module-4': { number: 'Module 4', title: 'Trade, Debt and the Global Economy' },
  'module-5': { number: 'Module 5', title: 'Inequality, Institutions and Development' },
  'module-6': { number: 'Module 6', title: "Africa's Economic Futures" },
};

// ---------------------------------------------------------------------------
// Server-controlled publication + enrollment flags.
//
// During development every module is unpublished and enrollment is closed.
// Non-admin learners receive 403; admins may preview the full flow without
// persisting progress. Flip individual module routes into PUBLISHED_MODULES
// and set ENROLLMENT_OPEN = true at launch.
// ---------------------------------------------------------------------------
const PUBLISHED_MODULES = new Set(ECONOMICS_CERTIFICATE_MODULE_ROUTES);
const ENROLLMENT_OPEN = true;

export function economicsCourseExists(courseSlug) {
  return courseSlug === ECONOMICS_COURSE_SLUG;
}

export function isEconomicsEnrollmentOpen() {
  return ENROLLMENT_OPEN;
}

export function isEconomicsModulePublished(courseSlug, moduleRoute) {
  if (courseSlug !== ECONOMICS_COURSE_SLUG) return false;
  return PUBLISHED_MODULES.has(moduleRoute);
}

export function getEconomicsModuleConfig(courseSlug, moduleRoute) {
  if (courseSlug !== ECONOMICS_COURSE_SLUG) return null;
  if (!ECONOMICS_MODULE_ROUTES.includes(moduleRoute)) return null;
  const meta = ECONOMICS_MODULE_META[moduleRoute] || { number: moduleRoute, title: moduleRoute };
  return { route: moduleRoute, number: meta.number, title: meta.title };
}

export function getEconomicsModulePrerequisite(courseSlug, moduleRoute) {
  if (courseSlug !== ECONOMICS_COURSE_SLUG) return null;
  const idx = ECONOMICS_MODULE_ROUTES.indexOf(moduleRoute);
  if (idx <= 0) return null;
  return ECONOMICS_MODULE_ROUTES[idx - 1];
}

export function isEconomicsSectionAllowed(courseSlug, moduleRoute, sectionId) {
  // No section tracking is exposed during development.
  return false;
}

/**
 * Derive the subset of ECONOMICS_COMPLETION_KEYS satisfied by a
 * ModuleProgress row. Uniform across all six modules.
 */
export function deriveEconomicsCompletedKeys(row) {
  if (!row) return [];
  const keys = [];
  if (row.core_media_acknowledged_at) keys.push('core_media_reviewed');
  if (row.lesson_and_case_reviewed_at) keys.push('lesson_reviewed');
  if (row.reflection_acknowledged_at) keys.push('reflection_acknowledged');
  if (row.quiz_passed) keys.push('knowledge_check_passed');
  if (row.activity_acknowledged_at) keys.push('activity_acknowledged');
  return keys;
}