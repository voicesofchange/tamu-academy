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

const bodyText = { color: 'rgba(243,234,216,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };
const linkStyle = {
  color: '#e8b85b',
  fontSize: '0.86rem',
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
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
 * the quiz answer keys and translated the content.
 */
export default function TemplateCourseLesson({ course, module, onRefresh }) {
  const moduleIndex = course.modules.findIndex((item) => item.route === module.route);
  const prevModule = moduleIndex > 0 ? course.modules[moduleIndex - 1] : null;
  const nextModule =
    moduleIndex >= 0 && moduleIndex < course.modules.length - 1 ? course.modules[moduleIndex + 1] : null;
  const nextLabel = nextModule
    ? `Next: ${nextModule.number} \u2014 ${nextModule.title}`
    : 'Course modules complete';
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
        <ModuleLessonSection eyebrow="Recorded material" heading={module.video.title || 'Watch'}>
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

      <ModuleTextSection eyebrow="What you will learn" heading="What You'll Learn" items={module.goals} />

      <ModuleLessonSection eyebrow="The lesson" heading="The Lesson">
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
                  Pause and think
                </span>
                <p className="font-body" style={{ ...bodyText, margin: 0 }}>{section.pauseAndThink}</p>
              </aside>
            )}
          </div>
        ))}
      </ModuleLessonSection>

      {module.activity && (
        <ModuleLessonSection eyebrow="Try it" heading="Try It">
          <p className="font-body" style={{ ...bodyText, marginBottom: '1rem' }}>{module.activity.intro}</p>
          <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.25rem' }}>
            {(module.activity.steps || []).map((step, stepIndex) => (
              <li key={stepIndex} style={{ marginBottom: '0.6rem' }}>{step}</li>
            ))}
          </ol>
        </ModuleLessonSection>
      )}

      {Array.isArray(module.keyTerms) && module.keyTerms.length > 0 && (
        <ModuleLessonSection eyebrow="Key terms" heading="Key Terms">
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
        <ModuleLessonSection eyebrow="Knowledge check" heading="Knowledge Check">
          <TemplateCourseQuiz
            courseSlug={course.slug}
            moduleRoute={module.route}
            quiz={module.quiz}
            onPassed={() => onRefresh && onRefresh()}
          />
        </ModuleLessonSection>
      )}

      {module.reflection && (
        <ModuleLessonSection eyebrow="Reflection" heading="Reflection">
          <p className="font-body" style={{ ...bodyText, margin: 0 }}>{module.reflection}</p>
        </ModuleLessonSection>
      )}

      <ModuleLessonSection eyebrow="Requirements" heading="Completion Requirements">
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
            ? { label: 'All modules complete', milestone: 'Your course certificate is ready when you are.' }
            : null
        }
      />
    </ModuleLessonLayout>
  );
}