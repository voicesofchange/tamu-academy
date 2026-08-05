import React, { useState, useEffect, useRef } from 'react';
import { base44 } from '@/api/base44Client';

const bodyText = { color: 'rgba(245,239,224,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };
const eyebrowStyle = { color: '#D4A12A', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500 };
const decisionBoxStyle = { padding: '1.4rem 1.6rem', border: '1px solid rgba(212,161,42,0.22)', borderRadius: '4px', backgroundColor: 'rgba(245,239,224,0.02)', marginBottom: '1.75rem' };
const optionBase = { display: 'flex', alignItems: 'flex-start', gap: '0.85rem', padding: '0.9rem 1.15rem', border: '1px solid rgba(212,161,42,0.22)', borderRadius: '4px', marginBottom: '0.85rem', color: 'rgba(245,239,224,0.78)', fontSize: '0.95rem', cursor: 'pointer', transition: 'border-color 0.2s ease, background-color 0.2s ease' };
const optionSelected = { ...optionBase, borderColor: 'rgba(212,161,42,0.7)', backgroundColor: 'rgba(212,161,42,0.06)' };
const feedbackBoxStyle = { marginTop: '1rem', padding: '1rem 1.25rem', border: '1px solid rgba(212,161,42,0.35)', borderRadius: '4px', backgroundColor: 'rgba(245,239,224,0.02)' };
const summaryBoxStyle = { marginTop: '2rem', padding: '1.5rem 1.75rem', border: '1px solid rgba(212,161,42,0.5)', borderRadius: '4px', backgroundColor: 'rgba(212,161,42,0.04)' };
const finalMessageBoxStyle = { marginTop: '1.5rem', padding: '1.25rem 1.5rem', border: '1px solid rgba(212,161,42,0.4)', borderRadius: '4px', backgroundColor: 'rgba(245,239,224,0.03)' };
const stepContainerStyle = { display: 'flex', gap: '0.5rem', marginBottom: '1.75rem', flexWrap: 'wrap' };
const stepButtonBase = { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '2.2rem', height: '2.2rem', borderRadius: '50%', border: '1px solid rgba(212,161,42,0.22)', backgroundColor: 'transparent', color: 'rgba(245,239,224,0.5)', fontSize: '0.85rem', fontWeight: 400, cursor: 'pointer', transition: 'border-color 0.2s ease, color 0.2s ease, background-color 0.2s ease', fontFamily: 'inherit' };
const stepButtonCurrent = { ...stepButtonBase, borderColor: '#D4A12A', color: '#D4A12A', backgroundColor: 'rgba(212,161,42,0.08)' };
const stepButtonAnswered = { ...stepButtonBase, borderColor: 'rgba(212,161,42,0.5)', color: 'rgba(212,161,42,0.85)' };
const stepButtonDisabled = { ...stepButtonBase, opacity: 0.35, cursor: 'not-allowed' };
const navButtonStyle = { display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.6rem 1.2rem', border: '1px solid rgba(212,161,42,0.4)', borderRadius: '4px', backgroundColor: 'transparent', color: 'rgba(245,239,224,0.85)', fontSize: '0.9rem', fontWeight: 400, cursor: 'pointer', transition: 'border-color 0.2s ease, background-color 0.2s ease', fontFamily: 'inherit' };
const retryButtonStyle = { ...navButtonStyle, borderColor: 'rgba(232,149,28,0.6)', color: '#E8951C', marginTop: '0.75rem' };

function optionLabel(i) { return String.fromCharCode(65 + i); }

export default function MhKijaniScenario({ courseSlug, moduleSlug, scenario }) {
  const [activeStep, setActiveStep] = useState(0);
  const [selections, setSelections] = useState({});
  const [feedbacks, setFeedbacks] = useState({});
  const [pendingDecisions, setPendingDecisions] = useState({});
  const [decisionErrors, setDecisionErrors] = useState({});
  const [completed, setCompleted] = useState(false);
  const [completionPending, setCompletionPending] = useState(false);
  const [completionError, setCompletionError] = useState(false);
  const [retryTrigger, setRetryTrigger] = useState(0);

  const requestRefs = useRef({});
  const completedRef = useRef(false);
  const completionPendingRef = useRef(false);
  const lastSubmittedSignatureRef = useRef(null);

  const allAnswered = scenario.decisions.every(
    (d) => typeof selections[d.decisionId] === 'number' && feedbacks[d.decisionId],
  );

  const currentSignature = allAnswered
    ? scenario.decisions.map((d) => `${d.decisionId}:${selections[d.decisionId]}`).join('|')
    : null;

  useEffect(() => {
    if (!allAnswered || !currentSignature) return;
    if (completedRef.current && lastSubmittedSignatureRef.current === currentSignature) return;
    if (completionPendingRef.current && lastSubmittedSignatureRef.current === currentSignature) return;

    lastSubmittedSignatureRef.current = currentSignature;
    completionPendingRef.current = true;
    setCompletionPending(true);
    setCompletionError(false);

    let cancelled = false;

    (async () => {
      try {
        const res = await base44.functions.invoke('checkMentalHealthScenario', {
          courseSlug, moduleSlug, scenarioId: scenario.scenarioId, completeScenario: true,
          decisions: scenario.decisions.map((d) => ({ decisionId: d.decisionId, selectedIndex: selections[d.decisionId] })),
        });
        if (cancelled) return;
        completionPendingRef.current = false;
        setCompletionPending(false);
        const data = res && res.data ? res.data : null;
        if (data && data.completed) { completedRef.current = true; setCompleted(true); }
        else { setCompletionError(true); }
      } catch (err) {
        if (cancelled) return;
        completionPendingRef.current = false;
        setCompletionPending(false);
        setCompletionError(true);
      }
    })();

    return () => { cancelled = true; completionPendingRef.current = false; setCompletionPending(false); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feedbacks, selections, retryTrigger]);

  async function handleSelect(decisionId, optionIndex) {
    setFeedbacks((prev) => { const next = { ...prev }; delete next[decisionId]; return next; });
    setDecisionErrors((prev) => { const next = { ...prev }; delete next[decisionId]; return next; });
    completedRef.current = false; setCompleted(false); setCompletionError(false);
    setSelections((prev) => ({ ...prev, [decisionId]: optionIndex }));

    const requestId = Date.now() + Math.random();
    requestRefs.current[decisionId] = requestId;
    setPendingDecisions((prev) => ({ ...prev, [decisionId]: true }));

    try {
      const res = await base44.functions.invoke('checkMentalHealthScenario', {
        courseSlug, moduleSlug, scenarioId: scenario.scenarioId, decisionId, selectedIndex: optionIndex,
      });
      if (requestRefs.current[decisionId] !== requestId) return;
      const data = res && res.data ? res.data : null;
      if (!data) throw new Error('No payload returned');
      setFeedbacks((prev) => ({ ...prev, [decisionId]: data.feedback }));
    } catch (err) {
      if (requestRefs.current[decisionId] !== requestId) return;
      setDecisionErrors((prev) => ({ ...prev, [decisionId]: 'We could not evaluate your selection right now. Please try again.' }));
    } finally {
      if (requestRefs.current[decisionId] === requestId) {
        setPendingDecisions((prev) => { const next = { ...prev }; delete next[decisionId]; return next; });
      }
    }
  }

  function handleRetryCompletion() { setCompletionError(false); setRetryTrigger((t) => t + 1); }

  function isStepAccessible(i) {
    if (i === activeStep) return true;
    if (feedbacks[scenario.decisions[i].decisionId]) return true;
    if (i === activeStep + 1 && feedbacks[scenario.decisions[activeStep].decisionId]) return true;
    return false;
  }

  const activeDecision = scenario.decisions[activeStep];
  const activeDecisionId = activeDecision.decisionId;
  const hasFeedback = !!feedbacks[activeDecisionId];
  const isPending = !!pendingDecisions[activeDecisionId];
  const decisionError = decisionErrors[activeDecisionId];
  const isLastStep = activeStep === scenario.decisions.length - 1;

  return (
    <div>
      <p className="font-body" style={{ ...bodyText, marginBottom: '1.5rem', color: '#F5EFE0', fontWeight: 400, fontSize: '1.02rem' }}>{scenario.prompt}</p>
      <p className="font-body" style={{ ...bodyText, marginBottom: '1.5rem', fontStyle: 'italic', color: 'rgba(245,239,224,0.6)', fontSize: '0.9rem' }}>{scenario.instruction}</p>

      <ol aria-label="Scenario decision progress" style={{ ...stepContainerStyle, listStyle: 'none', padding: 0, margin: '0 0 1.75rem' }}>
        {scenario.decisions.map((d, i) => {
          const isAnswered = !!feedbacks[d.decisionId];
          const isCurrent = i === activeStep;
          const accessible = isStepAccessible(i);
          const style = !accessible ? stepButtonDisabled : isCurrent ? stepButtonCurrent : isAnswered ? stepButtonAnswered : stepButtonBase;
          return (
            <li key={d.decisionId} style={{ listStyle: 'none' }}>
              <button type="button" aria-current={isCurrent ? 'step' : undefined}
                aria-label={`Decision ${i + 1}${isAnswered ? ', answered' : ''}${isCurrent ? ', current' : ''}`}
                disabled={!accessible} onClick={() => accessible && setActiveStep(i)} style={style}>{i + 1}</button>
            </li>
          );
        })}
      </ol>

      <div style={decisionBoxStyle}>
        <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>Decision {activeStep + 1} of {scenario.decisions.length}</span>
        <h3 className="font-heading" style={{ color: '#F5EFE0', fontSize: '1.15rem', fontWeight: 400, lineHeight: 1.3, margin: '0 0 0.6rem' }}>{activeDecision.heading}</h3>
        <p className="font-body" style={{ ...bodyText, marginBottom: '1.1rem' }}>{activeDecision.prompt}</p>
        <fieldset aria-label={`Decision ${activeStep + 1}: ${activeDecision.heading}`} style={{ border: 0, padding: 0, margin: 0, minWidth: 0 }}>
          <legend className="sr-only" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>{activeDecision.prompt}</legend>
          <ul role="radiogroup" aria-label={`Decision ${activeStep + 1} response options`} style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {activeDecision.options.map((opt, i) => {
              const isSelected = selections[activeDecisionId] === i;
              return (
                <li key={i} style={{ marginBottom: '0.85rem' }}>
                  <label style={isSelected ? optionSelected : optionBase}>
                    <input type="radio" name={`m6-scenario-${activeDecisionId}`} value={i} checked={isSelected || false} disabled={isPending}
                      onChange={() => handleSelect(activeDecisionId, i)} style={{ marginTop: '0.18rem' }} aria-label={`Option ${optionLabel(i)}: ${opt}`} />
                    <span style={{ flex: 1 }}><strong style={{ color: 'rgba(212,161,42,0.85)', fontWeight: 500 }}>{optionLabel(i)}.</strong> {opt}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </fieldset>
        {isPending && <p className="font-body" style={{ ...bodyText, color: 'rgba(245,239,224,0.5)', fontSize: '0.85rem', margin: 0 }}>Loading feedback\u2026</p>}
        {hasFeedback && !isPending && (
          <div role="status" aria-live="polite" style={feedbackBoxStyle}>
            <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.45rem' }}>Feedback</span>
            <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0, color: 'rgba(245,239,224,0.7)' }}>{feedbacks[activeDecisionId]}</p>
          </div>
        )}
        {decisionError && !isPending && <p className="font-body" role="alert" style={{ color: '#e8955c', marginTop: '0.5rem', marginBottom: 0, fontSize: '0.88rem' }}>{decisionError}</p>}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {activeStep > 0 ? <button type="button" onClick={() => setActiveStep(activeStep - 1)} style={navButtonStyle}>&larr; Previous Decision</button> : <span />}
        {!isLastStep && hasFeedback && !isPending && <button type="button" onClick={() => setActiveStep(activeStep + 1)} style={navButtonStyle}>Next Decision &rarr;</button>}
      </div>

      {completionPending && !completed && !completionError && (
        <p className="font-body" role="status" aria-live="polite" style={{ ...bodyText, color: 'rgba(245,239,224,0.5)', fontSize: '0.88rem', marginBottom: '1rem' }}>Completing scenario\u2026</p>
      )}
      {completionError && (
        <div role="alert" style={{ padding: '1rem 1.25rem', border: '1px solid rgba(232,149,28,0.4)', borderRadius: '4px', backgroundColor: 'rgba(232,149,28,0.04)', marginBottom: '1.5rem' }}>
          <p className="font-body" style={{ ...bodyText, color: '#e8955c', margin: 0 }}>We could not complete your scenario right now.</p>
          <button type="button" onClick={handleRetryCompletion} style={retryButtonStyle}>Retry completion</button>
        </div>
      )}

      {completed && (
        <div role="status" aria-live="polite">
          <div style={summaryBoxStyle}>
            <h3 className="font-heading" style={{ color: '#F5EFE0', fontSize: '1.3rem', fontWeight: 400, margin: '0 0 1.25rem' }}>Your Design Summary</h3>
            {scenario.summaryHeadings.map((heading, i) => {
              const decision = scenario.decisions[i];
              const selectedIdx = selections[decision.decisionId];
              const selectedOption = decision.options[selectedIdx];
              return (
                <div key={i} style={{ marginBottom: '1.1rem' }}>
                  <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.35rem' }}>{heading}</span>
                  <p className="font-body" style={{ ...bodyText, margin: 0 }}>{selectedOption}</p>
                  {feedbacks[decision.decisionId] && (
                    <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: '0.35rem 0 0', color: 'rgba(245,239,224,0.6)', fontSize: '0.88rem' }}>{feedbacks[decision.decisionId]}</p>
                  )}
                </div>
              );
            })}
          </div>
          <div style={finalMessageBoxStyle}>
            <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>Strongest Design Feature</span>
            <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: '0 0 1rem', color: 'rgba(245,239,224,0.75)' }}>{scenario.strongestDesignFeature}</p>
            <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>Most Important Revision</span>
            <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0, color: 'rgba(245,239,224,0.75)' }}>{scenario.mostImportantRevision}</p>
          </div>
        </div>
      )}
    </div>
  );
}