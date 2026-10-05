import React, { useState } from 'react';
import WaiyakiEvidenceLabel from '@/components/courses/waiyaki/WaiyakiEvidenceLabel';

const bodyText = {
  color: 'rgba(243,234,216,0.82)',
  fontSize: '1rem',
  lineHeight: 1.85,
  fontWeight: 300,
};

/**
 * WaiyakiSourceAnalysis — the module's source-analysis exercise: the two kinds
 * of source, what each can and cannot tell us, and the questions to ask of
 * every source.
 *
 * The learner writes their own reading of the evidence in a private space and
 * then records that they have worked through it. The writing stays on the page
 * and is not stored on the platform; what is saved is the acknowledgment, so
 * the module can be completed.
 */
export default function WaiyakiSourceAnalysis({ analysis, acknowledged, canSave, onAcknowledge, saving }) {
  const [notes, setNotes] = useState('');
  if (!analysis) return null;

  return (
    <section style={{ marginBottom: '2.75rem' }}>
      <h2
        className="font-heading"
        style={{
          color: '#f8f0df',
          fontSize: 'clamp(1.35rem, 3vw, 1.85rem)',
          fontWeight: 400,
          margin: '0 0 1rem',
        }}
      >
        {analysis.heading}
      </h2>
      <p
        className="font-body"
        style={{ ...bodyText, color: 'rgba(243,234,216,0.68)', fontStyle: 'italic' }}
      >
        {analysis.intro}
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem',
          margin: '1.5rem 0 2rem',
        }}
      >
        {analysis.lenses.map((lens) => (
          <div
            key={lens.heading}
            style={{
              padding: '1.4rem 1.6rem',
              border: '1px solid rgba(232,184,91,0.22)',
              borderRadius: '4px',
              backgroundColor: 'rgba(243,234,216,0.015)',
            }}
          >
            <h3
              className="font-heading"
              style={{ color: '#f8f0df', fontSize: '1.15rem', fontWeight: 400, margin: '0 0 1rem' }}
            >
              {lens.heading}
            </h3>
            {lens.paragraphs.map((paragraph, i) => (
              <p key={i} className="font-body" style={{ ...bodyText, fontSize: '0.94rem' }}>
                {paragraph.label && <WaiyakiEvidenceLabel label={paragraph.label} />}
                {paragraph.text}
              </p>
            ))}
            <dl style={{ margin: '1.25rem 0 0' }}>
              <div style={{ marginBottom: '0.6rem' }}>
                <dt
                  className="font-body"
                  style={{
                    color: '#8fc3a4',
                    fontSize: '0.6rem',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    marginBottom: '0.2rem',
                  }}
                >
                  Strength
                </dt>
                <dd className="font-body" style={{ ...bodyText, fontSize: '0.92rem', margin: 0 }}>
                  {lens.strength}
                </dd>
              </div>
              <div>
                <dt
                  className="font-body"
                  style={{
                    color: '#e8955c',
                    fontSize: '0.6rem',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    marginBottom: '0.2rem',
                  }}
                >
                  Weakness
                </dt>
                <dd className="font-body" style={{ ...bodyText, fontSize: '0.92rem', margin: 0 }}>
                  {lens.weakness}
                </dd>
              </div>
            </dl>
          </div>
        ))}
      </div>

      {analysis.questions && analysis.questions.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h3
            className="font-body"
            style={{
              color: '#e8b85b',
              fontSize: '0.66rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontWeight: 600,
              margin: '0 0 0.9rem',
            }}
          >
            Ask of every source
          </h3>
          <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {analysis.questions.map((item, i) => (
              <li
                key={item.question}
                style={{
                  display: 'flex',
                  gap: '0.9rem',
                  padding: '0.8rem 0',
                  borderTop: '1px solid rgba(232,184,91,0.16)',
                }}
              >
                <span
                  className="font-body"
                  aria-hidden="true"
                  style={{
                    color: '#d99b37',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    minWidth: '1.4rem',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>
                  <span
                    className="font-body"
                    style={{ color: '#f8f0df', fontWeight: 500, fontSize: '0.95rem', display: 'block' }}
                  >
                    {item.question}
                  </span>
                  <span
                    className="font-body"
                    style={{ ...bodyText, fontSize: '0.92rem', display: 'block', margin: 0 }}
                  >
                    {item.example}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}

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
            You have worked through this source analysis.
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
              htmlFor="waiyaki-source-notes"
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
              My reading of the evidence
            </label>
            <textarea
              id="waiyaki-source-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={5}
              placeholder="Which source did you find more useful here, and what is it unable to tell you?"
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
                gap: '0.4rem',
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
              {saving ? 'Saving...' : 'I have worked through this'}
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
              What you write here stays on this page and is not stored on the platform. Only the fact
              that you completed the exercise is saved.
            </p>
          </div>
        )
      )}
    </section>
  );
}