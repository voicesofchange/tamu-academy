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