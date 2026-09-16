import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlayCircle, FileText, BookOpen } from 'lucide-react';

const RESOURCES = [
  {
    icon: PlayCircle,
    label: 'Watch',
    title: "Tamu Academy's First Lessons",
    desc: 'Free introductory videos exploring wellbeing, institutions, policy, economics, and global systems.',
    cta: 'Watch Videos',
    to: '/videos',
  },
  {
    icon: FileText,
    label: 'Read',
    title: 'Explore Ideas Beyond the Episode',
    desc: 'Articles that go deeper on mental health, African economics, global policy, and social change.',
    cta: 'Read Articles',
    to: '/articles',
  },
  {
    icon: BookOpen,
    label: 'Study',
    title: 'Open Learning Resources',
    desc: 'Guides, worksheets, and reflective tools to support your learning journey.',
    cta: 'View Resources',
    to: '/resources',
  },
];

export default function HomeGoDeeper() {
  return (
    <section
      id="go-deeper"
      style={{
        backgroundColor: 'rgba(243,234,216,0.015)',
        borderTop: '1px solid rgba(232,184,91,0.08)',
        borderBottom: '1px solid rgba(232,184,91,0.08)',
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 6vw, 6rem)',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{ marginBottom: '2.75rem' }}
        >
          <p className="font-body" style={{ color: '#e8b85b', fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 500, marginBottom: '0.85rem' }}>
            Go Deeper
          </p>
          <h2 className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 400, lineHeight: 1.2, margin: 0, maxWidth: '640px' }}>
            Start learning right now — no account needed.
          </h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.1rem',
          }}
        >
          {RESOURCES.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.1 }}
                className="tamu-card"
                style={{
                  padding: '1.75rem',
                  borderRadius: '4px',
                  border: '1px solid rgba(232,184,91,0.16)',
                  backgroundColor: 'rgba(243,234,216,0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <Icon size={22} style={{ color: '#e8b85b' }} strokeWidth={1.5} />
                  <span className="font-body" style={{ color: '#e8b85b', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500 }}>
                    {item.label}
                  </span>
                </div>
                <h3 className="font-heading" style={{ color: '#f8f0df', fontSize: '1.15rem', fontWeight: 500, margin: '0 0 0.65rem', lineHeight: 1.25 }}>
                  {item.title}
                </h3>
                <p className="font-body" style={{ color: 'rgba(243,234,216,0.68)', fontSize: '0.88rem', lineHeight: 1.75, fontWeight: 300, margin: '0 0 1.25rem', flexGrow: 1 }}>
                  {item.desc}
                </p>
                <Link
                  to={item.to}
                  className="font-body"
                  style={{
                    color: '#e8b85b',
                    fontSize: '0.68rem',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    fontWeight: 500,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  {item.cta} →
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}