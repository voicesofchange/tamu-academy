import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';

const TRACKS = [
  {
    n: '01',
    title: 'Public Policy Foundations',
    desc: "What policy is, how it's made, and how it shapes daily life — taught through side-by-side cases from local government to the African Union.",
  },
  {
    n: '02',
    title: 'Economics and Public Policy',
    desc: 'The numbers behind the decisions: budgets, trade-offs, and development economics, made plain for people who want to understand why governments choose what they choose.',
  },
  {
    n: '03',
    title: 'Theory vs. Practice',
    desc: 'Why good policies fail. How power, politics, and broken institutions turn intent into outcome — and how to tell the difference.',
  },
  {
    n: '04',
    title: 'Policy Writing and Communication',
    desc: "The genres decision-makers actually use: the memo, the brief, the op-ed. Knowing the answer isn't enough; you have to move people to act.",
  },
];

export default function CourseTracks() {
  return (
    <section
      id="courses"
      style={{
        position: 'relative',
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 6vw, 6rem)',
        maxWidth: '1100px',
        margin: '0 auto',
        scrollMarginTop: '80px',
      }}
    >
      <SectionHeading eyebrow="The Curriculum" title="Four course tracks" />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {TRACKS.map((track, i) => (
          <motion.article
            key={track.n}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.08 }}
            className="tamu-card"
            style={{
              position: 'relative',
              padding: '2.25rem 2rem',
              borderRadius: '4px',
              border: '1px solid rgba(212,161,42,0.16)',
              backgroundColor: 'rgba(245,239,224,0.02)',
              overflow: 'hidden',
            }}
          >
            <span
              className="font-heading"
              style={{
                display: 'block',
                color: '#D4A12A',
                fontSize: '2rem',
                fontWeight: 400,
                opacity: 0.55,
                marginBottom: '1rem',
                lineHeight: 1,
              }}
            >
              {track.n}
            </span>
            <h3
              className="font-heading"
              style={{
                color: '#F5EFE0',
                fontSize: '1.5rem',
                fontWeight: 500,
                margin: '0 0 0.9rem',
                lineHeight: 1.2,
              }}
            >
              {track.title}
            </h3>
            <p
              className="font-body"
              style={{
                color: 'rgba(245,239,224,0.72)',
                fontSize: '0.95rem',
                lineHeight: 1.75,
                fontWeight: 300,
                margin: 0,
              }}
            >
              {track.desc}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}