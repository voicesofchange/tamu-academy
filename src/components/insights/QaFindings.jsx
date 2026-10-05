import React from 'react';
import { FINDINGS } from '@/lib/qa-review-data';

const PRIORITIES = [
  { id: 'P1', label: 'Do first', color: '#e08a6a' },
  { id: 'P2', label: 'Next', color: '#e8b85b' },
  { id: 'P3', label: 'Confirm or polish', color: 'rgba(243,234,216,0.6)' },
];

const LINES = ['impact', 'evidence', 'action', 'retest'];

const LINE_LABELS = {
  impact: 'Learner impact',
  evidence: 'Evidence',
  action: 'Recommended action',
  retest: 'Retest by',
};

export default function QaFindings() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.25rem' }}>
      {PRIORITIES.map(priority => {
        const items = FINDINGS.filter(finding => finding.priority === priority.id);
        if (items.length === 0) return null;
        return (
          <div key={priority.id}>
            <h4 className="font-heading" style={{ color: '#f8f0df', fontSize: '1.15rem', fontWeight: 500, margin: '0 0 1rem' }}>
              {priority.id} · {priority.label}
              <span style={{ color: 'rgba(243,234,216,0.45)', fontSize: '0.8rem', fontFamily: "'DM Sans', sans-serif", marginLeft: '0.6rem' }}>
                {items.length} {items.length === 1 ? 'finding' : 'findings'}
              </span>
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {items.map(finding => (
                <div
                  key={finding.id}
                  style={{
                    border: '1px solid rgba(232,184,91,0.18)',
                    borderRadius: '2px',
                    backgroundColor: 'rgba(243,234,216,0.02)',
                    padding: '1.25rem 1.4rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                    <span style={{ color: priority.color, fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontFamily: "'DM Sans', sans-serif", fontWeight: 500, border: `1px solid ${priority.color}`, borderRadius: '2px', padding: '0.15rem 0.5rem' }}>
                      {finding.priority}
                    </span>
                    <span style={{ color: 'rgba(243,234,216,0.5)', fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: "'DM Sans', sans-serif" }}>
                      {finding.category}
                    </span>
                  </div>
                  <p className="font-heading" style={{ color: '#f8f0df', fontSize: '1.1rem', fontWeight: 500, margin: '0 0 0.75rem', lineHeight: 1.35 }}>
                    {finding.title}
                  </p>
                  {LINES.map(line => (
                    <p key={line} style={{ margin: '0 0 0.35rem', color: 'rgba(243,234,216,0.72)', fontSize: '0.82rem', fontFamily: "'DM Sans', sans-serif", lineHeight: 1.55 }}>
                      <span style={{ color: 'rgba(232,184,91,0.8)', letterSpacing: '0.04em' }}>{LINE_LABELS[line]}: </span>
                      {finding[line]}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}