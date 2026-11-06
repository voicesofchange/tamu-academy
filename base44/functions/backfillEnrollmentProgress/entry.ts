import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { backfillEnrollmentProgress } from '../../shared/enrollment-progress.js';

/**
 * backfillEnrollmentProgress — recalculates every CourseEnrollment's
 * progress_percentage and last_module_slug from its ModuleProgress records.
 *
 * Administrator-only. Idempotent: only records whose values differ are
 * written, so a second run reports zero updates. Pass { dry_run: true } to
 * preview the changes without writing.
 *
 * Only progress fields are touched. Enrollment status, completed_at and
 * certificate eligibility are left exactly as they are.
 */
export default async function (req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);

    const user = await base44.auth.me().catch(() => null);
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await req.json().catch(() => ({}));
    const dryRun = body && body.dry_run === true;

    const result = await backfillEnrollmentProgress(base44, { dryRun });
    return Response.json(result);
  } catch (error) {
    console.error('[backfillEnrollmentProgress] error:', error && error.message);
    return Response.json({ error: 'An error occurred.' }, { status: 500 });
  }
}