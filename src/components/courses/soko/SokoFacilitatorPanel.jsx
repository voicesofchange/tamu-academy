import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { SAUTI_ZA_SOKO_PEER_COURSE_SLUG } from '@/lib/sauti-za-soko-tracks';
import { useSokoLabels } from '@/components/courses/soko/SokoLabelsProvider';

const bodyText = { color: 'rgba(243,234,216,0.78)', fontSize: '0.95rem', lineHeight: 1.8, fontWeight: 300 };

const textareaStyle = {
  width: '100%',
  padding: '0.8rem 0.95rem',
  background: 'rgba(243,234,216,0.02)',
  color: 'rgba(243,234,216,0.88)',
  border: '1px solid rgba(232,184,91,0.2)',
  borderRadius: '3px',
  fontSize: '0.92rem',
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

const STATUS_KEYS = {
  draft: 'facilitatorStatusDraft',
  submitted: 'facilitatorStatusSubmitted',
  approved: 'facilitatorStatusApproved',
  returned: 'facilitatorStatusReturned',
};

const SECTION_FIELDS = [
  {
    id: 'sessionPlan',
    labelKey: 'facilitatorSessionPlanLabel',
    helperKey: 'facilitatorSessionPlanHelper',
    rows: 6,
  },
  {
    id: 'discussionSummary',
    labelKey: 'facilitatorDiscussionLabel',
    helperKey: 'facilitatorDiscussionHelper',
    rows: 6,
  },
  {
    id: 'reflection',
    labelKey: 'facilitatorReflectionLabel',
    helperKey: 'facilitatorReflectionHelper',
    rows: 6,
  },
];

/**
 * SokoFacilitatorPanel — the Peer Facilitator record for Module 8. The
 * learner prepares a session plan, facilitates one consent-based vendor
 * circle, writes a privacy-protecting summary and a reflection, then
 * submits the record for review. Module 8 cannot be completed until a
 * reviewer approves it.
 *
 * Every label, instruction and action reads from the pathway label set, so
 * the record is written in the learner's selected language.
 */
export default function SokoFacilitatorPanel({ canSave }) {
  const labels = useSokoLabels();
  const [form, setForm] = useState({ sessionPlan: '', discussionSummary: '', reflection: '' });
  const [consentConfirmed, setConsentConfirmed] = useState(false);
  const [status, setStatus] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await base44.functions.invoke('getSokoCourseCompletion', {
          courseSlug: SAUTI_ZA_SOKO_PEER_COURSE_SLUG,
        });
        if (cancelled) return;
        const requirement = (res?.data?.requirements || []).find((r) => r.kind === 'facilitator_submission');
        if (requirement) {
          setStatus(requirement.status === 'not_started' ? 'draft' : requirement.status);
          setFeedback(requirement.feedback || '');
        }
      } catch (_) {
        // No record yet.
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const approved = status === 'approved';

  async function handleSubmit(action) {
    if (busy) return;
    setBusy(action);
    setMessage(null);
    try {
      const res = await base44.functions.invoke('submitSokoFacilitatorWork', {
        action,
        courseSlug: SAUTI_ZA_SOKO_PEER_COURSE_SLUG,
        sessionPlan: form.sessionPlan.trim(),
        discussionSummary: form.discussionSummary.trim(),
        reflection: form.reflection.trim(),
        consentConfirmed,
      });
      const nextStatus = res?.data?.status || (action === 'submit' ? 'submitted' : 'draft');
      setStatus(nextStatus);
      setMessage({
        type: 'success',
        text: action === 'submit' ? labels.facilitatorSavedSubmit : labels.facilitatorSavedDraft,
      });
    } catch (err) {
      setMessage({ type: 'error', text: labels.facilitatorError });
    } finally {
      setBusy(null);
    }
  }

  function setField(id, value) {
    setForm((prev) => ({ ...prev, [id]: value }));
    if (message) setMessage(null);
  }

  if (loading) {
    return (
      <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', color: 'rgba(243,234,216,0.5)' }}>
        {labels.facilitatorLoading}
      </p>
    );
  }

  return (
    <div aria-live="polite">
      <div style={{ marginBottom: '1.5rem' }}>
        <span className="font-body" style={{ color: '#e8b85b', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.35rem' }}>
          {labels.facilitatorStatusLabel}
        </span>
        <span className="font-body" style={{ ...bodyText, color: '#f8f0df', fontSize: '0.95rem', margin: 0 }}>
          {labels[STATUS_KEYS[status]] || labels.facilitatorStatusDraft}
        </span>
      </div>

      {status === 'returned' && feedback && (
        <div style={{ padding: '1.1rem 1.35rem', border: '1px solid rgba(232,149,92,0.35)', borderRadius: '4px', backgroundColor: 'rgba(232,149,92,0.05)', marginBottom: '1.75rem' }}>
          <span className="font-body" style={{ color: '#e8955c', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.5rem' }}>
            {labels.facilitatorFeedbackLabel}
          </span>
          <p className="font-body" style={{ ...bodyText, margin: 0, fontSize: '0.92rem' }}>{feedback}</p>
        </div>
      )}

      {approved && (
        <div style={{ padding: '1.1rem 1.35rem', border: '1px solid rgba(232,184,91,0.35)', borderRadius: '4px', backgroundColor: 'rgba(232,184,91,0.05)', marginBottom: '1.75rem' }}>
          <p className="font-body" style={{ ...bodyText, margin: 0, fontSize: '0.92rem' }}>
            {labels.facilitatorApprovedNotice}
          </p>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {SECTION_FIELDS.map((section) => (
          <div key={section.id}>
            <label htmlFor={`soko-${section.id}`} className="font-body" style={{ display: 'block', color: '#f8f0df', fontSize: '0.95rem', fontWeight: 500, marginBottom: '0.3rem' }}>
              {labels[section.labelKey]}
            </label>
            <p className="font-body" style={{ ...bodyText, fontSize: '0.84rem', color: 'rgba(243,234,216,0.55)', margin: '0 0 0.5rem' }}>
              {labels[section.helperKey]}
            </p>
            <textarea
              id={`soko-${section.id}`}
              value={form[section.id]}
              onChange={(e) => setField(section.id, e.target.value)}
              rows={section.rows}
              maxLength={8000}
              disabled={!canSave || !!busy || approved}
              style={{ ...textareaStyle, opacity: canSave && !approved ? 1 : 0.6 }}
            />
          </div>
        ))}
      </div>

      <label className="font-body" style={{ ...bodyText, display: 'flex', alignItems: 'flex-start', gap: '0.6rem', marginTop: '1.5rem', fontSize: '0.9rem' }}>
        <input
          type="checkbox"
          checked={consentConfirmed}
          onChange={(e) => setConsentConfirmed(e.target.checked)}
          disabled={!canSave || !!busy || approved}
          style={{ marginTop: '0.3rem', accentColor: '#e8b85b' }}
        />
        <span>{labels.facilitatorConsent}</span>
      </label>

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
        <button
          type="button"
          onClick={() => handleSubmit('save_draft')}
          disabled={!!busy || !canSave || approved}
          className="font-body"
          style={{
            ...buttonStyle,
            background: 'transparent',
            border: '1px solid rgba(232,184,91,0.45)',
            color: '#e8b85b',
            opacity: busy || !canSave || approved ? 0.5 : 1,
            cursor: busy ? 'wait' : (canSave && !approved ? 'pointer' : 'not-allowed'),
          }}
        >
          {busy === 'save_draft' ? labels.facilitatorSaving : labels.facilitatorSaveDraft}
        </button>
        <button
          type="button"
          onClick={() => handleSubmit('submit')}
          disabled={!!busy || !canSave || approved}
          className="font-body"
          style={{
            ...buttonStyle,
            color: canSave && !approved ? '#24150f' : 'rgba(243,234,216,0.4)',
            backgroundColor: canSave && !approved ? '#e8b85b' : 'rgba(232,184,91,0.15)',
            opacity: busy || !canSave || approved ? 0.7 : 1,
            cursor: busy ? 'wait' : (canSave && !approved ? 'pointer' : 'not-allowed'),
          }}
        >
          {busy === 'submit' ? labels.facilitatorSubmitting : labels.facilitatorSubmit}
        </button>
      </div>

      {!canSave && (
        <p className="font-body" style={{ ...bodyText, fontSize: '0.85rem', fontStyle: 'italic', color: 'rgba(243,234,216,0.5)', marginTop: '0.85rem' }}>
          {labels.facilitatorUnavailable}
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