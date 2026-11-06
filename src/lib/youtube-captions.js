import { useMemo } from 'react';
import { useTranslation } from '@/lib/i18n/LanguageContext';

/**
 * YouTube takes ISO-639-1 codes for both the caption track it opens with
 * (cc_lang_pref) and the language of the player's own controls and menus (hl).
 * Every language Tamu Academy serves maps to its own code; anything else falls
 * back to English.
 */
const CAPTION_LANGUAGES = {
  en: 'en',
  sw: 'sw',
  es: 'es',
  fr: 'fr',
};

export function captionLanguage(language) {
  return CAPTION_LANGUAGES[language] || 'en';
}

/**
 * Turn a YouTube embed URL into one that opens with captions switched on, in
 * the viewer's language, with the player interface in that language too.
 * Videos that carry no track in that language play as they would before, and
 * every other URL is returned untouched.
 */
export function withCaptions(embedUrl, language) {
  if (typeof embedUrl !== 'string' || !embedUrl) return embedUrl;
  if (!/(^|\.)youtube(-nocookie)?\.com/i.test(embedUrl)) return embedUrl;

  const code = captionLanguage(language);
  try {
    const url = new URL(embedUrl);
    url.searchParams.set('cc_load_policy', '1');
    url.searchParams.set('cc_lang_pref', code);
    url.searchParams.set('hl', code);
    return url.toString();
  } catch {
    return embedUrl;
  }
}

/** The viewer's language, applied to an embed URL. Re-runs when they switch language. */
export function useCaptionedEmbedUrl(embedUrl) {
  const { language } = useTranslation();
  return useMemo(() => withCaptions(embedUrl, language), [embedUrl, language]);
}