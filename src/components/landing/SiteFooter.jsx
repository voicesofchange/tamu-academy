import React from 'react';
import SocialLinks from '@/components/SocialLinks';

export default function SiteFooter() {
  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
        padding: '3rem 2rem 3.5rem',
        borderTop: '1px solid rgba(212,161,42,0.12)',
      }}
    >
      <SocialLinks />

      <div
        aria-hidden="true"
        style={{
          width: '60px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #D4A12A, transparent)',
        }}
      />

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