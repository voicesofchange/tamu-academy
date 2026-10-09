import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import {
  WEALTH_COURSE_SLUG,
  WEALTH_MODULE_ROUTES,
  getWealthModuleConfig,
  getWealthModulePrerequisite,
  isWealthModulePublished,
  isWealthSectionAllowed,
  deriveWealthCompletedKeys,
} from '../../shared/building-wealth-together-config.js';

/**
 * Authenticated progress-update endpoint for Building Wealth Together module
 * acknowledgments.
 *
 * The completion model is uniform across all nine modules, so this function
 * has a single code path. The self-attestable acknowledgments map onto the
 * shared ModuleProgress entity fields:
 *
 *   acknowledge_core_media  -> core_media_acknowledged_at      (the module's Watch step)
 *   acknowledge_lesson      -> lesson_and_case_reviewed_at     (the lesson and worked example)
 *   acknowledge_activity    -> activity_acknowledged_at        (Try it)
 *   acknowledge_dilemma     -> interactive_scenario_completed_at (The dilemma)
 *   acknowledge_reflection  -> reflection_acknowledged_at
 *   set_last_section        -> last_section_id                 (allow-listed)
 *
 * The knowledge_check_passed completion key is set ONLY by the
 * checkWealthKnowledgeCheck grader (quiz_passed), never by this function.
 *
 * GUARANTEES:
 *   - learner_id is derived from authentication only.
 *   - For non-admins: requires active enrollment, a published module, and a
 *     completed prerequisite module.
 *   - Admin preview of an unpublished module returns progressSaved:false and
 *     writes nothing.
 *   - Any body containing learner_id, score, passed, quiz_passed, status,
 *     completed_at, or attempt_number is refused with 403.
 *   - status:'completed' and completed_at are NEVER set here — completion is
 *     deferred to completeWealthModule.
 */

const ALLOWED_ACTIVITY_MODES = new Set(['browser_private', 'offline', 'fictional']);
const ALLOWED_REFLECTION_MODES = new Set(['private', 'fictional']);

const PROTECTED_BODY_FIELDS = new Set([
  'learner_id',
  'score',
  'passed',
  'quiz_passed',
  'status',
  'completed_at',
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
  if (typeof raw.courseSlug !== 'string' || raw.courseSlug !== WEALTH_COURSE_SLUG) {
    return null;
  }
  if (typeof raw.moduleRoute !== 'string' || !WEALTH_MODULE_ROUTES.includes(raw.moduleRoute)) {
    return null;
  }
  switch (raw.action) {
    case 'set_last_section':
      if (typeof raw.sectionId !== 'string' || raw.sectionId.length === 0 || raw.sectionId.length > 64) {
        return null;
      }
      return {
        action: raw.action,
        courseSlug: raw.courseSlug,
        moduleRoute: raw.moduleRoute,
        payload: { sectionId: raw.sectionId },
      };
    case 'acknowledge_core_media':
    case 'acknowledge_lesson':
    case 'acknowledge_dilemma':
      return { action: raw.action, courseSlug: raw.courseSlug, moduleRoute: raw.moduleRoute };
    case 'acknowledge_activity':
      if (!ALLOWED_ACTIVITY_MODES.has(raw.mode as string)) return null;
      return {
        action: raw.action,
        courseSlug: raw.courseSlug,
        moduleRoute: raw.moduleRoute,
        payload: { mode: raw.mode },
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

    const moduleConfig = getWealthModuleConfig(msg.courseSlug, msg.moduleRoute);
    if (!moduleConfig) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    if (msg.action === 'set_last_section') {
      const sectionId = msg.payload!.sectionId as string;
      if (!isWealthSectionAllowed(msg.courseSlug, msg.moduleRoute, sectionId)) {
        return Response.json({ error: 'Invalid section identifier' }, { status: 400 });
      }
    }

    const isPublished = isWealthModulePublished(msg.courseSlug, msg.moduleRoute);

    // Administrator preview of an unpublished module.
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
      const prereqRoute = getWealthModulePrerequisite(msg.courseSlug, msg.moduleRoute);
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
      switch (msg.action) {
        case 'set_last_section':
          patch.last_section_id = msg.payload!.sectionId as string;
          break;
        case 'acknowledge_core_media':
          patch.core_media_acknowledged_at = now;
          break;
        case 'acknowledge_lesson':
          patch.lesson_and_case_reviewed_at = now;
          break;
        case 'acknowledge_activity':
          patch.activity_acknowledged_at = now;
          patch.activity_completion_mode = msg.payload!.mode as string;
          break;
        case 'acknowledge_dilemma':
          patch.interactive_scenario_completed_at = now;
          break;
        case 'acknowledge_reflection':
          patch.reflection_acknowledged_at = now;
          patch.reflection_completion_mode = msg.payload!.mode as string;
          break;
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
        completedKeys: deriveWealthCompletedKeys(created),
        action: msg.action,
        progressSaved: true,
      });
    }

    const updated = await base44.asServiceRole.entities.ModuleProgress.update(
      existingRow.id,
      buildPatch(),
    );
    return Response.json({
      completedKeys: deriveWealthCompletedKeys(updated),
      action: msg.action,
      progressSaved: true,
    });
  } catch (error) {
    console.error('[updateWealthProgress] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}