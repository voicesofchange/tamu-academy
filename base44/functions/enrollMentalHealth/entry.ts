import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

/**
 * Authenticated enrollment endpoint for the Mental Health pillar course.
 *
 * Phase 1: Provisions the future access path. Enrollment records are
 * created using the service role specifically because direct learner
 * creation is blocked by the CourseEnrollment entity's RLS rule
 * (create/update/delete limited to admins / service role). The learner
 * ID is derived from the authenticated request and is NEVER read from
 * the body.
 *
 * Guarantees (matched against implementation requirement #6):
 *   1. Obtains the current user from the authenticated request.
 *   2. Never accepts learner_id from the browser.
 *   3. Validates the requested course slug against the approved list.
 *   4. Prevents duplicate enrollment (returns existing row when found).
 *   5. Returns the enrollment record (or the existing one).
 *   6. Not exposed via a public UI button during development.
 *
 * Completion counters such as status:'completed' or completed_at cannot
 * be set through this endpoint — only the initial enrollment row is
 * created here with status='active' and enrolled_at set to now.
 */

const COURSE_SLUG = 'ubuntu-and-mental-health';

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

    let body = {};
    try {
      body = await req.json();
    } catch (err) {
      body = {};
    }

    // Phase 1: only the foundational course is enrollable.
    const requestedCourseSlug =
      typeof body.courseSlug === 'string' ? body.courseSlug : '';
    if (requestedCourseSlug !== COURSE_SLUG) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    // Block direct client-supplied learner_id by ignoring it entirely.
    // The learner's own ID is the only one used here.
    const learnerId = user.id;
    const now = new Date().toISOString();

    // Check for an existing enrollment. Use the service-role client
    // because the RLS read rule (owner-or-admin) blocks an app-user
    // token from listing across all rows. Service role bypasses RLS for
    // this trusted lookup.
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
    });

    return Response.json({ enrollment: created, alreadyEnrolled: false });
  } catch (error) {
    console.error('[enrollMentalHealth] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}