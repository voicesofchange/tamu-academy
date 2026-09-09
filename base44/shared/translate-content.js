/**
 * Shared module for translating module content via InvokeLLM.
 * Used by getModuleContent (Economics) and getMentalHealthModule.
 *
 * Only the text-heavy fields (title and lesson) are sent for translation.
 * Metadata fields (route, number, status, sections, etc.) stay in English
 * to keep the translation payload small and reliable. On any error, the
 * original English content is returned so the learner is never blocked.
 */

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

    const result = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt,
    });

    let translatedObj = null;
    if (typeof result === 'string') {
      try {
        const jsonStr = stripCodeFences(result);
        translatedObj = JSON.parse(jsonStr);
      } catch (parseErr) {
        console.error('[translateTextBatch] JSON parse failed:', parseErr && parseErr.message);
      }
    } else if (result && typeof result === 'object') {
      translatedObj = result;
    }

    if (
      translatedObj &&
      typeof translatedObj === 'object' &&
      !translatedObj.error &&
      Object.keys(translatedObj).length > 0
    ) {
      const originalKeys = Object.keys(texts);
      const translatedKeys = Object.keys(translatedObj);
      const matchingKeys = translatedKeys.filter((k) => originalKeys.includes(k));
      if (matchingKeys.length > 0) {
        return { ...texts, ...translatedObj };
      }
    }
    return texts;
  } catch (err) {
    console.error('[translateTextBatch] Translation failed:', err && err.message);
    return texts;
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