import React, { useEffect, useRef } from 'react';
import { getEconomicsCourseBySlug } from '@/lib/economics-tracks';

const COURSE_SLUG = 'understanding-african-economies-and-the-global-system';

/**
 * Shortened public descriptions used on the Academy page. Titles are pulled
 * from the existing economics course data (kept in sync); the long internal
 * module descriptions are NOT exposed on the public page.
 */
const MODULE_PREVIEWS = [
  'Scarcity, trade-offs, opportunity cost, incentives, institutions, and everyday economic choices.',
  'Households, informal activity, agriculture, enterprises, finance, and public institutions.',
  'Prices, purchasing power, wages, work, household pressure, and economic security.',
  'Trade, foreign exchange, value chains, borrowing, debt, and local value capture.',
  'Assets, access, accountability, participation, opportunity, and inclusive development.',
  'Industrialization, technology, regional integration, climate resilience, ownership, and shared prosperity.',
];

/**
 * ModuleJourney — public curriculum preview of the six-module economics
 * pathway. Uses subtle scroll-based parallax on desktop browsers (>=768px)
 * without prefers-reduced-motion. Falls back to a static editorial layout
 * on mobile or when reduced motion is enabled (no JS parallax).
 *
 * Decorative module numbers are aria-hidden; titles, descriptions, and
 * status remain fully readable in the document flow at all times. The
 * order is conveyed through ordered list semantics AND the visible
 * "Module 01..06" eyebrow — parallax is never the only ordering cue.
 *
 * No new animation library; uses requestAnimationFrame with a passive
 * scroll listener; no scroll hijacking. No links to gated module routes.
 */
export default function ModuleJourney() {
  const found = getEconomicsCourseBySlug(COURSE_SLUG);
  const course = found?.course;
  const itemsRef = useRef([]);

  const resetTransforms = () => {
    const items = itemsRef.current;
    for (let i = 0; i < items.length; i++) {
      const el = items[i];
      if (!el) continue;
      const numberEl = el.querySelector('[data-parallax-number]');
      if (numberEl) numberEl.style.transform = '';
    }
  };

  useEffect(() => {
    if (!course || !course.modules || course.modules.length === 0) return;

    const reduceMq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileMq = window.matchMedia('(max-width: 767px)');
    if (reduceMq.matches || mobileMq.matches) {
      resetTransforms();
      return;
    }

    let rafId = null;
    const update = () => {
      rafId = null;
      const vh = window.innerHeight || 1;
      const items = itemsRef.current;
      for (let i = 0; i < items.length; i++) {
        const el = items[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const rel = (center - vh / 2) / vh; // -0.5..0.5 across viewport
        const numberEl = el.querySelector('[data-parallax-number]');
        if (numberEl) {
          // Move the decorative number slightly more slowly than scroll:
          // the foreground content scrolls naturally while the number
          // drifts by a fraction of the viewport offset.
          numberEl.style.transform = `translate3d(0, ${(rel * -32).toFixed(2)}px, 0)`;
        }
      }
    };
    const schedule = () => {
      if (rafId == null) rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [course]);

  if (!course) return null;

  return (
    <section
      aria-labelledby="module-journey-heading"
      id="modules"
      className="academy-module-journey"
    >
      <header className="academy-section-head">
        <p className="academy-eyebrow">Module Journey</p>
        <h2 id="module-journey-heading" className="academy-h2 font-heading">
          The Six-Module Journey
        </h2>
        <p className="academy-section-support">
          A public preview of the curriculum sequence. Each module remains in active development and will become available when the full course launches.
        </p>
      </header>

      <ol className="academy-modules-list">
        {course.modules.map((m, i) => {
          const idx = String(i + 1).padStart(2, '0');
          const preview = MODULE_PREVIEWS[i] ?? m.description;
          return (
            <li
              key={m.route || idx}
              ref={(el) => (itemsRef.current[i] = el)}
              className="academy-module-row"
            >
              <div className="academy-module-number-wrap" aria-hidden="true">
                <span className="academy-module-number font-heading" data-parallax-number>
                  {idx}
                </span>
              </div>
              <div className="academy-module-content">
                <p className="academy-eyebrow academy-eyebrow-mute">Module {idx}</p>
                <h3 className="academy-module-title font-heading">{m.title}</h3>
                <p className="academy-module-desc font-body">{preview}</p>
                <p className="academy-status academy-status-line">
                  <span className="academy-status-dot" aria-hidden="true" />
                  In Development
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      <style>{`
.academy-module-journey {
  padding: clamp(2.5rem, 5vw, 3.5rem) 0;
  max-width: 1080px;
  margin: 0 auto;
}
.academy-modules-list {
  list-style: none;
  padding: 0;
  margin: 2rem 0 0;
  position: relative;
}
.academy-module-row {
  position: relative;
  padding: clamp(2.25rem, 5vw, 3.75rem) clamp(1rem, 4vw, 3rem);
  min-height: 220px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(212,161,42,0.1);
  overflow: hidden;
}
.academy-module-number-wrap {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: clamp(0.5rem, 3vw, 3rem);
  pointer-events: none;
  overflow: hidden;
}
.academy-module-number {
  font-size: clamp(6rem, 18vw, 12rem);
  color: rgba(212,161,42,0.1);
  font-weight: 400;
  letter-spacing: -0.02em;
  line-height: 1;
  user-select: none;
  will-change: transform;
  transform: translate3d(0, 0, 0);
}
.academy-module-content {
  position: relative;
  z-index: 1;
  max-width: 560px;
  margin-right: auto;
}
.academy-module-title {
  color: #F5EFE0;
  font-size: clamp(1.45rem, 3.4vw, 2.05rem);
  font-weight: 400;
  line-height: 1.22;
  margin: 0.4rem 0 0.85rem;
  letter-spacing: 0.005em;
}
.academy-module-desc {
  color: rgba(245,239,224,0.72);
  font-size: clamp(0.95rem, 2vw, 1.05rem);
  line-height: 1.7;
  font-weight: 300;
  margin: 0 0 0.85rem;
}
@media (prefers-reduced-motion: reduce) {
  .academy-module-number {
    transform: none !important;
  }
}
@media (max-width: 767px) {
  .academy-module-row {
    min-height: auto;
    padding: 2rem 1.25rem;
    flex-direction: column;
    align-items: flex-start;
  }
  .academy-module-number-wrap {
    justify-content: flex-start;
    align-items: flex-start;
    padding-right: 0;
    padding-top: 0.5rem;
  }
  .academy-module-number {
    font-size: clamp(4.25rem, 18vw, 6rem);
    color: rgba(212,161,42,0.08);
  }
  .academy-module-content {
    margin-top: clamp(2rem, 10vw, 3rem);
    max-width: 100%;
  }
}
`}</style>
    </section>
  );
}