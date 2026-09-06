/**
 * Course Registry — server-side-only mapping of course slugs to their
 * required module routes, final module, title, and certificate statement.
 *
 * Imported ONLY by Base44 backend functions. Never imported by src/.
 *
 * This registry makes course-completion logic reusable across all Tamu
 * Academy courses. To support a new course, add an entry to COURSE_REGISTRY
 * — no other code changes are needed in the completion workflow or its
 * backend functions.
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