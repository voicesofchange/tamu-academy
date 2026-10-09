/**
 * Public-facing course preview metadata for Building Wealth Together: Money,
 * Enterprise and Community Leadership, a course in the Economics and
 * Development pillar.
 *
 * SECURITY / TRUST BOUNDARY
 * -------------------------
 * This file is bundled into the public browser JavaScript and therefore
 * contains ONLY preview metadata that is safe to expose publicly: titles,
 * short descriptions, statuses, completion-time estimates, the track
 * grouping, and the capstone option names.
 *
 * The full module content — the lesson text, worked examples, "Try it"
 * activities, dilemmas, concept-check questions and answer keys, and the
 * reflection prompts — lives server-side only in
 * base44/shared/building-wealth-together-curriculum.js and is released to a
 * learner only through the `getWealthModule` backend function, which enforces
 * enrollment, module publication and the prerequisite chain server-side.
 */

export const WEALTH_PILLAR = 'Economics and Development';

export const WEALTH_TRACK_META = [
  {
    id: 'shared-core',
    label: 'Track 1: The Shared Core',
    audience: 'Everyone',
    summary:
      'The three modules every learner completes, whether the goal is a household plan, an enterprise, or leading a group that handles shared money.',
  },
  {
    id: 'entrepreneur',
    label: 'Track 2: The Grassroots Entrepreneur Pathway',
    audience: 'Pathway',
    summary:
      'For learners starting or steadying a business: proving demand before spending, pricing so every sale earns, and keeping the business alive through lean seasons.',
  },
  {
    id: 'leader',
    label: 'Track 3: The Emerging Leader Pathway',
    audience: 'Pathway',
    summary:
      'For learners who lead groups that handle shared money and shared risk: accountability without a title, fair decisions under pressure, and finishing what was promised.',
  },
];

export const WEALTH_CAPSTONE_OPTIONS = [
  {
    id: 'personal_money_plan',
    label: 'Personal Money Plan',
    buildsOn: 'Builds on Modules 1 to 3',
  },
  {
    id: 'enterprise_plan',
    label: 'One-Page Enterprise Plan',
    buildsOn: 'Builds on Modules 4 to 6',
  },
  {
    id: 'group_charter',
    label: 'Group Financial Charter',
    buildsOn: 'Builds on Modules 7 to 9',
  },
];

export const BUILDING_WEALTH_TOGETHER_COURSE = {
  slug: 'building-wealth-together',
  title: 'Building Wealth Together: Money, Enterprise and Community Leadership',
  subtitle:
    'A nine-module course that starts with community: managing your own money, starting and sustaining an enterprise, and leading groups that handle shared money and shared risk.',
  pillar: WEALTH_PILLAR,
  track: 'Community Wealth and Enterprise',
  level: 'Applied',
  format: 'Self-paced',
  modulesCount: 9,
  status: 'Available now',
  estimatedCompletion: 'Approximately 2\u20133 hours per module, plus the capstone',
  certificate: 'Available upon completion',
  access: 'Open',
  description:
    'Building Wealth Together teaches personal money management, enterprise building, and community leadership together, drawing on savings traditions practiced around the world.',
  descriptionLong: [
    'Most financial courses teach you to build wealth alone. This one starts with community. Across nine modules, learners manage their own money, start and sustain an enterprise, and lead groups that handle shared money and shared risk.',
    'The course draws on savings traditions practiced around the world, from chamas and susus to tandas, pardners and paluwagan, and follows characters in Kenya, Ghana, South Africa, the Philippines, the United Kingdom and the United States as they face the same decisions learners will.',
    'Everyone completes the shared core. Learners then take both pathways, or focus on the one that fits their goals, before submitting one of three capstone projects.',
    'No previous background in finance or business is required. Every concept is explained from the ground up, with a worked example, an activity, a local version, a dilemma and a concept check in every module.',
  ],
  whoThisCourseIsFor:
    'Youth, emerging leaders, entrepreneurs, and anyone ready to build wealth that lasts.\n\nYou do not need a background in finance or business. Every concept is explained from the ground up.',
  learningOutcomes: [
    'Manage your household cash flow, calculate your personal runway, and build a safety buffer.',
    'Tell debt that builds your future apart from debt that traps you.',
    'Validate a business idea with real evidence before risking your savings.',
    'Price a product or service so that every sale actually earns money.',
    'Keep a small business alive through late payments and lean seasons.',
    'Lead a group transparently, without needing a formal title.',
    'Guide a group through high-stakes shared decisions without breaking it apart.',
    'Take a community project from idea to finished result.',
  ],
  learningPath: [
    'Shared Core',
    'Grassroots Entrepreneur Pathway',
    'Emerging Leader Pathway',
    'Capstone Project',
  ],
  moduleRhythm: [
    'Welcome to Tamu Academy',
    "What you'll learn",
    'Watch',
    'The lesson',
    'Worked example',
    'Try it',
    'Where you live',
    'The dilemma',
    'Concept check',
    'Reflection',
  ],
  modules: [
    {
      number: 'Module 1',
      route: 'module-1',
      track: 'shared-core',
      trackLabel: 'Track 1: The Shared Core',
      title: 'The Power of Collective Capital',
      description:
        'How savings circles work, why they exist in nearly every culture on earth, who gains most in a rotation, and the safeguards that keep group money and group trust intact.',
      status: 'Available now',
      estimatedTime: 'About 2\u20133 hours, including the activity and dilemma',
    },
    {
      number: 'Module 2',
      route: 'module-2',
      track: 'shared-core',
      trackLabel: 'Track 1: The Shared Core',
      title: 'Personal Runway & Household Cash Flow',
      description:
        'The difference between paper wealth and cash you can use, how to calculate your personal runway, and how to plan for family and community obligations instead of being surprised by them.',
      status: 'Available now',
      estimatedTime: 'About 2\u20133 hours, including the activity and dilemma',
    },
    {
      number: 'Module 3',
      route: 'module-3',
      track: 'shared-core',
      trackLabel: 'Track 1: The Shared Core',
      title: 'Debt vs. Productive Capital',
      description:
        'The test that tells you whether a debt builds your future or drains it, how to recognise predatory lending, and how to compare borrowing options using simple math.',
      status: 'Available now',
      estimatedTime: 'About 2\u20133 hours, including the activity and dilemma',
    },
    {
      number: 'Module 4',
      route: 'module-4',
      track: 'entrepreneur',
      trackLabel: 'Track 2: The Grassroots Entrepreneur Pathway',
      title: 'Community-First Market Validation',
      description:
        'Why friends and family are the most encouraging and least reliable source of feedback, how to ask questions that reveal real needs, and how to test demand with pre-sales.',
      status: 'Available now',
      estimatedTime: 'About 2\u20133 hours, including the activity and dilemma',
    },
    {
      number: 'Module 5',
      route: 'module-5',
      track: 'entrepreneur',
      trackLabel: 'Track 2: The Grassroots Entrepreneur Pathway',
      title: 'Sustainable Pricing & Unit Economics',
      description:
        'How to calculate what each sale really earns you, how to find your break-even point, and why resource pooling lowers costs while your own time must still be counted.',
      status: 'Available now',
      estimatedTime: 'About 2\u20133 hours, including the activity and dilemma',
    },
    {
      number: 'Module 6',
      route: 'module-6',
      track: 'entrepreneur',
      trackLabel: 'Track 2: The Grassroots Entrepreneur Pathway',
      title: 'Keeping the Business Alive',
      description:
        'Why a profitable business can still run out of cash, how to separate your business wallet from your personal wallet, and how to build a weekly cash forecast.',
      status: 'Available now',
      estimatedTime: 'About 2\u20133 hours, including the activity and dilemma',
    },
    {
      number: 'Module 7',
      route: 'module-7',
      track: 'leader',
      trackLabel: 'Track 3: The Emerging Leader Pathway',
      title: 'Leadership Through Ubuntu & Accountability',
      description:
        'How to lead when you have no formal authority, why groups without clear structure develop hidden hierarchies, and how to hold people accountable in a way that repairs.',
      status: 'Available now',
      estimatedTime: 'About 2\u20133 hours, including the activity and dilemma',
    },
    {
      number: 'Module 8',
      route: 'module-8',
      track: 'leader',
      trackLabel: 'Track 3: The Emerging Leader Pathway',
      title: 'Consensus-Building & Joint Risk Navigation',
      description:
        'How to choose the right decision method for a group, how to protect honest dissent from pressure, status and deadlines, and how a group shares a loss fairly.',
      status: 'Available now',
      estimatedTime: 'About 2\u20133 hours, including the activity and dilemma',
    },
    {
      number: 'Module 9',
      route: 'module-9',
      track: 'leader',
      trackLabel: 'Track 3: The Emerging Leader Pathway',
      title: 'Project Stewardship & Execution',
      description:
        'How to turn a community idea into a project with clear goals, milestones and roles, how to track progress openly, and what to do when a project falls behind.',
      status: 'Available now',
      estimatedTime: 'About 2\u20133 hours, including the activity and dilemma',
    },
  ],
  milestone: {
    title: 'Capstone Project: Your Plan for Building Wealth Together',
    description:
      'The capstone brings the course together in one practical document the learner can use in their own life. Learners choose one of three options, the one that best fits their goals, and submit it to complete the course.',
    analysisPoints: [
      'Option 1: Personal Money Plan — builds on Modules 1 to 3',
      'Option 2: One-Page Enterprise Plan — builds on Modules 4 to 6',
      'Option 3: Group Financial Charter — builds on Modules 7 to 9',
    ],
    status: 'Required for completion',
  },
};

/** Modules grouped by track, for the course overview. */
export const WEALTH_TRACKS_WITH_MODULES = WEALTH_TRACK_META.map((track) => ({
  ...track,
  modules: BUILDING_WEALTH_TOGETHER_COURSE.modules.filter((module) => module.track === track.id),
}));

export function getWealthCourseBySlug(slug) {
  if (slug === BUILDING_WEALTH_TOGETHER_COURSE.slug) {
    return BUILDING_WEALTH_TOGETHER_COURSE;
  }
  return null;
}

/**
 * Public preview metadata for one module. Returns { course, module } or null.
 * The full module content is fetched separately through the `getWealthModule`
 * backend function after the server-side access checks.
 */
export function getWealthModulePreview(courseSlug, moduleRoute) {
  const course = getWealthCourseBySlug(courseSlug);
  if (!course) return null;
  const module = course.modules.find((m) => m.route === moduleRoute);
  if (!module) return null;
  return { course, module };
}