import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import {
  WEALTH_COURSE_SLUG,
  WEALTH_CAPSTONE_FORMATS,
} from '../../shared/building-wealth-together-config.js';
import { getWealthCapstoneOption } from '../../shared/building-wealth-together-curriculum.js';

/**
 * getWealthCapstone — authenticated, non-mutating endpoint that returns the
 * current learner's capstone project for the Building Wealth Together course,
 * together with the numbered section list for the option the learner chose.
 *
 * Only the authenticated learner's own record is read (RLS also limits this
 * to the owner or an administrator).
 *
 * Returns { capstone: null } when nothing has been saved yet — it creates no
 * record.
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

    const allowedKeys = new Set(['courseSlug']);
    for (const k of Object.keys(body)) {
      if (!allowedKeys.has(k)) {
        return Response.json({ error: 'Unsupported field: ' + k }, { status: 400 });
      }
    }

    const courseSlug = typeof body.courseSlug === 'string' ? body.courseSlug.trim() : '';
    if (courseSlug !== WEALTH_COURSE_SLUG) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    const rows = await base44.asServiceRole.entities.WealthCapstone.filter({
      learner_id: user.id,
      course_slug: courseSlug,
    });
    const row = rows && rows.length > 0 ? rows[0] : null;

    if (!row) {
      return Response.json({
        options: WEALTH_CAPSTONE_FORMATS,
        capstone: null,
      });
    }

    let sections: Record<string, string> = {};
    try {
      const parsed = JSON.parse(row.content || '{}');
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        sections = parsed;
      }
    } catch (_) {
      sections = {};
    }

    const option = getWealthCapstoneOption(row.capstone_format);

    return Response.json({
      options: WEALTH_CAPSTONE_FORMATS,
      capstone: {
        format: row.capstone_format,
        formatLabel: option ? option.label : row.capstone_format,
        sections: option ? option.sections : [],
        title: row.title || '',
        answers: sections,
        filledCount: typeof row.filled_count === 'number' ? row.filled_count : 0,
        wordCount: typeof row.word_count === 'number' ? row.word_count : 0,
        submitted: !!row.submitted_at,
        submittedAt: row.submitted_at || null,
        updatedAt: row.updated_at || null,
      },
    });
  } catch (error) {
    console.error('[getWealthCapstone] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}