/**
 * Building Wealth Together — module sources.
 *
 * Every factual claim and figure used in a module is listed here against a
 * published source that can be opened directly. A claim whose source could not
 * be verified is NOT given a citation: it is listed under `unsourced` instead,
 * with a plain note on why, so a learner can see which parts of the lesson rest
 * on published evidence and which are the course's own teaching.
 *
 * Server-side only, and deliberately excluded from the translated sections:
 * a source title and URL are quoted, and must reach the learner exactly as
 * published.
 */

const CORNELL_ROSCA = {
  title: 'The Rotating Savings and Credit Association: An Economic Institution',
  publisher: 'Cornell University, Cornell Food and Nutrition Policy Program',
  url: 'https://www.cfnpp.cornell.edu/images/wp15.pdf',
};

const GEO_BANKER_LADIES = {
  title: 'The Banker Ladies',
  publisher: 'Grassroots Economic Organizing',
  url: 'https://geo.coop/articles/banker-ladies',
};

const MEDA_TABLE_BANKING = {
  title: 'How table banking has paved the way for innovation and economic empowerment for women in Kenya',
  publisher: 'Mennonite Economic Development Associates (MEDA)',
  url: 'https://www.meda.org/news/blog/how-table-banking-has-paved-the-way-for-innovation-and-economic-empowerment-for-women-in-kenya/',
};

const CFPB_EMERGENCY_FUND = {
  title: 'An essential guide to building an emergency fund',
  publisher: 'Consumer Financial Protection Bureau (United States)',
  url: 'https://www.consumerfinance.gov/an-essential-guide-to-building-an-emergency-fund/',
};

const FIDELITY_EMERGENCY = {
  title: 'How much to save for emergencies',
  publisher: 'Fidelity Investments',
  url: 'https://www.fidelity.com/viewpoints/personal-finance/save-for-an-emergency',
};

const FED_SHED = {
  title: 'Report on the Economic Well-Being of U.S. Households — would you cover a $400 emergency expense?',
  publisher: 'Board of Governors of the Federal Reserve System',
  url: 'https://www.federalreserve.gov/publications/2026-economic-well-being-of-us-households-in-2025-savings-investments.htm',
};

const PBS_EMERGENCY_FUND = {
  title: 'Why You NEED an Emergency Fund! (Two Cents)',
  publisher: 'PBS',
  url: 'https://www.pbs.org/video/why-you-need-an-emergency-fund-m0uc67/',
};

const JEF_BLACK_TAX = {
  title: 'Black tax: An international exploratory study in the South African context',
  publisher: 'Journal of Economic and Financial Sciences',
  year: '2021',
  url: 'https://jefjournal.org.za/index.php/jef/article/view/612',
};

const PBS_PAYDAY = {
  title: 'Are Payday Loans Ever a Good Idea? (Two Cents)',
  publisher: 'PBS',
  url: 'https://www.pbs.org/video/are-payday-loans-ever-a-good-idea-wlg0p0/',
};

const CAK_DIGITAL_CREDIT = {
  title: 'Report on the Competition Authority of Kenya Digital Credit Market Inquiry',
  publisher: 'Competition Authority of Kenya and Innovations for Poverty Action',
  year: '2021',
  url: 'https://poverty-action.org/sites/default/files/2023-05/Digital_Credit_Market_Inquiry_Report_2021.pdf',
};

const KIPPRA_DIGITAL_CREDIT = {
  title: 'Regulation of Digital Credit Providers in Kenya: Policy Issues and Options',
  publisher: 'Kenya Institute for Public Policy Research and Analysis (KIPPRA)',
  year: '2023',
  url: 'https://kippra.or.ke/regulation-of-digital-credit-providers-in-kenya-policy-issues-and-options/5/',
};

const DW_MOBILE_LENDERS = {
  title: 'Millions of Kenyans indebted to mobile app lenders',
  publisher: 'Deutsche Welle',
  year: '2023',
  url: 'https://www.dw.com/en/millions-of-kenyans-indebted-to-mobile-app-lenders/a-65349197',
};

const UG_SACCO = {
  title: 'What you should know about Savings and Credit Cooperative Organisations (SACCOs)',
  publisher: 'Uganda Ministry of Trade, Industry and Cooperatives',
  url: 'https://profiraug.go.ug/wp-content/uploads/2017/09/WHAT-YOU-SHOULD-KNOW-ABOUT-SAVINGS-AND-CREDIT-COOPERATIVE-ORGANISATIONS.pdf',
};

const YC_TALK_TO_USERS = {
  title: 'How to Talk to Users',
  publisher: 'Y Combinator (Eric Migicovsky)',
  url: 'https://www.youtube.com/watch?v=MT4Ig2uqjTc',
};

const LUMEN_BREAK_EVEN = {
  title: 'Break-even analysis (Introduction to Business)',
  publisher: 'Lumen Learning',
  url: 'https://courses.lumenlearning.com/wm-introductiontobusiness/?p=870',
};

const HBS_CASH_FLOW = {
  title: 'Cash Flow vs. Profit: What\u2019s the Difference?',
  publisher: 'Harvard Business School Online',
  url: 'https://online.hbs.edu/blog/post/cash-flow-vs-profit',
};

const FREEMAN_STRUCTURELESSNESS = {
  title: 'The Tyranny of Structurelessness',
  publisher: 'Jo Freeman',
  year: '1972',
  url: 'https://www.jofreeman.com/joreen/tyranny.htm',
};

const TEXAS_FOUNDERS_SYNDROME = {
  title: 'Challenge of Founder\u2019s Syndrome',
  publisher: 'Texas Commission on the Arts',
  url: 'https://www.arts.texas.gov/resources/tools-for-results/leadership-transitions/challenge-of-founders-syndrome/',
};

const TED_UBUNTU = {
  title: 'What I Learned from Nelson Mandela',
  publisher: 'TED (Boyd Varty)',
  url: 'https://www.ted.com/talks/boyd_varty_what_i_learned_from_nelson_mandela',
};

const NCORJ_RESTORATIVE = {
  title: 'What is Restorative Justice?',
  publisher: 'National Center on Restorative Justice',
  url: 'https://ncorj.org/what-is-restorative-justice/',
};

const OSTROM_NOBEL = {
  title: 'Beyond Markets and States: Polycentric Governance of Complex Economic Systems (Prize Lecture)',
  publisher: 'Nobel Prize Outreach, Elinor Ostrom',
  year: '2009',
  url: 'https://www.nobelprize.org/prizes/economic-sciences/2009/ostrom/lecture/',
};

const OSTROM_WORKSHOP = {
  title: 'Nobel Prize in Economic Sciences — Elinor Ostrom',
  publisher: 'Ostrom Workshop, Indiana University',
  url: 'https://ostromworkshop.indiana.edu/about/ostroms-history/nobel-prize/index.html',
};

const HBR_PREMORTEM = {
  title: 'Performing a Project Premortem',
  publisher: 'Harvard Business Review (Gary Klein)',
  year: '2007',
  url: 'https://hbr.org/2007/09/performing-a-project-premortem',
};

const GROUPTHINK = {
  title: 'Groupthink',
  publisher: 'Psychology Today',
  url: 'https://www.psychologytoday.com/us/basics/groupthink',
};

const SOCIOCRACY_CONSENT = {
  title: 'Consent Decision Making',
  publisher: 'Sociocracy For All',
  url: 'https://www.sociocracyforall.org/consent-decision-making/',
};

const SOCIOCRACY_CONSENSUS = {
  title: 'The Difference Between Whole-Group Consensus and Dynamic Governance',
  publisher: 'Sociocracy For All',
  url: 'https://www.sociocracyforall.org/the-difference-between-whole-group-consensus-and-dynamic-governance-sociocracy/',
};

const PMI_PROJECT_DEFINITION = {
  title: 'Project Management (PM) Definition — PMI: a temporary endeavour undertaken to create a unique product, service or result',
  publisher: 'Kirkwood Community College Open Textbooks',
  url: 'https://kirkwood.pressbooks.pub/projectmanagementbasics/chapter/1-2-project-management-pm-definition/',
};

const PMI_TRIPLE_CONSTRAINT = {
  title: 'The triple constraint',
  publisher: 'Project Management Institute',
  url: 'https://www.pmi.org/learning/library/triple-constraint-erroneous-useless-value-8024',
};

const RACI = {
  title: 'What is the Responsibility Assignment Matrix (RACI)?',
  publisher: 'Institute of Project Management',
  url: 'https://instituteprojectmanagement.com/blog/what-is-the-responsibility-assignment-matrix/',
};

export const WEALTH_MODULE_SOURCES = {
  'module-1': {
    sources: [
      {
        claim:
          'Savings circles are documented across Africa, the Caribbean, Latin America and Asia under names such as chama, susu, pardner, tanda, paluwagan and hui.',
        ...CORNELL_ROSCA,
      },
      {
        claim:
          'In a rotating savings and credit association, members contribute regularly and take turns receiving the whole pooled sum.',
        ...CORNELL_ROSCA,
      },
      {
        claim:
          'The film follows three Black women in Toronto who run savings circles for their communities, and the practice travels with people when they migrate.',
        ...GEO_BANKER_LADIES,
      },
      {
        claim:
          'Table banking groups in Kenya go beyond the rotation, lending the pooled fund to members rather than only paying out in turn.',
        ...MEDA_TABLE_BANKING,
      },
    ],
    unsourced: [
      {
        claim:
          'The first person to receive the pot is effectively getting an interest-free loan, and the last person is effectively saving.',
        note:
          'This reading of the payout order follows from the arithmetic of the rotation, but it is the course\u2019s own explanation of it rather than a finding quoted from a source.',
      },
      {
        claim:
          'Social collateral \u2014 reputation, relationships and standing in the group \u2014 is what a savings circle lends against instead of physical collateral.',
        note:
          'The phrase and framing are the course\u2019s own. The cited literature describes members selecting one another on trust; it does not use this term.',
      },
      {
        claim:
          'A written constitution, records every member can see, two signatories on withdrawals and consequences agreed in advance are the strongest safeguards.',
        note: 'This is the course\u2019s own recommendation, drawn from the risks described, not a finding from a published study.',
      },
    ],
  },

  'module-2': {
    sources: [
      {
        claim:
          'An emergency fund is a cash reserve set aside for unplanned expenses, and without savings an ordinary financial shock can turn into debt.',
        ...CFPB_EMERGENCY_FUND,
      },
      {
        claim: 'Common guidance suggests building toward three to six months of essential expenses.',
        ...FIDELITY_EMERGENCY,
      },
      {
        claim:
          'The question the video opens with \u2014 whether you could cover a $400 emergency expense \u2014 comes from the Federal Reserve\u2019s household survey.',
        ...FED_SHED,
      },
      {
        claim: 'A credit card is not an emergency fund.',
        ...PBS_EMERGENCY_FUND,
      },
      {
        claim:
          '\u201cBlack tax\u201d describes the expectation that black South Africans will support extended family, and it is studied as a form of intra-family financial transfer.',
        ...JEF_BLACK_TAX,
      },
    ],
    unsourced: [
      {
        claim: 'Many people know their income but only guess at their spending.',
        note: 'No published survey was found that measures this directly.',
      },
      {
        claim:
          'Runway = cash accessible within a week \u00f7 essential monthly spending, and a runway under one month should come before any new investment.',
        note:
          'This is the course\u2019s own working definition and advice. The cited guidance covers how much to hold, not this particular formula or ordering.',
      },
      {
        claim: 'The term \u201cBlack tax\u201d is also used in diaspora communities to describe support sent to relatives.',
        note:
          'The cited study is South African. The wider diaspora usage of the term is not covered by any source cited here.',
      },
    ],
  },

  'module-3': {
    sources: [
      {
        claim:
          'Payday-style lending is described as a product that becomes hard to exit, and the video argues almost any legal alternative is preferable.',
        ...PBS_PAYDAY,
      },
      {
        claim:
          'Kenya\u2019s Competition Authority and Innovations for Poverty Action found high costs in digital credit, with multiple borrowing and debt stress among users.',
        ...CAK_DIGITAL_CREDIT,
      },
      {
        claim:
          'A study by the Competition Authority of Kenya in 2021 found average annual percentage rates of 280.5 per cent among four unregulated digital credit providers.',
        ...KIPPRA_DIGITAL_CREDIT,
      },
      {
        claim:
          'Kenyans\u2019 regulators describe digital credit as exploitative in its interest charges, with aggressive loan-recovery practices.',
        ...KIPPRA_DIGITAL_CREDIT,
      },
      {
        claim:
          'Debt collectors have contacted borrowers\u2019 family and social circles to pressure them into repaying.',
        ...DW_MOBILE_LENDERS,
      },
      {
        claim:
          'A SACCO (savings and credit cooperative) is a financial institution owned and controlled by its members.',
        ...UG_SACCO,
      },
    ],
    unsourced: [
      {
        claim:
          'In Kenya a typical bank loan costs around 12 to 14 per cent a year, while a mobile app loan can cost anywhere from 75 to 395 per cent a year.',
        note:
          'No published source was found for this exact pair of figures. The verified published figures are a 280.5 per cent average annual rate across four unregulated providers (Competition Authority of Kenya, 2021) and a World Bank lending rate for Kenya of 16.6 per cent in 2024. This passage should be checked and corrected before the module is relied on.',
      },
      {
        claim: 'The productive capital test \u2014 does it pay for itself, and can you survive if it goes wrong.',
        note: 'The test as stated is the course\u2019s own framework, not a published rule.',
      },
      {
        claim:
          'Automatic rollover, fast approval without an affordability check, and rates quoted per week or month so the annual cost stays hidden.',
        note:
          'These warning signs are the course\u2019s synthesis. The cited sources describe high costs and recovery pressure, but not this list as a test.',
      },
    ],
  },

  'module-4': {
    sources: [
      {
        claim:
          'Interviews should ask about what people actually did in the past, not whether they would buy something in the future.',
        ...YC_TALK_TO_USERS,
      },
      {
        claim: 'Do not pitch your idea during a customer conversation; talk about their life instead.',
        ...YC_TALK_TO_USERS,
      },
    ],
    unsourced: [
      {
        claim: 'Politeness bias sinks more small businesses than competition does.',
        note:
          'No published measurement was found for this comparison. The cited lecture explains why praise is unreliable, but does not make a ranking claim.',
      },
      {
        claim: 'A deposit or pre-order is the strongest evidence of demand, and repeat purchases matter more than first purchases.',
        note: 'This is the course\u2019s own reading of the evidence, not a finding attributed to a source.',
      },
      {
        claim: 'Pre-selling is how many grassroots businesses start without loans.',
        note: 'No published data was found for how commonly this happens.',
      },
    ],
  },

  'module-5': {
    sources: [
      {
        claim:
          'Break-even point in units is fixed costs divided by the contribution margin per unit, where the contribution margin is price minus variable cost.',
        ...LUMEN_BREAK_EVEN,
      },
      {
        claim:
          'Fixed costs stay the same however much is sold, while variable costs change with the number of units produced.',
        ...LUMEN_BREAK_EVEN,
      },
    ],
    unsourced: [
      {
        claim: 'Many small businesses fail because every sale loses a little money and no one notices in time.',
        note: 'No published study was found that measures this as a cause of failure.',
      },
      {
        claim:
          'Paying yourself and treating your own time as a fixed cost gives the honest break-even figure.',
        note: 'This is the course\u2019s own recommendation.',
      },
      {
        claim: 'Pooling purchases, equipment, transport or stalls lowers unit costs for small producers.',
        note:
          'The arithmetic follows from buying in bulk, but no published study of the groups described here is cited for it.',
      },
    ],
  },

  'module-6': {
    sources: [
      {
        claim:
          'Profit shows what is left after expenses, while cash flow shows the actual movement of cash into and out of a business.',
        ...HBS_CASH_FLOW,
      },
      {
        claim:
          'A sale can be recorded before any money arrives, which is why a profitable business can run short of cash.',
        ...HBS_CASH_FLOW,
      },
    ],
    unsourced: [
      {
        claim:
          'Many small businesses close in their best month, after winning a big order they could not afford to fulfil.',
        note: 'No published source was found for this characterisation.',
      },
      {
        claim:
          'Keep business and household money in separate wallets, with a fixed weekly amount paid to the owner.',
        note: 'This is the course\u2019s own practical rule.',
      },
      {
        claim: 'Keep a business cash buffer of at least two to four weeks of burn.',
        note: 'This figure is the course\u2019s own rule of thumb; the cited article does not set one.',
      },
    ],
  },

  'module-7': {
    sources: [
      {
        claim:
          'A group that tries to have no structure develops informal hierarchies anyway, and because the power is unofficial no one can hold it accountable.',
        ...FREEMAN_STRUCTURELESSNESS,
      },
      {
        claim:
          'Founder\u2019s syndrome describes a leader who built an organisation and then cannot delegate or let go as it grows.',
        ...TEXAS_FOUNDERS_SYNDROME,
      },
      {
        claim: 'Ubuntu is described as \u201cI am, because of you\u201d.',
        ...TED_UBUNTU,
      },
      {
        claim:
          'Restorative justice emphasises repairing the harm done to people and relationships rather than only punishing.',
        ...NCORJ_RESTORATIVE,
      },
    ],
    unsourced: [
      {
        claim:
          'Restorative accountability \u2014 name the harm, ask for repair, fix the system, keep the person in the community, while keeping consequences.',
        note:
          'The five-step sequence is the course\u2019s own synthesis of restorative practice, not a named published model.',
      },
      {
        claim: 'Trust needs regular reporting, open records, terms of office and an agreed way to replace a leader.',
        note: 'This list is the course\u2019s own recommendation.',
      },
      {
        claim: 'Founder\u2019s syndrome is a recognised pattern rather than a formal diagnosis.',
        note: 'A definitional point about the term; the cited pages describe the pattern and do not classify it clinically.',
      },
    ],
  },

  'module-8': {
    sources: [
      {
        claim:
          'Ostrom showed that communities can govern shared resources successfully when the rules fit local conditions, members help make them, and monitoring, graduated sanctions and accessible conflict resolution are in place.',
        ...OSTROM_NOBEL,
      },
      {
        claim:
          'Ostrom\u2019s work on governing the commons is the basis of the design principles used in this module.',
        ...OSTROM_WORKSHOP,
      },
      {
        claim:
          'A pre-mortem \u2014 imagining the project has already failed and explaining why \u2014 improves a team\u2019s ability to identify the reasons for future outcomes.',
        ...HBR_PREMORTEM,
      },
      {
        claim:
          'Groupthink is the mode of thinking in which the desire for unanimity overrides a realistic appraisal of alternatives.',
        ...GROUPTHINK,
      },
      {
        claim: 'In consent decision-making, a proposal proceeds if no one raises a reasoned objection.',
        ...SOCIOCRACY_CONSENT,
      },
      {
        claim:
          'Consent is not the same as whole-group consensus: it does not require everyone to agree, only that no one objects.',
        ...SOCIOCRACY_CONSENSUS,
      },
    ],
    unsourced: [
      {
        claim: 'Majority vote, supermajority, consensus and consent, described as a spectrum of decision methods.',
        note:
          'The descriptions of majority and supermajority voting are the course\u2019s own summary; only consent is sourced here.',
      },
      {
        claim:
          'The loss-sharing methods \u2014 equally, in proportion to contributions, or by another agreed rule \u2014 and the exit path for members who want to leave.',
        note: 'This is the course\u2019s own guidance for handling a failed collective investment.',
      },
      {
        claim:
          'Letting the least senior speak first, and separating idea generation from judgement.',
        note: 'These facilitation techniques are the course\u2019s own; no single published source is cited for them here.',
      },
    ],
  },

  'module-9': {
    sources: [
      {
        claim:
          'A project is defined as a temporary endeavour undertaken to create a unique product, service or result.',
        ...PMI_PROJECT_DEFINITION,
      },
      {
        claim:
          'The project triangle, also called the triple constraint, balances scope, time and cost, and a change to one affects the others.',
        ...PMI_TRIPLE_CONSTRAINT,
      },
      {
        claim:
          'A RACI matrix assigns each task a person who is responsible, one who is accountable, people who are consulted, and people who are informed.',
        ...RACI,
      },
    ],
    unsourced: [
      {
        claim: 'A milestone is a checkpoint that shows real progress, with dates set by working backward from the deadline.',
        note: 'Standard practice in project management, but no single published source is cited for this wording.',
      },
      {
        claim: 'When everyone is responsible, no one is.',
        note: 'This saying is the course\u2019s own framing of why tasks need one named owner.',
      },
      {
        claim: 'Open progress tracking makes volunteers feel seen and surfaces problems early.',
        note: 'This is the course\u2019s own claim about group behaviour, not a measured finding.',
      },
    ],
  },
};

/** The sources and unsourced claims for one module, or null when none exist. */
export function getWealthModuleSources(courseSlug, moduleRoute) {
  if (courseSlug !== 'building-wealth-together') return null;
  return WEALTH_MODULE_SOURCES[moduleRoute] || null;
}