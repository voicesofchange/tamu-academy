import React from 'react';

/**
 * Skip-to-main-content link — first focusable element on every page.
 * Visually hidden until focused, then revealed with Tamu Academy styling.
 * Target: <main id="tamu-main"> in PageLayout.
 */
export default function SkipLink() {
  return (
    <>
      <a
        href="#tamu-main"
        className="tamu-skip-link"
      >
        Skip to main content
      </a>
      <style>{`
        .tamu-skip-link {
          position: absolute;
          top: -9999px;
          left: 1rem;
          z-index: 9999;
          padding: 0.6rem 1.2rem;
          background: #D4A12A;
          color: #1A130E;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-decoration: none;
          border-radius: 2px;
          outline: none;
        }
        .tamu-skip-link:focus {
          top: 1rem;
          outline: 2px solid #1A130E;
          outline-offset: 2px;
        }
      `}</style>
    </>
  );
}