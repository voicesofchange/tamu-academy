import React from 'react';

const bodyText = {
  color: 'rgba(245,239,224,0.78)',
  fontSize: '0.97rem',
  lineHeight: 1.85,
  fontWeight: 300,
};

const eyebrowStyle = {
  color: '#D4A12A',
  fontSize: '0.6rem',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  fontWeight: 500,
};

const reminderBoxStyle = {
  padding: '1.1rem 1.35rem',
  border: '1px solid rgba(212,161,42,0.28)',
  borderRadius: '4px',
  backgroundColor: 'rgba(212,161,42,0.05)',
};

const privacyBoxStyle = {
  padding: '1.25rem 1.5rem',
  border: '1px solid rgba(212,161,42,0.22)',
  borderRadius: '4px',
  backgroundColor: 'rgba(245,239,224,0.015)',
};

const offlineBannerStyle = {
  padding: '0.95rem 1.2rem',
  border: '1px dashed rgba(212,161,42,0.32)',
  borderRadius: '4px',
  backgroundColor: 'rgba(245,239,224,0.015)',
};

/**
 * MhPrivateReflection — displays the Mental Health Module 1 private
 * reflection prompt and privacy statement ONLY.
 *
 * PRIVACY (mandatory):
 *   - There is NO online text input, NO textarea, NO submit button,
 *     NO upload form, NO discussion board link, and NO AI analysis.
 *   - This component does not collect, transmit, store, grade, or
 *     analyze any reflection response. The component renders only
 *     display-only guidance encouraging the learner to reflect
 *     privately and, optionally, to write in an offline notebook.
 *
 * Page integration: this section is rendered directly inside the
 * Module 1 lesson page's `<PageSection id="private-reflection">` and
 * inherits the standard Tamu Academy dark-theme styling.
 */
export default function MhPrivateReflection({ config }) {
  return (
    <section aria-label="Private reflection — offline reflective activity">
      <div style={reminderBoxStyle} aria-label="Pre-activity reminder">
        <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>
          Reminder
        </span>
        <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0, fontSize: '0.88rem' }}>
          {config.preActivityReminder}
        </p>
      </div>

      <p className="font-body" style={{ ...bodyText, marginTop: '1.4rem', marginBottom: '1.1rem' }}>
        {config.prompt}
      </p>

      <div style={privacyBoxStyle}>
        <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>
          {config.privacyStatement}
        </p>
      </div>

      <div style={{ ...offlineBannerStyle, marginTop: '1.3rem' }}>
        <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.45rem' }}>
          No online field
        </span>
        <p className="font-body" style={{ ...bodyText, margin: 0 }}>{config.offlineBanner}</p>
      </div>

      <ul className="font-body" style={{ ...bodyText, marginTop: '1.25rem', paddingLeft: '1.2rem' }}>
        {config.guidanceNotes.map((note, i) => (
          <li key={i} style={{ marginBottom: '0.55rem' }}>{note}</li>
        ))}
      </ul>
    </section>
  );
}