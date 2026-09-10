/**
 * Shared LinkedIn organization posting helper.
 *
 * postToLinkedInOrgs(base44, { message, event_type, ref_id })
 *   - Reads LINKEDIN_TARGET_ORG_URNS from config.
 *   - If empty, returns { skipped: true, reason: 'no_target_org' }.
 *   - Dedup: if a LinkedInAnnouncement record already exists for this
 *     (event_type, ref_id), returns { skipped: true, reason: 'already_announced' }.
 *   - Posts the message to each target organization page via the LinkedIn
 *     Posts API, using the shared connector token.
 *   - Records one LinkedInAnnouncement per org (status 'posted' or 'failed').
 *   - Returns { results: [{ org_urn, status, post_id, error }] }.
 *
 * Server-side only. Imported ONLY by Base44 backend functions.
 */
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.48';
import { LINKEDIN_TARGET_ORG_URNS, LINKEDIN_VERSION } from './linkedin-posting-config.js';

export async function postToLinkedInOrgs(base44, { message, event_type, ref_id }) {
  if (!message || !event_type || !ref_id) {
    return { skipped: true, reason: 'missing_args' };
  }
  if (!Array.isArray(LINKEDIN_TARGET_ORG_URNS) || LINKEDIN_TARGET_ORG_URNS.length === 0) {
    return { skipped: true, reason: 'no_target_org' };
  }

  // Dedup: skip if already announced (posted or seeded).
  try {
    const existing = await base44.entities.LinkedInAnnouncement.filter({ event_type, ref_id });
    if (Array.isArray(existing) && existing.length > 0) {
      return { skipped: true, reason: 'already_announced' };
    }
  } catch (e) {
    // If the dedup check fails, continue cautiously (better to risk a
    // duplicate than to silently swallow all posts).
    console.error('[linkedin-post] dedup check failed:', e && e.message);
  }

  // Get the shared LinkedIn connector token.
  const { accessToken } = await base44.asServiceRole.connectors.getConnection('linkedin');

  const results = [];
  for (const orgUrn of LINKEDIN_TARGET_ORG_URNS) {
    try {
      const res = await fetch('https://api.linkedin.com/rest/posts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'LinkedIn-Version': LINKEDIN_VERSION,
          'X-Restli-Protocol-Version': '2.0.0',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          author: orgUrn,
          lifecycleState: 'PUBLISHED',
          commentary: message,
          visibility: 'PUBLIC',
          distribution: {
            feedDistribution: 'MAIN_FEED',
            targetEntities: [],
            thirdPartyDistributionChannels: [],
          },
        }),
      });

      const postId = res.headers.get('x-restli-id') || null;
      let errorText = null;
      if (!res.ok) {
        errorText = await res.text();
      }

      const status = res.ok ? 'posted' : 'failed';
      try {
        await base44.entities.LinkedInAnnouncement.create({
          event_type,
          ref_id,
          org_urn: orgUrn,
          message,
          status,
          linkedin_post_id: postId || '',
          error: errorText || '',
        });
      } catch (recErr) {
        console.error('[linkedin-post] record failed:', recErr && recErr.message);
      }

      results.push({ org_urn: orgUrn, status, post_id: postId, error: errorText });
    } catch (err) {
      try {
        await base44.entities.LinkedInAnnouncement.create({
          event_type,
          ref_id,
          org_urn: orgUrn,
          message,
          status: 'failed',
          linkedin_post_id: '',
          error: (err && err.message) || 'fetch_error',
        });
      } catch (recErr) {
        console.error('[linkedin-post] record failed:', recErr && recErr.message);
      }
      results.push({ org_urn: orgUrn, status: 'failed', post_id: null, error: (err && err.message) || 'fetch_error' });
    }
  }

  return { results };
}