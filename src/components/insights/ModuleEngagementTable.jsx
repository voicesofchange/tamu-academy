import React from 'react';

const headCell = {
  padding: '0.75rem 1rem',
  color: 'rgba(243,234,216,0.55)',
  fontSize: '0.66rem',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  fontWeight: 400,
  fontFamily: "'DM Sans', sans-serif",
  borderBottom: '1px solid rgba(232,184,91,0.22)',
};

const moduleCell = {
  padding: '0.7rem 1rem 0.7rem 1.5rem',
  textAlign: 'left',
  color: 'rgba(243,234,216,0.88)',
  fontSize: '0.87rem',
  fontWeight: 300,
  fontFamily: "'DM Sans', sans-serif",
  borderBottom: '1px solid rgba(232,184,91,0.1)',
};

const numberCell = {
  padding: '0.7rem 1rem',
  textAlign: 'right',
  color: '#e8b85b',
  fontSize: '0.95rem',
  fontFamily: "'DM Sans', sans-serif",
  borderBottom: '1px solid rgba(232,184,91,0.1)',
};

const courseHead = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  gap: '0.75rem',
  flexWrap: 'wrap',
  padding: '1rem',
  textAlign: 'left',
  backgroundColor: 'rgba(232,184,91,0.06)',
  borderTop: '1px solid rgba(232,184,91,0.22)',
  borderBottom: '1px solid rgba(232,184,91,0.14)',
};

const courseTitle = {
  color: '#f8f0df',
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: '1.1rem',
  fontWeight: 400,
};

const courseMeta = {
  color: 'rgba(243,234,216,0.6)',
  fontSize: '0.72rem',
  letterSpacing: '0.05em',
  fontFamily: "'DM Sans', sans-serif",
};

/**
 * ModuleEngagementTable — per course, every required module with how many
 * learners opened it and how many completed it, plus the course's enrolled and
 * completed-learner totals. Administrators only: the numbers come from the
 * admin-gated part of getCommunityInsights.
 */
export default function ModuleEngagementTable({ rows, labels }) {
  if (!rows || rows.length === 0) return null;

  return (
    <div style={{ overflowX: 'auto', border: '1px solid rgba(232,184,91,0.18)', borderRadius: '4px', backgroundColor: 'rgba(243,234,216,0.015)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '520px' }}>
        <thead>
          <tr>
            <th scope="col" style={{ ...headCell, textAlign: 'left' }}>{labels.module}</th>
            <th scope="col" style={{ ...headCell, textAlign: 'right' }}>{labels.opened}</th>
            <th scope="col" style={{ ...headCell, textAlign: 'right' }}>{labels.completed}</th>
          </tr>
        </thead>
        {rows.map((course) => (
          <tbody key={course.slug}>
            <tr>
              <th colSpan={3} scope="colgroup" style={courseHead}>
                <span style={courseTitle}>{course.title}</span>
                <span style={courseMeta}>
                  {labels.enrolled} {course.enrolled} &middot; {labels.completedCourse} {course.completedCourse}
                </span>
              </th>
            </tr>
            {(course.modules || []).map((module) => (
              <tr key={module.slug}>
                <th scope="row" style={moduleCell}>{module.label}</th>
                <td style={numberCell}>{module.opened}</td>
                <td style={numberCell}>{module.completed}</td>
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}