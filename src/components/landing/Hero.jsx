import React from 'react';
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
      {/* Radial depth glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 50% 42% at 50% 44%, rgba(212,161,42,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Faint globe motif */}
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
        <motion.img
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: 'easeOut', delay: 0.2 }}
          src={LOGO_URL}
          alt="Tamu Academy — Sweet Learning for a Better World"
          style={{
            display: 'block',
            width: 'auto',
            height: 'clamp(150px, 26vh, 240px)',
            maxWidth: '85vw',
            objectFit: 'contain',
            mixBlendMode: 'screen',
            marginBottom: '-2vh',
          }}
        />

        <motion.div
          initial={{ opacity: 0, scaleX: 0.4 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.8 }}
          aria-hidden="true"
          style={{
            width: '90px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, #D4A12A 35%, #E2B652 50%, #D4A12A 65%, transparent)',
            margin: '0 auto 2rem',
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 1 }}
          className="font-body"
          style={{
            color: '#F5EFE0',
            fontSize: 'clamp(1rem, 1.6vw, 1.25rem)',
            lineHeight: 1.7,
            fontWeight: 300,
            maxWidth: '560px',
            margin: '0 auto',
            opacity: 0.88,
          }}
        >
          An AfroCentric public policy education platform for the next generation of{' '}
          <span style={{ color: '#E2B652' }}>global civic leaders</span>.
        </motion.p>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          style={{
            marginTop: '2.75rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            color: '#D4A12A',
            fontSize: '0.72rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            fontWeight: 500,
          }}
        >
          Explore
          <span style={{ display: 'inline-block', animation: 'tamuBob 2s ease-in-out infinite' }}>↓</span>
        </motion.a>
      </div>
    </section>
  );
}