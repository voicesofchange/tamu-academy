import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageMeta from '@/components/seo/PageMeta';
import PageLayout from '@/components/page/PageLayout';
import PageSection from '@/components/page/PageSection';
import StatusBadge from '@/components/page/StatusBadge';
import ModuleBreadcrumbs from '@/components/courses/module/ModuleBreadcrumbs';
import LessonVideo from '@/components/courses/module/LessonVideo';
import MhMwangazaScenario from '@/components/courses/MhMwangazaScenario';
import MhPathwaysLab from '@/components/courses/MhPathwaysLab';
import MhModule5KnowledgeCheck from '@/components/courses/MhModule5KnowledgeCheck';
import MhModule5Progress from '@/components/courses/MhModule5Progress';

const bodyText = { color: 'rgba(245,239,224,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };
const eyebrowStyle = { color: '#D4A12A', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500 };
const termHeading = { color: '#F5EFE0', fontSize: 'clamp(1.05rem, 2.2vw, 1.3rem)', fontWeight: 400, lineHeight: 1.3, margin: '0 0 0.55rem' };
const competencyBoxStyle = { padding: '1.25rem 1.5rem', border: '1px solid rgba(212,161,42,0.22)', borderRadius: '4px', backgroundColor: 'rgba(245,239,224,0.015)', marginTop: '1.5rem' };
const disclaimerBoxStyle = { padding: '1.4rem 1.6rem', border: '1px solid rgba(212,161,42,0.28)', borderRadius: '4px', backgroundColor: 'rgba(212,161,42,0.05)', marginTop: '1.5rem' };
const boxStyle = { padding: '1.4rem 1.6rem', border: '1px solid rgba(212,161,42,0.22)', borderRadius: '4px', backgroundColor: 'rgba(245,239,224,0.02)' };
const externalLinkStyle = { color: '#D4A12A', textDecoration: 'none', borderBottom: '1px dotted rgba(212,161,42,0.5)' };
const navLinkStyle = { display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(212,161,42,0.7)', fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, border: '1px solid rgba(212,161,42,0.35)', borderRadius: '2px', padding: '0.65rem 1.3rem' };
const reflectionTextareaStyle = { width: '100%', maxWidth: '100%', boxSizing: 'border-box', padding: '0.85rem 1rem', backgroundColor: 'rgba(245,239,224,0.04)', border: '1px solid rgba(212,161,42,0.3)', borderRadius: '4px', color: '#F5EFE0', fontSize: '0.97rem', lineHeight: 1.6, fontFamily: 'inherit', resize: 'vertical' };
const reflectionClearButtonStyle = { marginTop: '1.25rem', background: 'transparent', border: '1px solid rgba(212,161,42,0.35)', borderRadius: '2px', padding: '0.55rem 1.2rem', color: 'rgba(212,161,42,0.85)', fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, cursor: 'pointer' };

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

function renderExplanation(section) {
  return (
    <PageSection key={section.sectionId} id={section.sectionId} eyebrow="Explanation" heading={section.heading}>
      {section.paragraphs && renderParagraphs(section.paragraphs)}
      {section.numberedItems && renderNumberedItems(section.numberedItems)}
      {section.trailingParagraphs && renderParagraphs(section.trailingParagraphs)}
    </PageSection>
  );
}

function renderMediaItem(item, attributionStatement) {
  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <LessonVideo video={{
        embedUrl: item.embedUrl, watchUrl: item.watchUrl, attributionLabel: item.attributionLabel,
        source: { title: item.title, speaker: item.speaker || item.guest, publisher: item.publisher, watchUrl: item.watchUrl, whySelected: item.roleInModule, disclaimer: attributionStatement },
      }} />
      {item.officialPageUrl && (
        <p className="font-body" style={{ ...bodyText, marginTop: '0.5rem', marginBottom: 0 }}>
          <a href={item.officialPageUrl} target="_blank" rel="noopener noreferrer" aria-label={`${item.officialPageLabel} (opens in a new tab)`} style={externalLinkStyle}>{item.officialPageLabel}</a>
          <span style={{ color: 'rgba(245,239,224,0.45)', fontSize: '0.78rem', marginLeft: '0.45rem' }}>(opens in a new tab)</span>
        </p>
      )}
      {item.contentNote && (
        <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', marginTop: '0.75rem', marginBottom: 0, color: 'rgba(245,239,224,0.6)', fontSize: '0.85rem' }}>{item.contentNote}</p>
      )}
    </div>
  );
}

function renderOptionalMedia(item, attributionStatement) {
  return (
    <div style={{ ...boxStyle, marginBottom: '1.75rem' }}>
      <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>Optional extended media</span>
      <h4 className="font-heading" style={{ color: '#F5EFE0', fontSize: '1.08rem', fontWeight: 400, margin: '0 0 0.4rem' }}>{item.title}</h4>
      {item.guest && <p className="font-body" style={{ ...bodyText, fontSize: '0.85rem', marginBottom: '0.3rem' }}>Guest: {item.guest}</p>}
      <p className="font-body" style={{ ...bodyText, fontSize: '0.85rem', marginBottom: '0.3rem' }}>Publisher: {item.publisher}</p>
      {item.approximateLength && <p className="font-body" style={{ ...bodyText, fontSize: '0.85rem', marginBottom: '0.3rem' }}>{item.approximateLength}</p>}
      <p className="font-body" style={{ ...bodyText, fontSize: '0.85rem', marginBottom: '0.75rem' }}>{item.roleInModule}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        <a href={item.watchUrl} target="_blank" rel="noopener noreferrer" style={externalLinkStyle}>Watch on YouTube</a>
      </div>
      <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', marginTop: '0.75rem', marginBottom: 0, color: 'rgba(245,239,224,0.6)', fontSize: '0.82rem' }}>{attributionStatement}</p>
    </div>
  );
}

export default function MhModule5Lesson({ course, module: mod, lesson }) {
  const coursePath = `/courses/${course.slug}`;
  const modulePath = `${coursePath}/${mod.route}`;
  const moduleIndex = course.modules.findIndex((m) => m.route === mod.route);
  const prevModule = moduleIndex > 0 ? course.modules[moduleIndex - 1] : null;

  const [reflectionText, setReflectionText] = useState('');
  const [knowledgeCheckGradedCount, setKnowledgeCheckGradedCount] = useState(0);

  const clearReflection = () => setReflectionText('');
  const handleKnowledgeCheckGraded = () => setKnowledgeCheckGradedCount((c) => c + 1);

  const safetyNoteBox = (ariaLabel) => (
    <div aria-label={ariaLabel} style={{ marginBottom: '1.6rem', padding: '1.4rem 1.6rem', border: '1px solid rgba(212,161,42,0.28)', borderRadius: '4px', backgroundColor: 'rgba(212,161,42,0.05)' }}>
      <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>Content and safety note</span>
      <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>{lesson.contentSafetyNote}</p>
    </div>
  );

  return (
    <PageLayout>
      <PageMeta title={`${mod.number}: ${mod.title} | Tamu Academy`} description={mod.description} path={modulePath} noindex />
      <ModuleBreadcrumbs pillar={course.learningArea} track={course.title} course={course.title} coursePath={coursePath} moduleLabel={mod.number} />

      <header style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignItems: 'center', marginBottom: '1rem' }}>
          <StatusBadge label={mod.number} />
          <StatusBadge label={mod.status} />
        </div>
        <h1 className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(1.75rem, 4vw, 2.6rem)', fontWeight: 400, lineHeight: 1.2, margin: '0 0 1rem' }}>{mod.title}</h1>
        <p className="font-body" style={{ color: 'rgba(245,239,224,0.55)', fontSize: '0.82rem', letterSpacing: '0.06em', marginBottom: '0.6rem' }}>Learning area: {course.learningArea}</p>
        <p className="font-body" style={{ color: 'rgba(245,239,224,0.55)', fontSize: '0.82rem', letterSpacing: '0.06em', marginBottom: '1.5rem' }}>Estimated time: {mod.estimatedTime}</p>
        <motion.div initial={{ opacity: 0, scaleX: 0.4 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }} aria-hidden="true" style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, transparent, #D4A12A 35%, #E2B652 50%, #D4A12A 65%, transparent)', transformOrigin: 'left' }} />
      </header>

      {/* 1. Module identity and educational disclaimer */}
      <PageSection id="module-overview" eyebrow="Overview" heading="Module Overview">
        {renderParagraphs(lesson.moduleOverview.paragraphs)}
        <div style={competencyBoxStyle}>
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>Module Competency</span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>{lesson.moduleOverview.competency}</p>
        </div>
      </PageSection>

      {/* 2. Learning objectives */}
      <PageSection id="learning-objectives" eyebrow="Objectives" heading="Learning Objectives">
        {renderObjectives(lesson.learningObjectives.objectives)}
        <div style={disclaimerBoxStyle} aria-label="Required educational disclaimer">
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>Educational disclaimer</span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>{lesson.learningObjectives.earlyDisclaimer}</p>
        </div>
      </PageSection>

      {/* 3. Core media */}
      <PageSection id="core-media" eyebrow="Core Media" heading="Required Videos">
        {safetyNoteBox('Content and safety note before media')}
        <p className="font-body" style={{ ...bodyText, marginBottom: '1.4rem' }}>Two required videos introduce the themes studied in this module.</p>
        {renderMediaItem(lesson.coreMedia.primary, lesson.coreMedia.attributionStatement)}
        {renderMediaItem(lesson.coreMedia.secondary, lesson.coreMedia.attributionStatement)}
        {lesson.coreMedia.optionalExtended && lesson.coreMedia.optionalExtended.length > 0 && (
          <>
            <h3 className="font-heading" style={{ ...termHeading, marginTop: '2rem' }}>Optional Extended Media</h3>
            <p className="font-body" style={{ ...bodyText, marginBottom: '1.25rem', fontSize: '0.88rem', color: 'rgba(245,239,224,0.6)' }}>These longer videos are optional and do not affect module completion.</p>
            {lesson.coreMedia.optionalExtended.map((item) => renderOptionalMedia(item, lesson.coreMedia.attributionStatement))}
          </>
        )}
      </PageSection>

      {/* 4. Questions to consider */}
      <PageSection id="questions-to-consider" eyebrow="While You Watch" heading="Questions to Consider While Watching">
        <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem' }}>
          {lesson.questionsToConsider.map((q, i) => <li key={i} style={{ marginBottom: '0.85rem' }}>{q}</li>)}
        </ol>
      </PageSection>

      {/* 5. Original explanation */}
      <PageSection id="tamu-introduction" eyebrow="Introduction" heading="Original Tamu Academy Introduction">
        {renderParagraphs(lesson.tamuIntroduction.paragraphs)}
      </PageSection>

      {/* 6-9. Explanation sections including Ghana and rural Uganda cases */}
      {lesson.explanation.map((section, idx) => (
        <React.Fragment key={section.sectionId}>
          {idx === 0 && safetyNoteBox('Content and safety note before explanation and cases')}
          {renderExplanation(section)}
        </React.Fragment>
      ))}

      {/* 10. Interactive scenario */}
      <PageSection id="interactive-scenario" eyebrow="Interactive Scenario" heading={lesson.interactiveScenario.title}>
        {safetyNoteBox('Content and safety note before interactive scenario')}
        <MhMwangazaScenario courseSlug={course.slug} moduleSlug={mod.route} scenario={lesson.interactiveScenario} />
      </PageSection>

      {/* 11. PATHWAYS applied activity */}
      <PageSection id="pathways-lab" eyebrow={lesson.pathwaysLab.eyebrow} heading={lesson.pathwaysLab.title}>
        {safetyNoteBox('Content and safety note before applied activity')}
        <div aria-label="PATHWAYS safety warning" style={{ marginBottom: '1.6rem', padding: '1.4rem 1.6rem', border: '1px solid rgba(212,161,42,0.35)', borderRadius: '4px', backgroundColor: 'rgba(212,161,42,0.07)' }}>
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>PATHWAYS safety warning</span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>{lesson.pathwaysSafetyWarning}</p>
        </div>
        <MhPathwaysLab lab={lesson.pathwaysLab} />
      </PageSection>

      {/* 12. Private reflection */}
      <PageSection id="private-reflection" eyebrow="Reflection" heading={lesson.privateReflection.heading}>
        <div aria-label="Fictional or composite situation reminder" style={{ marginBottom: '1.6rem', padding: '1.4rem 1.6rem', border: '1px solid rgba(212,161,42,0.28)', borderRadius: '4px', backgroundColor: 'rgba(212,161,42,0.05)' }}>
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>Fictional or composite situation</span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>{lesson.fictionalSituationReminder}</p>
        </div>
        <p className="font-body" style={{ ...bodyText, marginBottom: '0.85rem' }}>{lesson.privateReflection.prompt}</p>
        <textarea id="m5-refl-input" aria-label={lesson.privateReflection.prompt} className="font-body" style={reflectionTextareaStyle} value={reflectionText} onChange={(e) => setReflectionText(e.target.value)} rows={4} />
        <div aria-label="Privacy notice" style={{ ...disclaimerBoxStyle, marginTop: '1.6rem' }}>
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>Privacy</span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>{lesson.privateReflection.privacyNotice}</p>
        </div>
        <button type="button" onClick={clearReflection} className="font-body" style={reflectionClearButtonStyle}>Clear reflection</button>
      </PageSection>

      {/* 13. Knowledge check */}
      <PageSection id="knowledge-check" eyebrow="Knowledge Check" heading={lesson.knowledgeCheck.heading}>
        <MhModule5KnowledgeCheck courseSlug={course.slug} moduleSlug={mod.route} quiz={lesson.knowledgeCheck} onGraded={handleKnowledgeCheckGraded} />
      </PageSection>

      {/* 14. Completion requirements */}
      <PageSection id="completion-requirements" eyebrow="Requirements" heading={lesson.completionRequirements.heading}>
        <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem' }}>
          {lesson.completionRequirements.items.map((item, i) => <li key={i} style={{ marginBottom: '0.7rem' }}>{item}</li>)}
        </ol>
        <MhModule5Progress courseSlug={course.slug} moduleRoute={mod.route} completionRequirements={lesson.completionRequirements} progressTracking={lesson.progressTracking} refreshTrigger={knowledgeCheckGradedCount} />
      </PageSection>

      {/* 15. Optional academic track */}
      <PageSection id="optional-extended-assignment" eyebrow={lesson.optionalExtendedAssignment.label} heading={lesson.optionalExtendedAssignment.heading}>
        <p className="font-body" style={{ ...bodyText, marginBottom: '1.15rem' }}>{lesson.optionalExtendedAssignment.instruction}</p>
        <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem' }}>
          {lesson.optionalExtendedAssignment.requirements.map((item, i) => <li key={i} style={{ marginBottom: '0.7rem' }}>{item}</li>)}
        </ol>
        <div style={disclaimerBoxStyle} aria-label="Personal disclosure notice">
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>Personal disclosure</span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>{lesson.optionalExtendedAssignment.personalDisclosure}</p>
        </div>
      </PageSection>

      {/* 16. Module closing and final disclaimer */}
      <PageSection id="closing-section" eyebrow="Closing" heading={lesson.closing.heading}>
        {renderParagraphs(lesson.closing.paragraphs)}
        <div style={disclaimerBoxStyle} aria-label="Required educational disclaimer">
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>Educational disclaimer</span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>{lesson.closing.finalDisclaimer}</p>
        </div>
      </PageSection>

      {/* 17. Sources and Further Learning */}
      <PageSection id="sources-further-learning" eyebrow="Sources" heading={lesson.sourcesFurtherLearning.heading}>
        <ul className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem' }}>
          {lesson.sourcesFurtherLearning.items.map((source) => (
            <li key={source.url} style={{ marginBottom: '0.85rem' }}>
              <span style={{ display: 'block', marginBottom: '0.35rem' }}>{source.citation}</span>
              <a href={source.url} target="_blank" rel="noopener noreferrer" style={{ ...externalLinkStyle, overflowWrap: 'anywhere', wordBreak: 'break-all' }}>{source.url}</a>
            </li>
          ))}
        </ul>
        {lesson.sourcesFurtherLearning.reviewNote && (
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', color: 'rgba(245,239,224,0.6)', fontSize: '0.85rem', marginTop: '1.5rem', marginBottom: 0 }}>{lesson.sourcesFurtherLearning.reviewNote}</p>
        )}
      </PageSection>

      {/* 18. Previous and next module navigation */}
      <nav aria-label="Module navigation" style={{ paddingTop: '2.5rem', borderTop: '1px solid rgba(212,161,42,0.12)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {prevModule ? (
            <Link to={`${coursePath}/${prevModule.route}`} className="font-body" style={navLinkStyle}>&larr; {prevModule.number}</Link>
          ) : (
            <span style={{ ...navLinkStyle, color: 'rgba(245,239,224,0.28)', cursor: 'not-allowed', borderColor: 'rgba(245,239,224,0.12)' }}>&larr; Start of course</span>
          )}
        </div>
        <Link to={coursePath} className="font-body" style={navLinkStyle}>&larr; Return to Course</Link>
        <p className="font-body" style={{ ...bodyText, marginTop: '1.5rem', marginBottom: 0, fontStyle: 'italic', color: 'rgba(245,239,224,0.6)' }}>{lesson.closing.transition}</p>
      </nav>
    </PageLayout>
  );
}