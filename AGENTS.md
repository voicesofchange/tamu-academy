# AGENTS.md

## Project Context

This is a Base44 app repository. Treat it as user-owned application code, keep changes focused on the user's request, and preserve existing project conventions.

Start with `README.md` for local setup, environment variables, and publish workflow.

## Base44 References

- CLI overview: https://docs.base44.com/developers/references/cli/get-started/overview.md
- Agent skills: https://docs.base44.com/developers/backend/overview/skills.md

If your agent supports Agent Skills, install or update Base44 skills before Base44-specific work:

```bash
npx skills add base44/skills
```

## Key Files

- `src/`: frontend application source.
- `src/api/base44Client.js`: frontend Base44 SDK client.
- `vite.config.js`: Vite config and Base44 Vite plugin setup.
- `.env.local`: local-only environment values; never commit secrets.

## Working Notes

- Use `base44 dev` as the default local development command when you need the local Base44 backend. It can run the backend and frontend together.
- When docs or code mention the frontend being started automatically, that usually means the Base44 project config includes `site.serveCommand`, for example `"serveCommand": "npm run dev"` in `base44/config.jsonc`.
- Use `npm run dev` only for frontend-only work against the hosted Base44 backend.
- Prefer the existing Base44 CLI workflow over adding new npm scripts for Base44-specific tasks.
- Reuse the existing SDK client and Vite plugin patterns before adding new Base44 integration paths.
- Run the relevant checks from `package.json` before finishing code changes.

## Tamu Academy Standing Rules

These apply to every new page, component, course, quiz, form and email. They are
not optional and not per-task; treat a change that breaks one as incomplete.

1. **Every learner-facing word goes through the translation system.** English is
   the source text; Swahili, Spanish and French come from the cache, with the
   English as fallback when a translation is missing or invalid.
   - Course and module content: `base44/shared/course-translation.js`
     (`translateCourseSections`, `COURSE_TRANSLATABLE_LANGUAGES`) and
     `base44/shared/translate-content.js`. Cache records live in the
     `TranslationCache` entity.
   - Page and interface copy: `src/lib/i18n/` (`useTranslatedContent`,
     `translate-data.js`) — pass strings in through a translation key, never
     render them as literals.
   - Emails: `base44/shared/email-localization.js` plus an MJML template in
     `base44/emails/`, with `{placeholders}` for names and identifiers.
   - Do not hard-code learner-facing text anywhere outside these paths.
2. **Respect the do-not-translate list.** `PROTECTED_TERMS` in
   `base44/shared/course-translation.js` (course, module and place names,
   Kiswahili terminology already glossed, and so on) must survive unchanged.
   Identifiers, slugs, routes, enum values, statuses, video URLs and answer keys
   are never translated either.
3. **New pages load on demand.** Register every new page in
   `src/lib/lazy-pages.js` and import it from there in `src/App.jsx`. Only the
   homepage and the sign-in / sign-up screens belong in the main bundle.
4. **New courses use the shared course template and registry.** Register the
   course in `base44/shared/course-template-config.js` so it appears in
   `COURSE_REGISTRY`; reuse `TemplateCourseModule` and the
   `enrollTemplateCourse` / `updateTemplateCourseProgress` /
   `checkTemplateCourseQuiz` / `completeTemplateCourseModule` /
   `issueTemplateCourseCertificate` functions. See
   `base44/shared/course-template-guide.md`. Only a course that genuinely cannot
   fit the template gets its own pages and functions.
5. **Keep enrollment progress current.** Use
   `base44/shared/enrollment-progress.js` from every function that completes a
   module or course, so `CourseEnrollment.progress_percentage` updates after each
   module.
6. **Enroll learners who arrive from sign-up.** Route enrollment through
   `src/lib/course-enrollment.js` (`enrollInCourse`, or the template course's own
   enrollment function) so a learner coming from the sign-up flow is enrolled
   without a second manual step.
7. **Never rename or delete an existing data field.** Add new fields only.
   Existing entity properties, slugs and enum values stay exactly as they are,
   because saved learner data, certificates and exports depend on them.