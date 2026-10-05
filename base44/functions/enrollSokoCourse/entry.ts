import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';
import {
  SOKO_COURSE_SLUG,
  SOKO_PEER_COURSE_SLUG,
  sokoCourseExists,
  isSokoEnrollmentOpen,
} from '../../shared/sauti-za-soko-config.js';

/**
 * Authenticated enrollment endpoint for the two Sauti za Soko courses:
 * the seven-module core course and the optional Peer Facilitator track.
 *
 * GUARANTEES:
 *   - De-duplicates by (learner_id, course_slug); returns the existing row
 *     when one already exists.
 *   - learner_id is derived from the authenticated session only; any
 *     client-supplied learner_id is ignored.
 *   - Only writes status='active', enrolled_at=now, updated_at=now on
 *     create. status='completed' and completed_at are NEVER set here.
 *   - The server-controlled enrollment flag is the canonical gate for
 *     non-admin enrollment. While false (the current development state),
 *     ordinary authenticated users receive 403 even with the correct
 *     course slug. Admins may call this function while enrollment is
 *     closed so the pathway can be previewed end to end.
 *   - The Peer Facilitator track additionally requires the core course to
 *     have been started, so the optional track cannot be entered first.
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
    if (!sokoCourseExists(requestedCourseSlug)) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    if (!isAdmin && !isSokoEnrollmentOpen()) {
      return Response.json({ error: 'Enrollment closed' }, { status: 403 });
    }

    const learnerId = user.id;
    const now = new Date().toISOString();

    // The Peer Facilitator track is entered only after the core course.
    if (requestedCourseSlug === SOKO_PEER_COURSE_SLUG && !isAdmin) {
      const coreEnrollment = await base44.asServiceRole.entities.CourseEnrollment.filter({
        learner_id: learnerId,
        course_slug: SOKO_COURSE_SLUG,
        status: { $in: ['active', 'completed'] },
      });
      if (!coreEnrollment || coreEnrollment.length === 0) {
        return Response.json({ error: 'Core course required' }, { status: 403 });
      }
    }

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
        properties: { course_slug: requestedCourseSlug },
      });
    } catch (err) {
      console.warn('[enrollSokoCourse] analytics.track failed:', err && err.message);
    }

    return Response.json({ enrollment: created, alreadyEnrolled: false });
  } catch (error) {
    console.error('[enrollSokoCourse] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}