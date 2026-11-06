/**
 * The Diaspora Remittance Economy — module sources.
 *
 * Every factual claim and figure in a module lesson is listed here against a
 * published source that can be opened directly. A claim whose source could not
 * be verified is NOT given a citation: it is listed under `unsourced` instead,
 * with a plain note on why, so the learner can see which parts of the lesson
 * rest on published evidence and which are the course's own argument.
 *
 * Server-side only. The lesson reads these through getTemplateCourseModule and
 * renders them with ModuleSources. They are deliberately excluded from
 * TEMPLATE_TRANSLATED_SECTIONS: a source title and URL are quoted, and must
 * reach the learner exactly as published.
 */

const IMF_BACK_TO_BASICS = {
  title: 'Remittances: Funds for the Folks Back Home (Back to Basics)',
  publisher: 'International Monetary Fund',
  url: 'https://www.imf.org/en/publications/fandd/issues/series/back-to-basics/remittances',
};

const WORLD_BANK_RPW = {
  title: 'Remittance Prices Worldwide',
  publisher: 'World Bank',
  url: 'https://remittanceprices.worldbank.org/',
};

const WORLD_BANK_RPW_METHODOLOGY = {
  title: 'Remittance Prices Worldwide — Methodology',
  publisher: 'World Bank',
  url: 'https://remittanceprices.worldbank.org/methodology',
};

const WORLD_BANK_RPW_ABOUT = {
  title: 'About Remittance Prices Worldwide',
  publisher: 'World Bank',
  url: 'https://remittanceprices.worldbank.org/about-remittance-prices-worldwide',
};

const WORLD_BANK_RPW_Q3_2025 = {
  title: 'Remittance Prices Worldwide, Issue 54 (Q3 2025)',
  publisher: 'World Bank',
  year: '2025',
  url: 'https://remittanceprices.worldbank.org/sites/default/files/2026-04/RPW_main_report_and_annex_Q325.pdf',
};

const WORLD_BANK_MIGRATION_BRIEF = {
  title: 'Remittances & Migration — Migration and Development Briefs',
  publisher: 'World Bank',
  url: 'https://www.worldbank.org/en/brief/2024/09/18/remittances-knomad',
};

const UN_SDG_10 = {
  title: 'Sustainable Development Goal 10 — target 10.c',
  publisher: 'United Nations, Department of Economic and Social Affairs',
  url: 'https://sdgs.un.org/goals/goal10',
};

const UN_DESA_INFORMAL = {
  title: 'Informal Money Transfer Systems: Opportunities and Challenges for Development Finance (DESA Discussion Paper No. 26)',
  publisher: 'United Nations, Department of Economic and Social Affairs',
  year: '2002',
  url: 'https://www.un.org/esa/desa/papers/2002/esa02dp26.pdf',
};

const IFAD_SENDING_MONEY_HOME = {
  title: 'Sending Money Home: Beyond remittances — from lifeline to resilience',
  publisher: 'International Fund for Agricultural Development (United Nations)',
  year: '2026',
  url: 'https://www.ifad.org/en/w/publications/sending-money-home-2026',
};

export const DIASPORA_REMITTANCE_SOURCES = {
  'module-1': {
    sources: [
      {
        claim:
          'A remittance is money sent by one person to another across a border, usually to family, with no return expected.',
        ...IMF_BACK_TO_BASICS,
      },
      {
        claim: 'Remittances are characteristically small, frequent and steady.',
        ...WORLD_BANK_RPW,
      },
      {
        claim: 'Remittances tend to rise when the receiving country is in difficulty — the flow is counter-cyclical.',
        ...IMF_BACK_TO_BASICS,
      },
      {
        claim: 'Remittances stay relatively resilient during downturns in the sending countries.',
        ...WORLD_BANK_MIGRATION_BRIEF,
      },
      {
        claim:
          'A transfer can travel through an informal channel — a traveller, a community collector or a trust-based network — and these routes are often cheaper and faster than banks for small sums.',
        ...UN_DESA_INFORMAL,
      },
      {
        claim:
          'An informal transfer leaves no record in official statistics, so a country can receive a great deal and appear to receive very little.',
        ...IMF_BACK_TO_BASICS,
      },
      {
        claim:
          'A formal transfer is recorded in the balance of payments, which is why it counts in national statistics.',
        ...IMF_BACK_TO_BASICS,
      },
      {
        claim: 'The cost of a remittance includes a sending fee and the exchange rate the sender accepts.',
        ...WORLD_BANK_RPW_METHODOLOGY,
      },
      {
        claim: 'Sending has human costs: migrants make sacrifices, including separation from family, and take risks to earn and send.',
        ...IMF_BACK_TO_BASICS,
      },
    ],
    unsourced: [
      {
        claim:
          'The sending household gives up a smaller flat, a later retirement, and less set aside for its own old age.',
        note:
          'No published study was found that measures these specific trade-offs in migrant sending households. The cited IMF piece records sacrifice and separation from family, but not these particular costs.',
      },
      {
        claim: 'A formal transfer can be used to prove income in order to obtain a loan.',
        note:
          'The record-keeping effect is documented; this specific use of a transfer record as loan evidence is not covered by any source cited here.',
      },
    ],
  },

  'module-2': {
    sources: [
      {
        claim: 'A transfer carries two charges: an explicit fee, and a margin inside the exchange rate.',
        ...WORLD_BANK_RPW_METHODOLOGY,
      },
      {
        claim: 'The comparable measure of cost is the total charge as a share of the amount sent.',
        ...WORLD_BANK_RPW_ABOUT,
      },
      {
        claim: 'The World Bank prices transfers at a standard small amount and reports each one as a percentage of the amount sent.',
        ...WORLD_BANK_RPW_METHODOLOGY,
      },
      {
        claim:
          'Prices differ widely between routes, and limited competition, weak financial infrastructure and regulatory obstacles are named among the reasons.',
        ...WORLD_BANK_RPW_ABOUT,
      },
      {
        claim: 'Greater competition brings prices down.',
        ...IMF_BACK_TO_BASICS,
      },
      {
        claim:
          'The international target is to reduce the cost of remittances to less than 3 per cent and to eliminate corridors costing more than 5 per cent.',
        ...UN_SDG_10,
      },
      {
        claim: 'The global average cost of sending remittances is 6.36 per cent of the amount sent — roughly twice the 3 per cent target.',
        ...WORLD_BANK_RPW,
      },
      {
        claim: 'The global average has fallen over the past decade, but slowly.',
        ...WORLD_BANK_RPW_Q3_2025,
      },
      {
        claim: 'The share of corridors costing less than 5 per cent rose from 23 per cent in 2016 to 75 per cent in 2023.',
        ...UN_SDG_10,
      },
    ],
    unsourced: [
      {
        claim:
          'Exclusivity arrangements keep a corridor thin: where one provider holds the agreement with the paying bank, the post office or the dominant agent network, the sender has no real alternative.',
        note:
          'The practice is widely discussed in remittance policy work, but no published World Bank or United Nations page was found that states it in this form, so no citation is given.',
      },
      {
        claim: 'Interoperability turns every provider in a corridor into a possible competitor.',
        note:
          'This is the course\u2019s own reasoning about how the market behaves. No published source was found for it as stated.',
      },
    ],
  },

  'module-3': {
    sources: [
      {
        claim:
          'The largest share of remittance money goes to everyday necessities: food, healthcare and education, and to meeting essential household needs.',
        ...IFAD_SENDING_MONEY_HOME,
      },
      {
        claim:
          'Remittances may finance basic consumption goods, housing, children\u2019s education and health care, and in better-off households provide capital for small businesses.',
        ...IMF_BACK_TO_BASICS,
      },
      {
        claim: 'Remittances help households respond to crises and uncertainty, and build economic resilience.',
        ...IFAD_SENDING_MONEY_HOME,
      },
      {
        claim:
          'Some argue that remittances create dependency and weaken the incentive to work; others argue the observed relationship may simply reflect the counter-cyclical nature of remittances rather than cause it.',
        ...IMF_BACK_TO_BASICS,
      },
      {
        claim: 'Remittance flows are more stable than private capital flows, and act as a form of insurance for receiving households.',
        ...IMF_BACK_TO_BASICS,
      },
      {
        claim:
          'High remittance prices are associated with weak financial infrastructure, limited competition and limited access to banking for senders and receivers.',
        ...WORLD_BANK_RPW_ABOUT,
      },
    ],
    unsourced: [
      {
        claim: 'A smaller but real share of remittances goes into land and livestock.',
        note:
          'The cited sources cover housing, education, health and small enterprise. No source was found for land and livestock specifically, so they are not cited.',
      },
      {
        claim: 'Households generally keep several separate income streams going at once.',
        note: 'No published source was found for this as stated.',
      },
      {
        claim: 'Where researchers have looked for a discouraged-worker effect, they have often found the opposite.',
        note:
          'No specific study was found to cite. The cited IMF piece sets out both sides of the dependency argument without settling it.',
      },
      {
        claim: 'Household money is allocated by the household, often by women, with a clear order of priority.',
        note: 'No published source was found for the claim about who decides within the household.',
      },
      {
        claim:
          'Money spent with a local trader, saved in a local group or invested locally is used again before it leaves, so more value is captured locally.',
        note:
          'This is the course\u2019s own framing of value capture. The cited IFAD report shows remittances reaching rural economies, but does not measure how many times the money is reused there.',
      },
    ],
  },
};

/**
 * The sources and unsourced claims for one module, or null when the course or
 * module has none recorded.
 */
export function getModuleSources(courseSlug, moduleRoute) {
  if (courseSlug !== 'diaspora-remittance-economy') return null;
  return DIASPORA_REMITTANCE_SOURCES[moduleRoute] || null;
}