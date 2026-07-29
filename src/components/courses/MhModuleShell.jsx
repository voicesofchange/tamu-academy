import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageMeta from '@/components/seo/PageMeta';
import PageLayout from '@/components/page/PageLayout';
import StatusBadge from '@/components/page/StatusBadge';
import ModuleBreadcrumbs from '@/components/courses/module/ModuleBreadcrumbs';

const bodyText = { color: 'rgba(245,239,224,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };

/**
 * Phase 1 shell for a Mental Health pillar module route. Renders only
 * public-metadata fields (title, number, status, estimated time, short
 * description) plus navigation position and an appropriate unavailable
 * message. No lesson content is rendered.
 *
 * Status → message map (per implementation requirement #3 and #2):
 *   "In Development" — Module 1's full lesson content is in preparation.
 *   "Coming Soon"    — Module N's lesson content will be released later.
 *
 * Course access during this development phase is gated by the existing
 * SoftLaunchGate (admins/preview bypass; non-admins redirected during
 * LAUNCH_MODE). Shell metadata is public-safe to display regardless of
 * viewer, so this component does NOT perform its own auth gate. Server
 * side content delivery (getMentalHealthModule) is admin-only in Phase
 * 1 and will add enrollment + publication + prerequisite checks once
 * they are implemented.
 */
const unavailableMessageByStatus = {
  'In Development':
    'Module 1 is in development. The recorded lesson, written explanation, case study, Community of Care Map activity, knowledge check, and reflection prompt will appear here once the module is ready. Please return later.',
  'Coming Soon':
    'This module is coming soon. Full learning materials will be released once they have been prepared and reviewed.',
};

export default function MhModuleShell({ course, module: mod }) {
  const coursePath = `/courses/${course.slug}`;
  const modulePath = `${coursePath}/${mod.route}`;
  const moduleIndex = course.modules.findIndex((m) => m.route === mod.route);
  const prevModule = moduleIndex > 0 ? course.modules[moduleIndex - 1] : null;
  const nextModule =
    moduleIndex >= 0 && moduleIndex < course.modules.length - 1
      ? course.modules[moduleIndex + 1]
      : null;
  const message =
    unavailableMessageByStatus[mod.status] || unavailableMessageByStatus['Coming Soon'];

  const navLinkStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    color: 'rgba(212,161,42,0.7)',
    fontSize: '0.72rem',
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    fontWeight: 500,
    border: '1px solid rgba(212,161,42,0.35)',
    borderRadius: '2px',
    padding: '0.65rem 1.3rem',
  };
  const navDisabledStyle = {
    ...navLinkStyle,
    color: 'rgba(245,239,224,0.28)',
    cursor: 'not-allowed',
    borderColor: 'rgba(245,239,224,0.12)',
  };

  return (
    <PageLayout>
      <PageMeta
        title={`${mod.number}: ${mod.title} | Tamu Academy`}
        description={mod.description}
        path={modulePath}
        noindex
      />

      <ModuleBreadcrumbs
        pillar={course.learningArea}
        track={course.title}
        course={course.title}
        coursePath={coursePath}
        moduleLabel={mod.number}
      />

      <header style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignItems: 'center', marginBottom: '1rem' }}>
          <StatusBadge label={mod.number} />
          <StatusBadge label={mod.status} />
        </div>
        <h1
          className="font-heading"
          style={{ color: '#F5EFE0', fontSize: 'clamp(1.75rem, 4vw, 2.6rem)', fontWeight: 400, lineHeight: 1.2, margin: '0 0 1rem' }}
        >
          {mod.title}
        </h1>
        <p
          className="font-body"
          style={{ color: 'rgba(245,239,224,0.55)', fontSize: '0.82rem', letterSpacing: '0.06em', marginBottom: '1.5rem' }}
        >
          Estimated time: {mod.estimatedTime}
        </p>
        <motion.div
          initial={{ opacity: 0, scaleX: 0.4 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          aria-hidden="true"
          style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, transparent, #D4A12A 35%, #E2B652 50%, #D4A12A 65%, transparent)', transformOrigin: 'left' }}
        />
      </header>

      <p className="font-body" style={{ ...bodyText, marginBottom: '1.5rem' }}>
        {mod.description}
      </p>

      <div style={{ padding: '2rem 2.25rem', border: '1px solid rgba(212,161,42,0.22)', borderRadius: '4px', backgroundColor: 'rgba(245,239,224,0.02)', marginBottom: '2.5rem' }}>
        <p className="font-body" style={{ ...bodyText, margin: '0 0 1rem' }}>{message}</p>
        <p className="font-body" style={{ ...bodyText, margin: 0, fontStyle: 'italic', color: 'rgba(245,239,224,0.6)' }}>
          This course is in development. Module content, knowledge checks, and applied activities will be added here once they are ready.
        </p>
      </div>

      {/* Placeholder progress area — ready to display learner progress later.
          Shows no PII and no Care Map content. */}
      <div style={{ padding: '1.5rem 1.75rem', border: '1px dashed rgba(212,161,42,0.18)', borderRadius: '4px', backgroundColor: 'rgba(245,239,224,0.015)', marginBottom: '2.5rem' }}>
        <span className="font-body" style={{ display: 'block', color: '#D4A12A', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, marginBottom: '0.5rem' }}>
          Learner Progress
        </span>
        <p className="font-body" style={{ ...bodyText, margin: 0, fontStyle: 'italic', color: 'rgba(245,239,224,0.55)' }}>
          Progress tracking is being prepared. Once enrollment opens, your position in the course will be shown here.
        </p>
      </div>

      {/* Navigation position within the seven-module course */}
      <nav aria-label="Module navigation" style={{ paddingTop: '2rem', borderTop: '1px solid rgba(212,161,42,0.12)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {prevModule ? (
            <Link to={`${coursePath}/${prevModule.route}`} className="font-body" style={navLinkStyle}>
              &larr; {prevModule.number}
            </Link>
          ) : (
            <span aria-disabled="true" title="This is the first module" style={navDisabledStyle}>
              &larr; Start of course
            </span>
          )}
          {nextModule ? (
            <Link to={`${coursePath}/${nextModule.route}`} className="font-body" style={navLinkStyle}>
              {nextModule.number} &rarr;
            </Link>
          ) : (
            <span aria-disabled="true" title="This is the last module" style={navDisabledStyle}>
              End of course &rarr;
            </span>
          )}
        </div>
        <Link to={coursePath} className="font-body" style={navLinkStyle}>
          &larr; Return to Course
        </Link>
      </nav>
    </PageLayout>
  );
}