import React from 'react';
import { motion } from 'framer-motion';

export default function PageSection({ eyebrow, heading, children, style = {} }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      style={{ marginBottom: '4rem', ...style }}
    >
      {eyebrow && (
        <span className="font-body" style={{ color: '#D4A12A', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.75rem' }}>
          {eyebrow}
        </span>
      )}
      {heading && (
        <h2 className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 400, lineHeight: 1.25, margin: '0 0 1.25rem' }}>
          {heading}
        </h2>
      )}
      {children}
    </motion.section>
  );
}