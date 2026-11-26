import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { fillTemplate } from '@/lib/i18n/fill-template';
import { useCoursePlayerLabels } from '@/components/courses/player/CoursePlayerLabelsProvider';
import { stepAnchorId } from '@/components/courses/player/step-anchors';
import { useModulePreview, usePreviewLabels, previewAuthLinks } from '@/components/courses/preview/ModulePreviewContext';

/**
 * CourseCompleteFooter — the bar that stays at the bottom of the screen while
 * a module is read, in every course that uses the course player.
 *
 * "Mark Complete & Continue" runs the course's own `onComplete`, which calls
 * that course's server-side completion function and resolves to one of:
 *   { completed: true }
 *   { completed: false, missing: ['Reflection', …] }   (already readable names)
 *   { completed: false, message: '…' }
 * The server decides: when something is outstanding the module stays
 * incomplete and the bar says what is left. Once the module is complete the
 * learner moves on to `next.path` (the next module, or the course's
 * completion page); with no next step, `onCompleted` refreshes the page.
 * A completed module shows a plain "Continue". Nothing is completed from the
 * browser alone.
 *
 * Props: moduleKey (resets the message when the module changes), number,
 * title, completed, canSave, onComplete, onCompleted, next: { path, title },
 * requirementsAnchor (the element to scroll to when something is missing;
 * defaults to the tpl-step-requirements section).
 */
export default function CourseCompleteFooter({
  moduleKey,
  number,
  title,
  completed = false,
  canSave = false,
  onComplete,
  onCompleted,
  next = null,
  requirementsAnchor = null,
}) {
  const L = useCoursePlayerLabels();
  const navigate = useNavigate();
  const location = useLocation();
  const { preview } = useModulePreview();
  const P = usePreviewLabels();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => { setMessage(null); }, [moduleKey]);

  const nextPath = next && next.path ? next.path : null;

  async function completeAndContinue() {
    if (!onComplete) return;
    setBusy(true);
    setMessage(null);
    try {
      const result = (await onComplete()) || {};
      if (result.completed) {
        if (nextPath) navigate(nextPath);
        else if (onCompleted) await onCompleted();
      } else if (Array.isArray(result.missing) && result.missing.length > 0) {
        setMessage(fillTemplate(L.stillNeeds, { steps: result.missing.join(', ') }));
        const target = document.getElementById(requirementsAnchor || stepAnchorId('requirements'));
        if (target && typeof target.scrollIntoView === 'function') target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        setMessage(result.message || L.completeFailed);
      }
    } catch (err) {
      setMessage(L.completeFailed);
    } finally {
      setBusy(false);
    }
  }

  let action;
  if (preview) {
    // The free preview saves nothing: the footer offers the free account.
    action = (
      <Link to={previewAuthLinks(`${location.pathname}?enroll=1`).register} className="tpl-footer-primary font-body">
        {P.ctaShort}
        <ArrowRight size={16} aria-hidden="true" />
      </Link>
    );
  } else if (completed) {
    action = nextPath ? (
      <button type="button" className="tpl-footer-primary font-body" onClick={() => navigate(nextPath)}>
        {L.continueNext}
        <ArrowRight size={16} aria-hidden="true" />
      </button>
    ) : (
      <span className="font-body tpl-footer-done">
        <Check size={16} aria-hidden="true" />
        {L.courseDone}
      </span>
    );
  } else {
    action = (
      <button
        type="button"
        className="tpl-footer-primary font-body"
        onClick={completeAndContinue}
        disabled={busy || !canSave}
        aria-describedby={!canSave ? 'tpl-footer-preview' : undefined}
      >
        {busy ? L.checking : (nextPath ? L.markCompleteContinue : L.markComplete)}
        {!busy && <ArrowRight size={16} aria-hidden="true" />}
      </button>
    );
  }

  return (
    <div className="tpl-footer" role="region" aria-label={title}>
      <style>{FOOTER_CSS}</style>
      <div className="tpl-footer-row">
        <div style={{ minWidth: 0, flex: '1 1 auto' }}>
          <p className="font-body tpl-footer-module">
            {number} · {title}
            {completed && <span className="tpl-footer-badge">{L.moduleDone}</span>}
          </p>
          <p className="font-body tpl-footer-sub" aria-live="polite">
            {message
              ? <span style={{ color: '#e8955c' }}>{message}</span>
              : preview
                ? P.footerNote
                : !canSave && !completed
                ? <span id="tpl-footer-preview">{L.previewOnly}</span>
                : next && next.title ? fillTemplate(L.nextUp, { title: next.title }) : null}
          </p>
        </div>
        {action}
      </div>
    </div>
  );
}

const FOOTER_CSS = `
.tpl-footer {
  position: sticky;
  bottom: 0;
  z-index: 30;
  background: rgba(28,18,13,0.97);
  border-top: 1px solid rgba(232,184,91,0.18);
  backdrop-filter: blur(8px);
}
.tpl-footer-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem clamp(1rem, 3vw, 2rem);
  padding-bottom: calc(0.75rem + env(safe-area-inset-bottom, 0px));
}
.tpl-footer-module {
  margin: 0;
  color: #f3ead8;
  font-size: 0.85rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.tpl-footer-sub {
  margin: 0.15rem 0 0;
  color: rgba(243,234,216,0.55);
  font-size: 0.75rem;
  line-height: 1.4;
}
.tpl-footer-badge {
  margin-left: 0.6rem;
  color: #e8b85b;
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
.tpl-footer-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  color: #24150f;
  background: #e8b85b;
  border: 1px solid #e8b85b;
  border-radius: 3px;
  padding: 0.7rem 1.2rem;
  font-size: 0.74rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
}
.tpl-footer-primary:disabled { opacity: 0.55; cursor: not-allowed; }
.tpl-footer-primary:focus-visible { outline: 2px solid #f8f0df; outline-offset: 2px; }
.tpl-footer-done {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  color: #e8b85b;
  font-size: 0.78rem;
  font-weight: 600;
  white-space: nowrap;
}
@media (max-width: 520px) {
  .tpl-footer-row { flex-wrap: wrap; }
  .tpl-footer-primary { width: 100%; justify-content: center; }
}
`;
