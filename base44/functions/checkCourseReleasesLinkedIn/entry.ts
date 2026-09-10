/**
 * checkCourseReleasesLinkedIn — scheduled handler that announces newly
 * published course modules to the configured LinkedIn organization
 * page(s).
 *
 * Because module publication is a server-side config flag (not an
 * entity event), this function runs on a schedule and compares the
 * current publication status against the LinkedInAnnouncement dedup
 * log:
 *   - First run (no existing 'module_live' announcements): SEEDS all
 *     currently-published modules as 'seeded' (no posts), so
 *     already-live modules are not all announced at once.
 *   - Later runs: posts any module that is published but not yet in
 *     the dedup log (i.e. newly published since the last run).
 *
 * Idempotent per module via the shared helper's (event_type, ref_id)
 * dedup, where ref_id is the module slug.
 */
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.48';
import { postToLinkedInOrgs } from '../../shared/linkedin-post.js';
import { SITE_URL } from '../../shared/linkedin-posting-config.js';
import {
  ECONOMICS_COURSE_SLUG,
  ECONOMICS_MODULE_ROUTES,
  ECONOMICS_MODULE_META,
  isEconomicsModulePublished,
} from '../../shared/economics-course-config.js';
import {
  MENTAL_HEALTH_COURSE_SLUG,
  MENTAL_HEALTH_COURSE_CONFIG,
  isModulePublished as isMhModulePublished,
} from '../../shared/mental-health-curriculum.js';

function buildModuleList() {
  const modules = [];
  for (const route of ECONOMICS_MODULE_ROUTES) {
    const meta = ECONOMICS_MODULE_META[route] || { number: route, title: route };
    modules.push({
      course_slug: ECONOMICS_COURSE_SLUG,
      module_route: route,
      module_slug: `${ECONOMICS_COURSE_SLUG}/${route}`,
      number: meta.number,
      title: meta.title,
      course_title: 'Understanding African Economies and the Global System',
      published: isEconomicsModulePublished(ECONOMICS_COURSE_SLUG, route),
      overviewRoute: `/courses/${ECONOMICS_COURSE_SLUG}/${route}`,
    });
  }
  for (const m of MENTAL_HEALTH_COURSE_CONFIG.modules) {
    modules.push({
      course_slug: MENTAL_HEALTH_COURSE_SLUG,
      module_route: m.route,
      module_slug: `${MENTAL_HEALTH_COURSE_SLUG}/${m.route}`,
      number: m.number,
      title: m.title,
      course_title: 'Mental Health, Community and Culture',
      published: isMhModulePublished(MENTAL_HEALTH_COURSE_SLUG, m.route),
      overviewRoute: `/courses/${MENTAL_HEALTH_COURSE_SLUG}/${m.route}`,
    });
  }
  return modules;
}

export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const modules = buildModuleList();
    const publishedModules = modules.filter((m) => m.published);

    // First-run seeding: if no 'module_live' announcements exist at all,
    // seed all currently-published modules as 'seeded' (no posts).
    const existing = await base44.entities.LinkedInAnnouncement.filter({ event_type: 'module_live' }).catch(() => []);
    const isFirstRun = !Array.isArray(existing) || existing.length === 0;

    if (isFirstRun && publishedModules.length > 0) {
      for (const m of publishedModules) {
        try {
          await base44.entities.LinkedInAnnouncement.create({
            event_type: 'module_live',
            ref_id: m.module_slug,
            org_urn: '',
            message: '',
            status: 'seeded',
            linkedin_post_id: '',
            error: '',
          });
        } catch (e) {
          console.error('[checkCourseReleasesLinkedIn] seed failed:', e && e.message);
        }
      }
      return Response.json({ seeded: true, count: publishedModules.length });
    }

    // Later runs: announce any published module not yet in the dedup log.
    const announcedSlugs = new Set(
      (existing || []).map((r) => r.ref_id).filter(Boolean)
    );
    const toAnnounce = publishedModules.filter((m) => !announcedSlugs.has(m.module_slug));

    if (toAnnounce.length === 0) {
      return Response.json({ announced: [], skipped: true, reason: 'no_new_modules' });
    }

    const results = [];
    for (const m of toAnnounce) {
      const message =
        `New on Tamu Academy — ${m.course_title}, ${m.number}: "${m.title}" is now live. ` +
        `Start learning: ${SITE_URL}${m.overviewRoute}`;
      const r = await postToLinkedInOrgs(base44, {
        message,
        event_type: 'module_live',
        ref_id: m.module_slug,
      });
      results.push({ module_slug: m.module_slug, title: m.title, result: r });
    }

    return Response.json({ announced: results });
  } catch (error) {
    console.error('[checkCourseReleasesLinkedIn] Error:', error && error.message);
    return Response.json({ error: 'Internal error', details: error && error.message }, { status: 500 });
  }
}