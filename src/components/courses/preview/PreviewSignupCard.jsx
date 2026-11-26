import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { usePreviewLabels, previewAuthLinks } from '@/components/courses/preview/ModulePreviewContext';

/**
 * PreviewSignupCard — the "Create Free Account to Save Progress & Earn
 * Certificate" prompt, used in the preview banner and in place of anything
 * that would save work. Returns the visitor to the page they are on.
 */
export default function PreviewSignupCard({ title, body, compact = false, titleAs: TitleTag = 'p' }) {
  const L = usePreviewLabels();
  const location = useLocation();
  const links = previewAuthLinks(location.pathname.replace(/\?.*$/, '') + '?enroll=1');
  return (
    <div className="preview-card" role="note">
      <style>{CARD_CSS}</style>
      <div className="preview-card-text">
        {title && <TitleTag className="font-heading preview-card-title"><Lock size={16} aria-hidden="true" /> {title}</TitleTag>}
        {body && !compact && <p className="font-body preview-card-body">{body}</p>}
      </div>
      <div className="preview-card-actions">
        <Link to={links.register} className="font-body preview-card-cta">{L.cta}</Link>
        <span className="font-body preview-card-signin">
          {L.haveAccount} <Link to={links.login}>{L.signIn}</Link>
        </span>
      </div>
    </div>
  );
}

const CARD_CSS = `
.preview-card { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem 1.5rem; padding: 1.1rem 1.25rem; border: 1px solid rgba(232,184,91,0.4); border-radius: 8px; background: rgba(232,184,91,0.07); }
.preview-card-text { flex: 1 1 280px; min-width: 0; }
.preview-card-title { font-weight: 400; display: flex; align-items: center; gap: 0.5rem; color: #f8f0df; font-size: 1.1rem; margin: 0 0 0.35rem; }
.preview-card-title svg { color: #e8b85b; flex-shrink: 0; }
.preview-card-body { color: rgba(243,234,216,0.75); font-size: 0.88rem; line-height: 1.6; margin: 0; }
.preview-card-actions { display: flex; flex-direction: column; align-items: flex-start; gap: 0.45rem; }
.preview-card-cta { display: inline-block; padding: 0.7rem 1.1rem; border-radius: 6px; background: #e8b85b; color: #24150f; text-decoration: none; font-size: 0.76rem; letter-spacing: 0.06em; text-transform: uppercase; font-weight: 700; line-height: 1.35; }
.preview-card-cta:focus-visible, .preview-card-signin a:focus-visible { outline: 2px solid #f8f0df; outline-offset: 2px; }
.preview-card-signin { color: rgba(243,234,216,0.65); font-size: 0.8rem; }
.preview-card-signin a { color: #e8b85b; }
`;
