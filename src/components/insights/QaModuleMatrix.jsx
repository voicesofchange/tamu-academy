import React from 'react';
import { MODULES } from '@/lib/qa-review-data';

const VALUE_COLOR = {
  yes: '#9ec49a',
  no: '#e08a6a',
  varies: '#e8b85b',
};

const VALUE_LABEL = {
  yes: 'Yes',
  no: 'None',
  varies: 'Varies',
};

const COLUMNS = [
  { id: 'media', label: 'Video' },
  { id: 'case', label: 'Case' },
  { id: 'activity', label: 'Activity' },
  { id: 'reflection', label: 'Reflection' },
  { id: 'check', label: 'Check' },
];

const thStyle = {
  textAlign: 'left',
  padding: '0.6rem 0.75rem',
  borderBottom: '1px solid rgba(232,184,91,0.28)',
  color: '#e8b85b',
  fontSize: '0.62rem',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  fontWeight: 500,
  fontFamily: "'DM Sans', sans-serif",
  whiteSpace: 'nowrap',
};

const cellStyle = {
  padding: '0.55rem 0.75rem',
  borderBottom: '1px solid rgba(232,184,91,0.1)',
  fontSize: '0.78rem',
  fontFamily: "'DM Sans', sans-serif",
  whiteSpace: 'nowrap',
};

export default function QaModuleMatrix() {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '880px' }}>
        <caption style={{ captionSide: 'top', textAlign: 'left', color: 'rgba(243,234,216,0.6)', fontSize: '0.8rem', fontFamily: "'DM Sans', sans-serif", paddingBottom: '0.9rem' }}>
          Every module in every course, element by element. Progress, navigation and the knowledge check are present in all of them.
        </caption>
        <thead>
          <tr>
            <th style={thStyle}>Course</th>
            <th style={thStyle}>Module</th>
            {COLUMNS.map(column => (
              <th key={column.id} style={thStyle}>{column.label}</th>
            ))}
            <th style={thStyle}>Note</th>
          </tr>
        </thead>
        <tbody>
          {MODULES.map(row => (
            <tr key={row.course + row.module}>
              <td style={{ ...cellStyle, color: 'rgba(243,234,216,0.6)' }}>{row.course}</td>
              <td style={{ ...cellStyle, color: '#f8f0df' }}>{row.module}</td>
              {COLUMNS.map(column => {
                const value = row[column.id];
                return (
                  <td key={column.id} style={{ ...cellStyle, color: VALUE_COLOR[value] || 'rgba(243,234,216,0.6)' }}>
                    {VALUE_LABEL[value] || 'Unverified'}
                  </td>
                );
              })}
              <td style={{ ...cellStyle, color: 'rgba(243,234,216,0.6)', whiteSpace: 'normal', minWidth: '220px' }}>{row.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}