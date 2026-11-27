import React from 'react';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

// Visible text on this screen, translated with the rest of the page.
const UI_TEXT = {
  checklist: 'Checklist',
};

/**
 * DeckChecklist — what to confirm on the live platform before presenting.
 * A static list: it is read once at the moment of presenting, not tracked.
 */
export default function DeckChecklist({ checklist }) {
  const { content: uiText } = useTranslatedContent('ui-components-deck-deckchecklist', UI_TEXT);
  return (
    <section style={{ marginTop: 'clamp(3rem, 6vw, 5rem)' }}>
      <span className="font-body" style={{ color: '#e8b85b', fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 500 }}>
        {uiText.checklist}
      </span>
      <h2
        className="font-heading"
        style={{ color: '#f8f0df', fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)', fontWeight: 400, lineHeight: 1.12, margin: '0.7rem 0 0.9rem' }}
      >
        {checklist.heading}
      </h2>
      <p className="font-body" style={{ color: 'rgba(243,234,216,0.7)', fontSize: '0.94rem', lineHeight: 1.8, fontWeight: 300, maxWidth: '660px', margin: '0 0 2rem' }}>
        {checklist.intro}
      </p>

      <ol style={{ listStyle: 'none', padding: 0, margin: 0, borderTop: '1px solid rgba(232,184,91,0.18)' }}>
        {checklist.items.map((item, index) => (
          <li
            key={item}
            className="font-body"
            style={{
              display: 'flex',
              gap: '1.1rem',
              alignItems: 'flex-start',
              padding: '1rem 0',
              borderBottom: '1px solid rgba(232,184,91,0.12)',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                flex: 'none',
                marginTop: '0.15rem',
                width: '1rem',
                height: '1rem',
                border: '1px solid rgba(232,184,91,0.55)',
                borderRadius: '2px',
              }}
            />
            <span style={{ color: 'rgba(243,234,216,0.86)', fontSize: '0.92rem', lineHeight: 1.7, fontWeight: 300 }}>
              {item}
            </span>
            <span aria-hidden="true" className="font-heading" style={{ marginLeft: 'auto', color: 'rgba(232,184,91,0.5)', fontSize: '0.85rem' }}>
              {String(index + 1).padStart(2, '0')}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}