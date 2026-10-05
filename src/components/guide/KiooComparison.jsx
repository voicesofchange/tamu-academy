import React from 'react';
import { FREQUENCY_SCALE } from '@/lib/guide/sections';
import { buildComparison, formatAttemptDate } from '@/lib/guide/kioo';
import { creamText } from '@/lib/guide/styles';

function labelFor(value) {
  const option = FREQUENCY_SCALE.find((entry) => entry.value === Number(value));
  return option ? option.label : '—';
}

/**
 * KiooComparison — the first reflection beside the latest return, with the
 * statements the learner moved up on highlighted. Private to the learner.
 */
export default function KiooComparison({ first, latest }) {
  const rows = buildComparison(first, latest);
  if (!rows.length) return null;

  const movedUpCount = rows.filter((row) => row.movedUp).length;

  return (
    <section className="guide-card" style={{ padding: 'clamp(1.25rem, 3vw, 2rem)', marginBottom: '1.5rem' }}>
      <span className="font-guide-body" style={{ ...creamText.eyebrow, display: 'block', marginBottom: '0.5rem' }}>
        Linganisha · the comparison
      </span>
      <h2 className="font-guide-heading" style={{ ...creamText.heading, fontSize: 'clamp(1.2rem, 2.8vw, 1.5rem)', lineHeight: 1.3, margin: '0 0 0.6rem' }}>
        Your first reflection beside your latest
      </h2>
      <p className="font-guide-body" style={{ ...creamText.body, margin: '0 0 1.5rem' }}>
        {movedUpCount > 0
          ? `${movedUpCount} ${movedUpCount === 1 ? 'statement' : 'statements'} moved up, highlighted below.`
          : 'Nothing moved up this time, and that is information too — not a failure.'}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
        <div>
          <span className="font-guide-body" style={{ ...creamText.eyebrow, display: 'block' }}>First reflection</span>
          <span className="font-guide-body" style={{ ...creamText.body, fontWeight: 500 }}>{formatAttemptDate(first.attempt_date)}</span>
        </div>
        <div>
          <span className="font-guide-body" style={{ ...creamText.eyebrow, display: 'block' }}>Latest return</span>
          <span className="font-guide-body" style={{ ...creamText.body, fontWeight: 500 }}>{formatAttemptDate(latest.attempt_date)}</span>
        </div>
      </div>

      <div className="guide-table-desktop">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th scope="col" className="font-guide-body" style={{ ...creamText.eyebrow, textAlign: 'left', padding: '0 0.6rem 0.6rem 0' }}>Statement</th>
              <th scope="col" className="font-guide-body" style={{ ...creamText.eyebrow, textAlign: 'left', padding: '0 0.6rem 0.6rem', width: '18%' }}>First</th>
              <th scope="col" className="font-guide-body" style={{ ...creamText.eyebrow, textAlign: 'left', padding: '0 0.6rem 0.6rem', width: '18%' }}>Latest</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className={row.movedUp ? 'guide-moved-up' : undefined} style={{ borderTop: '1px solid #e7dbc4' }}>
                <td className="font-guide-body" style={{ ...creamText.body, padding: '0.75rem 0.6rem 0.75rem 0', verticalAlign: 'top' }}>
                  {row.text}
                </td>
                <td className="font-guide-body" style={{ ...creamText.body, padding: '0.75rem 0.6rem', verticalAlign: 'top', color: '#6b5744' }}>
                  {labelFor(row.before)}
                </td>
                <td className="font-guide-body" style={{ ...creamText.body, padding: '0.75rem 0.6rem', verticalAlign: 'top', fontWeight: 500 }}>
                  {labelFor(row.after)}
                  {row.movedUp && <span style={{ color: '#8A650B', fontWeight: 600 }}> &uarr;</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="guide-table-mobile">
        {rows.map((row) => (
          <div
            key={row.id}
            className={row.movedUp ? 'guide-moved-up' : undefined}
            style={{ border: '1px solid #e7dbc4', borderRadius: '3px', padding: '0.85rem', marginBottom: '0.75rem' }}
          >
            <span className="font-guide-body" style={{ ...creamText.body, fontWeight: 500, display: 'block', marginBottom: '0.6rem' }}>
              {row.text}
            </span>
            <div style={{ display: 'flex', gap: '1.25rem' }}>
              <div>
                <span className="font-guide-body" style={{ ...creamText.eyebrow, display: 'block' }}>First</span>
                <span className="font-guide-body" style={{ ...creamText.body, color: '#6b5744' }}>{labelFor(row.before)}</span>
              </div>
              <div>
                <span className="font-guide-body" style={{ ...creamText.eyebrow, display: 'block' }}>Latest</span>
                <span className="font-guide-body" style={{ ...creamText.body, fontWeight: 500 }}>
                  {labelFor(row.after)}
                  {row.movedUp && <span style={{ color: '#8A650B', fontWeight: 600 }}> &uarr;</span>}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="font-guide-body" style={{ ...creamText.body, fontSize: '0.8rem', color: '#6b5744', margin: '1.25rem 0 0' }}>
        Highlighted statements are the ones where you moved up. This comparison is private to you.
      </p>
    </section>
  );
}