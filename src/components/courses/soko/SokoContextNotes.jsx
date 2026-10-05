import React from 'react';

const bodyText = { color: 'rgba(243,234,216,0.78)', fontSize: '0.95rem', lineHeight: 1.8, fontWeight: 300 };

/**
 * SokoContextNotes — plain-language explanations of the Kenyan terms and
 * institutions each module uses, so learners meeting them for the first
 * time, in Kenya or elsewhere, can follow the lesson. Presented as a
 * distinct contextual layer, never mixed into the core lesson text.
 */
export default function SokoContextNotes({ notes }) {
  if (!Array.isArray(notes) || notes.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', color: 'rgba(243,234,216,0.6)', fontSize: '0.88rem', margin: 0 }}>
        This module uses terms and institutions from Kenya. They are explained here in plain language.
        These notes are context, not additional requirements.
      </p>
      {notes.map((note) => (
        <div
          key={note.term}
          style={{
            padding: '1.15rem 1.35rem',
            border: '1px solid rgba(232,184,91,0.18)',
            borderLeft: '2px solid rgba(232,184,91,0.5)',
            borderRadius: '3px',
            backgroundColor: 'rgba(243,234,216,0.015)',
          }}
        >
          <h3 className="font-heading" style={{ color: '#f8f0df', fontSize: '1.1rem', fontWeight: 400, margin: '0 0 0.5rem' }}>
            {note.term}
          </h3>
          <p className="font-body" style={{ ...bodyText, margin: '0 0 0.45rem' }}>{note.plain}</p>
          <p className="font-body" style={{ ...bodyText, fontSize: '0.86rem', fontStyle: 'italic', color: 'rgba(243,234,216,0.6)', margin: 0 }}>
            {note.whyItMatters}
          </p>
        </div>
      ))}
    </div>
  );
}