import React from 'react';
import HubDownloadButton from '@/components/hub/HubDownloadButton';
import { courseSummaries, downloadTextFile, summariesText } from '@/lib/learning-hub';

const bodyText = { color: 'rgba(243,234,216,0.78)', fontSize: '0.92rem', lineHeight: 1.8, fontWeight: 300 };

/**
 * HubSummaries — every course and every module in brief, so a participant can
 * read the whole pathway in one sitting or carry it away. The summaries come
 * from the same published metadata the course pages use, so they can never
 * drift from the courses themselves.
 */
export default function HubSummaries() {
  const courses = courseSummaries();

  return (
    <div>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
        <HubDownloadButton
          onClick={() => downloadTextFile('tamu-academy-course-summaries.txt', summariesText())}
          label="Download all summaries"
        />
        <span className="font-body" style={{ color: 'rgba(243,234,216,0.55)', fontSize: '0.78rem', fontWeight: 300, alignSelf: 'center' }}>
          Plain-text file, ready for offline study.
        </span>
      </div>

      {courses.map((course) => (
        <article key={course.slug} style={{ marginBottom: '2.75rem' }}>
          <h3 className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.1rem, 2.3vw, 1.35rem)', fontWeight: 400, lineHeight: 1.3, margin: '0 0 0.5rem' }}>
            {course.title}
          </h3>
          <p className="font-body" style={{ ...bodyText, margin: '0 0 1.5rem' }}>{course.subtitle}</p>

          <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {course.modules.map((module) => (
              <li key={module.number} style={{ padding: '0.9rem 0', borderTop: '1px solid rgba(232,184,91,0.12)' }}>
                <span className="font-body" style={{ color: '#e8b85b', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.3rem' }}>
                  {module.number}
                </span>
                <span className="font-heading" style={{ color: '#f8f0df', fontSize: '1rem', fontWeight: 400, display: 'block', marginBottom: '0.35rem' }}>
                  {module.title}
                </span>
                {module.description && (
                  <p className="font-body" style={{ ...bodyText, margin: 0 }}>{module.description}</p>
                )}
                {module.estimatedTime && (
                  <p className="font-body" style={{ ...bodyText, color: 'rgba(232,184,91,0.85)', fontSize: '0.78rem', margin: '0.4rem 0 0' }}>
                    {module.estimatedTime}
                  </p>
                )}
              </li>
            ))}
          </ol>

          {course.milestone && (
            <div style={{ marginTop: '1.25rem' }}>
              <span className="font-body" style={{ color: '#e8b85b', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.5rem' }}>
                Applied milestone
              </span>
              <span className="font-heading" style={{ color: '#f8f0df', fontSize: '1rem', fontWeight: 400, display: 'block', marginBottom: '0.35rem' }}>
                {course.milestone.title}
              </span>
              <p className="font-body" style={{ ...bodyText, margin: 0 }}>{course.milestone.description}</p>
            </div>
          )}

          <p className="font-body" style={{ color: 'rgba(243,234,216,0.6)', fontSize: '0.78rem', margin: '1.25rem 0 0' }}>
            {course.modulesCount} modules · <a href={course.courseUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#e8b85b' }}>course page</a>
          </p>
        </article>
      ))}
    </div>
  );
}