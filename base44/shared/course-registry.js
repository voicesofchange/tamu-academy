/**
 * Course Registry — server-side-only mapping of course slugs to their
 * required module routes, final module, title, and certificate statement.
 *
 * Imported ONLY by Base44 backend functions. Never imported by src/.
 *
 * This registry makes course-completion logic reusable across all Tamu
 * Academy courses. To support a new course, add an entry to COURSE_REGISTRY
 * — no other code changes are needed in the completion workflow or its
 * backend functions, apart from any course-specific extra requirement
 * exposed through checkExtraCompletionRequirements below.
 */
import {
  MENTAL_HEALTH_CERTIFICATE_COURSE_SLUG,
  MENTAL_HEALTH_CERTIFICATE_COURSE_TITLE,
  MENTAL_HEALTH_CERTIFICATE_STATEMENT,
  MENTAL_HEALTH_CERTIFICATE_MODULE_ROUTES,
} from './mental-health-certificate.js';
import {
  ECONOMICS_CERTIFICATE_COURSE_SLUG,
  ECONOMICS_CERTIFICATE_COURSE_TITLE,
  ECONOMICS_CERTIFICATE_STATEMENT,
  ECONOMICS_CERTIFICATE_MODULE_ROUTES,
} from './economics-course-config.js';
import {
  SOKO_COURSE_SLUG,
  SOKO_COURSE_TITLE,
  SOKO_CERTIFICATE_STATEMENT,
  SOKO_CORE_MODULE_ROUTES,
  SOKO_PEER_COURSE_SLUG,
  SOKO_PEER_COURSE_TITLE,
  SOKO_PEER_CERTIFICATE_STATEMENT,
  SOKO_PEER_MODULE_ROUTES,
  checkSokoCourseCompletionRequirements,
} from './sauti-za-soko-config.js';

export const COURSE_REGISTRY = {
  [MENTAL_HEALTH_CERTIFICATE_COURSE_SLUG]: {
    slug: MENTAL_HEALTH_CERTIFICATE_COURSE_SLUG,
    title: MENTAL_HEALTH_CERTIFICATE_COURSE_TITLE,
    completionStatement: MENTAL_HEALTH_CERTIFICATE_STATEMENT,
    requiredModuleRoutes: MENTAL_HEALTH_CERTIFICATE_MODULE_ROUTES,
  },
  [ECONOMICS_CERTIFICATE_COURSE_SLUG]: {
    slug: ECONOMICS_CERTIFICATE_COURSE_SLUG,
    title: ECONOMICS_CERTIFICATE_COURSE_TITLE,
    completionStatement: ECONOMICS_CERTIFICATE_STATEMENT,
    requiredModuleRoutes: ECONOMICS_CERTIFICATE_MODULE_ROUTES,
  },
  // Sauti za Soko core course and its optional Peer Facilitator track are
  // separate courses, so they are certified separately.
  [SOKO_COURSE_SLUG]: {
    slug: SOKO_COURSE_SLUG,
    title: SOKO_COURSE_TITLE,
    completionStatement: SOKO_CERTIFICATE_STATEMENT,
    requiredModuleRoutes: SOKO_CORE_MODULE_ROUTES,
  },
  [SOKO_PEER_COURSE_SLUG]: {
    slug: SOKO_PEER_COURSE_SLUG,
    title: SOKO_PEER_COURSE_TITLE,
    completionStatement: SOKO_PEER_CERTIFICATE_STATEMENT,
    requiredModuleRoutes: SOKO_PEER_MODULE_ROUTES,
  },
};

export function getCourseConfig(courseSlug) {
  return COURSE_REGISTRY[courseSlug] || null;
}

export function getRequiredModuleRoutes(courseSlug) {
  const config = getCourseConfig(courseSlug);
  return config ? [...config.requiredModuleRoutes] : [];
}

export function getFinalModuleRoute(courseSlug) {
  const routes = getRequiredModuleRoutes(courseSlug);
  return routes.length > 0 ? routes[routes.length - 1] : null;
}

export function isFinalModule(courseSlug, moduleRoute) {
  return getFinalModuleRoute(courseSlug) === moduleRoute;
}

/**
 * Courses whose completion requires more than every module being complete.
 *
 * Sauti za Soko requires every My Soko Action Plan section, at least one
 * peer discussion and the final reflection (or, for the Peer Facilitator
 * track, a reviewer-approved vendor-circle submission). The check lives in
 * the Sauti za Soko server-side config so the requirement list and the
 * entity names stay in one place.
 *
 * Every other course returns ok immediately, so this is additive and
 * changes nothing for existing courses.
 *
 * @returns {{ ok: boolean, missing: string[] }}
 */
export async function checkExtraCompletionRequirements(base44, learnerId, courseSlug) {
  if (courseSlug === SOKO_COURSE_SLUG || courseSlug === SOKO_PEER_COURSE_SLUG) {
    return checkSokoCourseCompletionRequirements(base44, learnerId, courseSlug);
  }
  return { ok: true, missing: [] };
}