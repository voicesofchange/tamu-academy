import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';
import { getCourseConfig } from '../../shared/course-registry.js';

/**
 * issueCourseCertificate — workflow-facing backend function.
 *
 * Called after the workflow confirms no certificate already exists for
 * the learner + course. Creates a new CourseCertificate record with:
 *   - certificate_id: a server-generated opaque UUID (crypto.randomUUID)
 *   - verification_code: an opaque alphanumeric code prefixed "TAMU-"
 *   - status: "valid"
 *   - course_enrollment_id: the id of the completed enrollment
 *   - completed_at / issued_at: ISO timestamps
 *   - completion_statement: from the course registry
 *
 * Neither certificate_id nor verification_code exposes the learner's
 * email address or any internal database identifier.
 *
 * Includes a server-side idempotency guard: if a certificate already
 * exists (race condition or duplicate trigger), no new certificate is
 * created and the existing certificate_id is returned.
 *
 * This function does NOT touch ModuleProgress, so it cannot re-trigger
 * the workflow.
 *
 * Returns:
 *   {
 *     certificate_created: boolean,
 *     certificate_already_existed: boolean,
 *     certificate_id: string,
 *     verification_code: string (only when newly created)
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
    const enrollmentId = String(body.enrollment_id || '');
    const learnerName = String(body.learner_name || '');
    const courseTitle = String(body.course_title || '');
    const completedAt = String(body.completed_at || '');

    if (!learnerId || !courseSlug || !enrollmentId || !learnerName || !courseTitle || !completedAt) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const courseConfig = getCourseConfig(courseSlug);
    if (!courseConfig) {
      return Response.json({ error: 'Unknown course' }, { status: 404 });
    }

    // Idempotency guard — double-check no certificate exists.
    const existingCerts = await base44.asServiceRole.entities.CourseCertificate.filter({
      learner_id: learnerId,
      course_slug: courseSlug,
    });

    if (Array.isArray(existingCerts) && existingCerts.length > 0) {
      const cert = existingCerts[0];
      return Response.json({
        certificate_created: false,
        certificate_already_existed: true,
        certificate_id: cert.certificate_id,
      });
    }

    // Generate opaque certificate ID and verification code.
    // Neither value exposes the learner's email or any database ID.
    const certificateId = crypto.randomUUID();
    const verificationCode = 'TAMU-' + crypto.randomUUID().replace(/-/g, '').substring(0, 8).toUpperCase();
    const issuedAt = new Date().toISOString();

    // Create the certificate record.
    const created = await base44.asServiceRole.entities.CourseCertificate.create({
      learner_id: learnerId,
      course_slug: courseSlug,
      certificate_id: certificateId,
      verification_code: verificationCode,
      learner_name: learnerName,
      course_title: courseTitle,
      course_enrollment_id: enrollmentId,
      completed_at: completedAt,
      issued_at: issuedAt,
      status: 'valid',
      completion_statement: courseConfig.completionStatement,
    });

    return Response.json({
      certificate_created: true,
      certificate_already_existed: false,
      certificate_id: created?.certificate_id || certificateId,
      verification_code: created?.verification_code || verificationCode,
    });
  } catch (error) {
    console.error('[issueCourseCertificate] Error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}