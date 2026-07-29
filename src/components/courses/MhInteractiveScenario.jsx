import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';

const bodyText = {
  color: 'rgba(245,239,224,0.78)',
  fontSize: '0.97rem',
  lineHeight: 1.85,
  fontWeight: 300,
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

const optionBest = {
  ...optionBase,
  borderColor: 'rgba(212,161,42,0.85)',
  backgroundColor: 'rgba(212,161,42,0.1)',
  cursor: 'default',
};

const optionSubmittedWrong = {
  ...optionBase,
  borderColor: 'rgba(245,239,224,0.45)',
  cursor: 'default',
};

const optionDim = {
  ...optionBase,
  opacity: 0.55,
  cursor: 'default',
};

const actionButtonStyle = {
  color: '#D4A12A',
  backgroundColor: 'transparent',
  border: '1px solid rgba(212,161,42,0.45)',
  padding: '0.65rem 1.5rem',
  fontSize: '0.78rem',
  fontWeight: 500,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  borderRadius: '2px',
  cursor: 'pointer',
};

const submitButtonStyle = {
  color: '#1A130E',
  backgroundColor: '#D4A12A',
  border: 'none',
  padding: '0.7rem 1.7rem',
  fontSize: '0.82rem',
  fontWeight: 500,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  borderRadius: '2px',
  cursor: 'pointer',
};

/**
 * MhInteractiveScenario — renders the Mental Health Module 1
 * interactive "Care Without Control" scenario. The learner reads the
 * prompt, selects one response, submits, and receives the approved
 * educational feedback from the protected backend. The selection and
 * the submission live only in React component state (in-memory) —
 * they are NOT piped to any entity, browser storage, cookie, log,
 * analytics, or URL.
 *
 * The initial lesson response already carries the scenarioId, prompt,
 * options, and instruction text. The bestResponseIndex, isCorrect,
 * and feedback are released only via
 * `base44.functions.invoke('checkMentalHealthScenario', …)` AFTER the
 * learner submits a valid selection. After receiving the result, the
 * learner can press "Try a different response" to reset and submit a
 * different choice.
 */
export default function MhInteractiveScenario({ courseSlug, moduleSlug, scenario }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState(null);
  const [errorText, setErrorText] = useState(null);

  const locked = result != null || pending;

  function handleSelect(i) {
    if (locked) return;
    setSelectedIndex(i);
    setErrorText(null);
  }

  async function handleSubmit(e) {
    if (e) e.preventDefault();
    if (selectedIndex === null || pending || result != null) return;
    setPending(true);
    setErrorText(null);
    try {
      const res = await base44.functions.invoke('checkMentalHealthScenario', {
        courseSlug,
        moduleSlug,
        scenarioId: scenario.scenarioId,
        selectedIndex,
      });
      const data = res && res.data ? res.data : null;
      if (!data) throw new Error('No payload returned');
      setResult(data);
    } catch (err) {
      setErrorText('We could not evaluate your submission right now. Please try again.');
    } finally {
      setPending(false);
    }
  }

  function handleTryAgain() {
    setSelectedIndex(null);
    setResult(null);
    setErrorText(null);
  }

  return (
    <div>
      {scenario.prePromptLine && (
        <p
          className="font-body"
          style={{
            ...bodyText,
            fontStyle: 'italic',
            color: 'rgba(245,239,224,0.62)',
            marginBottom: '1rem',
          }}
        >
          {scenario.prePromptLine}
        </p>
      )}
      <p
        className="font-body"
        style={{
          ...bodyText,
          marginBottom: '1.25rem',
          color: '#F5EFE0',
          fontWeight: 400,
          fontSize: '1.05rem',
        }}
      >
        {scenario.prompt}
      </p>

      <fieldset
        aria-label="Scenario response options"
        style={{ border: 0, padding: 0, margin: 0, minWidth: 0 }}
      >
        <legend className="sr-only" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
          Select the single response you believe is best, then submit to see the approved educational feedback.
        </legend>
        <ul
          role="radiogroup"
          aria-label="Response options"
          style={{ listStyle: 'none', padding: 0, margin: 0 }}
        >
          {scenario.options.map((opt, i) => {
            const isSelected = selectedIndex === i;
            const isBest = result && i === result.bestResponseIndex;
            const wasSubmitted = result && result.submittedOptionIndex === i;
            let style = optionBase;
            if (result) {
              if (isBest) style = optionBest;
              else if (wasSubmitted) style = optionSubmittedWrong;
              else style = optionDim;
            } else if (isSelected) {
              style = optionSelected;
            }
            return (
              <li key={i} style={{ marginBottom: '0.85rem' }}>
                <label style={style}>
                  <input
                    type="radio"
                    name={`mh-scenario-${scenario.scenarioId}`}
                    value={i}
                    checked={isSelected || false}
                    disabled={locked}
                    onChange={() => handleSelect(i)}
                    style={{ marginTop: '0.18rem' }}
                    aria-label={`Option ${i + 1}: ${opt}`}
                  />
                  <span style={{ flex: 1 }}>
                    <strong style={{ color: 'rgba(212,161,42,0.85)', fontWeight: 500 }}>
                      Option {i + 1}.
                    </strong>{' '}
                    {opt}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>

        <div style={{ marginTop: '1.1rem' }}>
          {!result && (
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={selectedIndex === null || pending}
              style={{
                ...submitButtonStyle,
                cursor: selectedIndex === null || pending ? 'not-allowed' : 'pointer',
                opacity: selectedIndex === null || pending ? 0.55 : 1,
              }}
            >
              {pending ? 'Submitting…' : 'Submit response'}
            </button>
          )}
          {result && (
            <button type="button" onClick={handleTryAgain} style={actionButtonStyle}>
              Try a different response
            </button>
          )}
          {errorText && (
            <p
              className="font-body"
              role="alert"
              style={{ color: '#e8955c', marginTop: '0.9rem', marginBottom: 0, fontSize: '0.88rem' }}
            >
              {errorText}
            </p>
          )}
        </div>
      </fieldset>

      {result && (
        <div
          role="status"
          aria-live="polite"
          style={{
            marginTop: '1.5rem',
            padding: '1.25rem 1.5rem',
            border: `1px solid ${result.isCorrect ? 'rgba(212,161,42,0.5)' : 'rgba(245,239,224,0.3)'}`,
            borderRadius: '4px',
            background: 'rgba(245,239,224,0.02)',
          }}
        >
          <p
            className="font-body"
            style={{
              ...bodyText,
              margin: 0,
              marginBottom: '0.6rem',
              color: '#F5EFE0',
              fontWeight: 500,
            }}
          >
            {result.isCorrect
              ? 'You selected the best response.'
              : 'A different response is best.'}
          </p>
          <p
            className="font-body"
            style={{
              ...bodyText,
              fontStyle: 'italic',
              color: 'rgba(245,239,224,0.7)',
              margin: 0,
            }}
          >
            {result.feedback}
          </p>
        </div>
      )}

      {scenario.instructionLine && !result && (
        <p
          className="font-body"
          style={{
            ...bodyText,
            fontStyle: 'italic',
            color: 'rgba(245,239,224,0.55)',
            fontSize: '0.85rem',
            marginTop: '1.25rem',
            marginBottom: 0,
          }}
        >
          {scenario.instructionLine}
        </p>
      )}
    </div>
  );
}