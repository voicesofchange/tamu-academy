import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { GUIDE_PRIVACY_NOTE, GUIDE_PROVERB, GUIDE_SUBTITLE, GUIDE_TITLE } from '@/lib/guide/sections';
import { GUIDE_PDF_URL } from '@/lib/guide/guide-pdf';
import { creamText, darkText } from '@/lib/guide/styles';

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: 'easeOut', delay },
});

const ctaStyle = {
  padding: '14px 21px',
  borderRadius: '3px',
  textDecoration: 'none',
  fontSize: '12px',
  letterSpacing: '0.13em',
  textTransform: 'uppercase',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
};

/**
 * GuideHomeHero — the opening of the Learner's Guide, written in the same
 * register as the Courses page hero: eyebrow, promise, the guide's proverb,
 * and a clear way in.
 */
export default function GuideHomeHero({ started = 0, total = 0 }) {
  const progress = total > 0 ? Math.max(Math.round((started / total) * 100), 2) : 2;

  return (
    <section style={{ position: 'relative', padding: '130px clamp(1.5rem,6vw,88px) 82px', background: '#24150f', overflow: 'hidden' }}>
      <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 76% 20%, rgba(201,150,26,0.22) 0%, transparent 58%)' }} />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'repeating-linear-gradient(135deg, transparent 0, transparent 26px, rgba(232,184,91,0.045) 26px, rgba(232,184,91,0.045) 27px)',
        }}
      />
      <motion.div {...rise(0.15)} style={{ position: 'relative', zIndex: 1, maxWidth: '700px' }}>
        <span className="font-guide-body" style={{ display: 'block', color: '#C9961A', fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          Well-being pathway · Learner's Guide
        </span>
        <h1 className="font-guide-heading" style={{ color: '#FBF5E8', fontWeight: 600, fontSize: 'clamp(2.4rem,5.2vw,68px)', lineHeight: 1.04, letterSpacing: '-0.02em', margin: '18px 0 22px' }}>
          {GUIDE_TITLE}
        </h1>
        <p className="font-guide-body" style={{ ...darkText.body, fontSize: 'clamp(1rem,1.5vw,18px)', lineHeight: 1.7, maxWidth: '640px', margin: 0 }}>
          {GUIDE_SUBTITLE}
        </p>

        <blockquote style={{ margin: '26px 0 0', paddingLeft: '18px', borderLeft: '2px solid rgba(201,150,26,0.55)' }}>
          <p className="font-guide-heading" style={{ ...creamText.heading, color: '#e8d6ac', fontStyle: 'italic', fontSize: '1.2rem', margin: 0 }}>
            {GUIDE_PROVERB.sw}
          </p>
          <p className="font-guide-body" style={{ color: '#c6b59e', fontSize: '0.82rem', margin: '0.35rem 0 0' }}>
            {GUIDE_PROVERB.en} · {GUIDE_PROVERB.language}
          </p>
        </blockquote>

        <div style={{ display: 'flex', gap: '14px', marginTop: '32px', flexWrap: 'wrap' }}>
          <Link to="/learners-guide/karibu" className="tamu-journey-primary font-guide-body" style={ctaStyle}>
            Begin with Karibu →
          </Link>
          {GUIDE_PDF_URL ? (
            <a href={GUIDE_PDF_URL} target="_blank" rel="noreferrer" className="tamu-journey-secondary font-guide-body" style={ctaStyle}>
              <Download size={14} strokeWidth={1.8} />
              Printable PDF
            </a>
          ) : (
            <span
              className="font-guide-body"
              style={{ ...ctaStyle, color: 'rgba(251,245,232,0.6)', border: '1px solid rgba(201,150,26,0.3)' }}
            >
              Printable PDF — link to be added
            </span>
          )}
        </div>

        <p className="font-guide-body" style={{ ...darkText.body, fontSize: '0.86rem', marginTop: '24px', maxWidth: '40rem' }}>
          {GUIDE_PRIVACY_NOTE}
        </p>
      </motion.div>

      <motion.div
        {...rise(0.5)}
        className="font-guide-body"
        style={{ position: 'relative', zIndex: 1, marginTop: '52px', display: 'flex', alignItems: 'center', gap: '13px', color: '#c6b59e', fontSize: '12px', flexWrap: 'wrap' }}
      >
        <span>01</span>
        <div
          aria-hidden
          style={{
            height: '2px',
            width: 'min(245px, 40vw)',
            background: `linear-gradient(90deg, #d99b37 0 ${progress}%, rgba(243,234,216,0.2) ${progress}%)`,
            boxShadow: '0 0 10px rgba(217,155,55,0.28)',
          }}
        />
        <span>
          {started > 0 ? `${started} of ${total} sections started` : `Guide pathway · ${total} sections`}
        </span>
      </motion.div>
    </section>
  );
}