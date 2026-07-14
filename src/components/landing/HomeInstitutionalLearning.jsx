import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function HomeInstitutionalLearning() {
  return (
    <section
      style={{
        borderTop: '1px solid rgba(212,161,42,0.08)',
        padding: 'clamp(3.5rem, 7vw, 5.5rem) clamp(1.5rem, 6vw, 6rem)',
      }}
      aria-label="Learning for institutions"
    >
      <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <span
            className="font-body"
            style={{ color: '#D4A12A', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.9rem' }}
          >
            Institutions
          </span>
          <h2
            className="font-heading"
            style={{ color: '#F5EFE0', fontSize: 'clamp(1.35rem, 2.8vw, 1.9rem)', fontWeight: 400, lineHeight: 1.25, margin: '0 0 1rem' }}
          >
            Learning for Institutions
          </h2>
          <div
            aria-hidden="true"
            style={{ width: '48px', height: '1px', background: 'linear-gradient(90deg, transparent, #D4A12A 35%, #E2B652 50%, #D4A12A 65%, transparent)', margin: '0 auto 1.25rem' }}
          />
          <p
            className="font-body"
            style={{ color: 'rgba(245,239,224,0.68)', fontSize: '0.95rem', lineHeight: 1.8, fontWeight: 300, margin: '0 0 1.75rem' }}
          >
            Tamu Academy is developing course packages for universities, youth organizations, nonprofits, public institutions, and community programmes.
          </p>
          <Link
            to="/contact?inquiry=university-or-institutional-partnership"
            className="font-body"
            style={{
              display: 'inline-flex', alignItems: 'center',
              color: '#D4A12A',
              fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase',
              textDecoration: 'none', fontWeight: 500,
              border: '1px solid rgba(212,161,42,0.4)',
              borderRadius: '2px', padding: '0.65rem 1.3rem',
            }}
          >
            Discuss a Partnership →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}