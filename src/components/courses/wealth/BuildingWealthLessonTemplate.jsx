import React, { useState } from 'react';
import PageMeta from '@/components/seo/PageMeta';
import ModuleLessonLayout from '@/components/courses/module/ModuleLessonLayout';
import ModuleLessonSection from '@/components/courses/module/ModuleLessonSection';
import ModuleBreadcrumbs from '@/components/courses/module/ModuleBreadcrumbs';
import ModuleProgressBar from '@/components/courses/module/ModuleProgressBar';
import ModuleNav from '@/components/courses/module/ModuleNav';
import ModuleTextSection from '@/components/courses/module/ModuleTextSection';
import ModuleHero from '@/components/courses/module/ModuleHero';
import WealthWatchStep from '@/components/courses/wealth/WealthWatchStep';
import WealthWorkedExample from '@/components/courses/wealth/WealthWorkedExample';
import WealthConceptCheck from '@/components/courses/wealth/WealthConceptCheck';
import WealthModuleProgress from '@/components/courses/wealth/WealthModuleProgress';
import ModuleSources from '@/components/courses/module/ModuleSources';
import CoursePlayer from '@/components/courses/player/CoursePlayer';
import { stepAnchorId } from '@/components/courses/player/step-anchors';

const bodyText = { color: 'rgba(243,234,216,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };
const linkStyle = {
  color: '#e8b85b',
  fontSize: '0.86rem',
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
};

/**
 * The module's frame: the shared course player when a `player` is given,
 * otherwise the single reading column. Defined once, outside the template,
 * so the lesson is never remounted on a re-render (a half-answered concept
 * check keeps its answers).
 */
function WealthModuleFrame({ player, moduleRoute, children }) {
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

/**
 * BuildingWealthLessonTemplate — the single lesson structure for every module
 * of Building Wealth Together.
 *
 * All nine modules render through this one template in the course's own
 * rhythm, in one fixed order: the welcome film, what you will learn, watch,
 * the lesson (with its Pause and Think questions), the worked example, Try it,
 * Where you live, the dilemma, the concept check, the reflection, then the
 * completion requirements and navigation. A step a module does not carry is
 * simply absent, so no module swaps in a different order.
 *
 * Module content is fetched from the access-checked `getWealthModule`
 * backend function, so the concept-check answer key never reaches the browser.
 *
 * With a `player` prop ({ course, steps, footer }) the module renders inside
 * the shared course player — outline, progress bar and "Mark Complete &
 * Continue" footer — and the footer completes the module.
 * `onProgressChange` is called whenever a step is saved or the concept check
 * is passed, so the player can refresh. Without `player` the layout is
 * unchanged.
 */
export default function BuildingWealthLessonTemplate({ course, module, player = null, onProgressChange }) {
  const coursePath = `/courses/${course.slug}`;
  const modulePath = `${coursePath}/${module.route}`;
  const moduleIndex = course.modules.findIndex((m) => m.route === module.route);
  const prevModule = moduleIndex > 0 ? course.modules[moduleIndex - 1] : null;
  const nextModule =
    moduleIndex >= 0 && moduleIndex < course.modules.length - 1 ? course.modules[moduleIndex + 1] : null;
  const nextLabel = nextModule
    ? `Next: ${nextModule.number} \u2014 ${nextModule.title}`
    : 'Course modules complete';
  const [quizPassedTrigger, setQuizPassedTrigger] = useState(0);

  const trackLabel = (course.modules.find((m) => m.route === module.route) || {}).trackLabel || course.track;

  return (
    <WealthModuleFrame player={player} moduleRoute={module.route}>
      <PageMeta
        title={`${module.number}: ${module.title} | Tamu Academy`}
        description={`${module.number} of ${course.title}.`}
        path={modulePath}
        noindex
      />

      <ModuleBreadcrumbs
        pillar={course.pillar}
        track={trackLabel}
        course={course.title}
        coursePath={coursePath}
        moduleLabel={module.number}
      />
      {!player && <ModuleProgressBar current={moduleIndex + 1} total={course.modules.length} />}

      <ModuleHero
        courseSlug={course.slug}
        eyebrow={`${module.number} \u00b7 ${course.title}`}
        title={module.title}
        subheading={trackLabel}
        status={module.status}
        metaItems={[{ icon: 'Clock', label: module.estimatedTime }]}
      />

      {/* Welcome to Tamu Academy — the same film opens every module. */}
      {module.welcomeFilm && (
        <ModuleLessonSection id={stepAnchorId('welcome')} eyebrow="Welcome" heading="Welcome to Tamu Academy">
          <p className="font-body" style={{ ...bodyText, marginBottom: '0.85rem' }}>
            <a href={module.welcomeFilm.watchUrl} target="_blank" rel="noopener noreferrer" style={linkStyle}>
              {module.welcomeFilm.title}
            </a>
          </p>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', color: 'rgba(243,234,216,0.62)', margin: 0 }}>
            {module.welcomeFilm.note}
          </p>
        </ModuleLessonSection>
      )}

      <Step id="goals">
        <ModuleTextSection eyebrow="What you will learn" heading="What You'll Learn" items={module.goals} />
      </Step>

      {module.watch && (
        <Step id="watch">
          <WealthWatchStep watch={module.watch} eyebrow="Watch" heading="Watch" />
        </Step>
      )}

      <ModuleLessonSection id={stepAnchorId('lesson')} eyebrow="The lesson" heading="The Lesson">
        {module.lessonSections.map((section, si) => (
          <div key={si} className="workbook-block" style={{ marginBottom: '2.25rem' }}>
            <h3 className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.15rem, 2.4vw, 1.5rem)', fontWeight: 400, margin: '0 0 1rem' }}>
              {section.heading}
            </h3>
            {section.paragraphs.map((para, pi) => (
              <p key={pi} className="font-body" style={{ ...bodyText, marginBottom: '1rem' }}>{para}</p>
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

      <Step id="worked-example">
        <WealthWorkedExample
          workedExample={module.workedExample}
          eyebrow="Worked example"
          heading="Worked Example"
        />
      </Step>

      {module.tryIt && (
        <ModuleLessonSection id={stepAnchorId('try-it')} eyebrow="Try it" heading="Try It">
          <p className="font-body" style={{ ...bodyText, marginBottom: '1rem' }}>{module.tryIt.intro}</p>
          <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.25rem' }}>
            {module.tryIt.steps.map((step, i) => (
              <li key={i} style={{ marginBottom: '0.6rem' }}>{step}</li>
            ))}
          </ol>
        </ModuleLessonSection>
      )}

      <Step id="where-you-live">
        <ModuleTextSection
          eyebrow="Where you live"
          heading="Where You Live"
          items={module.whereYouLive}
        />
      </Step>

      {module.dilemma && (
        <ModuleLessonSection id={stepAnchorId('dilemma')} eyebrow="The dilemma" heading="The Dilemma">
          <h3 className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.15rem, 2.4vw, 1.5rem)', fontWeight: 400, margin: '0 0 0.4rem' }}>
            {module.dilemma.title}
          </h3>
          <span className="font-body" style={{ display: 'block', color: '#e8b85b', fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500, marginBottom: '1.25rem' }}>
            {module.dilemma.location}
          </span>
          {module.dilemma.paragraphs.map((para, i) => (
            <p key={i} className="font-body" style={{ ...bodyText, marginBottom: '1rem' }}>{para}</p>
          ))}
          <div
            style={{
              marginTop: '1.25rem',
              padding: '1.25rem 1.5rem',
              border: '1px solid rgba(232,184,91,0.28)',
              borderRadius: '4px',
              background: 'rgba(243,234,216,0.02)',
            }}
          >
            <span className="font-body" style={{ display: 'block', color: '#e8b85b', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.6rem' }}>
              Your post
            </span>
            <p className="font-body" style={{ ...bodyText, margin: 0 }}>{module.dilemma.prompt}</p>
          </div>
        </ModuleLessonSection>
      )}

      {module.quiz && (
        <ModuleLessonSection id={stepAnchorId('concept-check')} eyebrow="Concept check" heading="Concept Check">
          <WealthConceptCheck
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
          eyebrow="Reflection"
          heading="Reflection"
          items={module.reflection ? [module.reflection] : []}
        />
      </Step>

      {((module.sources && module.sources.length > 0) ||
        (module.unsourced && module.unsourced.length > 0)) && (
        <ModuleLessonSection id={stepAnchorId('sources')} eyebrow="Sources" heading="Sources">
          <ModuleSources
            sources={module.sources}
            unsourced={module.unsourced}
            labels={{
              unsourcedHeading: 'Unsourced claims',
              unsourcedNote:
                'The lesson makes the following points without a published source. They are listed here rather than given a citation.',
            }}
          />
        </ModuleLessonSection>
      )}

      <ModuleLessonSection id={stepAnchorId('requirements')} eyebrow="Requirements" heading="Completion Requirements">
        <WealthModuleProgress
          courseSlug={course.slug}
          moduleRoute={module.route}
          refreshTrigger={quizPassedTrigger}
          showCompleteButton={!player}
          onChange={onProgressChange}
        />
      </ModuleLessonSection>

      <ModuleNav
        coursePath={coursePath}
        courseSlug={course.slug}
        prevModule={prevModule}
        nextModule={nextModule}
        nextLabel={nextLabel}
      />
    </WealthModuleFrame>
  );
}