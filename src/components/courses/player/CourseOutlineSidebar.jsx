import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Lock, Circle, CircleDot, X } from 'lucide-react';
import { fillTemplate } from '@/lib/i18n/fill-template';
import { useCoursePlayerLabels } from '@/components/courses/player/CoursePlayerLabelsProvider';
import { stepAnchorId } from '@/components/courses/player/step-anchors';
import { usePreviewLabels } from '@/components/courses/preview/ModulePreviewContext';

/**
 * CourseOutlineSidebar — the course player's outline: every module of the
 * course with its state (completed, current, in progress, not started or
 * locked behind its prerequisite), and under the current module, its lesson
 * steps with a tick for each completion requirement already met.
 *
 * `course.modules` comes from the course's own server-side progress report,
 * never from the browser: { route, number, title, completed, status, locked,
 * published, prerequisite }. `steps` is the current module's step list:
 * { id, labelKey | label, tracked, completed, anchor? } — `anchor` is the
 * section's own element id where it is not the usual tpl-step-<id>. A locked module is shown, not
 * linked, with the module it waits for. On narrow screens the same outline
 * opens as a drawer (`onClose` set).
 */

const GOLD = '#e8b85b';
const muted = 'rgba(243,234,216,0.55)';

function ModuleIcon({ state }) {
  const common = { size: 16, 'aria-hidden': true, style: { flexShrink: 0, marginTop: '2px' } };
  if (state === 'completed') return <Check {...common} color={GOLD} strokeWidth={2.4} />;
  if (state === 'locked') return <Lock {...common} color={muted} strokeWidth={1.9} />;
  if (state === 'current' || state === 'in_progress') return <CircleDot {...common} color={GOLD} strokeWidth={1.9} />;
  return <Circle {...common} color={muted} strokeWidth={1.7} />;
}

export default function CourseOutlineSidebar({ course, currentRoute, steps = [], onClose, onNavigate }) {
  const L = useCoursePlayerLabels();
  const P = usePreviewLabels();
  const byRoute = new Map(course.modules.map((item) => [item.route, item]));

  const stateOf = (item) => {
    if (item.completed) return 'completed';
    if (item.route === currentRoute) return 'current';
    if (item.locked) return 'locked';
    if (item.status === 'in_progress') return 'in_progress';
    return 'not_started';
  };
  const statusLabel = {
    completed: L.moduleStatusCompleted,
    current: L.moduleStatusCurrent,
    in_progress: L.moduleStatusInProgress,
    not_started: L.moduleStatusNotStarted,
    locked: L.moduleStatusLocked,
  };

  return (
    <nav aria-label={L.outlineHeading} className="tpl-sidebar-inner">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '1rem' }}>
        <h2 className="font-body" style={{ color: GOLD, fontSize: '0.66rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, margin: 0 }}>
          {L.outlineHeading}
        </h2>
        {onClose && (
          <button type="button" onClick={onClose} aria-label={L.closeOutline} className="tpl-icon-button">
            <X size={18} aria-hidden="true" />
          </button>
        )}
      </div>

      <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
        {course.modules.map((item) => {
          const state = stateOf(item);
          const isCurrent = item.route === currentRoute;
          const prerequisite = item.prerequisite ? byRoute.get(item.prerequisite) : null;
          const lockedNote = state === 'locked'
            ? item.previewLocked ? P.lockedNote : (item.published && prerequisite
              ? fillTemplate(L.lockedPrerequisite, { module: prerequisite.number })
              : L.lockedUnpublished)
            : null;
          const rowStyle = {
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.6rem',
            padding: '0.6rem 0.7rem',
            borderRadius: '4px',
            textDecoration: 'none',
            backgroundColor: isCurrent ? 'rgba(232,184,91,0.09)' : 'transparent',
            borderLeft: `2px solid ${isCurrent ? GOLD : 'transparent'}`,
          };
          const text = (
            <>
              <ModuleIcon state={state} />
              <span style={{ minWidth: 0 }}>
                <span className="font-body" style={{ display: 'block', color: isCurrent ? GOLD : muted, fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500 }}>
                  {item.number}
                  <span className="sr-only"> — {statusLabel[state]}</span>
                </span>
                <span className="font-body" style={{ display: 'block', color: state === 'locked' ? muted : '#f3ead8', fontSize: '0.88rem', lineHeight: 1.45, marginTop: '0.15rem' }}>
                  {item.title}
                </span>
                {lockedNote && (
                  <span className="font-body" style={{ display: 'block', color: muted, fontSize: '0.74rem', marginTop: '0.2rem' }}>{lockedNote}</span>
                )}
              </span>
            </>
          );

          return (
            <li key={item.route}>
              {state === 'locked' && !isCurrent ? (
                <div style={{ ...rowStyle, cursor: 'not-allowed' }} aria-disabled="true">{text}</div>
              ) : (
                <Link
                  to={`/courses/${course.slug}/${item.route}`}
                  aria-current={isCurrent ? 'page' : undefined}
                  className="tpl-outline-link"
                  style={rowStyle}
                  onClick={onNavigate}
                >
                  {text}
                </Link>
              )}

              {isCurrent && steps.length > 0 && (
                <div style={{ margin: '0.35rem 0 0.75rem 1.9rem' }}>
                  <p className="font-body" style={{ color: muted, fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', margin: '0 0 0.35rem' }}>
                    {L.thisModule}
                  </p>
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    {steps.map((step) => (
                      <li key={step.id}>
                        <a
                          href={`#${step.anchor || stepAnchorId(step.id)}`}
                          onClick={onNavigate}
                          className="font-body tpl-outline-link"
                          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.3rem 0.4rem', borderRadius: '3px', color: 'rgba(243,234,216,0.78)', fontSize: '0.8rem', textDecoration: 'none' }}
                        >
                          {step.tracked ? (
                            step.completed
                              ? <Check size={13} color={GOLD} strokeWidth={2.6} aria-hidden="true" style={{ flexShrink: 0 }} />
                              : <Circle size={13} color={muted} strokeWidth={1.8} aria-hidden="true" style={{ flexShrink: 0 }} />
                          ) : (
                            <span aria-hidden="true" style={{ width: 13, flexShrink: 0, textAlign: 'center', color: muted }}>·</span>
                          )}
                          <span>{(step.labelKey && L[step.labelKey]) || step.label}</span>
                          {step.tracked && (
                            <span className="sr-only"> — {step.completed ? L.stepDone : L.stepToDo}</span>
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
