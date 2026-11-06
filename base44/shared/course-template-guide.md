# Adding a course with the course template

The template is one module page and one set of backend functions, driven
entirely by two files. A new course is a curriculum entry and a registry entry —
no new pages, routes, functions or components.

```
base44/shared/course-template-config.js       ← the course registry (rules)
base44/shared/course-template-curriculum.js   ← the module content (what is read)
base44/shared/course-template-service.js      ← shared server logic (do not copy)
```

The generic pieces that pick a course up automatically:

| Piece | What it does |
| --- | --- |
| `src/pages/TemplateCourseModule.jsx` | One module page, route `/courses/:courseSlug/:moduleRoute` |
| `enrollTemplateCourse` | Enrollment, de-duplicated per learner and course |
| `getTemplateCourseModule` | Module content + course outline + this learner's progress |
| `updateTemplateCourseProgress` | Records the self-attested completion steps |
| `checkTemplateCourseQuiz` | Server-side grading; the only writer of `quiz_passed` |
| `completeTemplateCourseModule` | Marks a module complete once its requirements are met |
| `issueTemplateCourseCertificate` | Issues/returns the course certificate |

## 1. Write the module content

In `base44/shared/course-template-curriculum.js`, add an entry keyed by the
course slug, then by module route:

```js
export const TEMPLATE_CURRICULUM = {
  'my-new-course': {
    'module-1': {
      title: '…',
      estimatedTime: '30 minutes',
      video: { title: '…', watchUrl: 'https://…', note: '…' },   // optional
      goals: ['…'],
      lessonSections: [{ heading: '…', paragraphs: ['…'], pauseAndThink: '…' }],
      activity: { intro: '…', steps: ['…'] },                     // optional
      keyTerms: [{ term: '…', meaning: '…' }],                    // optional
      quiz: {
        passingScore: 3,
        questions: [
          { id: 'q1', question: '…', options: ['…'], correctIndex: 1, feedback: '…' },
        ],
      },
      reflection: '…',
      requirements: ['lesson', 'activity', 'knowledge_check', 'reflection'],
    },
  },
};
```

- Only `title`, `lessonSections` and `requirements` are required. A step the
  module does not carry is not rendered, and does not need a requirement.
- `requirements` accepts `media`, `lesson`, `activity`, `scenario`,
  `knowledge_check`, `reflection`.
- Every quiz question needs a unique `id`. `correctIndex` is the answer key:
  it stays on the server and never reaches the browser.
- `video`, `video.watchUrl` and any links are shown as links; nothing is
  embedded and no URL is invented for you.

## 2. Add the registry entry

In `base44/shared/course-template-config.js`, add one entry to
`TEMPLATE_COURSE_REGISTRY`:

```js
'my-new-course': {
  slug: 'my-new-course',
  title: 'My New Course',
  pillar: '…',
  track: '…',
  completionStatement: 'This certifies that …',
  enrollmentOpen: true,
  certificate: {
    includeEnrollmentId: true,
    verificationCode: true,
    requiresCompletedEnrollment: false,
    extraRequirements: 'none',
    finalizesEnrollment: true,
  },
  modules: [
    { route: 'module-1', number: 'Module 1', title: '…', published: true, prerequisite: null },
    { route: 'module-2', number: 'Module 2', title: '…', published: false, prerequisite: 'module-1' },
  ],
},
```

- `published` is the publication gate: an unpublished module returns 403 to
  learners and is still readable by administrators for review.
- `prerequisite` is the module that must be completed first. `null` means the
  module opens the course; leaving it out defaults to the previous module.
- `enrollmentOpen: false` closes enrollment to learners; admins can still
  enroll.
- The entry is added to the shared course registry automatically
  (`TEMPLATE_COURSE_CONFIGS`), so course progress, enrollment progress and
  certificate issuance work without any further wiring.

## 3. Link the course somewhere

The module page already exists at `/courses/my-new-course/module-1`. Add the
course's entry point wherever it belongs (the catalogue, a landing section, an
email) — no route and no page is needed. Learners who are not enrolled see a
one-click start gate on the module page.

## What the template guarantees

- **Server-side trust.** Answer keys and grading never reach the browser; a
  correct option's text is returned only after a complete submission.
- **Session-derived identity.** `learner_id` always comes from the session;
  bodies carrying `learner_id`, `score`, `passed`, `status` or `completed_at`
  are refused.
- **Per-module progress.** Each module's steps are recorded on `ModuleProgress`,
  and the enrollment's percentage is recalculated from it.
- **Translation.** Module content is translated by the shared
  course-translation layer into the learner's selected language, cached per
  string and reviewable on `/admin/translation-review`. Protected names and
  identifiers are never translated.
- **Certificates.** The certificate reads its title, statement, required
  modules and rules from the registry entry. An administrator who cannot yet be
  issued one receives a preview instead.

## The example course

`template-example` is a working demonstration registered in both files. Its
second module is unpublished on purpose. Read it, then delete its registry
entry and curriculum block when you add your first real course.

## Rules of thumb

- Never import `course-template-config.js` or `course-template-curriculum.js`
  from `src/` — they are server-side only, and the curriculum holds the answer
  keys.
- Never copy one of the six functions for a new course. Register the course
  instead.
- Do not add course-specific branching to the shared files. If a course needs
  a rule the template cannot express, extend the registry schema — one place,
  not one per course.