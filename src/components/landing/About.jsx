import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';

const FACTS = ['Founded 2025', 'Sacramento, CA', 'Youth ages 16–30', 'A Waiyaki House LLC brand'];

export default function About() {
  return (
    <section
      id="about"
      style={{
        position: 'relative',
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 6vw, 6rem)',
        maxWidth: '1100px',
        margin: '0 auto',
        scrollMarginTop: '80px',
      }}
    >
      <SectionHeading eyebrow="About" title="Learning you savor, not endure" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
      >
        <p
          className="font-body"
          style={{
            color: 'rgba(245,239,224,0.85)',
            fontSize: 'clamp(1.05rem, 1.5vw, 1.25rem)',
            lineHeight: 1.85,
            fontWeight: 300,
            maxWidth: '740px',
          }}
        >
          Tamu Academy teaches young people aged 16 to 30 how public policy actually works — from
          city hall to the United Nations. <span style={{ color: '#E2B652', fontStyle: 'italic' }}>"Tamu"</span> means
          sweet in Swahili, and it reflects what we believe: learning should be something you savor,
          not something you endure. We make civic education accessible, practical, and culturally
          rooted, so that the people most affected by policy are equipped to shape it. Students
          don't just study policy here. <span style={{ color: '#F5EFE0', fontWeight: 400 }}>They practice it.</span>
        </p>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '0.75rem 1.5rem',
            marginTop: '3rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(212,161,42,0.14)',
          }}
        >
          {FACTS.map((fact, i) => (
            <React.Fragment key={fact}>
              <span
                className="font-body"
                style={{
                  color: 'rgba(245,239,224,0.7)',
                  fontSize: '0.8rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                }}
              >
                {fact}
              </span>
              {i < FACTS.length - 1 && (
                <span aria-hidden="true" style={{ color: '#D4A12A', opacity: 0.5 }}>·</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </motion.div>
    </section>
  );
}