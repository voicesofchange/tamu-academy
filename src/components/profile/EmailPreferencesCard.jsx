import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

const CONTENT = {
  intro:
    'Tamu Academy sends occasional reminders, check-ins, course follow-ups and announcements. Your welcome email and your certificates are not affected and always arrive.',
  activeLabel: 'Reminder emails are on',
  stoppedLabel: 'Reminder emails are stopped',
  activeNote: 'You can stop them here at any time, or from the link at the bottom of any email we send you.',
  stoppedNote: 'You will still receive your welcome email and every certificate you earn.',
  stopAction: 'Stop these emails',
  resumeAction: 'Start these emails again',
  loading: 'Checking your setting…',
  loadError: 'We could not load this setting just now. Please try again.',
  saveError: 'We could not save that change. Please try again.',
  working: 'Saving…',
};

export default function EmailPreferencesCard() {
  const { content: c } = useTranslatedContent('email-preferences-card', CONTENT);
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await base44.functions.invoke('manageEmailPreferences', { action: 'status' });
        if (!cancelled) setStatus(res.data?.status === 'stopped' ? 'stopped' : 'active');
      } catch {
        if (!cancelled) setError('load');
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const change = async () => {
    setBusy(true);
    setError('');
    try {
      const action = status === 'stopped' ? 'resume' : 'stop';
      const res = await base44.functions.invoke('manageEmailPreferences', { action });
      setStatus(res.data?.status === 'stopped' ? 'stopped' : 'active');
    } catch {
      setError('save');
    } finally {
      setBusy(false);
    }
  };

  const isStopped = status === 'stopped';

  return (
    <div
      style={{
        maxWidth: '640px',
        border: '1px solid rgba(232,184,91,0.22)',
        borderRadius: '3px',
        backgroundColor: 'rgba(243,234,216,0.02)',
        padding: '1.4rem 1.5rem',
      }}
    >
      <p
        className="font-body"
        style={{ color: 'rgba(243,234,216,0.7)', fontSize: '0.93rem', lineHeight: 1.8, fontWeight: 300, marginBottom: '1.2rem' }}
      >
        {c.intro}
      </p>

      {status === null && !error && (
        <p className="font-body" style={{ color: 'rgba(243,234,216,0.55)', fontSize: '0.88rem', fontWeight: 300 }}>
          {c.loading}
        </p>
      )}

      {error === 'load' && (
        <p className="font-body" role="alert" style={{ color: '#e8b85b', fontSize: '0.88rem', fontWeight: 400 }}>
          {c.loadError}
        </p>
      )}

      {status !== null && (
        <>
          <p
            className="font-body"
            style={{
              color: isStopped ? '#e0a3a3' : '#b8d4a8',
              fontSize: '0.82rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontWeight: 500,
              marginBottom: '0.5rem',
            }}
          >
            {isStopped ? c.stoppedLabel : c.activeLabel}
          </p>
          <p
            className="font-body"
            style={{ color: 'rgba(243,234,216,0.62)', fontSize: '0.88rem', lineHeight: 1.75, fontWeight: 300, marginBottom: '1.1rem' }}
          >
            {isStopped ? c.stoppedNote : c.activeNote}
          </p>

          <button
            type="button"
            onClick={change}
            disabled={busy}
            className={isStopped ? 'tamu-journey-primary' : 'tamu-journey-secondary'}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.82rem',
              letterSpacing: '0.04em',
              padding: '0.65rem 1.3rem',
              borderRadius: '3px',
              cursor: busy ? 'wait' : 'pointer',
            }}
          >
            {busy ? c.working : isStopped ? c.resumeAction : c.stopAction}
          </button>

          {error === 'save' && (
            <p className="font-body" role="alert" style={{ color: '#e8b85b', fontSize: '0.85rem', fontWeight: 400, marginTop: '0.9rem' }}>
              {c.saveError}
            </p>
          )}
        </>
      )}
    </div>
  );
}