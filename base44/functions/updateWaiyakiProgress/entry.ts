import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';
import {
  waiyakiCourseExists,
  getWaiyakiModuleConfig,
  getWaiyakiModulePrerequisite,
  isWaiyakiModulePublished,
  deriveWaiyakiCompletedKeys,
} from '../../shared/waiyaki-config.js';

/**
 * updateWaiyakiProgress — authenticated endpoint for the three module
 * acknowledgments of the Waiyaki wa Hinga course. The completion model is
 * uniform across every module:
 *
 *   acknowledge_lesson           -> lesson_and_case_reviewed_at
 *   acknowledge_source_analysis  -> activity_acknowledged_at
 *   acknowledge_reflection       -> reflection_acknowledged_at (+ mode)
 *
 * The acknowledgment is recorded here; the module is only marked complete by
 * completeWaiyakiModule once all three keys are present.
 *
 * GUARANTEES:
 *   - learner_id is derived from authentication only.
 *   - For non-admins: requires active enrollment, a published module and a
 *     completed prerequisite module.
 *   - For admins previewing an unpublished module: responds successfully
 *     with progressSaved:false and writes nothing.
 *   - Any body containing learner_id, score, passed, quiz_passed, status,
 *     completed_at, activity_acknowledged_at or attempt_number is refused.
 *   - status:'completed' and completed_at are NEVER set here.
 */
// Must stay within the ModuleProgress.reflection_completion_mode enum.
const ALLOWED_REFLECTION_MODES = new Set(['private', 'fictional']);

const PROTECTED_BODY_FIELDS = new Set([
  'learner_id',
  'score',
  'passed',
  'quiz_passed',
  'status',
  'completed_at',
  'activity_acknowledged_at',
  'attempt_number',
]);

interface ActionMsg {
  action: string;
  courseSlug: string;
  moduleRoute: string;
  payload?: Record<string, unknown>;
}

function isAllowedActionShape(raw: Record<string, unknown>): ActionMsg | null {
  if (!raw || typeof raw.action !== 'string') return null;
  if (typeof raw.courseSlug !== 'string' || !waiyakiCourseExists(raw.courseSlug)) return null;
  if (typeof raw.moduleRoute !== 'string') return null;
  if (!getWaiyakiModuleConfig(raw.courseSlug, raw.moduleRoute)) return null;

  switch (raw.action) {
    case 'acknowledge_lesson':
    case 'acknowledge_source_analysis':
      return {
        action: raw.action,
        courseSlug: raw.courseSlug,
        moduleRoute: raw.moduleRoute,
      };
    case 'acknowledge_reflection':
      if (!ALLOWED_REFLECTION_MODES.has(raw.mode as string)) return null;
      return {
        action: raw.action,
        courseSlug: raw.courseSlug,
        moduleRoute: raw.moduleRoute,
        payload: { mode: raw.mode },
      };
    default:
      return null;
  }
}

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

    if (body && typeof body === 'object') {
      for (const key of Object.keys(body)) {
        if (PROTECTED_BODY_FIELDS.has(key)) {
          return Response.json({ error: 'Forbidden field' }, { status: 403 });
        }
      }
    }

    const msg = isAllowedActionShape(body);
    if (!msg) {
      return Response.json({ error: 'Invalid action' }, { status: 400 });
    }

    const isPublished = isWaiyakiModulePublished(msg.courseSlug, msg.moduleRoute);

    if (isAdmin && !isPublished) {
      return Response.json({
        progressSaved: false,
        completedKeys: [],
        action: msg.action,
      });
    }

    if (!isAdmin) {
      const enrollmentRows = await base44.asServiceRole.entities.CourseEnrollment.filter({
        learner_id: user.id,
        course_slug: msg.courseSlug,
        status: 'active',
      });
      if (!enrollmentRows || enrollmentRows.length === 0) {
        return Response.json({ error: 'Forbidden' }, { status: 403 });
      }
      if (!isPublished) {
        return Response.json({ error: 'Forbidden' }, { status: 403 });
      }
      const prereqRoute = getWaiyakiModulePrerequisite(msg.courseSlug, msg.moduleRoute);
      if (prereqRoute) {
        const prereqRows = await base44.asServiceRole.entities.ModuleProgress.filter({
          learner_id: user.id,
          course_slug: msg.courseSlug,
          module_slug: prereqRoute,
          status: 'completed',
        });
        if (!prereqRows || prereqRows.length === 0) {
          return Response.json({ error: 'Forbidden' }, { status: 403 });
        }
      }
    }

    const learnerId = user.id;
    const now = new Date().toISOString();

    const existing = await base44.asServiceRole.entities.ModuleProgress.filter({
      learner_id: learnerId,
      course_slug: msg.courseSlug,
      module_slug: msg.moduleRoute,
    });
    const existingRow = existing && existing.length > 0 ? existing[0] : null;

    const buildPatch = (): Record<string, string> => {
      const patch: Record<string, string> = { updated_at: now };
      if (msg.action === 'acknowledge_lesson') {
        patch.lesson_and_case_reviewed_at = now;
      } else if (msg.action === 'acknowledge_source_analysis') {
        patch.activity_acknowledged_at = now;
        patch.activity_completion_mode = 'browser_private';
      } else if (msg.action === 'acknowledge_reflection') {
        patch.reflection_acknowledged_at = now;
        patch.reflection_completion_mode = msg.payload!.mode as string;
      }
      return patch;
    };

    if (!existingRow) {
      const initial: Record<string, unknown> = {
        learner_id: learnerId,
        course_slug: msg.courseSlug,
        module_slug: msg.moduleRoute,
        status: 'in_progress',
        last_section_id: '',
        activity_completion_mode: '',
        reflection_completion_mode: '',
        quiz_passed: false,
        updated_at: now,
      };
      const patch = buildPatch();
      for (const k of Object.keys(patch)) {
        initial[k] = patch[k];
      }
      const created = await base44.asServiceRole.entities.ModuleProgress.create(initial);
      return Response.json({
        completedKeys: deriveWaiyakiCompletedKeys(created),
        action: msg.action,
        progressSaved: true,
      });
    }

    const updated = await base44.asServiceRole.entities.ModuleProgress.update(
      existingRow.id,
      buildPatch(),
    );
    return Response.json({
      completedKeys: deriveWaiyakiCompletedKeys(updated),
      action: msg.action,
      progressSaved: true,
    });
  } catch (error) {
    console.error('[updateWaiyakiProgress] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}