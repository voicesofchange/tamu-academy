import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SectionBanner from './SectionBanner';
import FrameworkCards from './FrameworkCards';
import SectionFooterNav from './SectionFooterNav';
import KiooRatingForm from './KiooRatingForm';
import { useAuth } from '@/lib/AuthContext';
import { FREQUENCY_SCALE } from '@/lib/guide/sections';
import { KIOO_STATEMENTS, averageRating, formatAttemptDate, loadKiooAttempts, ratingsOf, saveKiooAttempt, splitAttempts } from '@/lib/guide/kioo';
import { getCachedStatus, loadProgressMap, setSectionStatus } from '@/lib/guide/guideProgress';
import { creamText, darkText } from '@/lib/guide/styles';

function labelFor(value) {
  const option = FREQUENCY_SCALE.find((entry) => entry.value === Number(value));
  return option ? option.label : '—';
}

/**
 * KiooSectionView — the skills reflection. The first time the learner takes it,
 * it is saved as their First time attempt with today's date. Every later
 * attempt is a Return, taken from Kurudi.
 */
export default function KiooSectionView({ section }) {
  const { user } = useAuth();
  const learnerId = user?.id || null;
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [failed, setFailed] = useState(false);
  const [status, setStatus] = useState(() => getCachedStatus(learnerId, section.id));
  const [marking, setMarking] = useState(false);

  const refresh = useCallback(async () => {
    if (!learnerId) {
      setLoading(false);
      return;
    }
    const loaded = await loadKiooAttempts(learnerId);
    setAttempts(loaded);
  }, [learnerId]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const loaded = learnerId ? await loadKiooAttempts(learnerId) : [];
        if (cancelled) return;
        setAttempts(loaded);
        if (learnerId) {
          const map = await loadProgressMap(learnerId);
          if (!cancelled) setStatus(map[section.id] || 'not_started');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [learnerId, section.id]);

  const handleSaveFirst = async (ratings, note) => {
    setSaving(true);
    setFailed(false);
    try {
      await saveKiooAttempt({ learnerId, attemptType: 'first', ratings, note });
      await refresh();
      setSectionStatus(learnerId, section.id, 'in_progress');
    } catch (error) {
      setFailed(true);
    } finally {
      setSaving(false);
    }
  };

  const markDone = async () => {
    setMarking(true);
    try {
      await setSectionStatus(learnerId, section.id, 'done');
      setStatus('done');
    } finally {
      setMarking(false);
    }
  };

  const { first, returns } = splitAttempts(attempts);
  const firstAverage = first ? averageRating(ratingsOf(first)) : null;

  return (
    <div>
      <SectionBanner section={section} />
      <FrameworkCards framework={section.framework} />

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem 0' }}>
          <div style={{ width: '1.75rem', height: '1.75rem', border: '3px solid rgba(201,150,26,0.25)', borderTopColor: '#C9961A', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      ) : !first ? (
        <>
          <KiooRatingForm
            title="Your first reflection"
            instructions="Rate how often each statement is true of you. This becomes your starting point, and it is kept with today's date."
            notePrompt={section.closingReflection?.prompt}
            submitLabel="Save my first reflection"
            submitting={saving}
            onSubmit={handleSaveFirst}
          />
          {failed && (
            <p className="font-guide-body" role="alert" style={{ ...darkText.body, color: '#f0b8a8', fontSize: '0.85rem' }}>
              Your reflection was not saved. Please try again.
            </p>
          )}
        </>
      ) : (
        <section className="guide-card" style={{ padding: 'clamp(1.25rem, 3vw, 2rem)', marginBottom: 'clamp(2rem, 5vw, 3rem)' }}>
          <span className="font-guide-body" style={{ ...creamText.eyebrow, display: 'block', marginBottom: '0.5rem' }}>
            First time · kioo cha kwanza
          </span>
          <h2 className="font-guide-heading" style={{ ...creamText.heading, fontSize: 'clamp(1.2rem, 2.8vw, 1.5rem)', lineHeight: 1.3, margin: '0 0 0.5rem' }}>
            Your first reflection is kept
          </h2>
          <p className="font-guide-body" style={{ ...creamText.body, margin: '0 0 1.5rem' }}>
            Written on {formatAttemptDate(first.attempt_date)}
            {firstAverage !== null ? ` · average ${firstAverage} of 5` : ''}
          </p>

          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {KIOO_STATEMENTS.map((statement) => (
              <li
                key={statement.id}
                style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '1px solid #e7dbc4' }}
              >
                <span className="font-guide-body" style={{ ...creamText.body, flex: '1 1 240px' }}>
                  {statement.text}
                </span>
                <span className="font-guide-body" style={{ ...creamText.body, fontWeight: 500 }}>
                  {labelFor(ratingsOf(first)[statement.id])}
                </span>
              </li>
            ))}
          </ul>

          {first.note && (
            <div style={{ marginTop: '1.5rem' }}>
              <span className="font-guide-body" style={{ ...creamText.eyebrow, display: 'block', marginBottom: '0.4rem' }}>
                Your note
              </span>
              <p className="font-guide-body" style={{ ...creamText.body, margin: 0 }}>{first.note}</p>
            </div>
          )}

          <p className="font-guide-body" style={{ ...creamText.body, margin: '1.75rem 0 0', fontSize: '0.86rem', color: '#6b5744' }}>
            {returns.length > 0
              ? `You have returned to the mirror ${returns.length} ${returns.length === 1 ? 'time' : 'times'}.`
              : 'When you are ready, return to the mirror in Kurudi and see how you have moved.'}{' '}
            <Link to="/learners-guide/kurudi" className="guide-link">Open Kurudi</Link>
          </p>
        </section>
      )}

      <section className="guide-card" style={{ padding: 'clamp(1.25rem, 3vw, 2rem)', marginBottom: '1.25rem' }}>
        <span className="font-guide-body" style={{ ...creamText.eyebrow, display: 'block', marginBottom: '0.6rem' }}>
          Key takeaways
        </span>
        <ul style={{ margin: 0, paddingLeft: '1.15rem' }}>
          {section.takeaways.map((takeaway) => (
            <li key={takeaway} className="font-guide-body" style={{ ...creamText.body, marginBottom: '0.6rem' }}>
              {takeaway}
            </li>
          ))}
        </ul>
      </section>

      <SectionFooterNav section={section} status={status} onMarkDone={markDone} busy={marking} />
    </div>
  );
}