/**
 * getLinkedInOrganizations — lists the LinkedIn organization pages the
 * connected (shared) account administers. Used to let the builder pick
 * which organization page(s) automated course-release and community-
 * milestone posts are published to.
 *
 * Uses the authorized shared LinkedIn connector token (r_organization_admin).
 * Read-only; no learner data.
 */
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.48';

const LINKEDIN_VERSION = '202408';

export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const { accessToken } = await base44.asServiceRole.connectors.getConnection('linkedin');

    // 0. Verify the token works with a profile call.
    const profileRes = await fetch('https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName)', {
      headers: { 'Authorization': `Bearer ${accessToken}` },
    });
    const profileInfo = profileRes.ok ? await profileRes.json() : { profileStatus: profileRes.status };

    // 1. List organizations where the connected user is an APPROVED admin (minimal call).
    const aclRes = await fetch(
      'https://api.linkedin.com/v2/organizationAcls?q=role&role=ADMINISTRATOR&state=APPROVED',
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'X-Restli-Protocol-Version': '2.0.0',
        },
      }
    );
    if (!aclRes.ok) {
      const txt = await aclRes.text();
      return Response.json({
        error: `LinkedIn ACL lookup failed: ${aclRes.status}`,
        details: txt,
        profileInfo,
      }, { status: 502 });
    }
    const aclData = await aclRes.json();
    const elements = aclData.elements || [];

    // Extract organization numeric IDs from the URNs (urn:li:organization:123).
    const orgIds = elements
      .map((e) => e.organization || e.object || '')
      .filter((urn) => typeof urn === 'string' && urn.startsWith('urn:li:organization:'))
      .map((urn) => urn.split(':').pop())
      .filter(Boolean);

    if (orgIds.length === 0) {
      return Response.json({ organizations: [], profileInfo, rawAcl: aclData });
    }

    // 2. Fetch each organization's name + vanity name.
    const orgs = await Promise.all(
      orgIds.map(async (id) => {
        try {
          const r = await fetch(
            `https://api.linkedin.com/v2/organizations/${id}?projection=(id,localizedName,vanityName)`,
            { headers: { 'Authorization': `Bearer ${accessToken}`, 'X-Restli-Protocol-Version': '2.0.0' } }
          );
          if (!r.ok) return { id, urn: `urn:li:organization:${id}`, name: `Organization ${id}`, vanityName: null };
          const d = await r.json();
          return {
            id,
            urn: `urn:li:organization:${id}`,
            name: d.localizedName || `Organization ${id}`,
            vanityName: d.vanityName || null,
          };
        } catch {
          return { id, urn: `urn:li:organization:${id}`, name: `Organization ${id}`, vanityName: null };
        }
      })
    );

    return Response.json({ organizations: orgs, profileInfo });
  } catch (error) {
    console.error('[getLinkedInOrganizations] Error:', error && error.message);
    return Response.json({ error: 'Internal error', details: error && error.message }, { status: 500 });
  }
}