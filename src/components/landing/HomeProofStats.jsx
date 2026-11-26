import React from 'react';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';
import { HOME_STATS } from '@/lib/home-course-catalog';

/**
 * HomeProofStats — the homepage stats strip.
 *
 * The figures are not typed in: they come from the homepage course data
 * (src/lib/home-course-catalog.js), which reads each live course's own data,
 * so they stay right as courses open.
 */

const CONTENT = {
  liveCourses: 'Live Courses',
  learningAreas: 'Learning Areas',
  certificateModules: 'Certificate Modules',
  free: 'Free',
  freeLabel: 'To Learn',
};

export default function HomeProofStats() {
  const { content: c } = useTranslatedContent('home-proof-stats', CONTENT);
  const stats = [
    { value: String(HOME_STATS.liveCourses), label: c.liveCourses },
    { value: String(HOME_STATS.learningAreas), label: c.learningAreas },
    { value: String(HOME_STATS.certificateModules), label: c.certificateModules },
    { value: c.free, label: c.freeLabel },
  ];

  return (
    <section className="home-stats" aria-label={`${c.liveCourses}, ${c.learningAreas}, ${c.certificateModules}`}>
      <style>{STATS_CSS}</style>
      <dl className="hs-stats">
        {stats.map((stat) => (
          <div key={stat.label} className="hs-stat">
            <dt className="font-body hs-label">{stat.label}</dt>
            <dd className="font-heading hs-value">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

const STATS_CSS = `
.home-stats {
  border-top: 1px solid rgba(232,184,91,0.1);
  border-bottom: 1px solid rgba(232,184,91,0.1);
  background: rgba(243,234,216,0.015);
  padding: clamp(2.25rem, 5vw, 3.25rem) clamp(1rem, 5vw, 4rem);
}
.hs-stats {
  max-width: 1100px; margin: 0 auto; display: grid; gap: 1.5rem;
  grid-template-columns: repeat(4, minmax(0, 1fr)); text-align: center;
}
.hs-stat { display: flex; flex-direction: column-reverse; }
.hs-value { color: #e8b85b; font-size: clamp(2rem, 4vw, 2.7rem); font-weight: 400; line-height: 1; margin: 0 0 0.5rem; }
.hs-label { color: rgba(243,234,216,0.65); font-size: 0.7rem; letter-spacing: 0.16em; text-transform: uppercase; font-weight: 500; }
@media (max-width: 639px) { .hs-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
`;
