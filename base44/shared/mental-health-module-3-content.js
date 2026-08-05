/**
 * MODULE 3 LESSON CONTENT — server-side-only.
 *
 * Authoritative source: Tamu-Academy-MH-Module-3-Base44-Content-Pack.md
 * and the supplied Learner Guide, BRIDGE Conversation Lab, and Knowledge
 * Check documents.
 *
 * This file is imported ONLY by base44/shared/mental-health-curriculum.js.
 * It MUST NEVER be imported by any file in src/.
 *
 * SAFETY STANDARD: Never store personal reflections, role play text,
 * family disclosures, diagnoses, trauma narratives, abuse information,
 * immigration details, or any other sensitive mental health information.
 *
 * The knowledge check answer key (correctAnswerIndex + feedback) is
 * stripped from each question before the lesson is returned to the
 * browser by getMentalHealthModuleContent. Grading and feedback release
 * happen only in the checkMentalHealthKnowledgeCheck backend function.
 */

export const MENTAL_HEALTH_MODULE_3_LESSON = {
  moduleOverview: {
    paragraphs: [
      'Families often teach the first language people use for emotion, responsibility, suffering, faith, privacy, and help. Those lessons can offer belonging and protection. They can also make certain experiences hard to name.',
      'This module examines how family roles, hierarchy, gender expectations, migration, caregiving, faith, privacy, honor, trust, and access to care can shape mental health conversations in different African and diaspora settings. Learners distinguish cultural scripts from stereotypes and practice beginning, receiving, and repairing a difficult conversation without diagnosing, humiliating, or forcing disclosure.',
    ],
    competency:
      'By the end of this module, learners should be able to plan a culturally humble family mental health conversation that respects dignity, privacy, agency, family values, and safety, while identifying when practical, professional, safeguarding, or urgent support is also required.',
  },
  learningObjectives: {
    objectives: [
      'Describe how family roles, hierarchy, gender expectations, migration, caregiving, faith, privacy, and honor can shape mental health conversations in different African and diaspora settings.',
      'Distinguish a cultural script from a stereotype and identify both the protective purpose and possible cost of a repeated family message.',
      'Explain how language, power, trust, service access, and intergenerational experience can create barriers to discussing distress.',
      'Use culturally humble strategies to begin, receive, and continue a family mental health conversation without diagnosing, humiliating, or forcing disclosure.',
      'Apply the BRIDGE conversation framework to a fictional family situation and identify when family dialogue must be supplemented by qualified or urgent support.',
    ],
    earlyDisclaimer:
      'This course provides general educational information. It does not provide diagnosis, therapy, medical treatment, or emergency support. Learners seeking personal mental health assistance should contact an appropriately qualified professional or relevant local service. If someone is in immediate danger, contact local emergency services.',
  },
  fictionalSituationReminder:
    'Use a fictional or composite situation. You do not need to disclose personal experiences, diagnoses, trauma, abuse, immigration information, faith, treatment history, or private family circumstances.',
  rolePlaySafetyWarning:
    'Do not role play personal trauma, abuse, self harm, violence, a crisis, or a conversation that could place someone at risk. No learner is required to perform, disclose, or act as a therapist. Written completion must be available.',
  coreMedia: {
    attributionStatement:
      'These independently produced videos are included as learning resources. Their speakers, publisher, producer, and sponsors are not Tamu Academy instructors, employees, or partners. Inclusion does not imply a formal partnership, endorsement, or clinical review by Tamu Academy.',
    primary: {
      title: 'Talking With Children About Mental Health, Part 1',
      speaker: 'Michael P. Coleman and Christian Jacobs, MFT',
      publisher: 'Brother Be Well / Mental Health California',
      watchUrl: 'https://www.youtube.com/watch?v=Up3jFSG1p6E',
      embedUrl: 'https://www.youtube-nocookie.com/embed/Up3jFSG1p6E',
      officialPageUrl: 'https://www.youtube.com/watch?v=Up3jFSG1p6E',
      officialPageLabel: 'Watch Part 1 on the official YouTube channel',
      attributionLabel: 'Brother Be Well / Mental Health California',
      roleInModule: 'Practical communication approaches for involving young people and the wider family in mental health discussions.',
    },
    secondary: {
      title: 'Talking With Children About Mental Health, Part 2',
      speaker: 'Michael P. Coleman and Christian Jacobs, MFT',
      publisher: 'Brother Be Well / Mental Health California',
      watchUrl: 'https://www.youtube.com/watch?v=LIjskuW5xFc',
      embedUrl: 'https://www.youtube-nocookie.com/embed/LIjskuW5xFc',
      officialPageUrl: 'https://brotherbewell.com/talking-with-children-about-mental-health-part-2/',
      officialPageLabel: 'Open the official Brother Be Well page for Part 2',
      attributionLabel: 'Brother Be Well / Mental Health California',
      roleInModule: 'Continuation of practical communication approaches for family mental health discussions.',
    },
  },
  optionalFamilyDiaries: {
    heading: 'Optional Lived Conversation',
    title: 'African Parents Speak to a Therapist',
    publisher: 'Family Diaries',
    format: 'Podcast and video conversation',
    published: 'November 2025',
    watchUrl: 'https://www.youtube.com/watch?v=doNhw9hqSTg',
    roleInModule: 'An intergenerational discussion of emotion, vulnerability, gender, and family communication.',
    note: 'This optional episode is a lived conversation, not population evidence or clinical guidance. Its participants do not represent all African parents, families, countries, faiths, or generations. Inclusion does not imply a formal relationship with Tamu Academy.',
    linkLabel: 'Watch the original Family Diaries episode on YouTube',
  },
  questionsToConsider: [
    'How do the speakers make a difficult subject feel discussable rather than shameful?',
    "Which techniques protect a young person's privacy, dignity, and growing autonomy?",
    'What assumptions might require adaptation in an African, migrant, multigenerational, or faith centered household?',
    'How can a parent or elder show authority and care without turning the conversation into an interrogation?',
    'What would make a support suggestion trustworthy and realistic where services are limited, distant, costly, or culturally unresponsive?',
  ],
  tamuIntroduction: {
    paragraphs: [
      'Families often teach the first language people use for emotion, responsibility, suffering, faith, privacy, and help. A person may learn that a good family member stays composed, honors elders, protects the family name, provides without complaint, keeps private matters inside the household, or turns first to prayer.',
      'Those lessons can carry care, dignity, survival, and social protection. They can also make certain experiences difficult to name. A family message may begin as a way to preserve unity and later become a rule that isolates someone or delays support.',
      'The goal of this module is not to replace family values with clinical vocabulary. It is to help learners understand the value beneath a family response, notice when a script creates silence or unequal power, and create a bridge toward honest conversation, practical support, and qualified care when needed.',
      'African countries and diaspora communities are diverse. Family communication differs within the same city, religion, language group, class, and generation. This module studies repeated messages without treating them as fixed traits of an entire group.',
    ],
  },
  explanation: [
    {
      sectionId: 'families-meaning-making-systems',
      heading: '1. Families are meaning making systems',
      paragraphs: [
        'A family does more than provide housing or kinship. It also teaches:',
      ],
      numberedItems: [
        'What emotions mean',
        'Which problems are private',
        'Who may speak first',
        'How respect is shown',
        'When outside help is acceptable',
        'What a good child, parent, elder, provider, spouse, or caregiver is expected to do',
      ],
      trailingParagraphs: [
        'These lessons change with class, religion, language, age, disability, gender, migration, conflict, urban or rural life, and the family\'s own history.',
      ],
    },
    {
      sectionId: 'cultural-scripts-not-stereotypes',
      heading: '2. Cultural scripts are not stereotypes',
      paragraphs: [
        'A cultural script is a repeated message about what someone in a social or family role should feel, say, hide, or do.',
        'A stereotype claims that every member of a group follows the same script.',
        'Examples of scripts that may appear in some families include:',
      ],
      numberedItems: [
        '"We handle problems inside the family."',
        '"A respectful child does not challenge an elder."',
        '"Prayer will carry us through."',
        '"A man provides and stays in control."',
        '"A good daughter keeps the family together."',
        '"We sacrificed so you could succeed."',
      ],
      trailingParagraphs: [
        'Each message may protect a value: privacy, solidarity, gratitude, faith, responsibility, family continuity, or protection from gossip or discrimination.',
        'Each may also create a cost: isolation, unequal caregiving, difficulty naming harm, fear of disappointing relatives, delayed outside support, shame about boundaries, or pressure to appear well.',
        'Ask four questions: What does the message protect? Who carries its burden? When does it stop helping? What support could preserve the value without preserving the harm?',
      ],
    },
    {
      sectionId: 'why-conversations-get-stuck',
      heading: '3. Why conversations get stuck',
      subsections: [
        {
          heading: 'Different vocabularies',
          paragraphs: [
            'One person may say depression or anxiety. Another may say exhaustion, pressure, spiritual struggle, grief, headaches, anger, thinking too much, or loss of direction.',
          ],
        },
        {
          heading: 'Fear of blame',
          paragraphs: [
            'A parent may hear a disclosure as an accusation that the family failed. A young person may expect correction instead of listening.',
          ],
        },
        {
          heading: 'Hierarchy and dependency',
          paragraphs: [
            'Age, money, housing, immigration status, caregiving, and authority can make disagreement risky.',
          ],
        },
        {
          heading: 'Privacy and reputation',
          paragraphs: [
            'Families may reasonably anticipate gossip, discrimination, lost opportunities, or public shame.',
          ],
        },
        {
          heading: 'Mistrust and poor access',
          paragraphs: [
            'A family may have experienced biased, unaffordable, distant, linguistically inaccessible, or low quality services.',
          ],
        },
        {
          heading: 'Generational experience',
          paragraphs: [
            'An elder may compare current distress with war, poverty, migration, racism, or sacrifices they survived. A young person may hear that comparison as dismissal.',
          ],
        },
        {
          heading: 'Caregiver strain',
          paragraphs: [
            'Parents and elders may themselves be overwhelmed, grieving, unwell, or unsupported.',
          ],
        },
      ],
      trailingParagraphs: [
        'These barriers help explain why a conversation can be hard. They do not excuse humiliation, violence, coercion, neglect, or unsafe secrecy.',
      ],
    },
    {
      sectionId: 'privacy-not-secrecy',
      heading: '4. Privacy is not the same as secrecy',
      paragraphs: [
        'Privacy gives a person reasonable control over personal information.',
        'Secrecy can become harmful when someone is pressured to conceal danger, abuse, severe distress, or a need for care in order to protect family reputation.',
        'Good practice includes:',
      ],
      numberedItems: [
        'Asking who the person is comfortable involving',
        'Asking what may be shared',
        'Avoiding an uncontrolled family announcement',
        'Explaining safety limits honestly',
        'Choosing the smallest appropriate circle of support',
        'Recognizing that consent and confidentiality rules vary by age and location',
      ],
    },
    {
      sectionId: 'cultural-humility-at-home',
      heading: '5. Cultural humility at home',
      paragraphs: [
        'Cultural humility is an ongoing practice of self reflection, learning, and attention to power. It is not a claim that someone has mastered another person\'s culture.',
        'Within a family, cultural humility includes:',
      ],
      numberedItems: [
        'Noticing assumptions about strength, obedience, privacy, gender, faith, and professional care',
        'Asking what a person\'s words mean to them',
        'Recognizing who controls money, transport, housing, information, and permission',
        'Treating disagreement as information rather than automatic disrespect',
        'Adapting support to language, identity, community, faith, safety, and available services',
      ],
      trailingParagraphs: [
        'People who share ancestry, language, religion, or a home can still experience culture differently.',
      ],
    },
    {
      sectionId: 'begin-with-experience',
      heading: '6. Begin with experience, not a label',
      paragraphs: [
        'Clinical terms can be useful, but they are not the only doorway into a serious conversation.',
        'Consider these shifts:',
      ],
      numberedItems: [
        'Instead of "You are depressed," try "I have noticed you are sleeping very little and missing things you usually care about."',
        'Instead of "You need therapy," try "Would you be open to looking at a few kinds of support together?"',
        'Instead of "You never listen," try "Could you listen for five minutes before we try to solve it?"',
        'Instead of "Prayer is not enough," try "Prayer matters to us. Could we also consider practical and professional support?"',
        'Instead of "Our family is toxic," try "There is a pattern that leaves me feeling unheard. Can we talk about one specific moment?"',
      ],
      trailingParagraphs: [
        'Learners can notice changes, express concern, listen, and help locate support. They should not diagnose a relative.',
      ],
    },
    {
      sectionId: 'bridge-framework',
      heading: '7. The BRIDGE conversation framework',
      subsections: [
        {
          heading: 'B: Begin with care and observation',
          paragraphs: [
            'Name what you have noticed without accusation or diagnosis.',
            'Example: "I care about you. I have noticed you seem exhausted and have stopped going to practice."',
          ],
        },
        {
          heading: 'R: Respect timing, language, role, and privacy',
          paragraphs: [
            'Ask for a private time and use words the person understands.',
            'Example: "Is now a good time, or would later tonight be better?"',
          ],
        },
        {
          heading: 'I: Invite meaning and listen',
          paragraphs: [
            'Ask open questions and reflect what you heard before advising.',
            'Example: "What has this been like for you?"',
          ],
        },
        {
          heading: 'D: Discuss support without forcing one path',
          paragraphs: [
            'Offer relational, spiritual, practical, health, and professional options.',
            'Example: "Would any of these options feel acceptable to you?"',
          ],
        },
        {
          heading: 'G: Get agreement on one next step',
          paragraphs: [
            'Choose a specific, realistic action and clarify who will do what.',
            'Example: "Would you like me to sit with you while we contact the clinic?"',
          ],
        },
        {
          heading: 'E: Extend care and follow up',
          paragraphs: [
            'Return to the conversation without surveillance or punishment.',
            'Example: "I will check in on Friday. You can also tell me if you want a different kind of help."',
          ],
        },
      ],
      trailingParagraphs: [
        'BRIDGE does not control the outcome. The other person may decline, need time, choose different words, or prefer another trusted person.',
      ],
    },
    {
      sectionId: 'receiving-a-disclosure',
      heading: '8. Receiving a disclosure',
      paragraphs: [
        'Starting a conversation is only half the skill. Families also need ways to receive one.',
      ],
      subsections: [
        {
          heading: 'Validate',
          paragraphs: [
            '"Thank you for telling me. I can hear that this has been heavy."',
            'Validation communicates that the experience matters. It does not require agreeing with every interpretation.',
          ],
        },
        {
          heading: 'Clarify',
          paragraphs: [
            '"When you say you feel overwhelmed, what does that look like during the day?"',
            'Clarification invites meaning without rushing to a label.',
          ],
        },
        {
          heading: 'Ask preference',
          paragraphs: [
            '"Would you like me to listen, help solve one practical problem, or look for support with you?"',
            'This returns choice to the person and makes care concrete.',
          ],
        },
        {
          heading: 'Repair',
          paragraphs: [
            '"I responded too quickly and made you feel dismissed. I want to try again."',
            'Repair models accountability when the first response caused harm.',
          ],
        },
      ],
    },
    {
      sectionId: 'faith-tradition-professional-support',
      heading: '9. Faith, tradition, and professional support',
      paragraphs: [
        'Prayer, ritual, elders, traditional knowledge, and faith communities may provide meaning, belonging, hope, and practical care. They should not automatically be treated as barriers.',
        'Problems arise when any support source becomes coercive, blames the person, blocks necessary care, or exceeds its competence.',
        'A family may combine:',
      ],
      numberedItems: [
        'Spiritual support',
        'Trusted relationships',
        'Practical relief',
        'Primary care',
        'Qualified mental health services',
      ],
      trailingParagraphs: [
        'Module 5 examines these partnerships in greater depth.',
      ],
    },
    {
      sectionId: 'when-family-dialogue-not-safe',
      heading: '10. When family dialogue is not safe or sufficient',
      paragraphs: [
        'A family conversation plan is not enough by itself when:',
      ],
      numberedItems: [
        'There is immediate danger or a medical emergency',
        'Someone fears violence, coercion, forced confinement, retaliation, eviction, or financial punishment',
        'Abuse, neglect, exploitation, or severe control is present',
        'A caregiver or learner is being asked to provide treatment beyond their training',
        'Symptoms or functional changes are severe, persistent, rapidly worsening, or difficult to understand',
        'Practical, legal, medical, safeguarding, or professional mental health support is also required',
      ],
      trailingParagraphs: [
        'Do not ask a learner to confront an unsafe relative. Use fictional cases.',
      ],
    },
  ],
  keyConcepts: [
    { term: 'Cultural script', definition: 'A repeated message about how someone in a family or social role should think, feel, behave, disclose, or seek help.' },
    { term: 'Stereotype', definition: 'A fixed claim that treats all members of a group as the same and ignores variation, history, and individual agency.' },
    { term: 'Cultural humility', definition: 'An ongoing practice of self reflection, learning from others, and attending to power rather than claiming mastery of another person\'s culture.' },
    { term: 'Mental health literacy', definition: 'Knowledge and beliefs that support recognition, understanding, prevention, and appropriate help seeking without turning learners into diagnosticians.' },
    { term: 'Validation', definition: 'Communicating that a person\'s experience and emotion are heard and matter without necessarily agreeing with every interpretation.' },
    { term: 'Privacy', definition: 'Reasonable control over personal information and who is included in a conversation.' },
    { term: 'Agency', definition: 'A person\'s meaningful ability to express preferences and participate in decisions that affect them.' },
    { term: 'Repair', definition: 'Acknowledging that a response caused harm or disconnection and making a sincere effort to respond differently.' },
  ],
  caseStudy: {
    privacyNotice:
      'These cases are fictional composites for learning. They do not provide enough information for diagnosis and do not represent every family in either setting.',
    title: 'Respect, Sacrifice, and Being Heard',
    cases: [
      {
        heading: 'Amina in Nairobi',
        paragraphs: [
          'Amina is a 20 year old university student who lives with her aunt during the school term. Her aunt helped pay school fees and often reminds Amina that education is a family investment.',
          'For six weeks, Amina has been sleeping poorly, missing lectures, and struggling to concentrate. She wants support but worries that her aunt will hear the conversation as ingratitude or a request to abandon school. Her aunt knows a trusted family doctor but has little experience with mental health services.',
        ],
      },
      {
        heading: 'Kwesi in Toronto',
        paragraphs: [
          'Kwesi is a 17 year old Ghanaian Canadian student. His father values discipline, privacy, and their church community.',
          'After Kwesi stops attending football practice and his grades fall, his father assumes he needs stricter routines. Kwesi says he feels under constant pressure but does not want a diagnostic label. He trusts his coach and is willing to speak with the school counselor if he can control what is shared.',
        ],
      },
    ],
    conclusion: [
      'Both families contain care, power, uncertainty, and possible support. The task is not to decide which family is more modern or enlightened. It is to build a conversation that protects dignity while making room for honest observation, choice, practical help, and qualified support.',
    ],
  },
  interactiveScenario: {
    scenarioId: 'amina-bridge-opening',
    title: 'Choose Amina\'s Opening',
    prompt:
      'Amina decides to speak with her aunt. Which opening best applies the BRIDGE framework?',
    options: [
      '"You never understand mental health, and your pressure is making me depressed."',
      '"I am fine. I just need you to stop asking questions."',
      '"Auntie, could we talk privately after dinner? I value what you have done for me. I have been sleeping poorly and falling behind, and I would like you to listen before we decide what the next step should be."',
      'Tell a large family group first so that everyone can persuade the aunt.',
    ],
  },
  bridgeConversationLab: {
    eyebrow: 'MODULE 3 APPLIED ACTIVITY',
    title: 'BRIDGE Conversation Lab',
    subtitle: 'Practice a culturally humble mental health conversation at home',
    course: 'Mental Health, Community and Culture',
    module: 'Family Expectations and Cultural Scripts',
    suggestedTime: '25 to 40 minutes',
    submission: 'Private or facilitator reviewed; personal disclosure is not required',
    privacy: {
      heading: 'CHOOSE YOUR PRIVACY LEVEL',
      notice: 'Complete this lab for a fictional person, a composite scenario, or a general social message. Do not include diagnoses, trauma histories, names, addresses, immigration details, or other sensitive information. This is an educational activity and does not assess anyone\'s diagnosis or treatment needs.',
    },
    purpose: {
      heading: 'Purpose',
      text: 'The goal is to practice beginning, receiving, and repairing a family mental health conversation while respecting family values, language, privacy, agency, and safety. Success is not agreement. Success is a clearer, safer conversation and one realistic next step.',
    },
    selectScenario: {
      heading: 'Choose One Fictional Scenario',
      instruction: 'Choose one. You may also create a fictional composite with no identifying details.',
      scenarios: [
        {
          title: 'Scenario 1: Amina and her aunt in Nairobi',
          description: 'A 20 year old university student lives with her aunt during the school term. Her aunt helped pay school fees and reminds her that education is a family investment. Amina has been sleeping poorly and struggling to concentrate but worries that asking for support will be heard as ingratitude.',
        },
        {
          title: 'Scenario 2: Kwesi and his father in Toronto',
          description: 'A 17 year old Ghanaian Canadian student stops attending football practice and his grades fall. His father values discipline, privacy, and their church community. Kwesi feels under constant pressure but does not want a diagnostic label.',
        },
        {
          title: 'Scenario 3: Naledi and her older brother in Johannesburg',
          description: 'A young woman notices that her older brother has become withdrawn and irritable after a job loss. Their family does not discuss mental health openly. Naledi wants to open a conversation without humiliating him or betraying family privacy.',
        },
      ],
      selectionLabel: 'Your selection',
      compositeOption: 'My own fictional composite',
    },
    step1MapScript: {
      heading: 'Step 1: Map the Family Script',
      instruction: 'Complete each prompt for the fictional scenario.',
      fields: [
        { id: 'repeatedMessage', label: 'Repeated family message or expectation' },
        { id: 'protectedValue', label: 'Value or relationship the message may protect' },
        { id: 'possibleCost', label: 'Possible cost or silence created by the message' },
        { id: 'powerDependency', label: 'Power or dependency that affects the conversation' },
        { id: 'familyWords', label: 'Words or metaphors the family already uses for stress or distress' },
        { id: 'supportOptions', label: 'Support options that are actually available and trustworthy' },
      ],
    },
    step2BridgeOpening: {
      heading: 'Step 2: Draft the BRIDGE Opening',
      steps: [
        { letter: 'B', name: 'Begin', prompt: 'What observable change and caring intention will you name?' },
        { letter: 'R', name: 'Respect', prompt: 'How will you ask for the right time, place, language, and privacy?' },
        { letter: 'I', name: 'Invite', prompt: 'What open question will you ask, and how will you show that you heard the answer?' },
        { letter: 'D', name: 'Discuss', prompt: 'Which two or three support options will you offer without forcing a choice?' },
        { letter: 'G', name: 'Get agreement', prompt: 'What one realistic next step can both people accept?' },
        { letter: 'E', name: 'Extend', prompt: 'When and how will you follow up without surveillance or punishment?' },
      ],
    },
    step3Practice: {
      heading: 'Step 3: Practice the Conversation',
      instruction: 'Choose speaker, family listener, and observer roles. For a pair, the listener may also complete the observer checklist after the practice. Written completion is always available.',
      guidelines: [
        'The speaker uses the BRIDGE opening for up to two minutes.',
        'The family listener responds with curiosity, concern, uncertainty, or mild defensiveness. Do not use insults, threats, abuse, or crisis content.',
        'The speaker practices one validation, clarification, or repair sentence.',
        'The observer gives feedback only on the checklist below. Do not judge acting skill, cultural authenticity, or personal history.',
        'Switch roles or revise privately in writing.',
      ],
      practiceFieldLabel: 'Write your BRIDGE opening or practice response here (fictional only)',
    },
    observerChecklist: {
      heading: 'Observer Checklist',
      items: [
        'The opening named observable changes rather than assigning a diagnosis.',
        'The speaker communicated care and respected the family relationship.',
        'The conversation protected privacy and did not require public disclosure.',
        'The listener had meaningful space to explain their own understanding.',
        'The response validated emotion without pretending to agree with everything.',
        'The support options included more than one pathway and reflected real access.',
        'One specific next step and one follow-up point were identified.',
        'The plan recognized any safety, power, or professional boundary.',
      ],
    },
    step4Repair: {
      heading: 'Step 4: Repair a Difficult Response',
      instruction: 'Choose one response below. Write a repair that respects the value beneath it without accepting dismissal, coercion, or unsafe secrecy.',
      responses: [
        {
          text: '"After everything this family has sacrificed, you should be grateful."',
          possibleValue: 'gratitude and family sacrifice',
          neededRepair: 'gratitude and distress can coexist',
        },
        {
          text: '"We do not discuss family matters with outsiders."',
          possibleValue: 'privacy and protection',
          neededRepair: 'define a trustworthy, limited circle of support',
        },
        {
          text: '"Just pray harder."',
          possibleValue: 'faith and hope',
          neededRepair: 'include prayer if desired while considering practical and qualified support',
        },
        {
          text: '"You only need more discipline."',
          possibleValue: 'responsibility and structure',
          neededRepair: 'listen to the experience before deciding what kind of structure or care is needed',
        },
      ],
      repairFieldLabel: 'Write your repair response here (fictional only)',
    },
    step5SupportPathway: {
      heading: 'Step 5: Build the Support Pathway',
      nextStepLabel: 'Selected next step',
      nextStepPrompt: 'Who will do what, and by when?',
      followUpLabel: 'Follow-up plan',
    },
    step6ReviseSentence: {
      heading: 'Step 6: Revise One Sentence',
      originalLabel: 'Original sentence',
      feedbackLabel: 'Feedback received',
      revisedLabel: 'Revised sentence',
      whyLabel: 'Why the revision is more culturally humble and useful',
    },
    privateReflection: {
      heading: 'Private One-Sentence Reflection',
      sentenceLabel: 'One sentence I might use to start or receive a mental health conversation with a relative is:',
      valueLabel: 'The value I want to respect is:',
      needLabel: 'The need I do not want that value to hide is:',
    },
    completionCheck: {
      heading: 'Completion Check',
      items: [
        'I used a fictional or composite scenario.',
        'I completed all six BRIDGE steps.',
        'I practiced or wrote a receiving and repair response.',
        'I included a realistic support pathway and safety boundary.',
        'I revised one sentence after feedback or self review.',
      ],
    },
  },
  privateReflection: {
    heading: 'Private Reflection',
    prompt: 'Write one sentence you might use to start or receive a mental health conversation with a relative. You may write for Amina, Kwesi, Naledi, or another fictional person.',
    followUpPrompt: 'Then identify the family value you want the sentence to respect and the need you do not want that value to hide.',
    valuePrompt: 'What family value do you want the sentence to respect?',
    needPrompt: 'What need do you not want that value to hide?',
    privacyNotice: 'Keep this reflection private unless you freely choose to share it. Do not enter names, diagnoses, trauma details, abuse disclosures, immigration information, or other sensitive health information in a public form.',
  },
  knowledgeCheck: {
    heading: 'MODULE 3 KNOWLEDGE CHECK',
    subtitle: 'Family expectations, cultural scripts, and mental health conversations',
    learnerInstruction: 'Answer all five questions. Answer at least four of the five questions correctly to pass. Educational feedback appears after submission, and you may retry.',
    privacyNotice: 'This assessment checks understanding of course concepts. It does not ask for personal mental health information and does not evaluate anyone\'s health or diagnosis.',
    passingScore: 4,
    questions: [
      {
        id: 'm3-q1',
        prompt: 'Which statement best describes a family cultural script?',
        options: [
          'A rule shared identically by every African and diaspora family',
          'A repeated message about how a good family member should think, feel, behave, or seek help',
          'A mental health diagnosis passed between generations',
          'A private belief that has no connection to relationships or institutions',
        ],
        correctAnswerIndex: 1,
        feedback: 'A cultural script is a repeated message about roles, emotion, duty, privacy, help seeking, or belonging. Scripts vary within and across families, and they can protect values while also creating pressure.',
      },
      {
        id: 'm3-q2',
        prompt: 'A young person says, "I have not been sleeping, and I am falling behind." Which response best reflects cultural humility?',
        options: [
          '"I know exactly what this means because I understand your culture."',
          '"You should not use mental health language in this family."',
          '"Tell me what this has meant for you, what words feel right, and what kind of support you would consider."',
          '"Do not tell anyone outside the family, no matter what happens."',
        ],
        correctAnswerIndex: 2,
        feedback: 'Cultural humility begins with curiosity, self reflection, and attention to power. It asks for the person\'s meaning and preferences instead of assuming that one label or one family response fits.',
      },
      {
        id: 'm3-q3',
        prompt: 'Which opening best applies the first three steps of the BRIDGE framework?',
        options: [
          '"You are depressed, and you need therapy. I have already made the appointment."',
          '"Can we talk privately tonight? I have noticed you seem exhausted and have stopped attending practice. I care about you. What has this been like for you?"',
          '"Everyone has problems, so you need to be stronger."',
          '"I told the whole family so they can decide what is wrong."',
        ],
        correctAnswerIndex: 1,
        feedback: 'The response begins with care and observable changes, respects timing and privacy, and invites the person\'s meaning. It does not diagnose, shame, or remove choice.',
      },
      {
        id: 'm3-q4',
        prompt: 'A relative says prayer is the only acceptable response to distress. What is the strongest culturally respectful reply?',
        options: [
          'Reject the family\'s faith as irrational.',
          'Agree that professional support is unnecessary whenever prayer is available.',
          'Acknowledge the importance of prayer, ask what support the person wants, and explore whether spiritual, practical, and qualified professional care can work together.',
          'Avoid the topic permanently to preserve harmony.',
        ],
        correctAnswerIndex: 2,
        feedback: 'Spiritual support can provide meaning, hope, and belonging. Respect does not require making it the only pathway. The person\'s wishes, safety, practical needs, and access to qualified care still matter.',
      },
      {
        id: 'm3-q5',
        prompt: 'When is a family conversation plan not enough by itself?',
        options: [
          'Whenever two generations use different words for distress',
          'Whenever a person prefers to think before answering',
          'When there is immediate danger, violence, coercion, abuse, or a need for urgent professional assessment',
          'Whenever an elder participates in the conversation',
        ],
        correctAnswerIndex: 2,
        feedback: 'Communication skills are not a substitute for safety. Immediate danger, violence, coercion, abuse, or urgent clinical concerns require an appropriate safety response and qualified local support.',
      },
    ],
  },
  closing: {
    heading: 'MODULE 3 CLOSING',
    paragraphs: [
      'Respect and honesty do not have to be enemies. Families can preserve gratitude, faith, privacy, responsibility, and intergenerational connection while also making room for emotion, boundaries, questions, and support.',
      'A good conversation may not produce agreement in one sitting. Its first success may be smaller: less shame, a clearer observation, one person feeling heard, or one acceptable next step.',
    ],
    transition: 'Module 4 moves from conversation to community practice. It examines how Friendship Bench, StrongMinds, and Brother Be Well organize support beyond the household through trained community members, groups, education, and referral pathways.',
    finalDisclaimer: 'This course provides general educational information. It does not provide diagnosis, therapy, medical treatment, or emergency support. Learners seeking personal mental health assistance should contact an appropriately qualified professional or relevant local service. If someone is in immediate danger, contact local emergency services.',
  },
  completionRequirements: {
    heading: 'MODULE 3 COMPLETION REQUIREMENTS',
    items: [
      'Watch or review the two core media segments.',
      'Review the original Tamu Academy explanation and both fictional cases.',
      'Complete the interactive scenario.',
      'Complete the BRIDGE Conversation Lab using fictional or composite information.',
      'Complete all five knowledge check questions.',
      'Answer at least four of the five questions correctly.',
      'Complete the private reflection or fictional alternative.',
    ],
  },
  optionalExtendedAssignment: {
    label: 'Optional extended academic track',
    heading: 'Family Scripts, Power, and Pathways to Care',
    instruction: 'Write a 3 to 4 page analysis that:',
    requirements: [
      'Compares two family mental health scripts, with at least one grounded in a specific African setting and one in a specific diaspora setting.',
      'Explains the value each script may protect.',
      'Identifies the power relationship and possible cost.',
      'Proposes a culturally humble BRIDGE conversation.',
      'Adds one practical, institutional, or service response.',
      'Uses at least three course sources.',
    ],
    personalDisclosure: 'Personal disclosure is not required.',
  },
  sourcesFurtherLearning: {
    heading: 'Sources and further learning',
    groups: [
      {
        heading: 'Core and optional media',
        items: [
          {
            citation: 'Brother Be Well. (2023). Talking With Children About Mental Health, Parts 1 and 2.',
            url: 'https://brotherbewell.com/talking-with-children-about-mental-health-part-2/',
          },
          {
            citation: 'Family Diaries. (2025). African Parents Speak to a Therapist.',
            url: 'https://www.youtube.com/watch?v=doNhw9hqSTg',
          },
        ],
      },
      {
        heading: 'Family communication and adolescent mental health',
        items: [
          {
            citation: 'UNICEF. (2021). Programming Guidance for Parenting of Adolescents.',
            url: 'https://www.unicef.org/lac/media/29786/file/Parenting-of-adolescents-guidance.pdf',
          },
          {
            citation: 'World Health Organization and UNICEF. (2021). Helping Adolescents Thrive Toolkit.',
            url: 'https://www.who.int/publications/i/item/9789240025554',
          },
          {
            citation: 'Shenderovich, Y., Boyes, M., Degli Esposti, M., Casale, M., Toska, E., Roberts, K. J., and Cluver, L. (2021). Relationships with caregivers and mental health outcomes among adolescents living with HIV: A prospective cohort study in South Africa. BMC Public Health, 21, 172.',
            url: 'https://doi.org/10.1186/s12889-020-10147-z',
          },
          {
            citation: 'Kuo, C., LoVette, A., Stein, D. J., Cluver, L., Brown, L. K., Atujuna, M., Gladstone, T. R. G., Martin, J., and Beardslee, W. (2019). Building resilient families: Developing family interventions for preventing adolescent depression and HIV in low resource settings. Transcultural Psychiatry, 56(1), 134 to 153.',
            url: 'https://doi.org/10.1177/1363461518799510',
          },
          {
            citation: 'Chukwuere, P. C., Sehularo, L. A., and Manyedi, M. E. (2022). Experiences of adolescents and parents on the mental health management of depression in adolescents, North West province, South Africa. Curationis, 45(1), a2178.',
            url: 'https://doi.org/10.4102/curationis.v45i1.2178',
          },
        ],
      },
      {
        heading: 'Migration, help seeking, and cultural humility',
        items: [
          {
            citation: 'McCann, T. V., Mugavin, J., Renzaho, A., and Lubman, D. I. (2016). Sub-Saharan African migrant youths\' help-seeking barriers and facilitators for mental health and substance use problems: A qualitative study. BMC Psychiatry, 16, 275.',
            url: 'https://doi.org/10.1186/s12888-016-0984-5',
          },
          {
            citation: 'Tervalon, M., and Murray-Garcia, J. (1998). Cultural humility versus cultural competence: A critical distinction in defining physician training outcomes in multicultural education. Journal of Health Care for the Poor and Underserved, 9(2), 117 to 125.',
            url: 'https://pubmed.ncbi.nlm.nih.gov/10073197/',
          },
          {
            citation: 'UNICEF. 11 Tips for Communicating With Your Teen.',
            url: 'https://www.unicef.org/parenting/child-care/11-tips-communicating-your-teen',
          },
        ],
      },
    ],
    evidenceAttributionNotes: {
      heading: 'Evidence and editorial notes',
      items: [
        'The Shenderovich study reports associations in a specific population of adolescents living with HIV in South Africa. Do not present communication as the sole cause of improved mental health or generalize the result to every adolescent.',
        'The McCann study is a qualitative study of recently established sub-Saharan African migrant communities in Melbourne. Its themes are context, not universal family traits.',
        'The Chukwuere study involved adolescents receiving depression care and their parents in one South African province.',
        'The Kuo publication describes context specific qualitative intervention development.',
        'Brother Be Well and Family Diaries are learning resources, not population evidence.',
        'Do not present faith, elders, family privacy, men, women, African parents, migrants, or diaspora communities as uniform barriers.',
        'Reserve the fuller analysis of spiritual, traditional, and clinical collaboration for Module 5.',
        'Use plain mental health language and define unfamiliar terms.',
      ],
    },
  },
  progressTracking: {
    label: 'Module 3 progress',
    heading: 'Complete Module 3',
    privacyNote: 'Only completion status is saved. Your BRIDGE lab, reflection, scenario, and knowledge check responses are not stored.',
    markCompleteLabel: 'Mark complete',
    completedLabel: 'Completed',
    savingLabel: 'Saving...',
    completeModuleLabel: 'Complete Module 3',
    incompleteMessage: 'Complete all seven requirements before completing Module 3.',
    completedMessage: 'Module 3 is complete.',
    unavailableMessage: 'Progress saving is unavailable while this module is in administrator preview.',
    errorMessage: 'We could not save your progress. Please try again.',
  },
};

/**
 * PROTECTED SCENARIO ANSWER KEY (Module 3) — server-side-only.
 *
 * Released to the role-gated checkMentalHealthScenario function AFTER
 * the learner submits a valid selection. This constant is NEVER
 * imported by any src/ file, NEVER returned by getMentalHealthModule,
 * and NEVER embedded in any browser bundle.
 */
export const MENTAL_HEALTH_MODULE_3_SCENARIO_ANSWERS = {
  'amina-bridge-opening': {
    optionsCount: 4,
    bestResponseIndex: 2,
    feedbackByOption: [
      'The concern may be real, but this opening begins with accusation and an unsupported diagnosis. It is likely to trigger defense and reduces Amina\'s experience to one cause.',
      'This protects privacy by ending the conversation, but it does not communicate need or create a support pathway.',
      'This is the strongest opening. It respects the relationship, asks for a private time, names observable changes, and requests listening before problem solving. It does not guarantee agreement, but it creates a better opening.',
      'This removes Amina\'s control over disclosure and could increase shame, pressure, or family conflict.',
    ],
  },
};

/**
 * MODULE 3 COMPLETION KEYS — server-side-only.
 *
 * The seven approved Module 3 completion requirement identifiers, in the
 * approved order. They correspond one-to-one to the seven existing
 * completion requirement strings in lesson.completionRequirements.items.
 *
 *   core-media-pair            -> core_media_acknowledged_at
 *   lesson-and-cases           -> lesson_and_case_reviewed_at
 *   interactive-scenario       -> last_section_id (marker: "m3-scenario-complete")
 *   bridge-conversation-lab    -> activity_acknowledged_at
 *   knowledge-check-completed  -> knowledge_check_completed_at
 *   knowledge-check-passed     -> quiz_passed
 *   private-reflection         -> reflection_acknowledged_at
 *
 * The four self-attestable keys (core-media-pair, lesson-and-cases,
 * bridge-conversation-lab, private-reflection) may be marked through
 * the general updateMentalHealthProgress function. The three
 * server-verified keys (interactive-scenario, knowledge-check-completed,
 * knowledge-check-passed) are recorded only by checkMentalHealthScenario
 * and checkMentalHealthKnowledgeCheck after valid submissions.
 */
export const MENTAL_HEALTH_MODULE_3_COMPLETION_KEYS = [
  'core-media-pair',
  'lesson-and-cases',
  'interactive-scenario',
  'bridge-conversation-lab',
  'knowledge-check-completed',
  'knowledge-check-passed',
  'private-reflection',
];

export const MENTAL_HEALTH_MODULE_3_SELF_ATTESTED_KEYS = new Set([
  'core-media-pair',
  'lesson-and-cases',
  'bridge-conversation-lab',
  'private-reflection',
]);

const MODULE_3_KEY_TO_FIELD = {
  'core-media-pair': 'core_media_acknowledged_at',
  'lesson-and-cases': 'lesson_and_case_reviewed_at',
  'interactive-scenario': 'last_section_id',
  'bridge-conversation-lab': 'activity_acknowledged_at',
  'knowledge-check-completed': 'knowledge_check_completed_at',
  'knowledge-check-passed': 'quiz_passed',
  'private-reflection': 'reflection_acknowledged_at',
};

const M3_SCENARIO_COMPLETE_MARKER = 'm3-scenario-complete';

export function isModule3CompletionKey(key) {
  return MENTAL_HEALTH_MODULE_3_COMPLETION_KEYS.includes(key);
}

export function isModule3SelfAttestedKey(key) {
  return MENTAL_HEALTH_MODULE_3_SELF_ATTESTED_KEYS.has(key);
}

export function getModule3CompletionField(key) {
  return MODULE_3_KEY_TO_FIELD[key] || null;
}

export function getModule3ScenarioCompleteMarker() {
  return M3_SCENARIO_COMPLETE_MARKER;
}

export function deriveModule3CompletedKeys(row) {
  if (!row) return [];
  const keys = [];
  if (row.core_media_acknowledged_at) keys.push('core-media-pair');
  if (row.lesson_and_case_reviewed_at) keys.push('lesson-and-cases');
  if (row.last_section_id === M3_SCENARIO_COMPLETE_MARKER) keys.push('interactive-scenario');
  if (row.activity_acknowledged_at) keys.push('bridge-conversation-lab');
  if (row.knowledge_check_completed_at) keys.push('knowledge-check-completed');
  if (row.quiz_passed) keys.push('knowledge-check-passed');
  if (row.reflection_acknowledged_at) keys.push('private-reflection');
  return keys;
}