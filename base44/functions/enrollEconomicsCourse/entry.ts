import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import {
  ECONOMICS_COURSE_SLUG,
  economicsCourseExists,
  isEconomicsEnrollmentOpen,
} from '../../shared/economics-course-config.js';

/**
 * Authenticated enrollment endpoint for the Understanding African
 * Economies and the Global System course.
 *
 * GUARANTEES:
 *   - De-duplicates by (learner_id, course_slug); returns the existing
 *     row when one exists.
 *   - learner_id is derived from the authenticated session only; any
 *     client-supplied learner_id is ignored.
 *   - Only writes status='active', enrolled_at=now, updated_at=now on
 *     create. status='completed' and completed_at are NEVER set here —
 *     completion is deferred to the grading/completion functions.
 *   - The server-controlled enrollmentOpen flag is the canonical gate
 *     for non-admin enrollment. While false (current development state),
 *     ordinary authenticated users receive 403 "Enrollment closed"
 *     even with the correct course slug. Admins may call this function
 *     for testing while enrollment is closed.
 *   - Refuses ANY body containing enrollmentOpen or enrollment_open.
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

    // Refuse any body that attempts to override the enrollment flag.
    if (body && typeof body === 'object') {
      for (const key of Object.keys(body)) {
        if (key === 'enrollmentOpen' || key === 'enrollment_open') {
          return Response.json({ error: 'Forbidden field' }, { status: 403 });
        }
      }
    }

    const requestedCourseSlug =
      typeof body.courseSlug === 'string' ? body.courseSlug : '';
    if (!economicsCourseExists(requestedCourseSlug)) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    // Enrollment gate for non-admins. Admins may call this function for
    // testing during development even while enrollment is closed.
    if (!isAdmin && !isEconomicsEnrollmentOpen()) {
      return Response.json({ error: 'Enrollment closed' }, { status: 403 });
    }

    const learnerId = user.id;
    const now = new Date().toISOString();

    // De-dupe — return existing row when one already exists.
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

    return Response.json({ enrollment: created, alreadyEnrolled: false });
  } catch (error) {
    console.error('[enrollEconomicsCourse] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}