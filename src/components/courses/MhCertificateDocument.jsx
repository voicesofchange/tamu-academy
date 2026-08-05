import React from 'react';

/**
 * MhCertificateDocument — the visual certificate of completion.
 *
 * Formal, AfroCentric design using the Tamu Academy gold (#D4A12A) and
 * espresso (#1A130E) brand palette on a cream ground (#FCFAF5).
 * Ornamental motifs are geometric, inspired by West African textile
 * traditions (concentric forms, diamonds, sunburst rays) — decorative
 * rather than sacred symbols.
 *
 * Props:
 *   data: { learnerName, courseTitle, completedAt, completionStatement, certificateId }
 *   isPreview: boolean — when true, shows a placeholder certificate ID
 */

const GOLD = '#D4A12A';
const ESPRESSO = '#1A130E';
const CREAM = '#FCFAF5';
const GOLD_SOFT = 'rgba(212,161,42,0.35)';
const GOLD_FAINT = 'rgba(212,161,42,0.18)';
const MUTE = '#786E5F';
const MUTE_DEEP = '#645A4E';

// --- AfroCentric corner ornament (geometric, gold) ---
function CornerOrnament({ corner }) {
  const transforms = {
    tl: { top: 0, left: 0, rotate: 0 },
    tr: { top: 0, right: 0, rotate: 90 },
    br: { bottom: 0, right: 0, rotate: 180 },
    bl: { bottom: 0, left: 0, rotate: 270 },
  };
  const t = transforms[corner];
  const pos = { position: 'absolute' };
  if (t.top !== undefined) pos.top = t.top;
  if (t.bottom !== undefined) pos.bottom = t.bottom;
  if (t.left !== undefined) pos.left = t.left;
  if (t.right !== undefined) pos.right = t.right;

  return (
    <svg
      width="64" height="64" viewBox="0 0 64 64"
      style={{ ...pos, transform: `rotate(${t.rotate}deg)`, transformOrigin: '32px 32px' }}
      aria-hidden="true"
    >
      <g fill="none" stroke={GOLD} strokeWidth="1">
        {/* L-frame */}
        <path d="M 6 6 L 28 6" />
        <path d="M 6 6 L 6 28" />
        {/* inner diagonal accent */}
        <path d="M 6 6 L 18 18" strokeWidth="0.6" opacity="0.55" />
        {/* concentric corner arcs */}
        <path d="M 6 14 A 8 8 0 0 0 14 6" strokeWidth="0.5" opacity="0.7" />
        <path d="M 6 20 A 14 14 0 0 0 20 6" strokeWidth="0.4" opacity="0.45" />
        {/* diamond node */}
        <path d="M 6 6 L 10 10 L 6 14 L 2 10 Z" fill={GOLD} stroke="none" opacity="0.85" />
        {/* small tick marks */}
        <path d="M 22 6 L 22 10" strokeWidth="0.5" opacity="0.5" />
        <path d="M 6 22 L 10 22" strokeWidth="0.5" opacity="0.5" />
      </g>
    </svg>
  );
}

// --- Central emblem (stylized sunburst / star) ---
function CenterEmblem() {
  const rays = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
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
        {/* diamond accents between rays */}
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

// --- Decorative divider with center diamond ---
function GoldDivider({ width = '120px' }) {
  return (
    <div aria-hidden="true" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', margin: '0 auto', width }}>
      <span style={{ flex: 1, height: '1px', background: `linear-gradient(to right, transparent, ${GOLD})` }} />
      <svg width="10" height="10" viewBox="0 0 10 10"><path d="M 5 0 L 10 5 L 5 10 L 0 5 Z" fill={GOLD} /></svg>
      <span style={{ flex: 1, height: '1px', background: `linear-gradient(to left, transparent, ${GOLD})` }} />
    </div>
  );
}

export default function MhCertificateDocument({ data, isPreview }) {
  const completedDate = data.completedAt
    ? new Date(data.completedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';

  return (
    <div
      className="tamu-certificate-print"
      style={{
        width: '100%',
        maxWidth: '1000px',
        margin: '0 auto',
        backgroundColor: CREAM,
        color: ESPRESSO,
        padding: 'clamp(2rem, 5vw, 4rem)',
        border: `2px solid ${GOLD}`,
        borderRadius: '4px',
        fontFamily: "'DM Sans', sans-serif",
        position: 'relative',
        boxSizing: 'border-box',
      }}
    >
      {/* Middle espresso border line */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 'clamp(0.5rem, 1.2vw, 0.9rem)', border: `1px solid ${ESPRESSO}`, borderRadius: '2px', opacity: 0.12, pointerEvents: 'none' }} />
      {/* Inner gold border line */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 'clamp(0.75rem, 1.5vw, 1.25rem)', border: `1px solid ${GOLD_SOFT}`, borderRadius: '2px', pointerEvents: 'none' }} />

      {/* Corner ornaments */}
      <CornerOrnament corner="tl" />
      <CornerOrnament corner="tr" />
      <CornerOrnament corner="br" />
      <CornerOrnament corner="bl" />

      {/* Content */}
      <div style={{ position: 'relative', textAlign: 'center', padding: 'clamp(1rem, 3vw, 2rem) clamp(1rem, 4vw, 3rem)' }}>
        {/* Institution name */}
        <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1rem, 2.2vw, 1.4rem)', fontWeight: 500, letterSpacing: '0.28em', textTransform: 'uppercase', color: ESPRESSO, margin: '0 0 0.4rem', paddingLeft: '0.28em' }}>
          Tamu Academy
        </p>
        <p style={{ fontSize: 'clamp(0.6rem, 1.1vw, 0.72rem)', letterSpacing: '0.18em', textTransform: 'uppercase', color: MUTE, margin: '0 0 1.2rem', fontWeight: 400 }}>
          People &amp; Prosperity
        </p>

        <GoldDivider />

        {/* Central emblem */}
        <div style={{ margin: '1.5rem auto 1.2rem' }}>
          <CenterEmblem />
        </div>

        {/* Certificate of Completion */}
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.75rem, 4.5vw, 3rem)', fontWeight: 400, color: ESPRESSO, margin: '0 0 0.4rem', lineHeight: 1.15, fontStyle: 'italic' }}>
          Certificate of Completion
        </h1>
        <p style={{ fontSize: 'clamp(0.62rem, 1.1vw, 0.75rem)', letterSpacing: '0.22em', textTransform: 'uppercase', color: GOLD, margin: '0 0 2rem', fontWeight: 500 }}>
          Awarded with Distinction
        </p>

        {/* This certifies that */}
        <p style={{ fontSize: 'clamp(0.82rem, 1.5vw, 0.95rem)', color: MUTE, margin: '0 0 0.75rem', fontStyle: 'italic' }}>
          This is to certify that
        </p>

        {/* Learner name */}
        <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontStyle: 'italic', fontWeight: 400, color: ESPRESSO, margin: '0 0 0.5rem', lineHeight: 1.3 }}>
          {data.learnerName}
        </p>

        {/* Underline flourish beneath name */}
        <div aria-hidden="true" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', margin: '0 auto 1.2rem', maxWidth: '320px' }}>
          <span style={{ flex: 1, height: '1px', background: `linear-gradient(to right, transparent, ${GOLD_SOFT})` }} />
          <svg width="8" height="8" viewBox="0 0 8 8"><path d="M 4 0 L 8 4 L 4 8 L 0 4 Z" fill={GOLD} /></svg>
          <span style={{ flex: 1, height: '1px', background: `linear-gradient(to left, transparent, ${GOLD_SOFT})` }} />
        </div>

        {/* Has completed */}
        <p style={{ fontSize: 'clamp(0.82rem, 1.5vw, 0.95rem)', color: MUTE, margin: '0 0 1rem', lineHeight: 1.6 }}>
          has successfully completed all seven modules of
        </p>

        {/* Course title */}
        <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.2rem, 2.8vw, 1.65rem)', fontWeight: 500, color: ESPRESSO, margin: '0 0 0.4rem', lineHeight: 1.3 }}>
          {data.courseTitle}
        </p>
        <p style={{ fontSize: 'clamp(0.68rem, 1.2vw, 0.8rem)', letterSpacing: '0.14em', textTransform: 'uppercase', color: GOLD, margin: '0 0 2rem', fontWeight: 500 }}>
          A Seven-Module Course
        </p>

        {/* Completion date */}
        <p style={{ fontSize: 'clamp(0.78rem, 1.3vw, 0.88rem)', color: MUTE, margin: '0 0 2rem', letterSpacing: '0.04em' }}>
          Date of Completion &nbsp;·&nbsp; <span style={{ fontWeight: 500, color: ESPRESSO }}>{completedDate}</span>
        </p>

        {/* Completion statement */}
        <div style={{ maxWidth: '680px', margin: '0 auto 2.5rem' }}>
          <p style={{ fontSize: 'clamp(0.74rem, 1.25vw, 0.84rem)', lineHeight: 1.75, color: MUTE_DEEP, fontStyle: 'italic', margin: 0, textAlign: 'center' }}>
            {data.completionStatement}
          </p>
        </div>

        <GoldDivider />

        {/* Footer: seal + signature line + ID */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '2rem', gap: '1.5rem', flexWrap: 'wrap' }}>
          {/* Left: signature line */}
          <div style={{ textAlign: 'left', flex: '1 1 180px', minWidth: '160px' }}>
            <div aria-hidden="true" style={{ width: '140px', height: '1px', background: ESPRESSO, opacity: 0.4, marginBottom: '0.4rem' }} />
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(0.82rem, 1.4vw, 0.95rem)', fontWeight: 500, color: ESPRESSO, margin: '0 0 0.1rem' }}>
              Tamu Academy
            </p>
            <p style={{ fontSize: 'clamp(0.6rem, 1vw, 0.7rem)', letterSpacing: '0.1em', textTransform: 'uppercase', color: MUTE, margin: 0 }}>
              Issuing Institution
            </p>
          </div>

          {/* Center: emblem seal */}
          <div style={{ textAlign: 'center', flex: '0 0 auto' }}>
            <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
              <g stroke={GOLD} fill="none" strokeWidth="0.8">
                <circle cx="22" cy="22" r="20" />
                <circle cx="22" cy="22" r="16" strokeWidth="0.5" opacity="0.6" />
                <circle cx="22" cy="22" r="4" fill={GOLD} stroke="none" />
                {[0, 60, 120, 180, 240, 300].map((angle) => {
                  const rad = (angle * Math.PI) / 180;
                  const x1 = 22 + Math.cos(rad) * 21;
                  const y1 = 22 + Math.sin(rad) * 21;
                  const x2 = 22 + Math.cos(rad) * 25;
                  const y2 = 22 + Math.sin(rad) * 25;
                  return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="1" />;
                })}
              </g>
            </svg>
          </div>

          {/* Right: certificate ID */}
          <div style={{ textAlign: 'right', flex: '1 1 180px', minWidth: '160px' }}>
            <div aria-hidden="true" style={{ width: '140px', height: '1px', background: ESPRESSO, opacity: 0.4, marginBottom: '0.4rem', marginLeft: 'auto' }} />
            <p style={{ fontSize: 'clamp(0.6rem, 1vw, 0.7rem)', letterSpacing: '0.08em', color: MUTE, margin: '0 0 0.1rem' }}>
              Certificate ID
            </p>
            <p style={{ fontFamily: "'DM Sans', monospace", fontSize: 'clamp(0.62rem, 1.05vw, 0.72rem)', fontWeight: 500, color: ESPRESSO, margin: 0, letterSpacing: '0.05em' }}>
              {isPreview ? 'PREVIEW-NOT-A-REAL-ID' : data.certificateId}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}