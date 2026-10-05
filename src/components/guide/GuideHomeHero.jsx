import React from 'react';
import { GUIDE_PRIVACY_NOTE, GUIDE_PROVERB, GUIDE_SUBTITLE, GUIDE_TITLE } from '@/lib/guide/sections';
import { GUIDE_PDF_URL } from '@/lib/guide/guide-pdf';
import { creamText, darkText } from '@/lib/guide/styles';

/**
 * GuideHomeHero — the opening of the Learner's Guide: title, the proverb, the
 * printable PDF button, and the reminder that answers stay private.
 */
export default function GuideHomeHero() {
  return (
    <header style={{ marginBottom: 'clamp(2rem, 5vw, 3rem)' }}>
      <span className="font-guide-body" style={{ ...darkText.eyebrow, display: 'block', marginBottom: '0.85rem' }}>
        Well-being pathway · Learner's Guide
      </span>
      <h1 className="font-guide-heading" style={{ color: '#FBF5E8', fontSize: 'clamp(2.4rem, 6vw, 3.6rem)', fontWeight: 600, lineHeight: 1.03, margin: '0 0 0.85rem' }}>
        {GUIDE_TITLE}
      </h1>
      <p className="font-guide-body" style={{ ...darkText.body, fontSize: '1.05rem', maxWidth: '40rem' }}>
        {GUIDE_SUBTITLE}
      </p>

      <blockquote className="guide-card" style={{ margin: '1.75rem 0 0', padding: '1.25rem 1.4rem', maxWidth: '34rem' }}>
        <p className="font-guide-heading" style={{ ...creamText.heading, fontStyle: 'italic', fontSize: '1.15rem', margin: 0 }}>
          {GUIDE_PROVERB.sw}
        </p>
        <p className="font-guide-body" style={{ ...creamText.body, fontSize: '0.85rem', margin: '0.35rem 0 0' }}>
          {GUIDE_PROVERB.en} · {GUIDE_PROVERB.language}
        </p>
      </blockquote>

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', marginTop: '1.75rem' }}>
        {GUIDE_PDF_URL ? (
          <a
            href={GUIDE_PDF_URL}
            target="_blank"
            rel="noreferrer"
            className="font-guide-body"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: '#C9961A',
              color: '#24150f',
              textDecoration: 'none',
              borderRadius: '3px',
              padding: '0.85rem 1.5rem',
              fontSize: '0.74rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            Download the printable PDF
          </a>
        ) : (
          <span
            className="font-guide-body"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'rgba(201,150,26,0.18)',
              color: 'rgba(251,245,232,0.7)',
              border: '1px solid rgba(201,150,26,0.35)',
              borderRadius: '3px',
              padding: '0.85rem 1.5rem',
              fontSize: '0.74rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            Printable PDF — link to be added
          </span>
        )}
        <p className="font-guide-body" style={{ ...darkText.body, fontSize: '0.82rem', margin: 0 }}>
          Prefer paper? The same sections, made for printing.
        </p>
      </div>

      <p className="font-guide-body" style={{ ...darkText.body, fontSize: '0.86rem', marginTop: '1.5rem', maxWidth: '40rem' }}>
        {GUIDE_PRIVACY_NOTE}
      </p>
    </header>
  );
}