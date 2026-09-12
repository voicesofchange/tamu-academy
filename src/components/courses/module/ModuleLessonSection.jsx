import React from 'react';
import { motion } from 'framer-motion';

const eyebrowStyle = {
  color: '#e8b85b',
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
};

/**
 * ModuleLessonSection — parchment-and-gold section wrapper for module
 * lesson pages. Mirrors the section rhythm of the redesigned Courses page:
 * gold eyebrow, serif heading, thin gold accent, scroll-reveal entrance.
 */
export default function ModuleLessonSection({ id, eyebrow, heading, children }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      style={{ marginBottom: '3.5rem', scrollMarginTop: '90px' }}
    >
      {eyebrow && (
        <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.6rem' }}>
          {eyebrow}
        </span>
      )}
      {heading && (
        <>
          <h2 className="font-heading" style={{ color: '#f3ead8', fontSize: 'clamp(1.6rem,3vw,2.05rem)', fontWeight: 400, lineHeight: 1.15, margin: '0 0 1.25rem' }}>
            {heading}
          </h2>
          <div aria-hidden style={{ width: '48px', height: '2px', background: '#d99b37', marginBottom: '1.5rem', opacity: 0.7 }} />
        </>
      )}
      {children}
    </motion.section>
  );
}