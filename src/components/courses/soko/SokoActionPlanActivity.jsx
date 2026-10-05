import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useSokoLabels } from '@/components/courses/soko/SokoLabelsProvider';

const bodyText = { color: 'rgba(243,234,216,0.78)', fontSize: '0.95rem', lineHeight: 1.75, fontWeight: 300 };

const inputStyle = {
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
 * SokoActionPlanActivity — one module's section of the My Soko Action
 * Plan. The learner's answers are saved to their own record and remain
 * private. Saving this section satisfies the module's activity
 * requirement server-side.
 */
export default function SokoActionPlanActivity({ courseSlug, moduleRoute, activity, canSave, onSaved }) {
  const labels = useSokoLabels();
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await base44.functions.invoke('getSokoWork', { courseSlug, moduleRoute });
        const plan = res?.data?.actionPlan;
        if (!cancelled && plan && plan.responses) setResponses(plan.responses);
      } catch (_) {
        // No saved work yet — start blank.
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [courseSlug, moduleRoute]);

  const fields = activity?.fields || [];
  const filledCount = fields.filter((f) => (responses[f.id] || '').trim().length > 0).length;

  function setValue(fieldId, value) {
    setResponses((prev) => ({ ...prev, [fieldId]: value }));
    if (message) setMessage(null);
  }

  async function handleSave() {
    if (saving || !canSave) return;
    setSaving(true);
    setMessage(null);
    try {
      const payload = {};
      fields.forEach((f) => { payload[f.id] = (responses[f.id] || '').trim(); });
      await base44.functions.invoke('saveSokoWork', {
        action: 'save_action_plan',
        courseSlug,
        moduleRoute,
        responses: payload,
      });
      setMessage({ type: 'success', text: labels.actionSaved });
      if (typeof onSaved === 'function') onSaved();
    } catch (err) {
      setMessage({ type: 'error', text: labels.actionError });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', color: 'rgba(243,234,216,0.5)' }}>
        {labels.actionLoading}
      </p>
    );
  }

  return (
    <div aria-live="polite">
      {activity?.purpose && (
        <p className="font-body" style={{ ...bodyText, marginBottom: '1.1rem' }}>
          <span style={{ color: 'rgba(232,184,91,0.85)', fontWeight: 500 }}>{labels.purposeLabel}: </span>
          {activity.purpose}
        </p>
      )}
      {Array.isArray(activity?.instructions) && (
        <ol className="font-body" style={{ ...bodyText, margin: '0 0 1.4rem', paddingLeft: '1.35rem' }}>
          {activity.instructions.map((line, i) => (
            <li key={i} style={{ marginBottom: '0.5rem' }}>{line}</li>
          ))}
        </ol>
      )}

      <p
        className="font-body"
        style={{ ...bodyText, fontSize: '0.85rem', fontStyle: 'italic', color: 'rgba(243,234,216,0.6)', marginBottom: '1.5rem' }}
      >
        {labels.actionPrivacy}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
        {fields.map((field, i) => (
          <div key={field.id}>
            <label
              htmlFor={`soko-field-${field.id}`}
              className="font-body"
              style={{ display: 'block', color: '#f8f0df', fontSize: '0.95rem', fontWeight: 500, marginBottom: '0.3rem' }}
            >
              {i + 1}. {field.label}
            </label>
            <p className="font-body" style={{ ...bodyText, fontSize: '0.84rem', color: 'rgba(243,234,216,0.55)', margin: '0 0 0.5rem' }}>
              {field.helper}
            </p>
            <textarea
              id={`soko-field-${field.id}`}
              value={responses[field.id] || ''}
              onChange={(e) => setValue(field.id, e.target.value)}
              rows={3}
              maxLength={4000}
              disabled={!canSave || saving}
              style={{ ...inputStyle, opacity: canSave ? 1 : 0.6 }}
            />
          </div>
        ))}
      </div>

      <div style={{ marginTop: '1.75rem' }}>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving || !canSave || filledCount === 0}
          className="font-body"
          style={{
            ...buttonStyle,
            color: canSave && filledCount > 0 ? '#24150f' : 'rgba(243,234,216,0.4)',
            backgroundColor: canSave && filledCount > 0 ? '#e8b85b' : 'rgba(232,184,91,0.15)',
            cursor: saving ? 'wait' : (canSave && filledCount > 0 ? 'pointer' : 'not-allowed'),
          }}
        >
          {saving ? labels.actionSaving : labels.actionSave}
        </button>
        <p className="font-body" style={{ ...bodyText, fontSize: '0.85rem', margin: '0.75rem 0 0', color: 'rgba(243,234,216,0.55)' }}>
          {filledCount} {labels.ofWord} {fields.length} {labels.actionSectionsAnswered}
        </p>
        {!canSave && (
          <p className="font-body" style={{ ...bodyText, fontSize: '0.85rem', fontStyle: 'italic', margin: '0.5rem 0 0', color: 'rgba(243,234,216,0.5)' }}>
            {labels.actionUnavailable}
          </p>
        )}
        {message && (
          <p
            className="font-body"
            role="alert"
            style={{ ...bodyText, fontSize: '0.88rem', margin: '0.85rem 0 0', color: message.type === 'success' ? '#e8b85b' : '#e8955c' }}
          >
            {message.text}
          </p>
        )}
      </div>
    </div>
  );
}