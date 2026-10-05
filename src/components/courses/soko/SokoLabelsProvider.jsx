import React, { createContext, useContext, useMemo } from 'react';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';
import {
  SOKO_MODULE_LABELS,
  SOKO_PAGE_LABELS,
  SOKO_FACILITATOR_LABELS,
  SOKO_UI_LABELS,
} from '@/lib/soko-ui-labels';

/**
 * SokoLabelsProvider — makes the Sauti za Soko interface labels available
 * to every component in the pathway in the learner's selected language.
 *
 * It reuses the app's existing translation infrastructure: one call to
 * translatePageContent per label set per language, each cached in
 * sessionStorage, so moving between Soko pages costs nothing after the first.
 * The set is split in two because that endpoint caps a request at 100 keys.
 *
 * The default context value is the merged English labels, so any Soko
 * component rendered outside a provider still reads correctly.
 */
const SokoLabelsContext = createContext(SOKO_UI_LABELS);

export function SokoLabelsProvider({ children }) {
  const { content: moduleLabels } = useTranslatedContent('soko_ui_module', SOKO_MODULE_LABELS);
  const { content: pageLabels } = useTranslatedContent('soko_ui_pages', SOKO_PAGE_LABELS);
  const { content: facilitatorLabels } = useTranslatedContent(
    'soko_ui_facilitator',
    SOKO_FACILITATOR_LABELS,
  );

  const value = useMemo(
    () => ({ ...moduleLabels, ...pageLabels, ...facilitatorLabels }),
    [moduleLabels, pageLabels, facilitatorLabels],
  );

  return (
    <SokoLabelsContext.Provider value={value}>{children}</SokoLabelsContext.Provider>
  );
}

export function useSokoLabels() {
  return useContext(SokoLabelsContext);
}