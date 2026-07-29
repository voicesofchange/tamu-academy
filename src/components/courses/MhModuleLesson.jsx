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
import MhCommunityCareMap from '@/components/courses/MhCommunityCareMap';
import MhPrivateReflection from '@/components/courses/MhPrivateReflection';

const bodyText = { color: 'rgba(245,239,224,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };

const eyebrowStyle = { color: '#D4A12A', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500 };
const termHeading = { color: '#F5EFE0', fontSize: 'clamp(1.05rem, 2.2vw, 1.3rem)', fontWeight: 400, lineHeight: 1.3, margin: '0 0 0.55rem' };

const disclaimerBoxStyle = {
  padding: '1.4rem 1.6rem',
  border: '1px solid rgba(212,161,42,0.28)',
  borderRadius: '4px',
  backgroundColor: 'rgba(212,161,42,0.05)',
  marginBottom: '1.25rem',
};

const competencyBoxStyle = {
  padding: '1.25rem 1.5rem',
  border: '1px solid rgba(212,161,42,0.22)',
  borderRadius: '4px',
  backgroundColor: 'rgba(245,239,224,0.015)',
  marginTop: '1.5rem',
};

const unavailableBoxStyle = {
  padding: '1.75rem 2rem',
  border: '1px dashed rgba(212,161,42,0.28)',
  borderRadius: '4px',
  backgroundColor: 'rgba(245,239,224,0.015)',
  marginTop: '2.5rem',
  marginBottom: '2.5rem',
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

function renderLabeledItems(items) {
  return (
    <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem' }}>
      {items.map((it, i) => (
        <li key={i} style={{ marginBottom: '0.85rem' }}>
          <span style={{ color: 'rgba(212,161,42,0.85)', fontWeight: 500 }}>{it.label}: </span>
          {it.text}
        </li>
      ))}
    </ol>
  );
}

function renderSources(sources) {
  return (
    <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem' }}>
      {sources.map((s, i) => (
        <li key={i} style={{ marginBottom: '1rem' }}>
          <p className="font-body" style={{ ...bodyText, margin: 0, marginBottom: '0.35rem' }}>
            {s.citation}{' '}
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#D4A12A', textDecoration: 'none', borderBottom: '1px dotted rgba(212,161,42,0.5)' }}
            >
              Open source
            </a>
          </p>
          {s.note && (
            <p className="font-body" style={{ ...bodyText, fontSize: '0.88rem', fontStyle: 'italic', color: 'rgba(245,239,224,0.62)', margin: 0 }}>
              {s.note}
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}

function SupportingReadingBlock({ reading }) {
  return (
    <div
      aria-label={`Supporting reading: ${reading.title}`}
      style={{
        marginTop: '2rem',
        padding: '1.4rem 1.6rem',
        border: '1px solid rgba(212,161,42,0.18)',
        borderRadius: '4px',
        background: 'rgba(245,239,224,0.02)',
      }}
    >
      <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.6rem' }}>
        Core supporting reading
      </span>
      <p className="font-body" style={{ ...bodyText, margin: 0, marginBottom: '0.35rem' }}>
        <strong style={{ fontWeight: 500, color: '#F5EFE0' }}>{reading.title}</strong>
      </p>
      <p className="font-body" style={{ ...bodyText, margin: '0 0 0.5rem', fontSize: '0.9rem' }}>
        <strong style={{ fontWeight: 500, color: 'rgba(212,161,42,0.85)' }}>Publisher: </strong>
        {reading.publisher}
      </p>
      <p className="font-body" style={{ ...bodyText, margin: '0 0 0.5rem', fontSize: '0.9rem' }}>
        <a
          href={reading.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#D4A12A', textDecoration: 'none', borderBottom: '1px dotted rgba(212,161,42,0.5)' }}
        >
          Open reading
        </a>
      </p>
      <p className="font-body" style={{ ...bodyText, fontSize: '0.88rem', fontStyle: 'italic', color: 'rgba(245,239,224,0.62)', margin: 0 }}>
        Evidence label: {reading.evidenceLabel}
      </p>
    </div>
  );
}

/**
 * MhModuleLesson — Phase 1 Module 1 content stage renderer.
 *
 * Receives the structured Module 1 lesson object returned by
 * `getMentalHealthModule` (admin-only) and renders it through the
 * existing Tamu Academy design system. Section identifiers are applied
 * as DOM `id` attributes on each PageSection so anchor links and the
 * server-side section allow-list can stay coherent.
 *
 * SCOPE:
 *   This renderer displays ONLY the educational lesson material
 *   described above — module overview + competency, learning
 *   objectives + early disclaimer, primary video + attribution + UP
 *   supporting reading + evidence label, questions to consider, Tamu
 *   Academy introduction, six key concepts, five explanation sections,
 *   central takeaway + final disclaimer, "Care Without Control" case
 *   study, and sources.
 *
 * NOT RENDERED (deferred to later stages): the interactive scenario,
 * Community of Care Map activity, private reflection, knowledge check,
 * quiz grading, completion requirements, closing text, and the
 * optional extended academic assignment. Instead, a single clear
 * unavailable notice is placed between the case study and the sources
 * section listing the components that are being prepared.
 *
 * PRIVACY: This component contains no form, no localStorage access,
 * no analytics capture, and no `updateMentalHealthProgress` call. It
 * does not write any learner record. Opening this page does not imply
 * the learner watched the video, completed the lesson, or made any
 * acknowledgement. The instructor role is unchanged and remains
 * admin-only through the getMentalHealthModule role gate.
 */
export default function MhModuleLesson({ course, module: mod, lesson }) {
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

      {/* Module number, title, learning area, status, and estimated time */}
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

      {/* 1. module-overview (public module overview + competency) */}
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

      {/* 2. learning-objectives (five learning objectives + early disclaimer) */}
      <PageSection id="learning-objectives" eyebrow="Objectives" heading="Learning Objectives">
        {renderObjectives(lesson.learningObjectives.objectives)}
        <div style={{ ...disclaimerBoxStyle, marginTop: '1.5rem' }} aria-label="Required educational disclaimer">
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>
            Educational disclaimer
          </span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>
            {lesson.learningObjectives.earlyDisclaimer}
          </p>
        </div>
      </PageSection>

      {/* 3. core-media (primary video + attribution + fallback link + UP supporting reading + evidence label) */}
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
              publisher: lesson.coreMedia.primary.publisher,
              watchUrl: lesson.coreMedia.primary.watchUrl,
              whySelected: lesson.coreMedia.primary.whySelected,
              disclaimer: lesson.coreMedia.primary.disclaimer,
            },
          }}
        />
        {lesson.coreMedia.supportingReadings.map((reading) => (
          <SupportingReadingBlock key={reading.url} reading={reading} />
        ))}
      </PageSection>

      {/* 4. questions-to-consider */}
      <PageSection id="questions-to-consider" eyebrow="While You Watch" heading="Questions to Consider While Watching">
        <p className="font-body" style={{ ...bodyText, marginBottom: '1rem', fontStyle: 'italic', color: 'rgba(245,239,224,0.62)' }}>
          Keep these questions in mind as you watch the recorded lesson.
        </p>
        {renderObjectives(lesson.questionsToConsider)}
      </PageSection>

      {/* 5. tamu-introduction */}
      <PageSection id="tamu-introduction" eyebrow="Introduction" heading="Original Tamu Academy Introduction">
        {renderParagraphs(lesson.tamuIntroduction.paragraphs)}
      </PageSection>

      {/* 6. key-concepts */}
      <PageSection id="key-concepts" eyebrow="Concepts" heading="Key Concepts and Definitions">
        {renderConcepts(lesson.keyConcepts)}
      </PageSection>

      {/* 7. relational-personhood */}
      <PageSection id="relational-personhood" eyebrow="Explanation" heading={lesson.explanation.relationalPersonhood.heading}>
        {renderParagraphs(lesson.explanation.relationalPersonhood.paragraphs)}
      </PageSection>

      {/* 8. ubuntu-and-mental-health */}
      <PageSection id="ubuntu-and-mental-health" eyebrow="Explanation" heading={lesson.explanation.ubuntuAndMentalHealth.heading}>
        {renderParagraphs(lesson.explanation.ubuntuAndMentalHealth.paragraphs)}
        <ol className="font-body" style={{ ...bodyText, margin: '0 0 1.15rem 1.4rem' }}>
          {lesson.explanation.ubuntuAndMentalHealth.numberedItems.map((q, i) => (
            <li key={i} style={{ marginBottom: '0.55rem' }}>{q}</li>
          ))}
        </ol>
        {renderParagraphs(lesson.explanation.ubuntuAndMentalHealth.trailingParagraphs)}
      </PageSection>

      {/* 9. different-emphases */}
      <PageSection id="different-emphases" eyebrow="Explanation" heading={lesson.explanation.differentEmphases.heading}>
        {renderParagraphs(lesson.explanation.differentEmphases.paragraphs)}
      </PageSection>

      {/* 10. community-protection */}
      <PageSection id="community-protection" eyebrow="Explanation" heading={lesson.explanation.communityProtection.heading}>
        {renderLabeledItems(lesson.explanation.communityProtection.items)}
      </PageSection>

      {/* 11. community-strain */}
      <PageSection id="community-strain" eyebrow="Explanation" heading={lesson.explanation.communityStrain.heading}>
        {renderLabeledItems(lesson.explanation.communityStrain.items)}
      </PageSection>

      {/* 12. central-takeaway (paragraph + final educational disclaimer) */}
      <PageSection id="central-takeaway" eyebrow="Takeaway" heading="Central Takeaway">
        {renderParagraphs(lesson.centralTakeaway.paragraphs)}
        <div style={{ ...disclaimerBoxStyle, marginTop: '1.5rem' }} aria-label="Required educational disclaimer">
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>
            Educational disclaimer
          </span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>
            {lesson.centralTakeaway.finalDisclaimer}
          </p>
        </div>
      </PageSection>

      {/* 13. case-study */}
      <PageSection id="case-study" eyebrow="Case Study" heading={lesson.caseStudy.heading}>
        {renderParagraphs(lesson.caseStudy.paragraphs)}
      </PageSection>

      {/* 14. interactive-scenario (stage 2) */}
      <PageSection id="interactive-scenario" eyebrow="Apply" heading="Interactive Scenario: Care Without Control">
        <MhInteractiveScenario
          courseSlug="mental-health-community-and-culture"
          moduleSlug="module-1"
          scenario={lesson.interactiveScenario}
        />
      </PageSection>

      {/* 15. community-of-care-map (stage 2 — fully browser-local) */}
      <PageSection id="community-of-care-map" eyebrow="Applied Activity" heading={lesson.communityOfCareMap.heading}>
        <MhCommunityCareMap config={lesson.communityOfCareMap} />
      </PageSection>

      {/* 16. private-reflection (stage 2 — display only, no input fields) */}
      <PageSection id="private-reflection" eyebrow="Reflect" heading={lesson.privateReflection.heading}>
        <MhPrivateReflection config={lesson.privateReflection} />
      </PageSection>

      {/* Unavailable notice — updated for stage 2 to no longer
          reference the scenario, Care Map activity, or reflection,
          which are now implemented. The notice still flags the
          knowledge check, completion requirements, closing text,
          and optional extended academic assignment. */}
      <div style={unavailableBoxStyle} aria-label="Upcoming Module 1 components">
        <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.6rem' }}>
          Coming soon in Module 1
        </span>
        <p className="font-body" style={{ ...bodyText, margin: 0 }}>
          The following Module 1 components are being prepared for later release: the five-question knowledge check and grading, the completion requirements, the closing text, and the optional extended academic assignment.
        </p>
      </div>

      {/* 14. sources */}
      <PageSection id="sources" eyebrow="Sources" heading="Sources and Further Learning">
        {renderSources(lesson.sources)}
      </PageSection>

      {/* Navigation position within the seven-module course */}
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