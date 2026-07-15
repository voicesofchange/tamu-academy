import React from 'react';
import { motion } from 'framer-motion';
import PageMeta from '@/components/seo/PageMeta';
import PageLayout from '@/components/page/PageLayout';
import PageSection from '@/components/page/PageSection';
import StatusBadge from '@/components/page/StatusBadge';
import ModuleBreadcrumbs from '@/components/courses/module/ModuleBreadcrumbs';
import ModuleNav from '@/components/courses/module/ModuleNav';
import KnowledgeCheck from '@/components/courses/module/KnowledgeCheck';
import DecisionMap from '@/components/courses/module/DecisionMap';

const bodyText = { color: 'rgba(245,239,224,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };

/**
 * Reusable, future-ready module page template. Reuses the existing Tamu
 * Academy layout system (PageLayout, PageSection, StatusBadge, body text
 * styles). Receives course + module data from src/lib/economics-tracks.js.
 */
export default function ModulePageTemplate({ course, module }) {
  const coursePath = `/courses/${course.slug}`;
  const modulePath = `${coursePath}/${module.route}`;
  const moduleIndex = course.modules.findIndex((m) => m.route === module.route);
  const prevModule = moduleIndex > 0 ? course.modules[moduleIndex - 1] : null;
  const nextModule =
    moduleIndex >= 0 && moduleIndex < course.modules.length - 1 ? course.modules[moduleIndex + 1] : null;
  const nextLabel = nextModule ? `Next: ${nextModule.number} — ${nextModule.title}` : 'Next: Module 4';

  return (
    <PageLayout>
      <PageMeta
        title={`${module.number}: ${module.title} | Tamu Academy`}
        description={module.competency}
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

      {/* Module header */}
      <header style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignItems: 'center', marginBottom: '1rem' }}>
          <StatusBadge label={module.number} />
          <StatusBadge label={module.status} />
        </div>
        <h1 className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(1.75rem, 4vw, 2.6rem)', fontWeight: 400, lineHeight: 1.2, margin: '0 0 1rem' }}>
          {module.title}
        </h1>
        <p className="font-body" style={{ color: 'rgba(245,239,224,0.55)', fontSize: '0.82rem', letterSpacing: '0.06em', marginBottom: '1.5rem' }}>
          Estimated time: {module.estimatedTime}
        </p>
        <motion.div
          initial={{ opacity: 0, scaleX: 0.4 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          aria-hidden="true"
          style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, transparent, #D4A12A 35%, #E2B652 50%, #D4A12A 65%, transparent)', marginBottom: '1.75rem', transformOrigin: 'left' }}
        />
        <div style={{ padding: '1.25rem 1.5rem', border: '1px solid rgba(212,161,42,0.22)', borderRadius: '4px', backgroundColor: 'rgba(245,239,224,0.015)' }}>
          <span className="font-body" style={{ color: '#D4A12A', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.5rem' }}>
            Module Competency
          </span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>{module.competency}</p>
        </div>
      </header>

      {/* Video placeholder */}
      <PageSection eyebrow="Video Lesson" heading="Recorded Lesson">
        <div style={{ padding: '3rem 2rem', border: '1px dashed rgba(212,161,42,0.25)', borderRadius: '4px', backgroundColor: 'rgba(245,239,224,0.015)', textAlign: 'center' }}>
          <p className="font-body" style={{ ...bodyText, margin: 0, color: 'rgba(245,239,224,0.6)' }}>
            Recorded lesson coming soon.
          </p>
        </div>
      </PageSection>

      {/* Module overview */}
      <PageSection eyebrow="Overview" heading="Module Overview">
        {module.overview.map((para, i) => (
          <p key={i} className="font-body" style={{ ...bodyText, marginBottom: '1.15rem' }}>{para}</p>
        ))}
      </PageSection>

      {/* Learning objectives */}
      {module.learningObjectives && (
        <PageSection eyebrow="Objectives" heading="Learning Objectives">
          <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem' }}>
            {module.learningObjectives.map((o, i) => (
              <li key={i} style={{ marginBottom: '0.6rem' }}>{o}</li>
            ))}
          </ol>
        </PageSection>
      )}

      {/* Key concepts */}
      <PageSection eyebrow="Concepts" heading="Key Concepts">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {module.keyConcepts.map((c) => (
            <div key={c.term}>
              <h3 className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(1.05rem, 2.2vw, 1.35rem)', fontWeight: 400, lineHeight: 1.3, margin: '0 0 0.6rem' }}>
                {c.term}
              </h3>
              <p className="font-body" style={{ ...bodyText, marginBottom: '0.6rem' }}>{c.definition}</p>
              {c.example && (
                <p className="font-body" style={{ ...bodyText, fontSize: '0.88rem', fontStyle: 'italic', color: 'rgba(245,239,224,0.62)', marginBottom: 0 }}>
                  Example: {c.example}
                </p>
              )}
            </div>
          ))}
        </div>
      </PageSection>

      {/* Reflection questions */}
      <PageSection eyebrow="Reflect" heading="Reflection Questions">
        <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem' }}>
          {module.reflectionQuestions.map((q, i) => (
            <li key={i} style={{ marginBottom: '0.85rem' }}>{q}</li>
          ))}
        </ol>
      </PageSection>

      {/* Knowledge check */}
      <PageSection eyebrow="Check" heading="Knowledge Check">
        <p className="font-body" style={{ ...bodyText, marginBottom: '1.75rem' }}>
          Five questions. Questions 1\u20134 are selectable and automatically scored. Question 5 is a required written application response and is not marked correct or incorrect. Passing requires at least {module.quiz.passingScore} of the {module.quiz.questions.filter((q) => !q.written).length} graded questions correct and a completed Question 5. Feedback appears only after you submit; you can retry Questions 1\u20134 and your Question 5 response will be kept.
        </p>
        <KnowledgeCheck quiz={module.quiz} />
      </PageSection>

      {/* Applied activity */}
      <PageSection eyebrow="Apply" heading={module.activity.title}>
        <p className="font-body" style={{ ...bodyText, marginBottom: '0.5rem' }}>
          <span style={{ color: 'rgba(212,161,42,0.85)', fontWeight: 500 }}>Purpose: </span>
          {module.activity.purpose}
        </p>
        <div style={{ height: '1.75rem' }} />
        <DecisionMap activity={module.activity} storageKey={`tamu-${course.slug}-${module.route}-decisionmap`} />
      </PageSection>

      {/* Completion requirements */}
      <PageSection eyebrow="Requirements" heading="Completion Requirements">
        <ul className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.25rem', listStyle: 'none' }}>
          {module.completionRequirements.map((req, i) => (
            <li key={i} style={{ marginBottom: '0.6rem', position: 'relative', paddingLeft: '1.4rem' }}>
              <span aria-hidden="true" style={{ position: 'absolute', left: 0, color: 'rgba(212,161,42,0.6)' }}>&#9633;</span>
              {req}
            </li>
          ))}
        </ul>
      </PageSection>

      {/* Closing text */}
      <PageSection eyebrow="Closing" heading="Module Closing">
        {module.closingText.map((para, i) => (
          <p key={i} className="font-body" style={{ ...bodyText, marginBottom: '1.15rem' }}>{para}</p>
        ))}
      </PageSection>

      {/* Sources placeholder */}
      <PageSection eyebrow="Sources" heading="Sources and Further Reading">
        {module.sources && module.sources.length > 0 ? (
          <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem' }}>
            {module.sources.map((s, i) => (<li key={i} style={{ marginBottom: '0.5rem' }}>{s}</li>))}
          </ol>
        ) : (
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', color: 'rgba(245,239,224,0.5)', margin: 0 }}>
            Sources and further reading will be added as this module is finalized.
          </p>
        )}
      </PageSection>

      <ModuleNav
        coursePath={coursePath}
        courseSlug={course.slug}
        prevModule={prevModule}
        nextModule={nextModule}
        nextLabel={nextLabel}
      />
    </PageLayout>
  );
}