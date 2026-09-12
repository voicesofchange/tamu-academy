import React from 'react';
import { motion } from 'framer-motion';
import PageMeta from '@/components/seo/PageMeta';
import ModuleLessonLayout from '@/components/courses/module/ModuleLessonLayout';
import ModuleLessonSection from '@/components/courses/module/ModuleLessonSection';
import StatusBadge from '@/components/page/StatusBadge';
import ModuleBreadcrumbs from '@/components/courses/module/ModuleBreadcrumbs';
import ModuleProgressBar from '@/components/courses/module/ModuleProgressBar';
import LessonVideo from '@/components/courses/module/LessonVideo';
import MhInteractiveScenario from '@/components/courses/MhInteractiveScenario';
import MhCommunityCareMap from '@/components/courses/MhCommunityCareMap';
import MhPrivateReflection from '@/components/courses/MhPrivateReflection';
import MhKnowledgeCheck from '@/components/courses/MhKnowledgeCheck';
import MhModuleCompletion from '@/components/courses/MhModuleCompletion';
import MhModuleNav from '@/components/courses/MhModuleNav';
import { GoldDivider, ModuleEmblem } from '@/components/courses/MhLessonOrnaments';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

const bodyText = { color: 'rgba(243,234,216,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };
const eyebrowStyle = { color: '#e8b85b', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500 };
const termHeading = { color: '#f8f0df', fontSize: 'clamp(1.05rem, 2.2vw, 1.3rem)', fontWeight: 400, lineHeight: 1.3, margin: '0 0 0.55rem' };

const disclaimerBoxStyle = {
  padding: '1.4rem 1.6rem',
  border: '1px solid rgba(232,184,91,0.28)',
  borderRadius: '4px',
  backgroundColor: 'rgba(232,184,91,0.05)',
  marginBottom: '1.25rem',
};

const competencyBoxStyle = {
  padding: '1.25rem 1.5rem',
  border: '1px solid rgba(232,184,91,0.22)',
  borderRadius: '4px',
  backgroundColor: 'rgba(243,234,216,0.015)',
  marginTop: '1.5rem',
};

const CONTENT = {
  learningArea: 'Learning area',
  estimatedTime: 'Estimated time',
  overviewEyebrow: 'Overview',
  overviewHeading: 'Public Module Overview',
  moduleCompetency: 'Module Competency',
  objectivesEyebrow: 'Objectives',
  objectivesHeading: 'Learning Objectives',
  disclaimerLabel: 'Educational disclaimer',
  coreMediaEyebrow: 'Core Media',
  coreMediaHeading: 'Primary Video',
  watchEyebrow: 'While You Watch',
  watchHeading: 'Questions to Consider While Watching',
  watchIntro: 'Keep these questions in mind as you watch the recorded lesson.',
  introEyebrow: 'Introduction',
  introHeading: 'Original Tamu Academy Introduction',
  conceptsEyebrow: 'Concepts',
  conceptsHeading: 'Key Concepts and Definitions',
  explanationEyebrow: 'Explanation',
  takeawayEyebrow: 'Takeaway',
  takeawayHeading: 'Central Takeaway',
  caseStudyEyebrow: 'Case Study',
  applyEyebrow: 'Apply',
  applyHeading: 'Interactive Scenario: Care Without Control',
  activityEyebrow: 'Applied Activity',
  reflectEyebrow: 'Reflect',
  assessEyebrow: 'Assess',
  sourcesEyebrow: 'Sources',
  sourcesHeading: 'Sources and Further Learning',
  supportingReadingLabel: 'Core supporting reading',
  publisherPrefix: 'Publisher',
  openReading: 'Open reading',
  openSource: 'Open source',
  evidenceLabelPrefix: 'Evidence label',
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
      {concepts.map((concept) => (
        <div key={concept.term}>
          <h3 className="font-heading" style={termHeading}>{concept.term}</h3>
          <p className="font-body" style={{ ...bodyText, margin: 0 }}>{concept.definition}</p>
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
          <span style={{ color: 'rgba(232,184,91,0.85)', fontWeight: 500 }}>{it.label}: </span>
          {it.text}
        </li>
      ))}
    </ol>
  );
}

function renderSources(sources, c) {
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
              style={{ color: '#e8b85b', textDecoration: 'none', borderBottom: '1px dotted rgba(232,184,91,0.5)' }}
            >
              {c.openSource}
            </a>
          </p>
          {s.note && (
            <p className="font-body" style={{ ...bodyText, fontSize: '0.88rem', fontStyle: 'italic', color: 'rgba(243,234,216,0.62)', margin: 0 }}>
              {s.note}
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}

function SupportingReadingBlock({ reading, c }) {
  return (
    <div
      aria-label={`${c.supportingReadingLabel}: ${reading.title}`}
      style={{
        marginTop: '2rem',
        padding: '1.4rem 1.6rem',
        border: '1px solid rgba(232,184,91,0.18)',
        borderRadius: '4px',
        background: 'rgba(243,234,216,0.02)',
      }}
    >
      <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.6rem' }}>
        {c.supportingReadingLabel}
      </span>
      <p className="font-body" style={{ ...bodyText, margin: 0, marginBottom: '0.35rem' }}>
        <strong style={{ fontWeight: 500, color: '#f8f0df' }}>{reading.title}</strong>
      </p>
      <p className="font-body" style={{ ...bodyText, margin: '0 0 0.5rem', fontSize: '0.9rem' }}>
        <strong style={{ fontWeight: 500, color: 'rgba(232,184,91,0.85)' }}>{c.publisherPrefix}: </strong>
        {reading.publisher}
      </p>
      <p className="font-body" style={{ ...bodyText, margin: '0 0 0.5rem', fontSize: '0.9rem' }}>
        <a
          href={reading.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#e8b85b', textDecoration: 'none', borderBottom: '1px dotted rgba(232,184,91,0.5)' }}
        >
          {c.openReading}
        </a>
      </p>
      <p className="font-body" style={{ ...bodyText, fontSize: '0.88rem', fontStyle: 'italic', color: 'rgba(243,234,216,0.62)', margin: 0 }}>
        {c.evidenceLabelPrefix}: {reading.evidenceLabel}
      </p>
    </div>
  );
}

export default function MhModuleLesson({ course, module: mod, lesson }) {
  const { content: c } = useTranslatedContent('mh-module-lesson', CONTENT);
  const coursePath = `/courses/${course.slug}`;
  const modulePath = `${coursePath}/${mod.route}`;

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
        <h1 className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.75rem, 4vw, 2.6rem)', fontWeight: 400, lineHeight: 1.2, margin: '0 0 1rem' }}>
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
        <div style={{ ...disclaimerBoxStyle, marginTop: '1.5rem' }} aria-label={c.disclaimerLabel}>
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
              publisher: lesson.coreMedia.primary.publisher,
              watchUrl: lesson.coreMedia.primary.watchUrl,
              whySelected: lesson.coreMedia.primary.whySelected,
              disclaimer: lesson.coreMedia.primary.disclaimer,
            },
          }}
        />
        {lesson.coreMedia.supportingReadings.map((reading) => (
          <SupportingReadingBlock key={reading.url} reading={reading} c={c} />
        ))}
      </ModuleLessonSection>

      <ModuleLessonSection id="questions-to-consider" eyebrow={c.watchEyebrow} heading={c.watchHeading}>
        <p className="font-body" style={{ ...bodyText, marginBottom: '1rem', fontStyle: 'italic', color: 'rgba(243,234,216,0.62)' }}>
          {c.watchIntro}
        </p>
        {renderObjectives(lesson.questionsToConsider)}
      </ModuleLessonSection>

      <ModuleLessonSection id="tamu-introduction" eyebrow={c.introEyebrow} heading={c.introHeading}>
        {renderParagraphs(lesson.tamuIntroduction.paragraphs)}
      </ModuleLessonSection>

      <ModuleLessonSection id="key-concepts" eyebrow={c.conceptsEyebrow} heading={c.conceptsHeading}>
        {renderConcepts(lesson.keyConcepts)}
      </ModuleLessonSection>

      <ModuleLessonSection id="relational-personhood" eyebrow={c.explanationEyebrow} heading={lesson.explanation.relationalPersonhood.heading}>
        {renderParagraphs(lesson.explanation.relationalPersonhood.paragraphs)}
      </ModuleLessonSection>

      <ModuleLessonSection id="ubuntu-and-mental-health" eyebrow={c.explanationEyebrow} heading={lesson.explanation.ubuntuAndMentalHealth.heading}>
        {renderParagraphs(lesson.explanation.ubuntuAndMentalHealth.paragraphs)}
        <ol className="font-body" style={{ ...bodyText, margin: '0 0 1.15rem 1.4rem' }}>
          {lesson.explanation.ubuntuAndMentalHealth.numberedItems.map((q, i) => (
            <li key={i} style={{ marginBottom: '0.55rem' }}>{q}</li>
          ))}
        </ol>
        {renderParagraphs(lesson.explanation.ubuntuAndMentalHealth.trailingParagraphs)}
      </ModuleLessonSection>

      <ModuleLessonSection id="different-emphases" eyebrow={c.explanationEyebrow} heading={lesson.explanation.differentEmphases.heading}>
        {renderParagraphs(lesson.explanation.differentEmphases.paragraphs)}
      </ModuleLessonSection>

      <ModuleLessonSection id="community-protection" eyebrow={c.explanationEyebrow} heading={lesson.explanation.communityProtection.heading}>
        {renderLabeledItems(lesson.explanation.communityProtection.items)}
      </ModuleLessonSection>

      <ModuleLessonSection id="community-strain" eyebrow={c.explanationEyebrow} heading={lesson.explanation.communityStrain.heading}>
        {renderLabeledItems(lesson.explanation.communityStrain.items)}
      </ModuleLessonSection>

      <ModuleLessonSection id="central-takeaway" eyebrow={c.takeawayEyebrow} heading={c.takeawayHeading}>
        {renderParagraphs(lesson.centralTakeaway.paragraphs)}
        <div style={{ ...disclaimerBoxStyle, marginTop: '1.5rem' }} aria-label={c.disclaimerLabel}>
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>
            {c.disclaimerLabel}
          </span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>
            {lesson.centralTakeaway.finalDisclaimer}
          </p>
        </div>
      </ModuleLessonSection>

      <ModuleLessonSection id="case-study" eyebrow={c.caseStudyEyebrow} heading={lesson.caseStudy.heading}>
        {renderParagraphs(lesson.caseStudy.paragraphs)}
      </ModuleLessonSection>

      <ModuleLessonSection id="interactive-scenario" eyebrow={c.applyEyebrow} heading={c.applyHeading}>
        <MhInteractiveScenario
          courseSlug="mental-health-community-and-culture"
          moduleSlug="module-1"
          scenario={lesson.interactiveScenario}
        />
      </ModuleLessonSection>

      <ModuleLessonSection id="community-of-care-map" eyebrow={c.activityEyebrow} heading={lesson.communityOfCareMap.heading}>
        <MhCommunityCareMap config={lesson.communityOfCareMap} />
      </ModuleLessonSection>

      <ModuleLessonSection id="private-reflection" eyebrow={c.reflectEyebrow} heading={lesson.privateReflection.heading}>
        <MhPrivateReflection config={lesson.privateReflection} />
      </ModuleLessonSection>

      <ModuleLessonSection id="knowledge-check" eyebrow={c.assessEyebrow} heading={lesson.knowledgeCheck.heading}>
        <MhKnowledgeCheck
          courseSlug="mental-health-community-and-culture"
          moduleSlug="module-1"
          quiz={lesson.knowledgeCheck}
        />
      </ModuleLessonSection>

      <ModuleLessonSection id="closing-section">
        <MhModuleCompletion
          courseSlug="mental-health-community-and-culture"
          moduleRoute="module-1"
        />
      </ModuleLessonSection>

      <ModuleLessonSection id="sources" eyebrow={c.sourcesEyebrow} heading={c.sourcesHeading}>
        {renderSources(lesson.sources, c)}
      </ModuleLessonSection>

      <GoldDivider width="260px" margin="0 0 2rem" />
      <MhModuleNav course={course} module={mod} courseSlug={course.slug} />
    </ModuleLessonLayout>
  );
}