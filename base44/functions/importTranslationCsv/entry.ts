import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';
import { REVIEW_LANGUAGES, parseCsv } from '../../shared/translation-review.js';

/**
 * Import a reviewer's CSV for one language. Each row is matched by its
 * record id, its translation is saved, and it is marked reviewed — so an
 * outside reviewer can work without an account and without admin access.
 *
 * An outdated row is skipped: its English has changed, so it is redone by the
 * translation run and reviewed afresh rather than accepted against old text.
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
    const csv = typeof body.csv === 'string' ? body.csv : '';

    if (!REVIEW_LANGUAGES.includes(language)) {
      return Response.json({ error: 'Unsupported language' }, { status: 400 });
    }
    if (!csv.trim()) return Response.json({ error: 'The file is empty' }, { status: 400 });
    if (csv.length > 500000) return Response.json({ error: 'The file is too large' }, { status: 400 });

    const records = parseCsv(csv).slice(0, 1000);
    if (records.length === 0) return Response.json({ error: 'No rows found in the file' }, { status: 400 });

    const ids = [...new Set(records.map((r) => (r.id || '').trim()).filter(Boolean))].slice(0, 1000);

    const existing = new Map();
    for (let i = 0; i < ids.length; i += 100) {
      const page = await base44.asServiceRole.entities.TranslationCache.filter({
        id: { $in: ids.slice(i, i + 100) },
      });
      const items = Array.isArray(page) ? page : (page && page.items) || [];
      for (const row of items) existing.set(row.id, row);
    }

    const stamp = new Date().toISOString();
    const reviewer = user.full_name || user.email || 'Administrator';
    const updates = [];
    let skipped = 0;
    let outdated = 0;

    for (const record of records) {
      const id = (record.id || '').trim();
      const translation = (record.translation || '').trim();
      if (!id || !translation) {
        skipped += 1;
        continue;
      }
      const row = existing.get(id);
      if (!row || row.language !== language) {
        skipped += 1;
        continue;
      }
      if (row.status === 'outdated') {
        outdated += 1;
        continue;
      }
      updates.push({
        id,
        translated_text: translation.slice(0, 20000),
        status: 'reviewed',
        reviewed_at: stamp,
        reviewed_by: reviewer,
      });
    }

    for (let i = 0; i < updates.length; i += 500) {
      await base44.asServiceRole.entities.TranslationCache.bulkUpdate(updates.slice(i, i + 500));
    }

    return Response.json({
      updated: updates.length,
      skipped,
      outdated,
      total: records.length,
    });
  } catch (error) {
    console.error('importTranslationCsv failed', error);
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}