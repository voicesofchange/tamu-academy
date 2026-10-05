import React from 'react';
import { Link } from 'react-router-dom';
import { getSectionNeighbours } from '@/lib/guide/sections';
import { darkText } from '@/lib/guide/styles';

const navLinkStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  textDecoration: 'none',
  fontSize: '0.72rem',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  fontWeight: 500,
  border: '1px solid rgba(201,150,26,0.45)',
  borderRadius: '3px',
  padding: '0.65rem 1.1rem',
  color: '#C9961A',
};

/** Previous / next section links, plus the button that marks a section done. */
export default function SectionFooterNav({ section, status, onMarkDone, busy, hideMarkDone = false }) {
  const { previous, next } = getSectionNeighbours(section.id);

  return (
    <section style={{ borderTop: darkText.rule, paddingTop: '1.75rem', marginTop: '0.5rem' }}>
      {!hideMarkDone && (
        <div style={{ marginBottom: '1.75rem' }}>
          {status === 'done' ? (
            <p className="font-guide-body" style={{ ...darkText.body, fontSize: '0.85rem', margin: 0 }}>
              <span style={{ color: '#C9961A' }}>Done</span> — you marked this section as done. You can still write in it whenever you like.
            </p>
          ) : (
            <button
              type="button"
              onClick={onMarkDone}
              disabled={busy}
              className="font-guide-body"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: '#C9961A',
                color: '#24150f',
                border: 'none',
                borderRadius: '3px',
                padding: '0.8rem 1.4rem',
                fontSize: '0.74rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 600,
                cursor: busy ? 'wait' : 'pointer',
                opacity: busy ? 0.7 : 1,
              }}
            >
              {busy ? 'Saving…' : 'Mark section as done'}
            </button>
          )}
        </div>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'space-between' }}>
        {previous ? (
          <Link to={`/learners-guide/${previous.id}`} className="font-guide-body" style={navLinkStyle}>
            &larr; {previous.number ? `${previous.number} · ` : ''}{previous.swahili}
          </Link>
        ) : (
          <Link to="/learners-guide" className="font-guide-body" style={navLinkStyle}>
            &larr; Guide home
          </Link>
        )}
        {next ? (
          <Link to={`/learners-guide/${next.id}`} className="font-guide-body" style={navLinkStyle}>
            {next.number ? `${next.number} · ` : ''}{next.swahili} &rarr;
          </Link>
        ) : (
          <Link to="/learners-guide" className="font-guide-body" style={navLinkStyle}>
            Back to the guide home &rarr;
          </Link>
        )}
      </div>
    </section>
  );
}