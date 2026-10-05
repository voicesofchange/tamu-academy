import React from 'react';

const chipStyle = (isActive) => ({
  minHeight: '34px',
  padding: '0.35rem 0.85rem',
  border: `1px solid ${isActive ? 'var(--tamu-gold)' : 'rgba(232,184,91,0.3)'}`,
  borderRadius: '2px',
  backgroundColor: isActive ? 'var(--tamu-gold)' : 'transparent',
  color: isActive ? '#24150f' : 'rgba(243,234,216,0.75)',
  fontSize: '0.68rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  fontWeight: isActive ? 600 : 500,
  cursor: 'pointer',
  transition: 'background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease',
});

/**
 * DashboardGroupFilter — the optional view filter. Choosing a group here only
 * changes what the dashboard emphasises; it never rewrites the learner's saved
 * learner group, and it never touches course access or progress.
 */
export default function DashboardGroupFilter({ groups, activeId, isPreviewing, onSelect, onReset, labels }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        <span className="font-body" style={{ color: 'rgba(243,234,216,0.6)', fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500 }}>
          {labels.label}
        </span>
        <div role="group" aria-label={labels.label} style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {groups.map((group) => (
            <button
              key={group.id}
              type="button"
              aria-pressed={activeId === group.id}
              onClick={() => onSelect(group.id)}
              className="font-body"
              style={chipStyle(activeId === group.id)}
            >
              {group.shortLabel}
            </button>
          ))}
        </div>
        {isPreviewing && (
          <button
            type="button"
            onClick={onReset}
            className="font-body"
            style={{ background: 'none', border: 'none', padding: 0, color: 'var(--tamu-gold)', fontSize: '0.68rem', letterSpacing: '0.06em', textDecoration: 'underline', textUnderlineOffset: '3px', cursor: 'pointer' }}
          >
            {labels.backToMyGroup}
          </button>
        )}
      </div>
      <p className="font-body" style={{ color: 'rgba(243,234,216,0.5)', fontSize: '0.78rem', lineHeight: 1.7, fontWeight: 300, margin: '0.6rem 0 0' }}>
        {labels.note}
      </p>
    </div>
  );
}