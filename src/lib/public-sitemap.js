/**
 * Tamu Academy — public sitemap (single source of truth)
 *
 * The sitemap is generated from the same data the site renders: the course
 * overview objects in their track files. Nothing here is
 * hand-maintained, so a course that is published in the app appears
 * in the sitemap the next time the app is built and published.
 *
 * Imported by vite.config.js, which writes public/sitemap.xml on every build.
 * Only public pages belong here — never a signed-in route (modules, progress,
 * certificates, the Learner's Guide, admin pages).
 */

import { ECONOMICS_COURSE } from './economics-tracks.js';
import { MENTAL_HEALTH_COURSE } from './mental-health-tracks.js';
import { WAIYAKI_COURSE } from './waiyaki-tracks.js';
import { BUILDING_WEALTH_TOGETHER_COURSE } from './building-wealth-together-tracks.js';
import { SAUTI_ZA_SOKO_COURSE } from './sauti-za-soko-tracks.js';
import { DIASPORA_REMITTANCE_COURSE } from './diaspora-remittance-tracks.js';

export const SITE_ORIGIN = 'https://tamuacademy.org';

/** The public course overview pages, in navigation order. */
export const PUBLIC_COURSES = [
  ECONOMICS_COURSE,
  BUILDING_WEALTH_TOGETHER_COURSE,
  MENTAL_HEALTH_COURSE,
  WAIYAKI_COURSE,
  SAUTI_ZA_SOKO_COURSE,
  DIASPORA_REMITTANCE_COURSE,
];

const STATIC_PAGES = [
  { path: '/', changefreq: 'weekly', priority: 1.0 },
  { path: '/courses', changefreq: 'monthly', priority: 0.9 },
  { path: '/about', changefreq: 'monthly', priority: 0.8 },
  { path: '/resources', changefreq: 'monthly', priority: 0.7 },
  { path: '/remote-pathway', changefreq: 'monthly', priority: 0.7 },
  { path: '/stories', changefreq: 'monthly', priority: 0.6 },
  { path: '/programmes/intercultural-ai-leadership-lab', changefreq: 'monthly', priority: 0.6 },
  { path: '/contact', changefreq: 'monthly', priority: 0.6 },
  { path: '/privacy', changefreq: 'yearly', priority: 0.3 },
];

/**
 * Every public URL, with its crawl hints. Course overviews are
 * derived, so publishing one adds it here automatically.
 */
export function buildSitemapEntries() {
  const entries = [...STATIC_PAGES];

  const seenCourseSlugs = new Set();
  for (const course of PUBLIC_COURSES) {
    if (!course || !course.slug || seenCourseSlugs.has(course.slug)) continue;
    seenCourseSlugs.add(course.slug);
    entries.push({
      path: `/courses/${course.slug}`,
      changefreq: 'monthly',
      priority: 0.8,
    });
  }

  return entries;
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** The full sitemap document. */
export function buildSitemapXml() {
  const urls = buildSitemapEntries().map((entry) => {
    const lines = [
      '  <url>',
      `    <loc>${escapeXml(`${SITE_ORIGIN}${entry.path}`)}</loc>`,
    ];
    if (entry.lastmod) lines.push(`    <lastmod>${escapeXml(entry.lastmod)}</lastmod>`);
    lines.push(`    <changefreq>${entry.changefreq}</changefreq>`);
    lines.push(`    <priority>${entry.priority.toFixed(1)}</priority>`);
    lines.push('  </url>');
    return lines.join('\n');
  });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n');
}