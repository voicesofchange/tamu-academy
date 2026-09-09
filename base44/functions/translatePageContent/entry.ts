import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';
import { translateTextBatch } from '../../shared/translate-content.js';

/**
 * translatePageContent — batch-translates a page's text content object.
 *
 * Request body: { texts: Record<string, string>, language: string }
 * Response: { translations: Record<string, string> }
 *
 * Falls back to the original texts on any error so the page still renders.
 */
export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const { texts, language } = body;

    if (!texts || typeof texts !== 'object' || Array.isArray(texts)) {
      return Response.json({ error: 'texts must be an object' }, { status: 400 });
    }
    if (!language || typeof language !== 'string') {
      return Response.json({ error: 'language is required' }, { status: 400 });
    }

    const translations = await translateTextBatch(base44, texts, language);
    return Response.json({ translations });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}