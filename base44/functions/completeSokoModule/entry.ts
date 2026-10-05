import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';
import {
  sokoCourseExists,
  getSokoModuleConfig,
  getSokoModulePrerequisite,
  isSokoModulePublished,
  deriveSokoCompletedKeys,
  SOKO_PEER_COURSE_SLUG,
} from '../../shared/sauti-za-soko-config.js';
import { SOKO_COMPLETION_KEYS } from '../../shared/sauti-za-soko-config.js';

/**
 * completeSokoModule — evaluates the five completion requirements for a
 * Sauti za Soko module and, when all are satisfied, marks the module
 * status='completed' with a server-generated completed_at timestamp.
 *
 * GUARANTEES:
 *   - completed_at and status:'completed' are generated on the server.
 *   - learner_id is derived exclusively from the authenticated session.
 *   - Idempotent: an already-completed module keeps its original
 *     completed_at.
 *   - Unsatisfied requirements: returns the missing keys WITHOUT writing
 *     status:'completed'.
 *   - Module 8 of the Peer Facilitator track additionally requires a
 *     vendor-circle submission that a reviewer has approved. A learner
 *     cannot complete the track by self-attestation.
 *   - No CourseEnrollment, course completion or certificate is written
 *     here.
 *
 * REJECTED BODY FIELDS: learner_id, completed_at, status, quiz_passed,
 * score, passed, attempt_number.
 */
const PROTECTED_BODY_FIELDS = new Set([
  'learner_id',
  'completed_at',
  'status',
  'quiz_passed',
  'score',
  'passed',
  'attempt_number',
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

    const isAdmin = user.role === 'admin';

    let body: Record<string, unknown> = {};
    try {
      body = await req.json();
    } catch (_) {
      body = {};
    }

    if (body && typeof body === 'object') {
      for (const key of Object.keys(body)) {
        if (PROTECTED_BODY_FIELDS.has(key)) {
          return Response.json({ error: 'Forbidden field' }, { status: 403 });
        }
      }
    }
    const allowedKeys = new Set(['courseSlug', 'moduleRoute']);
    for (const k of Object.keys(body)) {
      if (!allowedKeys.has(k)) {
        return Response.json({ error: 'Unsupported field: ' + k }, { status: 400 });
      }
    }

    const courseSlug = typeof body.courseSlug === 'string' ? body.courseSlug.trim() : '';
    const moduleRoute = typeof body.moduleRoute === 'string' ? body.moduleRoute.trim() : '';

    if (!courseSlug || !sokoCourseExists(courseSlug)) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    const moduleConfig = getSokoModuleConfig(courseSlug, moduleRoute);
    if (!moduleConfig) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    const isPublished = isSokoModulePublished(courseSlug, moduleRoute);

    if (isAdmin && !isPublished) {
      return Response.json({
        completed: false,
        progressSaved: false,
        missing: SOKO_COMPLETION_KEYS,
      });
    }

    if (!isAdmin) {
      const enrollmentRows = await base44.asServiceRole.entities.CourseEnrollment.filter({
        learner_id: user.id,
        course_slug: courseSlug,
        status: 'active',
      });
      if (!enrollmentRows || enrollmentRows.length === 0) {
        return Response.json({ error: 'Forbidden' }, { status: 403 });
      }
      if (!isPublished) {
        return Response.json({ error: 'Forbidden' }, { status: 403 });
      }
      const prereqRoute = getSokoModulePrerequisite(courseSlug, moduleRoute);
      if (prereqRoute) {
        const prereqRows = await base44.asServiceRole.entities.ModuleProgress.filter({
          learner_id: user.id,
          course_slug: courseSlug,
          module_slug: prereqRoute,
          status: 'completed',
        });
        if (!prereqRows || prereqRows.length === 0) {
          return Response.json({ error: 'Forbidden' }, { status: 403 });
        }
      }
    }

    const rows = await base44.asServiceRole.entities.ModuleProgress.filter({
      learner_id: user.id,
      course_slug: courseSlug,
      module_slug: moduleRoute,
    });
    const row = rows && rows.length > 0 ? rows[0] : null;
    const completedKeys = row ? deriveSokoCompletedKeys(row) : [];
    const missing = SOKO_COMPLETION_KEYS.filter((k) => !completedKeys.includes(k));

    if (missing.length > 0) {
      return Response.json({ completed: false, missing });
    }

    // Module 8 gate: a reviewer-approved vendor-circle submission is
    // required before the Peer Facilitator track can be completed.
    if (courseSlug === SOKO_PEER_COURSE_SLUG && moduleRoute === 'module-8') {
      const submissions = await base44.asServiceRole.entities.SokoFacilitatorSubmission.filter({
        learner_id: user.id,
        course_slug: courseSlug,
      });
      const approved = (Array.isArray(submissions) ? submissions : []).some(
        (s) => s && s.status === 'approved',
      );
      if (!approved && !isAdmin) {
        return Response.json({
          completed: false,
          missing: [],
          missingRequirement:
            'Your vendor-circle record must be reviewed and approved before this module can be completed.',
        });
      }
    }

    if (row && row.status === 'completed' && row.completed_at) {
      return Response.json({
        completed: true,
        alreadyCompleted: true,
        completedAt: row.completed_at,
      });
    }

    const now = new Date().toISOString();
    if (row) {
      const updated = await base44.asServiceRole.entities.ModuleProgress.update(row.id, {
        status: 'completed',
        completed_at: now,
        updated_at: now,
      });
      return Response.json({
        completed: true,
        completedAt: (updated && updated.completed_at) || now,
      });
    }
    const created = await base44.asServiceRole.entities.ModuleProgress.create({
      learner_id: user.id,
      course_slug: courseSlug,
      module_slug: moduleRoute,
      status: 'completed',
      completed_at: now,
      updated_at: now,
    });
    return Response.json({
      completed: true,
      completedAt: (created && created.completed_at) || now,
    });
  } catch (error) {
    console.error('[completeSokoModule] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}