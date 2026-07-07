import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function HomeVideoPreview() {
  return (
    <section
      style={{
        padding: 'clamp(3.5rem, 7vw, 5.5rem) clamp(1.5rem, 6vw, 6rem)',
        borderTop: '1px solid rgba(212,161,42,0.08)',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}
        >
          <div style={{ maxWidth: '560px' }}>
            <p className="font-body" style={{ color: '#D4A12A', fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 500, marginBottom: '0.75rem' }}>
              Now Available
            </p>
            <h2 className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 400, lineHeight: 1.25, margin: '0 0 0.85rem' }}>
              Tamu Academy's First Lessons
            </h2>
            <p className="font-body" style={{ color: 'rgba(245,239,224,0.68)', fontSize: '0.97rem', lineHeight: 1.8, fontWeight: 300, margin: 0 }}>
              The first publicly available Tamu Academy learning collection — free introductory videos exploring wellbeing, institutions, policy, economics, and global systems.
            </p>
          </div>

          <Link
            to="/videos"
            className="font-body"
            style={{
              display: 'inline-flex', alignItems: 'center',
              color: '#D4A12A',
              fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase',
              textDecoration: 'none', fontWeight: 500,
              border: '1px solid rgba(212,161,42,0.4)', borderRadius: '2px', padding: '0.65rem 1.3rem',
              flexShrink: 0,
            }}
          >
            Watch the First Lessons →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}