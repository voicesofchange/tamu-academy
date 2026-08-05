import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import {
  MENTAL_HEALTH_COURSE_SLUG,
  MENTAL_HEALTH_MODULE_2_COMPLETION_KEYS,
  MENTAL_HEALTH_MODULE_3_COMPLETION_KEYS,
  MENTAL_HEALTH_MODULE_4_COMPLETION_KEYS,
  MENTAL_HEALTH_MODULE_5_COMPLETION_KEYS,
  MENTAL_HEALTH_MODULE_6_COMPLETION_KEYS,
  deriveModule2CompletedKeys,
  deriveModule3CompletedKeys,
  deriveModule4CompletedKeys,
  deriveModule5CompletedKeys,
  deriveModule6CompletedKeys,
  isModulePublished,
} from '../../shared/mental-health-curriculum.js';

/**
 * getMentalHealthProgress — authenticated, non-mutating endpoint that
 * returns the current user's Module 2 completion status.
 *
 * SCOPE (Stage 12 of Module 2 — progress retrieval only):
 *   - Returns only the current authenticated user's Module 2 progress.
 *   - Creates NO record when none exists.
 *   - Performs NO update during a read.
 *   - Returns the six required completion keys in the approved order,
 *     the subset that are completed, module completion status,
 *     eligibility to save progress, and the server completion
 *     timestamp when one exists.
 *   - Returns no internal record ID, answer material, response
 *     content, score, enrollment details, or information about
 *     another person.
 *
 * TRUST BOUNDARY:
 *   - Unauthenticated -> 401.
 *   - Unknown course/module -> 404.
 *   - Module 2 only (other modules return 404 until their progress
 *     stages land).
 *   - Eligibility to save: true only when Module 2 is published AND
 *     the current user has active enrollment, regardless of role.
 *     An admin without enrollment or previewing an unpublished module
 *     is not eligible. Administrator status must not bypass either
 *     condition.
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

    // Reject any unexpected top-level field.
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
    if (courseSlug !== MENTAL_HEALTH_COURSE_SLUG) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }
    if (moduleRoute !== 'module-2' && moduleRoute !== 'module-3' && moduleRoute !== 'module-4' && moduleRoute !== 'module-5' && moduleRoute !== 'module-6') {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    const isAdmin = user.role === 'admin';
    const isPublished = isModulePublished(courseSlug, moduleRoute);

    // Determine eligibility to save progress. Requires a published
    // module AND active enrollment, regardless of role. An admin
    // without enrollment or previewing an unpublished module is not
    // eligible. Administrator status must not bypass either condition.
    let eligibleToSave = false;
    if (isPublished) {
      const enrollmentRows = await base44.asServiceRole.entities.CourseEnrollment.filter({
        learner_id: user.id,
        course_slug: courseSlug,
        status: 'active',
      });
      eligibleToSave = !!(enrollmentRows && enrollmentRows.length > 0);
    }

    // Read only the current user's Module 2 record. Create no record.
    const rows = await base44.asServiceRole.entities.ModuleProgress.filter({
      learner_id: user.id,
      course_slug: courseSlug,
      module_slug: moduleRoute,
    });
    const row = rows && rows.length > 0 ? rows[0] : null;

    const isModule3 = moduleRoute === 'module-3';
    const isModule4 = moduleRoute === 'module-4';
    const isModule5 = moduleRoute === 'module-5';
    const isModule6 = moduleRoute === 'module-6';
    const completionKeys = isModule3
      ? MENTAL_HEALTH_MODULE_3_COMPLETION_KEYS
      : isModule4
      ? MENTAL_HEALTH_MODULE_4_COMPLETION_KEYS
      : isModule5
      ? MENTAL_HEALTH_MODULE_5_COMPLETION_KEYS
      : isModule6
      ? MENTAL_HEALTH_MODULE_6_COMPLETION_KEYS
      : MENTAL_HEALTH_MODULE_2_COMPLETION_KEYS;
    const completedKeys = row
      ? (isModule3 ? deriveModule3CompletedKeys(row) : isModule4 ? deriveModule4CompletedKeys(row) : isModule5 ? deriveModule5CompletedKeys(row) : isModule6 ? deriveModule6CompletedKeys(row) : deriveModule2CompletedKeys(row))
      : [];
    const moduleCompleted = !!(row && row.status === 'completed' && row.completed_at);
    const completedAt = row && row.completed_at ? row.completed_at : null;

    return Response.json({
      courseSlug,
      moduleSlug: moduleRoute,
      completionKeys,
      completedKeys,
      moduleCompleted,
      eligibleToSave,
      completedAt,
    });
  } catch (error) {
    console.error('[getMentalHealthProgress] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}