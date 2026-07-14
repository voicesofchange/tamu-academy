import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { ArrowRight } from 'lucide-react';

const AREAS = [
  {
    n: '01',
    title: 'Mind and Wellbeing',
    desc: 'Explore mental health, identity, community, culture, and the social conditions that shape wellbeing.',
    anchor: 'mind-and-wellbeing',
  },
  {
    n: '02',
    title: 'Economics and Development',
    desc: 'Understand economic systems, development, inequality, trade, debt, institutions, and Africa\'s place in the global economy.',
    anchor: 'economics-and-development',
  },
  {
    n: '03',
    title: 'AI, Technology and Digital Futures',
    desc: 'Build practical AI literacy while examining ethics, digital citizenship, governance, work, bias, and technological change.',
    anchor: 'ai-technology-and-digital-futures',
  },
  {
    n: '04',
    title: 'Public Policy and Governance',
    desc: 'Learn how policies are developed, implemented, evaluated, and used to address public problems.',
    anchor: 'public-policy-and-governance',
  },
  {
    n: '05',
    title: 'Waiyaki wa Hinga Heritage and Leadership Collection',
    desc: 'Explore the history, leadership, resistance, memory, and continuing significance of Waiyaki wa Hinga through research, oral history, and African-centered interpretation.',
    anchor: 'waiyaki-wa-hinga',
  },
];

export default function CourseTracks() {
  return (
    <section
      id="learning-areas"
      style={{
        position: 'relative',
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 6vw, 6rem)',
        maxWidth: '1100px',
        margin: '0 auto',
        scrollMarginTop: '90px',
      }}
    >
      <SectionHeading eyebrow="Learning Areas" title="Explore Our Learning Areas" />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: '1.1rem',
          marginBottom: '2.5rem',
        }}
      >
        {AREAS.map((area, i) => (
          <motion.article
            key={area.n}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.07 }}
            className="tamu-card"
            style={{
              position: 'relative',
              padding: '1.75rem 1.75rem',
              borderRadius: '4px',
              border: '1px solid rgba(212,161,42,0.16)',
              backgroundColor: 'rgba(245,239,224,0.02)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span
              className="font-heading"
              style={{ display: 'block', color: '#D4A12A', fontSize: '1.6rem', fontWeight: 400, opacity: 0.45, marginBottom: '0.85rem', lineHeight: 1 }}
            >
              {area.n}
            </span>
            <h3
              className="font-heading"
              style={{ color: '#F5EFE0', fontSize: '1.2rem', fontWeight: 500, margin: '0 0 0.75rem', lineHeight: 1.25 }}
            >
              {area.title}
            </h3>
            <p
              className="font-body"
              style={{ color: 'rgba(245,239,224,0.68)', fontSize: '0.9rem', lineHeight: 1.75, fontWeight: 300, margin: '0 0 1.25rem', flexGrow: 1 }}
            >
              {area.desc}
            </p>
            <Link
              to={`/courses#${area.anchor}`}
              className="font-body"
              style={{ color: 'rgba(212,161,42,0.7)', fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            >
              View Courses <ArrowRight size={12} />
            </Link>
          </motion.article>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5 }}
      >
        <Link
          to="/courses"
          style={{
            display: 'inline-flex', alignItems: 'center',
            color: '#D4A12A',
            backgroundColor: 'transparent',
            fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase',
            textDecoration: 'none', fontWeight: 500,
            border: '1px solid rgba(212,161,42,0.4)',
            borderRadius: '2px', padding: '0.65rem 1.3rem',
          }}
        >
          View All Courses →
        </Link>
      </motion.div>
    </section>
  );
}