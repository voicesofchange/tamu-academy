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