import React from 'react';
import { useModulePreview, usePreviewLabels } from '@/components/courses/preview/ModulePreviewContext';
import PreviewSignupCard from '@/components/courses/preview/PreviewSignupCard';

/**
 * Which lesson sections save work, by section id (with or without the
 * player's tpl-step- prefix). In the free preview:
 *   - "replace" sections (completion requirements) are swapped for the
 *     sign-up card, since there is nothing to read in them without progress;
 *   - "inert" sections (quizzes, action plans, labs, scenarios, discussion,
 *     source analysis) stay readable but cannot be used, under the card.
 * Everything else — the reading and the recorded material — is unchanged.
 */
const REPLACE = new Set(['requirements', 'completion-requirements']);
const INERT = new Set([
  'knowledge-check', 'concept-check', 'action-plan', 'discussion', 'interactive-scenario',
  'community-of-care-map', 'strength-without-silence-lab', 'bridge-conversation-lab', 'care-design-lab',
  'pathways-lab', 'amplify-lab', 'story-lab', 'source-analysis', 'activity',
]);

export function previewGateMode(id) {
  const key = String(id || '').replace(/^tpl-step-/, '');
  if (REPLACE.has(key)) return 'replace';
  if (INERT.has(key)) return 'inert';
  return null;
}

/** Wraps a section's content; does nothing outside the preview. */
export default function PreviewSectionGate({ id, children }) {
  const { preview } = useModulePreview();
  const L = usePreviewLabels();
  const mode = preview ? previewGateMode(id) : null;
  if (!mode) return children;
  if (mode === 'replace') return <PreviewSignupCard title={L.gateTitle} body={L.gateBody} />;
  return (
    <div>
      <div style={{ marginBottom: '1.25rem' }}>
        <PreviewSignupCard title={L.sectionGated} compact />
      </div>
      <div inert="" aria-hidden="true" style={{ opacity: 0.45, pointerEvents: 'none', userSelect: 'none' }}>
        {children}
      </div>
    </div>
  );
}
