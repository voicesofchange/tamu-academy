import React, { useState } from 'react';
import StatusBadge from '@/components/page/StatusBadge';

const bodyText = { color: 'rgba(245,239,224,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };

const optionBase = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '0.6rem',
  padding: '0.6rem 0.85rem',
  border: '1px solid rgba(245,239,224,0.12)',
  borderRadius: '3px',
  cursor: 'pointer',
  transition: 'border-color 0.2s, background-color 0.2s',
};

const letter = (i) => String.fromCharCode(65 + i);

/**
 * Learner-facing knowledge check.
 * Q1–Q4 are selectable (radio); Q5 is a written response.
 * Feedback is only shown after submission. The answer key itself is never
 * rendered as visible text — scoring uses indices internally. Responses are
 * held in component state only and are not persisted or sent anywhere.
 */
export default function KnowledgeCheck({ quiz }) {
  const [answers, setAnswers] = useState(() => quiz.questions.map((q) => (q.written ? '' : null)));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const passingScore = quiz.passingScore || 4;

  const setOption = (qi, oi) => {
    if (submitted) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[qi] = oi;
      return next;
    });
  };

  const setWritten = (qi, val) => {
    if (submitted) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[qi] = val;
      return next;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let s = 0;
    quiz.questions.forEach((q, qi) => {
      if (q.written) {
        if ((answers[qi] || '').trim().length >= 20) s += 1;
      } else if (answers[qi] === q.correctIndex) {
        s += 1;
      }
    });
    setScore(s);
    setSubmitted(true);
  };

  const handleRetry = () => {
    setAnswers(quiz.questions.map((q) => (q.written ? '' : null)));
    setSubmitted(false);
    setScore(0);
  };

  const allAnswered = quiz.questions.every((q, qi) =>
    q.written ? (answers[qi] || '').trim().length > 0 : answers[qi] !== null
  );

  const passed = score >= passingScore;

  return (
    <form onSubmit={handleSubmit} aria-label="Knowledge check">
      {quiz.questions.map((q, qi) => (
        <fieldset
          key={q.id}
          style={{ marginBottom: '1.75rem', border: '1px solid rgba(245,239,224,0.1)', borderRadius: '4px', padding: '1.25rem 1.4rem', margin: '0 0 1.75rem' }}
        >
          <legend className="font-body" style={{ color: '#F5EFE0', fontSize: '0.95rem', lineHeight: 1.6, fontWeight: 400, padding: '0 0.4rem' }}>
            {qi + 1}. {q.prompt}
          </legend>

          {q.written ? (
            <textarea
              value={answers[qi] || ''}
              onChange={(e) => setWritten(qi, e.target.value)}
              disabled={submitted}
              rows={6}
              aria-label={`Written response for question ${qi + 1}`}
              style={{ width: '100%', marginTop: '0.85rem', padding: '0.7rem 0.85rem', background: 'rgba(245,239,224,0.02)', color: 'rgba(245,239,224,0.85)', border: '1px solid rgba(212,161,42,0.2)', borderRadius: '3px', fontSize: '0.9rem', lineHeight: 1.7, fontFamily: 'inherit', resize: 'vertical' }}
            />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.85rem' }}>
              {q.options.map((opt, oi) => {
                const selected = answers[qi] === oi;
                const isCorrect = oi === q.correctIndex;
                const showState = submitted && (selected || isCorrect);
                let stateStyle = {};
                if (submitted && isCorrect) stateStyle = { borderColor: 'rgba(212,161,42,0.6)', backgroundColor: 'rgba(212,161,42,0.06)' };
                else if (submitted && selected && !isCorrect) stateStyle = { borderColor: 'rgba(220,120,120,0.5)', backgroundColor: 'rgba(220,120,120,0.05)' };
                return (
                  <label key={oi} style={{ ...optionBase, ...stateStyle }}>
                    <input
                      type="radio"
                      name={`q${qi}`}
                      value={oi}
                      checked={selected}
                      onChange={() => setOption(qi, oi)}
                      disabled={submitted}
                      style={{ marginTop: '0.2rem', accentColor: '#D4A12A' }}
                    />
                    <span className="font-body" style={{ ...bodyText, fontSize: '0.9rem', margin: 0 }}>
                      <strong style={{ fontWeight: 500, color: 'rgba(212,161,42,0.85)' }}>{letter(oi)}.</strong> {opt}
                      {showState && isCorrect && <span style={{ marginLeft: '0.5rem', color: 'rgba(212,161,42,0.85)' }}>&#10003;</span>}
                      {showState && selected && !isCorrect && <span style={{ marginLeft: '0.5rem', color: 'rgba(220,120,120,0.85)' }}>&#10007;</span>}
                    </span>
                  </label>
                );
              })}
            </div>
          )}

          {submitted && q.written && (
            <p className="font-body" style={{ ...bodyText, fontSize: '0.86rem', fontStyle: 'italic', marginTop: '0.85rem', marginBottom: 0 }}>
              {q.feedback}
            </p>
          )}
        </fieldset>
      ))}

      {!submitted ? (
        <button
          type="submit"
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
          Submit Knowledge Check
        </button>
      ) : (
        <div role="status" aria-live="polite" style={{ marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignItems: 'center', marginBottom: '1rem' }}>
            <StatusBadge label={`${score} / ${quiz.questions.length} correct`} />
            <StatusBadge label={passed ? 'Passed' : 'Below passing score'} />
          </div>
          <p className="font-body" style={{ ...bodyText, marginBottom: '1rem' }}>
            {passed
              ? `You met the completion requirement (${passingScore} out of ${quiz.questions.length}). Compare the feedback below with your responses.`
              : `The passing score is ${passingScore} out of ${quiz.questions.length}. Review the key concepts and try again.`}
          </p>
          <button
            type="button"
            onClick={handleRetry}
            style={{ padding: '0.7rem 1.6rem', border: '1px solid rgba(212,161,42,0.4)', borderRadius: '2px', background: 'transparent', color: '#D4A12A', fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}
          >
            Try Again
          </button>
        </div>
      )}
    </form>
  );
}