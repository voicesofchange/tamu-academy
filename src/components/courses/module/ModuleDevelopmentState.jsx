import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/page/PageLayout';
import PageMeta from '@/components/seo/PageMeta';
import ModuleBreadcrumbs from '@/components/courses/module/ModuleBreadcrumbs';
import StatusBadge from '@/components/page/StatusBadge';

const bodyText = { color: 'rgba(245,239,224,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };

/**
 * Production guard shown when an in-development module is viewed publicly
 * (outside the builder/preview and not by an authenticated admin). It reveals
 * only that the module is in development and returns the learner to the course
 * — never the full learning content.
 */
export default function ModuleDevelopmentState({ course, module }) {
  const coursePath = `/courses/${course.slug}`;
  const modulePath = `${coursePath}/${module.route}`;

  return (
    <PageLayout>
      <PageMeta
        title={`${module.number}: ${module.title} | Tamu Academy`}
        description={`${module.title} is currently in development.`}
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
        <h1 className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(1.75rem, 4vw, 2.6rem)', fontWeight: 400, lineHeight: 1.2, margin: 0 }}>
          {module.title}
        </h1>
      </header>

      <div style={{ padding: '2rem 2.25rem', border: '1px solid rgba(212,161,42,0.22)', borderRadius: '4px', backgroundColor: 'rgba(245,239,224,0.02)' }}>
        <p className="font-body" style={{ ...bodyText, margin: '0 0 1rem' }}>
          This module is in development. The recorded lesson, key concepts, knowledge check, and applied activity will be available here once the module is ready.
        </p>
        <p className="font-body" style={{ ...bodyText, margin: 0, fontStyle: 'italic', color: 'rgba(245,239,224,0.6)' }}>
          Please return to the course to explore resources that are available now.
        </p>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <Link
          to={coursePath}
          className="font-body"
          style={{ display: 'inline-flex', alignItems: 'center', color: '#D4A12A', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, border: '1px solid rgba(212,161,42,0.4)', borderRadius: '2px', padding: '0.65rem 1.3rem' }}
        >
          &larr; Return to Course
        </Link>
      </div>
    </PageLayout>
  );
}