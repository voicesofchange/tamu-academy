import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import CourseCard from '@/components/courses/shared/CourseCard';
import { useCourseFactText } from '@/components/courses/shared/useCourseFacts';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';
import { fillTemplate } from '@/lib/i18n/fill-template';
import { HOME_COURSES, HOME_LEARNING_AREAS, HOME_STATS, HOME_COURSE_TEXT } from '@/lib/home-course-catalog';

/**
 * HomeDiscovery — the top of the homepage: a short action hero with a live
 * course search on the dark ground, then a parchment band with the five
 * learning-area pills and the course grid they filter, built from the shared
 * CourseCard (the same card the catalog uses).
 *
 * The selected area is held by the page (`area`, `onAreaChange`) so the
 * learning-areas section further down can set it. Search matches titles,
 * summaries and areas in the reader's language and in English.
 */

const CONTENT = {
  eyebrow: 'Tamu Academy',
  headline: 'Learn economics, wellbeing, history and leadership from African and diaspora perspectives.',
  subtitle: '{count} free, self-paced courses with workbooks and QR-verified certificates.',
  searchLabel: 'Search courses',
  searchPlaceholder: 'What do you want to learn today?',
  clearSearch: 'Clear search',
  browseAll: 'Browse All Courses',
  coursesHeading: 'Featured Courses',
  coursesIntro: 'Start any course free: Module 1 opens without an account.',
  filterLabel: 'Filter courses by learning area',
  allCourses: 'All Courses',
  resultsCount: '{count} courses shown',
  resultsOne: '1 course shown',
  noResults: 'No courses match your search yet.',
  noResultsHint: 'Try another word, or browse all courses.',
};

const normalise = (value) => String(value || '').toLowerCase();

export default function HomeDiscovery({ area = 'all', onAreaChange = () => {} }) {
  const { content: c } = useTranslatedContent('home-discovery', CONTENT);
  const { content: upcomingText } = useTranslatedContent('home-upcoming-courses', HOME_COURSE_TEXT);
  const facts = useCourseFactText();
  const [query, setQuery] = useState('');

  const courses = HOME_COURSES.map((course) => {
    const live = course.live ? facts.course(course.slug) : null;
    const t = upcomingText[course.slug] || HOME_COURSE_TEXT[course.slug] || {};
    return {
      ...course,
      shownTitle: live ? live.title : t.title || course.title,
      shownDescription: live ? live.summary : t.description || course.description,
      shownArea: facts.area(course.area),
    };
  });

  const q = normalise(query).trim();
  const visible = courses.filter((course) => {
    if (area !== 'all' && course.area !== area) return false;
    if (!q) return true;
    const haystack = normalise([
      course.shownTitle, course.shownDescription, course.shownArea,
      course.title, course.description,
      (HOME_LEARNING_AREAS.find((a) => a.id === course.area) || {}).label,
    ].join(' '));
    return q.split(/\s+/).every((word) => haystack.includes(word));
  });

  return (
    <>
      <section aria-labelledby="home-hero-heading" className="home-discovery">
        <style>{DISCOVERY_CSS}</style>
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
      </section>

      <section id="home-courses" aria-labelledby="home-courses-heading" className="hd-band">
        <div className="hd-band-inner">
          <div className="hd-band-head">
            <h2 id="home-courses-heading" className="font-heading hd-band-title">{c.coursesHeading}</h2>
            <p className="font-body hd-band-intro">{c.coursesIntro}</p>
          </div>

          <div className="hd-pills" role="group" aria-label={c.filterLabel}>
            {[{ id: 'all', label: c.allCourses }, ...HOME_LEARNING_AREAS.map((a) => ({ id: a.id, label: facts.area(a.id) }))].map((pill) => (
              <button
                key={pill.id}
                type="button"
                className="font-body hd-pill"
                aria-pressed={area === pill.id}
                onClick={() => onAreaChange(pill.id)}
              >
                {pill.label}
              </button>
            ))}
          </div>

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
            <ul id="home-course-grid" className="hd-grid" aria-label={c.coursesHeading}>
              {visible.map((course) => (
                <li key={course.slug}>
                  {course.live ? (
                    <CourseCard slug={course.slug} />
                  ) : (
                    <CourseCard upcoming={{
                      title: course.shownTitle,
                      description: course.shownDescription,
                      areaId: course.area,
                      icon: course.icon,
                      accent: course.accent,
                    }}
                    />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}

const DISCOVERY_CSS = `
.home-discovery { padding: clamp(6.5rem, 10vw, 8.25rem) clamp(1rem, 5vw, 4rem) clamp(2.25rem, 5vw, 3.25rem); max-width: 1240px; margin: 0 auto; }
.hd-hero { max-width: 900px; }
.hd-eyebrow { color: #e8b85b; font-size: 0.68rem; letter-spacing: 0.22em; text-transform: uppercase; font-weight: 500; margin: 0 0 0.9rem; }
.hd-headline { color: #f8f0df; font-size: clamp(1.8rem, 3.6vw, 2.6rem); font-weight: 400; line-height: 1.15; margin: 0 0 0.75rem; }
.hd-subtitle { color: rgba(243,234,216,0.78); font-size: clamp(1rem, 1.6vw, 1.12rem); line-height: 1.6; margin: 0 0 1.4rem; }
.hd-search-row { display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: stretch; }
.hd-search { position: relative; flex: 1 1 340px; min-width: 0; }
.hd-search input { width: 100%; box-sizing: border-box; height: 52px; padding: 0 2.75rem; border-radius: 999px; border: 1px solid rgba(232,184,91,0.4); background: rgba(243,234,216,0.06); color: #f8f0df; font-size: 1rem; }
.hd-search input::placeholder { color: rgba(243,234,216,0.5); }
.hd-search input:focus { outline: 2px solid rgba(232,184,91,0.8); outline-offset: 2px; }
.hd-search-icon { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: #e8b85b; pointer-events: none; }
.hd-clear { position: absolute; right: 0.6rem; top: 50%; transform: translateY(-50%); display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 999px; border: none; background: transparent; color: rgba(243,234,216,0.7); cursor: pointer; }
.hd-browse { display: inline-flex; align-items: center; justify-content: center; height: 52px; padding: 0 1.6rem; border-radius: 999px; background: #e8b85b; color: #24150f; text-decoration: none; font-size: 0.78rem; letter-spacing: 0.12em; text-transform: uppercase; font-weight: 600; white-space: nowrap; }
.hd-browse:focus-visible, .hd-clear:focus-visible { outline: 2px solid #f8f0df; outline-offset: 2px; }

.hd-band { background: #faf6ec; color: #39251b; scroll-margin-top: 104px; }
.hd-band-inner { max-width: 1240px; margin: 0 auto; padding: clamp(2.5rem, 5vw, 3.5rem) clamp(1rem, 5vw, 4rem) clamp(3rem, 6vw, 4.5rem); }
.hd-band-head { display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: 0.4rem 1.5rem; }
.hd-band-title { font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 400; margin: 0; color: #39251b; }
.hd-band-intro { color: #806b58; font-size: 0.92rem; margin: 0; }
.hd-pills { display: flex; flex-wrap: wrap; gap: 0.55rem; padding: 1.25rem 0 1.5rem; }
.hd-pill { flex: 0 0 auto; padding: 0.55rem 1.05rem; border-radius: 999px; border: 1px solid #d7b57c; background: #fffaf1; color: #5f4531; font-size: 0.82rem; cursor: pointer; white-space: nowrap; }
.hd-pill:hover { border-color: #b97827; }
.hd-pill[aria-pressed="true"] { background: #39251b; border-color: #39251b; color: #f8f0df; font-weight: 600; }
.hd-pill:focus-visible { outline: 2px solid #b97827; outline-offset: 2px; }
.hd-grid { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.25rem; }
.hd-grid > li { display: flex; }
.hd-grid > li > * { width: 100%; }
.hd-empty { text-align: center; padding: 3rem 1rem; border: 1px dashed #d7b57c; border-radius: 10px; }
.hd-empty .font-heading { color: #39251b; font-size: 1.3rem; margin: 0 0 0.4rem; }
.hd-empty .font-body { color: #806b58; margin: 0 0 1.25rem; }
@media (max-width: 1023px) { .hd-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 639px) {
  .hd-pills { flex-wrap: nowrap; overflow-x: auto; scrollbar-width: none; margin: 0 calc(-1 * clamp(1rem, 5vw, 4rem)); padding-left: clamp(1rem, 5vw, 4rem); padding-right: clamp(1rem, 5vw, 4rem); }
  .hd-pills::-webkit-scrollbar { display: none; }
  .hd-grid { grid-template-columns: minmax(0, 1fr); }
  .hd-browse { flex: 1 1 100%; }
}
`;
