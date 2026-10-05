import React from 'react';
import { KIOO_STATEMENTS } from '@/lib/guide/sections';
import { creamText } from '@/lib/guide/styles';

function formatAverage(value) {
  return value === null || value === undefined ? '—' : `${value}`;
}

/**
 * GuideInsightsPanel — anonymous, aggregated Kioo results. Only per-statement
 * averages for one-time and return reflections, and attempt counts. No learner
 * is ever identified here.
 */
export default function GuideInsightsPanel({ data }) {
  const statementText = Object.fromEntries(KIOO_STATEMENTS.map((statement) => [statement.id, statement.text]));

  return (
    <>
      <section className="guide-card" style={{ padding: 'clamp(1.25rem, 3vw, 2rem)', marginBottom: '1.5rem' }}>
        <span className="font-guide-body" style={{ ...creamText.eyebrow, display: 'block', marginBottom: '0.5rem' }}>
          Overview
        </span>
        <h2 className="font-guide-heading" style={{ ...creamText.heading, fontSize: 'clamp(1.2rem, 2.8vw, 1.5rem)', margin: '0 0 1.25rem' }}>
          The mirror, in aggregate
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
          {[
            { label: 'First-time reflections', value: data.first_attempts },
            { label: 'Return reflections', value: data.return_attempts },
            { label: 'Learners with a first reflection', value: data.learners_with_first },
            { label: 'Learners who returned', value: data.learners_with_return },
          ].map((stat) => (
            <div key={stat.label} style={{ border: '1px solid #e7dbc4', borderRadius: '3px', padding: '0.9rem 1rem', backgroundColor: '#fffdf7' }}>
              <span className="font-guide-heading" style={{ ...creamText.heading, fontSize: '1.6rem', display: 'block', lineHeight: 1.1 }}>
                {stat.value ?? 0}
              </span>
              <span className="font-guide-body" style={{ ...creamText.body, fontSize: '0.78rem', color: '#6b5744' }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="guide-card" style={{ padding: 'clamp(1.25rem, 3vw, 2rem)' }}>
        <span className="font-guide-body" style={{ ...creamText.eyebrow, display: 'block', marginBottom: '0.5rem' }}>
          Average rating per statement
        </span>
        <p className="font-guide-body" style={{ ...creamText.body, fontSize: '0.82rem', color: '#6b5744', margin: '0 0 1.25rem' }}>
          Averages only, on the 1–5 frequency scale. Individual answers are never shown, and no learner is identified.
        </p>
        <div className="guide-table-desktop">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th scope="col" className="font-guide-body" style={{ ...creamText.eyebrow, textAlign: 'left', padding: '0 0.6rem 0.6rem 0' }}>Statement</th>
                <th scope="col" className="font-guide-body" style={{ ...creamText.eyebrow, textAlign: 'left', padding: '0 0.6rem 0.6rem', width: '16%' }}>First</th>
                <th scope="col" className="font-guide-body" style={{ ...creamText.eyebrow, textAlign: 'left', padding: '0 0.6rem 0.6rem', width: '16%' }}>Return</th>
                <th scope="col" className="font-guide-body" style={{ ...creamText.eyebrow, textAlign: 'left', padding: '0 0.6rem 0.6rem', width: '14%' }}>Movement</th>
              </tr>
            </thead>
            <tbody>
              {data.statements.map((row) => (
                <tr key={row.statement_id} className={row.movement > 0 ? 'guide-moved-up' : undefined} style={{ borderTop: '1px solid #e7dbc4' }}>
                  <td className="font-guide-body" style={{ ...creamText.body, padding: '0.7rem 0.6rem 0.7rem 0', verticalAlign: 'top' }}>
                    {statementText[row.statement_id]}
                  </td>
                  <td className="font-guide-body" style={{ ...creamText.body, padding: '0.7rem 0.6rem', verticalAlign: 'top' }}>
                    {formatAverage(row.first_average)}
                    <span style={{ color: '#6b5744' }}> ({row.first_responses})</span>
                  </td>
                  <td className="font-guide-body" style={{ ...creamText.body, padding: '0.7rem 0.6rem', verticalAlign: 'top' }}>
                    {formatAverage(row.return_average)}
                    <span style={{ color: '#6b5744' }}> ({row.return_responses})</span>
                  </td>
                  <td className="font-guide-body" style={{ ...creamText.body, padding: '0.7rem 0.6rem', verticalAlign: 'top', fontWeight: 500 }}>
                    {row.movement === null ? '—' : `${row.movement > 0 ? '+' : ''}${row.movement}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="guide-table-mobile">
          {data.statements.map((row) => (
            <div
              key={row.statement_id}
              className={row.movement > 0 ? 'guide-moved-up' : undefined}
              style={{ border: '1px solid #e7dbc4', borderRadius: '3px', padding: '0.85rem', marginBottom: '0.75rem' }}
            >
              <span className="font-guide-body" style={{ ...creamText.body, fontWeight: 500, display: 'block', marginBottom: '0.5rem' }}>
                {statementText[row.statement_id]}
              </span>
              <span className="font-guide-body" style={{ ...creamText.body, fontSize: '0.82rem', color: '#6b5744' }}>
                First {formatAverage(row.first_average)} ({row.first_responses}) · Return {formatAverage(row.return_average)} ({row.return_responses})
                {row.movement !== null ? ` · movement ${row.movement > 0 ? '+' : ''}${row.movement}` : ''}
              </span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}