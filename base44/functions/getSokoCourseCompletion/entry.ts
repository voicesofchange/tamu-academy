import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';
import {
  sokoCourseExists,
  getSokoModuleConfig,
  getSokoRequiredModuleRoutes,
  isSokoCoursePublished,
  isSokoModulePublished,
  SOKO_COURSE_SLUG,
  SOKO_PEER_COURSE_SLUG,
} from '../../shared/sauti-za-soko-config.js';

/**
 * getSokoCourseCompletion — authenticated, non-mutating endpoint that
 * reports how far the current learner has progressed through a Sauti za
 * Soko course.
 *
 * SCOPE:
 *   - Reads only the current authenticated user's records.
 *   - Creates NO record and performs NO update.
 *   - Returns per-module completion, the course-level requirements that sit
 *     outside module completion (My Soko Action Plan sections, one peer
 *     discussion, the final reflection — or, for the Peer Facilitator
 *     track, an approved vendor-circle submission), overall completion and
 *     certificate eligibility.
 *
 * TRUST BOUNDARY:
 *   - Unauthenticated -> 401.
 *   - Unknown course -> 404.
 *   - Completion is determined exclusively from server-side records.
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

    let body: Record<string, unknown> = {};
    try {
      body = await req.json();
    } catch (_) {
      body = {};
    }

    const allowedKeys = new Set(['courseSlug']);
    for (const k of Object.keys(body)) {
      if (!allowedKeys.has(k)) {
        return Response.json({ error: 'Unsupported field: ' + k }, { status: 400 });
      }
    }

    const courseSlug = typeof body.courseSlug === 'string' ? body.courseSlug.trim() : '';
    if (!courseSlug || !sokoCourseExists(courseSlug)) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    const enrollmentRows = await base44.asServiceRole.entities.CourseEnrollment.filter({
      learner_id: user.id,
      course_slug: courseSlug,
      status: { $in: ['active', 'completed'] },
    });
    const hasEnrollment = !!(enrollmentRows && enrollmentRows.length > 0);
    const enrollmentStatus = hasEnrollment ? enrollmentRows[0].status : null;

    const requiredRoutes = getSokoRequiredModuleRoutes(courseSlug);
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

    const modules = requiredRoutes.map((route) => {
      const config = getSokoModuleConfig(courseSlug, route);
      const progress = progressMap[route];
      return {
        route,
        number: config ? config.number : route,
        title: config ? config.title : route,
        completed: !!(progress && progress.status === 'completed' && progress.completed_at),
        completedAt: progress ? progress.completed_at : null,
      };
    });

    const completedCount = modules.filter((m) => m.completed).length;
    const totalModules = modules.length;
    const modulesComplete = completedCount === totalModules;
    const incompleteModules = modules
      .filter((m) => !m.completed)
      .map((m) => ({ route: m.route, number: m.number, title: m.title }));

    // Course-level requirements beyond module completion.
    let requirements = [];
    let requirementsComplete = false;

    if (courseSlug === SOKO_COURSE_SLUG) {
      const planRows = await base44.asServiceRole.entities.SokoActionPlan.filter({
        learner_id: user.id,
        course_slug: courseSlug,
      });
      const savedPlans = new Set(
        (Array.isArray(planRows) ? planRows : [])
          .filter((row) => row && row.filled_count > 0)
          .map((row) => row.module_slug),
      );
      requirements = requiredRoutes.map((route) => {
        const config = getSokoModuleConfig(courseSlug, route);
        return {
          kind: 'action_plan',
          route,
          label: `My Soko Action Plan \u2014 ${config ? config.number : route}`,
          met: savedPlans.has(route),
        };
      });

      const discussionRows = await base44.asServiceRole.entities.SokoDiscussion.filter({
        learner_id: user.id,
        course_slug: courseSlug,
      });
      requirements.push({
        kind: 'discussion',
        route: null,
        label: 'One peer discussion response',
        met: Array.isArray(discussionRows) && discussionRows.length > 0,
      });

      const reflectionRows = await base44.asServiceRole.entities.SokoReflection.filter({
        learner_id: user.id,
        course_slug: courseSlug,
      });
      requirements.push({
        kind: 'final_reflection',
        route: null,
        label: 'Final course reflection',
        met: (Array.isArray(reflectionRows) ? reflectionRows : []).some(
          (row) => row && typeof row.reflection === 'string' && row.reflection.trim().length > 0,
        ),
      });

      requirementsComplete = requirements.every((r) => r.met);
    } else if (courseSlug === SOKO_PEER_COURSE_SLUG) {
      const submissionRows = await base44.asServiceRole.entities.SokoFacilitatorSubmission.filter({
        learner_id: user.id,
        course_slug: courseSlug,
      });
      const submission = Array.isArray(submissionRows) && submissionRows.length > 0
        ? submissionRows[0]
        : null;
      requirements = [
        {
          kind: 'facilitator_submission',
          route: 'module-8',
          label: 'Vendor-circle session plan, summary and reflection',
          met: !!(submission && ['submitted', 'approved'].includes(submission.status)),
          status: submission ? submission.status : 'not_started',
          feedback: submission && submission.reviewer_feedback ? submission.reviewer_feedback : null,
        },
        {
          kind: 'facilitator_approval',
          route: 'module-8',
          label: 'Reviewer approval',
          met: !!(submission && submission.status === 'approved'),
        },
      ];
      requirementsComplete = requirements.every((r) => r.met);
    }

    const anyPublished = requiredRoutes.some((route) => isSokoModulePublished(courseSlug, route));
    const eligibleToSave = hasEnrollment && anyPublished;
    const courseCompleted = modulesComplete && requirementsComplete;
    const certificateEligible = courseCompleted && eligibleToSave;

    return Response.json({
      courseSlug,
      hasEnrollment,
      enrollmentStatus,
      modules,
      completedCount,
      totalModules,
      modulesComplete,
      incompleteModules,
      requirements,
      requirementsComplete,
      courseCompleted,
      certificateEligible,
      eligibleToSave,
      isPublished: isSokoCoursePublished(courseSlug),
    });
  } catch (error) {
    console.error('[getSokoCourseCompletion] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}