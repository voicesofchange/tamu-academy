import React from 'react';
import { Link } from 'react-router-dom';
import {
  Heart, TrendingUp, Users, Store, Banknote, Scroll, Cpu, Landmark, GraduationCap,
  Layers, Clock, BadgeCheck, ArrowRight,
} from 'lucide-react';
import StartCourseButton from '@/components/courses/StartCourseButton';
import LearningAreaBadge from '@/components/courses/shared/LearningAreaBadge';
import { useCourseFactText } from '@/components/courses/shared/useCourseFacts';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

const ICONS = { Heart, TrendingUp, Users, Store, Banknote, Scroll, Cpu, Landmark };

const CONTENT = {
  viewSyllabus: 'View Syllabus',
};

/**
 * CourseCard — the one course card for the homepage and the catalog.
 *
 * A live course (`slug`) shows its learning area, title, a two-line summary,
 * the module count, study hours and "Certificate included", then two actions:
 * Start Learning → (signed out, the free Module 1 preview; signed in, enrol
 * and open Module 1) and View Syllabus (the overview's syllabus section).
 *
 * A course in development is passed as `upcoming` ({ title, description,
 * areaId, icon, accent }); it shows "Coming soon" and no actions. Its text
 * is translated by the caller.
 *
 * Props: slug | upcoming; headingLevel ('h2' | 'h3', default 'h3').
 */
export default function CourseCard({ slug, upcoming = null, headingLevel = 'h3' }) {
  const facts = useCourseFactText();
  const { content: c } = useTranslatedContent('course-card', CONTENT);
  const course = slug ? facts.course(slug) : null;
  const item = course || upcoming;
  if (!item) return null;

  const Heading = headingLevel;
  const Icon = ICONS[item.icon] || GraduationCap;
  const accent = item.accent || 'rgba(217,155,55,0.4)';
  const areaId = course ? course.areaId : upcoming.areaId;
  const summary = course ? course.summary : upcoming.description;

  return (
    <article className={`tcc-card${course ? '' : ' is-upcoming'}`}>
      <style>{CARD_CSS}</style>
      <div className="tcc-visual" aria-hidden="true">
        <div className="tcc-glow" style={{ background: `radial-gradient(circle at 30% 40%, ${accent} 0%, transparent 65%)` }} />
        <Icon size={38} strokeWidth={1.2} className="tcc-icon" />
        {!course && <span className="font-body tcc-soon">{facts.labels.comingSoon}</span>}
      </div>
      <div className="tcc-body">
        <div className="tcc-badge"><LearningAreaBadge areaId={areaId} surface="light" /></div>
        <Heading className="font-heading tcc-title">
          {course ? <Link to={course.coursePath} className="tcc-title-link">{item.title}</Link> : item.title}
        </Heading>
        <p className="font-body tcc-summary">{summary}</p>
        {course && (
          <>
            <ul className="font-body tcc-meta">
              <li><Layers size={14} aria-hidden="true" /> {facts.modules(course.moduleCount)}</li>
              <li><Clock size={14} aria-hidden="true" /> {facts.hours(slug)}</li>
              <li><BadgeCheck size={14} aria-hidden="true" /> {facts.labels.certificateIncluded}</li>
            </ul>
            <div className="tcc-actions">
              <StartCourseButton courseSlug={slug} compact surface="light" showSignIn={false} />
              <Link to={`${course.coursePath}#syllabus`} className="font-body tcc-secondary">
                {c.viewSyllabus} <ArrowRight size={13} aria-hidden="true" />
              </Link>
            </div>
          </>
        )}
      </div>
    </article>
  );
}

const CARD_CSS = `
.tcc-card { position: relative; display: flex; flex-direction: column; height: 100%; background: #fffaf1; border: 1px solid #dac7ab; border-radius: 8px; overflow: hidden; transition: box-shadow 0.25s ease, transform 0.25s ease; }
.tcc-card:hover { box-shadow: 0 10px 28px rgba(57,37,27,0.12); transform: translateY(-2px); }
.tcc-card:focus-within { box-shadow: 0 0 0 2px #b97827; }
.tcc-visual { position: relative; height: 104px; background: #3a261c; display: flex; align-items: center; justify-content: center; overflow: hidden; }
.tcc-glow { position: absolute; inset: 0; }
.tcc-icon { position: relative; color: #e8b85b; }
.tcc-soon { position: absolute; top: 12px; right: 12px; color: #f8f0df; border: 1px solid rgba(232,184,91,0.45); border-radius: 999px; padding: 4px 10px; font-size: 0.62rem; letter-spacing: 0.1em; text-transform: uppercase; background: rgba(36,21,15,0.55); }
.tcc-body { flex: 1; display: flex; flex-direction: column; padding: 18px 20px 20px; }
.tcc-badge { margin-bottom: 10px; }
.tcc-title { color: #39251b; font-size: 1.3rem; font-weight: 400; line-height: 1.2; margin: 0 0 8px; }
.tcc-title-link { color: inherit; text-decoration: none; }
.tcc-title-link:hover { text-decoration: underline; text-underline-offset: 3px; }
.tcc-title-link:focus-visible { outline: 2px solid #b97827; outline-offset: 2px; }
.tcc-summary { color: #725a46; font-size: 0.88rem; line-height: 1.6; margin: 0 0 14px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.tcc-card.is-upcoming .tcc-summary { -webkit-line-clamp: 3; }
.tcc-meta { list-style: none; margin: auto 0 16px; padding: 12px 0 0; border-top: 1px solid #e8d9bf; display: flex; flex-wrap: wrap; gap: 6px 14px; color: #806b58; font-size: 0.78rem; }
.tcc-meta li { display: inline-flex; align-items: center; gap: 5px; }
.tcc-meta svg { color: #b97827; flex-shrink: 0; }
.tcc-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 10px 16px; }
.tcc-secondary { display: inline-flex; align-items: center; gap: 5px; color: #9b5d1d; font-size: 0.74rem; letter-spacing: 0.08em; text-transform: uppercase; font-weight: 600; text-decoration: none; border-bottom: 1px solid #c18a36; padding-bottom: 2px; }
.tcc-secondary:focus-visible { outline: 2px solid #b97827; outline-offset: 3px; }
@media (prefers-reduced-motion: reduce) { .tcc-card { transition: none; } .tcc-card:hover { transform: none; } }
`;
