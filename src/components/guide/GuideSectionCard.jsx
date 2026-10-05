import React from 'react';
import { Link } from 'react-router-dom';
import { creamText, progressLabels } from '@/lib/guide/styles';

const statusColor = {
  not_started: '#6b5744',
  in_progress: '#8A650B',
  done: '#2f6b3a',
};

/** One card in the guide home's grid of ten sections. */
export default function GuideSectionCard({ section, status = 'not_started' }) {
  return (
    <Link
      to={`/learners-guide/${section.id}`}
      className="guide-card tamu-course-card"
      style={{ display: 'block', padding: '1.3rem 1.4rem', textDecoration: 'none' }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.65rem' }}>
        <span aria-hidden className="font-guide-heading" style={{ fontSize: '1.4rem', fontWeight: 600, color: '#8A650B', lineHeight: 1 }}>
          {section.number || '·'}
        </span>
        <span
          className="font-guide-body"
          style={{ fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600, color: statusColor[status] || statusColor.not_started }}
        >
          {progressLabels[status] || progressLabels.not_started}
        </span>
      </div>
      <h3 className="font-guide-heading" style={{ ...creamText.heading, fontSize: '1.1rem', lineHeight: 1.25, margin: '0 0 0.2rem' }}>
        {section.swahili}
      </h3>
      <p className="font-guide-body" style={{ ...creamText.body, fontSize: '0.82rem', margin: 0 }}>
        {section.english}
      </p>
      {!section.available && (
        <p className="font-guide-body" style={{ ...creamText.body, fontSize: '0.72rem', color: '#8A650B', margin: '0.6rem 0 0' }}>
          Content in preparation
        </p>
      )}
    </Link>
  );
}