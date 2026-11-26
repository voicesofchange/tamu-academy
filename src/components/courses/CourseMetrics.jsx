import React from 'react';
import { Layers, Clock, BadgeCheck } from 'lucide-react';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';
import { fillTemplate } from '@/lib/i18n/fill-template';

/**
 * CourseMetrics — the hard facts every course card and overview header shows:
 * the exact module count, self-paced, and a free QR-verified certificate.
 * `surface="light"` for parchment cards, dark by default.
 */
const CONTENT = {
  modules: '{count} modules',
  selfPaced: 'Self-paced',
  certificate: 'Free QR-verified certificate',
};

export default function CourseMetrics({ moduleCount, surface = 'dark' }) {
  const { content: c } = useTranslatedContent('course-metrics', CONTENT);
  const light = surface === 'light';
  const text = light ? '#806b58' : 'rgba(243,234,216,0.85)';
  const icon = light ? '#b97827' : '#e8b85b';
  const items = [
    moduleCount ? { Icon: Layers, label: fillTemplate(c.modules, { count: moduleCount }) } : null,
    { Icon: Clock, label: c.selfPaced },
    { Icon: BadgeCheck, label: c.certificate },
  ].filter(Boolean);
  return (
    <ul className="font-body" style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexWrap: 'wrap', gap: '0.45rem 1.1rem' }}>
      {items.map(({ Icon, label }) => (
        <li key={label} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: text, fontSize: '0.82rem' }}>
          <Icon size={15} strokeWidth={1.7} aria-hidden="true" style={{ color: icon, flexShrink: 0 }} />
          {label}
        </li>
      ))}
    </ul>
  );
}
