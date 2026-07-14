import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PATHS = [
  { label: 'Explore Courses', to: '/courses', primary: true },
  { label: 'Explore Resources', to: '/resources', primary: false },
  { label: 'Get in Touch', to: '/contact', primary: false },
];

export default function HomeFinalCTA() {
  return (
    <section
      style={{
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 6vw, 6rem)',
        textAlign: 'center',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{ maxWidth: '640px', margin: '0 auto' }}
      >
        <h2 className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 400, lineHeight: 1.2, margin: '0 0 1.75rem' }}>
          Learn, Contribute, or Build With Us.
        </h2>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          {PATHS.map(({ label, to, primary }) => (
            <Link
              key={label}
              to={to}
              className="font-body"
              style={{
                display: 'inline-flex', alignItems: 'center',
                color: primary ? '#1A130E' : '#D4A12A',
                backgroundColor: primary ? '#D4A12A' : 'transparent',
                fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase',
                textDecoration: 'none', fontWeight: 500,
                border: primary ? '1px solid #D4A12A' : '1px solid rgba(212,161,42,0.4)',
                borderRadius: '2px', padding: '0.65rem 1.3rem',
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  );
}