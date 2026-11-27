import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { countStarted, loadProgressMap } from '@/lib/guide/guideProgress';
import { TOTAL_SECTIONS } from '@/lib/guide/sections';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';
import { fillTemplate } from '@/lib/i18n/fill-template';

// Visible text on this screen, translated with the rest of the page.
const UI_TEXT = {
  learnerSGuide: "Learner's Guide",
  yourLearnerSGuideContinue: "Your Learner's Guide — continue where you left off",
  safariYaUtuIsA: 'Safari ya Utu is a private companion workbook you can use alongside any course, or on its own.',
  loadingYourProgress: 'Loading your progress…',
  ofSectionsStarted: '{v0} of {v1} sections started',
};

/**
 * GuideContinueCard — the learner dashboard entry into the guide, showing how
 * many of the ten sections they have started so far.
 */
export default function GuideContinueCard() {
  const { content: uiText } = useTranslatedContent('ui-components-guide-guidecontinuecard', UI_TEXT);
  const { user } = useAuth();
  const [progressMap, setProgressMap] = useState(null);

  useEffect(() => {
    if (!user?.id) return undefined;
    let cancelled = false;
    loadProgressMap(user.id)
      .then((map) => {
        if (!cancelled) setProgressMap(map);
      })
      .catch(() => {
        if (!cancelled) setProgressMap({});
      });
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  const started = progressMap ? countStarted(progressMap) : 0;

  return (
    <Link
      to="/learners-guide"
      style={{
        display: 'block',
        padding: '1.9rem 2.15rem',
        border: '1px solid rgba(232,184,91,0.28)',
        borderRadius: '4px',
        backgroundColor: 'rgba(232,184,91,0.045)',
        textDecoration: 'none',
        marginBottom: '2.5rem',
      }}
    >
      <span className="font-body" style={{ color: '#e8b85b', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.5rem' }}>
        {uiText.learnerSGuide}
      </span>
      <h3 className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.15rem, 2.5vw, 1.5rem)', fontWeight: 400, lineHeight: 1.3, margin: '0 0 0.6rem' }}>
        {uiText.yourLearnerSGuideContinue}
      </h3>
      <p className="font-body" style={{ color: 'rgba(243,234,216,0.78)', fontSize: '0.92rem', lineHeight: 1.75, fontWeight: 300, margin: '0 0 0.6rem' }}>
        {uiText.safariYaUtuIsA}
      </p>
      <p className="font-body" style={{ color: '#e8b85b', fontSize: '0.8rem', letterSpacing: '0.04em', fontWeight: 500, margin: 0 }}>
        {progressMap ? fillTemplate(uiText.ofSectionsStarted, { v0: started, v1: TOTAL_SECTIONS }) : uiText.loadingYourProgress}
      </p>
    </Link>
  );
}