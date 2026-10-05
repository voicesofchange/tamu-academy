import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';
import {
  SOKO_COURSE_SLUG,
  SOKO_PEER_COURSE_SLUG,
  sokoCourseExists,
  getSokoRequiredModuleRoutes,
  isSokoModulePublished,
  checkSokoCourseCompletionRequirements,
} from '../../shared/sauti-za-soko-config.js';

/**
 * finalizeSokoCourse — learner-invoked endpoint that marks a Sauti za Soko
 * enrollment as completed once every requirement is genuinely satisfied.
 *
 * It exists because the extra Sauti za Soko requirements (every My Soko
 * Action Plan section, one peer discussion, the final reflection, or an
 * approved vendor-circle submission) may be finished after the final
 * module was already completed, in which case no module-completion event
 * remains to re-trigger course completion.
 *
 * GUARANTEES:
 *   - learner_id is derived exclusively from the authenticated session.
 *   - Every required module must have a completed ModuleProgress row, and
 *     the course-level requirements in the shared config must pass. A
 *     learner cannot certify themselves.
 *   - At least one module must be published and an active enrollment must
 *     exist.
 *   - Idempotent: an already-completed enrollment is returned unchanged.
 *   - The certificate itself is issued by the separate certificate path,
 *     which reads the enrollment record; this function writes no
 *     certificate.
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
    if (!courseSlug || !sokoCourseExists(courseSlug)) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    const enrollmentRows = await base44.asServiceRole.entities.CourseEnrollment.filter({
      learner_id: user.id,
      course_slug: courseSlug,
    });
    if (!enrollmentRows || enrollmentRows.length === 0) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }
    const enrollment = enrollmentRows[0];

    if (enrollment.status === 'completed') {
      return Response.json({
        completed: true,
        alreadyCompleted: true,
        completedAt: enrollment.completed_at || null,
      });
    }

    const requiredRoutes = getSokoRequiredModuleRoutes(courseSlug);
    const anyPublished = requiredRoutes.some((route) => isSokoModulePublished(courseSlug, route));
    if (!anyPublished) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const progressRows = await base44.asServiceRole.entities.ModuleProgress.filter({
      learner_id: user.id,
      course_slug: courseSlug,
    });
    const completedRoutes = new Set(
      (Array.isArray(progressRows) ? progressRows : [])
        .filter((row) => row && row.status === 'completed' && row.completed_at)
        .map((row) => row.module_slug),
    );
    const missingModules = requiredRoutes.filter((route) => !completedRoutes.has(route));

    const extra = await checkSokoCourseCompletionRequirements(base44, user.id, courseSlug);

    if (missingModules.length > 0 || !extra.ok) {
      return Response.json({
        completed: false,
        missingModules,
        missingRequirements: extra.missing,
      });
    }

    const now = new Date().toISOString();
    await base44.asServiceRole.entities.CourseEnrollment.update(enrollment.id, {
      status: 'completed',
      completed_at: now,
      last_module_slug: requiredRoutes[requiredRoutes.length - 1] || null,
      progress_percentage: 100,
      certificate_eligible: true,
      updated_at: now,
    });

    return Response.json({ completed: true, completedAt: now });
  } catch (error) {
    console.error('[finalizeSokoCourse] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}