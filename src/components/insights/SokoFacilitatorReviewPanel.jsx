import React, { useState, useEffect, useCallback } from 'react';
import { base44 } from '@/api/base44Client';

const bodyText = { color: 'rgba(243,234,216,0.7)', fontSize: '0.9rem', lineHeight: 1.7, fontWeight: 300 };
const cardStyle = { padding: '1.5rem 1.75rem', border: '1px solid rgba(232,184,91,0.18)', borderRadius: '4px', backgroundColor: 'rgba(243,234,216,0.015)' };

const inputStyle = {
  width: '100%',
  padding: '0.55rem 0.7rem',
  background: 'rgba(243,234,216,0.02)',
  color: 'rgba(243,234,216,0.88)',
  border: '1px solid rgba(232,184,91,0.22)',
  borderRadius: '2px',
  fontSize: '0.82rem',
  fontFamily: 'inherit',
};

const buttonBase = {
  border: '1px solid rgba(232,184,91,0.4)',
  background: 'rgba(232,184,91,0.08)',
  color: '#e8b85b',
  padding: '0.45rem 1rem',
  fontSize: '0.7rem',
  fontWeight: 500,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  borderRadius: '2px',
  cursor: 'pointer',
  fontFamily: 'inherit',
};

const STATUS_LABELS = {
  draft: 'Draft',
  submitted: 'Awaiting review',
  approved: 'Approved',
  returned: 'Returned',
};

/**
 * SokoFacilitatorReviewPanel — the admin queue for Peer Facilitator
 * vendor-circle records. A learner cannot complete the Peer Facilitator
 * track until a reviewer approves their record, so this is where that
 * decision is made.
 */
export default function SokoFacilitatorReviewPanel() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [openId, setOpenId] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  const load = useCallback(async () => {
    try {
      const res = await base44.functions.invoke('manageSokoFacilitatorReview', { action: 'list' });
      setSubmissions(res?.data?.submissions || []);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleDecision(submissionId, decision) {
    if (saving) return;
    setSaving(true);
    setMessage(null);
    try {
      await base44.functions.invoke('manageSokoFacilitatorReview', {
        action: 'review',
        submissionId,
        decision,
        feedback,
      });
      setMessage({ type: 'success', text: decision === 'approve' ? 'Submission approved.' : 'Submission returned for revision.' });
      setOpenId(null);
      setFeedback('');
      await load();
    } catch (err) {
      setMessage({ type: 'error', text: err?.response?.data?.message || 'We could not record that decision right now.' });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div style={cardStyle}>
        <p className="font-body" style={{ ...bodyText, margin: 0, fontStyle: 'italic' }}>Loading vendor-circle records…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={cardStyle}>
        <p className="font-body" style={{ ...bodyText, margin: 0 }}>Vendor-circle records could not be loaded.</p>
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <div style={cardStyle}>
        <p className="font-body" style={{ ...bodyText, margin: 0, fontStyle: 'italic' }}>
          No vendor-circle records have been submitted yet. Peer Facilitator submissions appear here for review.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {submissions.map((s) => {
          const pending = s.status === 'submitted';
          return (
            <div key={s.id} style={{ ...cardStyle, borderColor: pending ? 'rgba(232,184,91,0.4)' : 'rgba(243,234,216,0.12)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                <div style={{ flex: 1, minWidth: '220px' }}>
                  <h3 className="font-heading" style={{ color: '#f8f0df', fontSize: '1.05rem', fontWeight: 400, margin: '0 0 0.35rem' }}>
                    {s.learnerName}
                  </h3>
                  <p className="font-body" style={{ ...bodyText, margin: 0, fontSize: '0.85rem', color: pending ? '#e8b85b' : 'rgba(243,234,216,0.7)' }}>
                    {STATUS_LABELS[s.status] || s.status}
                    {s.submittedAt ? ` · submitted ${new Date(s.submittedAt).toLocaleDateString()}` : ''}
                    {s.consentConfirmed ? ' · consent confirmed' : ''}
                  </p>
                </div>
                <button type="button" onClick={() => { setOpenId(openId === s.id ? null : s.id); setFeedback(s.reviewerFeedback || ''); setMessage(null); }} style={buttonBase}>
                  {openId === s.id ? 'Close' : 'Open record'}
                </button>
              </div>

              {openId === s.id && (
                <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(232,184,91,0.15)' }}>
                  {[
                    ['Session plan', s.sessionPlan],
                    ['Discussion summary', s.discussionSummary],
                    ['Facilitator reflection', s.reflection],
                  ].map(([label, value]) => (
                    <div key={label} style={{ marginBottom: '1.25rem' }}>
                      <span className="font-body" style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#e8b85b', marginBottom: '0.35rem' }}>
                        {label}
                      </span>
                      <p className="font-body" style={{ ...bodyText, margin: 0, whiteSpace: 'pre-wrap' }}>
                        {value || <em style={{ color: 'rgba(243,234,216,0.45)' }}>Not provided</em>}
                      </p>
                    </div>
                  ))}

                  <label htmlFor={`feedback-${s.id}`} className="font-body" style={{ display: 'block', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#e8b85b', marginBottom: '0.3rem' }}>
                    Feedback to the learner
                  </label>
                  <textarea
                    id={`feedback-${s.id}`}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={3}
                    placeholder="Required when returning a record for revision."
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                  <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.85rem', flexWrap: 'wrap' }}>
                    <button type="button" onClick={() => handleDecision(s.id, 'approve')} disabled={saving} style={buttonBase}>
                      {saving ? 'Saving…' : 'Approve'}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDecision(s.id, 'return')}
                      disabled={saving}
                      style={{ ...buttonBase, borderColor: 'rgba(232,149,92,0.4)', color: '#e8955c', background: 'transparent' }}
                    >
                      Return for revision
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {message && (
        <p
          className="font-body"
          role="alert"
          style={{ ...bodyText, marginTop: '1.25rem', marginBottom: 0, color: message.type === 'success' ? '#e8b85b' : '#e8955c' }}
        >
          {message.text}
        </p>
      )}
    </div>
  );
}