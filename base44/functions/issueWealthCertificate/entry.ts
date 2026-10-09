import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import {
  WEALTH_COURSE_SLUG,
  WEALTH_CERTIFICATE_COURSE_TITLE,
  WEALTH_CERTIFICATE_STATEMENT,
  WEALTH_MODULE_ROUTES,
  isWealthModulePublished,
} from '../../shared/building-wealth-together-config.js';
import { resolvePreferredName } from '../../shared/learner-name.js';

/**
 * issueWealthCertificate — authenticated endpoint that issues or retrieves a
 * course-level certificate of completion for the Building Wealth Together
 * course.
 *
 * GUARANTEES:
 *   - Certificate is issued ONLY after server-verified course completion:
 *     all nine modules with ModuleProgress status='completed', AND a
 *     submitted capstone project.
 *   - learner_id is derived exclusively from the authenticated session.
 *   - learner_name is the verified profile name from base44.auth.me(). If no
 *     verified name is available, returns 409.
 *   - certificate_id is a server-generated opaque UUID. No browser-supplied
 *     certificate_id, learner_name, or completed_at is accepted.
 *   - Idempotent: an existing certificate is returned unchanged.
 *
 * TRUST BOUNDARY:
 *   - Unauthenticated -> 401.
 *   - Unknown course -> 404.
 *   - Course or capstone not completed -> 403.
 *   - Course unpublished or no enrollment -> 403.
 *   - Admin preview: returns a preview response with progressSaved:false,
 *     placeholder learner name, and no certificate record created.
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
    if (courseSlug !== WEALTH_COURSE_SLUG) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    const isAdmin = user.role === 'admin';
    const isPreviewRequest = body.preview === true;

    if (isAdmin && isPreviewRequest) {
      return Response.json({
        preview: true,
        progressSaved: false,
        learnerName: 'Preview Learner',
        courseTitle: WEALTH_CERTIFICATE_COURSE_TITLE,
        completionStatement: WEALTH_CERTIFICATE_STATEMENT,
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

    let anyPublished = false;
    for (const route of WEALTH_MODULE_ROUTES) {
      if (isWealthModulePublished(courseSlug, route)) {
        anyPublished = true;
        break;
      }
    }
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

    // All nine modules must be complete, and the capstone must be submitted.
    const outstanding: string[] = [];
    for (const route of WEALTH_MODULE_ROUTES) {
      const progress = progressMap[route];
      if (!progress || progress.status !== 'completed' || !progress.completed_at) {
        outstanding.push(route);
      }
    }

    const capstoneRows = await base44.asServiceRole.entities.WealthCapstone.filter({
      learner_id: user.id,
      course_slug: courseSlug,
    });
    const capstoneRow = capstoneRows && capstoneRows.length > 0 ? capstoneRows[0] : null;
    if (!capstoneRow || !capstoneRow.submitted_at) {
      outstanding.push('capstone');
    }

    if (outstanding.length > 0) {
      return Response.json({ error: 'Course not completed', incompleteModules: outstanding }, { status: 403 });
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

    // Course completion date = latest module completed_at.
    let courseCompletedAt: string | null = null;
    for (const route of WEALTH_MODULE_ROUTES) {
      const progress = progressMap[route];
      if (progress && progress.completed_at) {
        if (!courseCompletedAt || progress.completed_at > courseCompletedAt) {
          courseCompletedAt = progress.completed_at;
        }
      }
    }
    if (!courseCompletedAt) {
      courseCompletedAt = new Date().toISOString();
    }

    const certificateId = crypto.randomUUID();
    const issuedAt = new Date().toISOString();

    const created = await base44.asServiceRole.entities.CourseCertificate.create({
      learner_id: user.id,
      course_slug: courseSlug,
      certificate_id: certificateId,
      learner_name: learnerName.trim(),
      course_title: WEALTH_CERTIFICATE_COURSE_TITLE,
      completed_at: courseCompletedAt,
      issued_at: issuedAt,
      completion_statement: WEALTH_CERTIFICATE_STATEMENT,
    });

    return Response.json({
      certificateId: (created && created.certificate_id) || certificateId,
      learnerName: (created && created.learner_name) || learnerName.trim(),
      courseTitle: (created && created.course_title) || WEALTH_CERTIFICATE_COURSE_TITLE,
      completedAt: (created && created.completed_at) || courseCompletedAt,
      issuedAt: (created && created.issued_at) || issuedAt,
      completionStatement: (created && created.completion_statement) || WEALTH_CERTIFICATE_STATEMENT,
      progressSaved: true,
    });
  } catch (error) {
    console.error('[issueWealthCertificate] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}