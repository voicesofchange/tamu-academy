/**
 * certificate-copy — the fixed wording on the Certificate of Completion in the
 * learner's language.
 *
 * The learner's name and the course title are never translated: they are the
 * certificate's recorded values, drawn exactly as stored. Only the labels and
 * fixed sentences around them change language.
 *
 * Mirrors base44/shared/certificate-copy.js — change both together.
 */
import { base44 } from '@/api/base44Client';
import { useTranslation } from '@/lib/i18n';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

export const CERT_TEXT = {
  heading: 'Certificate of Completion',
  presentedTo: 'This certificate is presented to',
  completionLead: 'For successfully completing the self-paced course',
  offeredThrough: 'Offered through Tamu Academy, an educational initiative of Waiyaki House.',
  academyAttribution: 'An educational initiative of Waiyaki House',
  authorizerRole: 'Founder and Course Developer, Tamu Academy',
  dateLabel: 'Date of Completion',
  idLabel: 'Certificate ID',
};

/** Locale used to write the completion date, per certificate language. */
export const CERT_LOCALES = {
  en: 'en-US',
  sw: 'sw-KE',
  es: 'es-ES',
  fr: 'fr-FR',
  pt: 'pt-PT',
  ar: 'ar-EG',
  am: 'am-ET',
};

const SUPPORTED = new Set(Object.keys(CERT_LOCALES));
const STORAGE_KEY = 'tamu_language';
const CACHE_PREFIX = 'tamu_cert_copy_';

export function certificateLocale(language) {
  return CERT_LOCALES[language] || CERT_LOCALES.en;
}

/** The learner's chosen language, or 'en' when none is saved. */
export function savedCertificateLanguage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED.has(saved)) return saved;
  } catch {
    // Storage unavailable — fall through to the browser's own preference.
  }
  try {
    const candidates = [].concat(navigator.languages || [], navigator.language || []);
    for (const tag of candidates) {
      const primary = String(tag || '').toLowerCase().split('-')[0];
      if (SUPPORTED.has(primary)) return primary;
    }
  } catch {
    // navigator unavailable
  }
  return 'en';
}

/** The certificate wording on screen, following the selected language. */
export function useCertificateCopy() {
  const { language } = useTranslation();
  const { content } = useTranslatedContent('certificate-copy', CERT_TEXT);
  return { copy: content, language };
}

/**
 * The certificate wording for the downloadable PDF. The PDF is generated
 * outside React, so it resolves the language itself, reusing the cached
 * translation where the page already produced one.
 */
export async function loadCertificateCopy() {
  const language = savedCertificateLanguage();
  if (language === 'en') return { copy: CERT_TEXT, language };

  const cacheKey = `${CACHE_PREFIX}${language}`;
  try {
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) return { copy: JSON.parse(cached), language };
  } catch {
    // sessionStorage may be unavailable
  }

  try {
    const res = await base44.functions.invoke('translatePageContent', {
      texts: CERT_TEXT,
      language,
    });
    const translations = (res && res.data && res.data.translations) || {};
    const copy = {};
    for (const key of Object.keys(CERT_TEXT)) {
      const value = translations[key];
      copy[key] = typeof value === 'string' && value.trim().length > 0 ? value : CERT_TEXT[key];
    }
    try {
      sessionStorage.setItem(cacheKey, JSON.stringify(copy));
    } catch {
      // ignore
    }
    return { copy, language };
  } catch {
    // Translation refused or failed: the certificate is issued in English.
    return { copy: CERT_TEXT, language: 'en' };
  }
}