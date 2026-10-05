import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import {
  MODULE_STATUS_LABELS,
  STANDING_LABELS,
  STANDING_NOTES,
  progressDate,
} from '@/lib/learner-progress';

const primaryButtonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  color: '#24150f',
  fontSize: '0.78rem',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  fontWeight: 600,
  textDecoration: 'none',
  border: 'none',
  borderRadius: '2px',
  padding: '0.65rem 1.3rem',
  backgroundColor: '#e8b85b',
};

const outlineButtonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  color: '#e8b85b',
  fontSize: '0.78rem',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  fontWeight: 500,
  textDecoration: 'none',
  border: '1px solid rgba(232,184,91,0.5)',
  borderRadius: '2px',
  padding: '0.65rem 1.3rem',
  background: 'none',
  cursor: 'pointer',
  fontFamily: 'inherit',
};

function standingStyle(standing) {
  if (standing === 'completed') {
    return { backgroundColor: 'rgba(232,184,91,0.16)', color: '#e8b85b', border: '1px solid rgba(232,184,91,0.5)' };
  }
  if (standing === 'in_progress') {
    return { backgroundColor: 'transparent', color: '#e8b85b', border: '1px solid rgba(232,184,91,0.4)' };
  }
  return { backgroundColor: 'transparent', color: 'rgba(243,234,216,0.6)', border: '1px solid rgba(243,234,216,0.18)' };
}

function moduleStatusStyle(status) {
  if (status === 'completed') return { color: '#e8b85b', border: '1px solid rgba(232,184,91,0.4)' };
  if (status === 'in_progress') return { color: 'rgba(243,234,216,0.85)', border: '1px solid rgba(243,234,216,0.28)' };
  return { color: 'rgba(243,234,216,0.5)', border: '1px solid rgba(243,234,216,0.14)' };
}

const statusPillBase = {
  display: 'inline-block',
  fontSize: '0.58rem',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  fontWeight: 500,
  borderRadius: '2px',
  padding: '0.2rem 0.6rem',
  whiteSpace: 'nowrap',
};

/**
 * ProgressCourseCard — one course on the My Progress dashboard. The card
 * carries the course's standing and progress; opening it reveals every module
 * with its own status, so a learner can see exactly where they stopped.
 */
export default function ProgressCourseCard({ course }) {
  const [open, setOpen] = useState(false);
  const completedLabel = `${course.completedCount} of ${course.totalModules} modules complete`;
  const nextStep = course.nextModule;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      style={{
        padding: '2rem 2.15rem',
        border: '1px solid rgba(232,184,91,0.22)',
        borderRadius: '4px',
        backgroundColor: 'rgba(243,234,216,0.015)',
        marginBottom: '1.25rem',
      }}
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem' }}>
        <span className="font-body" style={{ ...statusPillBase, ...standingStyle(course.standing) }}>
          {STANDING_LABELS[course.standing]}
        </span>
        <span className="font-body" style={{ color: 'rgba(243,234,216,0.6)', fontSize: '0.75rem', fontWeight: 300 }}>
          {STANDING_NOTES[course.standing]}
        </span>
      </div>

      <h3 className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.15rem, 2.5vw, 1.5rem)', fontWeight: 400, lineHeight: 1.3, margin: '0 0 0.6rem' }}>
        {course.title}
      </h3>
      <p className="font-body" style={{ color: 'rgba(243,234,216,0.72)', fontSize: '0.9rem', lineHeight: 1.75, fontWeight: 300, margin: '0 0 1.25rem' }}>
        {course.subtitle}
      </p>

      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem', marginBottom: '0.6rem' }}>
          <span className="font-body" style={{ color: '#e8b85b', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500 }}>
            Progress
          </span>
          <span className="font-body" style={{ color: '#f8f0df', fontSize: '0.9rem', fontWeight: 500 }}>
            {completedLabel}
          </span>
        </div>
        <div
          role="progressbar"
          aria-valuenow={course.percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${course.title} progress`}
          style={{ width: '100%', height: '6px', backgroundColor: 'rgba(243,234,216,0.08)', borderRadius: '3px', overflow: 'hidden' }}
        >
          <div style={{ width: `${course.percent}%`, height: '100%', backgroundColor: '#e8b85b', borderRadius: '3px', transition: 'width 0.6s ease' }} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
        {course.enrolled && nextStep && (
          <Link to={`/courses/${course.slug}/${nextStep.route}`} className="font-body" style={primaryButtonStyle}>
            Continue at {nextStep.number} &rarr;
          </Link>
        )}
        {course.enrolled && !nextStep && (
          <Link to={`/courses/${course.slug}/completion`} className="font-body" style={primaryButtonStyle}>
            Review course completion &rarr;
          </Link>
        )}
        {!course.enrolled && (
          <Link to={`/courses/${course.slug}`} className="font-body" style={primaryButtonStyle}>
            Open course &rarr;
          </Link>
        )}
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          className="font-body"
          style={outlineButtonStyle}
        >
          {open ? 'Hide modules' : 'Show all modules'}
          <ChevronDown
            size={14}
            aria-hidden="true"
            style={{ transition: 'transform 0.25s ease', transform: open ? 'rotate(180deg)' : 'none' }}
          />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            key="modules"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{ listStyle: 'none', margin: '1.5rem 0 0', padding: '1.5rem 0 0', borderTop: '1px solid rgba(232,184,91,0.16)', overflow: 'hidden' }}
          >
            {course.modules.map((module) => (
              <li
                key={module.route}
                style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'baseline', padding: '0.85rem 0', borderBottom: '1px solid rgba(232,184,91,0.08)' }}
              >
                <div style={{ flex: '1 1 220px', minWidth: '220px' }}>
                  <span className="font-body" style={{ color: '#e8b85b', fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.25rem' }}>
                    {module.number}
                  </span>
                  {course.enrolled ? (
                    <Link to={`/courses/${course.slug}/${module.route}`} className="font-heading" style={{ color: '#f8f0df', fontSize: '1.02rem', fontWeight: 400, textDecoration: 'none' }}>
                      {module.title}
                    </Link>
                  ) : (
                    <span className="font-heading" style={{ color: 'rgba(243,234,216,0.82)', fontSize: '1.02rem', fontWeight: 400 }}>
                      {module.title}
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
                  <span className="font-body" style={{ ...statusPillBase, ...moduleStatusStyle(module.status) }}>
                    {MODULE_STATUS_LABELS[module.status]}
                  </span>
                  {module.updatedAt && (
                    <span className="font-body" style={{ color: 'rgba(243,234,216,0.5)', fontSize: '0.72rem', fontWeight: 300 }}>
                      {progressDate(module.updatedAt)}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
}