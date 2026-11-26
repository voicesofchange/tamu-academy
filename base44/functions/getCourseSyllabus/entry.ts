import { courseSyllabus } from '../../shared/course-syllabus.js';

/**
 * getCourseSyllabus — public, non-authenticated endpoint behind the
 * expandable syllabus on the Courses page and each course overview.
 *
 * Request body: { courseSlug }
 * Response: { courseSlug, modules: [{ route, published, sections: [heading] }] }
 *
 * Returns only each module's section headings and whether it is published
 * (base44/shared/course-syllabus.js). No lesson text, questions, answers or
 * learner data. Read-only.
 */
export default async function(req: Request): Promise<Response> {
  try {
    let body: Record<string, unknown> = {};
    try {
      body = await req.json();
    } catch (_) {
      body = {};
    }
    const courseSlug = typeof body.courseSlug === 'string' ? body.courseSlug.trim() : '';
    const syllabus = courseSlug ? courseSyllabus(courseSlug) : null;
    if (!syllabus) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json({ courseSlug, modules: syllabus.modules });
  } catch (error) {
    console.error('[getCourseSyllabus] Error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}
