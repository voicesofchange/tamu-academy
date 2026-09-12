import React from 'react';
import { Link } from 'react-router-dom';

const crumbStyle = { color: 'rgba(243,234,216,0.5)', fontSize: '0.72rem', letterSpacing: '0.06em', fontWeight: 300 };
const activeCrumbStyle = { ...crumbStyle, color: 'rgba(243,234,216,0.78)' };
const linkCrumbStyle = { ...crumbStyle, color: 'rgba(232,184,91,0.75)', textDecoration: 'none' };
const arrowStyle = { color: 'rgba(232,184,91,0.5)', margin: '0 0.4rem' };

/**
 * Reusable breadcrumb trail for non-module pages.
 * Pass an array of { label, to? } items — the last item is the current page.
 */
export default function PageBreadcrumbs({ items }) {
  if (!items || items.length === 0) return null;
  return (
    <nav aria-label="Page breadcrumbs" style={{ marginBottom: '2.5rem' }}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <React.Fragment key={i}>
            {item.to && !isLast ? (
              <Link to={item.to} className="font-body" style={linkCrumbStyle}>
                {item.label}
              </Link>
            ) : (
              <span className="font-body" style={isLast ? activeCrumbStyle : linkCrumbStyle} aria-current={isLast ? 'page' : undefined}>
                {item.label}
              </span>
            )}
            {!isLast && <span aria-hidden="true" style={arrowStyle}>→</span>}
          </React.Fragment>
        );
      })}
    </nav>
  );
}