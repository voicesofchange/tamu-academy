/**
 * Certificate issuance — the single implementation behind every course
 * certificate.
 *
 * Both entry points use it:
 *   - issueCourseCertificate, called by the learner's certificate page (the
 *     learner's own session) and by the completion workflow (admin context);
 *   - the five per-course endpoints while they are still deployed, each of
 *     which now only forwards its own course here.
 *
 * Everything course-specific comes from the course registry
 * (./course-registry.js): title, completion statement, required module
 * routes, the publication gate, whether a completed enrollment is required,
 * and which extra requirement (if any) the course carries. Nothing about a
 * course's rules lives here, so a rule and its certificate wording stay in
 * one place and cannot drift between entry points.
 *
 * Records are written with the same shape each course already used, so
 * existing certificates, their IDs and their download links are untouched:
 * only new records are created, and a course that never stored a
 * verification code still does not.
 */

import { resolvePreferredName } from './learner-name.js';
import {
  getCourseConfig,
  getRequiredModuleRoutes,
  checkExtraCompletionRequirements,
} from './course-registry.js';

const PROFILE_NAME_MESSAGE =
  'Please update your profile name before generating your certificate.';

/** Body fields a browser must never supply — every certificate value is derived server-side. */
export const PROTECTED_CERTIFICATE_BODY_FIELDS = new Set([
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

const LEARNER_ALLOWED_FIELDS = new Set(['courseSlug', 'preview']);

/**
 * Validate a learner-facing certificate request body.
 * @returns {string|null} the rejection message, or null when the body is acceptable
 */
export function learnerCertificateBodyError(body) {
  for (const key of Object.keys(body || {})) {
    if (PROTECTED_CERTIFICATE_BODY_FIELDS.has(key)) return 'Unsupported field: ' + key;
  }
  for (const key of Object.keys(body || {})) {
    if (!LEARNER_ALLOWED_FIELDS.has(key)) return 'Unsupported field: ' + key;
  }
  return null;
}

/** The first certificate already on file for a learner + course, if any. */
export async function findExistingCertificate(base44, learnerId, courseSlug) {
  const rows = await base44.asServiceRole.entities.CourseCertificate.filter({
    learner_id: learnerId,
    course_slug: courseSlug,
  });
  return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
}

/** The learner-facing (camelCase) certificate payload returned by the pages. */
export function certificateResponse(cert) {
  return {
    certificateId: cert.certificate_id,
    learnerName: cert.learner_name,
    courseTitle: cert.course_title,
    completedAt: cert.completed_at,
    issuedAt: cert.issued_at,
    completionStatement: cert.completion_statement,
    progressSaved: true,
  };
}

/** Module completion state for one learner and course. */
export async function moduleProgressSnapshot(base44, learnerId, courseSlug) {
  const routes = getRequiredModuleRoutes(courseSlug);
  const rows = await base44.asServiceRole.entities.ModuleProgress.filter({
    learner_id: learnerId,
    course_slug: courseSlug,
  });

  const progressMap = {};
  if (Array.isArray(rows)) {
    for (const row of rows) {
      if (row && row.module_slug) {
        progressMap[row.module_slug] = {
          status: row.status || 'in_progress',
          completed_at: row.completed_at || null,
        };
      }
    }
  }

  const incompleteModules = routes.filter((route) => {
    const progress = progressMap[route];
    return !progress || progress.status !== 'completed' || !progress.completed_at;
  });

  return { routes, progressMap, incompleteModules };
}

/** The latest module completion date, used as the course completion date. */
export function latestModuleCompletionAt(routes, progressMap) {
  let latest = null;
  for (const route of routes) {
    const progress = progressMap[route];
    if (progress && progress.completed_at) {
      if (!latest || progress.completed_at > latest) latest = progress.completed_at;
    }
  }
  return latest;
}

/**
 * Create the certificate record for a course, with that course's own record
 * shape — a course that has never stored an enrollment reference or a
 * verification code still writes exactly what it wrote before.
 */
export async function createCertificateRecord(
  base44,
  { learnerId, courseSlug, learnerName, completedAt, enrollmentId = null, withVerificationCode = false },
) {
  const config = getCourseConfig(courseSlug);
  if (!config) throw new Error('Unknown course');

  const certificateId = crypto.randomUUID();
  const verificationCode = withVerificationCode
    ? 'TAMU-' + crypto.randomUUID().replace(/-/g, '').substring(0, 8).toUpperCase()
    : null;
  const issuedAt = new Date().toISOString();

  const record = {
    learner_id: learnerId,
    course_slug: courseSlug,
    certificate_id: certificateId,
    learner_name: String(learnerName).trim(),
    course_title: config.title,
    completed_at: completedAt,
    issued_at: issuedAt,
    completion_statement: config.completionStatement,
  };

  if (enrollmentId) record.course_enrollment_id = enrollmentId;
  if (withVerificationCode) {
    record.verification_code = verificationCode;
    record.status = 'valid';
  }

  const created = await base44.asServiceRole.entities.CourseCertificate.create(record);

  return { created, certificateId, verificationCode, issuedAt, completedAt };
}

/**
 * Issue (or return) a certificate for the signed-in learner.
 *
 * Order of checks follows each course's existing behaviour exactly: the
 * module and extra-requirement checks, the profile-name check, the
 * idempotent lookup, and — for a course that requires it — the completed
 * enrollment.
 *
 * @returns {{ status: number, body: object }}
 */
export async function issueLearnerCertificate(
  base44,
  { user, body, restrictToCourseSlugs = null },
) {
  const courseSlug = typeof body.courseSlug === 'string' ? body.courseSlug.trim() : '';
  const config = courseSlug ? getCourseConfig(courseSlug) : null;
  const allowed =
    config && (!restrictToCourseSlugs || restrictToCourseSlugs.includes(courseSlug));

  if (!allowed) {
    return { status: 404, body: { error: 'Not found' } };
  }

  const rules = config.certificate || {};
  const isAdmin = user.role === 'admin';

  // Administrator preview — placeholder data, no record created.
  if (isAdmin && body.preview === true) {
    return {
      status: 200,
      body: {
        preview: true,
        progressSaved: false,
        learnerName: 'Preview Learner',
        courseTitle: config.title,
        completionStatement: config.completionStatement,
      },
    };
  }

  // --- Enrollment ---
  const enrollmentRows = await base44.asServiceRole.entities.CourseEnrollment.filter({
    learner_id: user.id,
    course_slug: courseSlug,
    status: { $in: ['active', 'completed'] },
  });
  if (!enrollmentRows || enrollmentRows.length === 0) {
    return { status: 403, body: { error: 'Forbidden' } };
  }
  const enrollments = Array.isArray(enrollmentRows) ? enrollmentRows : [];

  // --- Course publication gate ---
  if (!config.isPublished || !config.isPublished(courseSlug)) {
    return { status: 403, body: { error: 'Forbidden' } };
  }

  // --- Modules, then the course's own extra requirement ---
  const { routes, progressMap, incompleteModules } = await moduleProgressSnapshot(
    base44,
    user.id,
    courseSlug,
  );

  if (rules.extraRequirements === 'waiyaki') {
    if (incompleteModules.length > 0) {
      return {
        status: 403,
        body: { error: 'Course not completed', incompleteModules },
      };
    }
    const extra = await checkExtraCompletionRequirements(base44, user.id, courseSlug);
    if (!extra.ok) {
      return {
        status: 403,
        body: { error: 'Course requirements outstanding', missing: extra.missing },
      };
    }
  } else if (rules.extraRequirements === 'wealth-capstone') {
    // The capstone is reported alongside any unfinished module, as before.
    const outstanding = [...incompleteModules];
    const extra = await checkExtraCompletionRequirements(base44, user.id, courseSlug);
    if (!extra.ok) outstanding.push(...extra.missing);
    if (outstanding.length > 0) {
      return {
        status: 403,
        body: { error: 'Course not completed', incompleteModules: outstanding },
      };
    }
  } else if (incompleteModules.length > 0) {
    return {
      status: 403,
      body: { error: 'Course not completed', incompleteModules },
    };
  }

  // --- Learner name ---
  const learnerName = resolvePreferredName(user);
  if (!learnerName || typeof learnerName !== 'string' || learnerName.trim().length === 0) {
    return {
      status: 409,
      body: { error: 'Profile name required', message: PROFILE_NAME_MESSAGE },
    };
  }

  // --- Idempotency: an existing certificate is returned unchanged ---
  const existing = await findExistingCertificate(base44, user.id, courseSlug);
  if (existing) return { status: 200, body: certificateResponse(existing) };

  // --- Courses whose certificate requires a completed enrollment ---
  let completedEnrollment = null;
  if (rules.requiresCompletedEnrollment) {
    completedEnrollment = enrollments.find((row) => row && row.status === 'completed') || null;
    if (!completedEnrollment) {
      return {
        status: 409,
        body: {
          error: 'Course requirements outstanding',
          message: rules.completionPendingMessage || PROFILE_NAME_MESSAGE,
        },
      };
    }
  }

  // --- Course completion date ---
  let completedAt = rules.requiresCompletedEnrollment
    ? completedEnrollment.completed_at || latestModuleCompletionAt(routes, progressMap)
    : latestModuleCompletionAt(routes, progressMap);
  if (!completedAt) completedAt = new Date().toISOString();

  const { created, certificateId, issuedAt } = await createCertificateRecord(base44, {
    learnerId: user.id,
    courseSlug,
    learnerName,
    completedAt,
    enrollmentId: rules.includeEnrollmentId
      ? (completedEnrollment ? completedEnrollment.id : enrollments[0].id)
      : null,
    withVerificationCode: rules.verificationCode === true,
  });

  // --- Courses that finalize the enrollment as part of issuing ---
  if (rules.finalizesEnrollment) {
    const enrollment = enrollments[0];
    try {
      if (enrollment.status !== 'completed') {
        await base44.asServiceRole.entities.CourseEnrollment.update(enrollment.id, {
          status: 'completed',
          completed_at: completedAt,
          last_module_slug: routes.length > 0 ? routes[routes.length - 1] : null,
          progress_percentage: 100,
          certificate_eligible: true,
          updated_at: issuedAt,
        });
      }
    } catch (enrollErr) {
      console.warn('[certificate-issuance] Could not finalize enrollment:', enrollErr && enrollErr.message);
    }

    try {
      await base44.analytics.track({
        eventName: 'course_completed',
        properties: { course_slug: courseSlug },
      });
    } catch (err) {
      console.warn('[certificate-issuance] analytics.track failed:', err && err.message);
    }
  }

  return {
    status: 200,
    body: {
      certificateId: (created && created.certificate_id) || certificateId,
      learnerName: (created && created.learner_name) || learnerName.trim(),
      courseTitle: (created && created.course_title) || config.title,
      completedAt: (created && created.completed_at) || completedAt,
      issuedAt: (created && created.issued_at) || issuedAt,
      completionStatement: (created && created.completion_statement) || config.completionStatement,
      progressSaved: true,
    },
  };
}