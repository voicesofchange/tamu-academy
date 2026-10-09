import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import {
  WEALTH_COURSE_SLUG,
  WEALTH_MODULE_ROUTES,
  getWealthModuleConfig,
  isWealthModulePublished,
} from '../../shared/building-wealth-together-config.js';

/**
 * getWealthCourseCompletion — authenticated, non-mutating endpoint that
 * evaluates whether the current learner has completed all nine modules of
 * the Building Wealth Together course and submitted the capstone project.
 *
 * SCOPE:
 *   - Reads only the current authenticated user's ModuleProgress and
 *     WealthCapstone rows.
 *   - Creates NO record. Performs NO update.
 *   - Returns per-module completion status, capstone submission status,
 *     overall course completion, the list of incomplete modules, and
 *     certificate eligibility.
 *
 * TRUST BOUNDARY:
 *   - Unauthenticated -> 401.
 *   - Unknown course -> 404.
 *   - Course completion is determined exclusively from server-side
 *     ModuleProgress rows with status='completed' plus a capstone row whose
 *     submitted_at is set.
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
    if (courseSlug !== WEALTH_COURSE_SLUG) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    const enrollmentRows = await base44.asServiceRole.entities.CourseEnrollment.filter({
      learner_id: user.id,
      course_slug: courseSlug,
      status: { $in: ['active', 'completed'] },
    });
    const enrollment = enrollmentRows && enrollmentRows.length > 0 ? enrollmentRows[0] : null;
    const hasEnrollment = !!enrollment;

    let anyPublished = false;
    for (const route of WEALTH_MODULE_ROUTES) {
      if (isWealthModulePublished(courseSlug, route)) {
        anyPublished = true;
        break;
      }
    }
    const eligibleToSave = hasEnrollment && anyPublished;

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

    const moduleStatuses = WEALTH_MODULE_ROUTES.map((route) => {
      const config = getWealthModuleConfig(courseSlug, route);
      const progress = progressMap[route];
      const completed = !!(progress && progress.status === 'completed' && progress.completed_at);
      return {
        route,
        number: config ? config.number : route,
        title: config ? config.title : route,
        trackLabel: config ? config.trackLabel : '',
        completed,
        completedAt: progress ? progress.completed_at : null,
      };
    });

    const completedCount = moduleStatuses.filter((m) => m.completed).length;
    const totalModules = WEALTH_MODULE_ROUTES.length;
    const allModulesCompleted = completedCount === totalModules;
    const incompleteModules = moduleStatuses
      .filter((m) => !m.completed)
      .map((m) => ({ route: m.route, number: m.number, title: m.title }));

    // Capstone: a row exists and has been submitted (every section answered
    // at least once, so the server set submitted_at).
    const capstoneRows = await base44.asServiceRole.entities.WealthCapstone.filter({
      learner_id: user.id,
      course_slug: courseSlug,
    });
    const capstoneRow = capstoneRows && capstoneRows.length > 0 ? capstoneRows[0] : null;
    const capstoneSubmitted = !!(capstoneRow && capstoneRow.submitted_at);

    const courseCompleted = allModulesCompleted && capstoneSubmitted;
    const certificateEligible = courseCompleted && eligibleToSave;

    return Response.json({
      courseSlug,
      hasEnrollment,
      pathway: enrollment && enrollment.pathway ? enrollment.pathway : null,
      modules: moduleStatuses,
      completedCount,
      totalModules,
      allModulesCompleted,
      courseCompleted,
      incompleteModules,
      capstone: {
        submitted: capstoneSubmitted,
        format: capstoneRow ? capstoneRow.capstone_format : null,
        title: capstoneRow ? capstoneRow.title : '',
        filledCount: capstoneRow && typeof capstoneRow.filled_count === 'number' ? capstoneRow.filled_count : 0,
        submittedAt: capstoneRow ? capstoneRow.submitted_at : null,
      },
      certificateEligible,
      eligibleToSave,
    });
  } catch (error) {
    console.error('[getWealthCourseCompletion] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}