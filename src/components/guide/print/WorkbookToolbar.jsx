import React from 'react';
import { Link } from 'react-router-dom';
import { Printer } from 'lucide-react';

const ctaStyle = {
  padding: '13px 20px',
  borderRadius: '3px',
  textDecoration: 'none',
  fontSize: '11.5px',
  letterSpacing: '0.13em',
  textTransform: 'uppercase',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  cursor: 'pointer',
  fontFamily: 'inherit',
};

/**
 * WorkbookToolbar — the screen-only controls above the printable workbook.
 * It never prints: the print stylesheet hides everything outside the workbook.
 */
export default function WorkbookToolbar({ onPrint }) {
  return (
    <div
      className="no-print"
      style={{ padding: 'clamp(6.5rem, 11vw, 8rem) clamp(1.25rem, 5vw, 4rem) 1.75rem', maxWidth: '900px', margin: '0 auto' }}
    >
      <span className="font-guide-body" style={{ display: 'block', color: '#C9961A', fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600 }}>
        Printable edition
      </span>
      <h1 className="font-guide-heading" style={{ color: '#FBF5E8', fontWeight: 600, fontSize: 'clamp(1.7rem, 3.6vw, 2.4rem)', lineHeight: 1.15, margin: '0.6rem 0 0.85rem' }}>
        Safari ya Utu — the printed workbook
      </h1>
      <p className="font-guide-body" style={{ color: 'rgba(251,245,232,0.78)', fontSize: '0.95rem', lineHeight: 1.75, maxWidth: '44rem', margin: '0 0 1.5rem' }}>
        The whole guide as a blank workbook: every section, exercise and reflection, with space to write. Nothing you have already saved appears here, so nothing is ever overwritten by printing.
      </p>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <button type="button" onClick={onPrint} className="tamu-journey-primary font-guide-body" style={{ ...ctaStyle, border: '1px solid #d99b37' }}>
          <Printer size={14} strokeWidth={1.8} />
          Download the printable PDF
        </button>
        <Link to="/learners-guide" className="tamu-journey-secondary font-guide-body" style={ctaStyle}>
          Back to the guide
        </Link>
      </div>

      <p className="font-guide-body" style={{ color: 'rgba(251,245,232,0.6)', fontSize: '0.82rem', lineHeight: 1.7, marginTop: '1rem' }}>
        Choose “Save as PDF” as the destination in the print dialog. On a phone, open the browser menu and choose Print or Share, then Save as PDF.
      </p>
    </div>
  );
}