import React from 'react';
import { motion } from 'framer-motion';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

// Visible text on this screen, translated with the rest of the page.
const UI_TEXT = {
  speakerNotes: 'Speaker notes',
  suggestedVisual: 'Suggested visual',
  verifyFirst: 'Verify first',
};

const goldTick = {
  flex: 'none',
  width: '5px',
  height: '5px',
  marginTop: '0.62rem',
  background: '#b97827',
  borderRadius: '50%',
};

const metaLabel = {
  color: '#b97827',
  fontSize: '0.62rem',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  fontWeight: 500,
  display: 'block',
  marginBottom: '0.55rem',
};

/**
 * DeckSlideCard — one slide as it would be projected, followed by the
 * presenter material that supports it: the visual to show, the speaker notes,
 * and anything to confirm against the live platform first.
 */
export default function DeckSlideCard({ slide, showNotes }) {
  const { content: uiText } = useTranslatedContent('ui-components-deck-deckslidecard', UI_TEXT);
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}
    >
      {/* ── The slide itself ─────────────────────────────────────────────── */}
      <div
        style={{
          background: '#faf6ec',
          border: '1px solid #dcc8a8',
          borderRadius: '4px',
          padding: 'clamp(1.6rem, 4vw, 3.25rem)',
          boxShadow: '0 18px 40px rgba(0,0,0,0.22)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            gap: '1rem',
            paddingBottom: '1.1rem',
            borderBottom: '1px solid #e0d1b5',
            marginBottom: '1.6rem',
          }}
        >
          <span className="font-body" style={{ color: '#b97827', fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 500 }}>
            {slide.eyebrow}
          </span>
          <span className="font-heading" style={{ color: '#b97827', fontSize: '1rem', fontWeight: 400, letterSpacing: '0.06em' }}>
            {slide.number}
          </span>
        </div>

        <h2
          className="font-heading"
          style={{
            color: '#39251b',
            fontSize: 'clamp(1.7rem, 3.6vw, 2.7rem)',
            lineHeight: 1.08,
            fontWeight: 400,
            letterSpacing: '-0.02em',
            margin: '0 0 1.6rem',
          }}
        >
          {slide.title}
        </h2>

        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.85rem' }}>
          {slide.points.map((point) => (
            <li key={point} className="font-body" style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
              <span aria-hidden="true" style={goldTick} />
              <span style={{ color: '#5f4a38', fontSize: 'clamp(0.95rem, 1.5vw, 1.06rem)', lineHeight: 1.75, fontWeight: 300 }}>
                {point}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Presenter material ───────────────────────────────────────────── */}
      {showNotes && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.35fr) minmax(0, 1fr)',
            gap: 'clamp(1.25rem, 3vw, 2.5rem)',
            marginTop: '1.5rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(232,184,91,0.18)',
          }}
          className="deck-presenter-grid"
        >
          <div>
            <span className="font-body" style={metaLabel}>{uiText.speakerNotes}</span>
            {slide.notes.map((note) => (
              <p key={note} className="font-body" style={{ color: 'rgba(243,234,216,0.78)', fontSize: '0.9rem', lineHeight: 1.8, fontWeight: 300, margin: '0 0 0.9rem' }}>
                {note}
              </p>
            ))}
          </div>

          <div>
            <span className="font-body" style={metaLabel}>{uiText.suggestedVisual}</span>
            <p className="font-body" style={{ color: 'rgba(243,234,216,0.78)', fontSize: '0.9rem', lineHeight: 1.8, fontWeight: 300, margin: '0 0 1.2rem' }}>
              {slide.visual}
            </p>

            {slide.verify && (
              <div style={{ borderLeft: '2px solid #d99b37', paddingLeft: '0.9rem' }}>
                <span className="font-body" style={{ ...metaLabel, color: '#e8b85b', marginBottom: '0.35rem' }}>{uiText.verifyFirst}</span>
                <p className="font-body" style={{ color: 'rgba(232,184,91,0.9)', fontSize: '0.84rem', lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
                  {slide.verify}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </motion.article>
  );
}