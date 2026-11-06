/**
 * Course template — the curriculum.
 *
 * One file holds the module content for every course built with the template,
 * keyed by course slug and then by module route:
 *
 *   TEMPLATE_CURRICULUM['<course-slug>']['module-1'] = { ...module content }
 *
 * The course registry entry (course-template-config.js) decides which routes
 * exist, whether each is published and what it requires. This file only holds
 * what the learner reads.
 *
 * MODULE SHAPE — every field except `title`, `lessonSections` and `requirements`
 * is optional, and a step a module does not carry is simply not rendered:
 *
 *   title            string
 *   estimatedTime    string, shown in the module header
 *   video            { title, watchUrl, note } — a recorded lesson or welcome
 *                    film. Omit it when the module has no recording.
 *   goals            string[]      "What you'll learn"
 *   lessonSections   [{ heading, paragraphs: string[], pauseAndThink }]
 *   activity         { intro, steps: string[] }   "Try it"
 *   keyTerms         [{ term, meaning }]
 *   quiz             { passingScore, questions: [{ id, question, options, correctIndex, feedback }] }
 *   reflection       string        the reflection prompt
 *   requirements     string[]      which steps complete the module. Valid
 *                    values: media, lesson, activity, scenario,
 *                    knowledge_check, reflection.
 *
 * The quiz answer keys live here and never reach the browser: the module
 * endpoint strips `correctIndex` before responding, and grading happens in
 * checkTemplateCourseQuiz.
 *
 * Server-side only. Never import this file from src/.
 */

export const TEMPLATE_CURRICULUM = {
  // ── Example course ──────────────────────────────────────────────────────
  'template-example': {
    'module-1': {
      title: 'Reading a Local Economy',
      estimatedTime: '35 minutes',
      goals: [
        'Describe a local economy by what moves through it, not only by what it earns.',
        'Identify the four flows every market town depends on: goods, money, labour and care.',
        'Distinguish a livelihood from a job, and explain why the difference matters for policy.',
        'Ask three questions that reveal where value is produced and where it leaves.',
      ],
      lessonSections: [
        {
          heading: 'An economy is a set of flows',
          paragraphs: [
            'A local economy is easiest to read as a set of flows rather than a set of institutions. Goods move from farms and workshops to households, markets and processors. Money moves the other way, but rarely in equal measure or at equal speed. Labour moves daily, seasonally and across generations. Care — food prepared, children raised, elders supported, neighbours covered — moves constantly and is almost never counted.',
            'When one of those flows narrows, the others adjust. A road that closes does not only stop goods; it lengthens the time money takes to return to the household that produced the goods in the first place. Reading the economy means watching all four flows together, because a policy that strengthens one can quietly thin another.',
          ],
          pauseAndThink:
            'Think of the market nearest to you. Which of the four flows is easiest to see, and which is nearly invisible in how people talk about it?',
        },
        {
          heading: 'Livelihood is not the same as a job',
          paragraphs: [
            'A job is one arrangement for earning. A livelihood is the whole portfolio a household assembles to keep itself standing: a plot of maize, a stall in the market, casual work on a building site, a daughter\u2019s remittances, a neighbour\u2019s loan, a shared plough.',
            'This distinction matters because most development policy is written as if everyone held a job. A programme that requires a formal wage, a fixed address or a bank statement will exclude precisely the households whose livelihoods are most diversified — and most resilient in a crisis. Reading livelihoods first usually produces better-designed support than reading employment first.',
          ],
        },
        {
          heading: 'Three questions to ask first',
          paragraphs: [
            'First: where is this value produced, and who does the producing? Second: where does the value finally settle — in the household, in the town, in the capital, or abroad? Third: what does the household do when the flow stops for a month?',
            'Those three questions separate an economy that is growing from an economy that is being extracted from. They are also the questions this course returns to in every module, because they can be asked of a market stall, a county budget and a continental trade agreement alike.',
          ],
          pauseAndThink:
            'Pick one product sold in your local market. Trace where its value settles, and note how much of it stays within a day\u2019s travel.',
        },
      ],
      activity: {
        intro:
          'Draw a one-page map of the economy you live in now. It does not need to be neat; it needs to be true.',
        steps: [
          'Put your household in the centre of the page.',
          'Draw an arrow for every flow you can name: goods in, money out, labour out, care given and received.',
          'Mark each arrow with where it goes and how long the round trip takes — a day, a season, a year.',
          'Circle the flow your household would miss first if it stopped for one month.',
          'Keep the map. Later modules will ask you to add to it rather than replace it.',
        ],
      },
      keyTerms: [
        { term: 'Livelihood', meaning: 'The full set of activities a household combines to keep itself standing.' },
        { term: 'Value capture', meaning: 'How much of the value produced in a place remains there after it is sold.' },
        { term: 'Care economy', meaning: 'The unpaid and underpaid work of looking after people, which every other flow depends on.' },
      ],
      quiz: {
        passingScore: 3,
        questions: [
          {
            id: 'q1',
            question: 'Which statement best describes a local economy as this module presents it?',
            options: [
              'The total income earned by households in a district.',
              'The set of flows of goods, money, labour and care through a place.',
              'The number of registered businesses operating in a town.',
              'The value of goods exported from a region each year.',
            ],
            correctIndex: 1,
            feedback:
              'Income is one measurement of one flow. The module reads the economy as four flows together, because they move at different speeds and respond to each other.',
          },
          {
            id: 'q2',
            question: 'Why does the module distinguish a livelihood from a job?',
            options: [
              'Because jobs pay more than livelihoods.',
              'Because a livelihood combines several activities, and policy written only for jobs excludes many households.',
              'Because livelihoods are informal and therefore untaxable.',
              'Because a job always requires a bank account.',
            ],
            correctIndex: 1,
            feedback:
              'A livelihood is the whole portfolio a household assembles. Programmes that assume a formal wage can exclude the households they most intend to reach.',
          },
          {
            id: 'q3',
            question: 'A new road lets produce reach a larger town faster, but traders from outside now buy directly from farmers. What should you check before calling this a gain?',
            options: [
              'Only whether the road was built on budget.',
              'Only whether farmers are paid in cash.',
              'Where the value now settles, and what the local market loses when traders bypass it.',
              'Whether the number of jobs in the district increased.',
            ],
            correctIndex: 2,
            feedback:
              'Faster movement is one half of the story. Reading value capture shows whether the gain stays in the place that produced it.',
          },
          {
            id: 'q4',
            question: 'The care economy matters to economic analysis because:',
            options: [
              'It is the largest formal employer in most districts.',
              'It is counted in national accounts as a separate sector.',
              'Every other flow depends on it, yet it is usually uncounted and unpaid.',
              'It only matters in wealthy countries.',
            ],
            correctIndex: 2,
            feedback:
              'Care work underwrites goods, money and labour flows, and its invisibility in the data is exactly why analysis built on that data misses it.',
          },
        ],
      },
      reflection:
        'In three or four sentences: what did drawing your map show you that you had not noticed before, and which flow would you want to strengthen first?',
      requirements: ['lesson', 'activity', 'knowledge_check', 'reflection'],
    },

    // Unpublished in the registry on purpose: the module endpoint returns 403
    // for learners (admins can still preview it), which demonstrates the
    // publication gate.
    'module-2': {
      title: 'Following the Money',
      estimatedTime: '30 minutes',
      goals: [
        'Trace one payment from a household to its final resting place.',
        'Explain the difference between money that circulates and money that leaves.',
        'Describe how credit unions, savings groups and mobile money change the speed of circulation.',
      ],
      lessonSections: [
        {
          heading: 'Where money rests',
          paragraphs: [
            'Money moves quickly or slowly depending on where it can rest. A payment that reaches a local trader is likely to be spent again nearby within days. A payment that reaches a distributor three hundred kilometres away may never return. The difference is not the amount paid; it is the number of times the same money is used in the same place before it leaves.',
          ],
          pauseAndThink:
            'Follow the last significant payment your household made. How many times will that money be spent within a day\u2019s travel of you?',
        },
        {
          heading: 'Institutions that slow the exit',
          paragraphs: [
            'Savings groups, credit unions and mobile money wallets all do a version of the same thing: they shorten the distance between where money is earned and where it can be used again. A savings group that lends within the same market keeps value circulating. A wallet that settles instantly removes a day of travel from every transaction.',
            'The design question is not whether an institution is formal, but whether it changes the speed and the destination of the money it touches.',
          ],
        },
      ],
      activity: {
        intro: 'Trace one payment end to end on paper.',
        steps: [
          'Write down one recent payment you made, and to whom.',
          'Ask, or estimate, where that person spends it next.',
          'Follow the chain for three more steps.',
          'Mark the first point at which the money leaves your local area.',
        ],
      },
      quiz: {
        passingScore: 2,
        questions: [
          {
            id: 'q1',
            question: 'What makes money "circulate" in a local economy?',
            options: [
              'The total amount of money in the district.',
              'How many times it is spent locally before it leaves.',
              'The interest rate offered by the nearest bank.',
              'The number of people who hold accounts.',
            ],
            correctIndex: 1,
            feedback: 'Circulation is about reuse in place, not the size of the balance.',
          },
          {
            id: 'q2',
            question: 'A savings group that lends within the same market mainly changes:',
            options: [
              'The amount of money in the country.',
              'The speed at which money returns to the households that earned it.',
              'The official exchange rate.',
              'The tax rate applied to traders.',
            ],
            correctIndex: 1,
            feedback: 'It shortens the round trip, which is what keeps value nearby.',
          },
        ],
      },
      reflection:
        'What surprised you about where your payment ended up, and what would you change about how your household pays for one weekly expense?',
      requirements: ['lesson', 'activity', 'knowledge_check', 'reflection'],
    },
  },

  // ── The Diaspora Remittance Economy ─────────────────────────────────────
  // The first real course built with the template. Three published modules,
  // each requiring the lesson, the activity, the knowledge check and the
  // reflection, exactly as the example course does.
  'diaspora-remittance-economy': {
    'module-1': {
      title: 'What a Remittance Really Is',
      estimatedTime: '35 minutes',
      goals: [
        'Define a remittance and separate it from trade, investment and aid.',
        'Describe the formal and informal channels a transfer can travel through.',
        'Explain why the same transfer can appear in one statistic and vanish from another.',
        'Name what a sending household gives up in order to send.',
      ],
      lessonSections: [
        {
          heading: 'A transfer between two households',
          paragraphs: [
            'A remittance is money one person sends to another across a border, usually to family. It is the most direct form of international finance there is: no project, no institution holding the funds for a term, no return expected. The sender and the recipient are usually bound by obligation rather than contract, which is why the flow behaves differently from almost every other kind of money crossing a border.',
            'Remittances are characteristically small, frequent and steady. They tend to rise when the receiving country is in difficulty, because a family under pressure calls on the members who are abroad. Economists call that counter-cyclical. It is also why remittances are often described as household insurance rather than household income.',
          ],
          pauseAndThink:
            'Think of a family you know that receives support from abroad. Is the transfer regular, or does it tend to arrive when something has happened?',
        },
        {
          heading: 'Two channels, one flow',
          paragraphs: [
            'A transfer can travel formally, through a bank, a money transfer operator or a mobile money service, or informally, through a bus company, a traveller, a community collector or a trust-based network that settles in both directions. The informal route is often cheaper and faster where formal coverage is thin, particularly in rural areas with few agents.',
            'The difference matters beyond cost. A formal transfer leaves a record that counts in national statistics and can be used to prove income for a loan. An informal transfer leaves none. A country can therefore receive a great deal of support and appear to receive very little, and a household can be economically active and financially invisible at the same time.',
          ],
        },
        {
          heading: 'What the sender gives up',
          paragraphs: [
            'The cost of a remittance is not only the transfer fee. It includes the exchange rate the sender accepts, the time spent arranging the transfer, and the risk of loss when money travels through an informal channel. It also includes whatever the sending household does without in order to send: a smaller flat, later retirement, less set aside for the sender\u2019s own old age.',
            'Reading a remittance as a decision about two households at once, rather than a payment from one, changes what counts as a good outcome. A transfer that is cheap for the sender but unreliable for the recipient has not become efficient; it has simply moved the risk.',
          ],
          pauseAndThink:
            'If you send or receive support, who carries most of the risk in the arrangement: the sender, the recipient, or the person moving the money?',
        },
      ],
      activity: {
        intro: 'Map one transfer you know, without naming anyone.',
        steps: [
          'Choose a transfer you know about, from your own family or from a public account.',
          'Write down who sends, who receives, and roughly how often.',
          'Mark the channel it travels through, and who handles it on each side.',
          'Note what the sender gives up, and what the recipient counts on.',
          'Keep the map. The next two modules return to it.',
        ],
      },
      keyTerms: [
        { term: 'Remittance', meaning: 'Money sent by a migrant or diaspora household to family in another country, usually without expectation of repayment.' },
        { term: 'Corridor', meaning: 'A sending country and receiving country pair, used to compare the price of transfers between them.' },
        { term: 'Counter-cyclical', meaning: 'Moving in the opposite direction to the receiving economy: remittances tend to rise when local conditions worsen.' },
      ],
      quiz: {
        passingScore: 3,
        questions: [
          {
            id: 'q1',
            question: 'Which description best fits a remittance as this module defines it?',
            options: [
              'A loan from an international bank to a government.',
              'Money sent by one household to another across a border, usually without repayment.',
              'A share purchase in a foreign company.',
              'Aid given by one country to another.',
            ],
            correctIndex: 1,
            feedback:
              'A remittance is household to household and carries no expectation of repayment, which is what separates it from lending, investment and aid.',
          },
          {
            id: 'q2',
            question: 'Why does the module describe remittances as counter-cyclical?',
            options: [
              'They fall when the receiving economy improves.',
              'They rise when the receiving country is in difficulty.',
              'They are paid back when the economy recovers.',
              'They move in step with foreign investment.',
            ],
            correctIndex: 1,
            feedback:
              'Families send more when the household at home is under pressure, so the flow moves against the direction of the receiving economy.',
          },
          {
            id: 'q3',
            question: 'A country receives large sums through informal channels. What is the most likely effect on its official statistics?',
            options: [
              'They overstate the amount received.',
              'They record the amount accurately.',
              'They understate the amount received.',
              'They record it as foreign direct investment.',
            ],
            correctIndex: 2,
            feedback:
              'Informal transfers leave no record, so the recorded flow is smaller than the real one. That gap shapes how the country looks to lenders and analysts.',
          },
          {
            id: 'q4',
            question: 'Which list makes up the real cost of sending, as the module sets it out?',
            options: [
              'Only the advertised transfer fee.',
              'The fee, the exchange rate accepted, the time taken and the risk of loss.',
              'Only the exchange rate.',
              'Only the tax paid in the receiving country.',
            ],
            correctIndex: 1,
            feedback:
              'The fee is the visible charge. The rate, the time and the risk complete the price, and the sending household often carries all four.',
          },
        ],
      },
      reflection:
        'In three or four sentences: what does the transfer you mapped make possible for the receiving household, and what does it cost the sending one?',
      requirements: ['lesson', 'activity', 'knowledge_check', 'reflection'],
    },

    'module-2': {
      title: 'The Cost of Sending',
      estimatedTime: '40 minutes',
      goals: [
        'Break the price of a transfer into its fee and its exchange-rate margin.',
        'Express the total cost of a transfer as a share of the amount sent.',
        'Explain why prices differ between corridors and between providers on one corridor.',
        'Describe the international target for transfer costs and why it has been hard to reach.',
      ],
      lessonSections: [
        {
          heading: 'Two charges make one price',
          paragraphs: [
            'A transfer usually carries two charges. The first is explicit: a flat fee, a percentage, or both. The second is quieter. The exchange rate a provider offers is rarely the rate you would find on a market screen, and the difference is a margin the provider keeps. A sender who compares only the fee is comparing half the price.',
            'The honest measure is what the recipient actually receives. If a sender pays two hundred units in total, including the fee, and the recipient receives the equivalent of one hundred and ninety, the transfer cost ten units. That is five per cent of the amount sent. Computing that single percentage turns two confusing charges into one number that can be compared across providers, corridors and days.',
          ],
          pauseAndThink:
            'Take the last transfer you or your family sent. Do you know what the recipient actually received, in their own currency, after every charge?',
        },
        {
          heading: 'Why the cheapest corridor is not the nearest one',
          paragraphs: [
            'Prices vary widely between routes. A corridor with many competing providers, high volumes and good payment infrastructure is usually cheap. A corridor with few providers, low volumes and a long cash-out chain is usually expensive. Distance explains less than competition does.',
            'Exclusivity arrangements can keep a corridor thin. Where a single provider holds the agreement with the paying bank, the post office or the dominant agent network, the sender has no real alternative and the price reflects that. Interoperability, the ability of one service to pay into another, has the opposite effect: it turns every provider in a corridor into a possible competitor.',
          ],
        },
        {
          heading: 'The three per cent target',
          paragraphs: [
            'The international community has set a target, under the sustainable development goals, of reducing the cost of remittances to less than three per cent of the amount sent, and of removing corridors that cost more than five per cent. Global averages have fallen over the past decade, but slowly, and in the latest World Bank estimates they remain roughly twice the target.',
            'The instruments that move the number are unglamorous: transparent pricing, more providers in a corridor, digital rails that settle directly, and rules that stop one company from owning both ends of a route. Each is a policy choice rather than a piece of technology, which is why the target has proved easier to announce than to reach.',
          ],
          pauseAndThink:
            'If a corridor you know costs far more than three per cent, where do you think the extra money actually goes?',
        },
      ],
      activity: {
        intro: 'Price one transfer three ways.',
        steps: [
          'Choose a typical amount your family might send on a familiar corridor.',
          'Get quotes from three providers for the same amount on the same day.',
          'For each, write down the fee and the exchange rate offered.',
          'Work out what the recipient would actually receive, and convert it into their currency.',
          'Express each quote as a percentage of the amount sent, then compare the three.',
        ],
      },
      keyTerms: [
        { term: 'Transfer fee', meaning: 'The explicit charge a provider makes for sending the money.' },
        { term: 'Exchange-rate margin', meaning: 'The difference between the market rate and the rate the provider applies, which the provider keeps.' },
        { term: 'Interoperability', meaning: 'The ability of one transfer service to pay into another, which allows providers to compete across a corridor.' },
      ],
      quiz: {
        passingScore: 3,
        questions: [
          {
            id: 'q1',
            question: 'A sender pays 200 in total, including the fee, and the recipient receives the equivalent of 190. What did the transfer cost, as a share of the amount sent?',
            options: ['1 per cent', '5 per cent', '10 per cent', '19 per cent'],
            correctIndex: 1,
            feedback: 'Ten units of cost on two hundred sent is five per cent. Comparing that single figure is what makes quotes comparable.',
          },
          {
            id: 'q2',
            question: 'Why is comparing transfer fees alone misleading?',
            options: [
              'Fees are always too small to matter.',
              'The exchange rate also carries a margin that the sender pays without seeing it as a charge.',
              'Fees are set by the receiving country.',
              'Only banks charge fees.',
            ],
            correctIndex: 1,
            feedback:
              'The margin sits inside the rate rather than on the receipt, so a low fee can hide an expensive transfer.',
          },
          {
            id: 'q3',
            question: 'What most reliably makes a corridor cheaper, according to the module?',
            options: [
              'A shorter distance between the two countries.',
              'More competing providers and interoperable payment systems.',
              'A larger sending country population.',
              'Higher transfer volumes from a single provider.',
            ],
            correctIndex: 1,
            feedback:
              'Competition and interoperability put pressure on both the fee and the rate. Distance explains far less than the structure of the market.',
          },
          {
            id: 'q4',
            question: 'What does the sustainable development goal target for remittance costs ask for?',
            options: [
              'Free transfers by 2030.',
              'Less than three per cent on average, and no corridor above five per cent.',
              'A flat fee of three units per transfer.',
              'A single provider per corridor.',
            ],
            correctIndex: 1,
            feedback:
              'The target is a percentage of the amount sent, with a stricter ceiling for the most expensive corridors.',
          },
        ],
      },
      reflection:
        'In three or four sentences: after pricing one transfer three ways, what would you change about how your household chooses a provider?',
      requirements: ['lesson', 'activity', 'knowledge_check', 'reflection'],
    },

    'module-3': {
      title: 'When the Money Lands',
      estimatedTime: '40 minutes',
      goals: [
        'Describe how receiving households typically use remittances.',
        'Examine the dependency argument without caricature.',
        'Explain value capture and why it matters for a receiving community.',
        'Name the institutions and policy choices that keep value circulating.',
      ],
      lessonSections: [
        {
          heading: 'What households actually do with it',
          paragraphs: [
            'The largest share of remittance money goes to everyday necessities: food, rent, school fees, medicine, and the repayment of debts taken on during a crisis. Research across many countries finds a smaller but real share going into housing, land, livestock and small enterprise. Because the spending looks ordinary, it is sometimes described as unproductive. That reading mistakes consumption for waste. School fees and clinic visits are investments in people, and a household that eats steadily can work and study.',
            'It also helps to notice who decides. Money that arrives in a household is allocated by that household, often by women, and usually with a clear order of priority. Programmes that route support through households rather than projects are building on a decision-making structure that already exists.',
          ],
        },
        {
          heading: 'The dependency argument, examined',
          paragraphs: [
            'The common worry is that regular transfers make households and governments lazy. The evidence is more modest than the argument. Remittances tend to function as insurance, and households generally keep several income streams going at once. Where researchers have looked for the discouraged-worker effect, they have often found the opposite: a steady transfer can make it possible to search for better work rather than accept the first available one.',
            'The sharper risk is concentration. When one earner, one channel or one country supplies everything a household relies on, a single job loss, fee increase or policy change removes its whole safety net. That is a resilience problem rather than a moral one, and it is addressed by widening the sources of support and the channels that carry them.',
          ],
          pauseAndThink:
            'In the household you mapped, how many separate sources of support exist? What would happen if the largest one stopped for three months?',
        },
        {
          heading: 'Where the value settles',
          paragraphs: [
            'Money that lands and is spent at a shop supplied from outside the community leaves quickly. Money that lands and is spent with a local trader, saved in a local group or invested in local production stays, and is used again before it goes. This is the question the course opened with, now applied to a flow that crosses a border: not how much arrives, but how many times it is used in the place it arrives.',
            'The institutions that help are unremarkable and local: savings groups, cooperatives, credit unions, and traders who buy from nearby producers. The policy choices that help are equally plain: cheaper transfers, agents within reach of rural households, savings products that fit irregular income, and a tax treatment that does not punish receiving. None of them requires a new idea, only the decision to stop treating a transfer as the end of the story.',
          ],
        },
      ],
      activity: {
        intro: 'Follow one transfer home.',
        steps: [
          'Take the transfer you mapped in Module 1.',
          'Write where the money is spent first, and by whom.',
          'Follow it two or three steps further, noting when it leaves the local area.',
          'Mark which of those steps involve a locally owned business or institution.',
          'Write one change that would keep the value nearby for one more step.',
        ],
      },
      keyTerms: [
        { term: 'Value capture', meaning: 'How much of the value arriving in a place is used again there before it leaves.' },
        { term: 'Concentration risk', meaning: 'The exposure created when one earner, channel or country supplies almost everything a household relies on.' },
        { term: 'Financial inclusion', meaning: 'Access to useful, affordable financial services, including savings and credit that fit irregular income.' },
      ],
      quiz: {
        passingScore: 3,
        questions: [
          {
            id: 'q1',
            question: 'Why does the module describe spending on food, school fees and medicine as investment rather than waste?',
            options: [
              'Because it is counted as investment in national accounts.',
              'Because it sustains the household\u2019s capacity to work, study and earn.',
              'Because it is tax deductible.',
              'Because it is spent locally by definition.',
            ],
            correctIndex: 1,
            feedback:
              'Investment in people is still investment. Health and schooling raise what the household can do next.',
          },
          {
            id: 'q2',
            question: 'What is the sharper risk behind the dependency argument, as the module frames it?',
            options: [
              'That households stop working entirely.',
              'That one source of support carries almost everything, so a single shock removes the safety net.',
              'That governments stop collecting tax.',
              'That senders stop saving altogether.',
            ],
            correctIndex: 1,
            feedback:
              'The problem is concentration, not character. A wider set of sources and channels is what reduces the exposure.',
          },
          {
            id: 'q3',
            question: 'Which arrangement keeps the most value in the receiving community?',
            options: [
              'Spending at a shop supplied from outside the region.',
              'Spending with a local trader who buys from nearby producers.',
              'Transferring the money onward to a third country.',
              'Holding the money in a foreign currency account.',
            ],
            correctIndex: 1,
            feedback:
              'Value capture depends on how many times the money is used in place before it leaves. Local supply chains keep it longer.',
          },
          {
            id: 'q4',
            question: 'Which policy choice would most directly lower the cost of receiving support in a rural area?',
            options: [
              'Taxing incoming transfers.',
              'Limiting the number of providers to simplify the market.',
              'Extending agent networks and interoperable digital payments to rural areas.',
              'Requiring transfers to pass through a single state bank.',
            ],
            correctIndex: 2,
            feedback:
              'Access and competition are what lower the price. Restricting providers or taxing the flow works in the opposite direction.',
          },
        ],
      },
      reflection:
        'In three or four sentences: where does the value of your mapped transfer settle, and what is the one change you would make to keep it nearby for longer?',
      requirements: ['lesson', 'activity', 'knowledge_check', 'reflection'],
    },
  },
};

/** The content for one module, or null when the curriculum does not hold it. */
export function getTemplateModuleContent(courseSlug, moduleRoute) {
  const course = TEMPLATE_CURRICULUM[courseSlug];
  if (!course) return null;
  return course[moduleRoute] || null;
}

/** The completion steps a module requires (defaults to lesson + reflection). */
export function getTemplateModuleRequirements(courseSlug, moduleRoute) {
  const content = getTemplateModuleContent(courseSlug, moduleRoute);
  if (!content || !Array.isArray(content.requirements) || content.requirements.length === 0) {
    return ['lesson', 'reflection'];
  }
  return content.requirements;
}