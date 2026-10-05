import React from 'react';
import { COURSES, FINDINGS, MODULES, UNVERIFIED } from '@/lib/qa-review-data';
import QaScorecard from '@/components/insights/QaScorecard';
import QaModuleMatrix from '@/components/insights/QaModuleMatrix';
import QaFindings from '@/components/insights/QaFindings';

const cardStyle = {
  border: '1px solid rgba(232,184,91,0.18)',
  borderRadius: '2px',
  backgroundColor: 'rgba(243,234,216,0.02)',
  padding: '1.5rem',
};

const bodyText = {
  color: 'rgba(243,234,216,0.72)',
  fontSize: '0.85rem',
  fontFamily: "'DM Sans', sans-serif",
  lineHeight: 1.6,
};

const subHeading = {
  color: '#f8f0df',
  fontSize: '1.3rem',
  fontWeight: 500,
  margin: '0 0 0.35rem',
};

const subNote = {
  color: 'rgba(243,234,216,0.6)',
  fontSize: '0.82rem',
  fontFamily: "'DM Sans', sans-serif",
  margin: '0 0 1.5rem',
  lineHeight: 1.6,
};

function Block({ heading, note, children }) {
  return (
    <section style={{ marginBottom: '3.5rem' }}>
      <h3 className="font-heading" style={subHeading}>{heading}</h3>
      {note && <p style={subNote}>{note}</p>}
      {children}
    </section>
  );
}

export default function QaReviewPanel() {
  const firstPriority = FINDINGS.filter(f => f.priority === 'P1').length;
  const secondPriority = FINDINGS.filter(f => f.priority === 'P2').length;
  const thirdPriority = FINDINGS.filter(f => f.priority === 'P3').length;

  const stats = [
    { value: COURSES.length, label: 'Courses reviewed' },
    { value: MODULES.length, label: 'Modules reviewed' },
    { value: firstPriority, label: 'Findings: do first' },
    { value: secondPriority + thirdPriority, label: 'Findings: next and polish' },
  ];

  return (
    <div>
      <div style={{ ...cardStyle, marginBottom: '2.5rem' }}>
        <p style={{ ...bodyText, margin: 0 }}>
          Every course and module was read against one rubric, from the catalog entry and enrollment through module
          navigation, progress, completion and certification. This is a review record only: it changes no course content
          and nothing a learner sees. Protected lesson text and assessment answers are deliberately left out.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '3.5rem' }}>
        {stats.map(stat => (
          <div key={stat.label} style={cardStyle}>
            <div className="font-heading" style={{ color: '#e8b85b', fontSize: '2rem', lineHeight: 1 }}>{stat.value}</div>
            <div style={{ color: 'rgba(243,234,216,0.6)', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: "'DM Sans', sans-serif", marginTop: '0.5rem' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <Block
        heading="Course scorecard"
        note="The same eleven rubric lines applied to each course, so a course that differs is visible at a glance."
      >
        <QaScorecard />
      </Block>

      <Block
        heading="Module matrix"
        note="Each module checked for the elements that make up a lesson, so a gap in the middle of a course stands out."
      >
        <QaModuleMatrix />
      </Block>

      <Block heading="Prioritized findings">
        <QaFindings />
      </Block>

      <Block heading="Checks this review could not make">
        <div style={cardStyle}>
          <ul style={{ margin: 0, paddingLeft: '1.1rem' }}>
            {UNVERIFIED.map(item => (
              <li key={item} style={{ ...bodyText, marginBottom: '0.5rem' }}>{item}</li>
            ))}
          </ul>
        </div>
      </Block>
    </div>
  );
}