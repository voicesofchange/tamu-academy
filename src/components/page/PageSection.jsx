import React from 'react';
import { motion } from 'framer-motion';

/**
 * PageSection — consistent content block with optional alternating surface tone.
 * tone='dark' (default): transparent on the page's deep umber background.
 * tone='tinted': subtle parchment-tinted surface with top/bottom hairline borders,
 *   creating the Drumbeat-style alternating rhythm between sections.
 */
export default function PageSection({ id, eyebrow, heading, children, tone = 'dark', style = {} }) {
  const isTinted = tone === 'tinted';
  const surfaceStyle = isTinted
    ? {
        backgroundColor: 'rgba(243,234,216,0.015)',
        borderTop: '1px solid rgba(232,184,91,0.08)',
        borderBottom: '1px solid rgba(232,184,91,0.08)',
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 6vw, 6rem)',
      }
    : {
        padding: '0 clamp(1.5rem, 6vw, 4rem)',
      };

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      style={{
        marginBottom: isTinted ? 0 : '4rem',
        scrollMarginTop: '90px',
        ...surfaceStyle,
        ...style,
      }}
    >
      <div style={isTinted ? { maxWidth: '1100px', margin: '0 auto' } : { maxWidth: '900px', margin: '0 auto' }}>
        {eyebrow && (
          <span className="font-body" style={{ color: '#e8b85b', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.75rem' }}>
            {eyebrow}
          </span>
        )}
        {heading && (
          <h2 className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 400, lineHeight: 1.25, margin: '0 0 1.25rem' }}>
            {heading}
          </h2>
        )}
        {children}
      </div>
    </motion.section>
  );
}