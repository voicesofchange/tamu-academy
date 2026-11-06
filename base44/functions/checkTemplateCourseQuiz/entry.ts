import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';
import {
  checkTemplateModuleAccess,
  findProgressRow,
  templateModuleContent,
} from '../../shared/course-template-service.js';

/**
 * checkTemplateCourseQuiz — the server-side grader for a template course
 * module's knowledge check.
 *
 * The browser sends only { courseSlug, moduleSlug, answers: [{ questionId,
 * selectedIndex }] }. Every answer key and every outcome stays on the server.
 *
 * GUARANTEES:
 *   - learnerId, score, passed, correctIndex, status and completed_at are
 *     refused with 400; only questionId and selectedIndex are accepted.
 *   - Every question must be answered exactly once, with a valid option index.
 *   - correctIndex never appears in the response. The correct option's TEXT is
 *     released only after a complete, valid submission.
 *   - Learners need a published module, an enrollment and a completed
 *     prerequisite. An admin records progress only while enrolled and published.
 *   - A pass sets quiz_passed (never unsets it) and knowledge_check_completed_at.
 */
export default async function (req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);

    const user = await base44.auth.me().catch(() => null);
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    let body: Record<string, unknown> = {};
    try {
      body = await req.json();
    } catch (_) {
      body = {};
    }

    const allowedTopKeys = new Set(['courseSlug', 'moduleSlug', 'answers']);
    for (const key of Object.keys(body || {})) {
      if (!allowedTopKeys.has(key)) {
        return Response.json({ error: 'Unsupported field: ' + key }, { status: 400 });
      }
    }

    const courseSlug = typeof body.courseSlug === 'string' ? body.courseSlug.trim() : '';
    const moduleSlug = typeof body.moduleSlug === 'string' ? body.moduleSlug.trim() : '';
    const answers = Array.isArray(body.answers) ? (body.answers as Array<Record<string, unknown>>) : null;

    const access = await checkTemplateModuleAccess(base44, user, {
      courseSlug,
      moduleRoute: moduleSlug,
      adminPreview: false,
    });
    if (!access.ok) return Response.json(access.body, { status: access.status });

    const moduleContent = templateModuleContent(courseSlug, moduleSlug);
    const quiz = moduleContent && moduleContent.quiz;
    if (!quiz || !Array.isArray(quiz.questions) || quiz.questions.length === 0) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    const questions = quiz.questions as Array<Record<string, unknown>>;
    const totalQuestions = questions.length;
    const passingScore = quiz.passingScore;

    if (!answers) return Response.json({ error: 'Missing answers' }, { status: 400 });
    if (answers.length !== totalQuestions) {
      return Response.json({ error: 'Wrong answer count' }, { status: 400 });
    }

    const knownIds = new Set(questions.map((question) => question.id));
    const seenIds = new Set<unknown>();
    let score = 0;
    const feedback: Array<Record<string, unknown>> = [];

    for (const entry of answers) {
      if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
        return Response.json({ error: 'Invalid answer entry' }, { status: 400 });
      }
      const allowedEntryKeys = new Set(['questionId', 'selectedIndex']);
      for (const key of Object.keys(entry)) {
        if (!allowedEntryKeys.has(key)) {
          return Response.json({ error: 'Unsupported field: ' + key }, { status: 400 });
        }
      }

      const questionId = entry.questionId;
      if (typeof questionId === 'undefined' || !knownIds.has(questionId)) {
        return Response.json({ error: 'Unknown question: ' + String(questionId) }, { status: 400 });
      }
      if (seenIds.has(questionId)) {
        return Response.json({ error: 'Duplicate question: ' + String(questionId) }, { status: 400 });
      }
      seenIds.add(questionId);

      const question = questions.find((item) => item.id === questionId) as Record<string, unknown>;
      const selectedIndex = entry.selectedIndex;
      if (typeof selectedIndex !== 'number' || !Number.isInteger(selectedIndex) || selectedIndex < 0) {
        return Response.json({ error: 'Invalid selected option' }, { status: 400 });
      }
      const options = Array.isArray(question.options) ? question.options : [];
      if (selectedIndex >= options.length) {
        return Response.json({ error: 'Invalid selected option' }, { status: 400 });
      }

      const correctIndex = question.correctIndex as number;
      const isCorrect = selectedIndex === correctIndex;
      if (isCorrect) score += 1;
      feedback.push({
        questionId,
        isCorrect,
        feedback: question.feedback,
        correctAnswerText: options[correctIndex],
      });
    }

    if (seenIds.size !== totalQuestions) {
      return Response.json({ error: 'Missing questions' }, { status: 400 });
    }

    const passed = score >= passingScore;
    const canRecordProgress = access.canRecordProgress;

    if (canRecordProgress) {
      const now = new Date().toISOString();
      const row = await findProgressRow(base44, user.id, courseSlug, moduleSlug);
      if (!row) {
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
        if (passed && !row.quiz_passed) patch.quiz_passed = true;
        await base44.asServiceRole.entities.ModuleProgress.update(row.id, patch);
      }
    }

    return Response.json({
      score,
      totalQuestions,
      passingScore,
      passed,
      feedback,
      progressSaved: canRecordProgress,
    });
  } catch (error) {
    console.error('[checkTemplateCourseQuiz] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}