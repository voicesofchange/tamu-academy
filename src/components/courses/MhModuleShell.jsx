import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageMeta from '@/components/seo/PageMeta';
import ModuleLessonLayout from '@/components/courses/module/ModuleLessonLayout';
import StatusBadge from '@/components/page/StatusBadge';
import ModuleBreadcrumbs from '@/components/courses/module/ModuleBreadcrumbs';
import ModuleHero from '@/components/courses/module/ModuleHero';
import ModuleProgressBar from '@/components/courses/module/ModuleProgressBar';
import { useTranslation } from '@/lib/i18n';

const bodyText = { color: 'rgba(243,234,216,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };

/**
 * Phase 1 shell for a Mental Health pillar module route. Renders only
 * public-metadata fields (title, number, status, estimated time, short
 * description) plus navigation position and an appropriate unavailable
 * message. No lesson content is rendered.
 *
 * The shell is the entitlement fallback for a published module: it appears
 * when the viewer is not signed in, is not enrolled in the course, or has
 * not yet completed the previous module. All seven modules are published,
 * so it never stands in for unfinished content.
 *
 * Shell metadata is public-safe to display regardless of viewer, so this
 * component does NOT perform its own auth gate. Server-side content
 * delivery (getMentalHealthModule) enforces enrollment, per-module
 * publication and the prerequisite chain before releasing a lesson.
 */
// Message resolved inside the component via useTranslation (see below).

export default function MhModuleShell({ course, module: mod }) {
  const { t } = useTranslation();
  const coursePath = `/courses/${course.slug}`;
  const modulePath = `${coursePath}/${mod.route}`;
  const moduleIndex = course.modules.findIndex((m) => m.route === mod.route);
  const prevModule = moduleIndex > 0 ? course.modules[moduleIndex - 1] : null;
  const nextModule =
    moduleIndex >= 0 && moduleIndex < course.modules.length - 1
      ? course.modules[moduleIndex + 1]
      : null;
  const message = t('common.moduleEnrollPrompt');

  const navLinkStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    color: 'rgba(232,184,91,0.7)',
    fontSize: '0.72rem',
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    fontWeight: 500,
    border: '1px solid rgba(232,184,91,0.35)',
    borderRadius: '2px',
    padding: '0.65rem 1.3rem',
  };
  const navDisabledStyle = {
    ...navLinkStyle,
    color: 'rgba(243,234,216,0.28)',
    cursor: 'not-allowed',
    borderColor: 'rgba(243,234,216,0.12)',
  };

  return (
    <ModuleLessonLayout>
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
      <ModuleProgressBar
        current={moduleIndex + 1}
        total={course.modules.length}
      />

      <ModuleHero
        courseSlug={course.slug}
        eyebrow={`${mod.number} · ${course.title}`}
        title={mod.title}
        subheading={mod.description}
        status={mod.status}
        metaItems={[{ icon: 'Clock', label: `${t('common.estimatedTime')}: ${mod.estimatedTime}` }]}
      />

      <p className="font-body" style={{ ...bodyText, marginBottom: '1.5rem' }}>
        {mod.description}
      </p>

      <div style={{ padding: '2rem 2.25rem', border: '1px solid rgba(232,184,91,0.22)', borderRadius: '4px', backgroundColor: 'rgba(243,234,216,0.02)', marginBottom: '2.5rem' }}>
        <p className="font-body" style={{ ...bodyText, margin: '0 0 1rem' }}>{message}</p>
        <p className="font-body" style={{ ...bodyText, margin: 0, fontStyle: 'italic', color: 'rgba(243,234,216,0.6)' }}>
          {t('common.moduleEnrollHint')}
        </p>
      </div>

      {/* Placeholder progress area — ready to display learner progress later.
          Shows no PII and no Care Map content. */}
      <div style={{ padding: '1.5rem 1.75rem', border: '1px dashed rgba(232,184,91,0.18)', borderRadius: '4px', backgroundColor: 'rgba(243,234,216,0.015)', marginBottom: '2.5rem' }}>
        <span className="font-body" style={{ display: 'block', color: '#e8b85b', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, marginBottom: '0.5rem' }}>
          {t('course.progress')}
        </span>
        <p className="font-body" style={{ ...bodyText, margin: 0, fontStyle: 'italic', color: 'rgba(243,234,216,0.55)' }}>
          {t('common.enrollToTrack')}
        </p>
      </div>

      {/* Navigation position within the seven-module course */}
      <nav aria-label="Module navigation" style={{ paddingTop: '2rem', borderTop: '1px solid rgba(232,184,91,0.12)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {prevModule ? (
            <Link to={`${coursePath}/${prevModule.route}`} className="font-body" style={navLinkStyle}>
              &larr; {prevModule.number}
            </Link>
          ) : (
            <span aria-disabled="true" title="This is the first module" style={navDisabledStyle}>
              &larr; {t('common.startOfCourse')}
            </span>
          )}
          {nextModule ? (
            <Link to={`${coursePath}/${nextModule.route}`} className="font-body" style={navLinkStyle}>
              {nextModule.number} &rarr;
            </Link>
          ) : (
            <span aria-disabled="true" title="This is the last module" style={navDisabledStyle}>
              {t('common.endOfCourse')} &rarr;
            </span>
          )}
        </div>
        <Link to={coursePath} className="font-body" style={navLinkStyle}>
          &larr; {t('common.returnToCourse')}
        </Link>
      </nav>
    </ModuleLessonLayout>
  );
}