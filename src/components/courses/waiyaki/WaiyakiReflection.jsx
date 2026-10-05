import React, { useState } from 'react';

const bodyText = {
  color: 'rgba(243,234,216,0.82)',
  fontSize: '1rem',
  lineHeight: 1.85,
  fontWeight: 300,
};

/**
 * WaiyakiReflection — the module's reflection prompts, grouped exactly as the
 * guide groups them (by module part), with a private writing space and an
 * acknowledgment that saves progress.
 *
 * The learner's writing is theirs: it stays on the page and is not stored on
 * the platform. Only the acknowledgment is saved, so the module can be
 * completed without the learner's private thinking leaving their screen.
 */
export default function WaiyakiReflection({ reflection, acknowledged, canSave, onAcknowledge, saving }) {
  const [notes, setNotes] = useState('');
  if (!reflection || !reflection.groups || reflection.groups.length === 0) return null;

  return (
    <section style={{ marginBottom: '2.75rem' }}>
      <h2
        className="font-heading"
        style={{
          color: '#f8f0df',
          fontSize: 'clamp(1.35rem, 3vw, 1.85rem)',
          fontWeight: 400,
          margin: '0 0 1.25rem',
        }}
      >
        Reflection
      </h2>

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
              <li
                key={prompt}
                className="font-body"
                style={{ ...bodyText, marginBottom: '0.7rem' }}
              >
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
            You have responded to this module&rsquo;s reflection prompts.
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
              My reflection
            </label>
            <textarea
              id="waiyaki-reflection-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={6}
              placeholder="Write your thinking here. It stays on this page."
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
                marginBottom: '1rem',
              }}
            />
            <button
              type="button"
              onClick={() => onAcknowledge(notes)}
              disabled={saving}
              className="font-body"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                color: '#24150f',
                backgroundColor: '#e8b85b',
                border: 'none',
                borderRadius: '2px',
                padding: '0.7rem 1.5rem',
                fontSize: '0.76rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontWeight: 600,
                cursor: saving ? 'wait' : 'pointer',
                opacity: saving ? 0.6 : 1,
              }}
            >
              {saving ? 'Saving...' : 'I have responded'}
            </button>
            <p
              className="font-body"
              style={{
                ...bodyText,
                fontSize: '0.8rem',
                color: 'rgba(243,234,216,0.5)',
                margin: '0.9rem 0 0',
              }}
            >
              Your reflection is private. What you write is not stored on the platform and is never
              shared or graded.
            </p>
          </div>
        )
      )}
    </section>
  );
}