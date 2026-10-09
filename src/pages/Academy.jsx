import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '@/components/seo/PageMeta';
import { base44 } from '@/api/base44Client';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';
import {
  FOUNDATION_KEY,
  FOUNDATION_DEFAULTS,
  mergeFoundationContent,
} from '@/lib/foundation-content';
import FoundationIntro from '@/components/foundation/FoundationIntro';
import FoundationProfiles from '@/components/foundation/FoundationProfiles';
import FoundationRelationship from '@/components/foundation/FoundationRelationship';
import FoundationCommitment from '@/components/foundation/FoundationCommitment';

/**
 * Our Foundation — who is behind Tamu Academy.
 *
 * The wording comes from the default text in @/lib/foundation-content, with any
 * values an administrator has saved on the FoundationContent record merged over
 * it. Nothing here is translated from the record: saved copy is shown as written.
 */
export default function Academy() {
  const [saved, setSaved] = useState(null);
  const { content: translated } = useTranslatedContent('our-foundation', FOUNDATION_DEFAULTS);

  useEffect(() => {
    let active = true;
    base44.entities.FoundationContent.filter({ key: FOUNDATION_KEY }, { limit: 1 })
      .then((page) => {
        if (active) setSaved(page.items?.[0] ?? null);
      })
      // A record that cannot be read simply leaves the page on its default text.
      .catch(() => {
        if (active) setSaved(null);
      });
    return () => {
      active = false;
    };
  }, []);

  const c = useMemo(() => mergeFoundationContent(saved, translated), [saved, translated]);
  const photos = {
    tex: saved?.tex_photo_url || '',
    hussein: saved?.hussein_photo_url || '',
  };

  return (
    <div className="academy-root">
      <PageMeta
        title="Our Foundation | Tamu Academy"
        description="Meet the people and organizations behind Tamu Academy: our academic foundation, educational leadership, and commitment to free, credible learning."
        path="/academy"
      />

      {/* Minimal top navigation (consistent with launch homepage) */}
      <header className="academy-topnav">
        <Link to="/" aria-label="Tamu Academy — home" className="academy-topnav-brand font-heading">
          Tamu <span className="academy-topnav-accent">Academy</span>
          <span className="academy-topnav-attr font-body">{c.footerAttr}</span>
        </Link>
        <nav aria-label="Primary" className="academy-nav">
          <Link to="/academy" aria-current="page" className="academy-nav-link font-body">
            {c.navExplore}
          </Link>
          <Link to="/courses" className="academy-nav-join font-body">
            {c.navJoin}
          </Link>
        </nav>
      </header>

      <main id="academy-main" tabIndex={-1} className="academy-main">
        <FoundationIntro content={c} />
        <FoundationProfiles content={c} photos={photos} />
        <FoundationRelationship content={c} />
        <FoundationCommitment content={c} />
      </main>

      {/* Minimal footer (legal copyright keeps full Waiyaki House LLC) */}
      <footer className="academy-footer">
        <p className="academy-footer-brand font-heading">
          Tamu <span className="academy-topnav-accent">Academy</span>
        </p>
        <p className="academy-footer-attr font-body">{c.footerAttr}</p>
        <p className="academy-footer-copy font-body">{c.footerCopy}</p>
        <p className="academy-footer-links">
          <Link to="/privacy" className="font-body">
            {c.privacyPolicy}
          </Link>
        </p>
      </footer>

      <style>{`
/* ---------- Root / layout ---------- */
.academy-root {
  background-color: #24150f;
  color: #f8f0df;
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
  border-bottom: 1px solid rgba(232,184,91,0.12);
  flex-wrap: wrap;
}
.academy-topnav-brand {
  color: #f8f0df;
  font-size: clamp(1rem, 2vw, 1.2rem);
  letter-spacing: 0.22em;
  text-transform: uppercase;
  font-weight: 500;
  text-decoration: none;
  display: inline-flex;
  align-items: baseline;
  gap: 0.4rem;
}
.academy-topnav-accent { color: #e8b85b; }
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
  color: rgba(243,234,216,0.85);
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 500;
  text-decoration: none;
}
.academy-nav-link[aria-current="page"] {
  color: #e8b85b;
  border-bottom: 1px solid rgba(232,184,91,0.6);
  padding-bottom: 0.15rem;
}
.academy-nav-join {
  color: #24150f;
  background-color: #e8b85b;
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
  color: #e8b85b;
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
.academy-h2 {
  color: #f8f0df;
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: 0.005em;
  margin: 0;
}
.academy-prose {
  max-width: 680px;
  margin: 0 auto;
}
.academy-prose p {
  color: rgba(243,234,216,0.78);
  font-size: clamp(0.98rem, 2vw, 1.05rem);
  line-height: 1.8;
  font-weight: 300;
  margin: 0 0 1.1rem;
}
.academy-prose p:last-child { margin-bottom: 0; }
.academy-prose-narrow { max-width: 620px; }

/* ---------- Opening ---------- */
.academy-hero {
  text-align: center;
  max-width: 820px;
  margin: 0 auto;
  padding: clamp(1.5rem, 4vw, 3rem) 0 clamp(2.5rem, 5vw, 3.5rem);
}
.academy-hero-h1 {
  color: #f8f0df;
  font-size: clamp(2rem, 5.5vw, 3.1rem);
  font-weight: 400;
  line-height: 1.16;
  letter-spacing: 0.005em;
  margin: 0 0 1.75rem;
}
.academy-hero .academy-prose p { color: rgba(243,234,216,0.72); }

/* ---------- People ---------- */
.academy-people {
  padding: clamp(2.5rem, 5vw, 3.5rem) 0;
  max-width: 980px;
  margin: 0 auto;
  border-top: 1px solid rgba(232,184,91,0.14);
}
.academy-people-grid {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 1.5rem;
}
@media (min-width: 768px) {
  .academy-people-grid { grid-template-columns: 1fr 1fr; align-items: start; }
}
.academy-person {
  padding: 2rem 1.75rem;
  border: 1px solid rgba(232,184,91,0.18);
  background-color: rgba(243,234,216,0.02);
  border-radius: 4px;
  text-align: center;
}
.academy-person-photo {
  width: 108px;
  height: 108px;
  border-radius: 50%;
  margin: 0 auto 1.25rem;
  overflow: hidden;
  border: 1px solid rgba(232,184,91,0.3);
  background-color: rgba(232,184,91,0.08);
  display: flex;
  align-items: center;
  justify-content: center;
}
.academy-person-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.academy-person-initials {
  color: #e8b85b;
  font-size: 2rem;
  letter-spacing: 0.06em;
  font-weight: 400;
}
.academy-person-name {
  color: #f8f0df;
  font-size: clamp(1.3rem, 2.8vw, 1.6rem);
  font-weight: 400;
  line-height: 1.25;
  margin: 0 0 0.5rem;
}
.academy-person-role {
  color: #e8b85b;
  font-size: 0.78rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 400;
  line-height: 1.6;
  margin: 0 0 1rem;
}
.academy-person-bio {
  color: rgba(243,234,216,0.75);
  font-size: 0.96rem;
  line-height: 1.75;
  font-weight: 300;
  margin: 0;
  text-align: left;
}

/* ---------- Organizations ---------- */
.academy-relationship {
  padding: clamp(2.5rem, 5vw, 3.5rem) 0;
  max-width: 760px;
  margin: 0 auto;
  border-top: 1px solid rgba(232,184,91,0.14);
  text-align: center;
}
.academy-steps {
  list-style: none;
  counter-reset: foundation-step;
  padding: 0;
  margin: 0 auto;
  max-width: 620px;
  display: grid;
  gap: 0.9rem;
}
.academy-step {
  counter-increment: foundation-step;
  position: relative;
  padding: 1.1rem 1.35rem 1.1rem 3rem;
  border: 1px solid rgba(232,184,91,0.16);
  border-radius: 4px;
  background-color: rgba(243,234,216,0.02);
  color: rgba(243,234,216,0.8);
  font-size: 0.96rem;
  line-height: 1.7;
  font-weight: 300;
  text-align: left;
}
.academy-step::before {
  content: counter(foundation-step);
  position: absolute;
  left: 1.15rem;
  top: 50%;
  transform: translateY(-50%);
  color: #e8b85b;
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  font-weight: 500;
}
.academy-relationship-note {
  color: rgba(243,234,216,0.55);
  font-size: 0.86rem;
  line-height: 1.75;
  font-weight: 300;
  margin: 1.75rem auto 0;
  max-width: 600px;
}

/* ---------- Commitment ---------- */
.academy-commitment {
  padding: clamp(2.5rem, 5vw, 3.5rem) 0;
  max-width: 760px;
  margin: 0 auto;
  border-top: 1px solid rgba(232,184,91,0.14);
  text-align: center;
}

/* ---------- Footer ---------- */
.academy-footer {
  padding: clamp(2rem, 5vw, 3rem) clamp(1.25rem, 5vw, 3rem) clamp(2rem, 5vw, 3rem);
  border-top: 1px solid rgba(232,184,91,0.12);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
}
.academy-footer-brand {
  color: #f8f0df;
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
  color: rgba(243,234,216,0.42);
  font-size: 0.7rem;
  font-weight: 300;
  margin: 0.85rem 0 0;
}
.academy-footer-links { margin: 0.85rem 0 0; }
.academy-footer-links a {
  color: rgba(232,184,91,0.85);
  font-size: 0.64rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  text-decoration: none;
  font-weight: 500;
}

/* ---------- Focus + responsive ---------- */
.academy-nav-link:focus-visible,
.academy-nav-join:focus-visible,
.academy-topnav-brand:focus-visible,
.academy-footer-links a:focus-visible {
  outline: 2px solid rgba(232,184,91,0.7);
  outline-offset: 3px;
}
@media (max-width: 600px) {
  .academy-topnav-attr { display: none; }
  .academy-topnav { justify-content: space-between; }
  .academy-person { padding: 1.75rem 1.25rem; }
}
`}</style>
    </div>
  );
}