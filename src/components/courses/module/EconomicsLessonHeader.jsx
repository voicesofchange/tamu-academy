import React from 'react';
import { motion } from 'framer-motion';
import StatusBadge from '@/components/page/StatusBadge';

const bodyText = { color: 'rgba(243,234,216,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };

/**
 * EconomicsLessonHeader — the shared lesson opening for every economics
 * module: module and status badges, lesson title, estimated time, and the
 * module competency. Identical across all six modules.
 */
export default function EconomicsLessonHeader({ module, competencyLabel, estimatedTimeLabel }) {
  return (
    <header style={{ marginBottom: '3rem' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignItems: 'center', marginBottom: '1rem' }}>
        <StatusBadge label={module.number} />
        <StatusBadge label={module.status} />
      </div>
      <h1 className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.75rem, 4vw, 2.6rem)', fontWeight: 400, lineHeight: 1.2, margin: '0 0 1rem' }}>
        {module.title}
      </h1>
      <p className="font-body" style={{ color: 'rgba(243,234,216,0.55)', fontSize: '0.82rem', letterSpacing: '0.06em', marginBottom: '1.5rem' }}>
        {estimatedTimeLabel}: {module.estimatedTime}
      </p>
      <motion.div
        initial={{ opacity: 0, scaleX: 0.4 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
        data-tamu-decorative="true"
        aria-hidden="true"
        style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, transparent, #e8b85b 35%, #e8b85b 50%, #e8b85b 65%, transparent)', marginBottom: '1.75rem', transformOrigin: 'left' }}
      />
      <div style={{ padding: '1.25rem 1.5rem', border: '1px solid rgba(232,184,91,0.22)', borderRadius: '4px', backgroundColor: 'rgba(243,234,216,0.015)' }}>
        <span className="font-body" style={{ color: '#e8b85b', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.5rem' }}>
          {competencyLabel}
        </span>
        <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>{module.competency}</p>
      </div>
    </header>
  );
}