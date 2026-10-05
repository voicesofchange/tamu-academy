import React from 'react';
import { motion } from 'framer-motion';
import { useDisplayMode } from '@/lib/display-mode';

const eyebrowStyle = {
  color: '#e8b85b',
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
};

/**
 * ModuleLessonSection — parchment-and-gold section wrapper for module
 * lesson pages. Mirrors the section rhythm of the redesigned Courses page:
 * gold eyebrow, serif heading, thin gold accent, scroll-reveal entrance.
 *
 * In Data-Saver mode the section renders as a plain block: no scroll-reveal
 * work per section and no decorative accent rule, which keeps a long lesson
 * cheap to paint on a low-end device.
 */
export default function ModuleLessonSection({ id, eyebrow, heading, children }) {
  const { isDataSaver } = useDisplayMode();

  const body = (
    <>
      {eyebrow && (
        <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.6rem' }}>
          {eyebrow}
        </span>
      )}
      {heading && (
        <>
          <h2 className="font-heading" style={{ color: '#f3ead8', fontSize: 'clamp(1.6rem,3vw,2.05rem)', fontWeight: 400, lineHeight: 1.15, margin: '0 0 1.25rem' }}>
            {heading}
          </h2>
          <div data-tamu-decorative="true" aria-hidden style={{ width: '48px', height: '2px', background: '#d99b37', marginBottom: '1.5rem', opacity: 0.7 }} />
        </>
      )}
      {children}
    </>
  );

  if (isDataSaver) {
    return (
      <section id={id} style={{ marginBottom: '2.5rem', scrollMarginTop: '90px' }}>
        {body}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      style={{ marginBottom: '3.5rem', scrollMarginTop: '90px' }}
    >
      {body}
    </motion.section>
  );
}