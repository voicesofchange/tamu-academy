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

/**
 * SokoContentReviewPanel — the admin record of the content review that
 * must be completed before the Sauti za Soko pathway is published. Each
 * domain is signed off by a named reviewer with the relevant expertise.
 * Recording a sign-off here does not publish the pathway: publication
 * remains a deliberate server-side change.
 */
export default function SokoContentReviewPanel() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeDomain, setActiveDomain] = useState(null);
  const [form, setForm] = useState({ reviewerName: '', reviewerRole: '', notes: '' });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  const load = useCallback(async () => {
    try {
      const res = await base44.functions.invoke('manageSokoReview', { action: 'list' });
      setData(res?.data || null);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  function openForm(domain) {
    setActiveDomain(domain.id);
    setForm({
      reviewerName: domain.reviewerName || '',
      reviewerRole: domain.reviewerRole || '',
      notes: domain.notes || '',
    });
    setMessage(null);
  }

  async function handleSave(domainId, status) {
    if (saving) return;
    setSaving(true);
    setMessage(null);
    try {
      await base44.functions.invoke('manageSokoReview', {
        action: 'update',
        domain: domainId,
        status,
        reviewerName: form.reviewerName,
        reviewerRole: form.reviewerRole,
        notes: form.notes,
      });
      setMessage({ type: 'success', text: status === 'validated' ? 'Review recorded.' : 'Domain reopened.' });
      setActiveDomain(null);
      await load();
    } catch (err) {
      setMessage({ type: 'error', text: err?.response?.data?.message || 'We could not save the review right now.' });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div style={cardStyle}>
        <p className="font-body" style={{ ...bodyText, margin: 0, fontStyle: 'italic' }}>Loading the review record…</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div style={cardStyle}>
        <p className="font-body" style={{ ...bodyText, margin: 0 }}>The review record could not be loaded.</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ ...cardStyle, marginBottom: '1.5rem' }}>
        <p className="font-body" style={{ ...bodyText, margin: '0 0 0.75rem' }}>
          Sauti za Soko must be reviewed and validated across every domain below before it is published. Each
          sign-off records who validated the content and their relevant expertise.
        </p>
        <p className="font-body" style={{ ...bodyText, margin: 0, color: data.readyToPublish ? '#e8b85b' : 'rgba(243,234,216,0.7)' }}>
          <strong style={{ fontWeight: 500 }}>{data.validatedCount} of {data.totalDomains}</strong> domains validated.
          {data.readyToPublish
            ? ' All domains are validated. The pathway is ready to be published by a developer.'
            : ' The pathway remains unpublished until every domain is validated.'}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {data.domains.map((domain) => {
          const validated = domain.status === 'validated';
          return (
            <div key={domain.id} style={{ ...cardStyle, borderColor: validated ? 'rgba(232,184,91,0.4)' : 'rgba(243,234,216,0.12)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                <div style={{ flex: 1, minWidth: '240px' }}>
                  <h3 className="font-heading" style={{ color: '#f8f0df', fontSize: '1.05rem', fontWeight: 400, margin: '0 0 0.35rem' }}>
                    {domain.label}
                  </h3>
                  <p className="font-body" style={{ ...bodyText, margin: '0 0 0.5rem', fontSize: '0.85rem', fontStyle: 'italic' }}>
                    {domain.requirement}
                  </p>
                  {validated && (
                    <p className="font-body" style={{ ...bodyText, margin: 0, fontSize: '0.85rem', color: '#e8b85b' }}>
                      Validated by {domain.reviewerName} ({domain.reviewerRole})
                    </p>
                  )}
                  {domain.notes && (
                    <p className="font-body" style={{ ...bodyText, margin: '0.5rem 0 0', fontSize: '0.84rem' }}>
                      Notes: {domain.notes}
                    </p>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                  <button type="button" onClick={() => openForm(domain)} style={buttonBase}>
                    {validated ? 'Update' : 'Record sign-off'}
                  </button>
                  {validated && (
                    <button
                      type="button"
                      onClick={() => handleSave(domain.id, 'pending')}
                      disabled={saving}
                      style={{ ...buttonBase, borderColor: 'rgba(232,149,92,0.4)', color: '#e8955c', background: 'transparent' }}
                    >
                      Reopen
                    </button>
                  )}
                </div>
              </div>

              {activeDomain === domain.id && (
                <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(232,184,91,0.15)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div>
                      <label htmlFor={`reviewer-name-${domain.id}`} className="font-body" style={{ display: 'block', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#e8b85b', marginBottom: '0.3rem' }}>
                        Reviewer name
                      </label>
                      <input
                        id={`reviewer-name-${domain.id}`}
                        type="text"
                        value={form.reviewerName}
                        onChange={(e) => setForm((p) => ({ ...p, reviewerName: e.target.value }))}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label htmlFor={`reviewer-role-${domain.id}`} className="font-body" style={{ display: 'block', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#e8b85b', marginBottom: '0.3rem' }}>
                        Relevant expertise or role
                      </label>
                      <input
                        id={`reviewer-role-${domain.id}`}
                        type="text"
                        value={form.reviewerRole}
                        onChange={(e) => setForm((p) => ({ ...p, reviewerRole: e.target.value }))}
                        style={inputStyle}
                      />
                    </div>
                  </div>
                  <label htmlFor={`reviewer-notes-${domain.id}`} className="font-body" style={{ display: 'block', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#e8b85b', marginBottom: '0.3rem' }}>
                    Notes or required changes
                  </label>
                  <textarea
                    id={`reviewer-notes-${domain.id}`}
                    value={form.notes}
                    onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                    rows={3}
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                  <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.85rem', flexWrap: 'wrap' }}>
                    <button type="button" onClick={() => handleSave(domain.id, 'validated')} disabled={saving} style={buttonBase}>
                      {saving ? 'Saving…' : 'Record validation'}
                    </button>
                    <button
                      type="button"
                      onClick={() => { setActiveDomain(null); setMessage(null); }}
                      style={{ ...buttonBase, background: 'transparent', color: 'rgba(243,234,216,0.7)', borderColor: 'rgba(243,234,216,0.25)' }}
                    >
                      Cancel
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