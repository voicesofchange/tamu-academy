import React from 'react';

const GOLD = '#D4A12A';

/**
 * MhLessonOrnaments — decorative motifs shared across the Mental Health
 * course lesson pages, drawn from the same visual language as the
 * certificate of completion (MhCertificateDocument). Gold strokes on
 * the dark espresso lesson background. Purely decorative (aria-hidden);
 * contains no business logic.
 */

// Ornamental divider: gold line + center diamond + gold line.
// Mirrors the certificate's GoldDivider motif.
export function GoldDivider({ width = '160px', margin = '0 auto' }) {
  return (
    <div aria-hidden="true" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', margin, width }}>
      <span style={{ flex: 1, height: '1px', background: `linear-gradient(to right, transparent, ${GOLD})` }} />
      <svg width="10" height="10" viewBox="0 0 10 10"><path d="M 5 0 L 10 5 L 5 10 L 0 5 Z" fill={GOLD} /></svg>
      <span style={{ flex: 1, height: '1px', background: `linear-gradient(to left, transparent, ${GOLD})` }} />
    </div>
  );
}

// Small sunburst emblem: concentric circles, rays, and diamond accents.
// Mirrors the certificate's CenterEmblem, scaled for lesson headers.
export function ModuleEmblem({ size = 40 }) {
  const rays = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" style={{ display: 'block', margin: '0 auto 1rem' }}>
      <g stroke={GOLD} fill="none">
        <circle cx="32" cy="32" r="24" strokeWidth="1" />
        <circle cx="32" cy="32" r="17" strokeWidth="0.5" opacity="0.6" />
        <circle cx="32" cy="32" r="6" fill={GOLD} stroke="none" />
        {rays.map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = 32 + Math.cos(rad) * 26;
          const y1 = 32 + Math.sin(rad) * 26;
          const x2 = 32 + Math.cos(rad) * 31;
          const y2 = 32 + Math.sin(rad) * 31;
          return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="1.4" />;
        })}
        {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const cx = 32 + Math.cos(rad) * 20;
          const cy = 32 + Math.sin(rad) * 20;
          return <path key={angle} d={`M ${cx} ${cy - 2} L ${cx + 2} ${cy} L ${cx} ${cy + 2} L ${cx - 2} ${cy} Z`} fill={GOLD} stroke="none" opacity="0.7" />;
        })}
      </g>
    </svg>
  );
}