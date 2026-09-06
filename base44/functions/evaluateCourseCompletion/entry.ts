import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';
import {
  getCourseConfig,
  getRequiredModuleRoutes,
  isFinalModule,
} from '../../shared/course-registry.js';

/**
 * evaluateCourseCompletion — workflow-facing backend function.
 *
 * Given a learner_id, course_slug, and module_slug from a ModuleProgress
 * update trigger, determines:
 *   1. Whether the completed module is the final required module for the
 *      course (derived from the course registry, not hardcoded).
 *   2. If it is the final module, whether EVERY required module for the
 *      course has a ModuleProgress row with status "completed".
 *   3. The learner's CourseEnrollment record id, if one exists.
 *
 * This function performs NO writes. It only reads and evaluates, so it
 * can never cause the triggering ModuleProgress record to be updated
 * (preventing workflow loops).
 *
 * Returns:
 *   {
 *     is_final_module: boolean,
 *     all_modules_complete: boolean,
 *     learner_id: string,
 *     course_slug: string,
 *     final_module_slug: string | null,
 *     enrollment_id: string | null,
 *     incomplete_modules: string[]
 *   }
 */
export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);

    let body: Record<string, unknown> = {};
    try {
      body = await req.json();
    } catch (_) {
      body = {};
    }

    const learnerId = String(body.learner_id || '');
    const courseSlug = String(body.course_slug || '');
    const moduleSlug = String(body.module_slug || '');

    if (!learnerId || !courseSlug || !moduleSlug) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const courseConfig = getCourseConfig(courseSlug);
    if (!courseConfig) {
      return Response.json({ error: 'Unknown course' }, { status: 404 });
    }

    const finalModule = isFinalModule(courseSlug, moduleSlug);

    if (!finalModule) {
      return Response.json({
        is_final_module: false,
        all_modules_complete: false,
        learner_id: learnerId,
        course_slug: courseSlug,
        final_module_slug: null,
        enrollment_id: null,
        incomplete_modules: [],
      });
    }

    // Final module completed — retrieve all ModuleProgress records for
    // this learner + course and verify every required module is complete.
    const progressRows = await base44.asServiceRole.entities.ModuleProgress.filter({
      learner_id: learnerId,
      course_slug: courseSlug,
    });

    const progressMap: Record<string, string> = {};
    if (Array.isArray(progressRows)) {
      for (const row of progressRows) {
        if (row && row.module_slug) {
          progressMap[row.module_slug] = row.status || 'in_progress';
        }
      }
    }

    const requiredRoutes = getRequiredModuleRoutes(courseSlug);
    const incompleteModules: string[] = [];
    for (const route of requiredRoutes) {
      const status = progressMap[route];
      if (!status || status !== 'completed') {
        incompleteModules.push(route);
      }
    }

    const allComplete = incompleteModules.length === 0;

    // Find the enrollment record for this learner + course.
    const enrollmentRows = await base44.asServiceRole.entities.CourseEnrollment.filter({
      learner_id: learnerId,
      course_slug: courseSlug,
    });

    let enrollmentId: string | null = null;
    if (Array.isArray(enrollmentRows) && enrollmentRows.length > 0) {
      enrollmentId = enrollmentRows[0].id || null;
    }

    return Response.json({
      is_final_module: true,
      all_modules_complete: allComplete,
      learner_id: learnerId,
      course_slug: courseSlug,
      final_module_slug: moduleSlug,
      enrollment_id: enrollmentId,
      incomplete_modules: allComplete ? [] : incompleteModules,
    });
  } catch (error) {
    console.error('[evaluateCourseCompletion] Error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}