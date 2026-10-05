/**
 * Waiyaki wa Hinga: Leadership, Resistance and Historical Memory —
 * server-side-only course configuration.
 *
 * Imported ONLY by Base44 backend functions (and by course-registry.js,
 * which is itself server-side only). Never imported by src/ and never
 * bundled into the public client JavaScript.
 *
 * TRUST BOUNDARY: this module holds the canonical course slug, module
 * routes, the completion keys, the server-controlled publication and
 * enrollment flags, the prerequisite chain, certificate metadata, and the
 * course-level requirement check (final assessment passed + written project
 * submitted). No browser-supplied value can override the publication or
 * enrollment flags; they are decided here.
 */

import {
  WAIYAKI_MODULES,
  WAIYAKI_ASSESSMENT,
  WAIYAKI_ASSESSMENT_MODULE_SLUG,
  WAIYAKI_ASSESSMENT_PASS_REQUIRED,
  WAIYAKI_PROJECT_OPTIONS,
  WAIYAKI_COURSE_TITLE,
} from './waiyaki-curriculum.js';

// ---------------------------------------------------------------------------
// Course identity
// ---------------------------------------------------------------------------

export const WAIYAKI_COURSE_SLUG = 'waiyaki-wa-hinga';

export const WAIYAKI_CERTIFICATE_COURSE_SLUG = WAIYAKI_COURSE_SLUG;
export const WAIYAKI_CERTIFICATE_COURSE_TITLE = WAIYAKI_COURSE_TITLE;
export const WAIYAKI_CERTIFICATE_STATEMENT =
  'This certifies that the learner named below has completed all five modules of the course Waiyaki wa Hinga: Leadership, Resistance and Historical Memory, including the required reading, the source-analysis exercises, the reflection prompts, the final assessment and the written final project. This certificate confirms completion of an educational course. It does not constitute professional accreditation or historical certification, and it does not speak on behalf of any family, community or institution.';

export const WAIYAKI_CERTIFICATE_MODULE_ROUTES = [
  'module-1',
  'module-2',
  'module-3',
  'module-4',
  'module-5',
];

export const WAIYAKI_MODULE_ROUTES = WAIYAKI_CERTIFICATE_MODULE_ROUTES;

/** Public module metadata (number + title) for response shaping. */
export const WAIYAKI_MODULE_META = Object.fromEntries(
  Object.values(WAIYAKI_MODULES).map((module) => [
    module.route,
    { number: module.number, title: module.title },
  ]),
);

/**
 * Uniform completion keys for every module. A module is complete when all
 * three keys are satisfied on the learner's ModuleProgress row.
 *
 * The keys are stored on the shared ModuleProgress entity using its
 * existing fields, so the course needs no schema change:
 *   lesson_reviewed              -> lesson_and_case_reviewed_at
 *   source_analysis_acknowledged -> activity_acknowledged_at
 *   reflection_acknowledged      -> reflection_acknowledged_at
 */
export const WAIYAKI_COMPLETION_KEYS = [
  'lesson_reviewed',
  'source_analysis_acknowledged',
  'reflection_acknowledged',
];

/** Human-readable labels, in the same order as WAIYAKI_COMPLETION_KEYS. */
export const WAIYAKI_MODULE_COMPLETION_REQUIREMENTS = [
  'Read the module narrative and the key terms.',
  'Work through the source-analysis exercise and record your reading of the evidence.',
  'Respond to the reflection prompts.',
];

/** The course-level requirements that sit outside module completion. */
export const WAIYAKI_COURSE_REQUIREMENTS = [
  'Pass the final assessment with at least four of five answers correct.',
  'Submit your written final project.',
];

// ---------------------------------------------------------------------------
// Server-controlled publication + enrollment flags.
//
// The pathway is open: every module is published and enrollment is open to
// any authenticated learner, anywhere. All five modules of the guide are
// complete, so the whole course is live.
//
// To close enrollment again, set ENROLLMENT_OPEN = false. To withdraw a
// single module, remove its route from PUBLISHED_MODULES.
// ---------------------------------------------------------------------------
const PUBLISHED_MODULES = new Set(WAIYAKI_MODULE_ROUTES);
const ENROLLMENT_OPEN = true;

export function waiyakiCourseExists(courseSlug) {
  return courseSlug === WAIYAKI_COURSE_SLUG;
}

export function isWaiyakiEnrollmentOpen() {
  return ENROLLMENT_OPEN;
}

export function isWaiyakiModulePublished(courseSlug, moduleRoute) {
  if (!waiyakiCourseExists(courseSlug)) return false;
  return PUBLISHED_MODULES.has(moduleRoute);
}

export function isWaiyakiCoursePublished(courseSlug) {
  return (
    waiyakiCourseExists(courseSlug) &&
    WAIYAKI_MODULE_ROUTES.some((route) =>
      isWaiyakiModulePublished(courseSlug, route),
    )
  );
}

export function getWaiyakiModuleConfig(courseSlug, moduleRoute) {
  if (!waiyakiCourseExists(courseSlug)) return null;
  if (!WAIYAKI_MODULE_ROUTES.includes(moduleRoute)) return null;
  const meta = WAIYAKI_MODULE_META[moduleRoute] || {
    number: moduleRoute,
    title: moduleRoute,
  };
  return { route: moduleRoute, number: meta.number, title: meta.title };
}

export function getWaiyakiModulePrerequisite(courseSlug, moduleRoute) {
  if (!waiyakiCourseExists(courseSlug)) return null;
  const idx = WAIYAKI_MODULE_ROUTES.indexOf(moduleRoute);
  if (idx <= 0) return null;
  return WAIYAKI_MODULE_ROUTES[idx - 1];
}

export function getWaiyakiCompletionRequirements() {
  return [...WAIYAKI_MODULE_COMPLETION_REQUIREMENTS];
}

/**
 * Derive the subset of WAIYAKI_COMPLETION_KEYS satisfied by a ModuleProgress
 * row. Uniform across every module.
 */
export function deriveWaiyakiCompletedKeys(row) {
  if (!row) return [];
  const keys = [];
  if (row.lesson_and_case_reviewed_at) keys.push('lesson_reviewed');
  if (row.activity_acknowledged_at) keys.push('source_analysis_acknowledged');
  if (row.reflection_acknowledged_at) keys.push('reflection_acknowledged');
  return keys;
}

export function isModuleCompleteFromRow(row) {
  return deriveWaiyakiCompletedKeys(row).length === WAIYAKI_COMPLETION_KEYS.length;
}

// ---------------------------------------------------------------------------
// Content access
// ---------------------------------------------------------------------------

/**
 * Resolve the full module content for a module route. Returns null when no
 * match exists so the calling backend function can respond 404. The returned
 * object carries no answer material, but it is still the unpaid-for course
 * text — release it only after the calling function has passed its
 * server-side access checks.
 */
export function getWaiyakiSensitiveModuleContent(moduleRoute) {
  return WAIYAKI_MODULES[moduleRoute] || null;
}

/**
 * The assessment WITH its answer key. Never send this directly: the calling
 * function strips `correctIndex` and `explanation` before responding.
 */
export function getWaiyakiSensitiveAssessment() {
  return WAIYAKI_ASSESSMENT;
}

export function getWaiyakiAssessmentPassRequired() {
  return WAIYAKI_ASSESSMENT_PASS_REQUIRED;
}

export function getWaiyakiProjectOptions() {
  return WAIYAKI_PROJECT_OPTIONS.map((option) => ({ ...option }));
}

export function getWaiyakiProjectOption(projectFormat) {
  return (
    WAIYAKI_PROJECT_OPTIONS.find((option) => option.id === projectFormat) || null
  );
}

export { WAIYAKI_ASSESSMENT_MODULE_SLUG };

// ---------------------------------------------------------------------------
// Course-level completion requirements
// ---------------------------------------------------------------------------

/**
 * Evaluate the two Waiyaki requirements that sit outside module completion:
 * the final assessment must be passed and the written final project must be
 * submitted. Called by completeCourseEnrollment (through course-registry's
 * checkExtraCompletionRequirements) and by issueWaiyakiCertificate, so a
 * learner cannot be certified for the course without both.
 *
 * @returns {{ ok: boolean, missing: string[] }}
 */
export async function checkWaiyakiCourseCompletionRequirements(
  base44,
  learnerId,
  courseSlug,
) {
  if (!waiyakiCourseExists(courseSlug)) return { ok: true, missing: [] };

  const missing = [];

  const attempts = await base44.asServiceRole.entities.QuizAttempt.filter({
    learner_id: learnerId,
    course_slug: courseSlug,
    module_slug: WAIYAKI_ASSESSMENT_MODULE_SLUG,
    passed: true,
  });
  if (!Array.isArray(attempts) || attempts.length === 0) {
    missing.push('The final assessment (at least four of five answers correct)');
  }

  const projects = await base44.asServiceRole.entities.WaiyakiProject.filter({
    learner_id: learnerId,
    course_slug: courseSlug,
  });
  const hasProject = (Array.isArray(projects) ? projects : []).some(
    (row) =>
      row && typeof row.content === 'string' && row.content.trim().length > 0,
  );
  if (!hasProject) {
    missing.push('Your written final project');
  }

  return { ok: missing.length === 0, missing };
}