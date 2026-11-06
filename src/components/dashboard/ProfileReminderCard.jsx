import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import {
  hasDismissedProfileReminder,
  hasSkippedProfilePrompt,
  needsBasicProfile,
} from '@/lib/learner-profile';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

const CONTENT = {
  heading: 'Finish your profile',
  body: 'Add your country, age range and preferred language so we can shape Tamu Academy around you. Skipping this never affects your course access.',
  complete: 'Complete my profile',
  dismiss: 'Not now',
};

const linkStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  color: '#24150f',
  backgroundColor: '#e8b85b',
  fontSize: '0.72rem',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  fontWeight: 600,
  textDecoration: 'none',
  borderRadius: '2px',
  padding: '0.65rem 1.2rem',
  whiteSpace: 'nowrap',
};

const dismissStyle = {
  background: 'none',
  border: 'none',
  color: 'rgba(243,234,216,0.62)',
  fontSize: '0.78rem',
  fontWeight: 300,
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
  cursor: 'pointer',
  padding: '0.4rem 0.2rem',
};

/**
 * ProfileReminderCard — the single dashboard reminder for a learner who
 * skipped the profile prompt after their first enrollment. Dismissing it
 * records that once; it is never shown again.
 */
export default function ProfileReminderCard() {
  const { user, checkUserAuth } = useAuth();
  const { content: c } = useTranslatedContent('profile-reminder-card', CONTENT);
  const [dismissed, setDismissed] = useState(false);

  if (!user || user.role === 'admin' || dismissed) return null;
  if (!needsBasicProfile(user) || !hasSkippedProfilePrompt(user) || hasDismissedProfileReminder(user)) return null;

  async function handleDismiss() {
    setDismissed(true);
    try {
      await base44.auth.updateMe({ profile_reminder_dismissed_at: new Date().toISOString() });
      await checkUserAuth();
    } catch (_) {
      // Stays hidden for this visit even if the record could not be saved.
    }
  }

  return (
    <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '1.5rem clamp(20px, 6vw, 56px) 0' }}>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
        padding: '1.25rem 1.5rem',
        border: '1px solid rgba(232,184,91,0.3)',
        borderRadius: '3px',
        backgroundColor: 'rgba(232,184,91,0.06)',
      }}>
        <div style={{ flex: '1 1 320px' }}>
          <p className="font-heading" style={{ margin: '0 0 0.35rem', color: '#f8f0df', fontSize: '1.2rem', fontWeight: 400 }}>
            {c.heading}
          </p>
          <p className="font-body" style={{ margin: 0, color: 'rgba(243,234,216,0.7)', fontSize: '0.88rem', lineHeight: 1.7, fontWeight: 300 }}>
            {c.body}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', flexWrap: 'wrap' }}>
          <Link to="/profile" className="font-body" style={linkStyle}>
            {c.complete} &rarr;
          </Link>
          <button type="button" onClick={handleDismiss} className="font-body" style={dismissStyle}>
            {c.dismiss}
          </button>
        </div>
      </div>
    </div>
  );
}