import React from 'react';
import { useCourseFactText } from '@/components/courses/shared/useCourseFacts';

/**
 * LearningAreaBadge — the pill naming a course's learning area, in the
 * reader's language. `surface="light"` for parchment, dark by default.
 */
export default function LearningAreaBadge({ areaId, surface = 'dark' }) {
  const { area } = useCourseFactText();
  const label = area(areaId);
  if (!label) return null;
  const light = surface === 'light';
  return (
    <span
      className="font-body"
      style={{
        display: 'inline-block',
        maxWidth: '100%',
        color: light ? '#8a521a' : '#e8b85b',
        background: light ? 'rgba(185,120,39,0.1)' : 'rgba(232,184,91,0.1)',
        border: `1px solid ${light ? 'rgba(185,120,39,0.35)' : 'rgba(232,184,91,0.35)'}`,
        borderRadius: '999px',
        padding: '0.28rem 0.7rem',
        fontSize: '0.66rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        fontWeight: 600,
        lineHeight: 1.4,
      }}
    >
      {label}
    </span>
  );
}
