import React from 'react';
import { creamText, darkText } from '@/lib/guide/styles';

/**
 * FrameworkCards — the section's Tamu framework, shown as numbered tiles
 * rather than paragraphs.
 */
export default function FrameworkCards({ framework }) {
  if (!framework) return null;
  return (
    <section style={{ marginBottom: 'clamp(2rem, 5vw, 3rem)' }}>
      <span className="font-guide-body" style={{ ...darkText.eyebrow, display: 'block', marginBottom: '0.5rem' }}>
        {framework.eyebrow}
      </span>
      <h2 className="font-guide-heading" style={{ ...darkText.heading, fontSize: 'clamp(1.35rem, 3vw, 1.85rem)', lineHeight: 1.25, margin: '0 0 1.25rem' }}>
        {framework.heading}
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(215px, 1fr))', gap: '1rem' }}>
        {framework.cards.map((card) => (
          <div key={card.label} className="guide-card" style={{ padding: '1.25rem 1.35rem' }}>
            <span className="font-guide-body" style={{ ...creamText.eyebrow, display: 'block', marginBottom: '0.45rem' }}>
              {card.label}
            </span>
            <h3 className="font-guide-heading" style={{ ...creamText.heading, fontSize: '1.05rem', lineHeight: 1.3, margin: '0 0 0.5rem' }}>
              {card.title}
            </h3>
            <p className="font-guide-body" style={{ ...creamText.body, fontSize: '0.86rem', margin: 0 }}>
              {card.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}