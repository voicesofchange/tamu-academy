/**
 * Publication status for every public course — the one place that answers
 * "is this course live, and how many of its modules are published?".
 *
 * Used by getPublicationStatus (the Courses page and My Courses) and by
 * getTamuGuideData (the Tamu Learning Guide), so the two can never disagree
 * or drift apart when a course is added. Returns only safe public
 * information: enrollment open, published module count, total modules and
 * whether the course is live (enrollment open AND at least one published
 * module). Courses built with the course template are read from their
 * registry entries; those marked internal (the template demo) are left out.
 *
 * Imported ONLY by Base44 backend functions. Never imported by src/.
 */
import {
  MENTAL_HEALTH_COURSE_SLUG,
  isEnrollmentOpen as isMentalHealthEnrollmentOpen,
  isModulePublished as isMentalHealthModulePublished,
} from './mental-health-curriculum.js';
import { MENTAL_HEALTH_CERTIFICATE_MODULE_ROUTES } from './mental-health-certificate.js';
import {
  ECONOMICS_COURSE_SLUG,
  ECONOMICS_MODULE_ROUTES,
  isEconomicsEnrollmentOpen,
  isEconomicsModulePublished,
} from './economics-course-config.js';
import {
  SOKO_COURSE_SLUG,
  SOKO_CORE_MODULE_ROUTES,
  SOKO_PEER_COURSE_SLUG,
  SOKO_PEER_MODULE_ROUTES,
  isSokoEnrollmentOpen,
  isSokoModulePublished,
} from './sauti-za-soko-config.js';
import {
  WAIYAKI_COURSE_SLUG,
  WAIYAKI_MODULE_ROUTES,
  isWaiyakiEnrollmentOpen,
  isWaiyakiModulePublished,
} from './waiyaki-config.js';
import {
  WEALTH_COURSE_SLUG,
  WEALTH_MODULE_ROUTES,
  isWealthEnrollmentOpen,
  isWealthModulePublished,
} from './building-wealth-together-config.js';
import {
  TEMPLATE_COURSE_REGISTRY,
  getTemplateModuleRoutes,
  isTemplateEnrollmentOpen,
  isTemplateModulePublished,
} from './course-template-config.js';

function status(slug, routes, isPublished, enrollmentOpen) {
  const publishedModuleCount = routes.filter((route) => isPublished(slug, route)).length;
  return {
    enrollmentOpen,
    publishedModuleCount,
    totalModules: routes.length,
    isLive: enrollmentOpen && publishedModuleCount > 0,
  };
}

/** { [courseSlug]: { enrollmentOpen, publishedModuleCount, totalModules, isLive } } */
export function coursePublicationStatuses() {
  const sokoOpen = isSokoEnrollmentOpen();
  const statuses = {
    [MENTAL_HEALTH_COURSE_SLUG]: status(
      MENTAL_HEALTH_COURSE_SLUG,
      MENTAL_HEALTH_CERTIFICATE_MODULE_ROUTES,
      isMentalHealthModulePublished,
      isMentalHealthEnrollmentOpen(),
    ),
    [ECONOMICS_COURSE_SLUG]: status(ECONOMICS_COURSE_SLUG, ECONOMICS_MODULE_ROUTES, isEconomicsModulePublished, isEconomicsEnrollmentOpen()),
    [SOKO_COURSE_SLUG]: status(SOKO_COURSE_SLUG, SOKO_CORE_MODULE_ROUTES, isSokoModulePublished, sokoOpen),
    [SOKO_PEER_COURSE_SLUG]: status(SOKO_PEER_COURSE_SLUG, SOKO_PEER_MODULE_ROUTES, isSokoModulePublished, sokoOpen),
    [WAIYAKI_COURSE_SLUG]: status(WAIYAKI_COURSE_SLUG, WAIYAKI_MODULE_ROUTES, isWaiyakiModulePublished, isWaiyakiEnrollmentOpen()),
    [WEALTH_COURSE_SLUG]: status(WEALTH_COURSE_SLUG, WEALTH_MODULE_ROUTES, isWealthModulePublished, isWealthEnrollmentOpen()),
  };
  for (const [slug, course] of Object.entries(TEMPLATE_COURSE_REGISTRY)) {
    if (!course || course.internal) continue;
    statuses[slug] = status(slug, getTemplateModuleRoutes(slug), isTemplateModulePublished, isTemplateEnrollmentOpen(slug));
  }
  return statuses;
}
