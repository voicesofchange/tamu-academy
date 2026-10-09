import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';

const bodyText = { color: 'rgba(243,234,216,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };

const optionStyle = (selected) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '0.7rem',
  width: '100%',
  textAlign: 'left',
  padding: '0.75rem 1rem',
  border: `1px solid ${selected ? '#e8b85b' : 'rgba(243,234,216,0.14)'}`,
  background: selected ? 'rgba(232,184,91,0.08)' : 'rgba(243,234,216,0.015)',
  borderRadius: '4px',
  color: selected ? '#f8f0df' : 'rgba(243,234,216,0.78)',
  fontSize: '0.92rem',
  lineHeight: 1.6,
  cursor: 'pointer',
  fontFamily: "'DM Sans', sans-serif",
});

const submitStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  color: '#24150f',
  fontSize: '0.78rem',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  fontWeight: 600,
  border: 'none',
  borderRadius: '2px',
  padding: '0.75rem 1.6rem',
  backgroundColor: '#e8b85b',
  cursor: 'pointer',
  fontFamily: "'DM Sans', sans-serif",
};

/**
 * The Concept Check step: a three-question quiz with explanations, graded
 * server-side against the protected answer key. The browser never receives
 * the correct option; it receives only whether each answer was right, the
 * explanation, and the correct answer text after a complete submission.
 */
export default function WealthConceptCheck({ quiz, courseSlug, moduleRoute, onPassed }) {
  const questions = (quiz && quiz.questions) || [];
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  if (questions.length === 0) return null;

  const allAnswered = questions.every((q) => typeof answers[q.id] === 'number');

  async function handleSubmit() {
    if (!allAnswered || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await base44.functions.invoke('checkWealthKnowledgeCheck', {
        courseSlug,
        moduleSlug: moduleRoute,
        answers: questions.map((q) => ({ questionId: q.id, selectedIndex: answers[q.id] })),
      });
      const data = res && res.data ? res.data : null;
      if (!data) throw new Error('empty');
      setResult(data);
      if (data.passed && onPassed) onPassed(data);
    } catch (err) {
      setError('We could not check your answers just now. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  function handleRetry() {
    setResult(null);
    setAnswers({});
    setError(null);
  }

  const feedbackFor = (id) => (result && Array.isArray(result.feedback) ? result.feedback.find((f) => f.questionId === id) : null);

  return (
    <div>
      <p className="font-body" style={{ ...bodyText, marginBottom: '1.75rem' }}>
        Answer all three questions, then submit once. Every question can be attempted again, and the
        explanations appear only after you submit.
      </p>

      {questions.map((question, index) => {
        const feedback = feedbackFor(question.id);
        return (
          <div key={question.id} style={{ marginBottom: '2rem' }}>
            <p className="font-body" style={{ color: '#f8f0df', fontSize: '0.97rem', lineHeight: 1.7, fontWeight: 400, margin: '0 0 0.9rem' }}>
              {index + 1}. {question.prompt}
            </p>
            <div role="radiogroup" aria-label={`Question ${index + 1}`} style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              {question.options.map((option, oi) => {
                const selected = answers[question.id] === oi;
                return (
                  <button
                    key={oi}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    disabled={!!result}
                    onClick={() => setAnswers((prev) => ({ ...prev, [question.id]: oi }))}
                    style={{ ...optionStyle(selected), opacity: result ? 0.75 : 1, cursor: result ? 'default' : 'pointer' }}
                  >
                    <span aria-hidden="true" style={{ flexShrink: 0 }}>{selected ? '\u25C9' : '\u25CB'}</span>
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>

            {feedback && (
              <div
                style={{
                  marginTop: '0.9rem',
                  padding: '0.9rem 1.1rem',
                  border: `1px solid ${feedback.isCorrect ? 'rgba(232,184,91,0.35)' : 'rgba(232,149,92,0.35)'}`,
                  borderRadius: '4px',
                  background: feedback.isCorrect ? 'rgba(232,184,91,0.06)' : 'rgba(232,149,92,0.06)',
                }}
              >
                <span className="font-body" style={{ display: 'block', color: feedback.isCorrect ? '#e8b85b' : '#e8955c', fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.5rem' }}>
                  {feedback.isCorrect ? 'Correct' : 'Not this one'}
                </span>
                <p className="font-body" style={{ ...bodyText, fontSize: '0.9rem', margin: 0 }}>{feedback.feedback}</p>
              </div>
            )}
          </div>
        );
      })}

      {!result && (
        <div>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!allAnswered || submitting}
            style={{ ...submitStyle, opacity: !allAnswered || submitting ? 0.6 : 1, cursor: !allAnswered || submitting ? 'not-allowed' : 'pointer' }}
          >
            {submitting ? 'Checking...' : 'Check my answers'}
          </button>
          {!allAnswered && !submitting && (
            <p className="font-body" style={{ ...bodyText, fontSize: '0.82rem', color: 'rgba(243,234,216,0.55)', margin: '0.75rem 0 0' }}>
              Answer all three questions to submit.
            </p>
          )}
        </div>
      )}

      {result && (
        <div style={{ padding: '1.25rem 1.5rem', border: '1px solid rgba(232,184,91,0.25)', borderRadius: '4px', background: 'rgba(243,234,216,0.02)' }}>
          <p className="font-body" style={{ color: '#f8f0df', fontSize: '1rem', margin: '0 0 0.6rem', fontWeight: 500 }}>
            {result.score} of {result.totalQuestions} correct
          </p>
          <p className="font-body" style={{ ...bodyText, margin: result.passed ? '0 0 1.25rem' : '0 0 1.25rem' }}>
            {result.passed
              ? 'You have passed this concept check.'
              : `A pass needs ${result.passingScore} of ${result.totalQuestions}. Read the explanations above and try again when you are ready.`}
          </p>
          {!result.passed && (
            <button type="button" onClick={handleRetry} style={submitStyle}>
              Try again
            </button>
          )}
        </div>
      )}

      {error && (
        <p className="font-body" role="alert" style={{ color: '#e8955c', fontSize: '0.88rem', margin: '1rem 0 0' }}>{error}</p>
      )}
    </div>
  );
}