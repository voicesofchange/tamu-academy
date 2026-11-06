import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';
import { fillTemplate } from '@/lib/i18n/fill-template';

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

const CONTENT = {
  intro: 'Answer every question, then submit once. Explanations appear only after you submit, and you can try again if you do not pass.',
  questionAria: 'Question {number}',
  correct: 'Correct',
  notThisOne: 'Not this one',
  checking: 'Checking\u2026',
  submit: 'Check my answers',
  answerAll: 'Answer every question to submit.',
  scoreLine: '{score} of {total} correct',
  passed: 'You have passed this knowledge check.',
  passNeeds: 'A pass needs {passing} of {total}. Read the explanations above and try again when you are ready.',
  tryAgain: 'Try again',
  error: 'We could not check your answers just now. Please try again.',
};

/**
 * TemplateCourseQuiz — the knowledge check of a template course module.
 *
 * The browser receives the questions without their answer keys; grading is
 * server-side in checkTemplateCourseQuiz, which returns per-question feedback
 * and, only after a full submission, the correct answer text.
 */
export default function TemplateCourseQuiz({ courseSlug, moduleRoute, quiz, onPassed }) {
  const { content: c } = useTranslatedContent('template-course-quiz', CONTENT);
  const questions = (quiz && quiz.questions) || [];
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  if (questions.length === 0) return null;

  const allAnswered = questions.every((question) => typeof answers[question.id] === 'number');

  async function handleSubmit() {
    if (!allAnswered || submitting) return;
    setSubmitting(true);
    setError(false);
    try {
      const res = await base44.functions.invoke('checkTemplateCourseQuiz', {
        courseSlug,
        moduleSlug: moduleRoute,
        answers: questions.map((question) => ({
          questionId: question.id,
          selectedIndex: answers[question.id],
        })),
      });
      const data = res && res.data ? res.data : null;
      if (!data) throw new Error('empty');
      setResult(data);
      if (data.passed && onPassed) onPassed(data);
    } catch (err) {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  }

  function handleRetry() {
    setResult(null);
    setAnswers({});
    setError(false);
  }

  const feedbackFor = (id) =>
    result && Array.isArray(result.feedback) ? result.feedback.find((item) => item.questionId === id) : null;

  return (
    <div>
      <p className="font-body" style={{ ...bodyText, marginBottom: '1.75rem' }}>
        {c.intro}
      </p>

      {questions.map((question, index) => {
        const feedback = feedbackFor(question.id);
        return (
          <div key={question.id} style={{ marginBottom: '2rem' }}>
            <p className="font-body" style={{ color: '#f8f0df', fontSize: '0.97rem', lineHeight: 1.7, fontWeight: 400, margin: '0 0 0.9rem' }}>
              {index + 1}. {question.question}
            </p>
            <div role="radiogroup" aria-label={fillTemplate(c.questionAria, { number: index + 1 })} style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              {question.options.map((option, optionIndex) => {
                const selected = answers[question.id] === optionIndex;
                return (
                  <button
                    key={optionIndex}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    disabled={!!result}
                    onClick={() => setAnswers((prev) => ({ ...prev, [question.id]: optionIndex }))}
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
                  {feedback.isCorrect ? c.correct : c.notThisOne}
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
            {submitting ? c.checking : c.submit}
          </button>
          {!allAnswered && !submitting && (
            <p className="font-body" style={{ ...bodyText, fontSize: '0.82rem', color: 'rgba(243,234,216,0.55)', margin: '0.75rem 0 0' }}>
              {c.answerAll}
            </p>
          )}
        </div>
      )}

      {result && (
        <div style={{ padding: '1.25rem 1.5rem', border: '1px solid rgba(232,184,91,0.25)', borderRadius: '4px', background: 'rgba(243,234,216,0.02)' }}>
          <p className="font-body" style={{ color: '#f8f0df', fontSize: '1rem', margin: '0 0 0.6rem', fontWeight: 500 }}>
            {fillTemplate(c.scoreLine, { score: result.score, total: result.totalQuestions })}
          </p>
          <p className="font-body" style={{ ...bodyText, margin: '0 0 1.25rem' }}>
            {result.passed
              ? c.passed
              : fillTemplate(c.passNeeds, { passing: result.passingScore, total: result.totalQuestions })}
          </p>
          {!result.passed && (
            <button type="button" onClick={handleRetry} style={submitStyle}>
              {c.tryAgain}
            </button>
          )}
        </div>
      )}

      {error && (
        <p className="font-body" role="alert" style={{ color: '#e8955c', fontSize: '0.88rem', margin: '1rem 0 0' }}>{c.error}</p>
      )}
    </div>
  );
}