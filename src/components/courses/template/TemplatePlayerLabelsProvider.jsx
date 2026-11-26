import React, { createContext, useContext } from 'react';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';
import { TEMPLATE_PLAYER_LABELS } from '@/lib/template-player-labels';

/**
 * TemplatePlayerLabelsProvider — the template course player's interface
 * labels in the learner's selected language, for the outline sidebar, the
 * progress bar and the footer.
 *
 * One translatePageContent call per language, cached in sessionStorage, the
 * same way SokoLabelsProvider works. The default context value is the English
 * labels, so a player component rendered outside the provider still reads
 * correctly.
 */
const TemplatePlayerLabelsContext = createContext(TEMPLATE_PLAYER_LABELS);

export function TemplatePlayerLabelsProvider({ children }) {
  const { content } = useTranslatedContent('template_player_ui', TEMPLATE_PLAYER_LABELS);
  return (
    <TemplatePlayerLabelsContext.Provider value={content}>{children}</TemplatePlayerLabelsContext.Provider>
  );
}

export function useTemplatePlayerLabels() {
  return useContext(TemplatePlayerLabelsContext);
}
