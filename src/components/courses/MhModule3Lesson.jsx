import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageMeta from '@/components/seo/PageMeta';
import PageLayout from '@/components/page/PageLayout';
import PageSection from '@/components/page/PageSection';
import StatusBadge from '@/components/page/StatusBadge';
import ModuleBreadcrumbs from '@/components/courses/module/ModuleBreadcrumbs';
import LessonVideo from '@/components/courses/module/LessonVideo';
import MhInteractiveScenario from '@/components/courses/MhInteractiveScenario';
import MhBridgeConversationLab from '@/components/courses/MhBridgeConversationLab';
import MhModule3KnowledgeCheck from '@/components/courses/MhModule3KnowledgeCheck';
import MhModule3Progress from '@/components/courses/MhModule3Progress';
import { GoldDivider, ModuleEmblem } from '@/components/courses/MhLessonOrnaments';
import MhModuleNav from '@/components/courses/MhModuleNav';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';
import { MH_MODULE_CONTENT } from '@/lib/i18n/mh-module-content';

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

const boxStyle = {
  padding: '1.4rem 1.6rem',
  border: '1px solid rgba(212,161,42,0.22)',
  borderRadius: '4px',
  backgroundColor: 'rgba(245,239,224,0.02)',
};

const externalLinkStyle = {
  color: '#D4A12A',
  textDecoration: 'none',
  borderBottom: '1px dotted rgba(212,161,42,0.5)',
};

const reflectionTextareaStyle = {
  width: '100%',
  maxWidth: '100%',
  boxSizing: 'border-box',
  padding: '0.85rem 1rem',
  backgroundColor: 'rgba(245,239,224,0.04)',
  border: '1px solid rgba(212,161,42,0.3)',
  borderRadius: '4px',
  color: '#F5EFE0',
  fontSize: '0.97rem',
  lineHeight: 1.6,
  fontFamily: 'inherit',
  resize: 'vertical',
};

const reflectionClearButtonStyle = {
  marginTop: '1.25rem',
  background: 'transparent',
  border: '1px solid rgba(212,161,42,0.35)',
  borderRadius: '2px',
  padding: '0.55rem 1.2rem',
  color: 'rgba(212,161,42,0.85)',
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

function renderNumberedItems(items) {
  return (
    <ol className="font-body" style={{ ...bodyText, margin: '0 0 1.15rem 1.4rem' }}>
      {items.map((it, i) => (
        <li key={i} style={{ marginBottom: '0.6rem' }}>{it}</li>
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
    <PageSection key={section.sectionId} id={section.sectionId} eyebrow={c.explanationEyebrow} heading={section.heading}>
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

export default function MhModule3Lesson({ course, module: mod, lesson }) {
  const { content: c } = useTranslatedContent('mh-module-lesson-shared', MH_MODULE_CONTENT);
  const coursePath = `/courses/${course.slug}`;
  const modulePath = `${coursePath}/${mod.route}`;

  const [reflectionSentence, setReflectionSentence] = useState('');
  const [reflectionValue, setReflectionValue] = useState('');
  const [reflectionNeed, setReflectionNeed] = useState('');
  const [knowledgeCheckGradedCount, setKnowledgeCheckGradedCount] = useState(0);

  const clearReflection = () => {
    setReflectionSentence('');
    setReflectionValue('');
    setReflectionNeed('');
  };

  const handleKnowledgeCheckGraded = () => {
    setKnowledgeCheckGradedCount((prev) => prev + 1);
  };

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
        <ModuleEmblem />
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
          {c.learningArea}: {course.learningArea}
        </p>
        <p className="font-body" style={{ color: 'rgba(245,239,224,0.55)', fontSize: '0.82rem', letterSpacing: '0.06em', marginBottom: '1.5rem' }}>
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

      <PageSection id="module-overview" eyebrow={c.overviewEyebrow} heading={c.overviewHeading}>
        {renderParagraphs(lesson.moduleOverview.paragraphs)}
        <div style={competencyBoxStyle}>
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>
            {c.moduleCompetency}
          </span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>
            {lesson.moduleOverview.competency}
          </p>
        </div>
      </PageSection>

      <PageSection id="learning-objectives" eyebrow={c.objectivesEyebrow} heading={c.objectivesHeading}>
        {renderObjectives(lesson.learningObjectives.objectives)}
        <div style={disclaimerBoxStyle} aria-label="Required educational disclaimer">
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>
            {c.disclaimerLabel}
          </span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>
            {lesson.learningObjectives.earlyDisclaimer}
          </p>
        </div>
      </PageSection>

      <PageSection id="core-media" eyebrow={c.coreMediaEyebrow} heading={c.requiredVideoPairHeading}>
        <p className="font-body" style={{ ...bodyText, marginBottom: '1.4rem' }}>
          {lesson.coreMedia.primary.roleInModule}
        </p>
        <div style={{ marginBottom: '2.5rem' }}>
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
                disclaimer: lesson.coreMedia.attributionStatement,
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
              {c.opensInNewTab}
            </span>
          </p>
        </div>
        <div>
          <LessonVideo
            video={{
              embedUrl: lesson.coreMedia.secondary.embedUrl,
              watchUrl: lesson.coreMedia.secondary.watchUrl,
              attributionLabel: lesson.coreMedia.secondary.attributionLabel,
              source: {
                title: lesson.coreMedia.secondary.title,
                speaker: lesson.coreMedia.secondary.speaker,
                publisher: lesson.coreMedia.secondary.publisher,
                watchUrl: lesson.coreMedia.secondary.watchUrl,
                whySelected: lesson.coreMedia.secondary.roleInModule,
                disclaimer: lesson.coreMedia.attributionStatement,
              },
            }}
          />
          <p className="font-body" style={{ ...bodyText, marginTop: '0.5rem', marginBottom: 0 }}>
            <a
              href={lesson.coreMedia.secondary.officialPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${lesson.coreMedia.secondary.officialPageLabel} (opens in a new tab)`}
              style={externalLinkStyle}
            >
              {lesson.coreMedia.secondary.officialPageLabel}
            </a>
            <span style={{ color: 'rgba(245,239,224,0.45)', fontSize: '0.78rem', marginLeft: '0.45rem' }}>
              {c.opensInNewTab}
            </span>
          </p>
        </div>
      </PageSection>

      <PageSection id="questions-to-consider" eyebrow={c.watchEyebrow} heading={c.watchHeading}>
        <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem' }}>
          {lesson.questionsToConsider.map((q, i) => (
            <li key={i} style={{ marginBottom: '0.85rem' }}>{q}</li>
          ))}
        </ol>
      </PageSection>

      <PageSection id="optional-family-diaries" eyebrow={c.optionalEyebrow} heading={lesson.optionalFamilyDiaries.heading}>
        <div style={boxStyle}>
          <h3 className="font-heading" style={termHeading}>{lesson.optionalFamilyDiaries.title}</h3>
          <p className="font-body" style={{ ...bodyText, marginBottom: '0.5rem' }}>
            <strong style={{ color: 'rgba(212,161,42,0.85)', fontWeight: 500 }}>{c.publisherPrefix}:</strong> {lesson.optionalFamilyDiaries.publisher}
          </p>
          <p className="font-body" style={{ ...bodyText, marginBottom: '0.5rem' }}>
            <strong style={{ color: 'rgba(212,161,42,0.85)', fontWeight: 500 }}>{c.formatPrefix}:</strong> {lesson.optionalFamilyDiaries.format}
          </p>
          <p className="font-body" style={{ ...bodyText, marginBottom: '0.5rem' }}>
            <strong style={{ color: 'rgba(212,161,42,0.85)', fontWeight: 500 }}>{c.publishedPrefix}:</strong> {lesson.optionalFamilyDiaries.published}
          </p>
          <p className="font-body" style={{ ...bodyText, marginBottom: '1rem' }}>
            <strong style={{ color: 'rgba(212,161,42,0.85)', fontWeight: 500 }}>{c.rolePrefix}:</strong> {lesson.optionalFamilyDiaries.roleInModule}
          </p>
          <p className="font-body" style={{ ...bodyText, marginBottom: '1rem' }}>
            <a
              href={lesson.optionalFamilyDiaries.watchUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${lesson.optionalFamilyDiaries.linkLabel} (opens in a new tab)`}
              style={externalLinkStyle}
            >
              {lesson.optionalFamilyDiaries.linkLabel}
            </a>
          </p>
          <div style={disclaimerBoxStyle} aria-label="Optional media note">
            <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>
              {c.optionalMediaNote}
            </span>
            <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>
              {lesson.optionalFamilyDiaries.note}
            </p>
          </div>
        </div>
      </PageSection>

      <PageSection id="tamu-introduction" eyebrow={c.introEyebrow} heading={c.introHeading}>
        {renderParagraphs(lesson.tamuIntroduction.paragraphs)}
      </PageSection>

      {lesson.explanation.map((section) => renderExplanation(section, c))}

      <PageSection id="key-concepts" eyebrow={c.conceptsEyebrow} heading={c.conceptsHeading}>
        {renderConcepts(lesson.keyConcepts)}
      </PageSection>

      <PageSection id="case-study" eyebrow={c.caseStudyEyebrow} heading={lesson.caseStudy.title}>
        <div
          aria-label="Fictional or composite situation reminder"
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
            {c.fictionalSituation}
          </span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>
            {lesson.fictionalSituationReminder}
          </p>
        </div>
        <p className="font-body" style={{ ...bodyText, marginBottom: '1.5rem', fontStyle: 'italic' }}>
          {lesson.caseStudy.privacyNotice}
        </p>
        {lesson.caseStudy.cases.map((c) => (
          <div key={c.heading} style={{ marginBottom: '1.75rem' }}>
            <h3 className="font-heading" style={termHeading}>{c.heading}</h3>
            {renderParagraphs(c.paragraphs)}
          </div>
        ))}
        {renderParagraphs(lesson.caseStudy.conclusion)}
      </PageSection>

      <PageSection id="interactive-scenario" eyebrow={c.interactiveScenarioEyebrow} heading={lesson.interactiveScenario.title}>
        <div
          aria-label="Fictional or composite situation reminder"
          style={{
            marginBottom: '1.6rem',
            padding: '1.4rem 1.6rem',
            border: '1px solid rgba(212,161,42,0.28)',
            borderRadius: '4px',
            backgroundColor: 'rgba(212,161,42,0.05)',
          }}
        >
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>
            {c.fictionalSituation}
          </span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>
            {lesson.fictionalSituationReminder}
          </p>
        </div>
        <MhInteractiveScenario
          courseSlug={course.slug}
          moduleSlug={mod.route}
          scenario={lesson.interactiveScenario}
        />
      </PageSection>

      <PageSection id="bridge-conversation-lab" eyebrow={lesson.bridgeConversationLab.eyebrow} heading={lesson.bridgeConversationLab.title}>
        <div
          aria-label="Fictional or composite situation reminder"
          style={{
            marginBottom: '1.6rem',
            padding: '1.4rem 1.6rem',
            border: '1px solid rgba(212,161,42,0.28)',
            borderRadius: '4px',
            backgroundColor: 'rgba(212,161,42,0.05)',
          }}
        >
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>
            {c.fictionalSituation}
          </span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>
            {lesson.fictionalSituationReminder}
          </p>
        </div>
        <div
          aria-label="Role play safety warning"
          style={{
            marginBottom: '1.6rem',
            padding: '1.4rem 1.6rem',
            border: '1px solid rgba(212,161,42,0.28)',
            borderRadius: '4px',
            backgroundColor: 'rgba(212,161,42,0.05)',
          }}
        >
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>
            {c.rolePlaySafety}
          </span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>
            {lesson.rolePlaySafetyWarning}
          </p>
        </div>
        <MhBridgeConversationLab lab={lesson.bridgeConversationLab} />
      </PageSection>

      <PageSection id="private-reflection" eyebrow={c.reflectionEyebrow} heading={lesson.privateReflection.heading}>
        <div
          aria-label="Fictional or composite situation reminder"
          style={{
            marginBottom: '1.6rem',
            padding: '1.4rem 1.6rem',
            border: '1px solid rgba(212,161,42,0.28)',
            borderRadius: '4px',
            backgroundColor: 'rgba(212,161,42,0.05)',
          }}
        >
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>
            {c.fictionalSituation}
          </span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>
            {lesson.fictionalSituationReminder}
          </p>
        </div>
        <p className="font-body" style={{ ...bodyText, marginBottom: '0.85rem' }}>
          {lesson.privateReflection.prompt}
        </p>
        <p className="font-body" style={{ ...bodyText, marginBottom: '0.85rem' }}>
          {lesson.privateReflection.followUpPrompt}
        </p>
        <textarea
          id="m3-refl-sentence-input"
          aria-label={lesson.privateReflection.valuePrompt}
          className="font-body"
          style={reflectionTextareaStyle}
          value={reflectionSentence}
          onChange={(e) => setReflectionSentence(e.target.value)}
          rows={3}
        />
        <p className="font-body" style={{ ...bodyText, marginTop: '1.6rem', marginBottom: '0.85rem' }}>
          {lesson.privateReflection.valuePrompt}
        </p>
        <textarea
          id="m3-refl-value-input"
          aria-label={lesson.privateReflection.valuePrompt}
          className="font-body"
          style={reflectionTextareaStyle}
          value={reflectionValue}
          onChange={(e) => setReflectionValue(e.target.value)}
          rows={2}
        />
        <p className="font-body" style={{ ...bodyText, marginTop: '1.6rem', marginBottom: '0.85rem' }}>
          {lesson.privateReflection.needPrompt}
        </p>
        <textarea
          id="m3-refl-need-input"
          aria-label={lesson.privateReflection.needPrompt}
          className="font-body"
          style={reflectionTextareaStyle}
          value={reflectionNeed}
          onChange={(e) => setReflectionNeed(e.target.value)}
          rows={2}
        />
        <div aria-label="Privacy notice" style={{ ...disclaimerBoxStyle, marginTop: '1.6rem' }}>
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>
            {c.privacy}
          </span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>
            {lesson.privateReflection.privacyNotice}
          </p>
        </div>
        <button type="button" onClick={clearReflection} className="font-body" style={reflectionClearButtonStyle}>
          {c.clearReflection}
        </button>
      </PageSection>

      <PageSection id="knowledge-check" eyebrow={c.knowledgeCheckEyebrow} heading={lesson.knowledgeCheck.heading}>
        <MhModule3KnowledgeCheck
          courseSlug={course.slug}
          moduleSlug={mod.route}
          quiz={lesson.knowledgeCheck}
          onGraded={handleKnowledgeCheckGraded}
        />
      </PageSection>

      <PageSection id="completion-requirements" eyebrow={c.requirementsEyebrow} heading={lesson.completionRequirements.heading}>
        <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem' }}>
          {lesson.completionRequirements.items.map((item, i) => (
            <li key={i} style={{ marginBottom: '0.7rem' }}>{item}</li>
          ))}
        </ol>
        <MhModule3Progress
          courseSlug={course.slug}
          moduleRoute={mod.route}
          completionRequirements={lesson.completionRequirements}
          progressTracking={lesson.progressTracking}
          refreshTrigger={knowledgeCheckGradedCount}
        />
      </PageSection>

      <PageSection id="optional-extended-assignment" eyebrow={lesson.optionalExtendedAssignment.label} heading={lesson.optionalExtendedAssignment.heading}>
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
      </PageSection>

      <PageSection id="closing-section" eyebrow={c.closingEyebrow} heading={lesson.closing.heading}>
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
      </PageSection>

      <PageSection id="sources-further-learning" eyebrow={c.sourcesEyebrow} heading={lesson.sourcesFurtherLearning.heading}>
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
      </PageSection>

      <GoldDivider width="260px" margin="0 0 2rem" />
      <MhModuleNav course={course} module={mod} courseSlug={course.slug} />
    </PageLayout>
  );
}