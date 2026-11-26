import React, { useEffect, useRef, useState } from 'react';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

/** The course overview's standard sections, by anchor id. */
export const COURSE_SECTIONS = ['overview', 'outcomes', 'syllabus', 'credential'];

const CONTENT = {
  label: 'On this page',
  overview: 'Overview',
  outcomes: 'What You Will Learn',
  syllabus: 'Syllabus',
  credential: 'Credential & Capstone',
};

/**
 * Give every section the jump bar points to this style (or the
 * `tamu-jump-target` class), so a jump or a #link lands below the fixed site
 * header and the bar instead of under them.
 */
export const jumpTargetStyle = {
  scrollMarginTop: 'calc(var(--tamu-header-h, 104px) + var(--tamu-jumpbar-h, 52px) + 12px)',
};

/**
 * SectionJumpBar — a sticky row of anchor tabs below a page's hero
 * ("Overview | What You Will Learn | Syllabus | Credential & Capstone").
 *
 * It sticks just below the fixed site header, marks the section in view
 * (aria-current), scrolls smoothly (instantly with reduced motion) and keeps
 * the URL hash in step, so a jump can be shared. On phones the tabs scroll
 * sideways. It also publishes --tamu-header-h and --tamu-jumpbar-h on the
 * root element for jumpTargetStyle and sticky side cards.
 *
 * Props: sections (ids, default COURSE_SECTIONS) or items ([{ id, label }])
 * for custom labels; surface ('dark' | 'light'); inColumn (the bar sits in a
 * page column rather than spanning the page, so it drops its own gutter).
 */
export default function SectionJumpBar({ sections = COURSE_SECTIONS, items = null, surface = 'dark', inColumn = false }) {
  const { content: c } = useTranslatedContent('section-jump-bar', CONTENT);
  const list = items || sections.map((id) => ({ id, label: c[id] || id }));
  const barRef = useRef(null);
  const [active, setActive] = useState(list[0] ? list[0].id : null);
  const ids = list.map((s) => s.id).join('|');

  // Publish the header and bar heights for sticky offsets.
  useEffect(() => {
    const root = document.documentElement;
    const header = document.querySelector('header');
    const measure = () => {
      if (header) root.style.setProperty('--tamu-header-h', `${header.offsetHeight}px`);
      if (barRef.current) root.style.setProperty('--tamu-jumpbar-h', `${barRef.current.offsetHeight}px`);
    };
    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro) {
      if (header) ro.observe(header);
      if (barRef.current) ro.observe(barRef.current);
    }
    window.addEventListener('resize', measure);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener('resize', measure);
      root.style.removeProperty('--tamu-jumpbar-h');
    };
  }, []);

  // Mark the last section whose top has passed the bar.
  useEffect(() => {
    const sectionIds = ids.split('|');
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const line = (barRef.current ? barRef.current.getBoundingClientRect().bottom : 0) + 24;
        let current = sectionIds[0];
        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= line) current = id;
        }
        const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
        setActive(atBottom ? sectionIds[sectionIds.length - 1] : current);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll); };
  }, [ids]);

  // Keep the active tab visible when the row scrolls sideways. Only the row
  // moves: scrollIntoView would also scroll the page to the bar.
  useEffect(() => {
    const list = barRef.current && barRef.current.querySelector('.sjb-list');
    const tab = list && list.querySelector('[aria-current="true"]');
    if (!list || !tab) return;
    const left = tab.offsetLeft - list.offsetLeft;
    const right = left + tab.offsetWidth;
    if (left < list.scrollLeft) list.scrollLeft = left;
    else if (right > list.scrollLeft + list.clientWidth) list.scrollLeft = right - list.clientWidth;
  }, [active]);

  const jump = (event, id) => {
    const el = document.getElementById(id);
    if (!el) return;
    event.preventDefault();
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    window.history.replaceState(window.history.state, '', `#${id}`);
    setActive(id);
  };

  return (
    <nav ref={barRef} className={`sjb${surface === 'light' ? ' is-light' : ''}${inColumn ? ' is-column' : ''}`} aria-label={c.label}>
      <style>{SJB_CSS}</style>
      <ul className="sjb-list">
        {list.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className="font-body sjb-tab"
              aria-current={active === id ? 'true' : undefined}
              onClick={(e) => jump(e, id)}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const SJB_CSS = `
.sjb { --sjb-bg: rgba(26,17,12,0.96); --sjb-line: rgba(232,184,91,0.18); --sjb-text: rgba(243,234,216,0.72); --sjb-active: #e8b85b;
  position: sticky; top: var(--tamu-header-h, 104px); z-index: 30; background: var(--sjb-bg); border-bottom: 1px solid var(--sjb-line);
  backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); }
.sjb.is-light { --sjb-bg: rgba(250,246,236,0.97); --sjb-line: #dcc8a8; --sjb-text: #725a46; --sjb-active: #9b5d1d; }
.sjb-list { list-style: none; margin: 0 auto; padding: 0 clamp(1rem, 5vw, 3.5rem); max-width: 1200px; display: flex; gap: 0.25rem; overflow-x: auto; scrollbar-width: none; }
.sjb-list::-webkit-scrollbar { display: none; }
.sjb.is-column .sjb-list { padding: 0; max-width: none; }
.sjb.is-column li:first-child .sjb-tab { padding-left: 0; }
.sjb-tab { display: block; white-space: nowrap; padding: 0.95rem 0.85rem 0.85rem; color: var(--sjb-text); text-decoration: none; font-size: 0.78rem; letter-spacing: 0.06em; text-transform: uppercase; font-weight: 500; border-bottom: 2px solid transparent; }
.sjb-tab:hover { color: var(--sjb-active); }
.sjb-tab[aria-current="true"] { color: var(--sjb-active); border-bottom-color: var(--sjb-active); font-weight: 600; }
.sjb-tab:focus-visible { outline: 2px solid var(--sjb-active); outline-offset: -4px; }
.tamu-jump-target { scroll-margin-top: calc(var(--tamu-header-h, 104px) + var(--tamu-jumpbar-h, 52px) + 12px); }
`;
