import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';
import { getCourseConfig, getRequiredModuleRoutes } from '../../shared/course-registry.js';
import { generateCertificatePdfBase64 } from '../../shared/certificate-pdf.js';
import { resolvePreferredName } from '../../shared/learner-name.js';
import { learnerLanguage, localizeEmailCopy } from '../../shared/email-localization.js';
import { CERTIFICATE_EMAIL_COPY, buildCertificateEmail } from '../../shared/learner-emails.js';
import {
  certificateLocale,
  localizeCertificateLabels,
} from '../../shared/certificate-copy.js';
import {
  createCertificateRecord,
  findExistingCertificate,
  issueLearnerCertificate,
  learnerCertificateBodyError,
} from '../../shared/certificate-issuance.js';

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

    // --- Learner path ---
    // A learner's own certificate page calls this with just the course slug;
    // everything is derived from their session by the shared issuance module.
    // A request carrying learner_id is the admin/workflow path below.
    if (!body.learner_id && typeof body.courseSlug === 'string') {
      const bodyError = learnerCertificateBodyError(body);
      if (bodyError) {
        return Response.json({ error: bodyError }, { status: 400 });
      }
      const learner = await base44.auth.me().catch(() => null);
      if (!learner) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
      }
      const result = await issueLearnerCertificate(base44, { user: learner, body });
      return Response.json(result.body, { status: result.status });
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
    const existingCert = await findExistingCertificate(base44, learnerId, courseSlug);
    if (existingCert) {
      return Response.json({
        certificate_created: false,
        certificate_already_existed: true,
        certificate_id: existingCert.certificate_id,
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

    // The shared issuance module generates the opaque certificate ID and
    // verification code (neither exposes the learner's email or a database
    // ID) and writes the record with this course's wording.
    const { created, certificateId, verificationCode } = await createCertificateRecord(base44, {
      learnerId,
      courseSlug,
      learnerName,
      completedAt: completedAtValue,
      enrollmentId,
      withVerificationCode: true,
    });

    // Email the learner a notification with the certificate attached as a
    // PDF so they can view it without logging in. Only sent when a new
    // certificate is created (not on idempotent re-calls). Failures are
    // logged but never block the certificate creation response.
    try {
      const learner = await base44.asServiceRole.entities.User.get(learnerId);
      const learnerEmail = learner?.email;
      if (learnerEmail) {
        // The email and the attached certificate are written in the
        // learner's own language; the learner's name and the course title are
        // the certificate's recorded values and are never translated.
        const language = learnerLanguage(learner);
        const copy = await localizeEmailCopy(base44, language, CERTIFICATE_EMAIL_COPY);
        const { subject, text: textBody, html: htmlBody } = buildCertificateEmail(copy, {
          learnerName,
          courseTitle,
        });

        const labels = await localizeCertificateLabels(base44, language);
        const locale = certificateLocale(language);

        // Generate the certificate PDF as base64 for attachment.
        const moduleCount = getRequiredModuleRoutes(courseSlug).length || 6;
        const pdfBase64 = await generateCertificatePdfBase64(
          {
            learnerName,
            courseTitle,
            completedAt: completedAtValue,
            completionStatement: courseConfig.completionStatement,
            certificateId,
            copy: labels,
            locale,
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