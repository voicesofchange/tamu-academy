import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, Users, Briefcase } from 'lucide-react';

const eyebrowStyle = { display: 'block', color: 'var(--tamu-gold)', fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.75rem' };
const headingStyle = { color: 'var(--tamu-ink)', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontWeight: 400, lineHeight: 1.3, margin: '0 0 0.85rem' };
const bodyStyle = { color: 'rgba(243,234,216,0.78)', fontSize: '0.95rem', lineHeight: 1.85, fontWeight: 300, margin: '0 0 1.5rem', maxWidth: '44rem' };
const anchorStyle = { display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--tamu-gold)', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500, textDecoration: 'none', border: '1px solid rgba(232,184,91,0.35)', borderRadius: '2px', padding: '0.5rem 0.85rem' };

const THEMES = [
  { key: 'learning', href: '#dashboard-learning', Icon: Compass },
  { key: 'community', href: '#dashboard-community', Icon: Users },
  { key: 'impact', href: '#dashboard-impact', Icon: Briefcase },
];

/**
 * DashboardFocusPanel — the personalized header of the dashboard. It names the
 * learner group the page is currently tailored for, states what that view
 * leads with, and links straight to the three emphasis areas below.
 */
export default function DashboardFocusPanel({ group, isPreviewing, labels }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{ padding: '2rem 2.25rem', border: '1px solid rgba(232,184,91,0.35)', borderRadius: '4px', backgroundColor: 'rgba(232,184,91,0.045)' }}
    >
      <span className="font-body" style={eyebrowStyle}>
        {isPreviewing ? `${labels.previewing} ${group.label}` : `${labels.tailoredFor} ${group.label}`}
      </span>
      <h2 className="font-heading" style={headingStyle}>{group.headline}</h2>
      <p className="font-body" style={bodyStyle}>{group.summary}</p>

      <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
        {THEMES.map(({ key, href, Icon }) => (
          <a key={key} href={href} className="font-body" style={anchorStyle}>
            <Icon size={14} aria-hidden="true" />
            {labels[key]}
            <ArrowRight size={13} aria-hidden="true" />
          </a>
        ))}
        {group.id === 'unset' && (
          <Link to="/profile" className="font-body" style={{ ...anchorStyle, backgroundColor: 'var(--tamu-gold)', color: '#24150f', borderColor: 'var(--tamu-gold)', fontWeight: 600 }}>
            {labels.setGroup}
            <ArrowRight size={13} aria-hidden="true" />
          </Link>
        )}
      </div>
    </motion.div>
  );
}