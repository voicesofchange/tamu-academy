import React from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '@/components/seo/PageMeta';
import LearningAreas from '@/components/academy/LearningAreas';
import ProgramHighlights from '@/components/academy/ProgramHighlights';
import ModuleJourney from '@/components/academy/ModuleJourney';
import { getEconomicsCourseBySlug } from '@/lib/economics-tracks';

const COURSE_SLUG = 'understanding-african-economies-and-the-global-system';

const LEARNING_INCLUDES = [
  'Recorded lessons',
  'Written learning companions',
  'Transcripts and captions',
  'Reflection questions',
  'Knowledge checks',
  'Applied activities',
  'Workbooks and assignments',
  'Facilitator materials',
];

const ARTICLES = [
  {
    area: 'Mind and Wellbeing',
    title: 'The Real Cost of Always Achieving',
    description:
      'An exploration of how constant pressure to perform can affect identity, wellbeing, relationships, and the way success is understood.',
    status: 'Published',
    href: '/articles/the-real-cost-of-always-achieving',
  },
  {
    area: 'Power and Policy',
    title: 'Can Policy Make Us Happier?',
    description:
      'An examination of how public decisions influence security, belonging, opportunity, connection, and quality of life.',
    status: 'In Development',
    href: '/articles/can-policy-make-us-happier',
  },
  {
    area: 'Economics and Global Systems',
    title: 'Who Controls the Global Economy?',
    description:
      'An introduction to the institutions, governments, creditors, currencies, and financial rules that influence how resources and economic power move.',
    status: 'In Development',
    href: '/articles/who-controls-the-global-economy',
  },
];

export default function Academy() {
  const found = getEconomicsCourseBySlug(COURSE_SLUG);
  const course = found?.course;

  return (
    <div className="academy-root">
      <PageMeta
        title="Explore Tamu Academy | Learning Areas, Courses and Programs"
        description="Explore Tamu Academy's developing courses, learning areas, applied programs, heritage collection, and culturally grounded approach to learning."
        path="/academy"
      />

      {/* Minimal top navigation (consistent with launch homepage) */}
      <header className="academy-topnav">
        <Link
          to="/"
          aria-label="Tamu Academy — home"
          className="academy-topnav-brand font-heading"
        >
          Tamu <span className="academy-topnav-accent">Academy</span>
          <span className="academy-topnav-attr font-body">
            A Waiyaki House learning venture
          </span>
        </Link>
        <nav aria-label="Primary" className="academy-nav">
          <Link
            to="/academy"
            aria-current="page"
            className="academy-nav-link font-body"
          >
            Explore the Academy
          </Link>
          <a href="/#early-access" className="academy-nav-join font-body">
            Join Early Access
          </a>
        </nav>
      </header>

      <main id="academy-main" tabIndex={-1} className="academy-main">
        {/* Hero */}
        <section aria-labelledby="academy-hero-heading" className="academy-hero">
          <p className="academy-eyebrow academy-eyebrow-large">Explore Tamu Academy</p>
          <h1 id="academy-hero-heading" className="academy-hero-h1 font-heading">
            Learning built for understanding and application.
          </h1>
          <p className="academy-hero-support font-body">
            Tamu Academy develops culturally grounded courses, applied programs, and learning resources across economics, wellbeing, technology, governance, history, and global affairs.
          </p>
          <div className="academy-cta-row academy-hero-cta">
            <a href="/#early-access" className="academy-cta-primary font-body">
              Join Early Access
            </a>
            <Link to="/partnership-inquiry" className="academy-cta-secondary font-body">
              Discuss a Partnership
            </Link>
          </div>
          <p className="academy-attribution font-body">
            A Waiyaki House learning venture
          </p>
        </section>

        {/* Learning Areas */}
        <LearningAreas />

        {/* Featured Learning Pathway */}
        <section aria-labelledby="pathway-heading" className="academy-pathway">
          <header className="academy-section-head">
            <p className="academy-eyebrow">Featured Learning Pathway</p>
            <h2 id="pathway-heading" className="academy-h2 font-heading">
              {course?.title ?? 'Understanding African Economies and the Global System'}
            </h2>
            <p className="academy-section-support">
              A six-module pathway for understanding economic systems, institutions, global relationships, inequality, and Africa's economic futures.
            </p>
            <p className="academy-status academy-status-line academy-status-center">
              <span className="academy-status-dot" aria-hidden="true" />
              In Development
            </p>
          </header>
          <p className="academy-pathway-format font-body">
            Recorded lessons, written learning companions, reflection, knowledge checks, applied activities, and a final analytical milestone.
          </p>
        </section>

        {/* Module Journey (parallax preview of all six modules) */}
        <ModuleJourney />

        {/* Applied Milestone */}
        <section aria-labelledby="milestone-heading" className="academy-milestone">
          <header className="academy-section-head">
            <p className="academy-eyebrow">Applied Milestone</p>
            <h2 id="milestone-heading" className="academy-h2 font-heading">
              African Economic Systems Analysis
            </h2>
            <p className="academy-section-support">
              Learners apply concepts from all six modules to examine a real economic system, identify stakeholders and trade-offs, and recommend practical action.
            </p>
            <p className="academy-status academy-status-line academy-status-center">
              <span className="academy-status-dot" aria-hidden="true" />
              Planned
            </p>
          </header>
        </section>

        {/* Proposed Pilot Programme + Heritage Collection */}
        <ProgramHighlights />

        {/* How Learning Works */}
        <section aria-labelledby="how-heading" className="academy-how">
          <header className="academy-section-head">
            <p className="academy-eyebrow">How Learning Works</p>
            <h2 id="how-heading" className="academy-h2 font-heading">
              Complete course packages may include
            </h2>
          </header>
          <ul className="academy-how-list font-body">
            {LEARNING_INCLUDES.map((item) => (
              <li key={item} className="academy-how-item">
                <span className="academy-how-marker" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Ideas Beyond the Lesson — Articles + Videos */}
        <section aria-labelledby="ideas-heading" className="academy-ideas">
          <header className="academy-section-head">
            <p className="academy-eyebrow">Ideas Beyond the Lesson</p>
            <h2 id="ideas-heading" className="academy-h2 font-heading">
              Written learning companions
            </h2>
            <p className="academy-section-support">
              Written learning companions extend Tamu Academy's videos through deeper analysis, practical examples, reflection, and further reading.
            </p>
          </header>

          <ul className="academy-ideas-list">
            {ARTICLES.map((a) => (
              <li key={a.title} className="academy-idea-row">
                <p className="academy-eyebrow academy-eyebrow-mute">{a.area}</p>
                <h3 className="academy-idea-title font-heading">{a.title}</h3>
                <p className="academy-idea-desc font-body">{a.description}</p>
                <p className="academy-status academy-status-line">
                  <span className="academy-status-dot" aria-hidden="true" />
                  {a.status}
                </p>
                {a.status === 'Published' && a.href ? (
                  <p className="academy-idea-link">
                    <Link to={a.href} className="academy-cta-secondary academy-cta-inline font-body">
                      Read the Article
                    </Link>
                  </p>
                ) : null}
              </li>
            ))}
          </ul>

          <div className="academy-ideas-actions">
            <Link to="/articles" className="academy-cta-secondary font-body">
              Browse Articles
            </Link>
            <Link to="/videos" className="academy-cta-secondary font-body">
              Watch the Episodes
            </Link>
          </div>
        </section>

        {/* Final CTA */}
        <section aria-labelledby="final-cta-heading" className="academy-final-cta">
          <h2 id="final-cta-heading" className="academy-h2 font-heading">
            Interested in learning, piloting, or partnering with Tamu Academy?
          </h2>
          <div className="academy-cta-row">
            <a href="/#early-access" className="academy-cta-primary font-body">
              Join Early Access
            </a>
            <Link to="/partnership-inquiry" className="academy-cta-secondary font-body">
              Discuss a Partnership
            </Link>
          </div>
        </section>
      </main>

      {/* Minimal footer (legal copyright keeps full Waiyaki House LLC) */}
      <footer className="academy-footer">
        <p className="academy-footer-brand font-heading">
          Tamu <span className="academy-topnav-accent">Academy</span>
        </p>
        <p className="academy-footer-attr font-body">
          A Waiyaki House learning venture
        </p>
        <p className="academy-footer-copy font-body">
          © 2026 Waiyaki House LLC. All rights reserved.
        </p>
        <p className="academy-footer-links">
          <Link to="/privacy" className="font-body">
            Privacy Policy
          </Link>
        </p>
      </footer>

      <style>{`
/* ---------- Root / layout ---------- */
.academy-root {
  background-color: #1A130E;
  color: #F5EFE0;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  font-family: 'DM Sans', sans-serif;
  display: flex;
  flex-direction: column;
}

/* ---------- Top navigation ---------- */
.academy-topnav {
  padding: clamp(1.25rem, 3vw, 1.75rem) clamp(1.25rem, 5vw, 3rem);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-bottom: 1px solid rgba(212,161,42,0.12);
  flex-wrap: wrap;
}
.academy-topnav-brand {
  color: #F5EFE0;
  font-size: clamp(1rem, 2vw, 1.2rem);
  letter-spacing: 0.22em;
  text-transform: uppercase;
  font-weight: 500;
  text-decoration: none;
  display: inline-flex;
  align-items: baseline;
  gap: 0.4rem;
}
.academy-topnav-accent { color: #D4A12A; }
.academy-topnav-attr {
  color: rgba(92,117,111,0.95);
  font-size: 0.6rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 400;
  margin-left: 0.6rem;
}
.academy-nav {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  flex-wrap: wrap;
}
.academy-nav-link {
  color: rgba(245,239,224,0.85);
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 500;
  text-decoration: none;
}
.academy-nav-link[aria-current="page"] {
  color: #D4A12A;
  border-bottom: 1px solid rgba(212,161,42,0.6);
  padding-bottom: 0.15rem;
}
.academy-nav-join {
  color: #1A130E;
  background-color: #D4A12A;
  font-size: 0.7rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 500;
  border: 1px solid transparent;
  border-radius: 3px;
  padding: 0.6rem 1.1rem;
  text-decoration: none;
  white-space: nowrap;
}

/* ---------- Main ---------- */
.academy-main {
  outline: none;
  padding: clamp(2rem, 5vw, 3.5rem) clamp(1.25rem, 5vw, 3rem);
  flex: 1 1 auto;
}
.academy-main:focus { outline: none; }

/* ---------- Shared section helpers ---------- */
.academy-section-head {
  max-width: 760px;
  margin: 0 auto 1.5rem;
  text-align: center;
}
.academy-eyebrow {
  color: #D4A12A;
  font-size: 0.66rem;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  font-weight: 500;
  margin: 0;
  text-align: center;
}
.academy-eyebrow-large {
  font-size: 0.74rem;
  margin-bottom: 0.85rem;
}
.academy-eyebrow-mute {
  color: rgba(92,117,111,0.95);
  font-size: 0.64rem;
  letter-spacing: 0.22em;
  text-align: left;
}
.academy-h2 {
  color: #F5EFE0;
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: 0.005em;
  margin: 0.5rem 0 0.85rem;
}
.academy-section-support {
  color: rgba(245,239,224,0.72);
  font-size: clamp(0.95rem, 2vw, 1.05rem);
  line-height: 1.75;
  font-weight: 300;
  margin: 0 auto;
  max-width: 640px;
}
.academy-status {
  color: rgba(92,117,111,0.95);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}
.academy-status-line { display: inline-flex; }
.academy-status-center { justify-content: center; }
.academy-status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #D4A12A;
  display: inline-block;
  flex-shrink: 0;
}

/* ---------- CTA buttons ---------- */
.academy-cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  justify-content: center;
  margin-top: 1.5rem;
}
.academy-cta-primary,
.academy-cta-secondary {
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 500;
  border-radius: 3px;
  padding: 0.85rem 1.6rem;
  text-decoration: none;
  white-space: nowrap;
  display: inline-block;
  transition: background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease;
}
.academy-cta-primary {
  color: #1A130E;
  background-color: #D4A12A;
  border: 1px solid transparent;
}
.academy-cta-primary:hover { background-color: rgba(212,161,42,0.85); }
.academy-cta-secondary {
  color: #F5EFE0;
  background-color: transparent;
  border: 1px solid rgba(212,161,42,0.5);
}
.academy-cta-secondary:hover {
  border-color: rgba(212,161,42,0.85);
  color: #D4A12A;
}
.academy-cta-inline {
  font-size: 0.66rem;
  padding: 0.6rem 1.1rem;
}

/* ---------- Hero ---------- */
.academy-hero {
  text-align: center;
  max-width: 820px;
  margin: 0 auto;
  padding: clamp(1.5rem, 4vw, 3rem) 0 clamp(2rem, 5vw, 3rem);
}
.academy-hero-h1 {
  color: #F5EFE0;
  font-size: clamp(2.1rem, 6vw, 3.4rem);
  font-weight: 400;
  line-height: 1.15;
  letter-spacing: 0.005em;
  margin: 0 0 1.5rem;
}
.academy-hero-support {
  color: rgba(245,239,224,0.78);
  font-size: clamp(0.98rem, 2vw, 1.15rem);
  line-height: 1.75;
  font-weight: 300;
  margin: 0 auto 1.5rem;
  max-width: 620px;
}
.academy-hero-cta { margin-top: 1.75rem; }
.academy-attribution {
  color: rgba(92,117,111,0.95);
  font-size: 0.64rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 400;
  margin: 2rem 0 0;
}

/* ---------- Featured pathway ---------- */
.academy-pathway {
  padding: clamp(2.5rem, 5vw, 3.5rem) 0;
  text-align: center;
  max-width: 860px;
  margin: 0 auto;
  border-top: 1px solid rgba(212,161,42,0.18);
  border-bottom: 1px solid rgba(212,161,42,0.18);
}
.academy-pathway-format {
  color: rgba(245,239,224,0.6);
  font-size: 0.9rem;
  line-height: 1.7;
  font-weight: 300;
  max-width: 620px;
  margin: 1rem auto 0;
}

/* ---------- Applied milestone ---------- */
.academy-milestone {
  padding: clamp(2.5rem, 5vw, 3.5rem) 0;
  text-align: center;
  max-width: 760px;
  margin: 0 auto;
}

/* ---------- How learning works ---------- */
.academy-how {
  padding: clamp(2.5rem, 5vw, 3.5rem) 0;
  text-align: center;
  max-width: 760px;
  margin: 0 auto;
  border-top: 1px solid rgba(212,161,42,0.12);
}
.academy-how-list {
  list-style: none;
  padding: 0;
  margin: 1.5rem auto 0;
  display: grid;
  gap: 0.6rem 1.75rem;
  text-align: left;
  max-width: 640px;
}
@media (min-width: 640px) {
  .academy-how-list { grid-template-columns: 1fr 1fr; }
}
.academy-how-item {
  display: flex;
  align-items: baseline;
  gap: 0.65rem;
  color: rgba(245,239,224,0.78);
  font-size: 0.94rem;
  line-height: 1.5;
  font-weight: 300;
}
.academy-how-marker {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: rgba(212,161,42,0.75);
  display: inline-block;
  flex-shrink: 0;
  position: relative;
  top: -2px;
}

/* ---------- Ideas / articles ---------- */
.academy-ideas {
  padding: clamp(2.5rem, 5vw, 3.5rem) 0;
  max-width: 1080px;
  margin: 0 auto;
}
.academy-ideas-list {
  list-style: none;
  padding: 0;
  margin: 2rem 0 0;
  display: grid;
  gap: 1.25rem;
}
@media (min-width: 768px) {
  .academy-ideas-list {
    grid-template-columns: 1fr 1fr 1fr;
    align-items: start;
  }
}
.academy-idea-row {
  text-align: left;
  padding: 1.6rem 1.35rem;
  border: 1px solid rgba(212,161,42,0.18);
  background-color: rgba(245,239,224,0.02);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  transition: border-color 0.25s ease, background-color 0.25s ease;
}
.academy-idea-row:hover {
  border-color: rgba(212,161,42,0.4);
  background-color: rgba(245,239,224,0.04);
}
.academy-idea-title {
  color: #F5EFE0;
  font-size: clamp(1.15rem, 2.6vw, 1.45rem);
  font-weight: 400;
  line-height: 1.25;
  margin: 0.5rem 0 0.75rem;
}
.academy-idea-desc {
  color: rgba(245,239,224,0.7);
  font-size: 0.92rem;
  line-height: 1.6;
  font-weight: 300;
  margin: 0 0 1rem;
  flex: 1 1 auto;
}
.academy-idea-link { margin: 0.25rem 0 0; }
.academy-ideas-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  justify-content: center;
  margin-top: 2.25rem;
}

/* ---------- Final CTA ---------- */
.academy-final-cta {
  padding: clamp(2.5rem, 5vw, 3.5rem) 0;
  text-align: center;
  max-width: 720px;
  margin: 0 auto;
  border-top: 1px solid rgba(212,161,42,0.18);
}
.academy-final-cta .academy-h2 { margin: 0 0 1rem; }

/* ---------- Footer ---------- */
.academy-footer {
  padding: clamp(2rem, 5vw, 3rem) clamp(1.25rem, 5vw, 3rem) clamp(2rem, 5vw, 3rem);
  border-top: 1px solid rgba(212,161,42,0.12);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
}
.academy-footer-brand {
  color: #F5EFE0;
  font-size: 0.92rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 500;
  margin: 0;
}
.academy-footer-attr {
  color: rgba(92,117,111,0.95);
  font-size: 0.64rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 400;
  margin: 0;
}
.academy-footer-copy {
  color: rgba(245,239,224,0.42);
  font-size: 0.7rem;
  font-weight: 300;
  margin: 0.85rem 0 0;
}
.academy-footer-links {
  margin: 0.85rem 0 0;
}
.academy-footer-links a {
  color: rgba(212,161,42,0.85);
  font-size: 0.64rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  text-decoration: none;
  font-weight: 500;
}

/* ---------- Focus + responsive ---------- */
.academy-cta-primary:focus-visible,
.academy-cta-secondary:focus-visible,
.academy-nav-link:focus-visible,
.academy-nav-join:focus-visible,
.academy-topnav-brand:focus-visible,
.academy-footer-links a:focus-visible,
.academy-idea-link a:focus-visible {
  outline: 2px solid rgba(212,161,42,0.7);
  outline-offset: 3px;
}
@media (max-width: 600px) {
  .academy-topnav-attr { display: none; }
  .academy-topnav { justify-content: space-between; }
}
@media (prefers-reduced-motion: reduce) {
  .academy-cta-primary,
  .academy-cta-secondary,
  .academy-area-row,
  .academy-idea-row {
    transition: none !important;
  }
}
`}</style>
    </div>
  );
}