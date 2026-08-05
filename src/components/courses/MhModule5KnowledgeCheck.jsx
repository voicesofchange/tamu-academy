import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';

const bodyText = { color: 'rgba(245,239,224,0.78)', fontSize: '0.95rem', lineHeight: 1.7, fontWeight: 300 };
const eyebrowStyle = { color: '#D4A12A', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500 };
const privacyBoxStyle = { padding: '1.1rem 1.35rem', border: '1px solid rgba(212,161,42,0.28)', borderRadius: '4px', backgroundColor: 'rgba(212,161,42,0.05)', marginBottom: '1.4rem' };
const questionCardStyle = { padding: '1.2rem 1.4rem', border: '1px solid rgba(212,161,42,0.18)', borderRadius: '4px', marginBottom: '1.3rem' };
const optionBase = { display: 'flex', alignItems: 'flex-start', gap: '0.85rem', padding: '0.85rem 1.1rem', border: '1px solid rgba(212,161,42,0.22)', borderRadius: '4px', marginBottom: '0.65rem', color: 'rgba(245,239,224,0.78)', fontSize: '0.93rem', cursor: 'pointer', transition: 'border-color 0.2s ease, background-color 0.2s ease' };
const optionSelectedStyle = { ...optionBase, borderColor: 'rgba(212,161,42,0.7)', backgroundColor: 'rgba(212,161,42,0.06)' };
const optionCorrectStyle = { ...optionBase, borderColor: 'rgba(212,161,42,0.85)', backgroundColor: 'rgba(212,161,42,0.10)', cursor: 'default' };
const optionWrongStyle = { ...optionBase, borderColor: 'rgba(245,239,224,0.45)', cursor: 'default' };
const optionDimStyle = { ...optionBase, opacity: 0.6, cursor: 'default' };
const submitButtonStyle = { color: '#1A130E', backgroundColor: '#D4A12A', border: 'none', padding: '0.7rem 1.7rem', fontSize: '0.82rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', borderRadius: '2px', cursor: 'pointer' };
const retryButtonStyle = { color: '#D4A12A', backgroundColor: 'transparent', border: '1px solid rgba(212,161,42,0.45)', padding: '0.65rem 1.5rem', fontSize: '0.78rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', borderRadius: '2px', cursor: 'pointer' };

function optionLabel(i) { return String.fromCharCode(65 + i); }
function findResultForQuestion(feedback, questionId) {
  if (!Array.isArray(feedback)) return null;
  return feedback.find((r) => r && r.questionId === questionId) || null;
}

export default function MhModule5KnowledgeCheck({ courseSlug, moduleSlug, quiz, onGraded }) {
  const [selections, setSelections] = useState({});
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState(null);
  const [validationError, setValidationError] = useState(null);
  const [serverError, setServerError] = useState(null);

  const locked = result != null || pending;

  function handleSelect(qId, idx) {
    if (locked) return;
    setSelections((prev) => ({ ...prev, [qId]: idx }));
    if (validationError) setValidationError(null);
  }

  async function handleSubmit(e) {
    if (e) e.preventDefault();
    if (locked) return;
    setServerError(null); setValidationError(null);
    const total = quiz.questions.length;
    const missing = quiz.questions.filter((q) => typeof selections[q.id] !== 'number');
    if (missing.length > 0) {
      setValidationError(`Please answer all ${total} questions before submitting. ${missing.length} question${missing.length > 1 ? 's are' : ' is'} still unanswered.`);
      return;
    }
    const answers = quiz.questions.map((q) => ({ questionId: q.id, selectedIndex: selections[q.id] }));
    setPending(true);
    try {
      const res = await base44.functions.invoke('checkMentalHealthKnowledgeCheck', { courseSlug, moduleSlug, answers });
      const data = res && res.data ? res.data : null;
      if (!data) throw new Error('No payload returned');
      setResult(data);
      if (onGraded) onGraded(data);
    } catch (err) {
      setServerError('We could not grade your responses right now. Please try again.');
    } finally {
      setPending(false);
    }
  }

  function handleRetry() {
    setSelections({}); setResult(null); setValidationError(null); setServerError(null);
  }

  const passedMessage = quiz.passedMessage ? quiz.passedMessage.replace('{score}', result ? result.score : '') : '';
  const notPassedMessage = quiz.notPassedMessage ? quiz.notPassedMessage.replace('{score}', result ? result.score : '') : '';

  return (
    <div>
      {quiz.subtitle && <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', color: 'rgba(212,161,42,0.78)', marginBottom: '1.1rem', fontSize: '0.9rem' }}>{quiz.subtitle}</p>}
      <div style={privacyBoxStyle}>
        <span className="font-body" style={{ ...eyebrowStyle, display: 'block', marginBottom: '0.45rem' }}>Privacy notice</span>
        <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0, fontSize: '0.85rem' }}>{quiz.privacyNotice}</p>
      </div>
      <p className="font-body" style={{ ...bodyText, marginBottom: '1.1rem' }}>{quiz.learnerInstruction}</p>
      <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', color: 'rgba(212,161,42,0.78)', marginBottom: '1.5rem', fontSize: '0.88rem' }}>Passing requires {quiz.passingScore} of {quiz.questions.length} correct answers.</p>
      <form onSubmit={handleSubmit} aria-label="Module 5 knowledge check">
        {quiz.questions.map((q, qIdx) => {
          const qResult = findResultForQuestion(result && result.feedback, q.id);
          return (
            <section key={q.id} style={questionCardStyle} aria-label={`Question ${qIdx + 1}`}>
              <h3 className="font-heading" style={{ color: '#F5EFE0', fontSize: '1.05rem', fontWeight: 400, lineHeight: 1.45, marginBottom: '0.9rem' }}>
                <span style={{ color: 'rgba(212,161,42,0.85)', fontWeight: 500 }}>Q{qIdx + 1}.</span> {q.prompt}
              </h3>
              <fieldset style={{ border: 0, padding: 0, margin: 0, minWidth: 0 }}>
                <legend className="sr-only" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>{q.prompt}</legend>
                <ul role="radiogroup" aria-label={`Question ${qIdx + 1} response options`} style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {q.options.map((opt, i) => {
                    const isSelected = selections[q.id] === i;
                    let style = optionBase;
                    if (result) {
                      const isCorrectChoice = qResult && qResult.isCorrect && isSelected;
                      const isWrongChoice = isSelected && qResult && !qResult.isCorrect;
                      if (isCorrectChoice) style = optionCorrectStyle;
                      else if (isWrongChoice) style = optionWrongStyle;
                      else style = optionDimStyle;
                    } else if (isSelected) { style = optionSelectedStyle; }
                    return (
                      <li key={i} style={{ marginBottom: '0.65rem' }}>
                        <label style={style}>
                          <input type="radio" name={q.id} value={i} checked={isSelected || false} disabled={locked}
                            onChange={() => handleSelect(q.id, i)} style={{ marginTop: '0.2rem' }} aria-label={`Option ${optionLabel(i)}: ${opt}`} />
                          <span style={{ flex: 1 }}><strong style={{ color: 'rgba(212,161,42,0.85)', fontWeight: 500 }}>{optionLabel(i)}.</strong> {opt}</span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </fieldset>
              {qResult && (
                <div role="status" style={{ marginTop: '0.85rem', padding: '0.85rem 1rem', border: `1px solid ${qResult.isCorrect ? 'rgba(212,161,42,0.4)' : 'rgba(245,239,224,0.25)'}`, borderRadius: '3px', backgroundColor: 'rgba(245,239,224,0.02)' }}>
                  <p className="font-body" style={{ ...bodyText, margin: 0, marginBottom: '0.4rem', color: qResult.isCorrect ? '#D4A12A' : '#e8955c', fontWeight: 500 }}>{qResult.isCorrect ? 'Correct' : 'Reconsider'}</p>
                  {typeof selections[q.id] === 'number' && (
                    <p className="font-body" style={{ ...bodyText, margin: 0, marginBottom: '0.4rem', fontSize: '0.88rem' }}><span style={{ color: 'rgba(245,239,224,0.6)', fontWeight: 500 }}>Your answer:</span> <span style={{ color: '#F5EFE0' }}>{q.options[selections[q.id]]}</span></p>
                  )}
                  {qResult.correctAnswerText && (
                    <p className="font-body" style={{ ...bodyText, margin: 0, marginBottom: '0.4rem', fontSize: '0.88rem' }}><span style={{ color: '#D4A12A', fontWeight: 500 }}>Correct answer:</span> <span style={{ color: '#F5EFE0' }}>{qResult.correctAnswerText}</span></p>
                  )}
                  <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', margin: 0, color: 'rgba(245,239,224,0.7)', fontSize: '0.88rem' }}>{qResult.feedback}</p>
                </div>
              )}
            </section>
          );
        })}
        {!result && (
          <button type="submit" disabled={pending} style={{ ...submitButtonStyle, cursor: pending ? 'wait' : 'pointer', opacity: pending ? 0.7 : 1 }}>{pending ? 'Grading\u2026' : 'Submit answers'}</button>
        )}
        {result && <button type="button" onClick={handleRetry} style={retryButtonStyle}>Try again</button>}
        {validationError && <p className="font-body" role="alert" style={{ color: '#e8955c', marginTop: '1rem', marginBottom: 0, fontSize: '0.88rem' }}>{validationError}</p>}
        {serverError && <p className="font-body" role="alert" style={{ color: '#e8955c', marginTop: '1rem', marginBottom: 0, fontSize: '0.88rem' }}>{serverError}</p>}
      </form>
      {result && (
        <div role="status" aria-live="polite" style={{ marginTop: '1.5rem', padding: '1.2rem 1.4rem', border: `1px solid ${result.passed ? 'rgba(212,161,42,0.5)' : 'rgba(245,239,224,0.3)'}`, borderRadius: '4px', backgroundColor: 'rgba(245,239,224,0.02)' }}>
          <p className="font-body" style={{ ...bodyText, margin: 0, marginBottom: '0.5rem', color: '#F5EFE0', fontWeight: 500, fontSize: '1.1rem' }}>{result.passed ? passedMessage : notPassedMessage}</p>
          <p className="font-body" style={{ ...bodyText, margin: 0, color: result.passed ? '#D4A12A' : '#e8955c', fontStyle: 'italic' }}>{result.passed ? 'You passed this knowledge check.' : 'You did not pass this knowledge check. Review the feedback above and try again.'}</p>
        </div>
      )}
    </div>
  );
}