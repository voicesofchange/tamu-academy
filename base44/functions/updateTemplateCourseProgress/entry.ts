import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';
import {
  checkTemplateModuleAccess,
  completedSteps,
  findProgressRow,
  recordCompletionStep,
  recordLastSection,
  templateModuleRequirements,
} from '../../shared/course-template-service.js';

/**
 * updateTemplateCourseProgress — records the self-attested completion steps of
 * a template course module.
 *
 * Body: { courseSlug, moduleRoute, action: 'complete_step', step } or
 *       { courseSlug, moduleRoute, action: 'set_last_section', sectionId }
 *
 * GUARANTEES:
 *   - learner_id comes from the session only; score, passed, status and
 *     completed_at are refused with 403.
 *   - A step is only accepted when the module's curriculum lists it as a
 *     requirement, and `knowledge_check` is refused: quiz_passed is set only
 *     by checkTemplateCourseQuiz.
 *   - Admins previewing an unpublished module get progressSaved:false and
 *     nothing is written.
 *   - status:'completed' is never set here — that is completeTemplateCourseModule.
 */
const PROTECTED_BODY_FIELDS = new Set([
  'learner_id',
  'score',
  'passed',
  'quiz_passed',
  'status',
  'completed_at',
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

    const courseSlug = typeof body.courseSlug === 'string' ? body.courseSlug.trim() : '';
    const moduleRoute = typeof body.moduleRoute === 'string' ? body.moduleRoute.trim() : '';
    const action = typeof body.action === 'string' ? body.action : '';

    const access = await checkTemplateModuleAccess(base44, user, {
      courseSlug,
      moduleRoute,
      adminPreview: false,
    });
    if (!access.ok) return Response.json(access.body, { status: access.status });

    const requirements = templateModuleRequirements(courseSlug, moduleRoute);

    if (!access.canRecordProgress) {
      return Response.json({
        progressSaved: false,
        completedSteps: [],
        action,
      });
    }

    if (action === 'set_last_section') {
      const sectionId = typeof body.sectionId === 'string' ? body.sectionId.trim() : '';
      if (!sectionId || sectionId.length > 64) {
        return Response.json({ error: 'Invalid section identifier' }, { status: 400 });
      }
      await recordLastSection(base44, {
        learnerId: user.id,
        courseSlug,
        moduleRoute,
        sectionId,
      });
    } else if (action === 'complete_step') {
      const step = typeof body.step === 'string' ? body.step : '';
      const result = await recordCompletionStep(base44, {
        learnerId: user.id,
        courseSlug,
        moduleRoute,
        requirements,
        step,
      });
      if (!result.ok) {
        return Response.json({ error: 'Invalid step' }, { status: 400 });
      }
    } else {
      return Response.json({ error: 'Invalid action' }, { status: 400 });
    }

    const row = await findProgressRow(base44, user.id, courseSlug, moduleRoute);
    return Response.json({
      progressSaved: true,
      action,
      completedSteps: completedSteps(row, requirements),
    });
  } catch (error) {
    console.error('[updateTemplateCourseProgress] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}