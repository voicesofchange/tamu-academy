/**
 * Server-side-only configuration for the Building Wealth Together: Money,
 * Enterprise and Community Leadership course learner flow: enrollment,
 * progress tracking, concept-check grading, module completion, course
 * completion, and certificate issuance.
 *
 * Imported ONLY by Base44 backend functions. Never imported by src/ and
 * never bundled into the public client JavaScript.
 *
 * The full module content — including the concept-check answer keys — lives
 * in base44/shared/building-wealth-together-curriculum.js, which is also
 * server-side only.
 *
 * TRUST BOUNDARY: this module holds the canonical course slug, module
 * routes, uniform completion keys, server-controlled publication and
 * enrollment flags, the prerequisite chain, the pathway focus options, the
 * capstone formats, and certificate metadata. No browser-supplied value can
 * override the publication or enrollment flags; they are decided here on the
 * server.
 *
 * COURSE SHAPE (taken from the course material):
 *   - Track 1: The Shared Core — Modules 1 to 3. Everyone completes these.
 *   - Track 2: The Grassroots Entrepreneur Pathway — Modules 4 to 6.
 *   - Track 3: The Emerging Leader Pathway — Modules 7 to 9.
 *
 * A learner may take both pathways, or focus on the one that fits their
 * goals. The chosen pathway is recorded on the learner's enrollment as a
 * study focus: it orders and frames the pathway modules the learner is
 * working through, and it never unlocks or locks module content. The course
 * material's own completion rule is that all nine modules are finished and
 * the capstone is submitted, and this config keeps that rule so the course
 * follows the same completion architecture as every other Tamu Academy
 * course.
 */

export const WEALTH_COURSE_SLUG = 'building-wealth-together';

export const WEALTH_CERTIFICATE_COURSE_SLUG = WEALTH_COURSE_SLUG;
export const WEALTH_CERTIFICATE_COURSE_TITLE =
  'Building Wealth Together: Money, Enterprise and Community Leadership';
export const WEALTH_CERTIFICATE_STATEMENT =
  'This certifies that the learner named below has completed all nine modules of the course Building Wealth Together: Money, Enterprise and Community Leadership, including the module lessons, worked examples, activities, dilemmas, concept checks, reflections, and the submitted capstone project. This certificate confirms completion of an educational course. It does not constitute professional licensing, accreditation, or authorization to provide financial, investment, accounting, legal, or business advice.';

export const WEALTH_MODULE_ROUTES = [
  'module-1',
  'module-2',
  'module-3',
  'module-4',
  'module-5',
  'module-6',
  'module-7',
  'module-8',
  'module-9',
];

/**
 * The three tracks. Track 1 is the shared core every learner completes; the
 * two pathways follow it.
 */
export const WEALTH_TRACKS = [
  {
    id: 'shared-core',
    label: 'Track 1: The Shared Core',
    routeGroups: ['module-1', 'module-2', 'module-3'],
  },
  {
    id: 'entrepreneur',
    label: 'Track 2: The Grassroots Entrepreneur Pathway',
    routeGroups: ['module-4', 'module-5', 'module-6'],
  },
  {
    id: 'leader',
    label: 'Track 3: The Emerging Leader Pathway',
    routeGroups: ['module-7', 'module-8', 'module-9'],
  },
];

export const WEALTH_CORE_MODULE_ROUTES = ['module-1', 'module-2', 'module-3'];
export const WEALTH_ENTREPRENEUR_MODULE_ROUTES = ['module-4', 'module-5', 'module-6'];
export const WEALTH_LEADER_MODULE_ROUTES = ['module-7', 'module-8', 'module-9'];

/** The pathway focus a learner may record on their enrollment. */
export const WEALTH_PATHWAY_FOCUSES = ['entrepreneur', 'leader', 'both'];

export function isWealthPathwayFocus(value) {
  return WEALTH_PATHWAY_FOCUSES.includes(value);
}

/**
 * The pathway modules a focus points at. The focus frames the learner's
 * study order; it does not change which modules the course requires.
 */
export function pathwayModuleRoutes(focus) {
  if (focus === 'entrepreneur') return [...WEALTH_ENTREPRENEUR_MODULE_ROUTES];
  if (focus === 'leader') return [...WEALTH_LEADER_MODULE_ROUTES];
  if (focus === 'both') {
    return [...WEALTH_ENTREPRENEUR_MODULE_ROUTES, ...WEALTH_LEADER_MODULE_ROUTES];
  }
  return [];
}

/**
 * Uniform completion keys for every Building Wealth Together module. A module
 * is complete when all six keys are satisfied on the learner's ModuleProgress
 * row. This mirrors the uniform-key approach used by the Economics and
 * Development course.
 *
 *   core_media_reviewed   -> core_media_acknowledged_at
 *   lesson_reviewed       -> lesson_and_case_reviewed_at
 *   activity_acknowledged -> activity_acknowledged_at        (Try it)
 *   dilemma_acknowledged  -> interactive_scenario_completed_at (The dilemma)
 *   knowledge_check_passed-> quiz_passed
 *   reflection_acknowledged -> reflection_acknowledged_at
 */
export const WEALTH_COMPLETION_KEYS = [
  'core_media_reviewed',
  'lesson_reviewed',
  'activity_acknowledged',
  'dilemma_acknowledged',
  'knowledge_check_passed',
  'reflection_acknowledged',
];

/**
 * Public module metadata (number + title + track) for response shaping.
 * Mirrors the preview metadata in src/lib/building-wealth-together-tracks.js
 * but kept here so backend functions never depend on the client bundle.
 */
export const WEALTH_MODULE_META = {
  'module-1': { number: 'Module 1', title: 'The Power of Collective Capital', track: 'shared-core' },
  'module-2': { number: 'Module 2', title: 'Personal Runway & Household Cash Flow', track: 'shared-core' },
  'module-3': { number: 'Module 3', title: 'Debt vs. Productive Capital', track: 'shared-core' },
  'module-4': { number: 'Module 4', title: 'Community-First Market Validation', track: 'entrepreneur' },
  'module-5': { number: 'Module 5', title: 'Sustainable Pricing & Unit Economics', track: 'entrepreneur' },
  'module-6': { number: 'Module 6', title: 'Keeping the Business Alive', track: 'entrepreneur' },
  'module-7': { number: 'Module 7', title: 'Leadership Through Ubuntu & Accountability', track: 'leader' },
  'module-8': { number: 'Module 8', title: 'Consensus-Building & Joint Risk Navigation', track: 'leader' },
  'module-9': { number: 'Module 9', title: 'Project Stewardship & Execution', track: 'leader' },
};

/**
 * The three capstone options from the course material. One is submitted to
 * complete the course.
 */
export const WEALTH_CAPSTONE_FORMATS = [
  { id: 'personal_money_plan', label: 'Personal Money Plan' },
  { id: 'enterprise_plan', label: 'One-Page Enterprise Plan' },
  { id: 'group_charter', label: 'Group Financial Charter' },
];

export function isWealthCapstoneFormat(value) {
  return WEALTH_CAPSTONE_FORMATS.some((format) => format.id === value);
}

// ---------------------------------------------------------------------------
// Server-controlled publication + enrollment flags.
//
// The course is open for enrollment with all nine modules published. Flip a
// route out of PUBLISHED_MODULES and set ENROLLMENT_OPEN = false to withdraw
// it; non-admin learners then receive 403 while admins may still preview.
// ---------------------------------------------------------------------------
const PUBLISHED_MODULES = new Set(WEALTH_MODULE_ROUTES);
const ENROLLMENT_OPEN = true;

export function wealthCourseExists(courseSlug) {
  return courseSlug === WEALTH_COURSE_SLUG;
}

export function isWealthEnrollmentOpen() {
  return ENROLLMENT_OPEN;
}

export function isWealthModulePublished(courseSlug, moduleRoute) {
  if (courseSlug !== WEALTH_COURSE_SLUG) return false;
  return PUBLISHED_MODULES.has(moduleRoute);
}

export function getWealthModuleConfig(courseSlug, moduleRoute) {
  if (courseSlug !== WEALTH_COURSE_SLUG) return null;
  if (!WEALTH_MODULE_ROUTES.includes(moduleRoute)) return null;
  const meta = WEALTH_MODULE_META[moduleRoute] || { number: moduleRoute, title: moduleRoute };
  const track = WEALTH_TRACKS.find((t) => t.id === meta.track);
  return {
    route: moduleRoute,
    number: meta.number,
    title: meta.title,
    track: meta.track,
    trackLabel: track ? track.label : '',
  };
}

/**
 * The module that must be completed before this one is released.
 *
 * Track 1 runs in order. Each pathway entry point (Module 4 and Module 7)
 * follows the end of the shared core, and each pathway then runs in order.
 * This chain is pathway-independent, so a learner working through both
 * pathways is never blocked by the order they chose.
 */
export function getWealthModulePrerequisite(courseSlug, moduleRoute) {
  if (courseSlug !== WEALTH_COURSE_SLUG) return null;
  const idx = WEALTH_MODULE_ROUTES.indexOf(moduleRoute);
  if (idx <= 0) return null;
  // Module 7 opens from the end of the shared core, not from Module 6, so a
  // learner on the Emerging Leader Pathway is not forced through the
  // entrepreneur modules first.
  if (moduleRoute === 'module-7') return 'module-3';
  return WEALTH_MODULE_ROUTES[idx - 1];
}

/** The first module the learner has not completed, for "resume" links. */
export function firstIncompleteModuleRoute(completedRoutes) {
  const completed = new Set(completedRoutes || []);
  return WEALTH_MODULE_ROUTES.find((route) => !completed.has(route)) || null;
}

export function isWealthSectionAllowed(courseSlug, moduleRoute, sectionId) {
  if (courseSlug !== WEALTH_COURSE_SLUG) return false;
  if (!WEALTH_MODULE_ROUTES.includes(moduleRoute)) return false;
  return typeof sectionId === 'string' && sectionId.length > 0 && sectionId.length <= 64;
}

/**
 * Derive the subset of WEALTH_COMPLETION_KEYS satisfied by a ModuleProgress
 * row. Uniform across all nine modules.
 */
export function deriveWealthCompletedKeys(row) {
  if (!row) return [];
  const keys = [];
  if (row.core_media_acknowledged_at) keys.push('core_media_reviewed');
  if (row.lesson_and_case_reviewed_at) keys.push('lesson_reviewed');
  if (row.activity_acknowledged_at) keys.push('activity_acknowledged');
  if (row.interactive_scenario_completed_at) keys.push('dilemma_acknowledged');
  if (row.quiz_passed) keys.push('knowledge_check_passed');
  if (row.reflection_acknowledged_at) keys.push('reflection_acknowledged');
  return keys;
}