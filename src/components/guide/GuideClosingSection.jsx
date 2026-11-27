import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

// Visible text on this screen, translated with the rest of the page.
const UI_TEXT = {
  whereNext: 'Where next',
  theGuideWalksWithThe: 'The guide walks with the courses',
  safariYaUtuIsA: 'Safari ya Utu is a companion you can use alongside any Tamu Academy course, or on its own — before you begin, while you study, or long after.',
  goToMyCourses: 'Go to my courses →',
  furtherReadingAndCredits: 'Further reading and credits',
  guideInsightsAdmin: 'Guide insights (admin)',
};

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
  const { content: uiText } = useTranslatedContent('ui-components-guide-guideclosingsection', UI_TEXT);
  return (
    <section style={{ padding: '80px clamp(1.5rem,6vw,88px)', background: '#24150f', textAlign: 'center' }}>
      <span className="font-guide-body" style={{ display: 'block', marginBottom: '1rem', color: '#C9961A', fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
        {uiText.whereNext}
      </span>
      <h2 className="font-guide-heading" style={{ fontSize: 'clamp(2rem,4vw,47px)', fontWeight: 600, lineHeight: 1.1, margin: '0 0 18px', color: '#f8f0df' }}>
        {uiText.theGuideWalksWithThe}
      </h2>
      <p className="font-guide-body" style={{ maxWidth: '600px', margin: '0 auto 28px', color: '#cdbda7', fontSize: '15px', lineHeight: 1.75 }}>
        {uiText.safariYaUtuIsA}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center' }}>
        <Link to="/my-courses" className="tamu-journey-primary font-guide-body" style={ctaStyle}>
          {uiText.goToMyCourses}
        </Link>
        <Link to="/learners-guide/credits" className="tamu-journey-secondary font-guide-body" style={ctaStyle}>
          {uiText.furtherReadingAndCredits}
        </Link>
      </div>
      {isAdmin && (
        <p className="font-guide-body" style={{ marginTop: '26px', marginBottom: 0 }}>
          <Link to="/learners-guide/insights" style={{ color: '#C9961A', fontSize: '11px', letterSpacing: '0.13em', textTransform: 'uppercase', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            {uiText.guideInsightsAdmin}
          </Link>
        </p>
      )}
    </section>
  );
}