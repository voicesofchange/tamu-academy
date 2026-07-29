/**
 * MENTAL HEALTH PILLAR — server-side-only curriculum + course configuration store.
 * ============================================================================
 * MIRRORS THE ECONOMICS TRUST BOUNDARY:
 *   This file is imported ONLY by Base44 backend functions
 *   (getMentalHealthModule, enrollMentalHealth, updateMentalHealthProgress
 *   and any future graders). It MUST NEVER be imported by any file in src/.
 *   Anything inside this file is therefore never bundled into the public
 *   browser JavaScript.
 *
 * PHASE 1 STATUS:
 *   Intentionally ALMOST EMPTY on the curriculum-content side. The
 *   complete in-development module content — recorded lesson links,
 *   written explanation, key concepts, watching questions, case study,
 *   applied activity instructions, knowledge check questions, answer
 *   keys, reflection prompts, completion requirements, closing text,
 *   and source references — has NOT been added yet. Only course-level
 *   configuration and a module-spine config table exist here.
 *
 * CANONICAL SERVER-SIDE CONFIGURATION (Phase 1 correction):
 *   This file is the single source of truth for:
 *     - Course slug (mental-health-community-and-culture) and the
 *       server-controlled `enrollmentOpen` flag (false during development).
 *     - Module route registered to this course + current publication
 *       status (every module currently `unpublished`).
 *     - Module prerequisite chain.
 *     - Per-module server-side section identifier allow-list (currently
 *       EMPTY for every module — valid section identifiers will be
 *       defined when each module's content pack is loaded in a later
 *       phase).
 *   These values are referenced by the trusted backend functions
 *   ONLY — never by browser code. The function-level access checks use
 *   isEnrollmentOpen / isModulePublished / getModulePrerequisite /
 *   isSectionAllowed and never read these flags from the request body.
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
 * COMPLETION (deferred — do not regress):
 *   Neither this file nor any function in this course marks a module or
 *   the course `completed` automatically. The final applied assignment
 *   requirement remains an open editorial decision; a separate grading
 *   and completion function will be authored in a later phase.
 *
 * MAINTENANCE:
 *   Keep this file structurally parallel to
 *   base44/shared/economics-curriculum.js once full content lands, but
 *   do NOT cross-import or merge the two stores.
 */

export const MENTAL_HEALTH_COURSE_SLUG = 'mental-health-community-and-culture';

/**
 * Server-controlled course configuration. The `enrollmentOpen` flag is the
 * single mechanism that gates public enrollment during the development
 * phase.
 *   false  →  only admins may call enrollMentalHealth; ordinary
 *              authenticated users receive HTTP 403 from the function.
 *              The learner-derived `learner_id` is still set from auth
 *              only, regardless of who calls the function.
 *   true   →  any authenticated user may enroll
 *              (intended to be enabled only after launch).
 *
 * No browser-supplied `enrollmentOpen` can override this value — the
 * enrollMentalHealth function refuses a body that attempts to set it.
 */
export const MENTAL_HEALTH_COURSE_CONFIG = {
  courseSlug: MENTAL_HEALTH_COURSE_SLUG,
  enrollmentOpen: false,
  modules: [
    {
      route: 'module-1',
      number: 'Module 1',
      title: 'Ubuntu and Communal Wellness: African Philosophies of Mental Health',
      status: 'In Development',
      publicationStatus: 'unpublished',
      prerequisite: null,
      sections: [],
    },
    {
      route: 'module-2',
      number: 'Module 2',
      title: 'Stress, Stigma, and Strength: Rethinking Mental Health Narratives in African and Diaspora Communities',
      status: 'Coming Soon',
      publicationStatus: 'unpublished',
      prerequisite: 'module-1',
      sections: [],
    },
    {
      route: 'module-3',
      number: 'Module 3',
      title: 'Family Expectations and Cultural Scripts: Talking About Mental Health at Home',
      status: 'Coming Soon',
      publicationStatus: 'unpublished',
      prerequisite: 'module-2',
      sections: [],
    },
    {
      route: 'module-4',
      number: 'Module 4',
      title: 'Community Healing in Practice: Friendship Bench, StrongMinds, and Brother Be Well',
      status: 'Coming Soon',
      publicationStatus: 'unpublished',
      prerequisite: 'module-3',
      sections: [],
    },
    {
      route: 'module-5',
      number: 'Module 5',
      title: 'Faith, Tradition, and Professional Care: Bridging Spiritual Supports and Clinical Pathways',
      status: 'Coming Soon',
      publicationStatus: 'unpublished',
      prerequisite: 'module-4',
      sections: [],
    },
    {
      route: 'module-6',
      number: 'Module 6',
      title: 'Building Culturally Affirming Systems: Policy, Media, and Youth Advocacy for Global Mental Health',
      status: 'Coming Soon',
      publicationStatus: 'unpublished',
      prerequisite: 'module-5',
      sections: [],
    },
    {
      route: 'module-7',
      number: 'Module 7',
      title: 'Roots of Resilience: Storytelling, Survival, and Collective Healing',
      status: 'Coming Soon',
      publicationStatus: 'unpublished',
      prerequisite: 'module-6',
      sections: [],
    },
  ],
};

/** Whether public enrollment is permitted for non-admins. */
export function isEnrollmentOpen() {
  return MENTAL_HEALTH_COURSE_CONFIG.enrollmentOpen === true;
}

/** Whether a given course slug matches this course's canonical slug. */
export function courseExists(courseSlug) {
  return courseSlug === MENTAL_HEALTH_COURSE_CONFIG.courseSlug;
}

/** Returns the server-side ModuleConfig for (courseSlug, moduleRoute) or null. */
export function getModuleConfig(courseSlug, moduleRoute) {
  if (!courseExists(courseSlug)) return null;
  return MENTAL_HEALTH_COURSE_CONFIG.modules.find((m) => m.route === moduleRoute) || null;
}

/** True only if the module's server-side publicationStatus is 'published'. */
export function isModulePublished(courseSlug, moduleRoute) {
  const m = getModuleConfig(courseSlug, moduleRoute);
  return !!m && m.publicationStatus === 'published';
}

/** Returns the server-side prerequisite route for a module, or null if none. */
export function getModulePrerequisite(courseSlug, moduleRoute) {
  const m = getModuleConfig(courseSlug, moduleRoute);
  if (!m) return null;
  return m.prerequisite || null;
}

/**
 * Validates a section identifier against this module's server-side
 * allow-list. Returns false if the module doesn't exist, the
 * allow-list is empty (current Phase 1 state for every module), or
 * the section is not in the allow-list. Section identifiers are
 * defined only when a module's content pack lands.
 */
export function isSectionAllowed(courseSlug, moduleRoute, sectionId) {
  const m = getModuleConfig(courseSlug, moduleRoute);
  if (!m) return false;
  if (!Array.isArray(m.sections) || m.sections.length === 0) return false;
  return m.sections.includes(sectionId);
}

/**
 * Phase 1 lookup for the role-gated `getMentalHealthModule` function.
 * Returns a small shell stub for an authorized admin request, or null
 * for any unknown (courseSlug, moduleRoute) pair.
 *
 * Phase 2 will replace this with a full lesson lookup keyed by route,
 * plus answer-key returns behind the function's gated path. Until
 * then this stub signals "the route is registered but content is not
 * yet available."
 */
export function getMentalHealthModuleContent(courseSlug, moduleRoute) {
  const m = getModuleConfig(courseSlug, moduleRoute);
  if (!m) return null;
  return {
    route: m.route,
    number: m.number,
    title: m.title,
    status: m.status,
    publicationStatus: m.publicationStatus,
    prerequisite: m.prerequisite || null,
    contentAvailable: false,
  };
}