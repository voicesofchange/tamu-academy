import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import {
  isScenarioSupported,
  getScenarioAnswer,
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
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    let body = {};
    try {
      body = await req.json();
    } catch (err) {
      body = {};
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

    // Return ONLY the two fields the frontend needs: `isCorrect` and
    // `feedback`. The learner already knows their submitted option from
    // local component state, and `bestResponseIndex` remains
    // exclusively in the protected server curriculum — it never
    // appears in the initial lesson response or this submission
    // response. `scenarioId` and `submittedOptionIndex` are also
    // omitted from the response: the frontend supplied both, so
    // mirroring them back would leak no new information but is also
    // unnecessary, and the leaner payload is preferable.
    return Response.json({
      isCorrect,
      feedback: answer.feedback,
    });
  } catch (error) {
    console.error(
      '[checkMentalHealthScenario] Unexpected error:',
      error && error.message,
    );
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}