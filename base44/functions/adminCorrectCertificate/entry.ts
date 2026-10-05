import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';
import { getCourseConfig, getRequiredModuleRoutes } from '../../shared/course-registry.js';
import { generateCertificatePdfBase64 } from '../../shared/certificate-pdf.js';

/**
 * adminCorrectCertificate — administrator-only correction of the name on an
 * existing certificate, followed by a regenerated PDF and a resend.
 *
 * GUARANTEES:
 *   - Admin-only: anonymous and non-admin callers receive 403.
 *   - The learner account and the existing certificate for that learner +
 *     course are both verified before anything changes.
 *   - The certificate is emailed only to the address on the learner's own
 *     account. A caller-supplied recipient is never accepted, so a
 *     learner's certificate can never be mailed to an arbitrary address.
 *   - The original name is retained on the record (previous_learner_name)
 *     together with who made the correction and when.
 *   - Requires an explicit confirm:true, so a correction is never applied
 *     by an accidental call.
 *
 * Returns: { corrected, learner_name, previous_learner_name, emailed_to, certificate_id }
 */
export default async function (req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);

    let body: Record<string, unknown> = {};
    try {
      body = await req.json();
    } catch (_) {
      body = {};
    }

    const user = await base44.auth.me().catch(() => null);
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const learnerId = String(body.learner_id || '').trim();
    const courseSlug = String(body.course_slug || '').trim();
    const correctedName = String(body.learner_name || '').trim();

    if (!learnerId || !courseSlug || !correctedName) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (correctedName.length > 120) {
      return Response.json({ error: 'Name is too long' }, { status: 400 });
    }
    if (body.confirm !== true) {
      return Response.json({ error: 'Confirmation required' }, { status: 400 });
    }

    const courseConfig = getCourseConfig(courseSlug);
    if (!courseConfig) {
      return Response.json({ error: 'Unknown course' }, { status: 404 });
    }

    // --- Verify the learner account ---
    const learner = await base44.asServiceRole.entities.User.get(learnerId).catch(() => null);
    if (!learner || !learner.email) {
      return Response.json({ error: 'Learner account not found' }, { status: 404 });
    }

    // --- Verify the certificate belongs to this learner and course ---
    const certificateRows = await base44.asServiceRole.entities.CourseCertificate.filter({
      learner_id: learnerId,
      course_slug: courseSlug,
    });
    if (!certificateRows || certificateRows.length === 0) {
      return Response.json({ error: 'No certificate found for this learner and course' }, { status: 404 });
    }
    const certificate = certificateRows[0];
    const previousName = certificate.learner_name || null;

    // --- Apply the correction, keeping the original name for audit ---
    // previous_learner_name is only written the first time, so re-running a
    // correction never overwrites the name the certificate was first issued with.
    await base44.asServiceRole.entities.CourseCertificate.update(certificate.id, {
      learner_name: correctedName,
      previous_learner_name: certificate.previous_learner_name || previousName,
      corrected_at: new Date().toISOString(),
      corrected_by: user.email || user.id,
    });

    // --- Regenerate the PDF and resend to the learner's own account email ---
    const courseTitle = certificate.course_title || courseConfig.title;
    const completionStatement = certificate.completion_statement || courseConfig.completionStatement;
    const completedAt = certificate.completed_at || new Date().toISOString();
    const moduleCount = getRequiredModuleRoutes(courseSlug).length || 6;

    let emailedTo: string | null = null;
    let emailFailed = false;
    try {
      const pdfBase64 = await generateCertificatePdfBase64(
        {
          learnerName: correctedName,
          courseTitle,
          completedAt,
          completionStatement,
          certificateId: certificate.certificate_id,
        },
        moduleCount
      );

      const firstName = correctedName.split(' ')[0];
      const subject = `Your updated Tamu Academy Certificate — ${courseTitle}`;
      const textBody =
        `Dear ${firstName},\n\n` +
        `Your certificate for ${courseTitle} has been updated, and the corrected copy is attached to this email as a PDF.\n\n` +
        `You can also access it anytime from My Courses after signing in at https://tamuacademy.org\n\n` +
        `Asante for learning with us,\n` +
        `Tex Wambui, MPA\nTamu Academy\nhttps://tamuacademy.org`;
      const htmlBody =
        `<div style="font-family:Arial,Helvetica,sans-serif;color:#1A130E;line-height:1.7;max-width:600px;">` +
        `<p>Dear ${firstName},</p>` +
        `<p>Your certificate for <strong>${courseTitle}</strong> has been updated, and the corrected copy is attached to this email as a PDF.</p>` +
        `<p style="color:#4a3a2a;">You can also access it anytime from My Courses after signing in at <a href="https://tamuacademy.org" style="color:#D4A12A;">tamuacademy.org</a>.</p>` +
        `<p>Asante for learning with us,<br/><strong>Tex Wambui, MPA</strong><br/>Tamu Academy<br/>` +
        `<a href="https://tamuacademy.org" style="color:#D4A12A;">https://tamuacademy.org</a></p>` +
        `</div>`;

      await base44.asServiceRole.integrations.Core.SendEmail({
        to: learner.email,
        subject,
        text: textBody,
        html: htmlBody,
        attachments: [{ filename: 'Tamu-Academy-Certificate.pdf', content: pdfBase64 }],
      });
      emailedTo = learner.email;
    } catch (emailErr) {
      emailFailed = true;
      console.warn('[adminCorrectCertificate] Resend failed:', emailErr && emailErr.message);
    }

    return Response.json({
      corrected: true,
      certificate_id: certificate.certificate_id,
      learner_name: correctedName,
      previous_learner_name: previousName,
      emailed_to: emailedTo,
      email_failed: emailFailed,
    });
  } catch (error) {
    console.error('[adminCorrectCertificate] error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}