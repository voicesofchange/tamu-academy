import React from 'react';
import { Link } from 'react-router-dom';

const LINKS = [
  { label: 'About', to: '/about' },
  { label: 'Learning Areas', to: '/learning-areas' },
  { label: 'Programmes', to: '/programmes' },
  { label: 'Insights', to: '/insights' },
  { label: 'Partner', to: '/partner' },
  { label: 'Contact', to: '/contact' },
];

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
        padding: '2.5rem 2rem 3rem',
        borderTop: '1px solid rgba(212,161,42,0.12)',
      }}
    >
      <nav aria-label="Footer navigation" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.25rem 1.5rem' }}>
        {LINKS.map(({ label, to }) => (
          <Link
            key={label}
            to={to}
            className="font-body tamu-nav-link"
            style={{
              color: 'rgba(245,239,224,0.45)',
              fontSize: '0.62rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              fontWeight: 500,
              padding: '0.3rem 0',
            }}
          >
            {label}
          </Link>
        ))}
      </nav>

      <span
        className="font-body"
        style={{
          color: '#F5EFE0',
          fontSize: '0.62rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          opacity: 0.35,
          fontWeight: 500,
        }}
      >
        A Waiyaki House LLC brand
      </span>
    </footer>
  );
}