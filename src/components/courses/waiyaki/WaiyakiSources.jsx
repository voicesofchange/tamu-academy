import React from 'react';
import CourseOverviewSection from '@/components/courses/CourseOverviewSection';

const GROUPS = [
  { key: 'primarySources', label: 'Primary sources' },
  { key: 'scholarship', label: 'Scholarship and secondary works' },
  { key: 'familyAndCommunity', label: 'Family and community accounts' },
  { key: 'officialRecords', label: 'Official records, media and literature' },
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

/**
 * WaiyakiSources — the course's verified reading list. The bibliography lives
 * in the server-side curriculum, so it arrives through the public
 * getWaiyakiSources function, and every record is shown exactly as the guide
 * lists it: no source is added, and none is given a web address the guide
 * does not state.
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

      {sources && GROUPS.map(({ key, label }) => {
        const records = sources[key];
        if (!Array.isArray(records) || records.length === 0) return null;
        return (
          <div key={key} style={{ marginBottom: '1.9rem' }}>
            <span className="font-body" style={groupLabel}>{label}</span>
            <ul className="font-body" style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {records.map((item) => (
                <li key={item} style={record}>{item}</li>
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