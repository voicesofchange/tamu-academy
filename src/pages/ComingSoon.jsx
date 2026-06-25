import React from 'react';

const LOGO_URL = "https://media.base44.com/images/public/user_68796cfeca8e624b09c5f04b/8de477990_TamuAcademyFinalLogo.png";

// TODO: Replace these placeholder URLs with your actual social handles before launch
const SOCIAL_LINKS = {
  youtube: "https://youtube.com/@TamuAcademy",
  instagram: "https://instagram.com/TamuAcademy",
  substack: "https://tamuacademy.substack.com",
};

function YouTubeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
    </svg>
  );
}

function SubstackIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
    </svg>
  );
}

function WorldMapMotif() {
  return (
    <svg
      viewBox="0 0 1000 500"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        opacity: 0.07,
        pointerEvents: 'none',
      }}
    >
      {/* Simplified world map continents */}
      {/* North America */}
      <path d="M 120 80 L 180 70 L 230 90 L 250 130 L 220 170 L 200 200 L 160 220 L 130 200 L 110 160 L 100 120 Z" fill="#D4A12A" />
      {/* South America */}
      <path d="M 200 240 L 240 230 L 260 260 L 270 310 L 260 360 L 230 390 L 200 370 L 180 330 L 185 280 Z" fill="#D4A12A" />
      {/* Europe */}
      <path d="M 420 70 L 460 65 L 490 80 L 500 110 L 475 130 L 450 125 L 430 110 L 415 90 Z" fill="#D4A12A" />
      {/* Africa - highlighted in amber */}
      <path d="M 440 150 L 490 140 L 530 155 L 550 190 L 555 240 L 545 290 L 520 340 L 490 370 L 460 360 L 435 320 L 420 270 L 415 220 L 420 180 Z" fill="#E8951C" />
      {/* Asia */}
      <path d="M 530 60 L 650 50 L 750 70 L 800 100 L 790 150 L 750 180 L 700 190 L 650 170 L 600 160 L 560 140 L 535 110 Z" fill="#D4A12A" />
      {/* Southeast Asia islands */}
      <path d="M 700 200 L 730 195 L 750 210 L 745 230 L 720 235 L 700 220 Z" fill="#D4A12A" />
      <path d="M 760 210 L 790 200 L 810 215 L 800 235 L 770 240 Z" fill="#D4A12A" />
      {/* Australia */}
      <path d="M 730 290 L 800 280 L 850 300 L 860 340 L 840 380 L 790 390 L 740 370 L 720 330 Z" fill="#D4A12A" />
      {/* Gilded Meridian line through Africa */}
      <line x1="0" y1="250" x2="1000" y2="250" stroke="#D4A12A" strokeWidth="0.5" strokeDasharray="4,8" opacity="0.4" />
    </svg>
  );
}

export default function ComingSoon() {
  return (
    <div
      className="tamu-bg"
      style={{
        backgroundColor: '#1A130E',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '2rem',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Radial depth layers — obsidian glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(212,161,42,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 40% 40% at 50% 50%, rgba(232,149,28,0.04) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      {/* World Map Motif */}
      <WorldMapMotif />

      {/* Semantic structure */}
      <header style={{ width: '100%', display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
        {/* Logo */}
        <div className="tamu-logo" style={{ textAlign: 'center' }}>
          <img
            src={LOGO_URL}
            alt="Tamu Academy — Sweet Learning for a Better World. AfroCentric education for the African diaspora."
            style={{
              width: 'clamp(260px, 58vw, 780px)',
              maxWidth: '100%',
              display: 'block',
              margin: '0 auto',
              // The logo has a white bg so we use mix-blend-mode to integrate it
              mixBlendMode: 'luminosity',
              filter: 'brightness(1.05) contrast(1.02)',
            }}
          />
        </div>
      </header>

      <main
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          marginTop: '0.5rem',
        }}
      >
        {/* Ornamental gold divider */}
        <div
          className="tamu-divider"
          aria-hidden="true"
          style={{
            width: 'clamp(80px, 25vw, 200px)',
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, #D4A12A 30%, #E2B652 50%, #D4A12A 70%, transparent 100%)',
            margin: '2rem auto',
          }}
        />

        {/* Descriptor — the manifesto */}
        <p
          className="tamu-descriptor"
          style={{
            color: '#F5EFE0',
            fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)',
            letterSpacing: '0.13em',
            textTransform: 'uppercase',
            fontWeight: 300,
            maxWidth: '560px',
            margin: '0 auto',
            lineHeight: '1.8',
            opacity: 0.88,
            textAlign: 'center',
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          AfroCentric video lessons on the mind, policy, the world, and the planet — launching soon.
        </p>
      </main>

      {/* Footer pinned to bottom */}
      <footer
        className="tamu-footer"
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem',
          zIndex: 1,
          padding: '0 2rem',
        }}
      >
        {/* Social links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <a
            href={SOCIAL_LINKS.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="tamu-social-link"
            aria-label="Tamu Academy on YouTube"
          >
            <YouTubeIcon />
          </a>

          {/* Vertical gold rule separator */}
          <div aria-hidden="true" style={{ width: '1px', height: '18px', background: '#D4A12A', opacity: 0.3, margin: '0 0.25rem' }} />

          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="tamu-social-link"
            aria-label="Tamu Academy on Instagram"
          >
            <InstagramIcon />
          </a>

          <div aria-hidden="true" style={{ width: '1px', height: '18px', background: '#D4A12A', opacity: 0.3, margin: '0 0.25rem' }} />

          <a
            href={SOCIAL_LINKS.substack}
            target="_blank"
            rel="noopener noreferrer"
            className="tamu-social-link"
            aria-label="Tamu Academy on Substack"
          >
            <SubstackIcon />
          </a>
        </div>

        {/* Brand seal */}
        <span
          style={{
            color: '#F5EFE0',
            fontSize: '0.7rem',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            opacity: 0.5,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
          }}
        >
          A Waiyaki House LLC brand
        </span>
      </footer>
    </div>
  );
}