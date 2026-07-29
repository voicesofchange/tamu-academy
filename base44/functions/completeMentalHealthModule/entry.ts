import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import {
  getModuleConfig,
  isModulePublished,
  MENTAL_HEALTH_COURSE_SLUG,
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

    // --- Development-stage admin gate ---
    // Module 1 remains unpublished. Only admins may invoke completion
    // evaluation while it is unpublished.
    if (user.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    // --- Parse and validate body ---
    let body: Record<string, unknown> = {};
    try {
      body = await req.json();
    } catch (_) {
      body = {};
    }

    // Reject any body containing protected fields.
    if (body && typeof body === 'object') {
      for (const key of Object.keys(body)) {
        if (PROTECTED_BODY_FIELDS.has(key)) {
          return Response.json({ error: 'Forbidden field' }, { status: 403 });
        }
      }
    }

    const courseSlug =
      typeof body.courseSlug === 'string' ? body.courseSlug.trim() : '';
    const moduleRoute =
      typeof body.moduleRoute === 'string' ? body.moduleRoute.trim() : '';

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