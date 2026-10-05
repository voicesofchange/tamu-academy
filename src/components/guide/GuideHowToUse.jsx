import React from 'react';
import { HOW_TO_USE } from '@/lib/guide/sections';
import { creamText, darkText } from '@/lib/guide/styles';

/** The four ways to use the guide, as numbered tiles. */
export default function GuideHowToUse() {
  return (
    <section style={{ marginBottom: 'clamp(2rem, 5vw, 3rem)' }}>
      <span className="font-guide-body" style={{ ...darkText.eyebrow, display: 'block', marginBottom: '0.5rem' }}>
        How to use this guide
      </span>
      <h2 className="font-guide-heading" style={{ ...darkText.heading, fontSize: 'clamp(1.35rem, 3vw, 1.85rem)', lineHeight: 1.25, margin: '0 0 1.25rem' }}>
        There is no wrong order
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1rem' }}>
        {HOW_TO_USE.map((item, index) => (
          <div key={item} className="guide-card" style={{ padding: '1.2rem 1.3rem' }}>
            <span aria-hidden className="font-guide-heading" style={{ ...creamText.heading, fontSize: '1.3rem', color: '#8A650B', display: 'block', marginBottom: '0.5rem' }}>
              {index + 1}
            </span>
            <p className="font-guide-body" style={{ ...creamText.body, margin: 0 }}>
              {item}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}