import React, { useState } from 'react';
import MhMwangazaScenario from '@/components/courses/MhMwangazaScenario';
import MhStoryLab from '@/components/courses/MhStoryLab';
import MhModule7KnowledgeCheck from '@/components/courses/MhModule7KnowledgeCheck';
import MhModule7Progress from '@/components/courses/MhModule7Progress';

const bodyText = { color: 'rgba(245,239,224,0.78)', fontSize: '0.95rem', lineHeight: 1.85, fontWeight: 300 };
const eyebrowStyle = { color: '#D4A12A', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500 };
const headingStyle = { color: '#F5EFE0', fontSize: '1.3rem', fontWeight: 400, lineHeight: 1.3, margin: '0 0 1rem' };
const sectionStyle = { marginBottom: '2.5rem' };
const boxStyle = { padding: '1.3rem 1.5rem', border: '1px solid rgba(212,161,42,0.18)', borderRadius: '4px', marginBottom: '1.5rem' };
const linkStyle = { color: '#D4A12A', textDecoration: 'none', borderBottom: '1px dotted rgba(212,161,42,0.5)' };

function renderRich(text) {
  return { __html: text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') };
}

export default function MhModule7Lesson({ course, module: moduleMeta, lesson }) {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const courseSlug = 'mental-health-community-and-culture';
  const moduleSlug = 'module-7';

  function renderExplanationSection(section) {
    return (
      <div key={section.sectionId} style={{ marginBottom: '1.75rem' }}>
        <h3 className="font-heading" style={{ ...headingStyle, fontSize: '1.15rem' }}>{section.heading}</h3>
        {section.paragraphs && section.paragraphs.map((p, i) => (
          <p key={i} className="font-body" style={{ ...bodyText, marginBottom: '0.85rem' }} dangerouslySetInnerHTML={renderRich(p)} />
        ))}
        {section.numberedItems && (
          <ol className="font-body" style={{ ...bodyText, paddingLeft: '1.2rem', marginBottom: '0.85rem' }}>
            {section.numberedItems.map((item, i) => <li key={i} style={{ marginBottom: '0.4rem' }} dangerouslySetInnerHTML={renderRich(item)} />)}
          </ol>
        )}
        {section.subBlocks && section.subBlocks.map((block, bi) => (
          <div key={bi} style={{ marginTop: '0.85rem' }}>
            {block.label && <p className="font-body" style={{ ...bodyText, fontWeight: 400, marginBottom: '0.5rem' }} dangerouslySetInnerHTML={renderRich(block.label)} />}
            {block.numberedItems && (
              <ol className="font-body" style={{ ...bodyText, paddingLeft: '1.2rem', marginBottom: '0.85rem' }}>
                {block.numberedItems.map((item, i) => <li key={i} style={{ marginBottom: '0.4rem' }} dangerouslySetInnerHTML={renderRich(item)} />)}
              </ol>
            )}
          </div>
        ))}
        {section.trailingParagraphs && section.trailingParagraphs.map((p, i) => (
          <p key={i} className="font-body" style={{ ...bodyText, marginBottom: '0.85rem' }} dangerouslySetInnerHTML={renderRich(p)} />
        ))}
      </div>
    );
  }

  function renderMediaSession(session) {
    return (
      <div key={session.key} style={{ marginBottom: '1.75rem' }}>
        <h3 className="font-heading" style={{ ...headingStyle, fontSize: '1.1rem' }}>{session.title}</h3>
        <p className="font-body" style={{ ...bodyText, color: 'rgba(245,239,224,0.6)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
          <strong style={{ color: 'rgba(212,161,42,0.85)' }}>Hosts:</strong> {session.hosts} · <strong style={{ color: 'rgba(212,161,42,0.85)' }}>Publisher:</strong> {session.publisher} · <strong style={{ color: 'rgba(212,161,42,0.85)' }}>Length:</strong> {session.approximateLength}
        </p>
        <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(212,161,42,0.18)', backgroundColor: '#000000', marginBottom: '0.6rem' }}>
          <iframe src={session.embedUrl} title={session.title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }} />
        </div>
        <p className="font-body" style={{ ...bodyText, fontSize: '0.82rem', marginBottom: '0.4rem' }}>
          Direct link: <a href={session.watchUrl} target="_blank" rel="noopener noreferrer" style={linkStyle}>Open on YouTube</a>
          {' · '}
          <a href={session.officialPageUrl} target="_blank" rel="noopener noreferrer" style={linkStyle}>{session.officialPageLabel}</a>
        </p>
        <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', color: 'rgba(245,239,224,0.6)', fontSize: '0.82rem', margin: 0 }}>{session.contentNote}</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1A130E', padding: '2rem 1.5rem 4rem' }}>
      <div style={{ maxWidth: '780px', margin: '0 auto' }}>
        <p className="font-body" style={{ ...eyebrowStyle, marginBottom: '0.75rem' }}>{course.title}</p>
        <h1 className="font-heading" style={{ color: '#F5EFE0', fontSize: '1.75rem', fontWeight: 400, lineHeight: 1.2, marginBottom: '0.5rem' }}>Roots of Resilience: Storytelling, Survival, and Collective Healing</h1>
        <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', color: 'rgba(245,239,224,0.6)', marginBottom: '2rem' }}>{moduleMeta.estimatedTime}</p>

        {/* Module Overview */}
        <div style={sectionStyle}>
          <h2 className="font-heading" style={headingStyle}>Module Overview</h2>
          {lesson.moduleOverview.paragraphs.map((p, i) => (
            <p key={i} className="font-body" style={{ ...bodyText, marginBottom: '0.85rem' }}>{p}</p>
          ))}
          <div style={boxStyle}>
            <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.45rem' }}>Core competency</span>
            <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>{lesson.moduleOverview.competency}</p>
          </div>
        </div>

        {/* Learning Objectives */}
        <div style={sectionStyle}>
          <h2 className="font-heading" style={headingStyle}>Learning Objectives</h2>
          <ol className="font-body" style={{ ...bodyText, paddingLeft: '1.2rem' }}>
            {lesson.learningObjectives.objectives.map((obj, i) => <li key={i} style={{ marginBottom: '0.5rem' }}>{obj}</li>)}
          </ol>
          <div style={boxStyle}>
            <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.45rem' }}>Required educational disclaimer</span>
            <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0, fontSize: '0.88rem' }}>{lesson.learningObjectives.earlyDisclaimer}</p>
          </div>
        </div>

        {/* Content Safety Note */}
        <div style={boxStyle}>
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.45rem' }}>Content safety note</span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0, fontSize: '0.88rem' }}>{lesson.contentSafetyNote}</p>
        </div>

        {/* Organizational Attribution */}
        <div style={boxStyle}>
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.45rem' }}>Organizational attribution</span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0, fontSize: '0.88rem' }}>{lesson.organizationalAttribution}</p>
        </div>

        {/* Core Media */}
        <div style={sectionStyle}>
          <h2 className="font-heading" style={headingStyle}>Anchor Media</h2>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', color: 'rgba(245,239,224,0.6)', marginBottom: '1rem', fontSize: '0.85rem' }}>{lesson.coreMedia.attributionStatement}</p>
          {lesson.coreMedia.sessions.map(renderMediaSession)}
        </div>

        {/* Questions to Consider */}
        <div style={sectionStyle}>
          <h2 className="font-heading" style={headingStyle}>Questions to Consider While Listening</h2>
          <ol className="font-body" style={{ ...bodyText, paddingLeft: '1.2rem' }}>
            {lesson.questionsToConsider.map((q, i) => <li key={i} style={{ marginBottom: '0.5rem' }}>{q}</li>)}
          </ol>
        </div>

        {/* Tamu Introduction */}
        <div style={sectionStyle}>
          <h2 className="font-heading" style={headingStyle}>Original Tamu Academy Introduction</h2>
          {lesson.tamuIntroduction.paragraphs.map((p, i) => (
            <p key={i} className="font-body" style={{ ...bodyText, marginBottom: '0.85rem' }}>{p}</p>
          ))}
        </div>

        {/* Explanation Sections */}
        <div style={sectionStyle}>
          <h2 className="font-heading" style={headingStyle}>Explanation</h2>
          {lesson.explanation.map(renderExplanationSection)}
        </div>

        {/* Scenario Safety Note */}
        <div style={boxStyle}>
          <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.45rem' }}>Before the scenario and STORY Lab</span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0, fontSize: '0.88rem' }}>{lesson.scenarioSafetyNote}</p>
        </div>

        {/* Interactive Scenario */}
        <div style={sectionStyle}>
          <h2 className="font-heading" style={headingStyle}>Interactive Scenario: {lesson.interactiveScenario.title}</h2>
          <MhMwangazaScenario courseSlug={courseSlug} moduleSlug={moduleSlug} scenario={lesson.interactiveScenario} />
        </div>

        {/* STORY Lab */}
        <div style={sectionStyle}>
          <h2 className="font-heading" style={headingStyle}>{lesson.storyLab.title}</h2>
          <p className="font-body" style={{ ...eyebrowStyle, marginBottom: '0.5rem' }}>{lesson.storyLab.eyebrow}</p>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', color: 'rgba(245,239,224,0.6)', marginBottom: '1rem', fontSize: '0.85rem' }}>{lesson.storyLab.subtitle}</p>
          <MhStoryLab courseSlug={courseSlug} moduleRoute={moduleSlug} lab={lesson.storyLab} onCompleted={() => setRefreshTrigger((t) => t + 1)} />
        </div>

        {/* Private Reflection */}
        <div style={sectionStyle}>
          <h2 className="font-heading" style={headingStyle}>{lesson.privateReflection.heading}</h2>
          <p className="font-body" style={{ ...bodyText, marginBottom: '1rem' }}>{lesson.privateReflection.prompt}</p>
          <div style={boxStyle}>
            <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.45rem' }}>Privacy notice</span>
            <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0, fontSize: '0.85rem' }}>{lesson.privateReflection.privacyNotice}</p>
          </div>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', color: 'rgba(245,239,224,0.55)', fontSize: '0.82rem' }}>{lesson.privateReflection.optionalNote}</p>
        </div>

        {/* Knowledge Check */}
        <div style={sectionStyle}>
          <h2 className="font-heading" style={headingStyle}>{lesson.knowledgeCheck.heading}</h2>
          <MhModule7KnowledgeCheck courseSlug={courseSlug} moduleSlug={moduleSlug} quiz={lesson.knowledgeCheck} onGraded={() => setRefreshTrigger((t) => t + 1)} />
        </div>

        {/* Closing */}
        <div style={sectionStyle}>
          <h2 className="font-heading" style={headingStyle}>{lesson.closing.heading}</h2>
          {lesson.closing.paragraphs.map((p, i) => (
            <p key={i} className="font-body" style={{ ...bodyText, marginBottom: '0.85rem' }}>{p}</p>
          ))}
          <div style={boxStyle}>
            <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0, fontSize: '0.88rem' }}>{lesson.closing.finalDisclaimer}</p>
          </div>
        </div>

        {/* Completion Requirements */}
        <div style={sectionStyle}>
          <h2 className="font-heading" style={headingStyle}>{lesson.completionRequirements.heading}</h2>
          <ol className="font-body" style={{ ...bodyText, paddingLeft: '1.2rem' }}>
            {lesson.completionRequirements.items.map((item, i) => <li key={i} style={{ marginBottom: '0.5rem' }}>{item}</li>)}
          </ol>
        </div>

        {/* Optional Extended Assignment */}
        <div style={sectionStyle}>
          <h2 className="font-heading" style={headingStyle}>{lesson.optionalExtendedAssignment.heading}</h2>
          <p className="font-body" style={{ ...eyebrowStyle, marginBottom: '0.5rem' }}>{lesson.optionalExtendedAssignment.label}</p>
          <p className="font-body" style={{ ...bodyText, marginBottom: '1rem' }}>{lesson.optionalExtendedAssignment.instruction}</p>
          <ol className="font-body" style={{ ...bodyText, paddingLeft: '1.2rem', marginBottom: '1rem' }}>
            {lesson.optionalExtendedAssignment.requirements.map((req, i) => <li key={i} style={{ marginBottom: '0.4rem' }}>{req}</li>)}
          </ol>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', color: 'rgba(245,239,224,0.6)', fontSize: '0.85rem' }}>{lesson.optionalExtendedAssignment.personalDisclosure}</p>
        </div>

        {/* Sources */}
        <div style={sectionStyle}>
          <h2 className="font-heading" style={headingStyle}>{lesson.sourcesFurtherLearning.heading}</h2>
          <ul className="font-body" style={{ ...bodyText, paddingLeft: '1.2rem', listStyle: 'none' }}>
            {lesson.sourcesFurtherLearning.items.map((src, i) => (
              <li key={i} style={{ marginBottom: '0.6rem' }}>
                {src.citation} {src.url && <a href={src.url} target="_blank" rel="noopener noreferrer" style={linkStyle}>Source</a>}
              </li>
            ))}
          </ul>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', color: 'rgba(245,239,224,0.55)', fontSize: '0.82rem' }}>{lesson.sourcesFurtherLearning.reviewNote}</p>
        </div>

        {/* Progress Tracking */}
        <div style={sectionStyle}>
          <h2 className="font-heading" style={headingStyle}>{lesson.progressTracking.heading}</h2>
          <MhModule7Progress courseSlug={courseSlug} moduleRoute={moduleSlug} completionRequirements={lesson.completionRequirements} progressTracking={lesson.progressTracking} refreshTrigger={refreshTrigger} />
        </div>
      </div>
    </div>
  );
}