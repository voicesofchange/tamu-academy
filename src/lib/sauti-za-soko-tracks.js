/**
 * Public-facing preview metadata for the Sauti za Soko pathway.
 *
 * SECURITY / TRUST BOUNDARY
 * -------------------------
 * This file is bundled into the public browser JavaScript and therefore
 * must contain ONLY preview metadata that is safe to expose publicly:
 * course and module titles, short descriptions, statuses and completion-time
 * estimates. The full, unreleased module content — lessons, Kiambu market
 * cases, context notes, action-plan fields, Kiswahili discussion prompts,
 * quizzes and answer keys — lives server-side-only in
 * base44/shared/sauti-za-soko-curriculum.js and
 * base44/shared/sauti-za-soko-curriculum-advanced.js. It is released to a
 * viewer only through the access-gated getSokoModule backend function.
 */

export const SAUTI_ZA_SOKO_COURSE_SLUG = 'sauti-za-soko';
export const SAUTI_ZA_SOKO_PEER_COURSE_SLUG = 'sauti-za-soko-peer-facilitator';

export const SAUTI_ZA_SOKO_COURSE = {
  slug: SAUTI_ZA_SOKO_COURSE_SLUG,
  title: 'Sauti za Soko: Markets, Climate and Community Power',
  status: 'Available',
  subtitle:
    'A seven-module course built with young market vendors in Kiambu, and written so that learners anywhere can follow it.',
  pillar: 'Economics and Development',
  track: 'African Economic Literacy and Systems Analysis',
  level: 'Applied',
  format: 'Self-paced, with an optional peer discussion',
  modulesCount: 7,
  estimatedCompletion: 'Approximately 6\u20138 hours',
  certificate: 'Available upon completion',
  access: 'Open',
  description:
    'Sauti za Soko treats a market as an economy and a trader as an expert, developing the ability to read markets, manage cash, anticipate weather risk, engage county government, organise collectively and plan for the long term.',
  descriptionLong: [
    'Sauti za Soko, the voice of the market, begins from a simple position: young market vendors already hold detailed working knowledge of how markets function, how prices move, how credit works and how risk lands. The course gives that knowledge a written, analysable shape rather than replacing it.',
    'Across seven connected modules, learners examine a market as an economy, analyse their own enterprise, manage cash and credit in a household where business and family money mix, read weather and season as economic risk, engage county government and public participation, organise collectively for savings and bargaining, and produce a written plan for a market that lasts.',
    'The pathway is grounded in Kiambu County, Kenya, and taught from Kenyan institutions, seasons and trading realities. Local terms such as biashara, soko, chama and county government are introduced and explained plainly on first use, and each module carries an optional international comparison prompt so that learners in the United States and elsewhere can understand the Kenyan case and recognise its parallels without treating either system as interchangeable.',
    'Every module includes a short lesson, a Kiambu market case, key concepts, an optional international comparison, a saved section of the My Soko Action Plan, a Kiswahili discussion prompt, a five-question knowledge check and reflection prompts. An optional eighth module prepares learners to facilitate a peer vendor circle.',
  ],
  whoThisCourseIsFor:
    'This course is designed for young market traders and vendors, members of traders\u2019 associations and savings groups, community and youth organisers, county and civic officials working with informal markets, educators, diaspora learners, and anyone who wants to understand how informal markets actually function.\n\nNo previous economics training is required. The pathway is written for learners in Kenya and for learners elsewhere in equal measure.',
  learningOutcomes: [
    'Read a market as an economy: producers, traders, prices, rules, credit, value and risk.',
    'Analyse one\u2019s own enterprise as a system, including hidden costs and the decisions that matter most.',
    'Manage cash, credit and savings in a business whose money also serves a household.',
    'Assess weather and climate risk across a trading year and adapt stock, storage and timing.',
    'Engage county government constructively, and prepare an evidenced traders\u2019 case.',
    'Organise collective action with clear rules, records and a mandate to negotiate.',
    'Produce a written, resourced plan for an enterprise or a market, with risks, dates and indicators.',
  ],
  learningPath: [
    'The Market as an Economy',
    'Your Own Enterprise',
    'Money and Trust',
    'Weather and Risk',
    'County and Public Decisions',
    'Collective Action',
    'A Plan That Lasts',
    'Optional: Peer Facilitator',
  ],
  // Module preview metadata only.
  modules: [
    {
      number: 'Module 1',
      route: 'module-1',
      title: 'Soko ni Yetu: The Market as an Economy',
      description:
        'Introduces the market as a working economy: producers, traders, prices, rules, credit, value and risk, read from a trading day in Kiambu.',
      status: 'Available',
      estimatedTime: '40\u201355 minutes, excluding the optional discussion',
    },
    {
      number: 'Module 2',
      route: 'module-2',
      title: 'Biashara Is Knowledge: Reading Your Own Business',
      description:
        'Treats the learner\u2019s own enterprise as the object of analysis, including hidden costs, customer groups and the decisions that matter most.',
      status: 'Available',
      estimatedTime: '40\u201355 minutes, excluding the optional discussion',
    },
    {
      number: 'Module 3',
      route: 'module-3',
      title: 'Money, Margin and Trust: Cash in a Small Enterprise',
      description:
        'Cash, credit, savings and mobile money in a business whose money also serves a household, and how to read a loan before accepting it.',
      status: 'Available',
      estimatedTime: '40\u201355 minutes, excluding the optional discussion',
    },
    {
      number: 'Module 4',
      route: 'module-4',
      title: 'Weather, Climate and Market Risk',
      description:
        'Reading rainfall, season and a changing climate as economic risk, and adapting stock, storage, timing and shared arrangements.',
      status: 'Available',
      estimatedTime: '45\u201360 minutes, excluding the optional discussion',
    },
    {
      number: 'Module 5',
      route: 'module-5',
      title: 'Sauti na Nguvu: County Government, Licences and Public Decisions',
      description:
        'How county decisions shape a trading day, and how a traders\u2019 case is prepared, presented and followed up through public participation.',
      status: 'Available',
      estimatedTime: '45\u201360 minutes, excluding the optional discussion',
    },
    {
      number: 'Module 6',
      route: 'module-6',
      title: 'Kikundi ni Nguvu: Savings, Collective Action and Bargaining',
      description:
        'Savings groups, cooperatives, joint buying and storage, the governance that keeps groups alive, and negotiating collectively.',
      status: 'Available',
      estimatedTime: '45\u201360 minutes, excluding the optional discussion',
    },
    {
      number: 'Module 7',
      route: 'module-7',
      title: 'Soko Endelevu: Planning a Market That Lasts',
      description:
        'Brings the course together into one written plan, with risks, dates, responsibilities and indicators, and what it means to lead without leaving others behind.',
      status: 'Available',
      estimatedTime: '50\u201365 minutes, excluding the optional discussion and final reflection',
    },
  ],
  milestone: {
    title: 'My Soko Action Plan',
    description:
      'Across the seven modules, learners build a single saved action plan: their reading of the market, their enterprise profile, their cash and credit rules, their season and risk plan, their county case, their group plan, and finally their one-page plan for a market that lasts.',
    analysisPoints: [
      'My Market Map',
      'My Enterprise Profile',
      'My Cash and Credit Rules',
      'My Season and Risk Plan',
      'My County Case',
      'My Group Plan',
      'My Soko Plan',
      'A peer discussion in Kiswahili or English',
      'A final course reflection',
    ],
    status: 'Built across all seven modules',
  },
};

export const SAUTI_ZA_SOKO_PEER_TRACK = {
  slug: SAUTI_ZA_SOKO_PEER_COURSE_SLUG,
  number: 'Module 8',
  route: 'module-8',
  title: 'Peer Facilitator: Facilitating a Vendor Circle',
  summary:
    'An optional track for learners who have completed the seven core modules. It prepares you to hold one vendor circle with other traders, with clear consent and safeguarding, and certifies peer facilitation separately from the core course.',
  entryRequirement:
    'The seven core modules must be completed first, and your vendor-circle session plan, discussion summary and reflection must be approved by a reviewer.',
  estimatedTime: '60\u201375 minutes, plus one facilitated discussion',
  certificate: 'Separate Peer Facilitator certificate',
};

/**
 * Retrieve a module's PUBLIC PREVIEW metadata by route. Returns null when
 * no match exists. The full module content is fetched separately through
 * the access-gated getSokoModule backend function.
 */
export function getSokoModulePreview(moduleRoute) {
  const module = SAUTI_ZA_SOKO_COURSE.modules.find((m) => m.route === moduleRoute);
  if (!module) return null;
  return { course: SAUTI_ZA_SOKO_COURSE, module };
}