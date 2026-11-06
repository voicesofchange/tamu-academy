import React from 'react';

const cell = {
  padding: '0.85rem 1rem',
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '0.88rem',
  borderBottom: '1px solid rgba(232,184,91,0.12)',
};

const headCell = {
  ...cell,
  padding: '0.75rem 1rem',
  color: 'rgba(243,234,216,0.55)',
  fontSize: '0.66rem',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  fontWeight: 400,
  borderBottom: '1px solid rgba(232,184,91,0.22)',
};

const numberCell = { ...cell, textAlign: 'right', color: '#e8b85b', fontSize: '1rem' };

/**
 * CourseFunnelTable — enrolled → opened Module 1 → completed Module 1 →
 * completed course, one row per course. Administrators only: the numbers come
 * from the admin-gated part of getCommunityInsights.
 */
export default function CourseFunnelTable({ rows, labels }) {
  if (!rows || rows.length === 0) return null;

  return (
    <div style={{ overflowX: 'auto', border: '1px solid rgba(232,184,91,0.18)', borderRadius: '4px', backgroundColor: 'rgba(243,234,216,0.015)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '640px' }}>
        <thead>
          <tr>
            <th scope="col" style={{ ...headCell, textAlign: 'left' }}>{labels.course}</th>
            <th scope="col" style={{ ...headCell, textAlign: 'right' }}>{labels.enrolled}</th>
            <th scope="col" style={{ ...headCell, textAlign: 'right' }}>{labels.opened}</th>
            <th scope="col" style={{ ...headCell, textAlign: 'right' }}>{labels.completedModule}</th>
            <th scope="col" style={{ ...headCell, textAlign: 'right' }}>{labels.completedCourse}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.slug}>
              <th scope="row" style={{
                ...cell,
                textAlign: 'left',
                color: '#f8f0df',
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.05rem',
                fontWeight: 400,
              }}>
                {row.title}
              </th>
              <td style={numberCell}>{row.enrolled}</td>
              <td style={numberCell}>{row.openedModuleOne}</td>
              <td style={numberCell}>{row.completedModuleOne}</td>
              <td style={numberCell}>{row.completedCourse}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}