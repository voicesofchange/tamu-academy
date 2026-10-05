import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Clock,
  Coins,
  Compass,
  Cpu,
  DoorOpen,
  Eye,
  Heart,
  ListChecks,
  MessageCircle,
  Mountain,
  PenLine,
  Puzzle,
  RotateCcw,
  Route,
} from 'lucide-react';
import { progressLabels } from '@/lib/guide/styles';

/** Each section's header glyph, in the guide's warm palette. */
const SECTION_VISUALS = {
  karibu: { icon: DoorOpen, accent: 'rgba(201,150,26,0.30)', tag: 'Entry' },
  'safari-yako': { icon: Route, accent: 'rgba(217,130,43,0.26)' },
  kioo: { icon: Eye, accent: 'rgba(176,120,40,0.26)' },
  uthabiti: { icon: Mountain, accent: 'rgba(150,110,50,0.28)' },
  kutatua: { icon: Puzzle, accent: 'rgba(190,140,60,0.26)' },
  sauti: { icon: MessageCircle, accent: 'rgba(205,120,60,0.24)' },
  utu: { icon: Heart, accent: 'rgba(197,90,56,0.28)' },
  ujima: { icon: Coins, accent: 'rgba(160,125,60,0.26)' },
  kidijitali: { icon: Cpu, accent: 'rgba(120,120,110,0.26)' },
  kurudi: { icon: RotateCcw, accent: 'rgba(201,150,26,0.30)', tag: 'Return' },
};

const FALLBACK_VISUAL = { icon: Compass, accent: 'rgba(201,150,26,0.26)' };
const META_ICONS = { ListChecks, PenLine, Eye, RotateCcw, Clock };

const BADGE_TONES = {
  not_started: { color: '#d9cbb8', border: 'rgba(232,184,91,0.35)', background: 'rgba(36,21,15,0.55)' },
  in_progress: { color: '#24150f', border: '#e8b85b', background: '#e8b85b' },
  done: { color: '#e6f4e9', border: 'rgba(120,200,140,0.5)', background: 'rgba(47,107,58,0.55)' },
  preparing: { color: 'rgba(217,203,184,0.8)', border: 'rgba(232,184,91,0.22)', background: 'rgba(36,21,15,0.45)' },
};

/** What a section contains, as a short metadata strip. */
function buildMeta(section) {
  const meta = [];
  const count = section.exercises?.length || 0;
  if (count) meta.push({ icon: 'ListChecks', label: `${count} exercise${count === 1 ? '' : 's'}` });
  if (section.closingReflection) meta.push({ icon: 'PenLine', label: 'Closing reflection' });
  if (section.special === 'kioo') meta.push({ icon: 'Eye', label: 'Ten statements' });
  if (section.special === 'kurudi') meta.push({ icon: 'RotateCcw', label: 'Compare attempts' });
  if (!meta.length) meta.push({ icon: 'Clock', label: 'In preparation' });
  return meta;
}

/** One section card on the guide pathway, shaped like the course cards. */
export default function GuideSectionCard({ section, status = 'not_started', index = 0 }) {
  const visual = SECTION_VISUALS[section.id] || FALLBACK_VISUAL;
  const HeroIcon = visual.icon;
  const tone = section.available ? BADGE_TONES[status] || BADGE_TONES.not_started : BADGE_TONES.preparing;
  const badgeLabel = section.available ? progressLabels[status] || progressLabels.not_started : 'In preparation';
  const meta = buildMeta(section);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.08 }}
      className="tamu-course-card"
      style={{
        position: 'relative',
        background: '#fffdf7',
        border: '1px solid #dfd0b2',
        borderRadius: '6px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '330px',
      }}
    >
      <div style={{ position: 'relative', height: '126px', background: '#3a261c', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div aria-hidden style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 30% 38%, ${visual.accent} 0%, transparent 62%)` }} />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'repeating-linear-gradient(135deg, transparent 0, transparent 24px, rgba(232,184,91,0.04) 24px, rgba(232,184,91,0.04) 25px)',
          }}
        />
        <HeroIcon size={44} strokeWidth={1.2} style={{ color: '#e8b85b', position: 'relative', zIndex: 1 }} />
        <span
          className="font-guide-heading"
          style={{ position: 'absolute', top: '14px', left: '16px', color: 'rgba(232,184,91,0.85)', fontSize: '13px', letterSpacing: '0.14em', fontWeight: 600 }}
        >
          {section.number || visual.tag || '—'}
        </span>
        <span
          className="font-guide-body"
          style={{
            position: 'absolute',
            top: '12px',
            right: '14px',
            color: tone.color,
            border: `1px solid ${tone.border}`,
            background: tone.background,
            borderRadius: '20px',
            padding: '5px 11px',
            fontSize: '9.5px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
          }}
        >
          {badgeLabel}
        </span>
      </div>

      <div style={{ padding: '22px 24px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 className="font-guide-heading" style={{ fontWeight: 600, fontSize: '22px', lineHeight: 1.2, margin: '0 0 4px', color: '#33241A' }}>
          {section.english}
        </h3>
        <p className="font-guide-body" style={{ fontSize: '12.5px', letterSpacing: '0.03em', color: '#8a7860', margin: '0 0 12px' }}>
          {section.swahili} · Kiswahili
        </p>
        {section.proverb?.en && (
          <p className="font-guide-heading" style={{ fontSize: '0.95rem', fontStyle: 'italic', color: '#8A650B', lineHeight: 1.5, margin: '0 0 18px', flex: 1 }}>
            {section.proverb.en}
          </p>
        )}

        <div
          className="font-guide-body"
          style={{ display: 'flex', gap: '18px', flexWrap: 'wrap', paddingTop: '15px', borderTop: '1px solid #ecdfc8', marginBottom: '16px' }}
        >
          {meta.map((item, i) => {
            const MetaIcon = META_ICONS[item.icon] || Compass;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MetaIcon size={14} strokeWidth={1.6} style={{ color: '#b97827' }} />
                <span style={{ fontSize: '12px', color: '#806b58' }}>{item.label}</span>
              </div>
            );
          })}
        </div>

        {section.available ? (
          <Link
            to={`/learners-guide/${section.id}`}
            className="font-guide-body"
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
              alignSelf: 'flex-start',
            }}
          >
            Open section
            <ArrowRight size={13} strokeWidth={2} />
          </Link>
        ) : (
          <span
            className="font-guide-body"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#a89074', fontSize: '11px', letterSpacing: '0.13em', textTransform: 'uppercase', fontWeight: 500 }}
          >
            <Clock size={13} strokeWidth={1.6} />
            Content in preparation
          </span>
        )}
      </div>
    </motion.article>
  );
}