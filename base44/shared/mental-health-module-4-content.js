/**
 * MODULE 4 LESSON CONTENT — server-side-only.
 *
 * Authoritative source: Tamu-Academy-MH-Module-4-Base44-Content-Pack.md
 * and the supplied Learner Guide, CARE Community Support Design Lab,
 * and Knowledge Check documents.
 *
 * This file is imported ONLY by base44/shared/mental-health-curriculum.js.
 * It MUST NEVER be imported by any file in src/.
 *
 * SAFETY STANDARD: Never store personal reflections, CARE worksheet
 * responses, community descriptions, referral maps, risk analyses,
 * diagnoses, trauma narratives, screening results, treatment history,
 * health information, disclosures, or locally identifiable case
 * details. The content pack allows private, offline, browser-local,
 * or fictional completion of all activities.
 *
 * The knowledge check answer key (correctAnswerIndex + feedback) is
 * stripped from each question before the lesson is returned to the
 * browser by getMentalHealthModuleContent. Grading and feedback
 * release happen only in the checkMentalHealthKnowledgeCheck backend
 * function.
 *
 * The Tumaini scenario feedback (feedbackByOption per decision) is
 * kept in MENTAL_HEALTH_MODULE_4_SCENARIO_ANSWERS (declared below)
 * and released only by checkMentalHealthScenario after the learner
 * submits a valid selection for each decision.
 */

export const MENTAL_HEALTH_MODULE_4_LESSON = {
  moduleOverview: {
    paragraphs: [
      'Community mental health support can expand access, trust, and early help when it is built around clear roles, appropriate training, supervision, referral pathways, cultural and linguistic fit, community participation, and respect for rights.',
      'This module examines three distinct models. Friendship Bench uses trained and supervised lay health workers to deliver structured problem solving support in Zimbabwean primary care and community settings. StrongMinds uses lay facilitator led group interpersonal therapy for depression in African settings. Brother Be Well uses culturally affirming multimedia, education, discussion tools, and pathways to care for boys and men of color in the United States.',
      'Learners compare what each model does, what it does not do, and which design elements may transfer to another context. They then create a fictional community support initiative without copying a clinical intervention or placing untrained people in clinical roles.',
    ],
    competency:
      'By the end of this module, learners should be able to compare community mental health models by purpose, population, delivery role, cultural fit, evidence, supervision, referral, access, ethics, and sustainability, then design a bounded and culturally grounded support initiative for a specific local context.',
  },
  learningObjectives: {
    objectives: [
      'Explain task sharing and distinguish it from informal helping, unsupervised counseling, and replacing specialist care.',
      'Describe the purpose, population, delivery approach, setting, and care boundary of Friendship Bench, StrongMinds, and Brother Be Well.',
      'Compare treatment, prevention, early intervention, education, peer support, and referral as distinct functions within a wider mental health system.',
      'Assess whether a community model includes cultural and linguistic fit, community participation, training, supervision, safeguarding, referral, privacy, worker support, and realistic access.',
      'Design a fictional community initiative that applies Ubuntu informed care, defines safe roles, and identifies evidence, ethics, referral, evaluation, and sustainability requirements.',
    ],
    earlyDisclaimer:
      'This course provides general educational information. It does not provide diagnosis, therapy, medical treatment, program certification, or emergency support. Do not use this module to copy or deliver a clinical intervention without the required permissions, training, supervision, legal review, and referral systems. If someone is in immediate danger, contact local emergency services.',
  },
  contentSafetyNote:
    'The materials discuss depression, suicide, treatment gaps, stigma, and community care. Learners may pause, use the written summary, or skip personal reflection. Use fictional or composite situations. No personal disclosure is required.',
  designLabSafetyWarning:
    'Design an educational prototype, not a clinical service. Do not assign diagnosis, screening, psychotherapy, crisis response, or treatment decisions to unqualified people. Name where qualified supervision, safeguarding, referral, emergency response, and local legal review would be required.',
  fictionalSituationReminder:
    'Use a fictional or composite situation. You do not need to disclose personal experiences, diagnoses, trauma, treatment history, health information, or locally identifiable case details.',
  coreMedia: {
    attributionStatement:
      'These independently produced videos are included as learning resources. Their speakers, publishers, producers, sponsors, and programs are not Tamu Academy instructors, employees, or partners. Inclusion does not imply a formal partnership, endorsement, certification, or clinical review by Tamu Academy.',
    primary: {
      title: 'Why I Train Grandmothers to Treat Depression',
      speaker: 'Dixon Chibanda',
      publisher: 'TED',
      watchUrl: 'https://www.youtube.com/watch?v=Cprp_EjVtwA',
      embedUrl: 'https://www.youtube.com/embed/Cprp_EjVtwA',
      officialPageUrl: 'https://www.friendshipbenchzimbabwe.org/collaboration1',
      officialPageLabel: 'Open the official Friendship Bench implementation page',
      attributionLabel: 'TED · Dixon Chibanda',
      roleInModule: 'Introduction to the origin, cultural adaptation, human relationships, and access logic of Friendship Bench.',
    },
    secondary: {
      title: 'Brother Be Well Explainer Video',
      publisher: 'Brother Be Well / Mental Health California',
      watchUrl: 'https://www.youtube.com/watch?v=65Pbu4D6vVY',
      embedUrl: 'https://www.youtube.com/embed/65Pbu4D6vVY',
      officialPageUrl: 'https://brotherbewell.com/',
      officialPageLabel: 'Open the official Brother Be Well platform',
      attributionLabel: 'Brother Be Well / Mental Health California',
      roleInModule: 'Introduction to culturally affirming multimedia education, prevention and early intervention, community discussion, and pathways to care for boys and men of color.',
    },
  },
  questionsToConsider: [
    'What problem is each program trying to solve?',
    'Is the program offering treatment, education, prevention, peer support, referral, or a combination?',
    'Who delivers the support, and what training, supervision, or institutional connection is visible?',
    'How does the model use language, relationships, setting, identity, or community trust?',
    'What happens when a person\'s needs exceed the program\'s role?',
    'Which claims are supported by research, which come from program reporting, and which are personal testimony?',
    'What would require local adaptation, permission, funding, or legal review before use elsewhere?',
  ],
  tamuIntroduction: {
    paragraphs: [
      'A bench, a therapy circle, and a digital learning platform may all create points of connection. They do not perform the same function.',
      'Community mental health work becomes safer and more useful when every person knows the purpose of the program, the limits of their role, the support available to them, and the next place a participant can go. Trust is important. Trust without training, supervision, privacy, safeguarding, and referral can still leave people at risk.',
      'This module treats community knowledge as a source of design intelligence rather than a substitute for all professional care. It also treats professional care as one part of a wider system rather than the only form of support that matters. The goal is to build a connected continuum that includes promotion, prevention, early intervention, treatment, recovery support, social protection, and urgent care.',
    ],
  },
  explanation: [
    {
      sectionId: 'community-based-informed-led',
      heading: '1. Community based, community informed, and community led are different',
      paragraphs: [
        'A program may be:',
      ],
      numberedItems: [
        'Located in a community',
        'Adapted after community consultation',
        'Delivered by trusted community members',
        'Governed or owned by community institutions',
        'Integrated into a public health, education, or social service system',
      ],
      trailingParagraphs: [
        'These features can overlap, but they should not be assumed. A program held in a neighborhood is not automatically community led. A program delivered by local people is not automatically accountable to them. Learners should ask who defines the need, controls resources, sets standards, owns data, makes decisions, and receives credit.',
      ],
    },
    {
      sectionId: 'task-sharing-boundaries',
      heading: '2. Task sharing has boundaries',
      paragraphs: [
        'Task sharing means that defined mental health tasks are delivered by appropriately trained non specialists or general health workers as part of a supported system.',
        'Safe task sharing normally requires:',
      ],
      numberedItems: [
        'A clearly defined task and population',
        'Selection standards for providers',
        'Structured and culturally adapted training',
        'Competency assessment',
        'Ongoing supervision',
        'Referral and emergency pathways',
        'Privacy and safeguarding procedures',
        'Monitoring, evaluation, and quality improvement',
        'Support, fair expectations, and preferably compensation for workers',
        'Compliance with local laws and professional rules',
      ],
      subsections: [
        {
          heading: 'Task sharing does not mean',
          paragraphs: [],
          numberedItems: [
            'Anyone can become a therapist after a short workshop',
            'Specialists are no longer needed',
            'Volunteers should absorb unlimited emotional labor',
            'A program can ignore consent, privacy, or crisis response',
            'A model proven in one place will work unchanged everywhere',
          ],
        },
      ],
      trailingParagraphs: [
        'The phrase task shifting is also used. This module prefers task sharing because the work should remain connected across community providers, supervisors, health professionals, and referral services.',
      ],
    },
    {
      sectionId: 'continuum-of-support',
      heading: '3. A continuum of support',
      paragraphs: [
        'Community mental health systems include different functions:',
      ],
      subsections: [
        { heading: 'Promotion', paragraphs: ['Strengthening conditions that support mental well being, dignity, connection, safety, and participation.'] },
        { heading: 'Prevention', paragraphs: ['Reducing risks or strengthening protective factors before a condition begins or worsens.'] },
        { heading: 'Early intervention', paragraphs: ['Recognizing concerns and connecting people to timely support.'] },
        { heading: 'Treatment', paragraphs: ['Delivering an intervention intended to reduce symptoms or impairment, within an appropriate scope of practice.'] },
        { heading: 'Recovery and peer support', paragraphs: ['Supporting belonging, agency, practical goals, and continued participation after or alongside treatment.'] },
        { heading: 'Referral and urgent response', paragraphs: ['Connecting people to a higher level or different type of care when needs exceed the current program.'] },
      ],
      trailingParagraphs: [
        'A strong program states which functions it performs. It does not describe education as therapy or informal support as clinical treatment.',
      ],
    },
    {
      sectionId: 'friendship-bench-case',
      heading: '4. Case study: Friendship Bench',
      paragraphs: [
        'Friendship Bench was developed in Zimbabwe and connects structured psychological support with primary care and community settings.',
        'In the influential Harare clinical trial:',
      ],
      numberedItems: [
        'Trained and supervised lay health workers delivered individual problem solving therapy.',
        'Sessions took place on a bench in a discreet area near a primary care clinic.',
        'The approach used locally meaningful language and focused on problems identified by the participant.',
        'Participants could also join a peer support component called Circle Kubatana Tose, commonly translated as holding hands together.',
        'People who did not improve or who had suicidal thoughts were referred to trained supervisors for reassessment and care adjustment.',
      ],
      trailingParagraphs: [
        'The 2016 cluster randomized clinical trial across 24 clinics found better symptom outcomes at six months for the intervention group than for enhanced usual care. That evidence supports the tested Zimbabwean model and population. It does not guarantee identical results after unapproved copying or use in a different population, system, or country.',
        'The current Friendship Bench organization describes its implementation as a structured, multi phase process that includes suitability review, agreements, training, pilot work, and collaboration. Its training manual is not publicly distributed. Learners should study design principles, not attempt to reproduce the treatment protocol.',
      ],
      noticeItems: [
        { label: 'What to notice', items: [
          'A trusted, accessible setting',
          'A defined psychological method',
          'Locally resonant language',
          'Trained and supervised lay providers',
          'A primary care connection',
          'Stepped referral when needs exceed the bench',
          'Research tied to a specific context',
        ]},
        { label: 'Questions that remain important in any adaptation', items: [
          'Who is comfortable speaking with an older provider, and who is not?',
          'How are confidentiality and privacy protected in a visible community setting?',
          'How are lay workers compensated, supported, and protected from overload?',
          'Which groups require a different format or provider?',
          'Who governs adaptation and owns participant data?',
        ]},
      ],
    },
    {
      sectionId: 'strongminds-case',
      heading: '5. Case study: StrongMinds',
      paragraphs: [
        'StrongMinds describes its current model as six sessions of structured group talk therapy rooted in group interpersonal therapy. Lay counselors guide participants in understanding connections among depression, relationships, social roles, grief, conflict, and life changes.',
        'The organization works with public systems and community settings, including communities, schools, health services, and correctional facilities. Its model emphasizes group connection, emotional literacy, communication, problem solving, and continued support structures.',
        'Group interpersonal therapy has a wider evidence base, including a randomized trial in rural Uganda and a World Health Organization implementation manual. StrongMinds also publishes its own evaluations, control studies, and program reports. Learners should distinguish independent research on the underlying intervention from an organization\'s internal monitoring and outcome claims.',
      ],
      noticeItems: [
        { label: 'What to notice', items: [
          'A defined treatment focus on depression',
          'A structured group format',
          'Lay facilitation',
          'Relationships as both a source of strain and recovery',
          'A lower cost shared format',
          'Government and institutional integration',
          'Ongoing refinement and evaluation',
        ]},
        { label: 'Questions that remain important', items: [
          'Who is screened in or referred elsewhere?',
          'How is confidentiality discussed in a group?',
          'What support is available if conflict or danger is disclosed?',
          'Who can attend safely and practically?',
          'How are facilitators supervised and compensated?',
          'Do women, men, adolescents, displaced people, and people with disabilities need different adaptations?',
        ]},
      ],
    },
    {
      sectionId: 'brother-be-well-case',
      heading: '6. Case study: Brother Be Well',
      paragraphs: [
        'Brother Be Well is a United States based multimedia platform produced by Mental Health California. It focuses on culturally affirming behavioral health education, awareness, prevention and early intervention for boys and men of color, including people who identify as LGBTQIA+ within those communities.',
        'Its public resources include videos, podcasts, articles, courses, roadmaps, classroom tools, family resources, discussions with clinicians and community members, and pathways toward care.',
        'Brother Be Well should not be described as a therapy model comparable to Friendship Bench or StrongMinds. Its primary contribution in this comparison is an education and engagement design:',
      ],
      numberedItems: [
        'A clearly identified audience',
        'Culturally affirming language and representation',
        'Multiple media formats',
        'Youth and community discussion tools',
        'Prevention and early intervention content',
        'Options for classrooms, families, individuals, and groups',
        'Links between awareness, conversation, and care seeking',
      ],
      noticeItems: [
        { label: 'Questions that remain important', items: [
          'Who has reliable internet, data, devices, privacy, and digital literacy?',
          'How are users connected from education to actual services?',
          'How is content reviewed and updated?',
          'How are youth voices included in governance and evaluation?',
          'What offline or low bandwidth alternatives are available?',
        ]},
      ],
    },
    {
      sectionId: 'compare-functions',
      heading: '7. Compare functions before comparing results',
      paragraphs: [
        'The three models should not be ranked through one simple outcome measure.',
        'Friendship Bench and StrongMinds deliver structured psychological interventions. Brother Be Well primarily provides education, prevention, early intervention, discussion tools, and pathways to care.',
        'A fair comparison asks:',
      ],
      numberedItems: [
        'What outcome is the program responsible for?',
        'Which population and setting does the evidence cover?',
        'What type of evidence is available?',
        'What risks arise from the delivery method?',
        'Which resources and systems make the program possible?',
      ],
      trailingParagraphs: [
        'Website reach, therapy completion, symptom change, referral success, knowledge gain, stigma reduction, and participant trust are different measures. They should not be collapsed into one score.',
      ],
    },
    {
      sectionId: 'cultural-fit-design',
      heading: '8. Cultural fit is a design process',
      paragraphs: [
        'Cultural fit is more than translating words or placing a program in an African community.',
        'It may require:',
      ],
      numberedItems: [
        'Local ways of naming distress, hope, relationships, and recovery',
        'Attention to language, faith, gender, age, disability, class, migration, and geography',
        'Community participation in problem definition and design',
        'Respect for confidentiality and local concerns about reputation',
        'Adaptation of examples, timing, location, and delivery format',
        'Testing whether participants feel respected and understood',
        'Willingness to revise the model when it excludes or harms',
      ],
      trailingParagraphs: [
        'Culture can strengthen care. It can also contain unequal power. Cultural respect does not require accepting stigma, coercion, abuse, exclusion, or unsafe secrecy.',
      ],
    },
    {
      sectionId: 'ubuntu-infrastructure',
      heading: '9. Ubuntu as infrastructure, not decoration',
      paragraphs: [
        'Ubuntu informed design can appear through:',
      ],
      numberedItems: [
        'Shared responsibility without forced disclosure',
        'Reciprocity rather than one directional extraction',
        'Dignity and humanness in every interaction',
        'Repair of relationships where safe and wanted',
        'Collective action on material conditions',
        'Community participation in governance',
        'Care for the people providing care',
      ],
      trailingParagraphs: [
        'Using the word Ubuntu in a program title is not enough. Learners should identify which structures make mutual care possible.',
      ],
    },
    {
      sectionId: 'minimum-safety',
      heading: '10. The minimum safety architecture',
      paragraphs: [
        'A community support initiative should identify:',
      ],
      subsections: [
        { heading: 'Scope', paragraphs: ['What the program does and does not do'] },
        { heading: 'People', paragraphs: ['Who participates and who delivers each task'] },
        { heading: 'Training', paragraphs: ['What knowledge and skill each role requires'] },
        { heading: 'Supervision', paragraphs: ['Who supports decisions and reviews quality'] },
        { heading: 'Safeguarding', paragraphs: ['How children and adults at risk are protected'] },
        { heading: 'Privacy', paragraphs: ['What information is collected, why, where it is stored, and who can access it'] },
        { heading: 'Referral', paragraphs: ['Where people go for clinical, social, legal, or urgent support'] },
        { heading: 'Emergency response', paragraphs: ['What happens when there is immediate danger'] },
        { heading: 'Worker care', paragraphs: ['Workload, compensation, debriefing, safety, and emotional support'] },
        { heading: 'Accountability', paragraphs: ['How participants can give feedback or report harm'] },
      ],
      trailingParagraphs: [
        'If these elements are missing, community trust may be used to hide unsafe practice.',
      ],
    },
    {
      sectionId: 'adapt-not-copy',
      heading: '11. Adapt principles, do not copy programs',
      paragraphs: [
        'Transferable principles may include:',
      ],
      numberedItems: [
        'Using accessible community settings',
        'Training trusted local people for bounded roles',
        'Connecting individual care with peer support',
        'Designing culturally and linguistically relevant media',
        'Providing several entry points',
        'Linking education and early support to referral',
        'Integrating with public systems',
        'Measuring both access and quality',
      ],
      subsections: [
        {
          heading: 'What should not be copied casually',
          paragraphs: [],
          numberedItems: [
            'Proprietary or restricted clinical manuals',
            'Screening or treatment protocols without required training',
            'Claims of effectiveness from another population',
            'Crisis procedures that do not match local services',
            'Branding, media, or curriculum without permission',
            'Volunteer labor assumptions',
          ],
        },
      ],
    },
  ],
  keyConcepts: [
    { term: 'Task sharing', definition: 'Delivery of defined health tasks by appropriately trained non specialists or general workers within a supported system of supervision, referral, and quality assurance.' },
    { term: 'Lay provider', definition: 'A person without specialist mental health credentials who is trained and supported to perform a defined role. The term does not mean unskilled or unsupervised.' },
    { term: 'Stepped care', definition: 'A coordinated approach that matches support intensity to need and allows movement to another level when needed.' },
    { term: 'Prevention and early intervention', definition: 'Efforts that reduce risk, strengthen protective factors, recognize concerns early, and connect people to timely support.' },
    { term: 'Cultural adaptation', definition: 'A structured process of changing language, examples, delivery, and program features to improve relevance, acceptability, safety, and effectiveness in a specific context.' },
    { term: 'Fidelity', definition: 'Delivery of the essential parts of an intervention as intended.' },
    { term: 'Community governance', definition: 'Meaningful community authority over priorities, decisions, accountability, resources, and data, not only participation as clients or volunteers.' },
    { term: 'Referral pathway', definition: 'A defined and usable route from one support setting to another, with appropriate consent, communication, follow up, and urgent response procedures.' },
  ],
  comparativeProgramSummaries: {
    heading: 'Comparative Program Summaries',
    programs: [
      {
        name: 'Friendship Bench',
        fields: [
          { label: 'Primary function', value: 'Structured psychological treatment and peer support' },
          { label: 'Original context', value: 'Zimbabwean primary care and community settings' },
          { label: 'Delivery', value: 'Trained and supervised lay health workers, widely associated with grandmothers' },
          { label: 'Core approach', value: 'Individual problem solving therapy, activity scheduling, optional peer support' },
          { label: 'Cultural design', value: 'Local language and concepts, trusted community providers, accessible setting' },
          { label: 'System connection', value: 'Primary care, supervision, and referral' },
          { label: 'Evidence note', value: 'A 2016 cluster randomized clinical trial supports the tested Harare model. Results should not be generalized without attention to population, setting, adaptation, and implementation quality.' },
        ],
      },
      {
        name: 'StrongMinds',
        fields: [
          { label: 'Primary function', value: 'Structured group treatment for depression' },
          { label: 'Context', value: 'African community and public system settings, with current work across several populations and institutions' },
          { label: 'Delivery', value: 'Trained lay counselors or facilitators' },
          { label: 'Core approach', value: 'Six session group interpersonal therapy model described by the organization' },
          { label: 'Cultural design', value: 'Group connection, locally adapted delivery, community and public system integration' },
          { label: 'System connection', value: 'Government, education, health, and other institutional settings' },
          { label: 'Evidence note', value: 'Group interpersonal therapy has independent evidence, including research in Uganda. StrongMinds also reports program evaluations and control studies that should be read with their methods and limitations.' },
        ],
      },
      {
        name: 'Brother Be Well',
        fields: [
          { label: 'Primary function', value: 'Behavioral health education, awareness, prevention, early intervention, discussion, and pathways toward care' },
          { label: 'Context', value: 'United States platform for boys and men of color, with tools for youth, families, classrooms, and communities' },
          { label: 'Delivery', value: 'Multimedia content featuring clinicians, adults, community voices, and youth' },
          { label: 'Core approach', value: 'Videos, podcasts, articles, courses, roadmaps, classroom tools, and facilitated discussion resources' },
          { label: 'Cultural design', value: 'Audience specific representation, language, identity, and media format' },
          { label: 'System connection', value: 'Schools, families, community groups, sponsors, and care information' },
          { label: 'Evidence note', value: 'Treat reach, engagement, knowledge, stigma, referral, and care linkage as relevant outcomes. Do not describe the platform as psychotherapy or assume clinical treatment effects.' },
        ],
      },
    ],
  },
  interactiveScenario: {
    scenarioId: 'tumaini-youth-wellness',
    title: 'The Tumaini Youth Wellness Pilot',
    prompt:
      'A county youth office plans a six month wellness pilot for young people ages 16 to 24. The draft proposes training ten volunteers during one weekend, asking them to screen participants for depression, lead therapy groups, respond to crises, and store participant stories in a shared spreadsheet. The plan has no clinical supervisor, safeguarding lead, referral agreement, transport support, worker compensation, or youth advisory group.',
    decisions: [
      {
        decisionId: 'scope',
        heading: 'Decision 1: Scope',
        prompt: 'What should the pilot\'s first scope be?',
        options: [
          'Keep screening, therapy, and crisis response because volunteers are trusted.',
          'Begin with culturally grounded education, facilitated discussion, navigation, and referral while qualified partners determine whether any clinical task sharing is feasible.',
          'Remove all mental health content and hold a general sports event.',
        ],
      },
      {
        decisionId: 'roles',
        heading: 'Decision 2: Roles',
        prompt: 'Which tasks may trained peer educators hold, and which require qualified professionals?',
        options: [
          'Let every volunteer choose the tasks they feel comfortable performing.',
          'Create written role boundaries, selection criteria, training, competency checks, supervision, and escalation procedures.',
          'Ask one volunteer to carry all difficult cases privately.',
        ],
      },
      {
        decisionId: 'safety',
        heading: 'Decision 3: Safety and referral',
        prompt: 'What safety and referral structure is required before launch?',
        options: [
          'Tell volunteers to use personal judgment if a participant may be in danger.',
          'Establish safeguarding, confidentiality, referral, emergency, consent, and documentation procedures with qualified local partners before enrollment.',
          'Promise absolute confidentiality in every circumstance.',
        ],
      },
      {
        decisionId: 'access',
        heading: 'Decision 4: Access and community authority',
        prompt: 'How should access, culture, language, and youth authority shape delivery?',
        options: [
          'Translate a foreign program name and keep the rest unchanged.',
          'Form a paid youth advisory group, consult families and local providers, test language and formats, offer offline access, and document how feedback changes the pilot.',
          'Invite youth to promote the program after all decisions are final.',
        ],
      },
      {
        decisionId: 'evaluation',
        heading: 'Decision 5: Evaluation',
        prompt: 'What should the pilot measure?',
        options: [
          'Count social media views as proof that mental health improved.',
          'Match measures to scope, such as reach, participation, knowledge, trust, referral completion, access barriers, adverse events, equity, and worker experience.',
          'Collect detailed trauma stories because emotional content attracts funders.',
        ],
      },
    ],
    summaryHeadings: [
      'Scope',
      'Roles',
      'Safety and referral',
      'Access and community authority',
      'Evaluation',
    ],
    finalDesignMessage:
      'A safe pilot does not need to perform every mental health function. It needs a clear purpose, roles that match competence, qualified support, real referral options, community authority, and measures that match its responsibility.',
  },
  careDesignLab: {
    eyebrow: 'MODULE 4 APPLIED ACTIVITY',
    title: 'CARE Community Support Design Lab',
    subtitle: 'Build a bounded, connected, and culturally grounded fictional initiative',
    course: 'Mental Health, Community and Culture',
    module: 'Community Healing in Practice',
    suggestedTime: '40 to 60 minutes',
    submission: 'Private or facilitator reviewed; personal disclosure is not required',
    howToUse: [
      'Choose a fictional or composite community and a specific support gap.',
      'Study the transferable principles and boundaries from the three program cases.',
      'Complete the four CARE sections.',
      'Test the design against access, safety, equity, workforce, and evidence questions.',
      'Finish with a ninety day preparation plan and plain language concept summary.',
    ],
    privacy: {
      heading: 'CHOOSE YOUR PRIVACY LEVEL',
      notice: 'Complete this lab for a fictional or composite community. Do not include diagnoses, trauma histories, names, addresses, locally identifiable information, or other sensitive details. This is an educational activity and does not assess anyone\'s diagnosis or treatment needs.',
    },
    careExplanation: {
      heading: 'What CARE means',
      sections: [
        {
          letter: 'C',
          name: 'Community and purpose',
          items: [
            'Define the population, setting, need, strengths, language, and desired function.',
            'State whether the initiative provides promotion, prevention, early intervention, navigation, peer support, treatment, or referral.',
            'Identify who has decision making authority.',
          ],
        },
        {
          letter: 'A',
          name: 'Access and approach',
          items: [
            'Choose locations, schedules, media, and formats.',
            'Address language, disability, transport, cost, data, device access, privacy, gender, age, and trust.',
            'Name which elements draw from Ubuntu, Friendship Bench, StrongMinds, or Brother Be Well.',
          ],
        },
        {
          letter: 'R',
          name: 'Roles, referral, and risk',
          items: [
            'Define each role and its limits.',
            'Identify training, competency, supervision, safeguarding, privacy, and worker support.',
            'Map clinical, social, legal, protection, and urgent referral pathways.',
          ],
        },
        {
          letter: 'E',
          name: 'Evidence, ethics, equity, and evaluation',
          items: [
            'State the evidence level for each borrowed principle.',
            'Identify permissions, legal review, and ethical concerns.',
            'Choose measures for reach, quality, access, safety, equity, referral, and participant experience.',
            'Name one possible unintended harm and a correction plan.',
          ],
        },
      ],
    },
    step1Setting: {
      heading: 'Step 1: Select a Fictional Setting',
      fields: [
        { id: 'setting', label: 'SETTING', prompt: 'Describe the fictional location, institution, and community.' },
        { id: 'population', label: 'POPULATION', prompt: 'Who is the initiative intended to serve, and who might still be excluded?' },
        { id: 'supportGap', label: 'SUPPORT GAP', prompt: 'What is missing now, and what evidence or community input suggests the need?' },
      ],
    },
    step2Principles: {
      heading: 'Step 2: Learn Without Copying',
      cards: [
        {
          name: 'Friendship Bench principle card',
          evidenceNote: 'The 2016 trial supports the model as studied in Harare. A new adaptation needs its own design and evaluation.',
          transferPrompt: 'Which Friendship Bench principle might fit your setting, and what must exist before it is used?',
        },
        {
          name: 'StrongMinds principle card',
          evidenceNote: 'Group interpersonal therapy has independent evidence. StrongMinds program claims must still be read with their methods.',
          transferPrompt: 'Which StrongMinds principle might fit your setting, and what must exist before it is used?',
        },
        {
          name: 'Brother Be Well principle card',
          evidenceNote: 'Use education, engagement, knowledge, trust, and care linkage measures. Do not describe the platform as psychotherapy.',
          transferPrompt: 'Which Brother Be Well design principle might fit your setting, and what must exist before it is used?',
        },
      ],
    },
    sectionC: {
      heading: 'C. Community and Purpose',
      fields: [
        { id: 'oneSentencePurpose', label: 'ONE SENTENCE PURPOSE', prompt: 'What will the initiative help a specific population do?' },
        { id: 'functions', label: 'FUNCTIONS', prompt: 'Which functions will it provide? Which functions will it explicitly not provide?' },
        { id: 'communityStrengths', label: 'COMMUNITY STRENGTHS', prompt: 'What relationships, languages, places, practices, and institutions already support care?' },
        { id: 'authority', label: 'AUTHORITY', prompt: 'Who will define priorities, approve changes, control resources, govern data, and receive credit?' },
        { id: 'ubuntuInStructure', label: 'UBUNTU IN STRUCTURE', prompt: 'How will dignity, reciprocity, shared responsibility, and worker care appear in decisions and resources?' },
      ],
    },
    sectionA: {
      heading: 'A. Access and Approach',
      fields: [
        { id: 'entryPoints', label: 'ENTRY POINTS', prompt: 'Where and how may participants first encounter the initiative?' },
        { id: 'formats', label: 'FORMATS', prompt: 'Choose media, individual, group, family, school, clinic, or community formats and explain why.' },
        { id: 'adaptations', label: 'ADAPTATIONS', prompt: 'Name at least four changes for language, culture, disability, gender, age, location, or digital access.' },
        { id: 'choice', label: 'CHOICE', prompt: 'What meaningful options will participants have?' },
      ],
    },
    sectionR: {
      heading: 'R. Roles, Referral, and Risk',
      rolesLabel: 'YOUR ROLES',
      rolesPrompt: 'List each role, its allowed tasks, limits, training, supervision, and compensation.',
      pathwayHeading: 'Support and Referral Pathway',
      pathwaySteps: [
        { label: 'Entry', prompt: 'where a participant begins' },
        { label: 'Education or support', prompt: 'what the initiative provides' },
        { label: 'Routine referral', prompt: 'clinical, social, legal, protection, or practical support' },
        { label: 'Follow up', prompt: 'how consented connection is checked' },
        { label: 'Urgent response', prompt: 'what happens during immediate danger' },
      ],
      localPathwayLabel: 'LOCAL PATHWAY',
      localPathwayPrompt: 'Name the responsible role and actual destination at each step.',
      privacyLabel: 'PRIVACY AND SAFEGUARDING',
      privacyPrompt: 'What is collected, where is it stored, who may access it, and what safety limits are explained?',
      workerCareLabel: 'WORKER CARE',
      workerCarePrompt: 'How will workload, compensation, debriefing, safety, supervision, and emotional support be funded?',
    },
    sectionE: {
      heading: 'E. Evidence, Ethics, Equity, and Evaluation',
      fields: [
        { id: 'evidenceStatement', label: 'EVIDENCE STATEMENT', prompt: 'For each borrowed principle, state what evidence supports it and what remains unknown in your setting.' },
        { id: 'permissionsEthics', label: 'PERMISSIONS AND ETHICS', prompt: 'What manuals, media, branding, data practices, research activities, or clinical tasks require permission or review?' },
        { id: 'equityCheck', label: 'EQUITY CHECK', prompt: 'Who benefits, who may be excluded, who carries labor, and who holds authority?' },
      ],
      pilotMeasuresHeading: 'Pilot Measures',
      pilotMeasuresPrompt: 'Choose four measures for reach, quality, access, safety, equity, referral, and participant experience.',
    },
    redTeam: {
      heading: 'Red Team the Design',
      instruction: 'Assume the initiative has launched. Identify one response for each test. Do not defend the original plan. Use the test to improve it.',
      fields: [
        { id: 'mostSeriousRisk', label: 'MOST SERIOUS RISK', prompt: 'What harm is most plausible, and who would experience it?' },
        { id: 'correction', label: 'CORRECTION', prompt: 'What design, funding, role, or policy change would reduce that risk?' },
        { id: 'stopRule', label: 'STOP RULE', prompt: 'What event would pause enrollment or end the pilot until safety is restored?' },
      ],
    },
    ninetyDayPlan: {
      heading: 'Ninety Day Preparation Plan',
      day90Label: 'DAY 90 DECISION',
      day90Prompt: 'What must be true before a small pilot may begin?',
    },
    plainLanguageSummary: {
      heading: 'Plain Language Concept Summary',
      fields: [
        { id: 'name', label: 'NAME', prompt: 'Use an original working name that does not copy another program\'s brand.' },
        { id: 'purpose', label: 'PURPOSE', prompt: 'In one sentence, what does the initiative help people do?' },
        { id: 'whatParticipantsReceive', label: 'WHAT PARTICIPANTS RECEIVE', prompt: 'Describe activities and access without overstating effectiveness.' },
        { id: 'whatItDoesNotProvide', label: 'WHAT IT DOES NOT PROVIDE', prompt: 'State limits clearly, including any clinical functions outside scope.' },
        { id: 'howCareConnects', label: 'HOW CARE CONNECTS', prompt: 'Explain supervision, referral, urgent response, and follow up.' },
        { id: 'whyItFits', label: 'WHY IT FITS', prompt: 'Name local input, Ubuntu values, access adaptations, and program principles used.' },
      ],
    },
    completionCheck: {
      heading: 'Completion Checklist',
      items: [
        'Used a fictional or composite community',
        'Defined one population, setting, support gap, and purpose',
        'Separated education, peer support, treatment, referral, and urgent response',
        'Applied at least two transferable principles and named what cannot be copied',
        'Defined roles, limits, training, supervision, compensation, and worker care',
        'Mapped safeguarding, privacy, referral, urgent response, and accountability',
        'Addressed access, equity, evaluation measures, possible harms, and a stop rule',
        'Completed the ninety day preparation plan and plain language concept summary',
      ],
    },
    finalReminder:
      'This lab is an educational design exercise. It does not certify, authorize, or clinically validate any program. Do not implement a real initiative without qualified supervision, legal review, community governance, and appropriate permissions.',
  },
  privateReflection: {
    heading: 'Private Reflection',
    prompt: 'Which community support principle feels most transferable to a setting you know: accessible location, trusted relationships, group connection, culturally affirming media, public system integration, or clear referral? What conditions would need to exist before that principle could be used responsibly?',
    privacyNotice: 'Keep this reflection private unless you freely choose to share it. Do not enter names, diagnoses, trauma details, treatment history, health information, or other sensitive information in a public form. You may write about a fictional setting.',
  },
  knowledgeCheck: {
    heading: 'MODULE 4 KNOWLEDGE CHECK',
    subtitle: 'Community Healing in Practice',
    learnerInstruction: 'Answer every question. Select one answer per question. Answer at least four of the five questions correctly to pass. This learner copy does not include answers.',
    privacyNotice: 'This assessment checks understanding of course concepts. It does not ask for personal mental health information and does not evaluate anyone\'s health or diagnosis.',
    passingScore: 4,
    questions: [
      {
        id: 'm4-q1',
        prompt: 'Which statement best defines safe mental health task sharing?',
        options: [
          'Any trusted community member may provide therapy after a short orientation.',
          'Specialists transfer all responsibility to volunteers.',
          'Trained non specialists perform defined tasks with competency standards, supervision, referral, and quality support.',
          'Community education and clinical treatment are the same service.',
        ],
        correctAnswerIndex: 2,
        feedback: 'Task sharing expands a supported team. It requires defined tasks, training, competency, supervision, referral, and quality assurance. Trust alone does not establish a clinical role.',
      },
      {
        id: 'm4-q2',
        prompt: 'Which comparison is most accurate?',
        options: [
          'All three programs provide the same form of psychotherapy.',
          'Friendship Bench and StrongMinds provide structured psychological interventions, while Brother Be Well primarily provides education, prevention, early intervention, discussion tools, and pathways to care.',
          'Brother Be Well is a Zimbabwean primary care treatment program.',
          'StrongMinds is only a social media awareness campaign.',
        ],
        correctAnswerIndex: 1,
        feedback: 'The models have different functions. A fair comparison begins by identifying whether a program provides treatment, prevention, education, peer support, referral, or another service.',
      },
      {
        id: 'm4-q3',
        prompt: 'What can the 2016 Friendship Bench trial support most directly?',
        options: [
          'Every program using a bench will produce the same outcomes.',
          'Grandmothers can replace all mental health professionals in every country.',
          'The tested, supervised Zimbabwean intervention improved outcomes compared with enhanced usual care in the study population and setting.',
          'Cultural adaptation is unnecessary when an intervention has one successful trial.',
        ],
        correctAnswerIndex: 2,
        feedback: 'Evidence applies first to the intervention, population, setting, comparison, and implementation studied. New adaptations require their own careful design and evaluation.',
      },
      {
        id: 'm4-q4',
        prompt: 'A youth group wants to adapt ideas from all three programs. What is the safest first decision?',
        options: [
          'Copy a restricted therapy manual and ask volunteers to begin treatment.',
          'Define a bounded educational and navigation role, involve youth in governance, and build qualified supervision and referral before considering clinical tasks.',
          'Promise absolute confidentiality even during immediate danger.',
          'Measure only video views and call the pilot effective.',
        ],
        correctAnswerIndex: 1,
        feedback: 'A bounded first phase can combine culturally affirming education, community participation, and navigation without assigning clinical tasks before the required system is ready.',
      },
      {
        id: 'm4-q5',
        prompt: 'Which program design best reflects Ubuntu informed care and safe implementation?',
        options: [
          'Unpaid peers carry unlimited cases because mutual care should be selfless.',
          'A visiting organization makes every decision and uses community members only for recruitment.',
          'Participants and local partners share authority, workers have defined and supported roles, care pathways are connected, and the program measures access, quality, equity, and harm.',
          'The program uses the word Ubuntu but has no privacy, referral, or accountability process.',
        ],
        correctAnswerIndex: 2,
        feedback: 'Ubuntu informed care should appear in relationships and structures, including dignity, reciprocity, shared authority, worker care, connected support, and accountability.',
      },
    ],
  },
  closing: {
    heading: 'MODULE 4 CLOSING',
    paragraphs: [
      'Community care is not a shortcut around quality. It is a way to place care closer to people\'s lives while building the relationships, roles, systems, and accountability that make support usable.',
      'Friendship Bench demonstrates the value of locally developed language, trusted lay providers, primary care connection, structured methods, supervision, and referral. StrongMinds demonstrates the value of group connection, a defined depression intervention, lay facilitation, and public system integration. Brother Be Well demonstrates the value of audience specific media, prevention and early intervention, discussion tools, and culturally affirming pathways toward care.',
      'The transferable lesson is not to copy a bench, a circle, or a platform. It is to define the need with the community, match each task to competence, support the workforce, connect every level of care, protect rights, and test whether the design works for the people it is intended to serve.',
    ],
    transition: 'Module 5 will examine faith, tradition, professional care, spiritual support, and clinical pathways.',
    finalDisclaimer: 'This course provides general educational information. It does not provide diagnosis, therapy, medical treatment, program certification, or emergency support. Do not use this module to copy or deliver a clinical intervention without the required permissions, training, supervision, legal review, and referral systems. If someone is in immediate danger, contact local emergency services.',
  },
  completionRequirements: {
    heading: 'MODULE 4 COMPLETION REQUIREMENTS',
    items: [
      'Review both required videos or written alternatives.',
      'Complete all five Tumaini Youth Wellness decisions.',
      'Complete the CARE Community Support Design Lab.',
      'Complete or privately consider the reflection.',
      'Submit all five knowledge check questions.',
      'Answer at least four of five questions correctly.',
    ],
  },
  optionalExtendedAssignment: {
    label: 'Optional extended academic track',
    heading: 'From Model to Context: A Comparative Adaptation Brief',
    instruction: 'Prepare an 800 to 1,200 word brief for a fictional local institution.',
    requirements: [
      'Define a specific population, setting, and unmet need.',
      'Compare Friendship Bench, StrongMinds, and Brother Be Well by function, delivery, cultural fit, evidence, safeguards, referral, access, and sustainability.',
      'Select two or three transferable principles and explain why they fit the context.',
      'Identify what cannot be copied without permission, training, professional oversight, or new evidence.',
      'Propose community governance and worker compensation.',
      'Provide a stepped support and referral pathway.',
      'Include four pilot measures and two possible harms.',
      'Cite at least four credible sources, including one program source and one independent or intergovernmental source.',
    ],
    personalDisclosure: 'Do not ask learners to diagnose participants, design a therapy protocol, or disclose personal mental health information. Personal disclosure is not required.',
  },
  sourcesFurtherLearning: {
    heading: 'Sources and further learning',
    groups: [
      {
        heading: 'Friendship Bench',
        items: [
          { citation: 'Chibanda, D., Weiss, H. A., Verhey, R., et al. "Effect of a Primary Care Based Psychological Intervention on Symptoms of Common Mental Disorders in Zimbabwe: A Randomized Clinical Trial." JAMA, 2016.', url: 'https://doi.org/10.1001/jama.2016.19102' },
          { citation: 'Friendship Bench Zimbabwe. "Implementation."', url: 'https://www.friendshipbenchzimbabwe.org/collaboration1' },
          { citation: 'Friendship Bench Zimbabwe. "Problem Solving Therapy."', url: 'https://www.friendshipbenchzimbabwe.org/problemsolvingtherapy' },
          { citation: 'Chibanda, D. "Why I Train Grandmothers to Treat Depression." TED.', url: 'https://www.youtube.com/watch?v=Cprp_EjVtwA' },
        ],
      },
      {
        heading: 'StrongMinds and group interpersonal therapy',
        items: [
          { citation: 'StrongMinds. "Depression Treatment."', url: 'https://strongminds.org/depression-treatment/' },
          { citation: 'StrongMinds. "Research and Policy Briefs."', url: 'https://strongminds.org/research-and-policy-briefs/' },
          { citation: 'StrongMinds. "Treating Depression at Scale in Africa."', url: 'https://strongminds.org/strongminds-treating-depression-at-scale-in-africa/' },
          { citation: 'Bolton, P., Bass, J., Neugebauer, R., et al. "Group Interpersonal Psychotherapy for Depression in Rural Uganda: A Randomized Controlled Trial." JAMA, 2003.', url: 'https://pubmed.ncbi.nlm.nih.gov/12813117/' },
          { citation: 'World Health Organization. "Group Interpersonal Therapy for Depression." 2016.', url: 'https://www.who.int/publications/i/item/WHO-MSD-MER-16.4' },
        ],
      },
      {
        heading: 'Brother Be Well',
        items: [
          { citation: 'Brother Be Well. "Overview."', url: 'https://brotherbewell.com/' },
          { citation: 'Brother Be Well. "Into the Classroom."', url: 'https://brotherbewell.com/into-the-classroom/' },
          { citation: 'Brother Be Well. "Explainer Video."', url: 'https://www.youtube.com/watch?v=65Pbu4D6vVY' },
        ],
      },
      {
        heading: 'Implementation and system design',
        items: [
          { citation: 'World Health Organization. "Psychological Interventions Implementation Manual: Integrating Evidence Based Psychological Interventions into Existing Services." 2024.', url: 'https://www.who.int/publications/i/item/9789240087149' },
          { citation: 'World Health Organization. "World Mental Health Report: Transforming Mental Health for All." 2022.', url: 'https://www.who.int/teams/mental-health-and-substance-use/world-mental-health-report' },
          { citation: 'World Health Organization. "Mental Health." Fact sheet, 2025.', url: 'https://www.who.int/news-room/fact-sheets/detail/mental-health-strengthening-our-response' },
        ],
      },
    ],
    reviewNote: 'Sources reviewed July 2026. Program descriptions and delivery details may change. Recheck official program pages before public release.',
    evidenceAttributionNotes: {
      heading: 'Evidence and editorial notes',
      items: [
        'Do not describe all three programs as treatment programs.',
        'Do not claim that Brother Be Well has clinical treatment outcomes unless a specific study supports that claim.',
        'Distinguish Friendship Bench trial evidence from current organization wide reach or implementation claims.',
        'Distinguish independent group interpersonal therapy evidence from StrongMinds internal monitoring and evaluations.',
        'Do not state that a successful trial guarantees results in a different population or country.',
        'Do not romanticize grandmothers, women, peers, or volunteers as naturally limitless caregivers.',
        'Include compensation, workload, supervision, and provider wellbeing in every implementation discussion.',
        'Do not treat African communities as culturally uniform.',
        'Do not use "community led" unless governance and decision making authority support that description.',
        'Do not copy restricted manuals, branding, curriculum, or media.',
        'Brother Be Well is a learning example. Tamu Academy does not claim a formal partnership.',
      ],
    },
  },
  progressTracking: {
    label: 'Module 4 progress',
    heading: 'Complete Module 4',
    privacyNote: 'Only completion status is saved. Your CARE lab, reflection, scenario, and knowledge check responses are not stored.',
    markCompleteLabel: 'Mark complete',
    completedLabel: 'Completed',
    savingLabel: 'Saving...',
    completeModuleLabel: 'Complete Module 4',
    incompleteMessage: 'Complete all six requirements before completing Module 4.',
    completedMessage: 'Module 4 is complete.',
    unavailableMessage: 'Progress saving is unavailable while this module is in administrator preview.',
    errorMessage: 'We could not save your progress. Please try again.',
  },
};

/**
 * PROTECTED SCENARIO ANSWER KEY (Module 4) — server-side-only.
 *
 * The Tumaini Youth Wellness scenario has five sequential decisions, each
 * with three options. The feedbackByOption array for each decision is
 * indexed by the submitted option's zero-based index. Only the feedback
 * for the submitted option is returned by checkMentalHealthScenario.
 *
 * This constant is NEVER imported by any src/ file, NEVER returned by
 * getMentalHealthModule, and NEVER embedded in any browser bundle.
 */
export const MENTAL_HEALTH_MODULE_4_SCENARIO_ANSWERS = {
  'tumaini-youth-wellness': {
    decisionsCount: 5,
    decisions: [
      {
        decisionId: 'scope',
        optionsCount: 3,
        feedbackByOption: [
          'Trust matters, but it does not establish clinical competence, legal authority, supervision, or crisis capacity.',
          'This creates a bounded first phase and separates educational roles from clinical roles.',
          'Avoidance may reduce immediate responsibility, but it does not respond to the stated need.',
        ],
      },
      {
        decisionId: 'roles',
        optionsCount: 3,
        feedbackByOption: [
          'Personal comfort is not a competency standard.',
          'Defined roles and support are core requirements for safe task sharing.',
          'This creates unsafe concentration of responsibility and worker burden.',
        ],
      },
      {
        decisionId: 'safety',
        optionsCount: 3,
        feedbackByOption: [
          'Urgent decisions require clear, locally usable procedures and qualified support.',
          'Safety architecture must exist before inviting disclosure or need.',
          'Programs should explain privacy honestly, including any lawful and ethical safety limits.',
        ],
      },
      {
        decisionId: 'access',
        optionsCount: 3,
        feedbackByOption: [
          'Translation alone is not cultural adaptation or community governance.',
          'This combines participation, adaptation, practical access, and accountability.',
          'Promotion is not the same as decision making authority.',
        ],
      },
      {
        decisionId: 'evaluation',
        optionsCount: 3,
        feedbackByOption: [
          'Reach does not establish knowledge, referral, care access, safety, or health outcomes.',
          'The evaluation should test what the pilot is responsible for and identify harm or exclusion.',
          'Extractive storytelling can violate privacy and dignity and is not a substitute for evaluation.',
        ],
      },
    ],
  },
};

/**
 * MODULE 4 COMPLETION KEYS — server-side-only.
 *
 * The six approved Module 4 completion requirement identifiers, in the
 * approved order. They correspond one-to-one to the six existing
 * completion requirement strings in lesson.completionRequirements.items.
 *
 *   core-media-reviewed         -> core_media_acknowledged_at
 *   tumaini-scenario           -> interactive_scenario_completed_at
 *   care-design-lab            -> activity_acknowledged_at
 *   private-reflection         -> reflection_acknowledged_at
 *   knowledge-check-completed  -> knowledge_check_completed_at
 *   knowledge-check-passed     -> quiz_passed
 *
 * The three self-attestable keys (core-media-reviewed, care-design-lab,
 * private-reflection) may be marked through the general
 * updateMentalHealthProgress function. The three server-verified keys
 * (tumaini-scenario, knowledge-check-completed, knowledge-check-passed)
 * are recorded only by checkMentalHealthScenario and
 * checkMentalHealthKnowledgeCheck after valid submissions.
 *
 * Module 4 does NOT use lesson_and_case_reviewed_at. There is no
 * separate lesson and cases completion requirement.
 */
export const MENTAL_HEALTH_MODULE_4_COMPLETION_KEYS = [
  'core-media-reviewed',
  'tumaini-scenario',
  'care-design-lab',
  'private-reflection',
  'knowledge-check-completed',
  'knowledge-check-passed',
];

export const MENTAL_HEALTH_MODULE_4_SELF_ATTESTED_KEYS = new Set([
  'core-media-reviewed',
  'care-design-lab',
  'private-reflection',
]);

const MODULE_4_KEY_TO_FIELD = {
  'core-media-reviewed': 'core_media_acknowledged_at',
  'tumaini-scenario': 'interactive_scenario_completed_at',
  'care-design-lab': 'activity_acknowledged_at',
  'private-reflection': 'reflection_acknowledged_at',
  'knowledge-check-completed': 'knowledge_check_completed_at',
  'knowledge-check-passed': 'quiz_passed',
};

export function isModule4CompletionKey(key) {
  return MENTAL_HEALTH_MODULE_4_COMPLETION_KEYS.includes(key);
}

export function isModule4SelfAttestedKey(key) {
  return MENTAL_HEALTH_MODULE_4_SELF_ATTESTED_KEYS.has(key);
}

export function getModule4CompletionField(key) {
  return MODULE_4_KEY_TO_FIELD[key] || null;
}

export function deriveModule4CompletedKeys(row) {
  if (!row) return [];
  const keys = [];
  if (row.core_media_acknowledged_at) keys.push('core-media-reviewed');
  if (row.interactive_scenario_completed_at) keys.push('tumaini-scenario');
  if (row.activity_acknowledged_at) keys.push('care-design-lab');
  if (row.reflection_acknowledged_at) keys.push('private-reflection');
  if (row.knowledge_check_completed_at) keys.push('knowledge-check-completed');
  if (row.quiz_passed) keys.push('knowledge-check-passed');
  return keys;
}