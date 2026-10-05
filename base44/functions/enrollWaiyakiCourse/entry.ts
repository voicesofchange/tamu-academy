import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';
import {
  WAIYAKI_COURSE_SLUG,
  waiyakiCourseExists,
  isWaiyakiEnrollmentOpen,
} from '../../shared/waiyaki-config.js';

/**
 * Authenticated enrollment endpoint for the Waiyaki wa Hinga: Leadership,
 * Resistance and Historical Memory course.
 *
 * GUARANTEES:
 *   - De-duplicates by (learner_id, course_slug); returns the existing row
 *     when one already exists.
 *   - learner_id is derived from the authenticated session only; any
 *     client-supplied learner_id is ignored.
 *   - Only writes status='active', enrolled_at=now, updated_at=now on
 *     create. status='completed' and completed_at are NEVER set here —
 *     completion is decided server-side once the five modules, the final
 *     assessment and the written project are all done.
 *   - The server-controlled enrollment flag is the canonical gate for
 *     non-admin enrollment. Admins may call this function while enrollment
 *     is closed so the course can be previewed end to end.
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

    const isAdmin = user.role === 'admin';

    let body: Record<string, unknown> = {};
    try {
      body = await req.json();
    } catch (_) {
      body = {};
    }

    for (const key of Object.keys(body)) {
      if (key === 'enrollmentOpen' || key === 'enrollment_open') {
        return Response.json({ error: 'Forbidden field' }, { status: 403 });
      }
    }

    const requestedCourseSlug =
      typeof body.courseSlug === 'string' ? body.courseSlug : '';
    if (!waiyakiCourseExists(requestedCourseSlug)) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    if (!isAdmin && !isWaiyakiEnrollmentOpen()) {
      return Response.json({ error: 'Enrollment closed' }, { status: 403 });
    }

    const learnerId = user.id;
    const now = new Date().toISOString();

    const existing = await base44.asServiceRole.entities.CourseEnrollment.filter({
      learner_id: learnerId,
      course_slug: requestedCourseSlug,
    });

    if (existing && existing.length > 0) {
      return Response.json({ enrollment: existing[0], alreadyEnrolled: true });
    }

    const created = await base44.asServiceRole.entities.CourseEnrollment.create({
      learner_id: learnerId,
      course_slug: requestedCourseSlug,
      status: 'active',
      enrolled_at: now,
      updated_at: now,
    });

    try {
      await base44.analytics.track({
        eventName: 'course_enrolled',
        properties: { course_slug: WAIYAKI_COURSE_SLUG },
      });
    } catch (err) {
      console.warn('[enrollWaiyakiCourse] analytics.track failed:', err && err.message);
    }

    return Response.json({ enrollment: created, alreadyEnrolled: false });
  } catch (error) {
    console.error('[enrollWaiyakiCourse] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}