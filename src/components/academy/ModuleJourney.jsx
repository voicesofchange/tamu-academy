import React, { useEffect, useRef, useState } from 'react';
import { getEconomicsCourseBySlug } from '@/lib/economics-tracks';

const COURSE_SLUG = 'understanding-african-economies-and-the-global-system';

/**
 * Shortened public descriptions. Titles are pulled from the live module
 * objects in economics-tracks.js so the public page stays in sync with the
 * internal curriculum; internal long descriptions, learning objectives,
 * quizzes, and activities are NOT exposed here.
 */
const MODULE_PREVIEWS = [
  'Scarcity, trade-offs, opportunity cost, incentives, institutions, and everyday economic choices.',
  'Households, informal activity, agriculture, enterprises, finance, and public institutions.',
  'Prices, purchasing power, wages, work, household pressure, and economic security.',
  'Trade, foreign exchange, value chains, borrowing, debt, and local value capture.',
  'Assets, access, accountability, participation, opportunity, and inclusive development.',
  'Industrialization, technology, regional integration, climate resilience, ownership, and shared prosperity.',
];

// Motion ranges (px). Layer 1 (number) moves opposite to scroll; Layer 2
// (accent) moves in the same axis at a smaller magnitude and opposite sign.
const NUMBER_MOVE_DESKTOP = 140;
const NUMBER_MOVE_TABLET = 80;
const ACCENT_MOVE_DESKTOP = 70;
const ACCENT_MOVE_TABLET = 40;
const ENTRANCE_MOVE = 24; // foreground entrance on every viewport size

function getRange() {
  if (typeof window === 'undefined') {
    return { number: NUMBER_MOVE_DESKTOP, accent: ACCENT_MOVE_DESKTOP };
  }
  const w = window.innerWidth || 1024;
  if (w >= 1024) return { number: NUMBER_MOVE_DESKTOP, accent: ACCENT_MOVE_DESKTOP };
  if (w >= 768) return { number: NUMBER_MOVE_TABLET, accent: ACCENT_MOVE_TABLET };
  return { number: 0, accent: 0 }; // mobile: no JS parallax (entrance only)
}

export default function ModuleJourney() {
  const found = getEconomicsCourseBySlug(COURSE_SLUG);
  const course = found?.course;
  const itemsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    if (!course || !course.modules || course.modules.length === 0) return;

    const items = itemsRef.current;
    if (!items || items.length === 0) return;

    const reduceMq = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Active-marker observer: fires when a row enters the central ~20% of
    // the viewport. We pick the topmost intersecting row so scrolling down
    // transitions cleanly through module 1 → 6.
    const activeObserver = new IntersectionObserver(
      (entries) => {
        let bestIdx = null;
        let bestTop = Infinity;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const top = entry.boundingClientRect.top;
          if (top < bestTop) {
            bestTop = top;
            bestIdx = Number(entry.target.dataset.index);
          }
        }
        if (bestIdx !== null) {
          setActiveIndex((prev) => (prev === bestIdx ? prev : bestIdx));
        }
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    // Entrance observer: each foreground content block fades/rises once.
    // Unobserves immediately so it never fires again for the same row.
    const entranceObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('academy-module-entered');
            entranceObserver.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.18 }
    );

    items.forEach((el) => {
      if (el) {
        activeObserver.observe(el);
        const content = el.querySelector('[data-module-content]');
        if (content) entranceObserver.observe(content);
      }
    });

    // Parallax via rAF + passive scroll. Foreground scrolls normally; we only
    // transform Layer 1 (number) and Layer 2 (accent). No scroll hijacking.
    let rafId = null;
    const update = () => {
      rafId = null;
      if (reduceMq.matches) return;
      const range = getRange();
      if (range.number === 0) return; // mobile: no JS parallax
      const vh = window.innerHeight || 1;
      for (let i = 0; i < items.length; i++) {
        const el = items[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        // progress: -1 when row center is at viewport bottom, +1 at top
        const progress = (vh / 2 - center) / (vh / 2);
        const numberEl = el.querySelector('[data-parallax-number]');
        const accentEl = el.querySelector('[data-parallax-accent]');
        if (numberEl) {
          // Number drifts UP as the user scrolls down → moves slower than page
          numberEl.style.transform = `translate3d(0, ${(progress * -range.number).toFixed(2)}px, 0)`;
        }
        if (accentEl) {
          // Accent moves opposite direction at a smaller magnitude
          accentEl.style.transform = `translate3d(0, ${(progress * range.accent).toFixed(2)}px, 0)`;
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
      activeObserver.disconnect();
      entranceObserver.disconnect();
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

      <div className="academy-modules-wrap">
        <ol className="academy-modules-list">
          {course.modules.map((m, i) => {
            const idx = String(i + 1).padStart(2, '0');
            const preview = MODULE_PREVIEWS[i] ?? m.description;
            const alignRight = i % 2 === 1;
            return (
              <li
                key={m.route || idx}
                data-index={i}
                ref={(el) => (itemsRef.current[i] = el)}
                className={`academy-module-row ${
                  alignRight ? 'academy-module-right' : 'academy-module-left'
                }`}
              >
                {/* Layer 1 — oversized decorative module number */}
                <div className="academy-module-number-wrap" aria-hidden="true">
                  <span
                    className="academy-module-number font-heading"
                    data-parallax-number
                  >
                    {idx}
                  </span>
                </div>

                {/* Layer 2 — restrained accent band (opposite direction) */}
                <span
                  className="academy-module-accent"
                  data-parallax-accent
                  aria-hidden="true"
                />

                {/* Layer 3 — foreground content (scrolls normally, entrance only) */}
                <div
                  className="academy-module-content"
                  data-module-content
                >
                  <p className="academy-eyebrow academy-eyebrow-mute">
                    Module {idx}
                  </p>
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

        {/* Supplementary progress rail (decorative, aria-hidden) */}
        <aside className="academy-progress-rail" aria-hidden="true">
          <ol className="academy-progress-list">
            {course.modules.map((m, i) => {
              const idx = String(i + 1).padStart(2, '0');
              const state =
                activeIndex === i
                  ? 'active'
                  : activeIndex > i
                  ? 'passed'
                  : 'pending';
              return (
                <li
                  key={m.route || idx}
                  className={`academy-progress-marker academy-progress-${state}`}
                >
                  <span className="academy-progress-dot" />
                  <span className="academy-progress-label font-body">{idx}</span>
                </li>
              );
            })}
          </ol>
        </aside>
      </div>

      <style>{`
.academy-module-journey {
  position: relative;
  padding: clamp(2.5rem, 5vw, 3.5rem) clamp(1.5rem, 5vw, 4rem);
  max-width: 1280px;
  margin: 0 auto;
}
.academy-modules-wrap {
  position: relative;
}
@media (min-width: 1024px) {
  .academy-modules-wrap { padding-right: 3rem; }
}
@media (min-width: 768px) and (max-width: 1023px) {
  .academy-modules-wrap { padding-right: 2.25rem; }
}

.academy-modules-list {
  list-style: none;
  padding: 0;
  margin: 2.5rem 0 0;
  position: relative;
}

/* ---------- Layer containers ---------- */
.academy-module-row {
  position: relative;
  min-height: 78vh;
  display: flex;
  align-items: center;
  padding: clamp(2rem, 5vw, 4rem) 0;
  overflow: hidden;
  border-bottom: 1px solid rgba(212,161,42,0.1);
}
.academy-module-row:nth-child(even) {
  background: linear-gradient(
    180deg,
    rgba(245,239,224,0.012) 0%,
    rgba(245,239,224,0.03) 50%,
    rgba(245,239,224,0.012) 100%
  );
}

/* Layer 1 — oversized number (centered inside a wrapper so JS transform
   adds movement on top of position, never replacing a centering transform) */
.academy-module-number-wrap {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
}
.academy-module-left .academy-module-number-wrap {
  justify-content: flex-end;
  padding-right: clamp(2rem, 8vw, 6rem);
}
.academy-module-right .academy-module-number-wrap {
  justify-content: flex-start;
  padding-left: clamp(2rem, 8vw, 6rem);
}
.academy-module-number {
  font-size: clamp(11rem, 28vw, 22rem);
  color: rgba(212,161,42,0.09);
  font-weight: 400;
  letter-spacing: -0.04em;
  line-height: 0.85;
  user-select: none;
  will-change: transform;
  transform: translate3d(0, 0, 0);
}
.academy-module-right .academy-module-number {
  color: rgba(245,239,224,0.07);
}

/* Layer 2 — wide translucent accent band (moves opposite to number) */
.academy-module-accent {
  position: absolute;
  left: 0;
  right: 0;
  top: 32%;
  height: clamp(4rem, 12vw, 8rem);
  background: linear-gradient(
    90deg,
    rgba(212,161,42,0) 0%,
    rgba(212,161,42,0.08) 50%,
    rgba(212,161,42,0) 100%
  );
  z-index: 1;
  pointer-events: none;
  will-change: transform;
  transform: translate3d(0, 0, 0);
}
.academy-module-right .academy-module-accent {
  top: 56%;
  background: linear-gradient(
    90deg,
    rgba(92,117,111,0) 0%,
    rgba(92,117,111,0.07) 50%,
    rgba(92,117,111,0) 100%
  );
}

/* Layer 3 — foreground content */
.academy-module-content {
  position: relative;
  z-index: 2;
  max-width: 46ch;
  padding: 0 clamp(1.5rem, 5vw, 3.5rem);
  opacity: 0.7;
  transform: translate3d(0, ${ENTRANCE_MOVE}px, 0);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.academy-module-entered .academy-module-content {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}
.academy-module-left .academy-module-content {
  margin-right: auto;
}
.academy-module-right .academy-module-content {
  margin-left: auto;
}
.academy-module-title {
  color: #F5EFE0;
  font-size: clamp(1.6rem, 3.6vw, 2.3rem);
  font-weight: 400;
  line-height: 1.2;
  margin: 0.4rem 0 0.85rem;
  letter-spacing: 0.005em;
}
.academy-module-desc {
  color: rgba(245,239,224,0.75);
  font-size: clamp(0.98rem, 2vw, 1.1rem);
  line-height: 1.7;
  font-weight: 300;
  margin: 0 0 1rem;
}

/* ---------- Progress rail ---------- */
.academy-progress-rail {
  position: absolute;
  right: clamp(0.5rem, 1.5vw, 1.25rem);
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  pointer-events: none;
  z-index: 3;
}
.academy-progress-list {
  list-style: none;
  padding: 0;
  margin: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  position: relative;
  min-height: 70vh;
}
.academy-progress-list::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0.5rem;
  bottom: 0.5rem;
  width: 1px;
  background: rgba(212,161,42,0.18);
  transform: translateX(-50%);
}
.academy-progress-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  position: relative;
}
.academy-progress-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #1A130E;
  border: 1px solid rgba(212,161,42,0.4);
  transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
}
.academy-progress-label {
  font-size: 0.55rem;
  letter-spacing: 0.16em;
  color: rgba(245,239,224,0.3);
  text-transform: uppercase;
  transition: color 0.3s ease;
}
.academy-progress-active .academy-progress-dot {
  background: #D4A12A;
  border-color: #D4A12A;
  transform: scale(1.45);
  box-shadow: 0 0 0 4px rgba(212,161,42,0.18);
}
.academy-progress-active .academy-progress-label { color: #D4A12A; }
.academy-progress-passed .academy-progress-dot {
  background: rgba(212,161,42,0.45);
  border-color: rgba(212,161,42,0.55);
}

/* ---------- Tablet (768–1023) ---------- */
@media (max-width: 1023px) and (min-width: 768px) {
  .academy-module-row { min-height: 68vh; }
  .academy-module-number { font-size: clamp(8rem, 22vw, 14rem); }
  .academy-module-content { max-width: 40ch; }
  .academy-progress-rail { right: 0.5rem; }
}

/* ---------- Mobile (<768) ---------- */
@media (max-width: 767px) {
  .academy-module-journey {
    padding: clamp(2rem, 5vw, 3rem) clamp(1rem, 5vw, 2rem);
  }
  .academy-modules-wrap { padding-right: 0; }
  .academy-module-row {
    min-height: auto;
    flex-direction: column;
    align-items: flex-start;
    padding: clamp(2.5rem, 8vw, 4rem) 0;
  }
  .academy-module-number-wrap {
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0.5rem 0 0 0;
  }
  .academy-module-left .academy-module-number-wrap,
  .academy-module-right .academy-module-number-wrap {
    justify-content: flex-start;
    padding: 0.5rem 0 0 0;
  }
  .academy-module-number {
    font-size: clamp(5rem, 22vw, 8rem);
    color: rgba(212,161,42,0.1);
  }
  .academy-module-accent { display: none; }
  .academy-module-content {
    max-width: 100%;
    padding: 0;
    margin: clamp(2.5rem, 12vw, 4rem) 0 0 0;
  }
  .academy-progress-rail { display: none; }
}

/* ---------- Reduced motion ---------- */
@media (prefers-reduced-motion: reduce) {
  .academy-module-number,
  .academy-module-accent {
    transform: none !important;
    will-change: auto;
  }
  .academy-module-content {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
  .academy-progress-dot,
  .academy-progress-label {
    transition: none !important;
  }
}
`}</style>
    </section>
  );
}