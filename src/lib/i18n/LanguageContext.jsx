import React, { createContext, useState, useEffect, useCallback } from 'react';
import en from './translations/en';
import sw from './translations/sw';
import es from './translations/es';

/**
 * Supported languages. 'en' is the default and fallback.
 * Add new languages here and create a matching dictionary file.
 */
export const LANGUAGES = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'sw', label: 'Swahili', nativeLabel: 'Kiswahili' },
  { code: 'es', label: 'Spanish', nativeLabel: 'Español' },
];

const DICTIONARIES = { en, sw, es };
const STORAGE_KEY = 'tamu_language';
const DEFAULT_LANGUAGE = 'en';

/**
 * Detect the user's preferred language from browser settings.
 * Checks navigator.languages and navigator.language, matching against
 * our supported language codes (en, sw, es). Returns null if no match.
 */
function detectBrowserLanguage() {
  try {
    const candidates = [];
    if (Array.isArray(navigator.languages)) {
      candidates.push(...navigator.languages);
    }
    if (navigator.language) {
      candidates.push(navigator.language);
    }
    for (const lang of candidates) {
      if (!lang) continue;
      const lower = lang.toLowerCase();
      // Exact match (e.g. 'sw', 'es', 'en')
      const primary = lower.split('-')[0];
      if (DICTIONARIES[primary]) return primary;
      // Swahili regional variants: sw-KE, sw-TZ
      if (primary === 'sw') return 'sw';
      // Spanish regional variants: es-ES, es-MX, es-AR, etc.
      if (primary === 'es') return 'es';
    }
  } catch {
    // navigator may be unavailable in some environments
  }
  return null;
}

export const LanguageContext = createContext({
  language: DEFAULT_LANGUAGE,
  setLanguage: () => {},
});

/**
 * Resolve a nested key like "nav.home" from a dictionary object.
 * Returns undefined if any segment is missing.
 */
function resolveKey(dict, key) {
  return key.split('.').reduce((acc, segment) => {
    return acc && typeof acc === 'object' ? acc[segment] : undefined;
  }, dict);
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(DEFAULT_LANGUAGE);

  // Load persisted language on mount, or detect from browser on first visit
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && DICTIONARIES[saved]) {
        setLanguageState(saved);
        return;
      }
    } catch {
      // localStorage may be unavailable (private mode) — fall through to detection
    }
    // No saved preference — detect from browser settings
    const detected = detectBrowserLanguage();
    if (detected && detected !== DEFAULT_LANGUAGE) {
      setLanguageState(detected);
      try {
        localStorage.setItem(STORAGE_KEY, detected);
      } catch {
        // Ignore storage errors
      }
    }
  }, []);

  const setLanguage = useCallback((code) => {
    if (!DICTIONARIES[code]) return;
    setLanguageState(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // Ignore storage errors
    }
  }, []);

  const value = { language, setLanguage };
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

/**
 * Translation hook. Returns { t, language, setLanguage }.
 * t('nav.home') → translated string; falls back to English if the
 * key is missing in the current language, then to the key itself.
 */
export function useTranslation() {
  const { language, setLanguage } = React.useContext(LanguageContext);
  const dict = DICTIONARIES[language] || DICTIONARIES[DEFAULT_LANGUAGE];
  const fallback = DICTIONARIES[DEFAULT_LANGUAGE];

  const t = useCallback(
    (key) => {
      const value = resolveKey(dict, key);
      if (value !== undefined) return value;
      const fallbackValue = resolveKey(fallback, key);
      return fallbackValue !== undefined ? fallbackValue : key;
    },
    [dict, fallback]
  );

  return { t, language, setLanguage };
}