import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';

const accent = '#D4A12A';
const cardStyle = {
  padding: '1.5rem 1.75rem',
  border: '1px solid rgba(212,161,42,0.18)',
  borderRadius: '4px',
  backgroundColor: 'rgba(245,239,224,0.015)',
};
const labelStyle = {
  color: accent,
  fontSize: '0.65rem',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  fontWeight: 500,
  display: 'block',
  marginBottom: '0.75rem',
  fontFamily: "'DM Sans', sans-serif",
};
const bodyText = {
  color: 'rgba(245,239,224,0.7)',
  fontSize: '0.9rem',
  lineHeight: 1.6,
  fontFamily: "'DM Sans', sans-serif",
  fontWeight: 300,
};
const btnBase = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '0.78rem',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  padding: '0.7rem 1.4rem',
  borderRadius: '4px',
  cursor: 'pointer',
  border: '1px solid rgba(212,161,42,0.4)',
  transition: 'all 0.25s ease',
};
const btnPrimary = { ...btnBase, backgroundColor: accent, color: '#1A130E', border: 'none', fontWeight: 500 };
const btnGhost = { ...btnBase, backgroundColor: 'transparent', color: '#F5EFE0' };

export default function FollowUpInquiries() {
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(null);
  const [error, setError] = useState('');

  const runPreview = async () => {
    setBusy('preview');
    setError('');
    setResult(null);
    try {
      const res = await base44.functions.invoke('sendContactFollowUp', { dry_run: true });
      setPreview(res && res.data ? res.data : null);
    } catch (e) {
      setError('Could not load recipients. Please try again.');
    } finally {
      setBusy(null);
    }
  };

  const sendFollowUp = async () => {
    if (!preview || preview.eligible_count === 0) return;
    const ok = window.confirm(
      `Send the "courses are live" follow-up email to ${preview.eligible_count} recipient${preview.eligible_count === 1 ? '' : 's'}?`
    );
    if (!ok) return;
    setBusy('send');
    setError('');
    try {
      const res = await base44.functions.invoke('sendContactFollowUp', { dry_run: false });
      setResult(res && res.data ? res.data : null);
      setPreview(null);
    } catch (e) {
      setError('The send failed. Please try again.');
    } finally {
      setBusy(null);
    }
  };

  return (
    <div style={cardStyle}>
      <span style={labelStyle}>Outreach</span>
      <h3 style={{ color: '#F5EFE0', fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: '1.4rem', margin: '0 0 0.75rem' }}>
        Follow up with contact inquiries
      </h3>
      <p style={{ ...bodyText, marginBottom: '1.25rem', maxWidth: '560px' }}>
        Send a short note to everyone who submitted the contact form but hasn't yet been followed up with — letting them know courses are now live and more are coming soon. Each person is emailed only once.
      </p>

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button style={btnGhost} onClick={runPreview} disabled={!!busy}>
          {busy === 'preview' ? 'Checking…' : 'Preview recipients'}
        </button>
        <button
          style={preview && preview.eligible_count > 0 ? btnPrimary : { ...btnPrimary, opacity: 0.4, cursor: 'not-allowed' }}
          onClick={sendFollowUp}
          disabled={!preview || preview.eligible_count === 0 || !!busy}
        >
          {busy === 'send' ? 'Sending…' : `Send to ${preview ? preview.eligible_count : 0}`}
        </button>
      </div>

      {error && <p style={{ ...bodyText, color: '#E8951C', marginTop: '1rem' }}>{error}</p>}

      {preview && (
        <div style={{ marginTop: '1.25rem' }}>
          <p style={{ ...bodyText, marginBottom: '0.5rem' }}>
            {preview.eligible_count} recipient{preview.eligible_count === 1 ? '' : 's'} ready:
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, maxHeight: '180px', overflowY: 'auto' }}>
            {preview.recipients.map((r, idx) => (
              <li key={idx} style={{ ...bodyText, padding: '0.25rem 0', fontSize: '0.82rem' }}>
                {r.email} <span style={{ color: 'rgba(245,239,224,0.4)' }}>· {r.inquiry_type}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {result && (
        <div style={{ marginTop: '1.25rem', padding: '0.9rem 1rem', border: '1px solid rgba(212,161,42,0.25)', borderRadius: '4px' }}>
          <p style={{ ...bodyText, margin: 0 }}>
            <span style={{ color: accent, fontWeight: 500 }}>{result.sent}</span> sent
            {result.failed > 0 && (
              <>
                , <span style={{ color: '#E8951C', fontWeight: 500 }}>{result.failed}</span> failed
              </>
            )}
            .
          </p>
          {result.failed > 0 && result.errors && result.errors.length > 0 && (
            <p style={{ ...bodyText, fontSize: '0.78rem', marginTop: '0.5rem', color: 'rgba(245,239,224,0.5)' }}>
              {result.errors.slice(0, 5).map(e => e.email).join(', ')}{result.errors.length > 5 ? '…' : ''}
            </p>
          )}
        </div>
      )}
    </div>
  );
}