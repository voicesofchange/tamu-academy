import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';

const MODEL_STEPS = [
  { label: 'Learn', desc: 'Engage with ideas, evidence, and perspectives from multiple disciplines and cultural contexts.' },
  { label: 'Discuss', desc: 'Examine issues through guided dialogue with peers from different backgrounds.' },
  { label: 'Question', desc: 'Develop the habit of asking whose interests a decision serves, what evidence supports it, and what is missing.' },
  { label: 'Collaborate', desc: 'Work across differences to develop shared understanding and practical responses.' },
  { label: 'Apply', desc: 'Connect learning to real community challenges through projects and presentations.' },
  { label: 'Reflect', desc: 'Examine what was learned, what changed, and what questions remain.' },
];

const METHODS = [
  'Facilitated dialogue',
  'Interactive workshops',
  'Case studies',
  'Cross-cultural exchange',
  'Research and reflection',
  'Storytelling',
  'Team projects',
  'Community application',
];

export default function Approach() {
  return (
    <section
      id="approach"
      style={{
        position: 'relative',
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 6vw, 6rem)',
        scrollMarginTop: '90px',
        backgroundColor: 'rgba(245,239,224,0.015)',
        borderTop: '1px solid rgba(212,161,42,0.08)',
        borderBottom: '1px solid rgba(212,161,42,0.08)',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <SectionHeading eyebrow="Learning Model" title="How Learning Happens at Tamu Academy" />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.25rem',
            marginBottom: '3rem',
          }}
        >
          {MODEL_STEPS.map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.08 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <span
                  aria-hidden="true"
                  style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid rgba(212,161,42,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                >
                  <span className="font-body" style={{ color: '#D4A12A', fontSize: '0.65rem', fontWeight: 500 }}>{i + 1}</span>
                </span>
                <h3 className="font-heading" style={{ color: '#F5EFE0', fontSize: '1.2rem', fontWeight: 400, margin: 0 }}>{step.label}</h3>
              </div>
              <p className="font-body" style={{ color: 'rgba(245,239,224,0.68)', fontSize: '0.88rem', lineHeight: 1.75, fontWeight: 300, margin: 0, paddingLeft: '2.65rem' }}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="font-body" style={{ color: '#D4A12A', fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, marginBottom: '0.85rem' }}>
            Methods
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem' }}>
            {METHODS.map((m) => (
              <span key={m} className="font-body" style={{ color: 'rgba(245,239,224,0.68)', fontSize: '0.83rem', border: '1px solid rgba(212,161,42,0.18)', borderRadius: '2px', padding: '0.3rem 0.8rem', fontWeight: 300 }}>{m}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}