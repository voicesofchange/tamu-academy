import React from 'react';
import PageMeta from '@/components/seo/PageMeta';
import ModuleLessonLayout from '@/components/courses/module/ModuleLessonLayout';
import ModuleLessonSection from '@/components/courses/module/ModuleLessonSection';
import ModuleTextSection from '@/components/courses/module/ModuleTextSection';
import ModuleBreadcrumbs from '@/components/courses/module/ModuleBreadcrumbs';
import ModuleProgressBar from '@/components/courses/module/ModuleProgressBar';
import ModuleNav from '@/components/courses/module/ModuleNav';
import EconomicsLessonHeader from '@/components/courses/module/EconomicsLessonHeader';
import WaiyakiModuleBody from '@/components/courses/waiyaki/WaiyakiModuleBody';
import WaiyakiKeyTerms from '@/components/courses/waiyaki/WaiyakiKeyTerms';
import WaiyakiSourceAnalysis from '@/components/courses/waiyaki/WaiyakiSourceAnalysis';
import WaiyakiReflection from '@/components/courses/waiyaki/WaiyakiReflection';
import WaiyakiModuleProgress from '@/components/courses/waiyaki/WaiyakiModuleProgress';
import { WAIYAKI_COURSE } from '@/lib/waiyaki-tracks';

const CONTENT = {
  moduleFocus: 'Module Focus',
  estimatedTime: 'Estimated time',
  objectivesEyebrow: 'Objectives',
  objectivesHeading: 'Learning Objectives',
  introEyebrow: 'Introduction',
  introHeading: 'Lesson Introduction',
  mediaEyebrow: 'Recorded Lessons',
  mediaHeading: 'Recorded Lessons',
  mediaIntro:
    'The companion recording supports this module. It is not played here, so the module reads completely without it on a slow connection. The written lesson follows.',
  lessonEyebrow: 'Lesson',
  conceptsEyebrow: 'Concepts',
  conceptsHeading: 'Key Terms',
  sourcesEyebrow: 'Sources',
  sourcesHeading: 'Working with the Sources',
  reflectEyebrow: 'Reflect',
  reflectHeading: 'Reflection Questions',
  requirementsEyebrow: 'Requirements',
  requirementsHeading: 'Completion Requirements',
  closingEyebrow: 'Closing',
  closingHeading: 'Module Closing',
  closingText:
    'Every claim in this module carries the guide\u2019s evidence label: documented, tradition or contested. Where the record and the oral tradition disagree, the course sets both before you rather than choosing for you.',
};

/**
 * WaiyakiModuleTemplate — the lesson page for one module of the course.
 *
 * It renders through the same shared lesson shell and the same fixed section
 * order as every other Tamu Academy course: header, objectives, introduction,
 * recorded lessons, written lesson, key terms, source work, reflection,
 * completion requirements, module closing, then navigation. Waiyaki-specific
 * material — the evidence labels, the source-analysis exercise and the
 * reflection prompts — sits inside that shared structure rather than replacing
 * it.
 *
 * Text-first by design: nothing is embedded and nothing needs downloading, so
 * the module is complete on a slow connection.
 */
export default function WaiyakiModuleTemplate({
  module,
  moduleRoute,
  moduleIndex,
  moduleCount,
  prevModule,
  nextModule,
  nextLabel,
  endOfCourse,
  completedKeys,
  moduleCompleted,
  completedCount,
  canSave,
  savingKey,
  completing,
  onAcknowledge,
  onComplete,
  message,
}) {
  const coursePath = `/courses/${WAIYAKI_COURSE.slug}`;
  const keys = completedKeys || [];
  const sections = module.sections || [];
  const isLastModule = moduleIndex === moduleCount - 1;

  return (
    <ModuleLessonLayout>
      <PageMeta
        title={`${module.number}: ${module.title} | Tamu Academy`}
        description={module.lead ? module.lead.slice(0, 155) : WAIYAKI_COURSE.description}
        path={`${coursePath}/${moduleRoute}`}
        noindex
      />

      <ModuleBreadcrumbs
        pillar={WAIYAKI_COURSE.pillar}
        track={WAIYAKI_COURSE.track}
        course={WAIYAKI_COURSE.title}
        coursePath={coursePath}
        moduleLabel={module.number}
      />

      <ModuleProgressBar current={moduleIndex + 1} total={moduleCount} completed={completedCount} />

      <EconomicsLessonHeader
        module={{ ...module, competency: module.subtitle }}
        competencyLabel={CONTENT.moduleFocus}
        estimatedTimeLabel={CONTENT.estimatedTime}
      />

      <ModuleTextSection
        eyebrow={CONTENT.objectivesEyebrow}
        heading={CONTENT.objectivesHeading}
        items={module.learningObjectives}
      />

      <ModuleTextSection
        eyebrow={CONTENT.introEyebrow}
        heading={CONTENT.introHeading}
        paragraphs={module.lead ? [module.lead] : undefined}
      />

      <ModuleTextSection
        eyebrow={CONTENT.mediaEyebrow}
        heading={CONTENT.mediaHeading}
        intro={CONTENT.mediaIntro}
        items={module.companionVideo ? [`Companion recording: ${module.companionVideo}`] : undefined}
        ordered={false}
      />

      {sections.map((section, i) => (
        <ModuleLessonSection
          key={section.heading}
          eyebrow={i === 0 ? CONTENT.lessonEyebrow : undefined}
          heading={section.heading}
        >
          <WaiyakiModuleBody section={section} />
        </ModuleLessonSection>
      ))}

      {Array.isArray(module.keyTerms) && module.keyTerms.length > 0 && (
        <ModuleLessonSection eyebrow={CONTENT.conceptsEyebrow} heading={CONTENT.conceptsHeading}>
          <WaiyakiKeyTerms terms={module.keyTerms} />
        </ModuleLessonSection>
      )}

      {module.sourceAnalysis && (
        <ModuleLessonSection
          eyebrow={CONTENT.sourcesEyebrow}
          heading={module.sourceAnalysis.heading || CONTENT.sourcesHeading}
        >
          <WaiyakiSourceAnalysis
            analysis={module.sourceAnalysis}
            acknowledged={keys.includes('source_analysis_acknowledged')}
            canSave={canSave}
          />
        </ModuleLessonSection>
      )}

      {module.reflection && module.reflection.groups && module.reflection.groups.length > 0 && (
        <ModuleLessonSection eyebrow={CONTENT.reflectEyebrow} heading={CONTENT.reflectHeading}>
          <WaiyakiReflection
            reflection={module.reflection}
            acknowledged={keys.includes('reflection_acknowledged')}
            canSave={canSave}
          />
        </ModuleLessonSection>
      )}

      <ModuleLessonSection eyebrow={CONTENT.requirementsEyebrow} heading={CONTENT.requirementsHeading}>
        <WaiyakiModuleProgress
          completedKeys={keys}
          moduleCompleted={moduleCompleted}
          canSave={canSave}
          savingKey={savingKey}
          completing={completing}
          onAcknowledge={onAcknowledge}
          onComplete={onComplete}
          completionPath={isLastModule ? `${coursePath}/completion` : null}
          message={message}
        />
      </ModuleLessonSection>

      <ModuleTextSection
        eyebrow={CONTENT.closingEyebrow}
        heading={CONTENT.closingHeading}
        paragraphs={[CONTENT.closingText]}
      />

      <ModuleNav
        coursePath={coursePath}
        courseSlug={WAIYAKI_COURSE.slug}
        prevModule={prevModule}
        nextModule={nextModule}
        nextLabel={nextLabel}
        endOfCourse={endOfCourse}
      />
    </ModuleLessonLayout>
  );
}