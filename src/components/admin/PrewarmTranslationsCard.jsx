import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';

const LANGUAGES = ['sw', 'es', 'fr'];
const LANGUAGE_NAMES = 'Kiswahili, Español and Français';

/**
 * PrewarmTranslationsCard — administrator action that translates the course
 * modules, their quizzes, the automated emails and the certificate wording
 * ahead of any learner arriving, in Kiswahili, Spanish and French.
 *
 * A run stops at a time budget, so the button repeats it a few times and the
 * scheduled sweep carries on afterwards. English content is never changed and
 * a translation marked reviewed is never replaced.
 */
export default function PrewarmTranslationsCard({ onDone }) {
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleRun = async () => {
    setBusy(true);
    setError('');
    setStatus('Preparing translations…');

    let prepared = 0;
    let remaining = 0;
    let total = 0;

    try {
      for (let round = 0; round < 3; round += 1) {
        const res = await base44.functions.invoke('prewarmTranslations', { languages: LANGUAGES });
        const data = (res && res.data) || {};
        if (data.error) throw new Error(data.error);

        prepared += data.modulesPrepared || 0;
        remaining = data.remaining || 0;
        total = data.modulesTotal || total;

        if (data.complete) break;
        setStatus(`Prepared ${prepared} of ${total} course-module translations…`);
      }

      setStatus(
        remaining === 0
          ? `All ${prepared} course-module translations are ready in ${LANGUAGE_NAMES}, with their quizzes, emails and certificates.`
          : `Prepared ${prepared} of ${total} course-module translations. The automatic sweep continues the rest every 15 minutes.`,
      );

      if (onDone) await onDone();
    } catch (err) {
      setStatus('');
      setError(err?.message || 'The preparation run could not start.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <section
      style={{
        border: '1px solid rgba(232,184,91,0.22)',
        borderRadius: '3px',
        background: 'rgba(243,234,216,0.025)',
        padding: '1.25rem 1.35rem',
        marginBottom: '1.75rem',
      }}
    >
      <h2
        className="font-body"
        style={{
          color: '#e8b85b',
          fontSize: '0.66rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          fontWeight: 500,
          margin: '0 0 0.7rem',
        }}
      >
        Ahead of time
      </h2>

      <p
        className="font-body"
        style={{ color: 'rgba(243,234,216,0.7)', fontSize: '0.88rem', lineHeight: 1.7, margin: '0 0 1rem', maxWidth: '640px' }}
      >
        Translate every course module and its quiz, the automated emails and the certificate wording
        into {LANGUAGE_NAMES} now, so no learner waits for a first-time translation. English content
        is never changed, and a translation marked reviewed is never replaced.
      </p>

      <button
        type="button"
        onClick={handleRun}
        disabled={busy}
        className="font-body"
        style={{
          background: busy ? 'rgba(232,184,91,0.4)' : '#d99b37',
          color: '#24150f',
          border: '1px solid ' + (busy ? 'rgba(232,184,91,0.4)' : '#d99b37'),
          borderRadius: '3px',
          padding: '0.55rem 1.1rem',
          fontSize: '0.82rem',
          fontWeight: 500,
          letterSpacing: '0.02em',
          cursor: busy ? 'wait' : 'pointer',
        }}
      >
        {busy ? 'Preparing translations…' : 'Prepare translations now'}
      </button>

      {status && (
        <p
          className="font-body"
          role="status"
          style={{ color: 'rgba(232,184,91,0.9)', fontSize: '0.8rem', lineHeight: 1.6, margin: '0.9rem 0 0' }}
        >
          {status}
        </p>
      )}

      {error && (
        <p
          className="font-body"
          role="alert"
          style={{ color: '#e08a6a', fontSize: '0.8rem', lineHeight: 1.6, margin: '0.9rem 0 0' }}
        >
          {error}
        </p>
      )}
    </section>
  );
}