/**
 * Tamu Learning Guide — server-side-only public guide data.
 *
 * Approved public information surfaced to the Tamu Learning Guide agent
 * through the getTamuGuideData backend function. Contains ONLY public
 * course descriptions, published resource metadata, and public site
 * navigation links — no learner data, no curriculum, no assessments,
 * no internal identifiers.
 *
 * Course certificate availability and publication status are derived
 * at request time by getTamuGuideData from the canonical server config
 * (course-registry / publication flags), not stored here.
 *
 * Imported ONLY by Base44 backend functions. Never imported by src/.
 */

export const TAMU_GUIDE_COURSES = [
  {
    slug: 'understanding-african-economies-and-the-global-system',
    title: 'Understanding African Economies and the Global System',
    shortDescription:
      'A six-module introduction to economics through African realities, institutions, histories, and everyday experiences — covering economic choices, livelihoods, inflation, employment, trade, debt, inequality, institutions, and Africa\u2019s economic futures.',
    moduleCount: 6,
    estimatedTime: 'Approximately 4\u20136 hours',
    overviewRoute: '/courses/understanding-african-economies-and-the-global-system',
    level: 'Foundational',
    format: 'Self-paced',
  },
  {
    slug: 'mental-health-community-and-culture',
    title: 'Mental Health, Community and Culture',
    shortDescription:
      'A seven-module, culturally affirming course exploring relational personhood, mental health, community care, and collective healing across African and diaspora communities.',
    moduleCount: 7,
    estimatedTime: 'Approximately 10\u201313 hours total',
    overviewRoute: '/courses/mental-health-community-and-culture',
    level: 'Foundational',
    format: 'Self-paced with private reflection',
  },
];

export const TAMU_GUIDE_RESOURCES = [
  { title: 'Recommendation on the Ethics of Artificial Intelligence', category: 'AI and Digital Citizenship', description: 'A global framework for responsible artificial intelligence through human rights, fairness, transparency, and accountability.', url: 'https://www.unesco.org/en/artificial-intelligence/recommendation-ethics' },
  { title: 'Media and Information Literacy', category: 'AI and Digital Citizenship', description: 'Educational resources for evaluating information and recognizing misinformation.', url: 'https://www.unesco.org/en/media-information-literacy' },
  { title: 'OECD AI Principles', category: 'AI and Digital Citizenship', description: 'International principles for trustworthy artificial intelligence.', url: 'https://oecd.ai/en/ai-principles' },
  { title: 'Elements of AI', category: 'AI and Digital Citizenship', description: 'A beginner-friendly course explaining what AI is and how it affects society.', url: 'https://www.elementsofai.com/' },
  { title: 'Intercultural Dialogue', category: 'Intercultural Leadership and Peacebuilding', description: 'How dialogue can strengthen inclusion, social cohesion, and peaceful responses to conflict.', url: 'https://www.unesco.org/en/interculturaldialogue' },
  { title: 'USIP Global Campus', category: 'Intercultural Leadership and Peacebuilding', description: 'Courses on conflict analysis, peacebuilding, negotiation, and mediation.', url: 'https://www.usipglobalcampus.org/' },
  { title: 'Berghof Handbook for Conflict Transformation', category: 'Intercultural Leadership and Peacebuilding', description: 'Open collection connecting research with practical experience in conflict transformation.', url: 'https://berghof-foundation.org/library/berghof-handbook-for-conflict-transformation' },
  { title: 'Youth for Peace', category: 'Intercultural Leadership and Peacebuilding', description: 'Intercultural leadership, youth participation, and dialogue resources.', url: 'https://www.unesco.org/en/interculturaldialogue/youthforpeace' },
  { title: 'International IDEA Publications', category: 'Public Policy and Governance', description: 'Handbooks and case studies on democracy, elections, governance, and participation.', url: 'https://www.idea.int/publications' },
  { title: 'Foundations for Open Government', category: 'Public Policy and Governance', description: 'Introduction to government transparency, public participation, and accountability.', url: 'https://www.opengovpartnership.org/national-handbook/foundations/' },
  { title: 'Afrobarometer Online Data Analysis', category: 'Public Policy and Governance', description: 'A free tool for exploring public opinion data about governance across African countries.', url: 'https://www.afrobarometer.org/online-data-analysis/' },
  { title: 'Agenda 2063: The Africa We Want', category: 'Public Policy and Governance', description: 'The African Union\u2019s continental framework for inclusive development and governance.', url: 'https://au.int/en/agenda2063/overview' },
  { title: 'CORE Econ', category: 'Economics and Opportunity', description: 'Free, open economics textbooks connecting economic ideas to inequality, work, and real-world evidence.', url: 'https://www.core-econ.org/' },
  { title: 'African Development Bank Publications', category: 'Economics and Opportunity', description: 'Research, statistics, and policy reports focused on African development.', url: 'https://www.afdb.org/en/knowledge/publications' },
  { title: 'World Bank Open Data', category: 'Economics and Opportunity', description: 'Interactive source for comparing development indicators across countries.', url: 'https://data.worldbank.org/' },
  { title: 'EconEd online', category: 'Economics and Opportunity', description: 'Educational activities covering money, macroeconomics, trade, and the global economy.', url: 'https://www.imf.org/external/np/exr/center/econed/index.htm' },
  { title: 'Climate Change 2023: Synthesis Report', category: 'Climate and Sustainability', description: 'The major synthesis of climate science, impacts, risks, and action.', url: 'https://www.ipcc.ch/report/ar6/syr/' },
  { title: 'Introductory Course on Climate Change', category: 'Climate and Sustainability', description: 'A self-paced introduction to climate science, adaptation, and mitigation.', url: 'https://unccelearn.org/course/view.php?id=7&page=overview' },
  { title: 'UNEP Environmental Courses', category: 'Climate and Sustainability', description: 'Open learning on climate resilience, sustainable development, and environmental governance.', url: 'https://www.unep.org/explore-topics/education-environment/what-we-do/massive-open-online-courses' },
  { title: 'Environmental Justice Atlas', category: 'Climate and Sustainability', description: 'An interactive map documenting environmental conflicts and community responses.', url: 'https://ejatlas.org/' },
  { title: 'Purdue Online Writing Lab', category: 'Writing, Storytelling, and Communication', description: 'Practical guidance on the writing process, research, citation, and communication.', url: 'https://owl.purdue.edu/' },
  { title: 'StoryCenter Education', category: 'Writing, Storytelling, and Communication', description: 'Digital storytelling materials for education, advocacy, and community engagement.', url: 'https://www.storycenter.org/education' },
  { title: 'GIJN Resource Center', category: 'Writing, Storytelling, and Communication', description: 'Practical guides for research, fact checking, and investigative reporting.', url: 'https://gijn.org/resource/' },
  { title: 'International Storytelling Center Learning Library', category: 'Writing, Storytelling, and Communication', description: 'Toolkits and learning materials on storytelling in education and community work.', url: 'https://www.storytellingcenter.net/initiatives/learning-library/' },
];

export const TAMU_GUIDE_NAV = [
  { label: 'Home', path: '/' },
  { label: 'Courses', path: '/courses' },
  { label: 'Resources', path: '/resources' },
  { label: 'Articles', path: '/articles' },
  { label: 'Videos', path: '/videos' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
  { label: 'Create account', path: '/register' },
  { label: 'Sign in', path: '/login' },
  { label: 'My Courses', path: '/my-courses' },
];