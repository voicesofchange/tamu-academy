import React from 'react';
import { BlankLines } from './WorkbookField';
import { GUIDE_PRIVACY_NOTE, GUIDE_PROVERB, GUIDE_SUBTITLE, GUIDE_TITLE, HOW_TO_USE } from '@/lib/guide/sections';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';
import { fillTemplate } from '@/lib/i18n/fill-template';

// Visible text on this screen, translated with the rest of the page.
const UI_TEXT = {
  printableEdition: 'Printable edition',
  name: 'Name',
  dateStarted: 'Date started',
  waysToUseThisWorkbook: 'Ways to use this workbook',
  aPrintedWorkbookLivesWherever: '{v0} A printed workbook lives wherever you keep it, so treat it the way you would any private notebook.',
};

const eyebrowStyle = { display: 'block', color: '#8A650B', fontSize: '0.66rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500 };
const labelStyle = { display: 'block', color: '#33241A', fontSize: '0.85rem', fontWeight: 500, margin: '0.95rem 0 0.5rem' };

/** The opening spread of the printed workbook: title, owner lines, how to use it. */
export default function WorkbookCover() {
  const { content: uiText } = useTranslatedContent('ui-components-guide-print-workbookcover', UI_TEXT);
  return (
    <section className="tamu-print-section" style={{ paddingBottom: '1.5rem' }}>
      <span className="font-guide-body" style={eyebrowStyle}>{uiText.printableEdition}</span>
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
          <span className="font-guide-body" style={labelStyle}>{uiText.name}</span>
          <BlankLines count={2} />
        </div>
        <div>
          <span className="font-guide-body" style={labelStyle}>{uiText.dateStarted}</span>
          <BlankLines count={2} />
        </div>
      </div>

      <div style={{ marginTop: '1.6rem' }}>
        <span className="font-guide-body" style={eyebrowStyle}>{uiText.waysToUseThisWorkbook}</span>
        <ul style={{ margin: '0.45rem 0 0', paddingLeft: '1.05rem' }}>
          {HOW_TO_USE.map((item) => (
            <li key={item} className="font-guide-body" style={{ color: '#2A2119', fontSize: '0.86rem', lineHeight: 1.7, marginBottom: '0.35rem' }}>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <p className="font-guide-body" style={{ color: '#2A2119', fontSize: '0.86rem', lineHeight: 1.7, marginTop: '1.4rem', borderTop: '1px solid #c9b899', paddingTop: '0.8rem' }}>{fillTemplate(uiText.aPrintedWorkbookLivesWherever, { v0: GUIDE_PRIVACY_NOTE })}</p>
    </section>
  );
}