import React from 'react';
import WorkbookField, { BlankLines } from './WorkbookField';
import { CARE_NOTE, KIOO_STATEMENTS } from '@/lib/guide/sections';

/**
 * WorkbookSection — one section of the guide as a printable spread: the
 * proverb, the introduction, the framework, every exercise as a blank form,
 * the takeaways and the closing reflection. Used by the printable workbook.
 */

const eyebrowStyle = { display: 'block', color: '#8A650B', fontSize: '0.66rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500 };
const headingStyle = { color: '#33241A', fontWeight: 500 };
const bodyStyle = { color: '#2A2119', fontSize: '0.9rem', lineHeight: 1.75 };
const labelStyle = { display: 'block', color: '#33241A', fontSize: '0.85rem', fontWeight: 500, margin: '0.95rem 0 0.5rem' };

export default function WorkbookSection({ section }) {
  const framework = section.framework;

  return (
    <section className="tamu-print-section" style={{ paddingBottom: '1rem' }}>
      <header style={{ borderBottom: '2px solid #33241A', paddingBottom: '0.7rem', marginBottom: '1.1rem' }}>
        <span className="font-guide-body" style={eyebrowStyle}>
          {section.number ? `${section.number} · ` : ''}{section.swahili} · Kiswahili
        </span>
        <h2 className="font-guide-heading" style={{ ...headingStyle, fontSize: '1.75rem', lineHeight: 1.15, margin: '0.3rem 0 0' }}>
          {section.english}
        </h2>
        {section.proverb && (
          <p className="font-guide-heading" style={{ color: '#8A650B', fontStyle: 'italic', fontSize: '0.95rem', margin: '0.5rem 0 0' }}>
            {section.proverb.sw} — {section.proverb.en}
          </p>
        )}
      </header>

      {(section.intro || []).map((paragraph) => (
        <p key={paragraph.slice(0, 40)} className="font-guide-body" style={{ ...bodyStyle, margin: '0 0 0.8rem' }}>
          {paragraph}
        </p>
      ))}

      {section.careNote && (
        <p className="font-guide-body" style={{ ...bodyStyle, borderLeft: '3px solid #D9822B', paddingLeft: '0.8rem', margin: '0.9rem 0' }}>
          {CARE_NOTE}
        </p>
      )}

      {framework && (
        <div style={{ margin: '1.1rem 0 0.5rem' }}>
          <span className="font-guide-body" style={eyebrowStyle}>{framework.eyebrow}</span>
          <h3 className="font-guide-heading" style={{ ...headingStyle, fontSize: '1.15rem', margin: '0.3rem 0 0.7rem' }}>
            {framework.heading}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.7rem' }}>
            {(framework.cards || []).map((card) => (
              <div key={card.title} className="workbook-block" style={{ border: '1px solid #c9b899', borderRadius: '2px', padding: '0.65rem' }}>
                <span className="font-guide-body" style={{ ...eyebrowStyle, color: '#6b5744' }}>{card.label}</span>
                <h4 className="font-guide-heading" style={{ ...headingStyle, fontSize: '1rem', margin: '0.2rem 0 0.3rem' }}>{card.title}</h4>
                <p className="font-guide-body" style={{ ...bodyStyle, fontSize: '0.8rem', margin: 0 }}>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {(section.exercises || []).map((exercise) => (
        <div key={exercise.id} style={{ marginTop: '1.4rem' }}>
          <span className="font-guide-body" style={eyebrowStyle}>{exercise.number}</span>
          <h3 className="font-guide-heading" style={{ ...headingStyle, fontSize: '1.2rem', margin: '0.3rem 0 0.4rem' }}>
            {exercise.title}
          </h3>
          {exercise.instructions && (
            <p className="font-guide-body" style={{ ...bodyStyle, fontSize: '0.85rem', margin: '0 0 0.6rem' }}>{exercise.instructions}</p>
          )}
          {(exercise.fields || []).map((field) => (
            <WorkbookField key={field.id} field={field} />
          ))}
        </div>
      ))}

      {section.special === 'kurudi' && (
        <div style={{ marginTop: '1.4rem' }}>
          <span className="font-guide-body" style={eyebrowStyle}>Exercise R.1</span>
          <h3 className="font-guide-heading" style={{ ...headingStyle, fontSize: '1.2rem', margin: '0.3rem 0 0.4rem' }}>
            The mirror, held up again
          </h3>
          <p className="font-guide-body" style={{ ...bodyStyle, fontSize: '0.85rem', margin: '0 0 0.6rem' }}>
            Rate each statement as honestly as you can today, then compare your answers with the ones from your first reflection.
          </p>
          <span className="font-guide-body" style={labelStyle}>Date of this reflection</span>
          <BlankLines count={1} />
          <WorkbookField field={{ id: 'kioo-again', type: 'frequency', label: 'The ten statements', statements: KIOO_STATEMENTS }} />
          <span className="font-guide-body" style={labelStyle}>What I notice about the movement since my first reflection</span>
          <BlankLines count={6} />
        </div>
      )}

      {section.takeaways?.length > 0 && (
        <div style={{ marginTop: '1.4rem', border: '1px solid #c9b899', borderRadius: '2px', padding: '0.8rem' }}>
          <span className="font-guide-body" style={eyebrowStyle}>Takeaways</span>
          <ul style={{ margin: '0.4rem 0 0', paddingLeft: '1.05rem' }}>
            {section.takeaways.map((item) => (
              <li key={item} className="font-guide-body" style={{ ...bodyStyle, fontSize: '0.84rem', marginBottom: '0.35rem' }}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {section.closingReflection?.prompt && (
        <div className="workbook-block" style={{ marginTop: '1.4rem' }}>
          <span className="font-guide-body" style={{ ...eyebrowStyle }}>Closing reflection</span>
          <p className="font-guide-heading" style={{ ...headingStyle, fontSize: '1.05rem', lineHeight: 1.45, margin: '0.35rem 0 0.6rem' }}>
            {section.closingReflection.prompt}
          </p>
          <BlankLines count={6} />
        </div>
      )}
    </section>
  );
}