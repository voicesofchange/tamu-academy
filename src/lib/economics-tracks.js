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
            title: 'Economics Is About More Than Money',
            description:
              'Introduces scarcity, trade-offs, opportunity cost, incentives, institutions, culture, and the relationship between individual choices and the wider economy.',
            status: 'In development',
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