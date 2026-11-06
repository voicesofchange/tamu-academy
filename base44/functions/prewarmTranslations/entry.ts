import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';
import { runTranslationPrewarm, PREWARM_LANGUAGES } from '../../shared/translation-prewarm.js';

/**
 * Administrator-only preparation run.
 *
 * Translates the course modules (quizzes included) and the fixed email and
 * certificate wording into Kiswahili, Spanish and French ahead of any learner
 * arriving, writing through the shared translation cache.
 *
 * Called two ways:
 *   - by an administrator from the Translation Review page, and
 *   - by the scheduled "Prepare Translations Ahead of Time" workflow, which
 *     runs as an app admin and keeps the cache warm as course content changes.
 *
 * English content is never modified. A translation marked reviewed is never
 * overwritten: the shared layer skips it, and only an administrator can change
 * it. The run stops at a time budget so one call stays comfortably inside the
 * request limit; the next run carries on from where it stopped.
 *
 * Accepts only `languages` (a subset of sw/es/fr) and `timeBudgetMs`.
 */
export default async function (req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);

    const user = await base44.auth.me().catch(() => null);
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (user.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await req.json().catch(() => ({}));
    const allowed = new Set(['languages', 'timeBudgetMs']);
    for (const key of Object.keys(body || {})) {
      if (!allowed.has(key)) {
        return Response.json({ error: 'Unsupported field: ' + key }, { status: 400 });
      }
    }

    const languages = Array.isArray(body.languages)
      ? body.languages.filter(
          (code: unknown) => typeof code === 'string' && PREWARM_LANGUAGES.includes(code),
        )
      : PREWARM_LANGUAGES;

    const requestedBudget = Number(body.timeBudgetMs);
    const timeBudgetMs = Number.isFinite(requestedBudget)
      ? Math.min(Math.max(requestedBudget, 5000), 60000)
      : 40000;

    const result = await runTranslationPrewarm(base44, { languages, timeBudgetMs });
    return Response.json(result);
  } catch (error) {
    console.error('[prewarmTranslations] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}