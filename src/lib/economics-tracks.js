/**
 * Future-ready data model for the Economics and Development thematic pillar.
 *
 * Hierarchy:
 *   Pillar (Economics and Development)
 *     → Competency-Based Track(s)
 *       → Course(s)
 *         → Module(s)
 *           → Activities / Milestones
 *
 * This file intentionally structures data so that additional tracks, courses,
 * modules, competencies, and milestones can be added without rebuilding the UI.
 * Only the pilot track is populated in this phase.
 */

export const ECONOMICS_DEVELOPMENT_PILLAR = {
  id: 'economics-and-development',
  name: 'Economics and Development',
};

export const ECONOMICS_DEVELOPMENT_TRACKS = [
  {
    slug: 'african-economic-literacy-and-systems-analysis',
    title: 'African Economic Literacy and Systems Analysis',
    status: 'In development',
    pillar: 'Economics and Development',
    description:
      'A structured learning pathway that develops the ability to examine African economic issues across household, institutional, national, historical, and global dimensions.',
    competency:
      'By completing this learning track, learners should be able to analyze an African economic issue across household, institutional, national, historical, and global dimensions and communicate a grounded assessment of who benefits, who carries risk, and what policy or development choices are available.',
    courses: [
      {
        slug: 'understanding-african-economies-and-the-global-system',
        title: 'Understanding African Economies and the Global System',
        subtitle:
          'A six-module introduction to economic choices, everyday livelihoods, inflation, employment, trade, debt, inequality, institutions, and Africa\u2019s economic futures.',
        pillar: 'Economics and Development',
        track: 'African Economic Literacy and Systems Analysis',
        level: 'Foundational',
        format: 'Self-paced',
        modulesCount: 6,
        status: 'In development',
        estimatedCompletion: 'Approximately 4\u20136 hours',
        certificate: 'Planned',
        access: 'Coming soon',
        description:
          'Understanding African Economies and the Global System introduces learners to economics through African realities, institutions, histories, and everyday experiences.',
        descriptionLong: [
          'Understanding African Economies and the Global System introduces learners to economics through African realities, institutions, histories, and everyday experiences.',
          'The course moves beyond narrow explanations based only on money, markets, and national statistics. Learners examine how households, workers, farmers, businesses, communities, governments, and international institutions make and shape economic decisions.',
          'Across six connected modules, the course explores formal and informal economic activity, inflation and employment, trade and debt, inequality and institutions, and possible pathways for Africa\u2019s economic future.',
          'The course does not treat African economies as one uniform system. It equips learners with a practical framework for examining power, access, ownership, value, opportunity, risk, and development.',
        ],
        whoThisCourseIsFor:
          'This course is designed for students, young professionals, community leaders, educators, entrepreneurs, policy learners, diaspora learners, and anyone seeking a clearer understanding of African economies and their relationship to the global system.\n\nNo previous economics training is required.',
        learningOutcomes: [
          'Explain economic choices using scarcity, trade-offs, incentives, institutions, culture, and power.',
          'Analyze formal, informal, household, and community-based economic activity.',
          'Explain how inflation, wages, employment, and the cost of living affect households.',
          'Evaluate trade, debt, foreign exchange, commodity dependence, and global value chains.',
          'Analyze inequality through income, wealth, gender, geography, history, and institutional access.',
          'Assess economic futures through industrialization, technology, regional integration, climate resilience, ownership, and shared prosperity.',
          'Apply the course framework to a real economic issue affecting an African country or community.',
        ],
        learningPath: [
          'Foundation',
          'Economic Structure',
          'Everyday Economic Pressure',
          'Global Systems',
          'Inequality and Institutions',
          'Future Pathways',
          'Applied Milestone',
        ],
        modules: [
          {
            number: 'Module 1',
            route: 'module-1',
            title: 'Economics Is About More Than Money',
            description:
              'Introduces scarcity, trade-offs, opportunity cost, incentives, institutions, culture, and the relationship between individual choices and the wider economy.',
            status: 'In development',
            estimatedTime: '35\u201350 minutes, excluding optional discussion',
            competency:
              'By the end of this lesson, learners should be able to analyze an everyday economic decision by identifying the limited resources involved, the available alternatives, the opportunity cost, the relevant incentives, and the institutions or social relationships shaping the choice.',
            overview: [
              'Economics is not limited to money, banks, businesses, or financial markets. It examines how people, households, communities, businesses, and governments make choices when time, income, land, labour, information, and other resources are limited.',
              'This lesson introduces scarcity, trade-offs, opportunity cost, incentives, institutions, culture, and the relationship between personal decisions and the wider economy.',
            ],
            keyConcepts: [
              {
                term: 'Scarcity',
                definition:
                  'Scarcity means that available resources are limited relative to the different ways people may want or need to use them. Scarcity does not always mean that nothing is available. It means choices must be made because time, income, land, labour, public funding, and other resources cannot satisfy every possible use at once.',
                example:
                  'A household may have enough income to cover food, rent, transport, and school expenses, but not enough to fund every need at the preferred level.',
              },
              {
                term: 'Trade-off',
                definition:
                  'A trade-off occurs when choosing more of one option requires accepting less of another. Every decision has a trade-off because resources used for one purpose are no longer fully available for another.',
                example:
                  'A government that directs more funding toward a major road project may have less funding available for clinics, schools, water systems, or social protection.',
              },
              {
                term: 'Opportunity Cost',
                definition:
                  'Opportunity cost is the value of the best alternative given up when a choice is made. It is not necessarily the full list of everything that was rejected. It is the most valuable realistic alternative that was not selected.',
                example:
                  'A student who spends Saturday working may earn income, but the opportunity cost could be the study time, rest, or family responsibility they would otherwise have prioritized.',
              },
              {
                term: 'Incentives',
                definition:
                  'Incentives are factors that encourage or discourage particular choices. They can be financial, social, legal, cultural, political, or emotional. People do not respond only to money.',
                example:
                  'A higher wage may encourage someone to accept a job. Family expectations may encourage remittances. Community recognition may encourage volunteering.',
              },
              {
                term: 'Institutions',
                definition:
                  'Institutions are the formal and informal rules, systems, and relationships that shape economic choices. They affect which choices are available, who can access opportunities, and who carries risk.',
                example:
                  'Formal institutions include laws, courts, schools, banks, tax systems, land registries, and government agencies. Informal institutions include family expectations, community norms, chamas, trust, cultural practices, and social obligations.',
              },
            ],
            reflectionQuestions: [
              'Think of an important decision you or your household made recently. What limited resources influenced the decision?',
              'Describe one situation in which family, culture, or community expectations influenced an economic choice. Did the choice make sense when social obligations and relationships were considered?',
              'Think of a government or community decision that affects your area. Who appears to benefit? Who carries the cost? What alternative use of the resources was available?',
            ],
            quiz: {
              passingScore: 4,
              questions: [
                {
                  id: 1,
                  prompt: 'Which statement best defines scarcity?',
                  options: [
                    'A situation in which no resources exist',
                    'A situation in which resources are limited relative to possible uses',
                    'A temporary increase in prices',
                    'A decision made only by governments',
                  ],
                  correctIndex: 1,
                  feedback:
                    'Scarcity means resources are limited relative to the many possible ways they could be used.',
                },
                {
                  id: 2,
                  prompt:
                    'A county government chooses to spend additional funding on a new road instead of expanding a health clinic. What is the opportunity cost?',
                  options: [
                    'The total price of the road',
                    'The taxes collected by the county',
                    'The clinic expansion that was not funded',
                    'The number of people using the road',
                  ],
                  correctIndex: 2,
                  feedback:
                    'Opportunity cost is the most valuable alternative given up \u2014 in this case, expanding the clinic.',
                },
                {
                  id: 3,
                  prompt: 'Which of the following is an informal institution?',
                  options: [
                    'A national court',
                    'A commercial bank',
                    'A government tax agency',
                    'A community savings group based on trust and shared obligations',
                  ],
                  correctIndex: 3,
                  feedback:
                    'Community savings groups may operate through trust, relationships, and shared norms.',
                },
                {
                  id: 4,
                  prompt:
                    'A worker sends part of their income to support relatives even though saving the money would increase their personal financial security. Which explanation best applies the broader economic lens used in this lesson?',
                  options: [
                    'The worker does not understand economics.',
                    'The choice is necessarily irrational because it reduces personal savings.',
                    'The choice may reflect family obligations, social incentives, shared security, and cultural expectations.',
                    'The choice has no economic significance because it involves relatives.',
                  ],
                  correctIndex: 2,
                  feedback:
                    'Economic decisions can reflect family responsibility, culture, reciprocity, and collective security.',
                },
                {
                  id: 5,
                  written: true,
                  prompt:
                    'A student must choose between attending a paid work shift and preparing for an important examination. Identify the scarce resources, the two alternatives, the likely opportunity cost of each choice, and one incentive that may influence the decision.',
                  feedback:
                    'Compare your answer against the key concepts of scarcity, alternatives, opportunity cost, and incentives, and consider whether your explanation covered all four elements.',
                },
              ],
            },
            activity: {
              title: 'Everyday Economic Decision Map',
              purpose:
                'Learners apply the lesson\u2019s concepts to a real decision affecting an individual, household, community, business, or government.',
              instructions: [
                'Choose one economic decision. It may involve household spending, school or employment, starting a business, farming, migration, remittances, public spending, transport, land, or community development.',
                'Complete each section. Use full sentences where requested and refer to at least three lesson concepts in your final assessment.',
              ],
              fields: [
                { id: 'decision', label: 'Decision', helper: 'What decision was made or must be made?' },
                { id: 'scarce_resources', label: 'Scarce resources', helper: 'Which limited resources affect the decision? Consider money, time, land, labour, information, transport, credit, public funding, social support, or another resource.' },
                { id: 'alternatives', label: 'Alternatives', helper: 'What realistic options were available?' },
                { id: 'opportunity_cost', label: 'Opportunity cost', helper: 'What is the most valuable alternative given up? Why was it valuable?' },
                { id: 'incentives', label: 'Incentives', helper: 'What encouraged or discouraged the decision? Consider income, prices, taxes, rules, family expectations, cultural obligations, community recognition, risk, security, or future opportunity.' },
                { id: 'formal_institutions', label: 'Formal institutions', helper: 'Which formal institutions shaped the decision? Consider laws, banks, schools, government agencies, courts, employers, and land systems.' },
                { id: 'informal_institutions', label: 'Informal institutions', helper: 'Which informal institutions shaped the decision? Consider family, community networks, chamas, social norms, cultural expectations, trust, or religious institutions.' },
                { id: 'who_benefits', label: 'Who benefits', helper: 'Who benefits from the decision?' },
                { id: 'who_carries_cost', label: 'Who carries the cost or risk', helper: 'Who carries the cost or risk?' },
                { id: 'fairness', label: 'Fairness assessment', helper: 'Are the benefits and costs distributed fairly?' },
                { id: 'final_analysis', label: 'Final analysis', helper: 'Do you think the decision was reasonable under the circumstances? Explain your answer using at least three concepts from the lesson.' },
              ],
            },
            completionRequirements: [
              'Watch the recorded lesson.',
              'Review the key concepts.',
              'Respond to at least one reflection question.',
              'Complete the five-question knowledge check.',
              'Score at least 4 out of 5.',
              'Complete the Everyday Economic Decision Map.',
            ],
            closingText: [
              'Economics begins with choices. Those choices are shaped by limited resources, competing alternatives, incentives, institutions, relationships, culture, and power.',
              'The purpose of economic analysis is not simply to judge whether a choice was good or bad. It is to understand the conditions under which the choice was made, what was given up, who benefited, and who carried the cost.',
              'In the next module, learners will apply this framework to the formal, informal, household, and community systems that shape how African economies actually work.',
            ],
            sources: [],
          },
          {
            number: 'Module 2',
            title: 'How African Economies Actually Work',
            description:
              'Examines formal and informal work, household production, agriculture, services, small enterprise, infrastructure, and global value chains.',
            status: 'In development',
          },
          {
            number: 'Module 3',
            title: 'Inflation, Employment and the Cost of Living',
            description:
              'Explains inflation, household budgets, purchasing power, wages, employment, underemployment, and economic policy choices.',
            status: 'In development',
          },
          {
            number: 'Module 4',
            title: 'Trade, Debt and the Global Economy',
            description:
              'Introduces imports, exports, foreign exchange, commodity dependence, value chains, government borrowing, debt service, and global economic power.',
            status: 'In development',
          },
          {
            number: 'Module 5',
            title: 'Inequality, Institutions and Development',
            description:
              'Examines income, wealth, gender, geographic, and generational inequality and how institutions shape opportunity and development.',
            status: 'In development',
          },
          {
            number: 'Module 6',
            title: 'Africa\u2019s Economic Futures',
            description:
              'Explores industrialization, technology, the future of work, the AfCFTA, climate resilience, ownership, and shared prosperity.',
            status: 'In development',
          },
        ],
        milestone: {
          title: 'African Economic Systems Analysis',
          description:
            'Learners will select one economic issue affecting an African country or community and examine the problem through household, institutional, historical, national, and global perspectives.',
          analysisPoints: [
            'The economic problem',
            'Effects on households and livelihoods',
            'Institutions involved',
            'Relevant historical conditions',
            'Global economic connections',
            'Who benefits',
            'Who carries the risk',
            'One practical policy or community response',
          ],
          status: 'Planned completion milestone',
        },
      },
    ],
  },
];

/**
 * Retrieve a course by its slug from the Economics and Development tracks.
 * Returns null if not found so calling pages can render a not-found state.
 */
export function getEconomicsCourseBySlug(slug) {
  for (const track of ECONOMICS_DEVELOPMENT_TRACKS) {
    for (const course of track.courses) {
      if (course.slug === slug) {
        return { track, course };
      }
    }
  }
  return null;
}

/**
 * Retrieve a module by its route key (e.g. 'module-1') within a course.
 * Returns { track, course, module } or null if not found.
 */
export function getEconomicsModule(courseSlug, moduleRoute) {
  const found = getEconomicsCourseBySlug(courseSlug);
  if (!found) return null;
  const module = found.course.modules.find((m) => m.route === moduleRoute);
  if (!module) return null;
  return { track: found.track, course: found.course, module };
}