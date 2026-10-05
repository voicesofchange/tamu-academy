import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { SAUTI_ZA_SOKO_COURSE_SLUG } from '@/lib/sauti-za-soko-tracks';

const bodyText = { color: 'rgba(243,234,216,0.78)', fontSize: '0.95rem', lineHeight: 1.8, fontWeight: 300 };

const textareaStyle = {
  width: '100%',
  padding: '0.85rem 1rem',
  background: 'rgba(243,234,216,0.02)',
  color: 'rgba(243,234,216,0.88)',
  border: '1px solid rgba(232,184,91,0.2)',
  borderRadius: '3px',
  fontSize: '0.95rem',
  lineHeight: 1.75,
  fontFamily: 'inherit',
  resize: 'vertical',
};

const buttonStyle = {
  border: 'none',
  padding: '0.7rem 1.7rem',
  fontSize: '0.78rem',
  fontWeight: 600,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  borderRadius: '2px',
  fontFamily: 'inherit',
};

/**
 * SokoFinalReflection — the final course reflection required for Sauti za
 * Soko core course completion. It is private to the learner and to course
 * administrators, and it can be revised until the course is completed.
 */
export default function SokoFinalReflection({ prompt, canSave, onSaved }) {
  const [reflection, setReflection] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await base44.functions.invoke('getSokoWork', {
          courseSlug: SAUTI_ZA_SOKO_COURSE_SLUG,
        });
        const saved = res?.data?.finalReflection;
        if (!cancelled && saved) setReflection(saved.reflection || '');
      } catch (_) {
        // No saved reflection yet.
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  async function handleSave() {
    if (saving || !reflection.trim()) return;
    setSaving(true);
    setMessage(null);
    try {
      await base44.functions.invoke('saveSokoWork', {
        action: 'save_final_reflection',
        courseSlug: SAUTI_ZA_SOKO_COURSE_SLUG,
        reflection: reflection.trim(),
      });
      setMessage({ type: 'success', text: 'Your final reflection has been saved.' });
      if (typeof onSaved === 'function') onSaved();
    } catch (err) {
      setMessage({ type: 'error', text: 'We could not save your reflection right now. Please try again.' });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', color: 'rgba(243,234,216,0.5)' }}>
        Loading your reflection…
      </p>
    );
  }

  return (
    <div aria-live="polite">
      {prompt && (
        <p className="font-body" style={{ ...bodyText, marginBottom: '1.25rem', fontStyle: 'italic', color: 'rgba(243,234,216,0.68)' }}>
          {prompt}
        </p>
      )}
      <label htmlFor="soko-final-reflection" className="font-body" style={{ display: 'block', color: '#f8f0df', fontSize: '0.95rem', fontWeight: 500, marginBottom: '0.5rem' }}>
        Your final reflection
      </label>
      <textarea
        id="soko-final-reflection"
        value={reflection}
        onChange={(e) => { setReflection(e.target.value); if (message) setMessage(null); }}
        rows={7}
        maxLength={6000}
        disabled={!canSave || saving}
        style={{ ...textareaStyle, opacity: canSave ? 1 : 0.6 }}
      />
      <div style={{ marginTop: '1.25rem' }}>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving || !canSave || reflection.trim().length === 0}
          className="font-body"
          style={{
            ...buttonStyle,
            color: canSave && reflection.trim() ? '#24150f' : 'rgba(243,234,216,0.4)',
            backgroundColor: canSave && reflection.trim() ? '#e8b85b' : 'rgba(232,184,91,0.15)',
            cursor: saving ? 'wait' : (canSave && reflection.trim() ? 'pointer' : 'not-allowed'),
          }}
        >
          {saving ? 'Saving…' : 'Save reflection'}
        </button>
      </div>
      {!canSave && (
        <p className="font-body" style={{ ...bodyText, fontSize: '0.85rem', fontStyle: 'italic', color: 'rgba(243,234,216,0.5)', marginTop: '0.85rem' }}>
          Saving becomes available once your enrollment is active and the course is published.
        </p>
      )}
      {message && (
        <p
          className="font-body"
          role="alert"
          style={{ ...bodyText, fontSize: '0.88rem', marginTop: '0.85rem', marginBottom: 0, color: message.type === 'success' ? '#e8b85b' : '#e8955c' }}
        >
          {message.text}
        </p>
      )}
    </div>
  );
}