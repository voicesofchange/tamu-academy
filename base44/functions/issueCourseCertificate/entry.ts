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
 * SECURITY:
 *   - Authenticated callers (direct HTTP): must be the owner of the
 *     learner_id or an admin. Returns 403 otherwise.
 *   - Unauthenticated callers (internal workflow): must pass a data
 *     integrity check — the CourseEnrollment record for this learner
 *     + course must exist with status "completed". This prevents
 *     unauthenticated attackers from forging certificates for
 *     incomplete or nonexistent enrollments.
 *   - The verification_code is ONLY returned to authenticated callers
 *     (the learner or an admin). Unauthenticated callers receive the
 *     certificate_id but not the verification_code, preventing
 *     credential exposure to anonymous HTTP requests.
 *
 * Returns:
 *   {
 *     certificate_created: boolean,
 *     certificate_already_existed: boolean,
 *     certificate_id: string,
 *     verification_code: string (only for authenticated callers, when newly created)
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

    if (!learnerId || !courseSlug) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const courseConfig = getCourseConfig(courseSlug);
    if (!courseConfig) {
      return Response.json({ error: 'Unknown course' }, { status: 404 });
    }

    // --- Authentication / Authorization ---
    // Authenticated callers must own the learner_id or be an admin.
    // All callers (authenticated or internal workflow) must pass a data
    // integrity check: the CourseEnrollment record must exist with
    // status "completed" for this learner + course. Client-supplied
    // learner_name, course_title, completed_at, and enrollment_id are
    // NOT trusted — they are derived from server-side records below.
    let user: { id: string; role?: string } | null = null;
    try {
      user = await base44.auth.me();
    } catch (_) {
      user = null;
    }

    if (user) {
      // Authenticated direct call — verify ownership or admin.
      if (user.id !== learnerId && user.role !== 'admin') {
        return Response.json({ error: 'Forbidden' }, { status: 403 });
      }
    }

    // Always verify the enrollment is genuinely completed before issuing
    // a certificate. Applies to both authenticated direct callers and
    // the internal workflow path.
    const enrollmentRows = await base44.asServiceRole.entities.CourseEnrollment.filter({
      learner_id: learnerId,
      course_slug: courseSlug,
      status: 'completed',
    });
    if (!enrollmentRows || enrollmentRows.length === 0) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const enrollment = enrollmentRows[0];

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

    // Derive all certificate fields from server-side records — never
    // trust client-supplied learner_name, course_title, completed_at,
    // or enrollment_id.
    let learnerName: string | null = null;
    try {
      const learner = await base44.asServiceRole.entities.User.get(learnerId);
      learnerName = learner?.full_name || null;
    } catch (_) {
      learnerName = null;
    }
    if (!learnerName) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const courseTitle = courseConfig.title;
    const completedAtValue = enrollment.completed_at || new Date().toISOString();
    const enrollmentId = enrollment.id;

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
      completed_at: completedAtValue,
      issued_at: issuedAt,
      status: 'valid',
      completion_statement: courseConfig.completionStatement,
    });

    // Email the learner a notification with a link to view and download
    // their certificate. Only sent when a new certificate is created
    // (not on idempotent re-calls). Failures are logged but never block
    // the certificate creation response.
    try {
      const learner = await base44.asServiceRole.entities.User.get(learnerId);
      const learnerEmail = learner?.email;
      if (learnerEmail) {
        const certUrl = `https://tamuacademy.org/courses/${courseSlug}/certificate`;
        const firstName = learnerName ? learnerName.split(' ')[0] : 'there';
        const subject = `Your Tamu Academy Certificate — ${courseTitle}`;
        const textBody =
          `Dear ${firstName},\n\n` +
          `Congratulations on completing ${courseTitle}! Your certificate of completion is now ready.\n\n` +
          `View and download your certificate here:\n${certUrl}\n\n` +
          `You can also access it anytime from My Courses after signing in.\n\n` +
          `Asante for learning with us,\n` +
          `Tex Wambui, MPA\nTamu Academy\nhttps://tamuacademy.org`;
        const htmlBody =
          `<div style="font-family:Arial,Helvetica,sans-serif;color:#1A130E;line-height:1.7;max-width:600px;">` +
          `<p>Dear ${firstName},</p>` +
          `<p>Congratulations on completing <strong>${courseTitle}</strong>! Your certificate of completion is now ready.</p>` +
          `<p><a href="${certUrl}" style="color:#D4A12A;">View and download your certificate</a></p>` +
          `<p style="color:#4a3a2a;">You can also access it anytime from My Courses after signing in.</p>` +
          `<p>Asante for learning with us,<br/><strong>Tex Wambui, MPA</strong><br/>Tamu Academy<br/>` +
          `<a href="https://tamuacademy.org" style="color:#D4A12A;">https://tamuacademy.org</a></p>` +
          `</div>`;
        await base44.asServiceRole.integrations.Core.SendEmail({
          to: learnerEmail,
          subject,
          body: textBody,
          html: htmlBody,
        });
      }
    } catch (emailErr) {
      console.warn('[issueCourseCertificate] Certificate email failed:', emailErr && emailErr.message);
    }

    // Only return the verification_code to authenticated callers (the
    // learner or an admin). Unauthenticated callers (the internal workflow)
    // do not need it — the workflow does not use the return value — and
    // returning it would expose a credential to anonymous HTTP callers.
    const response: Record<string, unknown> = {
      certificate_created: true,
      certificate_already_existed: false,
      certificate_id: created?.certificate_id || certificateId,
    };
    if (user) {
      response.verification_code = created?.verification_code || verificationCode;
    }
    return Response.json(response);
  } catch (error) {
    console.error('[issueCourseCertificate] Error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}