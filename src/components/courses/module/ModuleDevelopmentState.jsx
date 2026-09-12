import React from 'react';
import { Link } from 'react-router-dom';
import ModuleLessonLayout from '@/components/courses/module/ModuleLessonLayout';
import PageMeta from '@/components/seo/PageMeta';
import ModuleBreadcrumbs from '@/components/courses/module/ModuleBreadcrumbs';
import StatusBadge from '@/components/page/StatusBadge';
import { useTranslation } from '@/lib/i18n';

const bodyText = { color: 'rgba(243,234,216,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };

/**
 * Production guard shown when an in-development module is viewed publicly
 * (outside the builder/preview and not by an authenticated admin). It reveals
 * only that the module is in development and returns the learner to the course
 * — never the full learning content.
 */
export default function ModuleDevelopmentState({ course, module }) {
  const { t } = useTranslation();
  const coursePath = `/courses/${course.slug}`;
  const modulePath = `${coursePath}/${module.route}`;

  return (
    <ModuleLessonLayout>
      <PageMeta
        title={`${module.number}: ${module.title} | Tamu Academy`}
        description={`${module.title} — enroll in the course to access this module.`}
        path={modulePath}
        noindex
      />

      <ModuleBreadcrumbs
        pillar={course.pillar}
        track={course.track}
        course={course.title}
        coursePath={coursePath}
        moduleLabel={module.number}
      />

      <header style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignItems: 'center', marginBottom: '1rem' }}>
          <StatusBadge label={module.number} />
          <StatusBadge label={module.status} />
        </div>
        <h1 className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.75rem, 4vw, 2.6rem)', fontWeight: 400, lineHeight: 1.2, margin: 0 }}>
          {module.title}
        </h1>
      </header>

      <div style={{ padding: '2rem 2.25rem', border: '1px solid rgba(232,184,91,0.22)', borderRadius: '4px', backgroundColor: 'rgba(243,234,216,0.02)' }}>
        <p className="font-body" style={{ ...bodyText, margin: '0 0 1rem' }}>
          {t('common.moduleEnrollPrompt')}
        </p>
        <p className="font-body" style={{ ...bodyText, margin: 0, fontStyle: 'italic', color: 'rgba(243,234,216,0.6)' }}>
          {t('common.moduleEnrollHint')}
        </p>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <Link
          to={coursePath}
          className="font-body"
          style={{ display: 'inline-flex', alignItems: 'center', color: '#e8b85b', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, border: '1px solid rgba(232,184,91,0.4)', borderRadius: '2px', padding: '0.65rem 1.3rem' }}
        >
          &larr; {t('common.returnToCourse')}
        </Link>
      </div>
    </ModuleLessonLayout>
  );
}