import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import {
  ECONOMICS_COURSE_SLUG,
  ECONOMICS_COMPLETION_KEYS,
  ECONOMICS_MODULE_ROUTES,
  getEconomicsModuleConfig,
  getEconomicsModulePrerequisite,
  isEconomicsModulePublished,
  deriveEconomicsCompletedKeys,
} from '../../shared/economics-course-config.js';

/**
 * completeEconomicsModule — evaluates the five uniform completion
 * requirements for an Economics module and, when all are satisfied,
 * marks the module status='completed' with a server-generated
 * completed_at timestamp.
 *
 * GUARANTEES:
 *   - completed_at and status:'completed' are generated on the server.
 *   - learner_id is derived exclusively from the authenticated session.
 *   - Idempotent: an already-completed module preserves its original
 *     completed_at.
 *   - Unsatisfied requirements: returns the missing keys WITHOUT writing
 *     status:'completed' or completed_at.
 *   - No CourseEnrollment record is created or modified. No course-level
 *     completion or certificate is written here.
 *   - Admins previewing an unpublished module receive a preview response
 *     with progressSaved:false and no persisted change.
 *
 * REJECTED BODY FIELDS:
 *   learner_id, completed_at, status, quiz_passed, score, passed,
 *   attempt_number — any body containing these returns 403.
 */
const PROTECTED_BODY_FIELDS = new Set([
  'learner_id',
  'completed_at',
  'status',
  'quiz_passed',
  'score',
  'passed',
  'attempt_number',
]);

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

    // Reject any body containing protected fields.
    if (body && typeof body === 'object') {
      for (const key of Object.keys(body)) {
        if (PROTECTED_BODY_FIELDS.has(key)) {
          return Response.json({ error: 'Forbidden field' }, { status: 403 });
        }
      }
    }
    const allowedKeys = new Set(['courseSlug', 'moduleRoute']);
    for (const k of Object.keys(body)) {
      if (!allowedKeys.has(k)) {
        return Response.json({ error: 'Unsupported field: ' + k }, { status: 400 });
      }
    }

    const courseSlug = typeof body.courseSlug === 'string' ? body.courseSlug.trim() : '';
    const moduleRoute = typeof body.moduleRoute === 'string' ? body.moduleRoute.trim() : '';

    if (!courseSlug || courseSlug !== ECONOMICS_COURSE_SLUG) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }
    if (!moduleRoute || !ECONOMICS_MODULE_ROUTES.includes(moduleRoute)) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    const moduleConfig = getEconomicsModuleConfig(courseSlug, moduleRoute);
    if (!moduleConfig) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    const isPublished = isEconomicsModulePublished(courseSlug, moduleRoute);

    // Administrator preview of an unpublished module.
    if (isAdmin && !isPublished) {
      return Response.json({
        completed: false,
        progressSaved: false,
        missing: ECONOMICS_COMPLETION_KEYS,
      });
    }

    // For non-admin: enforce enrollment, publication, prerequisite.
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
      const prereqRoute = getEconomicsModulePrerequisite(courseSlug, moduleRoute);
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

    // Derive completion keys from server-side ModuleProgress.
    const rows = await base44.asServiceRole.entities.ModuleProgress.filter({
      learner_id: user.id,
      course_slug: courseSlug,
      module_slug: moduleRoute,
    });
    const row = rows && rows.length > 0 ? rows[0] : null;
    const completedKeys = row ? deriveEconomicsCompletedKeys(row) : [];
    const allComplete = ECONOMICS_COMPLETION_KEYS.every((k) => completedKeys.includes(k));

    if (!allComplete) {
      const missing = ECONOMICS_COMPLETION_KEYS.filter((k) => !completedKeys.includes(k));
      return Response.json({ completed: false, missing });
    }

    // Idempotent: preserve existing completion timestamp.
    if (row && row.status === 'completed' && row.completed_at) {
      return Response.json({
        completed: true,
        alreadyCompleted: true,
        completedAt: row.completed_at,
      });
    }

    const now = new Date().toISOString();
    if (row) {
      const updated = await base44.asServiceRole.entities.ModuleProgress.update(row.id, {
        status: 'completed',
        completed_at: now,
        updated_at: now,
      });
      return Response.json({
        completed: true,
        completedAt: (updated && updated.completed_at) || now,
      });
    }
    const created = await base44.asServiceRole.entities.ModuleProgress.create({
      learner_id: user.id,
      course_slug: courseSlug,
      module_slug: moduleRoute,
      status: 'completed',
      completed_at: now,
      updated_at: now,
    });
    return Response.json({
      completed: true,
      completedAt: (created && created.completed_at) || now,
    });
  } catch (error) {
    console.error('[completeEconomicsModule] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}