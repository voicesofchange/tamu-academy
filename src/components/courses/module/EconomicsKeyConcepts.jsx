import React from 'react';

const bodyText = { color: 'rgba(243,234,216,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };

/**
 * EconomicsKeyConcepts — the shared key-concept list for the economics
 * lessons. Renders each recorded term with its definition and, where the
 * module records one, a worked example.
 */
export default function EconomicsKeyConcepts({ concepts, examplePrefix }) {
  if (!Array.isArray(concepts) || concepts.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {concepts.map((concept) => (
        <div key={concept.term}>
          <h3 className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.05rem, 2.2vw, 1.35rem)', fontWeight: 400, lineHeight: 1.3, margin: '0 0 0.6rem' }}>
            {concept.term}
          </h3>
          <p className="font-body" style={{ ...bodyText, marginBottom: '0.6rem' }}>{concept.definition}</p>
          {concept.example && (
            <p className="font-body" style={{ ...bodyText, fontSize: '0.88rem', fontStyle: 'italic', color: 'rgba(243,234,216,0.62)', marginBottom: 0 }}>
              {examplePrefix}: {concept.example}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}