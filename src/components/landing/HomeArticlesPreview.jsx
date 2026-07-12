import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function HomeArticlesPreview() {
  return (
    <section
      style={{
        borderTop: '1px solid rgba(212,161,42,0.12)',
        padding: 'clamp(3rem, 6vw, 4.5rem) clamp(1.5rem, 8vw, 5rem)',
      }}
      aria-label="Articles preview"
    >
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {/* Eyebrow */}
          <span
            className="font-body"
            style={{
              color: '#D4A12A',
              fontSize: '0.62rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 500,
              display: 'block',
              marginBottom: '0.9rem',
            }}
          >
            Read and Reflect
          </span>

          {/* Heading */}
          <h2
            className="font-heading"
            style={{
              color: '#F5EFE0',
              fontSize: 'clamp(1.35rem, 2.8vw, 1.9rem)',
              fontWeight: 400,
              lineHeight: 1.25,
              margin: '0 0 1rem',
            }}
          >
            Explore Ideas Beyond the Episode
          </h2>

          {/* Divider */}
          <div
            aria-hidden="true"
            style={{
              width: '48px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #D4A12A 35%, #E2B652 50%, #D4A12A 65%, transparent)',
              margin: '0 0 1.25rem',
            }}
          />

          {/* Featured article */}
          <div
            style={{
              border: '1px solid rgba(212,161,42,0.2)',
              borderRadius: '4px',
              padding: '1.5rem',
              marginBottom: '1.75rem',
              backgroundColor: 'rgba(212,161,42,0.02)',
            }}
          >
            <span
              className="font-body"
              style={{
                color: 'rgba(212,161,42,0.7)',
                fontSize: '0.6rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                fontWeight: 500,
                display: 'block',
                marginBottom: '0.5rem',
              }}
            >
              Mind and Wellbeing
            </span>
            <h3
              className="font-heading"
              style={{
                color: '#F5EFE0',
                fontSize: 'clamp(1.05rem, 2vw, 1.3rem)',
                fontWeight: 400,
                lineHeight: 1.3,
                margin: '0 0 0.65rem',
              }}
            >
              The Real Cost of Always Achieving
            </h3>
            <p
              className="font-body"
              style={{
                color: 'rgba(245,239,224,0.6)',
                fontSize: '0.9rem',
                lineHeight: 1.75,
                fontWeight: 300,
                margin: '0 0 1.25rem',
              }}
            >
              An exploration of how constant pressure to perform can affect identity, wellbeing, relationships, and the way success is understood.
            </p>
            <Link
              to="/articles/the-real-cost-of-always-achieving"
              className="font-body"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                color: '#D4A12A',
                fontSize: '0.7rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                fontWeight: 500,
                border: '1px solid rgba(212,161,42,0.4)',
                borderRadius: '2px',
                padding: '0.5rem 1rem',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#D4A12A'; e.currentTarget.style.color = '#E2B652'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(212,161,42,0.4)'; e.currentTarget.style.color = '#D4A12A'; }}
            >
              Read the Article →
            </Link>
          </div>

          {/* Secondary link */}
          <Link
            to="/articles"
            className="font-body"
            style={{
              color: 'rgba(245,239,224,0.5)',
              fontSize: '0.7rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              fontWeight: 500,
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#D4A12A'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(245,239,224,0.5)'}
          >
            View All Articles →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}