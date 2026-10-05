import React from 'react';
import { creamText } from '@/lib/guide/styles';

/**
 * FillTableField — a table with fixed row labels and fill-in cells.
 * On small screens the same cells stack into one card per row, so the table
 * never has to be scrolled sideways on a phone.
 */
export default function FillTableField({ field, inputId, value, onChange }) {
  const rows = field.rows || [];
  const columns = field.columns && field.columns.length ? field.columns : [{ id: 'answer', label: 'Your answer' }];
  const current = value && typeof value === 'object' ? value : {};

  const cellValue = (rowLabel, columnId) => {
    const row = current[rowLabel];
    return row && typeof row === 'object' ? row[columnId] || '' : '';
  };

  const setCell = (rowLabel, columnId, next) => {
    const row = current[rowLabel] && typeof current[rowLabel] === 'object' ? current[rowLabel] : {};
    onChange({ ...current, [rowLabel]: { ...row, [columnId]: next } });
  };

  return (
    <div>
      <span className="font-guide-body" style={creamText.label}>
        {field.label}
      </span>
      {field.hint && (
        <p className="font-guide-body" style={creamText.hint}>
          {field.hint}
        </p>
      )}

      {/* Desktop and tablet: a real table */}
      <div className="guide-table-desktop">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th
                scope="col"
                className="font-guide-body"
                style={{ ...creamText.eyebrow, textAlign: 'left', padding: '0 0.6rem 0.5rem 0', verticalAlign: 'bottom', width: '28%' }}
              >
                &nbsp;
              </th>
              {columns.map((column) => (
                <th
                  key={column.id}
                  scope="col"
                  className="font-guide-body"
                  style={{ ...creamText.eyebrow, textAlign: 'left', padding: '0 0.6rem 0.5rem', verticalAlign: 'bottom' }}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((rowLabel, rowIndex) => (
              <tr key={rowLabel} style={{ borderTop: '1px solid #e7dbc4' }}>
                <th
                  scope="row"
                  className="font-guide-body"
                  style={{ ...creamText.body, fontWeight: 500, textAlign: 'left', padding: '0.75rem 0.6rem 0.75rem 0', verticalAlign: 'top' }}
                >
                  {rowLabel}
                </th>
                {columns.map((column) => (
                  <td key={column.id} style={{ padding: '0.6rem' }}>
                    <label className="sr-only" htmlFor={`${inputId}-${rowIndex}-${column.id}`}>
                      {rowLabel} — {column.label}
                    </label>
                    <textarea
                      id={`${inputId}-${rowIndex}-${column.id}`}
                      className="guide-input guide-input--cell"
                      rows={2}
                      value={cellValue(rowLabel, column.id)}
                      onChange={(event) => setCell(rowLabel, column.id, event.target.value)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phones: one stacked card per row */}
      <div className="guide-table-mobile">
        {rows.map((rowLabel, rowIndex) => (
          <div key={rowLabel} style={{ border: '1px solid #e7dbc4', borderRadius: '3px', padding: '0.85rem', marginBottom: '0.85rem', backgroundColor: '#fffdf7' }}>
            <span className="font-guide-heading" style={{ ...creamText.heading, fontSize: '0.95rem', display: 'block', marginBottom: '0.75rem' }}>
              {rowLabel}
            </span>
            {columns.map((column) => (
              <div key={column.id} style={{ marginBottom: '0.75rem' }}>
                <label
                  className="font-guide-body"
                  htmlFor={`${inputId}-m-${rowIndex}-${column.id}`}
                  style={{ ...creamText.eyebrow, display: 'block', marginBottom: '0.35rem' }}
                >
                  {column.label}
                </label>
                <textarea
                  id={`${inputId}-m-${rowIndex}-${column.id}`}
                  className="guide-input guide-input--cell"
                  rows={2}
                  value={cellValue(rowLabel, column.id)}
                  onChange={(event) => setCell(rowLabel, column.id, event.target.value)}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}