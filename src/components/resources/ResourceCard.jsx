import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

/**
 * ResourceCard — renders a single curated external learning resource.
 *
 * Accessibility:
 *   - External link uses target="_blank" and rel="noopener noreferrer"
 *   - Link text is descriptive ("Explore the resource: [Title]")
 *   - Visually hidden text announces the link opens in a new tab
 *   - External link icon provides a visual indicator
 *   - Card supports keyboard navigation (link is focusable)
 *   - Visible focus ring on the link
 */
export default function ResourceCard({ resource, index = 0 }) {
  const { title, organization, description, type, access, url } = resource;

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.45, ease: 'easeOut', delay: index * 0.04 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '1.5rem 1.75rem',
        border: '1px solid rgba(212,161,42,0.14)',
        borderRadius: '4px',
        backgroundColor: 'rgba(245,239,224,0.02)',
      }}
      className="tamu-card"
    >
      {/* Title */}
      <h4
        className="font-heading"
        style={{
          color: '#F5EFE0',
          fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
          fontWeight: 400,
          lineHeight: 1.3,
          margin: '0 0 0.4rem',
        }}
      >
        {title}
      </h4>

      {/* Organization */}
      <span
        className="font-body"
        style={{
          color: '#D4A12A',
          fontSize: '0.62rem',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          fontWeight: 500,
          display: 'block',
          marginBottom: '0.75rem',
        }}
      >
        {organization}
      </span>

      {/* Description */}
      <p
        className="font-body"
        style={{
          color: 'rgba(245,239,224,0.68)',
          fontSize: '0.85rem',
          lineHeight: 1.7,
          fontWeight: 300,
          margin: '0 0 1rem',
          flex: 1,
        }}
      >
        {description}
      </p>

      {/* Meta: type + access */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem 1.25rem',
          marginBottom: '1.25rem',
        }}
      >
        <span
          className="font-body"
          style={{
            color: 'rgba(245,239,224,0.5)',
            fontSize: '0.65rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}
        >
          {type}
        </span>
        <span
          className="font-body"
          style={{
            color: 'rgba(245,239,224,0.5)',
            fontSize: '0.65rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}
        >
          {access}
        </span>
      </div>

      {/* External link */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Explore the resource: ${title} by ${organization} (opens in a new tab)`}
        className="font-body tamu-resource-link"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: '#D4A12A',
          fontSize: '0.72rem',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          fontWeight: 500,
          padding: '0.4rem 0',
          borderBottom: '1px solid rgba(212,161,42,0.3)',
          width: 'fit-content',
        }}
      >
        Explore the resource
        <ExternalLink size={13} strokeWidth={1.5} aria-hidden="true" />
        <span style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>
          (opens in a new tab)
        </span>
      </a>

      <style>{`
        .tamu-resource-link:focus-visible {
          outline: 2px solid #D4A12A;
          outline-offset: 4px;
          border-radius: 2px;
        }
        .tamu-resource-link:hover {
          color: #E8951C;
          border-bottom-color: #E8951C;
        }
      `}</style>
    </motion.article>
  );
}