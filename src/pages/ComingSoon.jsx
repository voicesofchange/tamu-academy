import React from 'react';

const LOGO_URL = "https://media.base44.com/images/public/user_68796cfeca8e624b09c5f04b/8de477990_TamuAcademyFinalLogo.png";

export default function ComingSoon() {
  return (
    <div
      className="tamu-bg"
      style={{
        backgroundColor: '#1A130E',
        height: '100dvh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'DM Sans', sans-serif",
        display: 'grid',
        gridTemplateRows: '1fr auto',
      }}
    >
      {/* Radial depth glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 40% 35% at 50% 48%, rgba(212,161,42,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Faint globe motif */}
      <svg
        aria-hidden="true"
        viewBox="0 0 800 400"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(900px, 95%)',
          height: 'auto',
          opacity: 0.06,
          pointerEvents: 'none',
        }}
      >
        <ellipse cx="400" cy="200" rx="395" ry="195" fill="none" stroke="#D4A12A" strokeWidth="1.2"/>
        <ellipse cx="400" cy="200" rx="395" ry="98" fill="none" stroke="#D4A12A" strokeWidth="0.6" opacity="0.6"/>
        <line x1="5" y1="200" x2="795" y2="200" stroke="#D4A12A" strokeWidth="0.6" opacity="0.6"/>
        <ellipse cx="400" cy="200" rx="198" ry="195" fill="none" stroke="#D4A12A" strokeWidth="0.5" opacity="0.5"/>
        <line x1="400" y1="5" x2="400" y2="395" stroke="#D4A12A" strokeWidth="0.5" opacity="0.4"/>
        <path d="M 390 155 L 420 148 L 445 162 L 450 188 L 445 218 L 428 240 L 405 248 L 382 238 L 370 215 L 372 188 L 380 168 Z" fill="none" stroke="#E8951C" strokeWidth="0.8" opacity="0.5"/>
      </svg>

      {/* Main content — grid row 1, centered with place-items */}
      <div
        style={{
          display: 'grid',
          placeItems: 'center',
          position: 'relative',
          zIndex: 1,
          padding: '2rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            width: '100%',
            maxWidth: '820px',
          }}
        >
          {/* Logo */}
          <header className="tamu-logo">
            <img
              src={LOGO_URL}
              alt="Tamu Academy — Sweet Learning for a Better World"
              style={{
                display: 'block',
                width: 'auto',
                height: 'clamp(140px, 28vh, 240px)',
                maxWidth: '85vw',
                objectFit: 'contain',
                mixBlendMode: 'screen',
                marginBottom: '-4vh',
              }}
            />
          </header>

          {/* Ornamental gold divider */}
          <div
            className="tamu-divider"
            aria-hidden="true"
            style={{
              width: '80px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #D4A12A 35%, #E2B652 50%, #D4A12A 65%, transparent)',
              margin: '0 auto 1.75rem',
            }}
          />

          {/* Descriptor */}
          <main>
            <p
              className="tamu-descriptor"
              style={{
                color: '#F5EFE0',
                fontSize: 'clamp(0.7rem, 1vw, 0.85rem)',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                fontWeight: 400,
                maxWidth: '420px',
                margin: '0 auto',
                lineHeight: '2.2',
                opacity: 0.72,
              }}
            >
              AfroCentric video lessons on the mind,<br />
              policy, the world, and the planet —{' '}
              <span style={{ color: '#D4A12A', opacity: 1 }}>launching soon.</span>
            </p>
          </main>
        </div>
      </div>

      {/* Footer — grid row 2, pinned to bottom */}
      <footer
        className="tamu-footer"
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'center',
          padding: '1.25rem 2rem',
          borderTop: '1px solid rgba(212,161,42,0.1)',
        }}
      >
        <span
          style={{
            color: '#F5EFE0',
            fontSize: '0.6rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            opacity: 0.38,
            fontWeight: 500,
          }}
        >
          A Waiyaki House LLC brand
        </span>
      </footer>
    </div>
  );
}