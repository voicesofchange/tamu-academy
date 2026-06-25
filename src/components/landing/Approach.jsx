import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';

const PILLARS = [
  {
    title: 'Ubuntu at the core',
    desc: '"I am because we are." Policy isn\'t a neutral exercise — it\'s a question of who a decision serves and who it leaves behind.',
  },
  {
    title: 'Traditions that predate colonialism',
    desc: 'We draw on African governance traditions that long predate colonialism — knowledge centered as primary, not supplemental.',
  },
  {
    title: 'A Pan-African lens',
    desc: 'A view that runs from Nairobi to the African Union, placing African scholars, policymakers, and communities at the center of the story.',
  },
];

export default function Approach() {
  return (
    <section
      id="approach"
      style={{
        position: 'relative',
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 6vw, 6rem)',
        scrollMarginTop: '80px',
        backgroundColor: 'rgba(245,239,224,0.015)',
        borderTop: '1px solid rgba(212,161,42,0.08)',
        borderBottom: '1px solid rgba(212,161,42,0.08)',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <SectionHeading eyebrow="Our Approach" title="AfroCentric by design, not as decoration" />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          className="font-body"
          style={{
            color: 'rgba(245,239,224,0.85)',
            fontSize: 'clamp(1.05rem, 1.5vw, 1.25rem)',
            lineHeight: 1.85,
            fontWeight: 300,
            maxWidth: '740px',
            marginBottom: '3.5rem',
          }}
        >
          We center African ways of knowing as primary, not supplemental — grounded in Ubuntu, the
          philosophy that says <span style={{ color: '#E2B652', fontStyle: 'italic' }}>"I am because we are."</span>{' '}
          Policy, in that light, isn't a neutral exercise; it's a question of who a decision serves
          and who it leaves behind.
        </motion.p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2rem',
          }}
        >
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.1 }}
            >
              <div
                aria-hidden="true"
                style={{
                  width: '40px',
                  height: '2px',
                  background: 'linear-gradient(90deg, #D4A12A, #E8951C)',
                  marginBottom: '1.25rem',
                }}
              />
              <h3
                className="font-heading"
                style={{ color: '#F5EFE0', fontSize: '1.35rem', fontWeight: 500, margin: '0 0 0.75rem', lineHeight: 1.25 }}
              >
                {pillar.title}
              </h3>
              <p
                className="font-body"
                style={{ color: 'rgba(245,239,224,0.72)', fontSize: '0.95rem', lineHeight: 1.75, fontWeight: 300, margin: 0 }}
              >
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}