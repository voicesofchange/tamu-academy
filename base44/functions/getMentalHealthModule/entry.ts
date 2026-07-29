import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { getMentalHealthModuleContent } from '../../shared/mental-health-curriculum.js';

/**
 * Role-gated endpoint that returns the Mental Health pillar module
 * content for a single (courseSlug, moduleRoute) pair.
 *
 * PHASE 1: Returns ONLY an authorized shell stub (publicationStatus and
 * contentAvailable flag). No protected curriculum — lesson text, case
 * study, watching questions, applied activity instructions, knowledge
 * check questions, answer keys, reflection prompts — is loaded yet,
 * because none has been added to base44/shared/mental-health-curriculum.js.
 *
 * TRUST BOUNDARY (mirrors the existing `getModuleContent` economics
 * function — DO NOT relax it):
 *   - An unauthenticated public visitor never receives the protected
 *     curriculum, even after the curriculum is loaded in Phase 2.
 *   - The client-side cannot be trusted to enforce the gate. The role
 *     is verified server-side here. Only an authenticated Base44 admin
 *     (the academy team previewing or administering the course)
 *     receives the module object now. Everyone else gets a 403, which
 *     the public route wrapper interprets as "show the public Development
 *     Spec / Coming Soon shell state."
 *   - 404 on any unknown (courseSlug, moduleRoute) pair, even for admins.
 *
 * FUTURE LAUNCH RULES (apply when content is added — for NON-admin
 * learners only; admins continue to bypass):
 *   1. Authentication required.
 *   2. An active CourseEnrollment record owned by the learner for this
 *      course must exist.
 *   3. The module publicationStatus must be "published".
 *   4. Any prerequisite module must be marked completed in
 *      ModuleProgress before its content is released.
 *   These checks will be added in a later phase; they are NOT enforced
 *   yet. Critically, the absence of a ModuleProgress record is only
 *   evidence that the learner has not started; an enrolled learner must
 *   never receive unpublished module content merely because an
 *   enrollment record exists.
 *
 * NEVER expose the answer key, question feedback, or any private
 * reflection text through this endpoint.
 */
export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);

    // Server-side role gate. base44.auth.me() throws on a public app
    // when no session token is present, so guard it and treat any
    // failure, null user, or non-admin role as forbidden.
    let user = null;
    try {
      user = await base44.auth.me();
    } catch (err) {
      user = null;
    }
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    let body = {};
    try {
      body = await req.json();
    } catch (err) {
      body = {};
    }
    const courseSlug = typeof body.courseSlug === 'string' ? body.courseSlug : '';
    const moduleRoute = typeof body.moduleRoute === 'string' ? body.moduleRoute : '';
    if (!courseSlug || !moduleRoute) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    const moduleContent = getMentalHealthModuleContent(courseSlug, moduleRoute);
    if (!moduleContent) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    return Response.json({ module: moduleContent });
  } catch (error) {
    console.error('[getMentalHealthModule] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}