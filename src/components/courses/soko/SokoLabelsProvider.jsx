import React, { createContext, useContext } from 'react';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';
import { SOKO_UI_LABELS } from '@/lib/soko-ui-labels';

/**
 * SokoLabelsProvider — makes the Sauti za Soko interface labels available
 * to every component in the pathway in the learner's selected language.
 *
 * It reuses the app's existing translation infrastructure: one call to
 * translatePageContent per language, cached in sessionStorage under a single
 * page key, so moving between Soko pages costs nothing after the first.
 *
 * The default context value is the English label set, so any Soko component
 * rendered outside a provider still reads correctly.
 */
const SokoLabelsContext = createContext(SOKO_UI_LABELS);

export function SokoLabelsProvider({ children }) {
  const { content } = useTranslatedContent('soko_ui', SOKO_UI_LABELS);
  return (
    <SokoLabelsContext.Provider value={content}>{children}</SokoLabelsContext.Provider>
  );
}

export function useSokoLabels() {
  return useContext(SokoLabelsContext);
}