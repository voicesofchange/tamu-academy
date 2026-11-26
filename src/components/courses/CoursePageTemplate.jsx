import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import PageMeta from '@/components/seo/PageMeta';
import SiteShell from '@/components/page/SiteShell';
import CourseSyllabusAccordion from '@/components/courses/CourseSyllabusAccordion';
import CourseActionButton from '@/components/courses/CourseActionButton';
import CourseCredentialPreview from '@/components/courses/CourseCredentialPreview';
import EconomicsCourseProgress from '@/components/courses/EconomicsCourseProgress';
import AtAGlanceCard from '@/components/courses/shared/AtAGlanceCard';
import LearningAreaBadge from '@/components/courses/shared/LearningAreaBadge';
import SectionJumpBar from '@/components/courses/shared/SectionJumpBar';
import { getCourseFacts } from '@/lib/course-facts';
import { useAuth } from '@/lib/AuthContext';
import { useTranslation } from '@/lib/i18n';
import { fillTemplate } from '@/lib/i18n/fill-template';
import TamuGuideWidget from '@/components/agent/TamuGuideWidget';

/**
 * CoursePageTemplate — the one course overview page every live course uses.
 *
 * Layout (desktop): a dark hero with the learning area, title, overview and
 * the primary action (Start / Continue Learning); then a parchment body in
 * two columns — the main column opens with the sticky section jump bar
 * (Overview | What You Will Learn | Syllabus | Credential & Capstone) and the
 * sections, and the side column holds the sticky "At a Glance" card, lifted
 * into the hero. On phones everything is one column and the card sits under
 * the hero.
 *
 * The course's own text arrives already translated (each page passes the
 * translated course object); the labels come from the translation
 * dictionaries (course.*).
 *
 * Props
 *   course          the translated course object (src/lib/*-tracks.js shape)
 *   progressSlot    the course's own progress panel (default: economics)
 *   progressExtra   shown above the progress panel (Mental Health's insights link)
 *   moduleFooter    shown under the syllabus (Waiyaki's sources link)
 *   syllabusIntro   replaces the standard "{count} connected modules…" line
 *   syllabusGroups  module groups for the accordion (Building Wealth's tracks)
 *   syllabusExtra   shown after the syllabus (Building Wealth's module rhythm)
 *   credentialExtra shown under the deliverable (Building Wealth's capstone options)
 *   pathIntro       replaces the standard learning-path sentence
 *   children        course-specific sections, full width, after the body
 */
export default function CoursePageTemplate({
  course,
  progressSlot,
  progressExtra,
  moduleFooter,
  syllabusIntro,
  syllabusGroups,
  syllabusExtra,
  credentialExtra,
  pathIntro,
  children,
}) {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const { hash } = useLocation();
  const facts = getCourseFacts(course.slug);

  // A link to one of this page's sections (the homepage's View Syllabus goes
  // to #syllabus) lands there once the page has laid out, including on a
  // fresh page load, where the browser's own jump runs before the page exists.
  useEffect(() => {
    const id = hash ? decodeURIComponent(hash.slice(1)) : '';
    if (!['overview', 'outcomes', 'syllabus', 'credential'].includes(id)) return undefined;
    const timer = window.setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'auto', block: 'start' });
    }, 350);
    return () => window.clearTimeout(timer);
  }, [hash, course.slug]);

  // "{count} connected modules…": the count is this course's own, spelled out
  // in the reader's language where the dictionary has the word.
  const moduleCount = Number(course.modulesCount) || course.modules.length;
  const countWordKey = `course.moduleCountWords.${moduleCount}`;
  const countWord = t(countWordKey);
  const modulesIntro = syllabusIntro || fillTemplate(t('course.modulesIntro'), {
    count: countWord === countWordKey ? String(moduleCount) : countWord,
  });
  const audience = String(course.whoThisCourseIsFor || '').split('\n\n').filter(Boolean);
  const path = Array.isArray(course.learningPath) ? course.learningPath : [];
  const outcomes = Array.isArray(course.learningOutcomes) ? course.learningOutcomes : [];

  return (
    <SiteShell overflowX="clip">
      <PageMeta title={`${course.title} | Tamu Academy`} description={course.description} path={`/courses/${course.slug}`} />
      <style>{TEMPLATE_CSS}</style>

      {/* Hero */}
      <section className="cpt-hero">
        <div aria-hidden className="cpt-hero-glow" />
        <motion.div
          className="cpt-hero-inner"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
        >
          <div className="cpt-hero-main">
            {facts && <LearningAreaBadge areaId={facts.areaId} />}
            <h1 className="font-heading cpt-title">{course.title}</h1>
            {course.subtitle && <p className="font-body cpt-subtitle">{course.subtitle}</p>}
            <div className="cpt-action"><CourseActionButton courseSlug={course.slug} /></div>
          </div>
        </motion.div>
      </section>

      {/* Body */}
      <div className="cpt-body">
        <div className="cpt-body-inner">
          <aside className="cpt-aside">
            <div className="cpt-aside-card">
              <AtAGlanceCard slug={course.slug} surface="light" />
            </div>
          </aside>

          <div className="cpt-main">
            <SectionJumpBar surface="light" inColumn />

            {/* Overview */}
            <section id="overview" className="cpt-section tamu-jump-target" aria-labelledby="cpt-overview">
              <p className="font-body cpt-eyebrow">{t('course.overview')}</p>
              <h2 id="cpt-overview" className="font-heading cpt-h2">{t('course.aboutCourse')}</h2>
              {(course.descriptionLong || []).map((para, i) => (
                <p key={i} className="font-body cpt-p">{para}</p>
              ))}
              {audience.length > 0 && (
                <>
                  <h3 className="font-heading cpt-h3">{t('course.whoFor')}</h3>
                  {audience.map((para, i) => <p key={i} className="font-body cpt-p">{para}</p>)}
                </>
              )}
              {path.length > 0 && (
                <>
                  <h3 className="font-heading cpt-h3">{t('course.pathHeading')}</h3>
                  <p className="font-body cpt-p">{pathIntro || t('course.pathIntro')}</p>
                  <ol className="cpt-path">
                    {path.map((stage, i) => (
                      <li key={stage} className={`font-body${i === path.length - 1 ? ' is-last' : ''}`}>{stage}</li>
                    ))}
                  </ol>
                </>
              )}
            </section>

            {/* What You Will Learn */}
            <section id="outcomes" className="cpt-section tamu-jump-target" aria-labelledby="cpt-outcomes">
              <p className="font-body cpt-eyebrow">{t('course.outcomes')}</p>
              <h2 id="cpt-outcomes" className="font-heading cpt-h2">{t('course.whatYouWillLearn')}</h2>
              <ul className="cpt-learn">
                {outcomes.map((outcome, i) => (
                  <li key={i} className="font-body">
                    <Check size={18} strokeWidth={2.2} aria-hidden="true" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Syllabus */}
            <section id="syllabus" className="cpt-section tamu-jump-target" aria-labelledby="cpt-syllabus">
              <p className="font-body cpt-eyebrow">{t('course.syllabus')}</p>
              <h2 id="cpt-syllabus" className="font-heading cpt-h2">{t('course.syllabusHeading')}</h2>
              <p className="font-body cpt-p">{modulesIntro}</p>
              <CourseSyllabusAccordion courseSlug={course.slug} surface="light" showExpandAll groups={syllabusGroups || null} />
              {moduleFooter && <div style={{ marginTop: '1.25rem' }}>{moduleFooter}</div>}
              {syllabusExtra && <div style={{ marginTop: '2rem' }}>{syllabusExtra}</div>}
            </section>

            {/* Credential & Capstone */}
            <section id="credential" className="cpt-section tamu-jump-target" aria-labelledby="cpt-credential">
              <p className="font-body cpt-eyebrow">{t('course.milestone')}</p>
              <h2 id="cpt-credential" className="font-heading cpt-h2">{t('course.credentialHeading')}</h2>
              <p className="font-body cpt-p">{t('course.credentialIntro')}</p>
              <CourseCredentialPreview course={course}>{credentialExtra}</CourseCredentialPreview>
            </section>

            {/* Progress */}
            <section className="cpt-section" aria-labelledby="cpt-progress">
              <div className="cpt-progress">
                <p className="font-body cpt-eyebrow is-dark">{t('course.yourProgress')}</p>
                <h2 id="cpt-progress" className="font-heading cpt-h2 is-dark">{t('course.progress')}</h2>
                {progressExtra && <div style={{ marginBottom: '1.5rem' }}>{progressExtra}</div>}
                {progressSlot || <EconomicsCourseProgress courseSlug={course.slug} />}
              </div>
            </section>
          </div>
        </div>
      </div>

      {children}

      {/* Begin learning — the primary action again at the end of the page */}
      <section className="cpt-final" aria-labelledby="cpt-final">
        <div className="cpt-final-inner">
          <p className="font-body cpt-eyebrow is-dark">{t('course.access')}</p>
          <h2 id="cpt-final" className="font-heading cpt-h2 is-dark">{t('common.beginLearning')}</h2>
          <div style={{ marginBottom: '1.5rem' }}><CourseActionButton courseSlug={course.slug} /></div>
          <div className="cpt-final-links">
            <Link to="/courses" className="font-body cpt-outline">{t('common.backToCourses')} &rarr;</Link>
            {isAuthenticated && (
              <Link to="/learners-guide" className="font-body cpt-outline">{t('course.learnersGuideLink')} &rarr;</Link>
            )}
          </div>
          <p className="font-body cpt-final-note">{t('course.workbookNote')}</p>
        </div>
      </section>

      <TamuGuideWidget />
    </SiteShell>
  );
}

const TEMPLATE_CSS = `
.cpt-hero { position: relative; overflow: hidden; padding: 130px clamp(1.25rem, 5vw, 3.5rem) 64px; }
.cpt-hero-glow { position: absolute; inset: 0; background: radial-gradient(ellipse 75% 55% at 22% 32%, rgba(217,155,55,0.10) 0%, transparent 65%); }
.cpt-hero-inner { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; }
.cpt-hero-main { max-width: min(720px, calc(100% - 396px)); }
.cpt-title { font-weight: 400; font-size: clamp(2.1rem, 4.4vw, 52px); line-height: 1.06; letter-spacing: -0.02em; margin: 16px 0 18px; color: var(--tamu-ink, #f8f0df); }
.cpt-subtitle { font-size: clamp(1rem, 1.4vw, 17px); line-height: 1.7; color: #ddcfbb; margin: 0; max-width: 660px; }
.cpt-action { margin-top: 28px; }

.cpt-body { background: #faf6ec; color: #39251b; padding: 0 clamp(1.25rem, 5vw, 3.5rem) 72px; }
.cpt-body-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: minmax(0, 1fr) 340px; grid-template-areas: "main aside"; gap: 0 56px; }
.cpt-main { grid-area: main; min-width: 0; }
.cpt-aside { grid-area: aside; position: relative; margin-top: -232px; z-index: 5; }
.cpt-aside-card { position: sticky; top: calc(var(--tamu-header-h, 104px) + 16px); box-shadow: 0 14px 36px rgba(36,21,15,0.18); border-radius: 10px; }

.cpt-section { padding-top: 48px; }
.cpt-eyebrow { color: #b97827; font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; margin: 0 0 0.5rem; }
.cpt-eyebrow.is-dark { color: #e8b85b; }
.cpt-h2 { color: #39251b; font-size: clamp(1.6rem, 3vw, 34px); font-weight: 400; line-height: 1.12; margin: 0 0 1.1rem; }
.cpt-h2.is-dark { color: #f3ead8; }
.cpt-h3 { color: #39251b; font-size: 1.25rem; font-weight: 500; margin: 1.75rem 0 0.6rem; }
.cpt-p { color: #725a46; font-size: 15px; line-height: 1.75; font-weight: 300; margin: 0 0 1.1rem; }
.cpt-path { list-style: none; margin: 0.5rem 0 0; padding: 0; display: flex; flex-wrap: wrap; gap: 0.5rem; counter-reset: step; }
.cpt-path li { counter-increment: step; display: inline-flex; align-items: center; gap: 0.45rem; color: #5f4531; font-size: 13px; border: 1px solid #dcc8a8; background: #fffaf1; border-radius: 999px; padding: 6px 12px 6px 6px; }
.cpt-path li::before { content: counter(step); display: inline-flex; align-items: center; justify-content: center; width: 22px; height: 22px; border-radius: 999px; background: #f3e6cc; color: #9b5d1d; font-size: 11px; font-weight: 700; }
.cpt-path li.is-last { border-color: #c18a36; color: #39251b; font-weight: 500; }
.cpt-learn { list-style: none; margin: 0; padding: 1.4rem 1.5rem; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem 1.75rem; border: 1px solid #dcc8a8; border-radius: 10px; background: #fffaf1; }
.cpt-learn li { display: flex; gap: 0.7rem; align-items: flex-start; color: #5f4531; font-size: 14.5px; line-height: 1.6; }
.cpt-learn svg { color: #b97827; flex-shrink: 0; margin-top: 0.15rem; }
.cpt-progress { background: #302018; border-radius: 12px; padding: clamp(1.5rem, 3vw, 2.25rem); }

.cpt-final { background: #24150f; padding: 64px clamp(1.25rem, 5vw, 3.5rem); }
.cpt-final-inner { max-width: 1200px; margin: 0 auto; }
.cpt-final-links { display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: center; }
.cpt-outline { display: inline-flex; align-items: center; color: #e8b85b; font-size: 12px; letter-spacing: 0.13em; text-transform: uppercase; text-decoration: none; font-weight: 500; border: 1px solid rgba(232,184,91,0.4); border-radius: 2px; padding: 11px 22px; }
.cpt-outline:focus-visible { outline: 2px solid #e8b85b; outline-offset: 2px; }
.cpt-final-note { color: #d9cbb8; font-size: 13px; line-height: 1.7; font-weight: 300; margin: 1rem 0 0; max-width: 640px; }

@media (max-width: 899px) {
  .cpt-hero { padding-bottom: 40px; }
  .cpt-hero-main { max-width: 100%; }
  .cpt-body-inner { grid-template-columns: minmax(0, 1fr); grid-template-areas: "aside" "main"; }
  .cpt-aside { margin-top: 0; padding-top: 28px; }
  .cpt-aside-card { position: static; box-shadow: none; }
  .cpt-learn { grid-template-columns: minmax(0, 1fr); }
}
`;
