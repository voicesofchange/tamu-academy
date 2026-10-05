import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';

const accent = '#e8b85b';
const cardStyle = {
  padding: '1.5rem 1.75rem',
  border: '1px solid rgba(232,184,91,0.18)',
  borderRadius: '4px',
  backgroundColor: 'rgba(243,234,216,0.015)',
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
  color: 'rgba(243,234,216,0.7)',
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
  border: '1px solid rgba(232,184,91,0.4)',
  transition: 'all 0.25s ease',
};
const btnPrimary = { ...btnBase, backgroundColor: accent, color: '#24150f', border: 'none', fontWeight: 500 };
const btnGhost = { ...btnBase, backgroundColor: 'transparent', color: '#f8f0df' };

/**
 * Shared preview-then-send control for the outreach streams. Preview always
 * runs the function in dry-run mode first, so an admin sees exactly who
 * would be written to before anything is sent.
 */
export default function OutreachSenderCard({
  label,
  heading,
  description,
  functionName,
  sendVerb,
  sentNote,
  recipientNoun = 'learner',
}) {
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(null);
  const [error, setError] = useState('');

  const plural = (n) => (n === 1 ? recipientNoun : `${recipientNoun}s`);

  const runPreview = async () => {
    setBusy('preview');
    setError('');
    setResult(null);
    try {
      const res = await base44.functions.invoke(functionName, { dry_run: true });
      setPreview(res && res.data ? res.data : null);
    } catch (e) {
      setError('Could not load recipients. Please try again.');
    } finally {
      setBusy(null);
    }
  };

  const send = async () => {
    if (!preview || preview.eligible_count === 0) return;
    const count = preview.eligible_count;
    const ok = window.confirm(
      `Send ${sendVerb} to ${count} ${plural(count)}? This cannot be undone.`
    );
    if (!ok) return;
    setBusy('send');
    setError('');
    try {
      const res = await base44.functions.invoke(functionName, { dry_run: false });
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
      <span style={labelStyle}>{label}</span>
      <h3 style={{ color: '#f8f0df', fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: '1.4rem', margin: '0 0 0.75rem' }}>
        {heading}
      </h3>
      <p style={{ ...bodyText, marginBottom: '1rem', maxWidth: '560px' }}>{description}</p>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button style={btnGhost} onClick={runPreview} disabled={!!busy}>
          {busy === 'preview' ? 'Checking…' : 'Preview recipients'}
        </button>
        <button
          style={preview && preview.eligible_count > 0 ? btnPrimary : { ...btnPrimary, opacity: 0.4, cursor: 'not-allowed' }}
          onClick={send}
          disabled={!preview || preview.eligible_count === 0 || !!busy}
        >
          {busy === 'send' ? 'Sending…' : `Send to ${preview ? preview.eligible_count : 0}`}
        </button>
      </div>

      {error && <p style={{ ...bodyText, color: '#E8951C', marginTop: '1rem' }}>{error}</p>}

      {preview && (
        <div style={{ marginTop: '1.25rem' }}>
          <p style={{ ...bodyText, marginBottom: '0.5rem' }}>
            {preview.eligible_count === 0
              ? `Nobody is due this message right now.`
              : `${preview.eligible_count} ${plural(preview.eligible_count)} will receive this message.`}
          </p>
          {preview.audience_total > preview.eligible_count && (
            <p style={{ ...bodyText, marginBottom: '0.5rem' }}>
              {preview.audience_total} are on the list altogether, so this send covers the first{' '}
              {preview.eligible_count}. Run the preview again afterwards to reach the rest.
            </p>
          )}
          {preview.sender && (
            <p style={{ ...bodyText, marginBottom: 0 }}>
              Sending from <span style={{ color: accent }}>{preview.sender}</span> as "Tex Wambui | Tamu Academy".
            </p>
          )}
          {preview.targets && preview.targets.length > 0 && (
            <ul style={{ ...bodyText, marginTop: '0.75rem', paddingLeft: '1.25rem', fontSize: '0.82rem' }}>
              {preview.targets.slice(0, 12).map((t) => (
                <li key={t.learner_id || t.email} style={{ marginBottom: '0.35rem' }}>
                  {t.name || t.email} — <span style={{ color: 'rgba(243,234,216,0.5)' }}>{t.email}</span>
                  {t.detail && (
                    <span style={{ color: 'rgba(243,234,216,0.45)', display: 'block', fontSize: '0.78rem' }}>{t.detail}</span>
                  )}
                </li>
              ))}
              {preview.targets.length > 12 && (
                <li style={{ color: 'rgba(243,234,216,0.5)', fontStyle: 'italic' }}>
                  …and {preview.targets.length - 12} more
                </li>
              )}
            </ul>
          )}
        </div>
      )}

      {result && (
        <div style={{ marginTop: '1.25rem', padding: '0.9rem 1rem', border: '1px solid rgba(232,184,91,0.25)', borderRadius: '4px' }}>
          <p style={{ ...bodyText, margin: 0 }}>
            <span style={{ color: accent, fontWeight: 500 }}>{result.sent}</span> message{result.sent === 1 ? '' : 's'} sent
            {result.failed > 0 && (
              <>, <span style={{ color: '#E8951C', fontWeight: 500 }}>{result.failed}</span> failed</>
            )}
            {result.sender ? ` from ${result.sender}` : ''}.
          </p>
          {typeof result.remaining_after === 'number' && result.remaining_after > 0 && (
            <p style={{ ...bodyText, fontSize: '0.85rem', marginTop: '0.5rem', color: accent }}>
              {result.remaining_after} still waiting. Preview again to reach them.
            </p>
          )}
          {sentNote && (
            <p style={{ ...bodyText, fontSize: '0.78rem', marginTop: '0.5rem', color: 'rgba(243,234,216,0.5)' }}>{sentNote}</p>
          )}
        </div>
      )}
    </div>
  );
}