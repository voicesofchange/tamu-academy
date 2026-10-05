import React, { useState } from 'react';
import { Play } from 'lucide-react';

/**
 * SaverMediaBlock — how a recording appears in Data-Saver mode.
 *
 * Instead of embedding the player on page load, it describes the recording in
 * plain text and offers one explicit button. The embed (video or audio) is only
 * mounted — and therefore only downloaded — after the learner taps that button,
 * which is what keeps a Data-Saver lesson cheap to open. A direct link is kept
 * alongside it for learners who would rather open the recording elsewhere.
 */
export default function SaverMediaBlock({
  title,
  meta,
  note,
  loadLabel = 'Load recording',
  alternativeHref,
  alternativeLabel,
  children,
}) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) return <>{children}</>;

  const isExternal = /^https?:/i.test(alternativeHref || '');

  return (
    <div
      style={{
        marginBottom: '2rem',
        padding: '1.15rem 1.3rem',
        border: '1px solid rgba(232,184,91,0.28)',
        borderRadius: '3px',
        backgroundColor: 'rgba(243,234,216,0.02)',
      }}
    >
      {title && (
        <p className="font-body" style={{ color: '#f8f0df', fontSize: '0.98rem', fontWeight: 400, lineHeight: 1.5, margin: '0 0 0.4rem' }}>
          {title}
        </p>
      )}
      {meta && (
        <p className="font-body" style={{ color: 'rgba(243,234,216,0.7)', fontSize: '0.85rem', lineHeight: 1.7, fontWeight: 300, margin: '0 0 0.5rem' }}>
          {meta}
        </p>
      )}
      {note && (
        <p className="font-body" style={{ color: 'rgba(243,234,216,0.66)', fontSize: '0.85rem', lineHeight: 1.7, fontWeight: 300, fontStyle: 'italic', margin: '0 0 0.85rem' }}>
          {note}
        </p>
      )}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
        <button
          type="button"
          onClick={() => setLoaded(true)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            backgroundColor: '#e8b85b',
            color: '#24150f',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.68rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            fontWeight: 600,
            border: 'none',
            borderRadius: '2px',
            padding: '0.6rem 1.1rem',
            cursor: 'pointer',
          }}
        >
          <Play size={12} strokeWidth={2} aria-hidden="true" />
          {loadLabel}
        </button>
        {alternativeHref && (
          <a
            href={alternativeHref}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="font-body"
            style={{ color: '#e8b85b', fontSize: '0.8rem', textDecoration: 'none', borderBottom: '1px dotted rgba(232,184,91,0.5)' }}
          >
            {alternativeLabel}
          </a>
        )}
      </div>
    </div>
  );
}