/**
 * getTamuGuideData — public, non-authenticated endpoint that returns
 * approved public Tamu Academy information for the Tamu Learning Guide
 * agent: published courses (title, slug, short description, module
 * count, estimated time, publication status, certificate availability,
 * public overview route), approved public learning resources, and
 * public site navigation links.
 *
 * SCOPE:
 *   - No authentication required. No learner data. No curriculum,
 *     assessments, answer keys, feedback, internal notes, unpublished
 *     records, or internal database identifiers.
 *   - Certificate availability is derived server-side: a course has a
 *     certificate available only when it is registered in the course
 *     registry (has a completion statement) AND is live (enrollment
 *     open AND at least one published module).
 */
import {
  MENTAL_HEALTH_COURSE_SLUG,
  isEnrollmentOpen as isMhEnrollmentOpen,
  isModulePublished as isMhModulePublished,
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
import { getCourseConfig } from '../../shared/course-registry.js';
import {
  TAMU_GUIDE_COURSES,
  TAMU_GUIDE_RESOURCES,
  TAMU_GUIDE_NAV,
} from '../../shared/tamu-guide-data.js';

export default async function(_req: Request): Promise<Response> {
  try {
    // Publication status per course (mirrors getPublicationStatus).
    const mhPublishedCount = MENTAL_HEALTH_CERTIFICATE_MODULE_ROUTES.filter(
      (r) => isMhModulePublished(MENTAL_HEALTH_COURSE_SLUG, r)
    ).length;
    const mhEnrollmentOpen = isMhEnrollmentOpen();
    const mhTotalModules = MENTAL_HEALTH_CERTIFICATE_MODULE_ROUTES.length;
    const mhIsLive = mhEnrollmentOpen && mhPublishedCount > 0;

    const econPublishedCount = ECONOMICS_MODULE_ROUTES.filter(
      (r) => isEconomicsModulePublished(ECONOMICS_COURSE_SLUG, r)
    ).length;
    const econEnrollmentOpen = isEconomicsEnrollmentOpen();
    const econTotalModules = ECONOMICS_MODULE_ROUTES.length;
    const econIsLive = econEnrollmentOpen && econPublishedCount > 0;

    const pubStatus: Record<string, { enrollmentOpen: boolean; publishedModuleCount: number; totalModules: number; isLive: boolean }> = {
      [MENTAL_HEALTH_COURSE_SLUG]: { enrollmentOpen: mhEnrollmentOpen, publishedModuleCount: mhPublishedCount, totalModules: mhTotalModules, isLive: mhIsLive },
      [ECONOMICS_COURSE_SLUG]: { enrollmentOpen: econEnrollmentOpen, publishedModuleCount: econPublishedCount, totalModules: econTotalModules, isLive: econIsLive },
    };

    // Build the public course list, enriching each entry with live
    // publication status and server-verified certificate availability.
    const courses = TAMU_GUIDE_COURSES.map((c) => {
      const status = pubStatus[c.slug];
      const hasCertConfig = !!getCourseConfig(c.slug);
      const certificateAvailable = !!(status && status.isLive && hasCertConfig);
      return {
        slug: c.slug,
        title: c.title,
        shortDescription: c.shortDescription,
        moduleCount: c.moduleCount,
        estimatedTime: c.estimatedTime,
        overviewRoute: c.overviewRoute,
        level: c.level,
        format: c.format,
        enrollmentOpen: status ? status.enrollmentOpen : false,
        publishedModuleCount: status ? status.publishedModuleCount : 0,
        isLive: status ? status.isLive : false,
        certificateAvailable,
      };
    });

    return Response.json({
      courses,
      resources: TAMU_GUIDE_RESOURCES,
      navigation: TAMU_GUIDE_NAV,
    });
  } catch (error) {
    console.error('[getTamuGuideData] Error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}