import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import {
  MENTAL_HEALTH_COURSE_SLUG,
  isModulePublished,
  getModuleConfig,
} from '../../shared/mental-health-curriculum.js';
import {
  MENTAL_HEALTH_CERTIFICATE_COURSE_TITLE,
  MENTAL_HEALTH_CERTIFICATE_STATEMENT,
  MENTAL_HEALTH_CERTIFICATE_COURSE_SLUG,
  MENTAL_HEALTH_CERTIFICATE_MODULE_ROUTES,
} from '../../shared/mental-health-certificate.js';

/**
 * issueMentalHealthCertificate — authenticated endpoint that issues
 * or retrieves a course-level certificate of completion for the
 * Mental Health, Community and Culture course.
 *
 * GUARANTEES:
 *   - Certificate is issued ONLY after server-verified course completion
 *     (all seven modules with ModuleProgress status='completed').
 *   - learner_id is derived exclusively from the authenticated session.
 *   - learner_name is the verified profile full_name from base44.auth.me().
 *     If no verified name is available, returns 409 directing the learner
 *     to update their profile.
 *   - certificate_id is a server-generated opaque UUID. No browser-supplied
 *     certificate_id, learner_name, or completed_at is accepted.
 *   - Idempotent: if a certificate already exists for this learner + course,
 *     the original certificate is returned unchanged (same certificate_id
 *     and issued_at).
 *   - No duplicate certificates are created.
 *
 * TRUST BOUNDARY:
 *   - Unauthenticated -> 401.
 *   - Unknown course -> 404.
 *   - Course not completed (fewer than 7 modules completed) -> 403.
 *   - Course unpublished or no enrollment -> 403.
 *   - Admin preview: returns a preview response with progressSaved: false,
 *     placeholder learner name, no certificate record created.
 *   - Any body containing certificate_id, learner_name, completed_at,
 *     issued_at, or status is rejected with 400.
 *
 * RESPONSE (success):
 *   {
 *     certificateId: string,
 *     learnerName: string,
 *     courseTitle: string,
 *     completedAt: string (ISO),
 *     issuedAt: string (ISO),
 *     completionStatement: string,
 *     progressSaved: true
 *   }
 *
 * RESPONSE (admin preview):
 *   {
 *     preview: true,
 *     progressSaved: false,
 *     learnerName: "Preview Learner",
 *     courseTitle: string,
 *     completionStatement: string
 *   }
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

    // Reject any browser-supplied protected field.
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

    const courseSlug =
      typeof body.courseSlug === 'string' ? body.courseSlug.trim() : '';

    if (!courseSlug || courseSlug !== MENTAL_HEALTH_CERTIFICATE_COURSE_SLUG) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    const isAdmin = user.role === 'admin';
    const isPreviewRequest = body.preview === true;

    // --- Administrator preview ---
    // Admins may request a preview of the certificate design without
    // issuing a real certificate. The preview uses placeholder data,
    // creates no record, and returns progressSaved: false.
    if (isAdmin && isPreviewRequest) {
      return Response.json({
        preview: true,
        progressSaved: false,
        learnerName: 'Preview Learner',
        courseTitle: MENTAL_HEALTH_CERTIFICATE_COURSE_TITLE,
        completionStatement: MENTAL_HEALTH_CERTIFICATE_STATEMENT,
      });
    }

    // --- Verify enrollment ---
    const enrollmentRows = await base44.asServiceRole.entities.CourseEnrollment.filter({
      learner_id: user.id,
      course_slug: courseSlug,
      status: 'active',
    });
    if (!enrollmentRows || enrollmentRows.length === 0) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    // --- Verify at least one module is published ---
    let anyPublished = false;
    for (const route of MENTAL_HEALTH_CERTIFICATE_MODULE_ROUTES) {
      if (isModulePublished(courseSlug, route)) {
        anyPublished = true;
        break;
      }
    }
    if (!anyPublished) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    // --- Verify all seven modules are completed ---
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
    for (const route of MENTAL_HEALTH_CERTIFICATE_MODULE_ROUTES) {
      const progress = progressMap[route];
      if (!progress || progress.status !== 'completed' || !progress.completed_at) {
        incompleteModules.push(route);
      }
    }

    if (incompleteModules.length > 0) {
      return Response.json({
        error: 'Course not completed',
        incompleteModules,
      }, { status: 403 });
    }

    // --- Verify learner has a profile name ---
    const learnerName = user.full_name;
    if (!learnerName || typeof learnerName !== 'string' || learnerName.trim().length === 0) {
      return Response.json({
        error: 'Profile name required',
        message: 'Please update your profile name before generating your certificate.',
      }, { status: 409 });
    }

    // --- Check for existing certificate (idempotency) ---
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

    // --- Determine the course completion date ---
    // Use the latest module completed_at as the course completion date.
    let courseCompletedAt: string | null = null;
    for (const route of MENTAL_HEALTH_CERTIFICATE_MODULE_ROUTES) {
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

    // --- Generate opaque certificate ID ---
    const certificateId = crypto.randomUUID();
    const issuedAt = new Date().toISOString();

    // --- Create the certificate record ---
    const created = await base44.asServiceRole.entities.CourseCertificate.create({
      learner_id: user.id,
      course_slug: courseSlug,
      certificate_id: certificateId,
      learner_name: learnerName.trim(),
      course_title: MENTAL_HEALTH_CERTIFICATE_COURSE_TITLE,
      completed_at: courseCompletedAt,
      issued_at: issuedAt,
      completion_statement: MENTAL_HEALTH_CERTIFICATE_STATEMENT,
    });

    return Response.json({
      certificateId: created.certificate_id || certificateId,
      learnerName: created.learner_name || learnerName.trim(),
      courseTitle: created.course_title || MENTAL_HEALTH_CERTIFICATE_COURSE_TITLE,
      completedAt: created.completed_at || courseCompletedAt,
      issuedAt: created.issued_at || issuedAt,
      completionStatement: created.completion_statement || MENTAL_HEALTH_CERTIFICATE_STATEMENT,
      progressSaved: true,
    });
  } catch (error) {
    console.error('[issueMentalHealthCertificate] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}