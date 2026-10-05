import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageMeta from '@/components/seo/PageMeta';
import ModuleLessonLayout from '@/components/courses/module/ModuleLessonLayout';
import ModuleLessonSection from '@/components/courses/module/ModuleLessonSection';
import StatusBadge from '@/components/page/StatusBadge';
import ModuleBreadcrumbs from '@/components/courses/module/ModuleBreadcrumbs';
import ModuleProgressBar from '@/components/courses/module/ModuleProgressBar';
import KnowledgeCheck from '@/components/courses/module/KnowledgeCheck';
import SokoContextNotes from '@/components/courses/soko/SokoContextNotes';
import SokoInternationalComparison from '@/components/courses/soko/SokoInternationalComparison';
import SokoActionPlanActivity from '@/components/courses/soko/SokoActionPlanActivity';
import SokoDiscussionPrompt from '@/components/courses/soko/SokoDiscussionPrompt';
import SokoModuleProgress from '@/components/courses/soko/SokoModuleProgress';
import SokoModuleNav from '@/components/courses/soko/SokoModuleNav';
import { useSokoLabels } from '@/components/courses/soko/SokoLabelsProvider';

const bodyText = { color: 'rgba(243,234,216,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };

/**
 * SokoExpandedTemplate — the learning template for Sauti za Soko modules.
 *
 * Structure: lesson title and competency, learning objectives, the Tamu
 * Academy introduction, plain-language context notes for learners meeting
 * Kenyan institutions for the first time, key concepts, the Kiambu market
 * case, the international comparison and its examples, the My Soko Action
 * Plan section, the Kiswahili discussion prompt, the knowledge check,
 * reflection prompts, completion requirements, closing text, sources and
 * navigation.
 *
 * The core lesson and the comparison are visually separated throughout, so
 * the Kenyan case is never diluted by the learner's own context.
 *
 * Every section heading and instruction is read from the pathway label set,
 * so a learner who selects a language reads the whole module in it.
 */
export default function SokoExpandedTemplate({
  course,
  module,
  courseSlug,
  moduleRoute,
  moduleIndex = 0,
  moduleCount = 1,
  prevModule = null,
  prevPath = null,
  nextModule = null,
  nextPath = null,
  nextLabel = 'Next module',
  canSave = false,
  facilitatorSlot = null,
  onActivitySaved,
}) {
  const labels = useSokoLabels();
  const [quizPassedTrigger, setQuizPassedTrigger] = useState(0);
  const coursePath = `/courses/${courseSlug}`;
  const modulePath = courseSlug === course.slug ? `${coursePath}/${moduleRoute}` : null;
  const activity = module.activity;
  const isFacilitatorModule = moduleRoute === 'module-8';

  return (
    <ModuleLessonLayout>
      <PageMeta
        title={`${module.number}: ${module.title} | Tamu Academy`}
        description={module.competency || module.description}
        path={modulePath || `${coursePath}/${moduleRoute}`}
        noindex
      />

      <ModuleBreadcrumbs
        pillar={course.pillar}
        track={course.track}
        course={course.title}
        coursePath={coursePath}
        moduleLabel={module.number}
      />
      {moduleCount > 1 && <ModuleProgressBar current={moduleIndex + 1} total={moduleCount} />}

      {/* 1. Title, status and competency */}
      <header style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignItems: 'center', marginBottom: '1rem' }}>
          <StatusBadge label={module.number} />
          <StatusBadge label={module.status} />
        </div>
        <h1 className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.75rem,4vw,2.6rem)', fontWeight: 400, lineHeight: 1.2, margin: '0 0 1rem' }}>
          {module.title}
        </h1>
        <p className="font-body" style={{ color: 'rgba(243,234,216,0.55)', fontSize: '0.82rem', letterSpacing: '0.06em', marginBottom: '1.5rem' }}>
          {labels.estimatedTimeLabel}: {module.estimatedTime}
        </p>
        <motion.div
          initial={{ opacity: 0, scaleX: 0.4 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          aria-hidden="true"
          style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, transparent, #e8b85b 35%, #e8b85b 50%, #e8b85b 65%, transparent)', marginBottom: '1.75rem', transformOrigin: 'left' }}
        />
        {module.competency && (
          <div style={{ padding: '1.25rem 1.5rem', border: '1px solid rgba(232,184,91,0.22)', borderRadius: '4px', backgroundColor: 'rgba(243,234,216,0.015)' }}>
            <span className="font-body" style={{ color: '#e8b85b', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.5rem' }}>
              {labels.moduleCompetency}
            </span>
            <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>{module.competency}</p>
          </div>
        )}
      </header>

      {/* 2. Learning objectives */}
      {module.learningObjectives && module.learningObjectives.length > 0 && (
        <ModuleLessonSection eyebrow={labels.objectivesEyebrow} heading={labels.objectivesHeading}>
          <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem' }}>
            {module.learningObjectives.map((o, i) => (
              <li key={i} style={{ marginBottom: '0.6rem' }}>{o}</li>
            ))}
          </ol>
        </ModuleLessonSection>
      )}

      {/* 3. Tamu Academy introduction */}
      {module.overview && module.overview.length > 0 && (
        <ModuleLessonSection eyebrow={labels.introEyebrow} heading={labels.introHeading}>
          {module.overview.map((para, i) => (
            <p key={i} className="font-body" style={{ ...bodyText, marginBottom: '1.15rem' }}>{para}</p>
          ))}
        </ModuleLessonSection>
      )}

      {/* 4. Context notes for learners new to the setting */}
      {module.contextNotes && module.contextNotes.length > 0 && (
        <ModuleLessonSection eyebrow={labels.contextEyebrow} heading={labels.contextHeading}>
          <SokoContextNotes notes={module.contextNotes} />
        </ModuleLessonSection>
      )}

      {/* 5. Key concepts */}
      {module.keyConcepts && module.keyConcepts.length > 0 && (
        <ModuleLessonSection eyebrow={labels.conceptsEyebrow} heading={labels.conceptsHeading}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {module.keyConcepts.map((concept) => (
              <div key={concept.term}>
                <h3 className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.05rem,2.2vw,1.35rem)', fontWeight: 400, lineHeight: 1.3, margin: '0 0 0.6rem' }}>
                  {concept.term}
                </h3>
                <p className="font-body" style={{ ...bodyText, marginBottom: '0.6rem' }}>{concept.definition}</p>
                {concept.example && (
                  <p className="font-body" style={{ ...bodyText, fontSize: '0.88rem', fontStyle: 'italic', color: 'rgba(243,234,216,0.62)', marginBottom: 0 }}>
                    {labels.exampleLabel}: {concept.example}
                  </p>
                )}
              </div>
            ))}
          </div>
        </ModuleLessonSection>
      )}

      {/* 6. The Kiambu market case */}
      {module.localCase && (
        <ModuleLessonSection eyebrow={labels.caseEyebrow} heading={module.localCase.title}>
          <p className="font-body" style={{ ...bodyText, fontSize: '0.82rem', letterSpacing: '0.06em', color: 'rgba(232,184,91,0.75)', marginBottom: '1.1rem' }}>
            {module.localCase.location}
          </p>
          {module.localCase.intro && (
            <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', marginBottom: '1.5rem' }}>{module.localCase.intro}</p>
          )}
          {Array.isArray(module.localCase.sections) && module.localCase.sections.map((section, si) => (
            <div key={si} style={{ marginBottom: '1.75rem' }}>
              <h3 className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.05rem,2.2vw,1.3rem)', fontWeight: 400, margin: '0 0 0.7rem' }}>
                {section.heading}
              </h3>
              {section.paragraphs.map((para, pi) => (
                <p key={pi} className="font-body" style={{ ...bodyText, marginBottom: '1rem' }}>{para}</p>
              ))}
            </div>
          ))}
          {Array.isArray(module.localCase.takeaways) && module.localCase.takeaways.length > 0 && (
            <div style={{ padding: '1.35rem 1.6rem', border: '1px solid rgba(232,184,91,0.22)', borderRadius: '4px', backgroundColor: 'rgba(232,184,91,0.035)', marginTop: '1.5rem' }}>
              <span className="font-body" style={{ color: '#e8b85b', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.75rem' }}>
                {labels.caseTakeawaysLabel}
              </span>
              <ul className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.35rem' }}>
                {module.localCase.takeaways.map((t, i) => (
                  <li key={i} style={{ marginBottom: '0.5rem' }}>{t}</li>
                ))}
              </ul>
            </div>
          )}
        </ModuleLessonSection>
      )}

      {/* 7. International comparison and global examples */}
      {module.internationalComparison && (
        <ModuleLessonSection eyebrow={labels.comparisonEyebrow} heading={labels.comparisonHeading}>
          <SokoInternationalComparison comparison={module.internationalComparison} />
        </ModuleLessonSection>
      )}

      {/* 8. My Soko Action Plan section (or the facilitator record) */}
      {isFacilitatorModule && facilitatorSlot ? (
        <ModuleLessonSection eyebrow={labels.facilitatorRecordEyebrow} heading={labels.facilitatorRecordHeading}>
          {facilitatorSlot}
        </ModuleLessonSection>
      ) : activity ? (
        <ModuleLessonSection eyebrow={labels.actionPlanEyebrow} heading={activity.title}>
          <SokoActionPlanActivity
            courseSlug={courseSlug}
            moduleRoute={moduleRoute}
            activity={activity}
            canSave={canSave}
            onSaved={onActivitySaved}
          />
        </ModuleLessonSection>
      ) : null}

      {/* 9. Kiswahili discussion prompt */}
      {module.kiswahiliPrompt && (
        <ModuleLessonSection eyebrow={labels.discussionEyebrow} heading={labels.discussionHeading}>
          <SokoDiscussionPrompt
            courseSlug={courseSlug}
            moduleRoute={moduleRoute}
            prompt={module.kiswahiliPrompt}
            canSave={canSave}
          />
        </ModuleLessonSection>
      )}

      {/* 10. Knowledge check */}
      {module.quiz && (
        <ModuleLessonSection eyebrow={labels.checkEyebrow} heading={labels.checkHeading}>
          <p className="font-body" style={{ ...bodyText, marginBottom: '1.75rem' }}>
            {labels.checkIntro}
          </p>
          <KnowledgeCheck
            quiz={module.quiz}
            courseSlug={courseSlug}
            moduleRoute={moduleRoute}
            graderFunction="checkSokoKnowledgeCheck"
            onPassed={() => setQuizPassedTrigger((t) => t + 1)}
          />
        </ModuleLessonSection>
      )}

      {/* 11. Reflection prompts */}
      {module.reflectionQuestions && module.reflectionQuestions.length > 0 && (
        <ModuleLessonSection eyebrow={labels.reflectEyebrow} heading={labels.reflectHeading}>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', color: 'rgba(243,234,216,0.6)', fontSize: '0.88rem', marginBottom: '1.1rem' }}>
            {labels.reflectIntro}
          </p>
          <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem' }}>
            {module.reflectionQuestions.map((q, i) => (
              <li key={i} style={{ marginBottom: '0.85rem' }}>{q}</li>
            ))}
          </ol>
        </ModuleLessonSection>
      )}

      {/* 12. Completion requirements */}
      {Array.isArray(module.completionRequirements) && module.completionRequirements.length > 0 && (
        <ModuleLessonSection eyebrow={labels.requirementsEyebrow} heading={labels.requirementsHeading}>
          <SokoModuleProgress
            courseSlug={courseSlug}
            moduleRoute={moduleRoute}
            completionRequirements={module.completionRequirements}
            activityLabel={isFacilitatorModule
              ? labels.requirementActivityFacilitator
              : labels.requirementActivityCore}
            refreshTrigger={quizPassedTrigger}
          />
        </ModuleLessonSection>
      )}

      {/* 13. Module closing */}
      {module.closingText && module.closingText.length > 0 && (
        <ModuleLessonSection eyebrow={labels.closingEyebrow} heading={labels.closingHeading}>
          {module.closingText.map((para, i) => (
            <p key={i} className="font-body" style={{ ...bodyText, marginBottom: '1.15rem' }}>{para}</p>
          ))}
        </ModuleLessonSection>
      )}

      {/* Course closing — final module only */}
      {module.courseClosingText && (
        <ModuleLessonSection eyebrow={labels.courseClosingEyebrow} heading={labels.courseClosingHeading}>
          {module.courseClosingText.map((para, i) => (
            <p key={i} className="font-body" style={{ ...bodyText, marginBottom: '1.15rem' }}>{para}</p>
          ))}
        </ModuleLessonSection>
      )}

      {/* 14. Sources */}
      {module.sources && module.sources.length > 0 && (
        <ModuleLessonSection eyebrow={labels.sourcesEyebrow} heading={labels.sourcesHeading}>
          <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem' }}>
            {module.sources.map((s, i) => (
              <li key={i} style={{ marginBottom: '0.5rem' }}>{s}</li>
            ))}
          </ol>
        </ModuleLessonSection>
      )}

      {/* 15. Navigation */}
      <SokoModuleNav
        coursePath={coursePath}
        prevModule={prevModule}
        prevPath={prevPath}
        nextModule={nextModule}
        nextPath={nextPath}
        nextLabel={nextLabel}
        endOfCourse={module.endOfCourse}
      />
    </ModuleLessonLayout>
  );
}