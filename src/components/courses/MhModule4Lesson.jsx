import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageMeta from '@/components/seo/PageMeta';
import PageLayout from '@/components/page/PageLayout';
import PageSection from '@/components/page/PageSection';
import StatusBadge from '@/components/page/StatusBadge';
import ModuleBreadcrumbs from '@/components/courses/module/ModuleBreadcrumbs';
import LessonVideo from '@/components/courses/module/LessonVideo';
import MhTumainiScenario from '@/components/courses/MhTumainiScenario';
import MhCareDesignLab from '@/components/courses/MhCareDesignLab';
import MhModule4KnowledgeCheck from '@/components/courses/MhModule4KnowledgeCheck';
import MhModule4Progress from '@/components/courses/MhModule4Progress';

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
function renderConcepts(concepts) {
  return <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>{concepts.map((c) => (
    <div key={c.term}><h3 className="font-heading" style={termHeading}>{c.term}</h3><p className="font-body" style={{ ...bodyText, margin: 0 }}>{c.definition}</p></div>
  ))}</div>;
}

function renderExplanation(section) {
  return (
    <PageSection key={section.sectionId} id={section.sectionId} eyebrow="Explanation" heading={section.heading}>
      {section.paragraphs && renderParagraphs(section.paragraphs)}
      {section.numberedItems && renderNumberedItems(section.numberedItems)}
      {section.subsections && section.subsections.map((sub, i) => (
        <div key={i} style={{ marginTop: i === 0 ? '1.25rem' : '1.75rem' }}>
          <h3 className="font-heading" style={termHeading}>{sub.heading}</h3>
          {sub.paragraphs && renderParagraphs(sub.paragraphs)}
          {sub.numberedItems && renderNumberedItems(sub.numberedItems)}
        </div>
      ))}
      {section.noticeItems && section.noticeItems.map((notice, ni) => (
        <div key={ni} style={{ marginTop: '1.25rem' }}>
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>{notice.label}</span>
          <ol className="font-body" style={{ ...bodyText, margin: '0 0 1.15rem 1.4rem' }}>
            {notice.items.map((it, i) => <li key={i} style={{ marginBottom: '0.5rem' }}>{it}</li>)}
          </ol>
        </div>
      ))}
      {section.trailingParagraphs && renderParagraphs(section.trailingParagraphs)}
    </PageSection>
  );
}

function renderMediaItem(item, attributionStatement) {
  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <LessonVideo video={{
        embedUrl: item.embedUrl, watchUrl: item.watchUrl, attributionLabel: item.attributionLabel,
        source: { title: item.title, speaker: item.speaker, publisher: item.publisher, watchUrl: item.watchUrl, whySelected: item.roleInModule, disclaimer: attributionStatement },
      }} />
      <p className="font-body" style={{ ...bodyText, marginTop: '0.5rem', marginBottom: 0 }}>
        <a href={item.officialPageUrl} target="_blank" rel="noopener noreferrer" aria-label={`${item.officialPageLabel} (opens in a new tab)`} style={externalLinkStyle}>{item.officialPageLabel}</a>
        <span style={{ color: 'rgba(245,239,224,0.45)', fontSize: '0.78rem', marginLeft: '0.45rem' }}>(opens in a new tab)</span>
      </p>
    </div>
  );
}

export default function MhModule4Lesson({ course, module: mod, lesson }) {
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

      <PageSection id="module-overview" eyebrow="Overview" heading="Public Module Overview">
        {renderParagraphs(lesson.moduleOverview.paragraphs)}
        <div style={competencyBoxStyle}>
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>Module Competency</span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>{lesson.moduleOverview.competency}</p>
        </div>
      </PageSection>

      <PageSection id="learning-objectives" eyebrow="Objectives" heading="Learning Objectives">
        {renderObjectives(lesson.learningObjectives.objectives)}
        <div style={disclaimerBoxStyle} aria-label="Required educational disclaimer">
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>Educational disclaimer</span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>{lesson.learningObjectives.earlyDisclaimer}</p>
        </div>
      </PageSection>

      <PageSection id="core-media" eyebrow="Core Media" heading="Required Videos">
        {safetyNoteBox('Content and safety note before media')}
        <p className="font-body" style={{ ...bodyText, marginBottom: '1.4rem' }}>Two required videos introduce the programs studied in this module.</p>
        {renderMediaItem(lesson.coreMedia.primary, lesson.coreMedia.attributionStatement)}
        {renderMediaItem(lesson.coreMedia.secondary, lesson.coreMedia.attributionStatement)}
      </PageSection>

      <PageSection id="questions-to-consider" eyebrow="While You Watch" heading="Questions to Consider While Watching">
        <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem' }}>
          {lesson.questionsToConsider.map((q, i) => <li key={i} style={{ marginBottom: '0.85rem' }}>{q}</li>)}
        </ol>
      </PageSection>

      <PageSection id="tamu-introduction" eyebrow="Introduction" heading="Original Tamu Academy Introduction">
        {renderParagraphs(lesson.tamuIntroduction.paragraphs)}
      </PageSection>

      {lesson.explanation.map((section) => renderExplanation(section))}

      <PageSection id="key-concepts" eyebrow="Concepts" heading="Key Concepts and Definitions">
        {renderConcepts(lesson.keyConcepts)}
      </PageSection>

      <PageSection id="comparative-program-summaries" eyebrow="Comparison" heading={lesson.comparativeProgramSummaries.heading}>
        {lesson.comparativeProgramSummaries.programs.map((program) => (
          <div key={program.name} style={{ ...boxStyle, marginBottom: '1.75rem' }}>
            <h3 className="font-heading" style={{ ...termHeading, fontSize: 'clamp(1.15rem, 2.5vw, 1.4rem)' }}>{program.name}</h3>
            <dl className="font-body" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.9rem 1.5rem', margin: 0 }}>
              {program.fields.map((f) => (
                <div key={f.label}>
                  <dt style={{ ...eyebrowStyle, marginBottom: '0.3rem' }}>{f.label}</dt>
                  <dd style={{ ...bodyText, margin: 0 }}>{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </PageSection>

      <PageSection id="interactive-scenario" eyebrow="Interactive Scenario" heading={lesson.interactiveScenario.title}>
        {safetyNoteBox('Content and safety note before interactive scenario')}
        <MhTumainiScenario courseSlug={course.slug} moduleSlug={mod.route} scenario={lesson.interactiveScenario} />
      </PageSection>

      <PageSection id="care-design-lab" eyebrow={lesson.careDesignLab.eyebrow} heading={lesson.careDesignLab.title}>
        {safetyNoteBox('Content and safety note before applied activity')}
        <div aria-label="Design lab safety warning" style={{ marginBottom: '1.6rem', padding: '1.4rem 1.6rem', border: '1px solid rgba(212,161,42,0.35)', borderRadius: '4px', backgroundColor: 'rgba(212,161,42,0.07)' }}>
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>Design lab safety warning</span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>{lesson.designLabSafetyWarning}</p>
        </div>
        <MhCareDesignLab lab={lesson.careDesignLab} />
      </PageSection>

      <PageSection id="private-reflection" eyebrow="Reflection" heading={lesson.privateReflection.heading}>
        <div aria-label="Fictional or composite situation reminder" style={{ marginBottom: '1.6rem', padding: '1.4rem 1.6rem', border: '1px solid rgba(212,161,42,0.28)', borderRadius: '4px', backgroundColor: 'rgba(212,161,42,0.05)' }}>
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>Fictional or composite situation</span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>{lesson.fictionalSituationReminder}</p>
        </div>
        <p className="font-body" style={{ ...bodyText, marginBottom: '0.85rem' }}>{lesson.privateReflection.prompt}</p>
        <textarea id="m4-refl-input" aria-label={lesson.privateReflection.prompt} className="font-body" style={reflectionTextareaStyle} value={reflectionText} onChange={(e) => setReflectionText(e.target.value)} rows={4} />
        <div aria-label="Privacy notice" style={{ ...disclaimerBoxStyle, marginTop: '1.6rem' }}>
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>Privacy</span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>{lesson.privateReflection.privacyNotice}</p>
        </div>
        <button type="button" onClick={clearReflection} className="font-body" style={reflectionClearButtonStyle}>Clear reflection</button>
      </PageSection>

      <PageSection id="knowledge-check" eyebrow="Knowledge Check" heading={lesson.knowledgeCheck.heading}>
        <MhModule4KnowledgeCheck courseSlug={course.slug} moduleSlug={mod.route} quiz={lesson.knowledgeCheck} onGraded={handleKnowledgeCheckGraded} />
      </PageSection>

      <PageSection id="completion-requirements" eyebrow="Requirements" heading={lesson.completionRequirements.heading}>
        <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem' }}>
          {lesson.completionRequirements.items.map((item, i) => <li key={i} style={{ marginBottom: '0.7rem' }}>{item}</li>)}
        </ol>
        <MhModule4Progress courseSlug={course.slug} moduleRoute={mod.route} completionRequirements={lesson.completionRequirements} progressTracking={lesson.progressTracking} refreshTrigger={knowledgeCheckGradedCount} />
      </PageSection>

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

      <PageSection id="closing-section" eyebrow="Closing" heading={lesson.closing.heading}>
        {renderParagraphs(lesson.closing.paragraphs)}
        <p className="font-body" style={{ ...bodyText, marginTop: '1.25rem', marginBottom: '1.25rem' }}>{lesson.closing.transition}</p>
        <div style={disclaimerBoxStyle} aria-label="Required educational disclaimer">
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>Educational disclaimer</span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>{lesson.closing.finalDisclaimer}</p>
        </div>
      </PageSection>

      <PageSection id="sources-further-learning" eyebrow="Sources" heading={lesson.sourcesFurtherLearning.heading}>
        {lesson.sourcesFurtherLearning.groups.map((group) => (
          <div key={group.heading} style={{ marginBottom: '1.75rem' }}>
            <h3 className="font-heading" style={termHeading}>{group.heading}</h3>
            <ul className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem' }}>
              {group.items.map((source) => (
                <li key={source.url} style={{ marginBottom: '0.85rem' }}>
                  <span style={{ display: 'block', marginBottom: '0.35rem' }}>{source.citation}</span>
                  <a href={source.url} target="_blank" rel="noopener noreferrer" style={{ ...externalLinkStyle, overflowWrap: 'anywhere', wordBreak: 'break-all' }}>{source.url}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {lesson.sourcesFurtherLearning.reviewNote && (
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', color: 'rgba(245,239,224,0.6)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>{lesson.sourcesFurtherLearning.reviewNote}</p>
        )}
        <div style={{ marginTop: '1.5rem' }}>
          <h3 className="font-heading" style={termHeading}>{lesson.sourcesFurtherLearning.evidenceAttributionNotes.heading}</h3>
          <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem' }}>
            {lesson.sourcesFurtherLearning.evidenceAttributionNotes.items.map((note, i) => <li key={i} style={{ marginBottom: '0.7rem' }}>{note}</li>)}
          </ol>
        </div>
      </PageSection>

      <nav aria-label="Module navigation" style={{ paddingTop: '2.5rem', borderTop: '1px solid rgba(212,161,42,0.12)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {prevModule ? (
            <Link to={`${coursePath}/${prevModule.route}`} className="font-body" style={navLinkStyle}>&larr; {prevModule.number}</Link>
          ) : (
            <span style={{ ...navLinkStyle, color: 'rgba(245,239,224,0.28)', cursor: 'not-allowed', borderColor: 'rgba(245,239,224,0.12)' }}>&larr; Start of course</span>
          )}
        </div>
        <Link to={coursePath} className="font-body" style={navLinkStyle}>&larr; Return to Course</Link>
      </nav>
    </PageLayout>
  );
}