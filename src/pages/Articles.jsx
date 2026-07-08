import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import PageLayout from '@/components/page/PageLayout';
import PageHero from '@/components/page/PageHero';
import PageSection from '@/components/page/PageSection';
import PageMeta from '@/components/seo/PageMeta';
import ArticleCard from '@/components/articles/ArticleCard';
import { ARTICLES } from '@/lib/articles-data';

export default function Articles() {
  const collectionRef = useRef(null);

  const handleBrowse = (e) => {
    e.preventDefault();
    collectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <PageLayout>
      <PageMeta
        title="Articles | Tamu Academy"
        description="Read Tamu Academy articles expanding on episodes about wellbeing, public policy, economics, institutions, culture, and global systems."
        path="/articles"
      />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <PageHero
        eyebrow="Tamu Academy Articles"
        heading="Ideas beyond the episode"
        subheading="Explore written learning companions that expand on Tamu Academy's videos through deeper analysis, practical examples, reflection questions, and resources for continued learning."
      />

      {/* ── Hero CTAs ─────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.5 }}
        style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '4rem' }}
      >
        <a
          href="#article-collection"
          onClick={handleBrowse}
          className="font-body"
          style={{ display: 'inline-flex', alignItems: 'center', color: '#1A130E', backgroundColor: '#D4A12A', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, border: '1px solid #D4A12A', borderRadius: '2px', padding: '0.65rem 1.3rem' }}
        >
          Browse Articles
        </a>
        <Link
          to="/videos"
          className="font-body"
          style={{ display: 'inline-flex', alignItems: 'center', color: '#D4A12A', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, border: '1px solid rgba(212,161,42,0.4)', borderRadius: '2px', padding: '0.65rem 1.3rem' }}
        >
          Watch the Episodes →
        </Link>
      </motion.div>

      {/* ── Welcome Episode Feature ───────────────────────────────────────── */}
      <PageSection eyebrow="Start Here">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{
            padding: '1.75rem 2rem',
            border: '1px solid rgba(212,161,42,0.22)',
            borderRadius: '4px',
            backgroundColor: 'rgba(212,161,42,0.025)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}
        >
          <span className="font-body" style={{ color: '#D4A12A', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500 }}>
            Welcome Episode
          </span>
          <h2 className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(1.1rem, 2.4vw, 1.5rem)', fontWeight: 400, lineHeight: 1.3, margin: 0 }}>
            Welcome to Tamu Academy: Learning Across Cultures
          </h2>
          <p className="font-body" style={{ color: 'rgba(245,239,224,0.65)', fontSize: '0.93rem', lineHeight: 1.8, fontWeight: 300, margin: 0, maxWidth: '600px' }}>
            Begin with the welcome episode to learn how Tamu Academy connects questions about the mind, power, culture, policy, economics, and the wider world.
          </p>
          <Link
            to="/videos"
            className="font-body"
            style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#D4A12A', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, border: '1px solid rgba(212,161,42,0.4)', borderRadius: '2px', padding: '0.55rem 1.1rem', marginTop: '0.25rem' }}
          >
            Watch the Welcome Episode →
          </Link>
        </motion.div>
      </PageSection>

      {/* ── Article Collection ────────────────────────────────────────────── */}
      <div id="article-collection" ref={collectionRef} style={{ scrollMarginTop: '90px' }}>
        <PageSection eyebrow="Articles" heading="Written Learning Companions">
          <p className="font-body" style={{ color: 'rgba(245,239,224,0.6)', fontSize: '0.93rem', lineHeight: 1.8, fontWeight: 300, marginBottom: '2rem' }}>
            Each article is a written companion to a published episode. Articles expand on the episode's ideas through analysis, definitions, examples, reflection questions, and further reading.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {ARTICLES.map((article, i) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.06 }}
              >
                <ArticleCard article={article} />
              </motion.div>
            ))}
          </div>
        </PageSection>
      </div>

      {/* ── Learning progression note ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ marginBottom: '2rem', padding: '2rem 2.5rem', border: '1px solid rgba(212,161,42,0.15)', borderRadius: '4px', textAlign: 'center' }}
      >
        <p className="font-heading" style={{ color: 'rgba(245,239,224,0.55)', fontSize: 'clamp(0.95rem, 1.8vw, 1.2rem)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.7, margin: '0 0 1.5rem' }}>
          Watch the episode. Read more deeply. Reflect and apply.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          <Link
            to="/videos"
            className="font-body"
            style={{ display: 'inline-flex', alignItems: 'center', color: '#D4A12A', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, border: '1px solid rgba(212,161,42,0.4)', borderRadius: '2px', padding: '0.65rem 1.3rem' }}
          >
            Watch the Episodes →
          </Link>
          <Link
            to="/resources"
            className="font-body"
            style={{ display: 'inline-flex', alignItems: 'center', color: 'rgba(245,239,224,0.55)', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, border: '1px solid rgba(245,239,224,0.18)', borderRadius: '2px', padding: '0.65rem 1.3rem' }}
          >
            Explore Resources →
          </Link>
        </div>
      </motion.div>
    </PageLayout>
  );
}