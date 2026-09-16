import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import PageMeta from '@/components/seo/PageMeta';
import ModuleLessonLayout from '@/components/courses/module/ModuleLessonLayout';
import ModuleLessonSection from '@/components/courses/module/ModuleLessonSection';
import StatusBadge from '@/components/page/StatusBadge';
import ModuleBreadcrumbs from '@/components/courses/module/ModuleBreadcrumbs';
import ModuleProgressBar from '@/components/courses/module/ModuleProgressBar';
import MhMwangazaScenario from '@/components/courses/MhMwangazaScenario';
import MhStoryLab from '@/components/courses/MhStoryLab';
import MhModule7KnowledgeCheck from '@/components/courses/MhModule7KnowledgeCheck';
import MhModule7Progress from '@/components/courses/MhModule7Progress';
import MhModuleNav from '@/components/courses/MhModuleNav';
import { GoldDivider, ModuleEmblem } from '@/components/courses/MhLessonOrnaments';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';
import { MH_MODULE_CONTENT } from '@/lib/i18n/mh-module-content';

const bodyText = { color: 'rgba(243,234,216,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };
const eyebrowStyle = { color: '#e8b85b', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500 };
const termHeading = { color: '#f8f0df', fontSize: 'clamp(1.05rem, 2.2vw, 1.3rem)', fontWeight: 400, lineHeight: 1.3, margin: '0 0 0.55rem' };
const competencyBoxStyle = { padding: '1.25rem 1.5rem', border: '1px solid rgba(232,184,91,0.22)', borderRadius: '4px', backgroundColor: 'rgba(243,234,216,0.015)', marginTop: '1.5rem' };
const disclaimerBoxStyle = { padding: '1.4rem 1.6rem', border: '1px solid rgba(232,184,91,0.28)', borderRadius: '4px', backgroundColor: 'rgba(232,184,91,0.05)', marginTop: '1.5rem' };
const boxStyle = { padding: '1.4rem 1.6rem', border: '1px solid rgba(232,184,91,0.18)', borderRadius: '4px', marginBottom: '1.5rem' };
const linkStyle = { color: '#e8b85b', textDecoration: 'none', borderBottom: '1px dotted rgba(232,184,91,0.5)' };

function renderRichText(text) {
  if (!text) return null;
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) => {
    if (i % 2 === 1) return <strong key={i} style={{ fontWeight: 500 }}>{part}</strong>;
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

function renderParagraphs(paragraphs) {
  if (!Array.isArray(paragraphs) || paragraphs.length === 0) return null;
  return paragraphs.map((p, i) => (
    <p key={i} className="font-body" style={{ ...bodyText, marginBottom: '1.15rem' }}>{renderRichText(p)}</p>
  ));
}

export default function MhModule7Lesson({ course, module: mod, lesson }) {
  const { content: c } = useTranslatedContent('mh-module-lesson-shared', MH_MODULE_CONTENT);
  const coursePath = `/courses/${course.slug}`;
  const modulePath = `${coursePath}/${mod.route}`;
  const moduleSlug = mod.route;

  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [mediaReviewed, setMediaReviewed] = useState({});
  const [mediaAckPending, setMediaAckPending] = useState(false);
  const [mediaAckError, setMediaAckError] = useState(false);

  function toggleMediaSession(key) {
    setMediaReviewed((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  const allMediaReviewed = lesson.coreMedia.sessions.every((s) => mediaReviewed[s.key]);

  async function handleMarkMediaReviewed() {
    if (mediaAckPending || !allMediaReviewed) return;
    setMediaAckPending(true); setMediaAckError(false);
    try {
      await base44.functions.invoke('updateMentalHealthProgress', {
        courseSlug: course.slug, moduleRoute: moduleSlug, action: 'acknowledge_module7_requirement', requirementKey: 'core-media-reviewed',
      });
      setRefreshTrigger((t) => t + 1);
    } catch (err) {
      setMediaAckError(true);
    } finally {
      setMediaAckPending(false);
    }
  }

  function renderExplanationSection(section) {
    return (
      <div key={section.sectionId} id={section.sectionId} style={{ marginBottom: '1.75rem' }}>
        <h3 className="font-heading" style={{ ...termHeading, fontSize: '1.15rem' }}>{section.heading}</h3>
        {section.paragraphs && section.paragraphs.map((p, i) => (
          <p key={i} className="font-body" style={{ ...bodyText, marginBottom: '0.85rem' }}>{renderRichText(p)}</p>
        ))}
        {section.numberedItems && (
          <ol className="font-body" style={{ ...bodyText, paddingLeft: '1.4rem', marginBottom: '0.85rem' }}>
            {section.numberedItems.map((item, i) => <li key={i} style={{ marginBottom: '0.4rem' }}>{renderRichText(item)}</li>)}
          </ol>
        )}
        {section.subBlocks && section.subBlocks.map((block, bi) => (
          <div key={bi} style={{ marginTop: '0.85rem' }}>
            {block.label && <p className="font-body" style={{ ...bodyText, fontWeight: 400, marginBottom: '0.5rem' }}>{renderRichText(block.label)}</p>}
            {block.numberedItems && (
              <ol className="font-body" style={{ ...bodyText, paddingLeft: '1.4rem', marginBottom: '0.85rem' }}>
                {block.numberedItems.map((item, i) => <li key={i} style={{ marginBottom: '0.4rem' }}>{renderRichText(item)}</li>)}
              </ol>
            )}
          </div>
        ))}
        {section.trailingParagraphs && section.trailingParagraphs.map((p, i) => (
          <p key={i} className="font-body" style={{ ...bodyText, marginBottom: '0.85rem' }}>{renderRichText(p)}</p>
        ))}
      </div>
    );
  }

  function renderMediaSession(session) {
    const isReviewed = !!mediaReviewed[session.key];
    return (
      <div key={session.key} style={{ marginBottom: '1.75rem' }}>
        <h3 className="font-heading" style={{ ...termHeading, fontSize: '1.1rem' }}>{session.title}</h3>
        <p className="font-body" style={{ ...bodyText, color: 'rgba(243,234,216,0.6)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
          <strong style={{ color: 'rgba(232,184,91,0.85)' }}>Hosts:</strong> {session.hosts} · <strong style={{ color: 'rgba(232,184,91,0.85)' }}>Publisher:</strong> {session.publisher} · <strong style={{ color: 'rgba(232,184,91,0.85)' }}>Length:</strong> {session.approximateLength}
        </p>
        <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(232,184,91,0.18)', backgroundColor: '#000000', marginBottom: '0.6rem' }}>
          <iframe src={session.embedUrl} title={session.title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }} />
        </div>
        <p className="font-body" style={{ ...bodyText, fontSize: '0.82rem', marginBottom: '0.4rem' }}>
          Direct link: <a href={session.watchUrl} target="_blank" rel="noopener noreferrer" style={linkStyle}>Open on YouTube</a>
          {' · '}
          <a href={session.officialPageUrl} target="_blank" rel="noopener noreferrer" style={linkStyle}>{session.officialPageLabel}</a>
          {' · '}
          <a href={`#${session.writtenAlternativeSectionId}`} style={linkStyle}>Written alternative</a>
        </p>
        <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', color: 'rgba(243,234,216,0.6)', fontSize: '0.82rem', marginBottom: '0.75rem' }}>{session.contentNote}</p>
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', cursor: 'pointer', padding: '0.6rem 0.9rem', border: `1px solid ${isReviewed ? 'rgba(232,184,91,0.4)' : 'rgba(232,184,91,0.18)'}`, borderRadius: '4px', backgroundColor: isReviewed ? 'rgba(232,184,91,0.04)' : 'transparent' }}>
          <input type="checkbox" checked={isReviewed} onChange={() => toggleMediaSession(session.key)} style={{ marginTop: '0.15rem' }} id={`media-ack-${session.key}`} />
          <span className="font-body" style={{ ...bodyText, fontSize: '0.85rem', margin: 0 }}>I have reviewed this session or its written alternative.</span>
        </label>
      </div>
    );
  }

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

      {/* 1. Module Overview */}
      <ModuleLessonSection id="module-overview" eyebrow={c.overviewEyebrow} heading={c.moduleOverviewHeadingAlt}>
        {renderParagraphs(lesson.moduleOverview.paragraphs)}
        <div style={competencyBoxStyle}>
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>{c.moduleCompetency}</span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>{lesson.moduleOverview.competency}</p>
        </div>
      </ModuleLessonSection>

      {/* 2. Learning Objectives */}
      <ModuleLessonSection id="learning-objectives" eyebrow={c.objectivesEyebrow} heading={c.objectivesHeading}>
        <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem' }}>
          {lesson.learningObjectives.objectives.map((obj, i) => <li key={i} style={{ marginBottom: '0.7rem' }}>{obj}</li>)}
        </ol>
        <div style={disclaimerBoxStyle} aria-label={c.disclaimerLabel}>
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>{c.disclaimerLabel}</span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>{lesson.learningObjectives.earlyDisclaimer}</p>
        </div>
      </ModuleLessonSection>

      {/* 3. Content Safety Note */}
      <ModuleLessonSection id="content-safety-note" eyebrow={c.contentSafetyNote} heading={c.contentSafetyNote}>
        <div style={boxStyle}>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0, fontSize: '0.88rem' }}>{lesson.contentSafetyNote}</p>
        </div>
      </ModuleLessonSection>

      {/* 4. Organizational Attribution */}
      <ModuleLessonSection id="organizational-attribution" eyebrow="Organizational attribution" heading="Organizational Attribution">
        <div style={boxStyle}>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0, fontSize: '0.88rem' }}>{lesson.organizationalAttribution}</p>
        </div>
      </ModuleLessonSection>

      {/* 5. Core Media — Anchor Media with review checkboxes */}
      <ModuleLessonSection id="core-media" eyebrow={c.coreMediaEyebrow} heading="Anchor Media">
        <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', color: 'rgba(243,234,216,0.6)', marginBottom: '1rem', fontSize: '0.85rem' }}>{lesson.coreMedia.attributionStatement}</p>
        {lesson.coreMedia.sessions.map((session) => renderMediaSession(session))}
        {allMediaReviewed && (
          <div style={{ marginTop: '1rem' }}>
            <button type="button" disabled={mediaAckPending} onClick={handleMarkMediaReviewed} className="font-body"
              style={{ color: '#24150f', backgroundColor: '#e8b85b', border: 'none', padding: '0.6rem 1.5rem', fontSize: '0.78rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', borderRadius: '2px', cursor: mediaAckPending ? 'wait' : 'pointer', opacity: mediaAckPending ? 0.7 : 1 }}>
              {mediaAckPending ? 'Saving...' : 'Mark all media reviewed'}
            </button>
            {mediaAckError && <p className="font-body" role="alert" style={{ color: '#e8955c', marginTop: '0.5rem', fontSize: '0.85rem' }}>We could not save your progress. Please try again.</p>}
          </div>
        )}
      </ModuleLessonSection>

      {/* 6. Questions to Consider */}
      <ModuleLessonSection id="questions-to-consider" eyebrow={c.watchEyebrow} heading="Questions to Consider While Listening">
        <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem' }}>
          {lesson.questionsToConsider.map((q, i) => <li key={i} style={{ marginBottom: '0.85rem' }}>{q}</li>)}
        </ol>
      </ModuleLessonSection>

      {/* 7. Original Tamu Academy Introduction */}
      <ModuleLessonSection id="tamu-introduction" eyebrow={c.introEyebrow} heading={c.introHeading}>
        {renderParagraphs(lesson.tamuIntroduction.paragraphs)}
      </ModuleLessonSection>

      {/* 8. Explanation */}
      <ModuleLessonSection id="explanation" eyebrow={c.explanationEyebrow} heading="Explanation">
        {lesson.explanation.map(renderExplanationSection)}
      </ModuleLessonSection>

      {/* 9. Scenario Safety Note */}
      <ModuleLessonSection id="scenario-safety-note" eyebrow="Before the scenario and STORY Lab" heading="Before the Scenario and STORY Lab">
        <div style={boxStyle}>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0, fontSize: '0.88rem' }}>{lesson.scenarioSafetyNote}</p>
        </div>
      </ModuleLessonSection>

      {/* 10. Interactive Scenario */}
      <ModuleLessonSection id="interactive-scenario" eyebrow={c.interactiveScenarioEyebrow} heading={`Interactive Scenario: ${lesson.interactiveScenario.title}`}>
        <MhMwangazaScenario courseSlug={course.slug} moduleSlug={moduleSlug} scenario={lesson.interactiveScenario} />
      </ModuleLessonSection>

      {/* 11. STORY Lab */}
      <ModuleLessonSection id="story-lab" eyebrow={lesson.storyLab.eyebrow} heading={lesson.storyLab.title}>
        <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', color: 'rgba(243,234,216,0.6)', marginBottom: '1rem', fontSize: '0.85rem' }}>{lesson.storyLab.subtitle}</p>
        <MhStoryLab courseSlug={course.slug} moduleRoute={moduleSlug} lab={lesson.storyLab} onCompleted={() => setRefreshTrigger((t) => t + 1)} />
      </ModuleLessonSection>

      {/* 12. Private Reflection */}
      <ModuleLessonSection id="private-reflection" eyebrow={c.reflectionEyebrow} heading={lesson.privateReflection.heading}>
        <p className="font-body" style={{ ...bodyText, marginBottom: '1rem' }}>{lesson.privateReflection.prompt}</p>
        <div style={disclaimerBoxStyle} aria-label="Privacy notice">
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>{c.privacy}</span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0, fontSize: '0.85rem' }}>{lesson.privateReflection.privacyNotice}</p>
        </div>
        <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', color: 'rgba(243,234,216,0.55)', fontSize: '0.82rem', marginTop: '1rem', marginBottom: 0 }}>{lesson.privateReflection.optionalNote}</p>
      </ModuleLessonSection>

      {/* 13. Knowledge Check */}
      <ModuleLessonSection id="knowledge-check" eyebrow={c.knowledgeCheckEyebrow} heading={lesson.knowledgeCheck.heading}>
        <MhModule7KnowledgeCheck courseSlug={course.slug} moduleSlug={moduleSlug} quiz={lesson.knowledgeCheck} onGraded={() => setRefreshTrigger((t) => t + 1)} />
      </ModuleLessonSection>

      {/* 14. Module Closing */}
      <ModuleLessonSection id="closing-section" eyebrow={c.closingEyebrow} heading={lesson.closing.heading}>
        {renderParagraphs(lesson.closing.paragraphs)}
        <div style={disclaimerBoxStyle} aria-label={c.disclaimerLabel}>
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>{c.disclaimerLabel}</span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>{lesson.closing.finalDisclaimer}</p>
        </div>
      </ModuleLessonSection>

      {/* 15. Completion Requirements */}
      <ModuleLessonSection id="completion-requirements" eyebrow={c.requirementsEyebrow} heading={lesson.completionRequirements.heading}>
        <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem' }}>
          {lesson.completionRequirements.items.map((item, i) => <li key={i} style={{ marginBottom: '0.7rem' }}>{item}</li>)}
        </ol>
        <MhModule7Progress courseSlug={course.slug} moduleRoute={moduleSlug} completionRequirements={lesson.completionRequirements} progressTracking={lesson.progressTracking} refreshTrigger={refreshTrigger} />
      </ModuleLessonSection>

      {/* 16. Optional Extended Assignment */}
      <ModuleLessonSection id="optional-extended-assignment" eyebrow={lesson.optionalExtendedAssignment.label} heading={lesson.optionalExtendedAssignment.heading}>
        <p className="font-body" style={{ ...bodyText, marginBottom: '1.15rem' }}>{lesson.optionalExtendedAssignment.instruction}</p>
        <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem' }}>
          {lesson.optionalExtendedAssignment.requirements.map((req, i) => <li key={i} style={{ marginBottom: '0.7rem' }}>{req}</li>)}
        </ol>
        <div style={disclaimerBoxStyle} aria-label={c.personalDisclosure}>
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>{c.personalDisclosure}</span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0, fontSize: '0.85rem' }}>{lesson.optionalExtendedAssignment.personalDisclosure}</p>
        </div>
      </ModuleLessonSection>

      {/* 17. Sources and Further Learning */}
      <ModuleLessonSection id="sources-further-learning" eyebrow={c.sourcesEyebrow} heading={lesson.sourcesFurtherLearning.heading}>
        <ul className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem', listStyle: 'none' }}>
          {lesson.sourcesFurtherLearning.items.map((src, i) => (
            <li key={i} style={{ marginBottom: '0.85rem' }}>
              <span style={{ display: 'block', marginBottom: '0.35rem' }}>{src.citation}</span>
              {src.url && <a href={src.url} target="_blank" rel="noopener noreferrer" style={{ ...linkStyle, overflowWrap: 'anywhere', wordBreak: 'break-all' }}>{src.url}</a>}
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
    </ModuleLessonLayout>
  );
}