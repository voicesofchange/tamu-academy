import React from 'react';

/**
 * PageLoadErrorScreen — the friendly recovery screen.
 *
 * Shown when a page's code could not be loaded even after one automatic
 * reload, and for any unexpected error anywhere in the app. It deliberately
 * depends on nothing but React: no router, no translations, no data fetching,
 * so it can still render when the rest of the app cannot.
 *
 * The homepage link is a plain anchor rather than a router link: it performs a
 * full load, which is the cleanest way out of a broken page.
 */
export default function PageLoadErrorScreen() {
  return (
    <div
      style={{
        backgroundColor: '#24150f',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        fontFamily: "'DM Sans', ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <div style={{ maxWidth: '480px', width: '100%', textAlign: 'center' }}>
        <span
          style={{
            color: '#e8b85b',
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontWeight: 500,
            display: 'block',
            marginBottom: '1.5rem',
            fontFamily: "'Cormorant Garamond', Georgia, serif",
          }}
        >
          Tamu Academy
        </span>

        <h1
          style={{
            color: '#f8f0df',
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            fontWeight: 400,
            lineHeight: 1.25,
            margin: '0 0 1rem',
            fontFamily: "'Cormorant Garamond', Georgia, serif",
          }}
        >
          This page did not load
        </h1>

        <div
          aria-hidden="true"
          style={{
            width: '40px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, #e8b85b 35%, #E2B652 50%, #e8b85b 65%, transparent)',
            margin: '0 auto 1.5rem',
          }}
        />

        <p
          style={{
            color: 'rgba(243,234,216,0.62)',
            fontSize: '0.93rem',
            lineHeight: 1.8,
            fontWeight: 300,
            margin: '0 0 2rem',
          }}
        >
          Something interrupted the page as it was opening, most often because the site was updated
          while you were here. Reloading usually fixes it. Your saved work is not affected.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', justifyContent: 'center' }}>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              color: '#24150f',
              backgroundColor: '#e8b85b',
              fontSize: '0.72rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              fontWeight: 500,
              border: '1px solid #e8b85b',
              borderRadius: '2px',
              padding: '0.65rem 1.2rem',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            Reload
          </button>
          <a
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              color: '#e8b85b',
              backgroundColor: 'transparent',
              fontSize: '0.72rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              fontWeight: 500,
              border: '1px solid rgba(232,184,91,0.4)',
              borderRadius: '2px',
              padding: '0.65rem 1.2rem',
            }}
          >
            Go to Homepage
          </a>
        </div>
      </div>
    </div>
  );
}