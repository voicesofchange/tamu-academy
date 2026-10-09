import React from 'react';
import ModuleLessonSection from '@/components/courses/module/ModuleLessonSection';

const bodyText = { color: 'rgba(243,234,216,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };

/**
 * The Worked Example step: the module's concept applied step by step with
 * real numbers. Numbers are carried in a table when the material presents
 * them that way, so the arithmetic stays readable on a small screen.
 */
export default function WealthWorkedExample({ workedExample, eyebrow, heading }) {
  if (!workedExample) return null;
  const { title, paragraphs, table, conclusion } = workedExample;

  return (
    <ModuleLessonSection eyebrow={eyebrow} heading={heading}>
      <h3 className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.15rem, 2.4vw, 1.5rem)', fontWeight: 400, margin: '0 0 1.1rem' }}>
        {title}
      </h3>

      {(paragraphs || []).map((para, i) => (
        <p key={i} className="font-body" style={{ ...bodyText, marginBottom: '1rem' }}>{para}</p>
      ))}

      {table && (
        <div style={{ overflowX: 'auto', margin: '0.5rem 0 1.5rem' }}>
          <table className="font-body" style={{ width: '100%', minWidth: '360px', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr>
                {table.columns.map((column) => (
                  <th
                    key={column}
                    scope="col"
                    style={{
                      textAlign: 'left',
                      color: '#e8b85b',
                      fontSize: '0.62rem',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      fontWeight: 500,
                      padding: '0.6rem 0.9rem',
                      borderBottom: '1px solid rgba(232,184,91,0.35)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      style={{
                        color: ci === 0 ? 'rgba(243,234,216,0.9)' : 'rgba(243,234,216,0.72)',
                        padding: '0.6rem 0.9rem',
                        borderBottom: '1px solid rgba(243,234,216,0.08)',
                        lineHeight: 1.6,
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
      )}

      {(conclusion || []).map((para, i) => (
        <p key={i} className="font-body" style={{ ...bodyText, margin: i === 0 ? '0 0 1rem' : '0 0 1rem' }}>{para}</p>
      ))}
    </ModuleLessonSection>
  );
}