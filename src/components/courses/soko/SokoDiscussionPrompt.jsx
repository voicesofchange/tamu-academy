import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

const bodyText = { color: 'rgba(243,234,216,0.78)', fontSize: '0.95rem', lineHeight: 1.75, fontWeight: 300 };

const textareaStyle = {
  width: '100%',
  padding: '0.7rem 0.85rem',
  background: 'rgba(243,234,216,0.02)',
  color: 'rgba(243,234,216,0.88)',
  border: '1px solid rgba(232,184,91,0.2)',
  borderRadius: '3px',
  fontSize: '0.92rem',
  lineHeight: 1.7,
  fontFamily: 'inherit',
  resize: 'vertical',
};

const buttonStyle = {
  border: '1px solid rgba(232,184,91,0.4)',
  padding: '0.6rem 1.5rem',
  fontSize: '0.74rem',
  fontWeight: 600,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  borderRadius: '2px',
  fontFamily: 'inherit',
  background: 'rgba(232,184,91,0.08)',
  color: '#e8b85b',
};

const LANGUAGES = [
  { value: 'sw', label: 'Kiswahili' },
  { value: 'en', label: 'English' },
  { value: 'mixed', label: 'Both' },
];

/**
 * SokoDiscussionPrompt — the Kiswahili discussion prompt each module
 * carries. One response across the whole course is required for
 * completion, and it may be given in any module. The response is private
 * unless the learner explicitly consents to sharing it with other
 * learners.
 */
export default function SokoDiscussionPrompt({ courseSlug, moduleRoute, prompt, canSave }) {
  const [response, setResponse] = useState('');
  const [language, setLanguage] = useState('sw');
  const [shareConsent, setShareConsent] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await base44.functions.invoke('getSokoWork', { courseSlug, moduleRoute });
        const saved = res?.data?.discussion;
        if (!cancelled && saved) {
          setResponse(saved.response || '');
          setLanguage(saved.language || 'sw');
          setShareConsent(saved.shareConsent === true);
        }
      } catch (_) {
        // No saved response yet.
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [courseSlug, moduleRoute]);

  async function handleSave() {
    if (saving || !canSave || !response.trim()) return;
    setSaving(true);
    setMessage(null);
    try {
      await base44.functions.invoke('saveSokoWork', {
        action: 'save_discussion',
        courseSlug,
        moduleRoute,
        response: response.trim(),
        language,
        shareConsent,
      });
      setMessage({ type: 'success', text: 'Your response has been saved. One response completes the peer discussion requirement for the course.' });
    } catch (err) {
      setMessage({ type: 'error', text: 'We could not save your response right now. Please try again.' });
    } finally {
      setSaving(false);
    }
  }

  if (!prompt) return null;

  return (
    <div
      style={{
        padding: '1.5rem 1.75rem',
        border: '1px solid rgba(232,184,91,0.25)',
        borderRadius: '4px',
        backgroundColor: 'rgba(232,184,91,0.035)',
      }}
    >
      <span
        className="font-body"
        style={{ color: '#e8b85b', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.7rem' }}
      >
        Mazungumzo &middot; Discussion
      </span>
      <p className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.1rem,2.4vw,1.4rem)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.4, margin: '0 0 0.5rem' }}>
        {prompt.prompt}
      </p>
      {prompt.translation && (
        <p className="font-body" style={{ ...bodyText, fontSize: '0.9rem', color: 'rgba(243,234,216,0.62)', margin: '0 0 1.1rem' }}>
          {prompt.translation}
        </p>
      )}
      {prompt.guidance && (
        <p className="font-body" style={{ ...bodyText, fontSize: '0.87rem', marginBottom: '1.4rem' }}>
          {prompt.guidance}
        </p>
      )}

      {loading ? (
        <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', color: 'rgba(243,234,216,0.5)', margin: 0 }}>
          Loading your saved response…
        </p>
      ) : (
        <>
          <label htmlFor={`soko-discussion-${moduleRoute}`} className="font-body" style={{ display: 'block', color: '#f8f0df', fontSize: '0.9rem', fontWeight: 500, marginBottom: '0.45rem' }}>
            Your response
          </label>
          <textarea
            id={`soko-discussion-${moduleRoute}`}
            value={response}
            onChange={(e) => { setResponse(e.target.value); if (message) setMessage(null); }}
            rows={5}
            maxLength={4000}
            disabled={!canSave || saving}
            style={{ ...textareaStyle, opacity: canSave ? 1 : 0.6 }}
          />

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', alignItems: 'center', marginTop: '0.9rem' }}>
            <label className="font-body" style={{ ...bodyText, fontSize: '0.87rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
              Language
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                disabled={!canSave || saving}
                style={{ padding: '0.35rem 0.6rem', background: 'rgba(243,234,216,0.02)', color: 'rgba(243,234,216,0.85)', border: '1px solid rgba(232,184,91,0.25)', borderRadius: '2px', fontSize: '0.8rem', fontFamily: 'inherit' }}
              >
                {LANGUAGES.map((l) => (
                  <option key={l.value} value={l.value}>{l.label}</option>
                ))}
              </select>
            </label>

            <label className="font-body" style={{ ...bodyText, fontSize: '0.87rem', display: 'inline-flex', alignItems: 'flex-start', gap: '0.5rem', margin: 0, maxWidth: '460px' }}>
              <input
                type="checkbox"
                checked={shareConsent}
                onChange={(e) => setShareConsent(e.target.checked)}
                disabled={!canSave || saving}
                style={{ marginTop: '0.28rem', accentColor: '#e8b85b' }}
              />
              <span>I agree to my response being shared with other learners on this course. Without this, it stays private.</span>
            </label>
          </div>

          <div style={{ marginTop: '1.25rem' }}>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving || !canSave || response.trim().length === 0}
              className="font-body"
              style={{
                ...buttonStyle,
                opacity: saving || !canSave || response.trim().length === 0 ? 0.5 : 1,
                cursor: saving ? 'wait' : (canSave && response.trim() ? 'pointer' : 'not-allowed'),
              }}
            >
              {saving ? 'Saving…' : 'Save my response'}
            </button>
          </div>

          {message && (
            <p
              className="font-body"
              role="alert"
              style={{ ...bodyText, fontSize: '0.88rem', margin: '0.85rem 0 0', color: message.type === 'success' ? '#e8b85b' : '#e8955c' }}
            >
              {message.text}
            </p>
          )}
        </>
      )}
    </div>
  );
}