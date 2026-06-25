import React from 'react';
import { motion } from 'framer-motion';

export default function VideoSeries() {
  return (
    <section
      id="video"
      style={{
        position: 'relative',
        padding: 'clamp(5rem, 11vw, 9rem) clamp(1.5rem, 6vw, 6rem)',
        textAlign: 'center',
        scrollMarginTop: '80px',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 45% 60% at 50% 50%, rgba(232,149,28,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ position: 'relative', zIndex: 1, maxWidth: '680px', margin: '0 auto' }}
      >
        <span
          className="font-body"
          style={{
            display: 'inline-block',
            color: '#D4A12A',
            fontSize: '0.72rem',
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            fontWeight: 500,
            padding: '0.4rem 1rem',
            border: '1px solid rgba(212,161,42,0.3)',
            borderRadius: '999px',
            marginBottom: '2rem',
          }}
        >
          Coming Soon
        </span>

        <h2
          className="font-heading"
          style={{
            color: '#F5EFE0',
            fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
            lineHeight: 1.12,
            fontWeight: 500,
            margin: '0 0 1.5rem',
          }}
        >
          The video series
        </h2>

        <p
          className="font-body"
          style={{
            color: 'rgba(245,239,224,0.82)',
            fontSize: 'clamp(1.05rem, 1.5vw, 1.25rem)',
            lineHeight: 1.8,
            fontWeight: 300,
            margin: 0,
          }}
        >
          Short video lessons on the mind, policy, the world, and the planet — launching soon.
          AfroCentric, accessible, and made for a new generation of{' '}
          <span style={{ color: '#E2B652' }}>changemakers</span>.
        </p>
      </motion.div>
    </section>
  );
}