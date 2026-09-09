import { useState, useEffect, useRef } from 'react';
import { useTranslation } from './LanguageContext';
import { base44 } from '@/api/base44Client';

const CACHE_PREFIX = 'tamu_page_tr_';

/**
 * useTranslatedContent — translates a page's text content object when a
 * non-English language is selected. Returns the original content for 'en',
 * a cached translation from sessionStorage if available, or fetches a fresh
 * translation via the translatePageContent backend function.
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
      return;
    }

    const cacheKey = `${CACHE_PREFIX}${pageKey}_${language}`;

    // Check sessionStorage cache first
    try {
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        setTranslated(JSON.parse(cached));
        return;
      }
    } catch {
      // sessionStorage may be unavailable
    }

    let cancelled = false;
    setIsLoading(true);

    base44.functions
      .invoke('translatePageContent', { texts: contentRef.current, language })
      .then((res) => {
        if (cancelled) return;
        const translations = res.data?.translations || contentRef.current;
        setTranslated(translations);
        try {
          sessionStorage.setItem(cacheKey, JSON.stringify(translations));
        } catch {
          // Ignore storage errors
        }
      })
      .catch(() => {
        if (cancelled) return;
        setTranslated(contentRef.current);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [pageKey, language]);

  return { content: translated, isLoading };
}