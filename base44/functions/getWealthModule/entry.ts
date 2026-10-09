import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import {
  WEALTH_COURSE_SLUG,
  getWealthModuleConfig,
  getWealthModulePrerequisite,
  isWealthModulePublished,
} from '../../shared/building-wealth-together-config.js';
import { getWealthModuleContent } from '../../shared/building-wealth-together-curriculum.js';

/**
 * Access-checked endpoint that returns the full module content for one
 * (courseSlug, moduleRoute) pair of the Building Wealth Together course.
 *
 * The content — lesson text, worked example, "Try it" activity, the local
 * prompt, the dilemma, the concept-check questions and answer key, and the
 * reflection prompt — lives in
 * base44/shared/building-wealth-together-curriculum.js, which is imported
 * ONLY by this server-side function and is never bundled into the public
 * client JavaScript.
 *
 * TRUST BOUNDARY:
 *   - Unauthenticated -> 401.
 *   - Unknown course or module -> 404.
 *   - Non-admin learner: the module must be published, the learner must hold
 *     an active enrollment for the course, and the prerequisite module must
 *     be completed. Otherwise 403, which the page shows as a locked state.
 *   - Admin preview: an administrator may read any module of the course
 *     without enrollment, so the academy team can review it. No progress is
 *     written by this function.
 *   - The concept-check answer key (correctIndex) is stripped before the
 *     payload leaves the server. Grading happens in checkWealthKnowledgeCheck.
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

    const allowedKeys = new Set(['courseSlug', 'moduleRoute']);
    for (const k of Object.keys(body)) {
      if (!allowedKeys.has(k)) {
        return Response.json({ error: 'Unsupported field: ' + k }, { status: 400 });
      }
    }

    const courseSlug = typeof body.courseSlug === 'string' ? body.courseSlug : '';
    const moduleRoute = typeof body.moduleRoute === 'string' ? body.moduleRoute : '';
    if (courseSlug !== WEALTH_COURSE_SLUG || !moduleRoute) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    const moduleConfig = getWealthModuleConfig(courseSlug, moduleRoute);
    if (!moduleConfig) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    if (!isAdmin) {
      if (!isWealthModulePublished(courseSlug, moduleRoute)) {
        return Response.json({ error: 'Forbidden' }, { status: 403 });
      }
      const enrollmentRows = await base44.asServiceRole.entities.CourseEnrollment.filter({
        learner_id: user.id,
        course_slug: courseSlug,
        status: { $in: ['active', 'completed'] },
      });
      if (!enrollmentRows || enrollmentRows.length === 0) {
        return Response.json({ error: 'Forbidden' }, { status: 403 });
      }
      const prereqRoute = getWealthModulePrerequisite(courseSlug, moduleRoute);
      if (prereqRoute) {
        const prereqRows = await base44.asServiceRole.entities.ModuleProgress.filter({
          learner_id: user.id,
          course_slug: courseSlug,
          module_slug: prereqRoute,
          status: 'completed',
        });
        if (!prereqRows || prereqRows.length === 0) {
          return Response.json({ error: 'Prerequisite incomplete', prerequisite: prereqRoute }, { status: 403 });
        }
      }
    }

    const rawContent = getWealthModuleContent(courseSlug, moduleRoute);
    if (!rawContent) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    // Strip the concept-check answer key before returning to the client.
    let moduleContent: Record<string, unknown> = { ...rawContent };
    if (moduleContent.quiz && (moduleContent.quiz as Record<string, unknown>).questions) {
      const quiz = moduleContent.quiz as Record<string, unknown>;
      const questions = Array.isArray(quiz.questions) ? quiz.questions : [];
      moduleContent = {
        ...moduleContent,
        quiz: {
          ...quiz,
          questions: questions.map((q: Record<string, unknown>) => {
            const { correctIndex, ...rest } = q;
            return rest;
          }),
        },
      };
    }

    return Response.json({ module: moduleContent });
  } catch (error) {
    console.error('[getWealthModule] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}