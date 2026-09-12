import React from 'react';
import { motion } from 'framer-motion';

const SURFACES = {
  dark: { bg: '#24150f', heading: '#f3ead8', eyebrow: '#e8b85b', accent: '#d99b37' },
  darker: { bg: '#302018', heading: '#f3ead8', eyebrow: '#e8b85b', accent: '#d99b37' },
  light: { bg: '#faf6ec', heading: '#39251b', eyebrow: '#b97827', accent: '#9b5d1d' },
};

/**
 * CourseOverviewSection — alternating-surface section for course overview
 * pages. Parchment ('light') for text-heavy content, espresso ('dark'/
 * 'darker') for interactive components. Gold accent divider under heading.
 */
export default function CourseOverviewSection({ id, eyebrow, heading, surface = 'dark', children, maxWidth = '760px' }) {
  const s = SURFACES[surface] || SURFACES.dark;
  return (
    <section id={id} style={{ padding: '72px clamp(1.5rem,6vw,88px)', background: s.bg, scrollMarginTop: '90px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{ maxWidth, margin: '0 auto' }}
      >
        {eyebrow && (
          <span className="font-body" style={{ color: s.eyebrow, fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '0.6rem' }}>{eyebrow}</span>
        )}
        {heading && (
          <>
            <h2 className="font-heading" style={{ color: s.heading, fontSize: 'clamp(1.6rem,3.2vw,38px)', fontWeight: 400, lineHeight: 1.1, margin: '0 0 1rem' }}>{heading}</h2>
            <div aria-hidden style={{ width: '48px', height: '2px', background: s.accent, marginBottom: '1.75rem', opacity: 0.7 }} />
          </>
        )}
        {children}
      </motion.div>
    </section>
  );
}