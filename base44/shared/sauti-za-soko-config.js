/**
 * Sauti za Soko — server-side-only configuration for the two Sauti za Soko
 * courses: the seven-module core course and the optional Peer Facilitator
 * track. Imported ONLY by Base44 backend functions. Never imported by src/
 * and never bundled into the public client JavaScript.
 *
 * The full module content — including quiz answer keys — lives in
 * base44/shared/sauti-za-soko-curriculum.js and
 * base44/shared/sauti-za-soko-curriculum-advanced.js, both also
 * server-side only.
 *
 * TRUST BOUNDARY: this module holds the canonical course slugs, module
 * routes, completion keys, server-controlled publication and enrollment
 * flags, prerequisite chains, certificate metadata, and the review domains
 * that must be validated before launch. No browser-supplied value can
 * override the publication or enrollment flags; they are decided here.
 */

import { SOKO_CORE_MODULES } from './sauti-za-soko-curriculum.js';
import {
  SOKO_ADVANCED_MODULES,
  SOKO_FACILITATOR_MODULE,
} from './sauti-za-soko-curriculum-advanced.js';

// ---------------------------------------------------------------------------
// Course identity
// ---------------------------------------------------------------------------

export const SOKO_COURSE_SLUG = 'sauti-za-soko';
export const SOKO_COURSE_TITLE =
  'Sauti za Soko: Markets, Climate and Community Power';

export const SOKO_PEER_COURSE_SLUG = 'sauti-za-soko-peer-facilitator';
export const SOKO_PEER_COURSE_TITLE =
  'Sauti za Soko Peer Facilitator';

export const SOKO_CERTIFICATE_STATEMENT =
  'This certifies that the learner named below has completed all seven core modules of the course Sauti za Soko: Markets, Climate and Community Power, including the required reading, reflection prompts, Kiswahili discussion, My Soko Action Plan sections, and knowledge checks. This certificate confirms completion of an educational course. It does not constitute professional licensing, accreditation, financial advice, or authorization to provide business, credit, agricultural, or legal advice.';

export const SOKO_PEER_CERTIFICATE_STATEMENT =
  'This certifies that the learner named below has completed the Sauti za Soko Peer Facilitator track, including Module 8, a vendor-circle session plan, a facilitated discussion held with participants\' informed consent, a privacy-protecting discussion summary, and a reviewed facilitator reflection. This certificate confirms completion of an educational course. It does not constitute professional licensing, accreditation, counselling qualification, or authorization to provide business, credit, agricultural, or legal advice.';

// ---------------------------------------------------------------------------
// Module routes
// ---------------------------------------------------------------------------

export const SOKO_CORE_MODULE_ROUTES = [
  'module-1',
  'module-2',
  'module-3',
  'module-4',
  'module-5',
  'module-6',
  'module-7',
];

export const SOKO_PEER_MODULE_ROUTES = ['module-8'];

/** Public module metadata (number + title) for response shaping. */
export const SOKO_MODULE_META = {
  'module-1': { number: 'Module 1', title: 'Soko ni Yetu: The Market as an Economy' },
  'module-2': { number: 'Module 2', title: 'Biashara Is Knowledge: Reading Your Own Business' },
  'module-3': { number: 'Module 3', title: 'Money, Margin and Trust: Cash in a Small Enterprise' },
  'module-4': { number: 'Module 4', title: 'Weather, Climate and Market Risk' },
  'module-5': { number: 'Module 5', title: 'Sauti na Nguvu: County Government, Licences and Public Decisions' },
  'module-6': { number: 'Module 6', title: 'Kikundi ni Nguvu: Savings, Collective Action and Bargaining' },
  'module-7': { number: 'Module 7', title: 'Soko Endelevu: Planning a Market That Lasts' },
  'module-8': { number: 'Module 8', title: 'Facilitating a Vendor Circle' },
};

/**
 * Uniform completion keys for every core Sauti za Soko module. A module is
 * complete when all five keys are satisfied on the learner's ModuleProgress
 * row. The same five keys apply to Module 8 of the Peer Facilitator track.
 */
export const SOKO_COMPLETION_KEYS = [
  'lesson_reviewed',
  'core_reading_reviewed',
  'reflection_acknowledged',
  'knowledge_check_passed',
  'activity_acknowledged',
];

/** Human-readable labels, in the same order as SOKO_COMPLETION_KEYS. */
export const SOKO_COMPLETION_REQUIREMENTS = [
  'Read the Tamu Academy lesson and the Kiambu market case.',
  'Review the key concepts, the context notes, and the international comparison.',
  'Respond to the reflection prompt.',
  'Complete the five-question knowledge check and answer at least four correctly.',
  'Save your section of the My Soko Action Plan.',
];

export const SOKO_PEER_COMPLETION_REQUIREMENTS = [
  'Read the Module 8 facilitation lesson and the vendor-circle case.',
  'Review the key concepts and the safeguarding and consent notes.',
  'Respond to the facilitator reflection prompt.',
  'Complete the five-question knowledge check and answer at least four correctly.',
  'Submit a vendor-circle session plan and discussion summary that a reviewer has approved.',
];

// ---------------------------------------------------------------------------
// Review domains — all must be validated before the pathway is published.
// ---------------------------------------------------------------------------

export const SOKO_REVIEW_DOMAINS = [
  {
    id: 'climate-and-environment',
    label: 'Climate, weather and environmental content',
    requirement:
      'Reviewed by a Kenyan climate, meteorology or agricultural specialist.',
  },
  {
    id: 'county-governance',
    label: 'County governance and public administration',
    requirement:
      'Reviewed by someone with Kenyan county government or public-administration experience.',
  },
  {
    id: 'financial-and-enterprise',
    label: 'Financial, credit and small-enterprise content',
    requirement:
      'Reviewed by a practitioner or educator working with small enterprises in Kenya.',
  },
  {
    id: 'kiswahili',
    label: 'Kiswahili language and terminology',
    requirement:
      'Reviewed by a fluent Kiswahili speaker for accuracy, register and the discussion prompts.',
  },
  {
    id: 'safeguarding-and-consent',
    label: 'Safeguarding, consent and privacy',
    requirement:
      'Reviewed for informed consent, safeguarding and privacy in the vendor circle and peer facilitation.',
  },
  {
    id: 'accessibility',
    label: 'Accessibility and low-bandwidth use',
    requirement:
      'Reviewed for mobile, low-data and accessibility needs, including printable alternatives.',
  },
  {
    id: 'international-context',
    label: 'International learner context and framing',
    requirement:
      'Reviewed to confirm local context is explained plainly without treating other countries\u2019 systems as interchangeable.',
  },
];

// ---------------------------------------------------------------------------
// Server-controlled publication + enrollment flags.
//
// The Sauti za Soko pathway is in development and has not yet completed the
// review domains above. While a module is unpublished, non-admin learners
// receive 403 and the page shows the public "module in development" state;
// admins may preview the full flow without persisting progress.
//
// TO LAUNCH: once every SOKO_REVIEW_DOMAIN is validated, add the module
// routes to PUBLISHED_MODULES / PUBLISHED_PEER_MODULES and set
// ENROLLMENT_OPEN = true.
// ---------------------------------------------------------------------------
const PUBLISHED_MODULES = new Set([]);
const PUBLISHED_PEER_MODULES = new Set([]);
const ENROLLMENT_OPEN = false;

export function sokoCourseExists(courseSlug) {
  return courseSlug === SOKO_COURSE_SLUG || courseSlug === SOKO_PEER_COURSE_SLUG;
}

export function getSokoRequiredModuleRoutes(courseSlug) {
  if (courseSlug === SOKO_COURSE_SLUG) return [...SOKO_CORE_MODULE_ROUTES];
  if (courseSlug === SOKO_PEER_COURSE_SLUG) return [...SOKO_PEER_MODULE_ROUTES];
  return [];
}

export function isSokoEnrollmentOpen() {
  return ENROLLMENT_OPEN;
}

export function isSokoModulePublished(courseSlug, moduleRoute) {
  if (courseSlug === SOKO_COURSE_SLUG) return PUBLISHED_MODULES.has(moduleRoute);
  if (courseSlug === SOKO_PEER_COURSE_SLUG) return PUBLISHED_PEER_MODULES.has(moduleRoute);
  return false;
}

export function isSokoCoursePublished(courseSlug) {
  const routes = getSokoRequiredModuleRoutes(courseSlug);
  return routes.some((route) => isSokoModulePublished(courseSlug, route));
}

export function getSokoModuleConfig(courseSlug, moduleRoute) {
  if (!getSokoRequiredModuleRoutes(courseSlug).includes(moduleRoute)) return null;
  const meta = SOKO_MODULE_META[moduleRoute] || { number: moduleRoute, title: moduleRoute };
  return { route: moduleRoute, number: meta.number, title: meta.title };
}

export function getSokoModulePrerequisite(courseSlug, moduleRoute) {
  const routes = getSokoRequiredModuleRoutes(courseSlug);
  const idx = routes.indexOf(moduleRoute);
  if (idx <= 0) return null;
  return routes[idx - 1];
}

export function getSokoCompletionRequirements(courseSlug) {
  if (courseSlug === SOKO_PEER_COURSE_SLUG) return [...SOKO_PEER_COMPLETION_REQUIREMENTS];
  return [...SOKO_COMPLETION_REQUIREMENTS];
}

export function getSokoCertificateConfig(courseSlug) {
  if (courseSlug === SOKO_PEER_COURSE_SLUG) {
    return {
      slug: SOKO_PEER_COURSE_SLUG,
      title: SOKO_PEER_COURSE_TITLE,
      statement: SOKO_PEER_CERTIFICATE_STATEMENT,
      isPublished: () => isSokoCoursePublished(SOKO_PEER_COURSE_SLUG),
    };
  }
  if (courseSlug === SOKO_COURSE_SLUG) {
    return {
      slug: SOKO_COURSE_SLUG,
      title: SOKO_COURSE_TITLE,
      statement: SOKO_CERTIFICATE_STATEMENT,
      isPublished: () => isSokoCoursePublished(SOKO_COURSE_SLUG),
    };
  }
  return null;
}

/**
 * Derive the subset of SOKO_COMPLETION_KEYS satisfied by a ModuleProgress
 * row. Uniform across every Sauti za Soko module.
 */
export function deriveSokoCompletedKeys(row) {
  if (!row) return [];
  const keys = [];
  if (row.lesson_and_case_reviewed_at) keys.push('lesson_reviewed');
  if (row.core_media_acknowledged_at) keys.push('core_reading_reviewed');
  if (row.reflection_acknowledged_at) keys.push('reflection_acknowledged');
  if (row.quiz_passed) keys.push('knowledge_check_passed');
  if (row.activity_acknowledged_at) keys.push('activity_acknowledged');
  return keys;
}

// ---------------------------------------------------------------------------
// Content access
// ---------------------------------------------------------------------------

const SOKO_MODULE_CONTENT = {
  [SOKO_COURSE_SLUG]: { ...SOKO_CORE_MODULES, ...SOKO_ADVANCED_MODULES },
  [SOKO_PEER_COURSE_SLUG]: { ...SOKO_FACILITATOR_MODULE },
};

/**
 * Resolve the full, in-development module content for a (courseSlug,
 * moduleRoute) pair. Returns null when no match exists so the calling
 * backend function can respond 404. The returned object is the raw module
 * (including quizzes and answer keys) — never send it back to a request
 * that has not first passed the server-side access checks in the calling
 * backend function.
 */
export function getSokoSensitiveModuleContent(courseSlug, moduleRoute) {
  const course = SOKO_MODULE_CONTENT[courseSlug];
  if (!course) return null;
  return course[moduleRoute] || null;
}

// ---------------------------------------------------------------------------
// Course-level completion requirements beyond the seven modules
// ---------------------------------------------------------------------------

/**
 * Evaluate the Sauti za Soko requirements that sit outside module
 * completion. Called by completeCourseEnrollment before an enrollment is
 * marked complete, so a learner cannot be certified for the core course
 * without every My Soko Action Plan section, at least one peer discussion,
 * and the final reflection — or for the Peer Facilitator track without an
 * approved submission.
 *
 * @returns {{ ok: boolean, missing: string[] }}
 */
export async function checkSokoCourseCompletionRequirements(base44, learnerId, courseSlug) {
  const missing = [];

  if (courseSlug === SOKO_COURSE_SLUG) {
    const plans = await base44.asServiceRole.entities.SokoActionPlan.filter({
      learner_id: learnerId,
      course_slug: courseSlug,
    });
    const savedModules = new Set(
      (Array.isArray(plans) ? plans : [])
        .filter((row) => row && row.filled_count > 0)
        .map((row) => row.module_slug),
    );
    for (const route of SOKO_CORE_MODULE_ROUTES) {
      if (!savedModules.has(route)) {
        const meta = SOKO_MODULE_META[route];
        missing.push(`My Soko Action Plan \u2014 ${meta ? meta.number : route}`);
      }
    }

    const discussions = await base44.asServiceRole.entities.SokoDiscussion.filter({
      learner_id: learnerId,
      course_slug: courseSlug,
    });
    if (!Array.isArray(discussions) || discussions.length === 0) {
      missing.push('One peer discussion response');
    }

    const reflections = await base44.asServiceRole.entities.SokoReflection.filter({
      learner_id: learnerId,
      course_slug: courseSlug,
    });
    const hasReflection = (Array.isArray(reflections) ? reflections : []).some(
      (row) => row && typeof row.reflection === 'string' && row.reflection.trim().length > 0,
    );
    if (!hasReflection) {
      missing.push('The final course reflection');
    }

    return { ok: missing.length === 0, missing };
  }

  if (courseSlug === SOKO_PEER_COURSE_SLUG) {
    const submissions = await base44.asServiceRole.entities.SokoFacilitatorSubmission.filter({
      learner_id: learnerId,
      course_slug: courseSlug,
    });
    const approved = (Array.isArray(submissions) ? submissions : []).some(
      (row) => row && row.status === 'approved',
    );
    if (!approved) {
      missing.push('A vendor-circle submission approved by a reviewer');
    }
    return { ok: approved, missing };
  }

  return { ok: true, missing: [] };
}