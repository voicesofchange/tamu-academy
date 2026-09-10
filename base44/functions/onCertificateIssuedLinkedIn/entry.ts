/**
 * onCertificateIssuedLinkedIn — handler for the CourseCertificate
 * create workflow trigger. Counts total valid certificates; if the
 * count is a configured milestone (1, 10, 25, 50, 100, ...), formats a
 * community-milestone message and posts it to the configured LinkedIn
 * organization page(s) via the shared helper.
 *
 * Idempotent: the shared helper dedups on (event_type, ref_id) where
 * ref_id is the milestone count string, so each milestone posts once.
 */
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.48';
import { postToLinkedInOrgs } from '../../shared/linkedin-post.js';
import { SITE_URL, CERTIFICATE_MILESTONES } from '../../shared/linkedin-posting-config.js';

export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const certificateId = body.certificate_id || body.entity_id;

    // Count all valid certificates (service role bypasses RLS).
    const certs = await base44.entities.CourseCertificate.filter({ status: 'valid' }).catch(() => []);
    const count = Array.isArray(certs) ? certs.length : 0;

    if (!CERTIFICATE_MILESTONES.includes(count)) {
      return Response.json({ milestone: false, certificate_count: count, certificate_id: certificateId || null });
    }

    const message =
      `Milestone: ${count} learner${count === 1 ? ' has' : 's have'} now completed a Tamu Academy course and earned a certificate. ` +
      `Explore our free, culturally grounded courses: ${SITE_URL}/courses`;

    const result = await postToLinkedInOrgs(base44, {
      message,
      event_type: 'certificate_milestone',
      ref_id: String(count),
    });

    return Response.json({ milestone: true, certificate_count: count, result });
  } catch (error) {
    console.error('[onCertificateIssuedLinkedIn] Error:', error && error.message);
    return Response.json({ error: 'Internal error', details: error && error.message }, { status: 500 });
  }
}