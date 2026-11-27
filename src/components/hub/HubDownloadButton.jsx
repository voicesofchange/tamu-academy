import React from 'react';
import { Download } from 'lucide-react';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

// Visible text on this screen, translated with the rest of the page.
const UI_TEXT = {
  savedToYourDeviceAs: 'Saved to your device as a plain-text file',
};

const base = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.45rem',
  fontSize: '0.75rem',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  fontWeight: 500,
  borderRadius: '2px',
  padding: '0.6rem 1.15rem',
  cursor: 'pointer',
  fontFamily: 'inherit',
};

const primary = {
  ...base,
  color: '#24150f',
  backgroundColor: '#e8b85b',
  border: '1px solid #e8b85b',
};

const secondary = {
  ...base,
  color: '#e8b85b',
  backgroundColor: 'transparent',
  border: '1px solid rgba(232,184,91,0.5)',
};

/**
 * HubDownloadButton — saves one piece of the Learner Hub to the learner's
 * device. The file is built from the same content the section is rendering,
 * so what is downloaded always matches what is on screen.
 */
export default function HubDownloadButton({ onClick, label, secondary: isSecondary = false }) {
  const { content: uiText } = useTranslatedContent('ui-components-hub-hubdownloadbutton', UI_TEXT);
  return (
    <button
      type="button"
      onClick={onClick}
      className="font-body"
      style={isSecondary ? secondary : primary}
      title={uiText.savedToYourDeviceAs}
    >
      <Download size={14} aria-hidden="true" />
      {label}
    </button>
  );
}