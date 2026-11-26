import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, Heart, TrendingUp, Users, Store, Banknote, Scroll, Cpu, Landmark, Layers, Award, ArrowRight } from 'lucide-react';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';
import { fillTemplate } from '@/lib/i18n/fill-template';
import {
  HOME_COURSES,
  HOME_LEARNING_AREAS,
  HOME_STATS,
  HOME_COURSE_TEXT,
  HOME_AREA_TEXT,
} from '@/lib/home-course-catalog';

/**
 * HomeDiscovery — the top of the homepage: a short action hero with a live
 * course search, topic pills for the five learning areas, and the course grid
 * they filter. Every live course and the courses in development are on the
 * page from the first screen; deeper mission and philosophy sit further down.
 *
 * Search matches course titles, summaries and learning areas in the reader's
 * language and in English, so a learner can type in either.
 */

const CONTENT = {
  eyebrow: 'Tamu Academy',
  headline: 'Learn economics, wellbeing, history and leadership from African and diaspora perspectives.',
  subtitle: '{count} free, self-paced courses with workbooks and QR-verified certificates.',
  searchLabel: 'Search courses',
  searchPlaceholder: 'What do you want to learn today?',
  clearSearch: 'Clear search',
  browseAll: 'Browse All Courses',
  filterLabel: 'Filter courses by topic',
  allCourses: 'All Courses',
  resultsCount: '{count} courses shown',
  resultsOne: '1 course shown',
  noResults: 'No courses match your search yet.',
  noResultsHint: 'Try another word, or browse all courses.',
  modulesCount: '{count} modules',
  format: 'Self-Paced • Free Certificate',
  startLearning: 'Start Learning',
  comingSoon: 'Coming Soon',
  inDevelopment: 'In development',
  courseGridLabel: 'Courses',
};

const ICONS = { Heart, TrendingUp, Users, Store, Banknote, Scroll, Cpu, Landmark };

const normalise = (value) => String(value || '').toLowerCase();

export default function HomeDiscovery() {
  const { content: c } = useTranslatedContent('home-discovery', CONTENT);
  const { content: courseText } = useTranslatedContent('home-course-catalog', HOME_COURSE_TEXT);
  const { content: areaText } = useTranslatedContent('home-learning-areas', HOME_AREA_TEXT);
  const [query, setQuery] = useState('');
  const [area, setArea] = useState('all');

  const courses = useMemo(() => HOME_COURSES.map((course) => ({
    ...course,
    shownTitle: (courseText[course.slug] && courseText[course.slug].title) || course.title,
    shownDescription: (courseText[course.slug] && courseText[course.slug].description) || course.description,
    shownArea: areaText[course.area] || HOME_AREA_TEXT[course.area],
  })), [courseText, areaText]);

  const visible = useMemo(() => {
    const q = normalise(query).trim();
    return courses.filter((course) => {
      if (area !== 'all' && course.area !== area) return false;
      if (!q) return true;
      const haystack = normalise([
        course.shownTitle, course.shownDescription, course.shownArea,
        course.title, course.description, HOME_AREA_TEXT[course.area],
      ].join(' '));
      return q.split(/\s+/).every((word) => haystack.includes(word));
    });
  }, [courses, area, query]);

  return (
    <section aria-labelledby="home-hero-heading" className="home-discovery">
      <style>{DISCOVERY_CSS}</style>

      {/* Action hero */}
      <div className="hd-hero">
        <p className="font-body hd-eyebrow">{c.eyebrow}</p>
        <h1 id="home-hero-heading" className="font-heading hd-headline">{c.headline}</h1>
        <p className="font-body hd-subtitle">{fillTemplate(c.subtitle, { count: HOME_STATS.liveCourses })}</p>

        <form className="hd-search-row" role="search" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="home-course-search" className="sr-only">{c.searchLabel}</label>
          <div className="hd-search">
            <Search size={18} aria-hidden="true" className="hd-search-icon" />
            <input
              id="home-course-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={c.searchPlaceholder}
              autoComplete="off"
              aria-controls="home-course-grid"
              className="font-body"
            />
            {query && (
              <button type="button" className="hd-clear" onClick={() => setQuery('')} aria-label={c.clearSearch}>
                <X size={16} aria-hidden="true" />
              </button>
            )}
          </div>
          <Link to="/courses" className="font-body hd-browse">{c.browseAll}</Link>
        </form>
      </div>

      {/* Topic pills */}
      <div className="hd-pills" role="group" aria-label={c.filterLabel}>
        {[{ id: 'all', label: c.allCourses }, ...HOME_LEARNING_AREAS.map((a) => ({ id: a.id, label: areaText[a.id] || a.label }))].map((pill) => (
          <button
            key={pill.id}
            type="button"
            className="font-body hd-pill"
            aria-pressed={area === pill.id}
            onClick={() => setArea(pill.id)}
          >
            {pill.label}
          </button>
        ))}
      </div>

      {/* Course grid */}
      <p className="sr-only" aria-live="polite">
        {visible.length === 1 ? c.resultsOne : fillTemplate(c.resultsCount, { count: visible.length })}
      </p>
      {visible.length === 0 ? (
        <div className="hd-empty">
          <p className="font-heading">{c.noResults}</p>
          <p className="font-body">{c.noResultsHint}</p>
          <Link to="/courses" className="font-body hd-browse">{c.browseAll}</Link>
        </div>
      ) : (
        <ul id="home-course-grid" className="hd-grid" aria-label={c.courseGridLabel}>
          {visible.map((course) => (
            <li key={course.slug}>
              <CourseCard course={course} c={c} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function CourseCard({ course, c }) {
  const Icon = ICONS[course.icon] || Layers;
  return (
    <article className={`hd-card${course.live ? '' : ' is-soon'}`}>
      <div className="hd-media" style={{ background: `radial-gradient(120% 120% at 15% 10%, ${course.accent}, rgba(36,21,15,0.2) 60%), linear-gradient(135deg, #3a2418, #1c120c)` }} aria-hidden="true">
        <Icon size={44} strokeWidth={1.4} className="hd-media-icon" />
        {!course.live && <span className="font-body hd-soon-badge">{c.comingSoon}</span>}
      </div>
      <div className="hd-body">
        <p className="font-body hd-area">{course.shownArea}</p>
        <h3 className="font-heading hd-title">{course.shownTitle}</h3>
        <p className="font-body hd-desc">{course.shownDescription}</p>
        <ul className="font-body hd-meta">
          {course.live ? (
            <>
              <li><Layers size={14} aria-hidden="true" /> {fillTemplate(c.modulesCount, { count: course.moduleCount })}</li>
              <li><Award size={14} aria-hidden="true" /> {c.format}</li>
            </>
          ) : (
            <li>{c.inDevelopment}</li>
          )}
        </ul>
        {course.live ? (
          <Link to={`/courses/${course.slug}`} className="font-body hd-start">
            {c.startLearning} <ArrowRight size={15} aria-hidden="true" />
            <span className="sr-only">: {course.shownTitle}</span>
          </Link>
        ) : (
          <span className="font-body hd-start is-disabled" aria-disabled="true">{c.comingSoon}</span>
        )}
      </div>
    </article>
  );
}

const DISCOVERY_CSS = `
.home-discovery {
  padding: clamp(6.5rem, 10vw, 8.25rem) clamp(1rem, 5vw, 4rem) clamp(3rem, 6vw, 4.5rem);
  max-width: 1240px;
  margin: 0 auto;
}
.hd-hero { max-width: 900px; }
.hd-eyebrow { color: #e8b85b; font-size: 0.68rem; letter-spacing: 0.22em; text-transform: uppercase; font-weight: 500; margin: 0 0 0.9rem; }
.hd-headline { color: #f8f0df; font-size: clamp(1.8rem, 3.6vw, 2.6rem); font-weight: 400; line-height: 1.15; margin: 0 0 0.75rem; }
.hd-subtitle { color: rgba(243,234,216,0.78); font-size: clamp(1rem, 1.6vw, 1.12rem); line-height: 1.6; margin: 0 0 1.4rem; }
.hd-search-row { display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: stretch; }
.hd-search { position: relative; flex: 1 1 340px; min-width: 0; }
.hd-search input {
  width: 100%; box-sizing: border-box; height: 52px; padding: 0 2.75rem 0 2.75rem;
  border-radius: 999px; border: 1px solid rgba(232,184,91,0.4); background: rgba(243,234,216,0.06);
  color: #f8f0df; font-size: 1rem;
}
.hd-search input::placeholder { color: rgba(243,234,216,0.5); }
.hd-search input:focus { outline: 2px solid rgba(232,184,91,0.8); outline-offset: 2px; }
.hd-search-icon { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: #e8b85b; pointer-events: none; }
.hd-clear { position: absolute; right: 0.6rem; top: 50%; transform: translateY(-50%); display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 999px; border: none; background: transparent; color: rgba(243,234,216,0.7); cursor: pointer; }
.hd-browse {
  display: inline-flex; align-items: center; justify-content: center; height: 52px; padding: 0 1.6rem; border-radius: 999px;
  background: #e8b85b; color: #24150f; text-decoration: none; font-size: 0.78rem; letter-spacing: 0.12em; text-transform: uppercase; font-weight: 600; white-space: nowrap;
}
.hd-browse:focus-visible, .hd-start:focus-visible, .hd-pill:focus-visible, .hd-clear:focus-visible { outline: 2px solid #f8f0df; outline-offset: 2px; }
.hd-pills { display: flex; flex-wrap: wrap; gap: 0.6rem; padding: 1.4rem 0 1.3rem; }
.hd-pills::-webkit-scrollbar { display: none; }
.hd-pill {
  flex: 0 0 auto; padding: 0.55rem 1.05rem; border-radius: 999px; border: 1px solid rgba(232,184,91,0.35);
  background: transparent; color: rgba(243,234,216,0.85); font-size: 0.82rem; cursor: pointer; white-space: nowrap;
}
.hd-pill[aria-pressed="true"] { background: #e8b85b; border-color: #e8b85b; color: #24150f; font-weight: 600; }
.hd-grid { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.25rem; }
.hd-grid > li { display: flex; }
.hd-card { display: flex; flex-direction: column; width: 100%; border: 1px solid rgba(232,184,91,0.16); border-radius: 10px; overflow: hidden; background: rgba(243,234,216,0.025); }
.hd-card.is-soon { opacity: 0.82; }
.hd-media { position: relative; aspect-ratio: 16 / 9; display: flex; align-items: center; justify-content: center; }
.hd-media-icon { color: rgba(248,240,223,0.88); }
.hd-soon-badge { position: absolute; top: 0.75rem; right: 0.75rem; padding: 0.3rem 0.65rem; border-radius: 999px; background: rgba(20,14,10,0.75); color: #e8b85b; font-size: 0.64rem; letter-spacing: 0.12em; text-transform: uppercase; font-weight: 600; }
.hd-body { display: flex; flex-direction: column; flex: 1; padding: 1.15rem 1.2rem 1.25rem; }
.hd-area { color: #e8b85b; font-size: 0.64rem; letter-spacing: 0.16em; text-transform: uppercase; margin: 0 0 0.45rem; }
.hd-title { color: #f8f0df; font-size: 1.2rem; font-weight: 500; line-height: 1.25; margin: 0 0 0.55rem; }
.hd-desc { color: rgba(243,234,216,0.7); font-size: 0.88rem; line-height: 1.6; margin: 0 0 0.9rem; flex: 1; }
.hd-meta { list-style: none; padding: 0; margin: 0 0 1rem; display: flex; flex-wrap: wrap; gap: 0.4rem 1rem; color: rgba(243,234,216,0.72); font-size: 0.78rem; }
.hd-meta li { display: inline-flex; align-items: center; gap: 0.35rem; }
.hd-start {
  display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem; padding: 0.7rem 1rem; border-radius: 6px;
  background: #e8b85b; color: #24150f; text-decoration: none; font-size: 0.76rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 600;
}
.hd-start.is-disabled { background: transparent; border: 1px dashed rgba(232,184,91,0.4); color: rgba(232,184,91,0.85); cursor: default; }
.hd-empty { text-align: center; padding: 3rem 1rem; border: 1px dashed rgba(232,184,91,0.3); border-radius: 10px; }
.hd-empty .font-heading { color: #f8f0df; font-size: 1.3rem; margin: 0 0 0.4rem; }
.hd-empty .font-body { color: rgba(243,234,216,0.7); margin: 0 0 1.25rem; }
@media (max-width: 1023px) { .hd-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 639px) {
  /* On phones the pills scroll sideways in one row instead of wrapping. */
  .hd-pills { flex-wrap: nowrap; overflow-x: auto; scrollbar-width: none; }
  .hd-grid { grid-template-columns: minmax(0, 1fr); }
  .hd-browse { flex: 1 1 100%; }
}
`;
