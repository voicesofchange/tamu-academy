/**
 * MENTAL HEALTH PILLAR — server-side-only curriculum + course configuration store.
 * ============================================================================
 * MIRRORS THE ECONOMICS TRUST BOUNDARY:
 *   This file is imported ONLY by Base44 backend functions
 *   (getMentalHealthModule, enrollMentalHealth, updateMentalHealthProgress
 *   and any future graders). It MUST NEVER be imported by any file in src/.
 *   Anything inside this file is therefore never bundled into the public
 *   browser JavaScript.
 *
 * HEADER SCOPE (expanded in Module 1 content stage):
 *   This file now carries the FULL Module 1 lesson object (the
 *   educational lesson and its presentation only) under
 *   MENTAL_HEALTH_MODULE_1_LESSON. It is released to authorized
 *   administrators only through the role-gated
 *   `getMentalHealthModule` backend function. After public launch it
 *   will additionally be gated by enrollment + publication + prerequisite
 *   checks enforced in updateMentalHealthProgress and getMentalHealthModule;
 *   that gating is NOT yet enabled for ordinary learners (Phase 1).
 *
 * CONTENT-STAGE BOUNDARIES (per the Module 1 content stage):
 *   The lesson object contains ONLY the educational lesson text and its
 *   presentation (module overview, learning objectives, required
 *   educational disclaimers, primary video and supporting reading,
 *   questions to consider, original Tamu Academy introduction, six key
 *   concepts and definitions, five explanation sections, central
 *   takeaway, "Care Without Control" case study, and sources).
 *
 *   THIS FILE DOES NOT CARRY (deferred to later stages — never bundled,
 *   never returned by getMentalHealthModule until those stages land):
 *     - The interactive scenario prompt, the best response, or any
 *       scenario educational feedback
 *     - Community of Care Map fields or instructions
 *     - The private reflection prompt
 *     - Knowledge-check questions
 *     - Correct answer indices, correct responses, or per-question
 *       educational feedback
 *     - Quiz submission or grading logic
 *     - Module completion logic and course completion logic
 *     - Activity assessment criteria ("Meets expectations" / "Needs
 *       revision" checklists)
 *     - Facilitation safeguards and notes
 *     - The optional extended academic assignment prompt
 *
 * SAFETY STANDARD (mandatory, do not regress):
 *   Never store personal reflections, Care Map content, diagnoses,
 *   trauma narratives, personal support contacts, family information,
 *   or any other sensitive mental health information in this file (or
 *   anywhere on the platform). The content pack allows private, offline,
 *   browser-local, or fictional completion of those activities — none
 *   of those forms exist in this stage.
 *
 * COMPLETION (deferred — do not regress):
 *   Neither this file nor any function in this course marks a module or
 *   the course `completed` automatically. The final applied assignment
 *   requirement is still an open editorial decision; a separate grading
 *   and completion function will be authored in a later phase.
 *
 * CANONICAL SERVER-SIDE CONFIGURATION (the allow-list below):
 *   14 payload-stable section identifiers were added to Module 1's
 *   `sections` array as its content stage rolled out. Those — and ONLY
 *   those — are the section keys `updateMentalHealthProgress` will
 *   accept for `set_last_section` on Module 1. Modules 2 through 7
 *   keep an empty `sections` array until their content packs land.
 *
 * MAINTENANCE:
 *   Keep this file structurally parallel to
 *   base44/shared/economics-curriculum.js once full content lands, but
 *   do NOT cross-import or merge the two stores.
 */

export const MENTAL_HEALTH_COURSE_SLUG = 'mental-health-community-and-culture';

/**
 * Server-controlled course configuration. The `enrollmentOpen` flag is the
 * single mechanism that gates public enrollment during the development
 * phase.
 *   false  →  only admins may call enrollMentalHealth; ordinary
 *              authenticated users receive HTTP 403 from the function.
 *              The learner-derived `learner_id` is still set from auth
 *              only, regardless of who calls the function.
 *   true   →  any authenticated user may enroll
 *              (intended to be enabled only after launch).
 *
 * No browser-supplied `enrollmentOpen` can override this value — the
 * enrollMentalHealth function refuses a body that attempts to set it.
 */
export const MENTAL_HEALTH_COURSE_CONFIG = {
  courseSlug: MENTAL_HEALTH_COURSE_SLUG,
  enrollmentOpen: false,
  modules: [
    {
      route: 'module-1',
      number: 'Module 1',
      title: 'Ubuntu and Communal Wellness: African Philosophies of Mental Health',
      status: 'In Development',
      publicationStatus: 'unpublished',
      prerequisite: null,
      // The 20 implemented section identifiers for Module 1.
      // The optional extended assignment identifier is intentionally NOT
      // in this list. Arbitrary extra identifiers remain rejected.
      sections: [
        'module-overview',
        'learning-objectives',
        'core-media',
        'questions-to-consider',
        'tamu-introduction',
        'key-concepts',
        'relational-personhood',
        'ubuntu-and-mental-health',
        'different-emphases',
        'community-protection',
        'community-strain',
        'central-takeaway',
        'case-study',
        'interactive-scenario',
        'community-of-care-map',
        'private-reflection',
        'knowledge-check',
        'closing-section',
        'completion-requirements',
        'sources',
      ],
    },
    {
      route: 'module-2',
      number: 'Module 2',
      title: 'Stress, Stigma, and Strength: Rethinking Mental Health Narratives in African and Diaspora Communities',
      status: 'In Development',
      publicationStatus: 'unpublished',
      prerequisite: 'module-1',
      // Stage 1 added the two introductory identifiers. Stage 2 adds the
      // approved core media, questions to consider, Tamu Academy
      // introduction, nine explanation, and key-concepts identifiers in
      // the content pack's order. Stages 3-6 add the comparative case
      // study, interactive scenario, Strength Without Silence Lab, and
      // private reflection. Stage 7 adds the knowledge-check identifier.
      // Arbitrary extra identifiers remain rejected by isSectionAllowed.
      // Deferred identifiers (closing, completion, sources, optional
      // extended assignment) are intentionally not yet present.
      sections: [
        'module-overview',
        'learning-objectives',
        'core-media',
        'questions-to-consider',
        'tamu-introduction',
        'stress-is-not-a-moral-failure',
        'stressors-are-layered',
        'stigma-has-more-than-one-form',
        'strength-can-protect',
        'strength-can-also-become-a-demand',
        'gendered-strength-narratives',
        'history-and-institutions-matter',
        'strength-without-silence',
        'help-seeking-is-a-pathway',
        'key-concepts',
        'case-study',
        'interactive-scenario',
        'strength-without-silence-lab',
        'private-reflection',
        'knowledge-check',
      ],
    },
    {
      route: 'module-3',
      number: 'Module 3',
      title: 'Family Expectations and Cultural Scripts: Talking About Mental Health at Home',
      status: 'Coming Soon',
      publicationStatus: 'unpublished',
      prerequisite: 'module-2',
      sections: [],
    },
    {
      route: 'module-4',
      number: 'Module 4',
      title: 'Community Healing in Practice: Friendship Bench, StrongMinds, and Brother Be Well',
      status: 'Coming Soon',
      publicationStatus: 'unpublished',
      prerequisite: 'module-3',
      sections: [],
    },
    {
      route: 'module-5',
      number: 'Module 5',
      title: 'Faith, Tradition, and Professional Care: Bridging Spiritual Supports and Clinical Pathways',
      status: 'Coming Soon',
      publicationStatus: 'unpublished',
      prerequisite: 'module-4',
      sections: [],
    },
    {
      route: 'module-6',
      number: 'Module 6',
      title: 'Building Culturally Affirming Systems: Policy, Media, and Youth Advocacy for Global Mental Health',
      status: 'Coming Soon',
      publicationStatus: 'unpublished',
      prerequisite: 'module-5',
      sections: [],
    },
    {
      route: 'module-7',
      number: 'Module 7',
      title: 'Roots of Resilience: Storytelling, Survival, and Collective Healing',
      status: 'Coming Soon',
      publicationStatus: 'unpublished',
      prerequisite: 'module-6',
      sections: [],
    },
  ],
};

/** Whether public enrollment is permitted for non-admins. */
export function isEnrollmentOpen() {
  return MENTAL_HEALTH_COURSE_CONFIG.enrollmentOpen === true;
}

/** Whether a given course slug matches this course's canonical slug. */
export function courseExists(courseSlug) {
  return courseSlug === MENTAL_HEALTH_COURSE_CONFIG.courseSlug;
}

/** Returns the server-side ModuleConfig for (courseSlug, moduleRoute) or null. */
export function getModuleConfig(courseSlug, moduleRoute) {
  if (!courseExists(courseSlug)) return null;
  return MENTAL_HEALTH_COURSE_CONFIG.modules.find((m) => m.route === moduleRoute) || null;
}

/** True only if the module's server-side publicationStatus is 'published'. */
export function isModulePublished(courseSlug, moduleRoute) {
  const m = getModuleConfig(courseSlug, moduleRoute);
  return !!m && m.publicationStatus === 'published';
}

/** Returns the server-side prerequisite route for a module, or null if none. */
export function getModulePrerequisite(courseSlug, moduleRoute) {
  const m = getModuleConfig(courseSlug, moduleRoute);
  if (!m) return null;
  return m.prerequisite || null;
}

/**
 * Validates a section identifier against this module's server-side
 * allow-list. Returns false if the module doesn't exist, the
 * allow-list is empty (current Phase 1 state for Modules 2–7), or
 * the section is not in the allow-list. Section identifiers are
 * defined only when a module's content pack lands.
 *
 * For Module 1, the 14 implemented section identifiers are accepted
 * (added in the Module 1 content stage). The scenario, activity,
 * reflection, knowledge check, completion requirements, closing
 * text, and optional assignment identifiers remain rejected —
 * those sections are not implemented in this stage.
 */
export function isSectionAllowed(courseSlug, moduleRoute, sectionId) {
  const m = getModuleConfig(courseSlug, moduleRoute);
  if (!m) return false;
  if (!Array.isArray(m.sections) || m.sections.length === 0) return false;
  return m.sections.includes(sectionId);
}

/**
 * MODULE 1 LESSON CONTENT — server-side-only.
 *
 * Authoritative source: Tamu-Academy-MH-Module-1-Base44-Content-Pack.md.
 *
 * The wording here matches the content pack. Do not substantially
 * rewrite, shorten, expand, or replace the educational material.
 *
 * The required educational disclaimer ("This course provides general
 * educational information…") is displayed once near the beginning,
 * attached to the learning-objectives section, and once near the end,
 * attached to the central-takeaway section — per the editorial
 * standard repeated in the content pack ("Display near the beginning
 * and end").
 *
 * The "before reflection and the applied activity" disclaimer about
 * personal disclosure is intentionally NOT included in this object:
 * neither the reflection nor the activity is implemented in this
 * stage, so that disclosure has no current page position to attach
 * to. It will be added when those sections land.
 */
export const MENTAL_HEALTH_MODULE_1_LESSON = {
  moduleOverview: {
    paragraphs: [
      'Mental health is often discussed as though it belongs entirely inside an individual mind. Ubuntu invites a wider question: how is a person’s wellbeing shaped by relationships, belonging, responsibility, dignity, material conditions, and the quality of community life?',
      'This foundation module introduces Ubuntu and related relational ideas while examining both sides of communal life: the protection created by belonging and mutual care, and the strain created by obligation, coercion, silence, exclusion, or unequal caregiving.',
    ],
    competency:
      'By the end of this module, learners should be able to analyze how relationships and community can protect or strain mental wellbeing and propose an Ubuntu-informed response that includes mutual care, dignity, consent, boundaries, and access to qualified support.',
  },
  learningObjectives: {
    objectives: [
      'Explain Ubuntu and its implications for mental wellbeing, responsibility, dignity, and care.',
      'Compare a relational emphasis with a dominant individual clinical emphasis without treating either as internally uniform.',
      'Identify ways community ties, reciprocity, and social connection can protect mental health.',
      'Recognize how community expectations can create guilt, coercion, silence, exclusion, or caregiver strain.',
      'Apply Ubuntu-informed principles to a community support scenario while respecting consent, boundaries, and professional care.',
    ],
    earlyDisclaimer:
      'This course provides general educational information. It does not provide diagnosis, therapy, medical treatment, or emergency support. Learners seeking personal mental health assistance should contact an appropriately qualified professional or relevant local service. If someone is in immediate danger, contact local emergency services.',
  },
  coreMedia: {
    primary: {
      title: 'What we can learn from the African philosophy of Ubuntu',
      publisher: 'BBC Global / BBC Reel',
      watchUrl: 'https://www.youtube.com/watch?v=7UojwMiRpNM',
      embedUrl: 'https://www.youtube-nocookie.com/embed/7UojwMiRpNM',
      attributionLabel: 'BBC Global / BBC Reel',
      roleInModule:
        'Short introduction to Ubuntu as a philosophy of shared humanity and relational personhood.',
      attributionStatement:
        'This independently produced video is included as a learning resource. Its speakers, producer, and publisher are not Tamu Academy instructors, employees, or partners.',
      whySelected:
        'Short introduction to Ubuntu as a philosophy of shared humanity and relational personhood.',
      disclaimer:
        'This independently produced video is included as a learning resource. Its speakers, producer, and publisher are not Tamu Academy instructors, employees, or partners.',
    },
    supportingReadings: [
      {
        title: 'Ubuntu as a solution to mental illness challenges',
        publisher: 'University of Pretoria',
        url: 'https://www.up.ac.za/news/expert-opinion-ubuntu-solution-mental-illness-challenges',
        evidenceLabel: 'Expert opinion and conceptual resource, not a clinical guideline.',
      },
    ],
  },
  questionsToConsider: [
    'How does the video describe the relationship between personhood and community?',
    'What responsibilities appear to flow from shared humanity?',
    'Where might Ubuntu support emotional safety, belonging, or mutual care?',
    'What questions remain about consent, privacy, boundaries, or unequal power within communities?',
  ],
  tamuIntroduction: {
    paragraphs: [
      'Ubuntu is commonly summarized as “I am because we are.” The fuller idea is relational: our humanity is formed and expressed through other people. We learn language, identity, responsibility, care, and belonging in relationship.',
      'This module does not treat Ubuntu as a slogan or as the single philosophy of the African continent. Ubuntu is most closely associated with southern African traditions. Other African societies have their own ideas of humanness, kinship, reciprocity, spirituality, and collective responsibility. Similarities should not erase differences.',
      'Relational personhood does not mean that the individual disappears. A person still has an inner life, agency, rights, limits, and needs. Ubuntu shifts the emphasis: individual flourishing and communal flourishing are connected. The wellbeing of one person can be affected by whether others listen, share burdens, protect dignity, and make room for honest human experience.',
    ],
  },
  keyConcepts: [
    { term: 'Ubuntu', definition: 'A relational philosophy of humanness commonly associated with southern Africa, emphasizing that personhood is formed and expressed through relationships.' },
    { term: 'Relational personhood', definition: 'The view that identity, dignity, responsibility, and flourishing develop through connections with other people and the wider social world.' },
    { term: 'Reciprocity', definition: 'Giving and receiving support in ways that recognize mutual dependence and shared responsibility.' },
    { term: 'Social connection', definition: 'The structure, function, and quality of relationships through which people experience belonging, support, and participation.' },
    { term: 'Communal strain', definition: 'Pressure, coercion, exclusion, overwork, silence, or loss of privacy that can arise within relationships or groups.' },
    { term: 'Culturally affirming care', definition: 'Support that respects a person’s cultural context, language, identity, dignity, agency, and preferred pathways to care.' },
  ],
  explanation: {
    relationalPersonhood: {
      heading: 'Ubuntu as Relational Personhood',
      paragraphs: [
        'The Nguni expression often associated with Ubuntu, umuntu ngumuntu ngabantu, is commonly translated as “a person is a person through other persons.” It suggests that personhood is not produced through isolation.',
        'Ubuntu does not require the individual to disappear into the group. A strong Ubuntu-informed approach connects community responsibility with the dignity and agency of each person.',
      ],
    },
    ubuntuAndMentalHealth: {
      heading: 'What Ubuntu Changes About Mental Health',
      paragraphs: [
        'A dominant individual clinical emphasis often begins with symptoms, diagnosis, personal coping, and treatment. Those tools can be essential. Ubuntu adds questions about the social world in which distress and recovery occur:',
      ],
      numberedItems: [
        'Who notices when a person is carrying too much?',
        'Who shares practical burdens?',
        'Does the person experience belonging and dignity?',
        'Are family, school, work, faith, and community environments sources of safety or harm?',
        'Can someone ask for help without being shamed, exposed, or controlled?',
      ],
      trailingParagraphs: [
        'This does not reject therapy, medicine, or clinical expertise. It widens the field of attention. A person may benefit from professional care and also need safe relationships, housing, rest, meaningful work, cultural belonging, and protection from discrimination or violence.',
      ],
    },
    differentEmphases: {
      heading: 'Different Emphases, Not a Simple Binary',
      paragraphs: [
        'Do not teach one uniform “African model” against one uniform “Western model.”',
        'An individual clinical emphasis may focus on symptoms, thoughts, emotions, functioning, assessment, therapy, medication, skills, self-management, and personal choice.',
        'A relational or Ubuntu-informed emphasis may also examine belonging, shared responsibility, practical support, meaningful social roles, collective conditions, and restored dignity.',
        'People and programs can combine both. Clinical care can be family-centered and community-based. African individuals and communities may draw on biomedical, spiritual, traditional, peer, family, and personal approaches in different combinations.',
      ],
    },
    communityProtection: {
      heading: 'How Community Can Protect Wellbeing',
      items: [
        { label: 'Belonging', text: 'Being known and valued can reduce isolation.' },
        { label: 'Practical reciprocity', text: 'Communities may share transport, food, childcare, information, money, or caregiving.' },
        { label: 'Early noticing', text: 'Trusted people may recognize changes and encourage support.' },
        { label: 'Meaning and identity', text: 'Language, story, ritual, faith, memory, and shared purpose can help people interpret difficulty.' },
        { label: 'Collective response', text: 'Communities can address harmful environments rather than asking each person to cope alone.' },
      ],
    },
    communityStrain: {
      heading: 'How Community Can Strain Wellbeing',
      items: [
        { label: 'Obligation without limits', text: 'One person may be expected to carry family or caregiving burdens indefinitely.' },
        { label: 'Harmony over honesty', text: 'Pressure to protect a family or community image may silence distress, abuse, or disagreement.' },
        { label: 'Loss of privacy', text: 'Personal information may be shared without consent.' },
        { label: 'Conformity and exclusion', text: 'People who differ in identity, belief, disability, gender expression, or life choice may be shamed or excluded.' },
        { label: 'Caregiver strain', text: 'Families may be left with responsibilities they cannot sustain when formal systems fail.' },
      ],
    },
  },
  centralTakeaway: {
    paragraphs: [
      'Community care should deepen dignity, not erase it. Care is stronger when it includes consent, boundaries, shared responsibility, inclusion, and access to qualified help.',
    ],
    finalDisclaimer:
      'This course provides general educational information. It does not provide diagnosis, therapy, medical treatment, or emergency support. Learners seeking personal mental health assistance should contact an appropriately qualified professional or relevant local service. If someone is in immediate danger, contact local emergency services.',
  },
  caseStudy: {
    heading: 'Care Without Control',
    paragraphs: [
      'Lerato is a university student in Pretoria. She is balancing classes, part-time work, and regular support for relatives. She has become exhausted and has begun missing deadlines.',
      'A cousin notices and offers to listen. An aunt says the family needs Lerato to remain strong and warns her not to discuss family matters outside the home. A church youth leader offers practical help with meals and transport. The campus wellness service is available, but Lerato worries that seeking professional help will disappoint her family.',
      'An Ubuntu-informed response would not simply tell Lerato to put the community first. It would also not tell her to separate herself from every relationship. It would ask what support she wants, protect her privacy, redistribute practical burdens, affirm that limits are human, and help her reach qualified support if she chooses.',
    ],
  },
  sources: [
    {
      citation: 'University of Pretoria. “Ubuntu as a solution to mental illness challenges.”',
      url: 'https://www.up.ac.za/news/expert-opinion-ubuntu-solution-mental-illness-challenges',
    },
    {
      citation:
        'Kpanake, L. (2018). “Cultural concepts of the person and mental health in Africa.” Transcultural Psychiatry, 55(2), 198–218.',
      url: 'https://doi.org/10.1177/1363461517749435',
    },
    {
      citation:
        'Chigangaidze, R. K., Matanga, A. A., & Katsuro, T. R. (2022). “Ubuntu philosophy as a humanistic-existential framework for the fight against the COVID-19 pandemic.” Journal of Humanistic Psychology, 62(3), 319–333.',
      url: 'https://doi.org/10.1177/00221678211044554',
    },
    {
      citation: 'World Health Organization. “Mental health.”',
      url: 'https://www.who.int/health-topics/mental-health',
    },
    {
      citation:
        'World Health Organization. (2025). “Social connection linked to improved health and reduced risk of early death.”',
      url: 'https://www.who.int/news/item/30-06-2025-social-connection-linked-to-improved-heath-and-reduced-risk-of-early-death',
    },
    {
      citation:
        'Jansen, S., et al. (2024). “Evaluating effects of community-based social healing model on Ubuntu, mental health and psychosocial functioning in post-genocide Rwanda.”',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11568552/',
      note:
        'Evidence note: This publication is a study protocol. It describes an evaluation that researchers planned to conduct and should not be presented as completed outcome evidence.',
    },
  ],
  // ============ STAGE 2 CONTENT ADDITIONS (interactive scenario,
  // Community of Care Map, private reflection) ============
  // Interactive scenario — public-facing block: prompt + four answer
  // options only. The correct answer index and educational feedback
  // are kept in MENTAL_HEALTH_MODULE_1_SCENARIO_ANSWERS (declared
  // below). NEVER include bestResponseIndex, correctIndex, isCorrect,
  // or feedback as fields on this object — those are released only by
  // checkMentalHealthScenario after the learner submits a selection.
  interactiveScenario: {
    scenarioId: 'care-without-control',
    prePromptLine:
      'The “Care Without Control” case study introduced Lerato. Use this short scenario to apply Ubuntu-informed principles.',
    prompt: 'Which response best balances mutual care, dignity, and safety?',
    options: [
      'Tell Lerato that family duty must come first because Ubuntu requires sacrifice.',
      'Tell Lerato to stop helping anyone and solve the problem entirely on her own.',
      'Ask what support she wants, offer concrete help, respect confidentiality, discuss boundaries, and provide information about qualified support.',
      'Share Lerato’s situation with the wider family so everyone can decide what she should do.',
    ],
    instructionLine:
      'Select one response, then submit to see the approved educational feedback. Your selection is not saved anywhere on this platform.',
  },
  // Community of Care Map — entirely browser-local worksheet. The
  // learner's entries never leave the browser page in this stage.
  // Components render this object directly; no field adds storage.
  communityOfCareMap: {
    heading: 'Community of Care Map',
    overview:
      'Map support for yourself, a fictional person, or a composite scenario across four rings below.',
    ringDefinitions: [
      { id: 'trusted-people', label: 'Trusted people' },
      { id: 'community-spaces-groups', label: 'Community spaces and groups' },
      { id: 'supportive-practices', label: 'Supportive practices' },
      { id: 'qualified-urgent-support', label: 'Qualified and urgent support' },
    ],
    entryFields: [
      { id: 'offers', label: 'What it can offer' },
      { id: 'cannot-safely-provide', label: 'What it cannot safely provide' },
      { id: 'consent-or-privacy', label: 'A consent or privacy boundary' },
      { id: 'over-concentration', label: 'Where responsibility is concentrated too heavily' },
      { id: 'care-gap', label: 'One care gap' },
      { id: 'next-step', label: 'One realistic next step' },
    ],
    preActivityReminder:
      'You may use a fictional or composite example. You do not need to disclose personal experiences, diagnoses, trauma, or private family information.',
    privacyNotice: [
      'You may use a fictional or composite example.',
      'Personal disclosure is not required.',
      'Entries remain temporarily in the current browser page.',
      'Refreshing or closing the page clears the entries.',
      'Do not enter diagnoses, trauma details, names, or unnecessary private information.',
    ],
    printReminder:
      'Printed or locally saved copies are controlled by you and should be stored carefully.',
    addSupportLabel: 'Add support for this ring',
    removeSupportLabel: 'Remove this support',
    clearWorksheetLabel: 'Clear worksheet',
    clearWorksheetConfirm:
      'Remove all entries across all four rings? This cannot be undone.',
    printLabel: 'Print worksheet',
    printBlankLabel: 'Print blank worksheet',
  },
  // Private reflection — display only. There is NO online reflection
  // field on this page. The learner reflects privately, optionally in
  // a private offline notebook.
  privateReflection: {
    heading: 'Private Reflection',
    preActivityReminder:
      'You may use a fictional or composite example. You do not need to disclose personal experiences, diagnoses, trauma, or private family information.',
    prompt:
      'Where do Ubuntu-like values already appear in your life, community, or a fictional setting? Name one way they support wellbeing and one way they may need stronger boundaries or inclusion.',
    privacyStatement:
      'Keep this reflection private unless you freely choose to share it. Do not include diagnoses, trauma details, names, or other sensitive information in a public form.',
    guidanceNotes: [
      'Reflect privately. The course does not store anything you write here.',
      'If you wish, write your reflection in a private offline notebook. Do not type it into an online form on this site.',
      'You may use a fictional setting instead of a personal experience.',
      'Avoid names, diagnoses, trauma details, and unnecessary sensitive information.',
    ],
    offlineBanner:
      'This section has no online response field by design. Please conduct your reflection offline and in private.',
  },
  // Knowledge check — public-facing block: quiz identifier, question
  // wording, response options, retry rules, and the passing-score
  // information the content pack shows to learners. Correct answer
  // indices, per-answer grading, and approved correct/incorrect
  // feedback are kept in MENTAL_HEALTH_MODULE_1_QUIZ_ANSWERS (declared
  // below, after the scenario helpers). NEVER include correctIndex,
  // correctAnswer, correctResponse, isCorrect, answerKey, scoringKey,
  // per-answer grading text, facilitationNotes, or assessmentCriteria
  // as fields on this object — those are released to submitMentalHealthQuiz
  // only after the learner submits answers, and only as the approved
  // learner-facing feedback for the option they actually chose.
  knowledgeCheck: {
    quizId: 'module-1-knowledge-check',
    heading: 'Knowledge Check',
    preActivityReminder:
      'Personal disclosure is not required for this knowledge check. Do not write personal diagnoses, trauma details, or names anywhere in this quiz.',
    numberOfQuestions: 5,
    passingThreshold: 4,
    passingDescription:
      'Passing requires 4 out of 5 correct answers.',
    educationalDisclaimer:
      'This knowledge check is educational and is not clinical advice, a diagnostic tool, or a substitute for professional support.',
    instructions:
      'Select one response to each question, then submit. The system grades your answers on submission and shows your score and the approved feedback for each question.',
    retryInstructions:
      'You may retake this knowledge check as many times as you wish. After each submission you will see your latest score and the approved feedback per question. Change any answer before submitting again.',
    questions: [
      {
        questionId: 'ubuntu-personhood',
        prompt: "What does Ubuntu propose about personhood?",
        options: [
          "Individuals are isolated minds, with identity separate from any relationships.",
          "A person becomes a person through other persons (umuntu ngumuntu ngabantu).",
          "The community always determines the choices of each individual.",
          "Identity has nothing to do with belonging or relationships.",
        ],
      },
      {
        questionId: 'community-both-sides',
        prompt:
          "How does Module 1 ask you to view the relationship between Ubuntu values and mental wellbeing?",
        options: [
          "Ubuntu always protects wellbeing in every community without exception.",
          "Ubuntu eliminates all forms of strain in community life.",
          "Ubuntu can both protect and strain mental wellbeing, and both sides must be examined.",
          "Ubuntu rejects the need for clinical or qualified professional support.",
        ],
      },
      {
        questionId: 'care-without-control',
        prompt:
          "If a community member is exhausted by caregiving obligations, which response best balances Ubuntu-informed principles and safety?",
        options: [
          "Tell her that family duty must come first because Ubuntu requires sacrifice.",
          "Tell her to stop helping anyone and solve the problem entirely on her own.",
          "Ask what support she wants, offer concrete help, respect confidentiality, discuss boundaries, and provide information about qualified support.",
          "Share her situation with the wider family so everyone can decide what she should do.",
        ],
      },
      {
        questionId: 'community-strain-forms',
        prompt:
          "Which set of forms of strain can communal life produce even when Ubuntu values are present?",
        options: [
          "Obligation, silence, exclusion, or unequal caregiving.",
          "Only benefits and never harms.",
          "Negative outcomes in every situation without any exception.",
          "Only individual clinical concerns unrelated to community.",
        ],
      },
      {
        questionId: 'ubuntu-clinical-coexistence',
        prompt:
          "Which statement best describes the module's comparison between Ubuntu's relational emphasis and an individual clinical emphasis?",
        options: [
          "Ubuntu makes clinical mental health care unnecessary in every case.",
          "Individual clinical care is universally preferred and Ubuntu is irrelevant.",
          "Both emphases should be compared without treating either as internally uniform, and Ubuntu's relational view and clinical care can coexist and inform each other.",
          "Ubuntu should fully replace clinical mental health care in every community.",
        ],
      },
    ],
  },
};

/**
 * MODULE 2 LESSON CONTENT — server-side-only (Stage 1 foundation).
 *
 * Authoritative source: Tamu-Academy-MH-Module-2-Base44-Content-Pack.md.
 *
 * STAGE 1 SCOPE (do not regress — later stages add the rest):
 *   This object carries ONLY the approved introductory material for
 *   Module 2: the public module overview + competency, and the
 *   learning objectives + the early educational disclaimer required
 *   near the beginning.
 *
 *   The wording matches the content pack. Do not rewrite, shorten,
 *   expand, or replace it.
 *
 * NOT YET PRESENT (deferred to later approved stages — never bundled,
 *   never returned until those stages land):
 *     - Core media (Sangu Delle primary video and Brother Be Well
 *       optional supporting link — the latter remains in the sources
 *       only for now)
 *     - Questions to consider while watching
 *     - Original Tamu Academy introduction
 *     - The nine explanation sections (stress is not a moral failure;
 *       stressors are layered; stigma has more than one form;
 *       strength can protect; strength can also become a demand;
 *       gendered strength narratives; history and institutions matter;
 *       strength without silence; help seeking is a pathway)
 *     - Key concepts
 *     - Comparative case study
 *     - Interactive scenario, including the reserved
 *       `praise-that-becomes-pressure` scenario answer key
 *     - Strength Without Silence Lab instructions
 *     - Private reflection prompt
 *     - Knowledge check questions, including the reserved
 *       `module-2-knowledge-check` answer key
 *     - Closing content
 *     - Completion requirements
 *     - Sources
 *     - Optional extended academic assignment
 *
 *   None of those are reached by the Stage 1 renderer; none are
 *   shipped to the browser. Answer keys, correct-answer indices,
 *   scenario answers, activity responses, and facilitator notes are
 *   never placed on this object.
 *
 * SECTION IDENTIFIERS:
 *   Only `module-overview` and `learning-objectives` are in Module 2's
 *   allow-list at this stage. The competency and the early disclaimer
 *   render inside those two sections rather than as separately
 *   navigable sections — the content pack does not require them as
 *   standalone section identifiers.
 */
export const MENTAL_HEALTH_MODULE_2_LESSON = {
  moduleOverview: {
    paragraphs: [
      'Strength can mean endurance, responsibility, courage, cultural pride, survival, and care for others. It can also become a rule that tells people to hide distress, refuse rest, carry unequal burdens, or delay support.',
      'This module examines how economic pressure, conflict and displacement, migration, racism, gender expectations, service shortages, and inherited institutions shape mental wellbeing across different African and diaspora settings. Learners analyze stigma as both a social attitude and a structural barrier, then practice reframing strength so that honesty, boundaries, collective care, and professional support can exist alongside resilience.',
    ],
    competency:
      'By the end of this module, learners should be able to analyze how stressors, stigma, strength narratives, and structural conditions interact, then propose a culturally affirming response that preserves resilience without requiring silence or self neglect.',
  },
  learningObjectives: {
    objectives: [
      'Identify major stressors that may affect people in different African and diaspora settings without treating those communities as uniform.',
      'Distinguish public, anticipated, internalized, and structural forms of stigma.',
      'Analyze how gendered and cultural strength narratives can provide protection while also limiting emotional expression, rest, and help seeking.',
      'Explain how colonial institutions, racism, migration systems, economic inequality, conflict, and underfunded services can shape distress and access to care.',
      'Reframe a strength message so that it supports dignity, agency, shared responsibility, and appropriate pathways to care.',
    ],
    earlyDisclaimer:
      'This course provides general educational information. It does not provide diagnosis, therapy, medical treatment, or emergency support. Learners seeking personal mental health assistance should contact an appropriately qualified professional or relevant local service. If someone is in immediate danger, contact local emergency services.',
  },
  // ============ STAGE 2 CONTENT ADDITIONS (core media, questions to
  // consider, Original Tamu Academy introduction, the nine explanation
  // sections, and the nine key concepts) ============
  //
  // Authoritative source: Tamu-Academy-MH-Module-2-Base44-Content-Pack.md.
  // Wording and ordering match the content pack exactly. Do not rewrite,
  // shorten, expand, or replace this material.
  //
  // Core media: the approved Sangu Delle TED talk only. The optional
  // Brother Be Well resource is intentionally NOT present at this stage
  // (deferred to a sources-only appearance in a later stage). No
  // scenario, lab, reflection, quiz, closing, completion, sources, or
  // extended-assignment fields are present yet.
  coreMedia: {
    primary: {
      title: "There's No Shame in Taking Care of Your Mental Health",
      speaker: 'Sangu Delle',
      publisher: 'TED',
      event: 'TEDLagos Ideas Search, February 2017',
      watchUrl: 'https://www.youtube.com/watch?v=BvpmZktlBFs',
      embedUrl: 'https://www.youtube-nocookie.com/embed/BvpmZktlBFs',
      officialPageUrl: 'https://www.ted.com/talks/sangu_delle_there_s_no_shame_in_taking_care_of_your_mental_health',
      officialPageLabel: 'Open the official TED page (transcript and captions available)',
      attributionLabel: 'TED · TEDLagos Ideas Search, February 2017 · Sangu Delle',
      roleInModule: 'A first person account of stress, anxiety, masculinity, stigma, and the decision to seek support.',
      attributionStatement:
        'This independently produced video is included as a learning resource. Its speaker, producer, and publisher are not Tamu Academy instructors, employees, or partners.',
    },
  },
  // Questions to consider while watching — reflective prompts only.
  // No response field, submission, tracking, or completion condition is
  // attached to these anywhere on the platform.
  questionsToConsider: [
    "What messages about masculinity, emotion, and self reliance shaped Sangu Delle's first response to distress?",
    'Which parts of his experience involved personal beliefs, and which involved wider social expectations?',
    'When can endurance be useful, and when can it become silence or isolation?',
    'What made it possible for him to name what he was experiencing and accept support?',
    'How might the story differ for women, gender diverse people, migrants, people affected by conflict, or people living where services are scarce?',
  ],
  tamuIntroduction: {
    paragraphs: [
      'Strength is not the problem. People and communities have relied on courage, discipline, faith, humor, responsibility, protest, kinship, and persistence to survive difficult conditions. The problem begins when strength becomes a narrow command: never show pain, never need help, never rest, and never disappoint anyone.',
      'That command does not arise in a vacuum. It may develop under economic insecurity, conflict, migration, racism, discrimination, gendered labor, family responsibility, or a health system that offers few trustworthy options. Silence can therefore be an adaptation to real risk. A person may worry about gossip, employment, family reputation, immigration consequences, cost, poor treatment, or being misunderstood by a provider.',
      'This module does not blame culture for mental health inequities. It asks a more careful question: what does a strength narrative protect, what does it cost, and what would allow people to keep its dignity while releasing its silence?',
    ],
  },
  // The nine approved explanation sections in the content pack's order.
  // Each carries its stable sectionId, heading, and a flexible block set
  // (paragraphs, numberedItems, trailingParagraphs, or subsections).
  // Courtesy stigma appears as the fifth numbered item INSIDE the
  // "Stigma has more than one form" explanation; it is NOT promoted to
  // the key-concepts glossary.
  explanation: [
    {
      sectionId: 'stress-is-not-a-moral-failure',
      heading: 'Stress is not a moral failure',
      paragraphs: [
        "A stressor is a demand, threat, loss, transition, or pressure. Stress is the response that may follow. It can involve physical changes, thoughts, emotions, behavior, and relationships. Some stress can support focus and adaptation. Persistent or overwhelming stress can exhaust a person's capacity, especially when demands are high and control, rest, safety, or support are low.",
        'Distress is not proof of weak character. It is also not automatically a mental health diagnosis. People can experience grief, fear, exhaustion, anger, worry, numbness, sleep disruption, or difficulty concentrating for many reasons. A qualified professional considers duration, severity, functioning, risk, health conditions, culture, and context before making a diagnosis.',
      ],
    },
    {
      sectionId: 'stressors-are-layered',
      heading: 'Stressors are layered',
      paragraphs: [
        'African countries and diaspora communities are diverse. No single list describes everyone. In different settings, relevant pressures may include:',
      ],
      numberedItems: [
        'Economic insecurity, unemployment, unsafe work, debt, or the expectation to support several households.',
        'Conflict, political violence, displacement, climate shocks, or interrupted education.',
        'Migration, family separation, uncertain legal status, language barriers, and pressure to appear successful abroad.',
        'Racism, anti Blackness, xenophobia, religious discrimination, and unequal treatment in schools, workplaces, housing, policing, or health care.',
        'Gendered expectations involving caregiving, provision, marriage, appearance, emotional restraint, or exposure to violence.',
        'Youth pressures involving academic performance, social media, family expectations, limited employment, and uncertainty about the future.',
        'Service shortages, distance, cost, confidentiality concerns, poor quality care, or lack of culturally and linguistically responsive providers.',
      ],
      trailingParagraphs: [
        'These pressures can accumulate. An individual coping skill may help, but it cannot by itself repair unsafe work, discrimination, forced displacement, unaffordable care, or an unfair distribution of responsibility.',
      ],
    },
    {
      sectionId: 'stigma-has-more-than-one-form',
      heading: 'Stigma has more than one form',
      paragraphs: [
        'Stigma is not only an insulting word or a negative belief. It can operate at several levels:',
      ],
      numberedItems: [
        '**Public stigma:** stereotypes, prejudice, ridicule, avoidance, or exclusion directed at people associated with mental distress or a diagnosis.',
        '**Anticipated stigma:** the expectation that disclosure or help seeking will lead to shame, rejection, gossip, punishment, or lost opportunity.',
        '**Internalized stigma:** absorbing negative messages and applying them to oneself, such as believing that needing help proves failure.',
        '**Structural stigma:** rules, budgets, institutional practices, and service arrangements that reduce access, rights, quality, or participation.',
        '**Courtesy stigma:** shame or discrimination directed at relatives, caregivers, or associates of a person experiencing mental health concerns.',
      ],
      trailingParagraphs: [
        'Stigma affects help seeking when people reasonably expect social or institutional harm. Education matters, but anti stigma work must also improve confidentiality, affordability, quality, rights, and available services.',
      ],
    },
    {
      sectionId: 'strength-can-protect',
      heading: 'Strength can protect',
      paragraphs: [
        'Strength narratives may offer:',
      ],
      numberedItems: [
        'A language of dignity when people are devalued.',
        'Persistence under racism, poverty, displacement, or exclusion.',
        'Pride in family, culture, faith, work, and community responsibility.',
        'A refusal to accept stereotypes of helplessness.',
        'Motivation to protect others and act collectively.',
      ],
      trailingParagraphs: [
        'It would be careless to tell people simply to abandon strength. A better approach respects why the narrative exists.',
      ],
    },
    {
      sectionId: 'strength-can-also-become-a-demand',
      heading: 'Strength can also become a demand',
      paragraphs: [
        'A strength narrative becomes harmful when it is treated as a compulsory performance. Common costs include:',
      ],
      numberedItems: [
        'Suppressing emotion because honesty is labeled weakness.',
        'Carrying care, financial, or leadership burdens without relief.',
        'Delaying help until distress becomes a crisis.',
        'Hiding difficulty to protect family or community reputation.',
        'Judging other people for expressing needs differently.',
        'Receiving praise for endurance while institutions avoid fixing harmful conditions.',
      ],
      trailingParagraphs: [
        'The issue is not resilience itself. The issue is who is required to be resilient, under what conditions, and at what cost.',
      ],
    },
    {
      sectionId: 'gendered-strength-narratives',
      heading: 'Gendered strength narratives',
      subsections: [
        {
          heading: 'The strong Black woman or Superwoman schema',
          paragraphs: [
            'Research with African American women has described expectations to display strength, suppress emotion, resist vulnerability, succeed despite limited resources, and prioritize care for others. Participants also described benefits, including preservation of self, family, and community, as well as costs involving stress and strained relationships.',
            'This framework emerged from research with African American women. It should not be imposed on every Black woman, every African woman, or every diaspora community. Its value is in showing how a racialized and gendered strength role can be both protective and costly.',
          ],
        },
        {
          heading: 'Toughness and restrictive masculinity',
          paragraphs: [
            'Some boys and men learn that manhood requires control, provision, emotional restriction, independence, or readiness to endure pain. These messages may offer identity and belonging. When treated rigidly, they can make fear, sadness, tenderness, uncertainty, or help seeking appear unacceptable.',
            'Masculinities are plural. African men, diaspora men, families, faith communities, and youth cultures do not share one script. The goal is not to replace manhood with a clinical stereotype. It is to widen the range of actions that can count as courage.',
          ],
        },
        {
          heading: 'Provider and migrant success narratives',
          paragraphs: [
            'People of any gender may be expected to become the dependable provider, the successful migrant, the eldest child who solves every problem, or the community leader who never falters. These roles can create meaning and pride. They can also make limits feel like betrayal.',
          ],
        },
      ],
    },
    {
      sectionId: 'history-and-institutions-matter',
      heading: 'History and institutions matter',
      paragraphs: [
        'Colonial psychiatry in several African settings often emphasized racial hierarchy, institutional control, and imported categories rather than accessible care shaped by local communities. Present systems differ by country, and colonial history does not explain every modern barrier. Still, inherited institutions, centralized services, marginalization of local knowledge, and mistrust can shape how formal care is perceived.',
        'Contemporary barriers also include underfunding, workforce shortages, urban concentration of specialists, cost, weak primary care integration, and insufficient youth services. In diaspora settings, racism and immigration systems can create additional stress and mistrust. Stigma therefore cannot be reduced to culture. It is connected to history, policy, institutional quality, and material conditions.',
      ],
    },
    {
      sectionId: 'strength-without-silence',
      heading: 'Strength without silence',
      paragraphs: [
        'Use a five part lens:',
      ],
      numberedItems: [
        '**Name the pressure.** What demands, losses, risks, or unequal conditions are present?',
        '**Name the strength message.** What is the person expected to prove, hide, or carry?',
        '**Protect what helps.** Preserve dignity, purpose, solidarity, courage, or cultural meaning.',
        '**Release what harms.** Challenge compulsory silence, endless sacrifice, shame, coercion, or isolation.',
        '**Widen the support pathway.** Add trusted people, shared responsibility, practical relief, culturally affirming services, qualified care, and system changes.',
      ],
      trailingParagraphs: [
        'This approach does not turn vulnerability into a new requirement. People retain control over what they share, with whom, and when. Privacy and boundaries matter.',
      ],
    },
    {
      sectionId: 'help-seeking-is-a-pathway',
      heading: 'Help seeking is a pathway, not one doorway',
      paragraphs: [
        'Support may involve:',
      ],
      numberedItems: [
        'Personal practices such as rest, movement, spiritual practices, creative expression, or time in nature.',
        'Trusted relationships and peer support.',
        'Community groups, youth mentors, cultural organizations, or faith communities that respect consent and referral limits.',
        'Primary care and qualified mental health professionals.',
        'Practical assistance with food, housing, transport, school, work, caregiving, or legal concerns.',
        'Urgent and emergency services when safety is at immediate risk.',
      ],
      trailingParagraphs: [
        "No single pathway is right for everyone. Informal support should not pretend to be clinical treatment. Professional care should not ignore culture, material conditions, or the person's preferred supports.",
      ],
    },
  ],
  // The nine approved key concepts as a consolidated glossary, ordered as
  // the content pack lists them (after the nine explanations). Courtesy
  // stigma is intentionally NOT included here.
  keyConcepts: [
    { term: 'Stressor', definition: 'A demand, threat, loss, transition, or pressure that may produce a stress response.' },
    { term: 'Distress', definition: 'Emotional, physical, cognitive, behavioral, or relational strain that may be temporary or persistent and is not by itself a diagnosis.' },
    { term: 'Public stigma', definition: 'Social stereotypes, prejudice, ridicule, avoidance, or exclusion related to mental health.' },
    { term: 'Anticipated stigma', definition: 'The expectation that disclosure or help seeking will lead to social or institutional harm.' },
    { term: 'Internalized stigma', definition: 'Negative social messages that a person comes to apply to themselves.' },
    { term: 'Structural stigma', definition: 'Policies, budgets, rules, and institutional practices that restrict rights, access, quality, or participation.' },
    { term: 'Strength narrative', definition: 'A social message about endurance, self control, responsibility, toughness, or care that may provide meaning and protection but may also impose silence or unequal burdens.' },
    { term: 'Help seeking', definition: 'The process of identifying a need and reaching toward informal, community, practical, health, or professional support.' },
    { term: 'Culturally affirming support', definition: 'Support that respects language, identity, context, dignity, agency, community relationships, and preferred pathways while maintaining safety and appropriate standards of care.' },
  ],
  // ============ STAGE 3 CONTENT ADDITION (comparative case study) ============
  //
  // Authoritative source: Tamu-Academy-MH-Module-2-Base44-Content-Pack.md.
  // Wording matches the content pack exactly. Do not rewrite, summarize,
  // shorten, expand, or add to the case study.
  //
  // The case study is instructional content only. There is NO response
  // field, discussion prompt, diagnostic label, recommendation, progress
  // control, or completion acknowledgment attached to it.
  //
  // The privacyNotice is the exact pack notice required to appear
  // immediately before the case study. It is rendered (not stored
  // separately as a learner input) and is never used to invite or store
  // personal disclosure.
  //
  // The reserved interactive-scenario identifier `praise-that-becomes-
  // pressure` is intentionally NOT part of this object, not in Module 2's
  // allow-list, and not consulted by checkMentalHealthScenario. It
  // belongs to a later approved stage.
  caseStudy: {
    privacyNotice:
      'You may use a fictional or composite example. You do not need to disclose personal experiences, diagnoses, trauma, immigration information, or private family circumstances.',
    title: 'The Praise That Becomes Pressure',
    introductoryNotice:
      'These fictional cases are not intended to represent every person in either setting.',
    cases: [
      {
        heading: 'Thandi in Durban',
        paragraphs: [
          "Thandi is a 27 year old teacher. She supports her mother and two younger siblings while managing a crowded classroom and a long commute. Colleagues praise her as the strong one who never complains. She has been sleeping poorly, experiencing headaches, and struggling to concentrate. She worries that asking for time off will harm her career. The nearest low cost service requires time away from work, and she is unsure whether her information will remain private.",
        ],
      },
      {
        heading: 'Kojo in Manchester',
        paragraphs: [
          "Kojo is a 22 year old Ghanaian born apprentice living in the United Kingdom. His relatives celebrate him as the family's success abroad and rely on part of his income. He has experienced racist comments at work and feels isolated from old friends. Some peers joke that therapy is not for men. A trusted football coach notices that Kojo has stopped attending practice. Primary care and a community organization are available, but Kojo expects a long wait and worries that a provider will misunderstand his culture.",
        ],
      },
    ],
    conclusion: [
      'Neither vignette provides enough information for a diagnosis. Both show how praise can conceal strain. Thandi and Kojo are managing personal, relational, economic, and institutional pressures. Their strength deserves respect, but respect should not become an excuse to leave them carrying everything alone.',
    ],
  },
  // ============ STAGE 4 CONTENT ADDITION (interactive scenario,
  // public-facing block only) ============
  //
  // Authoritative source: Tamu-Academy-MH-Module-2-Base44-Content-Pack.md.
  // Carries ONLY the scenarioId, title, prompt, and four response
  // options. No instructionLine is stored (no exact wording was
  // authorized for this stage). NEVER include bestResponseIndex,
  // correctIndex, isCorrect, feedback, feedbackByOption, answerKey, or
  // any evaluation data here — those live exclusively in
  // MENTAL_HEALTH_MODULE_2_SCENARIO_ANSWERS and are released only by
  // checkMentalHealthScenario after the learner submits a valid
  // selection.
  interactiveScenario: {
    scenarioId: 'praise-that-becomes-pressure',
    title: 'Response Design',
    prompt:
      'Which plan best responds to both cases without erasing resilience or reducing the problem to individual coping?',
    options: [
      'Enroll both people in a resilience workshop and leave work, family, and service conditions unchanged.',
      'Ask them to tell their stories publicly so their communities can learn that mental health matters.',
      'Ask what support each person wants, protect privacy, share practical burdens where possible, connect them with culturally responsive and qualified support, and address harmful work or service conditions.',
      'Refer both people immediately to a specialist and avoid discussing family, culture, work, racism, or financial pressure.',
    ],
  },
  // ============ STAGE 5 CONTENT ADDITION (Strength Without Silence
  // Lab) ============
  //
  // Authoritative source: Tamu-Academy-MH-Module-2-Base44-Content-Pack.md
  // and the dedicated "Strength Without Silence Lab" document.
  //
  // This is the ONLY approved applied activity added in Stage 5. It is
  // instructional, browser-local worksheet content. The object carries
  // NO answer key, NO correct indices, NO grading logic, NO completion
  // signal, and NO backend behavior. It is never an evaluated scenario,
  // graded quiz, or completion event — it is intentionally NOT added to
  // the scenario answer map or quiz answer structures.
  //
  // The renderer (MhStrengthWithoutSilenceLab) keeps every response,
  // selection, and checkbox in temporary React component state only.
  // Nothing here is persisted, submitted, tracked, branded as
  // completion, or used to update ModuleProgress / QuizAttempt /
  // CourseEnrollment.
  strengthWithoutSilenceLab: {
    eyebrow: 'MODULE 2 APPLIED ACTIVITY',
    title: 'Strength Without Silence Lab',
    subtitle: 'Preserving resilience while widening support',
    course: 'Mental Health, Community and Culture',
    module: 'Stress, Stigma, and Strength',
    suggestedTime: '25 to 35 minutes',
    submission: 'Private or facilitator reviewed; personal disclosure is not required',
    privacy: {
      heading: 'CHOOSE YOUR PRIVACY LEVEL',
      notice: "Complete this lab for a fictional person, a composite scenario, or a general social message. Do not include diagnoses, trauma histories, names, addresses, immigration details, or other sensitive information. This is an educational activity and does not assess anyone's diagnosis or treatment needs.",
    },
    purpose: {
      heading: 'Purpose',
      text: 'This activity examines a strength narrative without dismissing the conditions that produced it. Your task is to protect what gives the message dignity or meaning, identify where it creates silence or unequal burdens, and design a wider pathway to support.',
    },
    fivePartLens: {
      heading: 'The Five Part Lens',
      items: [
        'Name the pressure.',
        'Name the strength message.',
        'Protect what helps.',
        'Release what harms.',
        'Widen the support pathway.',
      ],
    },
    selectScenario: {
      heading: 'Part A: Select a Scenario',
      instruction: 'Choose one. You may also create a fictional composite with no identifying details.',
      scenarios: [
        {
          title: 'Scenario 1: The dependable man',
          description: 'A young man is told that a dependable man handles pain alone. His family values his reliability, but he has stopped asking for help even when work and caregiving demands exceed his capacity.',
        },
        {
          title: 'Scenario 2: The woman who manages every crisis',
          description: 'A Black woman in a diaspora workplace is praised for staying composed and solving every crisis. Colleagues rely on her but rarely share the load or ask what support she needs.',
        },
        {
          title: 'Scenario 3: The successful migrant',
          description: 'A migrant provider hides financial and emotional strain because relatives and friends see life abroad as proof of success. The person fears that honesty will create worry, shame, or disappointment.',
        },
        {
          title: 'Scenario 4: The always hopeful organizer',
          description: 'A youth organizer is expected to remain hopeful for everyone after repeated community losses. Their public role makes rest and private grief feel like abandonment.',
        },
      ],
      selectionLabel: 'Your selection',
      compositeOption: 'My own fictional composite',
    },
    parts: {
      namePressure: {
        heading: 'Part B: Name the Pressure',
        prompt: "List the demands, losses, risks, or unequal conditions in the scenario. Include at least one factor beyond the individual's attitudes or coping.",
      },
      nameStrengthMessage: {
        heading: 'Part C: Name the Strength Message',
        prompt: 'Write the rule or expectation in one sentence. What is the person expected to prove, hide, or carry?',
      },
      protectWhatHelps: {
        heading: 'Part D: Protect What Helps',
        prompt: 'What dignity, identity, purpose, solidarity, courage, cultural meaning, or practical value does the message provide?',
      },
      releaseWhatHarms: {
        heading: 'Part E: Release What Harms',
        prompt: 'Identify the hidden cost. Consider compulsory silence, emotional restriction, endless sacrifice, shame, overwork, isolation, delayed help, or unequal responsibility.',
      },
      reframeMessage: {
        heading: 'Part F: Reframe the Message',
        prompt: 'Rewrite the original strength message so that it keeps dignity while making room for honesty, limits, shared care, and support.',
        originalLabel: 'Original message:',
        reframedLabel: 'Reframed message:',
      },
      widenSupportPathway: {
        heading: 'Part G: Widen the Support Pathway',
        prompt: "Build a layered response. Include only options that fit the fictional person's preferences and context.",
        layers: [
          { name: 'Trusted person or peer', possibleRole: 'Listen, protect privacy, check in, and help identify choices.' },
          { name: 'Community support', possibleRole: 'Offer belonging, practical help, mentoring, or culturally meaningful support.' },
          { name: 'Practical relief', possibleRole: 'Reduce a burden involving work, money, transport, caregiving, school, or housing.' },
          { name: 'Qualified care', possibleRole: 'Offer access to primary care or a qualified mental health professional when wanted or needed.' },
          { name: 'Institutional change', possibleRole: 'Address workload, discrimination, confidentiality, cost, service access, or another system barrier.' },
        ],
        fullPathwayLabel: 'Describe the full pathway:',
      },
      consentAndBoundaries: {
        heading: 'Part H: Consent and Boundaries',
        prompt: "Name one boundary that protects the person's privacy or agency. Then name one action that should not be taken without consent.",
        boundaryLabel: 'Boundary protecting privacy or agency',
        actionLabel: 'Action that should not be taken without consent',
      },
    },
    workedExample: {
      heading: 'Worked Example',
      introduction: 'Fictional example: A student leader is praised for being the person who keeps everyone calm during repeated campus crises. The student has stopped sleeping well and feels unable to step back.',
      rows: [
        { field: 'Pressure', response: 'Repeated crises, leadership expectations, limited staff support, and fear of disappointing peers.' },
        { field: 'Strength message', response: 'A real leader stays calm and available no matter what.' },
        { field: 'What it protects', response: 'Responsibility, trust, purpose, and commitment to the group.' },
        { field: 'Hidden cost', response: 'Sleep loss, isolation, emotional suppression, and a workload the institution should share.' },
        { field: 'Reframed message', response: 'A responsible leader builds shared capacity, names limits, and seeks support before exhaustion becomes crisis.' },
        { field: 'Support pathway', response: 'A trusted peer check in, a rotating leadership schedule, time away, and confidential student support if wanted.' },
        { field: 'Institutional change', response: 'Create trained backup leaders and a written response plan so one student is never the sole source of stability.' },
      ],
    },
    optionalDialogueExtension: {
      heading: 'Optional Dialogue Extension',
      introduction: 'If this activity is completed in a group, discuss the fictional scenario only. Participants may pass, write privately, or use another scenario.',
      prompts: [
        'When does being strong help in this scenario?',
        'When does it become an obligation that hides a problem?',
        'What part of the message should be preserved?',
        'What practical or institutional change would reduce the need for endless endurance?',
        'How can support be offered without requiring disclosure?',
      ],
    },
    completionCheck: {
      heading: 'Completion Check',
      items: [
        'I identified at least one personal or relational pressure, one structural condition, and the strength message.',
        'I described both its protective purpose and its possible cost.',
        'I wrote a reframed message that preserves dignity.',
        'I included a layered support pathway, one institutional change, and a consent or privacy protection.',
        'I removed identifying and sensitive details.',
      ],
    },
    revisionNotes: {
      heading: 'Revision Notes',
      prompt: 'After reviewing the lesson or receiving feedback, record one improvement to the reframed message or support pathway. Keep the scenario fictional and do not add identifying or sensitive information.',
    },
  },
  // ============ STAGE 6 CONTENT ADDITION (Private Reflection) ============
  //
  // Authoritative source: the Stage 6 content brief.
  //
  // Display-only reflection block. The renderer (MhModule2PrivateReflection)
  // has NO state, NO input fields, NO submit/save/complete controls, and NO
  // backend call. The sentence starter is shown as a fill-in-the-blank line
  // for private/offline completion; nothing is captured, persisted, graded,
  // or tracked. This section is ungraded, optional, not a completion event,
  // not a progress event, not a submission, not an evaluated scenario, and
  // not an analytics event. It does not update ModuleProgress, QuizAttempt,
  // CourseEnrollment, or any other entity. It is separate from the Module 2
  // applied activity and separate from the knowledge check.
  privateReflection: {
    heading: "Private Reflection",
    privacyNotice: "You may use a fictional or composite example. You do not need to disclose personal experiences, diagnoses, trauma, immigration information, or private family circumstances.",
    prompt: "Complete this sentence for a real or fictional context:",
    sentenceStarter: "Strength can include endurance, but it can also include __________________ because __________________.",
    followUpPrompt: "Then name one boundary, shared responsibility, or support pathway that would make that statement real.",
    privateNotice: "Keep this reflection private unless you freely choose to share it. Do not include diagnoses, trauma details, names, immigration information, or other sensitive information in a public form.",
  },
  // ============ STAGE 7 CONTENT ADDITION (Knowledge Check) ============
  //
  // Authoritative source: the Stage 7 content brief.
  //
  // Server-side source of truth for the Module 2 knowledge check. The
  // public-facing block returned to the browser by
  // getMentalHealthModuleContent is SANITIZED: each question's
  // correctAnswerIndex and feedback are stripped before delivery, so
  // no answer key or feedback reaches the browser bundle. Grading and
  // feedback release happen exclusively in the role-gated
  // checkMentalHealthKnowledgeCheck backend function, only after a valid
  // submission. This object is never imported by any src/ file.
  //
  // The knowledge check is ungraded for module completion: it creates
  // no QuizAttempt, ModuleProgress, or CourseEnrollment record, and
  // triggers no completion, certificate, payment, enrollment, or
  // analytics event.
  knowledgeCheck: {
    heading: "MODULE 2 KNOWLEDGE CHECK",
    subtitle: "Stress, Stigma, and Strength",
    learnerInstruction: "Answer all five questions. Answer at least four of the five questions correctly to pass. Educational feedback appears after submission, and you may retry.",
    privacyNotice: "This assessment checks understanding of course concepts. It does not ask for personal mental health information and does not evaluate anyone's health or diagnosis.",
    passingScore: 4,
    questions: [
      {
        id: "m2-q1",
        prompt: "Which statement best distinguishes stress, distress, and a mental health diagnosis?",
        options: [
          "Any distress is proof of a mental health disorder.",
          "Stress only comes from personal choices.",
          "Distress may reflect strain in a person's life, but diagnosis requires qualified assessment of severity, duration, functioning, risk, health, culture, and context.",
          "Strong people do not experience harmful stress."
        ],
        correctAnswerIndex: 2,
        feedback: "Distress is real and deserves attention, but it is not automatically a diagnosis. Qualified assessment considers several factors and the person's context."
      },
      {
        id: "m2-q2",
        prompt: "A government funds one distant psychiatric institution while providing almost no affordable community or primary care services. Which concept best describes this barrier?",
        options: [
          "Public stigma only",
          "Internalized stigma",
          "Structural stigma",
          "Personal weakness"
        ],
        correctAnswerIndex: 2,
        feedback: "Structural stigma operates through budgets, institutions, rules, and service arrangements that restrict access, rights, quality, or participation."
      },
      {
        id: "m2-q3",
        prompt: "Which statement about strength narratives is most accurate?",
        options: [
          "They are always harmful and should be abandoned.",
          "They can protect dignity and survival while also creating pressure to suppress emotion, overwork, or avoid help.",
          "They affect every African and diaspora community in the same way.",
          "They are caused only by family culture."
        ],
        correctAnswerIndex: 1,
        feedback: "Strength narratives can carry pride, protection, and collective memory. The same narrative can become costly when it is compulsory or used to excuse unequal conditions."
      },
      {
        id: "m2-q4",
        prompt: "Which response best applies the Strength Without Silence lens?",
        options: [
          "Praise endurance and avoid discussing the pressures behind it.",
          "Require public disclosure so stigma can be challenged.",
          "Remove every responsibility from the person without asking what they want.",
          "Identify the pressure, preserve dignity and agency, release compulsory silence, share burdens, and widen support options."
        ],
        correctAnswerIndex: 3,
        feedback: "A strong response respects why endurance matters while making room for consent, boundaries, practical relief, culturally affirming care, and system change."
      },
      {
        id: "m2-q5",
        prompt: "Which statement best explains why stigma should not be treated only as a cultural attitude?",
        options: [
          "Stigma disappears as soon as people learn clinical vocabulary.",
          "Help seeking is shaped by attitudes as well as cost, confidentiality, discrimination, service quality, workforce shortages, policy, and historical trust.",
          "Culture has no influence on how distress is understood.",
          "Professional referral is enough even when services are inaccessible or unsafe."
        ],
        correctAnswerIndex: 1,
        feedback: "Social messages matter, but real access also depends on trustworthy institutions, affordable services, rights, confidentiality, and culturally responsive care."
      }
    ]
  },
};

/**
 * PROTECTED SCENARIO ANSWER KEY — server-side-only.
 *
 * Released to the role-gated `checkMentalHealthScenario` function
 * AFTER the learner submits a valid selection. This constant is NEVER
 * imported by any src/ file, NEVER returned by `getMentalHealthModule`,
 * and NEVER embedded in any browser bundle.
 *
 * The `lesson.interactiveScenario` object above carries only the
 * scenarioId, prompt, options, and instruction. The two protected
 * fields below (bestResponseIndex, feedback) are the only answer
 * material and the only thing checkMentalHealthScenario adds to its
 * return payload beyond what the learner already submitted.
 */
export const MENTAL_HEALTH_MODULE_1_SCENARIO_ANSWERS = {
  'care-without-control': {
    optionsCount: 4,
    bestResponseIndex: 2,
    feedback:
      'This response treats Lerato as part of a community without surrendering her voice, privacy, boundaries, or right to professional care.',
  },
};

/**
 * PROTECTED SCENARIO ANSWER KEY (Module 2) — server-side-only.
 *
 * Released to the role-gated `checkMentalHealthScenario` function AFTER
 * the learner submits a valid selection. This constant is NEVER
 * imported by any src/ file, NEVER returned by `getMentalHealthModule`,
 * and NEVER embedded in any browser bundle.
 *
 * The public-facing `lesson.interactiveScenario` object carries only
 * the scenarioId, prompt, options, and instruction line. The protected
 * fields below (bestResponseIndex, feedbackByOption) are released to
 * `checkMentalHealthScenario`'s return payload — as the learner-facing
 * feedback for the option the learner actually submitted — but NEVER
 * as a raw correct-index field, and never as feedback for options the
 * learner did not submit.
 *
 * Indexing convention (unchanged from Module 1):
 *   - optionsCount: total number of options (zero-based array length).
 *   - bestResponseIndex: zero-based index of the best response. For
 *     this scenario the approved best response is Option 3, so the
 *     stored zero-based index is 2.
 *   - feedbackByOption: array indexed by the submitted option's
 *     zero-based index; only the element matching the submitted
 *     selection is returned by checkMentalHealthScenario.
 */
export const MENTAL_HEALTH_MODULE_2_SCENARIO_ANSWERS = {
  'praise-that-becomes-pressure': {
    optionsCount: 4,
    bestResponseIndex: 2,
    feedbackByOption: [
      'Coping skills can be useful, but this plan places responsibility on the individual while leaving the main pressures untouched. Resilience education should not substitute for practical relief or institutional change.',
      'Lived experience leadership can reduce stigma when participation is voluntary and supported. Requiring disclosure can violate privacy, expose people to harm, and turn vulnerability into another performance.',
      'This is the strongest response. It respects agency, preserves privacy, shares responsibility, connects informal and professional support, and recognizes structural conditions.',
      "Qualified care may be important, but a referral alone can miss cost, trust, culture, discrimination, family responsibility, and practical barriers. Professional care works better when it understands the person's full context.",
    ],
  },
};

/** Whether the given scenario identifier has a protected answer key. */
export function isScenarioSupported(courseSlug, moduleRoute, scenarioId) {
  if (!courseExists(courseSlug)) return false;
  if (typeof scenarioId !== 'string' || !scenarioId) return false;
  if (moduleRoute === 'module-1') {
    return Object.prototype.hasOwnProperty.call(
      MENTAL_HEALTH_MODULE_1_SCENARIO_ANSWERS,
      scenarioId,
    );
  }
  if (moduleRoute === 'module-2') {
    return Object.prototype.hasOwnProperty.call(
      MENTAL_HEALTH_MODULE_2_SCENARIO_ANSWERS,
      scenarioId,
    );
  }
  return false;
}

/** Returns the protected answer key for the scenario or null if unsupported. */
export function getScenarioAnswer(courseSlug, moduleRoute, scenarioId) {
  if (!isScenarioSupported(courseSlug, moduleRoute, scenarioId)) return null;
  if (moduleRoute === 'module-1') {
    return MENTAL_HEALTH_MODULE_1_SCENARIO_ANSWERS[scenarioId];
  }
  if (moduleRoute === 'module-2') {
    return MENTAL_HEALTH_MODULE_2_SCENARIO_ANSWERS[scenarioId];
  }
  return null;
}

/**
 * PROTECTED QUIZ ANSWER KEY — server-side-only.
 *
 * Released to the role-gated `submitMentalHealthQuiz` function AFTER
 * the learner submits a valid quiz. This constant is NEVER imported by
 * any `src/` file, NEVER returned by `getMentalHealthModule`, and NEVER
 * embedded in any browser bundle.
 *
 * The public-facing `lesson.knowledgeCheck` object carries only the
 * quizId, question wording, response options, passing information,
 * and retry instructions. The protected fields below (correctIndex,
 * correctFeedback, incorrectFeedback) are released to
 * `submitMentalHealthQuiz`'s return payload — as the per-question
 * learner-facing feedback for the option the learner chose
 * (correctFeedback when they matched correctIndex, incorrectFeedback
 * otherwise) — but NEVER as raw correct-index fields, and never as
 * the full answer key object.
 */
export const MENTAL_HEALTH_MODULE_1_QUIZ_ANSWERS = {
  'module-1-knowledge-check': {
    totalQuestions: 5,
    passingThreshold: 4,
    items: {
      'ubuntu-personhood': {
        optionsCount: 4,
        correctIndex: 1,
        correctFeedback:
          'Ubuntu proposes "umuntu ngumuntu ngabantu" — a person becomes a person through other persons. This relational view does not eliminate individual voice; it locates wellbeing in belonging and mutual recognition.',
        incorrectFeedback:
          "Reconsider: Ubuntu's central claim is relational — a person becomes a person through other persons. The relational view does not say the community always overrides individual choice, that identity is unrelated to belonging, or that persons are isolated minds.",
      },
      'community-both-sides': {
        optionsCount: 4,
        correctIndex: 2,
        correctFeedback:
          'Module 1 examines both sides of communal life: the protection created by belonging and mutual care, and the strain created by obligation, coercion, silence, exclusion, or unequal caregiving.',
        incorrectFeedback:
          'Reconsider: the module asks you to look at both protection and strain — Ubuntu can support belonging and mutual care, but communal life can also create obligation, silence, exclusion, or unequal caregiving.',
      },
      'care-without-control': {
        optionsCount: 4,
        correctIndex: 2,
        correctFeedback:
          'This response treats the person as part of a community without surrendering voice, privacy, boundaries, or access to qualified professional support — care without control.',
        incorrectFeedback:
          'Reconsider: balance Ubuntu-informed care with safety — ask what support the person wants, offer concrete help, respect confidentiality, discuss boundaries, and provide information about qualified support rather than coercion, isolation, or exposure.',
      },
      'community-strain-forms': {
        optionsCount: 4,
        correctIndex: 0,
        correctFeedback:
          'The module identifies obligation, coercion, silence, exclusion, and unequal caregiving as forms of strain communal life can produce even when its values emphasize mutual care.',
        incorrectFeedback:
          'Reconsider: Ubuntu does not guarantee community wellbeing. Strain can include obligation, silence, exclusion, or unequal caregiving — honest inspection is part of this module.',
      },
      'ubuntu-clinical-coexistence': {
        optionsCount: 4,
        correctIndex: 2,
        correctFeedback:
          "Module 1's learning objectives ask you to compare a relational emphasis with a dominant individual clinical emphasis without treating either as internally uniform; the two can complement each other.",
        incorrectFeedback:
          'Reconsider: the module asks you to compare both emphases without treating either as internally uniform — Ubuntu does not eliminate or replace clinical care, nor does a clinical emphasis erase the role of relationships and belonging.',
      },
    },
  },
};

/** Whether the given quiz identifier has a protected answer key. */
export function isQuizSupported(courseSlug, moduleRoute, quizId) {
  if (!courseExists(courseSlug)) return false;
  if (moduleRoute !== 'module-1') return false;
  if (typeof quizId !== 'string' || !quizId) return false;
  return Object.prototype.hasOwnProperty.call(
    MENTAL_HEALTH_MODULE_1_QUIZ_ANSWERS,
    quizId,
  );
}

/** Returns the protected answer key for the quiz or null if unsupported. */
export function getQuizAnswerKey(courseSlug, moduleRoute, quizId) {
  if (!isQuizSupported(courseSlug, moduleRoute, quizId)) return null;
  return MENTAL_HEALTH_MODULE_1_QUIZ_ANSWERS[quizId];
}

/**
 * Phase 2 early content stage — lookup for the role-gated
 * `getMentalHealthModule` function. Returns the shell metadata for any
 * admin preview plus (for module-1) the structured lesson content. For
 * Modules 2–7 currently returns the shell only with `contentAvailable: false`.
 *
 * The function still rejects any (courseSlug, moduleRoute) pair that
 * does not exist in MENTAL_HEALTH_COURSE_CONFIG, and still does not
 * expose admin-only content (correctIndex, scenario, quiz answers,
 * facilitation notes, etc.) in any response. Module 1's lesson object
 * carries no admin-only material, so no filtering is required for it.
 * Module 2's lesson object (Stage 7) carries the knowledge-check
 * answer key inline (correctAnswerIndex + feedback per question) as
 * the server-side source of truth; the module-2 branch below strips
 * those answer-key fields before returning the lesson, so no
 * correct index or feedback reaches the browser. Grading and
 * feedback release happen only in the separate checkMentalHealthKnowledgeCheck
 * backend function, after a valid submission.
 */
export function getMentalHealthModuleContent(courseSlug, moduleRoute) {
  const m = getModuleConfig(courseSlug, moduleRoute);
  if (!m) return null;
  const baseShell = {
    route: m.route,
    number: m.number,
    title: m.title,
    status: m.status,
    publicationStatus: m.publicationStatus,
    prerequisite: m.prerequisite || null,
    contentAvailable: !!(m.sections && m.sections.length > 0),
    sections: m.sections || [],
  };
  // Module 1 ships its full lesson object. Module 2 ships the Stage 1
  // foundation lesson object (overview, competency, objectives, and
  // the early educational disclaimer) — its later approved stages will
  // extend this in parallel with MENTAL_HEALTH_MODULE_2_LESSON.
  // Modules 3 through 7 still return the shell only.
  if (m.route === 'module-1') {
    return { ...baseShell, lesson: MENTAL_HEALTH_MODULE_1_LESSON };
  }
  if (m.route === 'module-2') {
    // Stage 7: the Module 2 knowledge check carries the protected
    // answer key (correctAnswerIndex + feedback) inline as the
    // server-side source of truth. Before the lesson is returned to
    // the role-gated getMentalHealthModule function (and from there
    // to the browser), the answer-key fields are stripped from each
    // question so that no correct index or feedback reaches the
    // browser bundle. Grading and feedback release happen only in
    // the separate checkMentalHealthKnowledgeCheck backend function, after a
    // valid submission. All other Stage 1-6 fields are passed through
    // unchanged.
    const lesson = MENTAL_HEALTH_MODULE_2_LESSON;
    const sanitizedLesson = { ...lesson };
    if (lesson.knowledgeCheck && Array.isArray(lesson.knowledgeCheck.questions)) {
      sanitizedLesson.knowledgeCheck = {
        heading: lesson.knowledgeCheck.heading,
        subtitle: lesson.knowledgeCheck.subtitle,
        learnerInstruction: lesson.knowledgeCheck.learnerInstruction,
        privacyNotice: lesson.knowledgeCheck.privacyNotice,
        passingScore: lesson.knowledgeCheck.passingScore,
        questions: lesson.knowledgeCheck.questions.map((q) => ({
          id: q.id,
          prompt: q.prompt,
          options: q.options,
        })),
      };
    }
    return { ...baseShell, lesson: sanitizedLesson };
  }
  return baseShell;
}