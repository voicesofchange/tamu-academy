import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import {
  ECONOMICS_COURSE_SLUG,
  ECONOMICS_COMPLETION_KEYS,
  ECONOMICS_MODULE_ROUTES,
  isEconomicsModulePublished,
  getEconomicsModuleConfig,
  deriveEconomicsCompletedKeys,
} from '../../shared/economics-course-config.js';

/**
 * getEconomicsProgress — authenticated, non-mutating endpoint that
 * returns the current user's completion status for one Economics module.
 *
 * SCOPE:
 *   - Returns only the current authenticated user's progress.
 *   - Creates NO record. Performs NO update.
 *   - Returns the five uniform completion keys, the subset completed,
 *     module completion status, eligibility to save progress, and the
 *     server completion timestamp when one exists.
 *   - Returns no internal record ID, answer material, scores, or
 *     information about another person.
 *
 * TRUST BOUNDARY:
 *   - Unauthenticated -> 401.
 *   - Unknown course/module -> 404.
 *   - Eligibility to save: true only when the module is published AND
 *     the current user has active enrollment, regardless of role. An
 *     admin without enrollment or previewing an unpublished module is
 *     not eligible. Administrator status must not bypass either.
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

    const courseSlug =
      typeof body.courseSlug === 'string' ? body.courseSlug.trim() : '';
    const moduleRoute =
      typeof body.moduleRoute === 'string' ? body.moduleRoute.trim() : '';

    if (!courseSlug || !moduleRoute) {
      return Response.json({ error: 'Missing courseSlug or moduleRoute' }, { status: 400 });
    }
    if (courseSlug !== ECONOMICS_COURSE_SLUG) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }
    if (!ECONOMICS_MODULE_ROUTES.includes(moduleRoute)) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    const isPublished = isEconomicsModulePublished(courseSlug, moduleRoute);

    // Eligibility to save: published module AND active enrollment,
    // regardless of role.
    let eligibleToSave = false;
    if (isPublished) {
      const enrollmentRows = await base44.asServiceRole.entities.CourseEnrollment.filter({
        learner_id: user.id,
        course_slug: courseSlug,
        status: 'active',
      });
      eligibleToSave = !!(enrollmentRows && enrollmentRows.length > 0);
    }

    // Read only the current user's record. Create no record.
    const rows = await base44.asServiceRole.entities.ModuleProgress.filter({
      learner_id: user.id,
      course_slug: courseSlug,
      module_slug: moduleRoute,
    });
    const row = rows && rows.length > 0 ? rows[0] : null;

    const config = getEconomicsModuleConfig(courseSlug, moduleRoute);
    const completedKeys = row ? deriveEconomicsCompletedKeys(row) : [];
    const moduleCompleted = !!(row && row.status === 'completed' && row.completed_at);
    const completedAt = row && row.completed_at ? row.completed_at : null;

    return Response.json({
      courseSlug,
      moduleSlug: moduleRoute,
      moduleNumber: config ? config.number : moduleRoute,
      moduleTitle: config ? config.title : moduleRoute,
      completionKeys: ECONOMICS_COMPLETION_KEYS,
      completedKeys,
      moduleCompleted,
      eligibleToSave,
      completedAt,
    });
  } catch (error) {
    console.error('[getEconomicsProgress] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}