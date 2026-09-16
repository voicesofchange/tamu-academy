import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, UserPlus, BookOpen, Award } from 'lucide-react';

const STEPS = [
  {
    icon: Compass,
    label: 'Explore',
    desc: 'Browse courses, watch free videos, and read articles — no account needed to start.',
  },
  {
    icon: UserPlus,
    label: 'Enroll',
    desc: 'Create a free account and enroll in a course to save your progress and earn a certificate.',
  },
  {
    icon: BookOpen,
    label: 'Learn',
    desc: 'Move through modules at your own pace — video lessons, case studies, reflections, and knowledge checks.',
  },
  {
    icon: Award,
    label: 'Earn',
    desc: 'Complete all modules to receive a certificate and join the community of Tamu Academy learners.',
  },
];

export default function HowTamuWorks() {
  return (
    <section
      id="how-tamu-works"
      style={{
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 6vw, 6rem)',
        scrollMarginTop: '90px',
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
            How It Works
          </p>
          <h2 className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 400, lineHeight: 1.2, margin: 0, maxWidth: '640px' }}>
            Four steps from curious to certified.
          </h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.1 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <span
                    aria-hidden="true"
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      border: '1px solid rgba(232,184,91,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      backgroundColor: 'rgba(232,184,91,0.04)',
                    }}
                  >
                    <Icon size={18} style={{ color: '#e8b85b' }} strokeWidth={1.5} />
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className="font-body" style={{ color: 'rgba(232,184,91,0.5)', fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, lineHeight: 1 }}>
                      Step {i + 1}
                    </span>
                    <h3 className="font-heading" style={{ color: '#f8f0df', fontSize: '1.2rem', fontWeight: 500, margin: 0, lineHeight: 1.2 }}>
                      {step.label}
                    </h3>
                  </div>
                </div>
                <p className="font-body" style={{ color: 'rgba(243,234,216,0.68)', fontSize: '0.88rem', lineHeight: 1.75, fontWeight: 300, margin: 0, paddingLeft: '3.65rem' }}>
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ marginTop: '2.5rem', paddingLeft: '0' }}
        >
          <Link
            to="/courses"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              color: '#24150f',
              backgroundColor: '#e8b85b',
              fontSize: '0.72rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              fontWeight: 500,
              border: '1px solid #e8b85b',
              borderRadius: '2px',
              padding: '0.7rem 1.5rem',
            }}
          >
            Start at Step 1 →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}