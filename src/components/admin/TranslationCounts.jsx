import React from 'react';
import { courseLabel } from '@/lib/translation-review';

const cell = {
  padding: '0.6rem 0.75rem',
  fontSize: '0.82rem',
  fontWeight: 300,
  textAlign: 'right',
  color: 'rgba(243,234,216,0.75)',
  borderTop: '1px solid rgba(232,184,91,0.12)',
};

const headCell = {
  ...cell,
  borderTop: 'none',
  color: 'rgba(232,184,91,0.75)',
  fontSize: '0.62rem',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  fontWeight: 500,
};

/**
 * TranslationCounts — reviewed, unreviewed and outdated totals for the selected
 * language, per course and as a whole.
 */
export default function TranslationCounts({ counts }) {
  const courses = Object.entries(counts.byCourse).sort((a, b) =>
    courseLabel(a[0]).localeCompare(courseLabel(b[0])),
  );

  if (courses.length === 0) return null;

  return (
    <div
      style={{
        border: '1px solid rgba(232,184,91,0.18)',
        borderRadius: '4px',
        backgroundColor: 'rgba(243,234,216,0.02)',
        overflowX: 'auto',
        marginBottom: '2rem',
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '520px' }}>
        <caption
          className="font-body"
          style={{
            captionSide: 'top',
            textAlign: 'left',
            padding: '0.85rem 0.75rem 0.35rem',
            color: 'rgba(243,234,216,0.55)',
            fontSize: '0.7rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}
        >
          Review status
        </caption>
        <thead>
          <tr>
            <th scope="col" style={{ ...headCell, textAlign: 'left' }}>Course</th>
            <th scope="col" style={headCell}>Reviewed</th>
            <th scope="col" style={headCell}>Unreviewed</th>
            <th scope="col" style={headCell}>Outdated</th>
            <th scope="col" style={headCell}>Total</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(([slug, value]) => (
            <tr key={slug}>
              <th scope="row" className="font-body" style={{ ...cell, textAlign: 'left', color: '#f8f0df', fontWeight: 400 }}>
                {courseLabel(slug)}
              </th>
              <td style={{ ...cell, color: '#7bc47f' }}>{value.reviewed}</td>
              <td style={{ ...cell, color: '#e8b85b' }}>{value.unreviewed}</td>
              <td style={{ ...cell, color: '#e08a6a' }}>{value.outdated}</td>
              <td style={cell}>{value.total}</td>
            </tr>
          ))}
          <tr>
            <th scope="row" className="font-body" style={{ ...cell, textAlign: 'left', color: '#f8f0df', fontWeight: 500 }}>
              All courses
            </th>
            <td style={{ ...cell, color: '#7bc47f', fontWeight: 500 }}>{counts.total.reviewed}</td>
            <td style={{ ...cell, color: '#e8b85b', fontWeight: 500 }}>{counts.total.unreviewed}</td>
            <td style={{ ...cell, color: '#e08a6a', fontWeight: 500 }}>{counts.total.outdated}</td>
            <td style={{ ...cell, fontWeight: 500 }}>{counts.total.total}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}