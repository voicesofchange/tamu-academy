import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { WEALTH_COURSE_SLUG } from '../../shared/building-wealth-together-config.js';
import {
  issueLearnerCertificate,
  learnerCertificateBodyError,
} from '../../shared/certificate-issuance.js';

/**
 * issueWealthCertificate — retained endpoint for the Building Wealth Together
 * certificate page.
 *
 * It no longer holds any rule or wording of its own: the request is forwarded
 * to the shared issuance module, which reads this course's completion rules
 * (all nine modules plus the submitted capstone) and certificate wording from
 * the course registry. The response is exactly the shape this endpoint has
 * always returned, so the page and every existing certificate (its ID and
 * download link) are unaffected.
 *
 * Once the certificate page calls issueCourseCertificate with the course
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
      restrictToCourseSlugs: [WEALTH_COURSE_SLUG],
    });

    return Response.json(result.body, { status: result.status });
  } catch (error) {
    console.error('[issueWealthCertificate] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}