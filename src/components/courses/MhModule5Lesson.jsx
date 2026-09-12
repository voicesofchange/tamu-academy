import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageMeta from '@/components/seo/PageMeta';
import ModuleLessonLayout from '@/components/courses/module/ModuleLessonLayout';
import ModuleLessonSection from '@/components/courses/module/ModuleLessonSection';
import StatusBadge from '@/components/page/StatusBadge';
import ModuleBreadcrumbs from '@/components/courses/module/ModuleBreadcrumbs';
import ModuleProgressBar from '@/components/courses/module/ModuleProgressBar';
import LessonVideo from '@/components/courses/module/LessonVideo';
import MhMwangazaScenario from '@/components/courses/MhMwangazaScenario';
import MhPathwaysLab from '@/components/courses/MhPathwaysLab';
import MhModule5KnowledgeCheck from '@/components/courses/MhModule5KnowledgeCheck';
import MhModule5Progress from '@/components/courses/MhModule5Progress';
import { GoldDivider, ModuleEmblem } from '@/components/courses/MhLessonOrnaments';
import MhModuleNav from '@/components/courses/MhModuleNav';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';
import { MH_MODULE_CONTENT } from '@/lib/i18n/mh-module-content';

const bodyText = { color: 'rgba(243,234,216,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };
const eyebrowStyle = { color: '#e8b85b', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500 };
const termHeading = { color: '#f8f0df', fontSize: 'clamp(1.05rem, 2.2vw, 1.3rem)', fontWeight: 400, lineHeight: 1.3, margin: '0 0 0.55rem' };
const competencyBoxStyle = { padding: '1.25rem 1.5rem', border: '1px solid rgba(232,184,91,0.22)', borderRadius: '4px', backgroundColor: 'rgba(243,234,216,0.015)', marginTop: '1.5rem' };
const disclaimerBoxStyle = { padding: '1.4rem 1.6rem', border: '1px solid rgba(232,184,91,0.28)', borderRadius: '4px', backgroundColor: 'rgba(232,184,91,0.05)', marginTop: '1.5rem' };
const boxStyle = { padding: '1.4rem 1.6rem', border: '1px solid rgba(232,184,91,0.22)', borderRadius: '4px', backgroundColor: 'rgba(243,234,216,0.02)' };
const externalLinkStyle = { color: '#e8b85b', textDecoration: 'none', borderBottom: '1px dotted rgba(232,184,91,0.5)' };
const reflectionTextareaStyle = { width: '100%', maxWidth: '100%', boxSizing: 'border-box', padding: '0.85rem 1rem', backgroundColor: 'rgba(243,234,216,0.04)', border: '1px solid rgba(232,184,91,0.3)', borderRadius: '4px', color: '#f8f0df', fontSize: '0.97rem', lineHeight: 1.6, fontFamily: 'inherit', resize: 'vertical' };
const reflectionClearButtonStyle = { marginTop: '1.25rem', background: 'transparent', border: '1px solid rgba(232,184,91,0.35)', borderRadius: '2px', padding: '0.55rem 1.2rem', color: 'rgba(232,184,91,0.85)', fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, cursor: 'pointer' };

function renderParagraphs(paragraphs) {
  if (!Array.isArray(paragraphs) || paragraphs.length === 0) return null;
  return paragraphs.map((p, i) => <p key={i} className="font-body" style={{ ...bodyText, marginBottom: '1.15rem' }}>{p}</p>);
}
function renderObjectives(items) {
  return <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem' }}>{items.map((o, i) => <li key={i} style={{ marginBottom: '0.7rem' }}>{o}</li>)}</ol>;
}
function renderNumberedItems(items) {
  return <ol className="font-body" style={{ ...bodyText, margin: '0 0 1.15rem 1.4rem' }}>{items.map((it, i) => <li key={i} style={{ marginBottom: '0.6rem' }}>{it}</li>)}</ol>;
}

function renderExplanation(section, c) {
  return (
    <ModuleLessonSection key={section.sectionId} id={section.sectionId} eyebrow={c.explanationEyebrow} heading={section.heading}>
      {section.paragraphs && renderParagraphs(section.paragraphs)}
      {section.numberedItems && renderNumberedItems(section.numberedItems)}
      {section.trailingParagraphs && renderParagraphs(section.trailingParagraphs)}
    </ModuleLessonSection>
  );
}

function renderMediaItem(item, attributionStatement, c) {
  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <LessonVideo video={{
        embedUrl: item.embedUrl, watchUrl: item.watchUrl, attributionLabel: item.attributionLabel,
        source: { title: item.title, speaker: item.speaker || item.guest, publisher: item.publisher, watchUrl: item.watchUrl, whySelected: item.roleInModule, disclaimer: attributionStatement },
      }} />
      {item.officialPageUrl && (
        <p className="font-body" style={{ ...bodyText, marginTop: '0.5rem', marginBottom: 0 }}>
          <a href={item.officialPageUrl} target="_blank" rel="noopener noreferrer" aria-label={`${item.officialPageLabel} (opens in a new tab)`} style={externalLinkStyle}>{item.officialPageLabel}</a>
          <span style={{ color: 'rgba(243,234,216,0.45)', fontSize: '0.78rem', marginLeft: '0.45rem' }}>{c.opensInNewTab}</span>
        </p>
      )}
      {item.contentNote && (
        <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', marginTop: '0.75rem', marginBottom: 0, color: 'rgba(243,234,216,0.6)', fontSize: '0.85rem' }}>{item.contentNote}</p>
      )}
    </div>
  );
}

function renderOptionalMedia(item, attributionStatement, c) {
  return (
    <div style={{ ...boxStyle, marginBottom: '1.75rem' }}>
      <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>{c.optionalExtendedMedia}</span>
      <h4 className="font-heading" style={{ color: '#f8f0df', fontSize: '1.08rem', fontWeight: 400, margin: '0 0 0.4rem' }}>{item.title}</h4>
      {item.guest && <p className="font-body" style={{ ...bodyText, fontSize: '0.85rem', marginBottom: '0.3rem' }}>{c.guestPrefix}: {item.guest}</p>}
      <p className="font-body" style={{ ...bodyText, fontSize: '0.85rem', marginBottom: '0.3rem' }}>{c.publisherPrefix}: {item.publisher}</p>
      {item.approximateLength && <p className="font-body" style={{ ...bodyText, fontSize: '0.85rem', marginBottom: '0.3rem' }}>{item.approximateLength}</p>}
      <p className="font-body" style={{ ...bodyText, fontSize: '0.85rem', marginBottom: '0.75rem' }}>{item.roleInModule}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        <a href={item.watchUrl} target="_blank" rel="noopener noreferrer" style={externalLinkStyle}>{c.watchOnYouTube}</a>
      </div>
      <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', marginTop: '0.75rem', marginBottom: 0, color: 'rgba(243,234,216,0.6)', fontSize: '0.82rem' }}>{attributionStatement}</p>
    </div>
  );
}

export default function MhModule5Lesson({ course, module: mod, lesson }) {
  const { content: c } = useTranslatedContent('mh-module-lesson-shared', MH_MODULE_CONTENT);
  const coursePath = `/courses/${course.slug}`;
  const modulePath = `${coursePath}/${mod.route}`;

  const [reflectionText, setReflectionText] = useState('');
  const [knowledgeCheckGradedCount, setKnowledgeCheckGradedCount] = useState(0);

  const clearReflection = () => setReflectionText('');
  const handleKnowledgeCheckGraded = () => setKnowledgeCheckGradedCount((prev) => prev + 1);

  const safetyNoteBox = (ariaLabel) => (
    <div aria-label={ariaLabel} style={{ marginBottom: '1.6rem', padding: '1.4rem 1.6rem', border: '1px solid rgba(232,184,91,0.28)', borderRadius: '4px', backgroundColor: 'rgba(232,184,91,0.05)' }}>
      <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>{c.contentSafetyNote}</span>
      <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>{lesson.contentSafetyNote}</p>
    </div>
  );

  return (
    <ModuleLessonLayout>
      <PageMeta title={`${mod.number}: ${mod.title} | Tamu Academy`} description={mod.description} path={modulePath} noindex />
      <ModuleBreadcrumbs pillar={course.learningArea} track={course.title} course={course.title} coursePath={coursePath} moduleLabel={mod.number} />
      <ModuleProgressBar current={course.modules.findIndex((m) => m.route === mod.route) + 1} total={course.modules.length} />

      <header style={{ marginBottom: '3rem' }}>
        <ModuleEmblem />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignItems: 'center', marginBottom: '1rem' }}>
          <StatusBadge label={mod.number} />
          <StatusBadge label={mod.status} />
        </div>
        <h1 className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.75rem, 4vw, 2.6rem)', fontWeight: 400, lineHeight: 1.2, margin: '0 0 1rem' }}>{mod.title}</h1>
        <p className="font-body" style={{ color: 'rgba(243,234,216,0.55)', fontSize: '0.82rem', letterSpacing: '0.06em', marginBottom: '0.6rem' }}>{c.learningArea}: {course.learningArea}</p>
        <p className="font-body" style={{ color: 'rgba(243,234,216,0.55)', fontSize: '0.82rem', letterSpacing: '0.06em', marginBottom: '1.5rem' }}>{c.estimatedTime}: {mod.estimatedTime}</p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }} aria-hidden="true"><GoldDivider width="220px" /></motion.div>
      </header>

      {/* 1. Module identity and educational disclaimer */}
      <ModuleLessonSection id="module-overview" eyebrow={c.overviewEyebrow} heading={c.moduleOverviewHeadingAlt}>
        {renderParagraphs(lesson.moduleOverview.paragraphs)}
        <div style={competencyBoxStyle}>
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>{c.moduleCompetency}</span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>{lesson.moduleOverview.competency}</p>
        </div>
      </ModuleLessonSection>

      {/* 2. Learning objectives */}
      <ModuleLessonSection id="learning-objectives" eyebrow={c.objectivesEyebrow} heading={c.objectivesHeading}>
        {renderObjectives(lesson.learningObjectives.objectives)}
        <div style={disclaimerBoxStyle} aria-label="Required educational disclaimer">
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>{c.disclaimerLabel}</span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>{lesson.learningObjectives.earlyDisclaimer}</p>
        </div>
      </ModuleLessonSection>

      {/* 3. Core media */}
      <ModuleLessonSection id="core-media" eyebrow={c.coreMediaEyebrow} heading={c.requiredVideosHeading}>
        {safetyNoteBox('Content and safety note before media')}
        <p className="font-body" style={{ ...bodyText, marginBottom: '1.4rem' }}>{c.twoRequiredVideosThemes}</p>
        {renderMediaItem(lesson.coreMedia.primary, lesson.coreMedia.attributionStatement, c)}
        {renderMediaItem(lesson.coreMedia.secondary, lesson.coreMedia.attributionStatement, c)}
        {lesson.coreMedia.optionalExtended && lesson.coreMedia.optionalExtended.length > 0 && (
          <>
            <h3 className="font-heading" style={{ ...termHeading, marginTop: '2rem' }}>{c.optionalExtendedMediaHeading}</h3>
            <p className="font-body" style={{ ...bodyText, marginBottom: '1.25rem', fontSize: '0.88rem', color: 'rgba(243,234,216,0.6)' }}>{c.optionalExtendedMediaNoteLonger}</p>
            {lesson.coreMedia.optionalExtended.map((item) => renderOptionalMedia(item, lesson.coreMedia.attributionStatement, c))}
          </>
        )}
      </ModuleLessonSection>

      {/* 4. Questions to consider */}
      <ModuleLessonSection id="questions-to-consider" eyebrow={c.watchEyebrow} heading={c.watchHeading}>
        <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem' }}>
          {lesson.questionsToConsider.map((q, i) => <li key={i} style={{ marginBottom: '0.85rem' }}>{q}</li>)}
        </ol>
      </ModuleLessonSection>

      {/* 5. Original explanation */}
      <ModuleLessonSection id="tamu-introduction" eyebrow={c.introEyebrow} heading={c.introHeading}>
        {renderParagraphs(lesson.tamuIntroduction.paragraphs)}
      </ModuleLessonSection>

      {/* 6-9. Explanation sections including Ghana and rural Uganda cases */}
      {lesson.explanation.map((section, idx) => (
        <React.Fragment key={section.sectionId}>
          {idx === 0 && safetyNoteBox('Content and safety note before explanation and cases')}
          {renderExplanation(section, c)}
        </React.Fragment>
      ))}

      {/* 10. Interactive scenario */}
      <ModuleLessonSection id="interactive-scenario" eyebrow={c.interactiveScenarioEyebrow} heading={lesson.interactiveScenario.title}>
        {safetyNoteBox('Content and safety note before interactive scenario')}
        <MhMwangazaScenario courseSlug={course.slug} moduleSlug={mod.route} scenario={lesson.interactiveScenario} />
      </ModuleLessonSection>

      {/* 11. PATHWAYS applied activity */}
      <ModuleLessonSection id="pathways-lab" eyebrow={lesson.pathwaysLab.eyebrow} heading={lesson.pathwaysLab.title}>
        {safetyNoteBox('Content and safety note before applied activity')}
        <div aria-label="PATHWAYS safety warning" style={{ marginBottom: '1.6rem', padding: '1.4rem 1.6rem', border: '1px solid rgba(232,184,91,0.35)', borderRadius: '4px', backgroundColor: 'rgba(232,184,91,0.07)' }}>
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>{c.pathwaysSafetyWarning}</span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>{lesson.pathwaysSafetyWarning}</p>
        </div>
        <MhPathwaysLab lab={lesson.pathwaysLab} />
      </ModuleLessonSection>

      {/* 12. Private reflection */}
      <ModuleLessonSection id="private-reflection" eyebrow={c.reflectionEyebrow} heading={lesson.privateReflection.heading}>
        <div aria-label="Fictional or composite situation reminder" style={{ marginBottom: '1.6rem', padding: '1.4rem 1.6rem', border: '1px solid rgba(232,184,91,0.28)', borderRadius: '4px', backgroundColor: 'rgba(232,184,91,0.05)' }}>
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>{c.fictionalSituation}</span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>{lesson.fictionalSituationReminder}</p>
        </div>
        <p className="font-body" style={{ ...bodyText, marginBottom: '0.85rem' }}>{lesson.privateReflection.prompt}</p>
        <textarea id="m5-refl-input" aria-label={lesson.privateReflection.prompt} className="font-body" style={reflectionTextareaStyle} value={reflectionText} onChange={(e) => setReflectionText(e.target.value)} rows={4} />
        <div aria-label="Privacy notice" style={{ ...disclaimerBoxStyle, marginTop: '1.6rem' }}>
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>{c.privacy}</span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>{lesson.privateReflection.privacyNotice}</p>
        </div>
        <button type="button" onClick={clearReflection} className="font-body" style={reflectionClearButtonStyle}>{c.clearReflection}</button>
      </ModuleLessonSection>

      {/* 13. Knowledge check */}
      <ModuleLessonSection id="knowledge-check" eyebrow={c.knowledgeCheckEyebrow} heading={lesson.knowledgeCheck.heading}>
        <MhModule5KnowledgeCheck courseSlug={course.slug} moduleSlug={mod.route} quiz={lesson.knowledgeCheck} onGraded={handleKnowledgeCheckGraded} />
      </ModuleLessonSection>

      {/* 14. Completion requirements */}
      <ModuleLessonSection id="completion-requirements" eyebrow={c.requirementsEyebrow} heading={lesson.completionRequirements.heading}>
        <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem' }}>
          {lesson.completionRequirements.items.map((item, i) => <li key={i} style={{ marginBottom: '0.7rem' }}>{item}</li>)}
        </ol>
        <MhModule5Progress courseSlug={course.slug} moduleRoute={mod.route} completionRequirements={lesson.completionRequirements} progressTracking={lesson.progressTracking} refreshTrigger={knowledgeCheckGradedCount} />
      </ModuleLessonSection>

      {/* 15. Optional academic track */}
      <ModuleLessonSection id="optional-extended-assignment" eyebrow={lesson.optionalExtendedAssignment.label} heading={lesson.optionalExtendedAssignment.heading}>
        <p className="font-body" style={{ ...bodyText, marginBottom: '1.15rem' }}>{lesson.optionalExtendedAssignment.instruction}</p>
        <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem' }}>
          {lesson.optionalExtendedAssignment.requirements.map((item, i) => <li key={i} style={{ marginBottom: '0.7rem' }}>{item}</li>)}
        </ol>
        <div style={disclaimerBoxStyle} aria-label="Personal disclosure notice">
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>{c.personalDisclosure}</span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>{lesson.optionalExtendedAssignment.personalDisclosure}</p>
        </div>
      </ModuleLessonSection>

      {/* 16. Module closing and final disclaimer */}
      <ModuleLessonSection id="closing-section" eyebrow={c.closingEyebrow} heading={lesson.closing.heading}>
        {renderParagraphs(lesson.closing.paragraphs)}
        <div style={disclaimerBoxStyle} aria-label="Required educational disclaimer">
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>{c.disclaimerLabel}</span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>{lesson.closing.finalDisclaimer}</p>
        </div>
      </ModuleLessonSection>

      {/* 17. Sources and Further Learning */}
      <ModuleLessonSection id="sources-further-learning" eyebrow={c.sourcesEyebrow} heading={lesson.sourcesFurtherLearning.heading}>
        <ul className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem' }}>
          {lesson.sourcesFurtherLearning.items.map((source) => (
            <li key={source.url} style={{ marginBottom: '0.85rem' }}>
              <span style={{ display: 'block', marginBottom: '0.35rem' }}>{source.citation}</span>
              <a href={source.url} target="_blank" rel="noopener noreferrer" style={{ ...externalLinkStyle, overflowWrap: 'anywhere', wordBreak: 'break-all' }}>{source.url}</a>
            </li>
          ))}
        </ul>
        {lesson.sourcesFurtherLearning.reviewNote && (
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', color: 'rgba(243,234,216,0.6)', fontSize: '0.85rem', marginTop: '1.5rem', marginBottom: 0 }}>{lesson.sourcesFurtherLearning.reviewNote}</p>
        )}
      </ModuleLessonSection>

      {/* 18. Previous and next module navigation */}
      <GoldDivider width="260px" margin="0 0 2rem" />
      <MhModuleNav course={course} module={mod} courseSlug={course.slug} />
      <p className="font-body" style={{ ...bodyText, marginTop: '1.5rem', marginBottom: 0, fontStyle: 'italic', color: 'rgba(243,234,216,0.6)' }}>{lesson.closing.transition}</p>
    </ModuleLessonLayout>
  );
}