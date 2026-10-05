import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';
import {
  SOKO_COURSE_SLUG,
  sokoCourseExists,
  getSokoModuleConfig,
} from '../../shared/sauti-za-soko-config.js';

/**
 * getSokoWork — authenticated, non-mutating endpoint that returns the
 * current user's OWN saved Sauti za Soko work so it can be read and
 * revised in the interface:
 *
 *   - the My Soko Action Plan section for the requested module
 *   - the peer discussion response for the requested module
 *   - the final course reflection (core course only)
 *
 * SCOPE AND TRUST BOUNDARY:
 *   - Returns only the current authenticated user's records. It never
 *     returns another learner's work, and it never returns a reviewer's
 *     notes.
 *   - Creates NO record and performs NO update.
 *   - Unauthenticated -> 401. Unknown course/module -> 404.
 *   - Admin preview returns empty work rather than another person's.
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

    const allowedKeys = new Set(['courseSlug', 'moduleRoute']);
    for (const k of Object.keys(body)) {
      if (!allowedKeys.has(k)) {
        return Response.json({ error: 'Unsupported field: ' + k }, { status: 400 });
      }
    }

    const courseSlug = typeof body.courseSlug === 'string' ? body.courseSlug.trim() : '';
    const moduleRoute = typeof body.moduleRoute === 'string' ? body.moduleRoute.trim() : '';

    if (!courseSlug || !sokoCourseExists(courseSlug)) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }
    if (moduleRoute && !getSokoModuleConfig(courseSlug, moduleRoute)) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    const learnerId = user.id;

    let actionPlan = null;
    let discussion = null;

    if (moduleRoute) {
      const planRows = await base44.asServiceRole.entities.SokoActionPlan.filter({
        learner_id: learnerId,
        course_slug: courseSlug,
        module_slug: moduleRoute,
      });
      const planRow = planRows && planRows.length > 0 ? planRows[0] : null;
      if (planRow) {
        let responses = {};
        try {
          const parsed = JSON.parse(planRow.content || '{}');
          if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) responses = parsed;
        } catch (_) {
          responses = {};
        }
        actionPlan = {
          responses,
          filledCount: planRow.filled_count || 0,
          savedAt: planRow.updated_at || planRow.saved_at || null,
        };
      }

      const discussionRows = await base44.asServiceRole.entities.SokoDiscussion.filter({
        learner_id: learnerId,
        course_slug: courseSlug,
        module_slug: moduleRoute,
      });
      const discussionRow = discussionRows && discussionRows.length > 0 ? discussionRows[0] : null;
      if (discussionRow) {
        discussion = {
          response: discussionRow.response || '',
          language: discussionRow.language || 'sw',
          shareConsent: discussionRow.share_consent === true,
          createdAt: discussionRow.created_at || null,
        };
      }
    }

    let finalReflection = null;
    if (courseSlug === SOKO_COURSE_SLUG) {
      const reflectionRows = await base44.asServiceRole.entities.SokoReflection.filter({
        learner_id: learnerId,
        course_slug: courseSlug,
      });
      const reflectionRow = reflectionRows && reflectionRows.length > 0 ? reflectionRows[0] : null;
      if (reflectionRow && reflectionRow.reflection) {
        finalReflection = {
          reflection: reflectionRow.reflection,
          submittedAt: reflectionRow.updated_at || reflectionRow.submitted_at || null,
        };
      }
    }

    return Response.json({ courseSlug, moduleSlug: moduleRoute || null, actionPlan, discussion, finalReflection });
  } catch (error) {
    console.error('[getSokoWork] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}