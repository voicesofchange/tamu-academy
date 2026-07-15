import React, { useState, useEffect } from 'react';
import { Printer } from 'lucide-react';

const bodyText = { color: 'rgba(245,239,224,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };

/**
 * Everyday Economic Decision Map — applied activity.
 * Responses are stored only in the learner's browser (localStorage) and are
 * never sent to a database. A native Print / Save as PDF option is provided
 * via window.print(); the printable area is styled for print via index.css.
 */
export default function DecisionMap({ activity, storageKey }) {
  const [values, setValues] = useState(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) return { ...Object.fromEntries(activity.fields.map((f) => [f.id, ''])), ...JSON.parse(saved) };
    } catch (err) {
      /* ignore storage errors */
    }
    return Object.fromEntries(activity.fields.map((f) => [f.id, '']));
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(values));
    } catch (err) {
      /* ignore storage errors */
    }
  }, [values, storageKey]);

  const handleChange = (id, val) => setValues((prev) => ({ ...prev, [id]: val }));

  const handleClear = () => {
    const cleared = Object.fromEntries(activity.fields.map((f) => [f.id, '']));
    setValues(cleared);
    try {
      window.localStorage.removeItem(storageKey);
    } catch (err) {
      /* ignore */
    }
  };

  return (
    <div className="tamu-print-area">
      <div style={{ marginBottom: '1.5rem' }}>
        {activity.instructions.map((line, i) => (
          <p key={i} className="font-body" style={{ ...bodyText, marginBottom: '0.85rem' }}>{line}</p>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {activity.fields.map((f) => (
          <div key={f.id}>
            <label
              htmlFor={`field-${f.id}`}
              className="font-body"
              style={{ display: 'block', color: '#F5EFE0', fontSize: '0.82rem', letterSpacing: '0.04em', fontWeight: 500, marginBottom: '0.35rem' }}
            >
              {f.label}
            </label>
            <span className="font-body" style={{ display: 'block', color: 'rgba(245,239,224,0.55)', fontSize: '0.82rem', lineHeight: 1.65, marginBottom: '0.5rem' }}>
              {f.helper}
            </span>
            <textarea
              id={`field-${f.id}`}
              value={values[f.id] || ''}
              onChange={(e) => handleChange(f.id, e.target.value)}
              rows={3}
              style={{ width: '100%', padding: '0.7rem 0.85rem', background: 'rgba(245,239,224,0.02)', color: 'rgba(245,239,224,0.85)', border: '1px solid rgba(212,161,42,0.2)', borderRadius: '3px', fontSize: '0.9rem', lineHeight: 1.7, fontFamily: 'inherit', resize: 'vertical' }}
            />
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1.75rem' }}>
        <button
          type="button"
          onClick={() => window.print()}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.3rem', border: '1px solid rgba(212,161,42,0.4)', borderRadius: '2px', background: 'transparent', color: '#D4A12A', fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}
        >
          <Printer size={14} aria-hidden="true" />
          Print / Save as PDF
        </button>
        <button
          type="button"
          onClick={handleClear}
          style={{ padding: '0.65rem 1.3rem', border: '1px solid rgba(245,239,224,0.2)', borderRadius: '2px', background: 'transparent', color: 'rgba(245,239,224,0.5)', fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}
        >
          Clear Responses
        </button>
      </div>

      <p className="font-body" style={{ ...bodyText, fontSize: '0.8rem', fontStyle: 'italic', marginTop: '1.25rem', marginBottom: 0 }}>
        Your responses are saved only in this browser and are not submitted anywhere during this development phase.
      </p>
    </div>
  );
}