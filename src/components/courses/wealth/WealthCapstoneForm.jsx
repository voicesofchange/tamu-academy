import React, { useCallback, useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';

const bodyText = { color: 'rgba(243,234,216,0.78)', fontSize: '0.92rem', lineHeight: 1.7, fontWeight: 300 };

const labelStyle = { color: '#f8f0df', fontSize: '0.92rem', fontWeight: 500, margin: '0 0 0.35rem' };
const helperStyle = { color: 'rgba(243,234,216,0.55)', fontSize: '0.82rem', lineHeight: 1.6, fontWeight: 300, margin: '0 0 0.6rem' };

const inputStyle = {
  width: '100%',
  boxSizing: 'border-box',
  background: 'rgba(243,234,216,0.03)',
  border: '1px solid rgba(232,184,91,0.22)',
  borderRadius: '3px',
  color: '#f8f0df',
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '0.92rem',
  fontWeight: 300,
  lineHeight: 1.7,
  padding: '0.8rem 1rem',
  resize: 'vertical',
};

const optionCardStyle = (active) => ({
  textAlign: 'left',
  width: '100%',
  padding: '1rem 1.2rem',
  border: `1px solid ${active ? '#e8b85b' : 'rgba(243,234,216,0.14)'}`,
  background: active ? 'rgba(232,184,91,0.08)' : 'rgba(243,234,216,0.015)',
  borderRadius: '4px',
  cursor: 'pointer',
  fontFamily: "'DM Sans', sans-serif",
});

const saveStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  color: '#24150f',
  fontSize: '0.78rem',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  fontWeight: 600,
  border: 'none',
  borderRadius: '2px',
  padding: '0.8rem 1.7rem',
  backgroundColor: '#e8b85b',
  cursor: 'pointer',
  fontFamily: "'DM Sans', sans-serif",
};

/**
 * The capstone project form. The learner picks one of the three options and
 * answers that option's numbered sections. Saving is server-validated: only
 * sections belonging to the chosen option are accepted, and the submission is
 * recorded the first time every section carries an answer.
 */
export default function WealthCapstoneForm({ courseSlug, canSave, onSaved }) {
  const [state, setState] = useState({ status: 'loading', options: [], capstone: null });
  const [format, setFormat] = useState(null);
  const [answers, setAnswers] = useState({});
  const [title, setTitle] = useState('');
  const [saving, setSaving] = useState(false);
  const [note, setNote] = useState(null);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    try {
      const res = await base44.functions.invoke('getWealthCapstone', { courseSlug });
      const data = res && res.data ? res.data : null;
      if (!data) {
        setState({ status: 'error', options: [], capstone: null });
        return;
      }
      setState({ status: 'ready', options: data.options || [], capstone: data.capstone || null });
      if (data.capstone) {
        setFormat(data.capstone.format);
        setAnswers(data.capstone.answers || {});
        setTitle(data.capstone.title || '');
      }
    } catch (err) {
      setState({ status: 'error', options: [], capstone: null });
    }
  }, [courseSlug]);

  useEffect(() => { load(); }, [load]);

  const capstone = state.capstone;
  const sections = (capstone && capstone.format === format && capstone.sections) || [];
  const filledCount = sections.filter((s) => (answers[s.id] || '').trim().length > 0).length;
  const complete = sections.length > 0 && filledCount === sections.length;

  function chooseFormat(id) {
    if (id === format) return;
    setFormat(id);
    setAnswers({});
    setNote(null);
    setError(null);
  }

  async function handleSave() {
    if (!canSave || saving) return;
    setSaving(true);
    setNote(null);
    setError(null);
    try {
      const res = await base44.functions.invoke('saveWealthCapstone', {
        courseSlug,
        capstoneFormat: format,
        title,
        answers,
      });
      const data = res && res.data ? res.data : null;
      if (data && data.progressSaved === false) {
        setNote('Your capstone could not be saved for this account yet.');
      } else if (data) {
        setNote(data.submitted
          ? 'Your capstone is saved and submitted.'
          : `Saved. ${data.filledCount} of ${data.totalSections} sections answered.`);
      }
      await load();
      if (onSaved) onSaved();
    } catch (err) {
      setError('We could not save your capstone just now. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  if (state.status === 'loading') {
    return (
      <div style={{ padding: '1.5rem 0' }}>
        <div style={{ width: '1.5rem', height: '1.5rem', border: '2px solid rgba(232,184,91,0.2)', borderTopColor: '#e8b85b', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <p className="font-body" style={{ ...bodyText, marginTop: '0.85rem' }}>Loading your capstone...</p>
      </div>
    );
  }

  if (state.status === 'error') {
    return <p className="font-body" style={{ ...bodyText }}>We could not load your capstone just now. Reload the page to try again.</p>;
  }

  return (
    <div>
      <p className="font-body" style={{ ...bodyText, marginBottom: '1.5rem' }}>
        Choose one option, the one that best fits your goals. Your answers save as a draft until
        every section carries an answer, at which point the capstone is recorded as submitted.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', marginBottom: '2rem' }}>
        {state.options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => chooseFormat(option.id)}
            aria-pressed={format === option.id}
            style={optionCardStyle(format === option.id)}
          >
            <span className="font-body" style={{ display: 'block', color: format === option.id ? '#e8b85b' : 'rgba(232,184,91,0.75)', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.35rem' }}>
              {option.buildsOn}
            </span>
            <span style={{ color: '#f8f0df', fontSize: '0.95rem', fontWeight: 500 }}>{option.label}</span>
          </button>
        ))}
      </div>

      {format && (
        <div>
          <div style={{ marginBottom: '1.75rem' }}>
            <p className="font-body" style={labelStyle}>Capstone title</p>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={200}
              placeholder="A short title for your plan"
              style={{ ...inputStyle, resize: undefined }}
            />
          </div>

          {sections.map((section, index) => (
            <div key={section.id} style={{ marginBottom: '1.75rem' }}>
              <p className="font-body" style={labelStyle}>{index + 1}. {section.label}</p>
              <p className="font-body" style={helperStyle}>{section.helper}</p>
              <textarea
                value={answers[section.id] || ''}
                onChange={(e) => setAnswers((prev) => ({ ...prev, [section.id]: e.target.value }))}
                rows={5}
                maxLength={6000}
                style={inputStyle}
                aria-label={section.label}
              />
            </div>
          ))}

          <p className="font-body" style={{ ...bodyText, marginBottom: '1.25rem' }}>
            {filledCount} of {sections.length} sections answered.
            {complete ? ' Every section is answered — save to submit.' : ''}
          </p>

          <button
            type="button"
            onClick={handleSave}
            disabled={!canSave || saving || filledCount === 0}
            style={{ ...saveStyle, opacity: !canSave || saving || filledCount === 0 ? 0.6 : 1, cursor: !canSave || saving || filledCount === 0 ? 'not-allowed' : 'pointer' }}
          >
            {saving ? 'Saving...' : complete ? 'Submit my capstone' : 'Save draft'}
          </button>

          {note && <p className="font-body" style={{ ...bodyText, marginTop: '1rem', color: 'rgba(232,184,91,0.85)' }}>{note}</p>}
          {error && <p className="font-body" role="alert" style={{ ...bodyText, marginTop: '1rem', color: '#e8955c' }}>{error}</p>}
        </div>
      )}
    </div>
  );
}