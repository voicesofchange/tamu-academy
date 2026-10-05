import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';
import { SOKO_PEER_COURSE_SLUG } from '../../shared/sauti-za-soko-config.js';
import { resolvePreferredName } from '../../shared/learner-name.js';

/**
 * manageSokoFacilitatorReview — admin-only endpoint for reviewing
 * Peer Facilitator vendor-circle submissions.
 *
 *   action: 'list'   -> submissions awaiting or having received review,
 *                       each with the learner's display name.
 *   action: 'review' -> records an approval or a return with feedback.
 *                       Only a reviewer's approval allows Module 8 to be
 *                       completed.
 *
 * Admin-only: requires an authenticated user with role 'admin', returning
 * 403 otherwise so the endpoint cannot be invoked by a non-admin.
 */
const MAX_LIMIT = 50;

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
    if (user.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    let body: Record<string, unknown> = {};
    try {
      body = await req.json();
    } catch (_) {
      body = {};
    }

    const action = typeof body.action === 'string' ? body.action : 'list';

    // ---------------------------------------------------------------
    // List submissions for review
    // ---------------------------------------------------------------
    if (action === 'list') {
      const rows = await base44.asServiceRole.entities.SokoFacilitatorSubmission.filter(
        { course_slug: SOKO_PEER_COURSE_SLUG },
        '-updated_date',
        MAX_LIMIT,
      );

      const items = [];
      for (const row of Array.isArray(rows) ? rows : []) {
        let learnerName = null;
        try {
          const learner = await base44.asServiceRole.entities.User.get(row.learner_id);
          learnerName = resolvePreferredName(learner);
        } catch (_) {
          learnerName = null;
        }
        items.push({
          id: row.id,
          learnerName: learnerName || 'Learner',
          status: row.status,
          submittedAt: row.submitted_at || null,
          updatedAt: row.updated_at || null,
          sessionPlan: row.session_plan || '',
          discussionSummary: row.discussion_summary || '',
          reflection: row.reflection || '',
          consentConfirmed: row.consent_confirmed === true,
          reviewerFeedback: row.reviewer_feedback || '',
          reviewedAt: row.reviewed_at || null,
        });
      }

      return Response.json({ submissions: items });
    }

    // ---------------------------------------------------------------
    // Record a review decision
    // ---------------------------------------------------------------
    if (action === 'review') {
      const submissionId = typeof body.submissionId === 'string' ? body.submissionId : '';
      const decision = typeof body.decision === 'string' ? body.decision : '';
      const feedback = typeof body.feedback === 'string' ? body.feedback.trim() : '';

      if (!submissionId) {
        return Response.json({ error: 'Missing submission' }, { status: 400 });
      }
      if (decision !== 'approve' && decision !== 'return') {
        return Response.json({ error: 'Invalid decision' }, { status: 400 });
      }
      if (decision === 'return' && !feedback) {
        return Response.json({
          error: 'Feedback required',
          message: 'Explain what needs to change so the learner can revise and resubmit.',
        }, { status: 400 });
      }
      if (feedback.length > 4000) {
        return Response.json({ error: 'Feedback too long' }, { status: 400 });
      }

      const rows = await base44.asServiceRole.entities.SokoFacilitatorSubmission.filter({
        id: submissionId,
      });
      const submission = rows && rows.length > 0 ? rows[0] : null;
      if (!submission) {
        return Response.json({ error: 'Not found' }, { status: 404 });
      }

      const now = new Date().toISOString();
      const updated = await base44.asServiceRole.entities.SokoFacilitatorSubmission.update(
        submission.id,
        {
          status: decision === 'approve' ? 'approved' : 'returned',
          reviewer_feedback: feedback,
          reviewed_at: now,
          reviewed_by: user.id,
          updated_at: now,
        },
      );

      return Response.json({
        reviewed: true,
        status: (updated && updated.status) || (decision === 'approve' ? 'approved' : 'returned'),
      });
    }

    return Response.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('[manageSokoFacilitatorReview] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}