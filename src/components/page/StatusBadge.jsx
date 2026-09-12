import React from 'react';

export default function StatusBadge({ label, tone = 'dark' }) {
  const isLight = tone === 'light';
  const color = isLight ? '#9b5d1d' : 'rgba(232,184,91,0.85)';
  const border = isLight ? '1px solid #d7b57c' : '1px solid rgba(232,184,91,0.3)';
  return (
    <span className="font-body" style={{ display: 'inline-block', color, fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, border, borderRadius: '2px', padding: '0.2rem 0.65rem' }}>
      {label}
    </span>
  );
}