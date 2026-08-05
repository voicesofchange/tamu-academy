import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import {
  MENTAL_HEALTH_MODULE_2_LESSON,
  MENTAL_HEALTH_MODULE_3_LESSON,
  MENTAL_HEALTH_MODULE_4_LESSON,
  MENTAL_HEALTH_MODULE_5_LESSON,
  MENTAL_HEALTH_MODULE_6_LESSON,
  MENTAL_HEALTH_MODULE_7_LESSON,
  courseExists,
  getModulePrerequisite,
  isModulePublished,
  MENTAL_HEALTH_COURSE_SLUG,
} from '../../shared/mental-health-curriculum.js';

/**
 * Role-gated, NON-RECORDING endpoint that grades the Module 2
 * "Mental Health, Community and Culture" knowledge check.
 *
 * SCOPE (Stage 7 of Module 2 — knowledge check only):
 *   - Grades the five-question Module 2 knowledge check entirely on
 *     the server against the protected
 *     MENTAL_HEALTH_MODULE_2_LESSON.knowledgeCheck answer key.
 *   - Returns per-question feedback (isCorrect + the approved
 *     feedback string) plus score, passing score, and pass status,
 *     ONLY after a valid submission.
 *   - Creates NO QuizAttempt, ModuleProgress, or CourseEnrollment
 *     record. This is the deliberate Stage 7 distinction from the
 *     Module 1 `submitMentalHealthQuiz` grader, which records a
 *     QuizAttempt. Module 2's knowledge check is ungraded for
 *     completion: it triggers no module completion, certificate,
 *     payment, enrollment, or analytics event.
 *
 * TRUST BOUNDARY (mirrors getMentalHealthModule /
 * checkMentalHealthScenario — do not relax):
 *   - Unauthenticated public visitor → 403 Forbidden.
 *   - Non-admin authenticated user without active enrollment,
 *     unpublished module, or unmet prerequisite → 403 Forbidden.
 *     Non-admins with all conditions met receive the graded response
 *     with progressSaved: true.
 *   - Admin users always receive the graded response for preview.
 *     Progress is saved only when the module is published and the
 *     admin has active enrollment; otherwise progressSaved: false.
 *   - 400 for malformed/missing answers, unknown question IDs,
 *     duplicate question IDs, invalid option indices, wrong answer
 *     count, or any unexpected / protected body field.
 *   - 404 for unknown (courseSlug, moduleSlug) pairs.
 *
 * PRIVACY / NON-EXFILTRATION:
 *   - Never accepts a `learnerId`, `userId`, `score`, `passed`,
 *     `feedback`, `correctIndex`, `correctAnswer`, `quizId`,
 *     `status`, or `completed_at` field from the browser — any such
 *     field is rejected with 400 Unsupported field.
 *   - Per-answer entry fields are limited to `questionId` and
 *     `selectedIndex`. Any other per-answer field is rejected.
 *   - Grades against the protected server-side
 *     MENTAL_HEALTH_MODULE_2_LESSON.knowledgeCheck answer key only.
 *     correctAnswerIndex never appears in the response. The
 *     per-question feedback returned is the approved learner-facing
 *     `feedback` string for the question (released regardless of
 *     correct/incorrect, per the Stage 7 spec), never the raw
 *     answer-key object. The passing score is read from the
 *     protected knowledgeCheck object and returned as
 *     `passingScore`; it is not duplicated as a separate grading
 *     rule.
 *
 * RESPONSE SHAPE (minimal — never serializes the full curriculum):
 *   {
 *     score: <integer 0..totalQuestions>,
 *     totalQuestions: <integer>,
 *     passingScore: <integer>,
 *     passed: <boolean>,
 *     feedback: [{ questionId: string, isCorrect: boolean, feedback: string, correctAnswerText: string }]
 *   }
 *
 *   correctAnswerText is the text of the correct option (not its index),
 *   released only after a complete valid submission. The underlying
 *   correctAnswerIndex and complete answer map never leave the server.
 */
export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);

    // Server-side role gate. base44.auth.me() throws on a public app
    // when no session token is present, so guard it and treat any
    // failure, null user, or non-admin role as forbidden during Stage 7.
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

    // Reject any browser-supplied protected / unexpected top-level field.
    const allowedTopKeys = new Set(['courseSlug', 'moduleSlug', 'answers']);
    for (const k of Object.keys(body)) {
      if (!allowedTopKeys.has(k)) {
        return Response.json({ error: 'Unsupported field: ' + k }, { status: 400 });
      }
    }

    const courseSlug =
      typeof body.courseSlug === 'string' ? body.courseSlug : '';
    const moduleSlug =
      typeof body.moduleSlug === 'string' ? body.moduleSlug : '';
    const answers = Array.isArray(body.answers) ? body.answers : null;

    if (!courseSlug) {
      return Response.json({ error: 'Invalid course slug' }, { status: 400 });
    }
    if (!moduleSlug) {
      return Response.json({ error: 'Invalid module slug' }, { status: 400 });
    }

    // This grader supports Module 2 and Module 3. Module 1 uses the
    // recording submitMentalHealthQuiz grader.
    if (!courseExists(courseSlug) || (moduleSlug !== 'module-2' && moduleSlug !== 'module-3' && moduleSlug !== 'module-4' && moduleSlug !== 'module-5' && moduleSlug !== 'module-6' && moduleSlug !== 'module-7')) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    // Determine eligibility for progress recording. Progress is saved
    // only when Module 2 is published AND the current user has active
    // enrollment, regardless of role. Administrator status must not
    // bypass either saving condition. Admins always receive the
    // educational grading response for preview; when previewing
    // without eligibility, progressSaved is false and no ModuleProgress
    // record is created or updated. Non-admins without eligibility
    // receive 403.
    let canRecordProgress = false;
    const isPublished = isModulePublished(courseSlug, moduleSlug);
    const enrollmentRows = await base44.asServiceRole.entities.CourseEnrollment.filter({
      learner_id: user.id,
      course_slug: courseSlug,
      status: 'active',
    });
    const hasEnrollment = !!(enrollmentRows && enrollmentRows.length > 0);

    if (isAdmin) {
      // Admins always get the educational response (preview). Progress
      // is saved only when both conditions are met.
      canRecordProgress = isPublished && hasEnrollment;
    } else {
      // Non-admins: 403 if no enrollment, no publication, or no prereq.
      if (!hasEnrollment) {
        return Response.json({ error: 'Forbidden' }, { status: 403 });
      }
      if (!isPublished) {
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

    const knowledgeCheck = moduleSlug === 'module-3'
      ? MENTAL_HEALTH_MODULE_3_LESSON.knowledgeCheck
      : moduleSlug === 'module-4'
      ? MENTAL_HEALTH_MODULE_4_LESSON.knowledgeCheck
      : moduleSlug === 'module-5'
      ? MENTAL_HEALTH_MODULE_5_LESSON.knowledgeCheck
      : moduleSlug === 'module-6'
      ? MENTAL_HEALTH_MODULE_6_LESSON.knowledgeCheck
      : moduleSlug === 'module-7'
      ? MENTAL_HEALTH_MODULE_7_LESSON.knowledgeCheck
      : MENTAL_HEALTH_MODULE_2_LESSON.knowledgeCheck;
    if (!knowledgeCheck || !Array.isArray(knowledgeCheck.questions)) {
      // Defensive — no knowledge check configured.
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    const totalQuestions = knowledgeCheck.questions.length;
    const passingScore = knowledgeCheck.passingScore;

    // Validate the answer array shape: must be present and exactly the
    // right length (every question must be answered before submission).
    if (!answers) {
      return Response.json({ error: 'Missing answers' }, { status: 400 });
    }
    if (answers.length !== totalQuestions) {
      return Response.json({ error: 'Wrong answer count' }, { status: 400 });
    }

    const knownIds = new Set(knowledgeCheck.questions.map((q) => q.id));
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
      if (!questionId || !knownIds.has(questionId)) {
        return Response.json({ error: 'Unknown question: ' + String(entry.questionId) }, { status: 400 });
      }
      if (seenIds.has(questionId)) {
        return Response.json({ error: 'Duplicate question: ' + questionId }, { status: 400 });
      }
      seenIds.add(questionId);
      const question = knowledgeCheck.questions.find((q) => q.id === questionId);
      if (
        typeof selectedIndex !== 'number' ||
        !Number.isInteger(selectedIndex) ||
        selectedIndex < 0
      ) {
        return Response.json({ error: 'Invalid selected option' }, { status: 400 });
      }
      if (!Array.isArray(question.options) || selectedIndex >= question.options.length) {
        return Response.json({ error: 'Invalid selected option' }, { status: 400 });
      }
      const isCorrect = selectedIndex === question.correctAnswerIndex;
      if (isCorrect) score += 1;
      const gradedEntry: { questionId: string; isCorrect: boolean; feedback: string; correctAnswerText?: string } = {
        questionId,
        isCorrect,
        feedback: question.feedback,
      };
      // Module 5 and Module 6: release the correct answer text (not the
      // index) after a complete valid submission. Modules 2 through 4
      // retain their previous response behavior (questionId, isCorrect,
      // feedback only) — no correctAnswerText is sent to those clients.
      if (moduleSlug === 'module-5' || moduleSlug === 'module-6' || moduleSlug === 'module-7') {
        gradedEntry.correctAnswerText = question.options[question.correctAnswerIndex];
      }
      gradedFeedback.push(gradedEntry);
    }

    // Final defensive check: every approved question must have been
    // graded exactly once.
    if (seenIds.size !== totalQuestions) {
      return Response.json({ error: 'Missing questions' }, { status: 400 });
    }

    const passed = score >= passingScore;

    // Stage 12: For an eligible learner (non-admin with active
    // enrollment + published module + completed prerequisite), record
    // knowledge check completion. Set knowledge_check_completed_at
    // after every valid submission. Set quiz_passed to true only when
    // the learner passes (score >= passingScore); a prior pass is
    // never downgraded to false by a later failed attempt. No
    // selections, answers, feedback, scores, or attempt details are
    // stored. No QuizAttempt or CourseEnrollment record is created.
    // For admins previewing without eligibility (unpublished module
    // or no active enrollment): no ModuleProgress record is created
    // or updated; progressSaved is false. For admins with both
    // conditions met, progress is saved.
    if (canRecordProgress) {
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
          knowledge_check_completed_at: now,
          quiz_passed: passed,
          updated_at: now,
        });
      } else {
        const patch: Record<string, string | boolean> = {
          updated_at: now,
          knowledge_check_completed_at: now,
        };
        // Only upgrade quiz_passed to true; never downgrade.
        if (passed && !progressRow.quiz_passed) {
          patch.quiz_passed = true;
        }
        await base44.asServiceRole.entities.ModuleProgress.update(progressRow.id, patch);
      }
    }

    return Response.json({
      score,
      totalQuestions,
      passingScore,
      passed,
      feedback: gradedFeedback,
      progressSaved: canRecordProgress,
    });
  } catch (error) {
    console.error(
      '[checkMentalHealthKnowledgeCheck] Unexpected error:',
      error && error.message,
    );
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}