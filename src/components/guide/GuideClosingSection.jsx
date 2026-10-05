import React from 'react';
import { Link } from 'react-router-dom';

const ctaStyle = {
  padding: '14px 21px',
  borderRadius: '3px',
  textDecoration: 'none',
  fontSize: '12px',
  letterSpacing: '0.13em',
  textTransform: 'uppercase',
  display: 'inline-flex',
  alignItems: 'center',
};

/** The closing band of the guide home: where to go next. */
export default function GuideClosingSection({ isAdmin = false }) {
  return (
    <section style={{ padding: '80px clamp(1.5rem,6vw,88px)', background: '#24150f', textAlign: 'center' }}>
      <span className="font-guide-body" style={{ display: 'block', marginBottom: '1rem', color: '#C9961A', fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
        Where next
      </span>
      <h2 className="font-guide-heading" style={{ fontSize: 'clamp(2rem,4vw,47px)', fontWeight: 600, lineHeight: 1.1, margin: '0 0 18px', color: '#f8f0df' }}>
        The guide walks with the courses
      </h2>
      <p className="font-guide-body" style={{ maxWidth: '600px', margin: '0 auto 28px', color: '#cdbda7', fontSize: '15px', lineHeight: 1.75 }}>
        Safari ya Utu is a companion you can use alongside any Tamu Academy course, or on its own — before you begin, while you study, or long after.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center' }}>
        <Link to="/my-courses" className="tamu-journey-primary font-guide-body" style={ctaStyle}>
          Go to my courses →
        </Link>
        <Link to="/learners-guide/credits" className="tamu-journey-secondary font-guide-body" style={ctaStyle}>
          Further reading and credits
        </Link>
      </div>
      {isAdmin && (
        <p className="font-guide-body" style={{ marginTop: '26px', marginBottom: 0 }}>
          <Link to="/learners-guide/insights" style={{ color: '#C9961A', fontSize: '11px', letterSpacing: '0.13em', textTransform: 'uppercase', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            Guide insights (admin)
          </Link>
        </p>
      )}
    </section>
  );
}