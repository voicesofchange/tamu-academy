import { useState, useEffect, useRef } from 'react';
import { useTranslation } from './LanguageContext';
import { base44 } from '@/api/base44Client';
import { applyStrings, chunkStrings, flattenStrings } from './translate-data';

const CACHE_PREFIX = 'tamu_page_tr_';

/**
 * useTranslatedContent — translates a page's text content object when a
 * non-English language is selected. Returns the original content for 'en',
 * a cached translation from sessionStorage if available, or fetches a fresh
 * translation via the translatePageContent backend function.
 *
 * Nested content is flattened to dotted paths and sent in bounded batches, so
 * a large page (the Learner's Guide sections) is translated completely instead
 * of failing on one oversized request. Any failure leaves that page in English
 * rather than blocking it.
 *
 * The content object MUST be a stable reference (define it as a module-level
 * constant outside the component, or wrap in useMemo). A changing reference
 * would re-trigger the translation effect on every render.
 *
 * @param {string} pageKey - Unique cache key for this page (e.g. 'about')
 * @param {Object} content - Stable object of text strings to translate
 * @returns {{ content: Object, isLoading: boolean }}
 */
export function useTranslatedContent(pageKey, content) {
  const { language } = useTranslation();
  const [translated, setTranslated] = useState(content);
  const [isLoading, setIsLoading] = useState(false);
  const contentRef = useRef(content);
  contentRef.current = content;

  useEffect(() => {
    if (!language || language === 'en') {
      setTranslated(contentRef.current);
      setIsLoading(false);
      return undefined;
    }

    const cacheKey = `${CACHE_PREFIX}${pageKey}_${language}`;

    // Check sessionStorage cache first
    try {
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        setTranslated(JSON.parse(cached));
        setIsLoading(false);
        return undefined;
      }
    } catch {
      // sessionStorage may be unavailable
    }

    let cancelled = false;
    setIsLoading(true);

    (async () => {
      const fields = flattenStrings(contentRef.current);
      if (Object.keys(fields).length === 0) {
        if (!cancelled) {
          setTranslated(contentRef.current);
          setIsLoading(false);
        }
        return;
      }

      const merged = {};
      try {
        for (const chunk of chunkStrings(fields)) {
          const res = await base44.functions.invoke('translatePageContent', {
            texts: chunk,
            language,
          });
          if (cancelled) return;
          Object.assign(merged, chunk, res?.data?.translations || {});
        }
      } catch {
        if (cancelled) return;
        // The endpoint refused or failed: keep this page in English.
        setTranslated(contentRef.current);
        setIsLoading(false);
        return;
      }

      if (cancelled) return;
      const next = applyStrings(contentRef.current, merged);
      setTranslated(next);
      setIsLoading(false);
      try {
        sessionStorage.setItem(cacheKey, JSON.stringify(next));
      } catch {
        // Ignore storage errors
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [pageKey, language]);

  return { content: translated, isLoading };
}