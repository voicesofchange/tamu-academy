import React from 'react';

/**
 * Visual module position indicator: "Module X of N" with a segmented
 * progress strip showing completed/current/upcoming modules.
 */
export default function ModuleProgressBar({ current, total, completed = 0 }) {
  if (!total || total <= 1) return null;
  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.6rem' }}>
        <span className="font-body" style={{ color: '#e8b85b', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500 }}>
          Module {current} of {total}
        </span>
        <span className="font-body" style={{ color: 'rgba(243,234,216,0.4)', fontSize: '0.6rem', letterSpacing: '0.1em', fontWeight: 300 }}>
          {completed} completed
        </span>
      </div>
      <div style={{ display: 'flex', gap: '4px' }}>
        {Array.from({ length: total }, (_, i) => {
          const idx = i + 1;
          const isComplete = idx < current;
          const isCurrent = idx === current;
          return (
            <div
              key={i}
              aria-hidden="true"
              style={{
                flex: 1,
                height: '3px',
                borderRadius: '2px',
                backgroundColor: isComplete ? '#e8b85b' : isCurrent ? 'rgba(232,184,91,0.7)' : 'rgba(232,184,91,0.15)',
              }}
            />
          );
        })}
      </div>
    </div>
  );
}