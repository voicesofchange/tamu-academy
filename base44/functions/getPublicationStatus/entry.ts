/**
 * getPublicationStatus — public, non-authenticated endpoint that returns
 * the server-controlled publication state for each course. Used by the
 * Courses page to show accurate status labels ("Now Available" once a
 * course is live, "In Development" otherwise) without duplicating the
 * publication flags into the client bundle.
 *
 * Returns ONLY safe public information: whether enrollment is open, how
 * many modules are published, and whether the course is "live" (enrollment
 * open AND at least one published module). No learner data, no content,
 * no answer material.
 */
import {
  MENTAL_HEALTH_COURSE_SLUG,
  isEnrollmentOpen,
  isModulePublished,
} from '../../shared/mental-health-curriculum.js';
import {
  MENTAL_HEALTH_CERTIFICATE_MODULE_ROUTES,
} from '../../shared/mental-health-certificate.js';
import {
  ECONOMICS_COURSE_SLUG,
  ECONOMICS_MODULE_ROUTES,
  isEconomicsEnrollmentOpen,
  isEconomicsModulePublished,
} from '../../shared/economics-course-config.js';
import {
  SOKO_COURSE_SLUG,
  SOKO_CORE_MODULE_ROUTES,
  SOKO_PEER_COURSE_SLUG,
  SOKO_PEER_MODULE_ROUTES,
  isSokoEnrollmentOpen,
  isSokoModulePublished,
} from '../../shared/sauti-za-soko-config.js';

export default async function(req: Request): Promise<Response> {
  try {
    // Mental Health course
    const mhPublishedCount = MENTAL_HEALTH_CERTIFICATE_MODULE_ROUTES.filter(
      (r) => isModulePublished(MENTAL_HEALTH_COURSE_SLUG, r)
    ).length;
    const mhEnrollmentOpen = isEnrollmentOpen();
    const mhTotalModules = MENTAL_HEALTH_CERTIFICATE_MODULE_ROUTES.length;
    const mhIsLive = mhEnrollmentOpen && mhPublishedCount > 0;

    // Economics course
    const econPublishedCount = ECONOMICS_MODULE_ROUTES.filter(
      (r) => isEconomicsModulePublished(ECONOMICS_COURSE_SLUG, r)
    ).length;
    const econEnrollmentOpen = isEconomicsEnrollmentOpen();
    const econTotalModules = ECONOMICS_MODULE_ROUTES.length;
    const econIsLive = econEnrollmentOpen && econPublishedCount > 0;

    // Sauti za Soko core course
    const sokoPublishedCount = SOKO_CORE_MODULE_ROUTES.filter(
      (r) => isSokoModulePublished(SOKO_COURSE_SLUG, r)
    ).length;
    const sokoEnrollmentOpen = isSokoEnrollmentOpen();
    const sokoIsLive = sokoEnrollmentOpen && sokoPublishedCount > 0;

    // Sauti za Soko Peer Facilitator track
    const sokoPeerPublishedCount = SOKO_PEER_MODULE_ROUTES.filter(
      (r) => isSokoModulePublished(SOKO_PEER_COURSE_SLUG, r)
    ).length;
    const sokoPeerIsLive = sokoEnrollmentOpen && sokoPeerPublishedCount > 0;

    return Response.json({
      courses: {
        [MENTAL_HEALTH_COURSE_SLUG]: {
          enrollmentOpen: mhEnrollmentOpen,
          publishedModuleCount: mhPublishedCount,
          totalModules: mhTotalModules,
          isLive: mhIsLive,
        },
        [ECONOMICS_COURSE_SLUG]: {
          enrollmentOpen: econEnrollmentOpen,
          publishedModuleCount: econPublishedCount,
          totalModules: econTotalModules,
          isLive: econIsLive,
        },
        [SOKO_COURSE_SLUG]: {
          enrollmentOpen: sokoEnrollmentOpen,
          publishedModuleCount: sokoPublishedCount,
          totalModules: SOKO_CORE_MODULE_ROUTES.length,
          isLive: sokoIsLive,
        },
        [SOKO_PEER_COURSE_SLUG]: {
          enrollmentOpen: sokoEnrollmentOpen,
          publishedModuleCount: sokoPeerPublishedCount,
          totalModules: SOKO_PEER_MODULE_ROUTES.length,
          isLive: sokoPeerIsLive,
        },
      },
    });
  } catch (error) {
    console.error('[getPublicationStatus] Error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}