/**
 * Learner-facing interface labels for the Sauti za Soko pathway.
 *
 * These are the words AROUND the curriculum — section headings, activity
 * instructions, progress states, completion and certificate copy. The
 * curriculum itself is translated server-side in getSokoModule; this file
 * covers the interface so a learner who selects a language reads the whole
 * pathway in it, not only the lesson text.
 *
 * The set is split in two because translatePageContent caps a request at 100
 * keys. SOKO_MODULE_LABELS carries the module route, its activities and its
 * progress block; SOKO_PAGE_LABELS carries the course overview, completion
 * and certificate screens. SokoLabelsProvider translates both and merges
 * them, and SOKO_UI_LABELS is the merged English default so any Soko
 * component rendered outside a provider still reads correctly.
 *
 * Both objects must stay stable module-level references: they are passed to
 * useTranslatedContent, which translates each once per language and caches
 * the result in sessionStorage for the rest of the session.
 */
export const SOKO_MODULE_LABELS = {
  // --- Module route: section framing ---
  breadcrumbModule: 'Module',
  estimatedTimeLabel: 'Estimated time',
  moduleCompetency: 'Module Competency',
  objectivesEyebrow: 'Objectives',
  objectivesHeading: 'Learning Objectives',
  introEyebrow: 'Lesson Introduction',
  introHeading: 'Tamu Academy Introduction',
  contextEyebrow: 'Context',
  contextHeading: 'Terms and Institutions in This Module',
  contextIntro:
    'This module uses terms and institutions from Kenya. They are explained here in plain language. These notes are context, not additional requirements.',
  conceptsEyebrow: 'Concepts',
  conceptsHeading: 'Key Concepts and Definitions',
  exampleLabel: 'Example',
  caseEyebrow: 'Kiambu Case',
  caseTakeawaysLabel: 'What this case shows',
  comparisonEyebrow: 'Comparison',
  comparisonHeading: 'International Comparison',
  actionPlanEyebrow: 'Action Plan',
  facilitatorRecordEyebrow: 'Facilitator Record',
  facilitatorRecordHeading: 'My Vendor Circle Record',
  discussionEyebrow: 'Discussion',
  discussionHeading: 'Mazungumzo: A Question for the Circle',
  checkEyebrow: 'Check',
  checkHeading: 'Knowledge Check',
  checkIntro:
    'Five multiple-choice questions. Answer at least four correctly to pass. Feedback appears only after you submit, and you can retry as many times as you need.',
  reflectEyebrow: 'Reflect',
  reflectHeading: 'Reflection Prompts',
  reflectIntro:
    'Respond to one of these in your own way. Nothing you write here is stored; answering privately and marking the requirement complete is what is recorded.',
  requirementsEyebrow: 'Requirements',
  requirementsHeading: 'Completion Requirements',
  requirementActivityCore: 'Save your section of the My Soko Action Plan.',
  requirementActivityFacilitator: 'Submit your vendor-circle record for review.',
  closingEyebrow: 'Closing',
  closingHeading: 'Module Closing',
  courseClosingEyebrow: 'Course Closing',
  courseClosingHeading: 'Course Closing',
  sourcesEyebrow: 'Sources',
  sourcesHeading: 'Sources and Further Reading',
  navNextPrefix: 'Next:',
  navCourseCompletion: 'Course completion',
  navFirstModule: 'This is the first module',
  navPreviousPrefix: 'Previous:',
  navReturnToCourse: 'Return to Course',
  ofWord: 'of',

  // --- International comparison ---
  comparisonBadge: 'Supplement',
  comparisonFraming:
    'This supplement sits alongside the Kiambu case. It adds to it and does not replace it.',
  comparisonExamplesHeading: 'Other markets, same question',
  comparisonNoWriting:
    'Nothing needs to be written here. The comparison is for your own thinking.',

  // --- Action Plan activity ---
  purposeLabel: 'Purpose',
  actionPrivacy:
    'Your answers are stored privately to your account and are visible only to you and to course administrators. Saving this section completes the module\u2019s action requirement.',
  actionSave: 'Save my action plan section',
  actionSaving: 'Saving\u2026',
  actionSaved:
    'Saved to your My Soko Action Plan. You can return and revise it at any time.',
  actionError: 'We could not save your answers right now. Please try again.',
  actionLoading: 'Loading your saved section\u2026',
  actionSectionsAnswered: 'sections answered',
  actionUnavailable: 'Saving is available once your enrollment is active.',

  // --- Kiswahili discussion prompt ---
  discussionBadge: 'Mazungumzo \u00b7 Discussion',
  discussionYourResponse: 'Your response',
  discussionLanguage: 'Language',
  discussionConsent:
    'I agree to my response being shared with other learners on this course. Without this, it stays private.',
  discussionSave: 'Save my response',
  discussionSaving: 'Saving\u2026',
  discussionSaved:
    'Your response has been saved. One response completes the peer discussion requirement for the course.',
  discussionError: 'We could not save your response right now. Please try again.',
  discussionLoading: 'Loading your saved response\u2026',

  // --- Module progress and completion control ---
  progressLoading: 'Loading\u2026',
  progressUnavailable:
    'Progress tracking becomes available once your enrollment is active. Until then the module can be read, but nothing is saved.',
  progressPrivacyNote:
    'Your reflections and action-plan answers are stored privately to your account. The knowledge check and the action-plan requirement are verified by the server, not self-attested.',
  progressMarkComplete: 'Mark complete',
  progressSaving: 'Saving\u2026',
  progressCompleted: 'Completed',
  progressPassed: 'Passed',
  progressVerifiedByCheck: 'Verified by knowledge check',
  progressSaved: 'Saved',
  progressSaveSection: 'Save your section above',
  progressCompleteModule: 'Complete module',
  progressAllComplete: 'Module complete. Your progress has been saved.',
  progressOutstanding: 'Some requirements are not yet complete.',
  progressSaveError: 'We could not save your progress right now. Please try again.',
  progressCompleteError:
    'We could not complete this module right now. Please try again.',
  progressModePrivate: 'Private',
  progressModeFictional: 'Fictional alternative',
};

export const SOKO_PAGE_LABELS = {
  // --- Course overview progress block ---
  courseProgressLoading: 'Loading your progress\u2026',
  courseOverallProgress: 'Overall progress',
  courseModulesWord: 'modules',
  courseResumeAt: 'Resume at',
  courseReviewCompletion: 'Review course completion',
  courseActionPlanLink: 'My Soko Action Plan',
  courseViewCertificate: 'View Certificate',
  courseEnrollBody:
    'Seven modules grounded in a Kiambu market, written so that a learner anywhere can follow them. Local terms are explained as they appear, and every module carries an international comparison. No previous economics training is needed.',
  courseEnroll: 'Enroll in this course',
  courseEnrolling: 'Enrolling\u2026',
  courseEnrollError:
    'We could not enroll you right now. Please try again, and make sure you are signed in.',
  courseSignIn:
    'Sign in or create an account to track your progress through the seven modules and your My Soko Action Plan.',
  courseCertificateReady:
    'You have completed all seven modules and every course requirement. Your certificate of completion is available.',
  courseOutstandingIntro:
    'Course completion also requires every My Soko Action Plan section, one peer discussion and the final reflection. Still outstanding:',
  coursePeerNote:
    'The optional Peer Facilitator track can be started once the seven core modules are complete.',
  courseOptionalNextStep: 'Optional next step',
  coursePeerTrackLink: 'Peer Facilitator track',
  peerTrackEyebrow: 'Optional Track',
  peerEntryRequirementLabel: 'Entry requirement',
  peerEstimatedTimeLabel: 'Estimated time',
  peerViewTrack: 'View the Peer Facilitator track',
  peerSummary:
    'An optional track for learners who have completed the seven core modules. It prepares you to hold one vendor circle with other traders, with clear consent and safeguarding, and certifies peer facilitation separately from the core course.',
  peerEntryRequirement:
    'The seven core modules must be completed first, and your vendor-circle session plan, discussion summary and reflection must be approved by a reviewer.',
  peerEstimatedTime: '60\u201375 minutes, plus one facilitated discussion',

  // --- Course completion page ---
  completionEyebrow: 'Course Completion',
  completionSubheading:
    'Your modules, your My Soko Action Plan, your peer discussion and your final reflection, in one place.',
  completionProgressHeading: 'Your progress',
  completionSignIn: 'Sign in to see your progress through this course.',
  completionModulesComplete: 'modules complete',
  completionEnrollmentActive: 'Your enrollment is active.',
  completionNotEnrolled: 'You are not yet enrolled in this course.',
  completionBeyondHeading: 'Course requirements beyond the modules',
  completionOpenModule: 'Open this module',
  completionReflectionHeading: 'Final reflection',
  completionReflectionPrompt:
    'Write your final reflection on the course. What has changed in how you read your market or your business, what will you do first, and what will you explain to somebody else? Two or three paragraphs is enough.',
  completionFinaliseHeading: 'Finalise your course',
  completionFinaliseBody:
    'When every module and every requirement above is complete, finalise your course. Your certificate is then generated and emailed to you as a PDF, and it also appears on this site.',
  completionViewCertificate: 'View my certificate',
  completionFinalise: 'Finalise my course',
  completionFinalising: 'Finalising\u2026',
  completionFinaliseSuccess:
    'Your course is complete. Your certificate is being prepared and will appear on this page shortly, and is also emailed to you.',
  completionOutstanding: 'Some requirements are still outstanding',
  completionFinaliseError:
    'We could not finalise your course right now. Please try again.',
  completionPeerLink: 'Optional: Peer Facilitator track',
  completionLoading: 'Loading your course record\u2026',

  // --- Final reflection ---
  reflectionLabel: 'Your final reflection',
  reflectionSave: 'Save reflection',
  reflectionSaving: 'Saving\u2026',
  reflectionSaved: 'Your final reflection has been saved.',
  reflectionError: 'We could not save your reflection right now. Please try again.',
  reflectionLoading: 'Loading your reflection\u2026',
  reflectionUnavailable: 'Saving becomes available once your enrollment is active.',

  // --- Certificate ---
  certBackToProgress: 'Back to course progress',
  certPrint: 'Print Certificate',
  certDownload: 'Download PDF',
  certPreviewNotice: 'Administrator preview: no certificate record created',
  certReturnToCourse: 'Return to Course',
  certHeadingNotYetCore: 'Certificate Not Yet Available',
  certHeadingNotYetPeer: 'Peer Facilitator Certificate Not Yet Available',
  certHeadingOutstanding: 'Course Requirements Outstanding',
  certHeadingProfile: 'Profile Name Required',
  certHeadingUnavailable: 'Certificate Unavailable',
  certBodyNotYetCore:
    'Your certificate becomes available once you have completed all seven modules and every course requirement.',
  certBodyNotYetPeer:
    'Your Peer Facilitator certificate becomes available once you have completed Module 8, submitted your vendor-circle record, and a reviewer has approved it.',
  certBodyOutstanding:
    'Finish your My Soko Action Plan sections, a peer discussion and the final reflection, then finalise your course.',
  certBodyProfile:
    'Your certificate uses your verified profile name. Please update your profile with your full name before generating your certificate.',
  certBodyUnavailable:
    'We could not load your certificate at this time. Please try again later.',
};

/**
 * Peer Facilitator vendor-circle record (Module 8). It gets its own set so
 * neither of the other two grows past the 100-key request cap.
 */
export const SOKO_FACILITATOR_LABELS = {
  facilitatorLoading: 'Loading your record\u2026',
  facilitatorStatusLabel: 'Review status',
  facilitatorStatusDraft: 'Draft',
  facilitatorStatusSubmitted: 'Submitted \u2014 awaiting review',
  facilitatorStatusApproved: 'Approved',
  facilitatorStatusReturned: 'Returned for revision',
  facilitatorFeedbackLabel: 'Reviewer feedback',
  facilitatorApprovedNotice:
    'Your vendor-circle record has been approved. You can now complete Module 8 and claim your Peer Facilitator certificate.',
  facilitatorSessionPlanLabel: 'Vendor circle session plan',
  facilitatorSessionPlanHelper:
    'Purpose, timing, your three or four questions, and how you will close the session.',
  facilitatorDiscussionLabel: 'Discussion summary',
  facilitatorDiscussionHelper:
    'What the group discussed and what people agreed to try. No names, no stall numbers, no identifying amounts.',
  facilitatorReflectionLabel: 'Facilitator reflection',
  facilitatorReflectionHelper:
    'What went well, what did not go to plan, and what you will change next time.',
  facilitatorConsent:
    'I confirm that participants gave their informed consent, that the discussion was voluntary, and that no individual participant is identifiable in my summary.',
  facilitatorSaveDraft: 'Save draft',
  facilitatorSaving: 'Saving\u2026',
  facilitatorSubmit: 'Submit for review',
  facilitatorSubmitting: 'Submitting\u2026',
  facilitatorUnavailable:
    'Saving becomes available once your enrollment in the Peer Facilitator track is active and the module is published.',
  facilitatorSavedDraft:
    'Your draft has been saved. You can keep working and submit when you are ready.',
  facilitatorSavedSubmit:
    'Your record has been submitted. A reviewer will read it and respond.',
  facilitatorError: 'We could not save your record right now. Please try again.',
};

/** Merged English default — the value used outside a SokoLabelsProvider. */
export const SOKO_UI_LABELS = {
  ...SOKO_MODULE_LABELS,
  ...SOKO_PAGE_LABELS,
  ...SOKO_FACILITATOR_LABELS,
};