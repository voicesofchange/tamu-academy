import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';
import { translateTextBatch } from '../../shared/translate-content.js';

/**
 * translatePageContent — batch-translates a page's text content object.
 *
 * Request body: { texts: Record<string, string>, language: string }
 * Response: { translations: Record<string, string> }
 *
 * Falls back to the original texts on any error so the page still renders.
 *
 * Security: this function is reachable by anonymous visitors (public pages
 * are translated for logged-out users), so the `texts` payload is bounded
 * to prevent the endpoint being used as an open, unbounded LLM proxy. The
 * language must be one the app actually serves; keys and total content size
 * are capped.
 */
const SUPPORTED_LANGUAGES = new Set(['en', 'sw', 'es', 'fr', 'pt', 'ar', 'am']);
const MAX_KEYS = 100;
const MAX_TOTAL_CHARS = 20000;

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const { texts, language } = body;

    if (!texts || typeof texts !== 'object' || Array.isArray(texts)) {
      return Response.json({ error: 'texts must be an object' }, { status: 400 });
    }
    if (!language || typeof language !== 'string' || !SUPPORTED_LANGUAGES.has(language)) {
      return Response.json({ error: 'language is required' }, { status: 400 });
    }

    const keys = Object.keys(texts);
    if (keys.length > MAX_KEYS) {
      return Response.json({ error: 'too many keys' }, { status: 413 });
    }

    let totalChars = 0;
    for (const k of keys) {
      const v = texts[k];
      if (typeof v !== 'string') {
        return Response.json({ error: 'text values must be strings' }, { status: 400 });
      }
      totalChars += v.length;
      if (totalChars > MAX_TOTAL_CHARS) {
        return Response.json({ error: 'content too large' }, { status: 413 });
      }
    }

    const translations = await translateTextBatch(base44, texts, language);
    return Response.json({ translations });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}