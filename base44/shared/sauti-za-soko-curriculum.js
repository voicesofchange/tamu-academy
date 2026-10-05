/**
 * Sauti za Soko — server-side-only source of truth for the core module
 * content of Modules 1 to 4. Imported ONLY by
 * base44/shared/sauti-za-soko-config.js and never bundled into the public
 * client-side JavaScript. It holds the full, unreleased curriculum —
 * lessons, Kiambu market cases, context notes, international comparison
 * prompts, action-plan fields, Kiswahili discussion prompts, quizzes and
 * answer keys — that must not be exposed to public visitors while the
 * pathway is in development.
 *
 * The pathway is taught from Kiambu and Kenyan realities and is written
 * so that learners elsewhere, including in the United States, can follow
 * it. Local terms are introduced and explained on first use; the optional
 * international comparison prompts complement the local case and never
 * replace it.
 */

export const SOKO_CORE_MODULES = {
  'module-1': {
    number: 'Module 1',
    route: 'module-1',
    title: 'Soko ni Yetu: The Market as an Economy',
    description:
      'Introduces the market as a working economy: producers, traders, buyers, prices, rules, credit, value and risk, read from the experience of young vendors in Kiambu.',
    status: 'Available',
    estimatedTime: '40\u201355 minutes, excluding the optional discussion',
    competency:
      'By the end of this module, learners should be able to read one market as an economy: identifying who produces and trades, how prices are set, which rules and institutions shape the trading day, where value is created and captured, and who carries the risk.',
    learningObjectives: [
      'Define biashara and soko in your own words and explain why a market is an economy rather than only a place.',
      'Identify the producers, traders, buyers, transporters and institutions present in one market.',
      'Explain how a price is formed in a market through timing, supply, negotiation and trust.',
      'Trace where value is created and where it is captured along one short market chain.',
      'Describe who carries the main risks on a trading day, and why those risks are unevenly held.',
    ],
    overview: [
      'A market is often described as a place where people buy and sell. That description is true but incomplete. Soko is also an economy: a system of production, transport, pricing, credit, rules, trust and risk that runs on most days of the year, largely through the work of people who rarely appear in official economic statistics.',
      'Throughout this course, biashara is used in its everyday Kiswahili sense. Biashara means business or trade: the organised activity of buying, making, moving, storing or selling something in order to earn a living. To say that a young vendor understands biashara is to say that she holds working knowledge of how goods, money, customers, seasons and obligations move together. That knowledge is where this course begins. It is not something the course supplies.',
      'This module asks you to read one market as an economy. Who brings the goods, who sells them, who buys them, who moves them, who sets the rules, who lends, who keeps the records, and who absorbs the loss when something goes wrong. Learners in Kenya will recognise much of this directly. Learners elsewhere will find that the questions travel even where the answers differ.',
    ],
    contextNotes: [
      {
        term: 'Biashara',
        plain:
          'Business or trade: the activity of buying, making, moving, storing or selling something in order to earn a living.',
        whyItMatters:
          'Used throughout this course in its everyday Kiswahili sense. It describes organised economic activity whether or not it is registered, licensed or officially recorded.',
      },
      {
        term: 'Soko',
        plain:
          'A market: both the physical place where trading happens and the wider set of buyers, sellers and prices for a product.',
        whyItMatters:
          'When this course says soko, it may mean the ground you stand on or the market your business sells into.',
      },
      {
        term: 'Mama mboga',
        plain:
          'A vegetable seller, usually a woman, who buys stock from growers or wholesalers and sells it in small quantities.',
        whyItMatters:
          'Used here with respect. These traders are often the most reliable food supply in a neighbourhood and usually carry the most risk in the chain.',
      },
      {
        term: 'Mkokoteni',
        plain:
          'A hand-drawn cart used to move goods short distances where vehicles are too expensive or roads too narrow.',
        whyItMatters:
          'An example of infrastructure that official statistics leave out but that a market cannot function without.',
      },
      {
        term: 'County government',
        plain:
          'In Kenya, one of 47 devolved governments led by a governor and a county assembly, responsible for local services and much local regulation.',
        whyItMatters:
          'County government sets many of the rules that shape a trading day: trading licences, market fees, stalls, sanitation and enforcement.',
      },
      {
        term: 'Ward',
        plain:
          'A sub-county electoral and administrative area within a county, represented by a member of the county assembly.',
        whyItMatters:
          'Market decisions are often taken at ward or sub-county level, much closer to traders than national policy debate suggests.',
      },
    ],
    keyConcepts: [
      {
        term: 'Soko as an economy',
        definition:
          'A market is an economy because it produces, moves, prices and distributes goods, and because it depends on institutions, credit, trust and rules. Studying it means studying the whole system rather than one transaction.',
        example:
          'A vegetable stall depends on growers, transport, wholesalers, county fees, storage, credit from relatives, and customers who may or may not return tomorrow.',
      },
      {
        term: 'Value creation and value capture',
        definition:
          'Value is created when something becomes more useful to a buyer: moved, sorted, ripened, cleaned, packaged, stored, cooked, or made available at the hour it is needed. Value is captured by whoever keeps the difference between what they paid and what they received. Those are not always the same person.',
        example:
          'A trader who buys tomatoes at dawn, sorts them and sells them by midday has created value through timing and sorting. How much of it she keeps depends on the price that day.',
      },
      {
        term: 'Revenue, margin and turnover',
        definition:
          'Revenue is the money taken in. Margin is what remains after the direct cost of the goods. Turnover is how often stock is bought and sold. A busy stall with thin margins can be more stable than a quiet stall with wide ones.',
        example:
          'Selling two hundred small portions at a slim margin may earn more in a week than selling twenty large portions at a wide margin.',
      },
      {
        term: 'Institutions of the market',
        definition:
          'Formal rules such as licences, fees, health inspection and market by-laws, and informal rules such as trust, reputation, credit relationships, neighbourhood networks, and who watches whose stall. Both decide who may trade, where, and on what terms.',
        example:
          'A trader may hold a valid county licence and still depend on an informal arrangement with a neighbour to watch the stall during a delivery.',
      },
      {
        term: 'Risk and who carries it',
        definition:
          'On a trading day, risk includes spoilage, theft, price collapse, sudden enforcement, unpaid credit, illness, weather and the loss of a day\u2019s income. Risk usually sits with whoever is holding the goods, and that is usually the trader with the least capital.',
        example:
          'If a trader takes perishable stock on credit and the day is rained out, the loss is hers, while the wholesaler has already been paid or is still owed.',
      },
      {
        term: 'Dignity-first analysis',
        definition:
          'Analysing a market from the inside means starting with what traders already know and do, then asking what constrains them. It means not treating informal trade as disorder, and not treating the trader as someone who needs instruction.',
        example:
          '"She has run this stall for eleven years and adapted her stock to three different school calendars" is a statement about expertise, not about need.',
      },
    ],
    localCase: {
      title: 'Case Study: A Trading Day at Kiambu Market',
      location: 'Kiambu County, Kenya',
      intro:
        'Kiambu County sits immediately north of Nairobi. Much of its population is within commuting distance of the capital, its farms supply Nairobi markets, and its small towns host busy daily markets. This case follows one trading day through the people who make it work, and it is written from their side of the counter.',
      sections: [
        {
          heading: 'Before the market opens',
          paragraphs: [
            'The day begins well before customers arrive. Growers bring produce from surrounding farms, some on foot, some by pickup, some by boda boda. Wholesalers who bought overnight at larger markets unpack and sort. Mkokoteni pullers move loads between the roadside and the stall row. Traders selling vegetables, fruit, second-hand clothes, phone accessories, cooked food or charcoal set up their displays, agree on who watches whose stall, and settle the day\u2019s arrangements about credit and change.',
            'The county government is present from the start. Market fees are collected, licences are checked, sanitation rules apply, and the level of enforcement on a given day is itself market information that traders plan around.',
          ],
        },
        {
          heading: 'Prices during the day',
          paragraphs: [
            'Prices are not fixed. They are negotiated, and they move. The same bunch of sukuma wiki may sell for one price at seven in the morning, less at eleven, and less again in the last hour before closing, because unsold perishable stock is worth nothing tomorrow. Traders read demand in small signals: how many matatus have stopped, whether it is a school day, whether a nearby construction site is working, whether rain is coming, and whether the same supplier has flooded the row with the same product.',
            'Price also carries trust. A regular customer may be quoted lower or given a small extra because the relationship is worth more than the margin on one sale. A new customer may be quoted higher, and may or may not negotiate.',
          ],
        },
        {
          heading: 'Money, credit and records',
          paragraphs: [
            'A great deal of trading works on credit. A trader may take stock in the morning and settle with the wholesaler at the end of the day or the end of the week. Relatives may lend without interest. A savings group may hold money for a specific purpose: school fees, a stall repair, a hospital bill, or stock for a busy season. Mobile money has made small transfers faster and easier to record, and many young traders now run cash and mobile records side by side.',
            'Records are kept, but rarely in accounting software. They live in a notebook, a phone, a memory of what was paid for what, or a combination of all three. That is a system that works. The question this course asks is what would make it work better, not what would replace it.',
          ],
        },
        {
          heading: 'What goes wrong',
          paragraphs: [
            'On the day this case describes, three things go wrong. A delivery of tomatoes arrives later than agreed and part of it is spoiled. A sudden shower empties the market for an hour and leaves the ground muddy. A group of traders is told to move their stalls to make room for a road repair, with no clear answer about when or where they will return.',
            'None of these events is unusual, and each is absorbed by the traders rather than by the wholesaler, the county or an insurer. That is the pattern this module asks you to notice: the shock lands on whoever is holding the goods and holds the least capital.',
          ],
        },
      ],
      takeaways: [
        'A market is a system: production, transport, pricing, credit, rules and trust all operate at once.',
        'Prices move through the day, and traders read demand from small local signals.',
        'Credit and trust carry as much weight as cash in how a market functions.',
        'Risk concentrates on the trader holding perishable goods with the least cushion.',
        'Traders already hold sophisticated knowledge. Analysis starts from that knowledge.',
      ],
    },
    internationalComparison: {
      title: 'Optional Comparison: Reading a Market Near You',
      prompt:
        'This comparison is optional and complements the Kiambu case. It is not a substitute for it, and Kenyan and United States market systems are not interchangeable.',
      questions: [
        'Where does fresh food reach your area from, and who moves it?',
        'Who sets the price of a vegetable you buy: the shop, the customer, a platform, or a market?',
        'Which rules shape a trading day there, and who enforces them?',
        'Who carries the loss when perishable stock is not sold?',
        'Which part of that system depends on informal arrangements that no register records?',
      ],
      note:
        'Use this comparison to clarify your own context, not to rank the two. The institutional differences are real: county licensing in Kiambu does not work like municipal permitting in a United States city, and informal credit there does not work like consumer credit here.',
      examples: [
        {
          region: 'Lagos, Nigeria',
          text: 'One tomato passes through a northern farm, a motor-park wholesaler, a market woman and a final seller. Each hand adds something and takes a margin, and the seller at the end of that chain carries the day that ends unsold.',
        },
        {
          region: 'Delhi, India',
          text: 'In a wholesale market, prices are called before dawn and settle within an hour. A trader who arrives after that hour buys the same crate at a different price from one who arrived earlier, and both of them know it.',
        },
        {
          region: 'Mexico City, Mexico',
          text: 'Vendors rotate between neighbourhood street markets on a fixed weekly cycle. The same trader reads a different set of customers on each day of the week, and plans stock around that.',
        },
      ],
    },
    activity: {
      title: 'My Market Map',
      purpose:
        'Read one real market as an economy, using the questions this module introduces.',
      instructions: [
        'Choose a market you know directly, in Kenya or elsewhere. If you cannot visit one, use the Kiambu case and answer for it.',
        'Complete each section, noting where your knowledge is strong and where you are inferring.',
        'What you write is saved to My Soko Action Plan and is visible only to you and to course administrators.',
      ],
      fields: [
        { id: 'market_name', label: 'The market you are reading', helper: 'Which market is this, where is it, and on which days does it operate?' },
        { id: 'people_and_roles', label: 'Who makes it work', helper: 'List the producers, traders, transporters, buyers, lenders and officials you can identify.' },
        { id: 'prices', label: 'How prices move', helper: 'What makes the price of one product change within a day or across a week?' },
        { id: 'rules_and_institutions', label: 'Rules that shape the day', helper: 'Which formal rules (licences, fees, health, by-laws) and informal rules (trust, reputation, credit, stall-watching) decide how trading happens?' },
        { id: 'value_created', label: 'Where value is created', helper: 'Which steps make the product more useful to the buyer: transport, sorting, storage, timing, packaging, cooking, or something else?' },
        { id: 'value_captured', label: 'Who captures the value', helper: 'Who keeps the difference between what was paid and what was received?' },
        { id: 'risk', label: 'Who carries the risk', helper: 'Name the main risks on a trading day and say who absorbs each one.' },
        { id: 'strengths', label: 'What this market already does well', helper: 'Which parts of this system work reliably without outside help?' },
        { id: 'constraints', label: 'What constrains it', helper: 'Which one or two constraints, if eased, would change the most for the traders?' },
        { id: 'final_reading', label: 'Your reading of this market', helper: 'In a short paragraph, explain how this market works as an economy and who carries the most risk in it.' },
      ],
    },
    kiswahiliPrompt: {
      prompt: 'Soko lako lina nguvu gani, na nini kinahitaji kubadilika?',
      translation: 'What strength does your market have, and what needs to change?',
      guidance:
        'Answer in Kiswahili if you are able, in English if you are not, or move between the two. At least one discussion response is required to complete the course, and it may be in any module. Your response is stored privately and is shared with other learners only if you allow it.',
    },
    reflectionQuestions: [
      'In the market you know, who decides what a fair price is, and how is that decided out loud?',
      'Describe one piece of work in that market that is essential but that no register or statistic records.',
      'Where does the greatest risk land, and what would change if it sat somewhere else?',
    ],
    quiz: {
      passingScore: 4,
      questions: [
        {
          id: 1,
          prompt: 'Which statement best explains why a market can be described as an economy?',
          options: [
            'Because money changes hands there',
            'Because it produces, moves, prices and distributes goods while depending on rules, credit, trust and risk',
            'Because it is regulated by a government',
            'Because traders keep written accounts',
          ],
          correctIndex: 1,
          feedback:
            'A market is an economy because production, distribution, pricing, institutions, finance and risk all operate within it at once.',
        },
        {
          id: 2,
          prompt:
            'A trader buys tomatoes at dawn, sorts them, and sells them by midday. What value is she adding?',
          options: [
            'Production of the tomatoes',
            'Sorting, timing and availability to the buyer',
            'Regulation of the market',
            'Lending to other traders',
          ],
          correctIndex: 1,
          feedback:
            'Value is created whenever goods become more useful to a buyer, including through sorting and reaching the right moment.',
        },
        {
          id: 3,
          prompt: 'Which statement best distinguishes revenue from margin?',
          options: [
            'Revenue is what is taken in; margin is what remains after the direct cost of the goods',
            'Revenue is profit; margin is turnover',
            'Margin is what is taken in; revenue is what remains after costs',
            'They mean the same thing in a market stall',
          ],
          correctIndex: 0,
          feedback:
            'Revenue is money taken in; margin is what is left after the direct cost of the goods. Turnover is how often stock is bought and sold.',
        },
        {
          id: 4,
          prompt:
            'Stock is bought on credit in the morning and the day is rained out. Who usually absorbs the loss?',
          options: [
            'The wholesaler who supplied the stock',
            'The county government',
            'The trader holding the perishable goods',
            'The customers who did not buy',
          ],
          correctIndex: 2,
          feedback:
            'Risk tends to concentrate on the person holding the goods, which is often the trader with the least capital cushion.',
        },
        {
          id: 5,
          prompt: 'Why does this course begin with what traders already know?',
          options: [
            'Because formal economic training is not useful',
            'Because traders already hold detailed working knowledge of how their market functions, and analysis should start from that expertise',
            'Because traders\u2019 records are more accurate than official statistics',
            'Because informal trade does not need regulation',
          ],
          correctIndex: 1,
          feedback:
            'The course treats traders\u2019 working knowledge as expertise. Analysis begins there and asks what constrains it, rather than what should replace it.',
        },
      ],
    },
    closingText: [
      'A market is not only a place where money changes hands. It is a working economy: production, transport, pricing, credit, rules, trust and risk, operating together on most days of the year.',
      'Reading it well means seeing the parts that official records leave out: the hand-drawn cart, the stall-watching arrangement, the day\u2019s credit, the value created by timing, and the loss absorbed by whoever is holding the goods.',
      'In the next module you will turn this lens on your own enterprise: the knowledge you already hold, the records you keep, and the decisions you make every week without calling them economic decisions.',
    ],
    sources: [
      'Kenya National Bureau of Statistics, wholesale and retail trade and county-level economic data.',
      'County Government of Kiambu, market by-laws, trading licences and market fee schedules.',
      'International Labour Organization, Women and Men in the Informal Economy: A Statistical Update.',
      'World Bank, Kenya Economic Update and market infrastructure analysis.',
      'Institute of Economic Affairs Kenya, county public finance and devolution research.',
    ],
  },

  'module-2': {
    number: 'Module 2',
    route: 'module-2',
    title: 'Biashara Is Knowledge: Reading Your Own Business',
    description:
      'Treats the learner\u2019s own enterprise as the object of analysis: what is sold and to whom, which resources and relationships it depends on, which costs are hidden, and which decisions change profitability most.',
    status: 'Available',
    estimatedTime: '40\u201355 minutes, excluding the optional discussion',
    competency:
      'By the end of this module, learners should be able to analyse their own enterprise as a system: describing what they sell and to whom, the resources and relationships they rely on, the records they keep, the costs that are easy and hard to see, and the two or three decisions that change profitability most.',
    learningObjectives: [
      'Describe an enterprise as a set of stocks, flows, customers and obligations rather than as a stall or a shop.',
      'Separate visible costs from hidden costs such as unpaid family labour, transport, spoilage, credit and fees.',
      'Identify the different customer groups a single vendor serves and what each one needs.',
      'Explain how price is set from cost, expectation and the customer, rather than by habit alone.',
      'Choose two or three decisions that would change an enterprise most over the next three months.',
    ],
    overview: [
      'Every trader already reads their business. They know which day the stock moves, which customer pays on time, which supplier measures honestly, and which month stretches the household. This module gives that knowledge a written shape so it can be examined, questioned and acted on.',
      'The module treats the enterprise as a system with stocks (goods, cash, equipment), flows (sales, purchases, repayments), customers, and obligations. It asks where money is actually made, and where it quietly leaves. Hidden costs matter here: unpaid family labour, the fare spent fetching stock, the portion that spoils, the fee paid at the gate, and the credit that is never repaid.',
      'Nothing in this module requires a computer, a loan or a new business. It asks you to look at what you already do, name it accurately, and choose what to change.',
    ],
    contextNotes: [
      {
        term: 'Stock',
        plain: 'The goods a trader holds and intends to sell, whether paid for already or still owed for.',
        whyItMatters:
          'Stock is money in another form. How fast it turns back into cash decides how much a business can do with the same capital.',
      },
      {
        term: 'Deni',
        plain: 'A debt or an amount owed, either by the trader to a supplier or lender, or to the trader by a customer.',
        whyItMatters:
          'Debt runs in both directions in a market, and money owed to a trader is often as important as money owed by them.',
      },
      {
        term: 'Chama',
        plain:
          'A small savings or self-help group, usually of neighbours or traders, that meets regularly to save, lend and support members.',
        whyItMatters:
          'Chamas are a primary source of working capital for small traders and are examined in detail in Module 6.',
      },
      {
        term: 'Bidhaa',
        plain: 'Goods or products offered for sale.',
        whyItMatters: 'Useful when separating what a trader sells from how and to whom they sell it.',
      },
      {
        term: 'Customer groups',
        plain:
          'The distinct kinds of buyer a business serves, such as commuters before work, school families in the afternoon, and other traders buying in bulk.',
        whyItMatters:
          'One stall often serves several groups with different needs, and each group tolerates a different price and a different wait.',
      },
    ],
    keyConcepts: [
      {
        term: 'The enterprise as a system',
        definition:
          'An enterprise can be described as stocks, flows, customers and obligations. Stocks are what you hold. Flows are what moves in and out. Customers are who you serve. Obligations are what you owe and what is owed to you. Once described this way, the weak point becomes visible.',
        example:
          'A charcoal seller may have slow-moving stock, steady daily cash flow, customers who buy on credit, and a supplier who must be paid weekly.',
      },
      {
        term: 'Visible and hidden costs',
        definition:
          'Visible costs are the ones paid in cash and remembered: the price of stock, the licence, the fare. Hidden costs are real but rarely written down: unpaid family labour, spoilage, transport time, market fees, phone data, airtime, and credit that is never repaid.',
        example:
          'A cooked-food vendor who counts only ingredients will conclude she is profitable, until the firewood, the water, the serving time and her sister\u2019s unpaid help are named.',
      },
      {
        term: 'Customer groups and what each needs',
        definition:
          'Different buyers want different things at the same stall: speed, price, credit, quantity, freshness, or a relationship. Naming the groups makes it possible to decide which to serve first when stock is short and which to keep even at a thin margin.',
        example:
          'Commuters at six in the morning want speed and pay full price. Families at four in the afternoon want quantity and negotiate.',
      },
      {
        term: 'Pricing from cost, not habit',
        definition:
          'A price set from habit drifts below cost over time, especially when prices rise. Pricing from cost means knowing the direct cost of one unit, adding the share of the fixed costs it must carry, and then deciding what the customer will accept.',
        example:
          'If the cost of a basin of tomatoes rises but the price per tomato is never recalculated, the margin quietly disappears.',
      },
      {
        term: 'Records that fit the work',
        definition:
          'A record only survives if it is quick to keep and useful to read. A phone note, a cash book, a marked calendar or a tally on the back of a receipt book can all work. What matters is that the record answers a question the trader actually has.',
        example:
          'Recording daily sales and daily stock purchases in one line each is enough to see which weeks earn and which weeks only move goods.',
      },
      {
        term: 'The two or three decisions that matter',
        definition:
          'Most enterprises have a small number of decisions that change the outcome far more than daily effort does: what to stock, when to buy, what to charge, who to serve on credit, and when to stop selling a product that only moves stock.',
        example:
          'Deciding to stop stocking one slow product and use that capital on a fast one can matter more than working two extra hours a day.',
      },
    ],
    localCase: {
      title: 'Case Study: A Phone Accessories Stall in Kiambu Town',
      location: 'Kiambu Town, Kiambu County, Kenya',
      intro:
        'Grace is twenty-three and has run a phone accessories and airtime stall in Kiambu Town for three years. She began with a small table, borrowed capital from a chama, and now has a lockable wooden stall on the same row. This case follows her own account of her business, written as analysis rather than as a story of need.',
      sections: [
        {
          heading: 'What she actually sells',
          paragraphs: [
            'Grace describes her stall as selling covers, chargers, earphones, screen protectors and airtime. Asked what she really sells, she reframes it: she sells same-day repair of a problem. A commuter whose charger has failed will walk past three cheaper sellers to reach the one who has his model in stock and will test it before he pays.',
            'That reframing changed her stocking. She now holds fewer fashion covers, more of the three chargers and two screen sizes that account for most of her requests, and a small repair kit that earns money on labour rather than goods.',
          ],
        },
        {
          heading: 'The costs she had not been counting',
          paragraphs: [
            'Grace had been counting the cost of goods and the county fee. She had not counted the two matatu fares to Nairobi to buy stock, the airtime she spends confirming availability with suppliers, the accessories that fail testing and cannot be returned, or the six customers who owe her a total she stopped trying to recover.',
            'She also had not counted her own time. When her younger brother watches the stall while she buys stock, that is labour, not a free arrangement, even though no money changes hands.',
          ],
        },
        {
          heading: 'The records she kept',
          paragraphs: [
            'Her records were two phone notes: one for money received, one for stock bought. They were accurate enough but told her nothing about which product earned. Over one month she added a third line: product sold, price, cost. At the end of the month she could see that screen protectors carried the best margin per shilling of stock, and that one charger model had been sold at or below cost for weeks without her noticing.',
          ],
        },
        {
          heading: 'The decision she made',
          paragraphs: [
            'Grace made three decisions. She stopped selling that one charger model. She stopped giving credit to customers she did not know, while continuing it for four regulars whose repayment she could predict. And she began buying screen protectors in larger quantity from a supplier who gave a better price above a threshold.',
            'None of these decisions required capital. All three came from reading the business she already ran.',
          ],
        },
      ],
      takeaways: [
        'Naming what a business really sells can change what it stocks more than any new investment could.',
        'Hidden costs, especially unpaid labour and spoilage, decide whether a business is truly profitable.',
        'A record only needs to be quick and to answer one real question to change decisions.',
        'A few clear decisions usually matter more than additional daily effort.',
      ],
    },
    internationalComparison: {
      title: 'Optional Comparison: Small Enterprise Where You Live',
      prompt:
        'This comparison is optional and complements the Kiambu case. It is not a substitute for it. Small-enterprise conditions differ sharply between countries, including in access to credit, licensing and social protection.',
      questions: [
        'What does a small trader near you sell, and what do their customers actually need from them?',
        'Which costs of running a small business there are easily counted, and which are hidden?',
        'What does a small trader there rely on instead of a chama?',
        'What insurance or protection exists there if a trading day is lost?',
      ],
      note:
        'Notice where the difference is institutional rather than personal. Access to a savings group, a cooperative loan or a formal insurance product is a function of the surrounding system, not of the trader\u2019s discipline.',
      examples: [
        {
          region: 'Hanoi, Vietnam',
          text: 'A household shop sells phone top-ups, drinks and motorbike repairs from one counter. The repairs carry the margin, the drinks bring people to the counter, and the top-ups bring them back. Three lines of business, one stall, one set of books.',
        },
        {
          region: 'La Paz, Bolivia',
          text: 'A knitwear seller keeps two prices in mind: one for the tourist season and one for local buyers, because the two groups buy for entirely different reasons and at different times of year.',
        },
        {
          region: 'Dhaka, Bangladesh',
          text: 'A tailor prices by the piece rather than by the hour. Within a week he knows which garment earns most per metre of cloth, and which one only keeps him busy.',
        },
      ],
    },
    activity: {
      title: 'My Enterprise Profile',
      purpose:
        'Describe one enterprise, your own or one you know well, as a system, and choose the decisions that would change it most.',
      instructions: [
        'Use your own enterprise if you have one. If you do not, use one you know well or the case in this module.',
        'Answer from what you actually know. Where you are estimating, say so.',
        'Your answers are saved to My Soko Action Plan and remain private to you and to course administrators.',
      ],
      fields: [
        { id: 'enterprise', label: 'The enterprise', helper: 'What is the business, who runs it, where is it, and how long has it operated?' },
        { id: 'really_sells', label: 'What it really sells', helper: 'Beyond the goods on display, what problem or need does it solve for customers?' },
        { id: 'customer_groups', label: 'Customer groups', helper: 'Name the different kinds of buyer this business serves and what each one needs most.' },
        { id: 'stocks_and_flows', label: 'Stocks and flows', helper: 'What does the business hold (goods, cash, equipment), and what moves in and out each week?' },
        { id: 'visible_costs', label: 'Visible costs', helper: 'List the costs that are paid in cash and remembered.' },
        { id: 'hidden_costs', label: 'Hidden costs', helper: 'List the real costs that are rarely written down: unpaid labour, spoilage, travel time, fees, credit never repaid.' },
        { id: 'records_kept', label: 'Records currently kept', helper: 'What is recorded, where, and which question does it answer?' },
        { id: 'best_margin', label: 'What earns most', helper: 'Which product or service earns most per shilling of stock or per hour of work?' },
        { id: 'weakest_link', label: 'The weakest link', helper: 'Where does this business lose most money or time without it being obvious?' },
        { id: 'three_decisions', label: 'Two or three decisions', helper: 'Name the two or three decisions that would change this business most over the next three months.' },
        { id: 'first_step', label: 'Your first step', helper: 'What will you do first, and by when?' },
      ],
    },
    kiswahiliPrompt: {
      prompt: 'Biashara yako inakupa faida gani ambayo hujaandika popote?',
      translation: 'What does your business give you that you have never written down anywhere?',
      guidance:
        'Answer in Kiswahili, in English, or in both. Your response is private unless you choose to share it with other learners.',
    },
    reflectionQuestions: [
      'What does your business or a business you know well really sell, beyond the goods on display?',
      'Which cost do you carry that no record shows?',
      'Which single decision would change the outcome most, and what has stopped you from making it?',
    ],
    quiz: {
      passingScore: 4,
      questions: [
        {
          id: 1,
          prompt: 'In this module, what does it mean to describe an enterprise as a system?',
          options: [
            'Recording every shilling spent and earned',
            'Describing its stocks, flows, customers and obligations together',
            'Registering it formally with the county',
            'Employing at least one other person',
          ],
          correctIndex: 1,
          feedback:
            'Describing stocks, flows, customers and obligations together makes the weak point in a business visible.',
        },
        {
          id: 2,
          prompt: 'Which of these is a hidden cost?',
          options: [
            'The price paid for stock at the wholesaler',
            'The county market fee',
            'Unpaid family labour and spoilage',
            'The cost of a new stall',
          ],
          correctIndex: 2,
          feedback:
            'Hidden costs are real but rarely written down, such as unpaid labour, spoilage, travel time and credit never repaid.',
        },
        {
          id: 3,
          prompt: 'Why does pricing from habit become a problem over time?',
          options: [
            'Because customers expect prices to change',
            'Because prices set by habit can drift below cost as costs rise',
            'Because fixed prices are illegal in most markets',
            'Because habits cannot be explained to customers',
          ],
          correctIndex: 1,
          feedback:
            'When costs rise and the price is never recalculated, the margin quietly disappears.',
        },
        {
          id: 4,
          prompt: 'What makes a business record worth keeping?',
          options: [
            'It is written in an official format',
            'It is long and detailed',
            'It is quick to keep and answers a question the trader actually has',
            'It is kept by someone other than the trader',
          ],
          correctIndex: 2,
          feedback:
            'A record survives only if it is quick to keep and useful to read. A phone note or a single daily line can be enough.',
        },
        {
          id: 5,
          prompt:
            'A trader stops stocking one slow-selling item and uses that capital for a fast-selling one. What has she changed?',
          options: [
            'Her revenue only',
            'The decisions that matter most, by changing what her capital does',
            'Her licence obligations',
            'Her customer groups',
          ],
          correctIndex: 1,
          feedback:
            'Most enterprises turn on a small number of decisions. What to stock and when to stop stocking it is one of them.',
        },
      ],
    },
    closingText: [
      'The knowledge a trader holds about their own business is real knowledge. This module gave it a written shape so it can be examined rather than carried.',
      'Stocks, flows, customers, obligations, hidden costs and records are not accounting jargon. They are the parts of the business that already exist, named plainly enough to act on.',
      'In the next module you will look at money directly: how cash moves through a small enterprise, how credit and savings work, and how to set a price that leaves something behind.',
    ],
    sources: [
      'International Labour Organization, informal enterprise and working-capital research.',
      'World Bank, Enterprise Surveys and small and medium enterprise finance data.',
      'Financial Sector Deepening Kenya, research on small trader finance and mobile money use.',
      'Kenya National Bureau of Statistics, Micro, Small and Medium Establishment survey materials.',
      'Consultative Group to Assist the Poor, working capital and informal savings research.',
    ],
  },

  'module-3': {
    number: 'Module 3',
    route: 'module-3',
    title: 'Money, Margin and Trust: Cash in a Small Enterprise',
    description:
      'Examines how cash moves through a small enterprise: separating household and business money, pricing for a margin, credit and its risks, savings, mobile money, and the terms attached to borrowing.',
    status: 'Available',
    estimatedTime: '40\u201355 minutes, excluding the optional discussion',
    competency:
      'By the end of this module, learners should be able to manage cash in a small enterprise: distinguishing household and business money, setting a price that leaves a margin, deciding who receives credit, using savings and mobile money deliberately, and evaluating the terms of a loan before accepting it.',
    learningObjectives: [
      'Explain why household and business money become entangled in a small enterprise and what that costs.',
      'Set a price from direct cost, shared fixed cost, and what the customer will accept.',
      'Decide who receives credit and on what terms, and explain the risk each decision carries.',
      'Describe how savings groups and mobile money function as working capital.',
      'Evaluate a loan by its purpose, interest, repayment schedule, security and consequence of default.',
    ],
    overview: [
      'Cash in a small enterprise does not behave like cash in a textbook. The same pocket serves the business and the household. A good trading day is followed by school fees, a hospital bill or a relative\u2019s need, and the capital that was meant to restock is gone before the next delivery.',
      'This module is about making that reality workable rather than pretending it does not exist. It looks at separating money in a way that fits a household with shared obligations, at setting a price that leaves a margin, at deciding deliberately who receives credit, and at reading the true terms of a loan before accepting it.',
      'It also takes mobile money seriously as infrastructure. Mobile money has changed how small traders save, transfer and record. This module treats it as a tool with costs and risks, not as a solution in itself.',
    ],
    contextNotes: [
      {
        term: 'Mobile money',
        plain:
          'A service that lets a person store, send and receive money using a mobile phone, through a network of agents. In Kenya the best-known service is M-Pesa.',
        whyItMatters:
          'It has made small transfers, savings and repayment faster and easier to record, and it carries its own transaction costs and risks.',
      },
      {
        term: 'SACCO',
        plain:
          'A savings and credit cooperative: a member-owned institution that takes members\u2019 savings and lends back to them, often at better terms than a commercial lender.',
        whyItMatters: 'A common route to affordable credit for traders who can make regular deposits.',
      },
      {
        term: 'Chama',
        plain:
          'A small savings group that meets regularly to contribute, lend to members in turn, and support one another.',
        whyItMatters:
          'Often the first and most reliable source of working capital, and it depends entirely on trust and record-keeping.',
      },
      {
        term: 'Interest',
        plain: 'The price paid for using borrowed money, expressed either as a rate over a period or as a fixed charge.',
        whyItMatters:
          'A rate quoted per month is not the same as a rate quoted per year. Multiplying the period changes the real cost.',
      },
      {
        term: 'Security or collateral',
        plain: 'Something a lender may take or claim if a loan is not repaid, such as stock, equipment, savings or a guarantor\u2019s promise.',
        whyItMatters:
          'Understanding what is at stake if things go wrong matters more than the interest rate alone.',
      },
    ],
    keyConcepts: [
      {
        term: 'Household and business money',
        definition:
          'When one pocket serves both, the business cannot tell whether it is growing. Separation does not have to mean a bank account. It can mean a fixed daily draw for the household, a separate tin for restocking capital, or a rule that stock money is never spent on anything else.',
        example:
          'A trader who takes a set amount home each evening and leaves the rest as stock money knows within a month whether the business is growing or shrinking.',
      },
      {
        term: 'Setting a price that leaves a margin',
        definition:
          'Direct cost is what one unit costs to buy or make. Shared costs, such as the licence, the stall, the transport and the airtime, must be carried by the units sold. A price is workable when it covers both and still leaves something the customer will pay.',
        example:
          'If a trader sells thirty units a day and pays a fixed daily cost of stall and transport, each unit must carry its share of that cost before the margin begins.',
      },
      {
        term: 'Credit as a decision, not a favour',
        definition:
          'Giving credit is a lending decision. It should be made deliberately, with a limit per customer, a clear repayment point, and an acceptance that some credit will not return. Refusing credit is a legitimate business decision, not a lack of generosity.',
        example:
          'Extending credit only to named regulars, with a written amount and a date, is a decision. Extending it to whoever asks is an unmanaged loss.',
      },
      {
        term: 'Savings as working capital',
        definition:
          'Savings in a small enterprise are not only a cushion. They are stock, and stock is income. A savings group or mobile-money balance that can be drawn quickly for a good buying opportunity is doing the same work as a loan, without the interest.',
        example:
          'A trader who can pay cash at the wholesaler when a price falls earns a margin that a trader waiting for a loan cannot reach.',
      },
      {
        term: 'Reading a loan before accepting it',
        definition:
          'A loan should be evaluated on its purpose, its total cost, the repayment schedule against expected income, what is offered as security, and what happens if a payment is missed. A loan that is easy to obtain and hard to repay is expensive regardless of the rate.',
        example:
          'A loan repaid weekly from daily sales is safer than one repaid in a lump sum after a harvest or a school term.',
      },
      {
        term: 'Trust as an asset and an exposure',
        definition:
          'Trust brings customers back, secures credit from suppliers, and makes a chama work. The same trust creates exposure when it replaces a record. Trust is an asset that should be protected by writing things down, not weakened by it.',
        example:
          'A chama that records every contribution and every loan survives a disagreement. One that relies on memory does not.',
      },
    ],
    localCase: {
      title: 'Case Study: Two Traders, One Rainy Week',
      location: 'Kiambu County, Kenya',
      intro:
        'Two traders on the same row sell similar stock. Both had a slow, rainy week. The case compares what happened to each of them, based on how they had arranged their money before the week began. Neither trader is more hardworking than the other, and that is the point of the comparison.',
      sections: [
        {
          heading: 'How each had arranged their money',
          paragraphs: [
            'The first trader kept a single pocket. Business money and household money were the same money. She took from it for food, for her brother\u2019s fare, and for a relative\u2019s medical bill, and she restocked whatever was left. She had been meaning to join a chama for two years.',
            'The second trader had a rule she had kept for a year: a fixed evening amount goes home, and the rest is stock money. She contributed weekly to a chama whose records were kept in a book held by a rotating secretary. She kept a mobile-money balance that she used only for buying stock.',
          ],
        },
        {
          heading: 'What the slow week did',
          paragraphs: [
            'For the first trader, the slow week meant she could not restock at the price she normally bought at. She bought smaller quantities at a higher unit price and sold less, which made the following week slower still. She gave credit to two customers she did not know well, because she wanted the sales, and did not recover either.',
            'For the second trader, the slow week meant she used part of her mobile-money balance to restock at the normal price. Her margin held. She accepted the lower volume, gave no new credit, and drew a smaller amount for the household for two weeks.',
          ],
        },
        {
          heading: 'What the following month showed',
          paragraphs: [
            'By the end of the month the difference was not only in cash. The first trader had lost track of what she owed her supplier and had begun to avoid him, which cost her the better price. The second trader knew exactly what she owed and when it would be paid, and her supplier had raised her buying limit.',
            'Neither arrangement required a bank, a loan or a computer. Both required a decision made before the difficult week, not during it.',
          ],
        },
      ],
      takeaways: [
        'How money is arranged before a slow week decides what a slow week costs.',
        'Separating household and business money can be a rule rather than an account.',
        'Savings held for restocking work like capital, and they protect a trader\u2019s buying price.',
        'Credit given without a limit becomes an unmanaged loss.',
        'Written records protect trust rather than damaging it.',
      ],
    },
    internationalComparison: {
      title: 'Optional Comparison: Credit and Protection Where You Live',
      prompt:
        'This comparison is optional and complements the Kiambu case. It is not a substitute for it. Credit systems and social protection differ substantially between countries.',
      questions: [
        'What does a small trader near you do when a slow week arrives?',
        'What kind of credit is realistically available to a small trader there, and on what terms?',
        'What protects a trader there if they are ill, or if a trading day is lost?',
        'Which of those protections exist because of public policy rather than private effort?',
      ],
      note:
        'The comparison is about systems, not about discipline. Where a savings group, a cooperative or unemployment protection does not exist, the individual trader is carrying a risk that in another country is shared.',
      examples: [
        {
          region: 'Indonesia',
          text: 'An arisan group pools a fixed contribution each month and hands the whole sum to one member in turn. Members receive capital in rotation rather than all at once, and every contribution is recorded by the group.',
        },
        {
          region: 'India',
          text: 'Self-help groups lend to their own members from pooled savings, with a book kept by a rotating secretary. The rules are written down, and that is what allows the group to survive its first disagreement.',
        },
        {
          region: 'United States',
          text: 'A trader who falls ill may draw on unemployment insurance or a business interruption policy. In Kiambu the same lost week is usually absorbed by savings, family and a group. The difference is the surrounding system, not the discipline of the trader.',
        },
      ],
    },
    activity: {
      title: 'My Cash and Credit Rules',
      purpose:
        'Write down the money rules you will keep: what leaves the business, what stays, who receives credit, and on what terms.',
      instructions: [
        'Answer for your own enterprise, or for one you know well.',
        'Write rules you can actually keep for a month. A rule that is too strict will be abandoned in the first difficult week.',
        'Your answers are saved to My Soko Action Plan and remain private.',
      ],
      fields: [
        { id: 'money_now', label: 'How money is arranged now', helper: 'Where does business money live, and does it mix with household money?' },
        { id: 'household_rule', label: 'Household rule', helper: 'What amount or proportion leaves the business for the household, and when?' },
        { id: 'stock_money', label: 'Stock money', helper: 'What stays for restocking, and where is it kept so it is not spent?' },
        { id: 'unit_cost', label: 'Direct cost of one unit', helper: 'What does one unit of your main product cost you to buy or make?' },
        { id: 'shared_costs', label: 'Shared costs per day', helper: 'What fixed costs must be carried: stall, licence, transport, airtime, fees?' },
        { id: 'price_check', label: 'Does the price carry both', helper: 'After direct and shared costs, what margin is left per unit?' },
        { id: 'credit_rule', label: 'Who receives credit', helper: 'Who will you extend credit to, up to what limit, and repaid by when?' },
        { id: 'credit_refusal', label: 'How you will decline', helper: 'What will you say when someone you cannot lend to asks for credit?' },
        { id: 'savings_plan', label: 'Savings for buying', helper: 'How much can you set aside regularly as buying capital, and where will it be held?' },
        { id: 'borrowing_check', label: 'Before you borrow', helper: 'List the questions you will ask before accepting any loan: purpose, total cost, schedule, security, and what happens if a payment is missed.' },
      ],
    },
    kiswahiliPrompt: {
      prompt: 'Pesa yako inaenda wapi, na nini kinahitaji kubaki?',
      translation: 'Where does your money go, and what needs to stay?',
      guidance:
        'Answer in Kiswahili, in English, or in both. Your response is private unless you choose to share it with other learners.',
    },
    reflectionQuestions: [
      'Which rule about money would change your business most if you kept it for a month?',
      'Whom do you lend to, and what has that cost you so far?',
      'Which cost did you only notice after you wrote it down?',
    ],
    quiz: {
      passingScore: 4,
      questions: [
        {
          id: 1,
          prompt: 'Why does separating household and business money matter in a small enterprise?',
          options: [
            'Because it is required by law',
            'Because without it the business cannot tell whether it is growing or shrinking',
            'Because customers prefer traders who have an account',
            'Because it reduces the price of stock',
          ],
          correctIndex: 1,
          feedback:
            'Separation does not require a bank. It requires a rule, so the business can tell whether its capital is growing.',
        },
        {
          id: 2,
          prompt: 'A trader pays a fixed daily cost for stall and transport. How should that cost be covered?',
          options: [
            'By the household, separately',
            'By each unit sold carrying its share of the shared cost before margin begins',
            'By the wholesaler, as a discount',
            'It should not be counted, because it is fixed',
          ],
          correctIndex: 1,
          feedback:
            'Shared costs are carried by the units sold. A price works when it covers direct and shared costs and still leaves a margin.',
        },
        {
          id: 3,
          prompt: 'Which statement best describes giving credit in a small enterprise?',
          options: [
            'It is a favour and should be generous to everyone who asks',
            'It is a lending decision, with a limit, a repayment point, and acceptance that some will not return',
            'It should never be given under any circumstances',
            'It is a form of advertising',
          ],
          correctIndex: 1,
          feedback:
            'Credit is a business decision. Refusing it is legitimate, and giving it without a limit is an unmanaged loss.',
        },
        {
          id: 4,
          prompt: 'Why can savings work like working capital?',
          options: [
            'Because savings earn high interest',
            'Because money available for a good buying opportunity earns a margin a loan cannot reach in time',
            'Because savings reduce the household\u2019s obligations',
            'Because lenders require them',
          ],
          correctIndex: 1,
          feedback:
            'Savings in a small enterprise are stock waiting to be bought. Ready cash at the wholesaler protects a trader\u2019s buying price.',
        },
        {
          id: 5,
          prompt: 'Which loan should a trader be most cautious about?',
          options: [
            'One repaid weekly from daily sales',
            'One whose purpose is clear and whose total cost is known',
            'One that is easy to obtain, hard to repay, and secured against the stock the business depends on',
            'One taken from a member-owned savings cooperative',
          ],
          correctIndex: 2,
          feedback:
            'Evaluate a loan on purpose, total cost, repayment schedule against income, security and the consequence of default. Ease of access is not a benefit if repayment is unmanageable.',
        },
      ],
    },
    closingText: [
      'Money in a small enterprise is not only arithmetic. It is a set of arrangements made before the difficult week, not during it.',
      'A price that carries its costs, credit given as a decision, savings held as buying capital, and a loan read before it is accepted are ordinary, practical steps. None of them requires a bank or a computer.',
      'In the next module you will look at the force that most often breaks these arrangements: weather, season and climate, and how traders read and respond to risk they cannot control.',
    ],
    sources: [
      'Central Bank of Kenya, National Payments Strategy and mobile money statistics.',
      'Financial Sector Deepening Kenya, savings group and small enterprise finance research.',
      'Consultative Group to Assist the Poor, working capital and informal finance research.',
      'World Bank Global Findex, financial inclusion data for Kenya and comparable economies.',
      'International Labour Organization, social protection and informal economy research.',
    ],
  },

  'module-4': {
    number: 'Module 4',
    route: 'module-4',
    title: 'Weather, Climate and Market Risk',
    description:
      'Examines how weather and season shape a trading day and a trading year: reading seasonal signals, adapting stock and storage, spreading risk, and responding to a changing climate.',
    status: 'Available',
    estimatedTime: '45\u201360 minutes, excluding the optional discussion',
    competency:
      'By the end of this module, learners should be able to assess weather and climate risk for a small enterprise: reading seasonal signals, adjusting stock, storage and pricing across a season, spreading risk with others, and explaining how a changing climate alters the risks a trader faces.',
    learningObjectives: [
      'Explain how rainfall, temperature and season change supply, demand and price in a market.',
      'Read a seasonal calendar and identify the weeks of greatest opportunity and greatest risk.',
      'Describe practical adaptations to stock, storage, transport, pricing and timing.',
      'Explain how traders spread risk through groups, storage and diversification, and where insurance exists.',
      'Describe how a changing climate alters the pattern traders have relied on, and what that means for planning.',
    ],
    overview: [
      'Weather is not background to a market. It is one of its main variables. It decides how much produce arrives, when it arrives, what it costs, how well it keeps, how many customers come out, and whether the road to the wholesaler is passable.',
      'Kenya has long rainy seasons and short rainy seasons, dry spells, and increasingly unpredictable variation between them. Traders who sell food, charcoal, water, cooked meals, umbrellas, phone charging or transport all read these patterns directly. This module gives that reading a structured form.',
      'This module does not offer agricultural or meteorological advice, and it does not replace official weather information. It teaches a way of thinking about weather and climate as economic risk, so that a plan can be adjusted before rather than after the shock.',
    ],
    contextNotes: [
      {
        term: 'Long rains (masika)',
        plain:
          'The main rainy season in much of Kenya, generally from March or April into May or June.',
        whyItMatters:
          'It raises the supply of some produce, changes how much customers come out, and makes some roads and market ground difficult to work.',
      },
      {
        term: 'Short rains (vuli)',
        plain:
          'The shorter rainy season, generally around October to December, whose timing and volume vary considerably from year to year.',
        whyItMatters:
          'A late or weak short rains season changes prices, stock availability and household spending for months afterwards.',
      },
      {
        term: 'Perishability',
        plain:
          'How quickly goods spoil without storage, shade, cooling or drying.',
        whyItMatters:
          'In a rainy or hot week, perishability decides whether a trader can hold stock for a better price or must sell immediately at any price.',
      },
      {
        term: 'Seasonal price pattern',
        plain:
          'The recurring rise and fall in the price of produce as harvest and scarcity periods alternate through the year.',
        whyItMatters:
          'Knowing the pattern turns the year into something a trader can plan around, rather than a series of surprises.',
      },
      {
        term: 'Diversification',
        plain: 'Selling more than one product, or buying from more than one supplier, so one failure does not end the business.',
        whyItMatters:
          'It is the most accessible way a small trader spreads risk, because it costs organisation rather than money.',
      },
      {
        term: 'Official weather services',
        plain:
          'Forecasts and seasonal advisories published by national meteorological agencies, in Kenya the Kenya Meteorological Department.',
        whyItMatters:
          'These are the authoritative source. They should be used together with local knowledge, not replaced by it or by this course.',
      },
    ],
    keyConcepts: [
      {
        term: 'Weather as a market variable',
        definition:
          'Rain, heat, cold and wind change supply, demand, perishability, transport and the number of customers who come out. Reading weather is therefore part of reading the market, not separate from it.',
        example:
          'A rainy morning reduces foot traffic, spoils produce faster, and raises demand for cooked food, charcoal and transport that same evening.',
      },
      {
        term: 'The seasonal calendar',
        definition:
          'A picture of the year by week or month, showing when produce is abundant and cheap, when it is scarce and expensive, when customers have money and when they do not, and when the costs of transport and storage are highest.',
        example:
          'Mapping a single product across twelve months shows the two or three weeks when buying in quantity is clearly better than buying daily.',
      },
      {
        term: 'Adaptation in stock and storage',
        definition:
          'Practical responses to a season: buying less of perishable stock in difficult weeks, more of it in good weeks, using shade, drying, sacks, a crate or a shared store, and choosing products that survive a slow day.',
        example:
          'Selling dried goods and packaged items alongside fresh produce gives a stall something that can be held through a slow, wet week.',
      },
      {
        term: 'Spreading risk with others',
        definition:
          'Risk can be shared through a group that holds emergency funds, a supplier who allows delayed settlement in a bad week, or a neighbour arrangement to move and store stock together. Sharing risk is organisation, not charity.',
        example:
          'A chama that can release a small emergency payment in a flood week does the work an insurance policy would do elsewhere.',
      },
      {
        term: 'Formal insurance and its limits',
        definition:
          'Insurance transfers risk to a company in exchange for a premium. It exists for some crops and assets in Kenya, but its reach is limited and it rarely covers informal trading stock. Knowing what it does and does not cover matters more than assuming it is unavailable.',
        example:
          'Index-based crop insurance may cover a farmer\u2019s harvest, while the trader reselling that harvest has no equivalent product for her stock.',
      },
      {
        term: 'Climate change and the plan',
        definition:
          'The pattern traders have relied on is changing: seasons arriving at different times, longer dry spells, and heavier rain in shorter periods. This makes memory alone a weaker guide and makes written records of what happened, when and at what price more valuable.',
        example:
          'A trader who wrote down three years of the short rains season can see a shift that memory alone would not show.',
      },
    ],
    localCase: {
      title: 'Case Study: A Kiambu Trader Reads an Unreliable Season',
      location: 'Kiambu County, Kenya',
      intro:
        'Peter sells vegetables and a small line of dried goods from a stall near a busy junction in Kiambu County. He has sold there for six years. This case follows how he responded when the short rains season behaved differently from the pattern he had learned, and it is written from the decisions he made.',
      sections: [
        {
          heading: 'The pattern he had learned',
          paragraphs: [
            'Peter knew his year by habit. The short rains would come, prices for greens would rise, customers would spend less on vegetables and more on staples, and by January things would settle. He bought daily, sold daily, and kept a small cash reserve.',
            'He had never written the pattern down, because he had not needed to. The pattern was in his hands and in his memory of past years.',
          ],
        },
        {
          heading: 'The season that did not match',
          paragraphs: [
            'One year the short rains came late and light. Prices for greens rose higher and stayed high longer, but customers also had less money because the harvests around them had failed. Peter found that he was paying more for stock and selling less of it. A portion of every purchase spoiled before he could sell it.',
            'He had no record of how long the previous difficult season had lasted, so he could not decide whether to wait it out or change what he was selling.',
          ],
        },
        {
          heading: 'The changes he made',
          paragraphs: [
            'Peter made four changes, none of which required a loan. He reduced the quantity of greens he bought each morning and bought twice a day instead. He added a second line of goods that kept through a slow week: dried beans, packets of flour, and charcoal by the tin. He asked two other traders to share the cost of a covered storage spot for goods that would keep. And he began writing a single line in a notebook each evening: the price he paid, the price he sold at, and the weather that day.',
            'Within four months he could see something he had never seen before: the weeks when greens were profitable and the weeks when they were not. He also noticed that his charcoal sales rose noticeably in the wet weeks, which had been true for years without him ever planning for it.',
          ],
        },
      ],
      takeaways: [
        'A seasonal pattern held only in memory cannot be checked against a season that behaves differently.',
        'Adaptation can mean buying less and more often, not buying more.',
        'A second product that survives a slow week spreads risk at almost no cost.',
        'Sharing storage and transport with other traders spreads risk through organisation.',
        'A single line written each evening made a pattern visible that memory had hidden.',
      ],
    },
    internationalComparison: {
      title: 'Optional Comparison: Weather Risk Where You Live',
      prompt:
        'This comparison is optional and complements the Kiambu case. It is not a substitute for it. Climate impacts, insurance markets and public protection differ greatly between countries.',
      questions: [
        'How does weather change the price or the availability of food where you live?',
        'What protection does a small trader near you have against a lost trading day?',
        'Is there insurance available there for small businesses, and who can realistically afford it?',
        'How does your area\u2019s climate risk compare with that of Kiambu County, and why?',
      ],
      note:
        'Compare systems, not effort. Where public protection or affordable insurance exists, a trader is carrying less risk than one in a market where the same shock is absorbed personally. Climate vulnerability is shaped by infrastructure and policy as much as by geography.',
      examples: [
        {
          region: 'The Philippines',
          text: 'Vendors plan around typhoon season by moving stock to higher ground, adding dried goods to the stall, and splitting buying into smaller and more frequent purchases. The shape of the response is the same as in Kiambu, at a different scale.',
        },
        {
          region: 'Bangladesh',
          text: 'In flood-prone districts, traders work from floating markets and raised platforms. The adaptation was built by public and collective investment, not by each trader alone.',
        },
        {
          region: 'California, United States',
          text: 'In the highest fire-risk areas, insurers have withdrawn cover altogether, so households and small businesses carry a climate risk the market has decided it cannot price. Climate risk lands on whoever is least able to move away from it.',
        },
      ],
    },
    activity: {
      title: 'My Season and Risk Plan',
      purpose:
        'Map the year for one enterprise or product, identify the weeks of opportunity and risk, and choose practical adaptations.',
      instructions: [
        'Use your own enterprise or one you know well. If neither is available, use the case in this module.',
        'Use your own observation and the official forecasts published by your national meteorological service. This course does not replace them.',
        'Your answers are saved to My Soko Action Plan and remain private.',
      ],
      fields: [
        { id: 'product_year', label: 'One product across the year', helper: 'Choose one product and describe how its supply, demand and price change across the year.' },
        { id: 'best_weeks', label: 'Weeks of greatest opportunity', helper: 'When is buying in quantity clearly better than buying daily, and why?' },
        { id: 'worst_weeks', label: 'Weeks of greatest risk', helper: 'When is the business most exposed to spoilage, low foot traffic, bad roads or low customer spending?' },
        { id: 'weather_signals', label: 'Signals you already read', helper: 'What signs tell you what the season is doing, before any forecast does?' },
        { id: 'stock_adaptation', label: 'Stock and storage adaptation', helper: 'What will you change about how much you hold, and how you store it?' },
        { id: 'product_adaptation', label: 'A product that survives a slow week', helper: 'Which additional or existing product keeps through a difficult week?' },
        { id: 'shared_risk', label: 'Risk you can share', helper: 'Who could you share storage, transport, buying or an emergency fund with?' },
        { id: 'insurance_check', label: 'Insurance or group protection', helper: 'What protection exists for you, whether formal insurance or a group fund, and what does it actually cover?' },
        { id: 'official_forecast', label: 'Using official forecasts', helper: 'How will you check and use official forecasts before a season begins?' },
        { id: 'record_plan', label: 'What you will record', helper: 'What one line will you write down each day so next year is not guesswork?' },
      ],
    },
    kiswahiliPrompt: {
      prompt: 'Msimu huu umekufundisha nini kuhusu biashara yako?',
      translation: 'What has this season taught you about your business?',
      guidance:
        'Answer in Kiswahili, in English, or in both. Your response is private unless you choose to share it with other learners.',
    },
    reflectionQuestions: [
      'Which weather pattern do you rely on without having written it down?',
      'What did the last difficult season cost you, and which part of that cost could be reduced next time?',
      'What would you do differently if the season arrived two months late?',
    ],
    quiz: {
      passingScore: 4,
      questions: [
        {
          id: 1,
          prompt: 'Which statement best describes weather as a market variable?',
          options: [
            'Weather matters only to farmers',
            'Weather changes supply, demand, perishability, transport and customer numbers at once',
            'Weather affects price but not demand',
            'Weather matters only during the long rains',
          ],
          correctIndex: 1,
          feedback:
            'Rain, heat and wind change supply, demand, spoilage, roads and how many customers come out. Reading weather is part of reading the market.',
        },
        {
          id: 2,
          prompt: 'What does a seasonal calendar show a trader?',
          options: [
            'The exact weather for each day of the year',
            'When supply, prices, customer spending and transport costs typically change across the year',
            'Which day the county collects market fees',
            'The best month to take a loan',
          ],
          correctIndex: 1,
          feedback:
            'A seasonal calendar maps the recurring rise and fall of supply, price and customer spending so the year can be planned around rather than reacted to.',
        },
        {
          id: 3,
          prompt:
            'In a difficult week, which response best reduces risk without requiring new capital?',
          options: [
            'Buying a larger quantity to get a lower unit price',
            'Buying less, more often, and adding a product that keeps through a slow week',
            'Stopping trade until conditions improve',
            'Borrowing to hold more stock',
          ],
          correctIndex: 1,
          feedback:
            'Buying less and more often reduces exposure to spoilage, and a product that keeps through a slow day spreads risk at almost no cost.',
        },
        {
          id: 4,
          prompt: 'What does this module mean by spreading risk with others?',
          options: [
            'Asking relatives for money after a loss',
            'Sharing storage, transport or an emergency fund so risk is held collectively',
            'Selling on credit to more customers',
            'Waiting for government compensation',
          ],
          correctIndex: 1,
          feedback:
            'Sharing storage, transport, buying or an emergency fund is organisation rather than charity, and it distributes the shock.',
        },
        {
          id: 5,
          prompt: 'Why does a changing climate make written records more valuable?',
          options: [
            'Because records are required by the county',
            'Because when seasons no longer follow the remembered pattern, memory alone cannot show what has changed',
            'Because records reduce the price of stock',
            'Because insurers require them',
          ],
          correctIndex: 1,
          feedback:
            'Climate change weakens reliance on memory. Records of what happened, when and at what price let a trader see a shift that memory would conceal.',
        },
      ],
    },
    closingText: [
      'Weather is one of the main variables in a market, not background to it. It decides what arrives, at what price, how long it keeps, and how many customers come out.',
      'Adaptation is usually modest and organisational rather than expensive: buying less and more often, adding a product that keeps, sharing storage, and writing down what happened so next season is not guesswork.',
      'In the next module you will look at the rules and decisions that shape a trading day from outside the market: county government, licences, fees and public participation, and how a traders\u2019 case is prepared and heard.',
    ],
    sources: [
      'Kenya Meteorological Department, seasonal forecasts and climate advisories.',
      'Kenya National Bureau of Statistics, Consumer Price Index and food price data.',
      'Intergovernmental Panel on Climate Change, regional assessments for East Africa.',
      'Food and Agriculture Organization, climate risk and food market analysis.',
      'World Bank, Kenya Economic Update and climate resilience analysis.',
      'Financial Sector Deepening Kenya and International Labour Organization, informal-sector risk and social protection research.',
    ],
  },
};