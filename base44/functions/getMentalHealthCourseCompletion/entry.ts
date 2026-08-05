import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import {
  MENTAL_HEALTH_COURSE_SLUG,
  isModulePublished,
  getModuleConfig,
} from '../../shared/mental-health-curriculum.js';
import {
  MENTAL_HEALTH_CERTIFICATE_MODULE_ROUTES,
} from '../../shared/mental-health-certificate.js';

/**
 * getMentalHealthCourseCompletion — authenticated, non-mutating endpoint
 * that evaluates whether the current learner has completed all seven
 * modules of the Mental Health, Community and Culture course.
 *
 * SCOPE:
 *   - Reads only the current authenticated user's ModuleProgress rows.
 *   - Creates NO record. Performs NO update.
 *   - Returns per-module completion status, overall course completion,
 *     the list of incomplete modules, and certificate eligibility.
 *   - Returns no internal record IDs, answer material, scores, or
 *     information about another person.
 *
 * TRUST BOUNDARY:
 *   - Unauthenticated -> 401.
 *   - Unknown course -> 404.
 *   - Course completion is determined exclusively from server-side
 *     ModuleProgress rows with status='completed'. No browser-supplied
 *     completion value is accepted.
 *   - Certificate eligibility requires all seven modules completed.
 *   - Module 7 completion alone must not be treated as course completion.
 *
 * RESPONSE SHAPE:
 *   {
 *     courseSlug: string,
 *     modules: [{ route, number, title, completed, completedAt }],
 *     completedCount: number,
 *     totalModules: number,
 *     courseCompleted: boolean,
 *     incompleteModules: [{ route, number, title }],
 *     certificateEligible: boolean,
 *     eligibleToSave: boolean
 *   }
 */
export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);

    let user = null;
    try {
      user = await base44.auth.me();
    } catch (_) {
      user = null;
    }
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let body: Record<string, unknown> = {};
    try {
      body = await req.json();
    } catch (_) {
      body = {};
    }

    const allowedKeys = new Set(['courseSlug']);
    for (const k of Object.keys(body)) {
      if (!allowedKeys.has(k)) {
        return Response.json({ error: 'Unsupported field: ' + k }, { status: 400 });
      }
    }

    const courseSlug =
      typeof body.courseSlug === 'string' ? body.courseSlug.trim() : '';

    if (!courseSlug || courseSlug !== MENTAL_HEALTH_COURSE_SLUG) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    const isAdmin = user.role === 'admin';

    // Determine eligibility to save (for certificate issuance later).
    // Requires the course to have at least one published module AND
    // active enrollment. During development (all modules unpublished),
    // this is false for everyone.
    let eligibleToSave = false;
    const enrollmentRows = await base44.asServiceRole.entities.CourseEnrollment.filter({
      learner_id: user.id,
      course_slug: courseSlug,
      status: 'active',
    });
    const hasEnrollment = !!(enrollmentRows && enrollmentRows.length > 0);

    // Check if any module is published (course is "live" for learners).
    let anyPublished = false;
    for (const route of MENTAL_HEALTH_CERTIFICATE_MODULE_ROUTES) {
      if (isModulePublished(courseSlug, route)) {
        anyPublished = true;
        break;
      }
    }
    eligibleToSave = hasEnrollment && anyPublished;

    // Read all ModuleProgress rows for this learner + course.
    const progressRows = await base44.asServiceRole.entities.ModuleProgress.filter({
      learner_id: user.id,
      course_slug: courseSlug,
    });

    // Build a map of route -> progress row.
    const progressMap: Record<string, { status: string; completed_at: string | null }> = {};
    if (Array.isArray(progressRows)) {
      for (const row of progressRows) {
        if (row && row.module_slug) {
          progressMap[row.module_slug] = {
            status: row.status || 'in_progress',
            completed_at: row.completed_at || null,
          };
        }
      }
    }

    // Build per-module status from the canonical module config.
    const moduleStatuses = MENTAL_HEALTH_CERTIFICATE_MODULE_ROUTES.map((route) => {
      const config = getModuleConfig(courseSlug, route);
      const progress = progressMap[route];
      const completed = !!(progress && progress.status === 'completed' && progress.completed_at);
      return {
        route,
        number: config ? config.number : route,
        title: config ? config.title : route,
        completed,
        completedAt: progress ? progress.completed_at : null,
      };
    });

    const completedCount = moduleStatuses.filter((m) => m.completed).length;
    const totalModules = MENTAL_HEALTH_CERTIFICATE_MODULE_ROUTES.length;
    const courseCompleted = completedCount === totalModules;
    const incompleteModules = moduleStatuses
      .filter((m) => !m.completed)
      .map((m) => ({ route: m.route, number: m.number, title: m.title }));

    // Certificate eligibility: all modules completed AND eligible to save
    // (published + enrolled). During development, eligibleToSave is false
    // so certificateEligible is false for everyone — admins get preview
    // only.
    const certificateEligible = courseCompleted && eligibleToSave;

    return Response.json({
      courseSlug,
      hasEnrollment,
      modules: moduleStatuses,
      completedCount,
      totalModules,
      courseCompleted,
      incompleteModules,
      certificateEligible,
      eligibleToSave,
    });
  } catch (error) {
    console.error('[getMentalHealthCourseCompletion] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}