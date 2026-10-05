import React from 'react';

const bodyText = { color: 'rgba(243,234,216,0.78)', fontSize: '0.95rem', lineHeight: 1.8, fontWeight: 300 };

/**
 * SokoInternationalComparison — the optional comparison prompt that lets a
 * learner outside Kenya read the module's question against their own
 * context. It is deliberately marked as optional and as complementary, and
 * the note states plainly that the two systems are not interchangeable.
 */
export default function SokoInternationalComparison({ comparison }) {
  if (!comparison) return null;

  return (
    <div
      style={{
        padding: '1.5rem 1.75rem',
        border: '1px dashed rgba(232,184,91,0.28)',
        borderRadius: '4px',
        backgroundColor: 'rgba(232,184,91,0.03)',
      }}
    >
      <span
        className="font-body"
        style={{ color: '#e8b85b', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.6rem' }}
      >
        Optional
      </span>
      <h3 className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.05rem,2.2vw,1.3rem)', fontWeight: 400, margin: '0 0 0.75rem' }}>
        {comparison.title}
      </h3>
      {comparison.prompt && (
        <p className="font-body" style={{ ...bodyText, marginBottom: '1.1rem' }}>{comparison.prompt}</p>
      )}
      {Array.isArray(comparison.questions) && comparison.questions.length > 0 && (
        <ol className="font-body" style={{ ...bodyText, margin: '0 0 1.1rem', paddingLeft: '1.35rem' }}>
          {comparison.questions.map((q, i) => (
            <li key={i} style={{ marginBottom: '0.5rem' }}>{q}</li>
          ))}
        </ol>
      )}
      {comparison.note && (
        <p
          className="font-body"
          style={{ ...bodyText, fontSize: '0.87rem', fontStyle: 'italic', color: 'rgba(243,234,216,0.62)', margin: 0, paddingTop: '1rem', borderTop: '1px solid rgba(232,184,91,0.15)' }}
        >
          {comparison.note}
        </p>
      )}
      <p className="font-body" style={{ ...bodyText, fontSize: '0.82rem', color: 'rgba(243,234,216,0.45)', margin: '0.85rem 0 0' }}>
        Nothing needs to be written here. The comparison is for your own thinking.
      </p>
    </div>
  );
}