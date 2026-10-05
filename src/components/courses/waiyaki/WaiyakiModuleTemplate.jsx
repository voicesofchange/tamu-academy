import React from 'react';
import PageMeta from '@/components/seo/PageMeta';
import PageLayout from '@/components/page/PageLayout';
import ModuleBreadcrumbs from '@/components/courses/module/ModuleBreadcrumbs';
import WaiyakiModuleBody from '@/components/courses/waiyaki/WaiyakiModuleBody';
import WaiyakiKeyTerms from '@/components/courses/waiyaki/WaiyakiKeyTerms';
import WaiyakiSourceAnalysis from '@/components/courses/waiyaki/WaiyakiSourceAnalysis';
import WaiyakiReflection from '@/components/courses/waiyaki/WaiyakiReflection';
import WaiyakiModuleProgress from '@/components/courses/waiyaki/WaiyakiModuleProgress';
import WaiyakiModuleNav from '@/components/courses/waiyaki/WaiyakiModuleNav';
import { WAIYAKI_COURSE } from '@/lib/waiyaki-tracks';

const bodyText = {
  color: 'rgba(243,234,216,0.82)',
  fontSize: '1rem',
  lineHeight: 1.85,
  fontWeight: 300,
};

/**
 * WaiyakiModuleTemplate — the reading page for one module of the course.
 *
 * Text-first by design: the narrative, key terms, source analysis and
 * reflection render as text with no images and nothing to download. The
 * companion video is named as text only, so on a slow connection the module is
 * complete without it.
 */
export default function WaiyakiModuleTemplate({
  module,
  moduleRoute,
  moduleIndex,
  moduleCount,
  prevPath,
  nextPath,
  nextLabel,
  completedKeys,
  moduleCompleted,
  completedCount,
  canSave,
  saving,
  onAcknowledgeSource,
  onAcknowledgeReflection,
  onComplete,
  message,
}) {
  const coursePath = `/courses/${WAIYAKI_COURSE.slug}`;
  const keys = completedKeys || [];

  return (
    <PageLayout>
      <PageMeta
        title={`${module.number}: ${module.title} | Tamu Academy`}
        description={module.lead ? module.lead.slice(0, 155) : WAIYAKI_COURSE.description}
        path={`${coursePath}/${moduleRoute}`}
      />

      <ModuleBreadcrumbs
        pillar={WAIYAKI_COURSE.pillar}
        track={WAIYAKI_COURSE.track}
        course={WAIYAKI_COURSE.title}
        coursePath={coursePath}
        moduleLabel={module.title}
      />

      <header style={{ marginBottom: '3rem' }}>
        <span
          className="font-body"
          style={{
            color: '#e8b85b',
            fontSize: '0.66rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontWeight: 600,
            display: 'block',
            marginBottom: '0.75rem',
          }}
        >
          {module.number} of {String(moduleCount).padStart(2, '0')}
        </span>
        <h1
          className="font-heading"
          style={{
            color: '#f8f0df',
            fontSize: 'clamp(1.9rem, 5vw, 3rem)',
            fontWeight: 400,
            lineHeight: 1.12,
            letterSpacing: '-0.02em',
            margin: '0 0 0.9rem',
          }}
        >
          {module.title}
        </h1>
        {module.subtitle && (
          <p
            className="font-body"
            style={{ ...bodyText, color: 'rgba(232,184,91,0.85)', fontStyle: 'italic', marginBottom: '1.25rem' }}
          >
            {module.subtitle}
          </p>
        )}
        <div
          className="font-body"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.25rem',
            color: 'rgba(243,234,216,0.6)',
            fontSize: '0.8rem',
            letterSpacing: '0.04em',
          }}
        >
          {module.estimatedTime && <span>{module.estimatedTime}</span>}
          {module.companionVideo && <span>Companion recording: {module.companionVideo}</span>}
          <span>
            Module {moduleIndex + 1} of {moduleCount}
          </span>
        </div>
      </header>

      {module.lead && (
        <p
          className="font-heading"
          style={{
            color: 'rgba(248,240,223,0.92)',
            fontSize: 'clamp(1.1rem, 2.2vw, 1.35rem)',
            fontWeight: 400,
            lineHeight: 1.65,
            margin: '0 0 2.5rem',
            maxWidth: '70ch',
          }}
        >
          {module.lead}
        </p>
      )}

      {module.learningObjectives && module.learningObjectives.length > 0 && (
        <section
          style={{
            marginBottom: '3rem',
            padding: '1.5rem 1.75rem',
            border: '1px solid rgba(232,184,91,0.2)',
            borderRadius: '4px',
            backgroundColor: 'rgba(243,234,216,0.015)',
          }}
        >
          <h2
            className="font-body"
            style={{
              color: '#e8b85b',
              fontSize: '0.62rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontWeight: 600,
              margin: '0 0 0.9rem',
            }}
          >
            By the end of this module you will be able to
          </h2>
          <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
            {module.learningObjectives.map((objective) => (
              <li key={objective} className="font-body" style={{ ...bodyText, fontSize: '0.94rem', marginBottom: '0.45rem' }}>
                {objective}
              </li>
            ))}
          </ul>
        </section>
      )}

      {module.sections &&
        module.sections.map((section) => (
          <WaiyakiModuleBody key={section.heading} section={section} />
        ))}

      <WaiyakiKeyTerms terms={module.keyTerms} />

      <WaiyakiSourceAnalysis
        analysis={module.sourceAnalysis}
        acknowledged={keys.includes('source_analysis_acknowledged')}
        canSave={canSave}
        saving={saving}
        onAcknowledge={onAcknowledgeSource}
      />

      <WaiyakiReflection
        reflection={module.reflection}
        acknowledged={keys.includes('reflection_acknowledged')}
        canSave={canSave}
        saving={saving}
        onAcknowledge={onAcknowledgeReflection}
      />

      <WaiyakiModuleProgress
        completedKeys={keys}
        moduleCompleted={moduleCompleted}
        completedCount={completedCount}
        totalModules={moduleCount}
        canSave={canSave}
        saving={saving}
        onComplete={onComplete}
        message={message}
      />

      <WaiyakiModuleNav prevPath={prevPath} nextPath={nextPath} nextLabel={nextLabel} />

      <p
        className="font-body"
        style={{
          ...bodyText,
          fontSize: '0.84rem',
          color: 'rgba(243,234,216,0.5)',
          marginTop: '2rem',
          fontStyle: 'italic',
        }}
      >
        Every claim in this module carries the guide&rsquo;s evidence label: documented, tradition or
        contested. Where the record and the oral tradition disagree, the course sets both before you
        rather than choosing for you.
      </p>
    </PageLayout>
  );
}