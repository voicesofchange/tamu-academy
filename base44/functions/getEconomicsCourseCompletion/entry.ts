import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import {
  ECONOMICS_COURSE_SLUG,
  ECONOMICS_CERTIFICATE_MODULE_ROUTES,
  getEconomicsModuleConfig,
  isEconomicsModulePublished,
} from '../../shared/economics-course-config.js';

/**
 * getEconomicsCourseCompletion — authenticated, non-mutating endpoint
 * that evaluates whether the current learner has completed all six
 * modules of the Understanding African Economies and the Global System
 * course.
 *
 * SCOPE:
 *   - Reads only the current authenticated user's ModuleProgress rows.
 *   - Creates NO record. Performs NO update.
 *   - Returns per-module completion status, overall course completion,
 *     the list of incomplete modules, and certificate eligibility.
 *
 * TRUST BOUNDARY:
 *   - Unauthenticated -> 401.
 *   - Unknown course -> 404.
 *   - Course completion is determined exclusively from server-side
 *     ModuleProgress rows with status='completed'.
 *   - Certificate eligibility requires all six modules completed AND
 *     eligibleToSave (active enrollment + at least one published module).
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

    const courseSlug = typeof body.courseSlug === 'string' ? body.courseSlug.trim() : '';
    if (!courseSlug || courseSlug !== ECONOMICS_COURSE_SLUG) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    // Eligibility to save (for certificate issuance later): active
    // enrollment AND at least one published module.
    const enrollmentRows = await base44.asServiceRole.entities.CourseEnrollment.filter({
      learner_id: user.id,
      course_slug: courseSlug,
      status: 'active',
    });
    const hasEnrollment = !!(enrollmentRows && enrollmentRows.length > 0);

    let anyPublished = false;
    for (const route of ECONOMICS_CERTIFICATE_MODULE_ROUTES) {
      if (isEconomicsModulePublished(courseSlug, route)) {
        anyPublished = true;
        break;
      }
    }
    const eligibleToSave = hasEnrollment && anyPublished;

    // Read all ModuleProgress rows for this learner + course.
    const progressRows = await base44.asServiceRole.entities.ModuleProgress.filter({
      learner_id: user.id,
      course_slug: courseSlug,
    });

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

    const moduleStatuses = ECONOMICS_CERTIFICATE_MODULE_ROUTES.map((route) => {
      const config = getEconomicsModuleConfig(courseSlug, route);
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
    const totalModules = ECONOMICS_CERTIFICATE_MODULE_ROUTES.length;
    const courseCompleted = completedCount === totalModules;
    const incompleteModules = moduleStatuses
      .filter((m) => !m.completed)
      .map((m) => ({ route: m.route, number: m.number, title: m.title }));

    const certificateEligible = courseCompleted && eligibleToSave;

    return Response.json({
      courseSlug,
      modules: moduleStatuses,
      completedCount,
      totalModules,
      courseCompleted,
      incompleteModules,
      certificateEligible,
      eligibleToSave,
    });
  } catch (error) {
    console.error('[getEconomicsCourseCompletion] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}