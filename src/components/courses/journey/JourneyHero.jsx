import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * JourneyHero — the Courses page's opening band, reused by the learner
 * surfaces so My Courses opens with the same identity the course catalogue
 * does: a deep espresso panel over a muted photograph, a gold eyebrow, the
 * serif headline, the supporting subheading, the two calls to action, and the
 * numbered "learning journey" motif underneath.
 */
const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: 'easeOut', delay },
});

const actionStyle = {
  padding: '14px 21px',
  borderRadius: '3px',
  textDecoration: 'none',
  fontSize: '12px',
  letterSpacing: '0.13em',
  textTransform: 'uppercase',
  display: 'inline-flex',
  alignItems: 'center',
};

export default function JourneyHero({ image, eyebrow, heading, subheading, actions = [], step, stepLabel }) {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '560px',
        padding: '130px clamp(1.5rem,6vw,88px) 78px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden="true"
        data-tamu-decorative="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(90deg, rgba(36,21,15,0.97) 0%, rgba(36,21,15,0.78) 48%, rgba(36,21,15,0.25) 100%), url(${image}) center/cover`,
          opacity: 0.92,
        }}
      />
      <motion.div {...rise(0.2)} style={{ position: 'relative', zIndex: 1, maxWidth: '690px' }}>
        <span
          className="font-body"
          style={{ color: '#e8b85b', fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}
        >
          {eyebrow}
        </span>
        <h1
          className="font-heading"
          style={{
            fontWeight: 400,
            fontSize: 'clamp(2.4rem,5.2vw,64px)',
            lineHeight: 1.02,
            letterSpacing: '-0.035em',
            margin: '18px 0 25px',
            color: '#f8f0df',
          }}
        >
          {heading}
        </h1>
        <p
          className="font-body"
          style={{ fontSize: 'clamp(1rem,1.5vw,18px)', lineHeight: 1.7, color: '#ddcfbb', maxWidth: '640px', margin: 0 }}
        >
          {subheading}
        </p>
        {actions.length > 0 && (
          <div style={{ display: 'flex', gap: '14px', marginTop: '32px', flexWrap: 'wrap' }}>
            {actions.map((action) => {
              const className = `font-body ${action.variant === 'secondary' ? 'tamu-journey-secondary' : 'tamu-journey-primary'}`;
              return action.to ? (
                <Link key={action.label} to={action.to} className={className} style={actionStyle}>
                  {action.label} &rarr;
                </Link>
              ) : (
                <a key={action.label} href={action.href} className={className} style={actionStyle}>
                  {action.label} &rarr;
                </a>
              );
            })}
          </div>
        )}
      </motion.div>
      {step && stepLabel && (
        <motion.div
          {...rise(0.32)}
          className="font-body"
          style={{
            position: 'relative',
            zIndex: 1,
            marginTop: '52px',
            display: 'flex',
            alignItems: 'center',
            gap: '13px',
            color: '#c6b59e',
            fontSize: '12px',
          }}
        >
          <span>{step}</span>
          <div
            aria-hidden="true"
            style={{
              height: '2px',
              width: 'min(245px, 40vw)',
              background: 'linear-gradient(90deg, #d99b37 0 32%, rgba(243,234,216,0.2) 32%)',
              boxShadow: '0 0 10px rgba(217,155,55,0.28)',
            }}
          />
          <span>{stepLabel}</span>
        </motion.div>
      )}
    </section>
  );
}