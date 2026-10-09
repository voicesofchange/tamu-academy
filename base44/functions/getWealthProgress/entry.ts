import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import {
  WEALTH_COURSE_SLUG,
  WEALTH_COMPLETION_KEYS,
  WEALTH_MODULE_ROUTES,
  getWealthModuleConfig,
  getWealthModulePrerequisite,
  isWealthModulePublished,
  deriveWealthCompletedKeys,
} from '../../shared/building-wealth-together-config.js';

/**
 * getWealthProgress — authenticated, non-mutating endpoint that returns the
 * current user's completion status for one Building Wealth Together module,
 * together with the course-level picture used for "resume" links.
 *
 * SCOPE:
 *   - Returns only the current authenticated user's progress.
 *   - Creates NO record. Performs NO update.
 *   - Returns the uniform completion keys, the subset completed, module
 *     completion status, eligibility to save progress, the prerequisite
 *     state, the learner's pathway focus, and the first incomplete module.
 *
 * TRUST BOUNDARY:
 *   - Unauthenticated -> 401.
 *   - Unknown course/module -> 404.
 *   - Eligibility to save: true only when the module is published AND the
 *     current user has active or completed enrollment, regardless of role.
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

    const allowedKeys = new Set(['courseSlug', 'moduleRoute']);
    for (const k of Object.keys(body)) {
      if (!allowedKeys.has(k)) {
        return Response.json({ error: 'Unsupported field: ' + k }, { status: 400 });
      }
    }

    const courseSlug = typeof body.courseSlug === 'string' ? body.courseSlug.trim() : '';
    const moduleRoute = typeof body.moduleRoute === 'string' ? body.moduleRoute.trim() : '';
    if (courseSlug !== WEALTH_COURSE_SLUG || !WEALTH_MODULE_ROUTES.includes(moduleRoute)) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    const isPublished = isWealthModulePublished(courseSlug, moduleRoute);

    const enrollmentRows = await base44.asServiceRole.entities.CourseEnrollment.filter({
      learner_id: user.id,
      course_slug: courseSlug,
      status: { $in: ['active', 'completed'] },
    });
    const enrollment = enrollmentRows && enrollmentRows.length > 0 ? enrollmentRows[0] : null;
    const eligibleToSave = isPublished && !!enrollment;

    const rows = await base44.asServiceRole.entities.ModuleProgress.filter({
      learner_id: user.id,
      course_slug: courseSlug,
    });
    const allRows = Array.isArray(rows) ? rows : [];
    const row = allRows.find((r) => r.module_slug === moduleRoute) || null;

    const completedRoutes = allRows
      .filter((r) => r.status === 'completed' && r.completed_at)
      .map((r) => r.module_slug);
    const firstIncomplete =
      WEALTH_MODULE_ROUTES.find((route) => !completedRoutes.includes(route)) || null;

    const config = getWealthModuleConfig(courseSlug, moduleRoute);
    const completedKeys = row ? deriveWealthCompletedKeys(row) : [];
    const moduleCompleted = !!(row && row.status === 'completed' && row.completed_at);

    // Prerequisite state, so the page can explain why a module is locked.
    const prerequisiteRoute = getWealthModulePrerequisite(courseSlug, moduleRoute);
    let prerequisiteMet = true;
    let prerequisiteTitle: string | null = null;
    if (prerequisiteRoute) {
      const prereqRow = allRows.find((r) => r.module_slug === prerequisiteRoute);
      prerequisiteMet = !!(prereqRow && prereqRow.status === 'completed' && prereqRow.completed_at);
      const prereqConfig = getWealthModuleConfig(courseSlug, prerequisiteRoute);
      prerequisiteTitle = prereqConfig ? `${prereqConfig.number}: ${prereqConfig.title}` : prerequisiteRoute;
    }

    return Response.json({
      courseSlug,
      moduleSlug: moduleRoute,
      moduleNumber: config ? config.number : moduleRoute,
      moduleTitle: config ? config.title : moduleRoute,
      track: config ? config.track : null,
      trackLabel: config ? config.trackLabel : '',
      completionKeys: WEALTH_COMPLETION_KEYS,
      completedKeys,
      moduleCompleted,
      eligibleToSave,
      completedAt: row && row.completed_at ? row.completed_at : null,
      enrolled: !!enrollment,
      pathway: enrollment && enrollment.pathway ? enrollment.pathway : null,
      prerequisiteRoute,
      prerequisiteTitle,
      prerequisiteMet,
      firstIncompleteModule: firstIncomplete,
      completedCount: completedRoutes.length,
      totalModules: WEALTH_MODULE_ROUTES.length,
    });
  } catch (error) {
    console.error('[getWealthProgress] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}