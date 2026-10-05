import React from 'react';
import { STATE_ORDER, STATE_STYLES } from '@/lib/remote-pathway';

/**
 * PathwayStateLegend — explains the three tags used on every step of the
 * pathway, so a learner can tell saved progress apart from material that only
 * exists on paper before they commit to anything.
 */
export default function PathwayStateLegend() {
  return (
    <section style={{ padding: '0 clamp(1.5rem, 6vw, 4rem)', marginBottom: '3.5rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <span className="font-body" style={{ display: 'block', color: 'var(--tamu-gold)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, marginBottom: '0.75rem' }}>
          Before you start
        </span>
        <h2 className="font-heading" style={{ color: 'var(--tamu-ink)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 400, lineHeight: 1.25, margin: '0 0 1.25rem' }}>
          What each tag means
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
          {STATE_ORDER.map((state) => {
            const style = STATE_STYLES[state];
            return (
              <div key={state} style={{ padding: '1.4rem 1.6rem', border: '1px solid rgba(232,184,91,0.22)', borderRadius: '4px', backgroundColor: 'rgba(243,234,216,0.015)' }}>
                <span className="font-body" style={{ display: 'inline-block', color: style.color, border: `1px solid ${style.border}`, backgroundColor: style.background, fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, borderRadius: '2px', padding: '0.2rem 0.65rem', marginBottom: '0.7rem' }}>
                  {style.label}
                </span>
                <p className="font-body" style={{ color: 'rgba(243,234,216,0.72)', fontSize: '0.88rem', lineHeight: 1.75, fontWeight: 300, margin: 0 }}>
                  {style.note}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}