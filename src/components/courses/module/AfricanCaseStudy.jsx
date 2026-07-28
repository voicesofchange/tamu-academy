import React from 'react';

const bodyText = {
  color: 'rgba(245,239,224,0.78)',
  fontSize: '0.93rem',
  lineHeight: 1.85,
  fontWeight: 300,
};

/**
 * African case study block for the expanded lesson format. Renders a framed
 * case study with optional sub-headings, a comparison table, key takeaways,
 * and source notes. Avoids fabricated statistics: narratives are directional
 * and reference institutions rather than committing to specific numbers a
 * learner could be expected to verify.
 *
 * Props (caseStudy): { title, location, intro, sections: [{ heading, paragraphs }],
 *                      comparison: [{ dimension, narrative }], takeaways: [], sources: [] }
 */
export default function AfricanCaseStudy({ caseStudy }) {
  if (!caseStudy) return null;
  const {
    title,
    location,
    intro,
    sections = [],
    comparison = [],
    takeaways = [],
    sources = [],
  } = caseStudy;

  return (
    <div>
      <h3
        className="font-heading"
        style={{
          color: '#F5EFE0',
          fontSize: 'clamp(1.1rem, 2.4vw, 1.4rem)',
          fontWeight: 400,
          lineHeight: 1.25,
          margin: '0 0 0.5rem',
        }}
      >
        {title}
      </h3>
      {location && (
        <p
          className="font-body"
          style={{
            color: 'rgba(212,161,42,0.85)',
            fontSize: '0.72rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}
        >
          {location}
        </p>
      )}

      {intro && (
        <p className="font-body" style={{ ...bodyText, marginBottom: '1.5rem' }}>
          {intro}
        </p>
      )}

      {sections.map((s, i) => (
        <div key={i} style={{ marginBottom: '1.75rem' }}>
          {s.heading && (
            <h4
              className="font-heading"
              style={{
                color: 'rgba(212,161,42,0.85)',
                fontSize: '0.82rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                fontWeight: 500,
                marginBottom: '0.6rem',
              }}
            >
              {s.heading}
            </h4>
          )}
          {(s.paragraphs || []).map((p, j) => (
            <p key={j} className="font-body" style={{ ...bodyText, marginBottom: '0.85rem' }}>
              {p}
            </p>
          ))}
        </div>
      ))}

      {comparison.length > 0 && (
        <div style={{ marginTop: '1.5rem', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem' }}>
            <thead>
              <tr>
                <th
                  style={{
                    padding: '0.55rem 0.8rem',
                    textAlign: 'left',
                    borderBottom: '1px solid rgba(212,161,42,0.3)',
                    color: '#D4A12A',
                    fontSize: '0.68rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                  }}
                >
                  Dimension
                </th>
                <th
                  style={{
                    padding: '0.55rem 0.8rem',
                    textAlign: 'left',
                    borderBottom: '1px solid rgba(212,161,42,0.3)',
                    color: '#F5EFE0',
                    fontWeight: 400,
                  }}
                >
                  What the evidence shows
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row, i) => (
                <tr key={i}>
                  <td
                    style={{
                      padding: '0.55rem 0.8rem',
                      borderBottom: '1px solid rgba(245,239,224,0.08)',
                      color: 'rgba(212,161,42,0.85)',
                      fontWeight: 500,
                      verticalAlign: 'top',
                    }}
                  >
                    {row.dimension}
                  </td>
                  <td
                    style={{
                      padding: '0.55rem 0.8rem',
                      borderBottom: '1px solid rgba(245,239,224,0.08)',
                      color: 'rgba(245,239,224,0.78)',
                      verticalAlign: 'top',
                      lineHeight: 1.7,
                    }}
                  >
                    {row.narrative}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {takeaways.length > 0 && (
        <div
          style={{
            marginTop: '1.5rem',
            padding: '1rem 1.25rem',
            border: '1px solid rgba(212,161,42,0.22)',
            borderRadius: '4px',
            background: 'rgba(245,239,224,0.02)',
          }}
        >
          <span
            style={{
              color: '#D4A12A',
              fontSize: '0.66rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              fontWeight: 500,
              display: 'block',
              marginBottom: '0.65rem',
            }}
          >
            Key Takeaways
          </span>
          <ul style={{ listStyle: 'disc', margin: 0, paddingLeft: '1.2rem' }}>
            {takeaways.map((t, i) => (
              <li
                key={i}
                className="font-body"
                style={{ ...bodyText, fontSize: '0.88rem', marginBottom: '0.45rem' }}
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      )}

      {sources.length > 0 && (
        <p
          className="font-body"
          style={{
            ...bodyText,
            fontStyle: 'italic',
            fontSize: '0.82rem',
            color: 'rgba(245,239,224,0.55)',
            marginTop: '1rem',
            marginBottom: 0,
          }}
        >
          Sources for this case study: {sources.join('; ')}.
        </p>
      )}
    </div>
  );
}