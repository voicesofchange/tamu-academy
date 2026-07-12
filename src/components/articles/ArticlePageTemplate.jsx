import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import PageLayout from '@/components/page/PageLayout';
import PageMeta from '@/components/seo/PageMeta';

const BASE_URL = 'https://tamuacademy.org';

function ArticleStructuredData({ article }) {
  useEffect(() => {
    if (article.status !== 'published' || !article.publicationDateISO) return;
    const ld = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.seoDescription,
      author: { '@type': 'Person', name: article.author },
      publisher: { '@type': 'Organization', name: article.publisher },
      datePublished: article.publicationDateISO,
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}/articles/${article.slug}` },
      articleSection: article.category,
    };
    const scriptId = `article-ld-${article.slug}`;
    if (!document.getElementById(scriptId)) {
      const el = document.createElement('script');
      el.type = 'application/ld+json';
      el.id = scriptId;
      el.textContent = JSON.stringify(ld);
      document.head.appendChild(el);
    }
    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [article]);
  return null;
}

const bodyStyle = { color: 'rgba(245,239,224,0.72)', fontSize: '0.97rem', lineHeight: 1.9, fontWeight: 300, margin: '0 0 1.1rem' };
const dimStyle  = { color: 'rgba(245,239,224,0.4)', fontSize: '0.82rem', lineHeight: 1.75, fontWeight: 300 };

/** Render a closing note that may contain a [text](/path) link */
function ClosingNote({ text }) {
  const parts = text.split(/(\[.*?\]\(.*?\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const match = part.match(/\[(.*?)\]\((.*?)\)/);
        if (match) {
          const [, label, href] = match;
          const isInternal = href.startsWith('/');
          return isInternal
            ? <Link key={i} to={href} style={{ color: 'rgba(212,161,42,0.75)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>{label}</Link>
            : <a key={i} href={href} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(212,161,42,0.75)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>{label}</a>;
        }
        // Split on \n\n for paragraph breaks within the closing note
        return part.split('\n\n').map((chunk, j) => (
          <React.Fragment key={`${i}-${j}`}>
            {j > 0 && <br />}
            {chunk}
          </React.Fragment>
        ));
      })}
    </>
  );
}

export default function ArticlePageTemplate({ article }) {
  const lastSection = article.sections?.[article.sections.length - 1];

  return (
    <PageLayout>
      <PageMeta
        title={article.seoTitle}
        description={article.seoDescription}
        path={`/articles/${article.slug}`}
        type={article.status === 'published' ? 'article' : 'website'}
        noindex={article.status !== 'published'}
      />
      <ArticleStructuredData article={article} />

      {/* ── Article header ──────────────────────────────────────────────── */}
      <header style={{ marginBottom: '3rem' }}>
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="font-body"
          style={{ color: '#D4A12A', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '1rem' }}
        >
          {article.category}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.08 }}
          className="font-heading"
          style={{ color: '#F5EFE0', fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 400, lineHeight: 1.2, margin: '0 0 1rem' }}
        >
          {article.title}
        </motion.h1>

        {article.subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
            className="font-heading"
            style={{ color: 'rgba(212,161,42,0.85)', fontSize: 'clamp(1rem, 2vw, 1.3rem)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.6, margin: '0 0 1.25rem' }}
          >
            {article.subtitle}
          </motion.p>
        )}

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.4 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.25 }}
          aria-hidden="true"
          style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, transparent, #D4A12A 35%, #E2B652 50%, #D4A12A 65%, transparent)', margin: '1.5rem 0', transformOrigin: 'left' }}
        />

        {/* Meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-body"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem 1.25rem', color: 'rgba(245,239,224,0.45)', fontSize: '0.75rem', letterSpacing: '0.06em' }}
        >
          {article.author && <span>{article.author}</span>}
          {article.publisher && article.publisher !== article.author && <span>{article.publisher}</span>}
          {article.publicationDate && <span>Published {article.publicationDate}</span>}
          {article.updatedDate && <span>Updated {article.updatedDate}</span>}
          {article.readingTime && <span>{article.readingTime} min read</span>}
          {article.status === 'in-development' && (
            <span style={{ color: 'rgba(212,161,42,0.5)', border: '1px solid rgba(212,161,42,0.2)', borderRadius: '999px', padding: '0 0.5rem', fontSize: '0.68rem', letterSpacing: '0.12em' }}>
              In Development
            </span>
          )}
        </motion.div>
      </header>

      {/* ── Safety / introductory note ──────────────────────────────────── */}
      {article.safetyNote && (
        <motion.aside
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.35 }}
          aria-label="Introductory note"
          className="font-body"
          style={{ marginBottom: '2.5rem', padding: '1.25rem 1.5rem', border: '1px solid rgba(212,161,42,0.25)', borderRadius: '4px', backgroundColor: 'rgba(212,161,42,0.03)', color: 'rgba(245,239,224,0.75)', fontSize: '0.93rem', lineHeight: 1.8, fontWeight: 300 }}
        >
          <strong style={{ fontWeight: 500, color: '#F5EFE0' }}>A note before we begin: </strong>
          {article.safetyNote}
        </motion.aside>
      )}

      {/* ── Introductory summary ────────────────────────────────────────── */}
      {article.summary && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="font-body"
          style={{ color: 'rgba(245,239,224,0.72)', fontSize: '1.02rem', lineHeight: 1.85, fontWeight: 300, marginBottom: '3rem', borderLeft: '2px solid rgba(212,161,42,0.3)', paddingLeft: '1.25rem' }}
        >
          {article.summary}
        </motion.p>
      )}

      {/* ── Related episode embed ────────────────────────────────────────── */}
      {article.videoId && (
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          aria-label="Watch the related episode"
          style={{ marginBottom: '3.5rem' }}
        >
          <p className="font-body" style={{ color: '#D4A12A', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, marginBottom: '0.85rem' }}>
            Watch the Related Episode
          </p>
          <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', backgroundColor: '#12100C', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(212,161,42,0.18)' }}>
            <iframe
              src={`https://www.youtube.com/embed/${article.videoId}`}
              title={`Tamu Academy — ${article.videoTitle}`}
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', display: 'block' }}
            />
          </div>
          <a
            href={`https://www.youtube.com/watch?v=${article.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'rgba(245,239,224,0.4)', fontSize: '0.72rem', letterSpacing: '0.1em', textDecoration: 'none', marginTop: '0.6rem', transition: 'color 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#D4A12A'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(245,239,224,0.4)'}
          >
            <ExternalLink size={12} aria-hidden="true" />
            Watch on YouTube
          </a>
        </motion.section>
      )}

      {/* ── Article body sections ────────────────────────────────────────── */}
      {article.sections?.length > 0 && (
        <article style={{ marginBottom: '3rem' }}>
          {article.sections.map((section, i) => {
            const isLast = i === article.sections.length - 1;
            return (
              <motion.section
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                style={{ marginBottom: isLast ? '1.5rem' : '3rem' }}
              >
                {section.heading && (
                  <h2 className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(1.1rem, 2.2vw, 1.55rem)', fontWeight: 400, lineHeight: 1.3, margin: '0 0 1.25rem' }}>
                    {section.heading}
                  </h2>
                )}

                {/* Multi-paragraph body */}
                {Array.isArray(section.paragraphs)
                  ? section.paragraphs.map((para, j) => (
                    <p key={j} className="font-body" style={bodyStyle}>{para}</p>
                  ))
                  : section.body && (
                    <p className="font-body" style={bodyStyle}>{section.body}</p>
                  )
                }

                {/* Pull quote — after body paragraphs */}
                {section.pullQuote && (
                  <blockquote style={{ margin: '1.75rem 0 0', borderLeft: '3px solid #D4A12A', paddingLeft: '1.25rem' }}>
                    <p className="font-heading" style={{ color: 'rgba(212,161,42,0.9)', fontSize: 'clamp(1rem, 2vw, 1.3rem)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.7, margin: 0 }}>
                      "{section.pullQuote}"
                    </p>
                  </blockquote>
                )}

                {/* Closing note on last section */}
                {isLast && section.closingNote && (
                  <p className="font-body" style={{ ...dimStyle, marginTop: '2rem', fontStyle: 'italic', borderTop: '1px solid rgba(245,239,224,0.08)', paddingTop: '1.5rem' }}>
                    <ClosingNote text={section.closingNote} />
                  </p>
                )}
              </motion.section>
            );
          })}
        </article>
      )}

      {/* ── Key takeaways ────────────────────────────────────────────────── */}
      {article.keyTakeaways?.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          aria-label="Key takeaways"
          style={{ marginBottom: '3rem', padding: '1.75rem 2rem', border: '1px solid rgba(212,161,42,0.22)', borderRadius: '4px', backgroundColor: 'rgba(212,161,42,0.02)' }}
        >
          <h2 className="font-body" style={{ color: '#D4A12A', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, margin: '0 0 1rem' }}>
            Key Takeaways
          </h2>
          <ol style={{ margin: 0, paddingLeft: '1.4rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {article.keyTakeaways.map((item, i) => (
              <li key={i} className="font-body" style={{ color: 'rgba(245,239,224,0.72)', fontSize: '0.95rem', lineHeight: 1.75, fontWeight: 300 }}>
                {item}
              </li>
            ))}
          </ol>
        </motion.section>
      )}

      {/* ── Reflection questions ─────────────────────────────────────────── */}
      {article.reflectionQuestions?.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          aria-label="Reflect and apply"
          style={{ marginBottom: '3rem' }}
        >
          <h2 className="font-body" style={{ color: '#D4A12A', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, margin: '0 0 1rem' }}>
            Reflect and Apply
          </h2>
          <ol style={{ margin: 0, paddingLeft: '1.4rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {article.reflectionQuestions.map((q, i) => (
              <li key={i} className="font-body" style={{ color: 'rgba(245,239,224,0.65)', fontSize: '0.93rem', lineHeight: 1.75, fontWeight: 300 }}>
                {q}
              </li>
            ))}
          </ol>
        </motion.section>
      )}

      {/* ── Related resources ────────────────────────────────────────────── */}
      {article.relatedResources?.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          aria-label="Related resources"
          style={{ marginBottom: '3rem' }}
        >
          <h2 className="font-body" style={{ color: '#D4A12A', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, margin: '0 0 1rem' }}>
            Related Resources
          </h2>
          <ul style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {article.relatedResources.map((r, i) => (
              <li key={i} className="font-body" style={{ color: 'rgba(245,239,224,0.6)', fontSize: '0.9rem', lineHeight: 1.7, fontWeight: 300 }}>
                {r.url ? (
                  <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(212,161,42,0.8)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                    {r.title} <ExternalLink size={11} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '3px' }} aria-label="(external link)" />
                  </a>
                ) : r.title}
              </li>
            ))}
          </ul>
        </motion.section>
      )}

      {/* ── Sources ──────────────────────────────────────────────────────── */}
      {article.sources?.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          aria-label="Sources"
          style={{ marginBottom: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(245,239,224,0.08)' }}
        >
          <h2 className="font-body" style={{ color: 'rgba(245,239,224,0.4)', fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, margin: '0 0 0.85rem' }}>
            Sources
          </h2>
          <ol style={{ margin: 0, paddingLeft: '1.4rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {article.sources.map((s, i) => (
              <li key={i} className="font-body" style={{ color: 'rgba(245,239,224,0.38)', fontSize: '0.8rem', lineHeight: 1.65, fontWeight: 300 }}>
                {s.url ? (
                  <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(212,161,42,0.55)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                    {s.citation} <ExternalLink size={10} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '2px' }} aria-label="(external link)" />
                  </a>
                ) : s.citation}
              </li>
            ))}
          </ol>
        </motion.section>
      )}

      {/* ── Support resources ────────────────────────────────────────────── */}
      {article.supportResources && (
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          aria-label="If you are struggling"
          style={{ marginBottom: '3rem', padding: '1.75rem 2rem', border: '1px solid rgba(212,161,42,0.18)', borderRadius: '4px', backgroundColor: 'rgba(245,239,224,0.015)' }}
        >
          <h2 className="font-body" style={{ color: '#D4A12A', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, margin: '0 0 0.85rem' }}>
            If You Are Struggling
          </h2>
          <p className="font-body" style={{ color: 'rgba(245,239,224,0.68)', fontSize: '0.93rem', lineHeight: 1.8, fontWeight: 300, margin: '0 0 1.25rem' }}>
            {article.supportResources.intro}
          </p>
          <ul style={{ margin: '0 0 1.25rem', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {article.supportResources.resources.map((r, i) => (
              <li key={i} className="font-body" style={{ borderLeft: '2px solid rgba(212,161,42,0.25)', paddingLeft: '1rem' }}>
                <span style={{ color: 'rgba(245,239,224,0.45)', fontSize: '0.58rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.2rem' }}>{r.region}</span>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'rgba(212,161,42,0.85)', fontSize: '0.93rem', fontWeight: 500, textDecoration: 'underline', textUnderlineOffset: '3px', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                >
                  {r.label}
                  <ExternalLink size={11} aria-hidden="true" />
                </a>
                <p style={{ color: 'rgba(245,239,224,0.6)', fontSize: '0.87rem', lineHeight: 1.7, fontWeight: 300, margin: '0.2rem 0 0' }}>
                  {r.description}
                  {r.phone && <> · <span style={{ color: 'rgba(212,161,42,0.7)' }}>{r.phone}</span></>}
                </p>
              </li>
            ))}
          </ul>
          <p className="font-body" style={{ color: 'rgba(245,239,224,0.5)', fontSize: '0.85rem', lineHeight: 1.7, fontWeight: 300, margin: 0, fontStyle: 'italic' }}>
            {article.supportResources.emergencyNote}
          </p>
        </motion.section>
      )}

      {/* ── Editorial + educational notes ────────────────────────────────── */}
      {(article.editorialNote || article.educationalNote) && (
        <motion.aside
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          aria-label="Editorial and educational notes"
          style={{ marginBottom: '3rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(245,239,224,0.08)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
        >
          {article.editorialNote && (
            <p className="font-body" style={dimStyle}>
              <strong style={{ fontWeight: 500, color: 'rgba(245,239,224,0.5)' }}>Editorial note: </strong>
              {article.editorialNote}
            </p>
          )}
          {article.educationalNote && (
            <p className="font-body" style={dimStyle}>
              {article.educationalNote}
            </p>
          )}
        </motion.aside>
      )}

      {/* ── Prev / Next navigation ───────────────────────────────────────── */}
      <nav aria-label="Article navigation" style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', marginBottom: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(212,161,42,0.12)', flexWrap: 'wrap' }}>
        {article.previousArticle ? (
          <Link
            to={`/articles/${article.previousArticle}`}
            className="font-body"
            style={{ color: 'rgba(212,161,42,0.7)', fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#D4A12A'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(212,161,42,0.7)'}
          >
            ← Previous Article
          </Link>
        ) : <span />}
        {article.nextArticle ? (
          <Link
            to={`/articles/${article.nextArticle}`}
            className="font-body"
            style={{ color: 'rgba(212,161,42,0.7)', fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#D4A12A'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(212,161,42,0.7)'}
          >
            Next Article →
          </Link>
        ) : <span />}
      </nav>

      {/* ── Back links ───────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <Link to="/articles" className="font-body" style={{ color: 'rgba(245,239,224,0.5)', fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#D4A12A'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(245,239,224,0.5)'}>
          ← All Articles
        </Link>
        <Link to="/videos" className="font-body" style={{ color: 'rgba(245,239,224,0.5)', fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#D4A12A'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(245,239,224,0.5)'}>
          Watch Episodes →
        </Link>
        <Link to="/resources" className="font-body" style={{ color: 'rgba(245,239,224,0.5)', fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#D4A12A'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(245,239,224,0.5)'}>
          Explore Resources →
        </Link>
      </div>
    </PageLayout>
  );
}