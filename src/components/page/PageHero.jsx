import React from 'react';
import { motion } from 'framer-motion';

/**
 * PageHero — the standard reading-page header: gold eyebrow, serif heading,
 * hairline gold rule, then an italic serif subheading. Every element shares
 * one left-aligned axis so the header reads as a single column.
 */
export default function PageHero({ eyebrow, heading, subheading }) {
  return (
    <div style={{ padding: '8rem clamp(1.5rem, 6vw, 4rem) 4rem', marginBottom: '4rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {eyebrow && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="font-body"
            style={{ color: 'var(--tamu-gold)', fontSize: '0.7rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '1.25rem' }}
          >
            {eyebrow}
          </motion.span>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          className="font-heading"
          style={{ color: 'var(--tamu-ink)', fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 400, lineHeight: 1.2, margin: '0 0 1.25rem', maxWidth: '820px' }}
        >
          {heading}
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scaleX: 0.4 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
          aria-hidden="true"
          style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, transparent, var(--tamu-gold) 35%, #E2B652 50%, var(--tamu-gold) 65%, transparent)', marginBottom: '2rem', transformOrigin: 'left' }}
        />
        {subheading && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
            className="font-heading"
            style={{ color: 'rgba(232,184,91,0.9)', fontSize: 'clamp(1.1rem, 2.2vw, 1.4rem)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.6, margin: 0, maxWidth: '680px' }}
          >
            {subheading}
          </motion.p>
        )}
      </div>
    </div>
  );
}