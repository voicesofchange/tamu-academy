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

/**
 * Values that look like text but must never be translated: identifiers,
 * routes, the answer index, the time estimate, the citations, and the
 * Kiswahili discussion prompt itself (its gloss and guidance are translated
 * instead, so the learner sees the original question beside their own
 * language).
 */
function isTranslatableLeaf(path: string): boolean {
  if (path === 'route' || path.endsWith('.route')) return false;
  if (path === 'number' || path.endsWith('.number')) return false;
  if (path === 'id' || path.endsWith('.id')) return false;
  if (path === 'status' || path.endsWith('.status')) return false;
  if (path === 'estimatedTime' || path === 'quiz.passingScore') return false;
  if (path === 'kiswahiliPrompt.prompt') return false;
  if (path === 'sources' || path.startsWith('sources.')) return false;
  return true;
}

/**
 * Collect every translatable string under the named top-level sections,
 * keyed by its dotted path so it can be written back to the same place.
 */
function collectTranslatableStrings(
  source: Record<string, unknown>,
  sections: string[],
): Record<string, string> {
  const out: Record<string, string> = {};

  const walk = (value: unknown, path: string) => {
    if (typeof value === 'string') {
      if (isTranslatableLeaf(path)) out[path] = value;
      return;
    }
    if (Array.isArray(value)) {
      value.forEach((item, index) => walk(item, `${path}.${index}`));
      return;
    }
    if (value && typeof value === 'object') {
      for (const key of Object.keys(value as Record<string, unknown>)) {
        walk((value as Record<string, unknown>)[key], `${path}.${key}`);
      }
    }
  };

  for (const section of sections) {
    const value = source ? source[section] : undefined;
    if (value === undefined || value === null) continue;
    if (typeof value === 'string') {
      if (isTranslatableLeaf(section)) out[section] = value;
      continue;
    }
    walk(value, section);
  }
  return out;
}

/**
 * Write translated strings back into the sections they came from. Missing or
 * empty translations leave the original English text in place.
 */
function applyTranslatedStrings(
  source: Record<string, unknown>,
  sections: string[],
  translations: Record<string, string>,
): Record<string, unknown> {
  const apply = (value: unknown, path: string): unknown => {
    if (typeof value === 'string') {
      const translated = translations[path];
      if (translated && typeof translated === 'string' && translated.trim().length > 0) {
        return translated;
      }
      return value;
    }
    if (Array.isArray(value)) {
      return value.map((item, index) => apply(item, `${path}.${index}`));
    }
    if (value && typeof value === 'object') {
      const next: Record<string, unknown> = {};
      const record = value as Record<string, unknown>;
      for (const key of Object.keys(record)) {
        next[key] = apply(record[key], path ? `${path}.${key}` : key);
      }
      return next;
    }
    return value;
  };

  const merged: Record<string, unknown> = { ...source };
  for (const section of sections) {
    const value = merged[section];
    if (value === undefined || value === null) continue;
    merged[section] = apply(value, section);
  }
  return merged;
}

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

    // Translate the whole learner-facing module when a supported language is
    // selected: the lesson, the Kiambu case, the context notes, the key
    // concepts, the international comparison and its examples, the action
    // plan, the discussion guidance, the knowledge check, the reflections and
    // the closing text. Structural values stay as they are — routes, ids and
    // numbers, the source citations, the time estimate — and the Kiswahili
    // discussion prompt itself is never translated, only its gloss and
    // guidance.
    //
    // The content is translated in two batches so that a single oversized
    // response cannot fail the whole module, and any failure returns the
    // English text for that field so the learner is never blocked.
    if (language && language !== 'en' && TRANSLATABLE_LANGUAGES.has(language)) {
      const READING_SECTIONS = [
        'title',
        'description',
        'competency',
        'learningObjectives',
        'overview',
        'contextNotes',
        'keyConcepts',
        'localCase',
        'closingText',
      ];
      const PRACTICE_SECTIONS = [
        'internationalComparison',
        'activity',
        'kiswahiliPrompt',
        'reflectionQuestions',
        'quiz',
        'completionRequirements',
        'courseClosingText',
      ];

      const [readingTranslated, practiceTranslated] = await Promise.all([
        translateTextBatch(base44, collectTranslatableStrings(moduleContent, READING_SECTIONS), language),
        translateTextBatch(base44, collectTranslatableStrings(moduleContent, PRACTICE_SECTIONS), language),
      ]);

      moduleContent = applyTranslatedStrings(moduleContent, READING_SECTIONS, readingTranslated);
      moduleContent = applyTranslatedStrings(moduleContent, PRACTICE_SECTIONS, practiceTranslated);
    }

    return Response.json({ module: moduleContent });
  } catch (error) {
    console.error('[getSokoModule] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}