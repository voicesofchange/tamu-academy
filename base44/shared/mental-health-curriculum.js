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
      // The 14 implemented section identifiers for the Module 1 content
      // stage. Section identifiers for the scenario, activity,
      // reflection, knowledge check, completion requirements, closing
      // text, and optional assignment are intentionally NOT in this list
      // because those sections are not implemented in this stage and
      // arbitrary extra identifiers remain rejected.
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
        'sources',
      ],
    },
    {
      route: 'module-2',
      number: 'Module 2',
      title: 'Stress, Stigma, and Strength: Rethinking Mental Health Narratives in African and Diaspora Communities',
      status: 'Coming Soon',
      publicationStatus: 'unpublished',
      prerequisite: 'module-1',
      sections: [],
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
};

/**
 * Phase 2 early content stage — lookup for the role-gated
 * `getMentalHealthModule` function. Returns the shell metadata for any
 * admin preview plus (for module-1) the structured lesson content. For
 * Modules 2–7 currently returns the shell only with `contentAvailable: false`.
 *
 * The function still rejects any (courseSlug, moduleRoute) pair that
 * does not exist in MENTAL_HEALTH_COURSE_CONFIG, and still does not
 * expose admin-only content (correctIndex, scenario, quiz answers,
 * facilitation notes, etc.) in any response. This lesson object does
 * not contain that admin-only material, so no extra filtering is
 * required.
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
  // Currently only Module 1 has a staged lesson object attached.
  // Future modules will follow the same shape once their content lands.
  if (m.route === 'module-1') {
    return { ...baseShell, lesson: MENTAL_HEALTH_MODULE_1_LESSON };
  }
  return baseShell;
}