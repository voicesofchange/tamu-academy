import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import {
  WEALTH_COURSE_SLUG,
  isWealthModulePublished,
  WEALTH_MODULE_ROUTES,
  isWealthCapstoneFormat,
} from '../../shared/building-wealth-together-config.js';
import { getWealthCapstoneOption } from '../../shared/building-wealth-together-curriculum.js';

/**
 * saveWealthCapstone — authenticated endpoint that saves the learner's
 * capstone project for the Building Wealth Together course.
 *
 * The capstone is one of three options, each with its own numbered sections.
 * The learner's answers are stored as a JSON object of section id to answer.
 *
 * GUARANTEES:
 *   - learner_id is derived exclusively from the authenticated session.
 *   - The capstone option is validated against the canonical list, and every
 *     submitted section id must belong to that option. Unknown sections are
 *     refused rather than stored.
 *   - Each answer is trimmed and bounded; the content size is bounded by the
 *     option's own section list, so a caller cannot inflate the record.
 *   - filled_count and word_count are computed here, never trusted from the
 *     browser. submitted_at is set the first time every section of the
 *     chosen option carries an answer, and is never cleared afterwards.
 *   - Any body containing learner_id, submitted_at, filled_count, word_count,
 *     or course_slug overrides is refused.
 *
 * TRUST BOUNDARY:
 *   - Unauthenticated -> 401.
 *   - Unknown course or capstone option -> 404 / 400.
 *   - No active enrollment -> 403. Admins without enrollment get a preview
 *     response with progressSaved:false, as elsewhere in the course.
 */

const MAX_ANSWER_LENGTH = 6000;
const MAX_TITLE_LENGTH = 200;

const PROTECTED_BODY_FIELDS = new Set([
  'learner_id',
  'learnerId',
  'submitted_at',
  'submittedAt',
  'filled_count',
  'filledCount',
  'word_count',
  'wordCount',
  'course_slug',
  'courseSlugOverride',
]);

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

    for (const k of Object.keys(body)) {
      if (PROTECTED_BODY_FIELDS.has(k)) {
        return Response.json({ error: 'Forbidden field' }, { status: 403 });
      }
    }

    const allowedKeys = new Set(['courseSlug', 'capstoneFormat', 'title', 'answers']);
    for (const k of Object.keys(body)) {
      if (!allowedKeys.has(k)) {
        return Response.json({ error: 'Unsupported field: ' + k }, { status: 400 });
      }
    }

    const courseSlug = typeof body.courseSlug === 'string' ? body.courseSlug.trim() : '';
    if (courseSlug !== WEALTH_COURSE_SLUG) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    const capstoneFormat = typeof body.capstoneFormat === 'string' ? body.capstoneFormat : '';
    if (!isWealthCapstoneFormat(capstoneFormat)) {
      return Response.json({ error: 'Unknown capstone option' }, { status: 400 });
    }

    const option = getWealthCapstoneOption(capstoneFormat);
    if (!option) {
      return Response.json({ error: 'Unknown capstone option' }, { status: 404 });
    }

    const rawTitle = typeof body.title === 'string' ? body.title.trim() : '';
    const title = rawTitle.slice(0, MAX_TITLE_LENGTH);

    const rawAnswers = body.answers;
    if (!rawAnswers || typeof rawAnswers !== 'object' || Array.isArray(rawAnswers)) {
      return Response.json({ error: 'Missing capstone answers' }, { status: 400 });
    }

    const validIds = new Set(option.sections.map((section) => section.id));
    const answers: Record<string, string> = {};
    for (const key of Object.keys(rawAnswers as Record<string, unknown>)) {
      if (!validIds.has(key)) {
        return Response.json({ error: 'Unknown section: ' + key }, { status: 400 });
      }
      const value = (rawAnswers as Record<string, unknown>)[key];
      if (typeof value !== 'string') {
        return Response.json({ error: 'Invalid answer for section: ' + key }, { status: 400 });
      }
      const trimmed = value.trim();
      if (trimmed.length > MAX_ANSWER_LENGTH) {
        return Response.json({ error: 'Answer too long for section: ' + key }, { status: 400 });
      }
      answers[key] = trimmed;
    }

    const filledCount = option.sections.filter((section) => (answers[section.id] || '').length > 0).length;
    const complete = filledCount === option.sections.length;
    const wordCount = option.sections
      .map((section) => answers[section.id] || '')
      .join(' ')
      .split(/\s+/)
      .filter(Boolean).length;

    const isAdmin = user.role === 'admin';
    const enrollmentRows = await base44.asServiceRole.entities.CourseEnrollment.filter({
      learner_id: user.id,
      course_slug: courseSlug,
      status: { $in: ['active', 'completed'] },
    });
    const hasEnrollment = !!(enrollmentRows && enrollmentRows.length > 0);

    // At least one published module, as elsewhere in the course.
    let anyPublished = false;
    for (const route of WEALTH_MODULE_ROUTES) {
      if (isWealthModulePublished(courseSlug, route)) {
        anyPublished = true;
        break;
      }
    }

    if (!isAdmin) {
      if (!hasEnrollment) {
        return Response.json({ error: 'Forbidden' }, { status: 403 });
      }
      if (!anyPublished) {
        return Response.json({ error: 'Forbidden' }, { status: 403 });
      }
    }

    if (isAdmin && (!hasEnrollment || !anyPublished)) {
      return Response.json({
        progressSaved: false,
        filledCount,
        totalSections: option.sections.length,
        submitted: false,
      });
    }

    const now = new Date().toISOString();
    const existing = await base44.asServiceRole.entities.WealthCapstone.filter({
      learner_id: user.id,
      course_slug: courseSlug,
    });
    const existingRow = existing && existing.length > 0 ? existing[0] : null;

    const payload: Record<string, unknown> = {
      capstone_format: capstoneFormat,
      title,
      content: JSON.stringify(answers),
      filled_count: filledCount,
      word_count: wordCount,
      updated_at: now,
    };
    // A submission is recorded the first time every section is answered, and
    // is never cleared by a later edit.
    if (complete && !(existingRow && existingRow.submitted_at)) {
      payload.submitted_at = now;
    }

    if (existingRow) {
      const updated = await base44.asServiceRole.entities.WealthCapstone.update(existingRow.id, payload);
      return Response.json({
        progressSaved: true,
        filledCount,
        totalSections: option.sections.length,
        submitted: !!((updated && updated.submitted_at) || (existingRow && existingRow.submitted_at)),
        submittedAt: (updated && updated.submitted_at) || (existingRow && existingRow.submitted_at) || null,
      });
    }

    const created = await base44.asServiceRole.entities.WealthCapstone.create({
      learner_id: user.id,
      course_slug: courseSlug,
      ...payload,
    });

    return Response.json({
      progressSaved: true,
      filledCount,
      totalSections: option.sections.length,
      submitted: !!(created && created.submitted_at),
      submittedAt: (created && created.submitted_at) || null,
    });
  } catch (error) {
    console.error('[saveWealthCapstone] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}