/**
 * Server-side-only source of truth for the Building Wealth Together: Money,
 * Enterprise and Community Leadership module content.
 *
 * This file is imported ONLY by backend functions and is never bundled into
 * the public client-side JavaScript. It holds the full curriculum — the
 * lesson text, worked examples, "Try it" activities, local-application
 * prompts, dilemmas, concept-check questions and answer keys, and the
 * reflection prompts — which must not be exposed to a visitor who has not
 * passed the server-side access checks.
 *
 * Public-facing preview metadata (titles, short descriptions, statuses,
 * track grouping, completion-time estimates and the capstone option names)
 * lives in src/lib/building-wealth-together-tracks.js, which IS bundled for
 * the browser and is safe to expose publicly. The two files together form
 * the curriculum split across a server-only trust boundary.
 */

const WELCOME_FILM = {
  title: 'Welcome to Tamu Academy | Learning Across Cultures',
  watchUrl: 'https://youtu.be/qqIDNwa-h0s',
  note: 'Optional if you have already watched the welcome film.',
};

export const WEALTH_MODULE_CONTENT = {
  'building-wealth-together': {
    'module-1': {
      number: 'Module 1',
      route: 'module-1',
      title: 'The Power of Collective Capital',
      status: 'Available',
      estimatedTime: 'About 2\u20133 hours, including the activity and dilemma',
      welcomeFilm: WELCOME_FILM,
      goals: [
        'How savings circles work, and why they exist in nearly every culture on earth.',
        'Who gains most in a rotating savings group, and why the order of payouts matters.',
        'The safeguards that keep group money safe and group trust intact.',
      ],
      watch: {
        title: 'The Banker Ladies',
        beforeYouWatch:
          'Long before banks reached most communities, people built their own financial institutions out of trust and routine. This short documentary follows three Black women in Toronto who create financial services for their communities through Rotating Saving and Credit Associations, based on research by Professor Caroline Shenaz Hossein.',
        linkLabel: 'Watch The Banker Ladies (about 21 minutes)',
        url: 'https://www.filmsforaction.org/watch/the-banker-ladies/',
        notice: [
          'What do the women say their savings circles give them besides money?',
          'What rules or habits keep members paying on time?',
          'Why might people choose a savings circle over a bank, even when a bank is available?',
        ],
      },
      lessonSections: [
        {
          heading: 'One idea, many names',
          paragraphs: [
            'The film shows something that happens on every continent. In Kenya these groups are called chamas. In Ghana and across West Africa they are susu or esusu. In Jamaica and the UK they are pardners, in Mexico tandas, in the Philippines paluwagan, and in China hui. Economists call them Rotating Savings and Credit Associations (ROSCAs). When people migrate, they bring these traditions with them, which is why you will find them in Toronto, London, Houston and Atlanta.',
          ],
        },
        {
          heading: 'How a rotation works',
          paragraphs: [
            'The simplest form is the merry-go-round. Every member contributes a fixed amount at a fixed interval, and each round one member receives the whole pot. No interest is charged and no bank is involved. Small, forgettable amounts become one useful lump sum.',
            'The order matters. The first person to receive the pot is effectively getting an interest-free loan from the group, which they repay through their later contributions. The last person is effectively saving, with the group\u2019s discipline as the guarantee.',
          ],
          pauseAndThink:
            'If you needed money soon to buy stock for a business, which slot would you want, and why? What if you were trying to build a savings habit?',
        },
        {
          heading: 'Beyond the rotation',
          paragraphs: [
            'More advanced groups go further. Table banking groups lend the pooled fund to members at an agreed interest rate, so the interest goes back to the members themselves. Investment groups pool money over years to buy land, shares or a business that none of them could afford alone.',
          ],
        },
        {
          heading: 'The engine: mutual accountability',
          paragraphs: [
            'A bank asks for physical collateral: a house, a car, a salary slip. A savings circle relies on social collateral: your reputation, your relationships, your standing in the group. This is Ubuntu in financial form: I am because we are. Your success is tied to the group\u2019s, and the group survives only if each person keeps their word.',
          ],
        },
        {
          heading: 'The risks, and the safeguards',
          paragraphs: [
            'Collective money carries real risks. Default risk: an early recipient stops paying. Governance risk: records are poor, or a treasurer misuses funds. Concentration risk: all the money sits in one asset.',
            'The strongest groups manage these with a written constitution, records every member can see, at least two signatories on any withdrawal, and consequences agreed in advance, before anyone needs them.',
          ],
          pauseAndThink:
            'Think of a group you trust completely. Would it still need written rules? Why might rules protect trust rather than replace it?',
        },
      ],
      workedExample: {
        title: 'Ten friends, one rotation',
        paragraphs: [
          'Ten friends each contribute 1,000 per month in a merry-go-round.',
          'Each month, the pot is 10 \u00d7 1,000 = 10,000.',
          'Member 1 receives 10,000 in month one, then pays 1,000 a month for the next nine months. They used the full amount immediately and repaid it slowly, like an interest-free loan.',
          'Member 10 pays 1,000 a month for ten months and receives 10,000 at the end. They got back exactly what they put in, but the group gave them the discipline to save it.',
          'Everyone receives the same amount. What differs is when.',
        ],
      },
      tryIt: {
        intro:
          'List every group you belong to that pools money, labour or goods: a family fund, a church welfare kitty, a savings circle, friends who share costs.',
        steps: [
          'For each group, write down how it decides who gets what.',
          'Write down what happens when someone fails to pay.',
          'Write down whether its rules are written down.',
        ],
      },
      whereYouLive: [
        'Find out what savings circles are called in your community or your family\u2019s culture. Ask an elder, a parent or a neighbor how theirs worked, and what happened when someone did not pay.',
      ],
      dilemma: {
        title: 'Twende Pamoja, Limuru, Kenya',
        location: 'Limuru, Kenya',
        paragraphs: [
          'Twende Pamoja is a youth group of twelve members. For two years they have run two funds. The first is a merry-go-round: each member pays KSh 1,000 a month, and one member receives KSh 12,000. The second is an investment fund, now holding KSh 180,000, which the group plans to use next year as a deposit on a motorbike for a group-owned delivery business.',
          'Kevin received his payout in month two. In month five he lost his job, and he has now missed three contributions. The group is KSh 3,000 short. Achieng is due her payout in month eleven, and she is counting on it for her younger brother\u2019s school fees in January.',
          'Wanjiru, the treasurer, proposes covering Kevin\u2019s arrears from the investment fund. Ubuntu, she says, means carrying a member through hard times. Otieno, the chairperson, points to the constitution: a member who misses two payments must repay within thirty days or be removed, and their guarantor becomes responsible. Kevin\u2019s guarantor is his cousin, also a member, who is quietly angry. Several members privately say that if Kevin is protected, they will feel less pressure to pay on time themselves.',
          'The group meets on Saturday. Whatever it decides will set a precedent for the rest of the rotation and for the motorbike business.',
        ],
        prompt:
          'You have one vote. Take a clear position: (a) cover Kevin\u2019s arrears from the investment fund, (b) enforce the constitution, including the guarantor clause, or (c) propose a specific third option, with amounts and a timeline. Use at least two concepts from this module. Explain what precedent your choice sets. Then reply to a classmate who chose differently and name the biggest risk in their approach that they did not address.',
      },
      quiz: {
        passingScore: 2,
        questions: [
          {
            id: 1,
            prompt:
              'In a ten-member merry-go-round where everyone pays on time and no interest is charged, who gains the greatest financial advantage?',
            options: [
              'The last member to receive the pot',
              'The first member to receive the pot',
              'Everyone gains exactly the same',
              'The treasurer',
            ],
            correctIndex: 1,
            feedback:
              'The first recipient gets the full pot immediately and repays it over time, which works like an interest-free loan. Everyone receives the same total, but not at the same time.',
          },
          {
            id: 2,
            prompt: 'Which safeguard best protects a group against misuse of its funds?',
            options: [
              'Choosing the most trusted, well-liked member as treasurer',
              'Keeping cash with the treasurer so payouts are fast',
              'A written constitution, records open to all members, and two signatories for any withdrawal',
              'Raising contributions so small losses matter less',
            ],
            correctIndex: 2,
            feedback:
              'Structural safeguards protect the group no matter who holds office. Relying on one person\u2019s goodness leaves the group exposed, and larger contributions only increase what can be lost.',
          },
          {
            id: 3,
            prompt: 'What does "social collateral" mean?',
            options: [
              'Physical property pledged to the group',
              'A member\u2019s reputation and relationships, which are put at risk if they fail to pay',
              'Money held back by the treasurer as a reserve',
              'A loan guaranteed by a bank',
            ],
            correctIndex: 1,
            feedback:
              'Savings circles lend on trust rather than property, and a member\u2019s standing in the community is what they stand to lose.',
          },
        ],
      },
      reflection:
        'What did money and saving look like in the household you grew up in? Which of those habits do you want to keep, and which do you want to change?',
    },

    'module-2': {
      number: 'Module 2',
      route: 'module-2',
      title: 'Personal Runway & Household Cash Flow',
      status: 'Available',
      estimatedTime: 'About 2\u20133 hours, including the activity and dilemma',
      welcomeFilm: WELCOME_FILM,
      goals: [
        'The difference between paper wealth and cash you can actually use.',
        'How to calculate your personal runway: how long you could survive if your income stopped.',
        'How to plan for family and community obligations instead of being surprised by them.',
      ],
      watch: {
        title: 'Why You NEED an Emergency Fund! (PBS Two Cents)',
        beforeYouWatch:
          'This short video from the PBS personal finance series Two Cents opens by asking whether you could come up with $400 right now if an emergency hit, and shares real stories from viewers about how having, or not having, an emergency fund affected their lives. The examples are American, but the question applies everywhere.',
        linkLabel: 'Watch on PBS',
        url: 'https://www.pbs.org/video/why-you-need-an-emergency-fund-m0uc67/',
        alternativeUrl: 'https://www.youtube.com/watch?v=vftjBTjFlzI',
        alternativeLabel: 'Watch on YouTube',
        notice: [
          'How did not having an emergency fund end up costing people more money?',
          'Why do the hosts say a credit card is not an emergency fund?',
          'What would "an emergency" look like in your household? Is it the same as in the video?',
        ],
      },
      lessonSections: [
        {
          heading: 'Paper wealth vs. cash',
          paragraphs: [
            'Many people look wealthy on paper and still cannot pay this month\u2019s bills. Paper wealth is value that exists but cannot be spent today: a half-built house, a plot of land, livestock, jewelry, or money someone owes you. Cash is what you can actually use this week. Both matter, but only cash pays rent, buys food and handles an emergency.',
          ],
          pauseAndThink: 'List what you own. Which items could you turn into cash within one week, and at what loss?',
        },
        {
          heading: 'Tracking cash flow',
          paragraphs: [
            'Cash flow is simply money in and money out, and when each happens. Many people know their income but guess at their spending. The first step to control is a cash log: write down every amount that comes in and goes out for a few weeks. Most people find the problem is not one big expense, but many small ones and a few they forgot to plan for.',
          ],
        },
        {
          heading: 'Your personal runway',
          paragraphs: [
            'Your runway answers one question: if my income stopped today, how long could I cover my essentials?',
            'Runway = cash you can access within a week \u00f7 essential monthly spending.',
            'Essential spending means rent or housing, food, transport to work, utilities, and minimum debt payments. Most financial educators suggest building toward three to six months of runway. If yours is under one month, building a buffer comes before any new investment, however exciting.',
          ],
        },
        {
          heading: 'Debt traps start here',
          paragraphs: [
            'When there is no buffer, every emergency becomes a loan: from a payday lender, a loan app, or a credit card. Those loans make the next emergency even harder to handle. A runway breaks that cycle.',
          ],
        },
        {
          heading: 'Family and community obligations',
          paragraphs: [
            'Many people support parents, siblings and relatives, pay school fees, and contribute to weddings and funerals. In diaspora communities this is sometimes called "Black tax." These obligations can be deeply meaningful, but they are still cash outflows. Leaving them out of your plan does not make them disappear. It makes them arrive as emergencies.',
            'A strong plan names them, budgets for them, and sets a clear amount you can give without endangering your own household.',
          ],
          pauseAndThink: 'What obligations do you carry that never appear in a standard budget template?',
        },
      ],
      workedExample: {
        title: 'Kofi\u2019s runway',
        paragraphs: [
          'Kofi has 2,400 in savings he can access within a week. His essential monthly spending:',
        ],
        table: {
          columns: ['Essential', 'Monthly amount'],
          rows: [
            ['Rent', '700'],
            ['Food', '300'],
            ['Transport', '120'],
            ['Utilities and phone', '80'],
            ['Total essentials', '1,200'],
          ],
        },
        conclusion: [
          'Runway = 2,400 \u00f7 1,200 = 2 months.',
          'Kofi also sends 200 a month to his mother. That is not "essential" in the strict sense, but he would never stop. So his realistic monthly need is 1,400, and his realistic runway is 2,400 \u00f7 1,400 \u2248 1.7 months. Seeing that honest number is the first step to changing it.',
        ],
      },
      tryIt: {
        intro: 'Work with your own household numbers.',
        steps: [
          'Keep a cash log for the next four weeks. Every Sunday, record what came in and what went out, including family support and group contributions.',
          'Calculate your runway with both the strict and realistic numbers, as Kofi did.',
          'Choose one fixed monthly amount for family support, and write it down.',
        ],
      },
      whereYouLive: [
        'What counts as an "emergency" in your community? A hospital bill, a funeral, a failed harvest, a car repair? Ask two people how they handle these expenses, and whether they keep money aside for them.',
      ],
      dilemma: {
        title: 'Abena, Houston, USA',
        location: 'Houston, United States, with family in Kumasi, Ghana',
        paragraphs: [
          'Abena is a 34-year-old nurse in Houston whose family is in Kumasi, Ghana. She takes home $4,800 a month. Her essentials (rent, car payment, food and utilities) cost $3,150. Every month she also sends $600 to her mother and $800 to a contractor building her house in Kumasi. In total, $4,950 goes out each month, slightly more than she earns. She covers the gap with a credit card, and she has $2,500 in savings.',
          'On paper, Abena is doing well. The house has absorbed about $38,000 of her money and is two-thirds built. But this month, three things land at once: her hospital is cutting hours and her pay will drop by about $900 a month for at least three months; her contractor says the roof must go on before the rainy season or the walls will be damaged, and he needs $3,000 within six weeks; and her younger brother calls needing $1,200 for university fees, or he cannot register for the semester.',
          'Abena\u2019s friends tell her the house is her real wealth and she should not stop now. Her mother says family comes first. Abena is exhausted and afraid of disappointing everyone.',
        ],
        prompt:
          'Calculate Abena\u2019s current runway and what it becomes after her pay cut. Then take a clear position on what she should do in the next six weeks: which obligations she meets, delays or declines, and how she explains it to her family. Use the concepts of paper wealth, runway and planned obligations. Reply to a classmate who chose differently and test whether their plan leaves Abena with any buffer at all.',
      },
      quiz: {
        passingScore: 2,
        questions: [
          {
            id: 1,
            prompt: 'Which of these is the best example of paper wealth?',
            options: [
              'Cash in a mobile money wallet',
              'A partly built house in another country',
              'Money in a checking account',
              'A paycheck deposited this morning',
            ],
            correctIndex: 1,
            feedback:
              'A partly built house has real value, but it cannot be turned into usable cash quickly, especially from another country. The other options are cash available now.',
          },
          {
            id: 2,
            prompt:
              'Someone has 9,000 in accessible savings and essential monthly spending of 3,000. What is their runway?',
            options: ['1 month', '3 months', '6 months', '9 months'],
            correctIndex: 1,
            feedback: 'Runway is accessible cash divided by essential monthly spending: 9,000 \u00f7 3,000 = 3 months.',
          },
          {
            id: 3,
            prompt: 'Why should family support appear as a fixed line in a budget?',
            options: [
              'It makes family members ask for less',
              'Planned, predictable giving protects both the relationship and the household, while unplanned rescues tend to arrive as emergencies',
              'Budgets should only include expenses you enjoy',
              'It lets you avoid saving',
            ],
            correctIndex: 1,
            feedback:
              'A clear, fixed amount lets you give generously without putting your own stability at risk, and it gives your family something they can rely on.',
          },
        ],
      },
      reflection:
        'What is one obligation you carry that you have never written down? How would naming it change how you feel about it?',
    },

    'module-3': {
      number: 'Module 3',
      route: 'module-3',
      title: 'Debt vs. Productive Capital',
      status: 'Available',
      estimatedTime: 'About 2\u20133 hours, including the activity and dilemma',
      welcomeFilm: WELCOME_FILM,
      goals: [
        'The test that tells you whether a debt builds your future or drains it.',
        'How to recognize predatory lending: payday loans, loan apps and informal moneylenders.',
        'How to compare borrowing options using simple math.',
      ],
      watch: {
        title: 'Are Payday Loans Ever a Good Idea? (PBS Two Cents)',
        beforeYouWatch:
          'This episode looks at the temptation to visit a payday lender in desperate times. The hosts argue that these loans are engineered to keep borrowers trapped in debt, and that almost any legal alternative is preferable. Payday lending is an American term, but the same product exists everywhere under different names.',
        linkLabel: 'Watch on PBS',
        url: 'https://www.pbs.org/video/are-payday-loans-ever-a-good-idea-wlg0p0/',
        notice: [
          'What makes the lender profit more when the borrower cannot repay?',
          'Why do people who use these loans often have no other options?',
          'What is the version of this product where you live? A loan app, a moneylender, a shop that sells on credit?',
        ],
      },
      lessonSections: [
        {
          heading: 'Debt is not good or bad by category',
          paragraphs: [
            'People often say "business loans are good debt" and "credit cards are bad debt." Reality is more useful than that. Plenty of people have been ruined by business loans, and plenty of group loans from a chama or table-banking circle have gone wrong. The real question is what the debt does.',
          ],
        },
        {
          heading: 'The productive capital test',
          paragraphs: [
            'Ask two questions about any debt. First, does it pay for itself? Will what you buy produce more income, or save more money, than the loan costs each month? Second, can you survive if things go wrong? If your income drops or the investment fails, can you still repay without losing your home, your assets or your relationships?',
            'If the answer to both is yes, the debt is productive capital. If the first answer is no, it is consumption debt, which you are paying extra to have now. That is sometimes reasonable, but it is never free. If the second answer is no, the debt is dangerous, even if the idea is good.',
          ],
          pauseAndThink:
            'Think of the last time you or someone you know borrowed money. Would it have passed both questions?',
        },
        {
          heading: 'How predatory lending works',
          paragraphs: [
            'Predatory lenders design products that are easy to enter and hard to exit. Warning signs include fast approval with no questions about your ability to repay; fees and interest quoted per week or per month, so the annual cost stays hidden; automatic rollover, where you pay a fee to extend instead of reducing the debt; and pressure and shaming, through calls to your family, threats, or blacklisting.',
            'This is not only an American problem. In Kenya, for example, reporting has noted that while a typical bank loan costs around 12 to 14 percent a year, a mobile app loan can cost anywhere from 75 to 395 percent a year, and some debt collectors have contacted borrowers\u2019 friends and congregants to shame them.',
          ],
        },
        {
          heading: 'Turning a short-term rate into a yearly rate',
          paragraphs: [
            'Always convert. A loan that charges 10% for one month costs roughly 120% a year (10% \u00d7 12) before any compounding or penalties. A loan that costs 20% over two months costs roughly 120% a year as well.',
          ],
          pauseAndThink:
            'Have you ever seen a loan advertised with a "small" weekly or monthly fee? What would it cost per year?',
        },
        {
          heading: 'Better sources of capital',
          paragraphs: [
            'Before borrowing from a lender, look at your own savings, even if it means waiting. Look at your savings circle payout, and whether you can request an earlier slot. Look at cooperatives, credit unions and SACCOs, which are owned by their members and usually cheaper. And look at grants, family agreements or in-kind help, written down clearly.',
          ],
        },
      ],
      workedExample: {
        title: 'Lina\u2019s freezer',
        paragraphs: [
          'Lina sells snacks and is offered a 10,000 loan to buy a second-hand freezer, repaid at 600 a month for 20 months.',
          'With the freezer, she can sell cold drinks and earn an extra 900 a month after costs.',
          'Does it pay for itself? 900 extra \u2212 600 repayment = +300 a month. Yes.',
          'Can she survive if it goes wrong? If the freezer breaks, she still owes 600 a month. Lina has a runway of two months and a second income from braiding hair. She could manage, but only just.',
          'Verdict: it is productive capital, with real risk. A safer move might be a smaller loan, or waiting two months to add savings to the deposit.',
        ],
      },
      tryIt: {
        intro: 'List every debt you currently hold, including informal ones to family or shops.',
        steps: [
          'For each debt, write down the amount.',
          'Write down what it costs per month.',
          'Write down what the yearly rate would be.',
          'Mark whether it passes the productive capital test.',
        ],
      },
      whereYouLive: [
        'What are the most common ways people borrow in your community? Find out what at least two of them cost per year, once you convert them.',
      ],
      dilemma: {
        title: 'Ramon, Manila, Philippines',
        location: 'Manila, Philippines',
        paragraphs: [
          'Ramon, 29, drives a motorized tricycle that he rents for \u20b1500 a day. He works about 26 days a month, so rent costs him \u20b113,000 a month. A second-hand tricycle of his own would cost \u20b1120,000. If he owned one, he would save the rent, minus about \u20b12,000 a month for maintenance, leaving roughly \u20b111,000 a month extra.',
          'He has three options. A transport cooperative will lend him \u20b1120,000, repaid at \u20b16,500 a month for 24 months; it needs a co-signer, and his cousin Liza has offered. A local "5-6" moneylender will give him the money today: borrow \u20b15, pay back \u20b16, so he would owe \u20b1144,000 within 60 days. And his paluwagan (savings circle) of ten neighbors pays out \u20b150,000, but his turn is in month seven, and he has \u20b125,000 saved.',
          'The trouble is that the owner of his rented tricycle is selling it next month. Ramon must buy it, find another one to rent at a higher rate, or lose his income. His daughter\u2019s school tuition of \u20b18,000 is also due in six weeks.',
        ],
        prompt:
          'Apply the productive capital test to each option and calculate the monthly gain or loss. Then take a clear position on what Ramon should do, including whether he should accept his cousin as co-signer and what happens to her if things go wrong. Reply to a classmate who chose differently and test whether their plan survives a month in which Ramon cannot work because he is sick.',
      },
      quiz: {
        passingScore: 2,
        questions: [
          {
            id: 1,
            prompt: 'Which question best tells you whether a debt is productive?',
            options: [
              'Is the interest rate under 20%?',
              'Will the purchase produce more income or savings than the loan costs, and can you repay if things go wrong?',
              'Is it a business loan rather than a personal loan?',
              'Did a trusted person recommend it?',
            ],
            correctIndex: 1,
            feedback:
              'Productive capital pays for itself and stays survivable when things go wrong. Labels like "business loan" and low-sounding rates do not guarantee either.',
          },
          {
            id: 2,
            prompt:
              'A lender charges 10% interest for a one-month loan. Roughly what is that per year, before compounding?',
            options: ['10%', '12%', '60%', '120%'],
            correctIndex: 3,
            feedback:
              'Ten percent a month over twelve months is roughly 120% a year, which is why converting short-term rates matters.',
          },
          {
            id: 3,
            prompt: 'Which feature is the clearest warning sign of a predatory loan?',
            options: [
              'A written agreement',
              'Questions about your income before approval',
              'Fast approval with no check on your ability to repay, plus automatic rollover fees',
              'A fixed monthly repayment schedule',
            ],
            correctIndex: 2,
            feedback:
              'Predatory lenders profit when borrowers struggle, so they skip affordability checks and design loans that renew instead of ending.',
          },
        ],
      },
      reflection:
        'What is one belief about debt you grew up with? Does it still hold up after this module?',
    },

    'module-4': {
      number: 'Module 4',
      route: 'module-4',
      title: 'Community-First Market Validation',
      status: 'Available',
      estimatedTime: 'About 2\u20133 hours, including the activity and dilemma',
      welcomeFilm: WELCOME_FILM,
      goals: [
        'Why friends and family are the most encouraging, and least reliable, source of business feedback.',
        'How to ask questions that reveal real needs instead of polite answers.',
        'How to test demand with pre-sales before spending your savings.',
      ],
      watch: {
        title: 'How to Talk to Users (Y Combinator)',
        beforeYouWatch:
          'This is one of the most widely used lectures on customer interviews. It was given by Eric Migicovsky, founder of the Pebble smartwatch, for Y Combinator\u2019s Startup School. He has said he based it on The Mom Test, a book by a fellow founder. It was made for tech startups, but its core lesson applies to anyone selling anything.',
        linkLabel: 'Watch on YouTube (about 32 minutes)',
        url: 'https://www.youtube.com/watch?v=MT4Ig2uqjTc',
        notice: [
          'Why does he say you should not talk about your idea during an interview?',
          'What is the difference between asking about the past and asking about the future?',
          'Which parts would work differently if the people you are interviewing are your neighbors, whom you will see every week for years?',
        ],
      },
      lessonSections: [
        {
          heading: 'The kindness trap',
          paragraphs: [
            'Every new business rests on a guess: that people have a real problem, and that they will pay for a solution. Market validation means testing that guess with evidence before you spend money you cannot afford to lose.',
            'In close communities, people are kind. Relatives, church members and friends will often say your idea is wonderful because they care about you, not because they will buy. This is politeness bias, and it sinks more small businesses than competition does.',
          ],
          pauseAndThink:
            'Has anyone ever told you "that is a great idea," and then never bought? Why do you think they said it?',
        },
        {
          heading: 'Ask about the past, not the future',
          paragraphs: [
            '"Would you buy this?" invites a polite yes. Ask about real behavior instead: "Tell me about the last time this problem happened to you." "What did you do about it?" "What did it cost you, in money or time?" "What have you already tried?"',
            'Specific stories with real amounts are evidence. General enthusiasm is not.',
          ],
        },
        {
          heading: 'Commitment signals',
          paragraphs: [
            'The strongest evidence is a commitment: something a customer gives up to show the need is real. A deposit, a pre-order, a signed agreement or a meaningful amount of their time all count. Compliments do not. The more someone commits, the more you can trust their interest.',
          ],
        },
        {
          heading: 'Pre-sales: launching with almost no capital',
          paragraphs: [
            'You can often sell before you build. Take orders and deposits first, then buy supplies only for what has been paid for. Offer the service by hand before buying equipment. Run a one-week pilot. This is how many grassroots businesses start without loans.',
          ],
        },
        {
          heading: 'Beware social obligation, and build with your community',
          paragraphs: [
            'In close communities, some people buy once just to support you. Repeat purchases, not first purchases, show real demand.',
            'Validation is not a trick to extract information. It is a form of listening. A founder who listens honestly protects both their savings and their relationships, because they never ask people to support something that does not serve them.',
          ],
          pauseAndThink:
            'How could you separate a "research conversation" from a "sales conversation" so people feel free to be honest?',
        },
      ],
      workedExample: {
        title: 'Grace tests before she spends',
        paragraphs: [
          'Grace wants to sell lunch boxes to office workers near her home. She plans to test before buying equipment.',
        ],
        table: {
          columns: ['Step', 'What she does', 'Result'],
          rows: [
            ['1. Problem interviews', 'Talks to 15 workers about what they ate for lunch yesterday, and what it cost', '11 buy lunch daily, spending about 300; 8 complain about slow queues'],
            ['2. Pre-sale test', 'Offers a week of pre-paid lunches for 1,400', '7 people pay'],
            ['3. Repeat test', 'Offers week two', '6 of the 7 pay again'],
          ],
        },
        conclusion: [
          'Grace has real, repeated demand from at least six people, and she has earned the right to take the next step. She started with cooking pots she already owned.',
        ],
      },
      tryIt: {
        intro:
          'Pick a problem you think people in your community have. Write five past-focused interview questions about it, using the examples in the lesson.',
        steps: [
          'Interview three people who are not close friends or family.',
          'Note one thing that surprised you.',
        ],
      },
      whereYouLive: [
        'Who are the "gatekeepers" in your community, such as market chairs, pastors, elders or popular group admins? How might their support help you, and how might it distort what people tell you?',
      ],
      dilemma: {
        title: 'Simone, London, United Kingdom',
        location: 'South London, United Kingdom',
        paragraphs: [
          'Simone, 27, grew up in a Caribbean-British family in south London. She plans to start a weekend maths tutoring club for children aged 9 to 14, charging \u00a360 a month per child. At church, fifteen parents told her it is exactly what the community needs.',
          'She ran a test: a \u00a320 deposit to reserve a place for the first month. Only four of the fifteen parents paid. Two others said they "definitely will, just not yet." Her pardner (savings circle) payout of \u00a31,200 arrives next month, and she planned to spend it on materials and a deposit for a community hall at \u00a3300 a month.',
          'Then the youth pastor offers the church hall free, with one condition: the club must be presented as a church ministry, and he wants a say in who teaches. Simone wants it open to all families, whatever their faith, and she is not sure she wants to share control.',
        ],
        prompt:
          'Interpret the evidence from Simone\u2019s test using politeness bias, commitment signals and social obligation. Then take a clear position: should she (a) launch now in the rented hall, (b) accept the free church hall with its conditions, or (c) run a different test first, which you should describe? Reply to a classmate who chose differently and argue whether they have read the evidence correctly.',
      },
      quiz: {
        passingScore: 2,
        questions: [
          {
            id: 1,
            prompt: 'Which question produces the most reliable information about a customer\u2019s need?',
            options: [
              '"Would you use this if I built it?"',
              '"Do you not think this would really help?"',
              '"Tell me about the last time this happened. What did you do, and what did it cost you?"',
              '"How much would you pay for this in the future?"',
            ],
            correctIndex: 2,
            feedback:
              'People describe past events far more accurately than they predict their future behavior. The other questions invite polite agreement.',
          },
          {
            id: 2,
            prompt: 'Which is the strongest evidence of demand?',
            options: [
              'Twenty friends say it is a great idea',
              'A respected leader promises her members will buy',
              'Fifteen customers pay a deposit, and ten buy again the next month',
              'Many people share your announcement online',
            ],
            correctIndex: 2,
            feedback:
              'Deposits and repeat purchases cost customers real money more than once. Praise, promises and shares cost nothing.',
          },
          {
            id: 3,
            prompt: 'Why are repeat purchases more meaningful than first purchases in a close community?',
            options: [
              'First purchases are always refunded',
              'Some people buy once out of social obligation, but only real need brings them back',
              'Repeat customers pay higher prices',
              'First purchases do not count as sales',
            ],
            correctIndex: 1,
            feedback: 'A first purchase may be a gesture of support. A second one shows the product actually serves them.',
          },
        ],
      },
      reflection:
        'Think of an idea you have had for a business or project. What is the riskiest assumption behind it, and how could you test it this month for little or no money?',
    },

    'module-5': {
      number: 'Module 5',
      route: 'module-5',
      title: 'Sustainable Pricing & Unit Economics',
      status: 'Available',
      estimatedTime: 'About 2\u20133 hours, including the activity and dilemma',
      welcomeFilm: WELCOME_FILM,
      goals: [
        'How to calculate what each sale really earns you.',
        'How to find your break-even point: the number of sales you need just to cover costs.',
        'How resource pooling lowers costs, and why your own time must be counted.',
      ],
      watch: {
        title: 'Break-Even Analysis in Three Minutes',
        beforeYouWatch:
          'This short video comes from a free, open university business textbook. The page explains the break-even point, contribution margin, and how to calculate break-even in units by dividing total fixed costs by the contribution margin per unit.',
        linkLabel: 'Watch the video and read the free lesson (Lumen Learning)',
        url: 'https://courses.lumenlearning.com/wm-introductiontobusiness/?p=870',
        notice: [
          'What is the difference between a fixed cost and a variable cost?',
          'Why does the break-even calculation use the margin rather than the price?',
          'What happens to break-even if your costs per item go down?',
        ],
      },
      lessonSections: [
        {
          heading: 'Why so many small businesses quietly fail',
          paragraphs: [
            'Many do not fail because no one buys. They fail because every sale loses a little money, and no one notices until the savings are gone. Unit economics means understanding the numbers behind a single sale.',
          ],
        },
        {
          heading: 'Five terms you need',
          paragraphs: [
            'Price: what the customer pays for one unit.',
            'Variable cost: what it costs to produce one unit (materials, packaging, per-item transport).',
            'Contribution margin: price \u2212 variable cost. This is what each sale contributes toward everything else.',
            'Fixed costs: costs that stay the same however much you sell (rent, licenses, monthly transport).',
            'Break-even point: fixed costs \u00f7 contribution margin. This is how many units you must sell each month just to cover costs.',
          ],
          pauseAndThink:
            'For something you sell or would like to sell, can you name every variable cost? Most people forget at least one.',
        },
        {
          heading: 'Count your own labor',
          paragraphs: [
            'If you do not pay yourself, your business may look profitable when it is only surviving on your free work. Include a fair payment for your time as a fixed cost. A business that only works when you work for free is not yet a sustainable business.',
          ],
        },
        {
          heading: 'Do not underprice out of kindness',
          paragraphs: [
            'Ubuntu calls us to serve our community. But a business that slowly runs out of money cannot serve anyone. Fairness should be built in deliberately, for example a solidarity price for those in hardship or tiered pricing, and only once the numbers show the business can carry it.',
          ],
        },
        {
          heading: 'Resource pooling, and how to set a price',
          paragraphs: [
            'Small producers cannot negotiate like big companies. Together, they can. Bulk buying, shared equipment, shared transport and shared stalls lower costs, so every sale earns more without changing what the customer pays.',
            'Your floor is your full unit cost. Above that, consider what customers value and what alternatives they have. The goal is a price the community can afford and the business can survive on.',
          ],
          pauseAndThink:
            'Who sells something similar near you? Do you think they have counted their own time in their price?',
        },
      ],
      workedExample: {
        title: 'The Umoja Soap Collective, Limuru, Kenya',
        paragraphs: [
          'Eight women make liquid soap.',
          'Unit cost: ingredients KSh 70 + bottle KSh 20 + label KSh 10 = KSh 100 variable cost.',
          'Margin: price KSh 150 \u2212 KSh 100 = KSh 50 per bottle.',
          'Break-even: stall rent and transport cost KSh 5,000 a month. 5,000 \u00f7 50 = 100 bottles a month. Bottle 101 is the first one that earns a profit.',
          'Pooling: buying ingredients in bulk with two neighboring groups cuts ingredients to KSh 55. Variable cost becomes KSh 85, margin becomes KSh 65, and break-even falls to 5,000 \u00f7 65 \u2248 77 bottles.',
          'Counting labor: the members want KSh 6,000 a month for their time. Fixed costs become KSh 11,000, and break-even rises to 11,000 \u00f7 65 \u2248 170 bottles. This is the honest number.',
        ],
      },
      tryIt: {
        intro:
          'For one product or service you sell, or would like to sell, work out the numbers.',
        steps: [
          'Calculate the variable cost per unit.',
          'Calculate the contribution margin.',
          'List monthly fixed costs, including your own time.',
          'Calculate break-even, and compare it with how much you actually sell, or expect to.',
        ],
      },
      whereYouLive: [
        'Find one cost that small businesses near you could share: a supplier, a vehicle, equipment or a stall. Ask one business owner whether they would consider pooling it.',
      ],
      dilemma: {
        title: 'The Umoja Soap Collective\u2019s school contract',
        location: 'Limuru, Kenya',
        paragraphs: [
          'The collective now produces each bottle for KSh 85 thanks to pooled buying. It sells about 220 bottles a month at KSh 150, covers its costs, and shares the profit equally.',
          'A large boarding school offers a contract: 600 bottles a month for a full school year at KSh 110 per bottle, paid 45 days after each delivery. To meet the volume, the collective needs a second mixing drum and storage costing KSh 30,000, and each member would need to work about twice as many hours.',
          'Mumbi, the chairperson, wants to accept. The contract brings steady income, protects the group from slow weeks, and could provide jobs for two young women in the village. Njoki, the treasurer, disagrees: the price is far below retail, the payment delay will strain their cash, and if market customers learn the school pays less, they will demand discounts too. Wairimu, the oldest member, worries that the extra hours will fall hardest on members who care for children and elderly parents, and that resentment could split the group.',
          'The bursar wants an answer in two weeks.',
        ],
        prompt:
          'Calculate the monthly contribution from the school contract, and how many months it takes to recover the KSh 30,000 equipment cost. Then take a clear position: (a) accept as offered, (b) make a specific counter-offer on price, volume or payment terms, or (c) decline. Address Wairimu\u2019s concern directly. Reply to a classmate who chose differently and check their numbers and their treatment of members\u2019 time.',
      },
      quiz: {
        passingScore: 2,
        questions: [
          {
            id: 1,
            prompt:
              'A product sells for 200, costs 120 per unit to make, and the business has fixed costs of 4,000 a month. What is the break-even point?',
            options: ['20 units', '33 units', '50 units', '80 units'],
            correctIndex: 2,
            feedback: 'The margin is 200 \u2212 120 = 80, and 4,000 \u00f7 80 = 50 units.',
          },
          {
            id: 2,
            prompt: 'Three producers start buying raw materials together in bulk. What is the main effect on each one?',
            options: [
              'Their prices automatically rise',
              'Their variable cost per unit falls, so every sale earns more',
              'Their fixed costs disappear',
              'Their sales automatically increase',
            ],
            correctIndex: 1,
            feedback:
              'Bulk buying lowers the cost per unit, which raises the margin on each sale. It does not change prices or guarantee more customers by itself.',
          },
          {
            id: 3,
            prompt: 'Why should business owners count their own labor as a cost?',
            options: [
              'Tax rules require it everywhere',
              'Without it, a business can look profitable while really surviving on unpaid work',
              'It makes the business look bigger',
              'Customers expect to see it on receipts',
            ],
            correctIndex: 1,
            feedback:
              'If the owner stops working for free, an unpriced business may collapse. Counting labor shows its true sustainability.',
          },
        ],
      },
      reflection:
        'Have you ever undercharged for your work? What stopped you from charging more, and what would help you price fairly next time?',
    },

    'module-6': {
      number: 'Module 6',
      route: 'module-6',
      title: 'Keeping the Business Alive',
      status: 'Available',
      estimatedTime: 'About 2\u20133 hours, including the activity and dilemma',
      welcomeFilm: WELCOME_FILM,
      goals: [
        'Why a profitable business can still run out of cash.',
        'How to separate your business wallet from your personal wallet.',
        'How to build a simple weekly cash forecast and calculate your weekly burn.',
      ],
      watch: {
        title: 'Cash Flow vs. Profit (Harvard Business School Online)',
        beforeYouWatch:
          'This short explainer from Harvard Business School Online covers a confusion that sinks many small businesses. It explains that profit shows what is left after expenses, while cash flow shows the actual movement of cash into and out of a business.',
        linkLabel: 'Watch the video and read the article (HBS Online)',
        url: 'https://online.hbs.edu/blog/post/cash-flow-vs-profit',
        notice: [
          'How can sales be recorded before any money arrives?',
          'Why does timing matter as much as the amount?',
          'Which examples fit a large company but not a market stall? What would the small-business version look like?',
        ],
      },
      lessonSections: [
        {
          heading: 'Profit is an opinion, cash is a fact',
          paragraphs: [
            'A business is profitable when, over a period, its sales are greater than its costs. But profit is counted when a sale is made, while cash only counts when money arrives. If customers pay late, a profitable business cannot pay its suppliers, its rent or its workers. Many small businesses close in their best month, after winning a big order they could not afford to fulfill.',
          ],
        },
        {
          heading: 'Receivables: money you are owed',
          paragraphs: [
            'Selling on credit creates receivables. They look like wealth on paper, but you cannot buy stock with them. A rule of thumb: the bigger the customer and the longer the payment terms, the more cash you need upfront.',
          ],
          pauseAndThink:
            'Do you know anyone whose business struggled right after it won a big customer? What happened?',
        },
        {
          heading: 'Two wallets',
          paragraphs: [
            'Most micro-businesses share one pot of money with the household. School fees come out of the stock money, and stock is bought with rent money. Then the owner cannot tell whether the business is actually working. The fix is simple: a separate account or mobile wallet for the business, and a fixed weekly amount the business pays you. Everything else stays in the business.',
          ],
        },
        {
          heading: 'Weekly burn and the cash forecast',
          paragraphs: [
            'Weekly burn is how much cash the business spends in a typical week. A cash forecast is a simple table, written before each week or month, showing expected cash in, expected cash out, and the balance at the end.',
            'The forecast shows you a shortage before it happens, while you still have options: negotiating a deposit, asking a supplier for more time, or slowing down.',
          ],
        },
        {
          heading: 'Ways to protect cash',
          paragraphs: [
            'Ask for deposits on large orders. Offer a small discount for fast payment. Negotiate terms with suppliers to match when customers pay. Keep a business buffer of at least two to four weeks of burn. And plan for seasonality, such as school-fee months, harvests, holidays and rainy seasons.',
          ],
          pauseAndThink: 'What are the slowest months of the year for the kind of business you run or want to run?',
        },
      ],
      workedExample: {
        title: 'Amina\u2019s vegetable stall',
        paragraphs: [
          'Amina sells vegetables. Normally customers pay cash, she buys 2,000 of stock each morning, and sells it for 3,000. A school now offers to buy 1,500 of vegetables a day, paid at the end of the month.',
        ],
        table: {
          columns: ['', 'Before the school', 'With the school (first month)'],
          rows: [
            ['Stock bought daily', '2,000', '3,000'],
            ['Cash received daily', '3,000', '3,000 (school pays later)'],
            ['Daily cash left over', '+1,000', '0'],
            ['Owed to her by month\u2019s end', '0', 'about 45,000'],
          ],
        },
        conclusion: [
          'Her profit goes up, but her daily cash surplus disappears, and any bad day pushes her into debt. Before saying yes, Amina needs either a buffer, a deposit from the school, or weekly payments instead of monthly.',
        ],
      },
      tryIt: {
        intro: 'Build a four-week cash forecast for your business, or for a business you would like to run.',
        steps: [
          'Use three columns: cash in, cash out, end-of-week balance.',
          'Mark the week your balance is lowest.',
          'That is the week to prepare for.',
        ],
      },
      whereYouLive: [
        'How do businesses near you handle customers who want to buy on credit? Ask one business owner what rules they use and what happens when someone does not pay.',
      ],
      dilemma: {
        title: 'Esi, Accra, Ghana',
        location: 'Accra, Ghana',
        paragraphs: [
          'Esi runs a small catering business. For three years she has cooked for weddings, funerals and church events, and customers pay cash on the day. She contributes daily to a susu collector to save for a second commercial stove.',
          'A logistics company offers her the biggest contract of her career: weekly staff lunches for three months, worth GHS 40,000, with about GHS 13,000 profit. That is more than she normally earns in four months. But the company pays each month\u2019s invoice 60 days after the month ends. Esi would need to spend about GHS 9,000 a month on ingredients, gas and two extra helpers, paid upfront.',
          'Esi has GHS 6,000 in her business account. She keeps GHS 8,000 in a separate household fund for her children\u2019s school fees, due in ten weeks. Her susu payout is seven weeks away. A digital lending app offers GHS 10,000 for 30 days at 12%, with automatic penalties if she is late. Her sister suggests asking the company for a 30% deposit, but Esi fears they will simply choose another caterer.',
          'The company wants her answer by Monday.',
        ],
        prompt:
          'Build a month-by-month cash forecast for Esi\u2019s three months under the contract, and find the largest cash gap she would face before the first payment arrives. Then take a clear position: (a) accept and borrow from the app, (b) accept and temporarily use the school-fee fund, (c) accept only with a deposit or shorter payment terms, or (d) decline. Use the concepts of receivables, the two-wallet rule, and the cash forecast. Reply to a classmate who chose differently and identify the assumption in their plan most likely to fail.',
      },
      quiz: {
        passingScore: 2,
        questions: [
          {
            id: 1,
            prompt:
              'A small business has three profitable months in a row but cannot pay its supplier this week. What is the most likely cause?',
            options: [
              'It loses money on every sale',
              'Much of its profit is tied up in money customers still owe, or in unsold stock',
              'Profit calculations are always wrong',
              'The supplier raised prices',
            ],
            correctIndex: 1,
            feedback:
              'Profit counts sales when they are made, but cash only arrives when customers pay, so profit can be locked in receivables or inventory.',
          },
          {
            id: 2,
            prompt:
              'A business spends about 5,000 a week and holds 15,000 in cash, with no money expected for the next month. How many weeks can it cover?',
            options: ['2 weeks', '3 weeks', '5 weeks', '15 weeks'],
            correctIndex: 1,
            feedback:
              'Cash divided by weekly burn gives 15,000 \u00f7 5,000 = 3 weeks, so the owner has three weeks to find cash or cut spending.',
          },
          {
            id: 3,
            prompt: 'Why keep business and household money in separate wallets?',
            options: [
              'It is legally required everywhere',
              'It lets you see whether the business is actually working and stops one side from quietly draining the other',
              'It increases sales',
              'It eliminates the need for a budget',
            ],
            correctIndex: 1,
            feedback:
              'When the money is mixed, neither the business nor the household can be planned properly. Separation makes both visible.',
          },
        ],
      },
      reflection:
        'If your income arrived 60 days late next month, what would break first in your life or business? What could you put in place now?',
    },

    'module-7': {
      number: 'Module 7',
      route: 'module-7',
      title: 'Leadership Through Ubuntu & Accountability',
      status: 'Available',
      estimatedTime: 'About 2\u20133 hours, including the activity and dilemma',
      welcomeFilm: WELCOME_FILM,
      goals: [
        'How to lead when you have no formal authority, only the trust people give you.',
        'Why groups without clear structure develop hidden hierarchies.',
        'How to hold people accountable in a way that repairs rather than divides.',
      ],
      watch: {
        title: 'What I Learned from Nelson Mandela (TED)',
        beforeYouWatch:
          'In this 15-minute TED talk, wildlife activist Boyd Varty shares stories about the interconnectedness of people and animals, and about ubuntu, defined as "I am, because of you," dedicating the talk to Nelson Mandela.',
        linkLabel: 'Watch on TED.com',
        url: 'https://www.ted.com/talks/boyd_varty_what_i_learned_from_nelson_mandela',
        alternativeUrl: 'https://www.youtube.com/watch?v=0wZtfqZ271w',
        alternativeLabel: 'Optional: Archbishop Desmond Tutu explains Ubuntu (short clip)',
        notice: [
          'How does Varty describe Ubuntu in action, not just as an idea?',
          'What does Mandela\u2019s example suggest about leadership after conflict?',
          'Where could the idea of harmony be misused to silence people who raise problems?',
        ],
      },
      lessonSections: [
        {
          heading: 'Leading without a title',
          paragraphs: [
            'Most leadership training assumes a hierarchy: a manager, a team, a salary that gives authority. Most community leadership works differently. In youth groups, savings circles, cooperatives and volunteer movements, no one is paid to follow you. Authority comes from trust, and trust comes from accountability.',
          ],
        },
        {
          heading: 'Ubuntu and stewardship',
          paragraphs: [
            'In an Ubuntu view, a leader is not above the group but held by it. Leadership is stewardship: caring for resources, relationships and a purpose that belong to everyone. A good leader makes the group stronger, not more dependent on them.',
          ],
          pauseAndThink:
            'Think of someone you would follow even though they have no official title. What did they do to earn that?',
        },
        {
          heading: 'Accountability structures',
          paragraphs: [
            'Trust needs structure to last: regular reporting to members on decisions and money; records anyone can inspect; clear terms of office, so leadership rotates or is renewed; and an agreed way to question or replace a leader.',
            'These are not a sign of distrust. They protect good leaders from suspicion and protect groups from bad ones.',
          ],
        },
        {
          heading: 'The hidden-hierarchy problem',
          paragraphs: [
            'Some groups try to avoid hierarchy entirely, believing that if no one is in charge, everyone is equal. The writer Jo Freeman described what really happens in her essay The Tyranny of Structurelessness: informal hierarchies form anyway. The most confident, connected or wealthy members end up making decisions, and because their power is unofficial, no one can hold them accountable. The answer is explicit, shared structure: rotating roles, written decision rules, and responsibilities divided among several people. This is distributed leadership.',
          ],
        },
        {
          heading: 'Founder\u2019s syndrome, and restorative accountability',
          paragraphs: [
            'The person who starts a group often keeps control long after the group has outgrown them, making every decision, holding every relationship, and treating questions as disloyalty. Founders who want their work to outlive them must deliberately hand over responsibility.',
            'When someone fails, Ubuntu points toward repair: name the harm honestly, ask the person to make it right, fix the system so it does not happen again, and keep them in the community where possible. This is not the same as avoiding consequences. Restoration without consequences teaches that commitments do not matter. Consequences without restoration teach people to hide mistakes. Strong leaders hold both.',
          ],
          pauseAndThink:
            'When someone in a group you belonged to made a mistake, what happened next? Did it repair trust or damage it?',
        },
      ],
      workedExample: {
        title: 'Mapping hidden power in a youth choir',
        paragraphs: [
          'A youth choir has an official chair, secretary and treasurer. Leila maps how decisions actually get made:',
        ],
        table: {
          columns: ['Decision', 'Official owner', 'Who really decides'],
          rows: [
            ['Which events to perform at', 'Chair', 'The choir director\u2019s friend, who books venues'],
            ['How money is spent', 'Treasurer', 'The chair, who holds the mobile money PIN'],
            ['Who sings solos', 'Group vote', 'The director, before rehearsal'],
          ],
        },
        conclusion: [
          'What Leila proposes: formally make the venue-booker the events coordinator, with a duty to report. Move the PIN to two signatories. Publish the solo rotation. Each informal power becomes visible and accountable.',
        ],
      },
      tryIt: {
        intro: 'Map one group you belong to, as Leila did.',
        steps: [
          'Find one place where informal power should become formal and accountable.',
          'Write down how you would propose the change.',
        ],
      },
      whereYouLive: [
        'What traditions of shared leadership exist in your culture, such as councils of elders, rotating chairs or consensus gatherings? What do they do well, and who do they leave out?',
      ],
      dilemma: {
        title: 'Thabo, Soweto, South Africa',
        location: 'Soweto, South Africa',
        paragraphs: [
          'Thabo, 24, founded a youth environmental group four years ago with six friends who cleared rubbish from a local stream. It now has sixty active members, runs school workshops, and holds monthly clean-ups that local councillors attend. Thabo makes nearly every decision: he sets the agenda, speaks to officials, manages the group\u2019s account, and chooses who represents the group at events.',
          'At the last meeting, Lerato, 19, who leads the school workshops, proposed replacing Thabo\u2019s sole leadership with a rotating council of five members elected each year, plus two signatories on the account. Many younger members applauded. Thabo felt publicly undermined. He reminded everyone that he built the group from nothing and that officials trust him personally.',
          'Then an environmental foundation offered a grant of R90,000, the largest in the group\u2019s history. The application requires one named accountable leader and account details. The deadline is in two weeks. Thabo believes a leadership change now will confuse the funder. Lerato\u2019s supporters believe that if Thabo alone controls the largest sum the group has ever handled, internal trust will not survive, however honest he is.',
          'At the same time, the treasurer, one of Thabo\u2019s closest friends, admits the records for the past year are incomplete.',
        ],
        prompt:
          'The group has asked you to advise them. Take a clear position: (a) keep Thabo as sole leader to secure the grant and fix governance later, (b) adopt Lerato\u2019s council before applying, or (c) design a specific transitional arrangement, with roles, signatories and a timeline. Use the concepts of hidden hierarchy, distributed leadership, founder\u2019s syndrome and restorative accountability. Explain how you would handle the incomplete records. Reply to a classmate who chose differently and name the trust risk their plan leaves open.',
      },
      quiz: {
        passingScore: 2,
        questions: [
          {
            id: 1,
            prompt:
              'A group decides to have no official leaders. A year later, three outspoken members make every decision. What does this illustrate?',
            options: [
              'Founder\u2019s syndrome',
              'The tyranny of structurelessness, where hidden hierarchies form without accountability',
              'Successful distributed leadership',
              'Restorative accountability',
            ],
            correctIndex: 1,
            feedback:
              'Power does not disappear without structure. It concentrates informally in people who cannot be held accountable.',
          },
          {
            id: 2,
            prompt:
              'A member misplaces receipts and cannot account for part of a month\u2019s contributions, with no sign of theft. Which response best reflects restorative accountability?',
            options: [
              'Remove the member immediately',
              'Ignore it to keep the peace',
              'Name the problem openly, ask the member to help rebuild the records and cover any proven loss, and introduce a receipt system for everyone',
              'Have the chairperson take over the books personally',
            ],
            correctIndex: 2,
            feedback:
              'It names the harm, asks for repair, and fixes the system, while keeping the member in the community. The last option concentrates unaccountable power.',
          },
          {
            id: 3,
            prompt:
              'What is the main purpose of accountability structures such as open records and terms of office?',
            options: [
              'To show that members distrust their leaders',
              'To protect both the group and honest leaders by making decisions and money visible',
              'To slow down all decisions',
              'To replace trust entirely',
            ],
            correctIndex: 1,
            feedback:
              'Visible structures protect good leaders from suspicion and the group from misuse. They support trust rather than replace it.',
          },
        ],
      },
      reflection: 'Is there a responsibility you hold that only you know how to do? What would it take to hand it over?',
    },

    'module-8': {
      number: 'Module 8',
      route: 'module-8',
      title: 'Consensus-Building & Joint Risk Navigation',
      status: 'Available',
      estimatedTime: 'About 2\u20133 hours, including the activity and dilemma',
      welcomeFilm: WELCOME_FILM,
      goals: [
        'How to choose the right decision method for a group: majority, supermajority, consensus or consent.',
        'How to protect honest dissent from pressure, status and deadlines.',
        'How a group can share a loss fairly when a collective investment goes wrong.',
      ],
      watch: {
        title: 'Elinor Ostrom\u2019s Nobel Prize Lecture',
        beforeYouWatch:
          'Elinor Ostrom was the first woman to win the Nobel Prize in Economic Sciences. She spent her career studying how ordinary communities manage shared resources. She delivered this lecture, "Beyond Markets and States: Polycentric Governance of Complex Economic Systems," on 8 December 2009 at Stockholm University. It is an academic lecture, so focus on her big idea rather than every detail.',
        linkLabel: 'Watch the lecture on NobelPrize.org',
        url: 'https://www.nobelprize.org/prizes/economic-sciences/2009/ostrom/lecture/',
        notice: [
          'What did Ostrom find about communities that manage shared resources well?',
          'Why did she reject the idea that only governments or private owners can manage shared resources?',
          'How might her findings apply to a savings group\u2019s fund or a group-owned business?',
        ],
      },
      lessonSections: [
        {
          heading: 'Decide how you will decide, before you decide',
          paragraphs: [
            'Many group conflicts are not really about the decision. They are about whether the process was fair. Settle the method in advance.',
            'Majority vote: more than half wins. Fast and clear, but a large minority can feel ignored.',
            'Supermajority: two-thirds or more needed. Protects against risky big decisions, but can stall urgent choices.',
            'Consensus: everyone must agree. Strong commitment, but slow, and one person can block forever.',
            'Consent: proceed unless someone raises a reasoned objection that the proposal would harm the group\u2019s purpose. Moves forward while taking real concerns seriously, though it requires discipline about what counts as an objection.',
          ],
          pauseAndThink:
            'Which method does your family, team or group actually use for big decisions? Was it ever agreed, or did it just happen?',
        },
        {
          heading: 'Three pressures that distort group decisions',
          paragraphs: [
            'Groupthink: the desire for unity silences doubts. Status deference: members defer to elders, founders or wealthier members, even when those people lack relevant knowledge. Urgency pressure: a deadline, often set by an outsider, pushes the group to skip checks.',
          ],
        },
        {
          heading: 'Tools that protect good decisions',
          paragraphs: [
            'Separate ideas from judgment: collect all options before criticizing any. Let the least senior speak first, so status does not shape everyone\u2019s answer. Run a pre-mortem: imagine it is a year later and the decision failed, then ask everyone to explain why. Check reversibility: reversible decisions can be made quickly, while irreversible ones, like buying land, deserve more time and evidence. And keep a decision record of what was decided, why, and who agreed.',
          ],
        },
        {
          heading: 'Ostrom\u2019s lesson: good shared management is designed',
          paragraphs: [
            'Ostrom showed that communities can successfully govern shared resources when they follow certain design principles, including clear membership, so everyone knows who is in and who is out; rules that fit local conditions; members helping to make the rules; monitoring, so someone checks that rules are followed; graduated sanctions, where consequences start gently and increase with repeated violations; and accessible conflict resolution, so disputes can be settled fairly and affordably.',
            'A savings group\u2019s fund, a shared stall and a youth group\u2019s equipment are all shared resources of this kind.',
          ],
        },
        {
          heading: 'When things go wrong: sharing a loss',
          paragraphs: [
            'Collective investments sometimes fail. How a group handles failure decides whether it survives. Get the facts first, separating what is known from what is feared. Separate blame from decisions: find out what went wrong so it is not repeated, but do not let the search for someone to blame stall the decision. Lay out every option with its numbers, including doing nothing. Agree on how the loss is shared: equally, in proportion to contributions, or by another rule the group accepts. And provide an exit path for members who want to leave, on fair terms, so they do not feel trapped.',
          ],
          pauseAndThink: 'Have you seen a group break apart after losing money? What do you think could have held it together?',
        },
      ],
      workedExample: {
        title: 'A pre-mortem in 15 minutes',
        paragraphs: [
          'A youth group is about to spend its savings on a sound system to rent out for events. Before voting, the chair asks each member to write one reason it might fail in a year. Members write: "Nobody books it, because there are already three sound systems in town." "It gets damaged and we cannot afford repairs." "One member keeps it at home and treats it as theirs."',
          'What changes: the group checks local demand first, sets aside 10% of rental income for repairs, and writes a rule that the equipment is stored at a neutral location with a booking log. The decision gets better before it is made.',
        ],
      },
      tryIt: {
        intro: 'Choose a real decision your family, group or team faces.',
        steps: [
          'Run a five-minute pre-mortem on your own: write three reasons it could fail.',
          'Write one change that would reduce each risk.',
        ],
      },
      whereYouLive: [
        'How are disputes over shared money or land usually settled in your community? Is that process accessible and trusted, and by whom?',
      ],
      dilemma: {
        title: 'The Tumaini Investment Chama, Nairobi, Kenya',
        location: 'Nairobi, Kenya',
        paragraphs: [
          'Wanjiku chairs an investment chama of twenty members. Last year, after six years of saving, they used KSh 2,200,000 to buy a plot of land. Three senior founders pushed hard for it. Several younger members had wanted to wait for a full title search, but they were outvoted.',
          'Now a family has come forward claiming the land is theirs, and the title is in dispute. The chama\u2019s lawyer estimates a court case could take two to four years and cost about KSh 300,000 in fees, with no guarantee of winning. Meanwhile, the seller\u2019s agent has quietly offered a refund of KSh 1,200,000 now if the chama drops all claims. The chama\u2019s remaining fund is KSh 200,000.',
          'The group is fracturing. The three founders want to fight in court; they feel blamed and believe accepting the refund admits they were wrong. Several younger members want to accept the refund, recover what they can, and rebuild. Two want to leave the chama entirely and take their share. One member suggests selling the chama\u2019s claim to a land-dispute investor for an unknown price.',
          'The constitution requires a two-thirds vote for any decision above KSh 500,000. The agent\u2019s offer expires in three weeks.',
        ],
        prompt:
          'You are Wanjiku. Lay out the options with their numbers, including the amount each member would recover or risk under each. Take a clear position on what you will propose, and describe the process you will use to reach a decision: the method, the order of speakers, and how you will handle the founders\u2019 feelings and the members who want to exit. Use at least one of Ostrom\u2019s design principles and the loss-sharing principles from this module. Reply to a classmate who chose differently and argue whether the members who lose the vote would see their process as fair.',
      },
      quiz: {
        passingScore: 2,
        questions: [
          {
            id: 1,
            prompt:
              'A group uses consent decision-making. A member says she would personally prefer a different venue for the annual event, but cannot name any way the proposed venue would harm the group\u2019s goals. What should happen?',
            options: [
              'The proposal is blocked until she agrees',
              'The proposal proceeds, because a personal preference is not a reasoned objection',
              'The group switches to a majority vote',
              'The chair decides alone',
            ],
            correctIndex: 1,
            feedback:
              'Consent only stops a proposal when someone shows it would harm the group\u2019s purpose. Blocking it would treat consent as full consensus.',
          },
          {
            id: 2,
            prompt:
              'A fishing cooperative gives a warning for a first rule violation, a fine for the second, and a temporary suspension for the third. Which of Ostrom\u2019s principles is this?',
            options: ['Clear membership', 'Graduated sanctions', 'Members help make the rules', 'Accessible conflict resolution'],
            correctIndex: 1,
            feedback:
              'Graduated sanctions start mild and increase with repeated violations, enforcing rules while keeping members in the community.',
          },
          {
            id: 3,
            prompt: 'Why should irreversible decisions get more time and evidence than reversible ones?',
            options: [
              'Irreversible decisions are always more expensive',
              'A mistake in a reversible decision can be corrected later, while an irreversible one cannot be undone',
              'Reversible decisions do not matter',
              'Groups should never make irreversible decisions',
            ],
            correctIndex: 1,
            feedback:
              'The cost of being wrong is much higher when you cannot change course, so it is worth slowing down.',
          },
        ],
      },
      reflection:
        'Think about a group decision you disagreed with. Did the process make it easier or harder for you to accept the outcome?',
    },

    'module-9': {
      number: 'Module 9',
      route: 'module-9',
      title: 'Project Stewardship & Execution',
      status: 'Available',
      estimatedTime: 'About 2\u20133 hours, including the activity and dilemma',
      welcomeFilm: WELCOME_FILM,
      goals: [
        'How to turn a community idea into a project with clear goals, milestones and roles.',
        'How to track progress openly, so everyone can see what is done and what is stuck.',
        'What to do when a project falls behind: cut scope, add resources, or change the deadline.',
      ],
      watch: {
        title: 'Intro to Project Management (Google Career Certificates)',
        beforeYouWatch:
          'This short video is the opening lesson of Google\u2019s Project Management Certificate. It runs about 7 minutes and 33 seconds. It is designed for professional careers, but the basics apply to any community project, from a clean-up day to a fundraising drive.',
        linkLabel: 'Watch on YouTube',
        url: 'https://www.youtube.com/watch?v=rck3MnC7OXA',
        notice: [
          'How does the video define a "project," as opposed to ongoing work?',
          'Which skills described would matter most in a volunteer group?',
          'What would change when your team members are volunteers rather than paid staff?',
        ],
      },
      lessonSections: [
        {
          heading: 'What makes something a project',
          paragraphs: [
            'A project has a clear goal, a start and an end, and limited resources. A youth group\u2019s monthly meeting is ongoing work. Building a community library shelf by June is a project. Naming the difference helps, because projects need planning in a way routines do not.',
          ],
        },
        {
          heading: 'Start with a clear goal',
          paragraphs: [
            'Vague goals ("improve the neighborhood") cannot be finished. A good project goal is specific and checkable: "Build ten raised garden beds and plant them before March 15." Everyone should be able to tell whether it happened.',
          ],
          pauseAndThink: 'Rewrite a vague goal from your own life or group as a specific, checkable one.',
        },
        {
          heading: 'Break it into milestones',
          paragraphs: [
            'A milestone is a checkpoint that shows real progress: "Materials purchased," "Five beds built," "Soil delivered." Milestones turn a big goal into steps people can see and celebrate. Work backward from the deadline to set dates for each one.',
          ],
        },
        {
          heading: 'Assign clear roles',
          paragraphs: [
            'Many community projects fail because "everyone" was responsible, which means no one was. For each task, decide who does it, who decides if there is a question, and who needs to be kept informed. One person should own each task, even if many people help.',
          ],
        },
        {
          heading: 'Track progress openly, and the project triangle',
          paragraphs: [
            'A simple shared board, on paper, a chat group or a free online tool, with three columns: To Do, In Progress, Done. When progress is visible, problems surface early, volunteers see their contribution, and no one has to chase updates. This is transparency in practice, the same principle as open records in a savings group.',
            'Every project balances three things: scope, how much you are delivering; time, when it must be done; and resources, money, people and materials. When a project falls behind, at least one must change. You can reduce scope, add resources, or move the deadline. Pretending none needs to change is how projects fail quietly.',
          ],
        },
        {
          heading: 'Stewardship',
          paragraphs: [
            'A steward cares for something on behalf of others. In a community project, that means using other people\u2019s money and time with care, reporting honestly, and finishing what you promised, or explaining clearly why the plan changed. Finished projects build trust for the next one.',
          ],
          pauseAndThink: 'Think of a community project you saw fail or stall. Which side of the triangle broke first?',
        },
      ],
      workedExample: {
        title: 'A youth clean-up day',
        paragraphs: [
          'Goal: clear rubbish from a 1-kilometer stretch of riverbank with 40 volunteers on Saturday, 14 June.',
        ],
        table: {
          columns: ['Milestone', 'Owner', 'Due'],
          rows: [
            ['Permission from local council', 'Faith', '20 May'],
            ['40 volunteers signed up', 'Kwame', '1 June'],
            ['Gloves, bags and water secured', 'Liam', '7 June'],
            ['Waste collection arranged', 'Faith', '10 June'],
            ['Clean-up day held, photos and report shared', 'Whole team', '14 to 16 June'],
          ],
        },
        conclusion: [
          'On 1 June only 22 volunteers had signed up. The team chose to reduce scope to 600 meters instead of moving the date, kept the event on schedule, and made the remaining stretch the target for a second clean-up in July.',
        ],
      },
      tryIt: {
        intro: 'Pick a small project you could complete in the next month.',
        steps: [
          'Write one specific goal.',
          'Write four milestones with dates, and an owner for each.',
          'Write what you would cut first if you fell behind.',
        ],
      },
      whereYouLive: [
        'Find one community project near you that is underway or recently finished. If you can, ask the person leading it what their biggest obstacle was and how they handled it.',
      ],
      dilemma: {
        title: 'The Westview Community Garden, Atlanta, USA',
        location: 'Atlanta, United States',
        paragraphs: [
          'Denise, 31, coordinates a volunteer project to turn an empty lot in her Atlanta neighborhood into a community garden. The city awarded the project an $8,000 grant. The condition: twenty raised beds built and planted by March 15, or the grant must be partly repaid.',
          'It is now February 1. Eight of twenty beds are built. Seventy percent of the budget has been spent, partly because lumber prices rose. Volunteer turnout has dropped from 25 people to about 8 each weekend. Marcus, a founding volunteer, holds the only keys to the tool shed and has not responded to messages in two weeks. And a local landscaping company has offered to build the remaining beds for $1,800, which would use nearly all the money left.',
          'Some volunteers want Denise to ask the city for an extension. Others say the city will not trust them again if they ask. One neighbor suggests building only fifteen beds and explaining why.',
        ],
        prompt:
          'Using the project triangle, lay out Denise\u2019s options for scope, time and resources, with their trade-offs. Take a clear position on her plan for the next six weeks: what she does about Marcus and the keys, how she rebuilds volunteer turnout, and what she tells the city and when. Use the concepts of milestones, clear ownership and open tracking. Reply to a classmate who chose differently and test whether their plan still works if only five volunteers show up each weekend.',
      },
      quiz: {
        passingScore: 2,
        questions: [
          {
            id: 1,
            prompt: 'Which is the best example of a project goal?',
            options: [
              '"Help the community be greener"',
              '"Build and plant twenty raised beds by March 15"',
              '"Have more garden meetings"',
              '"Make the neighborhood nicer"',
            ],
            correctIndex: 1,
            feedback:
              'It is specific and checkable, with a clear finish line and deadline. The others can never be clearly finished.',
          },
          {
            id: 2,
            prompt: 'A project is falling behind schedule. According to the project triangle, what must happen?',
            options: [
              'Nothing; work harder and hope',
              'At least one of scope, time or resources has to change',
              'The project should be cancelled',
              'The coordinator should do the remaining work alone',
            ],
            correctIndex: 1,
            feedback:
              'Scope, time and resources are linked, so when one is under pressure, another must adjust. Ignoring that leads to quiet failure.',
          },
          {
            id: 3,
            prompt: 'Why should every task have one clear owner, even when many people help?',
            options: [
              'So that person can be blamed if it fails',
              'When everyone is responsible, no one is, and tasks slip through the cracks',
              'Because volunteers prefer to work alone',
              'Ownership is not important in community projects',
            ],
            correctIndex: 1,
            feedback:
              'A named owner makes sure someone is watching the task and will raise a problem early. It is about follow-through, not blame.',
          },
        ],
      },
      reflection:
        'What is one project you started and never finished? Using this module, what would you do differently if you started it again?',
    },
  },
};

/**
 * Resolve the full module content for a (courseSlug, moduleRoute) pair.
 * Returns null when no match exists so the calling backend function can
 * respond 404. The returned object includes the concept-check answer key and
 * must only be sent to a request that has passed the server-side access
 * checks in getWealthModule.
 */
export function getWealthModuleContent(courseSlug, moduleRoute) {
  const course = WEALTH_MODULE_CONTENT[courseSlug];
  if (!course) return null;
  const module = course[moduleRoute];
  return module || null;
}

/**
 * The three capstone options, with their numbered required sections. Kept
 * server-side so the submitted work can be validated against the option the
 * learner chose rather than trusting a browser-supplied section list.
 */
export const WEALTH_CAPSTONE_OPTIONS = {
  personal_money_plan: {
    label: 'Personal Money Plan',
    buildsOn: 'Builds on Modules 1 to 3',
    summary: 'A plan for your own household.',
    sections: [
      { id: 'cash_flow', label: 'Monthly cash flow', helper: 'Your current monthly cash flow, from at least four weeks of tracking.' },
      { id: 'runway', label: 'Strict and realistic runway', helper: 'Your strict and realistic runway, and a target runway with a date.' },
      { id: 'obligations', label: 'Plan for family and community obligations', helper: 'A fixed plan for family and community obligations.' },
      { id: 'debts', label: 'Debts and the productive capital test', helper: 'A list of your debts, each tested against the productive capital test, with a plan for each.' },
      { id: 'collective', label: 'Savings circle or collective structure', helper: 'One savings circle or collective structure you will join, start or strengthen, and the safeguards you will insist on.' },
    ],
  },
  enterprise_plan: {
    label: 'One-Page Enterprise Plan',
    buildsOn: 'Builds on Modules 4 to 6',
    summary: 'A plan for a business you run or want to start.',
    sections: [
      { id: 'problem', label: 'The problem you solve', helper: 'The problem you solve, with evidence from at least five past-focused interviews.' },
      { id: 'validation', label: 'Validation test and results', helper: 'Your validation test and its results, including commitment signals.' },
      { id: 'unit_economics', label: 'Unit economics', helper: 'Your unit economics: price, variable cost, margin, fixed costs including your own pay, and break-even.' },
      { id: 'pooling', label: 'A cost you could pool', helper: 'One cost you could pool, and with whom.' },
      { id: 'cash_forecast', label: 'Twelve-week cash forecast', helper: 'A twelve-week cash forecast, with your lowest-cash week marked and a plan for it.' },
    ],
  },
  group_charter: {
    label: 'Group Financial Charter',
    buildsOn: 'Builds on Modules 7 to 9',
    summary: 'A governing document for a real or planned group.',
    sections: [
      { id: 'purpose_membership', label: 'Purpose and membership rules', helper: 'The group\u2019s purpose and membership rules.' },
      { id: 'roles_terms', label: 'Roles and terms of office', helper: 'Roles, terms of office, and how leaders are chosen and replaced.' },
      { id: 'decision_rules', label: 'Decision rules', helper: 'Decision rules: which method for which kind of decision.' },
      { id: 'money_rules', label: 'Money rules', helper: 'Money rules: signatories, records and reporting schedule.' },
      { id: 'sanctions_repair', label: 'Sanctions and restorative process', helper: 'Graduated sanctions and a restorative process for when things go wrong.' },
      { id: 'first_project', label: 'A first project', helper: 'A first project with a specific goal, milestones and owners.' },
    ],
  },
};

/** The numbered section list for a capstone option, or null when unknown. */
export function getWealthCapstoneOption(formatId) {
  return WEALTH_CAPSTONE_OPTIONS[formatId] || null;
}