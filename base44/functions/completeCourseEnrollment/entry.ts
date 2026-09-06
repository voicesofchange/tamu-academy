import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';
import { getCourseConfig } from '../../shared/course-registry.js';

/**
 * completeCourseEnrollment — workflow-facing backend function.
 *
 * Called after the workflow confirms the final module is complete AND
 * every required module is complete. This function:
 *   1. Finds the learner's CourseEnrollment record.
 *   2. Updates it to status "completed" with progress_percentage 100,
 *      certificate_eligible true, completed_at set to now, and
 *      last_module_slug set to the final module.
 *   3. Checks whether a CourseCertificate already exists for this
 *      learner + course (so the workflow can branch visibly).
 *   4. Looks up the learner's full_name from the User entity for the
 *      certificate.
 *
 * This function does NOT touch ModuleProgress, so it cannot re-trigger
 * the workflow.
 *
 * Returns:
 *   {
 *     enrollment_id: string,
 *     certificate_exists: boolean,
 *     existing_certificate_id: string | null,
 *     learner_name: string | null,
 *     course_title: string,
 *     completed_at: string (ISO),
 *     learner_id: string,
 *     course_slug: string
 *   }
 */
export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);

    let body: Record<string, unknown> = {};
    try {
      body = await req.json();
    } catch (_) {
      body = {};
    }

    const learnerId = String(body.learner_id || '');
    const courseSlug = String(body.course_slug || '');
    const finalModuleSlug = String(body.final_module_slug || '');

    if (!learnerId || !courseSlug || !finalModuleSlug) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const courseConfig = getCourseConfig(courseSlug);
    if (!courseConfig) {
      return Response.json({ error: 'Unknown course' }, { status: 404 });
    }

    // Find the enrollment record.
    const enrollmentRows = await base44.asServiceRole.entities.CourseEnrollment.filter({
      learner_id: learnerId,
      course_slug: courseSlug,
    });

    if (!enrollmentRows || enrollmentRows.length === 0) {
      return Response.json({ error: 'Enrollment not found' }, { status: 404 });
    }

    const enrollment = enrollmentRows[0];
    const nowIso = new Date().toISOString();

    // Update enrollment to completed.
    await base44.asServiceRole.entities.CourseEnrollment.update(enrollment.id, {
      status: 'completed',
      completed_at: nowIso,
      last_module_slug: finalModuleSlug,
      progress_percentage: 100,
      certificate_eligible: true,
      updated_at: nowIso,
    });

    // Check for an existing certificate (idempotency support for the
    // workflow's visible branch).
    const existingCerts = await base44.asServiceRole.entities.CourseCertificate.filter({
      learner_id: learnerId,
      course_slug: courseSlug,
    });

    const certificateExists = Array.isArray(existingCerts) && existingCerts.length > 0;

    // Look up the learner's display name for the certificate.
    let learnerName: string | null = null;
    try {
      const user = await base44.asServiceRole.entities.User.get(learnerId);
      learnerName = user?.full_name || null;
    } catch (_) {
      learnerName = null;
    }

    return Response.json({
      enrollment_id: enrollment.id,
      certificate_exists: certificateExists,
      existing_certificate_id: certificateExists ? existingCerts[0].certificate_id : null,
      learner_name: learnerName,
      course_title: courseConfig.title,
      completed_at: nowIso,
      learner_id: learnerId,
      course_slug: courseSlug,
    });
  } catch (error) {
    console.error('[completeCourseEnrollment] Error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}