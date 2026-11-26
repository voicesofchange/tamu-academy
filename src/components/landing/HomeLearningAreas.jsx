import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Heart, Scroll, Cpu, Landmark, ArrowRight } from 'lucide-react';
import { useCourseFactText } from '@/components/courses/shared/useCourseFacts';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';
import { fillTemplate } from '@/lib/i18n/fill-template';
import { HOME_COURSES, HOME_LEARNING_AREAS } from '@/lib/home-course-catalog';

/**
 * HomeLearningAreas — the five learning areas in one compact showcase, in
 * place of the former "Begin Here" and "Go Deeper" sections. Each tile names
 * the area, says what it covers and how many live courses it has, and
 * filters the course grid above (the page holds the filter; `onSelect`
 * sets it and scrolls back to the grid). Areas with no live course yet say
 * "Coming soon".
 *
 * A short line underneath keeps the routes the old sections offered:
 * educators and institutions to the contact page, everyone to the open
 * learning resources.
 */

const CONTENT = {
  eyebrow: 'Learning Areas',
  heading: 'Five areas, one connected curriculum.',
  liveCount: '{count} live courses',
  liveOne: '1 live course',
  comingSoon: 'Coming soon',
  showCourses: 'Show these courses',
  areas: {
    'economics-and-development': 'Markets, money, trade and development, from household budgets to the global economy.',
    'mind-and-wellbeing': 'Mental health, culture and community care, grounded in Ubuntu and collective healing.',
    'waiyaki-wa-hinga': 'Leadership, resistance and historical memory through the life of Waiyaki wa Hinga.',
    'ai-technology-and-digital-futures': 'Generative AI, responsible use, digital citizenship and technological change.',
    'public-policy-and-governance': 'Public policy, institutions, accountability and writing for public decisions.',
  },
  partnerLine: 'Teaching a class or running a programme?',
  partnerLink: 'Partner with us',
  resourcesLine: 'Want to start without a course?',
  resourcesLink: 'Open learning resources',
};

const ICONS = {
  'economics-and-development': TrendingUp,
  'mind-and-wellbeing': Heart,
  'waiyaki-wa-hinga': Scroll,
  'ai-technology-and-digital-futures': Cpu,
  'public-policy-and-governance': Landmark,
};

const LIVE_COUNTS = Object.fromEntries(HOME_LEARNING_AREAS.map((a) => [
  a.id, HOME_COURSES.filter((course) => course.live && course.area === a.id).length,
]));

export default function HomeLearningAreas({ onSelect = () => {} }) {
  const { content: c } = useTranslatedContent('home-learning-areas-v2', CONTENT);
  const facts = useCourseFactText();

  return (
    <section className="home-areas" aria-labelledby="home-areas-heading">
      <style>{AREAS_CSS}</style>
      <div className="ha-inner">
        <p className="font-body ha-eyebrow">{c.eyebrow}</p>
        <h2 id="home-areas-heading" className="font-heading ha-heading">{c.heading}</h2>
        <ul className="ha-grid">
          {HOME_LEARNING_AREAS.map((area) => {
            const Icon = ICONS[area.id] || TrendingUp;
            const count = LIVE_COUNTS[area.id];
            return (
              <li key={area.id} className={`ha-tile${count ? '' : ' is-soon'}`}>
                <Icon size={22} strokeWidth={1.5} aria-hidden="true" className="ha-icon" />
                <h3 className="font-heading ha-title">{facts.area(area.id)}</h3>
                <p className="font-body ha-desc">{(c.areas && c.areas[area.id]) || CONTENT.areas[area.id]}</p>
                <p className="font-body ha-count">
                  {count ? (count === 1 ? c.liveOne : fillTemplate(c.liveCount, { count })) : c.comingSoon}
                </p>
                {count > 0 && (
                  <button type="button" className="font-body ha-button" onClick={() => onSelect(area.id)}>
                    {c.showCourses} <ArrowRight size={13} aria-hidden="true" />
                    <span className="sr-only">: {facts.area(area.id)}</span>
                  </button>
                )}
              </li>
            );
          })}
        </ul>
        <p className="font-body ha-more">
          <span>{c.partnerLine} <Link to="/contact?type=partnership">{c.partnerLink} →</Link></span>
          <span>{c.resourcesLine} <Link to="/resources">{c.resourcesLink} →</Link></span>
        </p>
      </div>
    </section>
  );
}

const AREAS_CSS = `
.home-areas { padding: clamp(3rem, 6vw, 4.5rem) clamp(1rem, 5vw, 4rem); border-top: 1px solid rgba(232,184,91,0.1); }
.ha-inner { max-width: 1112px; margin: 0 auto; }
.ha-eyebrow { color: #e8b85b; font-size: 0.68rem; letter-spacing: 0.22em; text-transform: uppercase; font-weight: 500; margin: 0 0 0.7rem; }
.ha-heading { color: #f8f0df; font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 400; line-height: 1.2; margin: 0 0 1.75rem; }
.ha-grid { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 1rem; }
.ha-tile { display: flex; flex-direction: column; padding: 1.2rem 1.15rem 1.25rem; border: 1px solid rgba(232,184,91,0.2); border-radius: 10px; background: rgba(243,234,216,0.025); }
.ha-tile.is-soon { border-style: dashed; opacity: 0.85; }
.ha-icon { color: #e8b85b; margin-bottom: 0.7rem; }
.ha-title { color: #f8f0df; font-size: 1.08rem; font-weight: 500; line-height: 1.25; margin: 0 0 0.45rem; }
.ha-desc { color: rgba(243,234,216,0.68); font-size: 0.82rem; line-height: 1.55; margin: 0 0 0.85rem; flex: 1; }
.ha-count { color: #e8b85b; font-size: 0.68rem; letter-spacing: 0.12em; text-transform: uppercase; font-weight: 600; margin: 0 0 0.6rem; }
.ha-tile.is-soon .ha-count { color: rgba(243,234,216,0.55); margin: 0; }
.ha-button { align-self: flex-start; display: inline-flex; align-items: center; gap: 0.35rem; background: none; border: none; border-bottom: 1px solid rgba(232,184,91,0.6); padding: 0 0 2px; color: #f8f0df; font-size: 0.78rem; cursor: pointer; }
.ha-button:hover { color: #e8b85b; }
.ha-button:focus-visible, .ha-more a:focus-visible { outline: 2px solid #e8b85b; outline-offset: 3px; }
.ha-more { display: flex; flex-wrap: wrap; gap: 0.5rem 2rem; margin: 1.5rem 0 0; color: rgba(243,234,216,0.65); font-size: 0.86rem; }
.ha-more a { color: #e8b85b; text-decoration: none; border-bottom: 1px solid rgba(232,184,91,0.4); }
@media (max-width: 1023px) { .ha-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 639px) { .ha-grid { grid-template-columns: minmax(0, 1fr); } }
`;
