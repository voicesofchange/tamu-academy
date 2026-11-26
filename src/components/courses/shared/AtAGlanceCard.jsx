import React from 'react';
import { Layers, Clock, BarChart3, Timer, Globe, Award, ClipboardList } from 'lucide-react';
import { useCourseFactText } from '@/components/courses/shared/useCourseFacts';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

const CONTENT = {
  heading: 'At a Glance',
  modules: 'Modules',
  duration: 'Estimated time',
  level: 'Level',
  pace: 'Pace',
  languages: 'Languages',
  credential: 'Credential',
  deliverable: 'Practical deliverable',
};

/**
 * AtAGlanceCard — a course's facts in one bordered card: modules, estimated
 * time, level, pace, languages, credential and practical deliverable, each
 * read from the course's own data (src/lib/course-facts.js).
 *
 * `sticky` keeps it in view while the page scrolls, below the fixed site
 * header (desktop only; on phones it sits inline). `surface="light"` for
 * parchment, dark by default.
 */
export default function AtAGlanceCard({ slug, surface = 'dark', sticky = false, headingLevel = 'h2' }) {
  const facts = useCourseFactText();
  const { content: c } = useTranslatedContent('at-a-glance', CONTENT);
  const course = facts.course(slug);
  if (!course) return null;
  const Heading = headingLevel;

  const rows = [
    { Icon: Layers, label: c.modules, value: String(course.moduleCount) },
    { Icon: Clock, label: c.duration, value: facts.hours(slug) },
    course.level ? { Icon: BarChart3, label: c.level, value: course.level } : null,
    { Icon: Timer, label: c.pace, value: facts.labels.selfPaced },
    { Icon: Globe, label: c.languages, value: course.languages.join(' · ') },
    { Icon: Award, label: c.credential, value: facts.labels.credential, note: facts.labels.qrVerified },
    course.deliverable ? { Icon: ClipboardList, label: c.deliverable, value: course.deliverable } : null,
  ].filter(Boolean);

  return (
    <aside className={`aag${surface === 'light' ? ' is-light' : ''}${sticky ? ' is-sticky' : ''}`} aria-labelledby={`aag-${slug}`}>
      <style>{AAG_CSS}</style>
      <Heading id={`aag-${slug}`} className="font-body aag-heading">{c.heading}</Heading>
      <dl className="aag-list">
        {rows.map(({ Icon, label, value, note }) => (
          <div key={label} className="aag-row">
            <Icon size={17} strokeWidth={1.7} aria-hidden="true" className="aag-icon" />
            <div>
              <dt className="font-body aag-label">{label}</dt>
              <dd className="font-body aag-value">
                {value}
                {note && <span className="aag-note">{note}</span>}
              </dd>
            </div>
          </div>
        ))}
      </dl>
    </aside>
  );
}

const AAG_CSS = `
.aag { --aag-bg: rgba(36,21,15,0.55); --aag-line: rgba(232,184,91,0.28); --aag-text: #f3ead8; --aag-muted: rgba(243,234,216,0.62); --aag-accent: #e8b85b;
  background: var(--aag-bg); border: 1px solid var(--aag-line); border-radius: 10px; padding: 1.25rem 1.35rem; }
.aag.is-light { --aag-bg: #fffaf1; --aag-line: #dcc8a8; --aag-text: #39251b; --aag-muted: #806b58; --aag-accent: #b97827; }
.aag-heading { color: var(--aag-accent); font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase; font-weight: 600; margin: 0 0 0.9rem; }
.aag-list { margin: 0; display: grid; gap: 0.85rem; }
.aag-row { display: flex; gap: 0.75rem; align-items: flex-start; }
.aag-row + .aag-row { border-top: 1px solid var(--aag-line); padding-top: 0.85rem; }
.aag-icon { color: var(--aag-accent); flex-shrink: 0; margin-top: 0.15rem; }
.aag-label { color: var(--aag-muted); font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 0.15rem; }
.aag-value { color: var(--aag-text); font-size: 0.92rem; line-height: 1.45; margin: 0; }
.aag-note { display: block; margin-top: 0.2rem; color: var(--aag-accent); font-size: 0.68rem; letter-spacing: 0.08em; text-transform: uppercase; font-weight: 600; }
@media (min-width: 900px) { .aag.is-sticky { position: sticky; top: calc(var(--tamu-header-h, 104px) + var(--tamu-jumpbar-h, 0px) + 16px); } }
`;
