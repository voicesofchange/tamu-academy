/**
 * certificate-copy — the fixed wording on the Certificate of Completion, in
 * the learner's own language.
 *
 * Imported ONLY by Base44 backend functions. Never imported by src/.
 *
 * The learner's name and the course title are never part of this copy: they are
 * the certificate's recorded values and are drawn exactly as stored. Only the
 * labels and fixed sentences around them are translated.
 *
 * Mirrors CERT_TEXT in src/lib/certificate-copy.js — change both together.
 */

import { translateTextBatch } from './translate-content.js';

export const CERTIFICATE_LABELS_EN = {
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
export const CERTIFICATE_LOCALES = {
  en: 'en-US',
  sw: 'sw-KE',
  es: 'es-ES',
  fr: 'fr-FR',
  pt: 'pt-PT',
  ar: 'ar-EG',
  am: 'am-ET',
};

export function certificateLocale(language) {
  return CERTIFICATE_LOCALES[language] || CERTIFICATE_LOCALES.en;
}

const CERTIFICATE_RULES = [
  'Certificate rules:',
  '- This text is set on a printed certificate. Keep every line short and formal.',
  '- Keep these names exactly as written: Tamu Academy, Waiyaki House, Tex Wambui, MPA.',
  '- The founder, Tex Wambui, is a woman: use feminine grammatical forms wherever the language requires them.',
  '- Do not add any sentence or note that is not in the English text.',
].join('\n');

/**
 * The certificate labels in the learner's language, English wherever a
 * translation could not be produced.
 */
export async function localizeCertificateLabels(base44, language) {
  if (!language || language === 'en') return CERTIFICATE_LABELS_EN;
  try {
    const translated = await translateTextBatch(
      base44,
      CERTIFICATE_LABELS_EN,
      language,
      CERTIFICATE_RULES
    );
    const out = {};
    for (const key of Object.keys(CERTIFICATE_LABELS_EN)) {
      const value = translated[key];
      out[key] = typeof value === 'string' && value.trim().length > 0 ? value : CERTIFICATE_LABELS_EN[key];
    }
    return out;
  } catch (error) {
    console.warn('[certificate-copy] translation failed:', error && error.message);
    return CERTIFICATE_LABELS_EN;
  }
}