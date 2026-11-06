/**
 * Published article slugs.
 *
 * Kept as a plain list so the soft-launch route guard can check article
 * visibility without pulling the full article text of every article into the
 * initial download. Keep it in step with the `status` values in
 * src/lib/articles-data.js — an article is public only if its slug is here.
 */
export const PUBLISHED_ARTICLE_SLUGS = [
  'the-real-cost-of-always-achieving',
  'is-the-icc-biased-against-africa',
  'after-the-guns-go-silent',
  'climate-is-a-mental-health-crisis',
];