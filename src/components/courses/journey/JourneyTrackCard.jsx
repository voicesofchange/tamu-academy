import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

const CONTENT = {
  trackLabel: 'Competency-Based Learning Track',
  trackCompetency: 'Track Competency',
  exploreCourse: 'Explore the Course',
};

export default function JourneyTrackCard({ track }) {
  const { content: c } = useTranslatedContent('track-card', CONTENT);
  const course = track.courses?.[0];
  const trackPath = course ? `/courses/${course.slug}` : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="tamu-course-card"
      style={{ padding: '28px', background: 'rgba(255,255,255,0.5)', border: '1px solid #dac7ab', borderRadius: '4px' }}
    >
      <span className="font-body" style={{ color: '#b97827', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.75rem' }}>
        {c.trackLabel}
      </span>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.85rem' }}>
        <h3 className="font-heading" style={{ color: '#39251b', fontSize: '24px', fontWeight: 400, lineHeight: 1.3, margin: 0 }}>{track.title}</h3>
        <span className="font-body" style={{ color: '#9b5d1d', border: '1px solid #d7b57c', borderRadius: '20px', padding: '4px 10px', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{track.status}</span>
      </div>
      <p className="font-body" style={{ color: '#796552', fontSize: '14px', lineHeight: 1.7, margin: '0 0 1.25rem' }}>{track.description}</p>
      <div style={{ padding: '16px 20px', border: '1px solid #dcc8a8', borderRadius: '4px', background: '#fffaf1', marginBottom: '1.5rem' }}>
        <span className="font-body" style={{ color: '#b97827', fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.5rem' }}>{c.trackCompetency}</span>
        <p className="font-body" style={{ color: '#725a46', fontSize: '13px', lineHeight: 1.6, margin: 0, fontStyle: 'italic' }}>{track.competency}</p>
      </div>
      {trackPath && (
        <Link to={trackPath} className="font-body" style={{ display: 'inline-flex', alignItems: 'center', color: '#9b5d1d', fontSize: '11px', letterSpacing: '0.13em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, borderBottom: '1px solid #c18a36', paddingBottom: '2px', transition: 'color 0.25s ease' }}>
          {c.exploreCourse} →
        </Link>
      )}
    </motion.div>
  );
}