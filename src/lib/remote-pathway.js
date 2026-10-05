/**
 * The Remote Learner pathway.
 *
 * One ordered journey from setting the learner group through to a printed
 * certificate, written for learners on slow or intermittent connections.
 *
 * Every step is labelled with what happens to the learner's work, because that
 * is the thing a low-bandwidth learner most needs to know before committing:
 *
 *   saved   — progress written to their account and readable from any device
 *   offline — material they can print or save and then use with no connection
 *   reading — a page to open while they do have a connection
 *
 * Nothing here changes course access, permissions or saved progress: the
 * pathway only points at what already exists, in the order it is useful.
 */

export const STATE_ORDER = ['saved', 'offline', 'reading'];

export const STATE_STYLES = {
  saved: {
    label: 'Saved to your account',
    note: 'Progress you can return to from any device.',
    color: '#e8b85b',
    border: 'rgba(232,184,91,0.5)',
    background: 'rgba(232,184,91,0.08)',
  },
  offline: {
    label: 'Available offline',
    note: 'Print it or save it, then read or write away from a connection.',
    color: '#f3ead8',
    border: 'rgba(243,234,216,0.45)',
    background: 'rgba(243,234,216,0.07)',
  },
  reading: {
    label: 'Read online',
    note: 'A page to open while you have a connection.',
    color: 'rgba(243,234,216,0.62)',
    border: 'rgba(243,234,216,0.22)',
    background: 'transparent',
  },
};

export const PATHWAY_STAGES = [
  {
    id: 'start',
    label: 'Step 1',
    title: 'Set your learner group',
    intro:
      'Tailoring is presentation only. Choosing Remote Learner changes what your dashboard leads with, never what you can open, and never anything you have already finished.',
    steps: [
      {
        title: 'Confirm Remote Learner on your profile',
        body: 'One field on your profile decides which dashboard view opens for you. You can change it at any time, and your courses and progress stay exactly as they are.',
        to: '/profile',
        cta: 'Open profile',
        state: 'saved',
      },
      {
        title: 'Open your tailored dashboard',
        body: 'Your enrolled courses, the next module to open, and your certificates, led by the low-bandwidth pathways. The view filter there can show another group without saving that choice.',
        to: '/my-courses',
        cta: 'Open my courses',
        state: 'saved',
      },
    ],
  },
  {
    id: 'study',
    label: 'Step 2',
    title: 'Study text-first',
    intro:
      'Every lesson opens as reading. Images and recordings are optional: nothing heavier than text is downloaded until you ask for it.',
    steps: [
      {
        title: 'Sauti za Soko: Markets, Climate and Community Power',
        body: 'Seven modules that open with a short lesson and a saved action plan rather than video, with market cases and Kiswahili discussion prompts alongside the English.',
        to: '/courses/sauti-za-soko',
        cta: 'Open the pathway',
        state: 'saved',
      },
      {
        title: "Safari ya Utu: A Learner's Guide",
        body: 'A self-paced guide you work through section by section. Your answers save privately to your account as you write them, and no one else can read them.',
        to: '/learners-guide',
        cta: 'Open the guide',
        state: 'saved',
      },
      {
        title: 'Economics and community wellbeing',
        body: 'Two longer pathways, written as reading, with a short knowledge check at the end of each module and a case study to sit with.',
        to: '/courses',
        cta: 'Browse the courses',
        state: 'reading',
      },
    ],
  },
  {
    id: 'offline',
    label: 'Step 3',
    title: 'Take it offline',
    intro:
      'These are the pieces built to leave the screen. Printing or saving them never changes anything already stored on your account.',
    steps: [
      {
        title: 'Printable workbook',
        body: 'The whole Safari ya Utu guide as a blank workbook: every section, exercise and reflection, with space to write. Nothing you have saved appears on it, so printing can never overwrite your answers.',
        to: '/learners-guide/print',
        cta: 'Open the printable workbook',
        state: 'offline',
      },
      {
        title: 'Your printable study plan',
        body: 'The plan at the end of this page: the five stages, the few things worth writing down, and room to note the section you are on so you can pick it up again offline.',
        to: '/remote-pathway#offline-plan',
        cta: 'Jump to the plan',
        state: 'offline',
      },
      {
        title: 'Recordings and images, only on request',
        body: 'With Data-Saver switched on, no imagery or video is downloaded at all. On any connection, a lesson recording waits for your tap before it loads.',
        to: '/remote-pathway#pathway-mode',
        cta: 'See the mode switch',
        state: 'offline',
      },
    ],
  },
  {
    id: 'circle',
    label: 'Step 4',
    title: 'Learn with your circle',
    intro:
      'The network side of the pathway, and entirely optional. Everything here is written for low bandwidth, and privacy comes first.',
    steps: [
      {
        title: 'Peer vendor circle track',
        body: 'An optional track that prepares you to convene and facilitate a circle of local traders. Discussion summaries are written without naming anyone who took part.',
        to: '/courses/sauti-za-soko/peer-facilitator',
        cta: 'See the track',
        state: 'saved',
      },
      {
        title: 'Learner stories',
        body: 'Short, text-first accounts from learners studying in low-bandwidth settings, and how they put the courses to use.',
        to: '/stories',
        cta: 'Read stories',
        state: 'reading',
      },
      {
        title: 'Community insights',
        body: 'Aggregated, anonymous numbers from learners across the network. No individual answers are ever shown, to you or to anyone else.',
        to: '/insights',
        cta: 'View insights',
        state: 'reading',
      },
    ],
  },
  {
    id: 'finish',
    label: 'Step 5',
    title: 'Finish and prove it',
    intro:
      'Progress and certificates are stored on your account, and both can be printed when you need them on paper.',
    steps: [
      {
        title: 'Your next unfinished module',
        body: 'The dashboard always names the next module to open, across every course you are enrolled in, so you never have to search for where you stopped.',
        to: '/my-courses',
        cta: 'Open my courses',
        state: 'saved',
      },
      {
        title: 'Certificates as you finish',
        body: 'Each course issues its own certificate in the name you choose, printable or kept on your device. Set that name on your profile before you finish.',
        to: '/profile',
        cta: 'Check your profile',
        state: 'saved',
      },
      {
        title: 'Bring Tamu to your community',
        body: 'Community organisations, youth groups and associations can run a Tamu pathway with us, including printed material for members without a connection.',
        to: '/partnership-inquiry',
        cta: 'Start an inquiry',
        state: 'reading',
      },
    ],
  },
];

/**
 * The printable plan. It is written to be carried: a short checklist per stage
 * and a handful of lines to fill in by hand, so a learner can leave the screen
 * behind and still know where they are.
 */
export const OFFLINE_PLAN = {
  title: 'Remote study plan',
  intro:
    'Print this page, or save it as a PDF and keep it on your device. Nothing written here leaves your hands, and nothing you have saved online is affected by it.',
  blocks: [
    {
      title: 'Step 1 — Set up',
      lines: [
        'My learner group is set to Remote Learner',
        'I know which module I am opening next',
      ],
    },
    {
      title: 'Step 2 — Study',
      lines: [
        'Course I am working through: ______________________________',
        'Section or module I am on: __________________________________',
        'My guide answers save privately as I write them',
      ],
    },
    {
      title: 'Step 3 — Offline',
      lines: [
        'I have printed the workbook, or saved it as a PDF',
        'I have printed this plan',
        'Recordings load only when I press play',
      ],
    },
    {
      title: 'Step 4 — Circle',
      lines: [
        'Someone I could study or discuss this with: ______________________',
        'Discussion notes are written without naming participants',
      ],
    },
    {
      title: 'Step 5 — Finish',
      lines: [
        'Modules completed so far: ____________________________________',
        'Name I want printed on my certificate: __________________________',
      ],
    },
  ],
  footer: 'Tamu Academy — tamuacademy.org',
};