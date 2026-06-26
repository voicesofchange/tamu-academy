import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function FeaturedProgramme() {
  return (
    <section
      style={{
        backgroundColor: 'rgba(245,239,224,0.015)',
        borderTop: '1px solid rgba(212,161,42,0.08)',
        borderBottom: '1px solid rgba(212,161,42,0.08)',
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 6vw, 6rem)',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{ marginBottom: '2rem' }}
        >
          <p className="font-body" style={{ color: '#D4A12A', fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 500, marginBottom: '1rem' }}>
            Featured Programme
          </p>

          {/* Status badge */}
          <span className="font-body" style={{ display: 'inline-block', color: 'rgba(212,161,42,0.85)', fontSize: '0.65rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, border: '1px solid rgba(212,161,42,0.3)', borderRadius: '999px', padding: '0.3rem 0.85rem', marginBottom: '1.25rem' }}>
            Proposed Pilot Programme
          </span>

          <h2 className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(1.7rem, 4vw, 2.75rem)', fontWeight: 400, lineHeight: 1.15, margin: '0 0 0.75rem', maxWidth: '720px' }}>
            Tamu Intercultural AI Leadership Lab
          </h2>

          <p className="font-heading" style={{ color: 'rgba(212,161,42,0.82)', fontSize: 'clamp(1rem, 2vw, 1.25rem)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.6, margin: '0 0 1.5rem', maxWidth: '600px' }}>
            Human connection, cultural dignity, and responsible leadership in the age of artificial intelligence.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '3rem', alignItems: 'start' }} className="featured-prog-grid">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          >
            <p className="font-body" style={{ color: 'rgba(245,239,224,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300, marginBottom: '1.5rem' }}>
              A proposed six-month learning and dialogue programme that would bring together culturally, linguistically, geographically, and socially diverse young people to examine how artificial intelligence affects identity, trust, language, cultural representation, misinformation, and human relationships.
            </p>

            <p className="font-body" style={{ color: 'rgba(245,239,224,0.62)', fontSize: '0.93rem', lineHeight: 1.8, fontWeight: 300, fontStyle: 'italic', marginBottom: '1.75rem' }}>
              "How can young people use artificial intelligence without allowing technology to weaken human connection, cultural dignity, and understanding across differences?"
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', alignItems: 'center' }}>
              <Link
                to="/programmes/intercultural-ai-leadership-lab"
                style={{
                  display: 'inline-flex', alignItems: 'center',
                  color: '#1A130E', backgroundColor: '#D4A12A',
                  fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase',
                  textDecoration: 'none', fontWeight: 500,
                  border: '1px solid #D4A12A', borderRadius: '2px', padding: '0.65rem 1.3rem',
                }}
              >
                Explore the Proposed Lab
              </Link>
              <Link
                to="/programmes"
                className="font-body"
                style={{ color: 'rgba(245,239,224,0.55)', fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500 }}
              >
                View All Programmes →
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            style={{ padding: '1.75rem', border: '1px solid rgba(212,161,42,0.28)', borderRadius: '4px', backgroundColor: 'rgba(212,161,42,0.03)' }}
          >
            <p className="font-body" style={{ color: '#D4A12A', fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, marginBottom: '0.85rem' }}>
              Core Principle
            </p>
            <p className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(1rem, 1.8vw, 1.2rem)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.65, margin: 0 }}>
              "Dialogue is the method. Artificial intelligence is the subject. Intercultural leadership is the outcome."
            </p>
          </motion.div>
        </div>
      </div>

      <style>{`@media (max-width: 640px) { .featured-prog-grid { grid-template-columns: 1fr !important; gap: 2rem !important; } }`}</style>
    </section>
  );
}