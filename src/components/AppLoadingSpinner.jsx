import React from 'react';

/**
 * AppLoadingSpinner — the app's single loading indicator.
 *
 * Used while the session is being restored and as the Suspense fallback while
 * a page's code is fetched, so both waits look exactly the same.
 */
export default function AppLoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
    </div>
  );
}