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
import { buildSourceKey } from './translation-review.js';

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
 * @param {string} [instructions] - Extra rules appended to the translator's
 *   instructions, e.g. protected names and terms that must not be translated.
 * @returns {Promise<Object>} The translated texts object
 */
export async function translateTextBatch(base44, texts, language, instructions = '', context = null) {
  if (!language || language === 'en') return texts;
  const languageName = LANGUAGE_NAMES[language];
  if (!languageName) return texts;
  if (!texts || typeof texts !== 'object' || Object.keys(texts).length === 0) return texts;

  const keys = Object.keys(texts);

  // Anything already translated for this language is served from the cache,
  // so a page is translated once and repeated views never reach the model.
  const cached = await readTranslationCache(base44, texts, keys, language, context);
  const missing = {};
  for (const key of keys) {
    if (cached.texts[key] === undefined) missing[key] = texts[key];
  }
  if (Object.keys(missing).length === 0) {
    return { ...texts, ...cached.texts };
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
    return { ...texts, ...cached.texts };
  }

  const fresh = await callTranslator(base44, missing, languageName, instructions);
  await storeTranslations(base44, missing, fresh, language, context, cached.rows);
  return { ...texts, ...cached.texts, ...fresh };
}

/** Hash a source string so a translation can be matched without duplicating the English. */
async function hashSource(text) {
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Look up previously stored translations for this batch. Best effort only.
 *
 * With a course context, entries are found by their stable source key, so a
 * translation can be followed across rewrites of its English text: a matching
 * hash is served from the cache, a differing hash flags the stored translation
 * as outdated so it is redone and reviewed again. Rows without a key (page
 * text, and everything translated before review existed) keep the hash lookup.
 */
async function readTranslationCache(base44, texts, keys, language, context = null) {
  const found = {};
  const rows = new Map();
  const hashes = {};
  try {
    for (const key of keys) hashes[key] = await hashSource(String(texts[key]));
  } catch (err) {
    console.warn('[translateTextBatch] Cache hashing failed:', err && err.message);
    return { texts: found, rows };
  }

  const keyed = context && context.courseSlug && context.moduleSlug
    ? keys
        .map((key) => ({ key, sourceKey: buildSourceKey(context.courseSlug, context.moduleSlug, key) }))
        .filter((entry) => entry.sourceKey)
    : [];

  if (keyed.length > 0) {
    try {
      const unique = [...new Set(keyed.map((entry) => entry.sourceKey))];
      for (let i = 0; i < unique.length; i += 40) {
        const page = await base44.asServiceRole.entities.TranslationCache.filter({
          language,
          source_key: { $in: unique.slice(i, i + 40) },
        });
        const pageRows = Array.isArray(page) ? page : (page && page.items) || [];
        for (const row of pageRows) rows.set(row.source_key, row);
      }

      const stale = [];
      for (const entry of keyed) {
        const row = rows.get(entry.sourceKey);
        if (!row) continue;
        if (row.source_hash === hashes[entry.key]) {
          if (typeof row.translated_text === 'string' && row.translated_text.length > 0) {
            found[entry.key] = row.translated_text;
          }
        } else if (row.status !== 'outdated') {
          // The English changed. Flag the stored translation so it is redone
          // and reviewed again; the text itself is left exactly as it was.
          stale.push({ id: row.id, status: 'outdated' });
          row.status = 'outdated';
        }
      }
      if (stale.length > 0) {
        await base44.asServiceRole.entities.TranslationCache.bulkUpdate(stale).catch((err) => {
          console.warn('[translateTextBatch] Outdated flag failed:', err && err.message);
        });
      }
    } catch (err) {
      console.warn('[translateTextBatch] Keyed cache read failed:', err && err.message);
    }
  }

  // Anything with no keyed entry falls back to the shared hash cache.
  const legacyKeys = keys.filter((key) => {
    if (found[key] !== undefined) return false;
    const sourceKey = context && context.courseSlug && context.moduleSlug
      ? buildSourceKey(context.courseSlug, context.moduleSlug, key)
      : null;
    return !sourceKey || !rows.has(sourceKey);
  });

  if (legacyKeys.length > 0) {
    try {
      const unique = [...new Set(legacyKeys.map((key) => hashes[key]))];
      const hashRows = [];
      for (let i = 0; i < unique.length; i += 40) {
        const page = await base44.asServiceRole.entities.TranslationCache.filter({
          language,
          source_hash: { $in: unique.slice(i, i + 40) },
        });
        const pageRows = Array.isArray(page) ? page : (page && page.items) || [];
        hashRows.push(...pageRows);
      }
      const byHash = new Map();
      for (const row of hashRows) {
        if (typeof row.translated_text === 'string' && row.translated_text.length > 0) {
          byHash.set(row.source_hash, row);
        }
      }

      // A course translation cached before review existed is given its unit
      // identity here, so it appears in review and gains a reviewer's lock.
      const upgrades = [];
      for (const key of legacyKeys) {
        const row = byHash.get(hashes[key]);
        if (!row) continue;
        found[key] = row.translated_text;
        if (!context || !context.courseSlug || !context.moduleSlug) continue;
        if (row.source_key) continue;

        const sourceKey = buildSourceKey(context.courseSlug, context.moduleSlug, key);
        if (!sourceKey || rows.has(sourceKey)) continue;

        const english = typeof context.toSourceText === 'function'
          ? context.toSourceText(String(texts[key])) || String(texts[key])
          : String(texts[key]);

        const upgraded = {
          ...row,
          source_key: sourceKey,
          source_text: english,
          course_slug: context.courseSlug,
          module_slug: context.moduleSlug,
          module_title: context.moduleTitle || null,
          field_path: key,
          status: row.status || 'unreviewed',
        };
        rows.set(sourceKey, upgraded);
        upgrades.push({
          id: row.id,
          source_key: sourceKey,
          source_text: english,
          course_slug: context.courseSlug,
          module_slug: context.moduleSlug,
          module_title: context.moduleTitle || null,
          field_path: key,
          status: upgraded.status,
        });
      }

      if (upgrades.length > 0) {
        await base44.asServiceRole.entities.TranslationCache.bulkUpdate(upgrades).catch((err) => {
          console.warn('[translateTextBatch] Cache upgrade failed:', err && err.message);
        });
      }
    } catch (err) {
      console.warn('[translateTextBatch] Cache read failed:', err && err.message);
    }
  }

  return { texts: found, rows };
}

/**
 * Persist newly translated strings. Best effort — a failure never blocks the page.
 *
 * A reviewed translation is never replaced automatically: it is skipped here
 * whatever its hash, so only an administrator can change its text.
 */
async function storeTranslations(base44, sources, translated, language, context = null, rows = new Map()) {
  try {
    const creates = [];
    const updates = [];
    const seenKeys = new Set();
    const seenHashes = new Set();

    for (const [key, value] of Object.entries(translated)) {
      const source = sources[key];
      if (typeof source !== 'string' || source.length === 0) continue;
      // A result identical to the source means it was not translated —
      // caching that would serve English forever.
      if (typeof value !== 'string' || value.length === 0 || value === source) continue;

      const hash = await hashSource(source);
      const sourceKey = context && context.courseSlug && context.moduleSlug
        ? buildSourceKey(context.courseSlug, context.moduleSlug, key)
        : null;

      if (!sourceKey) {
        if (seenHashes.has(hash)) continue;
        seenHashes.add(hash);
        creates.push({ language, source_hash: hash, translated_text: value });
        continue;
      }

      const existing = rows.get(sourceKey);
      if (existing && existing.status === 'reviewed') continue;
      if (seenKeys.has(sourceKey)) continue;
      seenKeys.add(sourceKey);

      // The English shown to reviewers has its protected names restored; the
      // hash still matches the protected text used for lookups.
      const english = typeof context.toSourceText === 'function'
        ? context.toSourceText(source) || source
        : source;

      const record = {
        language,
        source_hash: hash,
        translated_text: value,
        source_key: sourceKey,
        source_text: english,
        course_slug: context.courseSlug,
        module_slug: context.moduleSlug,
        module_title: context.moduleTitle || null,
        field_path: key,
        status: 'unreviewed',
        reviewed_at: null,
        reviewed_by: null,
      };

      if (existing) updates.push({ id: existing.id, ...record });
      else creates.push(record);
    }

    if (updates.length > 0) {
      await base44.asServiceRole.entities.TranslationCache.bulkUpdate(updates);
    }
    if (creates.length > 0) {
      await base44.asServiceRole.entities.TranslationCache.bulkCreate(creates);
    }
  } catch (err) {
    console.warn('[translateTextBatch] Cache write failed:', err && err.message);
  }
}

/**
 * Send one batch to the model. Returns only the keys it actually translated.
 * The cached lookup uses the same source text, so any protection applied by
 * the caller is stable between runs.
 */
async function callTranslator(base44, texts, languageName, instructions = '') {
  try {
    const prompt = [
      `You are a professional translator for an educational platform.`,
      `Translate the following JSON object from English to ${languageName}.`,
      `Rules:`,
      `1. Preserve ALL JSON keys and structure exactly — only translate the string values.`,
      `2. Keep any HTML tags intact — only translate the text inside them.`,
      `3. Do NOT translate URLs, email addresses, or code snippets.`,
      `4. Return ONLY a valid JSON object with the same keys and structure. No markdown, no code fence, no explanation.`,
      ...(instructions ? ['', instructions] : []),
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