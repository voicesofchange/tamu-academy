import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';
import { REVIEW_STATUSES } from '../../shared/translation-review.js';

/**
 * Save an administrator's correction to one cached translation, and mark it
 * reviewed (or return it to unreviewed). Only this endpoint changes the text of
 * a reviewed translation — the translation run itself never does.
 * Administrators only.
 */
export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me().catch((e) => (e.status === 401 ? null : Promise.reject(e)));
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    if (user.role !== 'admin') return Response.json({ error: 'Forbidden' }, { status: 403 });

    const body = await req.json().catch(() => ({}));
    const id = typeof body.id === 'string' ? body.id : '';
    const text = typeof body.translated_text === 'string' ? body.translated_text : '';
    const status = typeof body.status === 'string' ? body.status : 'reviewed';

    if (!id) return Response.json({ error: 'id is required' }, { status: 400 });
    if (!text.trim()) return Response.json({ error: 'A translation cannot be empty' }, { status: 400 });
    if (text.length > 20000) return Response.json({ error: 'This translation is too long' }, { status: 400 });
    if (!REVIEW_STATUSES.includes(status)) {
      return Response.json({ error: 'Unsupported status' }, { status: 400 });
    }

    const existing = await base44.asServiceRole.entities.TranslationCache
      .get(id)
      .catch((e) => (e.status === 404 ? null : Promise.reject(e)));
    if (!existing) return Response.json({ error: 'Not found' }, { status: 404 });

    const patch = {
      translated_text: text,
      status,
      reviewed_at: status === 'reviewed' ? new Date().toISOString() : null,
      reviewed_by: status === 'reviewed' ? user.full_name || user.email || 'Administrator' : null,
    };
    if (typeof body.notes === 'string') patch.review_notes = body.notes.slice(0, 2000);

    const updated = await base44.asServiceRole.entities.TranslationCache.update(id, patch);

    return Response.json({
      row: {
        id,
        translated_text: patch.translated_text,
        status: patch.status,
        reviewed_at: patch.reviewed_at,
        reviewed_by: patch.reviewed_by || '',
      },
      updated_at: updated && updated.updated_date,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}