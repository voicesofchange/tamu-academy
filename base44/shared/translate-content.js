/**
 * Shared module for translating module content via InvokeLLM.
 * Used by getModuleContent (Economics) and getMentalHealthModule.
 *
 * Only the text-heavy fields (title and lesson) are sent for translation.
 * Metadata fields (route, number, status, sections, etc.) stay in English
 * to keep the translation payload small and reliable. On any error, the
 * original English content is returned so the learner is never blocked.
 */

import { allowRequest } from './rate-limit.js';

// The model is only asked to translate strings that are not already cached.
// New strings are capped per hour so the cost of the translation endpoint is
// bounded no matter who calls it; already-cached text keeps being served.
const NEW_TRANSLATION_LIMIT = 300;
const NEW_TRANSLATION_WINDOW_MS = 60 * 60 * 1000;

const LANGUAGE_NAMES = {
  sw: 'Swahili (Kiswahili)',
  es: 'Spanish (Español)',
  fr: 'French (Français)',
  pt: 'Portuguese (Português)',
  ar: 'Arabic (العربية)',
  am: 'Amharic (አማርኛ)',
};

/**
 * Strip markdown code fences from a string if present.
 */
function stripCodeFences(text) {
  let trimmed = text.trim();
  // Remove leading ```json or ``` and trailing ```
  if (trimmed.startsWith('```')) {
    trimmed = trimmed.replace(/^```(?:json)?\s*\n?/, '');
    trimmed = trimmed.replace(/\n?```\s*$/, '');
  }
  return trimmed.trim();
}

/**
 * Translate a flat or nested object of text strings to the target language.
 * Used by the translatePageContent backend function for static page content.
 * Returns the original texts if language is 'en', unknown, or on error.
 *
 * @param {Object} base44 - The Base44 client (with asServiceRole)
 * @param {Object} texts - Object whose string values should be translated
 * @param {string} language - The target language code ('en', 'sw', 'es', ...)
 * @returns {Promise<Object>} The translated texts object
 */
export async function translateTextBatch(base44, texts, language) {
  if (!language || language === 'en') return texts;
  const languageName = LANGUAGE_NAMES[language];
  if (!languageName) return texts;
  if (!texts || typeof texts !== 'object' || Object.keys(texts).length === 0) return texts;

  const keys = Object.keys(texts);

  // Anything already translated for this language is served from the cache,
  // so a page is translated once and repeated views never reach the model.
  const cached = await readTranslationCache(base44, texts, keys, language);
  const missing = {};
  for (const key of keys) {
    if (cached[key] === undefined) missing[key] = texts[key];
  }
  if (Object.keys(missing).length === 0) {
    return { ...texts, ...cached };
  }

  // Bound the model's cost regardless of who calls this endpoint: once the
  // hourly budget for genuinely new strings is spent, the endpoint keeps
  // serving cache hits and falls back to the original English text.
  const mayTranslate = await allowRequest(base44, {
    scope: 'page_translation_llm',
    key: 'global',
    limit: NEW_TRANSLATION_LIMIT,
    windowMs: NEW_TRANSLATION_WINDOW_MS,
  });
  if (!mayTranslate) {
    console.warn('[translateTextBatch] New-translation budget reached — serving cached text only');
    return { ...texts, ...cached };
  }

  const fresh = await callTranslator(base44, missing, languageName);
  await storeTranslations(base44, missing, fresh, language);
  return { ...texts, ...cached, ...fresh };
}

/** Hash a source string so a translation can be matched without duplicating the English. */
async function hashSource(text) {
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

/** Look up previously stored translations for this batch. Best effort only. */
async function readTranslationCache(base44, texts, keys, language) {
  const found = {};
  try {
    const hashes = {};
    for (const key of keys) hashes[key] = await hashSource(String(texts[key]));
    const unique = [...new Set(Object.values(hashes))];
    const rows = [];
    for (let i = 0; i < unique.length; i += 40) {
      const page = await base44.asServiceRole.entities.TranslationCache.filter({
        language,
        source_hash: { $in: unique.slice(i, i + 40) },
      });
      if (Array.isArray(page)) rows.push(...page);
    }
    const byHash = new Map(rows.map((row) => [row.source_hash, row.translated_text]));
    for (const key of keys) {
      const value = byHash.get(hashes[key]);
      if (typeof value === 'string' && value.length > 0) found[key] = value;
    }
  } catch (err) {
    console.warn('[translateTextBatch] Cache read failed:', err && err.message);
  }
  return found;
}

/** Persist newly translated strings. Best effort — a failure never blocks the page. */
async function storeTranslations(base44, sources, translated, language) {
  try {
    const seen = new Set();
    const rows = [];
    for (const [key, value] of Object.entries(translated)) {
      const source = sources[key];
      if (typeof source !== 'string' || source.length === 0) continue;
      // A result identical to the source means it was not translated —
      // caching that would serve English forever.
      if (typeof value !== 'string' || value.length === 0 || value === source) continue;
      const hash = await hashSource(source);
      if (seen.has(hash)) continue;
      seen.add(hash);
      rows.push({ language, source_hash: hash, translated_text: value });
    }
    if (rows.length > 0) {
      await base44.asServiceRole.entities.TranslationCache.bulkCreate(rows);
    }
  } catch (err) {
    console.warn('[translateTextBatch] Cache write failed:', err && err.message);
  }
}

/** Send one batch to the model. Returns only the keys it actually translated. */
async function callTranslator(base44, texts, languageName) {
  try {
    const prompt = [
      `You are a professional translator for an educational platform.`,
      `Translate the following JSON object from English to ${languageName}.`,
      `Rules:`,
      `1. Preserve ALL JSON keys and structure exactly — only translate the string values.`,
      `2. Keep any HTML tags intact — only translate the text inside them.`,
      `3. Do NOT translate URLs, email addresses, or code snippets.`,
      `4. Return ONLY a valid JSON object with the same keys and structure. No markdown, no code fence, no explanation.`,
      ``,
      JSON.stringify(texts),
    ].join('\n');

    const result = await base44.asServiceRole.integrations.Core.InvokeLLM({ prompt });

    let translatedObj = null;
    if (typeof result === 'string') {
      try {
        translatedObj = JSON.parse(stripCodeFences(result));
      } catch (parseErr) {
        console.error('[translateTextBatch] JSON parse failed:', parseErr && parseErr.message);
      }
    } else if (result && typeof result === 'object') {
      translatedObj = result;
    }

    if (!translatedObj || typeof translatedObj !== 'object' || translatedObj.error) return {};

    const allowed = new Set(Object.keys(texts));
    const out = {};
    for (const [key, value] of Object.entries(translatedObj)) {
      if (allowed.has(key) && typeof value === 'string' && value.length > 0) out[key] = value;
    }
    return out;
  } catch (err) {
    console.error('[translateTextBatch] Translation failed:', err && err.message);
    return {};
  }
}

/**
 * Translate a module content object to the target language.
 * Returns the original content if language is 'en', unknown, or on error.
 *
 * @param {Object} base44 - The Base44 client (with asServiceRole)
 * @param {Object} content - The sanitized module content object
 * @param {string} language - The target language code ('en', 'sw', 'es', ...)
 * @returns {Promise<Object>} The translated content object
 */
export async function translateModuleContent(base44, content, language) {
  if (!language || language === 'en') return content;
  const languageName = LANGUAGE_NAMES[language];
  if (!languageName) return content;

  try {
    // Only translate text-heavy fields. Metadata (route, number, status,
    // sections, etc.) stays in English to keep the payload small.
    const fieldsToTranslate = {};
    if (content.title) fieldsToTranslate.title = content.title;
    if (content.lesson) fieldsToTranslate.lesson = content.lesson;

    const translatableKeys = Object.keys(fieldsToTranslate);
    if (translatableKeys.length === 0) return content;

    const prompt = [
      `You are a professional translator for an educational platform.`,
      `Translate the following JSON object from English to ${languageName}.`,
      `Rules:`,
      `1. Preserve all JSON structure, keys, and non-text values (IDs, URLs, numbers, booleans, arrays of section IDs).`,
      `2. Only translate human-readable text fields (paragraphs, objectives, concepts, questions, options, instructions, feedback, headings).`,
      `3. Keep any HTML tags intact — only translate the text inside them.`,
      `4. Return ONLY a valid JSON object. No markdown, no code fence, no explanation.`,
      ``,
      JSON.stringify(fieldsToTranslate),
    ].join('\n');

    const result = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt,
    });

    // Without response_json_schema, InvokeLLM returns a string
    let translatedObj = null;
    if (typeof result === 'string') {
      try {
        const jsonStr = stripCodeFences(result);
        translatedObj = JSON.parse(jsonStr);
      } catch (parseErr) {
        console.error('[translateModuleContent] JSON parse failed:', parseErr && parseErr.message);
        console.error('[translateModuleContent] Raw result (first 200):', result.slice(0, 200));
      }
    } else if (result && typeof result === 'object') {
      translatedObj = result;
    }

    // Validate the translated object
    if (
      translatedObj &&
      typeof translatedObj === 'object' &&
      !translatedObj.error &&
      Object.keys(translatedObj).length > 0
    ) {
      const translatedKeys = Object.keys(translatedObj);
      const matchingKeys = translatedKeys.filter((k) => translatableKeys.includes(k));
      if (matchingKeys.length > 0) {
        return { ...content, ...translatedObj };
      }
      console.warn('[translateModuleContent] Result keys did not match:', translatedKeys.slice(0, 5));
    } else {
      console.warn('[translateModuleContent] Empty or invalid result');
    }
    return content;
  } catch (err) {
    console.error('[translateModuleContent] Translation failed:', err && err.message);
    return content;
  }
}