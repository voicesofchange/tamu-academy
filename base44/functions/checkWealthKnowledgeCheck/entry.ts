import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import {
  WEALTH_COURSE_SLUG,
  WEALTH_MODULE_ROUTES,
  getWealthModulePrerequisite,
  isWealthModulePublished,
} from '../../shared/building-wealth-together-config.js';
import { getWealthModuleContent } from '../../shared/building-wealth-together-curriculum.js';

/**
 * Access-checked, server-side grader for the Building Wealth Together module
 * concept checks. Grades each module's three-question quiz against the
 * protected answer key in
 * base44/shared/building-wealth-together-curriculum.js.
 *
 * Every concept-check question is a single-answer multiple-choice question.
 * score counts the correct answers; passed is score >= quiz.passingScore.
 * All three questions must be answered before submission.
 *
 * PRIVACY / NON-EXFILTRATION:
 *   - Never accepts learnerId, userId, score, passed, feedback, correctIndex,
 *     correctAnswer, quizId, status, or completed_at from the browser — any
 *     such field is rejected with 400.
 *   - Per-answer entry fields are limited to questionId and selectedIndex.
 *   - correctIndex never appears in the response. The correct answer TEXT is
 *     released only after a complete valid submission.
 *
 * RESPONSE SHAPE:
 *   { score, totalQuestions, passingScore, passed,
 *     feedback: [{ questionId, isCorrect, feedback, correctAnswerText }],
 *     progressSaved }
 *
 * For eligible learners (published module + active enrollment + met
 * prerequisite), records knowledge_check_completed_at and upgrades
 * quiz_passed to true on the ModuleProgress row (never downgrades).
 */
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

    const allowedTopKeys = new Set(['courseSlug', 'moduleSlug', 'answers']);
    for (const k of Object.keys(body)) {
      if (!allowedTopKeys.has(k)) {
        return Response.json({ error: 'Unsupported field: ' + k }, { status: 400 });
      }
    }

    const courseSlug = typeof body.courseSlug === 'string' ? body.courseSlug : '';
    const moduleSlug = typeof body.moduleSlug === 'string' ? body.moduleSlug : '';
    const answers = Array.isArray(body.answers) ? body.answers : null;

    if (courseSlug !== WEALTH_COURSE_SLUG) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }
    if (!moduleSlug || !WEALTH_MODULE_ROUTES.includes(moduleSlug)) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    const moduleContent = getWealthModuleContent(courseSlug, moduleSlug);
    const knowledgeCheck = moduleContent && moduleContent.quiz;
    if (!knowledgeCheck || !Array.isArray(knowledgeCheck.questions)) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    const questions = knowledgeCheck.questions as Array<Record<string, unknown>>;
    const totalQuestions = questions.length;
    const passingScore = knowledgeCheck.passingScore;

    if (!answers) {
      return Response.json({ error: 'Missing answers' }, { status: 400 });
    }
    if (answers.length !== totalQuestions) {
      return Response.json({ error: 'Wrong answer count' }, { status: 400 });
    }

    const isPublished = isWealthModulePublished(courseSlug, moduleSlug);
    const enrollmentRows = await base44.asServiceRole.entities.CourseEnrollment.filter({
      learner_id: user.id,
      course_slug: courseSlug,
      status: 'active',
    });
    const hasEnrollment = !!(enrollmentRows && enrollmentRows.length > 0);

    let canRecordProgress = false;
    if (isAdmin) {
      canRecordProgress = isPublished && hasEnrollment;
    } else {
      if (!hasEnrollment) {
        return Response.json({ error: 'Forbidden' }, { status: 403 });
      }
      if (!isPublished) {
        return Response.json({ error: 'Forbidden' }, { status: 403 });
      }
      const prereqRoute = getWealthModulePrerequisite(courseSlug, moduleSlug);
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

    const knownIds = new Set(questions.map((q) => q.id));
    const seenIds = new Set<unknown>();
    let score = 0;
    const gradedFeedback: Array<Record<string, unknown>> = [];

    for (const entry of answers) {
      if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
        return Response.json({ error: 'Invalid answer entry' }, { status: 400 });
      }
      const allowedEntryKeys = new Set(['questionId', 'selectedIndex']);
      for (const k of Object.keys(entry as Record<string, unknown>)) {
        if (!allowedEntryKeys.has(k)) {
          return Response.json({ error: 'Unsupported field: ' + k }, { status: 400 });
        }
      }
      const e = entry as Record<string, unknown>;
      const questionId = e.questionId;
      if (typeof questionId === 'undefined' || !knownIds.has(questionId)) {
        return Response.json({ error: 'Unknown question: ' + String(questionId) }, { status: 400 });
      }
      if (seenIds.has(questionId)) {
        return Response.json({ error: 'Duplicate question: ' + String(questionId) }, { status: 400 });
      }
      seenIds.add(questionId);

      const question = questions.find((q) => q.id === questionId) as Record<string, unknown>;
      const selectedIndex = e.selectedIndex;
      if (typeof selectedIndex !== 'number' || !Number.isInteger(selectedIndex) || selectedIndex < 0) {
        return Response.json({ error: 'Invalid selected option' }, { status: 400 });
      }
      if (!Array.isArray(question.options) || selectedIndex >= (question.options as unknown[]).length) {
        return Response.json({ error: 'Invalid selected option' }, { status: 400 });
      }

      const correctAnswerIndex = question.correctIndex as number;
      const isCorrect = selectedIndex === correctAnswerIndex;
      if (isCorrect) score += 1;
      gradedFeedback.push({
        questionId,
        isCorrect,
        feedback: question.feedback,
        correctAnswerText: (question.options as unknown[])[correctAnswerIndex],
      });
    }

    if (seenIds.size !== totalQuestions) {
      return Response.json({ error: 'Missing questions' }, { status: 400 });
    }

    const passed = score >= passingScore;

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
    console.error('[checkWealthKnowledgeCheck] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}