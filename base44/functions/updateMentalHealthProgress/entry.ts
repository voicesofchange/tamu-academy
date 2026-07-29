import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

/**
 * Authenticated progress-update endpoint for Mental Health pillar module
 * learning acknowledgments.
 *
 * Phase 1: ALLOWS ONLY the following neutral, learner-controlled actions
 * and refuses everything else. Protected fields (score, passed,
 * quiz_passed, status:'completed', completed_at, attempt_number) are
 * NEVER accepted in the body and are NEVER written by this function;
 * they will be set later by trusted grading and completion backend
 * functions (Phase 2), which run as the service role.
 *
 * Accepted action payloads (camelCase, matching Base44 function
 * convention):
 *   { action: 'set_last_section', courseSlug, moduleRoute, sectionId }
 *   { action: 'acknowledge_core_media', courseSlug, moduleRoute }
 *   { action: 'acknowledge_lesson_and_case', courseSlug, moduleRoute }
 *   { action: 'acknowledge_activity', courseSlug, moduleRoute, mode }
 *       where mode is one of 'browser_private' | 'offline' | 'fictional'
 *   { action: 'acknowledge_reflection', courseSlug, moduleRoute, mode }
 *       where mode is one of 'private' | 'fictional'
 *
 * Guarantees (matched against implementation requirement #6 and #7):
 *   - Learner ID is derived from authentication, never from the body.
 *   - Only an exact (courseSlug, moduleRoute) pair from the approved
 *     allow-list is accepted; any other pair is 400.
 *   - The learner cannot set score, passed, quiz_passed, completed_at,
 *     status:'completed', attempt_number, or learner_id. If any of
 *     these names appears in the body, the request is refused with 403
 *     regardless of the action.
 *   - Each (learner_id, course_slug, module_slug) pair maps to at most
 *     one ModuleProgress row. If no row exists yet, this function
 *     provisions it (with quiz_passed=false and status='in_progress').
 *   - Each action updates ONLY the specific field touched by that
 *     action (plus updated_at).
 *
 * This function does NOT yet grant status:'completed' to a module
 * even if all six acknowledgments are present. Completion requires a
 * confirmed passing quiz attempt, which depends on Phase 2 grading.
 */

const COURSE_SLUG = 'ubuntu-and-mental-health';
const ALLOWED_MODULE_ROUTES = new Set([
  'module-1',
  'module-2',
  'module-3',
  'module-4',
  'module-5',
  'module-6',
  'module-7',
]);
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

function isAllowedAction(raw) {
  if (!raw || typeof raw.action !== 'string') return null;
  if (typeof raw.courseSlug !== 'string' || raw.courseSlug !== COURSE_SLUG) return null;
  if (typeof raw.moduleRoute !== 'string' || !ALLOWED_MODULE_ROUTES.has(raw.moduleRoute)) {
    return null;
  }

  switch (raw.action) {
    case 'set_last_section': {
      if (typeof raw.sectionId !== 'string' || raw.sectionId.length === 0 || raw.sectionId.length > 64) {
        return null;
      }
      return {
        action: raw.action,
        courseSlug: raw.courseSlug,
        moduleRoute: raw.moduleRoute,
        payload: { sectionId: raw.sectionId },
      };
    }
    case 'acknowledge_core_media':
    case 'acknowledge_lesson_and_case':
      return { action: raw.action, courseSlug: raw.courseSlug, moduleRoute: raw.moduleRoute };
    case 'acknowledge_activity': {
      if (!ALLOWED_ACTIVITY_MODES.has(raw.mode)) return null;
      return {
        action: raw.action,
        courseSlug: raw.courseSlug,
        moduleRoute: raw.moduleRoute,
        payload: { mode: raw.mode },
      };
    }
    case 'acknowledge_reflection': {
      if (!ALLOWED_REFLECTION_MODES.has(raw.mode)) return null;
      return {
        action: raw.action,
        courseSlug: raw.courseSlug,
        moduleRoute: raw.moduleRoute,
        payload: { mode: raw.mode },
      };
    }
    default:
      return null;
  }
}

function applyActionToRow(row, action) {
  const now = new Date().toISOString();
  row.updated_at = now;
  switch (action.action) {
    case 'set_last_section':
      row.last_section_id = action.payload.sectionId;
      break;
    case 'acknowledge_core_media':
      row.core_media_acknowledged_at = now;
      break;
    case 'acknowledge_lesson_and_case':
      row.lesson_and_case_reviewed_at = now;
      break;
    case 'acknowledge_activity':
      row.activity_acknowledged_at = now;
      row.activity_completion_mode = action.payload.mode;
      break;
    case 'acknowledge_reflection':
      row.reflection_acknowledged_at = now;
      row.reflection_completion_mode = action.payload.mode;
      break;
  }
}

export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);

    let user = null;
    try {
      user = await base44.auth.me();
    } catch (err) {
      user = null;
    }
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let body = {};
    try {
      body = await req.json();
    } catch (err) {
      body = {};
    }

    // Refuse any body that attempts to set a protected field directly,
    // regardless of action. This blocks score/passing/status overrides
    // even when the learner passes them alongside a valid action.
    if (body && typeof body === 'object') {
      for (const key of Object.keys(body)) {
        if (PROTECTED_BODY_FIELDS.has(key)) {
          return Response.json({ error: 'Forbidden field' }, { status: 403 });
        }
      }
    }

    const msg = isAllowedAction(body);
    if (!msg) {
      return Response.json({ error: 'Invalid action' }, { status: 400 });
    }

    const learnerId = user.id;
    const now = new Date().toISOString();

    // Lookup via service role because ModuleProgress RLS read blocks a
    // learner from listing progress rows they don't own.
    const existing = await base44.asServiceRole.entities.ModuleProgress.filter({
      learner_id: learnerId,
      course_slug: msg.courseSlug,
      module_slug: msg.moduleRoute,
    });
    const existingRow = existing && existing.length > 0 ? existing[0] : null;

    if (!existingRow) {
      // Provision the initial row. Protected fields default to
      // quiz_passed=false and status='in_progress'.
      const initial = {
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
      applyActionToRow(initial, msg);
      const created = await base44.asServiceRole.entities.ModuleProgress.create(initial);
      return Response.json({ progress: created, action: msg.action });
    }

    // Update only the field(s) the action touches. Protected fields
    // (quiz_passed, status: 'completed', completed_at) are NEVER written
    // by this function.
    const patch = { updated_at: now };
    switch (msg.action) {
      case 'set_last_section':
        patch.last_section_id = msg.payload.sectionId;
        break;
      case 'acknowledge_core_media':
        patch.core_media_acknowledged_at = now;
        break;
      case 'acknowledge_lesson_and_case':
        patch.lesson_and_case_reviewed_at = now;
        break;
      case 'acknowledge_activity':
        patch.activity_acknowledged_at = now;
        patch.activity_completion_mode = msg.payload.mode;
        break;
      case 'acknowledge_reflection':
        patch.reflection_acknowledged_at = now;
        patch.reflection_completion_mode = msg.payload.mode;
        break;
    }
    const updated = await base44.asServiceRole.entities.ModuleProgress.update(existingRow.id, patch);
    return Response.json({ progress: updated, action: msg.action });
  } catch (error) {
    console.error('[updateMentalHealthProgress] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}