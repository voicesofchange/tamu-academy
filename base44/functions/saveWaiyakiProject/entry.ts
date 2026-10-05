import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';
import {
  waiyakiCourseExists,
  getWaiyakiProjectOption,
} from '../../shared/waiyaki-config.js';

/**
 * saveWaiyakiProject — authenticated endpoint that saves the learner's own
 * written final project for the Waiyaki wa Hinga course.
 *
 * GUARANTEES:
 *   - learner_id is derived from authentication only. Any client-supplied
 *     learner_id, word_count, submitted_at or course_slug override is
 *     refused.
 *   - The project format must be one of the four options the guide sets out.
 *   - The written work must meet the minimum length for that option, so a
 *     submission is genuine writing. The word count is computed here, on the
 *     server, and stored.
 *   - One project per learner per course: a second save updates the existing
 *     record rather than creating a duplicate.
 *   - The learner's work is private to them. It is never shared, published or
 *     shown to other learners, and it is not included in the certificate.
 */
const PROTECTED_BODY_FIELDS = new Set([
  'learner_id',
  'learnerId',
  'word_count',
  'wordCount',
  'submitted_at',
  'submittedAt',
  'status',
  'reviewed_by',
]);

const MAX_CONTENT_LENGTH = 40000;
const MAX_TITLE_LENGTH = 200;

function countWords(value: string): number {
  return value.trim().split(/\s+/).filter(Boolean).length;
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

    let body: Record<string, unknown> = {};
    try {
      body = await req.json();
    } catch (_) {
      body = {};
    }

    for (const key of Object.keys(body)) {
      if (PROTECTED_BODY_FIELDS.has(key)) {
        return Response.json({ error: 'Forbidden field: ' + key }, { status: 403 });
      }
    }
    const allowedKeys = new Set([
      'courseSlug',
      'projectFormat',
      'title',
      'content',
    ]);
    for (const key of Object.keys(body)) {
      if (!allowedKeys.has(key)) {
        return Response.json({ error: 'Unsupported field: ' + key }, { status: 400 });
      }
    }

    const courseSlug = typeof body.courseSlug === 'string' ? body.courseSlug : '';
    if (!courseSlug || !waiyakiCourseExists(courseSlug)) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    const projectFormat =
      typeof body.projectFormat === 'string' ? body.projectFormat : '';
    const option = getWaiyakiProjectOption(projectFormat);
    if (!option) {
      return Response.json({ error: 'Unknown project format' }, { status: 400 });
    }

    const title =
      typeof body.title === 'string' ? body.title.trim().slice(0, MAX_TITLE_LENGTH) : '';

    const rawContent = typeof body.content === 'string' ? body.content : '';
    const content = rawContent.trim();

    if (!content) {
      return Response.json({ error: 'Your project is empty' }, { status: 400 });
    }
    if (content.length > MAX_CONTENT_LENGTH) {
      return Response.json({ error: 'Your project is too long' }, { status: 400 });
    }

    const wordCount = countWords(content);
    if (wordCount < option.minWords) {
      return Response.json(
        {
          error: 'Project too short',
          minWords: option.minWords,
          wordCount,
          message: `${option.title} needs ${option.wordRange}.`,
        },
        { status: 400 },
      );
    }

    const enrollmentRows = await base44.asServiceRole.entities.CourseEnrollment.filter({
      learner_id: user.id,
      course_slug: courseSlug,
      status: { $in: ['active', 'completed'] },
    });
    if (!enrollmentRows || enrollmentRows.length === 0) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const now = new Date().toISOString();

    const existing = await base44.asServiceRole.entities.WaiyakiProject.filter({
      learner_id: user.id,
      course_slug: courseSlug,
    });
    const existingRow =
      Array.isArray(existing) && existing.length > 0 ? existing[0] : null;

    if (existingRow) {
      const updated = await base44.asServiceRole.entities.WaiyakiProject.update(
        existingRow.id,
        {
          project_format: projectFormat,
          title,
          content,
          word_count: wordCount,
          updated_at: now,
        },
      );
      return Response.json({
        saved: true,
        wordCount: (updated && updated.word_count) || wordCount,
        minWords: option.minWords,
        updated: true,
      });
    }

    const created = await base44.asServiceRole.entities.WaiyakiProject.create({
      learner_id: user.id,
      course_slug: courseSlug,
      project_format: projectFormat,
      title,
      content,
      word_count: wordCount,
      submitted_at: now,
      updated_at: now,
    });

    try {
      await base44.analytics.track({
        eventName: 'final_project_submitted',
        properties: { course_slug: courseSlug, project_format: projectFormat },
      });
    } catch (err) {
      console.warn('[saveWaiyakiProject] analytics.track failed:', err && err.message);
    }

    return Response.json({
      saved: true,
      wordCount: (created && created.word_count) || wordCount,
      minWords: option.minWords,
      updated: false,
    });
  } catch (error) {
    console.error('[saveWaiyakiProject] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}