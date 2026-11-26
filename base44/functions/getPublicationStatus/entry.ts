/**
 * getPublicationStatus — public, non-authenticated endpoint that returns
 * the server-controlled publication state for each course. Used by the
 * Courses page to show accurate status labels ("Now Available" once a
 * course is live, "In Development" otherwise) without duplicating the
 * publication flags into the client bundle.
 *
 * Returns ONLY safe public information: whether enrollment is open, how
 * many modules are published, and whether the course is "live" (enrollment
 * open AND at least one published module). No learner data, no content,
 * no answer material.
 *
 * The figures come from base44/shared/course-publication-status.js, which
 * the Tamu Learning Guide's data uses too, so both always cover the same
 * courses — including every course built with the course template.
 */
import { coursePublicationStatuses } from '../../shared/course-publication-status.js';

export default async function(_req: Request): Promise<Response> {
  try {
    return Response.json({ courses: coursePublicationStatuses() });
  } catch (error) {
    console.error('[getPublicationStatus] Error:', error && error.message);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}
