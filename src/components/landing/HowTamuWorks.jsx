import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';

const PILLARS = [
  {
    label: 'Expert Knowledge',
    desc: 'Courses are developed with subject-matter experts, educators, researchers, and knowledge holders.',
  },
  {
    label: 'Tamu Academy Design',
    desc: 'We transform expert knowledge into clear video lessons, written companions, activities, and learning resources.',
  },
  {
    label: 'Flexible Delivery',
    desc: 'Courses are designed for individual learners, facilitated cohorts, universities, organizations, and institutions.',
  },
];

export default function HowTamuWorks() {
  return (
    <section
      id="how-tamu-works"
      style={{
        padding: 'clamp(4rem, 8vw, 6.5rem) clamp(1.5rem, 6vw, 6rem)',
        scrollMarginTop: '90px',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <SectionHeading eyebrow="How It Works" title="How Tamu Academy Works" />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.1 }}
              style={{
                padding: '1.75rem',
                border: '1px solid rgba(212,161,42,0.16)',
                borderRadius: '4px',
                backgroundColor: 'rgba(245,239,224,0.02)',
              }}
            >
              <h3
                className="font-heading"
                style={{ color: '#E2B652', fontSize: '1.15rem', fontWeight: 500, margin: '0 0 0.65rem', lineHeight: 1.25 }}
              >
                {p.label}
              </h3>
              <p
                className="font-body"
                style={{ color: 'rgba(245,239,224,0.7)', fontSize: '0.92rem', lineHeight: 1.8, fontWeight: 300, margin: 0 }}
              >
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}