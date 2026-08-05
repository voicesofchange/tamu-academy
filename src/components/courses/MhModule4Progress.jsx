import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

const bodyText = { color: 'rgba(245,239,224,0.78)', fontSize: '0.88rem', lineHeight: 1.7, fontWeight: 300 };

const SELF_ATTESTED_KEYS = new Set([
  'core-media-reviewed',
  'care-design-lab',
  'private-reflection',
]);

const requirementRowBase = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', padding: '0.7rem 1rem', borderRadius: '4px' };
const markButtonBase = { color: '#D4A12A', backgroundColor: 'transparent', border: '1px solid rgba(212,161,42,0.4)', padding: '0.4rem 0.9rem', fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: '2px', whiteSpace: 'nowrap' };
const completeButtonBase = { border: 'none', padding: '0.7rem 1.7rem', fontSize: '0.82rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', borderRadius: '2px' };

export default function MhModule4Progress({ courseSlug, moduleRoute, completionRequirements, progressTracking, refreshTrigger = 0 }) {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState(null);
  const [completionPending, setCompletionPending] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await base44.functions.invoke('getMentalHealthProgress', { courseSlug, moduleRoute });
        if (cancelled) return;
        const data = res && res.data ? res.data : null;
        if (data) setProgress(data);
      } catch (err) {
        // Progress fetch failed — UI stays in unavailable state
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [courseSlug, moduleRoute, refreshTrigger]);

  const allSixComplete =
    progress &&
    Array.isArray(progress.completionKeys) &&
    Array.isArray(progress.completedKeys) &&
    progress.completionKeys.every((k) => progress.completedKeys.includes(k));

  async function handleMarkComplete(key) {
    if (savingKey || !progress || !progress.eligibleToSave) return;
    setSavingKey(key);
    setStatusMessage(null);
    try {
      const res = await base44.functions.invoke('updateMentalHealthProgress', {
        courseSlug, moduleRoute, action: 'acknowledge_module4_requirement', requirementKey: key,
      });
      const data = res && res.data ? res.data : null;
      if (data && Array.isArray(data.completedKeys)) {
        setProgress((prev) => prev ? { ...prev, completedKeys: data.completedKeys } : prev);
      }
    } catch (err) {
      setStatusMessage({ type: 'error', text: progressTracking.errorMessage });
    } finally {
      setSavingKey(null);
    }
  }

  async function handleCompleteModule() {
    if (completionPending || !progress || !progress.eligibleToSave) return;
    if (!allSixComplete || progress.moduleCompleted) return;
    setCompletionPending(true);
    setStatusMessage(null);
    try {
      const res = await base44.functions.invoke('completeMentalHealthModule', { courseSlug, moduleRoute });
      const data = res && res.data ? res.data : null;
      if (data && data.completed) {
        setProgress((prev) => prev ? { ...prev, moduleCompleted: true, completedAt: data.completedAt } : prev);
        setStatusMessage({ type: 'success', text: progressTracking.completedMessage });
      } else if (data && data.missing) {
        setStatusMessage({ type: 'error', text: progressTracking.incompleteMessage });
      }
    } catch (err) {
      setStatusMessage({ type: 'error', text: progressTracking.errorMessage });
    } finally {
      setCompletionPending(false);
    }
  }

  return (
    <div style={{ marginTop: '2rem' }} aria-live="polite" role="status">
      <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', color: 'rgba(245,239,224,0.6)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
        {progressTracking.privacyNote}
      </p>
      {loading ? (
        <p className="font-body" style={{ ...bodyText, color: 'rgba(245,239,224,0.5)' }}>Loading...</p>
      ) : progress && progress.eligibleToSave ? (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {completionRequirements.items.map((item, i) => {
              const key = progress.completionKeys[i];
              const isCompleted = progress.completedKeys.includes(key);
              const isSelfAttested = SELF_ATTESTED_KEYS.has(key);
              return (
                <div key={key} style={{ ...requirementRowBase, border: `1px solid ${isCompleted ? 'rgba(212,161,42,0.4)' : 'rgba(245,239,224,0.12)'}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
                    <span style={{ color: isCompleted ? '#D4A12A' : 'rgba(245,239,224,0.4)', fontSize: '0.9rem', fontWeight: 500 }} aria-hidden="true">
                      {isCompleted ? '\u2713' : '\u25CB'}
                    </span>
                    <span className="font-body" style={{ ...bodyText, margin: 0 }}>{item}</span>
                  </div>
                  {isSelfAttested && !isCompleted && (
                    <button type="button" disabled={savingKey === key} onClick={() => handleMarkComplete(key)} className="font-body"
                      style={{ ...markButtonBase, cursor: savingKey === key ? 'wait' : 'pointer', opacity: savingKey === key ? 0.6 : 1 }}>
                      {savingKey === key ? progressTracking.savingLabel : progressTracking.markCompleteLabel}
                    </button>
                  )}
                  {isSelfAttested && isCompleted && (
                    <span className="font-body" style={{ color: '#D4A12A', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500, whiteSpace: 'nowrap' }}>
                      {progressTracking.completedLabel}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <button type="button" disabled={!allSixComplete || completionPending || progress.moduleCompleted} onClick={handleCompleteModule} className="font-body"
              style={{ ...completeButtonBase, color: allSixComplete && !completionPending && !progress.moduleCompleted ? '#1A130E' : 'rgba(245,239,224,0.4)', backgroundColor: allSixComplete && !completionPending && !progress.moduleCompleted ? '#D4A12A' : 'rgba(212,161,42,0.15)', cursor: allSixComplete && !completionPending && !progress.moduleCompleted ? 'pointer' : 'not-allowed' }}>
              {completionPending ? progressTracking.savingLabel : progressTracking.completeModuleLabel}
            </button>
          </div>
          {statusMessage && (
            <p className="font-body" role="alert" style={{ color: statusMessage.type === 'success' ? '#D4A12A' : '#e8955c', marginTop: '1rem', marginBottom: 0, fontSize: '0.88rem' }}>{statusMessage.text}</p>
          )}
          {progress.moduleCompleted && !statusMessage && (
            <p className="font-body" style={{ color: '#D4A12A', marginTop: '1rem', marginBottom: 0, fontSize: '0.9rem', fontStyle: 'italic' }}>{progressTracking.completedMessage}</p>
          )}
        </>
      ) : (
        <div style={{ padding: '1.1rem 1.35rem', border: '1px solid rgba(212,161,42,0.22)', borderRadius: '4px', backgroundColor: 'rgba(212,161,42,0.04)' }}>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0, color: 'rgba(245,239,224,0.6)', fontSize: '0.88rem' }}>{progressTracking.unavailableMessage}</p>
        </div>
      )}
    </div>
  );
}