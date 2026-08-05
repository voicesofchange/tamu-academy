import React, { useState, useEffect, useRef } from 'react';
import { base44 } from '@/api/base44Client';

const bodyText = {
  color: 'rgba(245,239,224,0.78)',
  fontSize: '0.97rem',
  lineHeight: 1.85,
  fontWeight: 300,
};

const eyebrowStyle = {
  color: '#D4A12A',
  fontSize: '0.6rem',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  fontWeight: 500,
};

const decisionBoxStyle = {
  padding: '1.4rem 1.6rem',
  border: '1px solid rgba(212,161,42,0.22)',
  borderRadius: '4px',
  backgroundColor: 'rgba(245,239,224,0.02)',
  marginBottom: '1.75rem',
};

const optionBase = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '0.85rem',
  padding: '0.9rem 1.15rem',
  border: '1px solid rgba(212,161,42,0.22)',
  borderRadius: '4px',
  marginBottom: '0.85rem',
  color: 'rgba(245,239,224,0.78)',
  fontSize: '0.95rem',
  cursor: 'pointer',
  transition: 'border-color 0.2s ease, background-color 0.2s ease',
};

const optionSelected = {
  ...optionBase,
  borderColor: 'rgba(212,161,42,0.7)',
  backgroundColor: 'rgba(212,161,42,0.06)',
};

const feedbackBoxStyle = {
  marginTop: '1rem',
  padding: '1rem 1.25rem',
  border: '1px solid rgba(212,161,42,0.35)',
  borderRadius: '4px',
  backgroundColor: 'rgba(245,239,224,0.02)',
};

const summaryBoxStyle = {
  marginTop: '2rem',
  padding: '1.5rem 1.75rem',
  border: '1px solid rgba(212,161,42,0.5)',
  borderRadius: '4px',
  backgroundColor: 'rgba(212,161,42,0.04)',
};

const finalMessageBoxStyle = {
  marginTop: '1.5rem',
  padding: '1.25rem 1.5rem',
  border: '1px solid rgba(212,161,42,0.4)',
  borderRadius: '4px',
  backgroundColor: 'rgba(245,239,224,0.03)',
};

function optionLabel(i) {
  return String.fromCharCode(65 + i);
}

/**
 * MhTumainiScenario — renders the Module 4 Tumaini Youth Wellness
 * five-decision sequential scenario. Each decision has three options.
 * The learner selects one option per decision and receives protected
 * educational feedback from the backend. All selections and feedback
 * live only in React component state (in-memory) — they are NOT piped
 * to any entity, browser storage, cookie, log, analytics, or URL.
 *
 * COMPLETION BEHAVIOR:
 *   1. Each decision requests only its associated protected feedback.
 *   2. Changing a selection clears the previous feedback before
 *      requesting updated feedback.
 *   3. After all five current decisions have valid feedback, the
 *      frontend automatically submits the complete five-decision set
 *      to the existing server completion path.
 *   4. The final summary does not appear until the server returns
 *      completed: true.
 *   5. A single decision response always returns progressSaved: false.
 *   6. The complete administrator preview response returns
 *      completed: true, progressSaved: false.
 *   7. Duplicate completion requests for the same completed set are
 *      prevented via a ref guard.
 *   8. Changing a decision after completion clears the completion
 *      state and causes the revised complete set to be validated.
 *   9. Selections, feedback, errors, and completion signatures remain
 *      in temporary component memory only.
 *  10. No submitted values are stored or logged.
 *  11. Only a future eligible complete scenario request may write
 *      interactive_scenario_completed_at.
 */
export default function MhTumainiScenario({ courseSlug, moduleSlug, scenario }) {
  const [selections, setSelections] = useState({});
  const [feedbacks, setFeedbacks] = useState({});
  const [pendingDecision, setPendingDecision] = useState(null);
  const [errorText, setErrorText] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [completionPending, setCompletionPending] = useState(false);
  const completionRequestedRef = useRef(false);

  async function handleSelect(decisionId, optionIndex) {
    // Clear previous feedback and completion before requesting new feedback.
    setFeedbacks((prev) => {
      const next = { ...prev };
      delete next[decisionId];
      return next;
    });
    setCompleted(false);
    completionRequestedRef.current = false;
    setErrorText(null);
    setSelections((prev) => ({ ...prev, [decisionId]: optionIndex }));
    setPendingDecision(decisionId);
    try {
      const res = await base44.functions.invoke('checkMentalHealthScenario', {
        courseSlug,
        moduleSlug,
        scenarioId: scenario.scenarioId,
        decisionId,
        selectedIndex: optionIndex,
      });
      const data = res && res.data ? res.data : null;
      if (!data) throw new Error('No payload returned');
      setFeedbacks((prev) => ({ ...prev, [decisionId]: data.feedback }));
    } catch (err) {
      setErrorText('We could not evaluate your selection right now. Please try again.');
    } finally {
      setPendingDecision(null);
    }
  }

  const allAnswered = scenario.decisions.every(
    (d) => typeof selections[d.decisionId] === 'number' && feedbacks[d.decisionId],
  );

  // Auto-submit completion when all five decisions have valid feedback.
  // Prevents duplicate requests via a ref guard. Re-validates when a
  // decision changes after completion (handleSelect resets the ref).
  useEffect(() => {
    if (!allAnswered || completed || completionPending || completionRequestedRef.current) return;
    if (pendingDecision) return;

    completionRequestedRef.current = true;
    setCompletionPending(true);

    const decisionsPayload = scenario.decisions.map((d) => ({
      decisionId: d.decisionId,
      selectedIndex: selections[d.decisionId],
    }));

    let cancelled = false;
    (async () => {
      try {
        const res = await base44.functions.invoke('checkMentalHealthScenario', {
          courseSlug,
          moduleSlug,
          scenarioId: scenario.scenarioId,
          completeScenario: true,
          decisions: decisionsPayload,
        });
        if (cancelled) return;
        const data = res && res.data ? res.data : null;
        if (data && data.completed) {
          setCompleted(true);
        } else {
          completionRequestedRef.current = false;
        }
      } catch (err) {
        if (cancelled) return;
        setErrorText('We could not complete your scenario right now. Please try again.');
        completionRequestedRef.current = false;
      } finally {
        if (!cancelled) setCompletionPending(false);
      }
    })();

    return () => { cancelled = true; };
  }, [allAnswered, completed, completionPending, pendingDecision, courseSlug, moduleSlug, scenario.scenarioId, scenario.decisions, selections]);

  return (
    <div>
      <p
        className="font-body"
        style={{
          ...bodyText,
          marginBottom: '1.5rem',
          color: '#F5EFE0',
          fontWeight: 400,
          fontSize: '1.02rem',
        }}
      >
        {scenario.prompt}
      </p>

      {scenario.decisions.map((decision, dIdx) => {
        const selectedIdx = selections[decision.decisionId];
        const feedback = feedbacks[decision.decisionId];
        const isPending = pendingDecision === decision.decisionId;
        return (
          <div key={decision.decisionId} style={decisionBoxStyle}>
            <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>
              Decision {dIdx + 1} of {scenario.decisions.length}
            </span>
            <h3
              className="font-heading"
              style={{ color: '#F5EFE0', fontSize: '1.15rem', fontWeight: 400, lineHeight: 1.3, margin: '0 0 0.6rem' }}
            >
              {decision.heading}
            </h3>
            <p className="font-body" style={{ ...bodyText, marginBottom: '1.1rem' }}>
              {decision.prompt}
            </p>
            <fieldset
              aria-label={`Decision ${dIdx + 1}: ${decision.heading}`}
              style={{ border: 0, padding: 0, margin: 0, minWidth: 0 }}
            >
              <legend className="sr-only" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
                {decision.prompt}
              </legend>
              <ul
                role="radiogroup"
                aria-label={`Decision ${dIdx + 1} response options`}
                style={{ listStyle: 'none', padding: 0, margin: 0 }}
              >
                {decision.options.map((opt, i) => {
                  const isSelected = selectedIdx === i;
                  return (
                    <li key={i} style={{ marginBottom: '0.85rem' }}>
                      <label style={isSelected ? optionSelected : optionBase}>
                        <input
                          type="radio"
                          name={`m4-scenario-${decision.decisionId}`}
                          value={i}
                          checked={isSelected || false}
                          disabled={isPending || completionPending}
                          onChange={() => handleSelect(decision.decisionId, i)}
                          style={{ marginTop: '0.18rem' }}
                          aria-label={`Option ${optionLabel(i)}: ${opt}`}
                        />
                        <span style={{ flex: 1 }}>
                          <strong style={{ color: 'rgba(212,161,42,0.85)', fontWeight: 500 }}>
                            {optionLabel(i)}.
                          </strong>{' '}
                          {opt}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </fieldset>
            {isPending && (
              <p className="font-body" style={{ ...bodyText, color: 'rgba(245,239,224,0.5)', fontSize: '0.85rem', margin: 0 }}>
                Loading feedback…
              </p>
            )}
            {feedback && !isPending && (
              <div role="status" aria-live="polite" style={feedbackBoxStyle}>
                <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.45rem' }}>
                  Feedback
                </span>
                <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0, color: 'rgba(245,239,224,0.7)' }}>
                  {feedback}
                </p>
              </div>
            )}
          </div>
        );
      })}

      {errorText && (
        <p className="font-body" role="alert" style={{ color: '#e8955c', marginTop: '0.5rem', marginBottom: '1rem', fontSize: '0.88rem' }}>
          {errorText}
        </p>
      )}

      {completionPending && (
        <p className="font-body" role="status" aria-live="polite" style={{ ...bodyText, color: 'rgba(245,239,224,0.5)', fontSize: '0.88rem', marginBottom: '1rem' }}>
          Completing scenario…
        </p>
      )}

      {completed && (
        <div role="status" aria-live="polite">
          <div style={summaryBoxStyle}>
            <h3 className="font-heading" style={{ color: '#F5EFE0', fontSize: '1.3rem', fontWeight: 400, margin: '0 0 1.25rem' }}>
              Your Design Summary
            </h3>
            {scenario.summaryHeadings.map((heading, i) => {
              const decision = scenario.decisions[i];
              const selectedIdx = selections[decision.decisionId];
              const selectedOption = decision.options[selectedIdx];
              return (
                <div key={i} style={{ marginBottom: '1.1rem' }}>
                  <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.35rem' }}>
                    {heading}
                  </span>
                  <p className="font-body" style={{ ...bodyText, margin: 0 }}>
                    {selectedOption}
                  </p>
                </div>
              );
            })}
          </div>
          <div style={finalMessageBoxStyle}>
            <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.5rem' }}>
              Final Design Message
            </span>
            <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0, color: 'rgba(245,239,224,0.75)' }}>
              {scenario.finalDesignMessage}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}