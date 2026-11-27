import React, { useState } from 'react';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

// Visible text on this screen, translated with the rest of the page.
const UI_TEXT = {
  youHaveRespondedToThis: 'You have responded to this module’s reflection prompts.',
  myReflection: 'My reflection',
  writeYourThinkingHereIt: 'Write your thinking here. It stays on this page.',
  yourReflectionIsPrivateWhat: 'Your reflection is private. What you write is not stored on the platform and is never shared or graded. Mark this exercise complete in the completion requirements below.',
};

const bodyText = {
  color: 'rgba(243,234,216,0.82)',
  fontSize: '1rem',
  lineHeight: 1.85,
  fontWeight: 300,
};

/**
 * WaiyakiReflection — the module's reflection prompts, grouped exactly as the
 * guide groups them (by module part), with a private writing space.
 *
 * The learner's writing is theirs: it stays on the page and is not stored on
 * the platform. Responding to the prompts is marked complete from the module's
 * completion requirements, exactly as every other Tamu Academy course does it.
 */
export default function WaiyakiReflection({ reflection, acknowledged, canSave }) {
  const { content: uiText } = useTranslatedContent('ui-components-courses-waiyaki-waiyakireflection', UI_TEXT);
  const [notes, setNotes] = useState('');
  if (!reflection || !reflection.groups || reflection.groups.length === 0) return null;

  return (
    <div>
      {reflection.groups.map((group) => (
        <div key={group.heading} style={{ marginBottom: '1.75rem' }}>
          <h3
            className="font-body"
            style={{
              color: '#e8b85b',
              fontSize: '0.64rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontWeight: 600,
              margin: '0 0 0.85rem',
            }}
          >
            {group.heading}
          </h3>
          <ol style={{ margin: 0, paddingLeft: '1.25rem' }}>
            {group.prompts.map((prompt) => (
              <li key={prompt} className="font-body" style={{ ...bodyText, marginBottom: '0.7rem' }}>
                {prompt}
              </li>
            ))}
          </ol>
        </div>
      ))}

      {acknowledged ? (
        <div
          style={{
            padding: '1.1rem 1.4rem',
            border: '1px solid rgba(232,184,91,0.35)',
            borderRadius: '4px',
            backgroundColor: 'rgba(232,184,91,0.04)',
          }}
        >
          <p className="font-body" style={{ ...bodyText, fontSize: '0.92rem', margin: 0, color: '#e8b85b' }}>
            {uiText.youHaveRespondedToThis}
          </p>
        </div>
      ) : (
        canSave && (
          <div
            style={{
              padding: '1.4rem 1.6rem',
              border: '1px dashed rgba(232,184,91,0.25)',
              borderRadius: '4px',
              backgroundColor: 'rgba(243,234,216,0.015)',
            }}
          >
            <label
              htmlFor="waiyaki-reflection-notes"
              className="font-body"
              style={{
                display: 'block',
                color: '#e8b85b',
                fontSize: '0.62rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                fontWeight: 600,
                marginBottom: '0.6rem',
              }}
            >
              {uiText.myReflection}
            </label>
            <textarea
              id="waiyaki-reflection-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={6}
              placeholder={uiText.writeYourThinkingHereIt}
              className="font-body"
              style={{
                width: '100%',
                boxSizing: 'border-box',
                backgroundColor: 'rgba(20,14,10,0.55)',
                border: '1px solid rgba(232,184,91,0.25)',
                borderRadius: '3px',
                color: '#f8f0df',
                fontSize: '0.95rem',
                lineHeight: 1.8,
                fontWeight: 300,
                padding: '0.9rem 1rem',
                resize: 'vertical',
                marginBottom: '0.9rem',
              }}
            />
            <p
              className="font-body"
              style={{
                ...bodyText,
                fontSize: '0.8rem',
                color: 'rgba(243,234,216,0.5)',
                margin: 0,
              }}
            >
              {uiText.yourReflectionIsPrivateWhat}
            </p>
          </div>
        )
      )}
    </div>
  );
}