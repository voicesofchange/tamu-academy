import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const eyebrowStyle = { display: 'block', color: 'var(--tamu-gold)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, marginBottom: '0.75rem' };
const headingStyle = { color: 'var(--tamu-ink)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 400, lineHeight: 1.25, margin: '0 0 1.5rem' };
const linkStyle = { color: 'var(--tamu-gold)', fontSize: '0.74rem', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 500, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' };

/**
 * DashboardRecommendations — the recommendations panel. It carries the
 * learner's next learning step, the group's recommended courses, the
 * low-bandwidth option for this device, and quick links to the community and
 * impact pathways further down the dashboard.
 */
export default function DashboardRecommendations({ id, eyebrow, heading, resume, items, quickLinks, quickLinksLabel, labels, isDataSaver, onToggleDataSaver }) {
  const dataSaverRow = {
    title: labels.dataSaverTitle,
    body: labels.dataSaverBody,
    action: 'toggle-data-saver',
    cta: isDataSaver ? labels.dataSaverOff : labels.dataSaverOn,
  };
  const rows = [...(resume ? [{ ...resume, cta: labels.resume }] : []), ...(items || []), dataSaverRow];

  return (
    <section id={id} style={{ padding: '0 clamp(1.5rem, 6vw, 4rem)', marginBottom: '4rem', scrollMarginTop: '90px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <span className="font-body" style={eyebrowStyle}>{eyebrow}</span>
        <h2 className="font-heading" style={headingStyle}>{heading}</h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ border: '1px solid rgba(232,184,91,0.28)', borderRadius: '4px', backgroundColor: 'rgba(243,234,216,0.015)' }}
        >
          {rows.map((row, index) => (
            <div
              key={`${row.title}-${index}`}
              style={{
                display: 'flex', gap: '1.25rem', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap',
                padding: '1.25rem 1.75rem',
                borderTop: index === 0 ? 'none' : '1px solid rgba(232,184,91,0.14)',
              }}
            >
              <div style={{ flex: '1 1 20rem' }}>
                <h3 className="font-heading" style={{ color: 'var(--tamu-ink)', fontSize: '1.05rem', fontWeight: 400, lineHeight: 1.35, margin: '0 0 0.35rem' }}>
                  {row.title}
                </h3>
                <p className="font-body" style={{ color: 'rgba(243,234,216,0.72)', fontSize: '0.88rem', lineHeight: 1.75, fontWeight: 300, margin: 0 }}>
                  {row.body}
                </p>
              </div>
              {row.action === 'toggle-data-saver' ? (
                <button type="button" onClick={onToggleDataSaver} className="font-body" style={{ ...linkStyle, background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
                  {row.cta}
                  <ArrowRight size={13} aria-hidden="true" />
                </button>
              ) : (
                <Link to={row.to} className="font-body" style={linkStyle}>
                  {row.cta}
                  <ArrowRight size={13} aria-hidden="true" />
                </Link>
              )}
            </div>
          ))}
        </motion.div>

        {quickLinks?.length > 0 && (
          <div style={{ marginTop: '1.1rem', display: 'flex', gap: '0.5rem 1.25rem', flexWrap: 'wrap', alignItems: 'baseline' }}>
            <span className="font-body" style={{ color: 'rgba(243,234,216,0.55)', fontSize: '0.78rem', fontWeight: 300 }}>{quickLinksLabel}</span>
            {quickLinks.map((link) => (
              <Link key={link.to + link.title} to={link.to} className="font-body" style={{ color: 'var(--tamu-gold)', fontSize: '0.78rem', fontWeight: 400, textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                {link.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}