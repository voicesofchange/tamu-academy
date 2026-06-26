import React from 'react';
import { motion } from 'framer-motion';

const PRINCIPLES = [
  'Human connection before technological convenience',
  'Cultural dignity',
  'Curiosity before assumption',
  'Dialogue across differences',
  'Critical and responsible technology use',
  'Accessible participation',
  'Community knowledge',
  'Youth leadership',
  'Practical action',
];

export default function LabPrinciples() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem' }}>
      {PRINCIPLES.map((p, i) => (
        <motion.div
          key={p}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.05 }}
          style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '1.1rem 1.25rem', border: '1px solid rgba(212,161,42,0.14)', borderRadius: '4px', backgroundColor: 'rgba(245,239,224,0.02)' }}
        >
          <span aria-hidden="true" style={{ color: '#D4A12A', fontSize: '0.8rem', marginTop: '0.15rem', flexShrink: 0 }}>◆</span>
          <span className="font-body" style={{ color: 'rgba(245,239,224,0.8)', fontSize: '0.9rem', lineHeight: 1.6, fontWeight: 300 }}>{p}</span>
        </motion.div>
      ))}
    </div>
  );
}