import React from 'react';
import GuideSectionCard from './GuideSectionCard';
import { getGuideSection } from '@/lib/guide/sections';

/**
 * GuidePhaseSection — one phase of the guide pathway: its heading, its short
 * introduction, and the section cards that belong to it. Mirrors a learning
 * area block on the Courses page.
 */
export default function GuidePhaseSection({ phase, progressMap = {}, isFirst = false }) {
  const sections = phase.sectionIds.map(getGuideSection).filter(Boolean);

  return (
    <div
      id={phase.id}
      style={{
        paddingTop: isFirst ? 0 : 'clamp(2.5rem, 5vw, 3.5rem)',
        marginTop: isFirst ? 0 : 'clamp(2.5rem, 5vw, 3.5rem)',
        borderTop: isFirst ? 'none' : '1px solid #ddcbab',
        scrollMarginTop: '90px',
      }}
    >
      <div style={{ marginBottom: '2rem', maxWidth: '720px' }}>
        <span className="font-guide-body" style={{ color: '#8A650B', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700 }}>
          Phase {phase.number} · {phase.eyebrow}
        </span>
        <h3 className="font-guide-heading" style={{ color: '#33241A', fontSize: 'clamp(1.6rem,3vw,2.3rem)', lineHeight: 1.15, fontWeight: 600, margin: '10px 0 0.7rem' }}>
          {phase.title}
        </h3>
        <p className="font-guide-body" style={{ color: '#6b5744', fontSize: '0.94rem', lineHeight: 1.75, margin: 0 }}>
          {phase.intro}
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '20px' }}>
        {sections.map((section, index) => (
          <GuideSectionCard key={section.id} section={section} status={progressMap[section.id] || 'not_started'} index={index} />
        ))}
      </div>
    </div>
  );
}