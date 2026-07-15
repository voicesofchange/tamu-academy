import React from 'react';
import { motion } from 'framer-motion';
import StatusBadge from '@/components/page/StatusBadge';

const bodyText = { color: 'rgba(245,239,224,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };

/**
 * Future-ready module card. Reuses the existing Courses page card treatment.
 * Modules are intentionally non-interactive until learning materials are ready:
 * no Link, no route, no navigation target.
 */
export default function ModuleCard({ module }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{ padding: '1.75rem 2rem', border: '1px solid rgba(212,161,42,0.22)', borderRadius: '4px', backgroundColor: 'rgba(245,239,224,0.015)' }}
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.85rem' }}>
        <span className="font-body" style={{ color: '#D4A12A', fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500 }}>
          {module.number}
        </span>
        <StatusBadge label={module.status} />
      </div>
      <h3 className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(1.1rem, 2.4vw, 1.4rem)', fontWeight: 400, lineHeight: 1.3, margin: '0 0 0.85rem' }}>
        {module.title}
      </h3>
      <p className="font-body" style={{ ...bodyText, margin: 0 }}>
        {module.description}
      </p>
    </motion.div>
  );
}