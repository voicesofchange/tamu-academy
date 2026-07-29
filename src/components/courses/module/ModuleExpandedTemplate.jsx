import React from 'react';
import { motion } from 'framer-motion';
import PageMeta from '@/components/seo/PageMeta';
import PageLayout from '@/components/page/PageLayout';
import PageSection from '@/components/page/PageSection';
import StatusBadge from '@/components/page/StatusBadge';
import ModuleBreadcrumbs from '@/components/courses/module/ModuleBreadcrumbs';
import ModuleNav from '@/components/courses/module/ModuleNav';
import KnowledgeCheck from '@/components/courses/module/KnowledgeCheck';
import LessonVideo from '@/components/courses/module/LessonVideo';
import AfricanCaseStudy from '@/components/courses/module/AfricanCaseStudy';
import PolicyChoiceActivity from '@/components/courses/module/PolicyChoiceActivity';

const bodyText = { color: 'rgba(245,239,224,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };

/**
 * ModuleExpandedTemplate — renders the full 17-item Tamu Academy lesson
 * format for the expanded-economics modules (Module 5 and Module 6 of
 * Understanding African Economies and the Global System).
 *
 * Order (per the editorial standard):
 *   1. Lesson title and estimated completion time
 *   2. Learning objectives
 *   3. Tamu Academy introduction
 *   4. Responsive YouTube video embed
 *   5. Direct link to the original video
 *   6. About this source attribution card
 *   7. Questions to consider while watching
 *   8. Original Tamu Academy explanation
 *   9. Key concepts and definitions
 *  10. African case study
 *  11. Interactive policy activity
 *  12. Five question knowledge check
 *  13. Educational feedback after submission
 *  14. Reflection prompt
 *  15. Completion requirements
 *  16. Sources and further learning
 *  17. Previous and next lesson navigation
 *
 * Existing fields on the module object are reused (overview is repurposed
 * as the Tamu Academy introduction; learningObjectives, keyConcepts,
 * reflectionQuestions, completionRequirements, closingText, sources remain
 * unchanged). New fields for the expanded format (media, watchingQuestions,
 * explanation, caseStudy, policyActivity) are rendered only when present.
 *
 * Lessons 1 through 4 use the unchanged ModulePageTemplate and are
 * unaffected by this template.
 */
export default function ModuleExpandedTemplate({ course, module }) {
  const coursePath = `/courses/${course.slug}`;
  const modulePath = `${coursePath}/${module.route}`;
  const moduleIndex = course.modules.findIndex((m) => m.route === module.route);
  const prevModule = moduleIndex > 0 ? course.modules[moduleIndex - 1] : null;
  const nextModule =
    moduleIndex >= 0 && moduleIndex < course.modules.length - 1 ? course.modules[moduleIndex + 1] : null;
  const nextLabel = nextModule
    ? `Next: ${nextModule.number} — ${nextModule.title}`
    : 'Course complete';

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

      {/* 1. Lesson title and estimated completion time (module header) */}
      <header style={{ marginBottom: '3rem' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.6rem',
            alignItems: 'center',
            marginBottom: '1rem',
          }}
        >
          <StatusBadge label={module.number} />
          <StatusBadge label={module.status} />
        </div>
        <h1
          className="font-heading"
          style={{
            color: '#F5EFE0',
            fontSize: 'clamp(1.75rem, 4vw, 2.6rem)',
            fontWeight: 400,
            lineHeight: 1.2,
            margin: '0 0 1rem',
          }}
        >
          {module.title}
        </h1>
        <p
          className="font-body"
          style={{
            color: 'rgba(245,239,224,0.55)',
            fontSize: '0.82rem',
            letterSpacing: '0.06em',
            marginBottom: '1.5rem',
          }}
        >
          Estimated time: {module.estimatedTime}
        </p>
        <motion.div
          initial={{ opacity: 0, scaleX: 0.4 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          aria-hidden="true"
          style={{
            width: '60px',
            height: '1px',
            background:
              'linear-gradient(90deg, transparent, #D4A12A 35%, #E2B652 50%, #D4A12A 65%, transparent)',
            marginBottom: '1.75rem',
            transformOrigin: 'left',
          }}
        />
        <div
          style={{
            padding: '1.25rem 1.5rem',
            border: '1px solid rgba(212,161,42,0.22)',
            borderRadius: '4px',
            backgroundColor: 'rgba(245,239,224,0.015)',
          }}
        >
          <span
            className="font-body"
            style={{
              color: '#D4A12A',
              fontSize: '0.6rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              fontWeight: 500,
              display: 'block',
              marginBottom: '0.5rem',
            }}
          >
            Module Competency
          </span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>
            {module.competency}
          </p>
        </div>
      </header>

      {/* 2. Learning objectives */}
      {module.learningObjectives && (
        <PageSection eyebrow="Objectives" heading="Learning Objectives">
          <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem' }}>
            {module.learningObjectives.map((o, i) => (
              <li key={i} style={{ marginBottom: '0.6rem' }}>
                {o}
              </li>
            ))}
          </ol>
        </PageSection>
      )}

      {/* 3. Tamu Academy introduction (existing overview paragraphs preserved) */}
      {module.overview && module.overview.length > 0 && (
        <PageSection eyebrow="Lesson Introduction" heading="Tamu Academy Introduction">
          {module.overview.map((para, i) => (
            <p key={i} className="font-body" style={{ ...bodyText, marginBottom: '1.15rem' }}>
              {para}
            </p>
          ))}
        </PageSection>
      )}

      {/* 4-6. Responsive YouTube video embed + direct link + About this source attribution */}
      <PageSection eyebrow="Lesson Videos" heading="Recorded Lessons">
        <p className="font-body" style={{ ...bodyText, marginBottom: '1.4rem' }}>
          These recorded lessons are supporting resources. They are watched through the official YouTube
          player and do not replace the Tamu Academy written explanation, African context, activities, or
          assessments that follow.
        </p>
        {primaryVideo && <LessonVideo video={primaryVideo} />}
        {supportingVideos.map((v, i) => (
          <LessonVideo key={v.id || i} video={v} />
        ))}
      </PageSection>

      {/* 7. Questions to consider while watching */}
      {module.watchingQuestions && module.watchingQuestions.length > 0 && (
        <PageSection eyebrow="While You Watch" heading="Questions to Consider While Watching">
          <p
            className="font-body"
            style={{
              ...bodyText,
              marginBottom: '1.15rem',
              fontStyle: 'italic',
              color: 'rgba(245,239,224,0.62)',
            }}
          >
            Keep these questions in mind as you watch the recorded lessons.
          </p>
          <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem' }}>
            {module.watchingQuestions.map((q, i) => (
              <li key={i} style={{ marginBottom: '0.85rem' }}>
                {q}
              </li>
            ))}
          </ol>
        </PageSection>
      )}

      {/* 8. Original Tamu Academy explanation */}
      {module.explanation && module.explanation.length > 0 && (
        <PageSection eyebrow="Explanation" heading="Original Tamu Academy Explanation">
          {module.explanation.map((para, i) => (
            <p key={i} className="font-body" style={{ ...bodyText, marginBottom: '1.15rem' }}>
              {para}
            </p>
          ))}
        </PageSection>
      )}

      {/* 9. Key concepts and definitions */}
      {module.keyConcepts && (
        <PageSection eyebrow="Concepts" heading="Key Concepts and Definitions">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {module.keyConcepts.map((c) => (
              <div key={c.term}>
                <h3
                  className="font-heading"
                  style={{
                    color: '#F5EFE0',
                    fontSize: 'clamp(1.05rem, 2.2vw, 1.35rem)',
                    fontWeight: 400,
                    lineHeight: 1.3,
                    margin: '0 0 0.6rem',
                  }}
                >
                  {c.term}
                </h3>
                <p className="font-body" style={{ ...bodyText, marginBottom: '0.6rem' }}>
                  {c.definition}
                </p>
                {c.example && (
                  <p
                    className="font-body"
                    style={{
                      ...bodyText,
                      fontSize: '0.88rem',
                      fontStyle: 'italic',
                      color: 'rgba(245,239,224,0.62)',
                      marginBottom: 0,
                    }}
                  >
                    Example: {c.example}
                  </p>
                )}
              </div>
            ))}
          </div>
        </PageSection>
      )}

      {/* 10. African case study */}
      {module.caseStudy && (
        <PageSection eyebrow="Case Study" heading="African Case Study">
          <AfricanCaseStudy caseStudy={module.caseStudy} />
        </PageSection>
      )}

      {/* 11. Interactive policy activity */}
      {module.policyActivity && (
        <PageSection eyebrow="Activity" heading={module.policyActivity.title}>
          {module.policyActivity.purpose && (
            <p className="font-body" style={{ ...bodyText, marginBottom: '0.5rem' }}>
              <span style={{ color: 'rgba(212,161,42,0.85)', fontWeight: 500 }}>Purpose: </span>
              {module.policyActivity.purpose}
            </p>
          )}
          <div style={{ height: '1.5rem' }} />
          <PolicyChoiceActivity policyActivity={module.policyActivity} />
        </PageSection>
      )}

      {/* 12 & 13. Five question knowledge check + educational feedback after submission */}
      {module.quiz && (
        <PageSection eyebrow="Check" heading="Knowledge Check">
          <p className="font-body" style={{ ...bodyText, marginBottom: '1.75rem' }}>
            {`Five multiple-choice questions. Answer at least four of the five questions correctly to pass. Feedback appears only after you submit; you can retry the knowledge check at any time.`}
          </p>
          <KnowledgeCheck quiz={module.quiz} />
        </PageSection>
      )}

      {/* 14. Reflection prompt */}
      {module.reflectionQuestions && module.reflectionQuestions.length > 0 && (
        <PageSection eyebrow="Reflect" heading="Reflection Prompts">
          <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem' }}>
            {module.reflectionQuestions.map((q, i) => (
              <li key={i} style={{ marginBottom: '0.85rem' }}>
                {q}
              </li>
            ))}
          </ol>
        </PageSection>
      )}

      {/* 15. Completion requirements */}
      {module.completionRequirements && module.completionRequirements.length > 0 && (
        <PageSection eyebrow="Requirements" heading="Completion Requirements">
          <ul
            className="font-body"
            style={{ ...bodyText, margin: 0, paddingLeft: '1.25rem', listStyle: 'none' }}
          >
            {module.completionRequirements.map((req, i) => (
              <li key={i} style={{ marginBottom: '0.6rem', position: 'relative', paddingLeft: '1.4rem' }}>
                <span aria-hidden="true" style={{ position: 'absolute', left: 0, color: 'rgba(212,161,42,0.6)' }}>
                  &#9633;
                </span>
                {req}
              </li>
            ))}
          </ul>
        </PageSection>
      )}

      {/* Module closing */}
      {module.closingText && module.closingText.length > 0 && (
        <PageSection eyebrow="Closing" heading="Module Closing">
          {module.closingText.map((para, i) => (
            <p key={i} className="font-body" style={{ ...bodyText, marginBottom: '1.15rem' }}>
              {para}
            </p>
          ))}
        </PageSection>
      )}

      {/* Course closing — final module only */}
      {module.courseClosingText && (
        <PageSection eyebrow="Course Closing" heading="Course Closing">
          {module.courseClosingText.map((para, i) => (
            <p key={i} className="font-body" style={{ ...bodyText, marginBottom: '1.15rem' }}>
              {para}
            </p>
          ))}
        </PageSection>
      )}

      {/* 16. Sources and further learning */}
      {module.sources && module.sources.length > 0 && (
        <PageSection eyebrow="Sources" heading="Sources and Further Reading">
          <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem' }}>
            {module.sources.map((s, i) => (
              <li key={i} style={{ marginBottom: '0.5rem' }}>
                {s}
              </li>
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