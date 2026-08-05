import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import {
  getModuleConfig,
  getModulePrerequisite,
  isModulePublished,
  isModule2SelfAttestedKey,
  getModule2CompletionField,
  deriveModule2CompletedKeys,
  isSectionAllowed,
  MENTAL_HEALTH_COURSE_SLUG,
} from '../../shared/mental-health-curriculum.js';

/**
 * Authenticated progress-update endpoint for Mental Health pillar
 * module learning acknowledgments.
 *
 * CORRECTION-PASS UPDATES (Phase 1 correction):
 *   - Course slug changed to `mental-health-community-and-culture` and
 *     comes from the canonical server config in
 *     base44/shared/mental-health-curriculum.js.
 *   - For NON-admin requests, the function now verifies (server-side,
 *     canonical config — never browser-supplied metadata):
 *       1. Authentication required.
 *       2. The learner has an ACTIVE CourseEnrollment owned by user.id
 *          for this course.
 *       3. The requested course + module exist in the canonical config.
 *       4. The module's server-side publicationStatus is `published`.
 *       5. Any prerequisite module has a completed ModuleProgress row
 *          owned by the learner for that prerequisite module.
 *       6. The action + completion mode are permitted (existing check).
 *       7. The learner_id is derived from authentication only (existing).
 *   - For ADMIN requests: bypasses 1-4 since admins test during
 *     development, but still refuses all protected-field bodies and, by
 *     design, applies the section identifier allow-list check to all
 *     requests including admin.
 *   - Section identifier validation against the per-module server-side
 *     allow-list. The allow-list is EMPTY for every module in Phase 1;
 *     therefore the `set_last_section` action remains UNAVAILABLE for
 *     everyone (admin and non-admin). When the Module 1 content pack
 *     lands, the allow-list will be populated and the action will
 *     become available.
 *   - Absence of a ModuleProgress record is NOT used as an access rule.
 *     A missing row only means the learner has not started; the access
 *     chain above is what truly authorizes a write.
 *
 * PROTECTED-FIELD GUARANTEES (preserved from prior phase):
 *   Any body containing `learner_id`, `score`, `passed`, `quiz_passed`,
 *   `status`, `completed_at`, or `attempt_number` is refused with
 *   HTTP 403 "Forbidden field" regardless of action or role.
 *
 * COMPLETION (deferred):
 *   `status:'completed'` and `completed_at` on ModuleProgress and
 *   CourseEnrollment are NOT set by this function — completion remains
 *   deferred to a later grading/completion function with the editorial
 *   final-applied-assignment decision still open.
 *
 * Behaviors / responses by case:
 *   - Authenticated non-admin, no active enrollment → 403
 *   - Authenticated non-admin, module not published → 403
 *   - Authenticated non-admin, prerequisite not completed → 403
 *   - Authenticated non-admin, all gates passed, action permitted →
 *     ModuleProgress row created/updated
 *   - Admin, any action permitted (except set_last_section, see below)
 *     → ModuleProgress row created/updated
 *   - Anyone (admin or non-admin), set_last_section with empty
 *     allow-list (current Phase 1 state) → 400 "Invalid section identifier"
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

function isAllowedActionShape(raw) {
  if (!raw || typeof raw.action !== 'string') return null;
  if (typeof raw.courseSlug !== 'string' || raw.courseSlug !== MENTAL_HEALTH_COURSE_SLUG) {
    return null;
  }
  if (typeof raw.moduleRoute !== 'string' || raw.moduleRoute.length === 0) return null;

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
    case 'acknowledge_lesson_and_case':
      return { action: raw.action, courseSlug: raw.courseSlug, moduleRoute: raw.moduleRoute };
    case 'acknowledge_activity':
      if (!ALLOWED_ACTIVITY_MODES.has(raw.mode)) return null;
      return {
        action: raw.action,
        courseSlug: raw.courseSlug,
        moduleRoute: raw.moduleRoute,
        payload: { mode: raw.mode },
      };
    case 'acknowledge_reflection':
      if (!ALLOWED_REFLECTION_MODES.has(raw.mode)) return null;
      return {
        action: raw.action,
        courseSlug: raw.courseSlug,
        moduleRoute: raw.moduleRoute,
        payload: { mode: raw.mode },
      };
    case 'acknowledge_module2_requirement':
      if (typeof raw.requirementKey !== 'string' || raw.requirementKey.length === 0 || raw.requirementKey.length > 64) {
        return null;
      }
      return {
        action: raw.action,
        courseSlug: raw.courseSlug,
        moduleRoute: raw.moduleRoute,
        payload: { requirementKey: raw.requirementKey },
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
    } catch (err) {
      user = null;
    }
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const isAdmin = user.role === 'admin';

    let body = {};
    try {
      body = await req.json();
    } catch (err) {
      body = {};
    }

    // Refuse any body that attempts to set a protected field directly,
    // regardless of action or role.
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

    // Verify (course, module) exists in canonical server config. This
    // rejects requests for unknown routes such as module-99.
    const moduleConfig = getModuleConfig(msg.courseSlug, msg.moduleRoute);
    if (!moduleConfig) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    // Section identifier allow-list: applies to EVERYONE (admin and
    // non-admin). Empty allow-list (Phase 1 for every module) equals the
    // action being unavailable until content lands.
    if (msg.action === 'set_last_section') {
      if (!isSectionAllowed(msg.courseSlug, msg.moduleRoute, msg.payload.sectionId)) {
        return Response.json({ error: 'Invalid section identifier' }, { status: 400 });
      }
    }

    // Module 2 progress acknowledgment (Stage 12).
    // Isolated branch: only for module-2, only the four self-attestable
    // keys, refuses during unpublished preview for ALL users (including
    // admins). Does not write activity_completion_mode or
    // reflection_completion_mode for Module 2.
    if (msg.action === 'acknowledge_module2_requirement') {
      if (msg.moduleRoute !== 'module-2') {
        return Response.json({ error: 'Invalid action' }, { status: 400 });
      }
      if (!isModule2SelfAttestedKey(msg.payload.requirementKey)) {
        return Response.json({ error: 'Invalid requirement key' }, { status: 400 });
      }
      // Refuse progress saving during unpublished preview (ALL users).
      if (!isModulePublished(msg.courseSlug, msg.moduleRoute)) {
        return Response.json({ error: 'Forbidden' }, { status: 403 });
      }
      // Require active enrollment for ALL users (including admins),
      // regardless of role. Administrator status must not bypass
      // either saving condition.
      const m2Enrollment = await base44.asServiceRole.entities.CourseEnrollment.filter({
        learner_id: user.id,
        course_slug: msg.courseSlug,
        status: 'active',
      });
      if (!m2Enrollment || m2Enrollment.length === 0) {
        return Response.json({ error: 'Forbidden' }, { status: 403 });
      }
      // Non-admin: also check prerequisite completion.
      if (!isAdmin) {
        const m2Prereq = getModulePrerequisite(msg.courseSlug, msg.moduleRoute);
        if (m2Prereq) {
          const m2PrereqRows = await base44.asServiceRole.entities.ModuleProgress.filter({
            learner_id: user.id,
            course_slug: msg.courseSlug,
            module_slug: m2Prereq,
            status: 'completed',
          });
          if (!m2PrereqRows || m2PrereqRows.length === 0) {
            return Response.json({ error: 'Forbidden' }, { status: 403 });
          }
        }
      }
      const m2Field = getModule2CompletionField(msg.payload.requirementKey);
      if (!m2Field) {
        return Response.json({ error: 'Invalid requirement key' }, { status: 400 });
      }
      const m2Now = new Date().toISOString();
      const m2Existing = await base44.asServiceRole.entities.ModuleProgress.filter({
        learner_id: user.id,
        course_slug: msg.courseSlug,
        module_slug: msg.moduleRoute,
      });
      const m2ExistingRow = m2Existing && m2Existing.length > 0 ? m2Existing[0] : null;
      if (!m2ExistingRow) {
        const m2Created = await base44.asServiceRole.entities.ModuleProgress.create({
          learner_id: user.id,
          course_slug: msg.courseSlug,
          module_slug: msg.moduleRoute,
          status: 'in_progress',
          [m2Field]: m2Now,
          updated_at: m2Now,
        });
        return Response.json({
          completedKeys: deriveModule2CompletedKeys(m2Created),
          action: msg.action,
        });
      }
      const m2Patch: Record<string, string> = { updated_at: m2Now };
      if (!m2ExistingRow[m2Field]) {
        m2Patch[m2Field] = m2Now;
      }
      const m2Updated = await base44.asServiceRole.entities.ModuleProgress.update(
        m2ExistingRow.id,
        m2Patch,
      );
      return Response.json({
        completedKeys: deriveModule2CompletedKeys(m2Updated),
        action: msg.action,
      });
    }

    // For non-admin: enforce the full access chain using the canonical
    // server config and database state — never browser metadata.
    if (!isAdmin) {
      // 1. Active CourseEnrollment owned by the learner for this course.
      const enrollmentRows = await base44.asServiceRole.entities.CourseEnrollment.filter({
        learner_id: user.id,
        course_slug: msg.courseSlug,
        status: 'active',
      });
      if (!enrollmentRows || enrollmentRows.length === 0) {
        return Response.json({ error: 'Forbidden' }, { status: 403 });
      }

      // 2. The module's server-side publicationStatus must be 'published'.
      if (!isModulePublished(msg.courseSlug, msg.moduleRoute)) {
        return Response.json({ error: 'Forbidden' }, { status: 403 });
      }

      // 3. The prerequisite module, if any, must have a completed
      //    ModuleProgress row owned by the learner.
      const prereqRoute = getModulePrerequisite(msg.courseSlug, msg.moduleRoute);
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

    // Apply the action. Lookup via service role — RLS read blocks a
    // learner from listing progress rows that are not theirs.
    const learnerId = user.id;
    const now = new Date().toISOString();

    const existing = await base44.asServiceRole.entities.ModuleProgress.filter({
      learner_id: learnerId,
      course_slug: msg.courseSlug,
      module_slug: msg.moduleRoute,
    });
    const existingRow = existing && existing.length > 0 ? existing[0] : null;

    if (!existingRow) {
      // Provision the initial row. Protected fields default to
      // quiz_passed=false and status='in_progress'; completion stays
      // deferred.
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

    // Patch only the field(s) the action touches plus updated_at.
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