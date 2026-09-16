import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import StatusBadge from '@/components/page/StatusBadge';
import { Award } from 'lucide-react';

const bodyText = { color: 'rgba(243,234,216,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };

/**
 * Module card with numbered journey visual and Coursera-style metadata strip.
 * Modules are non-interactive until learning materials are ready (no route = no Link).
 */
export default function ModuleCard({ module, to }) {
  const card = (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="tamu-card"
      style={{ padding: '1.75rem 2rem', border: '1px solid rgba(232,184,91,0.22)', borderRadius: '4px', backgroundColor: 'rgba(243,234,216,0.015)', display: 'flex', flexDirection: 'column' }}
    >
      {/* Numbered journey marker + status */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span
            className="font-heading"
            style={{
              color: '#e8b85b',
              fontSize: '1.5rem',
              fontWeight: 400,
              opacity: 0.5,
              lineHeight: 1,
            }}
          >
            {module.number}
          </span>
          <span className="font-body" style={{ color: 'rgba(232,184,91,0.6)', fontSize: '0.58rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500 }}>
            Module
          </span>
        </div>
        <StatusBadge label={module.status} />
      </div>

      <h3 className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.1rem, 2.4vw, 1.4rem)', fontWeight: 400, lineHeight: 1.3, margin: '0 0 0.85rem' }}>
        {module.title}
      </h3>
      <p className="font-body" style={{ ...bodyText, margin: '0 0 1.25rem', flexGrow: 1 }}>
        {module.description}
      </p>

      {/* Metadata strip — Coursera-style */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.85rem',
          paddingTop: '1rem',
          borderTop: '1px solid rgba(232,184,91,0.12)',
        }}
      >
        <span className="font-body" style={{ color: 'rgba(243,234,216,0.5)', fontSize: '0.68rem', letterSpacing: '0.08em', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
          <Award size={12} style={{ color: 'rgba(232,184,91,0.6)' }} strokeWidth={1.5} />
          Certificate-eligible
        </span>
        {to && (
          <span className="font-body" style={{ color: '#e8b85b', fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500, marginLeft: 'auto' }}>
            Open →
          </span>
        )}
      </div>
    </motion.div>
  );
  return to ? (
    <Link to={to} style={{ textDecoration: 'none', display: 'block' }}>
      {card}
    </Link>
  ) : card;
}