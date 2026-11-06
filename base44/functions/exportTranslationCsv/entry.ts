import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';
import {
  REVIEW_LANGUAGES,
  fetchCourseTranslations,
  buildCsv,
} from '../../shared/translation-review.js';

/**
 * Export one language's course translations as a CSV an outside reviewer can
 * work on without an account. Imported back with importTranslationCsv.
 * Administrators only.
 */
export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me().catch((e) => (e.status === 401 ? null : Promise.reject(e)));
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    if (user.role !== 'admin') return Response.json({ error: 'Forbidden' }, { status: 403 });

    const body = await req.json().catch(() => ({}));
    const language = typeof body.language === 'string' ? body.language : '';
    if (!REVIEW_LANGUAGES.includes(language)) {
      return Response.json({ error: 'Unsupported language' }, { status: 400 });
    }

    const rows = await fetchCourseTranslations(base44, language);
    return Response.json({ language, count: rows.length, csv: buildCsv(rows) });
  } catch (error) {
    console.error('exportTranslationCsv failed', error);
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}