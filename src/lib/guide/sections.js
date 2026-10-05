/**
 * Safari ya Utu — Learner's Guide content.
 *
 * This is the guide's own workbook content (proverbs, frameworks, exercises and
 * reflections), kept alongside the app so the sections render instantly. It is
 * separate from Tamu Academy's course curriculum, which stays server-side.
 *
 * Written for a global learner audience: every heading, instruction and
 * exercise is in English, and Kiswahili section names and terms are kept
 * alongside their plain-English meaning so nothing depends on knowing them.
 */

export const GUIDE_TITLE = 'Safari ya Utu';
export const GUIDE_SUBTITLE = 'The journey of humanness · a companion workbook for every Tamu Academy learner';
export const GUIDE_PROVERB = { sw: 'Mtu ni watu', en: 'A person is people.', language: 'Kikuyu and Kiswahili' };

export const GUIDE_PRIVACY_NOTE =
  'Your answers are private to you. Nothing in this guide is graded, and no other learner can see what you write.';

export const HOW_TO_USE = [
  'Start with Safari Yako (your journey) and the first Kioo (mirror) reflection.',
  'Use any section, in any order.',
  'Return to the mirror (Kurudi) at the end of a course or every few months.',
  'Learn with a rafiki wa safari (journey partner) — optional.',
];

export const CARE_NOTE =
  'If you are struggling: you do not have to carry it alone. Talk to someone you trust, and reach out to a mental health service near you. If you are in immediate danger, contact your local emergency services.';

/** Support guidance shown in the Utu care note. */
export const CARE_SUPPORT_PLACEHOLDER = [
  {
    country: 'Wherever you are',
    services:
      'Your national mental health helpline and the emergency number for your area are the fastest routes to help. Search for "mental health helpline" together with your country or city name.',
  },
  {
    country: 'Kenya',
    services:
      'A health facility or county hospital near you can refer you to mental health support, and many universities and counselling services offer low-cost sessions.',
  },
];

export const FREQUENCY_SCALE = [
  { value: 5, label: 'Always' },
  { value: 4, label: 'Often' },
  { value: 3, label: 'Sometimes' },
  { value: 2, label: 'Rarely' },
  { value: 1, label: 'Never' },
];

/** 1-5 rating scale used by the reflection exercises. */
export const RATING_SCALE = [
  { value: 1, label: '1 · Not true yet' },
  { value: 2, label: '2 · A little true' },
  { value: 3, label: '3 · Partly true' },
  { value: 4, label: '4 · Mostly true' },
  { value: 5, label: '5 · Very true' },
];

/** The ten Kioo statements. Ratings are always answered on the frequency scale. */
export const KIOO_STATEMENTS = [
  { id: 's1', text: 'I can name my own strengths without exaggerating them.' },
  { id: 's2', text: 'I ask for help when I need it.' },
  { id: 's3', text: 'I keep going when something is difficult.' },
  { id: 's4', text: 'I can break a large problem into smaller steps.' },
  { id: 's5', text: 'I listen carefully before I answer.' },
  { id: 's6', text: 'I say what I mean clearly and kindly.' },
  { id: 's7', text: 'I notice how my words affect other people.' },
  { id: 's8', text: 'I make space for people who are different from me.' },
  { id: 's9', text: 'I plan how I use money rather than only reacting to it.' },
  { id: 's10', text: 'I can use digital tools and AI carefully and honestly.' },
];

export const GUIDE_SECTIONS = [
  {
    id: 'karibu',
    number: null,
    swahili: 'Karibu',
    english: 'Welcome',
    available: true,
    proverb: { sw: 'Haraka haraka haina baraka.', en: 'Hurry, hurry has no blessing.' },
    intro: [
      'This guide is a companion for the journey of becoming more fully yourself. Safari ya Utu means the journey of humanness, and every section is an invitation to look honestly at where you are, what you carry, and what you are learning.',
      'There is no exam here and no score. You write for yourself. Some sections will feel easy and others will take time, and you are free to move through them in whatever order suits your life.',
    ],
    framework: {
      eyebrow: 'How this guide works',
      heading: 'Four things to hold on to',
      cards: [
        { label: '01 · Ni yako (it is yours)', title: 'It is yours', body: 'Nothing here is graded. No other learner can see your answers, and there is no right way to write them.' },
        { label: '02 · Polepole (slowly)', title: 'Slowly', body: 'You do not have to finish anything today. One honest page is worth more than ten hurried ones.' },
        { label: '03 · Rudia (return)', title: 'Return', body: 'Come back to a section months later. The same question answered twice shows you your own movement.' },
        { label: '04 · Rafiki wa safari (journey partner)', title: 'A journey partner', body: 'If you choose, walk with someone you trust. A journey partner listens; they do not grade.' },
      ],
    },
    exercises: [
      {
        id: 'A',
        number: 'Exercise A',
        title: 'Begin where you are',
        instructions:
          'Write in your own language and your own voice. There is no required length, and you can change every answer later.',
        fields: [
          { id: 'name', type: 'text', label: 'Your name, as you would write it for yourself', rows: 1 },
          { id: 'intention', type: 'text', label: 'What brings you to this guide?', rows: 4, placeholder: 'A sentence or a page — whatever is true today.' },
        ],
      },
      {
        id: 'B',
        number: 'Exercise B',
        title: 'Your rhythm for the journey',
        instructions: 'A plan you can actually keep is better than an ambitious one you drop. Fill in what is realistic for you.',
        fields: [
          {
            id: 'rhythm',
            type: 'table',
            label: 'My rhythm',
            rows: ['When I will write', 'Where I will keep my notes', 'Who will walk with me (rafiki wa safari)'],
            columns: [
              { id: 'plan', label: 'My plan' },
              { id: 'obstacle', label: 'What might get in the way' },
            ],
          },
        ],
      },
    ],
    takeaways: [
      'This guide is yours: nothing is graded, and other learners never see your answers.',
      'You can use the sections in any order, and you can leave and come back.',
      'A rafiki wa safari — a journey partner — is optional and can make the walking lighter.',
    ],
    closingReflection: {
      prompt: 'What do you hope to understand better about yourself by the end of this journey?',
    },
  },

  {
    id: 'safari-yako',
    number: '01',
    swahili: 'Safari Yako',
    english: 'Your journey',
    available: true,
    proverb: { sw: 'Mwenda pole hajikwai.', en: 'The one who walks slowly does not stumble.' },
    intro: [
      'Every person is walking a journey, and most of us rarely stop to describe it. Naming the journey — where it began, what happened along the way, what we carry — makes it easier to see what we want next.',
      'This section is not a résumé. It is a map drawn from the inside, in your own words.',
    ],
    framework: {
      eyebrow: 'Tamu framework',
      heading: 'Four movements of a journey',
      cards: [
        { label: '01 · Chanzo (source)', title: 'Source', body: 'Where I come from: the people, places and traditions that formed me before I chose anything.' },
        { label: '02 · Njia (the path)', title: 'The path', body: 'What has happened along the way: the turns, the teachers, the surprises, the losses.' },
        { label: '03 · Mizigo (the load)', title: 'The load', body: 'What I carry now: strengths that steady me, and weights I have learned to work around.' },
        { label: '04 · Mwendo (direction)', title: 'Direction', body: 'Where I am going: what I want to grow into, and what I am willing to leave behind.' },
      ],
    },
    exercises: [
      {
        id: '1.1',
        number: 'Exercise 1.1',
        title: 'Your journey in stages',
        instructions:
          'Describe your journey in stages — for example childhood, school, work, family, now. Write what mattered at each stage, not only what happened.',
        fields: [
          { id: 'stages', type: 'text', label: 'My journey in stages', rows: 10 },
        ],
      },
      {
        id: '1.2',
        number: 'Exercise 1.2',
        title: 'What shaped you',
        instructions: 'Name four things that shaped you, and say how each one shaped you.',
        fields: [
          {
            id: 'shaping',
            type: 'table',
            label: 'What shaped me',
            rows: ['A person', 'A place', 'A practice or tradition', 'A turning point'],
            columns: [
              { id: 'what', label: 'What it is' },
              { id: 'how', label: 'How it shaped me' },
            ],
          },
        ],
      },
      {
        id: '1.3',
        number: 'Exercise 1.3',
        title: 'What you carry',
        instructions: 'Rate how true each statement feels today. 1 means not true yet; 5 means very true.',
        fields: [
          {
            id: 'carry',
            type: 'rating',
            label: 'About what I carry',
            statements: [
              { id: 'c1', text: 'I can name strengths that are genuinely mine.' },
              { id: 'c2', text: 'I can name things I carry that are heavy.' },
              { id: 'c3', text: 'I know which parts of my story I am proud of.' },
              { id: 'c4', text: 'I know which parts of my story I avoid talking about.' },
              { id: 'c5', text: 'I can see how my story affects the choices I make now.' },
            ],
          },
        ],
      },
    ],
    takeaways: [
      'Your journey is not a straight line, and it does not need to be.',
      'Naming what shaped you puts you in a better position to choose what shapes you next.',
      'What you carry is both load and strength — the same experience can be both.',
    ],
    closingReflection: {
      prompt: 'If your life so far were a journey with a title, what would the title be, and why?',
    },
  },

  {
    id: 'kioo',
    number: '02',
    swahili: 'Kioo',
    english: 'The mirror: skills reflection',
    available: true,
    special: 'kioo',
    proverb: { sw: 'Kuuliza si ujinga.', en: 'Asking is not ignorance.' },
    intro: [
      'Kioo means mirror. This reflection is a way of looking at the skills you already have, honestly and without scoring yourself. There are no correct answers — only an honest picture of today.',
      'You answer the same ten statements at the start of your journey and again each time you return. Every reflection is kept with its date, so you can see your own movement.',
    ],
    framework: {
      eyebrow: 'How to use the mirror',
      heading: 'Four notes before you begin',
      cards: [
        { label: '01 · Ukweli (honesty)', title: 'Answer honestly', body: 'Answer quickly and honestly. The mirror is only useful if it shows what is actually there.' },
        { label: '02 · Kwanza na Kurudi (first and return)', title: 'First time and Return', body: 'Your first reflection is your starting point. Every later one is a Return, kept with its date.' },
        { label: '03 · Hakuna alama (no marks)', title: 'Nothing is graded', body: 'There is no score, no pass and no fail. Only you and your own comparisons.' },
        { label: '04 · Rudia (repeat)', title: 'Return over time', body: 'Come back at the end of a course or every few months. Movement is easier to see across time.' },
      ],
    },
    exercises: [
      {
        id: '2.1',
        number: 'Exercise 2.1',
        title: 'The mirror',
        instructions: 'Rate how often each statement is true of you. There is no right answer, and you can return to this as often as you like.',
        fields: [
          { id: 'kioo', type: 'frequency', label: 'The ten statements', statements: KIOO_STATEMENTS },
        ],
      },
    ],
    takeaways: [
      'The first reflection is a starting point, not a verdict on who you are.',
      'Nothing here is graded; the only comparison is with yourself over time.',
      'Returning later shows movement that is easy to miss from day to day.',
    ],
    closingReflection: {
      prompt: 'What did you notice about yourself as you answered these statements?',
    },
  },

  {
    id: 'uthabiti',
    number: '03',
    swahili: 'Uthabiti',
    english: 'Resilience',
    available: true,
    proverb: { sw: 'Penye nia pana njia.', en: 'Where there is a will, there is a way.' },
    intro: [
      'Resilience is not only something you hold alone. It is something you inherit from the people who came through hard times before you, and something you share with those around you.',
      'Waiyaki wa Hinga stood for his people\u2019s land and paid a heavy price; generations later, his stand still gives others strength. Your family has stories like this too. When something feels too hard, the Mizizi (roots) questions turn you back to your roots: what your people have done, who stands with you, and what you can give.',
    ],
    framework: {
      eyebrow: 'Tamu framework',
      heading: 'Mizizi · the roots questions',
      cards: [
        { label: '1 · Kumbuka (remember)', title: 'Remember', body: 'When did my family or community come through something like this? What did they do?' },
        { label: '2 · Tegemea (lean on)', title: 'Lean on', body: 'Who can I lean on now, and have I asked them?' },
        { label: '3 · Rudisha (give back)', title: 'Give back', body: 'What can I offer someone else facing the same thing?' },
      ],
    },
    exercises: [
      {
        id: '3.1',
        number: 'Exercise 3.1',
        title: 'Interview an elder',
        instructions: 'Ask a parent, grandparent or community elder about a hardship your family came through.',
        fields: [
          { id: 'what_happened', type: 'text', label: 'What happened, and how did they get through it?', rows: 4 },
          { id: 'proverb_lesson', type: 'text', label: 'What proverb, saying or lesson do they carry from it?', rows: 4 },
        ],
      },
      {
        id: '3.2',
        number: 'Exercise 3.2',
        title: 'Mizizi (roots) in practice',
        instructions: 'Think of one challenge you face right now.',
        fields: [
          { id: 'challenge', type: 'text', label: 'My challenge', rows: 2 },
          {
            id: 'mizizi_table',
            type: 'table',
            label: 'Walk the challenge through the three roots questions',
            rows: ['Kumbuka — What has my family or community done before?', 'Tegemea — Who can I lean on?', 'Rudisha — What can I give?'],
            columns: [{ id: 'answer', label: 'My answer' }],
          },
        ],
      },
      {
        id: '3.3',
        number: 'Exercise 3.3',
        title: 'A habit with a partner',
        instructions: 'Small habits kept with others last longer than big plans made alone.',
        fields: [
          { id: 'habit', type: 'text', label: 'One small learning habit I will build', rows: 2 },
          { id: 'reminder', type: 'text', label: 'What will remind me to do it (a time, a place, an alarm)?', rows: 2 },
          { id: 'checkin', type: 'text', label: 'Who will I check in with each week?', rows: 2 },
          {
            id: 'weekly_tracker',
            type: 'table',
            label: 'Track it for four weeks',
            rows: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            columns: [{ id: 'note', label: 'Did I keep it?' }],
          },
          { id: 'celebrate', type: 'text', label: 'How will I celebrate keeping it?', rows: 2 },
        ],
      },
    ],
    takeaways: [
      'Resilience is shared: you do not have to carry everything alone.',
      'Your history is a resource, not only a weight.',
      'Small habits, kept with others, change the most.',
    ],
    closingReflection: {
      prompt: 'What will you carry forward from this section?',
    },
  },

  {
    id: 'kutatua',
    number: '04',
    swahili: 'Kutatua',
    english: 'Problem solving',
    available: true,
    proverb: { sw: 'Penye nia, pana njia.', en: 'Where there is a will, there is a way.' },
    intro: [
      'Problems are part of every life and every community. Kutatua means solving, and this section is about doing it deliberately instead of by reflex: separating what you can see from what is really causing it, and then choosing a step you can actually take.',
      'Work through the four steps on a problem that is with you now — personal, at work, in your studies, or in your community. The aim is not a perfect answer but a clear next move.',
    ],
    framework: {
      eyebrow: 'Tamu framework',
      heading: 'Hatua nne · four steps',
      cards: [
        { label: '01 · Eleza (describe)', title: 'Describe', body: 'Say what is happening in plain words, without judging it yet. A problem written clearly is already half understood.' },
        { label: '02 · Chunguza (investigate)', title: 'Trace the cause', body: 'Ask why, several times, until you reach something you can act on rather than the symptom you can see.' },
        { label: '03 · Chagua (choose)', title: 'Choose', body: 'Set out your options with what each costs and what each gains. A few honest options beat a long list.' },
        { label: '04 · Pima (test)', title: 'Test and review', body: 'Take the smallest useful step, then look honestly at what changed and decide what comes next.' },
      ],
    },
    exercises: [
      {
        id: '4.1',
        number: 'Exercise 4.1',
        title: 'Describe the problem',
        instructions: 'Describe the problem as if to someone who knows nothing about your situation. Keep the description factual.',
        fields: [
          { id: 'problem', type: 'text', label: 'The problem in one sentence', rows: 2 },
          { id: 'symptoms', type: 'text', label: 'What I can actually see, hear or measure', rows: 4 },
          { id: 'who_affected', type: 'text', label: 'Who else is affected, and how', rows: 3 },
        ],
      },
      {
        id: '4.2',
        number: 'Exercise 4.2',
        title: 'Trace the cause · kwa nini, mara tano',
        instructions:
          'Ask "why?" five times, letting each answer become the next question. Stop when you reach something you can change.',
        fields: [
          {
            id: 'whys',
            type: 'table',
            label: 'Five whys',
            rows: ['1. Why is this happening?', '2. And why is that?', '3. And why is that?', '4. And why is that?', '5. And why is that?'],
            columns: [{ id: 'answer', label: 'My answer' }],
          },
          { id: 'root', type: 'text', label: 'The cause I can act on', rows: 2 },
        ],
      },
      {
        id: '4.3',
        number: 'Exercise 4.3',
        title: 'Choose a step and test it',
        instructions: 'Compare up to three options, then commit to a first step small enough to take this week.',
        fields: [
          {
            id: 'options',
            type: 'table',
            label: 'My options',
            rows: ['Option 1', 'Option 2', 'Option 3'],
            columns: [
              { id: 'option', label: 'What I would do' },
              { id: 'cost', label: 'What it costs me' },
              { id: 'gain', label: 'What it would gain' },
              { id: 'risk', label: 'The main risk' },
            ],
          },
          { id: 'first_step', type: 'text', label: 'My smallest first step, this week', rows: 2 },
          { id: 'measure', type: 'text', label: 'How I will know it helped', rows: 2 },
        ],
      },
    ],
    takeaways: [
      'Describe before you solve: a problem named clearly is easier to work on.',
      'Ask why more than once — the first answer is usually a symptom, not a cause.',
      'Take one small step and review it, rather than waiting for a perfect plan.',
    ],
    closingReflection: {
      prompt: 'Which problem have you been treating as permanent that might only need one clear step?',
    },
  },

  {
    id: 'sauti',
    number: '05',
    swahili: 'Sauti',
    english: 'Communicating through relationship',
    available: true,
    proverb: { sw: 'Mkono mmoja haulei mwana.', en: 'One hand cannot raise a child.' },
    intro: [
      'Sauti means voice. What you say matters, but it lands inside a relationship: whether the other person feels heard often decides whether they can hear you.',
      'These exercises work on both halves of a conversation — listening first, then speaking clearly — and on the differences between how you communicate in the community you come from and how you communicate where you live or work now.',
    ],
    framework: {
      eyebrow: 'Tamu framework',
      heading: 'Hatua nne · four movements of a conversation',
      cards: [
        { label: '01 · Sikiliza (listen)', title: 'Listen', body: 'Give the other person room before you respond. Listening is not agreeing; it is understanding.' },
        { label: '02 · Elewa (understand)', title: 'Understand', body: 'Say back what you heard in your own words and let them correct you.' },
        { label: '03 · Sema (speak)', title: 'Speak', body: 'Say what you mean in one clear sentence, kindly. Directness and respect are not opposites.' },
        { label: '04 · Hakikisha (confirm)', title: 'Confirm', body: 'Agree what each of you will do next — or say honestly that you will not.' },
      ],
    },
    exercises: [
      {
        id: '5.1',
        number: 'Exercise 5.1',
        title: 'How I listen',
        instructions: 'Rate how true each statement is of you today. 1 means not true yet; 5 means very true.',
        fields: [
          {
            id: 'listening',
            type: 'rating',
            label: 'About my listening',
            statements: [
              { id: 'l1', text: 'I let people finish before I answer.' },
              { id: 'l2', text: 'I ask a question before assuming I know what someone meant.' },
              { id: 'l3', text: 'I can say back what I heard accurately.' },
              { id: 'l4', text: 'I notice the effect my words have on the other person.' },
              { id: 'l5', text: 'I can disagree without making it personal.' },
            ],
          },
        ],
      },
      {
        id: '5.2',
        number: 'Exercise 5.2',
        title: 'A conversation I need to have',
        instructions: 'Choose one conversation you have been postponing. Plan it before you have it.',
        fields: [
          { id: 'with_whom', type: 'text', label: 'Who the conversation is with', rows: 2 },
          { id: 'they_understand', type: 'text', label: 'What I need them to understand', rows: 4 },
          { id: 'i_understand', type: 'text', label: 'What I think they need me to understand', rows: 4 },
          { id: 'opening', type: 'text', label: 'The first sentence I will say', rows: 3 },
          { id: 'ask', type: 'text', label: 'What I will ask for, clearly', rows: 2 },
        ],
      },
      {
        id: '5.3',
        number: 'Exercise 5.3',
        title: 'Saying it clearly and kindly',
        instructions:
          'Unclear kindness often turns into resentment later. Write the version you are avoiding, then the version you can actually say.',
        fields: [
          {
            id: 'clearly_kindly',
            type: 'table',
            label: 'From unspoken to clearly said',
            rows: [
              'Something I have needed to say',
              'How it has come out instead (harshly, or not at all)',
              'How I will say it clearly and kindly',
              'What I will do if it is not received well',
            ],
            columns: [{ id: 'answer', label: 'My answer' }],
          },
        ],
      },
      {
        id: '5.4',
        number: 'Exercise 5.4',
        title: 'Two places, two ways of speaking',
        instructions:
          'Communication norms differ between cultures, families and workplaces. Name the differences you notice, so you can choose deliberately rather than by accident.',
        fields: [
          {
            id: 'norms',
            type: 'table',
            label: 'My two communication worlds',
            rows: [
              'Greeting and small talk',
              'Disagreeing with someone older or more senior',
              'Asking for what I need',
              'Talking about feelings or difficulty',
              'Giving and receiving criticism',
            ],
            columns: [
              { id: 'home', label: 'Where I come from' },
              { id: 'now', label: 'Where I live or work now' },
            ],
          },
        ],
      },
    ],
    takeaways: [
      'Being understood is a two-part job: listen and confirm, as well as speak.',
      'Clear and kind are not opposites — unclear kindness usually ends in resentment.',
      'Across cultures, say the norm out loud instead of assuming it is shared.',
    ],
    closingReflection: {
      prompt: 'Which conversation have you postponed because you have not yet decided what you actually want to say?',
    },
  },

  {
    id: 'utu',
    number: '06',
    swahili: 'Utu',
    english: 'Relationships and well-being',
    available: true,
    careNote: true,
    proverb: { sw: 'Mtu ni watu.', en: 'A person is people.' },
    intro: [
      'Utu is the idea of humanness: the dignity we owe each other simply because we are people. In the Ubuntu tradition carried across east and southern Africa, a person is understood through other people.',
      'Well-being is therefore not only private. How a family, workplace or community talks about difficulty — and whether it makes room for it — shapes whether people can ask for help. These exercises look at both: your own patterns, and the culture around you.',
    ],
    framework: {
      eyebrow: 'Tamu framework',
      heading: 'Nguzo nne · four pillars',
      cards: [
        { label: '01 · Uhusiano (relationship)', title: 'Relationship', body: 'I am not alone in this: who is around me, and do they know how I actually am?' },
        { label: '02 · Heshima (dignity)', title: 'Dignity', body: 'Do I treat my own difficulty with the same respect I would give someone else\u2019s?' },
        { label: '03 · Msaada (mutual support)', title: 'Mutual support', body: 'Where do I give support, and am I willing to receive it?' },
        { label: '04 · Mapumziko (rest)', title: 'Rest and care', body: 'Rest is not laziness. What restores me, and when will I actually take it?' },
      ],
    },
    exercises: [
      {
        id: '6.1',
        number: 'Exercise 6.1',
        title: 'My circle of care',
        instructions: 'Name the people already in your life, then decide one contact each this week.',
        fields: [
          {
            id: 'circle',
            type: 'table',
            label: 'Who is around me',
            rows: ['Someone I can tell the truth to', 'Someone I check on', 'Someone I have lost touch with'],
            columns: [
              { id: 'who', label: 'Who' },
              { id: 'how', label: 'How I will reach out this week' },
            ],
          },
        ],
      },
      {
        id: '6.2',
        number: 'Exercise 6.2',
        title: 'How I am, honestly',
        instructions: 'Rate each statement from 1 (not true yet) to 5 (very true).',
        fields: [
          {
            id: 'wellbeing',
            type: 'rating',
            label: 'About how I am',
            statements: [
              { id: 'w1', text: 'I can name what I am feeling, not only that I am busy.' },
              { id: 'w2', text: 'There is someone I can tell the truth to.' },
              { id: 'w3', text: 'I rest before I am exhausted, not after.' },
              { id: 'w4', text: 'I give myself the patience I give other people.' },
              { id: 'w5', text: 'I know where I would go for help if I needed it.' },
            ],
          },
        ],
      },
      {
        id: '6.3',
        number: 'Exercise 6.3',
        title: 'Culture, difficulty and care',
        instructions:
          'Different cultures express distress differently, and what one community finds supportive another finds intrusive. Answer for the community you know best.',
        fields: [
          { id: 'how_shown', type: 'text', label: 'In the community I come from, how is difficulty usually shown or spoken about?', rows: 4 },
          { id: 'helps_hurts', type: 'text', label: 'What makes it easier to speak about, and what makes it harder?', rows: 4 },
          { id: 'dignified_care', type: 'text', label: 'What would care given with dignity look like for me?', rows: 4 },
        ],
      },
      {
        id: '6.4',
        number: 'Exercise 6.4',
        title: 'Rest and care · mapumziko',
        instructions: 'Rest is part of the work, not a reward for finishing it.',
        fields: [
          { id: 'restore', type: 'text', label: 'What actually restores me (not what I think should)', rows: 3 },
          { id: 'take_off', type: 'text', label: 'What I will take off my plate this week', rows: 3 },
          { id: 'protect', type: 'text', label: 'When I will rest, and how I will protect that time', rows: 3 },
        ],
      },
    ],
    takeaways: [
      'Well-being is relational: utu means we are steadied by others and steady others in turn.',
      'Culture shapes how difficulty is shown and how care is offered; naming it lets you choose.',
      'Rest and asking for help are part of the work, not a reward for finishing it.',
    ],
    closingReflection: {
      prompt: 'Who has held you steady in a hard season, and what would you want to say to them?',
    },
  },

  {
    id: 'ujima',
    number: '07',
    swahili: 'Ujima',
    english: 'Money and community',
    available: true,
    proverb: { sw: 'Umoja ni nguvu.', en: 'Unity is strength.' },
    intro: [
      'Ujima means collective work and responsibility: the understanding that what happens to one person is also the business of the community.',
      'In much of the world money is never only personal. It moves to family, neighbours and community funds, and communities run their own savings systems. This section is about planning honestly, so that generosity stays a choice you can keep rather than a pressure that empties you.',
      'Use your own currency and round the numbers if you prefer. Nothing here is graded, and only you can see it.',
    ],
    framework: {
      eyebrow: 'Tamu framework',
      heading: 'Misingi minne · four practices',
      cards: [
        { label: '01 · Jua (know)', title: 'Know', body: 'Know what comes in and what goes out. Guessing is where most money worry lives.' },
        { label: '02 · Panga (plan)', title: 'Plan', body: 'Decide in advance what each part of your income is for, before the requests arrive.' },
        { label: '03 · Shirikiana (agree together)', title: 'Agree together', body: 'Say clearly what you can give, what you cannot, and what it is for.' },
        { label: '04 · Jenga (build)', title: 'Build', body: 'Build a small buffer, and where you can, a shared fund with people you trust.' },
      ],
    },
    exercises: [
      {
        id: '7.1',
        number: 'Exercise 7.1',
        title: 'Where my money goes',
        instructions: 'Write monthly figures in your own currency, roughly is fine. The point is to see the shape of it.',
        fields: [
          {
            id: 'flows',
            type: 'table',
            label: 'Money in, money out',
            rows: [
              'What I receive each month',
              'Fixed costs I cannot avoid',
              'What I choose to spend',
              'What I give or send to others',
              'What I manage to keep',
            ],
            columns: [
              { id: 'amount', label: 'Amount' },
              { id: 'note', label: 'Note' },
            ],
          },
        ],
      },
      {
        id: '7.2',
        number: 'Exercise 7.2',
        title: 'Agreements, not assumptions',
        instructions:
          'Support given under pressure often ends badly for both sides. Decide in advance what you can offer, and how you will say no without damaging the relationship.',
        fields: [
          {
            id: 'agreements',
            type: 'table',
            label: 'Support and its limits',
            rows: [
              'People I support regularly',
              'Requests I say yes to too easily',
              'How I will explain what I can and cannot give',
              'What I will say when I have to refuse',
            ],
            columns: [{ id: 'answer', label: 'My answer' }],
          },
          { id: 'money_conversation', type: 'text', label: 'One conversation about money I need to have, and when I will have it', rows: 3 },
        ],
      },
      {
        id: '7.3',
        number: 'Exercise 7.3',
        title: 'Community money systems',
        instructions:
          'Rotating savings groups, family funds and community schemes are used all over the world (chama and susu in east Africa, tanda in Latin America, ROSCAs more widely).',
        fields: [
          { id: 'system', type: 'text', label: 'A community money system I know, or take part in', rows: 3 },
          { id: 'trustworthy', type: 'text', label: 'How it works, and what makes it trustworthy', rows: 4 },
          { id: 'shared_goal', type: 'text', label: 'A shared goal I could build with others', rows: 3 },
        ],
      },
      {
        id: '7.4',
        number: 'Exercise 7.4',
        title: 'A buffer, however small',
        instructions: 'A buffer is not a large sum; it is the habit of keeping something back before it is needed.',
        fields: [
          { id: 'buffer_change', type: 'text', label: 'One change I will make this month to keep a little back', rows: 3 },
          { id: 'amount_rhythm', type: 'text', label: 'What I will set aside, and how often', rows: 2 },
          { id: 'when_asked', type: 'text', label: 'What I will do when a request comes that I cannot afford', rows: 3 },
        ],
      },
    ],
    takeaways: [
      'Knowing your real numbers removes most of the worry that comes from guessing.',
      'Generosity works best when you decide it in advance rather than under pressure.',
      'Community saving systems are a strength; trust is what makes them work.',
    ],
    closingReflection: {
      prompt: 'If you could give generously without harming yourself, what would you want your giving to make possible?',
    },
  },

  {
    id: 'kidijitali',
    number: '08',
    swahili: 'Kidijitali',
    english: 'Digital and AI essentials',
    available: true,
    proverb: { sw: 'Akili ni mali.', en: 'Intelligence is wealth.' },
    intro: [
      'Digital tools and artificial intelligence reach further every year. Used well, they widen who can learn, work and be heard. Used carelessly, they spread mistakes quickly and expose things that should stay private.',
      'These exercises build four habits that hold up wherever you live and whatever tools come next. No technical knowledge is needed.',
    ],
    framework: {
      eyebrow: 'Tamu framework',
      heading: 'Kanuni nne · four rules',
      cards: [
        { label: '01 · Thibitisha (verify)', title: 'Verify', body: 'Check a claim at its source before you repeat it. Two independent sources, not one forwarded screenshot.' },
        { label: '02 · Linda (protect)', title: 'Protect', body: 'Keep passwords, documents and other people\u2019s stories out of public places — including chats with AI tools.' },
        { label: '03 · Tambua (disclose)', title: 'Disclose', body: 'Say plainly when a tool or AI helped produce something you share, submit or publish.' },
        { label: '04 · Faidika (benefit)', title: 'Extend yourself', body: 'Use these tools to reach further, not to skip the thinking that is meant to be yours.' },
      ],
    },
    exercises: [
      {
        id: '8.1',
        number: 'Exercise 8.1',
        title: 'Check a claim',
        instructions: 'Take a claim you have seen recently — a headline, a statistic or a forwarded message — and check it properly.',
        fields: [
          { id: 'claim', type: 'text', label: 'The claim', rows: 3 },
          { id: 'source', type: 'text', label: 'Where it came from, and who is behind it', rows: 2 },
          { id: 'checks', type: 'text', label: 'Two independent sources I could check it against', rows: 3 },
          { id: 'conclusion', type: 'text', label: 'What I found, and what I will say if I pass it on', rows: 4 },
        ],
      },
      {
        id: '8.2',
        number: 'Exercise 8.2',
        title: 'Privacy habits',
        instructions: 'Rate each statement from 1 (not true yet) to 5 (very true).',
        fields: [
          {
            id: 'privacy',
            type: 'rating',
            label: 'About my digital privacy',
            statements: [
              { id: 'p1', text: 'I check who can see something before I post it.' },
              { id: 'p2', text: 'I keep identity documents and bank details off shared or public devices.' },
              { id: 'p3', text: 'My email account has a password I do not use anywhere else.' },
              { id: 'p4', text: 'I keep other people\u2019s photos and stories private unless they agree.' },
              { id: 'p5', text: 'I know how to report or block harassment when it happens.' },
            ],
          },
        ],
      },
      {
        id: '8.3',
        number: 'Exercise 8.3',
        title: 'Using AI honestly',
        instructions: 'AI can be a strong assistant and a poor authority. Decide where the line is for you.',
        fields: [
          { id: 'helps', type: 'text', label: 'A task where a digital tool or AI genuinely helps me, and how', rows: 4 },
          { id: 'never_decide', type: 'text', label: 'A decision a tool should never make for me', rows: 3 },
          { id: 'disclose', type: 'text', label: 'How I will tell people that a tool did part of the work', rows: 3 },
          { id: 'verify_ai', type: 'text', label: 'How I will check AI output before I rely on it or pass it on', rows: 3 },
        ],
      },
    ],
    takeaways: [
      'Verify before you share: a claim is only as good as its source.',
      'Protect private information, including other people\u2019s.',
      'Say when a tool helped, and keep the thinking that has to be yours.',
    ],
    closingReflection: {
      prompt: 'Which habit in this section would change the most in your daily life if you kept it?',
    },
  },

  {
    id: 'kurudi',
    number: null,
    swahili: 'Kurudi',
    english: 'Returning: back to the mirror',
    available: true,
    special: 'kurudi',
    intro: [
      'Kurudi means to return. This is where you take the same ten Kioo (mirror) statements again, and where you see your first reflection beside your latest one.',
      'You can return as many times as you like. Each attempt is kept with its date, and the comparison highlights the statements where you moved up.',
    ],
    framework: {
      eyebrow: 'How returning works',
      heading: 'The mirror, held up again',
      cards: [
        { label: '01 · Rudia (repeat)', title: 'Take it again', body: 'Answer the same ten statements as honestly as you can today.' },
        { label: '02 · Linganisha (compare)', title: 'See the comparison', body: 'Your first reflection and your latest one appear side by side, with upward moves highlighted.' },
        { label: '03 · Nyakati (times)', title: 'Every attempt is kept', body: 'Each return is stored with its date. Nothing is overwritten and nothing is graded.' },
        { label: '04 · Endelea (continue)', title: 'Return often', body: 'There is no limit. Come back at the end of a course or whenever a season of life closes.' },
      ],
    },
    exercises: [],
    takeaways: [
      'Movement is usually quiet — the comparison makes it visible.',
      'An honest answer today is more useful than a flattering memory of last time.',
      'You are allowed to go down as well as up. It is information, not failure.',
    ],
    closingReflection: {
      prompt: 'Looking at your first reflection beside your latest, what do you want to say to the person who started?',
    },
  },
];

export function getGuideSection(sectionId) {
  return GUIDE_SECTIONS.find((section) => section.id === sectionId) || null;
}

export function getSectionNeighbours(sectionId) {
  const index = GUIDE_SECTIONS.findIndex((section) => section.id === sectionId);
  if (index === -1) return { previous: null, next: null };
  return {
    previous: index > 0 ? GUIDE_SECTIONS[index - 1] : null,
    next: index < GUIDE_SECTIONS.length - 1 ? GUIDE_SECTIONS[index + 1] : null,
  };
}

export const TOTAL_SECTIONS = GUIDE_SECTIONS.length;

/**
 * The guide's pathway, grouped the way the course pages group their learning
 * areas: an opening phase, the working sections, and the return.
 */
export const GUIDE_PHASES = [
  {
    id: 'phase-karibu',
    number: '01',
    eyebrow: 'Karibu · the beginning',
    title: 'Begin where you are',
    intro: 'Start here if the guide is new to you. Three sections set the ground: a welcome, your own journey, and the first look in the mirror.',
    sectionIds: ['karibu', 'safari-yako', 'kioo'],
  },
  {
    id: 'phase-njia',
    number: '02',
    eyebrow: 'Njia · the path',
    title: 'Practise the skills',
    intro: 'The working sections of the guide: resilience, problem solving, communicating through relationship, well-being, money and community, and digital essentials.',
    sectionIds: ['uthabiti', 'kutatua', 'sauti', 'utu', 'ujima', 'kidijitali'],
  },
  {
    id: 'phase-kurudi',
    number: '03',
    eyebrow: 'Kurudi · the return',
    title: 'Return to the mirror',
    intro: 'Come back when a course ends or a season of life closes, and hold your latest reflection beside the one you began with.',
    sectionIds: ['kurudi'],
  },
];