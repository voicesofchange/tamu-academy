/**
 * Safari ya Utu — Learner's Guide content.
 *
 * This is the guide's own workbook content (proverbs, frameworks, exercises and
 * reflections), kept alongside the app so the sections render instantly. It is
 * separate from Tamu Academy's course curriculum, which stays server-side.
 *
 * Sections 03-08 are shells for now: their banner and proverb are in place and
 * the owner supplies each section's framework, exercises, takeaways and closing
 * reflection in a later prompt. Card order, numbering and routes are final so
 * the guide's shape is already complete.
 */

export const GUIDE_TITLE = 'Safari ya Utu';
export const GUIDE_SUBTITLE = 'The journey of humanness · a companion workbook for every Tamu Academy learner';
export const GUIDE_PROVERB = { sw: 'Mtu ni watu', en: 'A person is people.', language: 'Kikuyu and Kiswahili' };

export const GUIDE_PRIVACY_NOTE =
  'Your answers are private to you. Nothing in this guide is graded, and no other learner can see what you write.';

export const HOW_TO_USE = [
  'Start with Safari Yako and the first Kioo reflection.',
  'Use any section, in any order.',
  'Return to the mirror (Kurudi) at the end of a course or every few months.',
  'Learn with a rafiki wa safari (journey partner) — optional.',
];

export const CARE_NOTE =
  'If you are struggling: you do not have to carry it alone. Talk to someone you trust, and reach out to a mental health service near you. If you are in immediate danger, contact your local emergency services.';

/** Placeholder the owner fills in with real services, country by country. */
export const CARE_SUPPORT_PLACEHOLDER = [
  { country: 'Kenya', services: '[Tamu to add a checked list of support services by country]' },
  { country: 'Your country', services: '[Tamu to add a checked list of support services by country]' },
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
        { label: '01 · Ni yako', title: 'It is yours', body: 'Nothing here is graded. No other learner can see your answers, and there is no right way to write them.' },
        { label: '02 · Polepole', title: 'Slowly', body: 'You do not have to finish anything today. One honest page is worth more than ten hurried ones.' },
        { label: '03 · Rudia', title: 'Return', body: 'Come back to a section months later. The same question answered twice shows you your own movement.' },
        { label: '04 · Rafiki wa safari', title: 'A journey partner', body: 'If you choose, walk with someone you trust. A journey partner listens; they do not grade.' },
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
        { label: '01 · Chanzo', title: 'Source', body: 'Where I come from: the people, places and traditions that formed me before I chose anything.' },
        { label: '02 · Njia', title: 'The path', body: 'What has happened along the way: the turns, the teachers, the surprises, the losses.' },
        { label: '03 · Mizigo', title: 'The load', body: 'What I carry now: strengths that steady me, and weights I have learned to work around.' },
        { label: '04 · Mwendo', title: 'Direction', body: 'Where I am going: what I want to grow into, and what I am willing to leave behind.' },
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
        { label: '01 · Ukweli', title: 'Answer honestly', body: 'Answer quickly and honestly. The mirror is only useful if it shows what is actually there.' },
        { label: '02 · Kwanza na Kurudi', title: 'First time and Return', body: 'Your first reflection is your starting point. Every later one is a Return, kept with its date.' },
        { label: '03 · Hakuna alama', title: 'Nothing is graded', body: 'There is no score, no pass and no fail. Only you and your own comparisons.' },
        { label: '04 · Rudia', title: 'Return over time', body: 'Come back at the end of a course or every few months. Movement is easier to see across time.' },
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
      'Waiyaki wa Hinga stood for his people\u2019s land and paid a heavy price; generations later, his stand still gives others strength. Your family has stories like this too. When something feels too hard, the Mizizi questions turn you back to your roots: what your people have done, who stands with you, and what you can give.',
    ],
    framework: {
      eyebrow: 'Tamu framework',
      heading: 'Mizizi · the roots questions',
      cards: [
        { label: '1 · Kumbuka', title: 'Remember', body: 'When did my family or community come through something like this? What did they do?' },
        { label: '2 · Tegemea', title: 'Lean on', body: 'Who can I lean on now, and have I asked them?' },
        { label: '3 · Rudisha', title: 'Give back', body: 'What can I offer someone else facing the same thing?' },
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
        title: 'Mizizi in practice',
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
    available: false,
    proverb: { sw: 'Penye nia, pana njia.', en: 'Where there is a will, there is a way.' },
  },

  {
    id: 'sauti',
    number: '05',
    swahili: 'Sauti',
    english: 'Communicating through relationship',
    available: false,
    proverb: { sw: 'Mkono mmoja haulei mwana.', en: 'One hand cannot raise a child.' },
  },

  {
    id: 'utu',
    number: '06',
    swahili: 'Utu',
    english: 'Relationships and well-being',
    available: false,
    proverb: { sw: 'Mtu ni watu.', en: 'A person is people.' },
    careNote: true,
    preparedNote:
      'This section draws together the Ubuntu and well-being material, including the sources supplied for the workbook. Each source will be integrated with the section content, and the specific claims that still need verification — figures, projections and cultural attributions — will be flagged beside the exercises they belong to rather than presented as established fact.',
  },

  {
    id: 'ujima',
    number: '07',
    swahili: 'Ujima',
    english: 'Money and community',
    available: false,
    proverb: { sw: 'Umoja ni nguvu.', en: 'Unity is strength.' },
  },

  {
    id: 'kidijitali',
    number: '08',
    swahili: 'Kidijitali',
    english: 'Digital and AI essentials',
    available: false,
    proverb: { sw: 'Akili ni mali.', en: 'Intelligence is wealth.' },
  },

  {
    id: 'kurudi',
    number: null,
    swahili: 'Kurudi',
    english: 'Returning: back to the mirror',
    available: true,
    special: 'kurudi',
    intro: [
      'Kurudi means to return. This is where you take the same ten Kioo statements again, and where you see your first reflection beside your latest one.',
      'You can return as many times as you like. Each attempt is kept with its date, and the comparison highlights the statements where you moved up.',
    ],
    framework: {
      eyebrow: 'How returning works',
      heading: 'The mirror, held up again',
      cards: [
        { label: '01 · Rudia', title: 'Take it again', body: 'Answer the same ten statements as honestly as you can today.' },
        { label: '02 · Linganisha', title: 'See the comparison', body: 'Your first reflection and your latest one appear side by side, with upward moves highlighted.' },
        { label: '03 · Nyakati', title: 'Every attempt is kept', body: 'Each return is stored with its date. Nothing is overwritten and nothing is graded.' },
        { label: '04 · Endelea', title: 'Return often', body: 'There is no limit. Come back at the end of a course or whenever a season of life closes.' },
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