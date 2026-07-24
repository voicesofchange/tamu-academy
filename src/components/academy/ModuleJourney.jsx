import React, { useEffect, useRef, useState } from 'react';
import { getEconomicsCourseBySlug } from '@/lib/economics-tracks';

const COURSE_SLUG = 'understanding-african-economies-and-the-global-system';

/**
 * Shortened public descriptions. Titles are pulled from the live module
 * objects in economics-tracks.js so the public page stays in sync with the
 * internal curriculum; internal long descriptions, quizzes, and activities
 * are NOT exposed here. Module previews are not interactive and never link
 * to gated module routes.
 */
const MODULE_PREVIEWS = [
  'Scarcity, trade-offs, opportunity cost, incentives, institutions, and everyday economic choices.',
  'Households, informal activity, agriculture, enterprises, finance, and public institutions.',
  'Prices, purchasing power, wages, work, household pressure, and economic security.',
  'Trade, foreign exchange, value chains, borrowing, debt, and local value capture.',
  'Assets, access, accountability, participation, opportunity, and inclusive development.',
  'Industrialization, technology, regional integration, climate resilience, ownership, and shared prosperity.',
];

/* Piecewise interpolation tables. progress 0.5 = section center at
   viewport vertical center; progress 0 = far below; progress 1 = far above. */
const ROW_STOPS = [
  { p: 0.0, opacity: 0.15, scale: 0.92, ty: 70 },
  { p: 0.25, opacity: 0.55, scale: 0.96, ty: 35 },
  { p: 0.5, opacity: 1, scale: 1, ty: 0 },
  { p: 0.75, opacity: 1, scale: 1, ty: -8 },
  { p: 1.0, opacity: 0.78, scale: 0.985, ty: -30 },
];
const ROW_STOPS_MOBILE = [
  { p: 0.0, opacity: 0.35, scale: 0.97, ty: 30 },
  { p: 0.5, opacity: 1, scale: 1, ty: 0 },
  { p: 1.0, opacity: 0.9, scale: 1, ty: -10 },
];
const NUMBER_STOPS = [
  { p: 0.0, opacity: 0.06, scale: 0.78, ty: 20 },
  { p: 0.5, opacity: 0.18, scale: 1, ty: 0 },
  { p: 1.0, opacity: 0.1, scale: 1.08, ty: -20 },
];
const NUMBER_STOPS_MOBILE = [
  { p: 0.0, opacity: 0.05, scale: 0.86, ty: 12 },
  { p: 0.5, opacity: 0.14, scale: 1, ty: 0 },
  { p: 1.0, opacity: 0.08, scale: 1.05, ty: -8 },
];
const ACCENT_STOPS = [
  { p: 0.0, scaleX: 0, opacity: 0 },
  { p: 0.5, scaleX: 1, opacity: 1 },
  { p: 1.0, scaleX: 0.5, opacity: 0.5 },
];

const lerp = (a, b, t) => a + (b - a) * t;
const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

function sampleStops(stops, p) {
  if (p <= stops[0].p) return stops[0];
  if (p >= stops[stops.length - 1].p) return stops[stops.length - 1];
  for (let i = 0; i < stops.length - 1; i++) {
    if (p <= stops[i + 1].p) {
      const a = stops[i];
      const b = stops[i + 1];
      const t = (p - a.p) / (b.p - a.p);
      const out = { p };
      for (const k of Object.keys(a)) {
        if (k === 'p') continue;
        out[k] = lerp(a[k], b[k], t);
      }
      return out;
    }
  }
  return stops[stops.length - 1];
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

    /* Active marker (progress rail) — topmost row in the central strip wins. */
    const activeObserver = new IntersectionObserver(
      (entries) => {
        let bestIdx = null;
        let bestTop = Infinity;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (entry.boundingClientRect.top < bestTop) {
            bestTop = entry.boundingClientRect.top;
            bestIdx = Number(entry.target.dataset.index);
          }
        }
        if (bestIdx !== null) {
          setActiveIndex((prev) => (prev === bestIdx ? prev : bestIdx));
        }
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );
    items.forEach((el) => el && activeObserver.observe(el));

    /* Active class on the closest row deepens the title. */
    const activeClassObserver = new IntersectionObserver(
      (entries) => {
        let bestIdx = -1;
        let bestTop = Infinity;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (entry.boundingClientRect.top < bestTop) {
            bestTop = entry.boundingClientRect.top;
            bestIdx = Number(entry.target.dataset.index);
          }
        }
        items.forEach((el, i) => {
          if (el) el.classList.toggle('is-active-module', i === bestIdx);
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    items.forEach((el) => el && activeClassObserver.observe(el));

    let rafId = null;
    const isMobile = () => (window.innerWidth || 1024) < 768;

    const writeDefaults = (el) => {
      el.style.setProperty('--module-opacity', 1);
      el.style.setProperty('--module-scale', 1);
      el.style.setProperty('--module-ty', '0px');
      el.style.setProperty('--number-opacity', 0.1);
      el.style.setProperty('--number-scale', 1);
      el.style.setProperty('--number-ty', '0px');
      el.style.setProperty('--accent-scalex', 1);
      el.style.setProperty('--accent-opacity', 1);
    };

    /**
     * Per-frame progress write. Pure CSS-variable writes — no React state
     * in the animation loop, GPU-friendly opacity + transform driven by
     * var() in CSS. This is the PRIMARY path for all browsers; native
     * scroll-timeline CSS was tested first (per spec) and reported support
     * without visible animation in the live preview, so JS is used here.
     */
    const update = () => {
      rafId = null;
      if (reduceMq.matches) {
        for (const el of items) el && writeDefaults(el);
        return;
      }
      const vh = window.innerHeight || 1;
      const rowStops = isMobile() ? ROW_STOPS_MOBILE : ROW_STOPS;
      const numStops = isMobile() ? NUMBER_STOPS_MOBILE : NUMBER_STOPS;
      for (const el of items) {
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const progress = clamp01(1 - center / vh);
        const row = sampleStops(rowStops, progress);
        const num = sampleStops(numStops, progress);
        const acc = sampleStops(ACCENT_STOPS, progress);
        el.style.setProperty('--module-opacity', row.opacity.toFixed(3));
        el.style.setProperty('--module-scale', row.scale.toFixed(4));
        el.style.setProperty('--module-ty', `${row.ty.toFixed(2)}px`);
        el.style.setProperty('--number-opacity', num.opacity.toFixed(3));
        el.style.setProperty('--number-scale', num.scale.toFixed(4));
        el.style.setProperty('--number-ty', `${num.ty.toFixed(2)}px`);
        el.style.setProperty('--accent-scalex', acc.scaleX.toFixed(3));
        el.style.setProperty('--accent-opacity', acc.opacity.toFixed(3));
      }
    };

    const schedule = () => {
      if (rafId == null) rafId = requestAnimationFrame(update);
    };

    /* ====== TEMPORARY DIAGNOSTIC (remove after live-preview confirmation) ======
       Logs once on mount + samples scroll-driven var writes for the first 8s.
       Gated to dev/preview build only via import.meta.env.DEV (Vite). */
    const isDev =
      typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV;
    if (isDev) {
      try {
        const supportInfo =
          typeof CSS !== 'undefined' && typeof CSS.supports === 'function'
            ? CSS.supports('animation-timeline', 'view()')
            : false;
        console.log('[ModuleJourney diagnostic]', {
          cssAnimationTimelineSupported: supportInfo,
          reducedMotionActive: reduceMq.matches,
          itemCount: items.length,
          renderedPath: 'js-primary (rAF + CSS variables)',
        });
      } catch (e) {
        /* swallow */
      }
    }

    let diagnosticBudgetMs = 8000;
    const diagnosticStart = performance.now();
    let lastSampleTime = 0;
    const onDiagnosticScroll = () => {
      if (performance.now() - diagnosticStart > diagnosticBudgetMs) return;
      const now = performance.now();
      if (now - lastSampleTime < 240) return;
      lastSampleTime = now;
      const samples = items.map((el, i) =>
        el
          ? {
              i,
              op: el.style.getPropertyValue('--module-opacity'),
              sc: el.style.getPropertyValue('--module-scale'),
              ty: el.style.getPropertyValue('--module-ty'),
              nop: el.style.getPropertyValue('--number-opacity'),
            }
          : null
      );
      console.log('[ModuleJourney scroll update]', samples);
    };
    if (isDev) {
      window.addEventListener('scroll', onDiagnosticScroll, { passive: true });
      setTimeout(() => {
        window.removeEventListener('scroll', onDiagnosticScroll);
        console.log('[ModuleJourney diagnostic] ended after 8s.');
      }, 8200);
    }
    /* ====== END TEMPORARY DIAGNOSTIC ====== */

    /* Begin update loop immediately + on scroll/resize. Single passive
       scroll listener coalesces a single rAF per frame. */
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('scroll', onDiagnosticScroll);
      activeObserver.disconnect();
      activeClassObserver.disconnect();
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
                {/* Oversized decorative module number (Layer 1, aria-hidden) */}
                <div className="academy-module-number-wrap" aria-hidden="true">
                  <span className="academy-module-number font-heading">{idx}</span>
                </div>

                {/* Accent gold rule that grows with scroll progress (Layer 2) */}
                <span className="academy-module-accent-line" aria-hidden="true" />

                {/* Foreground content (Layer 3) */}
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
.academy-modules-wrap { position: relative; }
@media (min-width: 1024px) { .academy-modules-wrap { padding-right: 3rem; } }
@media (min-width: 768px) and (max-width: 1023px) { .academy-modules-wrap { padding-right: 2.25rem; } }

.academy-modules-list {
  list-style: none;
  padding: 0;
  margin: 2.5rem 0 0;
  position: relative;
}

/* ---------- Module row (Layer 3 container) ---------- */
.academy-module-row {
  position: relative;
  min-height: 78vh;
  display: flex;
  align-items: center;
  padding: clamp(2rem, 5vw, 4rem) 0;
  overflow: hidden;
  border-bottom: 1px solid rgba(212,161,42,0.1);
  /* Variable defaults — content remains fully visible before JS writes
     per-frame values, so the page is readable even if JS is disabled. */
  --module-opacity: 1;
  --module-scale: 1;
  --module-ty: 0px;
  --number-opacity: 0.1;
  --number-scale: 1;
  --number-ty: 0px;
  --accent-scalex: 1;
  --accent-opacity: 1;
  opacity: var(--module-opacity, 1);
  transform: translate3d(0, var(--module-ty, 0px), 0) scale(var(--module-scale, 1));
  will-change: transform, opacity;
}
.academy-module-row:nth-child(even) {
  background: linear-gradient(180deg, rgba(245,239,224,0.012) 0%, rgba(245,239,224,0.03) 50%, rgba(245,239,224,0.012) 100%);
}

/* ---------- Layer 1 — oversized decorative number ---------- */
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
  color: #D4A12A;
  font-weight: 400;
  letter-spacing: -0.04em;
  line-height: 0.85;
  user-select: none;
  will-change: transform, opacity;
  opacity: var(--number-opacity, 0.1);
  transform: translate3d(0, var(--number-ty, 0px), 0) scale(var(--number-scale, 1));
}
.academy-module-right .academy-module-number { color: #F5EFE0; }

/* ---------- Layer 2 — accent gold rule that grows with progress ---------- */
.academy-module-accent-line {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 2px;
  background: linear-gradient(90deg, rgba(212,161,42,0) 0%, rgba(212,161,42,0.65) 50%, rgba(212,161,42,0) 100%);
  transform-origin: left center;
  opacity: var(--accent-opacity, 1);
  transform: scaleX(var(--accent-scalex, 1));
  z-index: 1;
  pointer-events: none;
  will-change: transform, opacity;
}
.academy-module-right .academy-module-accent-line {
  background: linear-gradient(90deg, rgba(92,117,111,0) 0%, rgba(92,117,111,0.55) 50%, rgba(92,117,111,0) 100%);
}

/* ---------- Layer 3 — foreground content ---------- */
.academy-module-content {
  position: relative;
  z-index: 2;
  max-width: 46ch;
  padding: 0 clamp(1.5rem, 5vw, 3.5rem);
  text-align: left;
}
.academy-module-left .academy-module-content { margin-right: auto; }
.academy-module-right .academy-module-content { margin-left: auto; }
.academy-module-title {
  color: #F5EFE0;
  font-size: clamp(1.6rem, 3.6vw, 2.3rem);
  font-weight: 400;
  line-height: 1.2;
  margin: 0.4rem 0 0.85rem;
  letter-spacing: 0.005em;
  transition: color 0.3s ease;
}
.academy-module-desc {
  color: rgba(245,239,224,0.78);
  font-size: clamp(0.98rem, 2vw, 1.1rem);
  line-height: 1.7;
  font-weight: 300;
  margin: 0 0 1rem;
}
.academy-module-row.is-active-module .academy-module-title {
  color: #FFFFFF;
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
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  position: relative;
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
  .academy-module-journey { padding: clamp(2rem, 5vw, 3rem) clamp(1rem, 5vw, 2rem); }
  .academy-modules-wrap { padding-right: 0; }
  .academy-module-row {
    min-height: auto;
    flex-direction: column;
    align-items: flex-start;
    padding: clamp(2.5rem, 8vw, 4rem) 0;
  }
  .academy-module-number-wrap {
    align-items: flex-start;
    justify-content: flex-start !important;
    padding: 0.5rem 0 0 0 !important;
  }
  .academy-module-number { font-size: clamp(5rem, 22vw, 8rem); }
  .academy-module-accent-line { top: 30%; }
  .academy-module-content {
    max-width: 100%;
    padding: 0;
    margin: clamp(2.5rem, 12vw, 4rem) 0 0 0 !important;
  }
  .academy-progress-rail { display: none; }
}

/* ---------- Reduced motion ---------- */
@media (prefers-reduced-motion: reduce) {
  .academy-module-row,
  .academy-module-number,
  .academy-module-accent-line {
    opacity: 1 !important;
    transform: none !important;
  }
  .academy-progress-dot,
  .academy-progress-label,
  .academy-module-title {
    transition: none !important;
  }
}
`}</style>
    </section>
  );
}