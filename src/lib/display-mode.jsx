import React, { createContext, useContext, useLayoutEffect, useState } from 'react';

/**
 * Display mode — the learner's global choice between the full Standard
 * experience and a Data-Saver experience built for slow connections and
 * low-end devices.
 *
 * The choice is made once from the site navigation and is remembered on the
 * device, so it survives navigation, reloads and future visits. The preference
 * is a device setting, not account data: a learner reading on a phone can keep
 * Data-Saver on there while their desktop stays in Standard mode.
 *
 * Data-Saver rendering itself is deliberately left to each component:
 * components ask `useDisplayMode()` and then skip decorative imagery and heavy
 * media rather than downloading it and hiding it with CSS. The `data-display-mode`
 * attribute on <html> carries the same state to the stylesheet, which switches
 * the whole app to a system font stack and a higher-contrast reading surface.
 */
const STORAGE_KEY = 'tamu.display-mode';
const DATA_SAVER = 'data_saver';
const STANDARD = 'standard';

const DisplayModeContext = createContext(null);

function readStoredMode() {
  try {
    return localStorage.getItem(STORAGE_KEY) === DATA_SAVER ? DATA_SAVER : STANDARD;
  } catch (_) {
    return STANDARD;
  }
}

export function DisplayModeProvider({ children }) {
  const [mode, setMode] = useState(readStoredMode);

  // Applied before paint so a learner who chose Data-Saver never sees the
  // heavier Standard rendering flash on load.
  useLayoutEffect(() => {
    const root = document.documentElement;
    if (mode === DATA_SAVER) {
      root.setAttribute('data-display-mode', 'data-saver');
    } else {
      root.removeAttribute('data-display-mode');
    }
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch (_) {
      /* Storage unavailable (private browsing) — the mode still works for this session. */
    }
  }, [mode]);

  const value = {
    mode,
    isDataSaver: mode === DATA_SAVER,
    setMode,
    toggleMode: () => setMode((current) => (current === DATA_SAVER ? STANDARD : DATA_SAVER)),
  };

  return <DisplayModeContext.Provider value={value}>{children}</DisplayModeContext.Provider>;
}

export function useDisplayMode() {
  const context = useContext(DisplayModeContext);
  if (!context) {
    throw new Error('useDisplayMode must be used within a DisplayModeProvider');
  }
  return context;
}