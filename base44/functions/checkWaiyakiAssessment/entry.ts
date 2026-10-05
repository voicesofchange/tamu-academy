import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';
import {
  waiyakiCourseExists,
  getWaiyakiSensitiveAssessment,
  getWaiyakiAssessmentPassRequired,
  WAIYAKI_ASSESSMENT_MODULE_SLUG,
} from '../../shared/waiyaki-config.js';

/**
 * checkWaiyakiAssessment — authenticated endpoint that grades the final
 * assessment of the Waiyaki wa Hinga course.
 *
 * TRUST BOUNDARY:
 *   - Unauthenticated -> 401.
 *   - Unknown course -> 404.
 *   - Non-admins need an active enrollment. Admins may grade a preview run
 *     without a record being written.
 *   - The answer key lives only in base44/shared/waiyaki-curriculum.js and is
 *     never sent to the client. The client submits one selected option index
 *     per question and receives only a pass/fail, the score, and per-question
 *     correctness with an explanation.
 *   - Every question must be answered exactly once; unknown or duplicate
 *     question ids are rejected, and no score is ever taken from the body.
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

    const allowedKeys = new Set(['courseSlug', 'answers']);
    for (const k of Object.keys(body)) {
      if (!allowedKeys.has(k)) {
        return Response.json({ error: 'Unsupported field: ' + k }, { status: 400 });
      }
    }

    const courseSlug = typeof body.courseSlug === 'string' ? body.courseSlug : '';
    if (!courseSlug || !waiyakiCourseExists(courseSlug)) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    const assessment = getWaiyakiSensitiveAssessment();
    const passRequired = getWaiyakiAssessmentPassRequired();

    if (!Array.isArray(body.answers)) {
      return Response.json({ error: 'Invalid answers' }, { status: 400 });
    }

    // Build a strict map of questionId -> selectedIndex.
    const submitted = new Map<string, number>();
    for (const entry of body.answers as unknown[]) {
      if (!entry || typeof entry !== 'object') {
        return Response.json({ error: 'Invalid answers' }, { status: 400 });
      }
      const record = entry as Record<string, unknown>;
      const id = typeof record.questionId === 'string' ? record.questionId : null;
      const selected = record.selectedIndex;
      if (!id || typeof selected !== 'number' || !Number.isInteger(selected)) {
        return Response.json({ error: 'Invalid answers' }, { status: 400 });
      }
      if (submitted.has(id)) {
        return Response.json({ error: 'Invalid answers' }, { status: 400 });
      }
      submitted.set(id, selected);
    }

    const knownIds = new Set(assessment.questions.map((q) => q.id));
    for (const id of submitted.keys()) {
      if (!knownIds.has(id)) {
        return Response.json({ error: 'Invalid answers' }, { status: 400 });
      }
    }
    for (const id of knownIds) {
      if (!submitted.has(id)) {
        return Response.json({ error: 'Incomplete answers' }, { status: 400 });
      }
    }

    // Grade server-side against the protected key.
    let score = 0;
    const results = assessment.questions.map((question) => {
      const selected = submitted.get(question.id)!;
      const validIndex = selected >= 0 && selected < question.options.length;
      const correct = validIndex && selected === question.correctIndex;
      if (correct) score += 1;
      return {
        questionId: question.id,
        correct,
        correctIndex: question.correctIndex,
        explanation: question.explanation,
      };
    });

    const passed = score >= passRequired;
    const totalQuestions = assessment.questions.length;

    // Admin preview — grade and report, write nothing.
    if (isAdmin) {
      return Response.json({
        passed,
        score,
        totalQuestions,
        passRequired,
        results,
        progressSaved: false,
      });
    }

    const enrollmentRows = await base44.asServiceRole.entities.CourseEnrollment.filter({
      learner_id: user.id,
      course_slug: courseSlug,
      status: { $in: ['active', 'completed'] },
    });
    if (!enrollmentRows || enrollmentRows.length === 0) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const now = new Date().toISOString();

    try {
      await base44.asServiceRole.entities.QuizAttempt.create({
        learner_id: user.id,
        course_slug: courseSlug,
        module_slug: WAIYAKI_ASSESSMENT_MODULE_SLUG,
        score,
        total_questions: totalQuestions,
        passed,
        submitted_at: now,
      });
    } catch (err) {
      console.error('[checkWaiyakiAssessment] Failed to record attempt:', err && err.message);
      return Response.json({ error: 'Internal error' }, { status: 500 });
    }

    try {
      await base44.analytics.track({
        eventName: 'assessment_submitted',
        properties: { course_slug: courseSlug, passed },
      });
    } catch (err) {
      console.warn('[checkWaiyakiAssessment] analytics.track failed:', err && err.message);
    }

    return Response.json({
      passed,
      score,
      totalQuestions,
      passRequired,
      results,
      progressSaved: true,
    });
  } catch (error) {
    console.error('[checkWaiyakiAssessment] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}