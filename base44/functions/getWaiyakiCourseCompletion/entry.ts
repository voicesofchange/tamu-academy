import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';
import {
  waiyakiCourseExists,
  getWaiyakiModuleConfig,
  WAIYAKI_MODULE_ROUTES,
  WAIYAKI_ASSESSMENT_MODULE_SLUG,
  getWaiyakiAssessmentPassRequired,
  getWaiyakiProjectOption,
  deriveWaiyakiCompletedKeys,
  isWaiyakiCoursePublished,
} from '../../shared/waiyaki-config.js';

/**
 * getWaiyakiCourseCompletion — authenticated, non-mutating endpoint that
 * reports how far the current learner has progressed through the Waiyaki wa
 * Hinga course.
 *
 * SCOPE:
 *   - Reads only the current authenticated user's records.
 *   - Creates NO record and performs NO update.
 *   - Returns per-module completion with the learner's satisfied keys, the
 *     two course-level requirements (final assessment passed, written
 *     project submitted), overall completion and certificate eligibility.
 *
 * TRUST BOUNDARY:
 *   - Unauthenticated -> 401.
 *   - Unknown course -> 404.
 *   - Completion is determined exclusively from server-side records; no
 *     browser-supplied value influences it.
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

    const courseSlug = typeof body.courseSlug === 'string' ? body.courseSlug.trim() : '';
    if (!courseSlug || !waiyakiCourseExists(courseSlug)) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    const enrollmentRows = await base44.asServiceRole.entities.CourseEnrollment.filter({
      learner_id: user.id,
      course_slug: courseSlug,
      status: { $in: ['active', 'completed'] },
    });
    const hasEnrollment = !!(enrollmentRows && enrollmentRows.length > 0);
    const enrollmentStatus = hasEnrollment ? enrollmentRows[0].status : null;

    const progressRows = await base44.asServiceRole.entities.ModuleProgress.filter({
      learner_id: user.id,
      course_slug: courseSlug,
    });

    const progressMap: Record<string, Record<string, unknown>> = {};
    if (Array.isArray(progressRows)) {
      for (const row of progressRows) {
        if (row && row.module_slug) progressMap[row.module_slug] = row;
      }
    }

    const modules = WAIYAKI_MODULE_ROUTES.map((route) => {
      const config = getWaiyakiModuleConfig(courseSlug, route);
      const row = progressMap[route] || null;
      const completedKeys = deriveWaiyakiCompletedKeys(row);
      return {
        route,
        number: config ? config.number : route,
        title: config ? config.title : route,
        completed: !!(row && row.status === 'completed' && row.completed_at),
        completedAt: row ? row.completed_at || null : null,
        completedKeys,
      };
    });

    const completedCount = modules.filter((m) => m.completed).length;
    const totalModules = modules.length;
    const modulesComplete = completedCount === totalModules;
    const incompleteModules = modules
      .filter((m) => !m.completed)
      .map((m) => ({ route: m.route, number: m.number, title: m.title }));

    const passRequired = getWaiyakiAssessmentPassRequired();

    const attempts = await base44.asServiceRole.entities.QuizAttempt.filter({
      learner_id: user.id,
      course_slug: courseSlug,
      module_slug: WAIYAKI_ASSESSMENT_MODULE_SLUG,
    });
    const attemptList = Array.isArray(attempts) ? attempts : [];
    const passedAttempts = attemptList.filter((row) => row && row.passed === true);
    const bestAttempt = attemptList.reduce((best, row) => {
      if (!row) return best;
      if (!best || (row.score || 0) > (best.score || 0)) return row;
      return best;
    }, null);
    const assessmentPassed = passedAttempts.length > 0;

    const projects = await base44.asServiceRole.entities.WaiyakiProject.filter({
      learner_id: user.id,
      course_slug: courseSlug,
    });
    const projectRow =
      Array.isArray(projects) && projects.length > 0 ? projects[0] : null;
    const projectSubmitted = !!(
      projectRow &&
      typeof projectRow.content === 'string' &&
      projectRow.content.trim().length > 0
    );
    const projectOption = projectRow
      ? getWaiyakiProjectOption(projectRow.project_format)
      : null;

    const requirements = [
      {
        kind: 'assessment',
        route: null,
        label: 'Final assessment \u2014 at least four of five answers correct',
        met: assessmentPassed,
      },
      {
        kind: 'project',
        route: null,
        label: 'Written final project submitted',
        met: projectSubmitted,
      },
    ];
    const requirementsComplete = requirements.every((r) => r.met);

    const courseCompleted = modulesComplete && requirementsComplete;
    const certificateEligible = courseCompleted && hasEnrollment;

    return Response.json({
      courseSlug,
      hasEnrollment,
      enrollmentStatus,
      modules,
      completedCount,
      totalModules,
      modulesComplete,
      incompleteModules,
      requirements,
      requirementsComplete,
      courseCompleted,
      certificateEligible,
      isPublished: isWaiyakiCoursePublished(courseSlug),
      assessment: {
        passed: assessmentPassed,
        passRequired,
        totalQuestions: 5,
        bestScore: bestAttempt ? bestAttempt.score || 0 : null,
        attempts: attemptList.length,
      },
      project: {
        submitted: projectSubmitted,
        format: projectRow ? projectRow.project_format : null,
        formatTitle: projectOption ? projectOption.title : null,
        title: projectRow ? projectRow.title || '' : '',
        wordCount: projectRow && projectRow.word_count ? projectRow.word_count : 0,
      },
    });
  } catch (error) {
    console.error('[getWaiyakiCourseCompletion] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}