import React, { useState } from 'react';
import PageMeta from '@/components/seo/PageMeta';
import ModuleLessonLayout from '@/components/courses/module/ModuleLessonLayout';
import ModuleLessonSection from '@/components/courses/module/ModuleLessonSection';
import ModuleBreadcrumbs from '@/components/courses/module/ModuleBreadcrumbs';
import ModuleProgressBar from '@/components/courses/module/ModuleProgressBar';
import ModuleNav from '@/components/courses/module/ModuleNav';
import KnowledgeCheck from '@/components/courses/module/KnowledgeCheck';
import EconomicsModuleProgress from '@/components/courses/EconomicsModuleProgress';
import AfricanCaseStudy from '@/components/courses/module/AfricanCaseStudy';
import ModuleTextSection from '@/components/courses/module/ModuleTextSection';
import EconomicsKeyConcepts from '@/components/courses/module/EconomicsKeyConcepts';
import EconomicsMediaSection, { normalizeLessonVideos } from '@/components/courses/module/EconomicsMediaSection';
import ModuleHero from '@/components/courses/module/ModuleHero';
import EconomicsAppliedActivity from '@/components/courses/module/EconomicsAppliedActivity';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';
import CoursePlayer from '@/components/courses/player/CoursePlayer';
import { stepAnchorId } from '@/components/courses/player/step-anchors';

const bodyText = { color: 'rgba(243,234,216,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };

const tpl = (str, vars) => str.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');

/**
 * The module's frame: the shared course player when a `player` is given,
 * otherwise the single reading column. Defined once, outside the template,
 * so the lesson is never remounted on a re-render (a half-answered knowledge
 * check keeps its answers).
 */
function EconomicsModuleFrame({ player, moduleRoute, children }) {
  if (!player) return <ModuleLessonLayout>{children}</ModuleLessonLayout>;
  return (
    <CoursePlayer course={player.course} currentRoute={moduleRoute} steps={player.steps} footer={player.footer}>
      {children}
    </CoursePlayer>
  );
}

/** An anchor the course player's outline can jump to. */
function Step({ id, children }) {
  return <div id={stepAnchorId(id)}>{children}</div>;
}

const CONTENT = {
  moduleCompetency: 'Module Competency',
  estimatedTime: 'Estimated time',
  objectivesEyebrow: 'Objectives',
  objectivesHeading: 'Learning Objectives',
  introEyebrow: 'Introduction',
  introHeading: 'Lesson Introduction',
  mediaEyebrow: 'Recorded Lessons',
  mediaHeading: 'Recorded Lessons',
  mediaIntro:
    'These recorded lessons are supporting resources. They are watched through the official YouTube player and do not replace the Tamu Academy written lesson, case material, activity, or knowledge check that follow.',
  videoComingSoon: 'Recorded lesson coming soon.',
  watchEyebrow: 'While You Watch',
  watchHeading: 'Questions to Consider While Watching',
  watchIntro: 'Keep these questions in mind as you watch the recorded lessons.',
  explanationEyebrow: 'Lesson',
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
  checkIntro:
    'Passing requires at least {passingScore} of the {gradedCount} graded questions correct{writtenClause}. Every question can be attempted again, and feedback appears only after you submit.',
  checkWrittenClause: ' and a completed written response',
  reflectEyebrow: 'Reflect',
  reflectHeading: 'Reflection Questions',
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
  courseComplete: 'Course complete',
};

/**
 * EconomicsLessonTemplate — the single lesson structure for every module of
 * Understanding African Economies and the Global System.
 *
 * All six modules render through this one template in one fixed order:
 * header, learning objectives, lesson introduction, recorded lessons,
 * questions to consider while watching, written explanation, key concepts,
 * case study, applied activity, knowledge check, reflection questions,
 * completion requirements, module closing, course closing, then sources and
 * navigation. A section a module does not record is simply absent, so no
 * module swaps in a different layout or a different order.
 *
 * Module content itself is untouched: it is still fetched from the
 * role-gated getModuleContent backend function, the quiz answer key never
 * reaches the browser, and progress, completion and navigation continue to
 * run through the same shared components as before.
 *
 * With a `player` prop ({ course, steps, footer }) the module renders inside
 * the shared course player — outline, progress bar and "Mark Complete &
 * Continue" footer — and the footer completes the module.
 * `onProgressChange` is called whenever a step is saved or the knowledge
 * check is passed, so the player can refresh. Without `player` the layout is
 * unchanged.
 */
export default function EconomicsLessonTemplate({ course, module, player = null, onProgressChange }) {
  const { content: c } = useTranslatedContent('econ-lesson-template', CONTENT);
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
  // A module that carries no recording shows no recorded-lessons block and no
  // "while you watch" questions: sections about media that does not exist are
  // omitted rather than left standing empty.
  const hasMedia = normalizeLessonVideos(module).length > 0;

  const quizQuestions = (module.quiz && module.quiz.questions) || [];
  const gradedCount = quizQuestions.filter((q) => !q.written).length;
  const hasWrittenQuestion = quizQuestions.some((q) => q.written);

  return (
    <EconomicsModuleFrame player={player} moduleRoute={module.route}>
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
      {!player && <ModuleProgressBar current={moduleIndex + 1} total={course.modules.length} />}

      <ModuleHero
        courseSlug={course.slug}
        eyebrow={`${module.number} · ${course.title}`}
        title={module.title}
        subheading={module.competency}
        status={module.status}
        metaItems={[{ icon: 'Clock', label: `${c.estimatedTime}: ${module.estimatedTime}` }]}
      />

      <Step id="objectives">
        <ModuleTextSection
          eyebrow={c.objectivesEyebrow}
          heading={c.objectivesHeading}
          items={module.learningObjectives}
        />
      </Step>

      <Step id="introduction">
        <ModuleTextSection
          eyebrow={c.introEyebrow}
          heading={c.introHeading}
          paragraphs={module.overview}
        />
      </Step>

      {hasMedia && (
        <Step id="media">
          <EconomicsMediaSection
            module={module}
            eyebrow={c.mediaEyebrow}
            heading={c.mediaHeading}
            intro={c.mediaIntro}
          />
        </Step>
      )}

      {hasMedia && (
        <Step id="while-watching">
          <ModuleTextSection
            eyebrow={c.watchEyebrow}
            heading={c.watchHeading}
            intro={c.watchIntro}
            items={module.watchingQuestions}
          />
        </Step>
      )}

      <Step id="explanation">
        <ModuleTextSection
          eyebrow={c.explanationEyebrow}
          heading={c.explanationHeading}
          paragraphs={module.explanation}
        />
      </Step>

      {Array.isArray(module.keyConcepts) && module.keyConcepts.length > 0 && (
        <ModuleLessonSection id={stepAnchorId('concepts')} eyebrow={c.conceptsEyebrow} heading={c.conceptsHeading}>
          <EconomicsKeyConcepts concepts={module.keyConcepts} examplePrefix={c.examplePrefix} />
        </ModuleLessonSection>
      )}

      {module.caseStudy && (
        <ModuleLessonSection id={stepAnchorId('case-study')} eyebrow={c.caseStudyEyebrow} heading={c.caseStudyHeading}>
          <AfricanCaseStudy caseStudy={module.caseStudy} />
        </ModuleLessonSection>
      )}

      <Step id="activity">
        <EconomicsAppliedActivity
          module={module}
          courseSlug={course.slug}
          eyebrow={c.activityEyebrow}
          purposePrefix={c.purposePrefix}
        />
      </Step>

      {module.quiz && (
        <ModuleLessonSection id={stepAnchorId('knowledge-check')} eyebrow={c.checkEyebrow} heading={c.checkHeading}>
          <p className="font-body" style={{ ...bodyText, marginBottom: '1.75rem' }}>
            {tpl(c.checkIntro, {
              passingScore: module.quiz.passingScore,
              gradedCount,
              writtenClause: hasWrittenQuestion ? c.checkWrittenClause : '',
            })}
          </p>
          <KnowledgeCheck
            quiz={module.quiz}
            courseSlug={course.slug}
            moduleRoute={module.route}
            onPassed={() => {
              setQuizPassedTrigger((t) => t + 1);
              if (onProgressChange) onProgressChange();
            }}
          />
        </ModuleLessonSection>
      )}

      <Step id="reflection">
        <ModuleTextSection
          eyebrow={c.reflectEyebrow}
          heading={c.reflectHeading}
          items={module.reflectionQuestions}
        />
      </Step>

      {Array.isArray(module.completionRequirements) && module.completionRequirements.length > 0 && (
        <ModuleLessonSection id={stepAnchorId('requirements')} eyebrow={c.requirementsEyebrow} heading={c.requirementsHeading}>
          <EconomicsModuleProgress
            courseSlug={course.slug}
            moduleRoute={module.route}
            completionRequirements={module.completionRequirements}
            refreshTrigger={quizPassedTrigger}
            showCompleteButton={!player}
            onChange={onProgressChange}
          />
        </ModuleLessonSection>
      )}

      <Step id="closing">
        <ModuleTextSection
          eyebrow={c.closingEyebrow}
          heading={c.closingHeading}
          paragraphs={module.closingText}
        />
      </Step>

      <ModuleTextSection
        eyebrow={c.courseClosingEyebrow}
        heading={c.courseClosingHeading}
        paragraphs={module.courseClosingText}
      />

      <Step id="sources">
        <ModuleTextSection
          eyebrow={c.sourcesEyebrow}
          heading={c.sourcesHeading}
          items={module.sources}
          placeholder={c.sourcesPlaceholder}
        />
      </Step>

      <ModuleNav
        coursePath={coursePath}
        courseSlug={course.slug}
        prevModule={prevModule}
        nextModule={nextModule}
        nextLabel={nextLabel}
        endOfCourse={module.endOfCourse}
      />
    </EconomicsModuleFrame>
  );
}