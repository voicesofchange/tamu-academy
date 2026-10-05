import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { STATE_STYLES } from '@/lib/remote-pathway';

const eyebrowStyle = { display: 'block', color: 'var(--tamu-gold)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, marginBottom: '0.75rem' };
const headingStyle = { color: 'var(--tamu-ink)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 400, lineHeight: 1.25, margin: '0 0 1rem' };
const introStyle = { color: 'rgba(243,234,216,0.75)', fontSize: '0.95rem', lineHeight: 1.85, fontWeight: 300, margin: '0 0 1.5rem', maxWidth: '46rem' };
const ctaStyle = { color: 'var(--tamu-gold)', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' };

/**
 * PathwayStage — one stage of the Remote Learner pathway, with each step
 * tagged by what happens to the learner's work (saved, offline, or read online).
 */
export default function PathwayStage({ stage }) {
  return (
    <section style={{ padding: '0 clamp(1.5rem, 6vw, 4rem)', marginBottom: '3.5rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <span className="font-body" style={eyebrowStyle}>{stage.label}</span>
        <h2 className="font-heading" style={headingStyle}>{stage.title}</h2>
        <p className="font-body" style={introStyle}>{stage.intro}</p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ border: '1px solid rgba(232,184,91,0.22)', borderRadius: '4px', backgroundColor: 'rgba(243,234,216,0.015)' }}
        >
          {stage.steps.map((step, index) => {
            const tag = STATE_STYLES[step.state];
            return (
              <div
                key={step.title}
                style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', padding: '1.35rem 1.75rem', borderTop: index === 0 ? 'none' : '1px solid rgba(232,184,91,0.14)' }}
              >
                <div style={{ flex: '1 1 20rem' }}>
                  <span className="font-body" style={{ display: 'inline-block', color: tag.color, border: `1px solid ${tag.border}`, backgroundColor: tag.background, fontSize: '0.58rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, borderRadius: '2px', padding: '0.18rem 0.6rem', marginBottom: '0.6rem' }}>
                    {tag.label}
                  </span>
                  <h3 className="font-heading" style={{ color: 'var(--tamu-ink)', fontSize: '1.08rem', fontWeight: 400, lineHeight: 1.35, margin: '0 0 0.35rem' }}>
                    {step.title}
                  </h3>
                  <p className="font-body" style={{ color: 'rgba(243,234,216,0.72)', fontSize: '0.88rem', lineHeight: 1.8, fontWeight: 300, margin: 0 }}>
                    {step.body}
                  </p>
                </div>
                {step.to && (
                  <Link to={step.to} className="font-body" style={ctaStyle}>
                    {step.cta}
                    <ArrowRight size={13} aria-hidden="true" />
                  </Link>
                )}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}