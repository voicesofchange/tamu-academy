import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHeading({ eyebrow, title }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      style={{ marginBottom: '2.75rem' }}
    >
      {eyebrow && (
        <p
          className="font-body"
          style={{
            color: '#D4A12A',
            fontSize: '0.72rem',
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            fontWeight: 500,
            marginBottom: '0.9rem',
          }}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className="font-heading"
        style={{
          color: '#F5EFE0',
          fontSize: 'clamp(1.9rem, 4vw, 3rem)',
          lineHeight: 1.1,
          fontWeight: 500,
          margin: 0,
          maxWidth: '760px',
        }}
      >
        {title}
      </h2>
    </motion.div>
  );
}