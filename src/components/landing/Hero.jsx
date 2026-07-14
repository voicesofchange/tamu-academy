import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LOGO_URL = "https://media.base44.com/images/public/user_68796cfeca8e624b09c5f04b/8de477990_TamuAcademyFinalLogo.png";

export default function Hero() {
  return (
    <section
      id="top"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '7rem 1.5rem 5rem',
        overflow: 'hidden',
      }}
    >
      {/* Radial depth glow — preserved */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 50% 42% at 50% 44%, rgba(212,161,42,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Faint globe motif — preserved */}
      <svg
        aria-hidden="true"
        viewBox="0 0 800 400"
        preserveAspectRatio="xMidYMid meet"
        style={{
          position: 'absolute',
          top: '46%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(1000px, 110%)',
          height: 'auto',
          opacity: 0.05,
          pointerEvents: 'none',
        }}
      >
        <ellipse cx="400" cy="200" rx="395" ry="195" fill="none" stroke="#D4A12A" strokeWidth="1.2" />
        <ellipse cx="400" cy="200" rx="395" ry="98" fill="none" stroke="#D4A12A" strokeWidth="0.6" opacity="0.6" />
        <line x1="5" y1="200" x2="795" y2="200" stroke="#D4A12A" strokeWidth="0.6" opacity="0.6" />
        <ellipse cx="400" cy="200" rx="198" ry="195" fill="none" stroke="#D4A12A" strokeWidth="0.5" opacity="0.5" />
        <line x1="400" y1="5" x2="400" y2="395" stroke="#D4A12A" strokeWidth="0.5" opacity="0.4" />
      </svg>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '860px' }}>

        {/* Logo — preserved */}
        <motion.img
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: 'easeOut', delay: 0.2 }}
          src={LOGO_URL}
          alt="Tamu Academy"
          style={{
            display: 'block',
            width: 'auto',
            height: 'clamp(130px, 22vh, 200px)',
            maxWidth: '75vw',
            objectFit: 'contain',
            mixBlendMode: 'screen',
            marginBottom: '-1vh',
          }}
        />

        {/* Gold divider — preserved */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.4 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.8 }}
          aria-hidden="true"
          style={{
            width: '90px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, #D4A12A 35%, #E2B652 50%, #D4A12A 65%, transparent)',
            margin: '0 auto 1.75rem',
          }}
        />

        {/* Brand phrase — "Sweet Learning…" preserved as eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.9 }}
          className="font-body"
          style={{
            color: 'rgba(212,161,42,0.75)',
            fontSize: '0.68rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            fontWeight: 500,
            margin: '0 0 1.25rem',
          }}
        >
          Sweet Learning for a Better World
        </motion.p>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 1.0 }}
          className="font-heading"
          style={{
            color: '#F5EFE0',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            lineHeight: 1.12,
            fontWeight: 400,
            margin: '0 0 1.5rem',
            maxWidth: '720px',
          }}
        >
          African-rooted learning led by knowledge, experience, and community
        </motion.h1>

        {/* Supporting copy */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 1.2 }}
          className="font-body"
          style={{
            color: 'rgba(245,239,224,0.78)',
            fontSize: 'clamp(0.95rem, 1.5vw, 1.12rem)',
            lineHeight: 1.85,
            fontWeight: 300,
            maxWidth: '580px',
            margin: '0 auto 2.5rem',
          }}
        >
          Tamu Academy develops expert-led online courses exploring mental health, economics, artificial intelligence, public policy, culture, history, and the wider world.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginBottom: '2.75rem' }}
        >
          <Link
            to="/courses"
            style={{
              display: 'inline-flex', alignItems: 'center',
              color: '#1A130E',
              backgroundColor: '#D4A12A',
              fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase',
              textDecoration: 'none', fontWeight: 500,
              border: '1px solid #D4A12A',
              borderRadius: '2px', padding: '0.7rem 1.5rem',
            }}
          >
            Explore Courses
          </Link>
          <Link
            to="/videos"
            style={{
              display: 'inline-flex', alignItems: 'center',
              color: '#D4A12A',
              backgroundColor: 'transparent',
              fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase',
              textDecoration: 'none', fontWeight: 500,
              border: '1px solid rgba(212,161,42,0.45)',
              borderRadius: '2px', padding: '0.7rem 1.5rem',
            }}
          >
            Start with Open Learning
          </Link>
        </motion.div>

        {/* Scroll nudge */}
        <motion.a
          href="#purpose"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            color: 'rgba(212,161,42,0.6)',
            fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase',
            textDecoration: 'none', fontWeight: 500,
          }}
          aria-label="Scroll down to explore"
        >
          Explore
          <span aria-hidden="true" style={{ display: 'inline-block', animation: 'tamuBob 2s ease-in-out infinite' }}>↓</span>
        </motion.a>
      </div>
    </section>
  );
}