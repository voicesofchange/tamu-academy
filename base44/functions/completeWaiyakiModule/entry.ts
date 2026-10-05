import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';
import {
  waiyakiCourseExists,
  getWaiyakiModuleConfig,
  getWaiyakiModulePrerequisite,
  isWaiyakiModulePublished,
  deriveWaiyakiCompletedKeys,
  isModuleCompleteFromRow,
  WAIYAKI_COMPLETION_KEYS,
} from '../../shared/waiyaki-config.js';

/**
 * completeWaiyakiModule — authenticated endpoint that marks one module of
 * the Waiyaki wa Hinga course as complete.
 *
 * GUARANTEES:
 *   - learner_id is derived from authentication only.
 *   - The module is completed only when the learner's own ModuleProgress row
 *     already satisfies all three server-verified keys. The caller cannot
 *     assert completion; it can only ask the server to check.
 *   - For non-admins: requires active enrollment, a published module and a
 *     completed prerequisite module.
 *   - Admins previewing an unpublished module receive completed:false and
 *     nothing is written.
 *   - Only status and completed_at are written here. The three keys are set
 *     by updateWaiyakiProgress, never by this function.
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

    const isAdmin = user.role === 'admin';

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

    const courseSlug = typeof body.courseSlug === 'string' ? body.courseSlug : '';
    const moduleRoute = typeof body.moduleRoute === 'string' ? body.moduleRoute : '';

    if (!courseSlug || !waiyakiCourseExists(courseSlug)) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }
    if (!getWaiyakiModuleConfig(courseSlug, moduleRoute)) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    const isPublished = isWaiyakiModulePublished(courseSlug, moduleRoute);

    if (isAdmin && !isPublished) {
      return Response.json({
        completed: false,
        status: 'in_progress',
        completedKeys: [],
        requiredKeys: WAIYAKI_COMPLETION_KEYS.length,
      });
    }

    if (!isAdmin) {
      const enrollmentRows = await base44.asServiceRole.entities.CourseEnrollment.filter({
        learner_id: user.id,
        course_slug: courseSlug,
        status: 'active',
      });
      if (!enrollmentRows || enrollmentRows.length === 0) {
        return Response.json({ error: 'Forbidden' }, { status: 403 });
      }
      if (!isPublished) {
        return Response.json({ error: 'Forbidden' }, { status: 403 });
      }
      const prereqRoute = getWaiyakiModulePrerequisite(courseSlug, moduleRoute);
      if (prereqRoute) {
        const prereqRows = await base44.asServiceRole.entities.ModuleProgress.filter({
          learner_id: user.id,
          course_slug: courseSlug,
          module_slug: prereqRoute,
          status: 'completed',
        });
        if (!prereqRows || prereqRows.length === 0) {
          return Response.json({ error: 'Forbidden' }, { status: 403 });
        }
      }
    }

    const rows = await base44.asServiceRole.entities.ModuleProgress.filter({
      learner_id: user.id,
      course_slug: courseSlug,
      module_slug: moduleRoute,
    });
    const row = rows && rows.length > 0 ? rows[0] : null;

    if (!row) {
      return Response.json({
        completed: false,
        status: 'not_started',
        completedKeys: [],
        requiredKeys: WAIYAKI_COMPLETION_KEYS.length,
      });
    }

    if (row.status === 'completed') {
      return Response.json({
        completed: true,
        status: 'completed',
        completedKeys: deriveWaiyakiCompletedKeys(row),
        requiredKeys: WAIYAKI_COMPLETION_KEYS.length,
      });
    }

    if (!isModuleCompleteFromRow(row)) {
      return Response.json({
        completed: false,
        status: row.status || 'in_progress',
        completedKeys: deriveWaiyakiCompletedKeys(row),
        requiredKeys: WAIYAKI_COMPLETION_KEYS.length,
      });
    }

    const now = new Date().toISOString();
    const updated = await base44.asServiceRole.entities.ModuleProgress.update(row.id, {
      status: 'completed',
      completed_at: now,
      updated_at: now,
    });

    try {
      await base44.analytics.track({
        eventName: 'module_completed',
        properties: { course_slug: courseSlug, module_slug: moduleRoute },
      });
    } catch (err) {
      console.warn('[completeWaiyakiModule] analytics.track failed:', err && err.message);
    }

    return Response.json({
      completed: true,
      status: (updated && updated.status) || 'completed',
      completedKeys: deriveWaiyakiCompletedKeys(updated || row),
      requiredKeys: WAIYAKI_COMPLETION_KEYS.length,
    });
  } catch (error) {
    console.error('[completeWaiyakiModule] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}