import React from 'react';
import { motion } from 'framer-motion';

const STATS = [
  { value: '2', label: 'Courses Live Now' },
  { value: '5', label: 'Learning Areas' },
  { value: '13+', label: 'Modules with Certificates' },
  { value: 'Free', label: 'To Learn' },
];

export default function HomeProofStats() {
  return (
    <section
      style={{
        backgroundColor: 'rgba(243,234,216,0.015)',
        borderTop: '1px solid rgba(232,184,91,0.08)',
        borderBottom: '1px solid rgba(232,184,91,0.08)',
        padding: 'clamp(3.5rem, 7vw, 5rem) clamp(1.5rem, 6vw, 6rem)',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '2rem',
            textAlign: 'center',
          }}
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.1 }}
            >
              <p
                className="font-heading"
                style={{
                  color: '#e8b85b',
                  fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                  fontWeight: 400,
                  lineHeight: 1,
                  margin: '0 0 0.6rem',
                }}
              >
                {stat.value}
              </p>
              <p
                className="font-body"
                style={{
                  color: 'rgba(243,234,216,0.62)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  margin: 0,
                }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}