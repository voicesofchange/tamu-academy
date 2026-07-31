import React from 'react';

/**
 * MhModule2PrivateReflection — the display-only renderer for the
 * Module 2 reflection section. All text arrives via the `reflection`
 * prop (lesson.privateReflection). No protected wording is hard-coded.
 *
 * CONTRACT (Stage 6):
 *   - No state, no inputs, no response fields, no submit / save /
 *     complete / share controls.
 *   - No backend call, no entity write, no analytics event.
 *   - Not a completion, progress, or evaluation event; does not touch
 *     ModuleProgress, QuizAttempt, or CourseEnrollment.
 *   - The sentence starter is displayed as a fill-in-the-blank line for
 *     private offline completion; nothing is captured.
 */
const bodyText = { color: 'rgba(245,239,224,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };
const eyebrowStyle = { color: '#D4A12A', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500 };
const starterStyle = {
  color: '#F5EFE0',
  fontSize: 'clamp(1.05rem, 2.4vw, 1.3rem)',
  fontStyle: 'italic',
  lineHeight: 1.6,
  margin: '1.35rem 0',
  borderLeft: '2px solid rgba(212,161,42,0.4)',
  paddingLeft: '1.25rem',
};
const noticeBox = { padding: '1.4rem 1.6rem', border: '1px solid rgba(212,161,42,0.28)', borderRadius: '4px', backgroundColor: 'rgba(212,161,42,0.05)' };
const privateBox = { padding: '1.4rem 1.6rem', border: '1px solid rgba(212,161,42,0.22)', borderRadius: '4px', backgroundColor: 'rgba(245,239,224,0.02)' };

export default function MhModule2PrivateReflection({ reflection }) {
  return (
    <div>
      <div style={noticeBox} role="note" aria-label="Privacy notice">
        <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>
          Privacy notice
        </span>
        <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>
          {reflection.privacyNotice}
        </p>
      </div>

      <p className="font-body" style={{ ...bodyText, marginTop: '1.5rem', marginBottom: 0 }}>
        {reflection.prompt}
      </p>

      <blockquote className="font-heading" style={starterStyle}>
        {reflection.sentenceStarter}
      </blockquote>

      <p className="font-body" style={{ ...bodyText, marginTop: 0, marginBottom: '1.5rem' }}>
        {reflection.followUpPrompt}
      </p>

      <div style={privateBox} role="note" aria-label="Keep it private">
        <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>
          Keep it private
        </span>
        <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>
          {reflection.privateNotice}
        </p>
      </div>
    </div>
  );
}