import React from 'react';
import { motion } from 'framer-motion';

export default function PageHero({ eyebrow, heading, subheading }) {
  return (
    <div style={{ marginBottom: '4rem' }}>
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="font-body"
          style={{ color: '#D4A12A', fontSize: '0.7rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '1.25rem' }}
        >
          {eyebrow}
        </motion.span>
      )}
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
        className="font-heading"
        style={{ color: '#F5EFE0', fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 400, lineHeight: 1.2, margin: '0 0 1.25rem' }}
      >
        {heading}
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, scaleX: 0.4 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
        aria-hidden="true"
        style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, transparent, #D4A12A 35%, #E2B652 50%, #D4A12A 65%, transparent)', marginBottom: '2rem', transformOrigin: 'left' }}
      />
      {subheading && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
          className="font-heading"
          style={{ color: 'rgba(212,161,42,0.9)', fontSize: 'clamp(1.1rem, 2.2vw, 1.4rem)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.6, margin: 0, maxWidth: '680px' }}
        >
          {subheading}
        </motion.p>
      )}
    </div>
  );
}