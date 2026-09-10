import React from 'react';

const cardStyle = {
  padding: '1.5rem 1.25rem',
  border: '1px solid rgba(212,161,42,0.18)',
  borderRadius: '4px',
  backgroundColor: 'rgba(245,239,224,0.02)',
  textAlign: 'center',
};

export default function InsightStatCard({ value, label }) {
  return (
    <div style={cardStyle}>
      <div style={{
        color: '#D4A12A',
        fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
        fontFamily: "'Cormorant Garamond', serif",
        fontWeight: 400,
        lineHeight: 1,
        marginBottom: '0.5rem',
      }}>
        {value}
      </div>
      <div style={{
        color: 'rgba(245,239,224,0.6)',
        fontSize: '0.68rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        fontWeight: 500,
        fontFamily: "'DM Sans', sans-serif",
      }}>
        {label}
      </div>
    </div>
  );
}