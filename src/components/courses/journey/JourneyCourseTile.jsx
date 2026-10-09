import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Heart,
  TrendingUp,
  Cpu,
  Landmark,
  Scroll,
  Store,
  Layers,
  Clock,
  BarChart,
  GraduationCap,
  ArrowRight,
} from 'lucide-react';

const ICONS = { Heart, TrendingUp, Cpu, Landmark, Scroll, Store, Layers, Clock, BarChart, GraduationCap };

const primaryAction = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  background: '#c18a36',
  color: '#fffaf1',
  fontSize: '11px',
  letterSpacing: '0.13em',
  textTransform: 'uppercase',
  fontWeight: 600,
  textDecoration: 'none',
  borderRadius: '3px',
  padding: '0.6rem 1.1rem',
};

const secondaryAction = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  color: '#9b5d1d',
  fontSize: '11px',
  letterSpacing: '0.13em',
  textTransform: 'uppercase',
  fontWeight: 500,
  textDecoration: 'none',
  border: '1px solid #d7b57c',
  borderRadius: '3px',
  padding: '0.6rem 1.1rem',
};

/**
 * JourneyCourseTile — the course card from the Courses page, reused on the
 * learner surfaces: the dark visual header with its icon, number and status
 * pill, then the parchment body with the title, description, metadata strip
 * and actions. The learner variant adds a progress measure in the same
 * vocabulary.
 */
export default function JourneyCourseTile({
  number,
  title,
  description,
  status,
  visual,
  progress,
  actions = [],
  index = 0,
}) {
  const HeroIcon = ICONS[visual?.icon] || GraduationCap;
  const accent = visual?.accent || 'rgba(217,155,55,0.22)';
  const pct = progress && progress.total ? Math.round((progress.completed / progress.total) * 100) : 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.1 }}
      className="tamu-course-card"
      style={{
        position: 'relative',
        background: '#fffaf1',
        border: '1px solid #dac7ab',
        borderRadius: '6px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '300px',
      }}
    >
      <div
        style={{
          position: 'relative',
          height: '118px',
          background: '#3a261c',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden="true"
          data-tamu-decorative="true"
          style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 30% 38%, ${accent} 0%, transparent 62%)` }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'repeating-linear-gradient(135deg, transparent 0, transparent 24px, rgba(232,184,91,0.04) 24px, rgba(232,184,91,0.04) 25px)',
          }}
        />
        <HeroIcon size={42} strokeWidth={1.2} style={{ color: '#e8b85b', position: 'relative', zIndex: 1 }} aria-hidden="true" />
        {number && (
          <span
            className="font-body"
            style={{
              position: 'absolute',
              top: '14px',
              left: '16px',
              color: 'rgba(232,184,91,0.85)',
              fontSize: '12px',
              letterSpacing: '0.15em',
              fontWeight: 600,
            }}
          >
            {number}
          </span>
        )}
        {status && (
          <span
            className="font-body"
            style={{
              position: 'absolute',
              top: '12px',
              right: '14px',
              color: '#f8f0df',
              border: '1px solid rgba(232,184,91,0.45)',
              borderRadius: '20px',
              padding: '5px 11px',
              fontSize: '9.5px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              background: 'rgba(36,21,15,0.55)',
            }}
          >
            {status}
          </span>
        )}
      </div>

      <div style={{ padding: '22px 24px 24px', flex: 1, display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
        <h3 className="font-heading" style={{ fontWeight: 400, fontSize: '23px', lineHeight: 1.18, margin: '0 0 11px', color: '#39251b' }}>
          {title}
        </h3>
        {description && (
          <p className="font-body" style={{ fontSize: '14px', lineHeight: 1.7, color: '#796552', margin: '0 0 18px', flex: 1 }}>
            {description}
          </p>
        )}

        {progress && progress.total > 0 && (
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
              <span
                className="font-body"
                style={{ color: '#b97827', fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600 }}
              >
                {progress.label}
              </span>
              <span className="font-body" style={{ color: '#39251b', fontSize: '0.85rem', fontWeight: 500 }}>
                {progress.completed} / {progress.total}
              </span>
            </div>
            <div
              role="progressbar"
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${title} progress`}
              style={{ width: '100%', height: '5px', background: '#e8d9bf', borderRadius: '3px', overflow: 'hidden' }}
            >
              <div style={{ width: `${pct}%`, height: '100%', background: '#c18a36', borderRadius: '3px', transition: 'width 0.6s ease' }} />
            </div>
          </div>
        )}

        {visual?.meta && visual.meta.length > 0 && (
          <div
            className="font-body"
            style={{
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap',
              paddingTop: '14px',
              borderTop: '1px solid #e8d9bf',
              marginBottom: '16px',
            }}
          >
            {visual.meta.map((item, i) => {
              const MetaIcon = ICONS[item.icon] || Layers;
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MetaIcon size={14} strokeWidth={1.6} style={{ color: '#b97827' }} aria-hidden="true" />
                  <span style={{ fontSize: '12px', color: '#806b58' }}>{item.label}</span>
                </div>
              );
            })}
          </div>
        )}

        {actions.length > 0 && (
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: 'auto' }}>
            {actions.map((action) => (
              <Link key={action.label} to={action.to} className="font-body" style={action.primary ? primaryAction : secondaryAction}>
                {action.label}
                <ArrowRight size={13} strokeWidth={2} aria-hidden="true" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}