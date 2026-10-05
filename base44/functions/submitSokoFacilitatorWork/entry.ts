import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';
import {
  SOKO_PEER_COURSE_SLUG,
  getSokoModuleConfig,
  isSokoModulePublished,
  deriveSokoCompletedKeys,
} from '../../shared/sauti-za-soko-config.js';

/**
 * submitSokoFacilitatorWork — authenticated endpoint for the optional Peer
 * Facilitator track. Stores the learner's vendor-circle record:
 * session plan, privacy-protecting discussion summary, facilitator
 * reflection and the consent confirmation.
 *
 *   action: 'save_draft' -> status 'draft'. The learner may return and
 *                           revise at any time.
 *   action: 'submit'     -> status 'submitted', queued for reviewer
 *                           approval. Requires all three written sections
 *                           and an explicit consent confirmation.
 *
 * Submitting also satisfies Module 8's activity requirement server-side.
 * The module itself cannot be completed until a reviewer approves the
 * record, so the track can never be self-certified.
 *
 * The summary is stored as plain text on the learner's own record. A
 * reviewer may read it; no participant may be named in it.
 */
const PROTECTED_BODY_FIELDS = new Set([
  'learner_id',
  'status',
  'reviewer_feedback',
  'reviewed_at',
  'reviewed_by',
  'completed_at',
]);

const MAX_SECTION_CHARS = 8000;

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

    for (const key of Object.keys(body)) {
      if (PROTECTED_BODY_FIELDS.has(key)) {
        return Response.json({ error: 'Forbidden field' }, { status: 403 });
      }
    }

    const courseSlug = typeof body.courseSlug === 'string' ? body.courseSlug : '';
    if (courseSlug !== SOKO_PEER_COURSE_SLUG) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }
    if (!getSokoModuleConfig(courseSlug, 'module-8')) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    const action = typeof body.action === 'string' ? body.action : '';
    if (action !== 'save_draft' && action !== 'submit') {
      return Response.json({ error: 'Invalid action' }, { status: 400 });
    }

    const sessionPlan = typeof body.sessionPlan === 'string' ? body.sessionPlan.trim() : '';
    const discussionSummary =
      typeof body.discussionSummary === 'string' ? body.discussionSummary.trim() : '';
    const reflection = typeof body.reflection === 'string' ? body.reflection.trim() : '';
    const consentConfirmed = body.consentConfirmed === true;

    for (const value of [sessionPlan, discussionSummary, reflection]) {
      if (value.length > MAX_SECTION_CHARS) {
        return Response.json({ error: 'Section too long' }, { status: 400 });
      }
    }

    const isPublished = isSokoModulePublished(courseSlug, 'module-8');

    if (isAdmin && !isPublished) {
      return Response.json({ saved: false, progressSaved: false, preview: true });
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
      const prereqRows = await base44.asServiceRole.entities.ModuleProgress.filter({
        learner_id: user.id,
        course_slug: courseSlug,
        module_slug: 'module-8',
      });
      void prereqRows;
    }

    const isSubmission = action === 'submit';

    if (isSubmission) {
      if (!sessionPlan || !discussionSummary || !reflection) {
        return Response.json({
          error: 'Incomplete submission',
          message: 'A session plan, a discussion summary and a facilitator reflection are all required.',
        }, { status: 400 });
      }
      if (!consentConfirmed) {
        return Response.json({
          error: 'Consent not confirmed',
          message: 'Confirm that participants gave informed consent and that no individual is identifiable in your summary.',
        }, { status: 400 });
      }
    }

    const learnerId = user.id;
    const now = new Date().toISOString();

    const existing = await base44.asServiceRole.entities.SokoFacilitatorSubmission.filter({
      learner_id: learnerId,
      course_slug: courseSlug,
    });
    const existingRow = existing && existing.length > 0 ? existing[0] : null;

    // A returned submission is resubmitted; a draft becomes submitted; an
    // approved record stays approved.
    let nextStatus = existingRow ? existingRow.status : 'draft';
    if (isSubmission) {
      nextStatus = existingRow && existingRow.status === 'approved' ? 'approved' : 'submitted';
    } else if (!existingRow) {
      nextStatus = 'draft';
    } else if (existingRow.status === 'returned') {
      nextStatus = 'draft';
    }

    const patch: Record<string, unknown> = {
      session_plan: sessionPlan,
      discussion_summary: discussionSummary,
      reflection,
      consent_confirmed: consentConfirmed,
      status: nextStatus,
      updated_at: now,
    };
    if (isSubmission && nextStatus === 'submitted') {
      patch.submitted_at = now;
      patch.reviewer_feedback = '';
    }

    let saved;
    if (existingRow) {
      saved = await base44.asServiceRole.entities.SokoFacilitatorSubmission.update(
        existingRow.id,
        patch,
      );
    } else {
      saved = await base44.asServiceRole.entities.SokoFacilitatorSubmission.create({
        learner_id: learnerId,
        course_slug: courseSlug,
        ...patch,
      });
    }

    // Submitting satisfies Module 8's activity requirement.
    if (isSubmission) {
      const progressRows = await base44.asServiceRole.entities.ModuleProgress.filter({
        learner_id: learnerId,
        course_slug: courseSlug,
        module_slug: 'module-8',
      });
      const progressRow = progressRows && progressRows.length > 0 ? progressRows[0] : null;
      if (!progressRow) {
        await base44.asServiceRole.entities.ModuleProgress.create({
          learner_id: learnerId,
          course_slug: courseSlug,
          module_slug: 'module-8',
          status: 'in_progress',
          activity_acknowledged_at: now,
          activity_completion_mode: 'browser_private',
          quiz_passed: false,
          updated_at: now,
        });
      } else {
        await base44.asServiceRole.entities.ModuleProgress.update(progressRow.id, {
          activity_acknowledged_at: progressRow.activity_acknowledged_at || now,
          activity_completion_mode: progressRow.activity_completion_mode || 'browser_private',
          updated_at: now,
        });
      }
    }

    return Response.json({
      saved: true,
      progressSaved: true,
      status: (saved && saved.status) || nextStatus,
      submitted: nextStatus === 'submitted',
    });
  } catch (error) {
    console.error('[submitSokoFacilitatorWork] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}