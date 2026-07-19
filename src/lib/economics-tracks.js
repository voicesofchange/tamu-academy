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
            video: {
              embedUrl: 'https://www.youtube.com/embed/6DPU4eouAt8',
              title: 'Lesson 1: Economics Is About More Than Money',
            },
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
              passingScore: 3,
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
              'Score at least 3 of 4 graded questions correct and complete Question 5.',
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
            route: 'module-2',
            title: 'How African Economies Actually Work',
            description:
              'Examines formal and informal work, household production, agriculture, services, small enterprise, infrastructure, and global value chains.',
            status: 'In development',
            estimatedTime: '40\u201355 minutes, excluding optional discussion',
            video: {
              embedUrl: 'https://www.youtube.com/embed/M9llDPq54LE',
              title: 'Lesson 2: How African Economies Actually Work',
            },
            competency:
              'By the end of this module, learners should be able to analyze one everyday economic activity by identifying its formal, informal, household, and community dimensions; the sectors and workers involved; the institutions and infrastructure supporting it; and its connection to wider markets and value chains.',
            overview: [
              'African economies cannot be understood only through formal jobs, registered companies, GDP statistics, or large corporations. Everyday economic life also depends on informal work, household production, unpaid care, agriculture, services, small enterprises, community networks, infrastructure, and regional and global markets.',
              'This module provides a broader framework for seeing how these systems interact. It emphasizes that what is not fully counted may still be economically essential, and that local activity is shaped by institutions, infrastructure, history, and global value chains.',
            ],
            learningObjectives: [
              'Explain why African economies should not be reduced to GDP, formal employment, or large corporations.',
              'Distinguish formal, informal, household, and community-based economic activity.',
              'Identify how agriculture, services, small enterprise, trade, and digital activity connect.',
              'Explain why informal and unpaid work can be economically significant even when undercounted.',
              'Describe how infrastructure and institutions shape productivity and opportunity.',
              'Trace how a local activity connects to a wider market or global value chain.',
            ],
            keyConcepts: [
              {
                term: 'Formal Economic Activity',
                definition:
                  'Formal activity operates within recognized legal and administrative systems. Businesses may be registered, licensed, taxed, and required to follow employment, accounting, and regulatory rules. Formal workers may have contracts, predictable wages, legal protections, or benefits.',
              },
              {
                term: 'Informal Economic Activity',
                definition:
                  'Informal activity operates partly or fully outside some systems of registration, taxation, labour protection, or regulation. Informal does not automatically mean illegal, disorganized, or unimportant. It often provides income where formal employment is limited, while also exposing workers to instability and weak protection.',
              },
              {
                term: 'Household Production and Unpaid Care',
                definition:
                  'Households produce essential economic value through cooking, caregiving, childcare, water collection, subsistence farming, household management, and unpaid family labour. This work may not involve a wage, but it supports paid employment, education, health, and daily survival.',
              },
              {
                term: 'Economic Sectors and Interdependence',
                definition:
                  'Agriculture, industry, and services are connected rather than isolated. Farming links to transport, storage, processing, finance, retail, and exports. Services include both professional work and everyday activities such as transport, retail, hospitality, and domestic services.',
              },
              {
                term: 'Underemployment',
                definition:
                  'Underemployment occurs when a person works fewer hours than they need, earns insufficient income, or performs work that does not fully use their skills. A person can therefore be working and still be economically insecure.',
              },
              {
                term: 'Institutions and Infrastructure',
                definition:
                  'Economic possibility depends on systems such as roads, electricity, internet access, schools, banks, courts, property systems, local government, regulation, and public trust. Individual effort matters, but it operates within these surrounding conditions.',
              },
              {
                term: 'Global Value Chains and Value Capture',
                definition:
                  'A local product may pass through producers, processors, exporters, global buyers, retailers, and consumers. Participation in the chain does not guarantee equal benefit. The stages controlling processing, branding, finance, logistics, or consumer access often capture more value.',
              },
            ],
            reflectionQuestions: [
              'Think of one economic activity that is common in your community. Which parts are formal, informal, household-based, or community-supported?',
              'Identify one type of unpaid or undercounted work that makes paid economic activity possible. Who performs it, and what would happen if it stopped?',
              'Choose one local worker or small business. Which institutions and infrastructure expand or limit their opportunity?',
            ],
            quiz: {
              passingScore: 3,
              questions: [
                {
                  id: 1,
                  prompt: 'Which statement best describes informal economic activity?',
                  options: [
                    'Activity that is always illegal and should not be counted',
                    'Activity operating partly or fully outside some registration, taxation, labour-protection, or regulatory systems',
                    'Activity performed only within households',
                    'Activity that never interacts with formal institutions',
                  ],
                  correctIndex: 1,
                  feedback:
                    'Informal activity operates partly or fully outside some formal registration, taxation, labour-protection, or regulatory systems. It is not automatically illegal or unimportant.',
                },
                {
                  id: 2,
                  prompt: 'Why is unpaid care work economically significant?',
                  options: [
                    'It has no economic value because no wage is paid',
                    'It matters only when it is performed by a registered business',
                    'It supports paid work, education, health, and household survival even when it is not fully counted',
                    'It is the same as unemployment',
                  ],
                  correctIndex: 2,
                  feedback:
                    'Unpaid care and household production support paid work, education, health, and survival even when no wage is exchanged.',
                },
                {
                  id: 3,
                  prompt: 'Which example best illustrates underemployment?',
                  options: [
                    'A worker has stable hours, a contract, and sufficient income',
                    'A trained technician works a few casual hours and wants more work',
                    'A retired person is not seeking employment',
                    'A student chooses not to work during examinations',
                  ],
                  correctIndex: 1,
                  feedback:
                    'Underemployment includes too few hours, insufficient income, or work that does not fully use a person\u2019s skills.',
                },
                {
                  id: 4,
                  prompt:
                    'A farmer produces tomatoes, but poor roads cause delays and spoilage before the tomatoes reach market. Which lesson concept best explains the constraint?',
                  options: [
                    'Infrastructure shapes productivity and market access',
                    'The farmer is not participating in the economy',
                    'Informal work has no connection to formal systems',
                    'GDP automatically solves local transport problems',
                  ],
                  correctIndex: 0,
                  feedback:
                    'Roads and transport systems affect market access, spoilage, productivity, and income.',
                },
                {
                  id: 5,
                  written: true,
                  prompt:
                    'Choose one local economic activity, such as a market vendor, boda boda service, farm, repair shop, childcare arrangement, or mobile-money kiosk. Identify one formal or informal feature, one supporting institution or infrastructure system, one type of hidden or undercounted work, and one connection to a wider market or value chain.',
                  feedback:
                    'Compare your response against the four elements named in the question \u2014 a formal or informal feature, a supporting institution or infrastructure system, hidden or undercounted work, and a connection to a wider market or value chain \u2014 and consider whether your explanation showed how they interact.',
                },
              ],
            },
            activity: {
              title: 'Local Economic Activity Systems Map',
              purpose:
                'Analyze one real economic activity through formal, informal, household, institutional, sectoral, and market connections.',
              instructions: [
                'Choose one economic activity from your community or another African setting. Examples include a market stall, boda boda service, farm, mobile-money kiosk, tailoring business, food vendor, construction crew, childcare arrangement, repair shop, transport route, cooperative, or digital service.',
                'Complete each section using specific details. Your final analysis should explain how the activity depends on systems that may not be immediately visible.',
              ],
              fields: [
                { id: 'activity_location', label: 'Economic activity and location', helper: 'What economic activity are you analyzing, and where does it take place?' },
                { id: 'people_roles', label: 'People and roles (paid and unpaid)', helper: 'Who participates? Note paid workers, unpaid contributors, owners, family members, and customers.' },
                { id: 'dimensions', label: 'Formal, informal, household, and community dimensions', helper: 'Which parts of the activity are formal, informal, household-based, or community-supported?' },
                { id: 'sectors_inputs', label: 'Sectors, resources, and inputs', helper: 'Which sectors connect to the activity (e.g. agriculture, services, trade, transport) and what resources or inputs does it rely on?' },
                { id: 'institutions_infrastructure', label: 'Institutions and infrastructure', helper: 'Which institutions (laws, banks, local government, schools) and infrastructure (roads, electricity, internet) make the activity possible or limit it?' },
                { id: 'hidden_work', label: 'Hidden or undercounted work', helper: 'What unpaid, household, or undercounted labour supports the activity, and who performs it?' },
                { id: 'market_connections', label: 'Market or value-chain connections', helper: 'How does the activity connect to wider markets, suppliers, processors, exporters, or global value chains?' },
                { id: 'who_captures_value', label: 'Who captures value', helper: 'Where in the chain is value captured, and by whom?' },
                { id: 'who_carries_risk', label: 'Who carries risk or instability', helper: 'Who carries the risk, instability, or exposure to loss?' },
                { id: 'barriers_opportunities', label: 'Barriers and opportunities', helper: 'What barriers limit the activity, and what opportunities could strengthen it?' },
                { id: 'final_analysis', label: 'Final systems analysis', helper: 'Explain how the activity depends on systems that may not be immediately visible, using at least four concepts from the module.' },
              ],
            },
            completionRequirements: [
              'Watch the recorded lesson.',
              'Review the key concepts.',
              'Respond to at least one reflection question.',
              'Complete Questions 1\u20134 and answer Question 5.',
              'Answer at least 3 of the 4 auto-scored questions correctly.',
              'Complete the Local Economic Activity Systems Map.',
            ],
            closingText: [
              'African economies are not limited to what appears in formal records. They are also built through informal work, households, care, small enterprises, community relationships, agriculture, services, and local systems of exchange.',
              'A complete economic analysis asks what work is visible, what work is hidden, which systems make the activity possible, who captures the value, and how local choices connect to wider institutions and markets.',
              'In the next module, learners will examine how inflation, employment, wages, and the cost of living turn national economic indicators into everyday household pressures.',
            ],
            sources: [
              'International Labour Organization, ILOSTAT resources on informality and labour markets.',
              'World Bank, World Development Indicators on employment by sector.',
              'Gibbon, P., and Ponte, S. Trading Down: Africa, Value Chains, and the Global Economy.',
              'Oloruntoba, S. O., and Falola, T. The Political Economy of Africa.',
              'Cooper, F. Africa and the World Economy.',
            ],
          },
          {
            number: 'Module 3',
            route: 'module-3',
            title: 'Inflation, Employment and the Cost of Living',
            description:
              'Explains inflation, household budgets, purchasing power, wages, employment, underemployment, and economic policy choices.',
            status: 'In development',
            estimatedTime: '40\u201355 minutes, excluding optional discussion',
            video: {
              embedUrl: 'https://www.youtube.com/embed/LRvVTa5fxVc',
              title: 'Lesson 3: Inflation, Employment and the Cost of Living',
            },
            competency:
              'By the end of this module, learners should be able to analyze a household cost-of-living situation by identifying the main price pressures, assessing changes in nominal and real income, describing employment or underemployment conditions, and evaluating one policy response and its trade-offs.',
            overview: [
              'Inflation, employment, and the cost of living are often presented as national statistics, but households experience them through food prices, rent, transport, fuel, wages, work hours, and difficult budget choices. This module explains how broad economic indicators become everyday pressures and why households do not experience inflation or employment conditions in the same way.',
              'Learners distinguish nominal income from real purchasing power, examine employment as a spectrum that includes underemployment and labour-force exit, and evaluate how government and central-bank responses involve trade-offs.',
            ],
            learningObjectives: [
              'Define inflation in clear everyday language and distinguish it from a rise in the price of one item.',
              'Explain how a consumer price basket is used to measure changes in the general price level.',
              'Describe how inflation affects household budgets and purchasing power.',
              'Distinguish nominal income from real income or real wages.',
              'Differentiate employment, unemployment, underemployment, and labour-force exit.',
              'Evaluate how policy responses to inflation and employment involve trade-offs.',
            ],
            keyConcepts: [
              {
                term: 'Inflation',
                definition:
                  'Inflation is a sustained increase in the general level of prices across an economy. A single product becoming more expensive is not necessarily inflation; inflation refers to broader price increases across many goods and services.',
                example:
                  'Food, transport, rent, and energy prices rise across several months, reducing what the same income can buy.',
              },
              {
                term: 'Consumer Price Basket and CPI',
                definition:
                  'Statistical agencies track a representative basket of goods and services commonly purchased by households. The Consumer Price Index, or CPI, estimates how the cost of that basket changes over time. It is an average, so individual households may experience different pressures.',
                example:
                  'A household that spends a large share of income on food may feel higher food inflation more strongly than the national average suggests.',
              },
              {
                term: 'Cost of Living',
                definition:
                  'The cost of living is the amount of money required to maintain a particular standard of living. It includes food, housing, transport, energy, healthcare, education, communication, and other daily needs.',
                example:
                  'A rise in transport fares can affect access to work and school even when a household\u2019s rent is unchanged.',
              },
              {
                term: 'Purchasing Power',
                definition:
                  'Purchasing power describes how much a unit of income can buy. When prices rise faster than income, purchasing power falls and households must reduce consumption, use savings, borrow, or give up other priorities.',
                example:
                  'A monthly income that once covered food, rent, and transport may no longer cover the same basket after prices rise.',
              },
              {
                term: 'Nominal and Real Income',
                definition:
                  'Nominal income is the amount of money a person receives. Real income adjusts for price changes and reflects what that income can actually purchase. A nominal wage increase does not improve living standards when prices rise even faster.',
                example:
                  'A worker receives a 5 percent raise while their regular living costs rise by 8 percent, leaving them with lower real purchasing power.',
              },
              {
                term: 'Employment, Unemployment, and Underemployment',
                definition:
                  'Employment status exists on a spectrum. Underemployment includes working too few hours, earning insufficient income, or performing work that does not fully use one\u2019s skills. Unemployment refers to people without work who are available and actively seeking it.',
                example:
                  'A trained graduate working irregular casual shifts while seeking full-time work is employed but underemployed.',
              },
              {
                term: 'Labour-Force Exit',
                definition:
                  'Labour-force exit includes people who are not working and are not currently seeking work. Some leave because of education, caregiving, disability, retirement, or discouragement after repeated unsuccessful job searches.',
                example:
                  'A discouraged worker stops applying for jobs after months of rejection and is no longer counted as unemployed under common statistical definitions.',
              },
              {
                term: 'Policy Responses and Trade-offs',
                definition:
                  'Central banks may raise interest rates to reduce inflation, while governments may use taxes, subsidies, social protection, public investment, or employment programmes. Every response has costs and benefits, so policy should match the source of the problem.',
                example:
                  'Higher interest rates may slow price pressure but also make loans more expensive for households and businesses.',
              },
            ],
            reflectionQuestions: [
              'Which recent price increase has had the greatest effect on households in your community? Explain why that expense is difficult to reduce.',
              'Think of a person whose income increased but whose living standard did not improve. How might inflation, work hours, debt, or household obligations explain the difference?',
              'Choose one policy response to rising living costs, such as an interest-rate increase, food subsidy, cash transfer, tax reduction, or public-transport investment. Who might benefit, and who might carry a cost?',
            ],
            quiz: {
              passingScore: 3,
              questions: [
                {
                  id: 1,
                  prompt: 'Which statement best defines inflation?',
                  options: [
                    'Any increase in the price of one product',
                    'A sustained increase in the general level of prices across an economy',
                    'A reduction in the number of people working',
                    'A government decision to increase wages',
                  ],
                  correctIndex: 1,
                  feedback:
                    'Inflation refers to a broad and sustained rise in the general price level. A single price increase may have a specific cause and does not necessarily represent economy-wide inflation.',
                },
                {
                  id: 2,
                  prompt:
                    'A worker receives a 5 percent wage increase while the cost of their usual household basket rises by 8 percent. What is the best interpretation?',
                  options: [
                    'Both nominal and real income increased by the same amount',
                    'Nominal income increased, but real purchasing power likely declined',
                    'The worker became unemployed',
                    'Inflation no longer affects the worker',
                  ],
                  correctIndex: 1,
                  feedback:
                    'The worker earns more money in nominal terms, but prices rose faster than income. The wage therefore buys less than before.',
                },
                {
                  id: 3,
                  prompt: 'Which example best illustrates underemployment?',
                  options: [
                    'A worker has stable full-time hours and sufficient income',
                    'A qualified electrician receives only a few casual hours each week and wants more work',
                    'A retired person is not seeking work',
                    'A student chooses not to work during an examination period',
                  ],
                  correctIndex: 1,
                  feedback:
                    'Underemployment includes too few hours, insufficient income, or work that does not fully use a person\u2019s skills.',
                },
                {
                  id: 4,
                  prompt:
                    'A central bank raises interest rates to reduce inflation. Which trade-off is most likely?',
                  options: [
                    'Loans may become more expensive for households and businesses',
                    'Every household immediately receives a higher wage',
                    'Imported goods automatically become free',
                    'Underemployment disappears immediately',
                  ],
                  correctIndex: 0,
                  feedback:
                    'Higher interest rates can reduce borrowing and spending, but they also increase financing costs and may slow investment or hiring.',
                },
                {
                  id: 5,
                  written: true,
                  prompt:
                    'Choose one household or worker affected by rising living costs. Identify one major price pressure, describe the person\u2019s income or employment situation, explain whether their real purchasing power is improving or declining, and evaluate one policy response that could help. Include at least one trade-off or limitation.',
                  feedback:
                    'Compare your response against the elements named in the question \u2014 a major price pressure, the person\u2019s income or employment situation, whether real purchasing power is improving or declining, and one policy response with at least one trade-off or limitation.',
                },
              ],
            },
            activity: {
              title: 'Household Cost-of-Living Pressure Map',
              purpose:
                'Analyze how changes in prices, income, employment, institutions, and policy affect one household or worker.',
              instructions: [
                'Choose a real or realistic household or worker scenario from an African community. Use specific details where possible. You may analyze your own household, a worker you know, or a constructed case based on local conditions.',
                'Complete each section. Your final analysis should explain how prices, income, employment, institutions, and policy interact, rather than treating the cost of living as a single isolated problem.',
              ],
              fields: [
                { id: 'scenario', label: 'Define the Household or Worker Scenario', helper: 'Describe the household or worker you are analyzing. Include location, household size or responsibilities, and relevant economic circumstances.' },
                { id: 'income_sources', label: 'Map Income Sources and Stability', helper: 'What are the main sources of income, and how stable or predictable are they?' },
                { id: 'essential_expenditures', label: 'Identify Essential Expenditures', helper: 'What are the household\u2019s main regular expenses \u2014 food, rent, transport, energy, healthcare, education, communication, or others?' },
                { id: 'price_pressures', label: 'Identify Price Pressures', helper: 'Which prices have increased most, and how strongly do they affect this household?' },
                { id: 'budget_adjustments', label: 'Trace Budget Adjustments and Trade-offs', helper: 'What budget pressure is the household facing, and what trade-offs or adjustments are they making?' },
                { id: 'nominal_real_income', label: 'Compare Nominal and Real Income', helper: 'How has nominal income changed, and what has happened to real purchasing power?' },
                { id: 'employment_conditions', label: 'Examine Employment and Labour Conditions', helper: 'What is the employment status, and is there underemployment, work insecurity, or labour-force exit?' },
                { id: 'institutions_support', label: 'Identify Institutions and Support Systems', helper: 'Which institutions, policies, or support systems \u2014 banks, employers, social protection, government programmes \u2014 affect the situation?' },
                { id: 'policy_response', label: 'Evaluate One Policy Response', helper: 'Which one policy response could help, and how would it work?' },
                { id: 'policy_tradeoffs', label: 'Identify Policy Trade-offs and Distribution', helper: 'What are the trade-offs, limitations, or distributional effects of that policy, and who is most affected?' },
                { id: 'final_analysis', label: 'Final Household Economic Analysis', helper: 'Explain how prices, income, employment, institutions, and policy interact for this household, using at least four concepts from the module.' },
              ],
            },
            completionRequirements: [
              'Watch the recorded lesson.',
              'Review the key concepts.',
              'Respond to at least one reflection question.',
              'Complete Questions 1\u20134 and answer Question 5.',
              'Answer at least 3 of the 4 auto-scored questions correctly.',
              'Complete the Household Cost-of-Living Pressure Map.',
            ],
            closingText: [
              'Inflation and employment are not only national statistics. They become real through food prices, rent, transport, wages, work hours, debt, and the choices households must make when income no longer stretches as far.',
              'A complete analysis distinguishes nominal income from real purchasing power, recognizes underemployment and labour-force exit, and asks how policy responses distribute benefits and costs.',
              'In the next module, learners will examine trade, debt, foreign exchange, commodity dependence, and the global structures connecting African economies to international markets.',
            ],
            sources: [
              'Kenya National Bureau of Statistics, Consumer Price Index and labour-market publications.',
              'Central Bank of Kenya, Monetary Policy Statements and inflation materials.',
              'International Labour Organization, ILOSTAT labour-market indicators and definitions.',
              'World Bank, World Development Indicators on inflation, employment, unemployment, and labour-force participation.',
              'African Development Bank, African Economic Outlook reports.',
              'Fourie, F. C. v. N., and Burger, P. How to Think and Reason in Macroeconomics.',
            ],
          },
          {
            number: 'Module 4',
            route: 'module-4',
            title: 'Trade, Debt and the Global Economy',
            description:
              'Introduces imports, exports, foreign exchange, commodity dependence, value chains, government borrowing, debt service, and global economic power.',
            status: 'In development',
            estimatedTime: '45\u201360 minutes, excluding optional discussion',
            video: {
              embedUrl: 'https://www.youtube.com/embed/tYnKUHHsOAM',
              title: 'Lesson 4: Trade, Debt and the Global Economy',
            },
            competency:
              'By the end of this module, learners should be able to evaluate one trade or debt arrangement by identifying its economic purpose, foreign-exchange exposure, value chain, local value capture, borrowing terms, public-budget effects, beneficiaries, risks, and possible safeguards.',
            overview: [
              'African economies are connected to global markets through imports, exports, finance, foreign exchange, investment, and public borrowing. These connections can expand opportunity and productive capacity, but they can also create vulnerability when countries depend on a narrow range of commodities, import essential goods, borrow in foreign currency, or capture only a small share of value in global supply chains.',
              'This module provides a practical framework for evaluating trade and debt without treating either as automatically good or bad. The focus is on structure, bargaining power, value capture, repayment terms, public choices, and who ultimately benefits or carries risk.',
            ],
            learningObjectives: [
              'Explain imports, exports, trade balances, and foreign exchange in clear language.',
              'Describe why commodity dependence can create exposure to global price shocks.',
              'Explain how global value chains distribute value and bargaining power unevenly.',
              'Distinguish productive public borrowing from debt that becomes difficult to sustain.',
              'Connect exchange-rate changes and debt service to household prices and public budgets.',
              'Evaluate one trade or debt arrangement by examining benefits, risks, terms, and alternatives.',
            ],
            keyConcepts: [
              {
                term: 'Imports, Exports, and the Trade Balance',
                definition:
                  'Imports are goods and services purchased from other countries. Exports are sold abroad and generate income and foreign exchange. A trade deficit is not automatically evidence of failure; its meaning depends on what is imported, how it is financed, and whether imports expand productive capacity.',
              },
              {
                term: 'Foreign Exchange and Exchange Rates',
                definition:
                  'International trade and debt payments often require foreign currency. When a national currency loses value, imported fuel, medicine, machinery, and foreign-currency debt become more expensive in local terms.',
              },
              {
                term: 'Commodity Dependence and Price Shocks',
                definition:
                  'An economy is commodity-dependent when a narrow range of raw materials provides a large share of export earnings or public revenue. Global price changes can then affect foreign exchange, government income, employment, and public spending.',
              },
              {
                term: 'Global Value Chains and Value Capture',
                definition:
                  'A product may move from producer to processor, exporter, global buyer, retailer, and consumer. Processing, branding, logistics, technology, finance, and market access often capture more value than raw production.',
              },
              {
                term: 'Productive Borrowing and Debt Sustainability',
                definition:
                  'Borrowing can support development when it finances useful infrastructure or productive capacity on affordable and transparent terms. Debt becomes harder to sustain when interest is high, repayment is short, currency risk is large, or projects do not create lasting value.',
              },
              {
                term: 'Debt Service and Fiscal Space',
                definition:
                  'Debt service is the payment of principal and interest. High debt service reduces fiscal space \u2014 the room available for healthcare, education, infrastructure, social protection, public employment, and climate resilience.',
              },
              {
                term: 'Bargaining Power and Economic Sovereignty',
                definition:
                  'Trade and debt outcomes depend on who sets prices, controls technology and finance, owns productive assets, and has alternatives. Economic sovereignty concerns a country or community\u2019s capacity to make meaningful choices rather than accept terms without bargaining power.',
              },
            ],
            reflectionQuestions: [
              'Choose one imported good that is important in your community. How would a weaker national currency affect its price and the people who depend on it?',
              'Think of one major export from an African country. Where along the value chain is most value likely created, and what would help more value remain locally?',
              'Consider one public loan or infrastructure project. What evidence would you need before deciding whether the borrowing is productive and fair?',
            ],
            quiz: {
              passingScore: 3,
              questions: [
                {
                  id: 1,
                  prompt: 'Which statement best explains a trade deficit?',
                  options: [
                    'It always proves that an economy has failed',
                    'It occurs when the value of imports exceeds the value of exports',
                    'It means a country has no exports',
                    'It occurs only when a government borrows from another country',
                  ],
                  correctIndex: 1,
                  feedback:
                    'A trade deficit occurs when imports exceed exports. Its implications depend on what is imported, how it is financed, and whether imports expand productive capacity.',
                },
                {
                  id: 2,
                  prompt:
                    'What is a likely effect when a national currency loses value against the currency used to pay for imports?',
                  options: [
                    'Imports become cheaper in local currency',
                    'Foreign-currency debt becomes easier to repay',
                    'Imported fuel and medicine may become more expensive in local currency',
                    'Global commodity prices disappear',
                  ],
                  correctIndex: 2,
                  feedback:
                    'Currency depreciation raises the local-currency cost of imports and foreign-currency obligations.',
                },
                {
                  id: 3,
                  prompt:
                    'Which change would most directly help a producing country retain more value from a commodity?',
                  options: [
                    'Exporting only the raw commodity',
                    'Expanding local processing, branding, and market access',
                    'Eliminating all domestic suppliers',
                    'Avoiding all regional trade',
                  ],
                  correctIndex: 1,
                  feedback:
                    'Local processing, branding, and market access can help a producing economy retain more value.',
                },
                {
                  id: 4,
                  prompt: 'What does debt service refer to?',
                  options: [
                    'The value of all goods exported in one year',
                    'Principal and interest payments made on debt',
                    'Any public spending on roads or schools',
                    'The amount of money held by private banks',
                  ],
                  correctIndex: 1,
                  feedback:
                    'Debt service consists of principal and interest payments.',
                },
                {
                  id: 5,
                  written: true,
                  prompt:
                    'Choose one trade agreement, export sector, public loan, or infrastructure project. Explain its purpose, identify who benefits and who carries risk, describe any foreign-exchange or debt exposure, assess how much value or productive capacity remains locally, and recommend one safeguard or alternative.',
                  feedback:
                    'Compare your response against the elements named in the question \u2014 the arrangement\u2019s purpose, who benefits and who carries risk, any foreign-exchange or debt exposure, how much value or productive capacity remains locally, and one safeguard or alternative.',
                },
              ],
            },
            activity: {
              title: 'Trade and Debt Evaluation Framework',
              purpose:
                'Evaluate one real trade, export, borrowing, infrastructure, or debt arrangement by examining its structure, value capture, currency exposure, benefits, risks, public effects, and alternatives.',
              instructions: [
                'Select one real or hypothetical arrangement to evaluate: a trade agreement, public loan, infrastructure project, export sector, foreign investment arrangement, government borrowing decision, commodity export relationship, or debt restructuring proposal.',
                'Complete each section. Use your final assessment to explain whether the arrangement is likely to expand productive capacity and shared benefit.',
              ],
              fields: [
                { id: 'arrangement', label: 'Select the Arrangement or Economic Issue', helper: 'Identify one trade agreement, export sector, public loan, infrastructure project, or debt arrangement. Briefly explain why it matters.' },
                { id: 'purpose', label: 'Define the Intended Economic Purpose', helper: 'What problem is the arrangement meant to solve? What economic, social, or infrastructure outcome is expected?' },
                { id: 'flows', label: 'Map the Main Economic Flows', helper: 'What goods, services, money, technology, or resources move into and out of the country or community?' },
                { id: 'value_chain', label: 'Examine the Value Chain', helper: 'Who produces, processes, finances, transports, brands, sells, and consumes? Where is the greatest value captured?' },
                { id: 'local_value', label: 'Assess Local Value Retention', helper: 'What jobs, skills, taxes, profits, ownership, or productive capacity remain locally? What value leaves?' },
                { id: 'currency_exposure', label: 'Identify Currency and Price Exposure', helper: 'Is payment, borrowing, or repayment denominated in foreign currency? How could exchange-rate or commodity-price changes affect the arrangement?' },
                { id: 'borrowing_terms', label: 'Examine Borrowing and Repayment Terms', helper: 'If debt is involved, identify the lender, purpose, interest, repayment period, security or conditions, and expected source of repayment.' },
                { id: 'institutions', label: 'Identify Institutions and Decision Makers', helper: 'Which governments, firms, lenders, regional institutions, communities, or regulators shape the arrangement? Who has bargaining power?' },
                { id: 'benefits_risks', label: 'Map Benefits, Costs, and Risks', helper: 'Who receives the main benefits? Who carries financial, social, environmental, or political risk?' },
                { id: 'public_budget', label: 'Examine Public Budget Effects', helper: 'Could repayment or implementation affect healthcare, education, infrastructure, social protection, employment, or climate adaptation?' },
                { id: 'alternatives', label: 'Consider Alternatives and Safeguards', helper: 'What alternative partners, financing structures, local-content requirements, transparency measures, or accountability protections could improve the arrangement?' },
                { id: 'final_assessment', label: 'Final Trade and Debt Assessment', helper: 'Is the arrangement likely to expand productive capacity and shared benefit? Explain your conclusion using at least four concepts from this module.' },
              ],
            },
            completionRequirements: [
              'Watch the recorded lesson.',
              'Review the key concepts.',
              'Respond to at least one reflection question.',
              'Complete Questions 1\u20134 and answer Question 5.',
              'Answer at least 3 of the 4 auto-scored questions correctly.',
              'Complete the Trade and Debt Evaluation Framework.',
            ],
            closingText: [
              'Trade and borrowing can support growth, infrastructure, and employment. But the outcomes depend on what is traded, how debt is structured, who controls the valuable stages of production, what currency is used, and how risk is distributed.',
              'The central questions are: Who benefits? Who carries the risk? What value stays locally? Does the arrangement expand productive capacity? What alternatives or safeguards exist?',
              'In the next module, learners will examine inequality, institutions, and why economic growth does not automatically become shared opportunity.',
            ],
            sources: [
              'World Bank, International Debt Statistics and World Development Indicators.',
              'International Monetary Fund, balance-of-payments, exchange-rate, and debt-sustainability materials.',
              'UN Trade and Development, Trade and Development Reports and commodity analysis.',
              'African Development Bank, African Economic Outlook reports.',
              'World Trade Organization, international trade and global value-chain materials.',
              'Gibbon, P., and Ponte, S. Trading Down: Africa, Value Chains, and the Global Economy.',
              'Cooper, F. Africa and the World Economy.',
              'Amin, S. African political economy and unequal development.',
              'Oloruntoba, S. O., and Falola, T. The Political Economy of Africa.',
            ],
          },
          {
            number: 'Module 5',
            route: 'module-5',
            title: 'Inequality, Institutions and Development',
            description:
              'Examines income, wealth, gender, geographic, and generational inequality and how institutions shape opportunity and development.',
            status: 'In development',
            estimatedTime: '45\u201360 minutes, excluding optional discussion',
            competency:
              'By the end of this module, learners should be able to analyze one inequality or development challenge by identifying its dimensions, affected groups, institutional and historical causes, distribution of benefits and risks, barriers to participation, and one practical reform that could expand inclusive development.',
            overview: [
              'Economic growth can increase national output, investment, and public revenue while leaving large groups excluded from land, finance, quality education, healthcare, secure work, and political voice. Development therefore cannot be evaluated through GDP alone.',
              'This module examines inequality as a multidimensional issue shaped by assets, geography, gender, generation, history, and institutions. Learners use an inclusive-development framework to analyze who gains access to opportunity, who remains excluded, and what institutional changes could expand capability, security, accountability, and dignity.',
            ],
            learningObjectives: [
              'Define inequality beyond income and identify several dimensions of unequal access and security.',
              'Distinguish income, wealth, spatial, gender, and generational inequality.',
              'Explain why GDP growth does not automatically reduce exclusion or improve human wellbeing.',
              'Describe how formal and informal institutions shape access to land, finance, education, justice, and public services.',
              'Connect historical and geographic patterns to present-day inequality and development outcomes.',
              'Evaluate one development challenge using access, voice, capability, security, accountability, and dignity.',
            ],
            keyConcepts: [
              {
                term: 'Growth and Development',
                definition:
                  'Economic growth refers to an increase in output or income. Development asks whether people gain real improvements in health, education, security, opportunity, participation, and dignity. Growth can support development, but the benefits do not distribute themselves automatically.',
              },
              {
                term: 'Income and Wealth Inequality',
                definition:
                  'Income inequality concerns differences in earnings and flows of money. Wealth inequality concerns ownership of assets such as land, housing, businesses, savings, livestock, and financial holdings. Wealth often provides security and opportunity across generations.',
              },
              {
                term: 'Spatial and Regional Inequality',
                definition:
                  'Opportunity can differ sharply by location. Roads, schools, hospitals, internet access, formal employment, courts, and public administration are often concentrated in cities or favored regions, leaving rural and historically marginalized areas with fewer choices.',
              },
              {
                term: 'Gender and Generational Inequality',
                definition:
                  'Gender inequality appears through unpaid care work, employment access, inheritance, safety, financial access, and control over productive assets. Generational inequality affects young people who face limited jobs, housing, land, credit, or inherited wealth.',
              },
              {
                term: 'Formal and Informal Institutions',
                definition:
                  'Formal institutions include laws, courts, schools, banks, tax systems, and land registries. Informal institutions include family networks, social norms, patronage, trust, community obligations, and customary rules. Both can expand opportunity or reinforce exclusion.',
              },
              {
                term: 'Historical Institutional Legacies',
                definition:
                  'Past systems of land allocation, labor control, infrastructure, education, and extraction can shape present opportunities. Historical legacies do not make change impossible, but they help explain why inequality persists across places and generations.',
              },
              {
                term: 'Capability and Inclusive Development',
                definition:
                  'Inclusive development asks whether people have the real freedom and resources to participate in economic life and pursue lives they value. Access, voice, capability, security, accountability, and dignity provide a broader standard than GDP alone.',
              },
            ],
            reflectionQuestions: [
              'Identify one form of inequality that affects your community. Is it mainly about income, wealth, geography, gender, generation, institutional access, or a combination?',
              'Think of one formal or informal institution that shapes access to opportunity. Who does it help, who may be excluded, and why?',
              'Choose one development project or period of economic growth. What evidence would you need to determine whether the benefits were broadly shared?',
            ],
            quiz: {
              passingScore: 3,
              questions: [
                {
                  id: 1,
                  prompt: 'Which statement best distinguishes economic growth from development?',
                  options: [
                    'Growth measures only population, while development measures exports',
                    'Growth concerns increases in output, while development also considers wellbeing, opportunity, capability, and distribution',
                    'Growth and development always mean exactly the same thing',
                    'Development refers only to foreign aid',
                  ],
                  correctIndex: 1,
                  feedback:
                    'Economic growth concerns increases in output, while development also considers wellbeing, opportunity, capability, and how gains are distributed.',
                },
                {
                  id: 2,
                  prompt: 'Which example best represents wealth inequality?',
                  options: [
                    'Two workers receive different monthly wages',
                    'One household owns land, housing, and financial assets while another owns no significant assets',
                    'Food prices increase across a country',
                    'A government changes an interest rate',
                  ],
                  correctIndex: 1,
                  feedback:
                    'Wealth inequality concerns unequal ownership of assets such as land, housing, businesses, and financial holdings.',
                },
                {
                  id: 3,
                  prompt: 'How can an institution reinforce inequality?',
                  options: [
                    'By applying rules or access requirements that mainly benefit people who already possess assets, connections, or influence',
                    'By guaranteeing that every person receives the same outcome',
                    'By eliminating every informal relationship',
                    'By measuring GDP more frequently',
                  ],
                  correctIndex: 0,
                  feedback:
                    'Institutions can reinforce inequality when rules, access requirements, or enforcement mainly benefit people who already possess assets, connections, or influence.',
                },
                {
                  id: 4,
                  prompt: 'Which question is most consistent with an inclusive-development framework?',
                  options: [
                    'Did national output rise?',
                    'Did exports increase?',
                    'Were people able to gain access, voice, capability, security, accountability, and dignity?',
                    'Did one sector attract foreign investment?',
                  ],
                  correctIndex: 2,
                  feedback:
                    'Inclusive development asks whether people gain access, voice, capability, security, accountability, and dignity.',
                },
                {
                  id: 5,
                  written: true,
                  prompt:
                    'Choose one inequality or development challenge affecting a country, region, or community. Identify the groups involved, explain which institutions and historical or geographic conditions shape the issue, assess who has access and who is excluded, and recommend one institutional or policy change that could expand capability and dignity.',
                  feedback:
                    'Compare your response against the elements named in the question \u2014 the groups involved, the institutions and historical or geographic conditions, who has access and who is excluded, and one institutional or policy change that could expand capability and dignity.',
                },
              ],
            },
            activity: {
              title: 'Inequality and Institutional Access Map',
              purpose:
                'Analyze one inequality or exclusion challenge by examining its dimensions, institutions, historical and geographic roots, distribution of opportunity, barriers, voice, accountability, and possible reforms.',
              instructions: [
                'Select one real inequality or exclusion challenge affecting a country, region, community, social group, economic sector, rural or urban area, gender group, youth population, or historically marginalized population.',
                'Complete each section. Use your final assessment to explain whether current growth or policy arrangements are inclusive.',
              ],
              fields: [
                { id: 'challenge', label: 'Select the Inequality or Development Challenge', helper: 'Identify one real inequality or exclusion issue affecting a country, region, community, or group. Explain why it matters.' },
                { id: 'groups', label: 'Identify the Main Groups', helper: 'Who is affected? Include groups that benefit, groups that are excluded, decision makers, and institutions with influence.' },
                { id: 'dimensions', label: 'Map the Dimensions of Inequality', helper: 'Which dimensions are present: income, wealth, land, education, healthcare, finance, employment, geography, gender, generation, political voice, or security?' },
                { id: 'assets_opportunity', label: 'Examine Assets and Opportunity', helper: 'Who owns or controls land, housing, businesses, finance, technology, education, networks, or other productive assets? How does this affect opportunity?' },
                { id: 'formal_institutions', label: 'Identify Formal Institutions', helper: 'Which laws, courts, schools, banks, tax systems, land registries, government agencies, or public programs shape the issue?' },
                { id: 'informal_institutions', label: 'Identify Informal Institutions', helper: 'Which family networks, norms, customary rules, patronage relationships, trust systems, or community obligations shape access and exclusion?' },
                { id: 'historical_geographic', label: 'Examine Historical and Geographic Conditions', helper: 'What historical decisions, land systems, infrastructure patterns, migration, regional disparities, or past policies help explain the present situation?' },
                { id: 'barriers', label: 'Trace Barriers to Participation', helper: 'What prevents excluded groups from accessing education, health, finance, employment, land, markets, justice, or political voice?' },
                { id: 'distribution', label: 'Analyze Distribution', helper: 'Who captures the gains from economic activity or public investment? Who carries the costs, risks, unpaid labor, displacement, or insecurity?' },
                { id: 'voice_accountability', label: 'Assess Voice and Accountability', helper: 'Who participates in decisions? Which institutions are answerable to affected communities? Where is accountability weak?' },
                { id: 'capability_dignity', label: 'Evaluate Capability, Security, and Dignity', helper: 'How does the issue affect people\u2019s real freedom to pursue valued lives, withstand shocks, and participate with dignity?' },
                { id: 'reforms', label: 'Propose Institutional or Policy Changes', helper: 'Identify practical reforms that could expand access, redistribute opportunity, strengthen accountability, or remove barriers.' },
                { id: 'final_assessment', label: 'Final Inclusive-Development Assessment', helper: 'Explain whether current growth or policy arrangements are inclusive. Use at least four concepts from this module to support your conclusion.' },
              ],
            },
            completionRequirements: [
              'Watch the recorded lesson.',
              'Review the key concepts.',
              'Respond to at least one reflection question.',
              'Complete Questions 1\u20134 and answer Question 5.',
              'Answer at least 3 of the 4 auto-scored questions correctly.',
              'Complete the Inequality and Institutional Access Map.',
            ],
            closingText: [
              'Growth matters, but distribution matters too. Institutions influence who can access land, education, finance, justice, employment, public services, and political voice. Historical and geographic patterns can deepen those differences across generations.',
              'Inclusive development asks whether people have access, voice, capability, security, accountability, and dignity \u2014 not only whether national output increased.',
              'In the next module, learners will examine Africa\u2019s economic futures through industrialization, technology, regional integration, climate resilience, ownership, and shared prosperity.',
            ],
            sources: [
              'Cerra, V., Lama, R., and Loayza, N. Links Between Growth, Inequality, and Poverty. IMF Working Paper 21/68.',
              'Chong, A., and Gradstein, M. Inequality and Institutions. The Review of Economics and Statistics, 89(3), 454-465.',
              'Banerjee, A. V., and Iyer, L. History, Institutions, and Economic Performance. American Economic Review, 95(4), 1190-1213.',
              'Easaw, J., and Savoia, A. Inequality in Developing Economies: The Role of Institutional Development. ECINEQ Working Papers.',
              'International Labour Organization. Women and Men in the Informal Economy: A Statistical Update.',
              'UNDP Human Development Reports and inequality-adjusted human development materials.',
              'African Development Bank, African Economic Outlook reports.',
              'World Bank, World Development Indicators on poverty, inequality, health, education, and access.',
              'Amin, S. Unequal Development and related work on African political economy.',
            ],
          },
          {
            number: 'Module 6',
            route: 'module-6',
            title: 'Africa\u2019s Economic Futures',
            description:
              'Explores industrialization, technology, the future of work, the AfCFTA, climate resilience, ownership, and shared prosperity.',
            status: 'In development',
            estimatedTime: '45\u201360 minutes, excluding optional discussion',
            competency:
              'By the end of this module, learners should be able to design a future-oriented economic strategy for an African country, region, sector, or community by connecting productive capacity, value creation, industrialization, technology, decent work, regional integration, climate resilience, ownership, institutions, and shared prosperity.',
            overview: [
              'Africa\u2019s economic future is not predetermined. Demographic change, urbanization, technology, climate pressure, regional integration, and shifting global markets create both serious risks and genuine possibilities.',
              'This module brings together the full course and asks learners to move from diagnosis to strategy. Learners examine how value creation, industrialization, digital systems, the future of work, regional integration, climate resilience, ownership, and institutions can be combined into an inclusive economic pathway. The central question is not simply what grows, but who owns productive assets, who makes decisions, who captures value, and whether transformation expands dignity and shared prosperity.',
            ],
            learningObjectives: [
              'Explain why Africa\u2019s economic future is shaped by policy, institutional, and ownership choices rather than destiny.',
              'Describe how processing, manufacturing, branding, and ownership create more value than raw-material extraction alone.',
              'Identify opportunities and risks associated with industrialization, digital technology, artificial intelligence, and changing labor markets.',
              'Explain how regional integration and the AfCFTA can support African supply chains and larger markets.',
              'Connect climate resilience and green transformation to economic development and environmental justice.',
              'Evaluate an economic strategy using ownership, capability, dignity, accountability, resilience, and shared prosperity.',
            ],
            keyConcepts: [
              {
                term: 'Economic Futures and Agency',
                definition:
                  'Economic futures are not forecasts that arrive automatically. They are shaped by choices about public policy, institutions, investment, education, ownership, infrastructure, and regional cooperation. History and global power constrain options, but they do not eliminate agency.',
              },
              {
                term: 'Structural Transformation and Value Creation',
                definition:
                  'Structural transformation occurs when an economy develops more productive and diverse activities. Moving from raw extraction toward processing, manufacturing, services, branding, technology, and ownership can retain more skills, income, employment, and profit locally.',
              },
              {
                term: 'Industrialization and Productive Capacity',
                definition:
                  'Industrialization is the sustained ability to produce goods and services at increasing levels of productivity. It may include agro-processing, pharmaceuticals, construction materials, renewable-energy equipment, textiles, logistics, and regional manufacturing. It requires infrastructure, finance, skills, institutions, and deliberate policy.',
              },
              {
                term: 'Digital Economy and Technological Sovereignty',
                definition:
                  'Digital systems can expand access to finance, information, markets, health, and education. Technological sovereignty asks who owns platforms, infrastructure, data, intellectual property, and decision-making systems. Inclusion requires electricity, affordable connectivity, skills, safeguards, and local capacity.',
              },
              {
                term: 'Future of Work and Social Protection',
                definition:
                  'The future of work includes formal employment, informal livelihoods, platform work, automation, entrepreneurship, and care work. A strong strategy should create productive work while extending labor rights, social protection, skills development, and security to workers whose employment is changing.',
              },
              {
                term: 'Regional Integration and the AfCFTA',
                definition:
                  'Regional integration can expand markets, reduce barriers, and connect producers across borders. Its developmental value depends on whether it builds African supply chains, productive capacity, infrastructure, and fair opportunities for countries and firms with different levels of capacity.',
              },
              {
                term: 'Climate Resilience and Green Transformation',
                definition:
                  'Climate resilience means strengthening the ability of economies and communities to withstand and adapt to climate shocks. Green transformation can connect renewable energy, climate-smart agriculture, sustainable cities, adaptation, and environmental justice to new industries and livelihoods.',
              },
              {
                term: 'Ownership, Institutions, and Shared Prosperity',
                definition:
                  'Ownership determines who controls land, firms, infrastructure, technology, data, natural resources, and intellectual property. Institutions determine how decisions are made and gains are distributed. Shared prosperity requires broad participation, accountability, dignity, and fair access to the benefits of transformation.',
              },
            ],
            reflectionQuestions: [
              'Which economic sector or capability should your country or community prioritize over the next decade, and why?',
              'Think of one technology or industrial opportunity. What would need to be locally owned, regulated, or governed for the benefits to be broadly shared?',
              'What is one major trade-off between rapid economic growth and climate resilience, worker protection, regional equity, or community ownership? How could it be managed?',
            ],
            quiz: {
              passingScore: 3,
              questions: [
                {
                  id: 1,
                  prompt: 'Which statement best distinguishes raw extraction from value creation?',
                  options: [
                    'Raw extraction always creates more employment than manufacturing',
                    'Value creation adds processing, skills, technology, branding, or ownership that can retain more income and capability locally',
                    'Value creation means stopping all trade with other countries',
                    'Raw extraction and value creation are identical stages of production',
                  ],
                  correctIndex: 1,
                  feedback:
                    'Value creation occurs when processing, manufacturing, services, technology, branding, or ownership add productive capability and allow more income, skills, and profit to remain locally.',
                },
                {
                  id: 2,
                  prompt: 'Which policy approach is most consistent with inclusive digital transformation?',
                  options: [
                    'Expanding digital platforms without investing in electricity, connectivity, skills, or worker protection',
                    'Combining infrastructure, affordable access, local capacity, data governance, skills, and safeguards for workers and communities',
                    'Allowing only foreign firms to own digital infrastructure and data',
                    'Treating technology as separate from institutions and inequality',
                  ],
                  correctIndex: 1,
                  feedback:
                    'Inclusive digital transformation requires infrastructure, access, skills, local capacity, governance, and protections. Technology alone does not guarantee broad participation or fair outcomes.',
                },
                {
                  id: 3,
                  prompt: 'When is regional integration most likely to support structural transformation?',
                  options: [
                    'When it only increases the movement of imported finished goods',
                    'When each country avoids regional coordination and supply chains',
                    'When it connects African producers, infrastructure, finance, standards, and markets in ways that expand productive capacity',
                    'When smaller economies are excluded from implementation decisions',
                  ],
                  correctIndex: 2,
                  feedback:
                    'Regional integration supports transformation when it helps build African supply chains, productive capacity, infrastructure, and market access rather than merely reorganizing existing imports.',
                },
                {
                  id: 4,
                  prompt: 'Which statement best describes economic sovereignty in this module?',
                  options: [
                    'Complete isolation from global trade and technology',
                    'The capacity to make strategic decisions, negotiate terms, govern key assets, and retain meaningful value while participating in the global economy',
                    'Government ownership of every business and household asset',
                    'Refusing all foreign investment regardless of its terms',
                  ],
                  correctIndex: 1,
                  feedback:
                    'Economic sovereignty concerns strategic capacity, ownership, bargaining power, and the ability to retain value. It does not require isolation or the rejection of all external partnership.',
                },
                {
                  id: 5,
                  written: true,
                  prompt:
                    'Choose one future economic opportunity or challenge affecting an African country, region, sector, or community. Design a strategy that addresses value creation, productive capacity, technology, work and skills, regional integration, climate resilience, ownership, institutions, and shared prosperity. Identify at least two major risks or trade-offs and explain how your strategy would manage them.',
                  feedback:
                    'Compare your response against the elements named in the question \u2014 the opportunity or challenge, value creation, productive capacity, technology, work and skills, regional integration, climate resilience, ownership and institutions, shared prosperity, and at least two major risks or trade-offs with how your strategy would manage them.',
                },
              ],
            },
            activity: {
              title: 'African Economic Futures Action Framework',
              purpose:
                'Design a future-oriented economic strategy that connects productive capacity, value creation, industrialization, technology, work, regional integration, climate resilience, ownership, institutions, and shared prosperity.',
              instructions: [
                'Design a future-oriented economic strategy for one African country, region, city, sector, or community.',
                'Complete each section. Use your final strategy to explain how the plan advances productive capacity, ownership, dignity, resilience, accountability, and shared prosperity.',
              ],
              fields: [
                { id: 'place_sector', label: 'Select the Place, Sector, or Economic Challenge', helper: 'Identify the country, region, community, sector, or economic challenge your strategy will address. Explain why it matters.' },
                { id: 'ten_year_vision', label: 'Define the Ten-Year Vision', helper: 'Describe the economic future you want to help create over the next ten years. What should be different for workers, households, firms, communities, and public institutions?' },
                { id: 'assets_constraints', label: 'Assess Current Assets and Constraints', helper: 'Identify existing resources, skills, infrastructure, institutions, firms, community knowledge, and regional connections. Also identify major constraints and vulnerabilities.' },
                { id: 'value_creation', label: 'Move from Extraction to Value Creation', helper: 'Explain how the strategy will increase processing, manufacturing, services, branding, technology, or ownership rather than relying only on raw-material extraction.' },
                { id: 'productive_capacity', label: 'Build Industrial and Productive Capacity', helper: 'Identify the sectors, infrastructure, finance, skills, standards, research, or public investments needed to expand productive capacity.' },
                { id: 'technology_digital', label: 'Use Technology and Digital Systems', helper: 'Explain how technology, data, platforms, artificial intelligence, or digital infrastructure will be used. Who should own, govern, and benefit from these systems?' },
                { id: 'future_of_work', label: 'Prepare for the Future of Work', helper: 'Identify the jobs and livelihoods the strategy could create, change, or displace. Explain the skills, worker protections, social protection, and care systems required.' },
                { id: 'regional_integration', label: 'Use Regional Integration and Markets', helper: 'Explain how regional trade, the AfCFTA, neighboring countries, or African supply chains could strengthen the strategy and expand markets.' },
                { id: 'climate_resilience', label: 'Build Climate Resilience and Green Transformation', helper: 'Explain how the strategy will respond to climate risks, environmental limits, energy needs, adaptation, and environmental justice.' },
                { id: 'ownership_sovereignty', label: 'Strengthen Ownership and Economic Sovereignty', helper: 'Identify who should own or control land, firms, infrastructure, technology, data, intellectual property, natural resources, and profits. Explain what value should remain locally.' },
                { id: 'institutions_governance', label: 'Identify Institutions and Governance', helper: 'Identify the public, private, regional, community, educational, financial, and legal institutions needed. Explain how accountability and public participation will be protected.' },
                { id: 'inclusion_prosperity', label: 'Define Inclusion and Shared Prosperity', helper: 'Explain how women, youth, rural communities, informal workers, small enterprises, and historically excluded groups will participate and benefit.' },
                { id: 'risks_tradeoffs', label: 'Identify Risks and Trade-Offs', helper: 'Identify at least two risks or trade-offs, such as debt, displacement, automation, environmental harm, unequal regional gains, elite capture, or dependence on external firms. Explain how they will be managed.' },
                { id: 'implementation_path', label: 'Set an Implementation Path', helper: 'List the first three actions, the actors responsible, a realistic time horizon, and indicators that would show whether the strategy is working.' },
                { id: 'final_strategy', label: 'Final Economic Futures Strategy', helper: 'Summarize the strategy and explain how it advances productive capacity, ownership, dignity, resilience, accountability, and shared prosperity. Use at least six concepts from this module.' },
              ],
            },
            completionRequirements: [
              'Watch the recorded lesson.',
              'Review the key concepts.',
              'Respond to at least one reflection question.',
              'Complete Questions 1\u20134 and answer Question 5.',
              'Answer at least 3 of the 4 auto-scored questions correctly.',
              'Complete the African Economic Futures Action Framework.',
            ],
            closingText: [
              'Africa\u2019s economic future will not be determined by one technology, one industry, one agreement, or one leader. It will emerge from choices about productive capacity, ownership, institutions, regional cooperation, workers, climate resilience, and the distribution of economic power.',
              'The final question of this course is therefore not simply whether African economies will grow. It is what kind of economies will be built, who will own them, who will participate, and who they are meant to serve.',
              'Learners are now prepared to complete the African Economic Systems Analysis milestone by applying the course framework to one real economic issue and proposing a grounded response.',
            ],
            courseClosingText: [
              'You have reached the end of the six-module learning sequence. Full course completion requirements and the African Economic Systems Analysis milestone will become available when the course launches.',
            ],
            endOfCourse: {
              label: 'Course modules complete',
              milestone: 'Applied milestone coming soon: African Economic Systems Analysis',
            },
            sources: [
              'African Continental Free Trade Area Secretariat. Official materials on the AfCFTA and regional integration.',
              'African Development Bank. African Economic Outlook reports on structural transformation, jobs, and regional development.',
              'UN Trade and Development. Trade and Development Reports and Economic Development in Africa reports.',
              'International Labour Organization. Future of Work, informal employment, skills, and social-protection materials.',
              'United Nations Development Programme. Human Development Reports and capability-centered development materials.',
              'World Bank. World Development Indicators on industry, infrastructure, employment, trade, energy, and development.',
              'Fofack, H. The Idea of Economic Development: Views from Africa.',
              'Amin, S. Work on African political economy, dependency, and unequal development.',
              'Gibbon, P., and Ponte, S. Trading Down: Africa, Value Chains, and the Global Economy.',
              'Oloruntoba, S. O., and Falola, T. The Political Economy of Africa.',
            ],
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