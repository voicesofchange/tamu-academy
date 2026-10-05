import React from 'react';
import { useSokoLabels } from '@/components/courses/soko/SokoLabelsProvider';
import { SOKO_UI_LABELS } from '@/lib/soko-ui-labels';

const bodyText = { color: 'rgba(243,234,216,0.78)', fontSize: '0.95rem', lineHeight: 1.8, fontWeight: 300 };

/**
 * SokoInternationalComparison — the supplement that follows each Kiambu
 * case. It carries concrete examples from markets in other regions, so a
 * learner anywhere can recognise the same economic question in a setting
 * they know, and then the comparison questions for their own context.
 *
 * It is always presented as an addition to the Kenyan case, never as a
 * replacement for it, and the note states plainly that the systems compared
 * are not interchangeable.
 */
export default function SokoInternationalComparison({ comparison }) {
  const labels = useSokoLabels() || SOKO_UI_LABELS;
  if (!comparison) return null;

  const examples = Array.isArray(comparison.examples) ? comparison.examples : [];

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
        {labels.comparisonBadge}
      </span>
      <h3 className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.05rem,2.2vw,1.3rem)', fontWeight: 400, margin: '0 0 0.75rem' }}>
        {comparison.title}
      </h3>
      {comparison.prompt && (
        <p className="font-body" style={{ ...bodyText, marginBottom: '0.6rem' }}>{comparison.prompt}</p>
      )}
      <p className="font-body" style={{ ...bodyText, fontSize: '0.87rem', fontStyle: 'italic', color: 'rgba(243,234,216,0.62)', marginBottom: '1.35rem' }}>
        {labels.comparisonFraming}
      </p>

      {examples.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <span
            className="font-body"
            style={{ color: '#e8b85b', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.85rem' }}
          >
            {labels.comparisonExamplesHeading}
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            {examples.map((entry, i) => (
              <div
                key={`${entry.region || 'example'}-${i}`}
                style={{
                  padding: '0.9rem 1.1rem',
                  borderLeft: '2px solid rgba(232,184,91,0.4)',
                  backgroundColor: 'rgba(243,234,216,0.015)',
                  borderRadius: '3px',
                }}
              >
                {entry.region && (
                  <span
                    className="font-body"
                    style={{ display: 'block', color: '#e8b85b', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500, marginBottom: '0.35rem' }}
                  >
                    {entry.region}
                  </span>
                )}
                <p className="font-body" style={{ ...bodyText, fontSize: '0.93rem', margin: 0 }}>
                  {entry.text}
                </p>
              </div>
            ))}
          </div>
        </div>
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
        {labels.comparisonNoWriting}
      </p>
    </div>
  );
}