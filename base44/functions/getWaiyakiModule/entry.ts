import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';
import {
  waiyakiCourseExists,
  getWaiyakiSensitiveModuleContent,
  getWaiyakiModuleConfig,
  getWaiyakiModulePrerequisite,
  isWaiyakiModulePublished,
  getWaiyakiCompletionRequirements,
} from '../../shared/waiyaki-config.js';
import { WAIYAKI_COURSE_TITLE } from '../../shared/waiyaki-curriculum.js';

/**
 * Access-gated endpoint that returns one Waiyaki wa Hinga module. The
 * content lives in base44/shared/waiyaki-curriculum.js, which is
 * server-side only and never bundled into the public client JavaScript.
 *
 * TRUST BOUNDARY:
 *   - Unauthenticated -> 401.
 *   - Unknown course or module -> 404.
 *   - For non-admins: the module must be published, the learner must hold an
 *     active or completed enrollment, and the prerequisite module must be
 *     complete. Otherwise 403, which the page renders as the public
 *     "module in development" state.
 *   - Admins bypass the publication and prerequisite checks so the course
 *     can be previewed before launch.
 *
 * The module carries no answer material, so nothing is stripped here. The
 * final assessment lives behind its own gated endpoints.
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

    if (!courseSlug || !waiyakiCourseExists(courseSlug) || !moduleRoute) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    const moduleConfig = getWaiyakiModuleConfig(courseSlug, moduleRoute);
    if (!moduleConfig) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    const rawContent = getWaiyakiSensitiveModuleContent(moduleRoute);
    if (!rawContent) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    if (!isAdmin) {
      if (!isWaiyakiModulePublished(courseSlug, moduleRoute)) {
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
      const prereqRoute = getWaiyakiModulePrerequisite(courseSlug, moduleRoute);
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
    }

    const moduleContent = {
      ...rawContent,
      courseTitle: WAIYAKI_COURSE_TITLE,
      completionRequirements: getWaiyakiCompletionRequirements(),
    };

    return Response.json({ module: moduleContent });
  } catch (error) {
    console.error('[getWaiyakiModule] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}