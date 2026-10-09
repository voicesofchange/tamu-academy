import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import {
  WEALTH_COURSE_SLUG,
  wealthCourseExists,
  isWealthEnrollmentOpen,
  isWealthPathwayFocus,
} from '../../shared/building-wealth-together-config.js';

/**
 * Authenticated enrollment endpoint for the Building Wealth Together: Money,
 * Enterprise and Community Leadership course.
 *
 * GUARANTEES:
 *   - De-duplicates by (learner_id, course_slug); returns the existing row
 *     when one exists.
 *   - learner_id is derived from the authenticated session only; any
 *     client-supplied learner_id is ignored.
 *   - Only writes status='active', enrolled_at=now, updated_at=now on
 *     create. status='completed' and completed_at are NEVER set here —
 *     completion is deferred to the grading/completion functions.
 *   - The optional pathway focus is validated against the canonical list and
 *     may be set or changed by calling this function again. The focus frames
 *     the learner's study order; it never gates module content.
 *   - The server-controlled enrollmentOpen flag is the canonical gate for
 *     non-admin enrollment. Admins may call this function for testing while
 *     enrollment is closed.
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

    const requestedCourseSlug = typeof body.courseSlug === 'string' ? body.courseSlug : '';
    if (!wealthCourseExists(requestedCourseSlug)) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    // Optional pathway focus. An absent value leaves any existing focus
    // untouched; a supplied value must be one of the canonical options.
    let pathway: string | null = null;
    if (typeof body.pathway !== 'undefined' && body.pathway !== null && body.pathway !== '') {
      if (!isWealthPathwayFocus(body.pathway)) {
        return Response.json({ error: 'Invalid pathway' }, { status: 400 });
      }
      pathway = body.pathway as string;
    }

    // Enrollment gate for non-admins.
    if (!isAdmin && !isWealthEnrollmentOpen()) {
      return Response.json({ error: 'Enrollment closed' }, { status: 403 });
    }

    const learnerId = user.id;
    const now = new Date().toISOString();

    // De-dupe — return the existing row, updating the pathway focus when the
    // learner supplies one.
    const existing = await base44.asServiceRole.entities.CourseEnrollment.filter({
      learner_id: learnerId,
      course_slug: requestedCourseSlug,
    });

    if (existing && existing.length > 0) {
      const row = existing[0];
      if (pathway && row.pathway !== pathway) {
        const updated = await base44.asServiceRole.entities.CourseEnrollment.update(row.id, {
          pathway,
          updated_at: now,
        });
        return Response.json({ enrollment: updated, alreadyEnrolled: true });
      }
      return Response.json({ enrollment: row, alreadyEnrolled: true });
    }

    const initial: Record<string, unknown> = {
      learner_id: learnerId,
      course_slug: requestedCourseSlug,
      status: 'active',
      enrolled_at: now,
      updated_at: now,
    };
    if (pathway) initial.pathway = pathway;

    const created = await base44.asServiceRole.entities.CourseEnrollment.create(initial);

    try {
      await base44.analytics.track({
        eventName: 'course_enrolled',
        properties: { course_slug: requestedCourseSlug },
      });
    } catch (err) {
      console.warn('[enrollWealthCourse] analytics.track failed:', err && err.message);
    }

    return Response.json({ enrollment: created, alreadyEnrolled: false });
  } catch (error) {
    console.error('[enrollWealthCourse] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}