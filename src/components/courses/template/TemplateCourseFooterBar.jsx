import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { fillTemplate } from '@/lib/i18n/fill-template';
import { useTemplatePlayerLabels } from '@/components/courses/template/TemplatePlayerLabelsProvider';
import { REQUIREMENT_LABEL_KEYS, stepAnchorId } from '@/components/courses/template/template-player-steps';

/**
 * TemplateCourseFooterBar — the bar that stays at the bottom of the screen
 * while a template course module is read.
 *
 * "Mark Complete & Continue" asks completeTemplateCourseModule to complete
 * the module. The server decides: when a requirement is still outstanding it
 * comes back in `missing`, the module stays incomplete and the bar names what
 * is left. Once the module is complete the learner moves on to the next one.
 * A completed module shows a plain "Continue". Nothing is completed from the
 * browser alone.
 */
export default function TemplateCourseFooterBar({ course, module, onRefresh }) {
  const L = useTemplatePlayerLabels();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => { setMessage(null); }, [module.route]);

  const index = course.modules.findIndex((item) => item.route === module.route);
  const next = index >= 0 && index < course.modules.length - 1 ? course.modules[index + 1] : null;
  const progress = module.progress || {};
  const completed = !!progress.completed;
  const canSave = !!progress.canRecordProgress;
  const nextPath = next ? `/courses/${course.slug}/${next.route}` : null;

  const stepName = (step) => L[REQUIREMENT_LABEL_KEYS[step]] || String(step).replace(/_/g, ' ');

  async function completeAndContinue() {
    setBusy(true);
    setMessage(null);
    try {
      const res = await base44.functions.invoke('completeTemplateCourseModule', {
        courseSlug: course.slug,
        moduleRoute: module.route,
      });
      const data = res && res.data ? res.data : null;
      if (data && data.completed) {
        if (nextPath) navigate(nextPath);
        else if (onRefresh) await onRefresh();
      } else if (data && Array.isArray(data.missing) && data.missing.length > 0) {
        setMessage({ tone: 'warn', text: fillTemplate(L.stillNeeds, { steps: data.missing.map(stepName).join(', ') }) });
        const target = document.getElementById(stepAnchorId('requirements'));
        if (target && typeof target.scrollIntoView === 'function') target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        setMessage({ tone: 'warn', text: L.completeFailed });
      }
    } catch (err) {
      setMessage({ tone: 'warn', text: L.completeFailed });
    } finally {
      setBusy(false);
    }
  }

  let action;
  if (completed) {
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
    <div className="tpl-footer" role="region" aria-label={module.title}>
      <style>{FOOTER_CSS}</style>
      <div className="tpl-footer-row">
        <div style={{ minWidth: 0, flex: '1 1 auto' }}>
          <p className="font-body tpl-footer-module">
            {module.number} · {module.title}
            {completed && <span className="tpl-footer-badge">{L.moduleDone}</span>}
          </p>
          <p className="font-body tpl-footer-sub" aria-live="polite">
            {message
              ? <span style={{ color: '#e8955c' }}>{message.text}</span>
              : !canSave && !completed
                ? <span id="tpl-footer-preview">{L.previewOnly}</span>
                : next ? fillTemplate(L.nextUp, { title: `${next.number} — ${next.title}` }) : null}
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
