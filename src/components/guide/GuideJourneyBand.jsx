import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { GUIDE_PRIVACY_NOTE, HOW_TO_USE } from '@/lib/guide/sections';
import { Link } from 'react-router-dom';
import { GUIDE_PRINT_PATH } from '@/lib/guide/guide-pdf';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';
import { fillTemplate } from '@/lib/i18n/fill-template';

// Visible text on this screen, translated with the rest of the page.
const UI_TEXT = {
  yourJourney: 'Your journey',
  howToWalkTheGuide: 'How to walk the guide',
  nothingHereIsGradedAnd: 'Nothing here is graded and no other learner sees your answers. Move at your own pace, in whatever order suits your life.',
  waysToUseIt: 'Ways to use it',
  yourProgress: 'Your progress',
  yourFirstPageIsWaiting: 'Your first page is waiting',
  everythingYouWriteIsSaved: 'Everything you write is saved to your own account as you go. Pick up any section where you left it, or begin a new one.',
  startWithKaribuOrOpen: 'Start with Karibu, or open any section that speaks to where you are today. Your answers save themselves as you write.',
  downloadThePrintablePdf: 'Download the printable PDF',
  sectionsStarted: 'Sections started',
  sectionsCompleted: 'Sections completed',
  sectionsInTheGuide: 'Sections in the guide',
  ofSectionsStarted: '{v0} of {v1} sections started',
};

const eyebrow = { color: '#e8b85b', fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' };

/**
 * GuideJourneyBand — the dark band that shows how to walk the guide and where
 * the learner has got to so far. Shaped like the Course Design block on the
 * Courses page: a list alongside one card that carries the numbers.
 */
export default function GuideJourneyBand({ started = 0, done = 0, total = 0 }) {
  const { content: uiText } = useTranslatedContent('ui-components-guide-guidejourneyband', UI_TEXT);
  const stats = [
    { value: String(started).padStart(2, '0'), label: uiText.sectionsStarted },
    { value: String(done).padStart(2, '0'), label: uiText.sectionsCompleted },
    { value: String(total).padStart(2, '0'), label: uiText.sectionsInTheGuide },
  ];

  return (
    <section id="journey" style={{ padding: '76px clamp(1.5rem,6vw,88px)', background: '#302018', color: '#f3ead8', scrollMarginTop: '90px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: '35px', marginBottom: '37px', flexWrap: 'wrap' }}>
        <div>
          <span className="font-guide-body" style={eyebrow}>{uiText.yourJourney}</span>
          <h2 className="font-guide-heading" style={{ fontSize: 'clamp(1.8rem,3.5vw,43px)', lineHeight: 1.1, fontWeight: 600, margin: '10px 0 0', color: '#f3ead8' }}>
            {uiText.howToWalkTheGuide}
          </h2>
        </div>
        <p className="font-guide-body" style={{ maxWidth: '480px', color: '#cdbda7', fontSize: '15px', lineHeight: 1.75, margin: 0 }}>
          {uiText.nothingHereIsGradedAnd}
        </p>
      </div>

      <div className="tamu-lesson-layout" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,300px) 1fr', gap: '42px', alignItems: 'start' }}>
        <aside style={{ border: '1px solid rgba(232,184,91,0.3)', background: 'rgba(255,255,255,0.045)', padding: '22px', borderRadius: '4px' }}>
          <h3 className="font-guide-heading" style={{ fontWeight: 600, fontSize: '23px', margin: '0 0 21px', color: '#f3ead8' }}>
            {uiText.waysToUseIt}
          </h3>
          {HOW_TO_USE.map((item, index) => (
            <div
              key={item}
              className="font-guide-body"
              style={{
                display: 'flex',
                gap: '12px',
                padding: '15px 0',
                borderTop: index === 0 ? '2px solid #d99b37' : '1px solid rgba(243,234,216,0.13)',
                fontSize: '13px',
                lineHeight: 1.5,
                color: '#f8f0df',
              }}
            >
              <span aria-hidden style={{ width: '18px', height: '18px', border: '1px solid #d99b37', borderRadius: '50%', flex: 'none', marginTop: '1px', position: 'relative', background: '#d99b37' }}>
                <span style={{ position: 'absolute', width: '7px', height: '3px', borderLeft: '2px solid #302018', borderBottom: '2px solid #302018', transform: 'rotate(-45deg)', left: '5px', top: '5px' }} />
              </span>
              <span>{item}</span>
            </div>
          ))}
        </aside>

        <motion.article
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'relative', padding: '36px 42px', border: '1px solid rgba(232,184,91,0.22)', borderRadius: '5px', overflow: 'hidden', background: '#3a261c' }}
        >
          <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 84% 12%, rgba(201,150,26,0.20) 0%, transparent 60%)' }} />
          <div style={{ position: 'relative' }}>
            <span className="font-guide-body" style={eyebrow}>{uiText.yourProgress}</span>
            <h3 className="font-guide-heading" style={{ fontSize: 'clamp(1.6rem,3vw,38px)', fontWeight: 600, lineHeight: 1.15, margin: '15px 0 14px', color: '#f8f0df' }}>
              {started > 0 ? fillTemplate(uiText.ofSectionsStarted, { v0: started, v1: total }) : uiText.yourFirstPageIsWaiting}
            </h3>
            <p className="font-guide-body" style={{ maxWidth: '620px', fontSize: '15px', lineHeight: 1.8, color: '#d9cbb8', margin: '0 0 28px' }}>
              {started > 0
                ? uiText.everythingYouWriteIsSaved
                : uiText.startWithKaribuOrOpen}
            </p>

            <div style={{ display: 'flex', gap: '44px', flexWrap: 'wrap', marginBottom: '30px' }}>
              {stats.map((stat) => (
                <div key={stat.label}>
                  <strong className="font-guide-heading" style={{ display: 'block', fontSize: '34px', fontWeight: 600, color: '#e8b85b', lineHeight: 1 }}>
                    {stat.value}
                  </strong>
                  <span className="font-guide-body" style={{ display: 'block', marginTop: '9px', color: '#c6b59e', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid rgba(243,234,216,0.18)', paddingTop: '22px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px' }}>
              <Link
                to={GUIDE_PRINT_PATH}
                className="tamu-journey-primary font-guide-body"
                style={{ padding: '13px 20px', borderRadius: '3px', textDecoration: 'none', fontSize: '11.5px', letterSpacing: '0.13em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <Download size={14} strokeWidth={1.8} />
                {uiText.downloadThePrintablePdf}
              </Link>
              <p className="font-guide-body" style={{ color: '#c6b59e', fontSize: '12.5px', lineHeight: 1.7, margin: 0, maxWidth: '420px' }}>
                {GUIDE_PRIVACY_NOTE}
              </p>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}