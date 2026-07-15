import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import StatusBadge from '@/components/page/StatusBadge';

const bodyText = { color: 'rgba(245,239,224,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };

/**
 * Renders a competency-based learning track inside a learning area section.
 * Reuses the existing card treatment from the Courses page.
 */
export default function TrackCard({ track }) {
  const course = track.courses?.[0];
  const trackPath = course ? `/courses/${course.slug}` : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{ padding: '2rem 2.25rem', border: '1px solid rgba(212,161,42,0.28)', borderRadius: '4px', backgroundColor: 'rgba(245,239,224,0.02)' }}
    >
      <span
        className="font-body"
        style={{ color: '#D4A12A', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.75rem' }}
      >
        Competency-Based Learning Track
      </span>

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.85rem' }}>
        <h3 className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(1.15rem, 2.5vw, 1.5rem)', fontWeight: 400, lineHeight: 1.3, margin: 0 }}>
          {track.title}
        </h3>
        <StatusBadge label={track.status} />
      </div>

      <p className="font-body" style={{ ...bodyText, margin: '0 0 1.25rem' }}>
        {track.description}
      </p>

      <div style={{ padding: '1rem 1.25rem', border: '1px solid rgba(212,161,42,0.12)', borderRadius: '4px', backgroundColor: 'rgba(245,239,224,0.015)', marginBottom: '1.5rem' }}>
        <span className="font-body" style={{ color: '#D4A12A', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.5rem' }}>
          Track Competency
        </span>
        <p className="font-body" style={{ ...bodyText, fontSize: '0.92rem', margin: 0, fontStyle: 'italic' }}>
          {track.competency}
        </p>
      </div>

      {trackPath && (
        <Link
          to={trackPath}
          style={{ display: 'inline-flex', alignItems: 'center', color: '#D4A12A', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, border: '1px solid rgba(212,161,42,0.4)', borderRadius: '2px', padding: '0.55rem 1.1rem' }}
        >
          Explore the Course &rarr;
        </Link>
      )}
    </motion.div>
  );
}