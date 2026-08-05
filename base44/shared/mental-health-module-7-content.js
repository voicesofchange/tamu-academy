/**
 * MODULE 7 LESSON CONTENT — server-side-only.
 *
 * Authoritative sources:
 *   - Tamu-Academy-MH-Module-7-Base44-Content-Pack.md
 *   - Tamu-Academy-MH-Module-7-Learner-Guide.docx
 *   - Tamu-Academy-MH-Module-7-STORY-Storytelling-and-Collective-Healing-Design-Lab.docx
 *   - Tamu-Academy-MH-Module-7-Knowledge-Check.docx
 *   - Tamu-Academy-MH-Module-7-Instructor-Key.docx (private — answer keys
 *     and guidance kept here, never exposed to learners)
 *
 * This file is imported ONLY by base44/shared/mental-health-curriculum.js.
 * It MUST NEVER be imported by any file in src/.
 *
 * SAFETY STANDARD: Never store a learner's diagnosis, symptoms, treatment
 * history, trauma, crisis information, discrimination experiences,
 * personal story, recording, private reflection, STORY Lab writing, or
 * identifying lived experience information.
 *
 * The knowledge check answer key (correctAnswerIndex + feedback) is stripped
 * from each question before the lesson is returned to the browser by
 * getMentalHealthModuleContent. Grading and feedback release happen only in
 * the checkMentalHealthKnowledgeCheck backend function.
 *
 * The Mwangaza scenario feedback (feedbackByOption per decision) is kept in
 * MENTAL_HEALTH_MODULE_7_SCENARIO_ANSWERS (declared below) and released
 * only by checkMentalHealthScenario after the learner submits a valid
 * selection for each decision.
 *
 * COMPLETION: Module 7 has exactly SEVEN technical completion conditions.
 * The private reflection is NOT a completion condition — it is display
 * only, with no progress field, no acknowledgment, and no backend call.
 */

export const MENTAL_HEALTH_MODULE_7_LESSON = {
  moduleOverview: {
    paragraphs: [
      'Stories can help people name what was hidden, make meaning, preserve cultural memory, challenge imposed labels, build connection, and imagine a different future. Stories can also be demanded, misread, diagnosed, edited for impact, or published without adequate consent.',
      'This final module uses the three part Roots of Resilience series to examine survival mode, identity, code switching, imagination, online personas, and collective care. Learners distinguish testimony from research, map individual narratives to structural conditions, and compare resilience as compulsory endurance with resilience supported by relationships, culture, resources, rights, and institutional change.',
      'The module ends with the STORY Storytelling and Collective Healing Design Lab. Learners design a fictional story circle, community podcast, digital storytelling workshop, or intergenerational dialogue with voluntary participation, story ownership, trained facilitation, professional care pathways, safeguarding, cultural grounding, and evaluation.',
    ],
    competency:
      'By the end of this module, learners should be able to analyze stories without diagnosing, generalizing, or extracting them, then design a culturally grounded storytelling activity with choice, structural analysis, support, story control, and accountability.',
  },
  learningObjectives: {
    objectives: [
      'Explain how storytelling may support survival, meaning making, identity, connection, memory, and public understanding without presenting it as an automatic cure.',
      'Distinguish resilience as pushing through from social ecological resilience and collective transformation.',
      'Analyze how an individual narrative connects to structural conditions, cultural scripts, community assets, and institutional responses.',
      'Evaluate the Roots of Resilience episodes as lived experience media while respecting their evidence limits.',
      'Design a culturally grounded storytelling activity with voluntary participation, story control, trained facilitation, accessibility, referral, safeguarding, and evaluation.',
    ],
    earlyDisclaimer:
      'This course provides general educational information. It does not provide diagnosis, therapy, trauma treatment, facilitation certification, or emergency support. If someone is in immediate danger, use the established local emergency and safeguarding pathway.',
  },
  contentSafetyNote:
    'The episodes discuss trauma, survival mode, identity, emotional suppression, code switching, social pressure, online personas, and healing. You may pause, use a written summary, or skip any reflection. No personal disclosure is required. Do not use a podcast to diagnose yourself or another person.',
  scenarioSafetyNote:
    'Use a fictional or already public setting. Design education or community practice, not therapy, clinical assessment, crisis counseling, research, or an unreviewed public media project. A real activity requires local youth and lived experience governance, qualified safeguarding and clinical consultation, verified referral routes, accessibility, informed consent, privacy review, facilitator training, and funding.',
  fictionalSituationReminder:
    'Use a fictional or already public issue. You do not need to disclose personal experiences, diagnoses, trauma, treatment history, health information, or locally identifiable case details.',
  organizationalAttribution:
    'Roots of Resilience is published by Voices of Change, an initiative of SITTY. SITTY is separate from Tamu Academy and Waiyaki House LLC. The episodes are included as independently published learning resources. They are not Tamu Academy clinical services, research studies, or proof that storytelling produces a health outcome.',
  coreMedia: {
    attributionStatement:
      'These independently produced episodes are included as learning resources. Their speakers, publisher, producers, sponsors, and guests are not Tamu Academy instructors, employees, or clinical partners. Inclusion does not imply endorsement, certification, proof of effectiveness, or clinical review by Tamu Academy.',
    sessions: [
      {
        key: 'session-1',
        title: "Roots of Resilience Episode 1: Surviving Isn't Thriving: Understanding Trauma",
        hosts: 'Tex Wambui and Gabriel Martinez',
        publisher: 'Voices of Change',
        watchUrl: 'https://www.youtube.com/watch?v=zWHuM3Huy7c',
        embedUrl: 'https://www.youtube.com/embed/zWHuM3Huy7c',
        officialPageUrl: 'https://sustainthevoices.org/podcasts/voices-of-change',
        officialPageLabel: 'Open the official Voices of Change podcast page',
        attributionLabel: 'Voices of Change · Tex Wambui and Gabriel Martinez',
        approximateLength: 'Approximately 34 minutes',
        roleInModule: 'Survival mode, hyper awareness, emotional suppression, rest, support, and the difference between enduring and living well.',
        contentNote: 'Listen for the protective purpose and cost of survival strategies. Do not treat the episode as a diagnostic tool or assume that disclosure is safer than privacy.',
        writtenAlternativeSectionId: 'session-1-surviving',
      },
      {
        key: 'session-2',
        title: 'Roots of Resilience Episode 2: Unmasking Identity: The Journey to Self Discovery',
        hosts: 'Tex Wambui and Gabriel Martinez',
        publisher: 'Voices of Change',
        watchUrl: 'https://www.youtube.com/watch?v=eoHoAytOjSo',
        embedUrl: 'https://www.youtube.com/embed/eoHoAytOjSo',
        officialPageUrl: 'https://podcasts.apple.com/us/podcast/voices-of-change/id1798254320',
        officialPageLabel: 'Open the series in Apple Podcasts',
        attributionLabel: 'Voices of Change · Tex Wambui and Gabriel Martinez',
        approximateLength: 'Approximately 34 minutes',
        roleInModule: 'Identity, code switching, acceptance, authenticity, cultural expectations, and communal support.',
        contentNote: 'Code switching, masking, selective disclosure, and layered identity may have different meanings in different settings. Authenticity does not require telling everyone everything.',
        writtenAlternativeSectionId: 'session-2-identity',
      },
      {
        key: 'session-3',
        title: 'Roots of Resilience Episode 3: Aliens, Avatars and Alter Egos: Escaping to Survive',
        hosts: 'Tex Wambui and Gabriel Martinez',
        publisher: 'Voices of Change',
        watchUrl: 'https://www.youtube.com/watch?v=y9tHX0pGnlg',
        embedUrl: 'https://www.youtube.com/embed/y9tHX0pGnlg',
        officialPageUrl: 'https://sustainthevoices.org/podcasts/voices-of-change',
        officialPageLabel: 'Open the official Voices of Change podcast page',
        attributionLabel: 'Voices of Change · Tex Wambui and Gabriel Martinez',
        approximateLength: 'Approximately 24 minutes',
        roleInModule: 'Imagination, online identity, masks, control, psychological safety, authenticity, and the limits of escape.',
        contentNote: 'Do not label ordinary imagination, role play, fandom, gaming, online identity, or creative experimentation as a disorder. A podcast cannot establish dissociation or another clinical condition.',
        writtenAlternativeSectionId: 'session-3-imagination',
      },
    ],
  },
  questionsToConsider: [
    'What does the speaker name directly, and what remains uncertain?',
    'Which survival strategy appears, and what conditions may have made it useful?',
    'Who or what helped create safety, choice, belonging, or a different possibility?',
    'Which family, cultural, institutional, economic, racial, gendered, migration, or digital conditions appear?',
    'Where does the episode preserve complexity, and where should a learner avoid generalizing?',
    'What changes would make resilience less dependent on endurance and more connected to flourishing?',
  ],
  tamuIntroduction: {
    paragraphs: [
      'Stories are not simply containers for information. They shape what a community remembers, whose pain is believed, which identities are recognized, and what futures feel possible.',
      'Storytelling can support witness, meaning, agency, connection, cultural memory, critical analysis, and imagination. It can also become extractive when an institution demands disclosure, takes control of a story, publishes without adequate consent, rewards the most painful account, or treats emotional reaction as proof of healing.',
      'The goal of this module is not to collect trauma. It is to practice listening, structural interpretation, story ownership, and collective responsibility.',
    ],
  },
  explanation: [
    {
      sectionId: 'what-storytelling-may-contribute',
      heading: '1. What storytelling may contribute',
      paragraphs: ['Storytelling may support:'],
      numberedItems: [
        '**Witness:** making an experience visible and heard.',
        '**Meaning:** connecting events, identity, values, and the future.',
        '**Agency:** choosing language, emphasis, timing, and audience.',
        '**Connection:** recognizing shared patterns without erasing difference.',
        '**Public analysis:** linking lived experience to institutions and structural conditions.',
        '**Imagination:** creating metaphors, alternatives, and possible futures.',
      ],
      trailingParagraphs: [
        'These are possibilities, not guaranteed outcomes. Effect depends on purpose, timing, choice, relationships, cultural meaning, audience, facilitation, privacy, material conditions, and what happens after the story is heard.',
      ],
    },
    {
      sectionId: 'what-a-story-cannot-prove',
      heading: '2. What a story cannot prove',
      paragraphs: ['A story does not prove:'],
      numberedItems: [
        'A diagnosis',
        'Prevalence across a community',
        'A universal cultural truth',
        'Causation',
        'Clinical effectiveness',
        'That consent remained free and safe',
        'That the speaker wants a public role',
        'That resilience excuses the condition that created harm',
      ],
      trailingParagraphs: ['A story does not require a hopeful or redemptive ending to have dignity.'],
    },
    {
      sectionId: 'survival-grit-resilience-transformation',
      heading: '3. Survival, grit, resilience, collective healing, and transformation',
      paragraphs: [
        '**Survival** asks what helped a person get through danger or instability.',
        '**Personal grit** focuses on how the person kept going. It can recognize effort, but it becomes harmful when endurance is treated as a moral duty and unequal conditions disappear.',
        '**Social ecological resilience** asks which personal, relational, cultural, community, institutional, material, and environmental resources made wellbeing possible.',
        '**Collective healing** asks how relationships, culture, memory, care, and justice are restored together.',
        '**Transformation** asks what conditions, institutions, resources, and public stories must change.',
      ],
      trailingParagraphs: [
        'Resilience is not proof that harm was acceptable. People and communities may adapt creatively and still deserve safety, rest, repair, rights, resources, and institutional change.',
      ],
    },
    {
      sectionId: 'social-ecological-resilience',
      heading: '4. Social ecological resilience',
      paragraphs: [
        'A social ecological view moves beyond the idea of resilience as an individual trait.',
        'Relevant layers include:',
      ],
      numberedItems: [
        'Personal skills, identity, rest, hope, creativity, and health',
        'Caregivers, friends, elders, mentors, peers, and trusted professionals',
        'Language, faith, ritual, art, mutual aid, belonging, and collective memory',
        'Safe schools, accessible services, fair workplaces, housing, transport, and complaint routes',
        'Rights, income, antidiscrimination, peace, migration policy, public investment, and political voice',
        'Safe public space, land, water, green space, connectivity, and freedom from environmental harm',
      ],
      trailingParagraphs: [
        'The central questions are:',
        '1. Which resources exist?',
        '2. Who controls them?',
        '3. Who can reach them?',
        '4. Do they fit the culture and setting?',
        '5. Who remains excluded?',
        '6. What must change?',
      ],
    },
    {
      sectionId: 'session-1-surviving',
      heading: '5. Session 1: surviving is not thriving',
      paragraphs: [
        "Episode 1 describes the emotional weight of survival mode and the pressure to normalize hyper awareness, emotional suppression, and constant performance.",
        'A careful response:',
      ],
      numberedItems: [
        'Names the strategy without judgment.',
        'Asks what danger, instability, or expectation made it understandable.',
        'Identifies what the strategy protected.',
        'Identifies what it may cost when danger changes or continues.',
        'Names relationships, resources, rights, or institutional changes that could make thriving more possible.',
        'Avoids self diagnosis and forced disclosure.',
      ],
      trailingParagraphs: [
        '**Session 1 micro activity:** Use a fictional or already public example. Write two sentences, one naming a survival strategy without judgment and one naming a resource or condition that could make thriving more possible.',
      ],
    },
    {
      sectionId: 'session-2-identity',
      heading: '6. Session 2: identity and structural analysis',
      paragraphs: [
        'Code switching, masking, selective disclosure, and performance can protect safety, employment, belonging, or family connection. They can also create fatigue or the feeling that acceptance depends on hiding.',
        'Use these distinctions:',
      ],
      numberedItems: [
        'Changing presentation for a setting is not automatically harmful. Ask whether choice, safety, and dignity remain.',
        'Being authentic does not require total disclosure.',
        'A changing or layered identity is not evidence of illness.',
        'Belonging becomes conditional when institutions punish language, culture, gender expression, disability, migration history, or racial identity.',
        'Individual self acceptance matters, and institutions must also change exclusionary rules and practices.',
      ],
      subBlocks: [
        {
          label: 'Story to structure map',
          numberedItems: [
            'Identify what the speaker actually says.',
            'Name the meaning the speaker gives the experience.',
            'Map relevant family, cultural, economic, racial, gendered, migration, school, workplace, or digital conditions.',
            'Identify community assets, relationships, and resistance.',
            'Ask which institutional response, resource, or rule would reduce the burden.',
            'State what remains unknown and what additional evidence would be needed.',
          ],
        },
      ],
      trailingParagraphs: [
        '**Session 2 micro activity:** Complete the map for one public episode theme. Do not diagnose the speaker or treat the theme as universal. End with one structural shift that could make resilience less dependent on concealment.',
      ],
    },
    {
      sectionId: 'session-3-imagination',
      heading: '7. Session 3: imagination, identity, and collective practice',
      paragraphs: [
        'Imagination and online personas may offer experimentation, creativity, community, control, distance, or temporary safety. They may also become exhausting, isolating, or difficult to leave.',
        'Ask:',
      ],
      numberedItems: [
        'What does the persona make possible?',
        'Does the person control when and where it appears?',
        'Does the space increase connection, harassment, surveillance, or pressure?',
        'What relationships or settings allow complexity without performance?',
        'What remains unknown?',
      ],
      trailingParagraphs: ['Do not pathologize imagination, role play, fandom, gaming, creative work, or identity exploration.'],
    },
    {
      sectionId: 'trauma-informed-healing-centered',
      heading: '8. Trauma informed and healing centered design',
      paragraphs: ['A trauma informed approach emphasizes:'],
      numberedItems: [
        'Safety',
        'Trust and transparency',
        'Peer support',
        'Collaboration and mutuality',
        'Empowerment, voice, and choice',
        'Cultural, historical, and gender issues',
      ],
      trailingParagraphs: [
        'Healing centered engagement adds an asset focused concern with identity, culture, possibility, collective wellbeing, adult provider wellbeing, and action on the conditions that caused harm.',
        'Healing centered engagement is a practice framework. It does not prove that a specific activity produces a clinical outcome.',
      ],
    },
    {
      sectionId: 'c-hearts',
      heading: '9. C-HeARTS',
      paragraphs: [
        'The Community Healing and Resistance Through Storytelling framework was developed to address racial trauma in Africana communities.',
        'It connects:',
      ],
      numberedItems: [
        'Justice as a condition and outcome',
        'Culturally meaningful storytelling and resistance',
        'Connectedness',
        'Collective memory',
        'Critical consciousness',
        'Justice informed outcomes',
      ],
      trailingParagraphs: [
        'Use C-HeARTS as a conceptual framework. Do not present it as a tested therapy, a universal African model, or proof that every storytelling activity improves mental health.',
      ],
    },
    {
      sectionId: 'consent-is-continuing',
      heading: '10. Consent is continuing',
      paragraphs: ['Responsible consent should:'],
      numberedItems: [
        'Explain purpose, audience, format, facilitator role, confidentiality limits, data use, and possible consequences.',
        'Offer listening, passing, fiction, metaphor, art, or private completion.',
        'Ask only for information needed for the activity.',
        'Let the storyteller choose names, details, language, timing, and what remains private.',
        'Treat recording, quotation, editing, translation, publication, promotion, and future reuse as separate decisions.',
        'Recheck consent before release.',
        'Provide a realistic withdrawal or correction process.',
        'Explain safeguarding and urgent response duties before participation.',
      ],
      trailingParagraphs: ['Participation in a workshop does not grant permission to publish a story.'],
    },
    {
      sectionId: 'minimum-design-trauma-aware',
      heading: '11. Minimum design for a trauma aware story space',
      paragraphs: ['A responsible space includes:'],
      numberedItems: [
        'A bounded educational, artistic, community, or advocacy purpose',
        'Predictable content notes and pause or exit options',
        'Voluntary participation and several non disclosure choices',
        'Clear confidentiality limits',
        'Trained facilitation with no probing, diagnosis, or therapy outside role',
        'Local language, cultural, historical, family, faith, gender, disability, and migration review',
        'Verified professional, social, safeguarding, and urgent pathways',
        'Separate publication consent',
        'Participant control over edit, translation, audience, reuse, correction, and withdrawal where feasible',
        'Facilitator supervision and wellbeing support',
        'Evaluation of value and harm',
      ],
    },
    {
      sectionId: 'when-not-to-use-storytelling',
      heading: '12. When not to use storytelling',
      paragraphs: ['Do not proceed when:'],
      numberedItems: [
        'Disclosure is required for a service, grade, job, payment, or belonging.',
        'Confidentiality limits or data use cannot be explained.',
        'Safeguarding and referral pathways are unavailable.',
        'Facilitators are expected to provide therapy or crisis care outside role.',
        'Publication could create retaliation, stigma, legal harm, family conflict, or unsafe digital permanence.',
        'Graphic detail is unnecessary for the purpose.',
        'The organizer benefits while the storyteller lacks authority, support, compensation, or withdrawal.',
      ],
    },
  ],
  interactiveScenario: {
    scenarioId: 'mwangaza-youth-story-studio',
    title: 'Mwangaza Youth Story Studio',
    prompt:
      'Mwangaza is a fictional multilingual youth center serving local and diaspora communities. Staff propose a public podcast in which young people describe trauma, identity, migration, discrimination, and family pressure. The first draft funds social media content but no referral coordination, primary care training, disability access, youth decision rights, dedicated implementation budget, or outcome review.',
    instruction:
      'Make six decisions. Each decision will show educational feedback. The goal is to design a bounded, voluntary, culturally grounded activity with structural analysis, support, story control, and accountability. Use no personal information.',
    decisions: [
      {
        decisionId: 'purpose',
        heading: 'Decision 1: Purpose',
        prompt: 'What should the Story Studio promise?',
        options: [
          'A public podcast that will heal trauma in the community.',
          'A bounded storytelling and learning activity that may support reflection, connection, and structural understanding without promising therapy or healing.',
          'A contest for the most powerful trauma story.',
          'A screening program led by youth media volunteers.',
        ],
      },
      {
        decisionId: 'participation',
        heading: 'Decision 2: Participation',
        prompt: 'How should young people participate?',
        options: [
          'Everyone must tell a personal story to remain in the program.',
          'Participants may listen, pass, use fiction, metaphor, art, public material, private writing, or a voluntary personal story, with no penalty for declining.',
          'Only people with a diagnosis may participate.',
          'Ask parents or staff to choose which story each person should tell.',
        ],
      },
      {
        decisionId: 'facilitation-safety',
        heading: 'Decision 3: Facilitation and safety',
        prompt: 'Which facilitation plan is strongest?',
        options: [
          'Use trained facilitators with role limits, group agreements, content notes, pause and exit options, support, safeguarding, urgent response, supervision, and stop rules.',
          'Ask peers to manage any crisis because they understand youth culture.',
          'Promise that nothing will ever be shared under any circumstance.',
          'Encourage follow up questions that seek the full traumatic story.',
        ],
      },
      {
        decisionId: 'structural-analysis',
        heading: 'Decision 4: Structural analysis',
        prompt: 'How should the group interpret a story?',
        options: [
          'Diagnose the speaker and identify the best treatment.',
          'Treat the story as representative of everyone with the same identity.',
          "Honor the speaker's meaning, separate testimony from general evidence, map relevant institutions and conditions, identify community assets, and ask what should change.",
          'Avoid structure because the story is only personal.',
        ],
      },
      {
        decisionId: 'care-pathway',
        heading: 'Decision 5: Care pathway',
        prompt: 'What should happen if the activity reveals a need for support?',
        options: [
          'Give participants a general internet search.',
          'Ask the podcast audience to offer advice.',
          'Tell participants that sharing is the treatment.',
          'Use verified professional, social, safeguarding, and urgent routes with clear scope, warm connection, access support, confidentiality explanation, and follow up.',
        ],
      },
      {
        decisionId: 'publication-evaluation',
        heading: 'Decision 6: Publication and evaluation',
        prompt: 'Which plan is most accountable?',
        options: [
          'Record by default and measure views.',
          'Use separate and continuing consent for recording, edit, translation, audience, promotion, and reuse; minimize data; preserve correction and withdrawal where feasible; and measure choice, story control, connection, structure, support, value, and harm.',
          'Let the organization own all stories forever.',
          'Publish only positive stories and exclude complaints.',
        ],
      },
    ],
    summaryHeadings: [
      'Purpose',
      'Participation',
      'Facilitation and safety',
      'Structural analysis',
      'Care pathway',
      'Publication and evaluation',
    ],
    strongestDesignFeature:
      'The strongest design feature of this Story Studio is that it connects a bounded educational purpose with voluntary participation, trained facilitation, structural analysis, verified care pathways, separate publication consent, and evaluation of both value and harm.',
    mostImportantRevision:
      'The most important revision is to ensure that young people hold defined decision rights, compensation, safeguarding, and story control throughout the Studio, not only at launch.',
  },
  storyLab: {
    eyebrow: 'MODULE 7 APPLIED ACTIVITY',
    title: 'STORY Storytelling and Collective Healing Design Lab',
    subtitle: 'Design a fictional storytelling activity with choice, structure, support, and accountability',
    course: 'Mental Health, Community and Culture',
    module: 'Roots of Resilience',
    estimatedTime: '75 to 100 minutes',
    completionMode: 'Individual or small group, using a fictional or public issue',
    output: 'One bounded activity plan with story control, structural analysis, facilitation, care pathways, and evaluation',
    safetyScope:
      'Do not use your own trauma, diagnosis, crisis, family conflict, or health information. Use a fictional or already public issue. This workbook designs education and community practice, not therapy, clinical assessment, crisis counseling, or research. A real activity requires local youth and lived experience governance, qualified safeguarding and clinical consultation, verified referral routes, accessibility, informed consent, privacy review, facilitator training, and funding.',
    howToUse: [
      'Choose one fictional setting and one activity route.',
      'Complete the STORY sections in order.',
      'Use the response spaces for a concise first draft.',
      'Revise any element that requires disclosure, hides publication, lacks a support pathway, or gives the organizer more control than the storyteller.',
      'Finish with the one page design card and completion checklist.',
    ],
    routeOptions: [
      { key: 'school-story-circle', label: 'School story circle', purpose: 'A facilitated, non recorded learning space using public, fictional, metaphorical, or voluntary stories' },
      { key: 'community-podcast', label: 'Community podcast', purpose: 'A limited series with separate participation and publication consent' },
      { key: 'digital-storytelling-workshop', label: 'Digital storytelling workshop', purpose: 'Youth controlled audio, image, animation, or text with private completion available' },
      { key: 'intergenerational-dialogue', label: 'Intergenerational dialogue', purpose: 'A structured exchange using optional prompts, local language, and clear power and safety rules' },
    ],
    frameworkLabel: 'STORY framework',
    frameworkSummary: 'S: Safety, scope, and stop rules. T: Truth, theme, and structural context. O: Ownership, options, and audience. R: Relationships, response, and referral. Y: Youth authority, local culture, and evaluation.',
    step1Route: {
      heading: 'Step 1. Choose a Route and Fictional Setting',
      fields: [
        { id: 'selectedRoute', label: 'SELECTED ROUTE', prompt: 'Name the route and explain why it fits the fictional setting.' },
        { id: 'fictionalSetting', label: 'FICTIONAL SETTING', prompt: 'Describe location, age group, languages, institutions, culture, and access conditions.' },
        { id: 'boundedPurpose', label: 'BOUNDED PURPOSE', prompt: 'What should participants learn, express, connect, or change? Do not promise healing.' },
      ],
    },
    sectionS: {
      heading: 'S. Safety, Scope, and Stop Rules',
      fields: [
        { id: 'educationalScope', label: 'EDUCATIONAL SCOPE', prompt: 'State what the activity is and is not.' },
        { id: 'participationChoices', label: 'PARTICIPATION CHOICES', prompt: 'List at least five ways to participate without personal disclosure.' },
        { id: 'confidentialityLimits', label: 'CONFIDENTIALITY LIMITS', prompt: 'Explain what may remain private and what cannot be promised.' },
        { id: 'pauseStopRules', label: 'PAUSE AND STOP RULES', prompt: 'Name the conditions for individual pause, group pause, and cancellation.' },
        { id: 'safetyOpeningScript', label: 'SAFETY OPENING SCRIPT', prompt: 'Write a short opening that covers purpose, choice, content note, confidentiality limits, support, passing, recording, and questions.' },
      ],
    },
    sectionT: {
      heading: 'T. Truth, Theme, and Structural Context',
      fields: [
        { id: 'theme', label: 'THEME', prompt: 'Name the theme and explain why it matters in the fictional setting.' },
        { id: 'invitationPrompt', label: 'INVITATION PROMPT', prompt: 'Write a prompt that can be answered through public story, fiction, memory, art, metaphor, or passing.' },
        { id: 'meaningQuestion', label: 'MEANING QUESTION', prompt: 'What meaning may participants examine without requiring a positive lesson?' },
        { id: 'storyObservation', label: 'STORY OBSERVATION', prompt: 'Name a story observation, a structural condition or institution, and a community asset or desired change.' },
        { id: 'evidenceBoundary', label: 'EVIDENCE BOUNDARY', prompt: 'What comes from testimony, what comes from research, and what remains unknown?' },
        { id: 'nonGeneralizationStatement', label: 'NON GENERALIZATION STATEMENT', prompt: 'Write one sentence that prevents one story from representing a whole community.' },
        { id: 'resilienceStatement', label: 'RESILIENCE STATEMENT', prompt: 'Describe resilience through resources and relationships, not personality alone.' },
        { id: 'transformationStatement', label: 'TRANSFORMATION STATEMENT', prompt: 'Name one institutional or material change the activity should illuminate.' },
      ],
    },
    sectionO: {
      heading: 'O. Ownership, Options, and Audience',
      fields: [
        { id: 'participationConsent', label: 'PARTICIPATION CONSENT', prompt: 'What information must be understood before joining?' },
        { id: 'publicationConsent', label: 'PUBLICATION CONSENT', prompt: 'What separate choices apply to recording, editing, translation, audience, promotion, and reuse?' },
        { id: 'withdrawalProcess', label: 'WITHDRAWAL PROCESS', prompt: 'How can a participant change a decision, and what limits must be stated honestly?' },
        { id: 'powerCompensation', label: 'POWER AND COMPENSATION', prompt: 'Who benefits, who is paid, and who holds final authority over the story?' },
        { id: 'chosenAudience', label: 'CHOSEN AUDIENCE', prompt: 'Name the smallest audience that can accomplish the purpose and justify the choice.' },
        { id: 'exposureControls', label: 'EXPOSURE CONTROLS', prompt: 'Name privacy, identity, moderation, access, removal, and response protections.' },
      ],
    },
    sectionR: {
      heading: 'R. Relationships, Response, and Referral',
      fields: [
        { id: 'groupAgreements', label: 'GROUP AGREEMENTS', prompt: 'Write six short agreements for listening, privacy, respect, choice, time, and response.' },
        { id: 'facilitatorRole', label: 'FACILITATOR ROLE', prompt: 'Define what the facilitator may do, must do, and must not do.' },
        { id: 'carePathway', label: 'CARE PATHWAY', prompt: 'Name verified routes for general information, qualified assessment, family or social support, safeguarding, and urgent response.' },
        { id: 'confidentialityExplanation', label: 'CONFIDENTIALITY EXPLANATION', prompt: 'Explain ordinary privacy and the limits created by safety, law, and institutional duty.' },
        { id: 'aftercare', label: 'AFTERCARE', prompt: 'What check in, referral follow up, transportation, language, cost, disability, and digital access support is available?' },
        { id: 'facilitatorSupport', label: 'FACILITATOR SUPPORT', prompt: 'What supervision, debrief, workload, and secondary stress support will facilitators receive?' },
      ],
    },
    sectionY: {
      heading: 'Y. Youth Authority, Local Culture, and Evaluation',
      fields: [
        { id: 'localCulturalGrounding', label: 'LOCAL CULTURAL GROUNDING', prompt: 'Name languages, values, art forms, elders, youth culture, faith, family, disability, gender, and migration factors that require local review.' },
        { id: 'whoseVoiceIsMissing', label: 'WHOSE VOICE IS MISSING', prompt: 'Identify groups at risk of exclusion and how they will hold authority rather than symbolic visibility.' },
        { id: 'culturalLimit', label: 'CULTURAL LIMIT', prompt: 'Name one practice or assumption that should not be treated as universal.' },
        { id: 'evaluationPlan', label: 'EVALUATION PLAN', prompt: 'Measure choice and safety, story control, belonging, structural understanding, cultural fit, access to support, participant defined value, complaints, and unintended harm.' },
        { id: 'claimBoundary', label: 'CLAIM BOUNDARY', prompt: 'What can the evaluation support, and what would require a clinical or research study?' },
        { id: 'stopOrReviseThreshold', label: 'STOP OR REVISE THRESHOLD', prompt: 'What finding requires correction, pause, or closure?' },
      ],
    },
    redTeamTests: {
      heading: 'Red Team the Design',
      instruction: 'Assume the design has launched. Write one response for each risk question. Do not defend the original plan. Use the test to improve it.',
      tests: [
        'Could someone feel required to disclose?',
        'Could identity be inferred even after names are removed?',
        'Could the story create family, school, work, legal, migration, or digital harm?',
        'Could a facilitator be placed outside role or competence?',
        'Could the organizer benefit more than participants?',
        'Could demand for care rise without service capacity?',
        'Could one story be treated as representative or diagnostic?',
        'Could a cultural practice be romanticized, copied, or treated as universal?',
      ],
      summaryHeading: 'Red Team Summary',
      summaryFields: [
        { id: 'rt-most-serious-harm', label: 'MOST SERIOUS FORESEEABLE HARM', prompt: 'Name the harm, who may be affected, and how it could remain hidden.' },
        { id: 'rt-required-correction', label: 'REQUIRED CORRECTION', prompt: 'What design, role, funding, support, or authority must change?' },
        { id: 'rt-stop-condition', label: 'STOP CONDITION', prompt: 'What prevents launch or requires immediate pause?' },
      ],
    },
    ninetyDayPlan: {
      heading: 'Ninety Day Preparation Plan',
      day90DecisionLabel: 'DAY 90 DECISION',
      prompt: 'What must be true before a limited pilot may begin?',
    },
    proposalCard: {
      heading: 'One Page STORY Design Card',
      fields: [
        { id: 'pc-title-route-purpose', label: 'TITLE, ROUTE, AND PURPOSE', prompt: 'Name the activity and its bounded educational or community purpose.' },
        { id: 'pc-safety-scope', label: 'S: SAFETY AND SCOPE', prompt: 'State choices, confidentiality limits, safeguards, support, and stop rules.' },
        { id: 'pc-truth-structure', label: 'T: TRUTH AND STRUCTURE', prompt: 'Name the theme, structural map, community assets, evidence limits, and desired change.' },
        { id: 'pc-ownership-audience', label: 'O: OWNERSHIP AND AUDIENCE', prompt: 'State consent, story control, compensation, audience, publication, withdrawal, and privacy.' },
        { id: 'pc-relationships-referral', label: 'R: RELATIONSHIPS AND REFERRAL', prompt: 'State listening agreements, facilitator role, care pathways, urgent response, and follow up.' },
        { id: 'pc-youth-evaluation', label: 'Y: YOUTH AUTHORITY AND EVALUATION', prompt: 'State cultural grounding, decision rights, access, measures, harm review, and stop threshold.' },
      ],
    },
    completionChecklist: {
      heading: 'Completion Checklist',
      items: [
        'Uses a fictional or already public setting and requires no personal disclosure',
        'States clearly that the activity is not therapy, diagnosis, research, or crisis care',
        'Provides at least five non disclosure participation options',
        'Separates participation, recording, editing, translation, publication, and reuse consent',
        'Gives storytellers control over content, audience, correction, and withdrawal where feasible',
        'Connects narrative themes to structural conditions and community assets',
        'Includes trained facilitation, group agreements, support, safeguarding, and verified referral',
        'Includes language, disability, digital, age, gender, faith, family, migration, and local cultural review',
        'Gives young people or participants defined authority',
        'Measures choice, safety, story control, belonging, structure, support, value, and harm',
      ],
    },
    finalReminder:
      'This lab is an educational design exercise. It does not certify, authorize, or clinically validate any proposal. Do not implement a real activity without qualified supervision, legal review, community governance, youth authority, and appropriate permissions.',
  },
  privateReflection: {
    heading: 'Private Reflection',
    prompt:
      'Choose a fictional character, public story, proverb, film, or episode theme. What story about strength, identity, or survival is being told? How could it be retold in a way that preserves dignity, names structure, and leaves the storyteller with control? Do not submit personal health or trauma information.',
    privacyNotice:
      'The reflection is private, optional, and ungraded. Do not connect it to quiz scoring or module completion. Do not save it in the current pilot. Keep this reflection private unless you freely choose to share it. Do not enter names, diagnoses, trauma details, treatment history, health information, or other sensitive information in a public form.',
    optionalNote: 'This reflection is optional and does not block module completion. You may write in a private offline notebook instead of typing here.',
  },
  knowledgeCheck: {
    heading: 'MODULE 7 KNOWLEDGE CHECK',
    subtitle: 'Roots of Resilience',
    learnerInstruction: 'Answer every question. Select one answer per question. Answer at least four of the five questions correctly to pass. Feedback appears only after you submit. You can retry the knowledge check at any time.',
    privacyNotice: 'This assessment checks storytelling boundaries, social ecological resilience, structural analysis, safe participation, and evaluation. It does not certify trauma care, facilitation, research, media production, safeguarding, or clinical practice.',
    passingScore: 4,
    questions: [
      {
        id: 'm7-q1',
        prompt: 'Which statement makes the most responsible claim about storytelling and healing?',
        options: [
          'Sharing a painful story publicly is necessary for recovery.',
          'A well designed storytelling space can support meaning, agency, connection, and critical reflection, but it is not automatically healing and does not replace qualified care.',
          'A powerful story proves that an intervention is clinically effective.',
          'People who do not want to tell their stories are resisting healing.',
        ],
        correctAnswerIndex: 1,
        feedback: 'Storytelling can be meaningful when participation is voluntary, culturally grounded, supported, and controlled by the storyteller. It is not a guaranteed outcome, a clinical treatment by default, or a duty.',
      },
      {
        id: 'm7-q2',
        prompt: 'What best distinguishes social ecological resilience from a personal grit narrative?',
        options: [
          'Resilience depends mainly on suppressing emotion and continuing to perform.',
          'Resilience is an inherited personality trait that institutions cannot affect.',
          'Resilience develops through access to interacting personal, relational, cultural, community, institutional, material, and environmental resources that fit the setting.',
          'Resilience means returning quickly to exactly how life was before adversity.',
        ],
        correctAnswerIndex: 2,
        feedback: 'A social ecological view asks which resources are available, accessible, culturally meaningful, and coordinated. It does not place the full burden of adaptation on one person.',
      },
      {
        id: 'm7-q3',
        prompt: 'How should a learner move from an individual story to structural analysis?',
        options: [
          'Diagnose the speaker based on the details they shared.',
          'Treat one account as representative of every person in the community.',
          'Ignore the story and discuss policy only.',
          "Honor the speaker's account, separate testimony from general evidence, map relevant institutions and conditions, identify community responses, and ask what should change.",
        ],
        correctAnswerIndex: 3,
        feedback: 'Structural analysis keeps the person\'s meaning and dignity visible while examining the policies, institutions, histories, resources, and community responses connected to the account.',
      },
      {
        id: 'm7-q4',
        prompt: 'Which story circle design is strongest?',
        options: [
          'Require every participant to describe a traumatic event so the group feels honest.',
          'Use voluntary participation, several non disclosure options, clear confidentiality limits, trained facilitation, story control, accessibility, support and referral, and separate consent for publication.',
          'Promise that nothing will ever be shared even when safeguarding duties apply.',
          'Record the circle by default and let the organizer decide which clips to publish.',
        ],
        correctAnswerIndex: 1,
        feedback: 'A responsible story circle protects choice before, during, and after participation. Listening, fictional writing, art, passing, and private completion are valid forms of participation.',
      },
      {
        id: 'm7-q5',
        prompt: 'Which evaluation plan best fits a storytelling based collective healing activity?',
        options: [
          'Count views and emotional reactions as proof of healing.',
          'Measure how many participants disclosed trauma.',
          'Track choice and safety, story control, belonging, structural understanding, cultural fit, access to support, participant defined value, complaints, and unintended harm.',
          'Use only positive testimonials from published storytellers.',
        ],
        correctAnswerIndex: 2,
        feedback: 'Evaluation should examine both benefit and harm, including whether people retained control and could access support. Reach and emotional intensity do not prove healing.',
      },
    ],
    passedMessage: 'Passed. You identified the core boundaries of ethical storytelling, social ecological resilience, structural analysis, safe participation, and accountable evaluation.',
    notPassedMessage: 'Review the feedback, especially the difference between testimony and evidence, resilience and compulsory endurance, participation and publication consent, and reach and healing. Then try again.',
  },
  closing: {
    heading: 'MODULE 7 CLOSING',
    paragraphs: [
      'Across seven modules, this course has moved from Ubuntu and communal wellness to stress and stigma, family conversation, community support, plural care, systems change, and storytelling. Mental health is personal, relational, cultural, material, political, and institutional at the same time.',
      'Collective healing does not ask people to turn pain into a public lesson. It builds conditions in which people can choose whether and how to speak, receive care without performance, belong without erasure, and share power in changing what caused harm.',
    ],
    finalDisclaimer: 'This course provides general educational information. It does not provide diagnosis, therapy, trauma treatment, facilitation certification, or emergency support. If someone is in immediate danger, use the established local emergency and safeguarding pathway.',
  },
  completionRequirements: {
    heading: 'MODULE 7 COMPLETION REQUIREMENTS',
    items: [
      'Review all three episode sessions or written alternatives.',
      'Acknowledge the story to structure micro activity.',
      'Complete all six Mwangaza Youth Story Studio decisions.',
      'Acknowledge STORY Lab completion without uploading content.',
      'Complete all five knowledge check questions.',
      'Answer at least four of the five multiple choice questions correctly.',
      'Review the course closing.',
    ],
  },
  optionalExtendedAssignment: {
    label: 'Optional extended academic track',
    heading: 'Storytelling Based Community Activity Design or Critique',
    instruction: 'Prepare a 1,000 to 1,300 word design or critique of a storytelling based community activity in a defined African or diaspora setting.',
    requirements: [
      'Include the purpose.',
      'Name the cultural and structural context.',
      'Address participant authority.',
      'Address consent.',
      'Address accessibility.',
      'Address facilitation.',
      'Address safeguarding.',
      'Address the professional care pathway.',
      'Address publication limits.',
      'Address evaluation.',
      'Include an evidence note separating testimony, framework, and outcome research.',
    ],
    personalDisclosure: 'Personal disclosure is not required. Do not ask learners to diagnose participants, prescribe treatment, or disclose personal mental health information.',
  },
  sourcesFurtherLearning: {
    heading: 'Sources and further learning',
    items: [
      { citation: 'Voices of Change, Roots of Resilience series.', url: 'https://sustainthevoices.org/podcasts/voices-of-change' },
      { citation: 'SAMHSA, Six Guiding Principles to a Trauma Informed Approach.', url: 'https://www.samhsa.gov/resource/dbhis/infographic-6-guiding-principles-trauma-informed-approach' },
      { citation: 'Ungar, M., What is Resilience Within the Social Ecology of Human Development?', url: 'https://michaelungar.com/files/15contributions/4._What_is_Resilience_Within_the_Ecology_of_Human_Development.pdf' },
      { citation: 'Chioneso, N. A., Hunter, C. D., Gobin, R. L., et al., Community Healing and Resistance Through Storytelling.', url: 'https://doi.org/10.1177/0095798420929468' },
      { citation: 'Ginwright, S., The Future of Healing: Shifting from Trauma Informed Care to Healing Centered Engagement.', url: 'https://ginwright.medium.com/the-future-of-healing-shifting-from-trauma-informed-care-to-healing-centered-engagement-634f557ce69c' },
      { citation: 'UNICEF, Ethical Reporting Guidelines.', url: 'https://www.unicef.org/media/reporting-guidelines' },
      { citation: 'UNICEF, Guidance on Consultations with Young People.', url: 'https://www.unicef.org/youthledaction/media/791/file/UNICEF-Guidance-on-Consultations-with-Young-People.pdf.pdf' },
    ],
    reviewNote: 'Sources reviewed August 2026. Media availability, program details, and guidance may change. Recheck official sources before public release.',
  },
  progressTracking: {
    label: 'Module 7 progress',
    heading: 'Complete Module 7',
    privacyNote: 'Only completion status is saved. Your STORY Lab, reflection, scenario, and knowledge check responses are not stored.',
    markCompleteLabel: 'Mark complete',
    completedLabel: 'Completed',
    savingLabel: 'Saving...',
    completeModuleLabel: 'Complete Module 7',
    incompleteMessage: 'Complete all seven requirements before completing Module 7.',
    completedMessage: 'Module 7 is complete.',
    unavailableMessage: 'Progress saving is unavailable while this module is in administrator preview.',
    errorMessage: 'We could not save your progress. Please try again.',
  },
};

/**
 * PROTECTED SCENARIO ANSWER KEY (Module 7) — server-side-only.
 *
 * The Mwangaza Youth Story Studio scenario has six sequential decisions,
 * each with four options. The feedbackByOption array for each decision
 * is indexed by the submitted option's zero-based index. Only the
 * feedback for the submitted option is returned by checkMentalHealthScenario.
 *
 * This constant is NEVER imported by any src/ file, NEVER returned by
 * getMentalHealthModule, and NEVER embedded in any browser bundle.
 */
export const MENTAL_HEALTH_MODULE_7_SCENARIO_ANSWERS = {
  'mwangaza-youth-story-studio': {
    decisionsCount: 6,
    decisions: [
      {
        decisionId: 'purpose',
        optionsCount: 4,
        feedbackByOption: [
          'Storytelling is not automatically healing, and a public podcast is not trauma treatment.',
          'This states a realistic purpose while preserving the possibility of value and the need for evaluation.',
          'Competition may reward painful disclosure and turn stories into organizer content.',
          'Media volunteers should not conduct clinical screening outside training, law, supervision, and role.',
        ],
      },
      {
        decisionId: 'participation',
        optionsCount: 4,
        feedbackByOption: [
          'Required disclosure is coercive and may create harm.',
          'This preserves several valid forms of participation and makes personal disclosure optional.',
          'The activity is not treatment and should not require diagnosis disclosure.',
          'The storyteller controls whether and how to participate.',
        ],
      },
      {
        decisionId: 'facilitation-safety',
        optionsCount: 4,
        feedbackByOption: [
          'This combines preparation, choice, role clarity, response, and facilitator support.',
          'Peers may contribute, but should not carry crisis or clinical responsibility without the required system.',
          'Absolute confidentiality may conflict with safeguarding and urgent safety duties.',
          'Probing for detail is unnecessary and may override the storyteller\'s limits.',
        ],
      },
      {
        decisionId: 'structural-analysis',
        optionsCount: 4,
        feedbackByOption: [
          'A story circle does not authorize diagnosis or treatment planning.',
          'One account cannot represent a whole community.',
          'This preserves the speaker\'s meaning while connecting experience to power, resources, relationships, and change.',
          'Personal meaning and structural analysis can coexist.',
        ],
      },
      {
        decisionId: 'care-pathway',
        optionsCount: 4,
        feedbackByOption: [
          'An unverified search does not create a care pathway.',
          'Public advice may be unsafe, inaccurate, or outside role.',
          'Storytelling should not be presented as treatment.',
          'This connects the activity to support while preserving role, access, and continuity.',
        ],
      },
      {
        decisionId: 'publication-evaluation',
        optionsCount: 4,
        feedbackByOption: [
          'Participation is not recording consent, and views do not prove value or healing.',
          'This preserves control and evaluates both intended value and possible harm.',
          'Permanent organizer ownership is inconsistent with meaningful story control.',
          'Hiding criticism prevents correction and may increase harm.',
        ],
      },
    ],
  },
};

/**
 * MODULE 7 COMPLETION KEYS — server-side-only.
 *
 * The SEVEN approved Module 7 completion requirement identifiers, in the
 * approved order. They correspond one-to-one to the seven existing
 * completion requirement strings in lesson.completionRequirements.items.
 *
 *   core-media-reviewed          -> core_media_acknowledged_at
 *   story-to-structure-reviewed   -> lesson_and_case_reviewed_at
 *   mwangaza-scenario             -> interactive_scenario_completed_at
 *   story-lab                     -> activity_acknowledged_at
 *   knowledge-check-completed     -> knowledge_check_completed_at
 *   knowledge-check-passed        -> quiz_passed
 *   course-closing-reviewed        -> reflection_acknowledged_at
 *
 * The four self-attestable keys (core-media-reviewed, story-to-structure-
 * reviewed, story-lab, course-closing-reviewed) may be marked through the
 * general updateMentalHealthProgress function. The three server-verified
 * keys (mwangaza-scenario, knowledge-check-completed, knowledge-check-
 * passed) are recorded only by checkMentalHealthScenario and
 * checkMentalHealthKnowledgeCheck after valid submissions.
 *
 * Module 7 does NOT have a private-reflection completion key. The private
 * reflection is display only, with no progress field, no acknowledgment,
 * and no backend condition. The reflection_acknowledged_at field is used
 * for the course-closing-reviewed condition, not for the private
 * reflection.
 */
export const MENTAL_HEALTH_MODULE_7_COMPLETION_KEYS = [
  'core-media-reviewed',
  'story-to-structure-reviewed',
  'mwangaza-scenario',
  'story-lab',
  'knowledge-check-completed',
  'knowledge-check-passed',
  'course-closing-reviewed',
];

export const MENTAL_HEALTH_MODULE_7_SELF_ATTESTED_KEYS = new Set([
  'core-media-reviewed',
  'story-to-structure-reviewed',
  'story-lab',
  'course-closing-reviewed',
]);

const MODULE_7_KEY_TO_FIELD = {
  'core-media-reviewed': 'core_media_acknowledged_at',
  'story-to-structure-reviewed': 'lesson_and_case_reviewed_at',
  'mwangaza-scenario': 'interactive_scenario_completed_at',
  'story-lab': 'activity_acknowledged_at',
  'knowledge-check-completed': 'knowledge_check_completed_at',
  'knowledge-check-passed': 'quiz_passed',
  'course-closing-reviewed': 'reflection_acknowledged_at',
};

export function isModule7CompletionKey(key) {
  return MENTAL_HEALTH_MODULE_7_COMPLETION_KEYS.includes(key);
}

export function isModule7SelfAttestedKey(key) {
  return MENTAL_HEALTH_MODULE_7_SELF_ATTESTED_KEYS.has(key);
}

export function getModule7CompletionField(key) {
  return MODULE_7_KEY_TO_FIELD[key] || null;
}

export function deriveModule7CompletedKeys(row) {
  if (!row) return [];
  const keys = [];
  if (row.core_media_acknowledged_at) keys.push('core-media-reviewed');
  if (row.lesson_and_case_reviewed_at) keys.push('story-to-structure-reviewed');
  if (row.interactive_scenario_completed_at) keys.push('mwangaza-scenario');
  if (row.activity_acknowledged_at) keys.push('story-lab');
  if (row.knowledge_check_completed_at) keys.push('knowledge-check-completed');
  if (row.quiz_passed) keys.push('knowledge-check-passed');
  if (row.reflection_acknowledged_at) keys.push('course-closing-reviewed');
  return keys;
}