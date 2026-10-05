import React from 'react';
import { Link } from 'react-router-dom';
import HubDownloadButton from '@/components/hub/HubDownloadButton';
import { courseObjectives, downloadTextFile, objectivesText } from '@/lib/learning-hub';

const bodyText = { color: 'rgba(243,234,216,0.78)', fontSize: '0.95rem', lineHeight: 1.8, fontWeight: 300 };

const courseTitle = { color: '#f8f0df', fontSize: 'clamp(1.1rem, 2.3vw, 1.35rem)', fontWeight: 400, lineHeight: 1.3, margin: '0 0 1.35rem' };

const groupLabel = {
  color: '#e8b85b',
  fontSize: '0.6rem',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  fontWeight: 500,
  display: 'block',
  marginBottom: '0.7rem',
};

const listItem = { ...bodyText, display: 'flex', gap: '0.6rem', marginBottom: '0.6rem' };

/**
 * HubObjectives — what each course sets out to teach: who it is for, and the
 * outcomes a learner should be able to demonstrate by the end. Everything is
 * read from the published course metadata, and the whole section downloads as
 * a plain-text file for offline use.
 */
export default function HubObjectives({ courseSlugs }) {
  const courses = courseObjectives().filter((course) => courseSlugs.includes(course.slug));

  return (
    <div>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
        <HubDownloadButton
          onClick={() => downloadTextFile('tamu-academy-course-objectives.txt', objectivesText())}
          label="Download objectives"
        />
        <span className="font-body" style={{ color: 'rgba(243,234,216,0.55)', fontSize: '0.78rem', fontWeight: 300, alignSelf: 'center' }}>
          Plain-text file, ready for offline study.
        </span>
      </div>

      {courses.map((course) => (
        <article key={course.slug} style={{ marginBottom: '2.75rem' }}>
          <h3 className="font-heading" style={courseTitle}>{course.title}</h3>
          <p className="font-body" style={{ ...bodyText, margin: '0 0 1.25rem' }}>{course.subtitle}</p>

          {course.facts.length > 0 && (
            <p className="font-body" style={{ ...bodyText, margin: '0 0 1.5rem', color: 'rgba(232,184,91,0.9)', fontSize: '0.82rem' }}>
              {course.facts.map((fact) => `${fact.label}: ${fact.value}`).join('  ·  ')}
            </p>
          )}

          {course.whoThisCourseIsFor && (
            <div style={{ marginBottom: '1.5rem' }}>
              <span className="font-body" style={groupLabel}>Who it is for</span>
              <p className="font-body" style={{ ...bodyText, margin: 0 }}>{course.whoThisCourseIsFor}</p>
            </div>
          )}

          {course.learningOutcomes.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <span className="font-body" style={groupLabel}>What you will be able to do</span>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {course.learningOutcomes.map((outcome) => (
                  <li key={outcome} className="font-body" style={listItem}>
                    <span aria-hidden="true" style={{ color: '#e8b85b', flexShrink: 0 }}>—</span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {course.learningPath.length > 0 && (
            <div>
              <span className="font-body" style={groupLabel}>Learning path</span>
              <p className="font-body" style={{ ...bodyText, margin: 0 }}>{course.learningPath.join('  ·  ')}</p>
            </div>
          )}

          <Link
            to={`/courses/${course.slug}`}
            className="font-body"
            style={{ display: 'inline-block', marginTop: '1.25rem', color: '#e8b85b', fontSize: '0.78rem', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 500, textDecoration: 'none' }}
          >
            Open the course &rarr;
          </Link>
        </article>
      ))}
    </div>
  );
}