import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageMeta from '@/components/seo/PageMeta';
import PageLayout from '@/components/page/PageLayout';
import PageHero from '@/components/page/PageHero';
import PageSection from '@/components/page/PageSection';
import { base44 } from '@/api/base44Client';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

const CONTENT = {
  eyebrow: 'Email Preferences',
  heading: 'You are in control of these emails.',
  subheading:
    'Tamu Academy sends occasional reminders, check-ins, course follow-ups and announcements. You can stop them here at any time. Your welcome email and your certificates always arrive.',
  loading: 'Reading your setting…',
  working: 'Saving…',
  stoppedHeading: 'These emails are stopped.',
  stoppedBody:
    'You will no longer receive reminders, check-ins, course follow-ups or announcements from Tamu Academy. Your welcome email and your certificates will still arrive.',
  activeHeading: 'These emails are on.',
  activeBody:
    'You will receive occasional reminders, check-ins, course follow-ups and announcements. Your welcome email and your certificates always arrive.',
  resumeAction: 'Start these emails again',
  stopAction: 'Stop these emails',
  missingHeading: 'This link is incomplete.',
  missingBody: 'Open the link at the bottom of one of our emails to change this setting.',
  errorHeading: 'That link did not work.',
  errorBody:
    'The link may have expired. You can change this setting from your profile after signing in.',
  profileLink: 'Go to your profile',
  coursesLink: 'Back to courses',
};

const buttonStyle = {
  fontFamily: 'var(--font-body)',
  fontSize: '0.85rem',
  letterSpacing: '0.04em',
  padding: '0.7rem 1.4rem',
  borderRadius: '3px',
  cursor: 'pointer',
};

const linkStyle = {
  color: '#e8b85b',
  fontSize: '0.88rem',
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
};

export default function EmailPreferences() {
  const { content: c } = useTranslatedContent('email-preferences', CONTENT);
  const [params] = useSearchParams();
  const token = params.get('token') || '';
  const requestedAction = params.get('action') === 'stop' ? 'stop' : 'status';

  const [status, setStatus] = useState(null);
  const [state, setState] = useState(token ? 'loading' : 'missing');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!token) return undefined;
    let cancelled = false;

    const run = async () => {
      try {
        const res = await base44.functions.invoke('manageEmailPreferences', {
          token,
          action: requestedAction,
        });
        if (cancelled) return;
        setStatus(res.data?.status === 'stopped' ? 'stopped' : 'active');
        setState('ready');
      } catch {
        if (!cancelled) setState('error');
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [token, requestedAction]);

  const change = async () => {
    setBusy(true);
    try {
      const action = status === 'stopped' ? 'resume' : 'stop';
      const res = await base44.functions.invoke('manageEmailPreferences', { token, action });
      setStatus(res.data?.status === 'stopped' ? 'stopped' : 'active');
      setState('ready');
    } catch {
      setState('error');
    } finally {
      setBusy(false);
    }
  };

  const heading =
    state === 'ready'
      ? status === 'stopped'
        ? c.stoppedHeading
        : c.activeHeading
      : state === 'error'
        ? c.errorHeading
        : state === 'missing'
          ? c.missingHeading
          : c.heading;

  return (
    <PageLayout>
      <PageMeta
        title="Email Preferences — Tamu Academy"
        description="Choose whether Tamu Academy sends you reminders, check-ins and announcements."
        path="/email-preferences"
        noindex
      />
      <PageHero eyebrow={c.eyebrow} heading={c.heading} subheading={c.subheading} />

      <PageSection heading={heading} style={{ marginBottom: 0 }}>
        {state === 'loading' && (
          <p className="font-body" style={{ color: 'rgba(243,234,216,0.6)', fontSize: '0.95rem', fontWeight: 300 }}>
            {c.loading}
          </p>
        )}

        {state === 'ready' && (
          <>
            <p
              className="font-body"
              style={{ color: 'rgba(243,234,216,0.75)', fontSize: '0.95rem', lineHeight: 1.85, fontWeight: 300, maxWidth: '640px', marginBottom: '1.6rem' }}
            >
              {status === 'stopped' ? c.stoppedBody : c.activeBody}
            </p>
            <button
              type="button"
              onClick={change}
              disabled={busy}
              className={status === 'stopped' ? 'tamu-journey-primary' : 'tamu-journey-secondary'}
              style={{ ...buttonStyle, cursor: busy ? 'wait' : 'pointer' }}
            >
              {busy ? c.working : status === 'stopped' ? c.resumeAction : c.stopAction}
            </button>
          </>
        )}

        {state === 'missing' && (
          <p className="font-body" style={{ color: 'rgba(243,234,216,0.75)', fontSize: '0.95rem', lineHeight: 1.85, fontWeight: 300, maxWidth: '640px' }}>
            {c.missingBody}
          </p>
        )}

        {state === 'error' && (
          <>
            <p
              className="font-body"
              style={{ color: 'rgba(243,234,216,0.75)', fontSize: '0.95rem', lineHeight: 1.85, fontWeight: 300, maxWidth: '640px', marginBottom: '1.4rem' }}
            >
              {c.errorBody}
            </p>
            <p style={{ display: 'flex', flexWrap: 'wrap', gap: '1.4rem' }}>
              <Link to="/profile" className="font-body" style={linkStyle}>
                {c.profileLink}
              </Link>
              <Link to="/courses" className="font-body" style={linkStyle}>
                {c.coursesLink}
              </Link>
            </p>
          </>
        )}

        {state === 'missing' && (
          <p style={{ marginTop: '1.4rem' }}>
            <Link to="/courses" className="font-body" style={linkStyle}>
              {c.coursesLink}
            </Link>
          </p>
        )}
      </PageSection>
    </PageLayout>
  );
}