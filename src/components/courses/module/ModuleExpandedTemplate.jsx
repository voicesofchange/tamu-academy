import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageMeta from '@/components/seo/PageMeta';
import PageLayout from '@/components/page/PageLayout';
import PageSection from '@/components/page/PageSection';
import StatusBadge from '@/components/page/StatusBadge';
import ModuleBreadcrumbs from '@/components/courses/module/ModuleBreadcrumbs';
import ModuleNav from '@/components/courses/module/ModuleNav';
import KnowledgeCheck from '@/components/courses/module/KnowledgeCheck';
import EconomicsModuleProgress from '@/components/courses/EconomicsModuleProgress';
import LessonVideo from '@/components/courses/module/LessonVideo';
import AfricanCaseStudy from '@/components/courses/module/AfricanCaseStudy';
import PolicyChoiceActivity from '@/components/courses/module/PolicyChoiceActivity';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

const bodyText = { color: 'rgba(245,239,224,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };

const CONTENT = {
  moduleCompetency: 'Module Competency',
  estimatedTime: 'Estimated time',
  objectivesEyebrow: 'Objectives',
  objectivesHeading: 'Learning Objectives',
  introEyebrow: 'Lesson Introduction',
  introHeading: 'Tamu Academy Introduction',
  videosEyebrow: 'Lesson Videos',
  videosHeading: 'Recorded Lessons',
  videosIntro: 'These recorded lessons are supporting resources. They are watched through the official YouTube player and do not replace the Tamu Academy written explanation, African context, activities, or assessments that follow.',
  watchEyebrow: 'While You Watch',
  watchHeading: 'Questions to Consider While Watching',
  watchIntro: 'Keep these questions in mind as you watch the recorded lessons.',
  explanationEyebrow: 'Explanation',
  explanationHeading: 'Original Tamu Academy Explanation',
  conceptsEyebrow: 'Concepts',
  conceptsHeading: 'Key Concepts and Definitions',
  examplePrefix: 'Example',
  caseStudyEyebrow: 'Case Study',
  caseStudyHeading: 'African Case Study',
  activityEyebrow: 'Activity',
  purposePrefix: 'Purpose',
  checkEyebrow: 'Check',
  checkHeading: 'Knowledge Check',
  checkIntro: 'Five multiple-choice questions. Answer at least four of the five questions correctly to pass. Feedback appears only after you submit; you can retry the knowledge check at any time.',
  reflectEyebrow: 'Reflect',
  reflectHeading: 'Reflection Prompts',
  requirementsEyebrow: 'Requirements',
  requirementsHeading: 'Completion Requirements',
  closingEyebrow: 'Closing',
  closingHeading: 'Module Closing',
  courseClosingEyebrow: 'Course Closing',
  courseClosingHeading: 'Course Closing',
  sourcesEyebrow: 'Sources',
  sourcesHeading: 'Sources and Further Reading',
  nextPrefix: 'Next',
  courseComplete: 'Course complete',
};

export default function ModuleExpandedTemplate({ course, module }) {
  const { content: c } = useTranslatedContent('econ-module-expanded', CONTENT);
  const coursePath = `/courses/${course.slug}`;
  const modulePath = `${coursePath}/${module.route}`;
  const moduleIndex = course.modules.findIndex((m) => m.route === module.route);
  const prevModule = moduleIndex > 0 ? course.modules[moduleIndex - 1] : null;
  const nextModule =
    moduleIndex >= 0 && moduleIndex < course.modules.length - 1 ? course.modules[moduleIndex + 1] : null;
  const nextLabel = nextModule
    ? `${c.nextPrefix}: ${nextModule.number} — ${nextModule.title}`
    : c.courseComplete;
  const [quizPassedTrigger, setQuizPassedTrigger] = useState(0);

  const media = module.media || {};
  const primaryVideo = media.primary || null;
  const supportingVideos = media.supporting || [];

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

      {/* 1. Lesson title and estimated completion time */}
      <header style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignItems: 'center', marginBottom: '1rem' }}>
          <StatusBadge label={module.number} />
          <StatusBadge label={module.status} />
        </div>
        <h1 className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(1.75rem, 4vw, 2.6rem)', fontWeight: 400, lineHeight: 1.2, margin: '0 0 1rem' }}>
          {module.title}
        </h1>
        <p className="font-body" style={{ color: 'rgba(245,239,224,0.55)', fontSize: '0.82rem', letterSpacing: '0.06em', marginBottom: '1.5rem' }}>
          {c.estimatedTime}: {module.estimatedTime}
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
            {c.moduleCompetency}
          </span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>{module.competency}</p>
        </div>
      </header>

      {/* 2. Learning objectives */}
      {module.learningObjectives && (
        <PageSection eyebrow={c.objectivesEyebrow} heading={c.objectivesHeading}>
          <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem' }}>
            {module.learningObjectives.map((o, i) => (
              <li key={i} style={{ marginBottom: '0.6rem' }}>{o}</li>
            ))}
          </ol>
        </PageSection>
      )}

      {/* 3. Tamu Academy introduction */}
      {module.overview && module.overview.length > 0 && (
        <PageSection eyebrow={c.introEyebrow} heading={c.introHeading}>
          {module.overview.map((para, i) => (
            <p key={i} className="font-body" style={{ ...bodyText, marginBottom: '1.15rem' }}>{para}</p>
          ))}
        </PageSection>
      )}

      {/* 4-6. Video embed + link + attribution */}
      <PageSection eyebrow={c.videosEyebrow} heading={c.videosHeading}>
        <p className="font-body" style={{ ...bodyText, marginBottom: '1.4rem' }}>
          {c.videosIntro}
        </p>
        {primaryVideo && <LessonVideo video={primaryVideo} />}
        {supportingVideos.map((v, i) => (
          <LessonVideo key={v.id || i} video={v} />
        ))}
      </PageSection>

      {/* 7. Questions to consider while watching */}
      {module.watchingQuestions && module.watchingQuestions.length > 0 && (
        <PageSection eyebrow={c.watchEyebrow} heading={c.watchHeading}>
          <p className="font-body" style={{ ...bodyText, marginBottom: '1.15rem', fontStyle: 'italic', color: 'rgba(245,239,224,0.62)' }}>
            {c.watchIntro}
          </p>
          <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem' }}>
            {module.watchingQuestions.map((q, i) => (
              <li key={i} style={{ marginBottom: '0.85rem' }}>{q}</li>
            ))}
          </ol>
        </PageSection>
      )}

      {/* 8. Original Tamu Academy explanation */}
      {module.explanation && module.explanation.length > 0 && (
        <PageSection eyebrow={c.explanationEyebrow} heading={c.explanationHeading}>
          {module.explanation.map((para, i) => (
            <p key={i} className="font-body" style={{ ...bodyText, marginBottom: '1.15rem' }}>{para}</p>
          ))}
        </PageSection>
      )}

      {/* 9. Key concepts and definitions */}
      {module.keyConcepts && (
        <PageSection eyebrow={c.conceptsEyebrow} heading={c.conceptsHeading}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {module.keyConcepts.map((concept) => (
              <div key={concept.term}>
                <h3 className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(1.05rem, 2.2vw, 1.35rem)', fontWeight: 400, lineHeight: 1.3, margin: '0 0 0.6rem' }}>
                  {concept.term}
                </h3>
                <p className="font-body" style={{ ...bodyText, marginBottom: '0.6rem' }}>{concept.definition}</p>
                {concept.example && (
                  <p className="font-body" style={{ ...bodyText, fontSize: '0.88rem', fontStyle: 'italic', color: 'rgba(245,239,224,0.62)', marginBottom: 0 }}>
                    {c.examplePrefix}: {concept.example}
                  </p>
                )}
              </div>
            ))}
          </div>
        </PageSection>
      )}

      {/* 10. African case study */}
      {module.caseStudy && (
        <PageSection eyebrow={c.caseStudyEyebrow} heading={c.caseStudyHeading}>
          <AfricanCaseStudy caseStudy={module.caseStudy} />
        </PageSection>
      )}

      {/* 11. Interactive policy activity */}
      {module.policyActivity && (
        <PageSection eyebrow={c.activityEyebrow} heading={module.policyActivity.title}>
          {module.policyActivity.purpose && (
            <p className="font-body" style={{ ...bodyText, marginBottom: '0.5rem' }}>
              <span style={{ color: 'rgba(212,161,42,0.85)', fontWeight: 500 }}>{c.purposePrefix}: </span>
              {module.policyActivity.purpose}
            </p>
          )}
          <div style={{ height: '1.5rem' }} />
          <PolicyChoiceActivity policyActivity={module.policyActivity} />
        </PageSection>
      )}

      {/* 12 & 13. Knowledge check + feedback */}
      {module.quiz && (
        <PageSection eyebrow={c.checkEyebrow} heading={c.checkHeading}>
          <p className="font-body" style={{ ...bodyText, marginBottom: '1.75rem' }}>
            {c.checkIntro}
          </p>
          <KnowledgeCheck quiz={module.quiz} courseSlug={course.slug} moduleRoute={module.route} onPassed={() => setQuizPassedTrigger((t) => t + 1)} />
        </PageSection>
      )}

      {/* 14. Reflection prompt */}
      {module.reflectionQuestions && module.reflectionQuestions.length > 0 && (
        <PageSection eyebrow={c.reflectEyebrow} heading={c.reflectHeading}>
          <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem' }}>
            {module.reflectionQuestions.map((q, i) => (
              <li key={i} style={{ marginBottom: '0.85rem' }}>{q}</li>
            ))}
          </ol>
        </PageSection>
      )}

      {/* 15. Completion requirements */}
      {module.completionRequirements && module.completionRequirements.length > 0 && (
        <PageSection eyebrow={c.requirementsEyebrow} heading={c.requirementsHeading}>
          <EconomicsModuleProgress courseSlug={course.slug} moduleRoute={module.route} completionRequirements={module.completionRequirements} refreshTrigger={quizPassedTrigger} />
        </PageSection>
      )}

      {/* Module closing */}
      {module.closingText && module.closingText.length > 0 && (
        <PageSection eyebrow={c.closingEyebrow} heading={c.closingHeading}>
          {module.closingText.map((para, i) => (
            <p key={i} className="font-body" style={{ ...bodyText, marginBottom: '1.15rem' }}>{para}</p>
          ))}
        </PageSection>
      )}

      {/* Course closing — final module only */}
      {module.courseClosingText && (
        <PageSection eyebrow={c.courseClosingEyebrow} heading={c.courseClosingHeading}>
          {module.courseClosingText.map((para, i) => (
            <p key={i} className="font-body" style={{ ...bodyText, marginBottom: '1.15rem' }}>{para}</p>
          ))}
        </PageSection>
      )}

      {/* 16. Sources and further learning */}
      {module.sources && module.sources.length > 0 && (
        <PageSection eyebrow={c.sourcesEyebrow} heading={c.sourcesHeading}>
          <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem' }}>
            {module.sources.map((s, i) => (
              <li key={i} style={{ marginBottom: '0.5rem' }}>{s}</li>
            ))}
          </ol>
        </PageSection>
      )}

      {/* 17. Previous and next lesson navigation */}
      <ModuleNav
        coursePath={coursePath}
        courseSlug={course.slug}
        prevModule={prevModule}
        nextModule={nextModule}
        nextLabel={nextLabel}
        endOfCourse={module.endOfCourse}
      />
    </PageLayout>
  );
}