/**
 * MENTAL HEALTH PILLAR — server-side-only curriculum store.
 *
 * MIRRORS THE ECONOMICS TRUST BOUNDARY:
 *   This file is imported ONLY by Base44 backend functions
 *   (base44/functions/getMentalHealthModule/entry.ts and any future
 *   grading/completion helpers). It MUST NEVER be imported by any file in
 *   src/. Anything inside this file is therefore never bundled into the
 *   public browser JavaScript.
 *
 * PHASE 1 STATUS:
 *   Intentionally ALMOST EMPTY. The complete in-development module
 *   content — recorded lesson links, written explanation, key concepts,
 *   watching questions, case study, applied activity instructions,
 *   knowledge check questions, answer keys, reflection prompts,
 *   completion requirements, closing text, and source references —
 *   has NOT been added yet. Only a small shell lookup table is present
 *   so that `getMentalHealthModule` can return authorized shell data
 *   (and a stable "this module exists" signal) without reaching the
 *   client bundle.
 *
 * SAFETY STANDARD (mandatory, do not regress):
 *   The following sensitive content MUST NEVER be stored in this file,
 *   sent to any backend function, persisted in any entity field, or
 *   captured by analytics events:
 *     - Community of Care Map responses
 *     - Reflection text
 *     - Personal support contacts
 *     - Diagnoses, symptoms, trauma narratives
 *     - Family information
 *     - Crisis disclosures
 *   Later activities that produce these will use temporary browser
 *   component state and a printable or offline option. Only neutral
 *   completion acknowledgments (a boolean flag and an enum completion
 *   mode) ever leave the learner's browser.
 *
 * EXPECTED FUTURE OBJECT SHAPE (named here for editor alignment, but
 * not yet populated):
 *   {
 *     route, number, title,
 *     learningObjectives: string[],
 *     overview: string[],      // Tamu Academy introduction
 *     media: { primary, supporting[] },
 *     watchingQuestions: string[],
 *     explanation: string[],   // original Tamu Academy explanation
 *     keyConcepts: [{ term, definition, example? }],
 *     caseStudy: { ... },       // African case study
 *     policyActivity: { ... },  // Community of Care Map activity metadata
 *     knowledgeCheck: {        // questions; answerKey and feedback are
 *                              // server-protected and never sent to a
 *                              // client bundle
 *       questions: [{ prompt, options[] }],
 *       answerKey: number[],    // NEVER sent to learner
 *       feedback: string[]       // returned to learner only after submit
 *     },
 *     reflectionPrompts: string[],
 *     completionRequirements: string[],
 *     closingText: string[],
 *     sources: string[],
 *     publicationStatus: 'unpublished' | 'published',
 *     prerequisite: string | null
 *   }
 *
 * Maintenance: keep this file structurally parallel to
 * base44/shared/economics-curriculum.js once full content lands, but
 * do NOT cross-import or merge the two stores.
 */

export const MENTAL_HEALTH_COURSE_SLUG = 'ubuntu-and-mental-health';

// Authoritative list of valid (courseSlug, moduleRoute) pairs that the
// backend function will recognize as "this course exists." Any other
// request is rejected with 404 — even from an admin. The values mirror
// the public browser metadata in src/lib/mental-health-tracks.js.
export const MENTAL_HEALTH_SHELL = {
  courseSlug: MENTAL_HEALTH_COURSE_SLUG,
  modules: [
    { route: 'module-1', number: 'Module 1', title: 'Ubuntu and Relational Personhood', status: 'In Development', publicationStatus: 'unpublished' },
    { route: 'module-2', number: 'Module 2', title: 'Stress, Stigma, and Structural Conditions', status: 'Coming Soon', publicationStatus: 'unpublished' },
    { route: 'module-3', number: 'Module 3', title: 'Comparing Approaches to Care', status: 'Coming Soon', publicationStatus: 'unpublished' },
    { route: 'module-4', number: 'Module 4', title: 'Community Involvement in Mental Health Care', status: 'Coming Soon', publicationStatus: 'unpublished' },
    { route: 'module-5', number: 'Module 5', title: 'Evaluating Culturally Affirming Programs', status: 'Coming Soon', publicationStatus: 'unpublished' },
    { route: 'module-6', number: 'Module 6', title: 'Youth, Racism, and Health Systems', status: 'Coming Soon', publicationStatus: 'unpublished' },
    { route: 'module-7', number: 'Module 7', title: 'Roots of Resilience: Recovery, Collective Healing, and Action', status: 'Coming Soon', publicationStatus: 'unpublished' },
  ],
};

/**
 * Phase 1 lookup. Returns a small shell stub for an authorized admin
 * request, or null for any unknown (courseSlug, moduleRoute) pair.
 *
 * Phase 2 will replace this with a full lesson lookup keyed by route,
 * plus answer-key returns behind `getMentalHealthModule`'s gated path.
 * Until then this stub signals "the route is registered but content is
 * not yet available," which is exactly what the public shell metadata
 * already establishes.
 */
export function getMentalHealthModuleContent(courseSlug, moduleRoute) {
  if (courseSlug !== MENTAL_HEALTH_SHELL.courseSlug) return null;
  const module = MENTAL_HEALTH_SHELL.modules.find((m) => m.route === moduleRoute);
  if (!module) return null;
  return {
    route: module.route,
    number: module.number,
    title: module.title,
    status: module.status,
    publicationStatus: module.publicationStatus,
    contentAvailable: false,
  };
}