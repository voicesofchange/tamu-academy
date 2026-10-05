import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';
import {
  WAIYAKI_CERTIFICATE_COURSE_SLUG,
  WAIYAKI_CERTIFICATE_COURSE_TITLE,
  WAIYAKI_CERTIFICATE_STATEMENT,
  WAIYAKI_CERTIFICATE_MODULE_ROUTES,
  isWaiyakiCoursePublished,
  isWaiyakiModulePublished,
  checkWaiyakiCourseCompletionRequirements,
} from '../../shared/waiyaki-config.js';
import { resolvePreferredName } from '../../shared/learner-name.js';

/**
 * issueWaiyakiCertificate — authenticated endpoint that issues or retrieves
 * the course-level certificate of completion for the Waiyaki wa Hinga:
 * Leadership, Resistance and Historical Memory course.
 *
 * GUARANTEES:
 *   - Certificate is issued ONLY after server-verified course completion:
 *     all five modules with ModuleProgress status='completed', AND the final
 *     assessment passed, AND the written final project submitted. The last
 *     two are re-checked here through the shared course-config check, so a
 *     learner cannot skip them.
 *   - learner_id is derived exclusively from the authenticated session.
 *   - learner_name is the verified profile name. If none is available the
 *     response is 409 so the page can ask the learner to set it.
 *   - certificate_id is a server-generated opaque UUID; verification_code is
 *     an opaque alphanumeric code. No browser-supplied certificate_id,
 *     learner_name, completed_at or statement is accepted.
 *   - Idempotent: an existing certificate is returned unchanged.
 *   - On a first successful issue the learner's enrollment is finalized to
 *     status='completed' with completed_at, so My Courses reflects it.
 *
 * TRUST BOUNDARY:
 *   - Unauthenticated -> 401.
 *   - Unknown course -> 404.
 *   - Course not completed -> 403 (with the outstanding requirements).
 *   - Course unpublished or no enrollment -> 403.
 *   - Admin preview: returns a preview response, creates no record.
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
    if (!courseSlug || courseSlug !== WAIYAKI_CERTIFICATE_COURSE_SLUG) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    const isAdmin = user.role === 'admin';
    const isPreviewRequest = body.preview === true;

    if (isAdmin && isPreviewRequest) {
      return Response.json({
        preview: true,
        progressSaved: false,
        learnerName: 'Preview Learner',
        courseTitle: WAIYAKI_CERTIFICATE_COURSE_TITLE,
        completionStatement: WAIYAKI_CERTIFICATE_STATEMENT,
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
    const enrollment = enrollmentRows[0];

    if (!isWaiyakiCoursePublished(courseSlug)) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    // All five modules must be genuinely complete.
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
    for (const route of WAIYAKI_CERTIFICATE_MODULE_ROUTES) {
      const progress = progressMap[route];
      if (!progress || progress.status !== 'completed' || !progress.completed_at) {
        incompleteModules.push(route);
      }
    }
    if (incompleteModules.length > 0) {
      return Response.json(
        { error: 'Course not completed', incompleteModules },
        { status: 403 },
      );
    }

    // The two extra requirements: assessment passed and project submitted.
    const extra = await checkWaiyakiCourseCompletionRequirements(
      base44,
      user.id,
      courseSlug,
    );
    if (!extra.ok) {
      return Response.json(
        { error: 'Course requirements outstanding', missing: extra.missing },
        { status: 403 },
      );
    }

    const learnerName = resolvePreferredName(user);
    if (!learnerName || typeof learnerName !== 'string' || learnerName.trim().length === 0) {
      return Response.json(
        {
          error: 'Profile name required',
          message: 'Please update your profile name before generating your certificate.',
        },
        { status: 409 },
      );
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

    // Course completion date = the latest module completion.
    let courseCompletedAt: string | null = null;
    for (const route of WAIYAKI_CERTIFICATE_MODULE_ROUTES) {
      const progress = progressMap[route];
      if (progress && progress.completed_at) {
        if (!courseCompletedAt || progress.completed_at > courseCompletedAt) {
          courseCompletedAt = progress.completed_at;
        }
      }
    }
    if (!courseCompletedAt) courseCompletedAt = new Date().toISOString();

    const certificateId = crypto.randomUUID();
    const verificationCode =
      'TAMU-' + crypto.randomUUID().replace(/-/g, '').substring(0, 8).toUpperCase();
    const issuedAt = new Date().toISOString();

    const created = await base44.asServiceRole.entities.CourseCertificate.create({
      learner_id: user.id,
      course_slug: courseSlug,
      certificate_id: certificateId,
      verification_code: verificationCode,
      learner_name: learnerName.trim(),
      course_title: WAIYAKI_CERTIFICATE_COURSE_TITLE,
      course_enrollment_id: enrollment.id,
      completed_at: courseCompletedAt,
      issued_at: issuedAt,
      status: 'valid',
      completion_statement: WAIYAKI_CERTIFICATE_STATEMENT,
    });

    // Finalize the enrollment so My Courses shows the course as completed.
    try {
      if (enrollment.status !== 'completed') {
        await base44.asServiceRole.entities.CourseEnrollment.update(enrollment.id, {
          status: 'completed',
          completed_at: courseCompletedAt,
          last_module_slug: WAIYAKI_CERTIFICATE_MODULE_ROUTES[
            WAIYAKI_CERTIFICATE_MODULE_ROUTES.length - 1
          ],
          progress_percentage: 100,
          certificate_eligible: true,
          updated_at: issuedAt,
        });
      }
    } catch (enrollErr) {
      console.warn(
        '[issueWaiyakiCertificate] Could not finalize enrollment:',
        enrollErr && enrollErr.message,
      );
    }

    try {
      await base44.analytics.track({
        eventName: 'course_completed',
        properties: { course_slug: courseSlug },
      });
    } catch (err) {
      console.warn('[issueWaiyakiCertificate] analytics.track failed:', err && err.message);
    }

    return Response.json({
      certificateId: (created && created.certificate_id) || certificateId,
      learnerName: (created && created.learner_name) || learnerName.trim(),
      courseTitle: (created && created.course_title) || WAIYAKI_CERTIFICATE_COURSE_TITLE,
      completedAt: (created && created.completed_at) || courseCompletedAt,
      issuedAt: (created && created.issued_at) || issuedAt,
      completionStatement:
        (created && created.completion_statement) || WAIYAKI_CERTIFICATE_STATEMENT,
      progressSaved: true,
    });
  } catch (error) {
    console.error('[issueWaiyakiCertificate] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}