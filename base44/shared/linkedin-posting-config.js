/**
 * LinkedIn organization posting configuration.
 *
 * TARGET ORGANIZATION URN(S): populate this array with the LinkedIn
 * organization page URN(s) to post to, e.g.
 *   ['urn:li:organization:12345678']
 *
 * Until organization pages are connected and the connected account is
 * made an administrator of them, leave this empty — the post helper
 * will safely no-op (return skipped: true) so workflows keep running
 * without errors.
 *
 * SITE_URL: used in post messages. Replace with the connected custom
 * domain when one is set.
 *
 * Server-side only. Imported ONLY by Base44 backend functions.
 */

export const LINKEDIN_TARGET_ORG_URNS = [];

export const SITE_URL = 'https://tamu-learn-global.base44.app';

export const CERTIFICATE_MILESTONES = [1, 10, 25, 50, 100, 250, 500, 1000];

export const LINKEDIN_VERSION = '202408';