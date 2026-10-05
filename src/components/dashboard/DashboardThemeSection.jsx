import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const eyebrowStyle = { display: 'block', color: 'var(--tamu-gold)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, marginBottom: '0.75rem' };
const headingStyle = { color: 'var(--tamu-ink)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 400, lineHeight: 1.25, margin: '0 0 1.5rem' };

/**
 * DashboardThemeSection — renders one emphasis area of the tailored dashboard
 * (community pathways, career and impact) as a grid of group-specific cards.
 */
export default function DashboardThemeSection({ id, eyebrow, heading, items }) {
  if (!items || items.length === 0) return null;

  return (
    <section id={id} style={{ padding: '0 clamp(1.5rem, 6vw, 4rem)', marginBottom: '4rem', scrollMarginTop: '90px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <span className="font-body" style={eyebrowStyle}>{eyebrow}</span>
        <h2 className="font-heading" style={headingStyle}>{heading}</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {items.map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{ display: 'flex', flexDirection: 'column', padding: '1.6rem 1.75rem', border: '1px solid rgba(232,184,91,0.22)', borderRadius: '4px', backgroundColor: 'rgba(243,234,216,0.015)' }}
            >
              <h3 className="font-heading" style={{ color: 'var(--tamu-ink)', fontSize: '1.1rem', fontWeight: 400, lineHeight: 1.35, margin: '0 0 0.5rem' }}>
                {item.title}
              </h3>
              <p className="font-body" style={{ color: 'rgba(243,234,216,0.72)', fontSize: '0.88rem', lineHeight: 1.8, fontWeight: 300, margin: '0 0 1.1rem' }}>
                {item.body}
              </p>
              <Link to={item.to} className="font-body" style={{ marginTop: 'auto', color: 'var(--tamu-gold)', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                {item.cta}
                <ArrowRight size={13} aria-hidden="true" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}