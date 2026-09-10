/**
 * onLearnerStoryFeaturedLinkedIn — handler for the LearnerStory
 * "featured" workflow trigger. Fetches the story, verifies it is
 * featured, formats a community-milestone message, and posts it to
 * the configured LinkedIn organization page(s) via the shared helper.
 *
 * Idempotent: the shared helper dedups on (event_type, ref_id).
 */
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.48';
import { postToLinkedInOrgs } from '../../shared/linkedin-post.js';
import { SITE_URL } from '../../shared/linkedin-posting-config.js';

export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const storyId = body.story_id || body.entity_id;
    if (!storyId) {
      return Response.json({ error: 'story_id required' }, { status: 400 });
    }

    const story = await base44.entities.LearnerStory.get(storyId).catch(() => null);
    if (!story) {
      return Response.json({ skipped: true, reason: 'story_not_found' });
    }
    if (story.status !== 'featured') {
      return Response.json({ skipped: true, reason: 'not_featured' });
    }

    const author = story.author_name || 'A Tamu Academy learner';
    const location = story.author_location ? ` (${story.author_location})` : '';
    const title = story.title || 'A new community story';
    const message =
      `New community story on Tamu Academy — ${author}${location} shares "${title}". ` +
      `Read learner stories from our community: ${SITE_URL}/stories`;

    const result = await postToLinkedInOrgs(base44, {
      message,
      event_type: 'learner_story_featured',
      ref_id: storyId,
    });

    return Response.json(result);
  } catch (error) {
    console.error('[onLearnerStoryFeaturedLinkedIn] Error:', error && error.message);
    return Response.json({ error: 'Internal error', details: error && error.message }, { status: 500 });
  }
}