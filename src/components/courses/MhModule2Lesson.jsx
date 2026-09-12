import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageMeta from '@/components/seo/PageMeta';
import ModuleLessonLayout from '@/components/courses/module/ModuleLessonLayout';
import ModuleLessonSection from '@/components/courses/module/ModuleLessonSection';
import StatusBadge from '@/components/page/StatusBadge';
import ModuleBreadcrumbs from '@/components/courses/module/ModuleBreadcrumbs';
import ModuleProgressBar from '@/components/courses/module/ModuleProgressBar';
import LessonVideo from '@/components/courses/module/LessonVideo';
import MhInteractiveScenario from '@/components/courses/MhInteractiveScenario';
import MhStrengthWithoutSilenceLab from '@/components/courses/MhStrengthWithoutSilenceLab';
import MhModule2KnowledgeCheck from '@/components/courses/MhModule2KnowledgeCheck';
import MhModule2Progress from '@/components/courses/MhModule2Progress';
import { GoldDivider, ModuleEmblem } from '@/components/courses/MhLessonOrnaments';
import MhModuleNav from '@/components/courses/MhModuleNav';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';
import { MH_MODULE_CONTENT } from '@/lib/i18n/mh-module-content';

const bodyText = { color: 'rgba(243,234,216,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };
const eyebrowStyle = { color: '#e8b85b', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500 };
const termHeading = { color: '#f8f0df', fontSize: 'clamp(1.05rem, 2.2vw, 1.3rem)', fontWeight: 400, lineHeight: 1.3, margin: '0 0 0.55rem' };

const competencyBoxStyle = {
  padding: '1.25rem 1.5rem',
  border: '1px solid rgba(232,184,91,0.22)',
  borderRadius: '4px',
  backgroundColor: 'rgba(243,234,216,0.015)',
  marginTop: '1.5rem',
};

const disclaimerBoxStyle = {
  padding: '1.4rem 1.6rem',
  border: '1px solid rgba(232,184,91,0.28)',
  borderRadius: '4px',
  backgroundColor: 'rgba(232,184,91,0.05)',
  marginTop: '1.5rem',
};

const externalLinkStyle = {
  color: '#e8b85b',
  textDecoration: 'none',
  borderBottom: '1px dotted rgba(232,184,91,0.5)',
};

const reflectionPrivacyBox = {
  padding: '1.4rem 1.6rem',
  border: '1px solid rgba(232,184,91,0.28)',
  borderRadius: '4px',
  backgroundColor: 'rgba(232,184,91,0.05)',
};
const reflectionStarterStyle = {
  color: '#f8f0df',
  fontSize: 'clamp(1.05rem, 2.4vw, 1.3rem)',
  fontStyle: 'italic',
  lineHeight: 1.6,
  margin: '0 0 1rem',
  borderLeft: '2px solid rgba(232,184,91,0.4)',
  paddingLeft: '1.25rem',
};
const reflectionTextareaStyle = {
  width: '100%',
  maxWidth: '100%',
  boxSizing: 'border-box',
  padding: '0.85rem 1rem',
  backgroundColor: 'rgba(243,234,216,0.04)',
  border: '1px solid rgba(232,184,91,0.3)',
  borderRadius: '4px',
  color: '#f8f0df',
  fontSize: '0.97rem',
  lineHeight: 1.6,
  fontFamily: 'inherit',
  resize: 'vertical',
};
const reflectionClearButtonStyle = {
  marginTop: '1.25rem',
  background: 'transparent',
  border: '1px solid rgba(232,184,91,0.35)',
  borderRadius: '2px',
  padding: '0.55rem 1.2rem',
  color: 'rgba(232,184,91,0.85)',
  fontSize: '0.72rem',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  fontWeight: 500,
  cursor: 'pointer',
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
        <strong key={i} style={{ fontWeight: 500, color: 'rgba(232,184,91,0.85)' }}>
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

function renderExplanation(section, c) {
  return (
    <ModuleLessonSection key={section.sectionId} id={section.sectionId} eyebrow={c.explanationEyebrow} heading={section.heading}>
      {section.paragraphs && renderParagraphs(section.paragraphs)}
      {section.numberedItems && renderNumberedItems(section.numberedItems)}
      {section.trailingParagraphs && renderParagraphs(section.trailingParagraphs)}
      {section.subsections && section.subsections.map((sub, i) => (
        <div key={i} style={{ marginTop: i === 0 ? '1.25rem' : '1.75rem' }}>
          <h3 className="font-heading" style={termHeading}>{sub.heading}</h3>
          {renderParagraphs(sub.paragraphs)}
        </div>
      ))}
    </ModuleLessonSection>
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
 *   available): closing content, completion requirements, sources, and
 *   the optional extended assignment. No placeholder, abbreviation, or
 *   invented preview of those sections is shown.
 *
 *   Stage 7: the Module 2 knowledge check, rendered immediately after
 *   the private reflection. It is graded on the server by the
 *   checkMentalHealthKnowledgeCheck backend function, which creates no
 *   QuizAttempt, ModuleProgress, or CourseEnrollment record and
 *   triggers no completion, certificate, payment, enrollment, or
 *   analytics event. The knowledge check is ungraded for module
 *   completion.
 *
 *   Stage 5: the Module 2 applied activity, rendered immediately after
 *   the interactive scenario. The lab is a browser local worksheet only
 *   — all responses live in temporary component state, nothing is
 *   persisted, submitted, graded, or used for module completion.
 *
 *   Stage 6 (this stage): the Module 2 reflection section, rendered
 *   inline immediately after the applied activity. Two textareas hold
 *   responses in temporary in component state only; nothing is
 *   persisted, submitted, graded, stored, or sent to the backend. The
 *   section is ungraded, optional, and not a completion, progress, or
 *   evaluation event.
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
  const { content: c } = useTranslatedContent('mh-module-lesson-shared', MH_MODULE_CONTENT);
  const coursePath = `/courses/${course.slug}`;
  const modulePath = `${coursePath}/${mod.route}`;

  const [reflectionSentence, setReflectionSentence] = useState('');
  const [reflectionSupportPathway, setReflectionSupportPathway] = useState('');
  const [knowledgeCheckGradedCount, setKnowledgeCheckGradedCount] = useState(0);
  const clearReflection = () => {
    setReflectionSentence('');
    setReflectionSupportPathway('');
  };

  const handleKnowledgeCheckGraded = () => {
    setKnowledgeCheckGradedCount((prev) => prev + 1);
  };

  return (
    <ModuleLessonLayout>
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
      <ModuleProgressBar
        current={course.modules.findIndex((m) => m.route === mod.route) + 1}
        total={course.modules.length}
      />

      <header style={{ marginBottom: '3rem' }}>
        <ModuleEmblem />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignItems: 'center', marginBottom: '1rem' }}>
          <StatusBadge label={mod.number} />
          <StatusBadge label={mod.status} />
        </div>
        <h1
          className="font-heading"
          style={{ color: '#f8f0df', fontSize: 'clamp(1.75rem, 4vw, 2.6rem)', fontWeight: 400, lineHeight: 1.2, margin: '0 0 1rem' }}
        >
          {mod.title}
        </h1>
        <p className="font-body" style={{ color: 'rgba(243,234,216,0.55)', fontSize: '0.82rem', letterSpacing: '0.06em', marginBottom: '0.6rem' }}>
          {c.learningArea}: {course.learningArea}
        </p>
        <p className="font-body" style={{ color: 'rgba(243,234,216,0.55)', fontSize: '0.82rem', letterSpacing: '0.06em', marginBottom: '1.5rem' }}>
          {c.estimatedTime}: {mod.estimatedTime}
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          aria-hidden="true"
        >
          <GoldDivider width="220px" />
        </motion.div>
      </header>

      <ModuleLessonSection id="module-overview" eyebrow={c.overviewEyebrow} heading={c.overviewHeading}>
        {renderParagraphs(lesson.moduleOverview.paragraphs)}
        <div style={competencyBoxStyle}>
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>
            {c.moduleCompetency}
          </span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>
            {lesson.moduleOverview.competency}
          </p>
        </div>
      </ModuleLessonSection>

      <ModuleLessonSection id="learning-objectives" eyebrow={c.objectivesEyebrow} heading={c.objectivesHeading}>
        {renderObjectives(lesson.learningObjectives.objectives)}
        <div style={disclaimerBoxStyle} aria-label="Required educational disclaimer">
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>
            {c.disclaimerLabel}
          </span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>
            {lesson.learningObjectives.earlyDisclaimer}
          </p>
        </div>
      </ModuleLessonSection>

      <ModuleLessonSection id="core-media" eyebrow={c.coreMediaEyebrow} heading={c.coreMediaHeading}>
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
          <span style={{ color: 'rgba(243,234,216,0.45)', fontSize: '0.78rem', marginLeft: '0.45rem' }}>
            {c.opensInNewTab}
          </span>
        </p>
      </ModuleLessonSection>

      <ModuleLessonSection id="questions-to-consider" eyebrow={c.watchEyebrow} heading={c.watchHeading}>
        <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem' }}>
          {lesson.questionsToConsider.map((q, i) => (
            <li key={i} style={{ marginBottom: '0.85rem' }}>{q}</li>
          ))}
        </ol>
      </ModuleLessonSection>

      <ModuleLessonSection id="tamu-introduction" eyebrow={c.introEyebrow} heading={c.introHeading}>
        {renderParagraphs(lesson.tamuIntroduction.paragraphs)}
      </ModuleLessonSection>

      {lesson.explanation.map((section) => renderExplanation(section, c))}

      <ModuleLessonSection id="key-concepts" eyebrow={c.conceptsEyebrow} heading={c.conceptsHeading}>
        {renderConcepts(lesson.keyConcepts)}
      </ModuleLessonSection>

      <ModuleLessonSection id="case-study" eyebrow={c.caseStudyEyebrow} heading={lesson.caseStudy.title}>
        <div
          aria-label="Privacy and safety notice"
          style={{
            marginTop: '0.25rem',
            marginBottom: '1.6rem',
            padding: '1.4rem 1.6rem',
            border: '1px solid rgba(232,184,91,0.28)',
            borderRadius: '4px',
            backgroundColor: 'rgba(232,184,91,0.05)',
          }}
        >
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>
            {c.privacySafety}
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
      </ModuleLessonSection>

      <ModuleLessonSection id="interactive-scenario" eyebrow={c.interactiveScenarioEyebrow} heading={lesson.interactiveScenario.title}>
        <MhInteractiveScenario
          courseSlug={course.slug}
          moduleSlug={mod.route}
          scenario={lesson.interactiveScenario}
        />
      </ModuleLessonSection>

      <ModuleLessonSection id="strength-without-silence-lab" eyebrow={lesson.strengthWithoutSilenceLab.eyebrow} heading={lesson.strengthWithoutSilenceLab.title}>
        <MhStrengthWithoutSilenceLab lab={lesson.strengthWithoutSilenceLab} />
      </ModuleLessonSection>

      <ModuleLessonSection id="private-reflection" eyebrow={c.reflectionEyebrow} heading={lesson.privateReflection.heading}>
        <div role="note" aria-label="Privacy notice" style={reflectionPrivacyBox}>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>
            {lesson.privateReflection.privacyNotice}
          </p>
        </div>
        <div role="note" aria-label="Keep it private" style={{ ...reflectionPrivacyBox, marginTop: '1.25rem' }}>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>
            {lesson.privateReflection.privateNotice}
          </p>
        </div>
        <p id="m2-refl-sentence-context-prompt" className="font-body" style={{ ...bodyText, marginTop: '1.6rem', marginBottom: '0.85rem' }}>
          {lesson.privateReflection.prompt}
        </p>
        <blockquote id="m2-refl-sentence-context-starter" className="font-heading" style={reflectionStarterStyle}>
          {lesson.privateReflection.sentenceStarter}
        </blockquote>
        <textarea
          id="m2-refl-sentence-input"
          aria-labelledby="m2-refl-sentence-context-prompt m2-refl-sentence-context-starter"
          className="font-body"
          style={reflectionTextareaStyle}
          value={reflectionSentence}
          onChange={(e) => setReflectionSentence(e.target.value)}
          rows={4}
        />
        <p id="m2-refl-pathway-context" className="font-body" style={{ ...bodyText, marginTop: '1.6rem', marginBottom: '0.85rem' }}>
          {lesson.privateReflection.followUpPrompt}
        </p>
        <textarea
          id="m2-refl-pathway-input"
          aria-labelledby="m2-refl-pathway-context"
          className="font-body"
          style={reflectionTextareaStyle}
          value={reflectionSupportPathway}
          onChange={(e) => setReflectionSupportPathway(e.target.value)}
          rows={4}
        />
        <button type="button" onClick={clearReflection} className="font-body" style={reflectionClearButtonStyle}>
          {c.clearReflection}
        </button>
      </ModuleLessonSection>

      <ModuleLessonSection id="knowledge-check" eyebrow={c.knowledgeCheckEyebrow} heading={lesson.knowledgeCheck.heading}>
        <MhModule2KnowledgeCheck
          courseSlug={course.slug}
          moduleSlug={mod.route}
          quiz={lesson.knowledgeCheck}
          onGraded={handleKnowledgeCheckGraded}
        />
      </ModuleLessonSection>

      <ModuleLessonSection id="closing-section" eyebrow={c.closingEyebrow} heading={lesson.closing.heading}>
        {renderParagraphs(lesson.closing.paragraphs)}
        <p className="font-body" style={{ ...bodyText, marginTop: '1.25rem', marginBottom: '1.25rem' }}>
          {lesson.closing.transition}
        </p>
        <div style={disclaimerBoxStyle} aria-label="Required educational disclaimer">
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>
            {c.disclaimerLabel}
          </span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>
            {lesson.closing.finalDisclaimer}
          </p>
        </div>
      </ModuleLessonSection>

      <ModuleLessonSection id="completion-requirements" eyebrow={c.requirementsEyebrow} heading={lesson.completionRequirements.heading}>
        <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem' }}>
          {lesson.completionRequirements.items.map((item, i) => (
            <li key={i} style={{ marginBottom: '0.7rem' }}>{item}</li>
          ))}
        </ol>
        <MhModule2Progress
          courseSlug={course.slug}
          moduleRoute={mod.route}
          completionRequirements={lesson.completionRequirements}
          progressTracking={lesson.progressTracking}
          refreshTrigger={knowledgeCheckGradedCount}
        />
      </ModuleLessonSection>

      <ModuleLessonSection id="sources-further-learning" eyebrow={c.sourcesEyebrow} heading={lesson.sourcesFurtherLearning.heading}>
        {lesson.sourcesFurtherLearning.groups.map((group) => (
          <div key={group.heading} style={{ marginBottom: '1.75rem' }}>
            <h3 className="font-heading" style={termHeading}>{group.heading}</h3>
            <ul className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem' }}>
              {group.items.map((source) => (
                <li key={source.url} style={{ marginBottom: '0.85rem' }}>
                  <span style={{ display: 'block', marginBottom: '0.35rem' }}>{source.citation}</span>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ ...externalLinkStyle, overflowWrap: 'anywhere', wordBreak: 'break-all' }}
                  >
                    {source.url}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div style={{ marginTop: '1.5rem' }}>
          <h3 className="font-heading" style={termHeading}>{lesson.sourcesFurtherLearning.evidenceAttributionNotes.heading}</h3>
          <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem' }}>
            {lesson.sourcesFurtherLearning.evidenceAttributionNotes.items.map((note, i) => (
              <li key={i} style={{ marginBottom: '0.7rem' }}>{note}</li>
            ))}
          </ol>
        </div>
      </ModuleLessonSection>

      <ModuleLessonSection id="optional-extended-assignment" eyebrow={lesson.optionalExtendedAssignment.label} heading={lesson.optionalExtendedAssignment.heading}>
        <p className="font-body" style={{ ...bodyText, marginBottom: '1.15rem' }}>
          {lesson.optionalExtendedAssignment.instruction}
        </p>
        <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem' }}>
          {lesson.optionalExtendedAssignment.requirements.map((item, i) => (
            <li key={i} style={{ marginBottom: '0.7rem' }}>{item}</li>
          ))}
        </ol>
        <div style={disclaimerBoxStyle} aria-label="Personal disclosure notice">
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>
            {c.personalDisclosure}
          </span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>
            {lesson.optionalExtendedAssignment.personalDisclosure}
          </p>
        </div>
      </ModuleLessonSection>

      <GoldDivider width="260px" margin="0 0 2rem" />
      <MhModuleNav course={course} module={mod} courseSlug={course.slug} />
    </ModuleLessonLayout>
  );
}