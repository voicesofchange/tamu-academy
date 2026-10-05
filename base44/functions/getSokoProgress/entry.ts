import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';
import {
  sokoCourseExists,
  getSokoModuleConfig,
  isSokoModulePublished,
  deriveSokoCompletedKeys,
} from '../../shared/sauti-za-soko-config.js';

/**
 * getSokoProgress — authenticated, non-mutating endpoint that returns the
 * current user's completion status for one Sauti za Soko module.
 *
 * SCOPE:
 *   - Returns only the current authenticated user's progress.
 *   - Creates NO record and performs NO update.
 *   - Returns the completion keys, the subset completed, module completion
 *     status, eligibility to save, and the server completion timestamp.
 *   - Returns no internal record id, answer material, scores, or
 *     information about another person.
 *
 * TRUST BOUNDARY:
 *   - Unauthenticated -> 401.
 *   - Unknown course/module -> 404.
 *   - Eligibility to save: true only when the module is published AND the
 *     current user has an active or completed enrollment, regardless of
 *     role.
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

    if (!courseSlug || !moduleRoute) {
      return Response.json({ error: 'Missing courseSlug or moduleRoute' }, { status: 400 });
    }
    if (!sokoCourseExists(courseSlug)) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    const config = getSokoModuleConfig(courseSlug, moduleRoute);
    if (!config) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    const isPublished = isSokoModulePublished(courseSlug, moduleRoute);

    let eligibleToSave = false;
    if (isPublished) {
      const enrollmentRows = await base44.asServiceRole.entities.CourseEnrollment.filter({
        learner_id: user.id,
        course_slug: courseSlug,
        status: { $in: ['active', 'completed'] },
      });
      eligibleToSave = !!(enrollmentRows && enrollmentRows.length > 0);
    }

    const rows = await base44.asServiceRole.entities.ModuleProgress.filter({
      learner_id: user.id,
      course_slug: courseSlug,
      module_slug: moduleRoute,
    });
    const row = rows && rows.length > 0 ? rows[0] : null;

    const moduleCompleted = !!(row && row.status === 'completed' && row.completed_at);

    return Response.json({
      courseSlug,
      moduleSlug: moduleRoute,
      moduleNumber: config.number,
      moduleTitle: config.title,
      completedKeys: row ? deriveSokoCompletedKeys(row) : [],
      moduleCompleted,
      eligibleToSave,
      completedAt: row && row.completed_at ? row.completed_at : null,
      // The activity requirement is satisfied by saving the module's My
      // Soko Action Plan section (or, for Module 8, by submitting the
      // facilitator record). It is never self-attested.
      activitySource: moduleRoute === 'module-8' ? 'facilitator_submission' : 'action_plan',
    });
  } catch (error) {
    console.error('[getSokoProgress] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}