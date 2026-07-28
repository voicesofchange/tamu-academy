import React, { useState } from 'react';

const bodyText = {
  color: 'rgba(245,239,224,0.78)',
  fontSize: '0.93rem',
  lineHeight: 1.85,
  fontWeight: 300,
};

/**
 * Interactive policy / strategy choice activity. Learner selects one option
 * per decision. After all decisions are made, the learner submits to see
 * educational feedback for each selected option (likely effects and
 * limitations), without numerical scoring: this activity teaches trade-offs,
 * not correctness. Optionally renders a final strategy summary.
 *
 * Props (policyActivity):
 *   title, purpose, framing,
 *   summaryStatement,           // "No single perfect strategy" note, shown above
 *   showStrategySummary,       // true for the Lesson 6 ten-year strategy builder
 *   strategySummaryLabel,      // heading for the summary block
 *   fictionalCountry,           // optional italic line above the summary
 *   decisions: [{ id, categoryLabel, prompt, options: [{ id, label, effects, limitations }] }]
 */
export default function PolicyChoiceActivity({ policyActivity }) {
  const [selections, setSelections] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const {
    framing,
    summaryStatement,
    showStrategySummary,
    strategySummaryLabel,
    fictionalCountry,
    decisions = [],
  } = policyActivity || {};

  if (!policyActivity) return null;

  const selectChoice = (decisionId, optionId) => {
    if (submitted) return;
    setSelections((s) => ({ ...s, [decisionId]: optionId }));
  };

  const handleReset = () => {
    setSelections({});
    setSubmitted(false);
  };

  const allAnswered = decisions.length > 0 && decisions.every((d) => Boolean(selections[d.id]));

  return (
    <div>
      {framing && (
        <p className="font-body" style={{ ...bodyText, marginBottom: '1rem' }}>
          {framing}
        </p>
      )}

      {summaryStatement && (
        <div
          role="note"
          style={{
            padding: '0.85rem 1rem',
            border: '1px solid rgba(212,161,42,0.28)',
            borderRadius: '3px',
            background: 'rgba(212,161,42,0.04)',
            marginBottom: '1.5rem',
          }}
        >
          <span
            className="font-body"
            style={{
              color: 'rgba(212,161,42,0.85)',
              fontWeight: 500,
              fontSize: '0.72rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '0.4rem',
            }}
          >
            Important
          </span>
          <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0 }}>
            {summaryStatement}
          </p>
        </div>
      )}

      <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {decisions.map((d, di) => {
          const selId = selections[d.id];
          const selOption = d.options.find((o) => o.id === selId);
          const revealFeedback = submitted && Boolean(selOption);

          return (
            <li
              key={d.id}
              style={{
                marginBottom: '2rem',
                border: '1px solid rgba(245,239,224,0.1)',
                borderRadius: '4px',
                padding: '1.25rem 1.4rem',
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', alignItems: 'baseline', marginBottom: '0.9rem' }}>
                <span
                  className="font-body"
                  style={{
                    color: 'rgba(212,161,42,0.85)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                  }}
                >
                  Decision {di + 1}
                </span>
                {d.categoryLabel && (
                  <span
                    className="font-body"
                    style={{
                      color: 'rgba(245,239,224,0.55)',
                      fontSize: '0.7rem',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                    }}
                  >
                    · {d.categoryLabel}
                  </span>
                )}
              </div>

              <p
                className="font-body"
                style={{
                  color: '#F5EFE0',
                  fontSize: '0.96rem',
                  lineHeight: 1.65,
                  fontWeight: 400,
                  marginTop: 0,
                  marginBottom: '1rem',
                }}
              >
                {d.prompt}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                {d.options.map((o, oi) => {
                  const selected = selId === o.id;
                  return (
                    <label
                      key={o.id}
                      style={{
                        display: 'flex',
                        gap: '0.65rem',
                        alignItems: 'flex-start',
                        padding: '0.65rem 0.85rem',
                        border: selected ? '1px solid rgba(212,161,42,0.5)' : '1px solid rgba(245,239,224,0.12)',
                        borderRadius: '3px',
                        cursor: submitted ? 'default' : 'pointer',
                        background: selected ? 'rgba(212,161,42,0.05)' : 'transparent',
                        transition: 'border-color 0.2s, background-color 0.2s',
                      }}
                    >
                      <input
                        type="radio"
                        name={d.id}
                        value={o.id}
                        checked={selected}
                        onChange={() => selectChoice(d.id, o.id)}
                        disabled={submitted}
                        style={{ marginTop: '0.2rem', accentColor: '#D4A12A' }}
                      />
                      <span
                        className="font-body"
                        style={{ ...bodyText, fontSize: '0.9rem', margin: 0 }}
                      >
                        <strong style={{ fontWeight: 500, color: 'rgba(212,161,42,0.85)' }}>
                          {String.fromCharCode(65 + oi)}.
                        </strong>{' '}
                        {o.label}
                      </span>
                    </label>
                  );
                })}
              </div>

              {revealFeedback && (
                <div
                  role="status"
                  aria-live="polite"
                  style={{
                    marginTop: '1rem',
                    padding: '0.9rem 1.1rem',
                    border: '1px solid rgba(212,161,42,0.22)',
                    borderRadius: '3px',
                    background: 'rgba(212,161,42,0.03)',
                  }}
                >
                  <p
                    className="font-body"
                    style={{ ...bodyText, fontSize: '0.88rem', margin: '0 0 0.5rem' }}
                  >
                    <strong style={{ fontWeight: 500, color: 'rgba(212,161,42,0.85)' }}>
                      You selected:{' '}
                    </strong>
                    {selOption.label}
                  </p>
                  {selOption.effects && (
                    <p
                      className="font-body"
                      style={{ ...bodyText, fontSize: '0.88rem', margin: '0 0 0.5rem' }}
                    >
                      <strong style={{ fontWeight: 500, color: 'rgba(212,161,42,0.85)' }}>
                        Likely effects:{' '}
                      </strong>
                      {selOption.effects}
                    </p>
                  )}
                  {selOption.limitations && (
                    <p
                      className="font-body"
                      style={{ ...bodyText, fontSize: '0.88rem', margin: 0 }}
                    >
                      <strong style={{ fontWeight: 500, color: 'rgba(212,161,42,0.85)' }}>
                        Limitations and risks:{' '}
                      </strong>
                      {selOption.limitations}
                    </p>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ol>

      {!submitted ? (
        <button
          type="button"
          onClick={() => setSubmitted(true)}
          disabled={!allAnswered}
          style={{
            padding: '0.7rem 1.6rem',
            border: '1px solid rgba(212,161,42,0.4)',
            borderRadius: '2px',
            background: allAnswered ? 'rgba(212,161,42,0.08)' : 'transparent',
            color: allAnswered ? '#D4A12A' : 'rgba(245,239,224,0.35)',
            fontSize: '0.72rem',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            fontWeight: 500,
            cursor: allAnswered ? 'pointer' : 'not-allowed',
            fontFamily: 'inherit',
          }}
        >
          Review Policy Feedback
        </button>
      ) : (
        <>
          {showStrategySummary && (
            <div
              role="region"
              aria-label={strategySummaryLabel || 'Strategy summary'}
              style={{
                marginTop: '1.5rem',
                padding: '1.1rem 1.3rem',
                border: '1px solid rgba(212,161,42,0.3)',
                borderRadius: '4px',
                background: 'rgba(245,239,224,0.02)',
              }}
            >
              <span
                style={{
                  color: 'rgba(212,161,42,0.85)',
                  fontSize: '0.66rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  display: 'block',
                  marginBottom: '0.4rem',
                }}
              >
                {strategySummaryLabel || 'Strategy summary'}
              </span>
              {fictionalCountry && (
                <p
                  className="font-body"
                  style={{ ...bodyText, fontStyle: 'italic', marginBottom: '0.85rem' }}
                >
                  {fictionalCountry}
                </p>
              )}
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {decisions.map((d) => {
                  const sel = d.options.find((o) => o.id === selections[d.id]);
                  return (
                    <li key={d.id} style={{ marginBottom: '0.55rem', paddingLeft: '0.4rem' }}>
                      <span className="font-body" style={{ ...bodyText, fontSize: '0.88rem' }}>
                        <strong style={{ fontWeight: 500, color: 'rgba(212,161,42,0.85)' }}>
                          {d.categoryLabel || d.prompt}:{' '}
                        </strong>
                        {sel ? sel.label : 'No selection'}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <p
                className="font-body"
                style={{
                  color: 'rgba(245,239,224,0.6)',
                  fontSize: '0.85rem',
                  fontStyle: 'italic',
                  marginTop: '0.85rem',
                  marginBottom: 0,
                }}
              >
                No combination of choices above is the perfect strategy. Each combination reflects priorities and accepts
                trade-offs about who benefits, who carries the risk, and what limits public resources impose. Compare your
                summary with the other possible combinations to identify what your strategy emphasizes and what it sacrifices.
              </p>
            </div>
          )}
          <button
            type="button"
            onClick={handleReset}
            style={{
              marginTop: '1rem',
              padding: '0.65rem 1.4rem',
              border: '1px solid rgba(212,161,42,0.4)',
              borderRadius: '2px',
              background: 'transparent',
              color: '#D4A12A',
              fontSize: '0.72rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              fontWeight: 500,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            Start Over
          </button>
        </>
      )}
    </div>
  );
}