import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageMeta from '@/components/seo/PageMeta';
import ModuleLessonLayout from '@/components/courses/module/ModuleLessonLayout';
import ModuleLessonSection from '@/components/courses/module/ModuleLessonSection';
import StatusBadge from '@/components/page/StatusBadge';
import ModuleBreadcrumbs from '@/components/courses/module/ModuleBreadcrumbs';
import ModuleNav from '@/components/courses/module/ModuleNav';
import KnowledgeCheck from '@/components/courses/module/KnowledgeCheck';
import EconomicsModuleProgress from '@/components/courses/EconomicsModuleProgress';
import DecisionMap from '@/components/courses/module/DecisionMap';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

const bodyText = { color: 'rgba(243,234,216,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };

const tpl = (str, vars) => str.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');

const CONTENT = {
  moduleCompetency: 'Module Competency',
  estimatedTime: 'Estimated time',
  videoLessonEyebrow: 'Video Lesson',
  videoLessonHeading: 'Recorded Lesson',
  videoComingSoon: 'Recorded lesson coming soon.',
  overviewEyebrow: 'Overview',
  overviewHeading: 'Module Overview',
  objectivesEyebrow: 'Objectives',
  objectivesHeading: 'Learning Objectives',
  conceptsEyebrow: 'Concepts',
  conceptsHeading: 'Key Concepts',
  examplePrefix: 'Example',
  reflectEyebrow: 'Reflect',
  reflectHeading: 'Reflection Questions',
  checkEyebrow: 'Check',
  checkHeading: 'Knowledge Check',
  checkIntro: 'Five questions. Questions 1–4 are selectable and automatically scored. Question 5 is a required written application response and is not marked correct or incorrect. Passing requires at least {passingScore} of the {gradedCount} graded questions correct and a completed Question 5. Feedback appears only after you submit; you can retry Questions 1–4 and your Question 5 response will be kept.',
  applyEyebrow: 'Apply',
  purposePrefix: 'Purpose',
  requirementsEyebrow: 'Requirements',
  requirementsHeading: 'Completion Requirements',
  closingEyebrow: 'Closing',
  closingHeading: 'Module Closing',
  courseClosingEyebrow: 'Course Closing',
  courseClosingHeading: 'Course Closing',
  sourcesEyebrow: 'Sources',
  sourcesHeading: 'Sources and Further Reading',
  sourcesPlaceholder: 'Sources and further reading will be added as this module is finalized.',
  nextPrefix: 'Next',
  nextFallback: 'Next: Module 4',
};

export default function ModulePageTemplate({ course, module }) {
  const { content: c } = useTranslatedContent('econ-module-template', CONTENT);
  const coursePath = `/courses/${course.slug}`;
  const modulePath = `${coursePath}/${module.route}`;
  const moduleIndex = course.modules.findIndex((m) => m.route === module.route);
  const prevModule = moduleIndex > 0 ? course.modules[moduleIndex - 1] : null;
  const nextModule =
    moduleIndex >= 0 && moduleIndex < course.modules.length - 1 ? course.modules[moduleIndex + 1] : null;
  const nextLabel = nextModule ? `${c.nextPrefix}: ${nextModule.number} — ${nextModule.title}` : c.nextFallback;
  const [quizPassedTrigger, setQuizPassedTrigger] = useState(0);

  return (
    <ModuleLessonLayout>
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
        <h1 className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.75rem, 4vw, 2.6rem)', fontWeight: 400, lineHeight: 1.2, margin: '0 0 1rem' }}>
          {module.title}
        </h1>
        <p className="font-body" style={{ color: 'rgba(243,234,216,0.55)', fontSize: '0.82rem', letterSpacing: '0.06em', marginBottom: '1.5rem' }}>
          {c.estimatedTime}: {module.estimatedTime}
        </p>
        <motion.div
          initial={{ opacity: 0, scaleX: 0.4 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          aria-hidden="true"
          style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, transparent, #e8b85b 35%, #e8b85b 50%, #e8b85b 65%, transparent)', marginBottom: '1.75rem', transformOrigin: 'left' }}
        />
        <div style={{ padding: '1.25rem 1.5rem', border: '1px solid rgba(232,184,91,0.22)', borderRadius: '4px', backgroundColor: 'rgba(243,234,216,0.015)' }}>
          <span className="font-body" style={{ color: '#e8b85b', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.5rem' }}>
            {c.moduleCompetency}
          </span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>{module.competency}</p>
        </div>
      </header>

      {/* Video lesson */}
      <ModuleLessonSection eyebrow={c.videoLessonEyebrow} heading={c.videoLessonHeading}>
        {module.video ? (
          <>
            <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(232,184,91,0.18)', backgroundColor: '#000000' }}>
              <iframe
                src={module.video.embedUrl}
                title={module.video.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
              />
            </div>
            <p className="font-body" style={{ ...bodyText, marginTop: '1rem', marginBottom: 0, fontStyle: 'italic', color: 'rgba(243,234,216,0.62)' }}>
              {module.video.title}
            </p>
          </>
        ) : (
          <div style={{ padding: '3rem 2rem', border: '1px dashed rgba(232,184,91,0.25)', borderRadius: '4px', backgroundColor: 'rgba(243,234,216,0.015)', textAlign: 'center' }}>
            <p className="font-body" style={{ ...bodyText, margin: 0, color: 'rgba(243,234,216,0.6)' }}>
              {c.videoComingSoon}
            </p>
          </div>
        )}
      </ModuleLessonSection>

      {/* Module overview */}
      <ModuleLessonSection eyebrow={c.overviewEyebrow} heading={c.overviewHeading}>
        {module.overview.map((para, i) => (
          <p key={i} className="font-body" style={{ ...bodyText, marginBottom: '1.15rem' }}>{para}</p>
        ))}
      </ModuleLessonSection>

      {/* Learning objectives */}
      {module.learningObjectives && (
        <ModuleLessonSection eyebrow={c.objectivesEyebrow} heading={c.objectivesHeading}>
          <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem' }}>
            {module.learningObjectives.map((o, i) => (
              <li key={i} style={{ marginBottom: '0.6rem' }}>{o}</li>
            ))}
          </ol>
        </ModuleLessonSection>
      )}

      {/* Key concepts */}
      <ModuleLessonSection eyebrow={c.conceptsEyebrow} heading={c.conceptsHeading}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {module.keyConcepts.map((concept) => (
            <div key={concept.term}>
              <h3 className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.05rem, 2.2vw, 1.35rem)', fontWeight: 400, lineHeight: 1.3, margin: '0 0 0.6rem' }}>
                {concept.term}
              </h3>
              <p className="font-body" style={{ ...bodyText, marginBottom: '0.6rem' }}>{concept.definition}</p>
              {concept.example && (
                <p className="font-body" style={{ ...bodyText, fontSize: '0.88rem', fontStyle: 'italic', color: 'rgba(243,234,216,0.62)', marginBottom: 0 }}>
                  {c.examplePrefix}: {concept.example}
                </p>
              )}
            </div>
          ))}
        </div>
      </ModuleLessonSection>

      {/* Reflection questions */}
      <ModuleLessonSection eyebrow={c.reflectEyebrow} heading={c.reflectHeading}>
        <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem' }}>
          {module.reflectionQuestions.map((q, i) => (
            <li key={i} style={{ marginBottom: '0.85rem' }}>{q}</li>
          ))}
        </ol>
      </ModuleLessonSection>

      {/* Knowledge check */}
      <ModuleLessonSection eyebrow={c.checkEyebrow} heading={c.checkHeading}>
        <p className="font-body" style={{ ...bodyText, marginBottom: '1.75rem' }}>
          {tpl(c.checkIntro, {
            passingScore: module.quiz.passingScore,
            gradedCount: module.quiz.questions.filter((q) => !q.written).length,
          })}
        </p>
        <KnowledgeCheck quiz={module.quiz} courseSlug={course.slug} moduleRoute={module.route} onPassed={() => setQuizPassedTrigger((t) => t + 1)} />
      </ModuleLessonSection>

      {/* Applied activity */}
      <ModuleLessonSection eyebrow={c.applyEyebrow} heading={module.activity.title}>
        <p className="font-body" style={{ ...bodyText, marginBottom: '0.5rem' }}>
          <span style={{ color: 'rgba(232,184,91,0.85)', fontWeight: 500 }}>{c.purposePrefix}: </span>
          {module.activity.purpose}
        </p>
        <div style={{ height: '1.75rem' }} />
        <DecisionMap activity={module.activity} storageKey={`tamu-${course.slug}-${module.route}-decisionmap`} />
      </ModuleLessonSection>

      {/* Completion requirements */}
      <ModuleLessonSection eyebrow={c.requirementsEyebrow} heading={c.requirementsHeading}>
        <EconomicsModuleProgress courseSlug={course.slug} moduleRoute={module.route} completionRequirements={module.completionRequirements} refreshTrigger={quizPassedTrigger} />
      </ModuleLessonSection>

      {/* Closing text */}
      <ModuleLessonSection eyebrow={c.closingEyebrow} heading={c.closingHeading}>
        {module.closingText.map((para, i) => (
          <p key={i} className="font-body" style={{ ...bodyText, marginBottom: '1.15rem' }}>{para}</p>
        ))}
      </ModuleLessonSection>

      {/* Course closing — final module only */}
      {module.courseClosingText && (
        <ModuleLessonSection eyebrow={c.courseClosingEyebrow} heading={c.courseClosingHeading}>
          {module.courseClosingText.map((para, i) => (
            <p key={i} className="font-body" style={{ ...bodyText, marginBottom: '1.15rem' }}>{para}</p>
          ))}
        </ModuleLessonSection>
      )}

      {/* Sources */}
      <ModuleLessonSection eyebrow={c.sourcesEyebrow} heading={c.sourcesHeading}>
        {module.sources && module.sources.length > 0 ? (
          <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem' }}>
            {module.sources.map((s, i) => (<li key={i} style={{ marginBottom: '0.5rem' }}>{s}</li>))}
          </ol>
        ) : (
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', color: 'rgba(243,234,216,0.5)', margin: 0 }}>
            {c.sourcesPlaceholder}
          </p>
        )}
      </ModuleLessonSection>

      <ModuleNav
        coursePath={coursePath}
        courseSlug={course.slug}
        prevModule={prevModule}
        nextModule={nextModule}
        nextLabel={nextLabel}
        endOfCourse={module.endOfCourse}
      />
    </ModuleLessonLayout>
  );
}