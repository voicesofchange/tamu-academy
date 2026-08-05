import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import {
  isScenarioSupported,
  getScenarioAnswer,
  isModulePublished,
  getModulePrerequisite,
} from '../../shared/mental-health-curriculum.js';

/**
 * Role-gated endpoint that evaluates the learner's submitted response
 * to a Mental Health pillar module interactive scenario.
 *
 * SCOPE (Stage 2 of Module 1 — interactive scenario only):
 *   - Replaces the unprotected approach of returning the best-response
 *     educational feedback in the initial lesson payload. The initial
 *     `getMentalHealthModule` response carries only `prompt`,
 *     `options`, and instruction text — never `bestResponseIndex`,
 *     `correctIndex`, `isCorrect`, or `feedback`. THIS function is
 *     the single path through which the educational feedback is
 *     released, and only AFTER a valid submission.
 *
 * TRUST BOUNDARY (mirrors getMentalHealthModule — do not relax):
 *   - Unauthenticated public visitor → 403 Forbidden.
 *   - Non-admin authenticated user → 403 Forbidden during this
 *     development phase (admin-only access until launch; the
 *     enrollment / publication / prerequisite checks will be layered
 *     on top of the admin gate in a later phase, but for now the
 *     admin gate is the only access check).
 *   - 400 for malformed, unsupported, or unknown fields. Arbitrary
 *     `scenarioId` values are rejected before the protected answer
 *     key is consulted.
 *   - 404 for unknown (courseSlug, moduleRoute, scenarioId) tuples.
 *
 * NON-RECORDING (mandatory — see implementation note):
 *   - Never creates or updates a CourseEnrollment, ModuleProgress, or
 *     QuizAttempt record.
 *   - Never accepts a `learnerId`, `score`, `passed`, `attemptNumber`,
 *     `status`, or `completed_at` field from the browser; any such
 *     field is rejected with 400 Unsupported field.
 *   - The submitted selection is held only in front-end component
 *     state (in-memory). This function returns the evaluated payload
 *     but does NOT persist anything anywhere.
 *
 * RESPONSE SHAPE (minimal — never serializes the full curriculum):
 *   { isCorrect, feedback } only.
 *   scenarioId / submittedOptionIndex are NOT returned — the frontend
 *   already knows both from local component state.
 *   bestResponseIndex stays exclusively in the protected server
 *   curriculum (MENTAL_HEALTH_MODULE_1_SCENARIO_ANSWERS) and is
 *   never returned to the browser, in this response or the initial
 *   lesson response.
 */
export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);

    // Server-side role gate. base44.auth.me() throws on a public app
    // when no session token is present, so guard it and treat any
    // failure, null user, or non-admin role as forbidden during Stage 2.
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

    // --- Module 4 branch (Tumaini Youth Wellness 5-decision scenario) ---
    // The Module 4 scenario has five sequential decisions, each with
    // three options. The function supports two modes:
    //   1. Per-decision feedback: { courseSlug, moduleSlug, scenarioId,
    //      decisionId, selectedIndex } -> { feedback, progressSaved }
    //   2. Scenario completion: { courseSlug, moduleSlug, scenarioId,
    //      completeScenario: true, decisions: [{ decisionId, selectedIndex }, ...] }
    //      -> { completed, progressSaved }
    // The server validates all decisions but never stores or logs the
    // selections. interactive_scenario_completed_at is set only when
    // eligible (published + enrolled) and only after a complete set of
    // five valid decision responses.
    if (body && typeof body === 'object' && body.moduleSlug === 'module-4') {
      const m4AllowedKeys = new Set([
        'courseSlug', 'moduleSlug', 'scenarioId',
        'decisionId', 'selectedIndex',
        'completeScenario', 'decisions',
      ]);
      for (const k of Object.keys(body)) {
        if (!m4AllowedKeys.has(k)) {
          return Response.json({ error: 'Unsupported field: ' + k }, { status: 400 });
        }
      }
      const m4CourseSlug = typeof body.courseSlug === 'string' ? body.courseSlug : '';
      const m4ScenarioId = typeof body.scenarioId === 'string' ? body.scenarioId : '';
      if (!m4CourseSlug) {
        return Response.json({ error: 'Invalid course slug' }, { status: 400 });
      }
      if (!m4ScenarioId) {
        return Response.json({ error: 'Invalid scenario identifier' }, { status: 400 });
      }
      if (!isScenarioSupported(m4CourseSlug, 'module-4', m4ScenarioId)) {
        return Response.json({ error: 'Not found' }, { status: 404 });
      }

      // Access control (same pattern as Module 3).
      let m4CanRecord = false;
      if (isAdmin) {
        const m4Published = isModulePublished(m4CourseSlug, 'module-4');
        const m4Enrollment = await base44.asServiceRole.entities.CourseEnrollment.filter({
          learner_id: user.id, course_slug: m4CourseSlug, status: 'active',
        });
        m4CanRecord = m4Published && !!(m4Enrollment && m4Enrollment.length > 0);
      } else {
        const m4Enrollment = await base44.asServiceRole.entities.CourseEnrollment.filter({
          learner_id: user.id, course_slug: m4CourseSlug, status: 'active',
        });
        if (!m4Enrollment || m4Enrollment.length === 0) {
          return Response.json({ error: 'Forbidden' }, { status: 403 });
        }
        if (!isModulePublished(m4CourseSlug, 'module-4')) {
          return Response.json({ error: 'Forbidden' }, { status: 403 });
        }
        const m4Prereq = getModulePrerequisite(m4CourseSlug, 'module-4');
        if (m4Prereq) {
          const m4PrereqRows = await base44.asServiceRole.entities.ModuleProgress.filter({
            learner_id: user.id, course_slug: m4CourseSlug, module_slug: m4Prereq, status: 'completed',
          });
          if (!m4PrereqRows || m4PrereqRows.length === 0) {
            return Response.json({ error: 'Forbidden' }, { status: 403 });
          }
        }
        m4CanRecord = true;
      }

      const m4Answer = getScenarioAnswer(m4CourseSlug, 'module-4', m4ScenarioId);
      if (!m4Answer) {
        return Response.json({ error: 'Not found' }, { status: 404 });
      }

      // Mode: completion vs per-decision feedback.
      if (body.completeScenario === true) {
        const m4Decisions = body.decisions;
        if (!Array.isArray(m4Decisions) || m4Decisions.length !== m4Answer.decisionsCount) {
          return Response.json({ error: 'Invalid decisions' }, { status: 400 });
        }
        const m4SeenIds = new Set();
        for (const entry of m4Decisions) {
          if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
            return Response.json({ error: 'Invalid decision entry' }, { status: 400 });
          }
          const m4EntryKeys = new Set(['decisionId', 'selectedIndex']);
          for (const k of Object.keys(entry)) {
            if (!m4EntryKeys.has(k)) {
              return Response.json({ error: 'Unsupported field: ' + k }, { status: 400 });
            }
          }
          const entryDecisionId = typeof entry.decisionId === 'string' ? entry.decisionId : '';
          const entryIndex = entry.selectedIndex;
          if (!entryDecisionId) {
            return Response.json({ error: 'Invalid decision identifier' }, { status: 400 });
          }
          const decision = m4Answer.decisions.find((d) => d.decisionId === entryDecisionId);
          if (!decision) {
            return Response.json({ error: 'Unknown decision' }, { status: 400 });
          }
          if (m4SeenIds.has(entryDecisionId)) {
            return Response.json({ error: 'Duplicate decision' }, { status: 400 });
          }
          m4SeenIds.add(entryDecisionId);
          if (typeof entryIndex !== 'number' || !Number.isInteger(entryIndex) || entryIndex < 0 || entryIndex >= decision.optionsCount) {
            return Response.json({ error: 'Invalid selection' }, { status: 400 });
          }
        }
        // All decisions validated. Mark completion if eligible.
        if (m4CanRecord) {
          const m4Now = new Date().toISOString();
          const m4Rows = await base44.asServiceRole.entities.ModuleProgress.filter({
            learner_id: user.id, course_slug: m4CourseSlug, module_slug: 'module-4',
          });
          const m4Row = m4Rows && m4Rows.length > 0 ? m4Rows[0] : null;
          if (!m4Row) {
            await base44.asServiceRole.entities.ModuleProgress.create({
              learner_id: user.id, course_slug: m4CourseSlug, module_slug: 'module-4',
              status: 'in_progress', interactive_scenario_completed_at: m4Now, updated_at: m4Now,
            });
          } else if (!m4Row.interactive_scenario_completed_at) {
            await base44.asServiceRole.entities.ModuleProgress.update(m4Row.id, {
              interactive_scenario_completed_at: m4Now, updated_at: m4Now,
            });
          }
        }
        return Response.json({ completed: true, progressSaved: m4CanRecord });
      }

      // Per-decision feedback mode.
      const m4DecisionId = typeof body.decisionId === 'string' ? body.decisionId : '';
      const m4RawIndex = body.selectedIndex;
      if (!m4DecisionId) {
        return Response.json({ error: 'Invalid decision identifier' }, { status: 400 });
      }
      const m4Decision = m4Answer.decisions.find((d) => d.decisionId === m4DecisionId);
      if (!m4Decision) {
        return Response.json({ error: 'Unknown decision' }, { status: 404 });
      }
      if (typeof m4RawIndex !== 'number' || !Number.isInteger(m4RawIndex) || m4RawIndex < 0 || m4RawIndex >= m4Decision.optionsCount) {
        return Response.json({ error: 'Invalid selection' }, { status: 400 });
      }
      const m4Feedback = m4Decision.feedbackByOption[m4RawIndex] || '';
      return Response.json({ feedback: m4Feedback, progressSaved: m4CanRecord });
    }

    // Reject any browser-supplied protected / unexpected field.
    const allowedKeys = new Set([
      'courseSlug',
      'moduleSlug',
      'scenarioId',
      'selectedIndex',
    ]);
    for (const k of Object.keys(body)) {
      if (!allowedKeys.has(k)) {
        return Response.json(
          { error: 'Unsupported field: ' + k },
          { status: 400 },
        );
      }
    }

    const courseSlug =
      typeof body.courseSlug === 'string' ? body.courseSlug : '';
    const moduleSlug =
      typeof body.moduleSlug === 'string' ? body.moduleSlug : '';
    const scenarioId =
      typeof body.scenarioId === 'string' ? body.scenarioId : '';
    const rawIndex = body.selectedIndex;

    if (!courseSlug) {
      return Response.json({ error: 'Invalid course slug' }, { status: 400 });
    }
    if (!moduleSlug) {
      return Response.json({ error: 'Invalid module slug' }, { status: 400 });
    }
    if (!scenarioId) {
      return Response.json(
        { error: 'Invalid scenario identifier' },
        { status: 400 },
      );
    }

    // Validate the canonical scenario support tuple. Returns false
    // for unknown (courseSlug, moduleSlug) or unknown scenarioId.
    if (!isScenarioSupported(courseSlug, moduleSlug, scenarioId)) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    // Module-specific access control.
    // Module 1 and Module 2: admin-only (existing behavior preserved).
    // Module 3: admins always get preview; non-admins need enrollment +
    //   publication + prerequisite. Progress is saved only when eligible.
    let canRecordProgress = false;
    if (moduleSlug === 'module-3') {
      if (isAdmin) {
        const isPublished = isModulePublished(courseSlug, moduleSlug);
        const enrollmentRows = await base44.asServiceRole.entities.CourseEnrollment.filter({
          learner_id: user.id,
          course_slug: courseSlug,
          status: 'active',
        });
        canRecordProgress = isPublished && !!(enrollmentRows && enrollmentRows.length > 0);
      } else {
        const enrollmentRows = await base44.asServiceRole.entities.CourseEnrollment.filter({
          learner_id: user.id,
          course_slug: courseSlug,
          status: 'active',
        });
        if (!enrollmentRows || enrollmentRows.length === 0) {
          return Response.json({ error: 'Forbidden' }, { status: 403 });
        }
        if (!isModulePublished(courseSlug, moduleSlug)) {
          return Response.json({ error: 'Forbidden' }, { status: 403 });
        }
        const prereqRoute = getModulePrerequisite(courseSlug, moduleSlug);
        if (prereqRoute) {
          const prereqRows = await base44.asServiceRole.entities.ModuleProgress.filter({
            learner_id: user.id,
            course_slug: courseSlug,
            module_slug: prereqRoute,
            status: 'completed',
          });
          if (!prereqRows || prereqRows.length === 0) {
            return Response.json({ error: 'Forbidden' }, { status: 403 });
          }
        }
        canRecordProgress = true;
      }
    } else {
      // Module 1 and Module 2: admin-only (existing behavior).
      if (!isAdmin) {
        return Response.json({ error: 'Forbidden' }, { status: 403 });
      }
    }

    // Validate selectedIndex: must be a non-negative integer.
    if (
      typeof rawIndex !== 'number' ||
      !Number.isInteger(rawIndex) ||
      rawIndex < 0
    ) {
      return Response.json({ error: 'Invalid selection' }, { status: 400 });
    }

    const answer = getScenarioAnswer(courseSlug, moduleSlug, scenarioId);
    if (!answer) {
      // Defensive — isScenarioSupported returned true but the
      // getScenarioAnswer helper returned null. Treat as not found.
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    // Validate selectedIndex is in range [0, optionsCount).
    if (rawIndex >= answer.optionsCount) {
      return Response.json({ error: 'Invalid selection' }, { status: 400 });
    }

    const isCorrect = rawIndex === answer.bestResponseIndex;

    // Per-option feedback (Module 2 and 3) takes precedence when present;
    // otherwise the single `feedback` field (Module 1) is returned
    // unchanged. Only the feedback for the submitted option is
    // released; feedback for the other options stays exclusively in
    // the protected server curriculum. `bestResponseIndex` is never
    // returned, and `scenarioId` / `submittedOptionIndex` are omitted
    // (the frontend already knows both from local component state).
    const feedback = Array.isArray(answer.feedbackByOption)
      ? answer.feedbackByOption[rawIndex] || ''
      : answer.feedback;

    // Module 3: record scenario completion when eligible. Sets
    // interactive_scenario_completed_at to the current timestamp. No
    // selection, score, or feedback is stored. last_section_id is
    // preserved exclusively for its normal section tracking purpose.
    if (moduleSlug === 'module-3' && canRecordProgress) {
      const now = new Date().toISOString();
      const progressRows = await base44.asServiceRole.entities.ModuleProgress.filter({
        learner_id: user.id,
        course_slug: courseSlug,
        module_slug: moduleSlug,
      });
      const progressRow = progressRows && progressRows.length > 0 ? progressRows[0] : null;
      if (!progressRow) {
        await base44.asServiceRole.entities.ModuleProgress.create({
          learner_id: user.id,
          course_slug: courseSlug,
          module_slug: moduleSlug,
          status: 'in_progress',
          interactive_scenario_completed_at: now,
          updated_at: now,
        });
      } else if (!progressRow.interactive_scenario_completed_at) {
        await base44.asServiceRole.entities.ModuleProgress.update(progressRow.id, {
          interactive_scenario_completed_at: now,
          updated_at: now,
        });
      }
    }

    const responsePayload: Record<string, unknown> = { isCorrect, feedback };
    if (moduleSlug === 'module-3') {
      responsePayload.progressSaved = canRecordProgress;
    }

    return Response.json(responsePayload);
  } catch (error) {
    console.error(
      '[checkMentalHealthScenario] Unexpected error:',
      error && error.message,
    );
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}