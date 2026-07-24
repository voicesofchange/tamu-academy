import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { getSensitiveModuleContent } from '../../shared/economics-curriculum.js';

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
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

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

    const moduleContent = getSensitiveModuleContent(courseSlug, moduleRoute);
    if (!moduleContent) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    return Response.json({ module: moduleContent });
  } catch (error) {
    console.error('[getModuleContent] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
});