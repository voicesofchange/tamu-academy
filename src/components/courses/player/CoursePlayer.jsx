import React, { useEffect, useRef, useState } from 'react';
import { PanelLeftClose, PanelLeftOpen, ListTree } from 'lucide-react';
import SiteShell from '@/components/page/SiteShell';
import { useDisplayMode } from '@/lib/display-mode';
import { fillTemplate } from '@/lib/i18n/fill-template';
import { useCoursePlayerLabels } from '@/components/courses/player/CoursePlayerLabelsProvider';
import CourseOutlineSidebar from '@/components/courses/player/CourseOutlineSidebar';

/**
 * CoursePlayer — the split-screen frame of a course module, shared by every
 * course that uses the player (the template courses and Sauti za Soko):
 *
 *   - a course progress bar under the site navigation, showing the course's
 *     completion percentage (the same figure as the learner's enrollment);
 *   - a left course outline that can be collapsed on wide screens and opens
 *     as a drawer on narrow ones;
 *   - the lesson itself on the right, at a comfortable reading measure;
 *   - a footer slot that stays at the bottom of the screen while the lesson
 *     scrolls (the "Mark Complete & Continue" bar).
 *
 * Props: `course` (title, progressPercentage, completedModules, totalModules
 * and the outline's `modules`), `currentRoute`, the current module's `steps`
 * for the outline, a `footer` element and the lesson as children. Each course
 * builds these from its own server-side progress report.
 *
 * The site frame clips horizontal overflow with `clip` rather than `hidden`
 * here, because `hidden` would stop the bar, the outline and the footer from
 * sticking.
 */

const COLLAPSE_KEY = 'tamu_template_outline_collapsed';

function readCollapsed() {
  try {
    return localStorage.getItem(COLLAPSE_KEY) === '1';
  } catch {
    return false;
  }
}

/** Keeps --tpl-nav-h equal to the fixed site navigation's height. */
function useNavHeightVar() {
  useEffect(() => {
    const header = document.querySelector('header');
    if (!header) return undefined;
    const root = document.documentElement;
    const apply = () => root.style.setProperty('--tpl-nav-h', `${Math.ceil(header.getBoundingClientRect().height)}px`);
    apply();
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(apply) : null;
    if (observer) observer.observe(header);
    window.addEventListener('resize', apply);
    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener('resize', apply);
      root.style.removeProperty('--tpl-nav-h');
    };
  }, []);
}

export default function CoursePlayer({ course, currentRoute, steps = [], footer, children }) {
  const L = useCoursePlayerLabels();
  const { isDataSaver } = useDisplayMode();
  const [collapsed, setCollapsed] = useState(readCollapsed);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef(null);
  useNavHeightVar();

  const percent = Math.max(0, Math.min(100, Math.round(Number(course.progressPercentage) || 0)));
  const total = course.totalModules || course.modules.length;
  const completed = course.completedModules ?? course.modules.filter((item) => item.completed).length;

  const toggleCollapsed = () => {
    setCollapsed((value) => {
      const next = !value;
      try {
        localStorage.setItem(COLLAPSE_KEY, next ? '1' : '0');
      } catch {
        // Storage unavailable — the choice lasts for this page only.
      }
      return next;
    });
  };

  // The drawer closes on Escape and when the module changes.
  useEffect(() => {
    if (!drawerOpen) return undefined;
    const onKey = (event) => { if (event.key === 'Escape') setDrawerOpen(false); };
    document.addEventListener('keydown', onKey);
    const first = drawerRef.current && drawerRef.current.querySelector('button, a');
    if (first) first.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [drawerOpen]);
  useEffect(() => { setDrawerOpen(false); }, [currentRoute]);

  return (
    <SiteShell overflowX="clip" mainStyle={{ paddingTop: 'var(--tpl-nav-h, 96px)' }}>
      <style>{PLAYER_CSS}</style>

      {/* Course progress bar */}
      <div className="tpl-progress">
        <div className="tpl-progress-row">
          <button
            type="button"
            className="tpl-icon-button tpl-only-wide"
            onClick={toggleCollapsed}
            aria-expanded={!collapsed}
            aria-controls="tpl-outline"
            aria-label={collapsed ? L.showOutline : L.hideOutline}
            title={collapsed ? L.showOutline : L.hideOutline}
          >
            {collapsed ? <PanelLeftOpen size={18} aria-hidden="true" /> : <PanelLeftClose size={18} aria-hidden="true" />}
          </button>
          <button
            type="button"
            className="tpl-outline-button tpl-only-narrow font-body"
            onClick={() => setDrawerOpen(true)}
            aria-expanded={drawerOpen}
            aria-controls="tpl-outline-drawer"
          >
            <ListTree size={16} aria-hidden="true" />
            {L.outlineButton}
          </button>

          <div style={{ flex: '1 1 auto', minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.4rem' }}>
              <span className="font-body tpl-course-title">{course.title}</span>
              <span className="font-body" style={{ color: '#e8b85b', fontSize: '0.78rem', fontWeight: 600, whiteSpace: 'nowrap' }}>
                {fillTemplate(L.percentComplete, { percent })}
              </span>
            </div>
            <div
              role="progressbar"
              aria-label={L.courseProgress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={percent}
              aria-valuetext={fillTemplate(L.modulesComplete, { completed, total })}
              className="tpl-progress-track"
            >
              <div className="tpl-progress-fill" style={{ width: `${percent}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className={`tpl-layout${collapsed ? ' is-collapsed' : ''}`}>
        <aside id="tpl-outline" className="tpl-sidebar" hidden={collapsed}>
          <CourseOutlineSidebar course={course} currentRoute={currentRoute} steps={steps} />
        </aside>

        <div className="tpl-content" style={{ maxWidth: isDataSaver ? '700px' : '800px' }}>
          {children}
        </div>
      </div>

      {footer}

      {drawerOpen && (
        <div className="tpl-drawer-backdrop" onClick={() => setDrawerOpen(false)}>
          <div
            id="tpl-outline-drawer"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label={L.outlineHeading}
            className="tpl-drawer"
            onClick={(event) => event.stopPropagation()}
          >
            <CourseOutlineSidebar
              course={course}
              currentRoute={currentRoute}
              steps={steps}
              onClose={() => setDrawerOpen(false)}
              onNavigate={() => setDrawerOpen(false)}
            />
          </div>
        </div>
      )}
    </SiteShell>
  );
}

const PLAYER_CSS = `
.tpl-progress {
  position: sticky;
  top: var(--tpl-nav-h, 96px);
  z-index: 30;
  background: rgba(28,18,13,0.96);
  border-bottom: 1px solid rgba(232,184,91,0.14);
  backdrop-filter: blur(8px);
}
.tpl-progress-row {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.7rem clamp(1rem, 3vw, 2rem);
}
.tpl-course-title {
  color: #f3ead8;
  font-size: 0.82rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.tpl-progress-track {
  height: 6px;
  border-radius: 999px;
  background: rgba(243,234,216,0.1);
  overflow: hidden;
}
.tpl-progress-fill {
  height: 100%;
  border-radius: 999px;
  background: #e8b85b;
  transition: width 0.5s ease;
}
.tpl-layout {
  display: grid;
  grid-template-columns: 300px minmax(0, 1fr);
  align-items: start;
}
.tpl-layout.is-collapsed { grid-template-columns: minmax(0, 1fr); }
.tpl-sidebar {
  position: sticky;
  top: calc(var(--tpl-nav-h, 96px) + 58px);
  max-height: calc(100vh - var(--tpl-nav-h, 96px) - 58px - 76px);
  overflow-y: auto;
  padding: 1.5rem 1rem 1.5rem clamp(1rem, 2vw, 1.5rem);
  border-right: 1px solid rgba(232,184,91,0.1);
}
.tpl-content {
  width: 100%;
  margin: 0 auto;
  padding: 2.5rem clamp(1.25rem, 5vw, 3rem) 3rem;
  box-sizing: border-box;
}
/* Clears the fixed navigation and the sticky progress bar when the outline
   jumps to a section. !important because lesson sections set their own
   inline scroll margin for pages without the bar. */
.tpl-content section, .tpl-content [id^="tpl-step-"] {
  scroll-margin-top: calc(var(--tpl-nav-h, 96px) + 84px) !important;
}
.tpl-icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  flex-shrink: 0;
  color: #e8b85b;
  background: transparent;
  border: 1px solid rgba(232,184,91,0.3);
  border-radius: 4px;
  cursor: pointer;
}
.tpl-outline-button {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  flex-shrink: 0;
  color: #e8b85b;
  background: transparent;
  border: 1px solid rgba(232,184,91,0.35);
  border-radius: 4px;
  padding: 0.45rem 0.7rem;
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
}
.tpl-outline-link:hover { background-color: rgba(243,234,216,0.05) !important; }
.tpl-icon-button:focus-visible, .tpl-outline-button:focus-visible, .tpl-outline-link:focus-visible {
  outline: 2px solid rgba(232,184,91,0.75);
  outline-offset: 2px;
}
.tpl-drawer-backdrop {
  position: fixed;
  inset: 0;
  z-index: 60;
  background: rgba(10,6,4,0.6);
}
.tpl-drawer {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: min(340px, 88vw);
  overflow-y: auto;
  padding: 1.25rem 1rem;
  background: #24150f;
  border-right: 1px solid rgba(232,184,91,0.2);
}
.tpl-only-narrow { display: none; }
@media (max-width: 959px) {
  .tpl-only-wide { display: none; }
  .tpl-only-narrow { display: inline-flex; }
  .tpl-layout, .tpl-layout.is-collapsed { grid-template-columns: minmax(0, 1fr); }
  .tpl-sidebar { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .tpl-progress-fill { transition: none; }
}
`;
