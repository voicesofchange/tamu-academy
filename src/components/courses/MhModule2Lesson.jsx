import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageMeta from '@/components/seo/PageMeta';
import PageLayout from '@/components/page/PageLayout';
import PageSection from '@/components/page/PageSection';
import StatusBadge from '@/components/page/StatusBadge';
import ModuleBreadcrumbs from '@/components/courses/module/ModuleBreadcrumbs';
import LessonVideo from '@/components/courses/module/LessonVideo';
import MhInteractiveScenario from '@/components/courses/MhInteractiveScenario';

const bodyText = { color: 'rgba(245,239,224,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };
const eyebrowStyle = { color: '#D4A12A', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500 };
const termHeading = { color: '#F5EFE0', fontSize: 'clamp(1.05rem, 2.2vw, 1.3rem)', fontWeight: 400, lineHeight: 1.3, margin: '0 0 0.55rem' };

const competencyBoxStyle = {
  padding: '1.25rem 1.5rem',
  border: '1px solid rgba(212,161,42,0.22)',
  borderRadius: '4px',
  backgroundColor: 'rgba(245,239,224,0.015)',
  marginTop: '1.5rem',
};

const disclaimerBoxStyle = {
  padding: '1.4rem 1.6rem',
  border: '1px solid rgba(212,161,42,0.28)',
  borderRadius: '4px',
  backgroundColor: 'rgba(212,161,42,0.05)',
  marginTop: '1.5rem',
};

const externalLinkStyle = {
  color: '#D4A12A',
  textDecoration: 'none',
  borderBottom: '1px dotted rgba(212,161,42,0.5)',
};

const navLinkStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  color: 'rgba(212,161,42,0.7)',
  fontSize: '0.72rem',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  textDecoration: 'none',
  fontWeight: 500,
  border: '1px solid rgba(212,161,42,0.35)',
  borderRadius: '2px',
  padding: '0.65rem 1.3rem',
};
const navDisabledStyle = {
  ...navLinkStyle,
  color: 'rgba(245,239,224,0.28)',
  cursor: 'not-allowed',
  borderColor: 'rgba(245,239,224,0.12)',
};

function renderParagraphs(paragraphs) {
  if (!Array.isArray(paragraphs) || paragraphs.length === 0) return null;
  return paragraphs.map((p, i) => (
    <p key={i} className="font-body" style={{ ...bodyText, marginBottom: '1.15rem' }}>
      {p}
    </p>
  ));
}

function renderObjectives(items) {
  return (
    <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem' }}>
      {items.map((o, i) => (
        <li key={i} style={{ marginBottom: '0.7rem' }}>{o}</li>
      ))}
    </ol>
  );
}

// Inline `**bold**` parser: splits on `**` pairs and bolds odd segments.
// Used only for explanation numbered items that carry a bold lead phrase.
function renderInline(text) {
  const parts = String(text).split('**');
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      return (
        <strong key={i} style={{ fontWeight: 500, color: 'rgba(212,161,42,0.85)' }}>
          {part}
        </strong>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

function renderNumberedItems(items) {
  return (
    <ol className="font-body" style={{ ...bodyText, margin: '0 0 1.15rem 1.4rem' }}>
      {items.map((it, i) => (
        <li key={i} style={{ marginBottom: '0.6rem' }}>{renderInline(it)}</li>
      ))}
    </ol>
  );
}

function renderConcepts(concepts) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {concepts.map((c) => (
        <div key={c.term}>
          <h3 className="font-heading" style={termHeading}>{c.term}</h3>
          <p className="font-body" style={{ ...bodyText, margin: 0 }}>{c.definition}</p>
        </div>
      ))}
    </div>
  );
}

function renderExplanation(section) {
  return (
    <PageSection key={section.sectionId} id={section.sectionId} eyebrow="Explanation" heading={section.heading}>
      {section.paragraphs && renderParagraphs(section.paragraphs)}
      {section.numberedItems && renderNumberedItems(section.numberedItems)}
      {section.trailingParagraphs && renderParagraphs(section.trailingParagraphs)}
      {section.subsections && section.subsections.map((sub, i) => (
        <div key={i} style={{ marginTop: i === 0 ? '1.25rem' : '1.75rem' }}>
          <h3 className="font-heading" style={termHeading}>{sub.heading}</h3>
          {renderParagraphs(sub.paragraphs)}
        </div>
      ))}
    </PageSection>
  );
}

/**
 * MhModule2Lesson — Stages 1 + 2 content renderer for Module 2 of
 * "Mental Health, Community and Culture" ("Stress, Stigma, and
 * Strength").
 *
 * SCOPE (Stages 1 + 2):
 *   Stage 1: public module overview + competency, and the learning
 *   objectives + the early educational disclaimer required near the
 *   beginning.
 *   Stage 2 (this stage): the approved Sangu Delle TED primary media,
 *   the five "Questions to Consider While Watching" (reflective prompts
 *   only — no response fields), the Original Tamu Academy
 *   introduction, the nine approved explanation sections in the
 *   content pack's order, and the nine approved key concepts as a
 *   consolidated glossary placed after the explanations (per the
 *   content pack's structure). Courtesy stigma appears only as the
 *   fifth numbered item inside the "Stigma has more than one form"
 *   explanation and is NOT promoted to the key-concepts glossary.
 *
 * NOT RENDERED (deferred to later approved stages — must not appear as
 *   available): the comparative case study, the interactive scenario,
 *   the Strength Without Silence Lab, private reflection, the
 *   knowledge check, closing content, completion requirements,
 *   sources, and the optional extended assignment. No placeholder,
 *   abbreviation, or invented preview of those sections is shown.
 *
 * PRIVACY & TRUST BOUNDARY:
 *   This component never hard-codes protected curriculum wording. All
 *   lesson text arrives via the `lesson` prop, selected for module-2
 *   by MhModuleRoutePage from the authenticated `getMentalHealthModule`
 *   backend response. No answer key, correct-answer index, scenario
 *   answer, lab response, reflection response, facilitator note, or
 *   completion logic is referenced here — none of those fields exist on
 *   the Stage 1 + Stage 2 lesson object. The media uses the privacy
 *   enhanced `youtube-nocookie.com` official player and does not
 *   autoplay; the full transcript is never reproduced in-app.
 *
 * RECORDS:
 *   Opening this page does not create or update a CourseEnrollment,
 *   ModuleProgress, or QuizAttempt record. No acknowledgment or
 *   completion call is made; the questions, media, explanations, and
 *   key concepts carry no submission, tracking, or completion behavior.
 */
export default function MhModule2Lesson({ course, module: mod, lesson }) {
  const coursePath = `/courses/${course.slug}`;
  const modulePath = `${coursePath}/${mod.route}`;
  const moduleIndex = course.modules.findIndex((m) => m.route === mod.route);
  const prevModule = moduleIndex > 0 ? course.modules[moduleIndex - 1] : null;
  const nextModule =
    moduleIndex >= 0 && moduleIndex < course.modules.length - 1
      ? course.modules[moduleIndex + 1]
      : null;

  return (
    <PageLayout>
      <PageMeta
        title={`${mod.number}: ${mod.title} | Tamu Academy`}
        description={mod.description}
        path={modulePath}
        noindex
      />

      <ModuleBreadcrumbs
        pillar={course.learningArea}
        track={course.title}
        course={course.title}
        coursePath={coursePath}
        moduleLabel={mod.number}
      />

      <header style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignItems: 'center', marginBottom: '1rem' }}>
          <StatusBadge label={mod.number} />
          <StatusBadge label={mod.status} />
        </div>
        <h1
          className="font-heading"
          style={{ color: '#F5EFE0', fontSize: 'clamp(1.75rem, 4vw, 2.6rem)', fontWeight: 400, lineHeight: 1.2, margin: '0 0 1rem' }}
        >
          {mod.title}
        </h1>
        <p className="font-body" style={{ color: 'rgba(245,239,224,0.55)', fontSize: '0.82rem', letterSpacing: '0.06em', marginBottom: '0.6rem' }}>
          Learning area: {course.learningArea}
        </p>
        <p className="font-body" style={{ color: 'rgba(245,239,224,0.55)', fontSize: '0.82rem', letterSpacing: '0.06em', marginBottom: '1.5rem' }}>
          Estimated time: {mod.estimatedTime}
        </p>
        <motion.div
          initial={{ opacity: 0, scaleX: 0.4 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          aria-hidden="true"
          style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, transparent, #D4A12A 35%, #E2B652 50%, #D4A12A 65%, transparent)', transformOrigin: 'left' }}
        />
      </header>

      <PageSection id="module-overview" eyebrow="Overview" heading="Public Module Overview">
        {renderParagraphs(lesson.moduleOverview.paragraphs)}
        <div style={competencyBoxStyle}>
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>
            Module Competency
          </span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>
            {lesson.moduleOverview.competency}
          </p>
        </div>
      </PageSection>

      <PageSection id="learning-objectives" eyebrow="Objectives" heading="Learning Objectives">
        {renderObjectives(lesson.learningObjectives.objectives)}
        <div style={disclaimerBoxStyle} aria-label="Required educational disclaimer">
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>
            Educational disclaimer
          </span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>
            {lesson.learningObjectives.earlyDisclaimer}
          </p>
        </div>
      </PageSection>

      <PageSection id="core-media" eyebrow="Core Media" heading="Primary Video">
        <p className="font-body" style={{ ...bodyText, marginBottom: '1.4rem' }}>
          {lesson.coreMedia.primary.roleInModule}
        </p>
        <LessonVideo
          video={{
            embedUrl: lesson.coreMedia.primary.embedUrl,
            watchUrl: lesson.coreMedia.primary.watchUrl,
            attributionLabel: lesson.coreMedia.primary.attributionLabel,
            source: {
              title: lesson.coreMedia.primary.title,
              speaker: lesson.coreMedia.primary.speaker,
              publisher: lesson.coreMedia.primary.publisher,
              watchUrl: lesson.coreMedia.primary.watchUrl,
              whySelected: lesson.coreMedia.primary.roleInModule,
              disclaimer: lesson.coreMedia.primary.attributionStatement,
            },
          }}
        />
        <p className="font-body" style={{ ...bodyText, marginTop: '0.5rem', marginBottom: 0 }}>
          <a
            href={lesson.coreMedia.primary.officialPageUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${lesson.coreMedia.primary.officialPageLabel} (opens in a new tab)`}
            style={externalLinkStyle}
          >
            {lesson.coreMedia.primary.officialPageLabel}
          </a>
          <span style={{ color: 'rgba(245,239,224,0.45)', fontSize: '0.78rem', marginLeft: '0.45rem' }}>
            (opens in a new tab)
          </span>
        </p>
      </PageSection>

      <PageSection id="questions-to-consider" eyebrow="While You Watch" heading="Questions to Consider While Watching">
        <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem' }}>
          {lesson.questionsToConsider.map((q, i) => (
            <li key={i} style={{ marginBottom: '0.85rem' }}>{q}</li>
          ))}
        </ol>
      </PageSection>

      <PageSection id="tamu-introduction" eyebrow="Introduction" heading="Original Tamu Academy Introduction">
        {renderParagraphs(lesson.tamuIntroduction.paragraphs)}
      </PageSection>

      {lesson.explanation.map((section) => renderExplanation(section))}

      <PageSection id="key-concepts" eyebrow="Concepts" heading="Key Concepts and Definitions">
        {renderConcepts(lesson.keyConcepts)}
      </PageSection>

      <PageSection id="case-study" eyebrow="Case Study" heading={lesson.caseStudy.title}>
        <div
          aria-label="Privacy and safety notice"
          style={{
            marginTop: '0.25rem',
            marginBottom: '1.6rem',
            padding: '1.4rem 1.6rem',
            border: '1px solid rgba(212,161,42,0.28)',
            borderRadius: '4px',
            backgroundColor: 'rgba(212,161,42,0.05)',
          }}
        >
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>
            Privacy and safety
          </span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>
            {lesson.caseStudy.privacyNotice}
          </p>
        </div>
        <p className="font-body" style={{ ...bodyText, marginBottom: '1.5rem' }}>
          {lesson.caseStudy.introductoryNotice}
        </p>
        {lesson.caseStudy.cases.map((c) => (
          <div key={c.heading} style={{ marginBottom: '1.75rem' }}>
            <h3 className="font-heading" style={termHeading}>{c.heading}</h3>
            {renderParagraphs(c.paragraphs)}
          </div>
        ))}
        {renderParagraphs(lesson.caseStudy.conclusion)}
      </PageSection>

      <PageSection id="interactive-scenario" eyebrow="Interactive Scenario" heading={lesson.interactiveScenario.title}>
        <MhInteractiveScenario
          courseSlug={course.slug}
          moduleSlug={mod.route}
          scenario={lesson.interactiveScenario}
        />
      </PageSection>

      <nav aria-label="Module navigation" style={{ paddingTop: '2.5rem', borderTop: '1px solid rgba(212,161,42,0.12)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {prevModule ? (
            <Link to={`${coursePath}/${prevModule.route}`} className="font-body" style={navLinkStyle}>
              &larr; {prevModule.number}
            </Link>
          ) : (
            <span aria-disabled="true" title="This is the first module" style={navDisabledStyle}>
              &larr; Start of course
            </span>
          )}
          {nextModule ? (
            <Link to={`${coursePath}/${nextModule.route}`} className="font-body" style={navLinkStyle}>
              {nextModule.number} &rarr;
            </Link>
          ) : (
            <span aria-disabled="true" title="This is the last module" style={navDisabledStyle}>
              End of course &rarr;
            </span>
          )}
        </div>
        <Link to={coursePath} className="font-body" style={navLinkStyle}>
          &larr; Return to Course
        </Link>
      </nav>
    </PageLayout>
  );
}