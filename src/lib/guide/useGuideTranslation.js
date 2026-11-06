import { useMemo } from 'react';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';
import { applyStrings, flattenStrings } from '@/lib/i18n/translate-data';
import { GUIDE_PHASES, GUIDE_SECTIONS } from './sections';

/**
 * useTranslatedGuideSection — the section a learner is reading, in their own
 * language: its title, proverb, introduction, framework cards, exercises,
 * instructions, field labels, rating statements, takeaways and closing prompt.
 *
 * The section's identifiers and its table row labels are not translated, so
 * answers already saved under those keys continue to read back unchanged.
 */
export function useTranslatedGuideSection(section) {
  const strings = useMemo(() => (section ? flattenStrings(section) : {}), [section]);
  const pageKey = `guide-section-${section ? section.id : 'none'}`;
  const { content } = useTranslatedContent(pageKey, strings);
  return useMemo(() => (section ? applyStrings(section, content) : null), [section, content]);
}

/** The guide's three phases: their headings and introductory lines. */
export function useTranslatedGuidePhases() {
  const strings = useMemo(() => flattenStrings(GUIDE_PHASES), []);
  const { content } = useTranslatedContent('guide-phases', strings);
  return useMemo(() => applyStrings(GUIDE_PHASES, content), [content]);
}

/**
 * The short summary each section card shows on the guide home: its English
 * title and its proverb. The section's full content is translated only when
 * the learner opens it.
 */
const SUMMARY_STRINGS = (() => {
  const strings = {};
  GUIDE_SECTIONS.forEach((section) => {
    strings[`${section.id}.english`] = section.english;
    if (section.proverb && section.proverb.en) {
      strings[`${section.id}.proverb`] = section.proverb.en;
    }
  });
  return strings;
})();

export function useTranslatedSectionSummaries() {
  const { content } = useTranslatedContent('guide-summaries', SUMMARY_STRINGS);
  return useMemo(() => {
    const summaries = {};
    GUIDE_SECTIONS.forEach((section) => {
      summaries[section.id] = {
        english: content[`${section.id}.english`] || section.english,
        proverb: content[`${section.id}.proverb`] || (section.proverb ? section.proverb.en : ''),
      };
    });
    return summaries;
  }, [content]);
}