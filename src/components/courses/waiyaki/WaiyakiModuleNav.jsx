import React from 'react';
import { Link } from 'react-router-dom';

/**
 * WaiyakiModuleNav — the previous/next step of the course. The final module
 * points at the completion room, where the assessment and the written project
 * live.
 */
const linkStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  color: '#e8b85b',
  fontSize: '0.78rem',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  fontWeight: 500,
  textDecoration: 'none',
  border: '1px solid rgba(232,184,91,0.5)',
  borderRadius: '2px',
  padding: '0.65rem 1.3rem',
};

export default function WaiyakiModuleNav({ prevPath, nextPath, nextLabel }) {
  return (
    <nav
      aria-label="Module navigation"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '0.75rem',
        flexWrap: 'wrap',
        paddingTop: '2rem',
        borderTop: '1px solid rgba(232,184,91,0.12)',
      }}
    >
      {prevPath ? (
        <Link to={prevPath} className="font-body tamu-nav-link" style={linkStyle}>
          &larr; Previous module
        </Link>
      ) : (
        <Link to="/courses/waiyaki-wa-hinga" className="font-body tamu-nav-link" style={linkStyle}>
          &larr; Course overview
        </Link>
      )}
      {nextPath && (
        <Link to={nextPath} className="font-body" style={{ ...linkStyle, border: 'none', backgroundColor: '#e8b85b', color: '#24150f', fontWeight: 600 }}>
          {nextLabel} &rarr;
        </Link>
      )}
    </nav>
  );
}