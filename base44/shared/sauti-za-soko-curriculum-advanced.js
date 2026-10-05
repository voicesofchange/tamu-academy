/**
 * Sauti za Soko — server-side-only source of truth for Modules 5 to 7 of
 * the core course and Module 8 of the optional Peer Facilitator track.
 * Imported ONLY by base44/shared/sauti-za-soko-config.js and never bundled
 * into the public client-side JavaScript.
 *
 * Module 8 sits under its own course slug (the Peer Facilitator track) so
 * that core course completion and peer facilitation completion are
 * certified separately, as required.
 */

export const SOKO_ADVANCED_MODULES = {
  'module-5': {
    number: 'Module 5',
    route: 'module-5',
    title: 'Sauti na Nguvu: County Government, Licences and Public Decisions',
    description:
      'Examines the county decisions that shape a trading day: licences, fees, stalls, sanitation, road works and enforcement, and how a traders\u2019 case is prepared, presented and heard through public participation.',
    status: 'In development',
    estimatedTime: '45\u201360 minutes, excluding the optional discussion',
    competency:
      'By the end of this module, learners should be able to engage constructively with county government: identifying which level of government decides what, preparing a clear traders\u2019 case with evidence and a specific ask, and taking part in public participation so that a market decision is made with traders rather than about them.',
    learningObjectives: [
      'Explain what county government in Kenya is responsible for and where a market decision is likely to be made.',
      'Distinguish national, county, ward and market-level decisions and the documents that record them.',
      'Identify the licences, fees and by-laws that apply to trading in a county market and how to check them.',
      'Prepare a traders\u2019 case with evidence, a specific proposal and a realistic alternative.',
      'Take part in public participation and follow up on a decision after it is made.',
    ],
    overview: [
      'Most of the rules that shape a trading day are made close to the market. County government decides on market fees, trading licences, stall allocation, sanitation, transport, and the road works that can move a stall row overnight. In Kenya this is a direct result of devolution under the 2010 Constitution, which moved substantial responsibility and budget to 47 counties.',
      'This means that traders are not only subjects of local decisions. They are constituents of the people who make them. Public participation is a legal requirement in Kenya\u2019s county law-making, and it is the formal route through which a traders\u2019 case can be heard before a decision rather than after it.',
      'This module teaches how that route works and how to use it well: gathering evidence from your own records, making one clear proposal, offering a workable alternative, and following up after. The aim is not confrontation. It is being heard clearly enough to be answered.',
    ],
    contextNotes: [
      {
        term: 'Devolution',
        plain:
          'The transfer of power and budget from national government to county governments, established in Kenya\u2019s 2010 Constitution and implemented from 2013.',
        whyItMatters:
          'It is why market fees, licences, stalls and many local services are county decisions, and why a traders\u2019 case is addressed to a county rather than to Nairobi.',
      },
      {
        term: 'County assembly',
        plain:
          'The elected law-making body of a county, which passes county by-laws and approves county budgets and plans.',
        whyItMatters:
          'Market by-laws and fee schedules pass through the county assembly, and assembly committees are a formal place where a traders\u2019 case can be presented.',
      },
      {
        term: 'Member of County Assembly (MCA)',
        plain: 'The elected representative of a ward in the county assembly.',
        whyItMatters:
          'The MCA for the ward where a market sits is often the most accessible elected route into a county decision.',
      },
      {
        term: 'Public participation',
        plain:
          'The formal requirement that county residents be consulted before county laws, plans and budgets are made, through notices, meetings, submissions and memoranda.',
        whyItMatters:
          'It is the legal route for a traders\u2019 association to be heard before a decision, and it needs a prepared case to be useful.',
      },
      {
        term: 'Trading licence and market fee',
        plain:
          'A licence is a permission to trade, usually granted for a period. A market fee is a daily or periodic charge for the use of a market or stall.',
        whyItMatters:
          'Knowing which is which, what the published rate is, and who is authorised to collect it protects a trader from being charged informally.',
      },
      {
        term: 'County Integrated Development Plan',
        plain:
          'The multi-year county plan that sets out priorities and investments, including markets, roads and water.',
        whyItMatters:
          'It is the document that determines whether market improvement is planned and budgeted, and it is open to comment before adoption.',
      },
    ],
    keyConcepts: [
      {
        term: 'Which level decides what',
        definition:
          'National government handles national policy, currency, national roads and major infrastructure. County government handles local services, local roads, markets, sanitation, licensing and county planning. Ward-level and market-level decisions sit within the county system. Knowing the level prevents a traders\u2019 case being addressed to the wrong office.',
        example:
          'A stall allocation dispute is a county and market-level matter. A change in national tax is not, and a county office cannot resolve it.',
      },
      {
        term: 'Reading the rules that apply to you',
        definition:
          'A trader should be able to name the licence they hold, its period and cost, the published market fee, the by-laws that apply to the market, and who is authorised to collect or enforce each. These are public documents and can be requested.',
        example:
          'A trader charged an amount above the published fee, with no receipt, can ask which by-law authorises the charge and request a receipt. That question is factual, not confrontational.',
      },
      {
        term: 'Evidence from your own records',
        definition:
          'The strongest traders\u2019 case uses evidence a trader already holds: stall numbers, the number of traders affected, daily fees paid, the cost of the road works to a trading week, the number of customers lost, and the specific alternative proposed. General complaint is much weaker than a specific, evidenced ask.',
        example:
          '"Forty traders in row three were displaced for eleven days, losing an average of X per day in fees already paid and sales forgone, and our proposal is to relocate to the covered row for that period" is a case. "We suffer a lot" is not.',
      },
      {
        term: 'One clear proposal with an alternative',
        definition:
          'A case should make one proposal, state who it benefits and what it costs, and offer at least one fallback. Officials respond to choices they can act on, and a fallback keeps negotiation open when the first proposal is refused.',
        example:
          'Proposing a phased start to new fee enforcement, with a fallback of a two-month notice period, is more likely to be accepted than an objection in principle.',
      },
      {
        term: 'Public participation done properly',
        definition:
          'Participation means watching for notices, reading the draft, appearing or submitting a written memorandum within the stated time, and recording who received it. A memorandum should be short, evidenced and specific, and a copy should be retained.',
        example:
          'A traders\u2019 association can submit a one-page memorandum on a draft fee schedule, signed by its officers, within the published comment period, and keep a dated copy.',
      },
      {
        term: 'Following up after the decision',
        definition:
          'A case is not finished when it is heard. Following up means requesting the decision and the reasons, checking what was implemented against what was promised, and returning through the same route if it was not. Continuity is what makes a traders\u2019 association taken seriously over years.',
        example:
          'Asking for a written copy of the resolution on stall relocation, and checking three months later whether it was carried out, is follow-up.',
      },
    ],
    localCase: {
      title: 'Case Study: Traders and a Road Repair in Kiambu County',
      location: 'Kiambu County, Kenya',
      intro:
        'A county road improvement programme reached a market in Kiambu County. Traders in one row were told to move for what was described as a short period. This case follows how a traders\u2019 group turned that into a specific, evidenced request, and what made the difference to the outcome.',
      sections: [
        {
          heading: 'The decision and how traders heard about it',
          paragraphs: [
            'The instruction came through an enforcement visit on a Monday morning. Traders were told to clear the row by the end of the day and that trading would resume when the works were finished. No date was given, and the daily market fee continued to be collected in the meantime.',
            'Traders reacted in two ways. On the first day there was an angry meeting at the market gate with no agreed position. On the second day, a smaller group met in the evening and decided to find out what they could establish as fact.',
          ],
        },
        {
          heading: 'Building the case from what they already had',
          paragraphs: [
            'The group did four things that week. They wrote down the stall numbers and names of the traders affected, with permission. They collected their own fee receipts for the previous two months. They asked the county works office, in writing, for the works schedule and the expected duration. And they asked two traders who kept records to estimate the average daily sales in that row by product.',
            'None of this required expertise. It required a list, the receipts traders already had, one written question, and two people willing to do arithmetic.',
          ],
        },
        {
          heading: 'The proposal',
          paragraphs: [
            'The group prepared a one-page submission with a specific ask and a fallback. The ask was a temporary allocation in the covered row, with fees suspended for the affected stalls for the duration of the works. The fallback was a suspension of fees alone, if space could not be found.',
            'They also named one person as the group\u2019s contact and asked for the works schedule in writing. The submission was handed in at the county offices with a dated copy retained and a copy sent to the ward MCA.',
          ],
        },
        {
          heading: 'What changed and what did not',
          paragraphs: [
            'The temporary allocation was granted for a smaller number of stalls than requested, and the fee suspension was granted for the affected traders. The works took longer than originally stated, and because the group had asked for the schedule in writing they were able to show that the original estimate had passed and request an extension of the allocation.',
            'Not everything was won. The row was not restored in the same layout afterwards, and the group continued raising that for several months. What changed was the process: the county works office began informing the association before the next phase of works, which had not happened before.',
          ],
        },
      ],
      takeaways: [
        'A specific, evidenced ask is far stronger than a general objection.',
        'The evidence a traders\u2019 group needs is usually already in the hands of its members: receipts, stall numbers and sales estimates.',
        'One proposal with a fallback keeps the conversation open when the first ask is refused.',
        'Requesting the decision in writing makes it possible to follow up against a stated commitment.',
        'Being heard once changes how the next decision is made, even when the first outcome is only partial.',
      ],
    },
    internationalComparison: {
      title: 'Optional Comparison: Who Decides Where You Live',
      prompt:
        'This comparison is optional and complements the Kiambu case. It is not a substitute for it. Local government structures differ fundamentally between countries, and they are not interchangeable.',
      questions: [
        'Which level of government sets the rules for trading in a market near you?',
        'What formal route exists there for a small trader to object to a local decision?',
        'Is consultation required before that decision is made, and who enforces that requirement?',
        'Which rules there are published and checkable, and which are not?',
      ],
      note:
        'Do not map county government onto a United States city council or vice versa. Kenyan county government combines responsibilities that in other countries are split across municipal, county and state bodies. Compare how a trader can be heard, not which office exists.',
    },
    activity: {
      title: 'My County Case',
      purpose:
        'Prepare a real, specific traders\u2019 case: the decision, the evidence you hold, the proposal, the fallback and the route.',
      instructions: [
        'Choose a real local decision that affects trading, whether already made or still proposed.',
        'Use evidence you or your group already hold. Do not invent figures.',
        'Your answers are saved to My Soko Action Plan and remain private.',
      ],
      fields: [
        { id: 'decision', label: 'The decision', helper: 'What decision affects trading, who made or proposes it, and when?' },
        { id: 'level', label: 'Which level decides', helper: 'Is this a market, ward, county or national matter, and which office or committee holds it?' },
        { id: 'affected', label: 'Who is affected', helper: 'How many traders or households are affected, and which rows, stalls or products?' },
        { id: 'evidence_held', label: 'Evidence you already hold', helper: 'Which receipts, records, stall numbers, dates, notices or estimates do you have?' },
        { id: 'evidence_needed', label: 'Evidence still needed', helper: 'What is missing, and who could provide it?' },
        { id: 'cost_estimate', label: 'What it costs', helper: 'What is the estimated daily or total cost of the decision to the affected traders, and where does that figure come from?' },
        { id: 'proposal', label: 'Your one proposal', helper: 'What exactly are you asking for, and who would implement it?' },
        { id: 'fallback', label: 'Your fallback', helper: 'If the proposal is refused, what would you accept instead?' },
        { id: 'route', label: 'The route you will use', helper: 'Which route will you use: written submission, public participation, the ward MCA, a county assembly committee, or a traders\u2019 association delegation?' },
        { id: 'follow_up', label: 'How you will follow up', helper: 'What written record will you request, and when will you check what was implemented?' },
      ],
    },
    kiswahiliPrompt: {
      prompt: 'Sauti ya wafanyabiashara inaweza kusikika vipi katika uamuzi wa eneo lako?',
      translation: 'How can traders\u2019 voices be heard in decisions in your area?',
      guidance:
        'Answer in Kiswahili, in English, or in both. Your response is private unless you choose to share it with other learners.',
    },
    reflectionQuestions: [
      'Which decision affecting your market was made without traders being consulted, and what would you need to be consulted next time?',
      'What evidence do you already hold that you have never used in an argument?',
      'If your proposal were refused, what fallback would keep the conversation open?',
    ],
    quiz: {
      passingScore: 4,
      questions: [
        {
          id: 1,
          prompt: 'Why are most decisions about market fees, stalls and licences made at county level in Kenya?',
          options: [
            'Because national government does not collect revenue',
            'Because devolution under the 2010 Constitution moved local services, licensing and much local regulation to 47 counties',
            'Because markets are privately owned',
            'Because county governments set national tax rates',
          ],
          correctIndex: 1,
          feedback:
            'Devolution moved substantial responsibility and budget to county governments, which is why market decisions are usually county decisions.',
        },
        {
          id: 2,
          prompt: 'Which is the strongest form of evidence for a traders\u2019 case?',
          options: [
            'A general statement that traders suffer',
            'Stall numbers, names with permission, fee receipts, dates, and sales estimates from members\u2019 own records',
            'A newspaper article about markets',
            'An estimate made by one trader from memory without figures',
          ],
          correctIndex: 1,
          feedback:
            'A case is stronger when it uses specifics a group already holds: stall numbers, receipts, dates and evidenced figures.',
        },
        {
          id: 3,
          prompt: 'Why should a proposal include a fallback?',
          options: [
            'Because officials prefer longer documents',
            'Because it keeps negotiation open when the first proposal is refused',
            'Because it is legally required',
            'Because it makes the case sound less demanding',
          ],
          correctIndex: 1,
          feedback:
            'A clear proposal with a realistic alternative gives officials a choice they can act on and keeps the conversation open.',
        },
        {
          id: 4,
          prompt: 'What does public participation require of a traders\u2019 association in practice?',
          options: [
            'Attending a protest outside the county offices',
            'Watching for notices, reading the draft, submitting an evidenced memorandum within the stated period, and keeping a dated copy',
            'Waiting until the decision is implemented and then objecting',
            'Paying a fee to be heard',
          ],
          correctIndex: 1,
          feedback:
            'Participation is a formal process with time limits. A short, evidenced, specific submission within the period is what counts.',
        },
        {
          id: 5,
          prompt: 'Why does following up after a decision matter?',
          options: [
            'Because it is required by law',
            'Because it checks what was implemented against what was promised, and builds the continuity that makes a traders\u2019 group taken seriously over years',
            'Because it allows a second protest',
            'Because the county publishes results annually',
          ],
          correctIndex: 1,
          feedback:
            'Requesting the decision and its reasons, then checking implementation, is what turns one hearing into standing credibility.',
        },
      ],
    },
    closingText: [
      'The rules that shape a trading day are mostly made close to the market. County government decides on fees, licences, stalls, sanitation and road works, and public participation is the formal route through which traders can be heard before a decision rather than after it.',
      'What makes a case work is rarely anger and rarely expertise. It is evidence a group already holds, one specific proposal, a workable fallback, and follow-up against a written record.',
      'In the next module you will look at what traders can do without waiting for anyone: organising together to save, buy, store and negotiate as a group.',
    ],
    sources: [
      'Constitution of Kenya, 2010, Fourth Schedule and Article 196 on public participation.',
      'County Government of Kiambu, published fee schedules, market by-laws and County Integrated Development Plan.',
      'Kenya Law and the Council of Governors, county legislation and devolution guidance.',
      'Institute of Economic Affairs Kenya, county public finance and citizen participation research.',
      'Katiba Institute and Kenya Human Rights Commission, public participation and devolution resources.',
    ],
  },

  'module-6': {
    number: 'Module 6',
    route: 'module-6',
    title: 'Kikundi ni Nguvu: Savings, Collective Action and Bargaining',
    description:
      'Examines how traders organise together: savings groups, cooperatives, joint buying and storage, shared records, governance and trust, and negotiating as a group rather than alone.',
    status: 'In development',
    estimatedTime: '45\u201360 minutes, excluding the optional discussion',
    competency:
      'By the end of this module, learners should be able to organise collective action among traders: forming or strengthening a group with clear rules and records, using joint buying, storage or transport to improve terms, preventing the governance failures that break groups, and negotiating collectively.',
    learningObjectives: [
      'Explain what a savings group and a cooperative do, how they differ, and what each requires.',
      'Describe the governance that keeps a group alive: rules, records, rotation, transparency and dispute handling.',
      'Identify the gains available from joint buying, joint storage, joint transport and shared selling.',
      'Explain the risks that most often break groups, including unclear accounts, unequal contributions and elite capture.',
      'Plan and carry out a collective negotiation, including the mandate, the ask and the fallback.',
    ],
    overview: [
      'A single trader has almost no bargaining power. A group of thirty traders buying the same product on the same morning has a great deal. This is the plainest source of power available to traders who have little capital, and it costs organisation rather than money.',
      'Kenya has a long and deep tradition of this organising: chamas that save and lend in rotation, table banking groups, savings and credit cooperatives, and traders\u2019 associations. These are not informal substitutes for real finance. They are real finance, built on rules and records that their members maintain.',
      'This module examines both sides. It looks at what groups make possible, and at what breaks them. Most groups do not fail because members are dishonest. They fail because the rules were never written, the accounts were never opened, and nobody was made responsible for anything uncomfortable.',
    ],
    contextNotes: [
      {
        term: 'Chama',
        plain:
          'A small self-help and savings group, often of neighbours, traders or women, that meets regularly to contribute, lend and support members.',
        whyItMatters:
          'It is usually the first source of working capital for a small trader and it depends entirely on trust, clear rules and records.',
      },
      {
        term: 'Mzunguko',
        plain:
          'A rotating arrangement in which each member receives the group\u2019s contributions in turn, sometimes called a merry-go-round.',
        whyItMatters:
          'It converts small regular contributions into a lump sum at a predictable point, which is the opposite of how a trader\u2019s income normally arrives.',
      },
      {
        term: 'Table banking',
        plain:
          'A group that meets in person to collect contributions and lend from the collected pool, usually deciding at the meeting.',
        whyItMatters:
          'It keeps decision-making immediate and visible, and it places a heavy weight on accurate record-keeping at the table.',
      },
      {
        term: 'SACCO',
        plain:
          'A savings and credit cooperative: a member-owned institution that collects savings and lends to members, often at better terms than a commercial lender.',
        whyItMatters:
          'It scales what a chama does, and it brings the obligations of a regulated, audited institution.',
      },
      {
        term: 'Cooperative',
        plain:
          'A member-owned enterprise formed to serve its members, for example by buying inputs in bulk, storing produce or selling on members\u2019 behalf.',
        whyItMatters:
          'It is the structure through which joint buying, joint storage and joint selling are usually organised.',
      },
      {
        term: 'Collective bargaining',
        plain: 'Negotiating as a group on terms that affect all members, rather than individually.',
        whyItMatters:
          'A group can negotiate price, supply terms, transport rates or market conditions that no single trader could change alone.',
      },
    ],
    keyConcepts: [
      {
        term: 'Why a group has power',
        definition:
          'A group can aggregate demand, aggregate supply, aggregate savings and aggregate voice. Each of these changes a trader\u2019s terms. Volume changes price, savings changes timing, and numbers change what a supplier or an official has to answer to.',
        example:
          'Thirty traders buying a staple together at a wholesale market pay a different price than thirty traders buying separately at retail.',
      },
      {
        term: 'Written rules and records',
        definition:
          'A group survives on written rules: who may join, how contributions and loans work, who holds the money, how records are kept, when they are read aloud, how officers are chosen and removed, and how disputes are handled. Records should be readable to any member on request.',
        example:
          'A group whose accounts are read aloud at every meeting and signed by two members has a mechanism that a group relying on one treasurer\u2019s memory does not.',
      },
      {
        term: 'Rotation and transparency',
        definition:
          'Rotating who receives, who counts, who keeps records and who audits prevents any single person from holding the group\u2019s money and its memory. Rotation is a control, not a courtesy.',
        example:
          'A group that changes its treasurer every year and reads the accounts at each meeting removes the opportunity for quiet drift.',
      },
      {
        term: 'Joint buying, storage and selling',
        definition:
          'Joint buying improves the price and the reliability of supply. Joint storage allows holding stock across a slow period. Joint transport reduces the cost of moving goods. Joint selling, or shared negotiation with a buyer, changes the terms offered to each member.',
        example:
          'Sharing a covered store for goods that keep allows members to wait for a better price instead of selling into a weak market.',
      },
      {
        term: 'What breaks groups',
        definition:
          'Groups break for recognisable reasons: rules never written, accounts never read, one person controlling money and records, contributions that members cannot sustain, loans to insiders that are never repaid, and elite capture where leaders use the group for their own advantage.',
        example:
          'A group that lends to its leadership first and to members later will lose its membership within a year.',
      },
      {
        term: 'Collective negotiation',
        definition:
          'Negotiating as a group requires a mandate from members, one clear ask, a named person to speak, a fallback, and a decision recorded in writing. Without a mandate, a group cannot commit to anything and cannot be taken seriously.',
        example:
          'A traders\u2019 association that agrees in advance to accept a transport rate up to a stated figure can negotiate, while one that must return for every question cannot.',
      },
    ],
    localCase: {
      title: 'Case Study: A Buying Group in Kiambu County',
      location: 'Kiambu County, Kenya',
      intro:
        'Eleven traders selling produce and packaged goods in the same market formed a buying group. Their experience over eighteen months shows both what the group achieved and exactly where it almost broke. Both parts are instructive.',
      sections: [
        {
          heading: 'How they started and what they wrote down',
          paragraphs: [
            'The group began as a conversation at the end of a difficult month. Eleven traders agreed to buy three staple products together once a week from a wholesale market. Before the first purchase they wrote a one-page agreement: who could join, the weekly contribution, who would travel to buy, how the goods would be divided, and what would happen if a member missed a contribution.',
            'They appointed a chair and a secretary, fixed a meeting every Saturday evening, and agreed that the account book would be read aloud at each meeting.',
          ],
        },
        {
          heading: 'What the group achieved',
          paragraphs: [
            'Within four months the group was buying at a lower unit price than any member could reach alone, and the price was stable because they were buying in quantity. Two members who had previously travelled separately now shared the journey, halving transport costs.',
            'In a later difficult season, the group rented one covered storage space and bought a quantity of goods that would keep. Members who would otherwise have sold immediately at a low price were able to wait three weeks. That single decision paid for the storage several times over.',
          ],
        },
        {
          heading: 'How it almost broke',
          paragraphs: [
            'In the eighth month, two members fell behind on contributions. In the twelfth, the treasurer lent money from the group account to a relative outside the group without telling anyone, intending to repay it within a week. He did repay it, but another member found out and the group spent two meetings in dispute.',
            'The group also had a quieter problem. The two members with the most stock and the loudest voices were making the buying decisions in practice, and they were choosing products that suited their own stalls. The smaller members had begun to feel that the group had become someone else\u2019s business with their money in it.',
          ],
        },
        {
          heading: 'What they changed',
          paragraphs: [
            'The group made four changes. Every purchase decision had to be agreed by a simple majority and recorded. The account book had to be signed by two members at each meeting, not only the treasurer. Lending outside the group was prohibited outright. And the buying role rotated every two months, so no member could shape the list around their own stall for long.',
            'Membership held, and the group was still buying together two years later. What had nearly ended it was not dishonesty in the end. It was silence about who decided.',
          ],
        },
      ],
      takeaways: [
        'Writing the rules before the first contribution prevents most later disputes.',
        'A group changes the price a trader pays and the price a trader can wait for.',
        'Shared storage is one of the cheapest ways a group turns time into money.',
        'The most dangerous group failure is not theft but unclear decision-making.',
        'Rotating roles and reading accounts aloud are practical controls, not formalities.',
      ],
    },
    internationalComparison: {
      title: 'Optional Comparison: How People Organise Where You Live',
      prompt:
        'This comparison is optional and complements the Kiambu case. It is not a substitute for it. The institutional forms available to small traders differ between countries.',
      questions: [
        'What kind of group do small traders or neighbours near you use to save or buy together?',
        'What credit or cooperative structure exists there, and who can join it?',
        'Which protections exist there that a Kenyan chama has to invent for itself?',
        'What is the equivalent of collective bargaining for small traders in your area?',
      ],
      note:
        'Where a cooperative law, deposit protection or a credit union framework is well established, a group carries less risk than a chama whose members are its only safeguard. That is a difference in the surrounding system, not in the members.',
    },
    activity: {
      title: 'My Group Plan',
      purpose:
        'Choose one collective action you could realistically take in the next three months, and write the rules that would keep it alive.',
      instructions: [
        'Choose one: a savings group, a joint buying arrangement, shared storage or transport, or a negotiating position with a supplier or an authority.',
        'Write rules specific enough that they could be read to a group at its first meeting.',
        'Your answers are saved to My Soko Action Plan and remain private.',
      ],
      fields: [
        { id: 'group_purpose', label: 'What the group is for', helper: 'What single purpose would this group serve, and why is it better done together?' },
        { id: 'members', label: 'Who would take part', helper: 'How many people, what do they have in common, and who is not included?' },
        { id: 'what_members_give', label: 'What each member contributes', helper: 'Contribution, stock, transport, time or storage space, and how often?' },
        { id: 'what_members_get', label: 'What each member receives', helper: 'Goods, savings, a lump sum in rotation, better prices, or something else?' },
        { id: 'decision_rule', label: 'How decisions are made', helper: 'Who decides, by what majority, and how is the decision recorded?' },
        { id: 'money_rules', label: 'Who holds money and who checks it', helper: 'Who keeps the money, who keeps the record, who signs it, and how often are the accounts read aloud?' },
        { id: 'rotation', label: 'Which roles rotate', helper: 'Which roles will rotate, how often, and how are officers removed if they fail?' },
        { id: 'missing_contribution', label: 'When a member misses', helper: 'What happens if a member cannot contribute or cannot repay?' },
        { id: 'disputes', label: 'How disputes are handled', helper: 'What is the process when members disagree, and who decides if they cannot agree?' },
        { id: 'first_action', label: 'First three actions', helper: 'What are the first three things you will do to start or strengthen this group, and by when?' },
      ],
    },
    kiswahiliPrompt: {
      prompt: 'Kikundi chako kinaweza kubadilisha nini ambacho mtu mmoja hawezi?',
      translation: 'What can your group change that one person cannot?',
      guidance:
        'Answer in Kiswahili, in English, or in both. Your response is private unless you choose to share it with other learners.',
    },
    reflectionQuestions: [
      'What could you change about your terms if you were buying or selling with twenty other traders?',
      'Which rule has a group you know never written down, and what has that cost?',
      'Who ends up deciding in groups you belong to, and how does that happen?',
    ],
    quiz: {
      passingScore: 4,
      questions: [
        {
          id: 1,
          prompt: 'Why does a group have bargaining power that an individual trader does not?',
          options: [
            'Because groups are protected by law',
            'Because a group aggregates demand, supply, savings and voice, which changes the terms offered',
            'Because group members work harder',
            'Because suppliers prefer large customers for social reasons',
          ],
          correctIndex: 1,
          feedback:
            'Volume changes price, savings changes timing, and numbers change what a supplier or official has to answer to.',
        },
        {
          id: 2,
          prompt: 'Which practice most directly prevents a group\u2019s money from drifting?',
          options: [
            'Keeping the group small',
            'Reading the accounts aloud at each meeting and requiring two signatories',
            'Lending only to founding members',
            'Keeping the records with the treasurer alone',
          ],
          correctIndex: 1,
          feedback:
            'Transparency and split responsibility are controls. One person holding both the money and the record is the common failure point.',
        },
        {
          id: 3,
          prompt: 'What is the main economic benefit of shared storage for a trading group?',
          options: [
            'It reduces the county market fee',
            'It allows members to wait for a better price instead of selling immediately into a weak market',
            'It increases the quantity of stock available',
            'It removes the need for records',
          ],
          correctIndex: 1,
          feedback:
            'Storage converts time into money. It lets a group hold goods that keep until the price improves.',
        },
        {
          id: 4,
          prompt: 'Which risk most often breaks a group, according to this module?',
          options: [
            'Members being dishonest from the beginning',
            'Unclear decision-making about who decides and how',
            'Groups being too small to matter',
            'Trading in too many products',
          ],
          correctIndex: 1,
          feedback:
            'Most groups fail because the rules were never written and decisions were never made explicit, not because members were dishonest.',
        },
        {
          id: 5,
          prompt: 'What must a group have before it can negotiate collectively?',
          options: [
            'A registered constitution',
            'A mandate from members, one clear ask, a named speaker and a fallback',
            'At least fifty members',
            'A lawyer present',
          ],
          correctIndex: 1,
          feedback:
            'Without a mandate a group cannot commit to anything and cannot be taken seriously. The ask, the speaker and the fallback make negotiation possible.',
        },
      ],
    },
    closingText: [
      'Collective action is the clearest source of power available to traders with little capital, and it costs organisation rather than money.',
      'What makes it work is unglamorous: written rules, accounts read aloud, rotating responsibilities, a mandate, and one clear ask.',
      'In the next module you will bring the whole course together into a plan for your own market and your own enterprise, and choose what you will do first.',
    ],
    sources: [
      'Kenya Ministry of Co-operatives and Micro, Small and Medium Enterprises Development, cooperative policy and registration guidance.',
      'Financial Sector Deepening Kenya, savings groups, table banking and chama research.',
      'World Bank, cooperative and self-help group finance literature.',
      'Consultative Group to Assist the Poor, group savings and collective action research.',
      'International Labour Organization, cooperatives and informal economy organising.',
    ],
  },

  'module-7': {
    number: 'Module 7',
    route: 'module-7',
    title: 'Soko Endelevu: Planning a Market That Lasts',
    description:
      'Brings the course together into one plan for a market and an enterprise: goals, resources, risks, first actions, indicators and review, and what it means to lead without leaving others behind.',
    status: 'In development',
    estimatedTime: '50\u201365 minutes, excluding the optional discussion and final reflection',
    competency:
      'By the end of this module, learners should be able to produce and defend a written plan for a market enterprise or a traders\u2019 group: setting goals that fit available resources, naming the risks and the responses, choosing first actions with dates and people responsible, and defining how progress will be judged.',
    learningObjectives: [
      'Turn the analysis of the previous six modules into a written plan with goals, actions, dates and responsibilities.',
      'Match a plan to the resources actually available, without assuming a loan or new capital.',
      'Name the main risks in the plan and the response to each.',
      'Define a small number of indicators that show whether the plan is working.',
      'Explain what leading a traders\u2019 group means, including handing over and bringing others with you.',
    ],
    overview: [
      'The previous six modules produced analysis. This module produces a plan. A plan is short, specific and written down. It says what will change, who will do it, by when, and how you will know whether it worked.',
      'A plan that depends on money you do not have and permission you have not been given is not a plan. It is a hope. This module deliberately keeps the first version inside what is already available: your own labour, the records you already keep, the group you already have, and the one decision you have been avoiding.',
      'It closes with leadership. Market improvement spreads through people who are willing to explain, to share what works, and to hand over responsibility rather than hold it. That is what makes a market last beyond one trader or one season.',
    ],
    contextNotes: [
      {
        term: 'Plan',
        plain:
          'A short written statement of what will change, who is responsible, by when, and how progress will be judged.',
        whyItMatters:
          'Writing it down is what makes it possible to review, adjust and explain to others, including a group or an official.',
      },
      {
        term: 'Indicator',
        plain: 'Something you can observe that shows whether a plan is working.',
        whyItMatters:
          'A small number of simple indicators turns a plan into something you can check, rather than a statement of intent.',
      },
      {
        term: 'Review point',
        plain: 'A fixed date on which the plan is looked at again and either continued, changed or stopped.',
        whyItMatters:
          'Without a review point, a plan that is not working continues out of habit.',
      },
      {
        term: 'Succession and handover',
        plain:
          'Deliberately passing knowledge, records and responsibility to other people so that work continues without one individual.',
        whyItMatters:
          'Groups and market improvements that depend on one person end when that person steps back.',
      },
    ],
    keyConcepts: [
      {
        term: 'From analysis to a written plan',
        definition:
          'A plan has five parts: the goal, the actions, the person responsible for each, the dates, and the indicator that shows progress. Anything longer than one page tends not to be used.',
        example:
          'Goal: raise the margin on the main product. Action: recalculate the price per unit from direct and shared cost. Person: the trader. Date: within one week. Indicator: margin per unit known and reviewed monthly.',
      },
      {
        term: 'Planning inside your resources',
        definition:
          'The first version of a plan should not depend on a loan, a grant, an official decision or another person\u2019s agreement. Those can be added later. Beginning inside available resources gets a plan started this week instead of never.',
        example:
          'A trader who cannot afford a store can still reduce how much perishable stock she holds, and start writing one line a day.',
      },
      {
        term: 'Risk and response, side by side',
        definition:
          'Every plan carries risk. Naming each risk with its response in the same line makes the plan honest and usable when the risk arrives.',
        example:
          'Risk: a slow week leaves stock unsold. Response: hold a product that keeps, and reduce the perishable order that week.',
      },
      {
        term: 'A few indicators, checked on a date',
        definition:
          'Three or four indicators are enough: margin per unit, weekly sales, the amount of credit outstanding, savings held for buying, or the number of members contributing on time. Each needs a date on which it will be looked at.',
        example:
          'A single notebook line per day, read every Saturday, is enough to show whether a plan is working.',
      },
      {
        term: 'Revision is part of planning',
        definition:
          'A plan that is not revised is not being used. Revising on the review date, in writing, is the difference between a plan and a pledge.',
        example:
          'A trader who finds after a month that a price rise lost her regular customers can reduce it deliberately rather than abandoning the whole plan.',
      },
      {
        term: 'Leadership that hands over',
        definition:
          'Improvement that depends on one person ends with that person. Leadership here means explaining decisions, teaching the record-keeping, rotating the roles, and preparing someone to take over.',
        example:
          'A group chair who trains a successor in the accounts during her term leaves a group that survives her leaving.',
      },
    ],
    localCase: {
      title: 'Case Study: One Year of Plans in a Kiambu Market Row',
      location: 'Kiambu County, Kenya',
      intro:
        'A group of nine young traders in one market row each wrote a one-page plan after completing this course. This case looks at what happened to those nine plans over a year, including the ones that were abandoned, because the pattern is more useful than the successes alone.',
      sections: [
        {
          heading: 'The plans that started and continued',
          paragraphs: [
            'Four of the nine plans had three things in common: the first action was something the trader could do alone within a week, the plan fitted on one page, and it named a specific day each week for reading the record.',
            'One trader recalculated her price per unit and found she had been selling two products below cost. Another began writing one line each evening and discovered which weeks of the month actually earned. A third reduced her perishable order and added a dried product. A fourth began buying one staple weekly with two neighbours. All four plans survived the year, and three of the four are still running.',
          ],
        },
        {
          heading: 'The plans that stopped',
          paragraphs: [
            'Five plans stopped. Two had been built around borrowing money that was not available. One depended on the county allocating a stall, which had not happened by the end of the year. One was three pages long and was never read again after the second week. And one trader had planned to change her whole product line at once, lost her regular customers in the first month, and reverted.',
            'Not one of those five failures was caused by lack of effort. Each plan had been built outside what the trader could actually control in the first month.',
          ],
        },
        {
          heading: 'What the group learned',
          paragraphs: [
            'At the end of the year the nine traders met and rewrote the guidance they would give the next intake: start with one action you can do this week, keep the plan to one page, fix a day for reading the record, put risks next to responses, and add the things you cannot control later rather than first.',
            'They also adopted one rule about handover. Each trader who had completed a plan was asked to teach one other trader how to keep the record, so that the practice did not stay with nine people.',
          ],
        },
      ],
      takeaways: [
        'Plans that begin with an action the trader controls are the ones that survive.',
        'A plan that depends on money or permission outside the trader\u2019s control waits indefinitely.',
        'Fixing a weekly day for reading the record is what keeps a plan in use.',
        'Changing everything at once risks losing the customers a business already has.',
        'Teaching the practice to someone else is what spreads it beyond the individual.',
      ],
    },
    internationalComparison: {
      title: 'Optional Comparison: Business Planning Where You Live',
      prompt:
        'This comparison is optional and complements the Kiambu case. It is not a substitute for it.',
      questions: [
        'What support exists where you live for someone writing a business plan, and who can access it?',
        'Which parts of that support assume money, credit or time that a small trader may not have?',
        'What kind of record-keeping is expected of a small trader there, and by whom?',
        'Who is responsible for teaching business practice in your area: schools, lenders, government, or nobody?',
      ],
      note:
        'Notice where the Kenyan case relies on peers and groups because formal business support is thin. That is a difference in the surrounding system, which is a useful thing to name rather than assume is universal.',
    },
    activity: {
      title: 'My Soko Plan',
      purpose:
        'Write the one-page plan that brings this course together: goals, actions, dates, responsibilities, risks and indicators.',
      instructions: [
        'Keep the first version inside what you already have. Do not build the first action on money or permission you do not yet have.',
        'Write it so that it fits on one page and can be read aloud to another person.',
        'This is the final section of My Soko Action Plan. It is saved privately to your record.',
      ],
      fields: [
        { id: 'plan_focus', label: 'What this plan is for', helper: 'Is this plan for your enterprise, your group, or a market issue? Name it in one line.' },
        { id: 'goal', label: 'Your goal', helper: 'What should be different in three months? Make it specific enough to check.' },
        { id: 'resources_available', label: 'What you already have', helper: 'Labour, records, stock, a group, a skill, a stall, a relationship. List only what is genuinely available now.' },
        { id: 'first_action', label: 'First action, this week', helper: 'What will you do in the next seven days, and what day will you do it?' },
        { id: 'actions_with_dates', label: 'Next actions with dates', helper: 'List two or three further actions, each with a date and a person responsible.' },
        { id: 'risks_and_responses', label: 'Risks and responses', helper: 'Name two risks, and put your response beside each one on the same line.' },
        { id: 'indicators', label: 'How you will know it is working', helper: 'What three or four things will you check, and on what date?' },
        { id: 'review_day', label: 'Your weekly review day', helper: 'Which day each week will you read your record and check your plan?' },
        { id: 'support_needed', label: 'Support you will ask for', helper: 'What do you need from a group, a supplier or an authority, and when will you ask?' },
        { id: 'teach_someone', label: 'Who you will teach', helper: 'Who will you explain this practice to, so it does not stay with you alone?' },
        { id: 'final_plan', label: 'Your plan in one paragraph', helper: 'Write the plan as a short paragraph you could say aloud to a group or an official.' },
      ],
    },
    kiswahiliPrompt: {
      prompt: 'Soko lako litakuwa na nguvu gani miaka mitano ijayo?',
      translation: 'What strength will your market have five years from now?',
      guidance:
        'Answer in Kiswahili, in English, or in both. Your response is private unless you choose to share it with other learners.',
    },
    reflectionQuestions: [
      'What is the one action you can take this week, without money and without anyone\u2019s permission?',
      'Which risk have you been planning around in your head but never written beside a response?',
      'Who would continue your work if you stepped back, and what would they need from you?',
    ],
    quiz: {
      passingScore: 4,
      questions: [
        {
          id: 1,
          prompt: 'Which plan is most likely to be started?',
          options: [
            'One that begins with a loan application',
            'One that begins with an action the trader can take alone this week',
            'One that depends on a county allocation',
            'One that changes the whole product line at once',
          ],
          correctIndex: 1,
          feedback:
            'Plans that begin inside resources the trader already controls are the ones that survive. Everything requiring money or permission can be added later.',
        },
        {
          id: 2,
          prompt: 'Why does this module say a plan should fit on one page?',
          options: [
            'Because officials will not read more',
            'Because a plan that is short enough to reread is the one that stays in use',
            'Because paper is expensive',
            'Because long plans are inaccurate',
          ],
          correctIndex: 1,
          feedback:
            'A plan longer than one page tends not to be used. The measure is whether it is reread and revised, not how thorough it looks.',
        },
        {
          id: 3,
          prompt: 'What should appear beside each named risk in a plan?',
          options: [
            'The date the risk is expected',
            'The response to that risk',
            'The cost of the risk',
            'The person to blame if it happens',
          ],
          correctIndex: 1,
          feedback:
            'Risk and response belong on the same line, so the plan is usable when the risk arrives rather than only when it is written.',
        },
        {
          id: 4,
          prompt: 'What is the purpose of a weekly review day?',
          options: [
            'To restock',
            'To read the record against the plan so the plan stays in use and can be revised',
            'To pay the market fee',
            'To meet the county officer',
          ],
          correctIndex: 1,
          feedback:
            'Revision is part of planning. A fixed day for reading the record is what turns a written plan into a working one.',
        },
        {
          id: 5,
          prompt: 'What does leading a market improvement require of a trader?',
          options: [
            'Holding responsibility personally for as long as possible',
            'Explaining decisions, teaching the practice to others, rotating roles and preparing a successor',
            'Keeping records private so they cannot be questioned',
            'Waiting for the county to act first',
          ],
          correctIndex: 1,
          feedback:
            'Improvement that depends on one person ends with that person. Handover and teaching are what make it last.',
        },
      ],
    },
    closingText: [
      'A plan is short, specific and written down. It says what will change, who will do it, by when and how progress will be judged. A plan that depends on money you do not have and permission you have not been given is not a plan yet.',
      'The parts of this course that last are the ordinary ones: a price recalculated from cost, a record read on a fixed day, a group with written rules, a case made with evidence, a season read before it arrives, and a plan revised rather than abandoned.',
      'You are now ready to complete the requirements for the Sauti za Soko course certificate: every My Soko Action Plan section, at least one peer discussion, the final reflection, and all seven modules.',
    ],
    finalReflectionPrompt:
      'Write your final reflection on the course. What has changed in how you read your market or your business, what will you do first, and what will you explain to somebody else? Two or three paragraphs is enough.',
    endOfCourse: {
      label: 'Course modules complete',
      milestone: 'Next: complete your My Soko Action Plan, one peer discussion and your final reflection',
    },
    courseClosingText: [
      'You have reached the end of the seven-module learning sequence. To complete the course and receive your certificate, every My Soko Action Plan section must be saved, at least one peer discussion must be answered, and your final reflection must be submitted.',
    ],
    sources: [
      'Kenya Vision 2030 and county development planning documents on market infrastructure.',
      'Food and Agriculture Organization, market and value chain development guidance.',
      'International Labour Organization, informal economy and small enterprise development.',
      'Financial Sector Deepening Kenya, small enterprise planning and record-keeping research.',
      'Consultative Group to Assist the Poor, small business practices and resilience research.',
    ],
  },
};

export const SOKO_FACILITATOR_MODULE = {
  'module-8': {
    number: 'Module 8',
    route: 'module-8',
    title: 'Facilitating a Vendor Circle',
    description:
      'Prepares a learner who has completed the seven core modules to facilitate a peer vendor circle: what peer facilitation is and is not, safeguarding and consent, preparing and running a session, writing a privacy-protecting summary, and where the limits of the role lie.',
    status: 'In development',
    estimatedTime: '60\u201375 minutes, plus one facilitated discussion',
    competency:
      'By the end of this module, learners should be able to plan and facilitate one peer vendor circle: preparing a session plan for a small group of traders, opening with clear expectations and consent, keeping the discussion on practical ground, protecting participants\u2019 privacy, writing a summary that names no individual, and reflecting on what they would change.',
    learningObjectives: [
      'Explain what peer facilitation is, what it is not, and where its limits lie.',
      'Prepare a session plan for a small vendor circle, including purpose, timing and questions.',
      'Open a session with clear expectations and obtain participants\u2019 informed consent.',
      'Keep a discussion practical, inclusive and on time, without lecturing or advising.',
      'Write a privacy-protecting summary and reflection that names no individual participant.',
    ],
    overview: [
      'This module is the optional Peer Facilitator track. It is for learners who have completed the seven core modules and want to hold a conversation with other traders in their own market, using the course as a shared starting point rather than as a set of instructions to deliver.',
      'Peer facilitation is a specific and limited role. A facilitator is not a teacher, not a business adviser, not a counsellor, and not a representative of Tamu Academy. A facilitator holds a structure so that traders can think together, and keeps the conversation practical. When a topic moves beyond that, the facilitator names it and points people to someone qualified.',
      'The module is deliberately careful about privacy and consent. A discussion between traders about money, debt, obligation and risk is personal. Nothing said in the circle is recorded by name, and nothing is shared beyond what participants agree to.',
    ],
    contextNotes: [
      {
        term: 'Vendor circle',
        plain:
          'A small, voluntary discussion group of traders, usually between four and eight people, held in or near the market.',
        whyItMatters:
          'It is the setting for this track. Keeping it small and voluntary is what makes honest discussion possible.',
      },
      {
        term: 'Informed consent',
        plain:
          'Participants agreeing to take part after being told clearly what the session is, what will be written down, and what will not be shared.',
        whyItMatters:
          'It must be obtained before the discussion begins, not afterwards, and it must be genuine rather than assumed.',
      },
      {
        term: 'Peer facilitation',
        plain:
          'Holding a structure for a conversation among equals, rather than teaching, advising or assessing participants.',
        whyItMatters:
          'It defines the boundary of the role and the kind of authority a facilitator has.',
      },
      {
        term: 'Confidentiality',
        plain:
          'The commitment that what is said in the circle is not repeated, and that written summaries contain no names or identifying details.',
        whyItMatters:
          'Without it, traders will not speak honestly about money and obligation, and the circle becomes a performance.',
      },
      {
        term: 'Referral',
        plain:
          'Pointing a participant to someone qualified when a question falls outside the facilitator\u2019s role.',
        whyItMatters:
          'Knowing where to refer is what allows a facilitator to hold the boundary without dismissing a person\u2019s question.',
      },
    ],
    keyConcepts: [
      {
        term: 'What peer facilitation is',
        definition:
          'A facilitator sets up a conversation, keeps time, invites quieter participants in, keeps the discussion on practical ground, and closes it with what people will do next. The content comes from the group, not from the facilitator.',
        example:
          'Asking "what did you try last month, and what happened?" produces the group\u2019s own knowledge. Explaining what traders should do removes it.',
      },
      {
        term: 'What peer facilitation is not',
        definition:
          'A facilitator does not teach, does not give financial, agricultural, legal or medical advice, does not act as a counsellor, does not assess participants, and does not speak for Tamu Academy or for any authority.',
        example:
          'If a participant describes debt distress or illness, the facilitator listens with respect and refers, rather than offering a solution.',
      },
      {
        term: 'Consent and safeguarding',
        definition:
          'Before the session: explain the purpose, the time, what will be written down, and what will not be shared. Ask for agreement. Any person may decline or leave at any point. No participant is named in any record. Nothing is photographed or recorded without explicit agreement.',
        example:
          'Reading out a short statement about what will and will not be written, and giving people a chance to decline, is the safeguarding step that makes the rest safe.',
      },
      {
        term: 'Preparing a session plan',
        definition:
          'A session plan names the purpose in one line, the number of participants, the time and place, three or four questions in order, and the timing for each. One page is enough.',
        example:
          'Purpose: look at how each person prices one product. Questions: what does one unit cost you, what do you charge, what does the stall cost per day?',
      },
      {
        term: 'Running the session',
        definition:
          'Start on time, restate the purpose and the consent, work through the questions, keep each person to time, draw in anyone who has not spoken, and close by asking each participant for one thing they will try.',
        example:
          'Going around the circle for one sentence from each person at the close ensures the session ends with commitments rather than opinions.',
      },
      {
        term: 'Writing a privacy-protecting summary',
        definition:
          'A summary describes what the group discussed and what people decided to try. It contains no names, no stall numbers, no amounts attributable to an identifiable person, and no identifying detail. If a detail would let a neighbour identify the speaker, it is left out.',
        example:
          '"The group agreed to recalculate prices on one product each" is safe. "Mary said she has been selling below cost for two months" is not.',
      },
    ],
    localCase: {
      title: 'Case Study: A First Vendor Circle in Kiambu County',
      location: 'Kiambu County, Kenya',
      intro:
        'A learner who had completed the core course held her first vendor circle with six traders from her own market row. This case follows what she planned, what did not go to plan, and what she changed for the second session.',
      sections: [
        {
          heading: 'Planning',
          paragraphs: [
            'She invited six people individually, explained that it was a discussion rather than a training, and told them it would take about forty-five minutes after trading. She chose a bench behind the row where they would not be overheard by customers, and she asked one trader who had agreed in advance to help draw others in if the conversation stalled.',
            'Her session plan had one purpose, three questions and timings written beside each question. She decided in advance that she would not answer business questions herself, and she identified two people she could refer participants to: the market chairman for fee questions, and a local SACCO officer for credit questions.',
          ],
        },
        {
          heading: 'What happened in the session',
          paragraphs: [
            'The consent step took longer than expected, because two participants wanted to know exactly what would be written down. She read them the note she had prepared and one participant asked that nothing about her customers be included. That request was agreed and honoured.',
            'The first question went well. The second produced a long story from one participant about a supplier, and the group followed it, leaving only ten minutes for the third question. She let it run rather than cutting the speaker off, and dropped the third question instead of rushing it.',
            'One participant said almost nothing. She asked him a direct question that could be answered in one sentence, and he became one of the most useful contributors on the question of storage.',
          ],
        },
        {
          heading: 'What she wrote and what she left out',
          paragraphs: [
            'Her summary ran to one paragraph. It recorded that the group discussed pricing practices, that four participants had never calculated a daily stall cost, and that the group agreed to try one joint purchase of a staple the following week. It recorded that the discussion of supplier credit ran long.',
            'She left out who had been selling below cost, the supplier\u2019s name, the amounts anyone owed, and which participant had been silent. Nothing in the summary would let a reader identify any participant.',
          ],
        },
        {
          heading: 'What she changed next time',
          paragraphs: [
            'She shortened the consent statement and moved it to the invitation as well as the start, so it took less session time. She made the second question narrower so it could not absorb the whole session. She added five minutes at the end for each person to state one thing they would try. And she asked a participant to help keep time, so she could concentrate on the discussion.',
          ],
        },
      ],
      takeaways: [
        'Consent takes time and should be planned for, not squeezed in.',
        'A facilitator who lets one question run and drops another protects the group\u2019s interest better than one who rushes.',
        'Closing with one commitment from each participant turns discussion into action.',
        'A summary that names nobody is still useful, and it protects the people who spoke.',
        'Reviewing what happened and changing one or two things is the whole of facilitator improvement.',
      ],
    },
    safeguardingAndLimits: {
      title: 'Safeguarding, Consent and the Limits of the Role',
      points: [
        'Obtain informed consent at the start of every session, and accept a refusal without question.',
        'No participant is named, photographed or recorded without explicit agreement, and no identifying detail appears in any summary.',
        'A facilitator does not give financial, agricultural, legal or medical advice, and does not act as a counsellor.',
        'If a participant raises distress, illness, debt crisis, violence or a legal matter, listen, do not advise, and refer them to a qualified person or service.',
        'A facilitator does not speak for Tamu Academy, for a county government, or for any traders\u2019 association unless the association has formally mandated them.',
        'Sessions are voluntary and no participant may be pressured to speak, contribute money, or join any group.',
      ],
    },
    internationalComparison: {
      title: 'Optional Comparison: Peer Learning Where You Live',
      prompt:
        'This comparison is optional and complements the Kiambu case. It is not a substitute for it.',
      questions: [
        'What kind of peer learning or support group exists for small business owners where you live?',
        'What training or safeguarding is expected of the people who run those groups there?',
        'Who is legally and professionally accountable if advice given in such a group goes wrong?',
      ],
      note:
        'Accountability structures differ. In some countries a facilitator giving financial advice may carry professional or legal exposure; in others the boundary is informal. The boundary in this course is deliberately narrow for that reason.',
    },
    activity: {
      title: 'My Vendor Circle Session Plan',
      purpose:
        'Prepare the session plan, the consent statement and the summary for one vendor circle you will facilitate.',
      instructions: [
        'Plan for a real circle of four to eight traders. Keep the plan to one page.',
        'Write the consent statement in the words you will actually use.',
        'When you have facilitated the session, return to this section to add your summary and reflection, then submit the whole record for review.',
        'Your answers are saved privately and reviewed by a course reviewer before the track is completed.',
      ],
      fields: [
        { id: 'circle_purpose', label: 'Purpose of the circle', helper: 'In one line, what will this session look at?' },
        { id: 'participants', label: 'Who will take part', helper: 'How many traders, from which part of the market, and how were they invited?' },
        { id: 'time_and_place', label: 'Time and place', helper: 'When and where will it be held, and why is that private enough?' },
        { id: 'consent_statement', label: 'Your consent statement', helper: 'Write the words you will use to explain the purpose, what will be written down, and what will not be shared, and to ask for agreement.' },
        { id: 'questions', label: 'Your three or four questions', helper: 'List the questions in order, with the time you will allow each.' },
        { id: 'boundaries', label: 'Topics outside your role', helper: 'Which topics would you decline to advise on, and to whom would you refer a participant?' },
        { id: 'session_plan', label: 'Your session plan', helper: 'Write the one-page plan: purpose, timing, questions, and how you will close.' },
        { id: 'discussion_summary', label: 'Discussion summary', helper: 'After the session, write what the group discussed and what people agreed to try. No names, no stall numbers, no identifying amounts.' },
        { id: 'facilitator_reflection', label: 'Facilitator reflection', helper: 'What went well, what did not go to plan, and what will you change next time?' },
        { id: 'consent_confirmed', label: 'Confirm consent and privacy', helper: 'Confirm that participants gave informed consent, that the discussion was voluntary, and that no individual is identifiable in your summary.' },
      ],
    },
    kiswahiliPrompt: {
      prompt: 'Kikundi cha wafanyabiashara kinaweza kujifunza nini kutoka kwa kila mmoja?',
      translation: 'What can a group of traders learn from one another?',
      guidance:
        'Answer in Kiswahili, in English, or in both. Your response is private unless you choose to share it with other learners.',
    },
    reflectionQuestions: [
      'What is the difference between holding a discussion and teaching one, and which is harder for you?',
      'What would you do if a participant told the circle something painful and personal?',
      'What in your session plan would let a reader identify one of your participants, and how will you remove it?',
    ],
    quiz: {
      passingScore: 4,
      questions: [
        {
          id: 1,
          prompt: 'Which statement best describes a peer facilitator\u2019s role?',
          options: [
            'Teaching the course content to other traders',
            'Holding a structure for traders to think together, keeping the conversation practical',
            'Assessing which participants have learned the most',
            'Representing the county government\u2019s market policy',
          ],
          correctIndex: 1,
          feedback:
            'The content comes from the group. A facilitator sets up the conversation, keeps time and keeps it practical.',
        },
        {
          id: 2,
          prompt: 'When should informed consent be obtained?',
          options: [
            'After the session, when participants know what was discussed',
            'Before the discussion begins, after explaining the purpose and what will and will not be written down',
            'Only from participants who choose to speak',
            'It is not needed for a voluntary market discussion',
          ],
          correctIndex: 1,
          feedback:
            'Consent must be informed and obtained before the discussion, and a refusal must be accepted without question.',
        },
        {
          id: 3,
          prompt: 'A participant describes serious debt distress. What should a facilitator do?',
          options: [
            'Offer a repayment plan based on the course',
            'Recommend taking a loan from the local SACCO',
            'Listen without advising, and refer them to a qualified person or service',
            'Ask the group to advise them',
          ],
          correctIndex: 2,
          feedback:
            'A facilitator does not give financial or personal advice and is not a counsellor. Listening and referring is the correct boundary.',
        },
        {
          id: 4,
          prompt: 'Which sentence is acceptable in a discussion summary?',
          options: [
            '"Grace said she has been selling below cost for two months."',
            '"The group agreed to recalculate prices on one product each."',
            '"The supplier in row two overcharged three members."',
            '"Two participants owed the wholesaler more than 5,000 shillings."',
          ],
          correctIndex: 1,
          feedback:
            'A summary must contain no names, stall numbers or identifying amounts. It describes what the group discussed and decided.',
        },
        {
          id: 5,
          prompt: 'Why must the facilitator role be kept narrow?',
          options: [
            'Because traders do not trust outsiders',
            'Because advice outside a facilitator\u2019s competence can cause real harm, and the role carries no professional accountability',
            'Because the course must remain profitable',
            'Because sessions must stay under one hour',
          ],
          correctIndex: 1,
          feedback:
            'Peer facilitation is deliberately limited. Financial, legal, agricultural and medical questions belong with qualified people.',
        },
      ],
    },
    closingText: [
      'Peer facilitation is a held structure, not a position of expertise. The facilitator offers the frame; the group supplies the knowledge.',
      'The safeguards are what make it possible: informed consent before the discussion, no names in any record, no advice outside your competence, and a clear referral route when a question belongs elsewhere.',
      'Once your session plan, discussion summary and reflection are submitted and approved by a reviewer, you will receive the Sauti za Soko Peer Facilitator certificate, separate from the course certificate.',
    ],
    endOfCourse: {
      label: 'Facilitator track complete',
      milestone: 'Next: submit your session plan, summary and reflection for review',
    },
    sources: [
      'International Labour Organization, peer learning and informal economy organising.',
      'Kenya Data Protection Act, 2019, on consent and personal data.',
      'World Health Organization and Kenya Ministry of Health, mental health referral guidance for non-specialists.',
      'Financial Sector Deepening Kenya, financial capability and community facilitation resources.',
      'Consultative Group to Assist the Poor, safeguarding in community-based financial programmes.',
    ],
  },
};