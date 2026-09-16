import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Users, Building2, Heart } from 'lucide-react';

const ROLES = [
  {
    icon: GraduationCap,
    label: 'A Learner',
    desc: 'Explore free videos and articles, then enroll in expert-led courses with certificates.',
    cta: 'Explore Courses',
    to: '/courses',
  },
  {
    icon: Users,
    label: 'An Educator',
    desc: 'Bring Tamu Academy courses to your classroom, cohort, or community programme.',
    cta: 'Discuss a Partnership',
    to: '/contact?inquiry=Educator or Facilitator',
  },
  {
    icon: Building2,
    label: 'An Institution',
    desc: 'Partner with us to offer culturally grounded learning to your students or members.',
    cta: 'Institutional Inquiry',
    to: '/contact?inquiry=University or Institutional Partnership',
  },
  {
    icon: Heart,
    label: 'A Supporter',
    desc: 'Help us keep learning accessible and expand new courses and learning areas.',
    cta: 'Get in Touch',
    to: '/contact?inquiry=Funder or Supporter',
  },
];

export default function HomeRoleEntry() {
  return (
    <section
      id="begin"
      style={{
        padding: 'clamp(4rem, 8vw, 6.5rem) clamp(1.5rem, 6vw, 6rem)',
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
        style={{ marginBottom: '2.5rem' }}
      >
        <p className="font-body" style={{ color: '#e8b85b', fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 500, marginBottom: '0.85rem' }}>
          Begin Here
        </p>
        <h2 className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 400, lineHeight: 1.2, margin: 0, maxWidth: '640px' }}>
          Wherever you are coming from, there is a path in.
        </h2>
      </motion.div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.1rem',
        }}
      >
        {ROLES.map((role, i) => {
          const Icon = role.icon;
          return (
            <motion.div
              key={role.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.08 }}
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
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: '1px solid rgba(232,184,91,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.1rem',
                }}
              >
                <Icon size={18} style={{ color: '#e8b85b' }} strokeWidth={1.5} />
              </div>
              <h3 className="font-heading" style={{ color: '#f8f0df', fontSize: '1.15rem', fontWeight: 500, margin: '0 0 0.6rem', lineHeight: 1.25 }}>
                {role.label}
              </h3>
              <p className="font-body" style={{ color: 'rgba(243,234,216,0.68)', fontSize: '0.88rem', lineHeight: 1.75, fontWeight: 300, margin: '0 0 1.25rem', flexGrow: 1 }}>
                {role.desc}
              </p>
              <Link
                to={role.to}
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
                {role.cta} →
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}