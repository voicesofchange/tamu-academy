import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SectionBanner from './SectionBanner';
import FrameworkCards from './FrameworkCards';
import SectionFooterNav from './SectionFooterNav';
import KiooRatingForm from './KiooRatingForm';
import KiooComparison from './KiooComparison';
import SavedIndicator from './SavedIndicator';
import { useAuth } from '@/lib/AuthContext';
import { averageRating, formatAttemptDate, loadKiooAttempts, ratingsOf, saveKiooAttempt, splitAttempts } from '@/lib/guide/kioo';
import { useGuideSection } from '@/lib/guide/useGuideSection';
import { getCachedStatus, loadProgressMap, setSectionStatus } from '@/lib/guide/guideProgress';
import { creamText, darkText } from '@/lib/guide/styles';

/**
 * KurudiSectionView — where the learner takes the same ten statements again.
 * Attempts are never overwritten: every return is kept with its date, and the
 * first reflection is shown beside the latest return.
 */
export default function KurudiSectionView({ section }) {
  const { user } = useAuth();
  const learnerId = user?.id || null;
  const { getValue, setValue, saveState } = useGuideSection(section.id);

  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [taking, setTaking] = useState(false);
  const [failed, setFailed] = useState(false);
  const [status, setStatus] = useState(() => getCachedStatus(learnerId, section.id));
  const [marking, setMarking] = useState(false);

  const refresh = useCallback(async () => {
    if (!learnerId) return;
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

  const handleSaveReturn = async (ratings, note) => {
    setSaving(true);
    setFailed(false);
    try {
      await saveKiooAttempt({ learnerId, attemptType: 'return', ratings, note });
      await refresh();
      setTaking(false);
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
  const latest = returns[0] || null;

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
        <section className="guide-card" style={{ padding: 'clamp(1.25rem, 3vw, 2rem)', marginBottom: 'clamp(2rem, 5vw, 3rem)' }}>
          <h2 className="font-guide-heading" style={{ ...creamText.heading, fontSize: 'clamp(1.2rem, 2.8vw, 1.5rem)', lineHeight: 1.3, margin: '0 0 0.6rem' }}>
            Start with the mirror
          </h2>
          <p className="font-guide-body" style={{ ...creamText.body, margin: '0 0 1.25rem' }}>
            Your first reflection in Kioo becomes the starting point this section compares against. Take it once, then come back here.
          </p>
          <Link to="/learners-guide/kioo" className="font-guide-body guide-link" style={{ fontSize: '0.85rem' }}>
            Open Kioo &rarr;
          </Link>
        </section>
      ) : (
        <>
          <section className="guide-card" style={{ padding: 'clamp(1.25rem, 3vw, 2rem)', marginBottom: '1.5rem' }}>
            <span className="font-guide-body" style={{ ...creamText.eyebrow, display: 'block', marginBottom: '0.5rem' }}>
              Your Kioo history
            </span>
            <h2 className="font-guide-heading" style={{ ...creamText.heading, fontSize: 'clamp(1.2rem, 2.8vw, 1.5rem)', lineHeight: 1.3, margin: '0 0 1.25rem' }}>
              The mirror, kept with its dates
            </h2>

            <div style={{ padding: '0.85rem 0', borderBottom: '1px solid #e7dbc4' }}>
              <span className="font-guide-body" style={{ ...creamText.body, fontWeight: 500 }}>
                First time · {formatAttemptDate(first.attempt_date)}
              </span>
              {averageRating(ratingsOf(first)) !== null && (
                <span className="font-guide-body" style={{ ...creamText.body, color: '#6b5744' }}> · average {averageRating(ratingsOf(first))}</span>
              )}
            </div>

            {returns.length === 0 ? (
              <p className="font-guide-body" style={{ ...creamText.body, margin: '1.25rem 0 0', color: '#6b5744' }}>
                You have not returned yet. Whenever you are ready, take the same ten statements again below.
              </p>
            ) : (
              returns.map((attempt) => (
                <div key={attempt.id} style={{ padding: '0.75rem 0', borderBottom: '1px solid #e7dbc4' }}>
                  <span className="font-guide-body" style={{ ...creamText.body }}>
                    Return · {formatAttemptDate(attempt.attempt_date)}
                  </span>
                  {averageRating(ratingsOf(attempt)) !== null && (
                    <span className="font-guide-body" style={{ ...creamText.body, color: '#6b5744' }}> · average {averageRating(ratingsOf(attempt))}</span>
                  )}
                </div>
              ))
            )}
          </section>

          {taking ? (
            <>
              <KiooRatingForm
                title="Return reflection"
                instructions="Answer the same ten statements as honestly as you can today. This attempt is kept with today's date."
                notePrompt={section.closingReflection?.prompt}
                submitLabel="Save this return reflection"
                submitting={saving}
                onSubmit={handleSaveReturn}
              />
              <button
                type="button"
                onClick={() => setTaking(false)}
                className="font-guide-body"
                style={{ background: 'none', border: 'none', color: '#C9961A', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', padding: 0, marginBottom: '2rem' }}
              >
                Cancel
              </button>
            </>
          ) : (
            <div style={{ marginBottom: 'clamp(2rem, 5vw, 3rem)' }}>
              <button
                type="button"
                onClick={() => setTaking(true)}
                className="font-guide-body"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: '#C9961A',
                  color: '#24150f',
                  border: 'none',
                  borderRadius: '3px',
                  padding: '0.85rem 1.5rem',
                  fontSize: '0.74rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Take the reflection again
              </button>
            </div>
          )}

          {failed && (
            <p className="font-guide-body" role="alert" style={{ ...darkText.body, color: '#f0b8a8', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              Your return reflection was not saved. Please try again.
            </p>
          )}

          {latest && <KiooComparison first={first} latest={latest} />}
        </>
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

      {section.closingReflection && (
        <section className="guide-card" style={{ padding: 'clamp(1.25rem, 3vw, 2rem)', marginBottom: 'clamp(2rem, 5vw, 3rem)', borderLeft: '4px solid #C9961A' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <span className="font-guide-body" style={{ ...creamText.eyebrow }}>
              Closing reflection
            </span>
            <SavedIndicator state={saveState} />
          </div>
          <label htmlFor="kurudi-closing" className="font-guide-heading" style={{ ...creamText.heading, fontSize: '1.1rem', display: 'block', lineHeight: 1.45, margin: '0.5rem 0 0.9rem' }}>
            {section.closingReflection.prompt}
          </label>
          <textarea
            id="kurudi-closing"
            className="guide-input"
            rows={5}
            value={getValue('closing', 'reflection', '')}
            onChange={(event) => setValue('closing', 'reflection', event.target.value)}
          />
        </section>
      )}

      <SectionFooterNav section={section} status={status} onMarkDone={markDone} busy={marking} />
    </div>
  );
}