import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';
import {
  isTemplateEnrollmentOpen,
  templateCourseExists,
} from '../../shared/course-template-config.js';

/**
 * enrollTemplateCourse — enrollment for every course built with the course
 * template. The course slug selects the registry entry; nothing is
 * course-specific here.
 *
 * GUARANTEES:
 *   - learner_id comes from the authenticated session only.
 *   - De-duplicates by (learner_id, course_slug) and returns the existing row.
 *   - Only status='active' and the timestamps are written; completion stays
 *     with completeTemplateCourseModule and issueTemplateCourseCertificate.
 *   - The enrollment gate is the server-side `enrollmentOpen` flag on the
 *     registry entry. Admins may enroll while it is closed.
 */
export default async function (req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);

    const user = await base44.auth.me().catch(() => null);
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const isAdmin = user.role === 'admin';

    let body: Record<string, unknown> = {};
    try {
      body = await req.json();
    } catch (_) {
      body = {};
    }

    for (const key of Object.keys(body || {})) {
      if (key === 'enrollmentOpen' || key === 'enrollment_open') {
        return Response.json({ error: 'Forbidden field' }, { status: 403 });
      }
    }

    const courseSlug = typeof body.courseSlug === 'string' ? body.courseSlug.trim() : '';
    if (!templateCourseExists(courseSlug)) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    if (!isAdmin && !isTemplateEnrollmentOpen(courseSlug)) {
      return Response.json({ error: 'Enrollment closed' }, { status: 403 });
    }

    const now = new Date().toISOString();
    const existing = await base44.asServiceRole.entities.CourseEnrollment.filter({
      learner_id: user.id,
      course_slug: courseSlug,
    });
    if (Array.isArray(existing) && existing.length > 0) {
      return Response.json({ enrollment: existing[0], alreadyEnrolled: true });
    }

    const created = await base44.asServiceRole.entities.CourseEnrollment.create({
      learner_id: user.id,
      course_slug: courseSlug,
      status: 'active',
      enrolled_at: now,
      updated_at: now,
    });

    try {
      await base44.analytics.track({
        eventName: 'course_enrolled',
        properties: { course_slug: courseSlug },
      });
    } catch (err) {
      console.warn('[enrollTemplateCourse] analytics.track failed:', err && err.message);
    }

    return Response.json({ enrollment: created, alreadyEnrolled: false });
  } catch (error) {
    console.error('[enrollTemplateCourse] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}