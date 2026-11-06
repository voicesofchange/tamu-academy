import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';
import { SOKO_COURSE_SLUG, SOKO_PEER_COURSE_SLUG } from '../../shared/sauti-za-soko-config.js';
import {
  issueLearnerCertificate,
  learnerCertificateBodyError,
} from '../../shared/certificate-issuance.js';

/**
 * issueSokoCertificate — retained endpoint for the Sauti za Soko core course
 * and Peer Facilitator track certificate pages.
 *
 * It no longer holds any rule or wording of its own: the request is forwarded
 * to the shared issuance module, which reads each course's completion rules
 * and certificate wording from the course registry. Both slugs keep their own
 * certificate, and the response is exactly the shape this endpoint has always
 * returned, so every existing certificate (its ID and download link) is
 * unaffected.
 *
 * Once the certificate pages call issueCourseCertificate with the course
 * slug, this endpoint can be retired.
 */
export default async function (req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);

    const user = await base44.auth.me().catch(() => null);
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let body: Record<string, unknown> = {};
    try {
      body = await req.json();
    } catch (_) {
      body = {};
    }

    const bodyError = learnerCertificateBodyError(body);
    if (bodyError) {
      return Response.json({ error: bodyError }, { status: 400 });
    }

    const result = await issueLearnerCertificate(base44, {
      user,
      body,
      restrictToCourseSlugs: [SOKO_COURSE_SLUG, SOKO_PEER_COURSE_SLUG],
    });

    return Response.json(result.body, { status: result.status });
  } catch (error) {
    console.error('[issueSokoCertificate] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}