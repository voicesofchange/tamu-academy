import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Heart,
  TrendingUp,
  Cpu,
  Landmark,
  Scroll,
  Layers,
  Clock,
  BarChart,
  GraduationCap,
  ArrowRight,
} from 'lucide-react';

const ICON_MAP = {
  Heart,
  TrendingUp,
  Cpu,
  Landmark,
  Scroll,
  Layers,
  Clock,
  BarChart,
  GraduationCap,
};

export default function CoursePreviewCard({ number, course, status, exploreLabel, visual, index = 0 }) {
  const coursePath = course.slug ? `/courses/${course.slug}` : null;
  const HeroIcon = ICON_MAP[visual?.icon] || GraduationCap;
  const accent = visual?.accent || 'rgba(217,155,55,0.22)';

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
        minHeight: '340px',
      }}
    >
      {/* Visual header */}
      <div
        style={{
          position: 'relative',
          height: '132px',
          background: '#3a261c',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at 30% 38%, ${accent} 0%, transparent 62%)`,
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'repeating-linear-gradient(135deg, transparent 0, transparent 24px, rgba(232,184,91,0.04) 24px, rgba(232,184,91,0.04) 25px)',
          }}
        />
        <HeroIcon
          size={46}
          strokeWidth={1.2}
          style={{ color: '#e8b85b', position: 'relative', zIndex: 1 }}
        />
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
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
          }}
        >
          {status}
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: '22px 24px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3
          className="font-heading"
          style={{
            fontWeight: 400,
            fontSize: '23px',
            lineHeight: 1.18,
            margin: '0 0 11px',
            color: '#39251b',
          }}
        >
          {course.title}
        </h3>
        <p
          className="font-body"
          style={{
            fontSize: '14px',
            lineHeight: 1.7,
            color: '#796552',
            margin: '0 0 18px',
            flex: 1,
          }}
        >
          {course.description}
        </p>

        {/* Metadata strip */}
        {visual?.meta && visual.meta.length > 0 && (
          <div
            className="font-body"
            style={{
              display: 'flex',
              gap: '18px',
              flexWrap: 'wrap',
              paddingTop: '15px',
              borderTop: '1px solid #e8d9bf',
              marginBottom: '16px',
            }}
          >
            {visual.meta.map((item, i) => {
              const MetaIcon = ICON_MAP[item.icon] || Layers;
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MetaIcon size={14} strokeWidth={1.6} style={{ color: '#b97827' }} />
                  <span style={{ fontSize: '12px', color: '#806b58' }}>{item.label}</span>
                </div>
              );
            })}
          </div>
        )}

        {coursePath ? (
          <Link
            to={coursePath}
            className="font-body"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#9b5d1d',
              fontSize: '11px',
              letterSpacing: '0.13em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              fontWeight: 500,
              borderBottom: '1px solid #c18a36',
              paddingBottom: '2px',
              transition: 'color 0.25s ease',
              alignSelf: 'flex-start',
            }}
          >
            {exploreLabel}
            <ArrowRight size={13} strokeWidth={2} />
          </Link>
        ) : (
          <span
            className="font-body"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#a89074',
              fontSize: '11px',
              letterSpacing: '0.13em',
              textTransform: 'uppercase',
              fontWeight: 500,
            }}
          >
            <Clock size={13} strokeWidth={1.6} />
            Coming Soon
          </span>
        )}
      </div>
    </motion.article>
  );
}