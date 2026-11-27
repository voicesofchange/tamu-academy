import React, { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import PageLayout from '@/components/page/PageLayout';
import PageMeta from '@/components/seo/PageMeta';
import ProtectedRoute from '@/components/ProtectedRoute';
import PreviewSignupCard from '@/components/courses/preview/PreviewSignupCard';
import { ModulePreviewContext, usePreviewLabels } from '@/components/courses/preview/ModulePreviewContext';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

// Visible text on this screen, translated with the rest of the page.
const UI_TEXT = {
  loading: 'Loading',
};

/**
 * ModulePreviewGate — the route guard for course module pages.
 *
 *   Signed in       → exactly what ProtectedRoute gives (the learner-group
 *                     prompt included); nothing changes for learners.
 *   Signed out, Module 1 → the module in free-preview mode
 *                     (ModulePreviewContext), read-only.
 *   Signed out, any other module → a page asking the visitor to create a free
 *                     account, with a link to preview Module 1, instead of a
 *                     silent redirect to sign-in.
 *
 * Course completion, certificate and capstone pages stay behind
 * ProtectedRoute and are not routed through here.
 */
const PREVIEW_VALUE = { preview: true };

export default function ModulePreviewGate() {
  const { content: uiText } = useTranslatedContent('ui-components-courses-preview-modulepreviewgate', UI_TEXT);
  const { isAuthenticated, isLoadingAuth, authChecked, checkUserAuth } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!authChecked && !isLoadingAuth) checkUserAuth();
  }, [authChecked, isLoadingAuth, checkUserAuth]);

  if (isLoadingAuth || !authChecked) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#24150f' }}>
        <div className="w-8 h-8 border-4 border-[rgba(232,184,91,0.2)] border-t-[#e8b85b] rounded-full animate-spin" aria-label={uiText.loading} />
      </div>
    );
  }

  if (isAuthenticated) return <ProtectedRoute />;

  const segments = location.pathname.replace(/\/+$/, '').split('/');
  if (segments[segments.length - 1] === 'module-1') {
    return (
      <ModulePreviewContext.Provider value={PREVIEW_VALUE}>
        <Outlet />
      </ModulePreviewContext.Provider>
    );
  }
  return <ModuleSignupGate coursePath={segments.slice(0, -1).join('/')} />;
}

function ModuleSignupGate({ coursePath }) {
  const L = usePreviewLabels();
  return (
    <PageLayout>
      <PageMeta title="Create a free account | Tamu Academy" path={coursePath} noindex />
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: 'clamp(6rem, 12vw, 8rem) clamp(1rem, 5vw, 2rem) 4rem' }}>
        <PreviewSignupCard title={L.moduleGateTitle} body={L.moduleGateBody} titleAs="h1" />
        <p className="font-body" style={{ marginTop: '1.25rem' }}>
          <Link to={`${coursePath}/module-1`} style={{ color: '#e8b85b' }}>{L.previewModuleOne} →</Link>
        </p>
      </div>
    </PageLayout>
  );
}
