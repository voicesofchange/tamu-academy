import React from 'react';
import { Link } from 'react-router-dom';

const crumbStyle = { color: 'rgba(245,239,224,0.5)', fontSize: '0.72rem', letterSpacing: '0.06em', fontWeight: 300 };
const arrowStyle = { color: 'rgba(212,161,42,0.5)', margin: '0 0.4rem' };

/**
 * Breadcrumb trail: Pillar → Track → Course → Module.
 * Pillar and Track have no dedicated pages, so they render as plain text.
 */
export default function ModuleBreadcrumbs({ pillar, track, course, coursePath, moduleLabel }) {
  return (
    <nav aria-label="Module breadcrumbs" style={{ marginBottom: '2.5rem' }}>
      <span className="font-body" style={crumbStyle}>{pillar}</span>
      <span aria-hidden="true" style={arrowStyle}>→</span>
      <span className="font-body" style={crumbStyle}>{track}</span>
      <span aria-hidden="true" style={arrowStyle}>→</span>
      <Link to={coursePath} className="font-body" style={{ ...crumbStyle, color: 'rgba(212,161,42,0.7)', textDecoration: 'none' }}>{course}</Link>
      <span aria-hidden="true" style={arrowStyle}>→</span>
      <span className="font-body" style={{ ...crumbStyle, color: 'rgba(245,239,224,0.75)' }} aria-current="page">{moduleLabel}</span>
    </nav>
  );
}