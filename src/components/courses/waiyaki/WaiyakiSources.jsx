import React from 'react';
import CourseOverviewSection from '@/components/courses/CourseOverviewSection';

const GROUPS = [
  { key: 'primarySources', label: 'Primary sources' },
  { key: 'scholarship', label: 'Scholarship and secondary works' },
  { key: 'familyAndCommunity', label: 'Family and community accounts' },
  { key: 'officialRecords', label: 'Official records, media and literature' },
  { key: 'voicesOfChange', label: 'Voices of Change' },
  { key: 'lawAndPolicy', label: 'Law and policy' },
  { key: 'researchOnManguo', label: 'Research and reporting on Manguo' },
  { key: 'theHighway', label: 'The highway' },
];

const groupLabel = {
  color: '#b97827',
  fontSize: '10px',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  fontWeight: 500,
  display: 'block',
  marginBottom: '0.7rem',
};

const record = {
  color: '#725a46',
  fontSize: '14px',
  lineHeight: 1.75,
  fontWeight: 300,
  marginBottom: '0.6rem',
};

const note = {
  color: '#8a6f58',
  fontSize: '13px',
  lineHeight: 1.7,
  fontStyle: 'italic',
  margin: 0,
};

const recordLink = {
  color: '#9b5d1d',
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
};

const hint = {
  color: '#8a6f58',
  fontSize: '12px',
  letterSpacing: '0.04em',
  margin: '0 0 1.9rem',
};

/**
 * WaiyakiSources — the course's verified reading list. The bibliography lives
 * in the server-side curriculum, so it arrives through the public
 * getWaiyakiSources function. Every record is shown exactly as the guide lists
 * it; where an online copy or record exists, the citation links out to it, and
 * records with no online copy stay as plain citations.
 */
export default function WaiyakiSources({ sources }) {
  return (
    <CourseOverviewSection id="course-sources" surface="light" eyebrow="Sources" heading="Sources and further reading">
      {sources === undefined && (
        <p className="font-body" style={record}>Loading the course sources&hellip;</p>
      )}

      {sources === null && (
        <p className="font-body" style={record}>The source list could not be loaded. Please reload the page.</p>
      )}

      {sources && (
        <p className="font-body" style={hint}>Entries with an online record open in a new tab.</p>
      )}

      {sources && GROUPS.map(({ key, label }) => {
        const records = sources[key];
        if (!Array.isArray(records) || records.length === 0) return null;
        return (
          <div key={key} style={{ marginBottom: '1.9rem' }}>
            <span className="font-body" style={groupLabel}>{label}</span>
            <ul className="font-body" style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {records.map((item) => (
                <li key={item.text} style={record}>
                  {item.url ? (
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="font-body" style={recordLink}>
                      {item.text} <span aria-hidden="true">&#8599;</span>
                    </a>
                  ) : item.text}
                </li>
              ))}
            </ul>
          </div>
        );
      })}

      {sources && sources.note && (
        <p className="font-body" style={note}>{sources.note}</p>
      )}
    </CourseOverviewSection>
  );
}