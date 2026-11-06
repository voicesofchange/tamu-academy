import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';
import {
  REVIEW_LANGUAGES,
  fetchCourseTranslations,
  countTranslations,
} from '../../shared/translation-review.js';

/**
 * Read the cached course translations for one language, with the English each
 * was made from and its review state, so an administrator can review them.
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
    const trimmed = rows.map((row) => ({
      id: row.id,
      language: row.language,
      course_slug: row.course_slug || '',
      module_slug: row.module_slug || '',
      module_title: row.module_title || '',
      field_path: row.field_path || '',
      source_text: row.source_text || '',
      translated_text: row.translated_text || '',
      status: row.status || 'unreviewed',
      reviewed_at: row.reviewed_at || null,
      reviewed_by: row.reviewed_by || '',
    }));

    return Response.json({
      language,
      rows: trimmed,
      counts: countTranslations(trimmed),
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}