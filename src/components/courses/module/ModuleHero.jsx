import React from 'react';
import { Clock, Layers, BarChart, BookOpen, GraduationCap, Scroll, Store, TrendingUp, Heart } from 'lucide-react';
import StatusBadge from '@/components/page/StatusBadge';

/**
 * ModuleHero — the Courses page's opening treatment, adapted to a single
 * module. It opens every lesson with the same identity the catalogue uses: a
 * deep espresso panel over a muted photograph, the gold eyebrow, the serif
 * title, the gold accent rule, the module's supporting line, a metadata strip,
 * and the numbered journey motif marking the module's place in the course.
 */
const ICONS = { Clock, Layers, BarChart, BookOpen, GraduationCap, Scroll, Store, TrendingUp, Heart };

const COURSE_IMAGES = {
  'mental-health-community-and-culture':
    'https://media.base44.com/images/public/6a3c91b4c28c3d06e2889307/43088212a_generated_88d7dc5c.jpg',
  'understanding-african-economies-and-the-global-system':
    'https://media.base44.com/images/public/6a3c91b4c28c3d06e2889307/c5d7236bd_generated_12fdce95.jpg',
  'sauti-za-soko': 'https://media.base44.com/images/public/6a3c91b4c28c3d06e2889307/992b69285_generated_83ba5579.jpg',
  'waiyaki-wa-hinga': 'https://media.base44.com/images/public/6a3c91b4c28c3d06e2889307/43088212a_generated_88d7dc5c.jpg',
};

const DEFAULT_IMAGE = 'https://media.base44.com/images/public/6a3c91b4c28c3d06e2889307/43088212a_generated_88d7dc5c.jpg';

export default function ModuleHero({ courseSlug, eyebrow, title, subheading, status, metaItems = [], progress }) {
  const image = COURSE_IMAGES[courseSlug] || DEFAULT_IMAGE;
  const pct = progress && progress.total ? Math.round((progress.current / progress.total) * 100) : 0;

  return (
    <section
      style={{
        position: 'relative',
        marginBottom: '3rem',
        borderRadius: '6px',
        overflow: 'hidden',
        border: '1px solid rgba(232,184,91,0.22)',
      }}
    >
      <div
        aria-hidden="true"
        data-tamu-decorative="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(180deg, rgba(36,21,15,0.78) 0%, rgba(36,21,15,0.95) 100%), url(${image}) center/cover`,
          opacity: 0.95,
        }}
      />
      <div style={{ position: 'relative', padding: 'clamp(1.6rem, 4vw, 2.5rem)' }}>
        {status && (
          <div style={{ marginBottom: '1.1rem' }}>
            <StatusBadge label={status} />
          </div>
        )}
        {eyebrow && (
          <span
            className="font-body"
            style={{
              color: '#e8b85b',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '0.6rem',
            }}
          >
            {eyebrow}
          </span>
        )}
        <h1
          className="font-heading"
          style={{
            color: '#f8f0df',
            fontSize: 'clamp(1.8rem,4vw,2.6rem)',
            fontWeight: 400,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            margin: '0 0 1rem',
          }}
        >
          {title}
        </h1>
        <div
          aria-hidden="true"
          data-tamu-decorative="true"
          style={{ width: '56px', height: '2px', background: '#d99b37', opacity: 0.75, marginBottom: '1.25rem' }}
        />
        {subheading && (
          <p
            className="font-body"
            style={{
              color: '#ddcfbb',
              fontSize: 'clamp(0.98rem,1.5vw,1.05rem)',
              lineHeight: 1.75,
              maxWidth: '640px',
              margin: '0 0 1.4rem',
            }}
          >
            {subheading}
          </p>
        )}
        {metaItems.length > 0 && (
          <div
            className="font-body"
            style={{
              display: 'flex',
              gap: '18px',
              flexWrap: 'wrap',
              paddingTop: '1rem',
              borderTop: '1px solid rgba(232,184,91,0.18)',
            }}
          >
            {metaItems.map((item, i) => {
              const MetaIcon = ICONS[item.icon] || Layers;
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MetaIcon size={14} strokeWidth={1.6} style={{ color: '#e8b85b' }} aria-hidden="true" />
                  <span style={{ fontSize: '12px', color: '#c6b59e' }}>{item.label}</span>
                </div>
              );
            })}
          </div>
        )}
        {progress && progress.total > 1 && (
          <div
            className="font-body"
            style={{ display: 'flex', alignItems: 'center', gap: '13px', color: '#c6b59e', fontSize: '12px', marginTop: '1.4rem' }}
          >
            <span>{String(progress.current).padStart(2, '0')}</span>
            <div
              aria-hidden="true"
              style={{
                height: '2px',
                width: 'min(210px, 38vw)',
                background: `linear-gradient(90deg, #d99b37 0 ${pct}%, rgba(243,234,216,0.2) ${pct}%)`,
                boxShadow: '0 0 10px rgba(217,155,55,0.28)',
              }}
            />
            <span>
              Module {progress.current} of {progress.total}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}