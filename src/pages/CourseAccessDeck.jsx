import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/page/PageLayout';
import PageMeta from '@/components/seo/PageMeta';
import DeckSlideCard from '@/components/deck/DeckSlideCard';
import DeckChecklist from '@/components/deck/DeckChecklist';
import { COURSE_ACCESS_DECK } from '@/lib/course-access-deck';
import { useAuth } from '@/lib/AuthContext';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

const CONTENT = {
  eyebrow: 'Presenter’s Copy',
  notesOn: 'Hide Speaker Notes',
  notesOff: 'Show Speaker Notes',
  slideLabel: 'Slide',
  of: 'of',
  loading: 'Loading the deck...',
  adminOnlyHeading: 'Administrators Only',
  adminOnlyBody: 'The presenter’s deck is available to Tamu Academy administrators.',
  backHome: 'Back to Home',
  footerNote:
    'This deck is a presenter’s script. It shows the learner journey in words and visuals to arrange — it is not a downloadable slide file, and it contains no screenshots of the platform.',
};

const bodyText = { color: 'rgba(243,234,216,0.78)', fontSize: '0.95rem', lineHeight: 1.8, fontWeight: 300 };

const actionStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.45rem',
  color: '#e8b85b',
  fontSize: '0.72rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  fontWeight: 500,
  textDecoration: 'none',
  border: '1px solid rgba(232,184,91,0.4)',
  borderRadius: '2px',
  padding: '0.62rem 1.15rem',
  cursor: 'pointer',
  background: 'transparent',
  fontFamily: "'DM Sans', sans-serif",
};

/**
 * CourseAccessDeck — the presenter's copy of the course-access deck.
 *
 * Administrator-only and noindex: it is an internal presentation aid, not a
 * learner page. It renders the deck's slide copy with the speaker notes,
 * suggested visual and verification note for each slide, plus the
 * pre-presentation checklist.
 */
export default function CourseAccessDeck() {
  const { content: c } = useTranslatedContent('course-access-deck', CONTENT);
  const { user, isLoadingAuth } = useAuth();
  const [showNotes, setShowNotes] = useState(true);

  if (isLoadingAuth) {
    return (
      <PageLayout>
        <PageMeta title="Course Access Deck | Tamu Academy" path="/admin/course-access-deck" noindex nofollow />
        <div style={{ padding: '3rem 0', textAlign: 'center' }}>
          <p className="font-body" style={bodyText}>{c.loading}</p>
        </div>
      </PageLayout>
    );
  }

  if (!user || user.role !== 'admin') {
    return (
      <PageLayout>
        <PageMeta title="Course Access Deck | Tamu Academy" path="/admin/course-access-deck" noindex nofollow />
        <div style={{ padding: '3rem 0', textAlign: 'center' }}>
          <h1 className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.4rem, 2.6vw, 1.9rem)', fontWeight: 400, marginBottom: '1.25rem' }}>
            {c.adminOnlyHeading}
          </h1>
          <p className="font-body" style={{ ...bodyText, maxWidth: '520px', margin: '0 auto 2rem' }}>
            {c.adminOnlyBody}
          </p>
          <Link to="/" className="font-body tamu-nav-link" style={actionStyle}>{c.backHome}</Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <PageMeta
        title="How Learners Access a Course — Presenter’s Deck | Tamu Academy"
        description="A presenter’s walkthrough of the Tamu Academy learner journey, from the course catalogue to a certificate."
        path="/admin/course-access-deck"
        noindex
        nofollow
      />

      <div style={{ maxWidth: '1080px', margin: '0 auto', paddingBottom: 'clamp(3rem, 7vw, 6rem)' }}>
        {/* ── Opening ─────────────────────────────────────────────────────── */}
        <header style={{ padding: 'clamp(2rem, 5vw, 3.5rem) 0 clamp(2rem, 4vw, 3rem)' }}>
          <span className="font-body" style={{ color: '#e8b85b', fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 500 }}>
            {c.eyebrow}
          </span>
          <h1
            className="font-heading"
            style={{
              color: '#f8f0df',
              fontSize: 'clamp(2rem, 4.6vw, 3.4rem)',
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              margin: '0.9rem 0 1.1rem',
              maxWidth: '820px',
            }}
          >
            {COURSE_ACCESS_DECK.title}
          </h1>
          <p className="font-body" style={{ ...bodyText, maxWidth: '660px', margin: '0 0 0.7rem' }}>
            {COURSE_ACCESS_DECK.subtitle}
          </p>
          <p className="font-body" style={{ color: 'rgba(243,234,216,0.55)', fontSize: '0.86rem', lineHeight: 1.7, fontWeight: 300, maxWidth: '660px', margin: '0 0 1.9rem' }}>
            {COURSE_ACCESS_DECK.audience}
          </p>

          <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <button type="button" onClick={() => setShowNotes((value) => !value)} style={actionStyle} aria-pressed={showNotes}>
              {showNotes ? c.notesOn : c.notesOff}
            </button>
            <span className="font-body" style={{ color: 'rgba(243,234,216,0.45)', fontSize: '0.78rem', letterSpacing: '0.04em' }}>
              {COURSE_ACCESS_DECK.slides.length} slides
            </span>
          </div>
        </header>

        {/* ── Slides ──────────────────────────────────────────────────────── */}
        <div>
          {COURSE_ACCESS_DECK.slides.map((slide) => (
            <DeckSlideCard key={slide.number} slide={slide} showNotes={showNotes} />
          ))}
        </div>

        <DeckChecklist checklist={COURSE_ACCESS_DECK.checklist} />

        <p className="font-body" style={{ color: 'rgba(243,234,216,0.42)', fontSize: '0.8rem', lineHeight: 1.75, fontWeight: 300, margin: 'clamp(2.5rem, 5vw, 4rem) 0 0', maxWidth: '720px' }}>
          {c.footerNote}
        </p>
      </div>
    </PageLayout>
  );
}