import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function VideoSeries() {
  return (
    <section
      id="insights"
      style={{
        position: 'relative',
        padding: 'clamp(5rem, 11vw, 9rem) clamp(1.5rem, 6vw, 6rem)',
        textAlign: 'center',
        scrollMarginTop: '90px',
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
          Ideas Worth Exploring
        </h2>

        <p
          className="font-body"
          style={{
            color: 'rgba(245,239,224,0.78)',
            fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
            lineHeight: 1.85,
            fontWeight: 300,
            margin: '0 0 2rem',
          }}
        >
          Tamu Academy is developing short educational videos, conversations, articles, policy explainers, discussion guides, and recommended readings — accessible learning materials that make serious ideas available to more people.
        </p>

        <Link
          to="/insights"
          className="font-body"
          style={{
            display: 'inline-flex', alignItems: 'center',
            color: '#D4A12A',
            fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase',
            textDecoration: 'none', fontWeight: 500,
            border: '1px solid rgba(212,161,42,0.35)',
            borderRadius: '2px', padding: '0.65rem 1.3rem',
          }}
        >
          Explore Insights and Resources →
        </Link>
      </motion.div>
    </section>
  );
}