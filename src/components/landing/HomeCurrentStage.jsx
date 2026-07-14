import React from 'react';
import { motion } from 'framer-motion';

export default function HomeCurrentStage() {
  return (
    <section
      style={{
        backgroundColor: 'rgba(245,239,224,0.015)',
        borderTop: '1px solid rgba(212,161,42,0.08)',
        borderBottom: '1px solid rgba(212,161,42,0.08)',
        padding: 'clamp(4rem, 8vw, 6.5rem) clamp(1.5rem, 6vw, 6rem)',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{ maxWidth: '680px' }}
        >
          <p className="font-body" style={{ color: '#D4A12A', fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 500, marginBottom: '1rem' }}>
            Current Stage
          </p>

          <h2 className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 400, lineHeight: 1.25, margin: '0 0 1.25rem' }}>
            Where Tamu Academy Is Now
          </h2>

          <p className="font-body" style={{ color: 'rgba(245,239,224,0.72)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300, margin: 0 }}>
            Tamu Academy is developing expert-led courses across five areas: mind and wellbeing, economics and development, AI and digital futures, public policy and governance, and the Waiyaki wa Hinga Heritage and Leadership Collection. Free videos and articles are available now as an open-learning entry point.
          </p>
        </motion.div>
      </div>
    </section>
  );
}