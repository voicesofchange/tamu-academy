import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import {
  isQuizSupported,
  getQuizAnswerKey,
} from '../../shared/mental-health-curriculum.js';

/**
 * Role-gated endpoint that grades a submitted Mental Health pillar
 * module knowledge check.
 *
 * SCOPE (Stage 3 of Module 1 — knowledge check only):
 *   - Replaces the "five-question knowledge check and grading" entry
 *     in the unavailable notice with a working knowledge check.
 *   - Exactly one QuizAttempt is created per valid submission,
 *     associated with the authenticated user (server-derived, never
 *     browser-supplied).
 *   - No CourseEnrollment is created or updated.
 *   - No ModuleProgress field is written (including quiz_passed)
 *     during this stage; the existing `updateMentalHealthProgress`
 *     function and any auto-progress writes it manages stay untouched.
 *
 * TRUST BOUNDARY (mirrors getMentalHealthModule /
 * checkMentalHealthScenario — do not relax):
 *   - Unauthenticated public visitor → 403 Forbidden.
 *   - Non-admin authenticated user → 403 Forbidden during this
 *     development phase (admin-only access until the module is
 *     published). The function is structured so an ordinary learner
 *     can later submit ONLY after the module is published, enrollment
 *     is open or a valid enrollment exists for that learner, and any
 *     applicable prerequisite checks pass. Those learner-access
 *     checks will be layered ON TOP of the existing admin gate here
 *     in a later launch phase; for now the admin gate is the only
 *     access check.
 *   - 400 for malformed/missing answers, unknown question IDs,
 *     duplicate question IDs, invalid option indices, wrong answer
 *     count, or any unexpected / protected body field.
 *   - 404 for unknown (courseSlug, moduleSlug, quizId) tuples.
 *
 * PRIVACY / NON-EXFILTRATION:
 *   - Never accepts a `learnerId`, `userId`, `score`, `passed`,
 *     `feedback`, `correctIndex`, `correctAnswer`, `correctResponse`,
 *     `quiz_passed`, `activity_acknowledged_at`,
 *     `reflection_acknowledged_at`, `status`, or `completed_at` field
 *     from the browser — any such field is rejected with 400
 *     Unsupported field, regardless of where it appears in the
 *     request body.
 *   - Per-answer entry fields are limited to `questionId` and
 *     `selectedIndex`. Any other per-answer field is rejected.
 *   - Grades against the protected server-side
 *     `MENTAL_HEALTH_MODULE_1_QUIZ_ANSWERS` answer key only. The
 *     correctIndex, correctAnswer, answerKey, and scoringKey never
 *     appear in the response.
 *   - The per-question feedback returned is the approved
 *     learner-facing correctFeedback or incorrectFeedback for the
 *     answer the learner actually chose. Never raw answer-key fields.
 *   - Stores ONLY the ordinary assessment fields already supported by
 *     the QuizAttempt entity: learner_id (server-derived),
 *     course_slug, module_slug, attempt_number (server-computed),
 *     score, total_questions, passed, submitted_at. No answer array
 *     (the entity has no `answers` field), no reflections, no Care
 *     Map data, no scenario selections, no diagnoses.
 *
 * RESPONSE SHAPE (minimal — never serializes the full curriculum):
 *   {
 *     score: <integer 0..totalQuestions>,
 *     totalQuestions: <integer>,
 *     passed: <boolean>,
 *     feedback: [{ questionId: string, isCorrect: boolean, feedback: string }]
 *   }
 */
export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);

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

    // Reject any browser-supplied protected / unexpected top-level
    // field (learner IDs, scores, passing flags, completion fields,
    // feedback, etc.).
    const allowedTopKeys = new Set([
      'courseSlug',
      'moduleSlug',
      'quizId',
      'answers',
    ]);
    for (const k of Object.keys(body)) {
      if (!allowedTopKeys.has(k)) {
        return Response.json({ error: 'Unsupported field: ' + k }, { status: 400 });
      }
    }

    const courseSlug =
      typeof body.courseSlug === 'string' ? body.courseSlug : '';
    const moduleSlug =
      typeof body.moduleSlug === 'string' ? body.moduleSlug : '';
    const quizId =
      typeof body.quizId === 'string' ? body.quizId : '';
    const answers =
      Array.isArray(body.answers) ? body.answers : null;

    if (!courseSlug) {
      return Response.json({ error: 'Invalid course slug' }, { status: 400 });
    }
    if (!moduleSlug) {
      return Response.json({ error: 'Invalid module slug' }, { status: 400 });
    }
    if (!quizId) {
      return Response.json({ error: 'Invalid quiz identifier' }, { status: 400 });
    }

    // Validate the canonical quiz support tuple. Returns false for
    // unknown (courseSlug, moduleSlug) or unknown quizId.
    if (!isQuizSupported(courseSlug, moduleSlug, quizId)) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    const answerKey = getQuizAnswerKey(courseSlug, moduleSlug, quizId);
    if (!answerKey) {
      // Defensive — isQuizSupported returned true but the helper
      // returned null. Treat as not found.
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    // Validate the answer array shape: must be present and exactly
    // the right length.
    if (!answers) {
      return Response.json({ error: 'Missing answers' }, { status: 400 });
    }
    if (answers.length !== answerKey.totalQuestions) {
      return Response.json({ error: 'Wrong answer count' }, { status: 400 });
    }

    const knownQuestionIds = Object.keys(answerKey.items);
    const seenIds = new Set();
    let score = 0;
    const gradedFeedback = [];

    for (const entry of answers) {
      if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
        return Response.json({ error: 'Invalid answer entry' }, { status: 400 });
      }
      // Reject any unexpected per-answer field (e.g. score, isCorrect,
      // correctIndex, learnerId submitted per-question).
      const allowedEntryKeys = new Set(['questionId', 'selectedIndex']);
      for (const k of Object.keys(entry)) {
        if (!allowedEntryKeys.has(k)) {
          return Response.json({ error: 'Unsupported field: ' + k }, { status: 400 });
        }
      }
      const questionId = typeof entry.questionId === 'string' ? entry.questionId : '';
      const selectedIndex = entry.selectedIndex;
      if (!questionId || !knownQuestionIds.includes(questionId)) {
        return Response.json({ error: 'Unknown question: ' + String(entry.questionId) }, { status: 400 });
      }
      if (seenIds.has(questionId)) {
        return Response.json({ error: 'Duplicate question: ' + questionId }, { status: 400 });
      }
      seenIds.add(questionId);
      if (
        typeof selectedIndex !== 'number' ||
        !Number.isInteger(selectedIndex) ||
        selectedIndex < 0
      ) {
        return Response.json({ error: 'Invalid selected option' }, { status: 400 });
      }
      const itemAnswer = answerKey.items[questionId];
      if (selectedIndex >= itemAnswer.optionsCount) {
        return Response.json({ error: 'Invalid selected option' }, { status: 400 });
      }
      const isCorrect = selectedIndex === itemAnswer.correctIndex;
      if (isCorrect) score += 1;
      gradedFeedback.push({
        questionId,
        isCorrect,
        feedback: isCorrect ? itemAnswer.correctFeedback : itemAnswer.incorrectFeedback,
      });
    }

    // Final defensive check: every approved question must have been
    // graded exactly once. (The earlier length check usually catches
    // missing questions, but this guard is independent of it.)
    if (seenIds.size !== answerKey.totalQuestions) {
      return Response.json({ error: 'Missing questions' }, { status: 400 });
    }

    const passed = score >= answerKey.passingThreshold;

    // CONCURRENCY-SAFE ATTEMPT NUMBERING.
    //
    // The prior implementation performed read-then-increment on the
    // QuizAttempt list for (learner, course, module). Two simultaneous
    // submissions (multiple browser tabs, retries, accidental double
    // clicks) could both finish the read before either had committed,
    // causing both to compute and write the same `attempt_number`
    // (observed `attempt_number: 1` for both records during prior
    // parallel validation).
    //
    // The fix is create-then-position, using the platform's
    // server-assigned `created_date` as the canonical monotonic
    // ordering (microsecond-resolution per write, identical for every
    // concurrent reader of the same row set):
    //
    //   1. Create the record with `attempt_number = 0` — a placeholder
    //      that the schema accepts because `attempt_number` is
    //      `integer` + `required` with no minimum constraint, and the
    //      field is not consumed by any UI semantic anywhere in the
    //      app (only this function and the schema reference it; see
    //      the codebase scan in this stage's report).
    //   2. Re-read all of this learner's attempts for the same course
    //      + module in ascending `created_date` order. Every concurrent
    //      reader of the same row set sees the same deterministic order.
    //   3. Compute this record's 1-based position in that order by id.
    //      Each submission only patches ITS OWN record's
    //      `attempt_number` by `created.id`, so concurrent
    //      submissions targeting different record IDs cannot collide.
    //
    // Uniqueness follows from `created_date` being server-assigned and
    // unique per write: every record occupies a distinct position in
    // the sorted list, so each `attempt_number` is distinct within the
    // (learner_id, course_slug, module_slug) set. The browser response
    // continues to expose only { score, totalQuestions, passed,
    // feedback }; attempt_number is never returned to the client.

    // Step 1 — create the record with a placeholder attempt_number.
    // The platform assigns a unique, monotonic created_date here.
    let created = null;
    try {
      created = await base44.asServiceRole.entities.QuizAttempt.create({
        learner_id: user.id,
        course_slug: courseSlug,
        module_slug: moduleSlug,
        attempt_number: 0,
        score,
        total_questions: answerKey.totalQuestions,
        passed,
        submitted_at: new Date().toISOString(),
      });
    } catch (err) {
      console.error(
        '[submitMentalHealthQuiz] QuizAttempt create failed:',
        err && err.message,
      );
      return Response.json(
        { error: 'Could not record attempt. Please retry.' },
        { status: 500 },
      );
    }

    // Step 2 — re-read all of this learner's attempts for the same
    // course + module in ascending created_date order. The explicit
    // learner_id filter narrows the result to the current user's
    // rows regardless of role.
    let orderedAttempts = [];
    try {
      orderedAttempts = await base44.entities.QuizAttempt.filter(
        {
          learner_id: user.id,
          course_slug: courseSlug,
          module_slug: moduleSlug,
        },
        'created_date',
        1000,
      );
    } catch (err) {
      orderedAttempts = [];
    }
    const orderedList = Array.isArray(orderedAttempts) ? orderedAttempts : [];
    const createdId = created && created.id;
    const position = createdId
      ? orderedList.findIndex((r) => r && r.id === createdId) + 1
      : 0;

    // Step 3 — patch this single record's attempt_number to the
    // computed position. Concurrent submissions target different
    // record IDs, so the patches are independent and cannot collide.
    // If the patch fails the record keeps its placeholder (0); the
    // uniqueness guarantee holds as long as such failures are rare.
    if (position > 0) {
      try {
        await base44.asServiceRole.entities.QuizAttempt.update(createdId, {
          attempt_number: position,
        });
      } catch (err) {
        console.error(
          '[submitMentalHealthQuiz] attempt_number patch failed:',
          err && err.message,
        );
      }
    }

    return Response.json({
      score,
      totalQuestions: answerKey.totalQuestions,
      passed,
      feedback: gradedFeedback,
    });
  } catch (error) {
    console.error(
      '[submitMentalHealthQuiz] Unexpected error:',
      error && error.message,
    );
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}