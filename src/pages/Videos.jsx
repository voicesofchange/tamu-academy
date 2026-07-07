import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageLayout from '@/components/page/PageLayout';
import PageHero from '@/components/page/PageHero';
import PageSection from '@/components/page/PageSection';
import PageMeta from '@/components/seo/PageMeta';

// ── Static episode data ──────────────────────────────────────────────────────
// To add episodes, push objects to this array with the shape below.
// No database or CMS is required.
//
// Episode object shape:
// {
//   id: string,
//   title: string,
//   description: string,
//   category: string,           // one of CATEGORIES
//   publicationDate: string,    // ISO date string, e.g. '2025-01-15'
//   duration: string,           // e.g. '12 min'
//   thumbnail: string,          // URL
//   videoUrl: string,           // YouTube privacy-enhanced URL: https://www.youtube-nocookie.com/embed/...
//   transcriptUrl: string,      // URL to transcript document or page
//   discussionQuestions: string[],
//   featured: boolean,
// }

const EPISODES = [];

const CATEGORIES = [
  'Technology and Digital Citizenship',
  'Intercultural Leadership and Peacebuilding',
  'Public Policy and Governance',
  'Economics and Opportunity',
  'Climate and Sustainability',
  'Writing, Storytelling, and Communication',
];

const FORMAT_CARDS = [
  {
    title: 'Short Explainers',
    desc: 'Concise videos that introduce important ideas, debates, and concepts.',
  },
  {
    title: 'Conversations',
    desc: 'Interviews and discussions with people working across communities, institutions, and disciplines.',
  },
  {
    title: 'Stories From the Field',
    desc: 'Grounded accounts of how policy, culture, leadership, and environmental change affect real communities.',
  },
];

const bodyText = { color: 'rgba(245,239,224,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };
const mutedText = { color: 'rgba(245,239,224,0.52)', fontSize: '0.88rem', lineHeight: 1.75, fontWeight: 300 };

export default function Videos() {
  return (
    <PageLayout>
      <PageMeta
        title="Tamu Academy Video Series | Ideas, Conversations and Learning"
        description="Explore the developing Tamu Academy Video Series featuring accessible explainers, conversations, and stories on public policy, culture, leadership, sustainability, technology, and communication."
        path="/videos"
      />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <PageHero
        eyebrow="Video Series"
        heading="Ideas worth understanding. Conversations worth continuing."
        subheading="The Tamu Academy Video Series will explore public policy, culture, leadership, sustainability, technology, storytelling, and the forces shaping communities around the world."
      />

      {/* Hero CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.55 }}
        style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '5rem' }}
      >
        <a
          href="#episodes"
          className="font-body"
          style={{
            display: 'inline-flex', alignItems: 'center',
            color: '#1A130E', backgroundColor: '#D4A12A',
            fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase',
            textDecoration: 'none', fontWeight: 500,
            border: '1px solid #D4A12A', borderRadius: '2px', padding: '0.65rem 1.3rem',
          }}
        >
          Explore the Series
        </a>
        <Link
          to="/resources"
          className="font-body"
          style={{
            display: 'inline-flex', alignItems: 'center',
            color: '#D4A12A',
            fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase',
            textDecoration: 'none', fontWeight: 500,
            border: '1px solid rgba(212,161,42,0.4)', borderRadius: '2px', padding: '0.65rem 1.3rem',
          }}
        >
          Explore Learning Resources →
        </Link>
      </motion.div>

      {/* ── Series Purpose ────────────────────────────────────────────────── */}
      <PageSection heading="Learning beyond the classroom">
        <p className="font-body" style={{ ...bodyText, marginBottom: '2.5rem' }}>
          Tamu Academy videos are designed to make complex ideas accessible without oversimplifying them. Through explainers, interviews, conversations, and field-based stories, the series will connect knowledge with lived experience and practical action.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
          {FORMAT_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: i * 0.08 }}
              style={{
                padding: '1.5rem 1.6rem',
                border: '1px solid rgba(212,161,42,0.16)',
                borderRadius: '4px',
                backgroundColor: 'rgba(245,239,224,0.02)',
              }}
            >
              <h3 className="font-heading" style={{ color: '#F5EFE0', fontSize: '1.15rem', fontWeight: 400, margin: '0 0 0.6rem' }}>
                {card.title}
              </h3>
              <p className="font-body" style={{ color: 'rgba(245,239,224,0.65)', fontSize: '0.88rem', lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
        <p className="font-body" style={{ ...mutedText, marginTop: '1.25rem', fontStyle: 'italic' }}>
          These formats describe the series in development. No episodes have been produced yet.
        </p>
      </PageSection>

      {/* ── Topic Categories ──────────────────────────────────────────────── */}
      <PageSection eyebrow="Topics" heading="What the series will cover">
        <p className="font-body" style={{ ...bodyText, marginBottom: '1.75rem' }}>
          Episodes will draw on Tamu Academy's six learning areas, exploring how ideas in each domain shape real communities and decisions.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
          {CATEGORIES.map((cat) => (
            <span
              key={cat}
              className="font-body"
              style={{
                color: 'rgba(245,239,224,0.78)',
                fontSize: '0.82rem',
                border: '1px solid rgba(212,161,42,0.22)',
                borderRadius: '2px',
                padding: '0.4rem 0.9rem',
                fontWeight: 400,
                backgroundColor: 'rgba(212,161,42,0.03)',
              }}
            >
              {cat}
            </span>
          ))}
        </div>
      </PageSection>

      {/* ── Featured Episode Placeholder ──────────────────────────────────── */}
      <PageSection eyebrow="Featured">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{
            padding: '2.5rem',
            border: '1px solid rgba(212,161,42,0.28)',
            borderRadius: '4px',
            backgroundColor: 'rgba(212,161,42,0.03)',
          }}
        >
          <span
            className="font-body"
            style={{
              display: 'inline-block',
              color: 'rgba(212,161,42,0.85)',
              fontSize: '0.65rem', letterSpacing: '0.16em', textTransform: 'uppercase',
              fontWeight: 500, border: '1px solid rgba(212,161,42,0.3)',
              borderRadius: '999px', padding: '0.3rem 0.85rem', marginBottom: '1.25rem',
            }}
          >
            Coming Soon
          </span>

          {/* Branded placeholder — no fake video, no fake presenter */}
          <div
            aria-hidden="true"
            style={{
              width: '100%',
              aspectRatio: '16 / 9',
              maxWidth: '600px',
              borderRadius: '4px',
              border: '1px solid rgba(212,161,42,0.18)',
              background: 'linear-gradient(135deg, rgba(26,19,14,0.95) 0%, rgba(36,27,18,0.9) 50%, rgba(26,19,14,0.95) 100%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.75rem',
              gap: '0.75rem',
            }}
          >
            {/* Decorative geometric motif only */}
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
              <circle cx="24" cy="24" r="22" stroke="rgba(212,161,42,0.35)" strokeWidth="1" />
              <circle cx="24" cy="24" r="14" stroke="rgba(212,161,42,0.2)" strokeWidth="1" />
              <line x1="24" y1="2" x2="24" y2="46" stroke="rgba(212,161,42,0.15)" strokeWidth="1" strokeDasharray="3 4" />
              <line x1="2" y1="24" x2="46" y2="24" stroke="rgba(212,161,42,0.15)" strokeWidth="1" strokeDasharray="3 4" />
            </svg>
            <span className="font-heading" style={{ color: 'rgba(212,161,42,0.5)', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500 }}>
              Tamu Academy
            </span>
          </div>

          <h2 className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(1.3rem, 2.8vw, 1.9rem)', fontWeight: 400, lineHeight: 1.25, margin: '0 0 1rem', maxWidth: '560px' }}>
            The first Tamu Academy video series is in development.
          </h2>
          <p className="font-body" style={{ ...bodyText, maxWidth: '560px', margin: 0 }}>
            Future episodes will bring together accessible analysis, lived experience, and practical questions for learners, educators, and community leaders.
          </p>
        </motion.div>
      </PageSection>

      {/* ── Episode Library ───────────────────────────────────────────────── */}
      <PageSection id="episodes" heading="Watch and explore">
        {EPISODES.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              padding: '2.5rem',
              border: '1px solid rgba(212,161,42,0.12)',
              borderRadius: '4px',
              backgroundColor: 'rgba(245,239,224,0.015)',
              textAlign: 'center',
            }}
          >
            <p className="font-body" style={{ ...mutedText, margin: 0 }}>
              No episodes have been published yet. New videos will be added as the series develops.
            </p>
          </motion.div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {EPISODES.map((ep) => (
              <EpisodeCard key={ep.id} episode={ep} />
            ))}
          </div>
        )}
      </PageSection>

      {/* ── Discussion Prompts ────────────────────────────────────────────── */}
      <PageSection eyebrow="For Learners and Educators" heading="Learning with every episode">
        <p className="font-body" style={{ ...bodyText, marginBottom: '1.5rem' }}>
          Selected videos in the Tamu Academy series may include materials to support deeper engagement. These may include:
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
          {[
            'Reflection questions',
            'Discussion prompts',
            'Related readings',
            'Classroom or community activities',
            'Links to relevant Tamu Academy resources',
          ].map((item) => (
            <span
              key={item}
              className="font-body"
              style={{
                color: 'rgba(245,239,224,0.72)',
                fontSize: '0.83rem',
                border: '1px solid rgba(212,161,42,0.18)',
                borderRadius: '2px',
                padding: '0.35rem 0.8rem',
                fontWeight: 300,
              }}
            >
              {item}
            </span>
          ))}
        </div>
        <p className="font-body" style={{ ...mutedText, marginTop: '1.25rem', fontStyle: 'italic' }}>
          Discussion materials will appear alongside episodes when published.
        </p>
      </PageSection>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          marginBottom: '2rem',
          padding: '2.5rem',
          border: '1px solid rgba(212,161,42,0.22)',
          borderRadius: '4px',
          backgroundColor: 'rgba(212,161,42,0.025)',
          textAlign: 'center',
        }}
      >
        <h2 className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 400, lineHeight: 1.25, margin: '0 0 1rem' }}>
          Keep learning beyond the video.
        </h2>
        <p className="font-body" style={{ color: 'rgba(245,239,224,0.7)', fontSize: '0.97rem', lineHeight: 1.8, fontWeight: 300, maxWidth: '520px', margin: '0 auto 1.75rem' }}>
          Explore related resources, programmes, and learning areas across Tamu Academy.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          <Link
            to="/resources"
            style={{
              display: 'inline-flex', alignItems: 'center',
              color: '#1A130E', backgroundColor: '#D4A12A',
              fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase',
              textDecoration: 'none', fontWeight: 500,
              border: '1px solid #D4A12A', borderRadius: '2px', padding: '0.65rem 1.3rem',
            }}
          >
            Explore Resources →
          </Link>
          <Link
            to="/programmes"
            style={{
              display: 'inline-flex', alignItems: 'center',
              color: '#D4A12A',
              fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase',
              textDecoration: 'none', fontWeight: 500,
              border: '1px solid rgba(212,161,42,0.4)', borderRadius: '2px', padding: '0.65rem 1.3rem',
            }}
          >
            Explore Programmes →
          </Link>
        </div>
      </motion.div>
    </PageLayout>
  );
}

// ── Episode Card ─────────────────────────────────────────────────────────────
// Prepared for future use when episodes are added to EPISODES array.
// Renders a fully accessible episode card with 16:9 thumbnail, metadata, and links.
function EpisodeCard({ episode }) {
  return (
    <article
      style={{
        border: '1px solid rgba(212,161,42,0.16)',
        borderRadius: '4px',
        backgroundColor: 'rgba(245,239,224,0.02)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 16:9 Thumbnail */}
      {episode.thumbnail && (
        <div style={{ aspectRatio: '16 / 9', overflow: 'hidden', backgroundColor: 'rgba(26,19,14,0.8)' }}>
          <img
            src={episode.thumbnail}
            alt=""
            aria-hidden="true"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
      )}

      <div style={{ padding: '1.25rem 1.4rem', display: 'flex', flexDirection: 'column', gap: '0.65rem', flexGrow: 1 }}>
        {/* Category + duration */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          <span className="font-body" style={{ color: '#D4A12A', fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500 }}>
            {episode.category}
          </span>
          {episode.duration && (
            <span className="font-body" style={{ color: 'rgba(245,239,224,0.4)', fontSize: '0.72rem', fontWeight: 300 }}>
              {episode.duration}
            </span>
          )}
        </div>

        <h3 className="font-heading" style={{ color: '#F5EFE0', fontSize: '1.1rem', fontWeight: 400, lineHeight: 1.3, margin: 0 }}>
          {episode.title}
        </h3>

        <p className="font-body" style={{ color: 'rgba(245,239,224,0.65)', fontSize: '0.87rem', lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
          {episode.description}
        </p>

        {/* Actions */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: 'auto', paddingTop: '0.5rem' }}>
          {episode.videoUrl && (
            <a
              href={episode.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Watch ${episode.title} on YouTube (opens in new tab)`}
              className="font-body"
              style={{
                display: 'inline-flex', alignItems: 'center',
                color: '#D4A12A', fontSize: '0.68rem', letterSpacing: '0.16em',
                textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500,
                border: '1px solid rgba(212,161,42,0.35)', borderRadius: '2px', padding: '0.45rem 0.9rem',
              }}
            >
              Watch →
            </a>
          )}
          {episode.transcriptUrl && (
            <a
              href={episode.transcriptUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Read transcript for ${episode.title} (opens in new tab)`}
              className="font-body"
              style={{
                color: 'rgba(245,239,224,0.55)', fontSize: '0.68rem', letterSpacing: '0.14em',
                textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500,
                display: 'inline-flex', alignItems: 'center',
              }}
            >
              Transcript
            </a>
          )}
        </div>
      </div>
    </article>
  );
}