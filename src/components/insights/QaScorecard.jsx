import React from 'react';
import { COURSES, RUBRIC, STATUS_LABELS } from '@/lib/qa-review-data';

const STATUS_COLOR = {
  present: '#9ec49a',
  varied: '#e8b85b',
  missing: '#e08a6a',
  unverified: 'rgba(243,234,216,0.45)',
};

const thStyle = {
  textAlign: 'left',
  padding: '0.75rem 0.9rem',
  borderBottom: '1px solid rgba(232,184,91,0.28)',
  color: '#e8b85b',
  fontSize: '0.68rem',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  fontWeight: 500,
  fontFamily: "'DM Sans', sans-serif",
  whiteSpace: 'nowrap',
};

const cellStyle = {
  padding: '0.6rem 0.9rem',
  borderBottom: '1px solid rgba(232,184,91,0.1)',
  fontSize: '0.8rem',
  fontFamily: "'DM Sans', sans-serif",
  whiteSpace: 'nowrap',
};

export default function QaScorecard() {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '720px' }}>
        <caption style={{ captionSide: 'top', textAlign: 'left', color: 'rgba(243,234,216,0.6)', fontSize: '0.8rem', fontFamily: "'DM Sans', sans-serif", paddingBottom: '0.9rem' }}>
          Each course read against the same rubric. A row marked as varying is explained in the course notes below the table.
        </caption>
        <thead>
          <tr>
            <th style={thStyle}>Rubric</th>
            {COURSES.map(course => (
              <th key={course.slug} style={thStyle}>
                {course.title}
                <span style={{ display: 'block', color: 'rgba(243,234,216,0.45)', fontSize: '0.62rem', letterSpacing: '0.06em', textTransform: 'none', fontWeight: 400 }}>
                  {course.modules} {course.modules === 1 ? 'module' : 'modules'}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {RUBRIC.map(dimension => (
            <tr key={dimension.id}>
              <td style={{ ...cellStyle, color: '#f8f0df', fontWeight: 500, whiteSpace: 'normal' }}>{dimension.label}</td>
              {COURSES.map(course => {
                const status = course.rubric[dimension.id] || 'unverified';
                return (
                  <td key={course.slug + dimension.id} style={{ ...cellStyle, color: STATUS_COLOR[status] }}>
                    {STATUS_LABELS[status]}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}