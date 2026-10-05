import React from 'react';
import { FREQUENCY_SCALE, RATING_SCALE } from '@/lib/guide/sections';

/**
 * WorkbookField — the blank, printed form of one guide answer field.
 * It mirrors the field types used in the app (written answer, table, rating)
 * but carries no learner data: the printed workbook is always a clean sheet.
 */

const labelStyle = { display: 'block', color: '#33241A', fontSize: '0.85rem', fontWeight: 500, margin: '0.95rem 0 0.5rem' };
const hintStyle = { color: '#6b5744', fontSize: '0.78rem', lineHeight: 1.6, margin: '0 0 0.5rem' };
const BORDER = '1px solid #a8977f';
const LINE_COLOR = '#a8977f';

/** Ruled lines to write on. */
export function BlankLines({ count = 3 }) {
  const lines = Math.min(Math.max(count, 2), 14);
  return (
    <div aria-hidden>
      {Array.from({ length: lines }).map((_, index) => (
        <div key={index} style={{ borderBottom: `1px solid ${LINE_COLOR}`, height: '1.85rem' }} />
      ))}
    </div>
  );
}

function scaleLegend(scale) {
  return [...scale]
    .sort((a, b) => a.value - b.value)
    .map((entry) => `${entry.value} = ${entry.label.replace(/^\s*\d+\s*·\s*/, '')}`)
    .join('    ');
}

function BlankText({ field }) {
  return (
    <div className="workbook-block" style={{ marginBottom: '1.1rem' }}>
      <span className="font-guide-body" style={labelStyle}>{field.label}</span>
      {field.placeholder && <p className="font-guide-body" style={hintStyle}>{field.placeholder}</p>}
      <BlankLines count={field.rows || 3} />
    </div>
  );
}

function BlankTable({ field }) {
  const columns = field.columns?.length ? field.columns : [{ id: 'answer', label: 'Your answer' }];
  const rows = field.rows || [];

  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <span className="font-guide-body" style={labelStyle}>{field.label}</span>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: BORDER, padding: '0.4rem', width: '30%' }} />
            {columns.map((column) => (
              <th
                key={column.id}
                className="font-guide-body"
                style={{ border: BORDER, padding: '0.4rem', textAlign: 'left', color: '#6b5744', fontSize: '0.68rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row} className="workbook-block">
              <th
                className="font-guide-body"
                style={{ border: BORDER, padding: '0.45rem', textAlign: 'left', verticalAlign: 'top', color: '#33241A', fontWeight: 500, fontSize: '0.78rem', lineHeight: 1.5 }}
              >
                {row}
              </th>
              {columns.map((column) => (
                <td key={column.id} style={{ border: BORDER, height: '3.1rem' }} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RatingRows({ field }) {
  const scale = field.type === 'frequency' ? FREQUENCY_SCALE : RATING_SCALE;
  const statements = field.statements || [];

  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <span className="font-guide-body" style={labelStyle}>{field.label}</span>
      <p className="font-guide-body" style={hintStyle}>{scaleLegend(scale)}</p>
      {statements.map((statement) => (
        <div key={statement.id} className="workbook-block" style={{ borderTop: '1px solid #e0d3ba', padding: '0.7rem 0' }}>
          <p className="font-guide-body" style={{ color: '#2A2119', fontSize: '0.82rem', lineHeight: 1.6, margin: '0 0 0.5rem' }}>
            {statement.text}
          </p>
          <div style={{ display: 'flex', gap: '0.55rem' }}>
            {[1, 2, 3, 4, 5].map((value) => (
              <span
                key={value}
                className="font-guide-body"
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '26px', height: '26px', border: '1px solid #6b5744', borderRadius: '2px', color: '#4a3a2a', fontSize: '0.7rem' }}
              >
                {value}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function WorkbookField({ field }) {
  if (field.type === 'table') return <BlankTable field={field} />;
  if (field.type === 'rating' || field.type === 'frequency') return <RatingRows field={field} />;
  return <BlankText field={field} />;
}