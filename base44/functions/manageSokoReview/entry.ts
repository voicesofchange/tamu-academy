import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';
import { SOKO_REVIEW_DOMAINS } from '../../shared/sauti-za-soko-config.js';

/**
 * manageSokoReview — admin-only endpoint for the Sauti za Soko content
 * review record. Every review domain in the shared config must be
 * validated, by a suitably qualified reviewer, before the pathway is
 * published.
 *
 *   action: 'list'   -> every domain with its current sign-off state and
 *                       an overall readiness summary.
 *   action: 'update' -> records a sign-off or reopens a domain.
 *
 * Admin-only: requires an authenticated user with role 'admin', returning
 * 403 otherwise.
 *
 * NOTE: this endpoint records the review. It deliberately does not flip
 * the publication flag — that remains a deliberate server-side change in
 * base44/shared/sauti-za-soko-config.js, so publication can never be
 * triggered remotely.
 */
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

    const rows = await base44.asServiceRole.entities.SokoContentReview.list();
    const byDomain: Record<string, Record<string, unknown>> = {};
    for (const row of Array.isArray(rows) ? rows : []) {
      if (row && row.domain) byDomain[row.domain] = row as Record<string, unknown>;
    }

    if (action === 'list') {
      const domains = SOKO_REVIEW_DOMAINS.map((domain) => {
        const record = byDomain[domain.id];
        return {
          id: domain.id,
          label: domain.label,
          requirement: domain.requirement,
          status: record && record.status ? record.status : 'pending',
          reviewerName: record && record.reviewer_name ? record.reviewer_name : '',
          reviewerRole: record && record.reviewer_role ? record.reviewer_role : '',
          notes: record && record.notes ? record.notes : '',
          reviewedAt: record && record.reviewed_at ? record.reviewed_at : null,
        };
      });
      const validatedCount = domains.filter((d) => d.status === 'validated').length;
      return Response.json({
        domains,
        validatedCount,
        totalDomains: domains.length,
        readyToPublish: validatedCount === domains.length,
      });
    }

    if (action === 'update') {
      const domainId = typeof body.domain === 'string' ? body.domain : '';
      const status = typeof body.status === 'string' ? body.status : '';
      const reviewerName = typeof body.reviewerName === 'string' ? body.reviewerName.trim() : '';
      const reviewerRole = typeof body.reviewerRole === 'string' ? body.reviewerRole.trim() : '';
      const notes = typeof body.notes === 'string' ? body.notes.trim() : '';

      const domain = SOKO_REVIEW_DOMAINS.find((d) => d.id === domainId);
      if (!domain) {
        return Response.json({ error: 'Unknown review domain' }, { status: 404 });
      }
      if (status !== 'validated' && status !== 'pending') {
        return Response.json({ error: 'Invalid status' }, { status: 400 });
      }
      if (status === 'validated' && (!reviewerName || !reviewerRole)) {
        return Response.json({
          error: 'Reviewer required',
          message: 'Record who validated this domain and their relevant expertise.',
        }, { status: 400 });
      }
      if (notes.length > 4000 || reviewerName.length > 200 || reviewerRole.length > 300) {
        return Response.json({ error: 'Field too long' }, { status: 400 });
      }

      const now = new Date().toISOString();
      const existing = byDomain[domainId];
      const patch: Record<string, unknown> = {
        domain: domainId,
        label: domain.label,
        status,
        notes,
        reviewed_by: user.id,
      };
      if (status === 'validated') {
        patch.reviewer_name = reviewerName;
        patch.reviewer_role = reviewerRole;
        patch.reviewed_at = now;
      }

      if (existing) {
        await base44.asServiceRole.entities.SokoContentReview.update(existing.id as string, patch);
      } else {
        await base44.asServiceRole.entities.SokoContentReview.create(patch);
      }

      return Response.json({ saved: true, domain: domainId, status });
    }

    return Response.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('[manageSokoReview] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}