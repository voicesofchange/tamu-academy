import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';
import { syncCourseEnrollmentProgress } from '../../shared/enrollment-progress.js';
import {
  checkTemplateModuleAccess,
  findProgressRow,
  outstandingSteps,
  templateModuleRequirements,
} from '../../shared/course-template-service.js';

/**
 * completeTemplateCourseModule — marks a template course module complete once
 * every step its curriculum requires is satisfied.
 *
 * GUARANTEES:
 *   - status:'completed' and completed_at are generated here, never accepted
 *     from the browser (learner_id, completed_at, status, quiz_passed, score,
 *     passed and attempt_number are refused with 403).
 *   - Idempotent: an already-completed module keeps its original completed_at.
 *   - An unmet requirement returns the outstanding step ids and writes nothing.
 *   - The enrollment's progress_percentage is recalculated from ModuleProgress
 *     afterwards. Course completion and the certificate stay separate.
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

export default async function (req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);

    const user = await base44.auth.me().catch(() => null);
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    let body: Record<string, unknown> = {};
    try {
      body = await req.json();
    } catch (_) {
      body = {};
    }

    for (const key of Object.keys(body || {})) {
      if (PROTECTED_BODY_FIELDS.has(key)) {
        return Response.json({ error: 'Forbidden field' }, { status: 403 });
      }
    }
    const allowedKeys = new Set(['courseSlug', 'moduleRoute']);
    for (const key of Object.keys(body || {})) {
      if (!allowedKeys.has(key)) {
        return Response.json({ error: 'Unsupported field: ' + key }, { status: 400 });
      }
    }

    const courseSlug = typeof body.courseSlug === 'string' ? body.courseSlug.trim() : '';
    const moduleRoute = typeof body.moduleRoute === 'string' ? body.moduleRoute.trim() : '';

    const access = await checkTemplateModuleAccess(base44, user, {
      courseSlug,
      moduleRoute,
      adminPreview: false,
    });
    if (!access.ok) return Response.json(access.body, { status: access.status });

    const requirements = templateModuleRequirements(courseSlug, moduleRoute);

    if (!access.canRecordProgress) {
      return Response.json({ completed: false, progressSaved: false, missing: requirements });
    }

    const row = await findProgressRow(base44, user.id, courseSlug, moduleRoute);
    if (row && row.status === 'completed' && row.completed_at) {
      return Response.json({
        completed: true,
        alreadyCompleted: true,
        completedAt: row.completed_at,
      });
    }

    const missing = outstandingSteps(row, requirements);
    if (missing.length > 0) {
      return Response.json({ completed: false, missing });
    }

    const now = new Date().toISOString();
    const saved = row
      ? await base44.asServiceRole.entities.ModuleProgress.update(row.id, {
          status: 'completed',
          completed_at: now,
          updated_at: now,
        })
      : await base44.asServiceRole.entities.ModuleProgress.create({
          learner_id: user.id,
          course_slug: courseSlug,
          module_slug: moduleRoute,
          status: 'completed',
          completed_at: now,
          updated_at: now,
        });

    await syncCourseEnrollmentProgress(base44, { learnerId: user.id, courseSlug });

    return Response.json({
      completed: true,
      completedAt: (saved && saved.completed_at) || now,
    });
  } catch (error) {
    console.error('[completeTemplateCourseModule] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}