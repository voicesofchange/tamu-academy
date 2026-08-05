/**
 * MODULE 5 LESSON CONTENT — server-side-only.
 *
 * Authoritative source: Tamu-Academy-MH-Module-5-Base44-Content-Pack.md
 * and the supplied Learner Guide, PATHWAYS Partnership and Referral Lab,
 * and Knowledge Check documents.
 *
 * This file is imported ONLY by base44/shared/mental-health-curriculum.js.
 * It MUST NEVER be imported by any file in src/.
 *
 * SAFETY STANDARD: Never store a learner's beliefs, diagnoses, symptoms,
 * treatment history, herbal use, trauma, crisis information, personal
 * reflection, or PATHWAYS responses. The content pack permits fictional,
 * offline, downloadable, browser-local, or temporary completion.
 *
 * The knowledge check answer key (correctAnswerIndex + feedback) is
 * stripped from each question before the lesson is returned to the
 * browser by getMentalHealthModuleContent. Grading and feedback
 * release happen only in the checkMentalHealthKnowledgeCheck backend
 * function.
 *
 * The Mwangaza scenario feedback (feedbackByOption per decision) is
 * kept in MENTAL_HEALTH_MODULE_5_SCENARIO_ANSWERS (declared below)
 * and released only by checkMentalHealthScenario after the learner
 * submits a valid selection for each decision.
 */

export const MENTAL_HEALTH_MODULE_5_LESSON = {
  moduleOverview: {
    paragraphs: [
      'People often seek mental health support through several sources, including family, elders, peers, faith communities, traditional practitioners, primary care, counselors, psychologists, social workers, and doctors.',
      'This module examines how spiritual, traditional, community, and professional supports can work in a connected care pathway without being treated as identical. Learners explore meaning, belonging, evidence, medicine safety, rights, consent, role boundaries, referral, and the unequal histories that shape trust.',
      'The goal is not to force a choice between culture and science. It is to build culturally respectful coordination that preserves voluntary choice, protects rights, makes evidence limits clear, and prevents urgent or effective care from being delayed.',
    ],
    competency:
      'By the end of this module, learners should be able to design a culturally respectful partnership among spiritual, traditional, community, and professional support systems with clear roles, informed consent, human rights protections, medicine safety, warm referral, follow up, and lived experience accountability.',
  },
  learningObjectives: {
    objectives: [
      'Map the distinct roles that faith leaders, spiritual communities, traditional practitioners, peers, families, and mental health professionals may hold.',
      'Explain how prayer, ritual, communal gathering, meaning making, traditional practices, and clinical care may support different needs.',
      'Assess strengths and risks without romanticizing cultural support or treating professional care as culture free.',
      'Analyze trust, colonial history, regulation, evidence, power, consent, privacy, safeguarding, and medicine safety in a partnership.',
      'Design a culturally respectful coordination model with role boundaries, warm referral, follow up, rights protections, and lived experience accountability.',
    ],
    earlyDisclaimer:
      'This course provides general educational information. It does not provide diagnosis, therapy, spiritual direction, traditional medicine advice, medical treatment, or emergency support. It does not decide whether any spiritual belief is true or false. If someone is in immediate danger, use the established local emergency and safeguarding pathway.',
  },
  contentSafetyNote:
    'The materials discuss mental distress, suicide, coercion, abuse, stigma, treatment gaps, and spiritual and traditional practices. You may pause, use written summaries, or skip personal reflection. Use fictional or composite situations. No personal disclosure is required.',
  pathwaysSafetyWarning:
    'Design a partnership concept, not a treatment service. Do not diagnose, prescribe, recommend herbs, test religious claims, conduct risk assessment, practice crisis response, or use real health information. Name where qualified clinical, legal, safeguarding, medicine safety, ethical, and community guidance would be required.',
  fictionalSituationReminder:
    'Use a fictional or composite situation. You do not need to disclose personal experiences, diagnoses, trauma, treatment history, health information, or locally identifiable case details.',
  coreMedia: {
    attributionStatement:
      'These independently produced videos are included as learning resources. Their speakers, publishers, producers, sponsors, and programs are not Tamu Academy instructors, employees, or partners. Inclusion does not imply a formal partnership, endorsement, certification, proof of effectiveness, or clinical review by Tamu Academy.',
    primary: {
      title: 'Traditional Healers as Therapists? Inside South Africa\u2019s Mental Health Crisis',
      series: 'MINDSET',
      publisher: 'Al Jazeera English',
      watchUrl: 'https://www.youtube.com/watch?v=OwHQ6w_a2zg',
      embedUrl: 'https://www.youtube.com/embed/OwHQ6w_a2zg',
      officialPageUrl: 'https://www.aljazeera.com/video/mindset/2024/1/25/witch-doctors-as-therapists-inside-south-africas-mental-health-crisis',
      officialPageLabel: 'Open the original Al Jazeera program page',
      attributionLabel: 'Al Jazeera English \u00b7 MINDSET',
      roleInModule: 'Journalistic case material on traditional and spiritual healing, cultural meaning, youth interest, access, service gaps, and broad treatment claims.',
      contentNote: 'This video is a journalistic account. It presents experiences and viewpoints. It is not independent evidence that a specific practice is clinically effective or safe.',
    },
    secondary: {
      title: 'Faith and Mental Health, Part 5',
      publisher: 'Brother Be Well',
      watchUrl: 'https://www.youtube.com/watch?v=rgCNoSkYRy8',
      embedUrl: 'https://www.youtube.com/embed/rgCNoSkYRy8',
      officialPageUrl: 'https://brotherbewell.com/faith-and-mental-health-part-5/',
      officialPageLabel: 'Open the official Brother Be Well resource page',
      attributionLabel: 'Brother Be Well',
      roleInModule: 'A United States based discussion of spiritual conviction and mental wellness with clinical and community voices.',
      contentNote: 'Brother Be Well is included as a learning example. Tamu Academy does not claim a formal partnership.',
    },
    optionalExtended: [
      {
        title: 'Mental Health and the Church',
        guest: 'Dr. Zamahlubi Dlamini-Manana, psychiatrist, mental health advocate, and pastor',
        publisher: 'The UnChristian Network',
        watchUrl: 'https://www.youtube.com/watch?v=lhDrrBzVgV4',
        embedUrl: 'https://www.youtube.com/embed/lhDrrBzVgV4',
        approximateLength: 'Approximately 59 minutes',
        roleInModule: 'Extended discussion of stigma, prayer, theology, professional care, and mentally healthy congregations.',
      },
      {
        title: 'Mental Health and Healing in Africa',
        publisher: 'African Studies Association',
        watchUrl: 'https://www.youtube.com/watch?v=OSF3uV-5NaU',
        embedUrl: 'https://www.youtube.com/embed/OSF3uV-5NaU',
        approximateLength: 'Approximately 102 minutes',
        roleInModule: 'Academic discussion of herbal practice, healing dance, faith healing, cultural history, and mental health meanings.',
      },
    ],
  },
  questionsToConsider: [
    'What kind of support is offered: meaning, belonging, ritual, practical help, education, assessment, treatment, or referral?',
    'Whose explanation of distress is treated as authoritative, and who has room to disagree?',
    'Which statements are personal testimony, cultural interpretation, professional opinion, program description, or research evidence?',
    'What role do access, cost, trust, language, identity, and service shortages play?',
    'What consent, privacy, safeguarding, evidence, medicine safety, and urgent response questions remain?',
    'How could a provider respect spiritual meaning without presenting an unverified explanation as clinical fact?',
    'What would a two way referral relationship require?',
  ],
  tamuIntroduction: {
    paragraphs: [
      'People rarely enter mental health support through one doorway.',
      'A person may speak first with a relative, elder, pastor, imam, traditional practitioner, peer, teacher, nurse, counselor, psychologist, social worker, or doctor. They may use several supports at the same time. This reality is often called plural care.',
      'Plural care can provide meaning, belonging, practical help, culturally familiar language, and earlier contact. It can also become fragmented or unsafe when providers dismiss one another, roles are unclear, information is shared without consent, untested claims are treated as certainty, harmful practices are hidden as culture, or urgent care is delayed.',
      'This module does not ask learners to choose between culture and science. It asks how different supports can relate honestly, protect rights, respect a person\u2019s beliefs and choices, disclose evidence limits, and make timely referral possible.',
    ],
  },
  explanation: [
    {
      sectionId: 'more-than-one-doorway',
      heading: '1. More than one doorway to care',
      paragraphs: [
        'A care pathway is the sequence of people, places, explanations, and decisions through which someone seeks support.',
        'The pathway may be:',
      ],
      numberedItems: [
        'Sequential: A person tries one support, then another.',
        'Concurrent: A person uses several supports at the same time.',
        'Parallel but disconnected: Several providers are involved but do not know what the others are doing.',
        'Coordinated: Distinct providers communicate with consent, understand their roles, refer, and follow up.',
      ],
      trailingParagraphs: [
        'Using more than one support is not automatically safe or unsafe. Ask:',
        'What does each support actually do? What evidence and risks apply? Is participation voluntary? Is the support accessible and respectful? Does the pathway protect timely access to appropriate care?',
      ],
    },
    {
      sectionId: 'not-one-category',
      heading: '2. Faith, spirituality, and traditional healing are not one category',
      paragraphs: [
        'Religious communities, spiritual practices, and traditional healing systems vary across countries, peoples, generations, denominations, lineages, and individual practitioners. Some roles overlap. Others disagree strongly with one another.',
        'Possible contributions include:',
      ],
      numberedItems: [
        'Faith leader or congregation: meaning, prayer, belonging, practical aid, grief support, moral language, recognition, and referral.',
        'Traditional practitioner: cultural interpretation, ritual, herbal knowledge, family or ancestral meaning, community trust, recognition, and referral.',
        'Peer, elder, or family network: companionship, practical help, advocacy, daily support, and recognition.',
        'Clinical or social care professional: assessment, treatment, rehabilitation, protection, social support, medicine safety, and referral.',
      ],
      trailingParagraphs: [
        'These are not universal job descriptions. A traditional practitioner may specialize in herbs, divination, ritual, counseling, birth, bones, or other practices. A faith leader may or may not provide counseling. A clinician may also hold religious or traditional beliefs.',
      ],
    },
    {
      sectionId: 'what-supports-may-provide',
      heading: '3. What spiritual and traditional supports may provide',
      paragraphs: [
        'Spiritual or traditional support may offer:',
      ],
      numberedItems: [
        'A language for suffering, hope, identity, grief, duty, and repair',
        'Belonging and recognition within a trusted community',
        'Rituals that mark transition, loss, reconciliation, or renewed purpose',
        'Practical help with food, transport, caregiving, shelter, or social connection',
        'A first conversation where professional services are scarce or stigmatized',
        'Continuity with family, history, land, ancestors, faith, or moral commitments',
        'Voluntary support alongside professional care',
      ],
      trailingParagraphs: [
        'A practice may feel meaningful or supportive without being an evidence based treatment for a specific condition. Testimony, cultural value, safety, and clinical effectiveness answer different questions.',
      ],
    },
    {
      sectionId: 'where-harm-can-occur',
      heading: '4. Where harm can occur',
      paragraphs: [
        'Risks include:',
      ],
      numberedItems: [
        'Delay: Necessary care is postponed until a ritual or prayer period ends.',
        'Blame and stigma: Distress is framed as weak faith, sin, curse, or personal failure.',
        'Coercion: Forced prayer, ritual, confinement, restraint, fasting, confession, or treatment.',
        'Unsafe products: Unknown ingredients, dose, contamination, toxicity, or interaction with medicine.',
        'Privacy failure: Personal information is shared with family or a congregation without consent.',
        'Exploitation: Fear is used to demand money, loyalty, secrecy, or repeated services.',
      ],
      trailingParagraphs: [
        'These risks are not unique to spiritual or traditional settings. Clinical services can also violate rights, use coercion, dismiss culture, misread distress, create financial burden, or provide inaccessible and fragmented care.',
        'One rights standard must apply across the entire pathway.',
      ],
    },
    {
      sectionId: 'professional-care-not-culture-free',
      heading: '5. Professional care is not culture free',
      paragraphs: [
        'Professional knowledge is valuable, but professional institutions are shaped by language, training, law, history, resources, and power.',
        'Colonial systems often marginalized African knowledge while building unequal services. That history can affect current trust. Naming it does not make every traditional practice safe or every clinical practice harmful.',
        'Culturally humble care should:',
      ],
      numberedItems: [
        'Ask how the person names and understands the concern.',
        'Ask which supports the person values or fears.',
        'Explain professional reasoning and uncertainty plainly.',
        'Offer options and preserve decision making.',
        'Check language, access, cost, disability, gender, and safety.',
        'Review outcomes and harms with lived experience groups.',
      ],
    },
    {
      sectionId: 'rights-floor',
      heading: '6. A rights floor for every setting',
      paragraphs: [
        'Every partnership requires:',
      ],
      numberedItems: [
        'Dignity and non discrimination',
        'Voluntary participation and meaningful informed consent',
        'The ability to ask questions, refuse, stop, or choose another support',
        'Freedom from violence, humiliation, exploitation, forced confession, unsafe restraint, and abusive confinement',
        'Privacy with clearly explained legal and safety limits',
        'Safeguarding for children and adults at risk',
        'Timely access to appropriate health, social, protection, and urgent services',
        'Accessible complaints, independent review, and protection from retaliation',
        'Participation by people with lived experience in design, oversight, and evaluation',
      ],
      trailingParagraphs: [
        'A practice does not become acceptable because it is described as traditional, spiritual, clinical, familial, or communal.',
      ],
    },
    {
      sectionId: 'clear-roles',
      heading: '7. Clear roles make respect possible',
      paragraphs: [
        'Faith or spiritual leader: May offer voluntary spiritual care, belonging, practical support, education, recognition, and referral. Must not claim clinical diagnosis or treatment without the required qualification and scope.',
        'Traditional practitioner: May provide a defined cultural or traditional practice, cultural interpretation, ritual, community trust, and referral. Must not prescribe unsafe medicines, conceal harmful practices, enforce secret medicine combinations, or delay necessary care.',
        'Clinician: May assess, treat, review medicines, plan safety, and refer within professional scope. Must not ridicule beliefs, require cultural abandonment, or claim that professional care is culturally neutral.',
        'Youth or lived experience advisor: May guide governance, language, access, accountability, and evaluation. Must not become an unpaid substitute for clinical, safeguarding, or emergency staff.',
      ],
      trailingParagraphs: [
        'When one person holds several identities, the active role, duty, confidentiality rule, and scope must be stated.',
      ],
    },
    {
      sectionId: 'referral-is-relationship',
      heading: '8. Referral is a relationship',
      paragraphs: [
        'A warm referral should:',
      ],
      numberedItems: [
        'Recognize a need or request beyond the current role.',
        'Explain the concern and options in clear language.',
        'Ask what support the person prefers.',
        'Obtain consent for coordination.',
        'Identify an available and accessible destination.',
        'Make the connection through a named contact, appointment, transport, or accompanied handoff when wanted.',
        'Share only necessary information.',
        'Follow up on whether the connection worked.',
        'Use the urgent response pathway immediately when delay creates danger.',
      ],
    },
    {
      sectionId: 'medicine-herbal-safety',
      heading: '9. Medicine and herbal product safety',
      paragraphs: [
        'Herbal preparations may contain active ingredients. The identity, concentration, dose, contamination risk, and interaction evidence may be clear for some products and uncertain for others.',
        'Safe coordination should:',
      ],
      numberedItems: [
        'Ask about prescribed medicines, over the counter products, herbs, supplements, fasting, and other practices without ridicule.',
        'Record product name, ingredients, source, dose, schedule, and reason for use when known and consented.',
        'Use a qualified clinician or pharmacist to review possible interactions and health risks.',
        'Encourage both providers to explain limits and warning signs.',
        'Avoid sudden treatment changes without qualified guidance.',
        'Create a pathway for reporting possible adverse effects and unsafe products.',
      ],
    },
    {
      sectionId: 'ghana-system-case',
      heading: '10. Ghana system case',
      paragraphs: [
        'Ghana\u2019s WHO Assessment Instrument for Mental Health Systems report describes a plural system in which people often visit traditional or faith based facilities before or during professional treatment.',
        'The report:',
      ],
      numberedItems: [
        'Identified 1,705 traditional and faith based facilities.',
        'Described national guidelines intended to protect dignity and rights.',
        'Identified prohibitions on chaining, caging, forced confession, flogging, starvation, and forced marriage.',
        'Described collaboration, training, and interest among some practitioners in professional support.',
        'Also reported continued abuse, weak records, limited evidence for treatment claims, and insufficient regulatory resources.',
      ],
      trailingParagraphs: [
        'Ghana is useful as a governance case. It is not proof that collaboration is complete or uniformly safe.',
      ],
    },
    {
      sectionId: 'rural-uganda-case',
      heading: '11. Rural Uganda and unequal trust',
      paragraphs: [
        'A 2025 qualitative study in Buyende District interviewed traditional healers, faith healers, and primary health care providers and then held focus groups.',
        'The study:',
      ],
      numberedItems: [
        'Treated the three provider groups as distinct.',
        'Found willingness among traditional and faith healers to collaborate with professional providers.',
        'Found uneven trust and negative views among some groups.',
        'Discussed how colonial and postcolonial power can shape which knowledge systems are treated as legitimate.',
      ],
      trailingParagraphs: [
        'The study helps explain experience, meaning, trust, referral, and possible collaboration barriers in one district. It does not measure treatment effectiveness or represent all of Uganda.',
      ],
    },
    {
      sectionId: 'collaboration-practices',
      heading: '12. What collaboration can include',
      paragraphs: [
        'A 2024 scoping review found documented collaboration activities such as:',
      ],
      numberedItems: [
        'Relationship building',
        'Training across practitioner groups',
        'Coordinated meetings',
        'Cross referral',
        'Treatment plan discussion',
        'Joint health promotion',
      ],
      trailingParagraphs: [
        'The review also found that documented bidirectional service collaborations were limited and located within professional health facilities.',
        'Partnership should include:',
        'Time and mutual recognition',
        'Two way learning',
        'Defined referral criteria and real destinations',
        'Consent and minimum necessary information sharing',
        'Accurate public claims',
        'Community and lived experience authority',
      ],
    },
  ],
  interactiveScenario: {
    scenarioId: 'mwangaza-care-partnership',
    title: 'Mwangaza Care Partnership',
    prompt:
      'A fictional district plans a youth mental health partnership among a health center, churches, mosques, traditional practitioners, a disability organization, and a youth council. The first draft asks spiritual and traditional leaders to identify mental disorders, requires thirty days of prayer or ritual before clinical referral, places personal stories in a shared messaging group, and gives the youth council no decision authority. No one has agreed on urgent response, medicine safety, complaints, or follow up.',
    instruction: 'Make six decisions. Each decision will show educational feedback. No decision diagnoses a person or decides whether a spiritual belief is true. The goal is to protect choice, rights, safety, honest role boundaries, and continuity of support.',
    decisions: [
      {
        decisionId: 'entry-choice',
        heading: 'Decision 1: Entry and choice',
        prompt: 'How should a person enter the partnership?',
        options: [
          'Require every participant to begin with the provider selected by the partnership chair.',
          'Offer several entry points, ask what support the person wants, explain roles and limits, and permit voluntary combinations or changes.',
          'Require professional care first so cultural beliefs do not affect the pathway.',
          'Require spiritual or traditional care first to prove community respect.',
        ],
      },
      {
        decisionId: 'partner-roles',
        heading: 'Decision 2: Partner roles',
        prompt: 'Which role structure is most appropriate?',
        options: [
          'Every provider may diagnose and treat after one joint workshop.',
          'Only clinicians may speak about mental health, while community partners recruit participants.',
          'Each partner has a written scope, mutual training, supervision and referral duties, and no one claims competence they do not hold.',
          'Role boundaries are unnecessary when providers trust one another.',
        ],
      },
      {
        decisionId: 'referral',
        heading: 'Decision 3: Routine and urgent referral',
        prompt: 'When should referral occur?',
        options: [
          'Only after thirty days of prayer or ritual.',
          'Only when the current provider feels personally unable to help.',
          'According to written role based criteria, with immediate use of the established urgent pathway when delay creates danger.',
          'At the end of every encounter, regardless of need or preference.',
        ],
      },
      {
        decisionId: 'medicine-safety',
        heading: 'Decision 4: Medicine and herbal product safety',
        prompt: 'How should the partnership handle concurrent use?',
        options: [
          'Tell participants to hide traditional products from clinicians.',
          'Ban every herbal preparation without asking what it is.',
          'Encourage open disclosure without ridicule, identify ingredients and doses when possible, obtain qualified interaction review, and monitor possible harm.',
          'Assume trusted providers cannot prescribe products that interact.',
        ],
      },
      {
        decisionId: 'information-sharing',
        heading: 'Decision 5: Information sharing',
        prompt: 'What information rule should apply?',
        options: [
          'Share full stories in a partnership messaging group so everyone is informed.',
          'Share only the minimum necessary information through a secure process with clear consent and explained legal or safety limits.',
          'Never share information, even when the person asks for a coordinated handoff.',
          'Let each provider decide their own privacy rule.',
        ],
      },
      {
        decisionId: 'governance',
        heading: 'Decision 6: Governance and evaluation',
        prompt: 'How should the partnership be governed and assessed?',
        options: [
          'Let the largest institution make decisions and ask youth to share stories at public events.',
          'Count referrals and attendance only.',
          'Give youth, disability, and lived experience members real decision authority and compensation, protect stories, and measure access, respect, referral, safety, rights, equity, and provider support.',
          'Avoid complaints or adverse event measures because they may harm the partnership\u2019s reputation.',
        ],
      },
    ],
    summaryHeadings: [
      'Choice',
      'Role clarity',
      'Referral',
      'Medicine safety',
      'Privacy',
      'Governance and accountability',
    ],
    strongestDesignFeature:
      'The strongest design feature of this partnership is that it preserves meaningful choice at every entry point while maintaining clear role boundaries and a warm referral pathway that never delays urgent care.',
    mostImportantRevision:
      'The most important revision is to give youth, disability, and lived experience members real decision authority and compensation, and to protect stories from public exposure without consent.',
  },
  pathwaysLab: {
    eyebrow: 'MODULE 5 APPLIED ACTIVITY',
    title: 'PATHWAYS Partnership and Referral Lab',
    subtitle: 'Connect spiritual, traditional, community, and professional support safely',
    course: 'Mental Health, Community and Culture',
    module: 'Faith, Tradition, and Professional Care',
    estimatedTime: '50 to 65 minutes',
    completionMode: 'Individual or small group, using a fictional or composite setting',
    output: 'A partnership charter, referral map, and ninety day preparation plan',
    safetyScope:
      'Design a partnership concept, not a treatment service. Do not diagnose, prescribe, recommend herbs, test religious claims, conduct risk assessment, practice crisis response, or use real health information. Name where qualified clinical, legal, safeguarding, medicine safety, ethical, and community guidance would be required.',
    howToUse: [
      'Choose a fictional or composite community and a specific coordination problem.',
      'Map the existing support system before proposing a new one.',
      'Complete the eight PATHWAYS sections.',
      'Practice one warm referral conversation without role playing therapy or diagnosis.',
      'Stress test the partnership for delay, coercion, privacy, medicine safety, access, and unequal power.',
      'Finish with a ninety day preparation plan and one page partnership charter.',
    ],
    frameworkSummary: 'P: Person, preference, and purpose. A: Authority, access, and accountability. T: Tasks, training, and boundaries. H: Human rights and harm prevention. W: Warm referral and follow up. A: Awareness, exchange, and cultural humility. Y: Youth and lived experience voice. S: Safety, sustainability, and study.',
    step1Setting: {
      heading: 'Step 1. Select a Fictional Setting',
      examples: [
        { setting: 'Rural district', problem: 'People move between healers and a clinic without referral or medicine review' },
        { setting: 'University', problem: 'Students want faith support and counseling but fear stigma and information sharing' },
        { setting: 'Diaspora association', problem: 'Families seek culturally familiar support but do not trust local services' },
        { setting: 'Urban youth center', problem: 'Peers receive serious disclosures without a clear pathway' },
        { setting: 'Faith network', problem: 'Clergy want training, referral contacts, and boundaries for counseling' },
        { setting: 'Primary care area', problem: 'Clinicians dismiss spiritual beliefs and lose participant trust' },
      ],
      fields: [
        { id: 'setting', label: 'SETTING', prompt: 'Describe the fictional place, institutions, languages, and service context.' },
        { id: 'population', label: 'POPULATION', prompt: 'Who should benefit, and who might be excluded or placed at risk?' },
        { id: 'coordinationProblem', label: 'COORDINATION PROBLEM', prompt: 'What breaks down now, and how do you know?' },
      ],
    },
    step2Ecosystem: {
      heading: 'Step 2. Map the Existing Support Ecosystem',
      tableHeading: 'Existing Support Ecosystem',
      columns: ['Support source', 'What people seek there', 'Current connection or gap'],
      rows: [
        'Family, elders, or peers',
        'Faith leaders or congregations',
        'Traditional practitioners',
        'Primary care',
        'Mental health professionals',
        'Social, disability, or protection services',
        'Youth or lived experience groups',
      ],
      pathwayPatternLabel: 'PATHWAY PATTERN',
      pathwayPatternPrompt: 'Is care sequential, concurrent, parallel but disconnected, or coordinated? Give one fictional example.',
      trustPowerLabel: 'TRUST AND POWER',
      trustPowerPrompt: 'Who is trusted, who is feared, whose knowledge is dismissed, and who controls resources?',
      materialBarriersLabel: 'MATERIAL BARRIERS',
      materialBarriersPrompt: 'Identify costs, distance, wait times, language, disability, documentation, stigma, and digital barriers.',
    },
    sectionP: {
      heading: 'P. Person, Preference, and Purpose',
      startWithPerson: 'The partnership exists to expand meaningful choice and safe support. It does not exist to win an argument between belief systems.',
      fields: [
        { id: 'purpose', label: 'PURPOSE', prompt: 'What specific coordination problem will the partnership address?' },
        { id: 'preferenceQuestions', label: 'PREFERENCE QUESTIONS', prompt: 'What will providers ask about beliefs, desired support, past experiences, language, and concerns?' },
        { id: 'choice', label: 'CHOICE', prompt: 'What options may a person accept, combine, pause, refuse, or change?' },
        { id: 'sharedExplanation', label: 'SHARED EXPLANATION', prompt: 'How will providers explain that they may understand distress differently while still coordinating care?' },
      ],
    },
    sectionA: {
      heading: 'A. Authority, Access, and Accountability',
      tableHeading: 'Authority and Accountability',
      columns: ['Decision area', 'Who has authority', 'How accountability works'],
      rows: [
        'Partnership rules',
        'Training approval',
        'Referral agreements',
        'Data and privacy',
        'Complaints and harm review',
        'Budget and compensation',
        'Public claims and media',
      ],
      accessCommitmentsLabel: 'ACCESS COMMITMENTS',
      accessCommitmentsPrompt: 'How will cost, transport, wait time, disability, language, gender, age, privacy, and digital access be addressed?',
      independentReviewLabel: 'INDEPENDENT REVIEW',
      independentReviewPrompt: 'Who can receive complaints, investigate harm, require correction, and protect people from retaliation?',
    },
    sectionT: {
      heading: 'T. Tasks, Training, and Boundaries',
      tableHeading: 'Partner Roles and Boundaries',
      columns: ['Partner', 'May do in this design', 'Must not do or claim'],
      rows: [
        'Faith or spiritual leader',
        'Traditional practitioner',
        'Peer or community navigator',
        'Clinician or social care partner',
        'Youth or lived experience council',
      ],
      roleSwitchingLabel: 'ROLE SWITCHING',
      roleSwitchingPrompt: 'If one person holds several identities, how will they state which role, duty, and confidentiality rule applies?',
      trainingExchangeLabel: 'TRAINING EXCHANGE',
      trainingExchangePrompt: 'What will each group teach and learn? Include rights, culture, recognition, medicine safety, referral, and privacy.',
      competencySupportLabel: 'COMPETENCY AND SUPPORT',
      competencySupportPrompt: 'How will skills be checked, refreshed, supervised, compensated, and supported?',
    },
    sectionH: {
      heading: 'H. Human Rights and Harm Prevention',
      tableHeading: 'Rights and Safeguards',
      columns: ['Shared right or safeguard', 'Partnership rule'],
      rows: [
        'Voluntary participation and consent',
        'Freedom from coercion and abuse',
        'Privacy and minimum necessary sharing',
        'Safeguarding children and adults at risk',
        'Ability to refuse or change provider',
        'Accessible complaint and review',
        'Timely health, social, protection, and urgent care',
      ],
      prohibitedPracticesLabel: 'PROHIBITED PRACTICES',
      prohibitedPracticesPrompt: 'Name practices that the partnership will never excuse as spiritual, traditional, clinical, family, or community care.',
      stopRuleLabel: 'STOP RULE',
      stopRulePrompt: 'What event pauses referral, enrollment, or partnership activity until safety is restored?',
    },
    sectionW: {
      heading: 'W. Warm Referral and Follow Up',
      warmReferralNote: 'Explain the reason, offer options, obtain consent, connect to a real destination, address barriers, share only necessary information, and follow up.',
      tableHeading: 'Referral Map',
      columns: ['Referral level', 'Trigger within role', 'Actual response and destination'],
      rows: [
        'Routine professional support',
        'Social or practical support',
        'Protection or safeguarding',
        'Medicine and herbal interaction review',
        'Urgent or immediate danger',
        'Return referral to chosen community support',
      ],
      followUpLabel: 'FOLLOW UP',
      followUpPrompt: 'Who checks whether the connection worked, when, and without pressuring the person?',
      referralFailureLabel: 'REFERRAL FAILURE',
      referralFailurePrompt: 'What happens when cost, distance, discrimination, wait time, or service refusal blocks care?',
    },
    warmReferralPractice: {
      heading: 'Warm Referral Practice',
      instruction: 'Use the fictional situation below. Write a short referral conversation. Do not diagnose, promise confidentiality beyond policy, debate beliefs, or practice crisis counseling.',
      fictionalSituation: 'Imani tells a trusted community leader that sleep and concentration have worsened, they sometimes feel unsafe, and they want prayer while also considering professional care. Imani is using an herbal preparation and prescribed medicine but has not told either provider.',
      fields: [
        { id: 'listenAffirm', label: 'LISTEN AND AFFIRM', prompt: 'How will the leader respond without blame or certainty about cause?' },
        { id: 'explainRole', label: 'EXPLAIN ROLE', prompt: 'What can the leader offer, and what is outside the role?' },
        { id: 'actOnSafety', label: 'ACT ON SAFETY', prompt: 'How will the established urgent pathway be used without delay?' },
        { id: 'coordinateConsent', label: 'COORDINATE BY CONSENT', prompt: 'How will prayer, professional care, and medicine review be connected?' },
        { id: 'followUp', label: 'FOLLOW UP', prompt: 'What will happen after the connection is made?' },
      ],
    },
    sectionA2: {
      heading: 'A. Awareness, Exchange, and Cultural Humility',
      tableHeading: 'Two Way Learning',
      columns: ['Learning topic', 'Two way exchange question'],
      rows: [
        { topic: 'Local meanings of distress and healing', question: 'What should professionals understand, and what should community providers understand?' },
        { topic: 'Colonial and institutional history', question: 'How has power affected trust, law, and which knowledge is recognized?' },
        { topic: 'Evidence and uncertainty', question: 'How will every provider describe what is known, unknown, and outside scope?' },
        { topic: 'Spiritual and religious diversity', question: 'How will the partnership avoid assuming one faith or practice?' },
        { topic: 'Professional culture', question: 'How will clinical services examine bias, language, coercion, access, and power?' },
        { topic: 'Public communication', question: 'How will messages avoid stigma, false cures, fear, and professional superiority?' },
      ],
      mutualLearningPlanLabel: 'MUTUAL LEARNING PLAN',
      mutualLearningPlanPrompt: 'Who teaches, who participates, how knowledge is credited, and how learning changes practice?',
    },
    sectionY: {
      heading: 'Y. Youth and Lived Experience Voice',
      participationWithAuthority: 'People with lived experience should help set rules, select measures, review harm, and control how stories are used. Participation should be accessible, safe, voluntary, credited, and compensated.',
      fields: [
        { id: 'decisionRights', label: 'DECISION RIGHTS', prompt: 'Which decisions can youth and lived experience members make, approve, pause, or veto?' },
        { id: 'participationSupport', label: 'PARTICIPATION SUPPORT', prompt: 'How will compensation, accessibility, privacy, preparation, and protection from tokenism be funded?' },
        { id: 'storyProtection', label: 'STORY PROTECTION', prompt: 'What prevents pressure to disclose, publicize, or repeatedly retell personal experiences?' },
      ],
    },
    sectionS: {
      heading: 'S. Safety, Sustainability, and Study',
      tableHeading: 'Evaluation Measures',
      columns: ['Measure', 'Safe collection method', 'Decision informed'],
      rows: [
        'Access and referral completion',
        'Participant choice and respect',
        'Trust across provider groups',
        'Delays and missed urgent referrals',
        'Privacy or rights incidents',
        'Medicine interaction reviews',
        'Equity across groups',
        'Provider workload and support',
      ],
      financingLabel: 'FINANCING',
      financingPrompt: 'What funds coordination, training, transport, access, compensation, supervision, complaints, and evaluation?',
      evidenceStatementLabel: 'EVIDENCE STATEMENT',
      evidenceStatementPrompt: 'What can the pilot responsibly claim, and what would require stronger research?',
    },
    redTeamTests: {
      heading: 'Red Team Tests',
      instruction: 'Assume the partnership has launched. Write one response for each test. Do not defend the original plan. Use the test to improve it.',
      tests: [
        'A provider delays urgent referral.',
        'A participant is pressured into prayer or ritual.',
        'A clinician mocks a spiritual belief.',
        'An herbal product may interact with medicine.',
        'A private story appears in a messaging group.',
        'Youth members are invited but cannot vote.',
        'A referral service has a six month wait.',
      ],
    },
    ninetyDayPlan: {
      heading: 'Ninety Day Preparation Plan',
      prompt: 'What must be true before a small pilot may begin? List the key milestones, approvals, and safeguards needed in the first ninety days.',
    },
    partnershipCharter: {
      heading: 'One Page Partnership Charter',
      prompt: 'Summarize the partnership in one page: purpose, partners, roles, rights, referral, medicine safety, governance, and measures.',
    },
    completionChecklist: {
      heading: 'Completion Checklist',
      items: [
        'Used a fictional or composite community',
        'Mapped the existing support ecosystem before proposing a new one',
        'Completed all eight PATHWAYS sections',
        'Practiced one warm referral conversation without role playing therapy or diagnosis',
        'Completed the red team tests and revised the design',
        'Finished the ninety day preparation plan and one page partnership charter',
        'Used no real health information or personal disclosures',
      ],
    },
    finalReminder:
      'This lab is an educational design exercise. It does not certify, authorize, or clinically validate any partnership. Do not implement a real partnership without qualified supervision, legal review, community governance, and appropriate permissions.',
  },
  privateReflection: {
    heading: 'Private Reflection',
    prompt: 'If you wanted both cultural or spiritual support and professional care, what would help you feel that neither provider was trying to control, shame, or erase the other? You may answer through a fictional person or setting.',
    privacyNotice: 'Keep this reflection private unless you freely choose to share it. Do not enter names, diagnoses, trauma details, treatment history, health information, or other sensitive information in a public form. You may write about a fictional setting.',
  },
  knowledgeCheck: {
    heading: 'MODULE 5 KNOWLEDGE CHECK',
    subtitle: 'Faith, Tradition, and Professional Care',
    learnerInstruction: 'Answer every question. Select one answer per question. Answer at least four of the five questions correctly to pass. This learner copy does not include answers.',
    privacyNotice: 'This assessment checks understanding of plural care, role boundaries, rights, referral, and medicine safety. It does not certify a learner to provide any form of care.',
    educationalNote: 'This assessment checks understanding of plural care, role boundaries, rights, referral, and medicine safety. It does not certify a learner to provide any form of care.',
    passingScore: 4,
    questions: [
      {
        id: 'm5-q1',
        prompt: 'What does plural care mean in this module?',
        options: [
          'Every community uses the same spiritual explanation for distress.',
          'A person may use more than one source of support, whether those sources are coordinated or not.',
          'Traditional healing and faith healing are interchangeable.',
          'Professional care should replace every cultural or spiritual practice.',
        ],
        correctAnswerIndex: 1,
        feedback: 'Plural care describes the reality that people may seek support from family, faith communities, traditional practitioners, peers, primary care, and mental health professionals in sequence or at the same time. These supports should not be treated as identical.',
      },
      {
        id: 'm5-q2',
        prompt: 'A learner says that a relative understands distress through a spiritual explanation. What is the most culturally humble response from a care professional?',
        options: [
          'Ridicule the explanation so the person accepts clinical language.',
          'Agree that the spiritual explanation is medically proven.',
          'Ask what the explanation means to the person, assess needs and safety, discuss options, and respect chosen spiritual support when it is voluntary and does not delay necessary care.',
          'Avoid discussing the belief because culture is outside professional care.',
        ],
        correctAnswerIndex: 2,
        feedback: 'Cultural humility requires curiosity, respect, and honest limits. A professional need not dismiss a belief or present it as clinical fact. The person\u2019s goals, consent, safety, and access to appropriate care remain central.',
      },
      {
        id: 'm5-q3',
        prompt: 'Which partnership design best protects both cultural meaning and safe care?',
        options: [
          'A faith leader diagnoses conditions while the clinician approves every spiritual practice.',
          'Distinct roles, mutual learning, consent based information sharing, warm referral, rights safeguards, qualified supervision, and community and lived experience accountability.',
          'All providers use one explanation of distress and one treatment plan.',
          'Referral occurs only after spiritual or traditional methods have failed for a fixed period.',
        ],
        correctAnswerIndex: 1,
        feedback: 'Coordination does not require every provider to perform the same task or share the same explanation. It requires clear boundaries, respect, consent, referral, follow up, rights protection, and accountability.',
      },
      {
        id: 'm5-q4',
        prompt: 'During a support meeting, a person says they may be in immediate danger. What should happen first?',
        options: [
          'Keep the statement secret because spiritual conversations are always confidential.',
          'Complete a ritual before deciding whether other help is needed.',
          'Ask an untrained volunteer to determine a diagnosis.',
          'Follow the established local urgent response and safeguarding pathway without delay, while allowing chosen spiritual support to continue when it is safe and does not interfere with urgent care.',
        ],
        correctAnswerIndex: 3,
        feedback: 'Immediate danger requires the established urgent response. No spiritual, traditional, peer, or educational support should delay qualified assessment or emergency action. Voluntary support may accompany care when safe.',
      },
      {
        id: 'm5-q5',
        prompt: 'A participant uses an herbal preparation and also takes prescribed medicine. What is the safest guidance?',
        options: [
          'Stop the prescribed medicine immediately because natural products cannot interact with it.',
          'Keep the herbal preparation secret to avoid disrespecting the practitioner.',
          'Encourage transparent discussion with a qualified clinician or pharmacist and the traditional practitioner, identify ingredients and doses when possible, review interaction risks, and avoid sudden treatment changes without qualified advice.',
          'Assume the combination is safe if both providers are trusted.',
        ],
        correctAnswerIndex: 2,
        feedback: 'Herbal products can have active effects, uncertain ingredients, side effects, or interactions with other medicines. Respectful coordination includes accurate disclosure and qualified safety review.',
      },
    ],
    passedMessage: 'You answered {score} of 5 questions correctly. You passed by answering at least four of the five questions correctly. Review the feedback or continue.',
    notPassedMessage: 'You answered {score} of 5 questions correctly. Answer at least four of the five questions correctly to pass. Review the feedback and try again.',
  },
  closing: {
    heading: 'MODULE 5 CLOSING',
    paragraphs: [
      'A bridge is useful only when people can cross it safely in both directions. A partnership that asks traditional or faith leaders only to send people toward professional care is not fully mutual. A partnership that blocks professional care in the name of culture is not safe.',
      'The strongest pathway makes room for meaning, belonging, evidence, choice, treatment, practical support, and community accountability. It respects difference without surrendering rights.',
    ],
    transition: 'Module 6 will examine how policy, media, and youth advocacy can build culturally affirming systems for global mental health.',
    finalDisclaimer: 'This course provides general educational information. It does not provide diagnosis, therapy, spiritual direction, traditional medicine advice, medical treatment, or emergency support. It does not decide whether any spiritual belief is true or false. If someone is in immediate danger, use the established local emergency and safeguarding pathway.',
  },
  completionRequirements: {
    heading: 'MODULE 5 COMPLETION REQUIREMENTS',
    items: [
      'Review both core videos or written alternatives.',
      'Complete all six Mwangaza Care Partnership decisions.',
      'Complete the PATHWAYS Partnership and Referral Lab.',
      'Privately consider or complete the ungraded reflection.',
      'Complete all five knowledge check questions.',
      'Answer at least four of the five multiple choice questions correctly.',
    ],
  },
  optionalExtendedAssignment: {
    label: 'Optional extended academic track',
    heading: 'Partnership Protocol for a Fictional District or Diaspora Institution',
    instruction: 'Prepare a 1,000 to 1,400 word partnership protocol for a fictional district or diaspora institution.',
    requirements: [
      'Include a plural care map.',
      'Define role boundaries.',
      'Include a rights charter.',
      'Describe a medicine safety process.',
      'Map routine and urgent referral.',
      'State consent and privacy rules.',
      'Describe training exchange.',
      'Include lived experience governance.',
      'Address financing.',
      'List five measures.',
      'Identify three possible harms.',
      'Use at least four credible sources and state what remains unknown.',
    ],
    personalDisclosure: 'Do not ask learners to diagnose participants, prescribe treatment, or disclose personal mental health information. Personal disclosure is not required.',
  },
  sourcesFurtherLearning: {
    heading: 'Sources and further learning',
    items: [
      { citation: 'World Health Organization. Global Traditional Medicine Strategy 2025 to 2034.', url: 'https://www.who.int/teams/who-global-traditional-medicine-centre/traditional-medicine-strategy-2025-2034' },
      { citation: 'World Health Organization. Guidance on Community Mental Health Services: Promoting Person-Centred and Rights-Based Approaches. 2021.', url: 'https://www.who.int/publications/i/item/9789240025707' },
      { citation: 'World Health Organization. Key Technical Issues of Herbal Medicines with Reference to Interaction with Other Medicines. 2021.', url: 'https://www.who.int/publications/i/item/9789240019140' },
      { citation: 'Ministry of Health Ghana and World Health Organization. WHO-AIMS Report on Ghana\u2019s Mental Health System. 2022.', url: 'https://www.afro.who.int/sites/default/files/2022-11/WHO%20AIMS%202020%20Report%20on%20Ghana%27s%20mental%20health%20system.pdf' },
      { citation: 'Lee, Y. J., Coleman, M., Nakaziba, K. S., et al. Perspectives of Traditional Healers, Faith Healers, and Biomedical Providers About Mental Illness Treatment: Qualitative Study from Rural Uganda. Cambridge Prisms: Global Mental Health, 2025.', url: 'https://doi.org/10.1017/gmh.2025.18' },
      { citation: 'Jama, N. A., Nyembezi, A., Ngcobo, S., and Lehmann, U. Collaboration Between Traditional Health Practitioners and Biomedical Health Practitioners: Scoping Review. African Journal of Primary Health Care and Family Medicine, 2024.', url: 'https://doi.org/10.4102/phcfm.v16i1.4430' },
      { citation: 'Al Jazeera English. Traditional Healers as Therapists? Inside South Africa\u2019s Mental Health Crisis. 2024.', url: 'https://www.youtube.com/watch?v=OwHQ6w_a2zg' },
      { citation: 'Brother Be Well. Faith and Mental Health, Part 5. 2024.', url: 'https://www.youtube.com/watch?v=rgCNoSkYRy8' },
    ],
    reviewNote: 'Sources reviewed July 2026. Media availability, regulations, program details, and clinical guidance may change. Recheck official sources before public release.',
  },
  progressTracking: {
    label: 'Module 5 progress',
    heading: 'Complete Module 5',
    privacyNote: 'Only completion status is saved. Your PATHWAYS lab, reflection, scenario, and knowledge check responses are not stored.',
    markCompleteLabel: 'Mark complete',
    completedLabel: 'Completed',
    savingLabel: 'Saving...',
    completeModuleLabel: 'Complete Module 5',
    incompleteMessage: 'Complete all six requirements before completing Module 5.',
    completedMessage: 'Module 5 is complete.',
    unavailableMessage: 'Progress saving is unavailable while this module is in administrator preview.',
    errorMessage: 'We could not save your progress. Please try again.',
  },
};

/**
 * PROTECTED SCENARIO ANSWER KEY (Module 5) — server-side-only.
 *
 * The Mwangaza Care Partnership scenario has six sequential decisions,
 * each with four options. The feedbackByOption array for each decision
 * is indexed by the submitted option's zero-based index. Only the
 * feedback for the submitted option is returned by checkMentalHealthScenario.
 *
 * This constant is NEVER imported by any src/ file, NEVER returned by
 * getMentalHealthModule, and NEVER embedded in any browser bundle.
 */
export const MENTAL_HEALTH_MODULE_5_SCENARIO_ANSWERS = {
  'mwangaza-care-partnership': {
    decisionsCount: 6,
    decisions: [
      {
        decisionId: 'entry-choice',
        optionsCount: 4,
        feedbackByOption: [
          'This removes meaningful choice and may concentrate power in one role.',
          'This centers the person, preserves several safe entry points, and makes roles visible.',
          'Professional care may be valuable, but mandatory sequencing can erase preference and access realities.',
          'Cultural respect does not justify a fixed waiting period or required practice.',
        ],
      },
      {
        decisionId: 'partner-roles',
        optionsCount: 4,
        feedbackByOption: [
          'A workshop does not create every required qualification or legal scope.',
          'This uses community partners instrumentally and ignores the support they may legitimately provide.',
          'This preserves distinct contributions while protecting role clarity and safe escalation.',
          'Trust is valuable, but it does not replace competence, accountability, or scope.',
        ],
      },
      {
        decisionId: 'referral',
        optionsCount: 4,
        feedbackByOption: [
          'A fixed waiting period can delay necessary or urgent care.',
          'Referral should not depend only on confidence or personal judgment without agreed criteria.',
          'This connects ordinary role limits with a pathway that does not delay urgent action.',
          'Automatic referral may ignore preference, overload services, and weaken meaningful coordination.',
        ],
      },
      {
        decisionId: 'medicine-safety',
        optionsCount: 4,
        feedbackByOption: [
          'Secrecy can prevent identification of interactions or adverse effects.',
          'Blanket dismissal can damage trust and does not produce a specific safety assessment.',
          'This combines respect with transparent and qualified safety review.',
          'Trust does not determine chemistry, contamination, dose, or interaction risk.',
        ],
      },
      {
        decisionId: 'information-sharing',
        optionsCount: 4,
        feedbackByOption: [
          'A shared messaging group can expose highly sensitive information and exceeds what most partners need.',
          'This supports coordination while protecting choice, privacy, and role based access.',
          'Absolute non sharing can block a person requested referral and continuity.',
          'A partnership needs a shared, lawful, and understandable privacy standard.',
        ],
      },
      {
        decisionId: 'governance',
        optionsCount: 4,
        feedbackByOption: [
          'Visibility without authority or story protection is token participation.',
          'Activity counts do not show whether people had choice, reached care, or experienced harm.',
          'This connects participation with authority and uses measures that match the partnership\u2019s responsibilities.',
          'Hiding problems prevents correction and increases risk.',
        ],
      },
    ],
  },
};

/**
 * MODULE 5 COMPLETION KEYS — server-side-only.
 *
 * The six approved Module 5 completion requirement identifiers, in the
 * approved order. They correspond one-to-one to the six existing
 * completion requirement strings in lesson.completionRequirements.items.
 *
 *   core-media-reviewed         -> core_media_acknowledged_at
 *   mwangaza-scenario           -> interactive_scenario_completed_at
 *   pathways-lab                -> activity_acknowledged_at
 *   private-reflection          -> reflection_acknowledged_at
 *   knowledge-check-completed   -> knowledge_check_completed_at
 *   knowledge-check-passed      -> quiz_passed
 *
 * The three self-attestable keys (core-media-reviewed, pathways-lab,
 * private-reflection) may be marked through the general
 * updateMentalHealthProgress function. The three server-verified keys
 * (mwangaza-scenario, knowledge-check-completed, knowledge-check-passed)
 * are recorded only by checkMentalHealthScenario and
 * checkMentalHealthKnowledgeCheck after valid submissions.
 *
 * Module 5 does NOT use lesson_and_case_reviewed_at. There is no
 * separate lesson and cases completion requirement.
 */
export const MENTAL_HEALTH_MODULE_5_COMPLETION_KEYS = [
  'core-media-reviewed',
  'mwangaza-scenario',
  'pathways-lab',
  'private-reflection',
  'knowledge-check-completed',
  'knowledge-check-passed',
];

export const MENTAL_HEALTH_MODULE_5_SELF_ATTESTED_KEYS = new Set([
  'core-media-reviewed',
  'pathways-lab',
  'private-reflection',
]);

const MODULE_5_KEY_TO_FIELD = {
  'core-media-reviewed': 'core_media_acknowledged_at',
  'mwangaza-scenario': 'interactive_scenario_completed_at',
  'pathways-lab': 'activity_acknowledged_at',
  'private-reflection': 'reflection_acknowledged_at',
  'knowledge-check-completed': 'knowledge_check_completed_at',
  'knowledge-check-passed': 'quiz_passed',
};

export function isModule5CompletionKey(key) {
  return MENTAL_HEALTH_MODULE_5_COMPLETION_KEYS.includes(key);
}

export function isModule5SelfAttestedKey(key) {
  return MENTAL_HEALTH_MODULE_5_SELF_ATTESTED_KEYS.has(key);
}

export function getModule5CompletionField(key) {
  return MODULE_5_KEY_TO_FIELD[key] || null;
}

export function deriveModule5CompletedKeys(row) {
  if (!row) return [];
  const keys = [];
  if (row.core_media_acknowledged_at) keys.push('core-media-reviewed');
  if (row.interactive_scenario_completed_at) keys.push('mwangaza-scenario');
  if (row.activity_acknowledged_at) keys.push('pathways-lab');
  if (row.reflection_acknowledged_at) keys.push('private-reflection');
  if (row.knowledge_check_completed_at) keys.push('knowledge-check-completed');
  if (row.quiz_passed) keys.push('knowledge-check-passed');
  return keys;
}