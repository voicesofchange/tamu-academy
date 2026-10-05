import React from 'react';
import { BlankLines } from './WorkbookField';
import { GUIDE_PRIVACY_NOTE, GUIDE_PROVERB, GUIDE_SUBTITLE, GUIDE_TITLE, HOW_TO_USE } from '@/lib/guide/sections';

const eyebrowStyle = { display: 'block', color: '#8A650B', fontSize: '0.66rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500 };
const labelStyle = { display: 'block', color: '#33241A', fontSize: '0.85rem', fontWeight: 500, margin: '0.95rem 0 0.5rem' };

/** The opening spread of the printed workbook: title, owner lines, how to use it. */
export default function WorkbookCover() {
  return (
    <section className="tamu-print-section" style={{ paddingBottom: '1.5rem' }}>
      <span className="font-guide-body" style={eyebrowStyle}>Printable edition</span>
      <h1 className="font-guide-heading" style={{ color: '#33241A', fontSize: '2.4rem', lineHeight: 1.1, fontWeight: 600, margin: '0.45rem 0 0.6rem' }}>
        {GUIDE_TITLE}
      </h1>
      <p className="font-guide-body" style={{ color: '#2A2119', fontSize: '0.95rem', lineHeight: 1.75, margin: '0 0 0.9rem' }}>
        {GUIDE_SUBTITLE}
      </p>
      <p className="font-guide-heading" style={{ color: '#8A650B', fontStyle: 'italic', fontSize: '1.05rem', margin: 0 }}>
        {GUIDE_PROVERB.sw} — {GUIDE_PROVERB.en} ({GUIDE_PROVERB.language})
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.6rem' }}>
        <div>
          <span className="font-guide-body" style={labelStyle}>Name</span>
          <BlankLines count={2} />
        </div>
        <div>
          <span className="font-guide-body" style={labelStyle}>Date started</span>
          <BlankLines count={2} />
        </div>
      </div>

      <div style={{ marginTop: '1.6rem' }}>
        <span className="font-guide-body" style={eyebrowStyle}>Ways to use this workbook</span>
        <ul style={{ margin: '0.45rem 0 0', paddingLeft: '1.05rem' }}>
          {HOW_TO_USE.map((item) => (
            <li key={item} className="font-guide-body" style={{ color: '#2A2119', fontSize: '0.86rem', lineHeight: 1.7, marginBottom: '0.35rem' }}>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <p className="font-guide-body" style={{ color: '#2A2119', fontSize: '0.86rem', lineHeight: 1.7, marginTop: '1.4rem', borderTop: '1px solid #c9b899', paddingTop: '0.8rem' }}>
        {GUIDE_PRIVACY_NOTE} A printed workbook lives wherever you keep it, so treat it the way you would any private notebook.
      </p>
    </section>
  );
}