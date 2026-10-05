import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';
import { getCourseConfig, getRequiredModuleRoutes } from '../../shared/course-registry.js';
import { generateCertificatePdfBase64 } from '../../shared/certificate-pdf.js';
import { resolvePreferredName } from '../../shared/learner-name.js';

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
 *   - Admin-only. Issuing a certificate records a credential and emails
 *     the learner a PDF, so it must never be callable by an arbitrary
 *     public request. Every backend function has its own public URL; this
 *     gate is what stops a stranger from forging certificates. Returns 403
 *     for any non-admin caller. Workflows inject admin auth (the same
 *     authority the app's other workflow-triggered functions require), so
 *     the internal workflow path keeps working.
 *   - Issuance is still data-verified: the CourseEnrollment for this
 *     learner + course must exist with status "completed", and every field
 *     on the certificate is derived from server-side records rather than
 *     the request body. Admin authority does not bypass that check.
 *
 * Returns:
 *   {
 *     certificate_created: boolean,
 *     certificate_already_existed: boolean,
 *     certificate_id: string,
 *     verification_code: string (when a new certificate was created)
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
    // Admin-only. Every backend function has its own public URL, so this
    // gate is what stops an unauthenticated stranger from issuing a
    // certificate. Workflows inject admin auth — the same authority the
    // app's other workflow-triggered functions require.
    const user = await base44.auth.me().catch(() => null);
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Certificate fields are never taken from the request body — they are
    // derived from server-side records below. The enrollment must also
    // genuinely be completed before a certificate is issued.
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
      learnerName = resolvePreferredName(learner);
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

    // Email the learner a notification with the certificate attached as a
    // PDF so they can view it without logging in. Only sent when a new
    // certificate is created (not on idempotent re-calls). Failures are
    // logged but never block the certificate creation response.
    try {
      const learner = await base44.asServiceRole.entities.User.get(learnerId);
      const learnerEmail = learner?.email;
      if (learnerEmail) {
        const firstName = learnerName ? learnerName.split(' ')[0] : 'there';
        const subject = `Your Tamu Academy Certificate — ${courseTitle}`;
        const textBody =
          `Dear ${firstName},\n\n` +
          `Congratulations on completing ${courseTitle}! Your certificate of completion is attached to this email as a PDF.\n\n` +
          `You can also access it anytime from My Courses after signing in at https://tamuacademy.org\n\n` +
          `Asante for learning with us,\n` +
          `Tex Wambui, MPA\nTamu Academy\nhttps://tamuacademy.org`;
        const htmlBody =
          `<div style="font-family:Arial,Helvetica,sans-serif;color:#1A130E;line-height:1.7;max-width:600px;">` +
          `<p>Dear ${firstName},</p>` +
          `<p>Congratulations on completing <strong>${courseTitle}</strong>! Your certificate of completion is attached to this email as a PDF.</p>` +
          `<p style="color:#4a3a2a;">You can also access it anytime from My Courses after signing in at <a href="https://tamuacademy.org" style="color:#D4A12A;">tamuacademy.org</a>.</p>` +
          `<p>Asante for learning with us,<br/><strong>Tex Wambui, MPA</strong><br/>Tamu Academy<br/>` +
          `<a href="https://tamuacademy.org" style="color:#D4A12A;">https://tamuacademy.org</a></p>` +
          `</div>`;

        // Generate the certificate PDF as base64 for attachment.
        const moduleCount = getRequiredModuleRoutes(courseSlug).length || 6;
        const pdfBase64 = await generateCertificatePdfBase64(
          {
            learnerName,
            courseTitle,
            completedAt: completedAtValue,
            completionStatement: courseConfig.completionStatement,
            certificateId,
          },
          moduleCount
        );

        await base44.asServiceRole.integrations.Core.SendEmail({
          to: learnerEmail,
          subject,
          text: textBody,
          html: htmlBody,
          attachments: [{ filename: 'Tamu-Academy-Certificate.pdf', content: pdfBase64 }],
        });
      }
    } catch (emailErr) {
      console.warn('[issueCourseCertificate] Certificate email failed:', emailErr && emailErr.message);
    }

    // The caller is a verified admin or the internal workflow, so the
    // verification_code may be returned with the new certificate.
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