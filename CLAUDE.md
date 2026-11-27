# See AGENTS.md

Follow the instructions in `AGENTS.md`.

## Translation and proofreading rule for every PR

Tamu Academy is read in English, Kiswahili, Español and Français. Every PR that
adds or changes learner- or visitor-facing text must, before it is opened:

1. **Proofread all new English copy** for spelling, grammar, punctuation and
   consistent capitalization. Keep brand and course names exactly as written
   (Tamu Academy, Sauti za Soko, Waiyaki wa Hinga, Waiyaki House, Voices of
   Change, Safari ya Utu) and do not "correct" Kiswahili or other culturally
   specific terms. Use "…" (not "...") in loading and progress messages, and
   "Sign in" for signing in.
2. **Route 100% of visible strings through translation**: `t('…')` from
   `useTranslation()` with keys in `src/lib/i18n/translations/`, or
   `useTranslatedContent()` with a module-level `CONTENT` / `UI_TEXT` object.
   This covers JSX text, button and link labels, headings, badges,
   placeholders, `aria-label`/`title`/`alt` text, empty states, and error or
   success messages set in code. Keep each translation object at or under 100
   strings, and write sentences that contain values as one template with
   `{placeholders}` filled by `fillTemplate()`, never as fragments. Never
   translate stored values, keys, ids, slugs, routes, statuses or answer keys.
3. **Keep the four dictionaries in step**: any key added to `en.js` is added to
   `sw.js`, `es.js` and `fr.js` in the same PR with a real translation (not the
   English copied over) and the same `{placeholders}`.

`npm run lint` runs `scripts/check-i18n.js`, which fails on dictionary key or
placeholder mismatches, empty values, and translation objects over 100
strings. Run it (or `npm run check:i18n`) before opening a PR; a failing check
means the change is not finished.
