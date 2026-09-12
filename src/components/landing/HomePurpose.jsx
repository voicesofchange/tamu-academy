import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

const CONTENT = {
  purposeEyebrow: 'Why Tamu Academy Exists',
  purposeHeading: 'Serious Learning Should Be More Accessible.',
  purposeBody: 'Important conversations about artificial intelligence, public policy, economics, climate change, culture, communication, and global affairs are often concentrated within universities, professional institutions, and exclusive networks. Tamu Academy is being developed to make thoughtful interdisciplinary learning more accessible to young people and emerging leaders from different backgrounds.',
  purposeLink: 'Read Why Tamu Academy Exists',
  interEyebrow: 'Interdisciplinary Learning',
  interHeading: 'The Questions Shaping Our Future Do Not Belong to One Subject.',
  connections: [
    { subject: 'Technology', effect: 'affects culture and human relationships.' },
    { subject: 'Economics', effect: 'affects opportunity.' },
    { subject: 'Public policy', effect: 'affects daily life.' },
    { subject: 'Climate change', effect: 'affects health, food, migration, and livelihoods.' },
    { subject: 'Communication', effect: 'affects whether differences produce cooperation or division.' },
  ],
  interClosing: 'Tamu Academy helps learners examine these connections rather than treating each issue in isolation.',
};

export default function HomePurpose() {
  const { content: c } = useTranslatedContent('home-purpose', CONTENT);

  return (
    <>
      {/* PURPOSE */}
      <section
        id="purpose"
        style={{
          padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 6vw, 6rem)',
          maxWidth: '1100px',
          margin: '0 auto',
          scrollMarginTop: '90px',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="font-body" style={{ color: '#e8b85b', fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 500, marginBottom: '1rem' }}>
            {c.purposeEyebrow}
          </p>
          <h2 className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 400, lineHeight: 1.2, margin: '0 0 1.5rem', maxWidth: '700px' }}>
            {c.purposeHeading}
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          className="font-body"
          style={{ color: 'rgba(243,234,216,0.78)', fontSize: 'clamp(1rem, 1.5vw, 1.15rem)', lineHeight: 1.85, fontWeight: 300, maxWidth: '700px', marginBottom: '2rem' }}
        >
          {c.purposeBody}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link
            to="/about"
            className="font-body"
            style={{ color: '#e8b85b', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500 }}
          >
            {c.purposeLink} →
          </Link>
        </motion.div>
      </section>

      {/* WHY INTERDISCIPLINARY */}
      <section
        style={{
          backgroundColor: 'rgba(243,234,216,0.015)',
          borderTop: '1px solid rgba(232,184,91,0.08)',
          borderBottom: '1px solid rgba(232,184,91,0.08)',
          padding: 'clamp(4.5rem, 9vw, 7rem) clamp(1.5rem, 6vw, 6rem)',
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <p className="font-body" style={{ color: '#e8b85b', fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 500, marginBottom: '1rem' }}>
              {c.interEyebrow}
            </p>
            <h2 className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 400, lineHeight: 1.2, margin: '0 0 2.5rem', maxWidth: '700px' }}>
              {c.interHeading}
            </h2>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem', maxWidth: '680px' }}>
            {c.connections.map(({ subject, effect }, i) => (
              <motion.div
                key={subject}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.07 }}
                style={{ display: 'flex', gap: '1rem', alignItems: 'baseline' }}
              >
                <span className="font-heading" style={{ color: '#e8b85b', fontSize: '1.05rem', fontWeight: 400, flexShrink: 0 }}>{subject}</span>
                <span className="font-body" style={{ color: 'rgba(243,234,216,0.68)', fontSize: '0.95rem', lineHeight: 1.6, fontWeight: 300 }}>{effect}</span>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.35 }}
            className="font-body"
            style={{ color: 'rgba(243,234,216,0.72)', fontSize: '0.95rem', lineHeight: 1.8, fontWeight: 300, maxWidth: '600px', fontStyle: 'italic' }}
          >
            {c.interClosing}
          </motion.p>
        </div>
      </section>
    </>
  );
}