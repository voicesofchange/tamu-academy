import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import {
  getModuleConfig,
  getModulePrerequisite,
  isModulePublished,
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
} from '../../shared/mental-health-curriculum.js';

/**
 * completeMentalHealthModule — Mental Health pillar Module 1 completion
 * evaluation endpoint.
 *
 * DEVELOPMENT STAGE: Administrator-only while Module 1 remains unpublished.
 * Non-admin requests receive 403 in the current phase.
 *
 * PURPOSE:
 *   Evaluate the six content-pack completion requirements for the requested
 *   module and, when every requirement is satisfied, mark the module
 *   `status: 'completed'` with a server-generated `completed_at` timestamp.
 *
 * COMPLETION REQUIREMENTS (from the Module 1 Base44 Content Pack):
 *   1. Core media acknowledged (`core_media_acknowledged_at` exists on
 *      the learner's ModuleProgress row).
 *   2. Lesson and case study reviewed (`lesson_and_case_reviewed_at` exists).
 *   3. Community of Care Map activity acknowledged (`activity_acknowledged_at`
 *      exists — content-pack allows offline/browser-local completion).
 *   4. All five knowledge-check questions answered.
 *   5. Score at least 4 out of 5 — verified from the learner's QuizAttempt
 *      records (server-side; no browser claim accepted).
 *   6. Private reflection acknowledged (`reflection_acknowledged_at` exists —
 *      content-pack allows fictional/private offline completion).
 *
 * GUARANTEES:
 *   - `completed_at` and `status: 'completed'` are generated on the server;
 *     the browser cannot supply them.
 *   - `learner_id` is derived exclusively from the authenticated session.
 *   - The function is idempotent: if the module is already marked completed,
 *     the original `completed_at` is preserved and returned unchanged.
 *   - Unsatisfied requirements: the function returns the list of unmet
 *     requirements WITHOUT writing `status: 'completed'` or `completed_at`.
 *   - No CourseEnrollment record is created or modified.
 *   - No course-level completion is written (Module 1 completion only).
 *   - No certificate or certificate eligibility is created.
 *   - Enrollment settings and publication settings remain unchanged.
 *   - The `QuizAttempt` schema is never modified by this function.
 *
 * REJECTED BODY FIELDS:
 *   `learner_id`, `completed_at`, `status`, `quiz_passed`, `score`,
 *   `passed`, `attempt_number` — any body containing these returns 403.
 *
 * REQUEST BODY:
 *   { courseSlug: string, moduleRoute: string }
 *
 * RESPONSE (success — requirements met):
 *   { completed: true, completedAt: string (ISO), requirements: { ... all true } }
 *
 * RESPONSE (success — already completed):
 *   { completed: true, alreadyCompleted: true, completedAt: string (original) }
 *
 * RESPONSE (unmet requirements):
 *   { completed: false, requirements: { [requirementKey]: boolean } }
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

// Quiz identifiers that map to Module 1's knowledge check.
const MODULE_1_QUIZ_ROUTE = 'module-1';
const MODULE_1_COURSE_SLUG = MENTAL_HEALTH_COURSE_SLUG;
const MODULE_1_PASSING_SCORE = 4;
const MODULE_1_TOTAL_QUESTIONS = 5;

export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);

    // --- Authentication ---
    let user = null;
    try {
      user = await base44.auth.me();
    } catch (_) {
      user = null;
    }
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // --- Parse body (before module routing) ---
    let body: Record<string, unknown> = {};
    try {
      body = await req.json();
    } catch (_) {
      body = {};
    }

    const courseSlug =
      typeof body.courseSlug === 'string' ? body.courseSlug.trim() : '';
    const moduleRoute =
      typeof body.moduleRoute === 'string' ? body.moduleRoute.trim() : '';

    // --- Module 2 branch (Stage 12) ---
    // Isolated completion path for Module 2. Has its own publication and
    // enrollment checks — refuses during unpublished preview for ALL
    // users (including admins). Derives all six completion keys from
    // server-side ModuleProgress data; never trusts browser-supplied
    // completion data.
    if (moduleRoute === 'module-2') {
      // Reject any body containing protected fields.
      if (body && typeof body === 'object') {
        for (const key of Object.keys(body)) {
          if (PROTECTED_BODY_FIELDS.has(key)) {
            return Response.json({ error: 'Forbidden field' }, { status: 403 });
          }
        }
      }
      // Reject any field other than courseSlug and moduleRoute.
      const allowedM2Keys = new Set(['courseSlug', 'moduleRoute']);
      for (const k of Object.keys(body)) {
        if (!allowedM2Keys.has(k)) {
          return Response.json({ error: 'Unsupported field: ' + k }, { status: 400 });
        }
      }
      if (!courseSlug || courseSlug !== MENTAL_HEALTH_COURSE_SLUG) {
        return Response.json({ error: 'Not found' }, { status: 404 });
      }
      const m2Config = getModuleConfig(courseSlug, moduleRoute);
      if (!m2Config) {
        return Response.json({ error: 'Not found' }, { status: 404 });
      }
      // Refuse completion during unpublished preview (ALL users).
      if (!isModulePublished(courseSlug, moduleRoute)) {
        return Response.json({ error: 'Forbidden' }, { status: 403 });
      }
      // Require active enrollment for ALL users (including admins),
      // regardless of role. Administrator status must not bypass
      // either saving condition.
      const m2Enrollment = await base44.asServiceRole.entities.CourseEnrollment.filter({
        learner_id: user.id,
        course_slug: courseSlug,
        status: 'active',
      });
      if (!m2Enrollment || m2Enrollment.length === 0) {
        return Response.json({ error: 'Forbidden' }, { status: 403 });
      }
      // Non-admin: also check prerequisite completion.
      if (user.role !== 'admin') {
        const m2Prereq = getModulePrerequisite(courseSlug, moduleRoute);
        if (m2Prereq) {
          const m2PrereqRows = await base44.asServiceRole.entities.ModuleProgress.filter({
            learner_id: user.id,
            course_slug: courseSlug,
            module_slug: m2Prereq,
            status: 'completed',
          });
          if (!m2PrereqRows || m2PrereqRows.length === 0) {
            return Response.json({ error: 'Forbidden' }, { status: 403 });
          }
        }
      }
      // Derive all six completion keys from server-side ModuleProgress.
      const m2Rows = await base44.asServiceRole.entities.ModuleProgress.filter({
        learner_id: user.id,
        course_slug: courseSlug,
        module_slug: moduleRoute,
      });
      const m2Row = m2Rows && m2Rows.length > 0 ? m2Rows[0] : null;
      const m2CompletedKeys = m2Row ? deriveModule2CompletedKeys(m2Row) : [];
      const m2AllComplete = MENTAL_HEALTH_MODULE_2_COMPLETION_KEYS.every(
        (k) => m2CompletedKeys.includes(k),
      );
      if (!m2AllComplete) {
        const missing = MENTAL_HEALTH_MODULE_2_COMPLETION_KEYS.filter(
          (k) => !m2CompletedKeys.includes(k),
        );
        return Response.json({ completed: false, missing });
      }
      // Idempotent: preserve existing completion timestamp.
      if (m2Row && m2Row.status === 'completed' && m2Row.completed_at) {
        return Response.json({
          completed: true,
          alreadyCompleted: true,
          completedAt: m2Row.completed_at,
        });
      }
      const m2Now = new Date().toISOString();
      if (m2Row) {
        const m2Updated = await base44.asServiceRole.entities.ModuleProgress.update(
          m2Row.id,
          { status: 'completed', completed_at: m2Now, updated_at: m2Now },
        );
        return Response.json({
          completed: true,
          completedAt: m2Updated.completed_at || m2Now,
        });
      }
      const m2Created = await base44.asServiceRole.entities.ModuleProgress.create({
        learner_id: user.id,
        course_slug: courseSlug,
        module_slug: moduleRoute,
        status: 'completed',
        completed_at: m2Now,
        updated_at: m2Now,
      });
      return Response.json({
        completed: true,
        completedAt: m2Created.completed_at || m2Now,
      });
    }

    // --- Module 3 branch ---
    // Isolated completion path for Module 3. Same pattern as Module 2:
    // refuses during unpublished preview for ALL users (including admins).
    // Derives all seven completion keys from server-side ModuleProgress.
    if (moduleRoute === 'module-3') {
      if (body && typeof body === 'object') {
        for (const key of Object.keys(body)) {
          if (PROTECTED_BODY_FIELDS.has(key)) {
            return Response.json({ error: 'Forbidden field' }, { status: 403 });
          }
        }
      }
      const allowedM3Keys = new Set(['courseSlug', 'moduleRoute']);
      for (const k of Object.keys(body)) {
        if (!allowedM3Keys.has(k)) {
          return Response.json({ error: 'Unsupported field: ' + k }, { status: 400 });
        }
      }
      if (!courseSlug || courseSlug !== MENTAL_HEALTH_COURSE_SLUG) {
        return Response.json({ error: 'Not found' }, { status: 404 });
      }
      const m3Config = getModuleConfig(courseSlug, moduleRoute);
      if (!m3Config) {
        return Response.json({ error: 'Not found' }, { status: 404 });
      }
      if (!isModulePublished(courseSlug, moduleRoute)) {
        return Response.json({ error: 'Forbidden' }, { status: 403 });
      }
      const m3Enrollment = await base44.asServiceRole.entities.CourseEnrollment.filter({
        learner_id: user.id,
        course_slug: courseSlug,
        status: 'active',
      });
      if (!m3Enrollment || m3Enrollment.length === 0) {
        return Response.json({ error: 'Forbidden' }, { status: 403 });
      }
      if (user.role !== 'admin') {
        const m3Prereq = getModulePrerequisite(courseSlug, moduleRoute);
        if (m3Prereq) {
          const m3PrereqRows = await base44.asServiceRole.entities.ModuleProgress.filter({
            learner_id: user.id,
            course_slug: courseSlug,
            module_slug: m3Prereq,
            status: 'completed',
          });
          if (!m3PrereqRows || m3PrereqRows.length === 0) {
            return Response.json({ error: 'Forbidden' }, { status: 403 });
          }
        }
      }
      const m3Rows = await base44.asServiceRole.entities.ModuleProgress.filter({
        learner_id: user.id,
        course_slug: courseSlug,
        module_slug: moduleRoute,
      });
      const m3Row = m3Rows && m3Rows.length > 0 ? m3Rows[0] : null;
      const m3CompletedKeys = m3Row ? deriveModule3CompletedKeys(m3Row) : [];
      const m3AllComplete = MENTAL_HEALTH_MODULE_3_COMPLETION_KEYS.every(
        (k) => m3CompletedKeys.includes(k),
      );
      if (!m3AllComplete) {
        const missing = MENTAL_HEALTH_MODULE_3_COMPLETION_KEYS.filter(
          (k) => !m3CompletedKeys.includes(k),
        );
        return Response.json({ completed: false, missing });
      }
      if (m3Row && m3Row.status === 'completed' && m3Row.completed_at) {
        return Response.json({
          completed: true,
          alreadyCompleted: true,
          completedAt: m3Row.completed_at,
        });
      }
      const m3Now = new Date().toISOString();
      if (m3Row) {
        const m3Updated = await base44.asServiceRole.entities.ModuleProgress.update(
          m3Row.id,
          { status: 'completed', completed_at: m3Now, updated_at: m3Now },
        );
        return Response.json({
          completed: true,
          completedAt: m3Updated.completed_at || m3Now,
        });
      }
      const m3Created = await base44.asServiceRole.entities.ModuleProgress.create({
        learner_id: user.id,
        course_slug: courseSlug,
        module_slug: moduleRoute,
        status: 'completed',
        completed_at: m3Now,
        updated_at: m3Now,
      });
      return Response.json({
        completed: true,
        completedAt: m3Created.completed_at || m3Now,
      });
    }

    // --- Module 4 branch ---
    // Isolated completion path for Module 4. Same pattern as Module 3:
    // refuses during unpublished preview for ALL users (including admins).
    // Derives all six completion keys from server-side ModuleProgress.
    if (moduleRoute === 'module-4') {
      if (body && typeof body === 'object') {
        for (const key of Object.keys(body)) {
          if (PROTECTED_BODY_FIELDS.has(key)) {
            return Response.json({ error: 'Forbidden field' }, { status: 403 });
          }
        }
      }
      const allowedM4Keys = new Set(['courseSlug', 'moduleRoute']);
      for (const k of Object.keys(body)) {
        if (!allowedM4Keys.has(k)) {
          return Response.json({ error: 'Unsupported field: ' + k }, { status: 400 });
        }
      }
      if (!courseSlug || courseSlug !== MENTAL_HEALTH_COURSE_SLUG) {
        return Response.json({ error: 'Not found' }, { status: 404 });
      }
      const m4Config = getModuleConfig(courseSlug, moduleRoute);
      if (!m4Config) {
        return Response.json({ error: 'Not found' }, { status: 404 });
      }
      if (!isModulePublished(courseSlug, moduleRoute)) {
        return Response.json({ error: 'Forbidden' }, { status: 403 });
      }
      const m4Enrollment = await base44.asServiceRole.entities.CourseEnrollment.filter({
        learner_id: user.id,
        course_slug: courseSlug,
        status: 'active',
      });
      if (!m4Enrollment || m4Enrollment.length === 0) {
        return Response.json({ error: 'Forbidden' }, { status: 403 });
      }
      if (user.role !== 'admin') {
        const m4Prereq = getModulePrerequisite(courseSlug, moduleRoute);
        if (m4Prereq) {
          const m4PrereqRows = await base44.asServiceRole.entities.ModuleProgress.filter({
            learner_id: user.id,
            course_slug: courseSlug,
            module_slug: m4Prereq,
            status: 'completed',
          });
          if (!m4PrereqRows || m4PrereqRows.length === 0) {
            return Response.json({ error: 'Forbidden' }, { status: 403 });
          }
        }
      }
      const m4Rows = await base44.asServiceRole.entities.ModuleProgress.filter({
        learner_id: user.id,
        course_slug: courseSlug,
        module_slug: moduleRoute,
      });
      const m4Row = m4Rows && m4Rows.length > 0 ? m4Rows[0] : null;
      const m4CompletedKeys = m4Row ? deriveModule4CompletedKeys(m4Row) : [];
      const m4AllComplete = MENTAL_HEALTH_MODULE_4_COMPLETION_KEYS.every(
        (k) => m4CompletedKeys.includes(k),
      );
      if (!m4AllComplete) {
        const missing = MENTAL_HEALTH_MODULE_4_COMPLETION_KEYS.filter(
          (k) => !m4CompletedKeys.includes(k),
        );
        return Response.json({ completed: false, missing });
      }
      if (m4Row && m4Row.status === 'completed' && m4Row.completed_at) {
        return Response.json({
          completed: true,
          alreadyCompleted: true,
          completedAt: m4Row.completed_at,
        });
      }
      const m4Now = new Date().toISOString();
      if (m4Row) {
        const m4Updated = await base44.asServiceRole.entities.ModuleProgress.update(
          m4Row.id,
          { status: 'completed', completed_at: m4Now, updated_at: m4Now },
        );
        return Response.json({
          completed: true,
          completedAt: m4Updated.completed_at || m4Now,
        });
      }
      const m4Created = await base44.asServiceRole.entities.ModuleProgress.create({
        learner_id: user.id,
        course_slug: courseSlug,
        module_slug: moduleRoute,
        status: 'completed',
        completed_at: m4Now,
        updated_at: m4Now,
      });
      return Response.json({
        completed: true,
        completedAt: m4Created.completed_at || m4Now,
      });
    }

    // --- Module 5 branch ---
    // Isolated completion path for Module 5. Same pattern as Module 4:
    // refuses during unpublished preview for ALL users (including admins).
    // Derives all six completion keys from server-side ModuleProgress.
    if (moduleRoute === 'module-5') {
      if (body && typeof body === 'object') {
        for (const key of Object.keys(body)) {
          if (PROTECTED_BODY_FIELDS.has(key)) {
            return Response.json({ error: 'Forbidden field' }, { status: 403 });
          }
        }
      }
      const allowedM5Keys = new Set(['courseSlug', 'moduleRoute']);
      for (const k of Object.keys(body)) {
        if (!allowedM5Keys.has(k)) {
          return Response.json({ error: 'Unsupported field: ' + k }, { status: 400 });
        }
      }
      if (!courseSlug || courseSlug !== MENTAL_HEALTH_COURSE_SLUG) {
        return Response.json({ error: 'Not found' }, { status: 404 });
      }
      const m5Config = getModuleConfig(courseSlug, moduleRoute);
      if (!m5Config) {
        return Response.json({ error: 'Not found' }, { status: 404 });
      }
      if (!isModulePublished(courseSlug, moduleRoute)) {
        return Response.json({ error: 'Forbidden' }, { status: 403 });
      }
      const m5Enrollment = await base44.asServiceRole.entities.CourseEnrollment.filter({
        learner_id: user.id,
        course_slug: courseSlug,
        status: 'active',
      });
      if (!m5Enrollment || m5Enrollment.length === 0) {
        return Response.json({ error: 'Forbidden' }, { status: 403 });
      }
      if (user.role !== 'admin') {
        const m5Prereq = getModulePrerequisite(courseSlug, moduleRoute);
        if (m5Prereq) {
          const m5PrereqRows = await base44.asServiceRole.entities.ModuleProgress.filter({
            learner_id: user.id,
            course_slug: courseSlug,
            module_slug: m5Prereq,
            status: 'completed',
          });
          if (!m5PrereqRows || m5PrereqRows.length === 0) {
            return Response.json({ error: 'Forbidden' }, { status: 403 });
          }
        }
      }
      const m5Rows = await base44.asServiceRole.entities.ModuleProgress.filter({
        learner_id: user.id,
        course_slug: courseSlug,
        module_slug: moduleRoute,
      });
      const m5Row = m5Rows && m5Rows.length > 0 ? m5Rows[0] : null;
      const m5CompletedKeys = m5Row ? deriveModule5CompletedKeys(m5Row) : [];
      const m5AllComplete = MENTAL_HEALTH_MODULE_5_COMPLETION_KEYS.every(
        (k) => m5CompletedKeys.includes(k),
      );
      if (!m5AllComplete) {
        const missing = MENTAL_HEALTH_MODULE_5_COMPLETION_KEYS.filter(
          (k) => !m5CompletedKeys.includes(k),
        );
        return Response.json({ completed: false, missing });
      }
      if (m5Row && m5Row.status === 'completed' && m5Row.completed_at) {
        return Response.json({
          completed: true,
          alreadyCompleted: true,
          completedAt: m5Row.completed_at,
        });
      }
      const m5Now = new Date().toISOString();
      if (m5Row) {
        const m5Updated = await base44.asServiceRole.entities.ModuleProgress.update(
          m5Row.id,
          { status: 'completed', completed_at: m5Now, updated_at: m5Now },
        );
        return Response.json({
          completed: true,
          completedAt: m5Updated.completed_at || m5Now,
        });
      }
      const m5Created = await base44.asServiceRole.entities.ModuleProgress.create({
        learner_id: user.id,
        course_slug: courseSlug,
        module_slug: moduleRoute,
        status: 'completed',
        completed_at: m5Now,
        updated_at: m5Now,
      });
      return Response.json({
        completed: true,
        completedAt: m5Created.completed_at || m5Now,
      });
    }

    // --- Module 6 branch ---
    // Isolated completion path for Module 6. Same pattern as Module 5:
    // refuses during unpublished preview for ALL users (including admins).
    // Derives all five completion keys from server-side ModuleProgress.
    // Module 6 has exactly five completion conditions (no private
    // reflection condition).
    if (moduleRoute === 'module-6') {
      if (body && typeof body === 'object') {
        for (const key of Object.keys(body)) {
          if (PROTECTED_BODY_FIELDS.has(key)) {
            return Response.json({ error: 'Forbidden field' }, { status: 403 });
          }
        }
      }
      const allowedM6Keys = new Set(['courseSlug', 'moduleRoute']);
      for (const k of Object.keys(body)) {
        if (!allowedM6Keys.has(k)) {
          return Response.json({ error: 'Unsupported field: ' + k }, { status: 400 });
        }
      }
      if (!courseSlug || courseSlug !== MENTAL_HEALTH_COURSE_SLUG) {
        return Response.json({ error: 'Not found' }, { status: 404 });
      }
      const m6Config = getModuleConfig(courseSlug, moduleRoute);
      if (!m6Config) {
        return Response.json({ error: 'Not found' }, { status: 404 });
      }
      if (!isModulePublished(courseSlug, moduleRoute)) {
        return Response.json({ error: 'Forbidden' }, { status: 403 });
      }
      const m6Enrollment = await base44.asServiceRole.entities.CourseEnrollment.filter({
        learner_id: user.id,
        course_slug: courseSlug,
        status: 'active',
      });
      if (!m6Enrollment || m6Enrollment.length === 0) {
        return Response.json({ error: 'Forbidden' }, { status: 403 });
      }
      if (user.role !== 'admin') {
        const m6Prereq = getModulePrerequisite(courseSlug, moduleRoute);
        if (m6Prereq) {
          const m6PrereqRows = await base44.asServiceRole.entities.ModuleProgress.filter({
            learner_id: user.id,
            course_slug: courseSlug,
            module_slug: m6Prereq,
            status: 'completed',
          });
          if (!m6PrereqRows || m6PrereqRows.length === 0) {
            return Response.json({ error: 'Forbidden' }, { status: 403 });
          }
        }
      }
      const m6Rows = await base44.asServiceRole.entities.ModuleProgress.filter({
        learner_id: user.id,
        course_slug: courseSlug,
        module_slug: moduleRoute,
      });
      const m6Row = m6Rows && m6Rows.length > 0 ? m6Rows[0] : null;
      const m6CompletedKeys = m6Row ? deriveModule6CompletedKeys(m6Row) : [];
      const m6AllComplete = MENTAL_HEALTH_MODULE_6_COMPLETION_KEYS.every(
        (k) => m6CompletedKeys.includes(k),
      );
      if (!m6AllComplete) {
        const missing = MENTAL_HEALTH_MODULE_6_COMPLETION_KEYS.filter(
          (k) => !m6CompletedKeys.includes(k),
        );
        return Response.json({ completed: false, missing });
      }
      if (m6Row && m6Row.status === 'completed' && m6Row.completed_at) {
        return Response.json({
          completed: true,
          alreadyCompleted: true,
          completedAt: m6Row.completed_at,
        });
      }
      const m6Now = new Date().toISOString();
      if (m6Row) {
        const m6Updated = await base44.asServiceRole.entities.ModuleProgress.update(
          m6Row.id,
          { status: 'completed', completed_at: m6Now, updated_at: m6Now },
        );
        return Response.json({
          completed: true,
          completedAt: m6Updated.completed_at || m6Now,
        });
      }
      const m6Created = await base44.asServiceRole.entities.ModuleProgress.create({
        learner_id: user.id,
        course_slug: courseSlug,
        module_slug: moduleRoute,
        status: 'completed',
        completed_at: m6Now,
        updated_at: m6Now,
      });
      return Response.json({
        completed: true,
        completedAt: m6Created.completed_at || m6Now,
      });
    }

    // --- Development-stage admin gate (Module 1) ---
    // Module 1 remains unpublished. Only admins may invoke completion
    // evaluation while it is unpublished.
    if (user.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Reject any body containing protected fields.
    if (body && typeof body === 'object') {
      for (const key of Object.keys(body)) {
        if (PROTECTED_BODY_FIELDS.has(key)) {
          return Response.json({ error: 'Forbidden field' }, { status: 403 });
        }
      }
    }

    if (!courseSlug || !moduleRoute) {
      return Response.json({ error: 'Missing courseSlug or moduleRoute' }, { status: 400 });
    }
    if (courseSlug !== MODULE_1_COURSE_SLUG) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    // --- Verify module exists in canonical server config ---
    const moduleConfig = getModuleConfig(courseSlug, moduleRoute);
    if (!moduleConfig) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    // --- Only Module 1 has completion logic implemented in this stage ---
    if (moduleRoute !== MODULE_1_QUIZ_ROUTE) {
      return Response.json(
        { error: 'Completion not yet implemented for this module' },
        { status: 400 }
      );
    }

    const learnerId = user.id;

    // --- Check for existing completed ModuleProgress row (idempotency) ---
    const existingRows = await base44.asServiceRole.entities.ModuleProgress.filter({
      learner_id: learnerId,
      course_slug: courseSlug,
      module_slug: moduleRoute,
    });
    const existingRow = existingRows && existingRows.length > 0 ? existingRows[0] : null;

    if (existingRow && existingRow.status === 'completed' && existingRow.completed_at) {
      return Response.json({
        completed: true,
        alreadyCompleted: true,
        completedAt: existingRow.completed_at,
      });
    }

    // --- Evaluate each completion requirement from the content pack ---

    // Requirement 1: Core media acknowledged
    const req1Met = !!(existingRow && existingRow.core_media_acknowledged_at);

    // Requirement 2: Lesson and case study reviewed
    const req2Met = !!(existingRow && existingRow.lesson_and_case_reviewed_at);

    // Requirement 3: Community of Care Map (activity) acknowledged
    const req3Met = !!(existingRow && existingRow.activity_acknowledged_at);

    // Requirements 4 + 5: Knowledge check — at least 4/5 correct.
    // Verified exclusively from the learner's server-side QuizAttempt records.
    // A browser-supplied claim is never accepted.
    const quizAttempts = await base44.asServiceRole.entities.QuizAttempt.filter({
      learner_id: learnerId,
      course_slug: courseSlug,
      module_slug: moduleRoute,
    });

    // Find any attempt where the learner scored at least 4/5.
    // Once earned, a passing state is never removed by a later failed retry.
    const hasPassed = Array.isArray(quizAttempts) && quizAttempts.some(
      (a) =>
        typeof a.score === 'number' &&
        typeof a.total_questions === 'number' &&
        a.total_questions === MODULE_1_TOTAL_QUESTIONS &&
        a.score >= MODULE_1_PASSING_SCORE
    );
    const req4Met = hasPassed; // answered all 5 questions (implied by total_questions check)
    const req5Met = hasPassed; // scored at least 4

    // Requirement 6: Private reflection acknowledged
    const req6Met = !!(existingRow && existingRow.reflection_acknowledged_at);

    const requirements = {
      core_media_acknowledged: req1Met,
      lesson_and_case_reviewed: req2Met,
      activity_acknowledged: req3Met,
      knowledge_check_answered: req4Met,
      knowledge_check_passed: req5Met,
      reflection_acknowledged: req6Met,
    };

    const allMet =
      req1Met && req2Met && req3Met && req4Met && req5Met && req6Met;

    if (!allMet) {
      return Response.json({ completed: false, requirements });
    }

    // --- All requirements satisfied — mark Module 1 complete ---
    const now = new Date().toISOString();

    if (existingRow) {
      const updated = await base44.asServiceRole.entities.ModuleProgress.update(
        existingRow.id,
        {
          status: 'completed',
          completed_at: now,
          quiz_passed: true,
          updated_at: now,
        }
      );
      return Response.json({
        completed: true,
        completedAt: updated.completed_at || now,
        requirements,
      });
    } else {
      // No progress row exists yet — create one fully completed.
      // (Edge case: admin completed all activities in a prior session
      //  without the row being provisioned.)
      const created = await base44.asServiceRole.entities.ModuleProgress.create({
        learner_id: learnerId,
        course_slug: courseSlug,
        module_slug: moduleRoute,
        status: 'completed',
        completed_at: now,
        quiz_passed: true,
        updated_at: now,
      });
      return Response.json({
        completed: true,
        completedAt: created.completed_at || now,
        requirements,
      });
    }
  } catch (error) {
    console.error('[completeMentalHealthModule] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}