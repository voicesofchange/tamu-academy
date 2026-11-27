import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

// Visible text on this screen, translated with the rest of the page.
const UI_TEXT = {
  moduleBreadcrumbs: 'Module breadcrumbs',
};

const crumbStyle = { color: 'rgba(243,234,216,0.5)', fontSize: '0.72rem', letterSpacing: '0.06em', fontWeight: 300 };
const arrowStyle = { color: 'rgba(232,184,91,0.72)', margin: '0 0.4rem' };

/**
 * Breadcrumb trail: Pillar → Track → Course → Module.
 * Pillar and Track have no dedicated pages, so they render as plain text.
 * The pillar, track and course names are translated here, so the trail reads
 * in the learner's language whichever page passes them (some pages pass the
 * course data in English).
 */
export default function ModuleBreadcrumbs({ pillar, track, course, coursePath, moduleLabel }) {
  const { content: uiText } = useTranslatedContent('ui-components-courses-module-modulebreadcrumbs', UI_TEXT);
  const names = useMemo(() => ({ pillar: pillar || '', track: track || '', course: course || '' }), [pillar, track, course]);
  const { content: shown } = useTranslatedContent(`module-crumbs:${pillar}|${track}|${course}`, names);
  return (
    <nav aria-label={uiText.moduleBreadcrumbs} style={{ marginBottom: '2.5rem' }}>
      <span className="font-body" style={crumbStyle}>{shown.pillar || pillar}</span>
      <span aria-hidden="true" style={arrowStyle}>→</span>
      <span className="font-body" style={crumbStyle}>{shown.track || track}</span>
      <span aria-hidden="true" style={arrowStyle}>→</span>
      <Link to={coursePath} className="font-body" style={{ ...crumbStyle, color: 'rgba(232,184,91,0.75)', textDecoration: 'none' }}>{shown.course || course}</Link>
      <span aria-hidden="true" style={arrowStyle}>→</span>
      <span className="font-body" style={{ ...crumbStyle, color: 'rgba(243,234,216,0.78)' }} aria-current="page">{moduleLabel}</span>
    </nav>
  );
}