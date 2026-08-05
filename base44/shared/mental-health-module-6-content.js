/**
 * MODULE 6 LESSON CONTENT — server-side-only.
 *
 * Authoritative sources:
 *   - Tamu-Academy-MH-Module-6-Base44-Content-Pack.md
 *   - Tamu-Academy-MH-Module-6-Learner-Guide.docx
 *   - Tamu-Academy-MH-Module-6-AMPLIFY-Youth-Advocacy-and-Media-Lab.docx
 *   - Tamu-Academy-MH-Module-6-Knowledge-Check.docx
 *   - Tamu-Academy-MH-Module-6-Instructor-Key.docx (private — answer keys
 *     and guidance kept here, never exposed to learners)
 *
 * This file is imported ONLY by base44/shared/mental-health-curriculum.js.
 * It MUST NEVER be imported by any file in src/.
 *
 * SAFETY STANDARD: Never store a learner's diagnosis, symptoms, treatment
 * history, trauma, crisis information, discrimination experiences,
 * personal story, private reflection, advocacy draft, or AMPLIFY responses.
 * The content pack permits fictional, public issue, offline, downloadable,
 * browser-local, or temporary completion.
 *
 * The knowledge check answer key (correctAnswerIndex + feedback) is stripped
 * from each question before the lesson is returned to the browser by
 * getMentalHealthModuleContent. Grading and feedback release happen only in
 * the checkMentalHealthKnowledgeCheck backend function.
 *
 * The Kijani scenario feedback (feedbackByOption per decision) is kept in
 * MENTAL_HEALTH_MODULE_6_SCENARIO_ANSWERS (declared below) and released
 * only by checkMentalHealthScenario after the learner submits a valid
 * selection for each decision.
 *
 * COMPLETION: Module 6 has exactly FIVE technical completion conditions.
 * The private reflection is NOT a completion condition — it is display
 * only, with no progress field, no acknowledgment, and no backend call.
 */

export const MENTAL_HEALTH_MODULE_6_LESSON = {
  moduleOverview: {
    paragraphs: [
      'Mental health depends on more than individual knowledge or willingness to seek help. Laws, budgets, workforce, primary care, schools, community organizations, media, digital systems, social supports, rights, and public narratives all shape whether care is available, trusted, safe, and culturally meaningful.',
      'This module examines what culturally affirming mental health systems require in African and diaspora settings. Learners compare African regional policy progress, a Kenya based youth intervention, a United States analysis of structural racism, youth participation guidance, and Brother Be Well as a culturally focused multimedia platform.',
      'The module ends with a policy and media lab. Learners design one accountable system proposal that connects culture and public communication to a specific decision, real support pathway, youth authority, resources, safeguards, and evaluation.',
    ],
    competency:
      'By the end of this module, learners should be able to design a culturally affirming policy or media proposal that connects public education to a specific system change, funded implementation, meaningful youth authority, accessible support, professional care, rights, and measurable accountability.',
  },
  learningObjectives: {
    objectives: [
      'Describe major system needs in African mental health, including governance, financing, workforce, primary care integration, community services, rights, and data.',
      'Explain how racism, poverty, language, gender, disability, migration, and other structural conditions shape mental health and access to care.',
      'Distinguish public awareness, prevention, early support, treatment, referral, and system reform.',
      'Assess the opportunities and risks of task sharing, digital tools, social media, radio, and youth facing educational platforms.',
      'Design a youth informed policy or media proposal with a specific decision target, culturally affirming communication, a professional care pathway, safeguards, resources, and evaluation.',
    ],
    earlyDisclaimer:
      'This course provides general educational information. It does not provide diagnosis, therapy, policy certification, legal advice, or emergency support. If someone is in immediate danger, use the established local emergency and safeguarding pathway.',
  },
  contentSafetyNote:
    'The materials discuss treatment gaps, discrimination, suicide prevention communication, system failures, and youth participation. You may pause, use written summaries, or work only with fictional cases. Do not disclose personal health information. No personal story is required.',
  amplifySafetyWarning:
    'Design education and advocacy, not diagnosis, therapy, screening, crisis counseling, or an unreviewed digital health tool. Use a fictional or already public issue. A real proposal requires youth and lived experience governance, qualified clinical and safeguarding review, local policy and legal review, verified referral pathways, responsible media practice, informed consent, secure data practice, and funding.',
  fictionalSituationReminder:
    'Use a fictional or already public issue. You do not need to disclose personal experiences, diagnoses, trauma, treatment history, health information, or locally identifiable case details.',
  coreMedia: {
    attributionStatement:
      'These independently produced videos are included as learning resources. Their speakers, publishers, producers, sponsors, and programs are not Tamu Academy instructors, employees, or partners. Inclusion does not imply a formal partnership, endorsement, certification, proof of effectiveness, or clinical review by Tamu Academy.',
    required: [
      {
        key: 'video-1',
        title: 'A New Way to Help Young People with Their Mental Health',
        speaker: 'Tom Osborn',
        publisher: 'TED',
        watchUrl: 'https://www.youtube.com/watch?v=QL_pN4JtJKc',
        embedUrl: 'https://www.youtube.com/embed/QL_pN4JtJKc',
        officialPageUrl: 'https://www.ted.com/talks/tom_osborn_a_new_way_to_help_young_people_with_their_mental_health',
        officialPageLabel: 'Open the original TED page and transcript',
        attributionLabel: 'TED · Tom Osborn',
        approximateLength: 'Approximately 7 minutes',
        roleInModule: 'A Kenya based example of a brief school intervention delivered by trained young adults, used to examine scale, cultural framing, task sharing, supervision, evidence, and system infrastructure.',
        contentNote: 'This talk describes a program and its public rationale. Pair it with the research summaries in the lesson. Do not treat the talk alone as independent effectiveness evidence.',
        writtenAlternativeSectionId: 'kenya-case-shamiri',
      },
      {
        key: 'video-2',
        title: 'How Racism Makes Us Sick',
        speaker: 'David R. Williams',
        publisher: 'TED',
        watchUrl: 'https://www.youtube.com/watch?v=VzyjDR_AWzE',
        embedUrl: 'https://www.youtube.com/embed/VzyjDR_AWzE',
        officialPageUrl: 'https://www.ted.com/talks/david_r_williams_how_racism_makes_us_sick',
        officialPageLabel: 'Open the original TED page and transcript',
        attributionLabel: 'TED · David R. Williams',
        approximateLength: 'Approximately 17 minutes',
        roleInModule: 'A United States focused explanation of how discrimination, segregation, stereotypes, and unequal institutions shape health beyond individual behavior.',
        contentNote: 'This talk focuses on the United States. Use it to examine structural racism in that setting. Do not apply its racial categories or institutional history unchanged to every African or diaspora context.',
        writtenAlternativeSectionId: 'structural-racism-diaspora',
      },
      {
        key: 'video-3',
        title: 'Brother Be Well Explainer Video',
        speaker: null,
        publisher: 'Brother Be Well',
        watchUrl: 'https://www.youtube.com/watch?v=65Pbu4D6vVY',
        embedUrl: 'https://www.youtube.com/embed/65Pbu4D6vVY',
        officialPageUrl: 'https://brotherbewell.com/',
        officialPageLabel: 'Open the official Brother Be Well website',
        secondaryOfficialPageUrl: 'https://brotherbewell.com/wp-content/uploads/2025/05/BBW-Brochure.pdf',
        secondaryOfficialPageLabel: 'Open the official Brother Be Well brochure',
        attributionLabel: 'Brother Be Well',
        approximateLength: 'Short platform overview',
        roleInModule: 'A United States based example of multimedia mental health education, prevention, early support, courses, community discussion, and pathways to care for boys and men of color.',
        contentNote: 'Brother Be Well is included as a learning example. Tamu Academy does not claim a formal partnership. Public materials describe the platform, but independent evaluation is required for conclusions about health outcomes or transfer to another setting.',
        writtenAlternativeSectionId: 'brother-be-well-platform',
      },
    ],
    optionalExtended: [
      {
        title: 'Youth Advocacy Trainings for Nutrition and Mental Health in South Africa',
        publisher: 'UNICEF South Africa',
        watchUrl: 'https://www.youtube.com/watch?v=LNwb_Wb_hG0',
        embedUrl: 'https://www.youtube.com/embed/LNwb_Wb_hG0',
        approximateLength: 'Short training video',
        roleInModule: 'A concise example of youth preparation for public health advocacy.',
      },
      {
        title: 'UNICEF Africa: Youth Advocacy Guide',
        publisher: 'UNICEF Africa',
        watchUrl: 'https://www.youtube.com/watch?v=Hni9xlyL6ww',
        embedUrl: 'https://www.youtube.com/embed/Hni9xlyL6ww',
        approximateLength: 'Short overview video',
        roleInModule: 'An overview of young people creating and using a youth advocacy guide.',
      },
    ],
  },
  questionsToConsider: [
    'What problem does each speaker or program define, and at what system level?',
    'What does the example change: knowledge, service delivery, workforce, funding, policy, power, or referral?',
    'Whose culture and experience shaped the model, and who still may be excluded?',
    'Which claims are supported by research, which describe a program, and which express a public argument?',
    'What supervision, safeguarding, privacy, rights, or referral systems sit behind the visible media?',
    'How are racism, class, gender, age, disability, migration, and geography treated as structural conditions rather than personal weakness?',
    'What authority do young people and people with lived experience hold?',
  ],
  tamuIntroduction: {
    paragraphs: [
      'Mental health cannot be improved by telling individuals to cope more effectively while services remain distant, unaffordable, culturally dismissive, or disconnected.',
      'A mental health system includes laws, policy, budgets, workforce, primary care, schools, community organizations, specialist care, social protection, digital tools, media, data, rights oversight, and the relationships among them.',
      'A culturally affirming system does more than translate a poster or feature familiar faces. It treats people and communities as knowledge holders and decision makers. It asks whether language, care models, staffing, locations, evidence, privacy, complaint routes, and public messages fit the people the system is meant to serve.',
      'Cultural affirmation does not require agreement with every belief or practice. It combines respectful language, local authority, adaptation, evidence, rights, voluntary choice, professional standards, and accountability.',
    ],
  },
  explanation: [
    {
      sectionId: 'system-more-than-service',
      heading: '1. A system is more than a service',
      paragraphs: [
        'A service is one place, program, or intervention. A system is the connected set of rules, resources, people, institutions, and public narratives that determines whether support exists, who can reach it, what quality it has, and who can demand correction.',
        'System layers include:',
      ],
      numberedItems: [
        '**Governance:** law, policy, standards, rights, complaints, and participation.',
        '**Financing:** budget lines, insurance, grants, payment, and transport support.',
        '**Workforce:** specialists, primary care, social care, peers, and community workers.',
        '**Service network:** community, school, primary care, specialist, hospital, social support, and urgent response.',
        '**Information:** indicators, referral data, quality, rights, equity, and feedback.',
        '**Public culture:** language, media, education, stigma, trust, and stories.',
      ],
      trailingParagraphs: [
        'If awareness rises but the next available appointment is distant, unaffordable, discriminatory, or unsafe, the campaign has identified need without creating a functioning response.',
      ],
    },
    {
      sectionId: 'what-culturally-affirming-means',
      heading: '2. What culturally affirming means',
      paragraphs: [
        'Culturally affirming systems should:',
      ],
      numberedItems: [
        'Use preferred language and meaningful local terms.',
        'Share power with community and lived experience partners.',
        'Adapt settings, schedules, access, and care pathways.',
        'Address racism, colonial history, migration, gender, class, disability, age, and geography.',
        'Protect choice, rights, privacy, safeguarding, and complaint access.',
        'Test outcomes and harms across groups.',
        'Respect community knowledge without excusing coercion, discrimination, unsafe treatment, false certainty, or delayed care.',
      ],
      trailingParagraphs: [
        'Surface representation is not enough. A local image on an inaccessible service does not make the service culturally affirming.',
      ],
    },
    {
      sectionId: 'continuum-of-support',
      heading: '3. A continuum of support',
      paragraphs: [
        'The system should distinguish:',
      ],
      numberedItems: [
        '**Promotion:** public learning and environments that protect mental health.',
        '**Prevention:** evidence informed support before problems intensify.',
        '**Early support:** timely, bounded help through peers, lay providers, community workers, schools, or primary care.',
        '**Assessment and treatment:** qualified care with informed consent, continuity, and rights.',
        '**Recovery and inclusion:** family, housing, education, work, peer, disability, and social support.',
        '**Urgent response:** an established local emergency and safeguarding pathway.',
      ],
      trailingParagraphs: [
        'A platform, peer group, or public campaign may contribute to several functions, but it should not imply that education is treatment or that a general referral link guarantees timely care.',
      ],
    },
    {
      sectionId: 'policy-not-implementation',
      heading: '4. Policy is not implementation',
      paragraphs: [
        'A strong policy process should:',
      ],
      numberedItems: [
        'Define the problem with affected communities and disaggregated evidence.',
        'Set rights based objectives and specific responsibilities across sectors.',
        'Create a costed implementation plan and dedicated, predictable financing.',
        'Build workforce roles, training, supervision, compensation, and worker support.',
        'Connect community, primary care, specialist, social, school, and urgent pathways.',
        'Set privacy, safeguarding, quality, complaint, and independent oversight rules.',
        'Measure access, outcomes, experience, rights, and equity.',
        'Publish accountable progress and correct harm.',
      ],
      trailingParagraphs: [
        'A policy can establish direction. It becomes meaningful only when budgets, workforce, service standards, training, medicines, psychosocial support, supervision, data, complaints, and local delivery follow.',
      ],
    },
    {
      sectionId: 'african-region-progress',
      heading: '5. African Region progress snapshot',
      paragraphs: [
        'In July 2025, the WHO Regional Committee for Africa published its first progress report on the 2022 regional mental health framework.',
        'The report used preliminary Mental Health Atlas 2024 data and stated that 34 of 47 Member States participated, while 13 did not submit data.',
        'It reported:',
      ],
      numberedItems: [
        '**Mental health policy or strategy:** 29 of 47 Member States, or 62 percent, compared with an 80 percent milestone.',
        '**Functional primary care integration:** 7 of 47 Member States, or 15 percent, compared with a 30 percent milestone.',
        '**Routine comprehensive indicators:** 24 of 47 Member States, or 51 percent, compared with a 60 percent milestone.',
        '**Dedicated mental health budget line:** 16 of 47 Member States, or 34 percent, compared with a 60 percent milestone.',
      ],
      trailingParagraphs: [
        'The report stated that the region was not on track for the four stated 2025 milestones.',
        'Use three evidence limits:',
        '1. The findings rely on reported data with incomplete Atlas participation.',
        '2. Missing data are not proof that a country has no policy, service, budget, or information system.',
        '3. A policy or budget line does not prove service quality, cultural affirmation, implementation, or equitable access.',
      ],
    },
    {
      sectionId: 'financing-workforce-equity',
      heading: '6. Financing, workforce, and geographic equity',
      paragraphs: [
        'A workforce plan should not ask a small number of specialists to serve an entire population or treat community trust as free labor.',
        'System investment should include:',
      ],
      numberedItems: [
        'Dedicated and predictable budgets',
        'Primary care capacity',
        'Paid and supervised community and peer roles',
        'Specialist consultation and escalation',
        'Psychosocial and medicine options',
        'Social and practical supports',
        'Rural and marginalized community access',
        'Workforce well being and safe workload',
        'Quality, rights, complaints, and evaluation',
      ],
      trailingParagraphs: [
        'Task sharing requires clear scope, training, competence checks, supervision, compensation, referral, and specialist support.',
      ],
    },
    {
      sectionId: 'primary-care-schools-community',
      heading: '7. Primary care, schools, and community',
      paragraphs: [
        'Functional integration is more than a sign on a clinic door.',
        'The WHO progress report describes functional primary care integration through linked elements:',
      ],
      numberedItems: [
        'National guidance adopted for integration',
        'Pharmacological interventions available at primary care',
        'Psychosocial interventions available at primary care',
        'Training for primary care workers',
        'Specialist involvement in training and supervision',
      ],
      trailingParagraphs: [
        'Schools can contribute promotion, prevention, early recognition, safe referral, belonging, and learning accommodations.',
        'Community organizations can provide trusted entry points, navigation, practical support, public learning, and accountability.',
        'Specialist and hospital services remain necessary for needs that exceed other roles.',
        'Housing, work, education, justice, disability, migration, and social protection policies affect mental health even when they are not labeled mental health policy.',
      ],
    },
    {
      sectionId: 'kenya-case-shamiri',
      heading: '8. Kenya case: Shamiri and task sharing',
      paragraphs: [
        "Tom Osborn's talk describes Shamiri, a Kenya based, school delivered model in which trained young adults lead brief group sessions.",
        'A 2021 randomized clinical trial:',
      ],
      numberedItems: [
        'Included 413 adolescents aged 13 to 18.',
        'Took place in four secondary schools in Nairobi and Kiambu County.',
        'Compared the four week Shamiri intervention with a study skills control.',
        'Reported greater reductions in depression and anxiety symptoms for the Shamiri group.',
        'Reported effects through seven months.',
      ],
      subBlocks: [
        {
          label: 'A later five arm trial:',
          numberedItems: [
            'Included 1,252 Kenyan adolescents during the COVID period.',
            'Compared the full intervention, individual components, and an active study skills control.',
            'Reported improvement across all groups.',
            'Reported no significant differences among conditions.',
          ],
        },
      ],
      trailingParagraphs: [
        'Use the two studies to teach that evidence can vary by population, delivery conditions, outcome, and comparison.',
        'Do not copy the visible session alone. Examine recruitment, training, supervision, referral, safeguarding, data, school partnership, quality control, funding, and escalation.',
      ],
    },
    {
      sectionId: 'digital-access-tele-mental-health',
      heading: '9. Digital access and tele mental health',
      paragraphs: [
        'Digital tools may extend:',
      ],
      numberedItems: [
        'Education',
        'Self guided support',
        'Supervision',
        'Appointment access',
        'Specialist consultation',
        'Navigation',
      ],
      subBlocks: [
        {
          label: 'They can also reproduce:',
          numberedItems: [
            'Language exclusion',
            'Disability exclusion',
            'Surveillance',
            'Misinformation',
            'Bias',
            'Data extraction',
            'Platform dependence',
            'Unequal internet and device access',
          ],
        },
        {
          label: 'Before release, define:',
          numberedItems: [
            'Purpose and scope',
            'Low bandwidth and offline access',
            'Language and disability access',
            'Privacy and consent',
            'Professional and urgent pathways',
            'Evidence and quality',
            'Human and non digital alternatives',
          ],
        },
      ],
      trailingParagraphs: [
        'An artificial intelligence or chatbot feature should not be described as therapy, crisis care, or clinical judgment without the required evidence, governance, professional accountability, and safety system.',
      ],
    },
    {
      sectionId: 'media-mental-health-environment',
      heading: '10. Media is part of the mental health environment',
      paragraphs: [
        'Radio, television, podcasts, YouTube, social media, music, and community storytelling shape what people name, fear, hide, or seek.',
        'Responsible mental health media should:',
      ],
      numberedItems: [
        'Use meaningful local terms and explain clinical language.',
        'Give storytellers control, context, informed consent, and withdrawal options.',
        'Represent varied identities, abilities, ages, and experiences.',
        'Separate testimony, program description, and research evidence.',
        'Name a realistic action and verified support route.',
        'Use trained review for suicide and other high risk content.',
        'Avoid methods, sensationalism, blame, romanticization, cure claims, and stereotypes.',
        'Measure comprehension, trust, help seeking, referral, reach, and harm.',
      ],
      trailingParagraphs: [
        'Views and shares do not prove health impact.',
      ],
    },
    {
      sectionId: 'structural-racism-diaspora',
      heading: '11. Structural racism and diaspora systems',
      paragraphs: [
        'David R. Williams focuses on the United States and explains how discrimination, residential segregation, implicit bias, and stereotypes can shape health.',
        'This example supports several system questions:',
      ],
      numberedItems: [
        'Where are services located?',
        'Who is believed?',
        'Whose distress is punished or criminalized?',
        'How do housing, education, work, migration, policing, environment, and health care access shape mental health?',
        'What harms are hidden by administrative data?',
        'How can lived experience governance improve accountability?',
      ],
      trailingParagraphs: [
        'Do not treat race as a biological cause. Do not import one United States racial framework unchanged into every African or diaspora setting.',
      ],
    },
    {
      sectionId: 'youth-participation-power-care',
      heading: '12. Youth participation must include power and care',
      paragraphs: [
        'Young people can identify language, barriers, platforms, support patterns, and consequences that adults miss.',
        'Meaningful participation should include:',
      ],
      numberedItems: [
        'Influence over the question, budget, design, implementation, evaluation, and correction',
        'Diverse participation across region, language, gender, disability, class, age, and experience',
        'Written decision rights and feedback',
        'Compensation and accessibility',
        'Voluntary stories controlled by the storyteller',
        'Preparation, consent, support, safeguarding, and follow up',
        'Monitoring of intended and unintended effects on participant well being',
      ],
      trailingParagraphs: [
        'Public visibility without power can become tokenism or extraction.',
      ],
    },
    {
      sectionId: 'brother-be-well-platform',
      heading: '13. Brother Be Well as a platform case',
      paragraphs: [
        'Brother Be Well describes itself as a multimedia mental health education and awareness platform serving boys and men of color, including people who identify as LGBTQIA+ within those communities.',
        'Public materials describe:',
      ],
      numberedItems: [
        'Videos, podcasts, and articles',
        'Courses and group discussion',
        'Prevention and early intervention education',
        'Clinical and community voices',
        'Culturally focused content',
        'Pathways to care',
      ],
      subBlocks: [
        {
          label: 'Analyze the platform through six questions:',
          numberedItems: [
            'How does its defined audience affect content and trust?',
            'How do multiple media forms affect access?',
            'How are cultural stressors, identity, and structural conditions addressed?',
            'How are professional and community voices distinguished?',
            'What happens when education reveals a need for care?',
            'What outcomes are measured beyond views or course completion?',
          ],
        },
      ],
      trailingParagraphs: [
        'Brother Be Well is a United States based learning example, not a model to copy unchanged and not a formal Tamu Academy partner.',
      ],
    },
  ],
  interactiveScenario: {
    scenarioId: 'kijani-youth-mental-health-compact',
    title: 'Kijani Youth Mental Health Compact',
    prompt:
      'Kijani is a fictional multilingual region with urban, peri urban, and rural communities. Students describe stress, discrimination, family silence, unemployment, and long waits for support. Leaders respond with a youth mental health campaign. The first draft funds social media content but no referral coordination, primary care training, disability access, youth decision rights, dedicated implementation budget, or outcome review.',
    instruction:
      'Make six decisions. Each decision will show educational feedback. The goal is to connect cultural affirmation and public communication to a specific system change, accessible support, professional care, rights, youth authority, resources, and accountability. Do not use personal health information.',
    decisions: [
      {
        decisionId: 'policy-aim',
        heading: 'Decision 1: Policy aim',
        prompt: 'What should the Compact seek first?',
        options: [
          'Ask every young person to become more resilient.',
          'Approve a costed implementation plan with a dedicated budget that connects youth mental health promotion, primary care, schools, community support, specialist referral, social services, rights, and data.',
          'Produce a national awareness slogan with no responsible agency.',
          'Build one specialist center in the capital and describe the system as complete.',
        ],
      },
      {
        decisionId: 'service-pathway',
        heading: 'Decision 2: Service pathway',
        prompt: 'How should the Compact connect people to support?',
        options: [
          'Send every concern directly to a specialist, even when none is available.',
          'Let peers decide who needs treatment without supervision.',
          'Publish a list of telephone numbers without checking whether services answer.',
          'Build a stepped pathway linking promotion, prevention, trained early support, primary care, specialist and social care, safeguarding, urgent response, and follow up.',
        ],
      },
      {
        decisionId: 'workforce',
        heading: 'Decision 3: Workforce',
        prompt: 'Which workforce plan is strongest?',
        options: [
          'Ask volunteers to provide counseling because they speak local languages.',
          'Require specialists to deliver every activity across the region.',
          'Define tasks by role, train and assess competence, provide supervision and specialist support, pay workers, protect well being, and use clear referral and escalation.',
          'Give every partner the same role after a one day workshop.',
        ],
      },
      {
        decisionId: 'media-digital-design',
        heading: 'Decision 4: Media and digital design',
        prompt: 'Which public communication plan is most appropriate?',
        options: [
          'Use multilingual, accessible, low bandwidth media with source labels, claim limits, story consent, privacy, moderation, non digital alternatives, and verified support routes.',
          'Collect personal stories publicly so the campaign feels authentic.',
          'Build an English only smartphone application and close in person access.',
          'Measure success only through views, likes, and shares.',
        ],
      },
      {
        decisionId: 'youth-governance',
        heading: 'Decision 5: Youth governance',
        prompt: 'What role should young people hold?',
        options: [
          'Invite one student to speak at launch after the plan is final.',
          'Give diverse young people defined decision rights, budget influence, compensation, accessibility, preparation, safeguarding, support, story control, and authority to require revision.',
          'Ask young people to collect health stories from friends without supervision.',
          'Let clinical and government partners decide because youth participation may slow implementation.',
        ],
      },
      {
        decisionId: 'evaluation-accountability',
        heading: 'Decision 6: Evaluation and accountability',
        prompt: 'How should the Compact decide whether to continue or change?',
        options: [
          'Count campaign attendance and assume services improved.',
          'Publish only positive testimonials.',
          'Avoid complaint and harm data because it may reduce public confidence.',
          'Measure access, cultural relevance, trust, referral completion, service availability, wait time, outcomes, rights, equity, workforce well being, youth influence, and unintended harm.',
        ],
      },
    ],
    summaryHeadings: [
      'Policy aim',
      'Service pathway',
      'Workforce',
      'Media and digital access',
      'Youth authority',
      'Evaluation and accountability',
    ],
    strongestDesignFeature:
      'The strongest design feature of this Compact is that it connects cultural affirmation and public communication to a costed implementation plan with a dedicated budget, a stepped care pathway, trained and supervised workforce, meaningful youth authority, and comprehensive evaluation.',
    mostImportantRevision:
      'The most important revision is to ensure that young people hold defined decision rights, compensation, safeguarding, and story control throughout the Compact, not only at launch.',
  },
  amplifyLab: {
    eyebrow: 'MODULE 6 APPLIED ACTIVITY',
    title: 'AMPLIFY Youth Advocacy and Media Lab',
    subtitle: 'Turn a culturally grounded mental health concern into an accountable system proposal',
    course: 'Mental Health, Community and Culture',
    module: 'Building Culturally Affirming Systems',
    estimatedTime: '40 to 55 minutes',
    completionMode: 'Individual or small group, using a fictional or public issue',
    output: 'A policy concept or media script and storyboard, with a one page proposal card and ninety day preparation plan',
    safetyScope:
      'Design education and advocacy, not diagnosis, therapy, screening, crisis counseling, or an unreviewed digital health tool. Use a fictional or already public issue. A real proposal requires youth and lived experience governance, qualified clinical and safeguarding review, local policy and legal review, verified referral pathways, responsible media practice, informed consent, secure data practice, and funding.',
    howToUse: [
      'Choose a specific fictional or public mental health system problem.',
      'Choose the policy concept or media script route.',
      'Complete all seven AMPLIFY sections.',
      'Connect the message to a real institutional decision and support pathway.',
      'Stress test the proposal for tokenism, broken referral, privacy, misinformation, exclusion, and unfunded promises.',
      'Finish with a one page proposal card and a ninety day preparation plan.',
    ],
    frameworkLabel: 'AMPLIFY Framework',
    frameworkSummary: 'A: Aim, assets, and audience. M: Map the system and power. P: Policy, prevention, and professional pathway. L: Language, lived experience, and local culture. I: Information, media, and digital access. F: Financing, workforce, and feasibility. Y: Youth authority, safeguarding, and evaluation.',
    step1Issue: {
      heading: 'Step 1. Choose a Fictional or Public Issue',
      fields: [
        { id: 'setting', label: 'SETTING', prompt: 'Describe the fictional or public place, population, languages, and institutions.' },
        { id: 'systemProblem', label: 'SYSTEM PROBLEM', prompt: 'What is failing, for whom, and at which system layer?' },
        { id: 'publicEvidence', label: 'PUBLIC EVIDENCE', prompt: 'What credible information supports the problem, and what remains unknown?' },
      ],
    },
    step2Route: {
      heading: 'Step 2. Choose an Output Route',
      fields: [
        { id: 'selectedRoute', label: 'SELECTED ROUTE', prompt: 'State which output you will complete and why it fits the problem.' },
      ],
      routeOptions: [
        { key: 'policy', label: 'Policy concept (two pages)' },
        { key: 'media', label: 'Media script and storyboard (90 seconds)' },
      ],
    },
    sectionA: {
      heading: 'A. Aim, Assets, and Audience',
      fields: [
        { id: 'aim', label: 'AIM', prompt: 'Write one specific system change in a single sentence.' },
        { id: 'affectedCommunity', label: 'AFFECTED COMMUNITY', prompt: 'Who should benefit, and who might still be excluded?' },
        { id: 'audience', label: 'AUDIENCE OR DECISION MAKER', prompt: 'Who can authorize, fund, implement, or influence the change?' },
        { id: 'communityAssets', label: 'COMMUNITY ASSETS', prompt: 'Identify trusted people, languages, spaces, media, organizations, knowledge, and support already present.' },
        { id: 'ubuntuConnection', label: 'UBUNTU CONNECTION', prompt: 'How does the aim center mutual care, dignity, responsibility, and belonging?' },
      ],
    },
    sectionM: {
      heading: 'M. Map the System and Power',
      fields: [
        { id: 'structuralConditions', label: 'STRUCTURAL CONDITIONS', prompt: 'Name relevant racism, poverty, conflict, migration, gender, disability, age, geography, or language factors.' },
        { id: 'powerShift', label: 'POWER SHIFT', prompt: 'What decision, resource, or accountability must move, and toward whom?' },
        { id: 'opposition', label: 'OPPOSITION OR CONSTRAINT', prompt: 'What competing priority, incentive, fear, or institutional barrier may block change?' },
      ],
    },
    sectionP: {
      heading: 'P. Policy, Prevention, and Professional Pathway',
      fields: [
        { id: 'policyAsk', label: 'POLICY ASK', prompt: 'What exact rule, budget, service, standard, or public commitment should be approved?' },
        { id: 'professionalPathway', label: 'PROFESSIONAL PATHWAY', prompt: 'Where can someone obtain qualified assessment or treatment when needed?' },
        { id: 'warmConnection', label: 'WARM CONNECTION', prompt: 'How will the proposal address cost, distance, wait time, language, privacy, disability, and follow up?' },
        { id: 'rightsComplaints', label: 'RIGHTS AND COMPLAINTS', prompt: 'What consent, refusal, privacy, non discrimination, safeguarding, and complaint protections apply?' },
      ],
    },
    sectionL: {
      heading: 'L. Language, Lived Experience, and Local Culture',
      fields: [
        { id: 'coreMessage', label: 'CORE MESSAGE', prompt: 'Write one culturally affirming message that does not blame, diagnose, promise cure, or romanticize resilience.' },
        { id: 'familyBridge', label: 'FAMILY BRIDGE', prompt: 'How does the message address family expectations and open a respectful path to support?' },
        { id: 'stressStigma', label: 'STRESS AND STIGMA', prompt: 'How does it name structural stress and challenge silence without shaming the community?' },
      ],
    },
    sectionI: {
      heading: 'I. Information, Media, and Digital Access',
      fields: [
        { id: 'publicAction', label: 'PUBLIC ACTION', prompt: 'What should the audience do, and what should the institution do?' },
        { id: 'claimBoundary', label: 'CLAIM BOUNDARY', prompt: 'What may the message responsibly claim, and what must it not claim?' },
        { id: 'misinformationResponse', label: 'MISINFORMATION RESPONSE', prompt: 'Who corrects inaccurate or stigmatizing information, how quickly, and using what source?' },
      ],
    },
    mediaScriptStructure: {
      heading: 'Media Route: 90 Second Script and Storyboard',
      instruction: 'Complete this section if you selected the media route. Policy route learners may use it to draft a launch message.',
      fields: [
        { id: 'opening', label: 'OPENING', prompt: 'Name the audience, value, or shared concern without shock or stereotype.' },
        { id: 'systemTruth', label: 'SYSTEM TRUTH', prompt: 'Explain the institutional or structural problem in plain language.' },
        { id: 'communityStrength', label: 'COMMUNITY STRENGTH', prompt: 'Name an asset without turning resilience into an excuse for inaction.' },
        { id: 'policyServiceAsk', label: 'POLICY OR SERVICE ASK', prompt: 'State the concrete change and responsible decision maker.' },
        { id: 'carePathway', label: 'CARE PATHWAY', prompt: 'Give a verified next step and explain the scope of the resource.' },
        { id: 'closing', label: 'CLOSING', prompt: 'End with agency, solidarity, and accountability, not cure or fear.' },
      ],
      storyboardHeading: 'Five Part Storyboard for 0 to 90 Seconds',
      storyboardFields: [
        { id: 'sb1', label: '0 to 18 seconds', prompt: 'Opening visual and narration.' },
        { id: 'sb2', label: '18 to 36 seconds', prompt: 'System truth visual and narration.' },
        { id: 'sb3', label: '36 to 54 seconds', prompt: 'Community strength visual and narration.' },
        { id: 'sb4', label: '54 to 72 seconds', prompt: 'Policy or service ask visual and narration.' },
        { id: 'sb5', label: '72 to 90 seconds', prompt: 'Closing with agency, solidarity, and accountability.' },
      ],
    },
    sectionF: {
      heading: 'F. Financing, Workforce, and Feasibility',
      fields: [
        { id: 'workforceRoles', label: 'WORKFORCE ROLES', prompt: 'Who delivers, supervises, refers, moderates, reviews, and follows up?' },
        { id: 'scopeBoundaries', label: 'SCOPE BOUNDARIES', prompt: 'Which tasks require qualified clinical, legal, safeguarding, media, technology, or research expertise?' },
        { id: 'feasibleFirstStep', label: 'FEASIBLE FIRST STEP', prompt: 'What limited action can be prepared without pretending the full system already exists?' },
        { id: 'sustainability', label: 'SUSTAINABILITY', prompt: 'What must be funded after launch so the proposal does not become a short campaign with no care capacity?' },
      ],
    },
    sectionY: {
      heading: 'Y. Youth Authority, Safeguarding, and Evaluation',
      fields: [
        { id: 'inclusion', label: 'INCLUSION', prompt: 'How will participants vary by region, language, gender, disability, class, age, and experience?' },
        { id: 'participationSafety', label: 'PARTICIPATION SAFETY', prompt: 'How will consent, privacy, preparation, support, accessibility, compensation, and follow up work?' },
        { id: 'storyControl', label: 'STORY CONTROL', prompt: 'How can a young person approve, limit, revise, withdraw, or refuse story use?' },
      ],
    },
    evaluationPlan: {
      heading: 'Evaluation Plan',
      fields: [
        { id: 'successBoundary', label: 'SUCCESS BOUNDARY', prompt: 'What result would support continuation, revision, pause, or stop?' },
        { id: 'evidenceStatement', label: 'EVIDENCE STATEMENT', prompt: 'What can this activity measure, and what would require a stronger study?' },
      ],
    },
    redTeamTests: {
      heading: 'Red Team the Proposal',
      instruction: 'Assume the proposal has launched. Write one response for each test. Do not defend the original plan. Use the test to improve it.',
      tests: [
        'Demand rises, but services have a six month wait.',
        'One young person is treated as the voice of all youth.',
        'A personal story is reposted beyond the agreed audience.',
        'Content is unusable on low bandwidth phones.',
        'A peer is expected to handle a serious disclosure alone.',
        'A translated message still uses stigmatizing language.',
        'Views increase, but referral completion does not.',
        'A funder requests a cure claim or dramatic testimony.',
      ],
      summaryHeading: 'Red Team Summary',
      summaryFields: [
        { id: 'rt-most-likely-harm', label: 'MOST LIKELY HARM', prompt: 'Who could be harmed, and how might the harm remain hidden?' },
        { id: 'rt-required-correction', label: 'REQUIRED CORRECTION', prompt: 'What design, budget, role, pathway, or accountability must change?' },
        { id: 'rt-stop-condition', label: 'STOP CONDITION', prompt: 'What event prevents launch or requires immediate pause?' },
      ],
    },
    ninetyDayPlan: {
      heading: 'Ninety Day Preparation Plan',
      day90DecisionLabel: 'DAY 90 DECISION',
      prompt: 'What must be true before a limited public pilot may begin?',
    },
    proposalCard: {
      heading: 'One Page Proposal Card',
      fields: [
        { id: 'pc-title-aim', label: 'TITLE AND AIM', prompt: 'Name the proposal and state one specific system change.' },
        { id: 'pc-community', label: 'COMMUNITY AND SETTING', prompt: 'Name who should benefit and the structural conditions involved.' },
        { id: 'pc-policy', label: 'POLICY OR PUBLIC ACTION', prompt: 'Name the decision maker, request, audience, messenger, and channel.' },
        { id: 'pc-culture', label: 'CULTURE AND UBUNTU', prompt: 'State the community values, language, lived experience authority, and family approach.' },
        { id: 'pc-care', label: 'CARE PATHWAY', prompt: 'Explain prevention, early support, qualified care, social support, safeguarding, and urgent routes.' },
        { id: 'pc-resources', label: 'RESOURCES AND TIMING', prompt: 'State funding, workforce, supervision, access, and the first ninety days.' },
        { id: 'pc-accountability', label: 'ACCOUNTABILITY', prompt: 'Name youth authority, six measures, three harms, complaints, and the stop condition.' },
      ],
    },
    completionChecklist: {
      heading: 'Completion Checklist',
      items: [
        'Used a fictional or public issue and no private health information',
        'Defined one specific system change and responsible decision maker',
        'Mapped power, structural conditions, community assets, and affected groups',
        'Connected awareness to prevention, early support, qualified care, and safeguarding',
        'Centered meaningful language, Ubuntu, lived experience, family context, and cultural diversity',
        'Created an accessible media and digital plan with privacy and evidence limits',
        'Identified financing, workforce, supervision, feasibility, and sustainability',
        'Gave diverse young people real authority, compensation, support, and story control',
        'Selected measures for access, meaning, referral, service capacity, rights, equity, and harm',
        'Completed the red team, ninety day plan, and one page proposal card',
      ],
    },
    finalReminder:
      'This lab is an educational design exercise. It does not certify, authorize, or clinically validate any proposal. Do not implement a real proposal without qualified supervision, legal review, community governance, youth authority, and appropriate permissions.',
  },
  privateReflection: {
    heading: 'Private Reflection',
    prompt: 'Think of a mental health message you have encountered in your community or online. What did it ask an individual to do, and what responsibility did it assign to institutions? How might the message change if community care, structural conditions, and a real support pathway were visible? You may use a fictional example. Do not submit personal health information.',
    privacyNotice: 'The reflection is private, optional, and ungraded. Do not connect it to quiz scoring or module completion. Do not save it in the current pilot. Keep this reflection private unless you freely choose to share it. Do not enter names, diagnoses, trauma details, treatment history, health information, or other sensitive information in a public form.',
    optionalNote: 'This reflection is optional and does not block module completion. You may write in a private offline notebook instead of typing here.',
  },
  knowledgeCheck: {
    heading: 'MODULE 6 KNOWLEDGE CHECK',
    subtitle: 'Building Culturally Affirming Systems',
    learnerInstruction: 'Five multiple choice questions. Answer at least four of the five questions correctly to pass. Feedback appears only after you submit. You can retry the knowledge check at any time.',
    privacyNotice: 'This assessment checks understanding of course concepts. It does not ask for personal mental health information and does not evaluate anyone\'s health or diagnosis.',
    passingScore: 4,
    questions: [
      {
        id: 'm6-q1',
        prompt: 'Which description best defines a culturally affirming mental health system?',
        options: [
          'A public awareness campaign that uses local images but has no service or referral changes.',
          'A connected system that respects language, identity, community knowledge, rights, and lived experience while providing accessible, evidence informed support and real pathways to qualified care.',
          'A system that gives every cultural practice the same role and evidence status.',
          'A specialist hospital that serves the entire country from one city.',
        ],
        correctAnswerIndex: 1,
        feedback: 'Cultural affirmation concerns power, access, language, rights, relationships, service design, and accountability. Representation in a campaign matters, but it cannot substitute for functioning support and care pathways.',
      },
      {
        id: 'm6-q2',
        prompt: 'What is the most responsible interpretation of the WHO African Region progress report used in this module?',
        options: [
          'Most Member States had fully implemented culturally affirming community care by 2025.',
          'A national policy automatically proves that services are funded and available.',
          'The report identified progress and major implementation gaps, and its findings must be read with the noted data coverage limits.',
          'Countries without submitted data should be counted as having no mental health system.',
        ],
        correctAnswerIndex: 2,
        feedback: 'The report tracked policy, primary care integration, routine indicators, and budget lines, and found the region off track for the stated 2025 milestones. It also noted that 13 of 47 Member States did not submit Atlas data, so absence of reported data is not proof of absence.',
      },
      {
        id: 'm6-q3',
        prompt: 'Which arrangement reflects meaningful and safe youth participation?',
        options: [
          'Young people share personal stories after adults have made every decision.',
          'A youth panel appears at launch, but it has no budget, vote, or follow up role.',
          'One young person approves all content without safeguarding or support.',
          'Diverse young people hold defined decision rights, receive preparation and compensation, control their stories, have support and safeguarding, and help review results and harms.',
        ],
        correctAnswerIndex: 3,
        feedback: 'Meaningful participation includes authority, resources, accessibility, inclusion, feedback, safeguarding, and accountability. Public visibility without power can become tokenism or extraction.',
      },
      {
        id: 'm6-q4',
        prompt: 'Which digital and media design is strongest?',
        options: [
          'Use accessible, low bandwidth content with clear source labels, privacy protections, a defined audience, safe moderation, and links to verified local support while keeping non digital options.',
          'Launch an artificial intelligence chatbot as therapy without clinical oversight or an urgent response pathway.',
          'Measure success only through views and shares.',
          'Collect detailed personal health stories publicly so the campaign feels authentic.',
        ],
        correctAnswerIndex: 0,
        feedback: 'Digital reach is useful only when it is paired with accessibility, privacy, evidence, moderation, referral, and alternatives for people who cannot or do not want to use the platform.',
      },
      {
        id: 'm6-q5',
        prompt: 'Which advocacy proposal is most likely to produce accountable system change?',
        options: [
          'Raise awareness about mental health everywhere.',
          'Ask young people to be more resilient without changing institutions.',
          'Name a specific policy or service change, decision maker, affected community, evidence, cultural and language approach, care pathway, resources, timeline, safeguards, and measures.',
          'Promise that one campaign will end stigma and close the treatment gap.',
        ],
        correctAnswerIndex: 2,
        feedback: 'An accountable advocacy proposal connects a defined problem to a specific decision, responsible actor, implementation resources, care pathway, equity safeguards, and measures that can show both benefit and harm.',
      },
    ],
    passedMessage: 'You answered {score} of 5 questions correctly. You passed by answering at least four of the five questions correctly. Review the feedback or continue.',
    notPassedMessage: 'You answered {score} of 5 questions correctly. Answer at least four of the five questions correctly to pass. Review the feedback and try again.',
  },
  closing: {
    heading: 'MODULE 6 CLOSING',
    paragraphs: [
      'A strong message can open a door, but a system must make sure there is somewhere safe to go. Cultural affirmation becomes real when people can recognize themselves in public language, influence decisions, reach support, exercise rights, and see institutions respond to evidence and harm.',
    ],
    transition: 'Module 7 turns from systems and public advocacy to storytelling, survival, and collective healing. It asks how stories can create meaning and solidarity without making personal pain a price of participation.',
    finalDisclaimer: 'This course provides general educational information. It does not provide diagnosis, therapy, policy certification, legal advice, or emergency support. If someone is in immediate danger, use the established local emergency and safeguarding pathway.',
  },
  completionRequirements: {
    heading: 'MODULE 6 COMPLETION REQUIREMENTS',
    items: [
      'Review all three core videos or written alternatives.',
      'Complete all six Kijani Youth Mental Health Compact decisions.',
      'Complete the AMPLIFY Youth Advocacy and Media Lab.',
      'Complete all five knowledge check questions.',
      'Answer at least four of the five multiple choice questions correctly.',
    ],
  },
  optionalExtendedAssignment: {
    label: 'Optional extended academic track',
    heading: 'Policy Concept Paper or Recorded Media Pitch',
    instruction: 'Prepare a 1,200 to 1,600 word policy concept paper or a five to seven minute recorded media pitch with a written evidence note. Define one culturally affirming mental health system change for a specific African or diaspora setting.',
    requirements: [
      'Include the policy target.',
      'Name the affected community.',
      'Describe structural conditions.',
      'Map the service and referral network.',
      'Address workforce and financing.',
      'Include youth governance.',
      'Address digital and media ethics.',
      'Describe the implementation sequence.',
      'List six measures.',
      'Identify three possible harms.',
      'Use at least five credible sources.',
    ],
    personalDisclosure: 'Personal disclosure is not required. Do not ask learners to diagnose participants, prescribe treatment, or disclose personal mental health information.',
  },
  sourcesFurtherLearning: {
    heading: 'Sources and further learning',
    items: [
      { citation: 'World Health Organization Regional Office for Africa. Progress Report on the Framework to Strengthen Implementation of the Comprehensive Mental Health Action Plan 2013 to 2030 in the WHO African Region. 2025.', url: 'https://www.afro.who.int/sites/default/files/2025-08/AFR-RC75-INF-DOC-5%20Progress%20report%20on%20the%20Mental%20Health%20Regional%20Framework.pdf' },
      { citation: 'World Health Organization Regional Office for Africa. Framework to Strengthen Implementation of the Comprehensive Mental Health Action Plan 2013 to 2030 in the WHO African Region. 2022.', url: 'https://www.afro.who.int/sites/default/files/2022-07/AFR-RC72-5%20Framework%20to%20strengthen%20the%20implementation%20of%20the%20comprehensive%20mental%20health%20action%20plan%2020132030%20in%20the%20WHO%20African%20Region.pdf' },
      { citation: 'World Health Organization. Guidance on Mental Health Policy and Strategic Action Plans. 2025.', url: 'https://www.who.int/publications/i/item/9789240106796' },
      { citation: 'World Health Organization. Mental Health Atlas 2024. 2025.', url: 'https://iris.who.int/server/api/core/bitstreams/5897b3c7-2848-47a7-ba22-0a7902342a81/content' },
      { citation: 'World Health Organization and UNICEF. Mental Health of Children and Young People: Service Guidance. 2024.', url: 'https://www.who.int/publications/i/item/9789240100374' },
      { citation: 'UNICEF. Young People\'s Participation and Mental Health: A Protocol for Practitioners. 2022.', url: 'https://www.unicef.org/media/132256/file/Young%20People%E2%80%99s%20Participation%20and%20Mental%20Health.pdf' },
      { citation: 'World Health Organization. Preventing Suicide: A Resource for Media Professionals. 2023.', url: 'https://www.who.int/publications/i/item/9789240076846' },
      { citation: 'Osborn, T. L., Venturo-Conerly, K. E., Arango G., S., et al. Effect of Shamiri Layperson Provided Intervention versus Study Skills Control Intervention for Depression and Anxiety Symptoms in Adolescents in Kenya. JAMA Psychiatry, 2021.', url: 'https://doi.org/10.1001/jamapsychiatry.2021.1129' },
      { citation: 'Venturo-Conerly, K. E., Osborn, T. L., Rusch, T., et al. Testing the Shamiri Intervention and Its Components with Kenyan Adolescents during the COVID 19 Pandemic. Journal of the American Academy of Child and Adolescent Psychiatry, 2025.', url: 'https://doi.org/10.1016/j.jaac.2024.04.015' },
      { citation: 'Brother Be Well. Brother Be Well Platform Brochure. 2025.', url: 'https://brotherbewell.com/wp-content/uploads/2025/05/BBW-Brochure.pdf' },
    ],
    reviewNote: 'Sources reviewed July 2026. Media availability, program details, policy, service data, and guidance may change. Recheck official sources before public release.',
  },
  progressTracking: {
    label: 'Module 6 progress',
    heading: 'Complete Module 6',
    privacyNote: 'Only completion status is saved. Your AMPLIFY lab, reflection, scenario, and knowledge check responses are not stored.',
    markCompleteLabel: 'Mark complete',
    completedLabel: 'Completed',
    savingLabel: 'Saving...',
    completeModuleLabel: 'Complete Module 6',
    incompleteMessage: 'Complete all five requirements before completing Module 6.',
    completedMessage: 'Module 6 is complete.',
    unavailableMessage: 'Progress saving is unavailable while this module is in administrator preview.',
    errorMessage: 'We could not save your progress. Please try again.',
  },
};

/**
 * PROTECTED SCENARIO ANSWER KEY (Module 6) — server-side-only.
 *
 * The Kijani Youth Mental Health Compact scenario has six sequential
 * decisions, each with four options. The feedbackByOption array for each
 * decision is indexed by the submitted option's zero-based index. Only the
 * feedback for the submitted option is returned by checkMentalHealthScenario.
 *
 * This constant is NEVER imported by any src/ file, NEVER returned by
 * getMentalHealthModule, and NEVER embedded in any browser bundle.
 */
export const MENTAL_HEALTH_MODULE_6_SCENARIO_ANSWERS = {
  'kijani-youth-mental-health-compact': {
    decisionsCount: 6,
    decisions: [
      {
        decisionId: 'policy-aim',
        optionsCount: 4,
        feedbackByOption: [
          'Resilience may matter, but this option shifts system responsibility onto young people.',
          'This turns a broad concern into connected responsibilities, resources, services, rights, and accountability.',
          'A slogan may raise recognition but does not establish implementation or care.',
          'Specialist capacity is important, but one centralized site cannot provide an equitable system alone.',
        ],
      },
      {
        decisionId: 'service-pathway',
        optionsCount: 4,
        feedbackByOption: [
          'Automatic specialist referral can overload scarce services and ignore other appropriate support.',
          'Peer support does not authorize unqualified assessment or treatment decisions.',
          'A directory is not a functioning referral pathway when availability and follow up are unknown.',
          'This connects several levels of support while preserving role boundaries, escalation, and continuity.',
        ],
      },
      {
        decisionId: 'workforce',
        optionsCount: 4,
        feedbackByOption: [
          'Language and trust matter, but they do not replace scope, training, supervision, pay, or safety.',
          'Specialist only delivery is unlikely to meet population needs or geographic equity.',
          'This uses task sharing without turning community workers into unsupported substitutes.',
          'One workshop does not create every required qualification or legal scope.',
        ],
      },
      {
        decisionId: 'media-digital-design',
        optionsCount: 4,
        feedbackByOption: [
          'This combines reach with cultural meaning, evidence, access, privacy, safety, and care connection.',
          'Personal pain is not campaign property. Story use must remain voluntary, bounded, and controlled by the storyteller.',
          'Smartphone only and English only design can deepen digital, language, privacy, and disability exclusion.',
          'Engagement counts do not show comprehension, care access, equity, benefit, or harm.',
        ],
      },
      {
        decisionId: 'youth-governance',
        optionsCount: 4,
        feedbackByOption: [
          'Public visibility after decisions are complete is not meaningful governance.',
          'This connects youth knowledge with authority, resources, safety, and accountability.',
          'Informal health story collection creates privacy, safety, role, and consent risks.',
          'Excluding young people may make implementation faster on paper while making it less relevant, trusted, and accountable.',
        ],
      },
      {
        decisionId: 'evaluation-accountability',
        optionsCount: 4,
        feedbackByOption: [
          'Attendance shows activity, not whether care, rights, capacity, or outcomes changed.',
          'Testimonials can illuminate experience but do not replace systematic evidence or harm reporting.',
          'Hiding complaints prevents learning, correction, and accountability.',
          'This set of measures connects communication, service delivery, participant experience, equity, rights, and system capacity.',
        ],
      },
    ],
  },
};

/**
 * MODULE 6 COMPLETION KEYS — server-side-only.
 *
 * The FIVE approved Module 6 completion requirement identifiers, in the
 * approved order. They correspond one-to-one to the five existing
 * completion requirement strings in lesson.completionRequirements.items.
 *
 *   core-media-reviewed         -> core_media_acknowledged_at
 *   kijani-scenario             -> interactive_scenario_completed_at
 *   amplify-lab                 -> activity_acknowledged_at
 *   knowledge-check-completed   -> knowledge_check_completed_at
 *   knowledge-check-passed      -> quiz_passed
 *
 * The two self-attestable keys (core-media-reviewed, amplify-lab) may be
 * marked through the general updateMentalHealthProgress function. The three
 * server-verified keys (kijani-scenario, knowledge-check-completed,
 * knowledge-check-passed) are recorded only by checkMentalHealthScenario
 * and checkMentalHealthKnowledgeCheck after valid submissions.
 *
 * Module 6 does NOT have a private-reflection completion key. The private
 * reflection is display only, with no progress field, no acknowledgment,
 * and no backend condition. There is no lesson_and_case_reviewed_at
 * requirement either.
 */
export const MENTAL_HEALTH_MODULE_6_COMPLETION_KEYS = [
  'core-media-reviewed',
  'kijani-scenario',
  'amplify-lab',
  'knowledge-check-completed',
  'knowledge-check-passed',
];

export const MENTAL_HEALTH_MODULE_6_SELF_ATTESTED_KEYS = new Set([
  'core-media-reviewed',
  'amplify-lab',
]);

const MODULE_6_KEY_TO_FIELD = {
  'core-media-reviewed': 'core_media_acknowledged_at',
  'kijani-scenario': 'interactive_scenario_completed_at',
  'amplify-lab': 'activity_acknowledged_at',
  'knowledge-check-completed': 'knowledge_check_completed_at',
  'knowledge-check-passed': 'quiz_passed',
};

export function isModule6CompletionKey(key) {
  return MENTAL_HEALTH_MODULE_6_COMPLETION_KEYS.includes(key);
}

export function isModule6SelfAttestedKey(key) {
  return MENTAL_HEALTH_MODULE_6_SELF_ATTESTED_KEYS.has(key);
}

export function getModule6CompletionField(key) {
  return MODULE_6_KEY_TO_FIELD[key] || null;
}

export function deriveModule6CompletedKeys(row) {
  if (!row) return [];
  const keys = [];
  if (row.core_media_acknowledged_at) keys.push('core-media-reviewed');
  if (row.interactive_scenario_completed_at) keys.push('kijani-scenario');
  if (row.activity_acknowledged_at) keys.push('amplify-lab');
  if (row.knowledge_check_completed_at) keys.push('knowledge-check-completed');
  if (row.quiz_passed) keys.push('knowledge-check-passed');
  return keys;
}