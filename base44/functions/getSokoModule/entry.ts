import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';
import {
  sokoCourseExists,
  getSokoSensitiveModuleContent,
  getSokoModuleConfig,
  getSokoModulePrerequisite,
  isSokoModulePublished,
  getSokoCompletionRequirements,
} from '../../shared/sauti-za-soko-config.js';
import { translateTextBatch } from '../../shared/translate-content.js';

/**
 * Access-gated endpoint that returns one Sauti za Soko module. The content
 * lives in base44/shared/sauti-za-soko-curriculum.js and
 * base44/shared/sauti-za-soko-curriculum-advanced.js, both server-side only
 * and never bundled into the public client JavaScript.
 *
 * TRUST BOUNDARY:
 *   - Unauthenticated -> 401.
 *   - Unknown course or module -> 404.
 *   - For non-admins: the module must be published, the learner must hold
 *     an active or completed enrollment, and the prerequisite module must
 *     be complete. Otherwise 403, which the page renders as the public
 *     "module in development" state.
 *   - Admins bypass the publication and prerequisite checks so the
 *     pathway can be previewed before launch.
 *
 * The quiz answer key (correctIndex) is stripped before the response. The
 * frontend grades through checkSokoKnowledgeCheck and never receives the
 * key.
 */
const TRANSLATABLE_LANGUAGES = new Set(['sw', 'es', 'fr', 'pt', 'ar', 'am']);

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

    const allowedKeys = new Set(['courseSlug', 'moduleRoute', 'language']);
    for (const k of Object.keys(body)) {
      if (!allowedKeys.has(k)) {
        return Response.json({ error: 'Unsupported field: ' + k }, { status: 400 });
      }
    }

    const courseSlug = typeof body.courseSlug === 'string' ? body.courseSlug : '';
    const moduleRoute = typeof body.moduleRoute === 'string' ? body.moduleRoute : '';
    const language = typeof body.language === 'string' ? body.language : 'en';

    if (!courseSlug || !sokoCourseExists(courseSlug) || !moduleRoute) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    const moduleConfig = getSokoModuleConfig(courseSlug, moduleRoute);
    if (!moduleConfig) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    const rawContent = getSokoSensitiveModuleContent(courseSlug, moduleRoute);
    if (!rawContent) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    if (!isAdmin) {
      if (!isSokoModulePublished(courseSlug, moduleRoute)) {
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
      const prereqRoute = getSokoModulePrerequisite(courseSlug, moduleRoute);
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

    // Strip the answer key.
    let moduleContent = rawContent;
    if (moduleContent && moduleContent.quiz && Array.isArray(moduleContent.quiz.questions)) {
      moduleContent = {
        ...moduleContent,
        quiz: {
          ...moduleContent.quiz,
          questions: moduleContent.quiz.questions.map((q) => {
            const { correctIndex, ...rest } = q;
            return rest;
          }),
        },
      };
    }

    moduleContent = {
      ...moduleContent,
      completionRequirements: getSokoCompletionRequirements(courseSlug),
    };

    // Translate the module's main prose when a supported language is
    // selected. Metadata, ids and the Kiswahili discussion prompt stay in
    // their original form. Any failure returns the English content so the
    // learner is never blocked.
    if (language && language !== 'en' && TRANSLATABLE_LANGUAGES.has(language)) {
      const payload: Record<string, string> = {};
      if (moduleContent.title) payload.title = moduleContent.title;
      if (moduleContent.description) payload.description = moduleContent.description;
      if (moduleContent.competency) payload.competency = moduleContent.competency;
      if (Array.isArray(moduleContent.overview)) {
        moduleContent.overview.forEach((p, i) => { payload['ov' + i] = p; });
      }
      if (Array.isArray(moduleContent.learningObjectives)) {
        moduleContent.learningObjectives.forEach((p, i) => { payload['lo' + i] = p; });
      }
      if (Array.isArray(moduleContent.closingText)) {
        moduleContent.closingText.forEach((p, i) => { payload['ct' + i] = p; });
      }
      const translated = await translateTextBatch(base44, payload, language);
      const merged = { ...moduleContent };
      if (translated.title) merged.title = translated.title;
      if (translated.description) merged.description = translated.description;
      if (translated.competency) merged.competency = translated.competency;
      if (Array.isArray(merged.overview)) {
        merged.overview = merged.overview.map((p, i) => translated['ov' + i] || p);
      }
      if (Array.isArray(merged.learningObjectives)) {
        merged.learningObjectives = merged.learningObjectives.map((p, i) => translated['lo' + i] || p);
      }
      if (Array.isArray(merged.closingText)) {
        merged.closingText = merged.closingText.map((p, i) => translated['ct' + i] || p);
      }
      moduleContent = merged;
    }

    return Response.json({ module: moduleContent });
  } catch (error) {
    console.error('[getSokoModule] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}