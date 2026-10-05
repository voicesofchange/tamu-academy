import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { WAIYAKI_COURSE_SLUG } from '@/lib/waiyaki-tracks';

const bodyText = {
  color: 'rgba(243,234,216,0.78)',
  fontSize: '0.97rem',
  lineHeight: 1.85,
  fontWeight: 300,
};

/**
 * WaiyakiAssessment — the course's final assessment.
 *
 * The five questions are served without their answer key and graded on the
 * server, so nothing here can be inspected for the answers. After submitting,
 * the learner sees their score, which questions they got right, and the
 * reasoning behind each answer. They may retake it.
 */
export default function WaiyakiAssessment({ assessment, attempt, passRequired, canSave, onGraded }) {
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  if (!assessment) return null;

  const questions = assessment.questions || [];
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === questions.length;

  async function handleSubmit() {
    if (submitting || !allAnswered) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await base44.functions.invoke('checkWaiyakiAssessment', {
        courseSlug: WAIYAKI_COURSE_SLUG,
        answers: questions.map((q) => ({
          questionId: q.id,
          selectedIndex: answers[q.id],
        })),
      });
      const data = res && res.data ? res.data : null;
      if (!data) {
        setError('We could not grade your assessment just now. Please try again.');
      } else {
        setResult(data);
        setShowForm(false);
        if (onGraded) onGraded(data);
      }
    } catch (err) {
      setError('We could not grade your assessment just now. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  const alreadyPassed = attempt && attempt.passed;

  if (result) {
    return (
      <div>
        <div
          style={{
            padding: '1.5rem 1.75rem',
            border: `1px solid ${result.passed ? 'rgba(232,184,91,0.4)' : 'rgba(232,149,92,0.4)'}`,
            borderRadius: '4px',
            backgroundColor: result.passed ? 'rgba(232,184,91,0.05)' : 'rgba(232,149,92,0.05)',
            marginBottom: '2rem',
          }}
          role="status"
        >
          <p className="font-heading" style={{ color: result.passed ? '#e8b85b' : '#e8955c', fontSize: '1.3rem', fontWeight: 400, margin: '0 0 0.4rem' }}>
            {result.passed ? 'Passed' : 'Not passed yet'}
          </p>
          <p className="font-body" style={{ ...bodyText, margin: 0 }}>
            You answered {result.score} of {result.totalQuestions} correctly. {result.passRequired} correct
            answers are needed to pass.
          </p>
        </div>

        <ol style={{ listStyle: 'none', margin: '0 0 1.75rem', padding: 0 }}>
          {questions.map((question, i) => {
            const detail = result.results.find((r) => r.questionId === question.id);
            const chosen = answers[question.id];
            return (
              <li
                key={question.id}
                style={{
                  padding: '1.25rem 0',
                  borderTop: '1px solid rgba(232,184,91,0.16)',
                }}
              >
                <p className="font-body" style={{ color: '#f8f0df', fontSize: '0.97rem', fontWeight: 500, margin: '0 0 0.6rem', lineHeight: 1.7 }}>
                  <span aria-hidden="true" style={{ color: detail && detail.correct ? '#e8b85b' : '#e8955c', marginRight: '0.5rem' }}>
                    {detail && detail.correct ? '\u2713' : '\u2715'}
                  </span>
                  {i + 1}. {question.prompt}
                </p>
                <p className="font-body" style={{ ...bodyText, fontSize: '0.9rem', margin: '0 0 0.35rem' }}>
                  Your answer: {question.options[chosen]}
                </p>
                {detail && !detail.correct && (
                  <p className="font-body" style={{ ...bodyText, fontSize: '0.9rem', margin: '0 0 0.35rem', color: '#e8b85b' }}>
                    Correct answer: {question.options[detail.correctIndex]}
                  </p>
                )}
                {detail && detail.explanation && (
                  <p className="font-body" style={{ ...bodyText, fontSize: '0.9rem', color: 'rgba(243,234,216,0.68)', margin: '0.5rem 0 0' }}>
                    {detail.explanation}
                  </p>
                )}
              </li>
            );
          })}
        </ol>

        <button
          type="button"
          onClick={() => {
            setResult(null);
            setAnswers({});
            setShowForm(true);
          }}
          className="font-body"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            color: '#e8b85b',
            backgroundColor: 'transparent',
            border: '1px solid rgba(232,184,91,0.5)',
            borderRadius: '2px',
            padding: '0.65rem 1.3rem',
            fontSize: '0.76rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Retake the assessment
        </button>
      </div>
    );
  }

  if (alreadyPassed && !showForm) {
    return (
      <div
        style={{
          padding: '1.5rem 1.75rem',
          border: '1px solid rgba(232,184,91,0.4)',
          borderRadius: '4px',
          backgroundColor: 'rgba(232,184,91,0.05)',
        }}
      >
        <p className="font-heading" style={{ color: '#e8b85b', fontSize: '1.25rem', fontWeight: 400, margin: '0 0 0.4rem' }}>
          Assessment passed
        </p>
        <p className="font-body" style={{ ...bodyText, margin: '0 0 1rem' }}>
          You answered {attempt.bestScore} of {questions.length} correctly, meeting the requirement
          of {passRequired || 4}. This requirement is complete.
        </p>
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="font-body"
          style={{
            display: 'inline-flex',
            color: '#e8b85b',
            backgroundColor: 'transparent',
            border: '1px solid rgba(232,184,91,0.5)',
            borderRadius: '2px',
            padding: '0.6rem 1.2rem',
            fontSize: '0.74rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Retake it anyway
        </button>
      </div>
    );
  }

  if (!canSave) {
    return (
      <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', color: 'rgba(243,234,216,0.6)' }}>
        Enroll in the course to take the final assessment.
      </p>
    );
  }

  return (
    <div>
      <p className="font-body" style={{ ...bodyText, color: 'rgba(243,234,216,0.68)', fontStyle: 'italic' }}>
        {assessment.intro}
      </p>

      <ol style={{ listStyle: 'none', margin: '1.75rem 0', padding: 0 }}>
        {questions.map((question, i) => (
          <li
            key={question.id}
            style={{
              padding: '1.5rem 0',
              borderTop: '1px solid rgba(232,184,91,0.16)',
            }}
          >
            <fieldset style={{ border: 'none', margin: 0, padding: 0 }}>
              <legend
                className="font-body"
                style={{
                  color: '#f8f0df',
                  fontSize: '0.97rem',
                  fontWeight: 500,
                  lineHeight: 1.7,
                  marginBottom: '0.9rem',
                  padding: 0,
                }}
              >
                {i + 1}. {question.prompt}
              </legend>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {question.options.map((option, index) => {
                  const selected = answers[question.id] === index;
                  return (
                    <label
                      key={index}
                      className="font-body"
                      style={{
                        display: 'flex',
                        gap: '0.7rem',
                        alignItems: 'flex-start',
                        padding: '0.8rem 1rem',
                        border: `1px solid ${selected ? 'rgba(232,184,91,0.55)' : 'rgba(243,234,216,0.12)'}`,
                        borderRadius: '3px',
                        backgroundColor: selected ? 'rgba(232,184,91,0.06)' : 'transparent',
                        color: selected ? '#f8f0df' : 'rgba(243,234,216,0.8)',
                        fontSize: '0.93rem',
                        lineHeight: 1.7,
                        fontWeight: 300,
                        cursor: 'pointer',
                      }}
                    >
                      <input
                        type="radio"
                        name={question.id}
                        value={index}
                        checked={selected}
                        onChange={() => setAnswers((prev) => ({ ...prev, [question.id]: index }))}
                        style={{ marginTop: '0.35rem', accentColor: '#e8b85b' }}
                      />
                      <span>{option}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </li>
        ))}
      </ol>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={submitting || !allAnswered}
          className="font-body"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            color: allAnswered ? '#24150f' : 'rgba(243,234,216,0.45)',
            backgroundColor: allAnswered ? '#e8b85b' : 'rgba(243,234,216,0.06)',
            border: allAnswered ? 'none' : '1px solid rgba(243,234,216,0.15)',
            borderRadius: '2px',
            padding: '0.8rem 1.7rem',
            fontSize: '0.78rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            fontWeight: 600,
            cursor: submitting ? 'wait' : allAnswered ? 'pointer' : 'not-allowed',
            opacity: submitting ? 0.6 : 1,
          }}
        >
          {submitting ? 'Grading...' : 'Submit assessment'}
        </button>
        <span className="font-body" style={{ ...bodyText, fontSize: '0.84rem', color: 'rgba(243,234,216,0.55)', margin: 0 }}>
          {answeredCount} of {questions.length} answered
        </span>
      </div>

      {error && (
        <p className="font-body" role="alert" style={{ color: '#e8955c', marginTop: '1rem', fontSize: '0.88rem' }}>
          {error}
        </p>
      )}
    </div>
  );
}