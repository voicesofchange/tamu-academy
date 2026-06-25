import React, { useState, useEffect } from 'react';

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Courses', href: '#courses' },
  { label: 'Approach', href: '#approach' },
  { label: 'Video Series', href: '#video' },
];

export default function TopNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem clamp(1.25rem, 5vw, 3.5rem)',
        backgroundColor: scrolled ? 'rgba(20,14,10,0.82)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(212,161,42,0.12)' : '1px solid transparent',
        transition: 'background-color 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
      }}
    >
      <a
        href="#top"
        className="font-heading"
        style={{
          color: '#F5EFE0',
          fontSize: '1.15rem',
          letterSpacing: '0.04em',
          textDecoration: 'none',
          fontWeight: 500,
        }}
      >
        Tamu <span style={{ color: '#D4A12A' }}>Academy</span>
      </a>

      <nav aria-label="Primary" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1rem, 3vw, 2.25rem)' }}>
        {LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="tamu-nav-link"
            style={{
              color: 'rgba(245,239,224,0.78)',
              fontSize: '0.72rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              fontWeight: 500,
              whiteSpace: 'nowrap',
            }}
          >
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}