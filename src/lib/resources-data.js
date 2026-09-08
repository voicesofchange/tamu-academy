/**
 * Learning Resources Registry — public, client-side data for the
 * /resources page. This is the single source of truth for the six
 * learning areas and their curated external resources.
 *
 * To add or update a resource, edit this file. No page markup changes
 * are needed — Resources.jsx and ResourceCard.jsx render from this data.
 *
 * Each resource record supports:
 *   id          — stable unique identifier
 *   area        — the learning area id (matches AREAS[].id)
 *   title       — resource title
 *   organization — publishing organization
 *   description — brief original description (Tamu Academy's own wording)
 *   type        — resource type label
 *   access      — access information note
 *   url         — canonical external URL
 *   order       — display order within the area
 *   active      — whether the resource is currently displayed
 */

export const RESOURCE_AREAS = [
  {
    id: 'ai-and-digital-citizenship',
    number: '01',
    title: 'AI and Digital Citizenship',
    description:
      'Resources exploring how artificial intelligence shapes daily life, digital rights, algorithmic bias, misinformation, and responsible technology use.',
  },
  {
    id: 'intercultural-leadership-and-peacebuilding',
    number: '02',
    title: 'Intercultural Leadership and Peacebuilding',
    description:
      'Materials on dialogue across difference, cultural humility, conflict transformation, and community-led leadership.',
  },
  {
    id: 'public-policy-and-governance',
    number: '03',
    title: 'Public Policy and Governance',
    description:
      'Accessible guides, explainers, and learning materials on how governments work, how policies are made, and how citizens can engage meaningfully.',
  },
  {
    id: 'economics-and-opportunity',
    number: '04',
    title: 'Economics and Opportunity',
    description:
      'Resources on economic systems, inequality, financial literacy, trade, and entrepreneurship from diverse global perspectives.',
  },
  {
    id: 'climate-and-sustainability',
    number: '05',
    title: 'Climate and Sustainability',
    description:
      'Materials on climate science, environmental justice, community resilience, and sustainable design for learners on the frontlines of climate change.',
  },
  {
    id: 'writing-storytelling-and-communication',
    number: '06',
    title: 'Writing, Storytelling, and Communication',
    description:
      'Resources for developing voice, narrative skill, persuasive writing, media literacy, and cross-cultural communication.',
  },
];

export const RESOURCES = [
  // --- 01. AI and Digital Citizenship ---
  {
    id: 'unesco-ai-ethics-recommendation',
    area: 'ai-and-digital-citizenship',
    title: 'Recommendation on the Ethics of Artificial Intelligence',
    organization: 'UNESCO',
    description:
      'A global framework for understanding responsible artificial intelligence through human rights, fairness, transparency, accountability, inclusion, and human oversight.',
    type: 'Ethics framework',
    access: 'Free public resource',
    url: 'https://www.unesco.org/en/artificial-intelligence/recommendation-ethics',
    order: 1,
    active: true,
  },
  {
    id: 'unesco-media-information-literacy',
    area: 'ai-and-digital-citizenship',
    title: 'Media and Information Literacy',
    organization: 'UNESCO',
    description:
      'Educational resources for evaluating information, recognizing misinformation, understanding digital media, and participating responsibly in online spaces.',
    type: 'Learning hub',
    access: 'Free public resource',
    url: 'https://www.unesco.org/en/media-information-literacy',
    order: 2,
    active: true,
  },
  {
    id: 'oecd-ai-principles',
    area: 'ai-and-digital-citizenship',
    title: 'OECD AI Principles',
    organization: 'Organisation for Economic Co-operation and Development',
    description:
      'An accessible introduction to international principles for trustworthy artificial intelligence, including fairness, transparency, safety, and accountability.',
    type: 'Policy guide',
    access: 'Free public resource',
    url: 'https://oecd.ai/en/ai-principles',
    order: 3,
    active: true,
  },
  {
    id: 'elements-of-ai',
    area: 'ai-and-digital-citizenship',
    title: 'Elements of AI',
    organization: 'University of Helsinki and MinnaLearn',
    description:
      'A beginner friendly course explaining what artificial intelligence is, what it can do, how it affects society, and how basic AI methods work.',
    type: 'Online course',
    access: 'Free course; registration may be required',
    url: 'https://www.elementsofai.com/',
    order: 4,
    active: true,
  },

  // --- 02. Intercultural Leadership and Peacebuilding ---
  {
    id: 'unesco-intercultural-dialogue',
    area: 'intercultural-leadership-and-peacebuilding',
    title: 'Intercultural Dialogue',
    organization: 'UNESCO',
    description:
      'A collection examining how dialogue can strengthen inclusion, social cohesion, leadership, education, public policy, and peaceful responses to conflict.',
    type: 'Resource hub',
    access: 'Free public resource',
    url: 'https://www.unesco.org/en/interculturaldialogue',
    order: 1,
    active: true,
  },
  {
    id: 'usip-global-campus',
    area: 'intercultural-leadership-and-peacebuilding',
    title: 'USIP Global Campus',
    organization: 'United States Institute of Peace',
    description:
      'Courses and learning materials covering conflict analysis, peacebuilding, negotiation, mediation, and practical approaches to building peace.',
    type: 'Online learning platform',
    access: 'Public learning platform; registration may be required for courses',
    url: 'https://www.usipglobalcampus.org/',
    order: 2,
    active: true,
  },
  {
    id: 'berghof-handbook-conflict-transformation',
    area: 'intercultural-leadership-and-peacebuilding',
    title: 'Berghof Handbook for Conflict Transformation',
    organization: 'Berghof Foundation',
    description:
      'An open collection connecting academic research with practical experience in conflict transformation, dialogue, mediation, and peacebuilding.',
    type: 'Online handbook',
    access: 'Free public resource',
    url: 'https://berghof-foundation.org/library/berghof-handbook-for-conflict-transformation',
    order: 3,
    active: true,
  },
  {
    id: 'unesco-youth-for-peace',
    area: 'intercultural-leadership-and-peacebuilding',
    title: 'Youth for Peace',
    organization: 'UNESCO',
    description:
      'Materials and programme information focused on intercultural leadership, youth participation, social cohesion, and using dialogue to respond to shared challenges.',
    type: 'Youth leadership resource',
    access: 'Free public resource',
    url: 'https://www.unesco.org/en/interculturaldialogue/youthforpeace',
    order: 4,
    active: true,
  },

  // --- 03. Public Policy and Governance ---
  {
    id: 'international-idea-publications',
    area: 'public-policy-and-governance',
    title: 'International IDEA Publications',
    organization: 'International Institute for Democracy and Electoral Assistance',
    description:
      'Handbooks, reports, briefs, and case studies on democracy, elections, constitutional governance, political participation, inclusion, and accountable institutions.',
    type: 'Publication library',
    access: 'Free public resource',
    url: 'https://www.idea.int/publications',
    order: 1,
    active: true,
  },
  {
    id: 'ogp-foundations-open-government',
    area: 'public-policy-and-governance',
    title: 'Foundations for Open Government',
    organization: 'Open Government Partnership',
    description:
      'An introduction to government transparency, public participation, accountability, civic space, and collaboration between public institutions and communities.',
    type: 'Governance guide',
    access: 'Free public resource',
    url: 'https://www.opengovpartnership.org/national-handbook/foundations/',
    order: 2,
    active: true,
  },
  {
    id: 'afrobarometer-online-data-analysis',
    area: 'public-policy-and-governance',
    title: 'Afrobarometer Online Data Analysis',
    organization: 'Afrobarometer',
    description:
      'A free tool for exploring public opinion data about governance, democracy, public services, economic conditions, and social issues across African countries.',
    type: 'Interactive data tool',
    access: 'Free public resource',
    url: 'https://www.afrobarometer.org/online-data-analysis/',
    order: 3,
    active: true,
  },
  {
    id: 'au-agenda-2063',
    area: 'public-policy-and-governance',
    title: 'Agenda 2063: The Africa We Want',
    organization: 'African Union',
    description:
      'An introduction to the African Union\u2019s continental framework for inclusive development, regional integration, democratic governance, peace, and citizen driven progress.',
    type: 'Policy framework',
    access: 'Free public resource',
    url: 'https://au.int/en/agenda2063/overview',
    order: 4,
    active: true,
  },

  // --- 04. Economics and Opportunity ---
  {
    id: 'core-econ',
    area: 'economics-and-opportunity',
    title: 'CORE Econ',
    organization: 'CORE Econ',
    description:
      'Free, open economics textbooks and learning materials that connect economic ideas to inequality, work, institutions, environmental challenges, and real world evidence.',
    type: 'Open textbook',
    access: 'Free public resource',
    url: 'https://www.core-econ.org/',
    order: 1,
    active: true,
  },
  {
    id: 'afdb-publications',
    area: 'economics-and-opportunity',
    title: 'African Development Bank Publications',
    organization: 'African Development Bank Group',
    description:
      'Research, statistics, policy reports, and economic analysis focused on African development, regional economies, infrastructure, employment, trade, and opportunity.',
    type: 'Research library',
    access: 'Free public resource',
    url: 'https://www.afdb.org/en/knowledge/publications',
    order: 2,
    active: true,
  },
  {
    id: 'world-bank-open-data',
    area: 'economics-and-opportunity',
    title: 'World Bank Open Data',
    organization: 'World Bank',
    description:
      'An interactive source for comparing development indicators related to population, education, health, employment, poverty, trade, and economic growth.',
    type: 'Data platform',
    access: 'Free public resource',
    url: 'https://data.worldbank.org/',
    order: 3,
    active: true,
  },
  {
    id: 'imf-econed-online',
    area: 'economics-and-opportunity',
    title: 'EconEd Online',
    organization: 'International Monetary Fund',
    description:
      'Educational activities and explainers covering money, macroeconomics, international trade, financial cooperation, and the global economy.',
    type: 'Economics learning hub',
    access: 'Free public resource',
    url: 'https://www.imf.org/external/np/exr/center/econed/index.htm',
    order: 4,
    active: true,
  },

  // --- 05. Climate and Sustainability ---
  {
    id: 'ipcc-ar6-synthesis-report',
    area: 'climate-and-sustainability',
    title: 'Climate Change 2023: Synthesis Report',
    organization: 'Intergovernmental Panel on Climate Change',
    description:
      'The major synthesis of current climate science, observed impacts, future risks, adaptation, mitigation, and opportunities for effective climate action.',
    type: 'Scientific report',
    access: 'Free public resource',
    url: 'https://www.ipcc.ch/report/ar6/syr/',
    order: 1,
    active: true,
  },
  {
    id: 'unccelearn-intro-climate-change',
    area: 'climate-and-sustainability',
    title: 'Introductory Course on Climate Change',
    organization: 'One UN Climate Change Learning Partnership',
    description:
      'A self paced introduction to climate science, adaptation, mitigation, climate policy, finance, and practical responses to climate change.',
    type: 'Online course',
    access: 'Course content is free; registration may be required',
    url: 'https://unccelearn.org/course/view.php?id=7&page=overview',
    order: 2,
    active: true,
  },
  {
    id: 'unep-environmental-courses',
    area: 'climate-and-sustainability',
    title: 'UNEP Environmental Courses',
    organization: 'United Nations Environment Programme',
    description:
      'Open learning opportunities on environmental issues including climate resilience, nature based solutions, sustainable development, ecosystems, and environmental governance.',
    type: 'Course collection',
    access: 'Free public learning resources; some courses may require registration',
    url: 'https://www.unep.org/explore-topics/education-environment/what-we-do/massive-open-online-courses',
    order: 3,
    active: true,
  },
  {
    id: 'ejatlas-environmental-justice-atlas',
    area: 'climate-and-sustainability',
    title: 'Environmental Justice Atlas',
    organization: 'Environmental Justice Atlas',
    description:
      'An interactive map documenting environmental conflicts and community responses around the world, with cases involving land, water, extraction, pollution, energy, and climate justice.',
    type: 'Interactive map',
    access: 'Free public resource',
    url: 'https://ejatlas.org/',
    order: 4,
    active: true,
  },

  // --- 06. Writing, Storytelling, and Communication ---
  {
    id: 'purdue-online-writing-lab',
    area: 'writing-storytelling-and-communication',
    title: 'Purdue Online Writing Lab',
    organization: 'Purdue University',
    description:
      'Practical guidance on the writing process, research, citation, academic writing, professional communication, grammar, and developing clear arguments.',
    type: 'Writing guide',
    access: 'Free public resource',
    url: 'https://owl.purdue.edu/',
    order: 1,
    active: true,
  },
  {
    id: 'storycenter-education',
    area: 'writing-storytelling-and-communication',
    title: 'StoryCenter Education',
    organization: 'StoryCenter',
    description:
      'Examples and learning materials exploring digital storytelling in education, public health, advocacy, community engagement, and cultural knowledge.',
    type: 'Digital storytelling resource',
    access: 'Public educational materials; some workshops may require payment',
    url: 'https://www.storycenter.org/education',
    order: 2,
    active: true,
  },
  {
    id: 'gijn-resource-center',
    area: 'writing-storytelling-and-communication',
    title: 'GIJN Resource Center',
    organization: 'Global Investigative Journalism Network',
    description:
      'Practical guides for research, interviews, fact checking, data use, investigative reporting, ethical communication, safety, and presenting evidence clearly.',
    type: 'Journalism and media guide',
    access: 'Free public resource',
    url: 'https://gijn.org/resource/',
    order: 3,
    active: true,
  },
  {
    id: 'isc-learning-library',
    area: 'writing-storytelling-and-communication',
    title: 'Learning Library',
    organization: 'International Storytelling Center',
    description:
      'Free toolkits, videos, projects, and learning materials on using storytelling in education, community work, healthcare, peacebuilding, and public communication.',
    type: 'Storytelling library',
    access: 'Free public resources; some training services may have separate costs',
    url: 'https://www.storytellingcenter.net/initiatives/learning-library/',
    order: 4,
    active: true,
  },
];

/**
 * Returns the active resources for a given area id, sorted by display order.
 */
export function getResourcesByArea(areaId) {
  return RESOURCES.filter(
    (r) => r.area === areaId && r.active !== false,
  ).sort((a, b) => a.order - b.order);
}

/**
 * Returns the total count of active resources.
 */
export function getActiveResourceCount() {
  return RESOURCES.filter((r) => r.active !== false).length;
}