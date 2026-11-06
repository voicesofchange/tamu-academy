/**
 * The Diaspora Remittance Economy — public course preview metadata.
 *
 * SECURITY / TRUST BOUNDARY
 * -------------------------
 * This file is bundled into the public browser JavaScript and holds only
 * preview metadata (titles, short descriptions, statuses). The module content
 * — lessons, activities, key terms, quizzes and answer keys — lives in
 * base44/shared/course-template-curriculum.js, server-side only, and reaches a
 * learner through the gated getTemplateCourseModule endpoint.
 *
 * The course is registered in base44/shared/course-template-config.js, which is
 * what actually makes it live; this file only describes it to visitors.
 */

export const DIASPORA_REMITTANCE_COURSE = {
  slug: 'diaspora-remittance-economy',
  title: 'The Diaspora Remittance Economy',
  subtitle:
    'A three-module course on the money that crosses borders between families: what a remittance is, what it costs to send, and what happens where it lands.',
  pillar: 'Economics and Development',
  track: 'African Economic Literacy and Systems Analysis',
  level: 'Foundational',
  format: 'Self-paced',
  modulesCount: 3,
  status: 'Available now',
  estimatedCompletion: 'Approximately 2 hours',
  certificate: 'Available upon completion',
  access: 'Open',
  // Course-template courses end with their last module: there is no separate
  // completion page or certificate page to send a learner to.
  hasCompletionPage: false,
  description:
    'The Diaspora Remittance Economy follows one of the largest and least examined flows of money in the world: the transfers families send across borders to each other.',
  descriptionLong: [
    'The Diaspora Remittance Economy follows one of the largest and least examined flows of money in the world: the transfers families send across borders to each other. It is a course about households rather than institutions, and about the economics that becomes visible only when you follow a payment all the way to the kitchen table.',
    'Across three modules, learners examine what a remittance actually is and how it differs from trade, investment and aid; how a transfer is priced and why the same amount costs so much more on some routes than others; and what happens to a community when money arrives, is spent, saved or sent onward.',
    'The course is written for members of the diaspora, for the families who receive transfers, and for anyone who wants to understand a flow that carries more value than most development finance and far less attention.',
  ],
  whoThisCourseIsFor:
    'Diaspora households who send money home, and the families who receive it.\n\nLearners in economics, development studies or migration studies who want a household-level account of a global flow.\n\nPractitioners in community organisations, cooperatives and credit unions working on financial inclusion.\n\nAnyone who wants to understand where the money goes after the transfer confirmation.',
  learningOutcomes: [
    'Distinguish a remittance from other cross-border flows, and explain why it behaves differently from all of them.',
    'Describe the formal and informal channels a transfer can travel through, and what each one leaves out of the record.',
    'Break the price of a transfer into its fee and its exchange-rate margin, and express the total as a share of the amount sent.',
    'Explain why prices differ between corridors, and what competition and interoperability do to them.',
    'Assess the dependency argument and the concentration risk that sits behind it.',
    'Trace where value settles once money lands, and name the local institutions that keep it circulating.',
  ],
  learningPath: ['The transfer itself', 'The price of sending', 'Where the money lands', 'Household transfer map'],
  modules: [
    {
      number: 'Module 1',
      title: 'What a Remittance Really Is',
      description:
        'Money sent between households across a border: why it is small, steady and counter-cyclical, and what the sending family gives up to send it.',
      status: 'Available now',
      route: 'module-1',
    },
    {
      number: 'Module 2',
      title: 'The Cost of Sending',
      description:
        'The two charges behind one price, how to calculate the real cost of a transfer, and why the three per cent target remains out of reach.',
      status: 'Available now',
      route: 'module-2',
    },
    {
      number: 'Module 3',
      title: 'When the Money Lands',
      description:
        'What receiving households do with a transfer, the dependency argument examined properly, and how value settles in the place it arrives.',
      status: 'Available now',
      route: 'module-3',
    },
  ],
  milestone: {
    title: 'Your household transfer map',
    status: 'Course milestone',
    description:
      'The course closes with one piece of work, built up across the three modules: a map of a real transfer, from the sending household to the point where the money leaves the local economy. It is not collected or graded, and it stays with you.',
    analysisPoints: [
      'Who sends, who receives, and how often the transfer travels.',
      'The channel used on each side, and what it leaves out of the record.',
      'The full price paid: fee, exchange-rate margin, time and risk.',
      'Where the money is spent, and where its value finally settles.',
      'One change that would keep that value nearby for one more step.',
    ],
  },
};