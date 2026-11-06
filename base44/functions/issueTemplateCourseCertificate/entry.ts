import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';
import { TEMPLATE_COURSE_REGISTRY } from '../../shared/course-template-config.js';
import {
  issueLearnerCertificate,
  learnerCertificateBodyError,
} from '../../shared/certificate-issuance.js';

/**
 * issueTemplateCourseCertificate — the certificate endpoint for every course
 * built with the course template.
 *
 * It is the learner path of the shared issuance logic, restricted to template
 * courses: the title, completion statement, required modules, publication gate
 * and certificate rules all come from the course's registry entry, and every
 * certificate value is derived from server-side records. Nothing about a
 * course lives in this function.
 *
 * A caller may send only { courseSlug } (and `preview: true` as an admin), so
 * a browser can never supply a name, date, status or completion statement.
 * An administrator who cannot yet be issued one receives a preview instead, so
 * the certificate stays reviewable.
 */
export default async function (req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);

    const user = await base44.auth.me().catch(() => null);
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    let body: Record<string, unknown> = {};
    try {
      body = await req.json();
    } catch (_) {
      body = {};
    }

    const bodyError = learnerCertificateBodyError(body);
    if (bodyError) return Response.json({ error: bodyError }, { status: 400 });

    const result = await issueLearnerCertificate(base44, {
      user,
      body,
      restrictToCourseSlugs: Object.keys(TEMPLATE_COURSE_REGISTRY),
    });

    return Response.json(result.body, { status: result.status });
  } catch (error) {
    console.error('[issueTemplateCourseCertificate] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}