import { useEffect } from 'react';

const BASE_URL = 'https://tamuacademy.org';

/**
 * PageMeta — sets document title, meta description, canonical, Open Graph,
 * and Twitter card tags for each route. Uses direct DOM manipulation (no
 * external dependency needed since React does not server-render this app
 * and all pages are client-side only — react-helmet-async is unnecessary).
 *
 * og:image and twitter:image are set globally in index.html (the approved
 * Tamu Academy logo) and shared across all routes, so they are not managed here.
 */
export default function PageMeta({
  title,
  description,
  path,               // e.g. '/about'  — used for canonical + og:url
  type = 'website',
  noindex = false,
}) {
  const canonical = `${BASE_URL}${path ?? '/'}`;

  useEffect(() => {
    // Title
    document.title = title;

    const setMeta = (selector, attr, value) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        const [attrName, attrVal] = selector.match(/\[([^\]]+)="([^"]+)"\]/)?.slice(1) ?? [];
        if (attrName) el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    const setLink = (rel, href) => {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    // Standard meta
    setMeta('meta[name="description"]', 'content', description);
    if (noindex) {
      setMeta('meta[name="robots"]', 'content', 'noindex, nofollow');
    } else {
      const robots = document.querySelector('meta[name="robots"]');
      if (robots) robots.setAttribute('content', 'index, follow');
    }

    // Canonical
    setLink('canonical', canonical);

    // Open Graph
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', canonical);
    setMeta('meta[property="og:type"]', 'content', type);
    setMeta('meta[property="og:site_name"]', 'content', 'Tamu Academy');

    // Twitter
    setMeta('meta[name="twitter:card"]', 'content', 'summary');
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);

    // Cleanup: restore on unmount so stale tags don't persist during navigation
    return () => {
      document.title = 'Tamu Academy';
    };
  }, [title, description, canonical, type, noindex]);

  return null;
}