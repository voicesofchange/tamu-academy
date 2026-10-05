import React from 'react';
import { motion } from 'framer-motion';

const tileStyle = {
  padding: '1.4rem 1.5rem',
  border: '1px solid rgba(232,184,91,0.22)',
  borderRadius: '4px',
  backgroundColor: 'rgba(243,234,216,0.015)',
};

const valueStyle = {
  color: '#f8f0df',
  fontSize: 'clamp(1.5rem, 3.2vw, 2rem)',
  fontWeight: 400,
  lineHeight: 1.1,
  display: 'block',
  margin: '0 0 0.4rem',
};

const noteStyle = {
  color: 'rgba(243,234,216,0.66)',
  fontSize: '0.78rem',
  lineHeight: 1.6,
  fontWeight: 300,
  margin: '0.5rem 0 0',
};

/**
 * ProgressSummaryStrip — the at-a-glance figures above the course cards:
 * how many courses the learner has joined, how many modules are finished
 * in total, how many courses are complete, and overall progress.
 */
export default function ProgressSummaryStrip({ summary }) {
  const tiles = [
    {
      label: 'Courses joined',
      value: `${summary.enrolled} of ${summary.coursesTotal}`,
      note: 'Courses you have enrolled in.',
    },
    {
      label: 'Modules completed',
      value: `${summary.modulesCompleted} of ${summary.modulesTotal}`,
      note: 'Modules finished across every course.',
    },
    {
      label: 'Courses completed',
      value: `${summary.coursesCompleted} of ${summary.coursesTotal}`,
      note: 'Courses with every module complete.',
    },
    {
      label: 'Overall progress',
      value: `${summary.modulesTotal > 0 ? Math.round((summary.modulesCompleted / summary.modulesTotal) * 100) : 0}%`,
      note: 'Your progress across the whole library.',
    },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
      {tiles.map((tile, index) => (
        <motion.div
          key={tile.label}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.06 }}
          style={tileStyle}
        >
          <span
            className="font-body"
            style={{ color: '#e8b85b', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.55rem' }}
          >
            {tile.label}
          </span>
          <span className="font-heading" style={valueStyle}>{tile.value}</span>
          <p className="font-body" style={noteStyle}>{tile.note}</p>
        </motion.div>
      ))}
    </div>
  );
}