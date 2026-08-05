import React, { useState } from 'react';
import StatusBadge from '@/components/page/StatusBadge';
import { base44 } from '@/api/base44Client';

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
 * Learner-facing knowledge check for Economics modules.
 *
 * TRUST MODEL:
 *   - The answer key (correctIndex) is NEVER read from the quiz object.
 *     Grading happens entirely on the server via
 *     checkEconomicsKnowledgeCheck, which grades against the protected
 *     curriculum in base44/shared/economics-curriculum.js.
 *   - The client sends only { courseSlug, moduleSlug, answers } where
 *     each answer is { questionId, selectedIndex } or
 *     { questionId, writtenResponse }.
 *   - The server returns { score, totalQuestions, passingScore, passed,
 *     feedback: [{ questionId, isCorrect, feedback, correctAnswerText? }],
 *     progressSaved }. The correct answer TEXT (not index) is released
 *     only after a complete valid submission.
 *   - Selections and the written response live in component state only
 *     and are not persisted or sent anywhere except the grading call.
 *   - On a pass, onPassed() is called so the parent progress tracker can
 *     refresh its server-verified knowledge_check_passed key.
 */
export default function KnowledgeCheck({ courseSlug, moduleRoute, quiz, onPassed }) {
  const [answers, setAnswers] = useState(() => quiz.questions.map((q) => (q.written ? '' : null)));
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState(null);
  const [validationError, setValidationError] = useState(null);
  const [serverError, setServerError] = useState(null);

  const locked = result != null || pending;
  const mcTotal = quiz.questions.filter((q) => !q.written).length;
  const passingScore = quiz.passingScore || 3;
  const hasWritten = quiz.questions.some((q) => q.written);

  function setOption(qi, oi) {
    if (locked) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[qi] = oi;
      return next;
    });
    if (validationError) setValidationError(null);
  }

  function setWritten(qi, val) {
    if (locked) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[qi] = val;
      return next;
    });
  }

  function findFeedback(questionId) {
    if (!result || !Array.isArray(result.feedback)) return null;
    return result.feedback.find((f) => f.questionId === questionId) || null;
  }

  async function handleSubmit(e) {
    if (e) e.preventDefault();
    if (locked) return;
    setServerError(null);
    setValidationError(null);

    const missing = quiz.questions.filter((q, qi) =>
      q.written ? (answers[qi] || '').trim().length === 0 : answers[qi] === null
    );
    if (missing.length > 0) {
      setValidationError(
        `Please answer all ${quiz.questions.length} questions before submitting. ${missing.length} question${missing.length > 1 ? 's are' : ' is'} still unanswered.`
      );
      return;
    }

    const answersPayload = quiz.questions.map((q, qi) => {
      if (q.written) return { questionId: q.id, writtenResponse: answers[qi] };
      return { questionId: q.id, selectedIndex: answers[qi] };
    });

    setPending(true);
    try {
      const res = await base44.functions.invoke('checkEconomicsKnowledgeCheck', {
        courseSlug,
        moduleSlug: moduleRoute,
        answers: answersPayload,
      });
      const data = res && res.data ? res.data : null;
      if (!data) throw new Error('No payload returned');
      setResult(data);
      if (data.passed && typeof onPassed === 'function') onPassed();
    } catch (err) {
      setServerError('We could not grade your responses right now. Please try again.');
    } finally {
      setPending(false);
    }
  }

  function handleRetry() {
    setAnswers((prev) => quiz.questions.map((q, qi) => (q.written ? prev[qi] : null)));
    setResult(null);
    setValidationError(null);
    setServerError(null);
  }

  const allAnswered = quiz.questions.every((q, qi) =>
    q.written ? (answers[qi] || '').trim().length > 0 : answers[qi] !== null
  );

  return (
    <form onSubmit={handleSubmit} aria-label="Knowledge check">
      {quiz.questions.map((q, qi) => {
        const fb = findFeedback(q.id);
        return (
          <fieldset
            key={q.id}
            style={{ marginBottom: '1.75rem', border: '1px solid rgba(245,239,224,0.1)', borderRadius: '4px', padding: '1.25rem 1.4rem', margin: '0 0 1.75rem' }}
          >
            <legend className="font-body" style={{ color: '#F5EFE0', fontSize: '0.95rem', lineHeight: 1.6, fontWeight: 400, padding: '0 0.4rem' }}>
              {qi + 1}. {q.prompt}
            </legend>

            {q.written ? (
              <>
                <textarea
                  value={answers[qi] || ''}
                  onChange={(e) => setWritten(qi, e.target.value)}
                  disabled={locked}
                  rows={6}
                  aria-label={`Written response for question ${qi + 1}`}
                  style={{ width: '100%', marginTop: '0.85rem', padding: '0.7rem 0.85rem', background: 'rgba(245,239,224,0.02)', color: 'rgba(245,239,224,0.85)', border: '1px solid rgba(212,161,42,0.2)', borderRadius: '3px', fontSize: '0.9rem', lineHeight: 1.7, fontFamily: 'inherit', resize: 'vertical' }}
                />
                {fb && (
                  <p className="font-body" style={{ ...bodyText, fontSize: '0.86rem', fontStyle: 'italic', marginTop: '0.85rem', marginBottom: 0, color: 'rgba(245,239,224,0.7)' }}>
                    {fb.feedback}
                  </p>
                )}
              </>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.85rem' }}>
                {q.options.map((opt, oi) => {
                  const selected = answers[qi] === oi;
                  let stateStyle = {};
                  if (result && fb) {
                    const isCorrectOption = fb.isCorrect && selected;
                    const isWrongOption = selected && !fb.isCorrect;
                    if (isCorrectOption) stateStyle = { borderColor: 'rgba(212,161,42,0.6)', backgroundColor: 'rgba(212,161,42,0.06)' };
                    else if (isWrongOption) stateStyle = { borderColor: 'rgba(220,120,120,0.5)', backgroundColor: 'rgba(220,120,120,0.05)' };
                    else stateStyle = { opacity: 0.6 };
                  } else if (selected) {
                    stateStyle = { borderColor: 'rgba(212,161,42,0.7)', backgroundColor: 'rgba(212,161,42,0.06)' };
                  }
                  return (
                    <label key={oi} style={{ ...optionBase, ...stateStyle }}>
                      <input
                        type="radio"
                        name={`q${qi}`}
                        value={oi}
                        checked={selected}
                        onChange={() => setOption(qi, oi)}
                        disabled={locked}
                        style={{ marginTop: '0.2rem', accentColor: '#D4A12A' }}
                      />
                      <span className="font-body" style={{ ...bodyText, fontSize: '0.9rem', margin: 0 }}>
                        <strong style={{ fontWeight: 500, color: 'rgba(212,161,42,0.85)' }}>{letter(oi)}.</strong> {opt}
                        {result && fb && fb.isCorrect && selected && <span style={{ marginLeft: '0.5rem', color: 'rgba(212,161,42,0.85)' }}>&#10003;</span>}
                        {result && fb && selected && !fb.isCorrect && <span style={{ marginLeft: '0.5rem', color: 'rgba(220,120,120,0.85)' }}>&#10007;</span>}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}

            {result && fb && !q.written && (
              <div role="status" style={{ marginTop: '0.85rem', padding: '0.85rem 1rem', border: `1px solid ${fb.isCorrect ? 'rgba(212,161,42,0.4)' : 'rgba(245,239,224,0.25)'}`, borderRadius: '3px', backgroundColor: 'rgba(245,239,224,0.02)' }}>
                <p className="font-body" style={{ ...bodyText, margin: '0 0 0.4rem', color: fb.isCorrect ? '#D4A12A' : '#e8955c', fontWeight: 500 }}>
                  {fb.isCorrect ? 'Correct' : 'Reconsider'}
                </p>
                <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: '0 0 0.35rem', color: 'rgba(245,239,224,0.7)', fontSize: '0.88rem' }}>
                  {fb.feedback}
                </p>
                {!fb.isCorrect && fb.correctAnswerText && (
                  <p className="font-body" style={{ ...bodyText, margin: 0, color: 'rgba(212,161,42,0.8)', fontSize: '0.86rem' }}>
                    Correct answer: {fb.correctAnswerText}
                  </p>
                )}
              </div>
            )}
          </fieldset>
        );
      })}

      {!result ? (
        <button
          type="submit"
          disabled={pending || !allAnswered}
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
            cursor: pending ? 'wait' : allAnswered ? 'pointer' : 'not-allowed',
            fontFamily: 'inherit',
            opacity: pending ? 0.7 : 1,
          }}
        >
          {pending ? 'Grading…' : 'Submit Knowledge Check'}
        </button>
      ) : (
        <div role="status" aria-live="polite" style={{ marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignItems: 'center', marginBottom: '1rem' }}>
            <StatusBadge label={hasWritten ? `${result.score} of ${mcTotal} graded correct` : `${result.score} of ${mcTotal} correct`} />
            {hasWritten && (
              <StatusBadge label="Question 5 completed" />
            )}
            <StatusBadge label={result.passed ? 'Passing' : 'Below passing threshold'} />
          </div>
          <p className="font-body" style={{ ...bodyText, marginBottom: '1rem' }}>
            {result.passed
              ? (hasWritten
                ? `You met the completion requirement: at least ${passingScore} of ${mcTotal} graded questions correct and a completed written response. Review the feedback below.`
                : `You met the completion requirement: at least ${passingScore} of the ${mcTotal} questions correct. Review the feedback below.`)
              : (hasWritten
                ? `You answered ${result.score} of ${mcTotal} graded questions correctly. Answer at least four of the five questions correctly to pass. You can retry; your written response will be kept.`
                : `You answered ${result.score} of ${mcTotal} questions correctly. Answer at least four of the five questions correctly to pass. You can retry.`)}
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

      {validationError && (
        <p className="font-body" role="alert" style={{ color: '#e8955c', marginTop: '1rem', marginBottom: 0, fontSize: '0.88rem' }}>
          {validationError}
        </p>
      )}
      {serverError && (
        <p className="font-body" role="alert" style={{ color: '#e8955c', marginTop: '1rem', marginBottom: 0, fontSize: '0.88rem' }}>
          {serverError}
        </p>
      )}
    </form>
  );
}