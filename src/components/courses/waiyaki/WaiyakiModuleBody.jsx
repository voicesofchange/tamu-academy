import React from 'react';
import WaiyakiEvidenceLabel from '@/components/courses/waiyaki/WaiyakiEvidenceLabel';

/**
 * WaiyakiModuleBody — renders the blocks of one module section.
 *
 * The module content is authored as a small, typed block list so the guide's
 * own shape survives: labelled paragraphs, bulleted points, sub-headings,
 * primary-source callouts, and the tables the guide uses to set two accounts
 * side by side. The section heading and its frame come from the shared lesson
 * section that wraps this, so only the body renders here.
 */
const bodyText = {
  color: 'rgba(243,234,216,0.82)',
  fontSize: '1rem',
  lineHeight: 1.85,
  fontWeight: 300,
  margin: '0 0 1.15rem',
};

const subheadingStyle = {
  color: '#e8b85b',
  fontSize: '0.68rem',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  fontWeight: 600,
  margin: '2rem 0 0.9rem',
};

export default function WaiyakiModuleBody({ section }) {
  const blocks = section.blocks || [];

  return (
    <>
      {section.intro && (
        <p
          className="font-body"
          style={{ ...bodyText, fontStyle: 'italic', color: 'rgba(243,234,216,0.68)' }}
        >
          {section.intro}
        </p>
      )}

      {blocks.map((block, i) => {
        if (block.type === 'subheading') {
          return (
            <h3 key={i} className="font-body" style={subheadingStyle}>
              {block.text}
            </h3>
          );
        }

        if (block.type === 'paragraph') {
          return (
            <p key={i} className="font-body" style={bodyText}>
              {block.label && <WaiyakiEvidenceLabel label={block.label} />}
              {block.text}
            </p>
          );
        }

        if (block.type === 'bulletParagraphs') {
          return (
            <ul key={i} style={{ listStyle: 'none', margin: '0 0 1.15rem', padding: 0 }}>
              {block.items.map((item, j) => (
                <li
                  key={j}
                  className="font-body"
                  style={{
                    ...bodyText,
                    display: 'flex',
                    gap: '0.7rem',
                    padding: '0.55rem 0',
                    borderTop: j === 0 ? '1px solid rgba(232,184,91,0.16)' : 'none',
                    borderBottom: '1px solid rgba(232,184,91,0.16)',
                  }}
                >
                  <span aria-hidden="true" style={{ color: '#d99b37', lineHeight: 1.85 }}>
                    &bull;
                  </span>
                  <span style={{ margin: 0 }}>
                    {item.label && <WaiyakiEvidenceLabel label={item.label} />}
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === 'bullets') {
          return (
            <dl key={i} style={{ margin: '0 0 1.15rem', padding: 0 }}>
              {block.items.map((item, j) => (
                <div
                  key={j}
                  style={{
                    padding: '0.85rem 0',
                    borderTop: '1px solid rgba(232,184,91,0.16)',
                  }}
                >
                  <dt
                    className="font-body"
                    style={{
                      color: '#f8f0df',
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      marginBottom: '0.25rem',
                    }}
                  >
                    {item.label && <WaiyakiEvidenceLabel label={item.label} />}
                    {item.title}
                  </dt>
                  <dd className="font-body" style={{ ...bodyText, margin: 0 }}>
                    {item.text}
                  </dd>
                </div>
              ))}
            </dl>
          );
        }

        if (block.type === 'callout') {
          return (
            <aside
              key={i}
              style={{
                margin: '0 0 1.5rem',
                padding: '1.25rem 1.5rem',
                border: '1px solid rgba(232,184,91,0.28)',
                borderLeft: '3px solid #e8b85b',
                borderRadius: '3px',
                backgroundColor: 'rgba(232,184,91,0.05)',
              }}
            >
              {block.label && (
                <span
                  className="font-body"
                  style={{
                    display: 'block',
                    color: '#e8b85b',
                    fontSize: '0.6rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    marginBottom: '0.45rem',
                  }}
                >
                  {block.label}
                </span>
              )}
              {block.heading && (
                <p
                  className="font-heading"
                  style={{
                    color: '#f8f0df',
                    fontSize: '1.2rem',
                    fontWeight: 400,
                    margin: '0 0 0.5rem',
                  }}
                >
                  {block.heading}
                </p>
              )}
              <p className="font-body" style={{ ...bodyText, margin: 0 }}>
                {block.text}
              </p>
            </aside>
          );
        }

        if (block.type === 'table') {
          return (
            <div key={i} style={{ margin: '0 0 1.75rem', overflowX: 'auto' }}>
              <table
                className="font-body"
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '0.9rem',
                  color: 'rgba(243,234,216,0.82)',
                }}
              >
                <thead>
                  <tr>
                    {block.columns.map((column) => (
                      <th
                        key={column}
                        scope="col"
                        style={{
                          textAlign: 'left',
                          color: '#e8b85b',
                          fontSize: '0.62rem',
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                          fontWeight: 600,
                          padding: '0.7rem 0.9rem',
                          borderBottom: '1px solid rgba(232,184,91,0.35)',
                          verticalAlign: 'top',
                        }}
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, r) => (
                    <tr key={r}>
                      {row.map((cell, c) => (
                        <td
                          key={c}
                          style={{
                            padding: '0.85rem 0.9rem',
                            borderBottom: '1px solid rgba(232,184,91,0.12)',
                            lineHeight: 1.75,
                            fontWeight: 300,
                            verticalAlign: 'top',
                            minWidth: '180px',
                          }}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        return null;
      })}
    </>
  );
}