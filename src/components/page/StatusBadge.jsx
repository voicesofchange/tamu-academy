import React from 'react';

export default function StatusBadge({ label }) {
  return (
    <span className="font-body" style={{ display: 'inline-block', color: 'rgba(212,161,42,0.85)', fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, border: '1px solid rgba(212,161,42,0.3)', borderRadius: '2px', padding: '0.2rem 0.65rem' }}>
      {label}
    </span>
  );
}