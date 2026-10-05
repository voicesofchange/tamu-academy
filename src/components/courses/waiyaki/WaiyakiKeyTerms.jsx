import React from 'react';

/**
 * WaiyakiKeyTerms — the module's key terms, each with its plain definition.
 * Local Kiswahili and G\u0129k\u0169y\u0169 terms are introduced here on first use so a
 * learner new to this history is never left guessing.
 */
export default function WaiyakiKeyTerms({ terms }) {
  if (!terms || terms.length === 0) return null;

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
        Key terms
      </h2>
      <dl style={{ margin: 0, padding: 0 }}>
        {terms.map((item) => (
          <div
            key={item.term}
            style={{
              padding: '0.9rem 0',
              borderTop: '1px solid rgba(232,184,91,0.16)',
            }}
          >
            <dt
              className="font-body"
              style={{
                color: '#e8b85b',
                fontSize: '0.95rem',
                fontWeight: 500,
                marginBottom: '0.25rem',
              }}
            >
              {item.term}
            </dt>
            <dd
              className="font-body"
              style={{
                color: 'rgba(243,234,216,0.78)',
                fontSize: '0.95rem',
                lineHeight: 1.8,
                fontWeight: 300,
                margin: 0,
                maxWidth: '62ch',
              }}
            >
              {item.definition}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}