import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';
import {
  sokoCourseExists,
  getSokoCertificateConfig,
  getSokoRequiredModuleRoutes,
  isSokoModulePublished,
} from '../../shared/sauti-za-soko-config.js';
import { resolvePreferredName } from '../../shared/learner-name.js';

/**
 * issueSokoCertificate — authenticated endpoint that issues or retrieves a
 * certificate for either Sauti za Soko course. The core course and the
 * Peer Facilitator track are separate courses with separate certificates,
 * as required.
 *
 * GUARANTEES:
 *   - Issued only after server-verified completion: every required module
 *     complete AND a CourseEnrollment with status 'completed'. That status
 *     is set only by the server-side completion path, which itself
 *     enforces the course-level requirements.
 *   - learner_id is derived exclusively from the authenticated session.
 *   - learner_name is the verified profile name. If none is available the
 *     response is 409 and a certificate is NOT created.
 *   - certificate_id is a server-generated opaque UUID. No browser-supplied
 *     certificate_id, learner_name, completed_at or statement is accepted.
 *   - Idempotent: an existing certificate is returned unchanged.
 *   - Admin preview returns a preview response and creates no record.
 */
const PROTECTED_BODY_FIELDS = new Set([
  'certificate_id',
  'certificateId',
  'learner_name',
  'learnerName',
  'completed_at',
  'completedAt',
  'issued_at',
  'issuedAt',
  'status',
  'course_title',
  'courseTitle',
  'completion_statement',
  'completionStatement',
]);

export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);

    let user = null;
    try {
      user = await base44.auth.me();
    } catch (_) {
      user = null;
    }
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let body: Record<string, unknown> = {};
    try {
      body = await req.json();
    } catch (_) {
      body = {};
    }

    for (const k of Object.keys(body)) {
      if (PROTECTED_BODY_FIELDS.has(k)) {
        return Response.json({ error: 'Unsupported field: ' + k }, { status: 400 });
      }
    }
    const allowedKeys = new Set(['courseSlug', 'preview']);
    for (const k of Object.keys(body)) {
      if (!allowedKeys.has(k)) {
        return Response.json({ error: 'Unsupported field: ' + k }, { status: 400 });
      }
    }

    const courseSlug = typeof body.courseSlug === 'string' ? body.courseSlug.trim() : '';
    if (!courseSlug || !sokoCourseExists(courseSlug)) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }
    const certConfig = getSokoCertificateConfig(courseSlug);
    if (!certConfig) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    const isAdmin = user.role === 'admin';

    if (isAdmin && body.preview === true) {
      return Response.json({
        preview: true,
        progressSaved: false,
        learnerName: 'Preview Learner',
        courseTitle: certConfig.title,
        completionStatement: certConfig.statement,
      });
    }

    const enrollmentRows = await base44.asServiceRole.entities.CourseEnrollment.filter({
      learner_id: user.id,
      course_slug: courseSlug,
      status: { $in: ['active', 'completed'] },
    });
    if (!enrollmentRows || enrollmentRows.length === 0) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const requiredRoutes = getSokoRequiredModuleRoutes(courseSlug);
    const anyPublished = requiredRoutes.some((route) => isSokoModulePublished(courseSlug, route));
    if (!anyPublished) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const progressRows = await base44.asServiceRole.entities.ModuleProgress.filter({
      learner_id: user.id,
      course_slug: courseSlug,
    });

    const progressMap: Record<string, { status: string; completed_at: string | null }> = {};
    if (Array.isArray(progressRows)) {
      for (const row of progressRows) {
        if (row && row.module_slug) {
          progressMap[row.module_slug] = {
            status: row.status || 'in_progress',
            completed_at: row.completed_at || null,
          };
        }
      }
    }

    const incompleteModules: string[] = [];
    for (const route of requiredRoutes) {
      const progress = progressMap[route];
      if (!progress || progress.status !== 'completed' || !progress.completed_at) {
        incompleteModules.push(route);
      }
    }
    if (incompleteModules.length > 0) {
      return Response.json({ error: 'Course not completed', incompleteModules }, { status: 403 });
    }

    const learnerName = resolvePreferredName(user);
    if (!learnerName || typeof learnerName !== 'string' || learnerName.trim().length === 0) {
      return Response.json({
        error: 'Profile name required',
        message: 'Please update your profile name before generating your certificate.',
      }, { status: 409 });
    }

    const existingCerts = await base44.asServiceRole.entities.CourseCertificate.filter({
      learner_id: user.id,
      course_slug: courseSlug,
    });
    if (existingCerts && existingCerts.length > 0) {
      const cert = existingCerts[0];
      return Response.json({
        certificateId: cert.certificate_id,
        learnerName: cert.learner_name,
        courseTitle: cert.course_title,
        completedAt: cert.completed_at,
        issuedAt: cert.issued_at,
        completionStatement: cert.completion_statement,
        progressSaved: true,
      });
    }

    // The certificate requires the server-side completed enrollment. A
    // learner whose modules are complete but whose course-level
    // requirements are not yet finalised is told to finish them.
    const completedEnrollment = (Array.isArray(enrollmentRows) ? enrollmentRows : []).find(
      (row) => row && row.status === 'completed',
    );
    if (!completedEnrollment) {
      return Response.json({
        error: 'Course requirements outstanding',
        message:
          'Your course is not yet marked complete. Finish your My Soko Action Plan sections, a peer discussion and the final reflection, then finalise your course.',
      }, { status: 409 });
    }

    let courseCompletedAt: string | null = completedEnrollment.completed_at || null;
    if (!courseCompletedAt) {
      for (const route of requiredRoutes) {
        const progress = progressMap[route];
        if (progress && progress.completed_at) {
          if (!courseCompletedAt || progress.completed_at > courseCompletedAt) {
            courseCompletedAt = progress.completed_at;
          }
        }
      }
    }
    if (!courseCompletedAt) courseCompletedAt = new Date().toISOString();

    const certificateId = crypto.randomUUID();
    const issuedAt = new Date().toISOString();

    const created = await base44.asServiceRole.entities.CourseCertificate.create({
      learner_id: user.id,
      course_slug: courseSlug,
      certificate_id: certificateId,
      learner_name: learnerName.trim(),
      course_title: certConfig.title,
      course_enrollment_id: completedEnrollment.id,
      completed_at: courseCompletedAt,
      issued_at: issuedAt,
      completion_statement: certConfig.statement,
    });

    return Response.json({
      certificateId: (created && created.certificate_id) || certificateId,
      learnerName: (created && created.learner_name) || learnerName.trim(),
      courseTitle: (created && created.course_title) || certConfig.title,
      completedAt: (created && created.completed_at) || courseCompletedAt,
      issuedAt: (created && created.issued_at) || issuedAt,
      completionStatement: (created && created.completion_statement) || certConfig.statement,
      progressSaved: true,
    });
  } catch (error) {
    console.error('[issueSokoCertificate] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}