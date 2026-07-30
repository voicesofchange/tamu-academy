import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageMeta from '@/components/seo/PageMeta';
import PageLayout from '@/components/page/PageLayout';
import PageSection from '@/components/page/PageSection';
import StatusBadge from '@/components/page/StatusBadge';
import ModuleBreadcrumbs from '@/components/courses/module/ModuleBreadcrumbs';

const bodyText = { color: 'rgba(245,239,224,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };
const eyebrowStyle = { color: '#D4A12A', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500 };

const competencyBoxStyle = {
  padding: '1.25rem 1.5rem',
  border: '1px solid rgba(212,161,42,0.22)',
  borderRadius: '4px',
  backgroundColor: 'rgba(245,239,224,0.015)',
  marginTop: '1.5rem',
};

const disclaimerBoxStyle = {
  padding: '1.4rem 1.6rem',
  border: '1px solid rgba(212,161,42,0.28)',
  borderRadius: '4px',
  backgroundColor: 'rgba(212,161,42,0.05)',
  marginTop: '1.5rem',
};

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

function renderParagraphs(paragraphs) {
  if (!Array.isArray(paragraphs)) return null;
  return paragraphs.map((p, i) => (
    <p key={i} className="font-body" style={{ ...bodyText, marginBottom: '1.15rem' }}>
      {p}
    </p>
  ));
}

function renderObjectives(items) {
  return (
    <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem' }}>
      {items.map((o, i) => (
        <li key={i} style={{ marginBottom: '0.7rem' }}>{o}</li>
      ))}
    </ol>
  );
}

/**
 * MhModule2Lesson — Stage 1 foundational content renderer for Module 2
 * of "Mental Health, Community and Culture" ("Stress, Stigma, and
 * Strength").
 *
 * SCOPE (Stage 1 only — do not regress):
 *   Renders ONLY the introductory material the backend returns for
 *   Module 2 at this stage: the public module overview + competency,
 *   and the learning objectives + the early educational disclaimer.
 *   Every other section (core media, questions to consider, Tamu
 *   Academy introduction, the nine explanation sections, key concepts,
 *   the comparative case study, the interactive scenario, the
 *   Strength Without Silence Lab, private reflection, the knowledge
 *   check, closing content, completion requirements, sources, and the
 *   optional extended assignment) is intentionally NOT rendered here
 *   and must not appear until its own approved stage. No placeholder,
 *   abbreviation, or invented preview of deferred sections is shown.
 *
 * PRIVACY & TRUST BOUNDARY:
 *   This component never hard-codes protected curriculum wording. All
 *   lesson text arrives via the `lesson` prop, selected for module-2
 *   by MhModuleRoutePage from the authenticated `getMentalHealthModule`
 *   backend response. No answer key, correct-answer index, scenario
 *   answer, lab response, reflection response, or facilitator note is
 *   referenced here — none of those fields exist on the Stage 1 lesson
 *   object.
 *
 * ACCESS:
 *   The module remains unpublished and enrollment remains closed.
 *   This component renders content only for viewers the backend has
 *   already cleared (authorized administrators during development);
 *   MhModuleRoutePage falls back to MhModuleShell on any 403/404.
 *
 * RECORDS:
 *   Opening this page does not create or update a CourseEnrollment,
 *   ModuleProgress, or QuizAttempt record. Stage 1 makes no
 *   acknowledgment or completion call and references no quiz or
 *   scenario component.
 */
export default function MhModule2Lesson({ course, module: mod, lesson }) {
  const coursePath = `/courses/${course.slug}`;
  const modulePath = `${coursePath}/${mod.route}`;
  const moduleIndex = course.modules.findIndex((m) => m.route === mod.route);
  const prevModule = moduleIndex > 0 ? course.modules[moduleIndex - 1] : null;
  const nextModule =
    moduleIndex >= 0 && moduleIndex < course.modules.length - 1
      ? course.modules[moduleIndex + 1]
      : null;

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

      <header style={{ marginBottom: '3rem' }}>
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
        <p className="font-body" style={{ color: 'rgba(245,239,224,0.55)', fontSize: '0.82rem', letterSpacing: '0.06em', marginBottom: '0.6rem' }}>
          Learning area: {course.learningArea}
        </p>
        <p className="font-body" style={{ color: 'rgba(245,239,224,0.55)', fontSize: '0.82rem', letterSpacing: '0.06em', marginBottom: '1.5rem' }}>
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

      <PageSection id="module-overview" eyebrow="Overview" heading="Public Module Overview">
        {renderParagraphs(lesson.moduleOverview.paragraphs)}
        <div style={competencyBoxStyle}>
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>
            Module Competency
          </span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>
            {lesson.moduleOverview.competency}
          </p>
        </div>
      </PageSection>

      <PageSection id="learning-objectives" eyebrow="Objectives" heading="Learning Objectives">
        {renderObjectives(lesson.learningObjectives.objectives)}
        <div style={disclaimerBoxStyle} aria-label="Required educational disclaimer">
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>
            Educational disclaimer
          </span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>
            {lesson.learningObjectives.earlyDisclaimer}
          </p>
        </div>
      </PageSection>

      <nav aria-label="Module navigation" style={{ paddingTop: '2.5rem', borderTop: '1px solid rgba(212,161,42,0.12)' }}>
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