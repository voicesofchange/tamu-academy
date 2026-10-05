import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';
import {
  waiyakiCourseExists,
  getWaiyakiSensitiveAssessment,
  getWaiyakiAssessmentPassRequired,
  getWaiyakiProjectOptions,
  getWaiyakiProjectOption,
  WAIYAKI_ASSESSMENT_MODULE_SLUG,
} from '../../shared/waiyaki-config.js';

/**
 * getWaiyakiAssessment — access-gated endpoint that returns the final
 * assessment questions WITHOUT their answer key, the four final-project
 * options, and the learner's own current work (their best attempt and their
 * saved project) so the completion page can render in one request.
 *
 * TRUST BOUNDARY:
 *   - Unauthenticated -> 401.
 *   - Unknown course -> 404.
 *   - Non-admins need an active or completed enrollment.
 *   - `correctIndex` is stripped from every question before the response.
 *     The frontend grades through checkWaiyakiAssessment and never receives
 *     the key.
 *   - Only the current authenticated learner's own attempt and project are
 *     ever returned.
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

    const allowedKeys = new Set(['courseSlug']);
    for (const k of Object.keys(body)) {
      if (!allowedKeys.has(k)) {
        return Response.json({ error: 'Unsupported field: ' + k }, { status: 400 });
      }
    }

    const courseSlug = typeof body.courseSlug === 'string' ? body.courseSlug : '';
    if (!courseSlug || !waiyakiCourseExists(courseSlug)) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    if (!isAdmin) {
      const enrollmentRows = await base44.asServiceRole.entities.CourseEnrollment.filter({
        learner_id: user.id,
        course_slug: courseSlug,
        status: { $in: ['active', 'completed'] },
      });
      if (!enrollmentRows || enrollmentRows.length === 0) {
        return Response.json({ error: 'Forbidden' }, { status: 403 });
      }
    }

    const source = getWaiyakiSensitiveAssessment();
    const assessment = {
      heading: source.heading,
      intro: source.intro,
      questions: source.questions.map((question) => ({
        id: question.id,
        prompt: question.prompt,
        options: [...question.options],
      })),
    };

    const passRequired = getWaiyakiAssessmentPassRequired();
    const projectOptions = getWaiyakiProjectOptions();

    // The learner's own work, so the page can show what is already done.
    let attempt = null;
    let project = null;

    if (!isAdmin) {
      const attempts = await base44.asServiceRole.entities.QuizAttempt.filter({
        learner_id: user.id,
        course_slug: courseSlug,
        module_slug: WAIYAKI_ASSESSMENT_MODULE_SLUG,
      });
      const attemptList = Array.isArray(attempts) ? attempts : [];
      const best = attemptList.reduce((acc, row) => {
        if (!row) return acc;
        if (!acc || (row.score || 0) > (acc.score || 0)) return row;
        return acc;
      }, null);
      const passed = attemptList.some((row) => row && row.passed === true);
      attempt = {
        attempts: attemptList.length,
        passed,
        bestScore: best ? best.score || 0 : null,
      };

      const projects = await base44.asServiceRole.entities.WaiyakiProject.filter({
        learner_id: user.id,
        course_slug: courseSlug,
      });
      const row = Array.isArray(projects) && projects.length > 0 ? projects[0] : null;
      if (row) {
        const option = getWaiyakiProjectOption(row.project_format);
        project = {
          format: row.project_format,
          formatTitle: option ? option.title : null,
          title: row.title || '',
          content: row.content || '',
          wordCount: row.word_count || 0,
          submittedAt: row.submitted_at || null,
        };
      }
    }

    return Response.json({
      assessment,
      projectOptions,
      passRequired,
      attempt,
      project,
    });
  } catch (error) {
    console.error('[getWaiyakiAssessment] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}