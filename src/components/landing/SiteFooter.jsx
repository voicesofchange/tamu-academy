import React from 'react';

export default function SiteFooter() {
  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2.5rem 2rem 3rem',
        borderTop: '1px solid rgba(212,161,42,0.12)',
      }}
    >
      <span
        className="font-body"
        style={{
          color: '#F5EFE0',
          fontSize: '0.62rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          opacity: 0.45,
          fontWeight: 500,
        }}
      >
        A Waiyaki House LLC brand
      </span>
    </footer>
  );
}