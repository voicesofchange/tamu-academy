import React from 'react';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

// Visible text on this screen, translated with the rest of the page.
const UI_TEXT = {
  notSavedCheckYourConnection: 'Not saved — check your connection',
  answersSaveAsYouType: 'Answers save as you type',
};

/**
 * SavedIndicator — a quiet confirmation that an answer has been written to the
 * learner's own account. Announced politely for screen readers.
 */
export default function SavedIndicator({ state, tone = 'cream' }) {
  const { content: uiText } = useTranslatedContent('ui-components-guide-savedindicator', UI_TEXT);
  const label =
    state === 'saving' ? 'Saving…' : state === 'saved' ? 'Saved' : state === 'error' ? uiText.notSavedCheckYourConnection : uiText.answersSaveAsYouType;

  const color = state === 'error' ? '#a4342a' : tone === 'dark' ? 'rgba(201,150,26,0.9)' : '#8A650B';

  return (
    <span
      aria-live="polite"
      className="font-guide-body"
      style={{ display: 'inline-block', color, fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500 }}
    >
      {label}
    </span>
  );
}