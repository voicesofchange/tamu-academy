import React from 'react';

const bodyText = { color: 'rgba(243,234,216,0.78)', fontSize: '0.94rem', lineHeight: 1.75, fontWeight: 300 };
const claimText = { ...bodyText, color: 'rgba(243,234,216,0.68)', fontStyle: 'italic', margin: '0 0 0.3rem' };
const linkStyle = {
  color: '#e8b85b',
  fontSize: '0.86rem',
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
  wordBreak: 'break-word',
};

/**
 * ModuleSources — the source list for a module lesson.
 *
 * Each entry states the claim in the lesson and links straight to the
 * published source that supports it. Claims whose source could not be verified
 * are kept in a separate list, plainly marked, rather than being given an
 * invented citation. Renders nothing when the module carries no sources.
 */
export default function ModuleSources({ sources, unsourced, labels }) {
  const hasSources = Array.isArray(sources) && sources.length > 0;
  const hasUnsourced = Array.isArray(unsourced) && unsourced.length > 0;
  if (!hasSources && !hasUnsourced) return null;

  return (
    <div>
      {hasSources && (
        <ol style={{ margin: 0, paddingLeft: '1.25rem' }}>
          {sources.map((entry, index) => (
            <li key={index} style={{ marginBottom: '1.15rem' }}>
              <p className="font-body" style={claimText}>{entry.claim}</p>
              <a
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body"
                style={linkStyle}
              >
                {[entry.publisher, entry.title, entry.year].filter(Boolean).join(' \u2014 ')}
              </a>
            </li>
          ))}
        </ol>
      )}

      {hasUnsourced && (
        <div style={{ marginTop: hasSources ? '2rem' : 0 }}>
          <h4
            className="font-body"
            style={{
              color: 'rgba(243,234,216,0.9)',
              fontSize: '0.7rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontWeight: 600,
              margin: '0 0 0.6rem',
            }}
          >
            {labels.unsourcedHeading}
          </h4>
          <p className="font-body" style={{ ...bodyText, color: 'rgba(243,234,216,0.6)', fontSize: '0.86rem', margin: '0 0 0.9rem' }}>
            {labels.unsourcedNote}
          </p>
          <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
            {unsourced.map((entry, index) => (
              <li key={index} style={{ marginBottom: '0.9rem' }}>
                <p className="font-body" style={claimText}>{entry.claim}</p>
                <p className="font-body" style={{ ...bodyText, fontSize: '0.84rem', color: 'rgba(243,234,216,0.55)', margin: 0 }}>
                  {entry.note}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}