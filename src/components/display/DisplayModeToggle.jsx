import React from 'react';
import { Gauge, Feather } from 'lucide-react';
import { useDisplayMode } from '@/lib/display-mode';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

const CONTENT = {
  standard: 'Standard',
  dataSaver: 'Data-Saver',
  enableLabel: 'Switch on Data-Saver mode: lesson text only, no media downloaded',
  disableLabel: 'Switch off Data-Saver mode and return to the full experience',
  hint: 'Data-Saver keeps lessons to text, with recordings loaded only when you ask for them.',
};

/**
 * DisplayModeToggle — the single global control for the Standard / Data-Saver
 * preference. Rendered once in the site navigation, in two shapes: a compact
 * pill for the desktop bar and a full-width switch row for the mobile menu.
 *
 * The control reports the current state (not the action) and is announced as a
 * switch, so a screen reader hears the mode it is in.
 */
export default function DisplayModeToggle({ variant = 'pill' }) {
  const { isDataSaver, setMode } = useDisplayMode();
  const { content: c } = useTranslatedContent('display-mode-toggle', CONTENT);

  const label = isDataSaver ? c.dataSaver : c.standard;
  const ariaLabel = isDataSaver ? c.disableLabel : c.enableLabel;
  const Icon = isDataSaver ? Feather : Gauge;

  const handleToggle = () => setMode(isDataSaver ? 'standard' : 'data_saver');

  if (variant === 'row') {
    return (
      <button
        type="button"
        role="switch"
        aria-checked={isDataSaver}
        aria-label={ariaLabel}
        title={ariaLabel}
        onClick={handleToggle}
        className="tamu-mode-toggle"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          width: '100%',
          background: 'none',
          border: 'none',
          borderBottom: '1px solid rgba(232,184,91,0.07)',
          padding: '0.85rem 0',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span
          style={{
            color: isDataSaver ? '#e8b85b' : 'rgba(243,234,216,0.82)',
            fontSize: '0.8rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            fontWeight: 500,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {label}
        </span>
        <span
          aria-hidden="true"
          style={{
            position: 'relative',
            flexShrink: 0,
            width: '40px',
            height: '22px',
            borderRadius: '11px',
            border: '1px solid rgba(232,184,91,0.5)',
            backgroundColor: isDataSaver ? '#e8b85b' : 'transparent',
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: '3px',
              left: isDataSaver ? '21px' : '3px',
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              backgroundColor: isDataSaver ? '#24150f' : 'rgba(232,184,91,0.85)',
            }}
          />
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDataSaver}
      aria-label={ariaLabel}
      title={ariaLabel}
      onClick={handleToggle}
      className="tamu-mode-toggle tamu-nav-link"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.35rem',
        fontSize: '0.62rem',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        fontWeight: 500,
        fontFamily: "'DM Sans', sans-serif",
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        borderRadius: '2px',
        padding: '0.3rem 0.65rem',
        border: '1px solid rgba(232,184,91,0.5)',
        backgroundColor: isDataSaver ? '#e8b85b' : 'transparent',
        color: isDataSaver ? '#24150f' : '#e8b85b',
      }}
    >
      <Icon size={12} strokeWidth={2} aria-hidden="true" />
      {label}
    </button>
  );
}