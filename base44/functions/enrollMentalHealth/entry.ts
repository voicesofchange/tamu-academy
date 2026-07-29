import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import {
  courseExists,
  isEnrollmentOpen,
} from '../../shared/mental-health-curriculum.js';

/**
 * Authenticated enrollment endpoint for the Mental Health pillar course.
 *
 * CORRECTION-PASS UPDATES (Phase 1 correction):
 *   - Course slug changed to `mental-health-community-and-culture` and
 *     is sourced from the canonical server config in
 *     base44/shared/mental-health-curriculum.js.
 *   - Server-controlled `enrollmentOpen` flag is the canonical gate for
 *     non-admin enrollment. While false (current development state),
 *     ordinary authenticated users receive HTTP 403 "Enrollment closed"
 *     even when they call this function with the correct course slug.
 *   - The function refuses ANY body containing `enrollmentOpen` or
 *     `enrollment_open`. No browser-supplied value can flip the flag.
 *   - Administrators may still call this function for testing while
 *     enrollment is closed; the gate above is bypassed for admins.
 *   - The learner ID continues to be derived from the authenticated
 *     user only; any client-supplied `learner_id` is ignored.
 *   - The CourseEnrollment row now sets `updated_at` on create (matches
 *     the corrected entity schema).
 *
 * GUARANTEES (preserved from the original Phase 1):
 *   - De-duplicates by (learner_id, course_slug); returns the existing
 *     row when one exists.
 *   - Only writes status='active', enrolled_at=now, updated_at=now on
 *     create. status='completed' and completed_at are NEVER set by this
 *     function — completion is deferred to a later grading function.
 */
export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);

    let user = null;
    try {
      user = await base44.auth.me();
    } catch (err) {
      user = null;
    }
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const isAdmin = user.role === 'admin';

    let body = {};
    try {
      body = await req.json();
    } catch (err) {
      body = {};
    }

    // Refuse any body that attempts to override the enrollment flag.
    // The server-controlled `enrollmentOpen` value is the only authority
    // and no browser-supplied key may flip it.
    if (body && typeof body === 'object') {
      for (const key of Object.keys(body)) {
        if (key === 'enrollmentOpen' || key === 'enrollment_open') {
          return Response.json({ error: 'Forbidden field' }, { status: 403 });
        }
      }
    }

    const requestedCourseSlug =
      typeof body.courseSlug === 'string' ? body.courseSlug : '';
    if (!courseExists(requestedCourseSlug)) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    // Enrollment gate for non-admins. Admins may call this function for
    // testing during development even while enrollment is closed.
    if (!isAdmin && !isEnrollmentOpen()) {
      return Response.json({ error: 'Enrollment closed' }, { status: 403 });
    }

    // Direct client-supplied learner_id is ignored; only user.id is used.
    const learnerId = user.id;
    const now = new Date().toISOString();

    // De-dupe — return existing row when one already exists. Service
    // role is used because the entity's read RLS allows only the owner
    // (or admin), and this trusted function pre-creates the row using
    // its own authority.
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
    console.error('[enrollMentalHealth] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}