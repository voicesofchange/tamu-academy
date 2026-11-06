import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';
import { translateCourseSections } from '../../shared/course-translation.js';
import {
  TEMPLATE_TRANSLATED_SECTIONS,
  checkTemplateModuleAccess,
  completedSteps,
  courseOutlineFor,
  findProgressRow,
  outstandingSteps,
  templateModuleContent,
  templateModuleRequirements,
  withoutAnswerKey,
} from '../../shared/course-template-service.js';
import { recordModuleOpened } from '../../shared/module-open-tracking.js';

/**
 * getTemplateCourseModule — the single module endpoint for every course built
 * with the course template.
 *
 * Returns the module, the course outline (with each module's state for this
 * learner) and this learner's progress through the module, so the page needs
 * one request.
 *
 * TRUST BOUNDARY:
 *   - Unauthenticated -> 401; unknown course or module -> 404.
 *   - Learners need a published module, an enrollment and a completed
 *     prerequisite (checkTemplateModuleAccess).
 *   - Administrators may read any module for review.
 *   - The quiz answer key is stripped before translation and before the
 *     payload leaves the server; grading happens in checkTemplateCourseQuiz.
 *   - The module is translated into the learner's language by the shared
 *     course-translation layer, cached per string.
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

    const allowedKeys = new Set(['courseSlug', 'moduleRoute', 'language']);
    for (const key of Object.keys(body || {})) {
      if (!allowedKeys.has(key)) {
        return Response.json({ error: 'Unsupported field: ' + key }, { status: 400 });
      }
    }

    const courseSlug = typeof body.courseSlug === 'string' ? body.courseSlug.trim() : '';
    const moduleRoute = typeof body.moduleRoute === 'string' ? body.moduleRoute.trim() : '';
    const language = typeof body.language === 'string' ? body.language : 'en';

    const access = await checkTemplateModuleAccess(base44, user, {
      courseSlug,
      moduleRoute,
      adminPreview: true,
    });
    if (!access.ok) return Response.json(access.body, { status: access.status });

    const rawContent = templateModuleContent(courseSlug, moduleRoute);
    if (!rawContent) return Response.json({ error: 'Not found' }, { status: 404 });

    const requirements = templateModuleRequirements(courseSlug, moduleRoute);
    const translated = await translateCourseSections(
      base44,
      withoutAnswerKey(rawContent),
      language,
      TEMPLATE_TRANSLATED_SECTIONS,
      { courseSlug, moduleSlug: moduleRoute, moduleTitle: rawContent.title },
    );

    const row = await findProgressRow(base44, user.id, courseSlug, moduleRoute);
    const done = completedSteps(row, requirements);

    // Record the learner's first open of this module, apart from completion.
    // Administrators previewing content are not learners, so their opens are
    // not recorded.
    if (user.role !== 'admin') {
      await recordModuleOpened(base44, {
        learnerId: user.id,
        courseSlug,
        moduleSlug: moduleRoute,
      });
    }

    return Response.json({
      course: await courseOutlineFor(base44, user.id, courseSlug),
      module: {
        ...translated,
        route: moduleRoute,
        number: access.moduleMeta.number,
        requirements,
        progress: {
          status: row ? row.status : 'not_started',
          completed: !!(row && row.status === 'completed' && row.completed_at),
          completedSteps: done,
          outstandingSteps: outstandingSteps(row, requirements),
          canRecordProgress: access.canRecordProgress,
        },
      },
    });
  } catch (error) {
    console.error('[getTemplateCourseModule] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}