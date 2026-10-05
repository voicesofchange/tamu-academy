import React from 'react';
import { motion } from 'framer-motion';
import SiteShell from '@/components/page/SiteShell';

/**
 * CourseOverviewLayout — warm, inviting shell for course overview pages.
 * Deep espresso hero with a subtle golden glow, followed by alternating
 * parchment and espresso content sections provided as children.
 */
export default function CourseOverviewLayout({ heroEyebrow, heroTitle, heroSubtitle, heroBadges, heroCta, children }) {
  return (
    <SiteShell>
      <section style={{ position: 'relative', padding: '130px clamp(1.5rem,6vw,88px) 56px', overflow: 'hidden' }}>
        <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 75% 55% at 22% 32%, rgba(217,155,55,0.10) 0%, transparent 65%)' }} />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
          style={{ position: 'relative', zIndex: 1, maxWidth: '780px' }}
        >
          <span className="font-body" style={{ color: 'var(--tamu-gold)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>{heroEyebrow}</span>
          <h1 className="font-heading" style={{ fontWeight: 400, fontSize: 'clamp(2.2rem,4.8vw,56px)', lineHeight: 1.05, letterSpacing: '-0.03em', margin: '16px 0 20px', color: 'var(--tamu-ink)' }}>{heroTitle}</h1>
          {heroSubtitle && (
            <p className="font-body" style={{ fontSize: 'clamp(1rem,1.4vw,17px)', lineHeight: 1.7, color: '#ddcfbb', maxWidth: '640px', margin: 0 }}>{heroSubtitle}</p>
          )}
          {heroBadges && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '22px' }}>{heroBadges}</div>
          )}
          {heroCta && (
            <div style={{ marginTop: '28px' }}>{heroCta}</div>
          )}
        </motion.div>
      </section>
      {children}
    </SiteShell>
  );
}