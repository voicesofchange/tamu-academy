import { WAIYAKI_FURTHER_READING } from '../../shared/waiyaki-curriculum.js';

/**
 * Public reading list for the Waiyaki wa Hinga course.
 *
 * The bibliography is the guide's own and lives in the server-side-only
 * curriculum module, which is never bundled into the browser JavaScript — so
 * it is served from here for the course overview, which is a public page.
 *
 * The payload is limited to the published references the guide names: no
 * module narrative, no answer material, nothing learner-specific.
 */
export default async function(req: Request): Promise<Response> {
  try {
    return Response.json({ sources: WAIYAKI_FURTHER_READING });
  } catch (error) {
    console.error('[getWaiyakiSources] Unexpected error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}