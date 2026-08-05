import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { getSensitiveModuleContent } from '../../shared/economics-curriculum.js';
import {
  isEconomicsModulePublished,
  getEconomicsModulePrerequisite,
} from '../../shared/economics-course-config.js';

/**
 * Role-gated endpoint that returns the full, in-development module content
 * for a single (courseSlug, moduleRoute) pair. The content — recorded
 * lesson links, key concepts, reflection questions, quiz questions and
 * answer keys, applied activities, completion requirements, closing text,
 * and source references — lives in base44/shared/economics-curriculum.js,
 * which is imported ONLY by this server-side function and is never bundled
 * into the public client JavaScript.
 *
 * Trust boundary: an unauthenticated public visitor must never receive the
 * protected curriculum, and the client-side cannot be trusted to enforce
 * that gate. The role is verified server-side here: only an authenticated
 * Base44 admin (the academy team previewing or administering the course)
 * receives the module object. Everyone else gets a 403, which the page
 * interprets as "show the public Module-in-development state."
 */
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Server-side role gate. base44.auth.me() throws on a public app when
    // no session token is present, so guard it and treat any failure, null
    // user, or non-admin role as forbidden.
    let user = null;
    try {
      user = await base44.auth.me();
    } catch (err) {
      user = null;
    }
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const isAdmin = user.role === 'admin';

    // Parse the inline JSON payload (Base44 `functions.invoke` posts the
    // payload as the request body).
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

    const rawContent = getSensitiveModuleContent(courseSlug, moduleRoute);
    if (!rawContent) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    // Non-admin learners must be enrolled, the module must be published,
    // and any prerequisite module must be completed before content is
    // released. Admins bypass these checks to preview in-development
    // modules.
    if (!isAdmin) {
      const isPublished = isEconomicsModulePublished(courseSlug, moduleRoute);
      if (!isPublished) {
        return Response.json({ error: 'Forbidden' }, { status: 403 });
      }
      const enrollmentRows = await base44.asServiceRole.entities.CourseEnrollment.filter({
        learner_id: user.id,
        course_slug: courseSlug,
        status: 'active',
      });
      if (!enrollmentRows || enrollmentRows.length === 0) {
        return Response.json({ error: 'Forbidden' }, { status: 403 });
      }
      const prereqRoute = getEconomicsModulePrerequisite(courseSlug, moduleRoute);
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

    // Strip the quiz answer key before returning to the client. The
    // frontend grades via checkEconomicsKnowledgeCheck and must never
    // receive correctIndex — only the public question fields (id, prompt,
    // options, written, feedback) and quiz metadata (passingScore).
    let moduleContent = rawContent;
    if (moduleContent && moduleContent.quiz && Array.isArray(moduleContent.quiz.questions)) {
      moduleContent = {
        ...moduleContent,
        quiz: {
          ...moduleContent.quiz,
          questions: moduleContent.quiz.questions.map((q) => {
            const { correctIndex, ...rest } = q;
            return rest;
          }),
        },
      };
    }

    return Response.json({ module: moduleContent });
  } catch (error) {
    console.error('[getModuleContent] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
});