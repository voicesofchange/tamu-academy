import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Lock, Eye, Clock } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';
import { getCourseData } from '@/lib/course-directory';

/**
 * CourseSyllabusAccordion — an expandable module list for a course: each
 * module's title, summary and lesson sections.
 *
 * Module 1 carries a "Free Preview" badge and opens for anyone; for a visitor
 * who is not signed in, later modules show a lock and ask for a free account.
 * Titles and summaries come from the course's own public data; the section
 * headings come from getCourseSyllabus (headings only, no lesson text). Every
 * word is translated for the reader.
 *
 * Props: courseSlug; routes (optional — show only these modules, e.g. one
 * Building Wealth Together track); surface ('dark' | 'light'); compact (the
 * narrow layout, for course cards).
 */

const CONTENT = {
  freePreview: 'Free Preview',
  locked: 'Free account needed',
  inThisModule: 'In this module',
  sectionsLoading: 'Loading the lesson outline…',
  previewModule: 'Preview this module free',
  openModule: 'Open module',
  createAccount: 'Create a free account to unlock',
};

// One request per course, shared by every accordion on the page.
const syllabusCache = new Map();
function loadSyllabus(courseSlug) {
  if (!syllabusCache.has(courseSlug)) {
    syllabusCache.set(
      courseSlug,
      base44.functions
        .invoke('getCourseSyllabus', { courseSlug })
        .then((res) => (res && res.data && Array.isArray(res.data.modules) ? res.data.modules : []))
        .catch(() => {
          syllabusCache.delete(courseSlug);
          return [];
        }),
    );
  }
  return syllabusCache.get(courseSlug);
}

export default function CourseSyllabusAccordion({ courseSlug, routes = null, surface = 'dark', compact = false }) {
  const course = getCourseData(courseSlug);
  const { isAuthenticated } = useAuth();
  const { content: c } = useTranslatedContent('course-syllabus-ui', CONTENT);
  const [syllabus, setSyllabus] = useState(null);
  const [open, setOpen] = useState(() => new Set());

  useEffect(() => {
    let cancelled = false;
    loadSyllabus(courseSlug).then((modules) => { if (!cancelled) setSyllabus(modules); });
    return () => { cancelled = true; };
  }, [courseSlug]);

  const modules = useMemo(() => {
    const list = course ? course.modules : [];
    return routes ? list.filter((m) => routes.includes(m.route)) : list;
  }, [course, routes]);

  // The text to translate: titles, summaries and headings, as one object per
  // course that only changes when the syllabus arrives.
  const text = useMemo(() => {
    const sectionsByRoute = new Map((syllabus || []).map((m) => [m.route, m.sections || []]));
    return Object.fromEntries((course ? course.modules : []).map((m) => [m.route, {
      number: m.number || '',
      title: m.title || '',
      estimatedTime: m.estimatedTime || '',
      description: m.description || '',
      sections: sectionsByRoute.get(m.route) || [],
    }]));
  }, [course, syllabus]);
  // The hook translates once per key, so the key changes when the headings
  // arrive: the titles show at once and the headings follow.
  const { content: shown } = useTranslatedContent(
    `course-syllabus-${courseSlug}${syllabus && syllabus.length ? '-full' : ''}`,
    text,
  );

  if (!course) return null;
  const light = surface === 'light';
  const toggle = (route) => setOpen((prev) => {
    const next = new Set(prev);
    if (next.has(route)) next.delete(route);
    else next.add(route);
    return next;
  });

  return (
    <div className={`syllabus${light ? ' is-light' : ''}${compact ? ' is-compact' : ''}`}>
      <style>{SYLLABUS_CSS}</style>
      <ul className="syllabus-list">
        {modules.map((m) => {
          const isFirst = m.route === 'module-1';
          const isOpen = open.has(m.route);
          const lockedForVisitor = !isAuthenticated && !isFirst;
          const t = (shown && shown[m.route]) || text[m.route] || {};
          const panelId = `syllabus-${courseSlug}-${m.route}`;
          const modulePath = `/courses/${courseSlug}/${m.route}`;
          return (
            <li key={m.route} className="syllabus-item">
              <h3 className="syllabus-heading">
                <button
                  type="button"
                  className="syllabus-toggle"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(m.route)}
                >
                  <span className="syllabus-number font-body">{t.number || m.number}</span>
                  <span className="syllabus-title font-heading">{t.title || m.title}</span>
                  <span className="syllabus-badges">
                    {isFirst && <span className="syllabus-badge is-free font-body"><Eye size={13} aria-hidden="true" /> {c.freePreview}</span>}
                    {lockedForVisitor && (
                      <span className="syllabus-badge is-locked font-body">
                        <Lock size={13} aria-hidden="true" />
                        <span className="sr-only">{c.locked}</span>
                      </span>
                    )}
                    <ChevronDown size={18} aria-hidden="true" className="syllabus-chevron" />
                  </span>
                </button>
              </h3>
              <div id={panelId} className="syllabus-panel" hidden={!isOpen}>
                {m.estimatedTime && (
                  <p className="font-body syllabus-time"><Clock size={13} aria-hidden="true" /> {t.estimatedTime || m.estimatedTime}</p>
                )}
                {(t.description || m.description) && <p className="font-body syllabus-desc">{t.description || m.description}</p>}
                <p className="font-body syllabus-sub">{c.inThisModule}</p>
                {syllabus === null ? (
                  <p className="font-body syllabus-desc">{c.sectionsLoading}</p>
                ) : (
                  <ul className="font-body syllabus-sections">
                    {(t.sections && t.sections.length ? t.sections : (text[m.route] || {}).sections || []).map((section, i) => (
                      <li key={i}>{section}</li>
                    ))}
                  </ul>
                )}
                {isFirst ? (
                  <Link to={modulePath} className="font-body syllabus-cta">{isAuthenticated ? c.openModule : c.previewModule} →</Link>
                ) : lockedForVisitor ? (
                  <Link to={`/register?returnTo=${encodeURIComponent(`${modulePath}?enroll=1`)}`} className="font-body syllabus-cta is-quiet">{c.createAccount} →</Link>
                ) : (
                  <Link to={modulePath} className="font-body syllabus-cta is-quiet">{c.openModule} →</Link>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const SYLLABUS_CSS = `
.syllabus { --sy-line: rgba(232,184,91,0.18); --sy-text: #f3ead8; --sy-muted: rgba(243,234,216,0.72); --sy-accent: #e8b85b; --sy-bg: rgba(243,234,216,0.02); }
.syllabus.is-light { --sy-line: #dcc8a8; --sy-text: #39251b; --sy-muted: #725a46; --sy-accent: #9b5d1d; --sy-bg: #fffaf1; }
.syllabus-list { list-style: none; margin: 0; padding: 0; border: 1px solid var(--sy-line); border-radius: 8px; overflow: hidden; background: var(--sy-bg); }
.syllabus-item + .syllabus-item { border-top: 1px solid var(--sy-line); }
.syllabus-heading { margin: 0; font-size: inherit; }
.syllabus-toggle { width: 100%; display: flex; align-items: center; gap: 0.9rem; padding: 1rem 1.1rem; background: transparent; border: none; text-align: left; cursor: pointer; color: var(--sy-text); }
.syllabus-toggle:focus-visible { outline: 2px solid var(--sy-accent); outline-offset: -2px; }
.syllabus-number { flex-shrink: 0; color: var(--sy-accent); font-size: 0.66rem; letter-spacing: 0.14em; text-transform: uppercase; min-width: 4.8rem; }
.syllabus-title { flex: 1; min-width: 0; font-size: 1.05rem; line-height: 1.35; }
.syllabus-badges { display: inline-flex; align-items: center; gap: 0.5rem; flex-shrink: 0; }
.syllabus-badge { display: inline-flex; align-items: center; gap: 0.3rem; font-size: 0.66rem; letter-spacing: 0.08em; text-transform: uppercase; font-weight: 600; border-radius: 999px; padding: 0.25rem 0.55rem; }
.syllabus-badge.is-free { background: var(--sy-accent); color: #24150f; }
.syllabus.is-light .syllabus-badge.is-free { color: #fffaf1; }
.syllabus-badge.is-locked { color: var(--sy-muted); padding: 0.25rem; }
.syllabus-chevron { color: var(--sy-muted); transition: transform 0.2s ease; }
.syllabus-toggle[aria-expanded="true"] .syllabus-chevron { transform: rotate(180deg); }
.syllabus-panel { padding: 0 1.1rem 1.2rem calc(1.1rem + 4.8rem + 0.9rem); }
.syllabus-time { display: inline-flex; align-items: center; gap: 0.35rem; color: var(--sy-muted); font-size: 0.78rem; margin: 0 0 0.5rem; }
.syllabus-desc { color: var(--sy-muted); font-size: 0.9rem; line-height: 1.65; margin: 0 0 0.85rem; }
.syllabus-sub { color: var(--sy-accent); font-size: 0.64rem; letter-spacing: 0.16em; text-transform: uppercase; margin: 0 0 0.4rem; }
.syllabus-sections { margin: 0 0 1rem; padding-left: 1.15rem; color: var(--sy-text); font-size: 0.88rem; line-height: 1.75; }
.syllabus-cta { display: inline-flex; align-items: center; color: #24150f; background: var(--sy-accent); padding: 0.55rem 0.95rem; border-radius: 6px; text-decoration: none; font-size: 0.72rem; letter-spacing: 0.08em; text-transform: uppercase; font-weight: 700; }
.syllabus.is-light .syllabus-cta { color: #fffaf1; }
.syllabus-cta.is-quiet { background: transparent; color: var(--sy-accent); padding-left: 0; border-bottom: 1px solid var(--sy-accent); border-radius: 0; }
.syllabus-cta:focus-visible { outline: 2px solid var(--sy-text); outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) { .syllabus-chevron { transition: none; } }
.syllabus.is-compact .syllabus-toggle { flex-wrap: wrap; gap: 0.35rem 0.6rem; padding: 0.8rem 0.9rem; }
.syllabus.is-compact .syllabus-number { min-width: 0; width: 100%; }
.syllabus.is-compact .syllabus-title { font-size: 0.95rem; }
.syllabus.is-compact .syllabus-panel { padding: 0 0.9rem 1rem; }
@media (max-width: 639px) {
  .syllabus-toggle { flex-wrap: wrap; gap: 0.4rem 0.75rem; }
  .syllabus-number { min-width: 0; width: 100%; }
  .syllabus-panel { padding-left: 1.1rem; }
}
`;
