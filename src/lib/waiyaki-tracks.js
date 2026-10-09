/**
 * Public-facing preview metadata for the Waiyaki wa Hinga: Leadership,
 * Resistance and Historical Memory course.
 *
 * SECURITY / TRUST BOUNDARY
 * -------------------------
 * This file is bundled into the public browser JavaScript and therefore must
 * contain ONLY preview metadata that is safe to expose publicly: course and
 * module titles, short descriptions, statuses, and completion-time estimates.
 * The full module narrative, key terms, source-analysis exercises, reflection
 * prompts, the final assessment and its answer key, and the project options
 * live server-side-only in base44/shared/waiyaki-curriculum.js. They are
 * released to a learner only through the access-gated getWaiyakiModule and
 * getWaiyakiAssessment backend functions.
 */

export const WAIYAKI_COURSE_SLUG = 'waiyaki-wa-hinga';

export const WAIYAKI_COURSE = {
  slug: WAIYAKI_COURSE_SLUG,
  title: 'Waiyaki wa Hinga: Leadership, Resistance and Historical Memory',
  status: 'Available now',
  subtitle:
    'A five-module research and memory course on a nineteenth-century Kikuyu leader, the beginnings of colonial rule in Kenya, and the long argument over what his life means.',
  pillar: 'Heritage and Leadership Collection',
  track: 'African History, Leadership and Memory',
  level: 'Research-based',
  format: 'Self-paced, with a final assessment and a written project',
  modulesCount: 5,
  estimatedCompletion: 'Approximately 4\u20135 hours',
  certificate: 'Available upon completion',
  access: 'Open',
  description:
    'Waiyaki wa Hinga was a nineteenth-century Kikuyu leader at Dagoretti\u2013Kabete. In 1890 he made a pact of blood brotherhood with an agent of the Imperial British East Africa Company; two years later he was wounded, arrested and deported, and he died in company custody at Kibwezi. This course examines his life, the record that survives of it, and the century-long argument over how to remember him.',
  descriptionLong: [
    'This course begins from a single observation: the facts of Waiyaki wa Hinga\u2019s life fit on one page, but their meaning has taken more than a century to unfold. He was a wealthy and respected leader on the southern Kikuyu frontier, a trading elder whose country was the caravans\u2019 Cape Town. He governed through council and persuasion, not command. He made an alliance with an agent of a chartered company, watched it collapse, and died a prisoner of that company roughly 250 km from home.',
    'History of this period comes from two very different kinds of source: written records kept mostly by colonial officials, and oral traditions kept by Kikuyu families and communities. Neither is automatically right. Across five modules, every claim is labelled \u2014 DOCUMENTED, TRADITION or CONTESTED \u2014 and the course teaches you to weigh them rather than choose a side.',
    'The course is taught from the Kikuyu frontier and written for learners anywhere. It assumes no prior knowledge of Kenyan history. Local terms such as m\u0169thamaki, kiama, mbari, githaka and muhoi are introduced and explained plainly on first use, and Kiswahili and G\u0129k\u0169y\u0169 words carry their English meaning as they appear.',
    'Each module combines a short narrative, key terms, primary-source moments and questions for reflection. Alongside the five modules, the course holds a source-criticism guide, a five-question final assessment and a choice of four final projects. Learners who complete all five modules, pass the assessment and submit a written project receive a certificate of completion.',
  ],
  whoThisCourseIsFor:
    'This course is for learners in Kenya, in the diaspora, and anywhere in the world who want to study African history from African sources as well as colonial records.\n\nIt suits secondary and university students, teachers and curriculum developers, community historians and family researchers, museum and heritage practitioners, and anyone who has driven along Waiyaki Way and wondered who it is named for.\n\nNo previous history training is required. What the course asks for is patience with evidence: the willingness to hold a written record and a family tradition side by side and ask what each one can and cannot tell you.',
  learningOutcomes: [
    'Summarise the main events of Waiyaki wa Hinga\u2019s life, alliance, arrest and death.',
    'Apply source-criticism questions to colonial records and to oral tradition, and explain why they are separated.',
    'Describe how authority actually worked in pre-colonial Kikuyu society, and why \u201cchief\u201d is the wrong word.',
    'Explain how land was held, granted and understood on the Kikuyu\u2013Maasai frontier, and why the 1890 agreement was read two different ways.',
    'Compare the colonial and the oral accounts of Waiyaki\u2019s death, and say what would be needed to resolve them.',
    'Evaluate how family, historians, literature and the state have remembered Waiyaki, and why his story remains unfinished.',
  ],
  learningPath: [
    'Who Was Waiyaki wa Hinga?',
    'Land, People and Power',
    'From Alliance to Arrest',
    'Kibwezi: Two Stories of One Death',
    'Memory, Family and a Nation',
  ],
  modules: [
    {
      number: 'Module 1',
      route: 'module-1',
      title: 'Who Was Waiyaki wa Hinga?',
      description:
        'The story in brief, key terms, and a source-criticism guide for weighing company records against oral tradition.',
      status: 'Available now',
      estimatedTime: '35\u201345 minutes',
    },
    {
      number: 'Module 2',
      route: 'module-2',
      title: 'Land, People and Power',
      description:
        'A name with two worlds, a society governed without kings, and Kabete as the caravans\u2019 Cape Town.',
      status: 'Available now',
      estimatedTime: '40\u201350 minutes',
    },
    {
      number: 'Module 3',
      route: 'module-3',
      title: 'From Alliance to Arrest',
      description:
        'Blood brotherhood in 1890, the collapse of the alliance in 1891, and the row at Fort Smith in August 1892.',
      status: 'Available now',
      estimatedTime: '45\u201360 minutes',
    },
    {
      number: 'Module 4',
      route: 'module-4',
      title: 'Kibwezi: Two Stories of One Death',
      description:
        'The colonial record, the oral tradition, the searches for the grave, and a president\u2019s retelling.',
      status: 'Available now',
      estimatedTime: '40\u201350 minutes',
    },
    {
      number: 'Module 5',
      route: 'module-5',
      title: 'Memory, Family and a Nation',
      description:
        'The House of Hinga, three ways of seeing Waiyaki, and why his story remains unfinished.',
      status: 'Available now',
      estimatedTime: '45\u201355 minutes',
    },
  ],
  milestone: {
    title: 'The Final Assessment and Your Written Project',
    description:
      'The course closes with two pieces of work. First a five-question assessment drawn from the guide\u2019s course review, which you pass with four answers correct. Then one written final project, chosen from four options, submitted to your own account.',
    analysisPoints: [
      'A five-question final assessment, graded on the server',
      'A memory map of the places in the story',
      'An oral history interview compared with written sources',
      'A monument proposal that handles contested evidence',
      'A comparative essay (800\u20131,200 words) on another early resister',
    ],
    status: 'Completed in the course completion room',
  },
};

/**
 * Retrieve a module's PUBLIC PREVIEW metadata by route. Returns null when no
 * match exists. The full module content is fetched separately through the
 * access-gated getWaiyakiModule backend function.
 */
export function getWaiyakiModulePreview(moduleRoute) {
  const module = WAIYAKI_COURSE.modules.find((m) => m.route === moduleRoute);
  if (!module) return null;
  return { course: WAIYAKI_COURSE, module };
}

export function getWaiyakiFirstModuleRoute() {
  return WAIYAKI_COURSE.modules[0].route;
}