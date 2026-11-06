import React, { createContext, useState, useEffect, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import { appParams } from '@/lib/app-params';
import en from './translations/en';
import sw from './translations/sw';
import es from './translations/es';
import fr from './translations/fr';

/**
 * Supported languages. 'en' is the default and fallback.
 * Add new languages here and create a matching dictionary file.
 */
export const LANGUAGES = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'sw', label: 'Swahili', nativeLabel: 'Kiswahili' },
  { code: 'es', label: 'Spanish', nativeLabel: 'Español' },
  { code: 'fr', label: 'French', nativeLabel: 'Français' },
];

const DICTIONARIES = { en, sw, es, fr };
const STORAGE_KEY = 'tamu_language';
const DEFAULT_LANGUAGE = 'en';

/**
 * Detect the user's preferred language from browser settings.
 * Checks navigator.languages and navigator.language, matching against
 * our supported language codes (en, sw, es, fr). Returns null if no match.
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
      // Primary subtag matches a dictionary directly, so regional variants
      // (sw-KE, es-MX, fr-SN, fr-CI, …) resolve to their base language.
      const primary = lower.split('-')[0];
      if (DICTIONARIES[primary]) return primary;
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

/**
 * The language saved on a signed-in learner's profile, when it is one this
 * app serves. Returns null when they have not chosen one.
 */
function readProfileLanguage(user) {
  const direct = user ? user.preferred_language : undefined;
  const nested = user && user.data && typeof user.data === 'object'
    ? user.data.preferred_language
    : undefined;
  const value = typeof direct === 'string' && direct ? direct : nested;
  return typeof value === 'string' && DICTIONARIES[value] ? value : null;
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(DEFAULT_LANGUAGE);

  useEffect(() => {
    let cancelled = false;

    // A choice saved in this browser wins, so a visitor keeps what they picked.
    let initial = null;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && DICTIONARIES[saved]) initial = saved;
    } catch {
      // localStorage may be unavailable (private mode) — fall through to detection
    }

    // Otherwise detect from the browser's own language settings.
    if (!initial) {
      initial = detectBrowserLanguage();
      if (initial) {
        try {
          localStorage.setItem(STORAGE_KEY, initial);
        } catch {
          // Ignore storage errors
        }
      }
    }
    if (initial && initial !== DEFAULT_LANGUAGE) setLanguageState(initial);

    // A signed-in learner's profile language takes precedence, so the choice
    // they made on one device follows them to every other device.
    if (appParams.token) {
      (async () => {
        let user = null;
        try {
          user = await base44.auth.me();
        } catch {
          user = null;
        }
        if (cancelled || !user) return;
        const profileLanguage = readProfileLanguage(user);
        if (!profileLanguage) return;
        setLanguageState(profileLanguage);
        try {
          localStorage.setItem(STORAGE_KEY, profileLanguage);
        } catch {
          // Ignore storage errors
        }
      })();
    }

    return () => {
      cancelled = true;
    };
  }, []);

  const setLanguage = useCallback((code) => {
    if (!DICTIONARIES[code]) return;
    setLanguageState(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // Ignore storage errors
    }
    // Signed-in learners carry their choice with their profile. A visitor has
    // no token, so nothing is sent for them.
    if (appParams.token) {
      base44.auth.updateMe({ preferred_language: code }).catch(() => {
        // The language still applies in this browser if the save fails.
      });
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