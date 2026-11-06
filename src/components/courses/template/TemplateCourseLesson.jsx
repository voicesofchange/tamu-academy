import React from 'react';
import PageMeta from '@/components/seo/PageMeta';
import ModuleLessonLayout from '@/components/courses/module/ModuleLessonLayout';
import ModuleLessonSection from '@/components/courses/module/ModuleLessonSection';
import ModuleBreadcrumbs from '@/components/courses/module/ModuleBreadcrumbs';
import ModuleProgressBar from '@/components/courses/module/ModuleProgressBar';
import ModuleNav from '@/components/courses/module/ModuleNav';
import ModuleTextSection from '@/components/courses/module/ModuleTextSection';
import ModuleHero from '@/components/courses/module/ModuleHero';
import TemplateCourseQuiz from '@/components/courses/template/TemplateCourseQuiz';
import TemplateCourseProgress from '@/components/courses/template/TemplateCourseProgress';
import ModuleSources from '@/components/courses/module/ModuleSources';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';
import { fillTemplate } from '@/lib/i18n/fill-template';

const bodyText = { color: 'rgba(243,234,216,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };
const linkStyle = {
  color: '#e8b85b',
  fontSize: '0.86rem',
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
};

const CONTENT = {
  recordedMaterial: 'Recorded material',
  watch: 'Watch',
  whatYouWillLearn: 'What you will learn',
  whatYoullLearn: 'What You\u2019ll Learn',
  theLesson: 'The lesson',
  theLessonHeading: 'The Lesson',
  pauseAndThink: 'Pause and think',
  tryIt: 'Try it',
  tryItHeading: 'Try It',
  keyTerms: 'Key terms',
  keyTermsHeading: 'Key Terms',
  knowledgeCheck: 'Knowledge check',
  knowledgeCheckHeading: 'Knowledge Check',
  reflection: 'Reflection',
  requirements: 'Requirements',
  requirementsHeading: 'Completion Requirements',
  nextModule: 'Next: {number} \u2014 {title}',
  modulesComplete: 'Course modules complete',
  allComplete: 'All modules complete',
  certificateReady: 'Your course certificate is ready when you are.',
  sourcesEyebrow: 'Sources',
  sourcesHeading: 'Sources',
  unsourcedHeading: 'Unsourced claims',
  unsourcedNote:
    'The lesson makes the following points without a published source. They are listed here rather than given a citation.',
};

/**
 * TemplateCourseLesson — the one lesson layout every course built with the
 * course template renders. The order is fixed, and a step the module does not
 * carry is simply absent:
 *
 *   header, recorded material, goals, the lesson, the activity,
 *   key terms, the knowledge check, the reflection, completion requirements,
 *   previous / next navigation.
 *
 * The module arrives from getTemplateCourseModule, which has already stripped
 * the quiz answer keys and translated the content. Only this layout's own
 * labels are translated here; the module's content arrives already translated.
 */
export default function TemplateCourseLesson({ course, module, onRefresh }) {
  const { content: c } = useTranslatedContent('template-course-lesson', CONTENT);
  const moduleIndex = course.modules.findIndex((item) => item.route === module.route);
  const prevModule = moduleIndex > 0 ? course.modules[moduleIndex - 1] : null;
  const nextModule =
    moduleIndex >= 0 && moduleIndex < course.modules.length - 1 ? course.modules[moduleIndex + 1] : null;
  const nextLabel = nextModule
    ? fillTemplate(c.nextModule, { number: nextModule.number, title: nextModule.title })
    : c.modulesComplete;
  const completedCount = course.modules.filter((item) => item.completed).length;
  const isLastModule = !nextModule;

  return (
    <ModuleLessonLayout>
      <PageMeta
        title={`${module.number}: ${module.title} | Tamu Academy`}
        description={`${module.number} of ${course.title}.`}
        path={`/courses/${course.slug}/${module.route}`}
        noindex
      />

      <ModuleBreadcrumbs
        pillar={course.pillar}
        track={course.track}
        course={course.title}
        coursePath="/courses"
        moduleLabel={module.number}
      />
      <ModuleProgressBar current={moduleIndex + 1} total={course.modules.length} completed={completedCount} />

      <ModuleHero
        courseSlug={course.slug}
        eyebrow={`${module.number} \u00b7 ${course.title}`}
        title={module.title}
        subheading={course.track}
        metaItems={module.estimatedTime ? [{ icon: 'Clock', label: module.estimatedTime }] : []}
        progress={{ current: moduleIndex + 1, total: course.modules.length }}
      />

      {module.video && (
        <ModuleLessonSection eyebrow={c.recordedMaterial} heading={module.video.title || c.watch}>
          <p className="font-body" style={{ ...bodyText, marginBottom: '0.85rem' }}>
            <a href={module.video.watchUrl} target="_blank" rel="noopener noreferrer" style={linkStyle}>
              {module.video.title}
            </a>
          </p>
          {module.video.note && (
            <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', color: 'rgba(243,234,216,0.62)', margin: 0 }}>
              {module.video.note}
            </p>
          )}
        </ModuleLessonSection>
      )}

      <ModuleTextSection eyebrow={c.whatYouWillLearn} heading={c.whatYoullLearn} items={module.goals} />

      <ModuleLessonSection eyebrow={c.theLesson} heading={c.theLessonHeading}>
        {(module.lessonSections || []).map((section, sectionIndex) => (
          <div key={sectionIndex} className="workbook-block" style={{ marginBottom: '2.25rem' }}>
            <h3 className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.15rem, 2.4vw, 1.5rem)', fontWeight: 400, margin: '0 0 1rem' }}>
              {section.heading}
            </h3>
            {(section.paragraphs || []).map((paragraph, paragraphIndex) => (
              <p key={paragraphIndex} className="font-body" style={{ ...bodyText, marginBottom: '1rem' }}>{paragraph}</p>
            ))}
            {section.pauseAndThink && (
              <aside
                style={{
                  marginTop: '1.25rem',
                  padding: '1.1rem 1.35rem',
                  border: '1px solid rgba(232,184,91,0.28)',
                  borderRadius: '4px',
                  background: 'rgba(232,184,91,0.05)',
                }}
              >
                <span className="font-body" style={{ display: 'block', color: '#e8b85b', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.5rem' }}>
                  {c.pauseAndThink}
                </span>
                <p className="font-body" style={{ ...bodyText, margin: 0 }}>{section.pauseAndThink}</p>
              </aside>
            )}
          </div>
        ))}
      </ModuleLessonSection>

      {module.activity && (
        <ModuleLessonSection eyebrow={c.tryIt} heading={c.tryItHeading}>
          <p className="font-body" style={{ ...bodyText, marginBottom: '1rem' }}>{module.activity.intro}</p>
          <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.25rem' }}>
            {(module.activity.steps || []).map((step, stepIndex) => (
              <li key={stepIndex} style={{ marginBottom: '0.6rem' }}>{step}</li>
            ))}
          </ol>
        </ModuleLessonSection>
      )}

      {Array.isArray(module.keyTerms) && module.keyTerms.length > 0 && (
        <ModuleLessonSection eyebrow={c.keyTerms} heading={c.keyTermsHeading}>
          <dl style={{ margin: 0 }}>
            {module.keyTerms.map((entry, termIndex) => (
              <div key={termIndex} style={{ marginBottom: '1rem' }}>
                <dt className="font-body" style={{ color: '#f8f0df', fontSize: '0.94rem', fontWeight: 500, margin: 0 }}>
                  {entry.term}
                </dt>
                <dd className="font-body" style={{ ...bodyText, margin: '0.2rem 0 0' }}>{entry.meaning}</dd>
              </div>
            ))}
          </dl>
        </ModuleLessonSection>
      )}

      {module.quiz && (
        <ModuleLessonSection eyebrow={c.knowledgeCheck} heading={c.knowledgeCheckHeading}>
          <TemplateCourseQuiz
            courseSlug={course.slug}
            moduleRoute={module.route}
            quiz={module.quiz}
            onPassed={() => onRefresh && onRefresh()}
          />
        </ModuleLessonSection>
      )}

      {module.reflection && (
        <ModuleLessonSection eyebrow={c.reflection} heading={c.reflection}>
          <p className="font-body" style={{ ...bodyText, margin: 0 }}>{module.reflection}</p>
        </ModuleLessonSection>
      )}

      {((module.sources && module.sources.length > 0) ||
        (module.unsourced && module.unsourced.length > 0)) && (
        <ModuleLessonSection eyebrow={c.sourcesEyebrow} heading={c.sourcesHeading}>
          <ModuleSources
            sources={module.sources}
            unsourced={module.unsourced}
            labels={{ unsourcedHeading: c.unsourcedHeading, unsourcedNote: c.unsourcedNote }}
          />
        </ModuleLessonSection>
      )}

      <ModuleLessonSection eyebrow={c.requirements} heading={c.requirementsHeading}>
        <TemplateCourseProgress
          courseSlug={course.slug}
          moduleRoute={module.route}
          requirements={module.requirements || []}
          progress={module.progress}
          onRefresh={onRefresh}
        />
      </ModuleLessonSection>

      <ModuleNav
        coursePath="/courses"
        courseSlug={course.slug}
        prevModule={prevModule}
        nextModule={nextModule}
        nextLabel={nextLabel}
        endOfCourse={
          isLastModule && module.progress && module.progress.completed
            ? { label: c.allComplete, milestone: c.certificateReady }
            : null
        }
      />
    </ModuleLessonLayout>
  );
}