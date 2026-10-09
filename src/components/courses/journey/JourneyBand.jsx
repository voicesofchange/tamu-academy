import React from 'react';
import { motion } from 'framer-motion';

/**
 * JourneyBand — the Courses page's content band, reused by the learner
 * surfaces. It carries the same alternating surfaces the catalogue uses:
 * parchment for reading and course tiles, a warmer tint for a second note in
 * the rhythm, and the page's own espresso ground for the dashboard panels.
 */
const TONES = {
  dark: {
    background: 'transparent',
    eyebrow: '#e8b85b',
    heading: '#f3ead8',
    body: 'rgba(243,234,216,0.72)',
    padding: '0 clamp(1.5rem, 6vw, 4rem)',
    maxWidth: '900px',
    marginBottom: '4rem',
  },
  parchment: {
    background: '#faf6ec',
    eyebrow: '#b97827',
    heading: '#39251b',
    body: '#806b58',
    padding: '76px clamp(1.5rem, 6vw, 88px)',
    maxWidth: '1100px',
    marginBottom: 0,
  },
  tint: {
    background: '#e9dcc5',
    eyebrow: '#b97827',
    heading: '#39251b',
    body: '#806b58',
    padding: '76px clamp(1.5rem, 6vw, 88px)',
    maxWidth: '1100px',
    marginBottom: 0,
  },
};

export default function JourneyBand({ id, tone = 'dark', eyebrow, heading, intro, children }) {
  const t = TONES[tone] || TONES.dark;

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      style={{
        background: t.background,
        padding: t.padding,
        marginBottom: t.marginBottom,
        scrollMarginTop: '110px',
      }}
    >
      <div style={{ maxWidth: t.maxWidth, margin: '0 auto' }}>
        {eyebrow && (
          <span
            className="font-body"
            style={{
              color: t.eyebrow,
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: heading ? '10px' : '0.75rem',
            }}
          >
            {eyebrow}
          </span>
        )}
        {heading && (
          <h2
            className="font-heading"
            style={{
              color: t.heading,
              fontSize: 'clamp(1.8rem,3.5vw,43px)',
              lineHeight: 1.08,
              fontWeight: 400,
              margin: '0 0 1.5rem',
            }}
          >
            {heading}
          </h2>
        )}
        {intro && (
          <p
            className="font-body"
            style={{ color: t.body, fontSize: '15px', lineHeight: 1.75, margin: '0 0 1.75rem', maxWidth: '720px' }}
          >
            {intro}
          </p>
        )}
        {children}
      </div>
    </motion.section>
  );
}