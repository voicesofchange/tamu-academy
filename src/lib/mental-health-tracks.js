/**
 * MENTAL HEALTH PILLAR — PUBLIC course preview metadata.
 *==========================================================================
 * Hierarchy:
 *   Learning Area (People & Prosperity)
 *     → Course (Mental Health, Community and Culture)
 *       → Module 1 .. Module 7 (preview only)
 *
 * SECURITY / TRUST BOUNDARY
 * -------------------------
 * This file is bundled into the public browser JavaScript and therefore
 * contains ONLY course and module preview metadata that is safe to
 * expose publicly (title, short description, status, completion-time
 * estimate, route, publication status, prerequisite route). The full
 * in-development module content — recorded lesson links, written
 * explanation, case study, watching questions, applied activity
 * instructions, knowledge check questions, answer keys, reflection
 * prompts, completion requirements, closing text, and source
 * references — has NOT been added to a public file. It will live
 * server-side-only in base44/shared/mental-health-curriculum.js
 * (already provisioned and carrying the canonical enrollmentOpen
 * flag, module publication status, prerequisite chain, and per-module
 * section allow-list) and be released to a viewer only through the
 * role-gated `getMentalHealthModule` backend function.
 *
 * Never store or expose through this file: quiz answer keys, private
 * reflections, Care Map responses, diagnoses, trauma narratives, or
 * any mental health information.
 *
 * Source: Module titles and estimated times come from the editorial
 * correction pass (Phase 1 correction prompt). Short descriptions are
 * inferred from the blueprint media placements and Core Course
 * Learning Outcomes; they remain revisable.
 *
 * Phase 1 status:
 *   Module 1    — "In Development"   (route opens to admin shell preview)
 *   Modules 2–7 — "Coming Soon"       (route opens to admin shell preview)
 *
 * This file is intentionally additive — it does not import from or write
 * to the Economics and Development metadata in economics-tracks.js.
 */

export const MENTAL_HEALTH_LEARNING_AREA = 'People & Prosperity';

export const MENTAL_HEALTH_COURSE_SLUG = 'mental-health-community-and-culture';

export const MENTAL_HEALTH_COURSE = {
  slug: MENTAL_HEALTH_COURSE_SLUG,
  title: 'Mental Health, Community and Culture',
  subtitle:
    'A seven-module course exploring relational personhood, mental health, community care, and collective healing across African and diaspora communities.',
  learningArea: 'People & Prosperity',
  status: 'In Development',
  access: 'Coming Soon',
  certificate: 'Planned (not yet active)',
  modulesCount: 7,
  estimatedCompletion: 'Approximately 10–13 hours total (across seven connected modules)',
  format: 'Self-paced with private reflection',
  level: 'Foundational',
  description:
    'Mental Health, Community and Culture is a seven-module, culturally affirming course that explores how relational philosophies such as Ubuntu shape ideas of personhood, wellbeing, responsibility, and care, and how stress, stigma, family expectations, migration, racism, conflict, and inequality shape mental health experiences.',
  descriptionLong: [
    'Mental Health, Community and Culture explores how relational philosophies such as Ubuntu shape ideas of personhood, wellbeing, responsibility, and care.',
    'Across seven connected modules, the course introduces how stress, stigma, family expectations, migration, racism, conflict, and inequality shape mental health experiences in African and diaspora communities.',
    'Learners compare community-led, spiritual, digital, peer, and professional approaches without treating them as mutually exclusive, and evaluate whether mental health programs and messages are culturally affirming, youth-centered, safe, and connected to real care pathways.',
    'The course culminates in a small learner-designed initiative in mental health education, storytelling, advocacy, or community support.',
  ],
  whoThisCourseIsFor:
    'Students, young adults, educators, community leaders, peer supporters, and learners exploring culturally grounded approaches to mental health, community care, and collective healing. No clinical background is required.',
  learningOutcomes: [
    'Explain how relational philosophies such as Ubuntu shape ideas of personhood, wellbeing, responsibility, and care.',
    'Analyze how stress, stigma, gender expectations, family scripts, migration, racism, conflict, and inequality shape mental health experiences.',
    'Compare community-led, spiritual, digital, peer, and professional approaches without treating them as mutually exclusive.',
    'Evaluate whether a mental health program or message is culturally affirming, youth-centered, safe, and connected to real care pathways.',
    'Design a small mental health education, storytelling, advocacy, or community-support initiative for a specific context.',
  ],
  learningPath: [
    'Communal Wellness',
    'Stress and Stigma',
    'Family and Culture',
    'Community Healing in Practice',
    'Faith, Tradition, and Clinical Care',
    'Culturally Affirming Systems',
    'Roots of Resilience',
  ],
  // Module preview metadata only. The full in-development module content
  // is server-side-only — see the doc comment at the top of this file.
  // Fields below (including publicationStatus and prerequisite) ARE the
  // full set permitted to live in the public browser bundle.
  modules: [
    {
      number: 'Module 1',
      route: 'module-1',
      title: 'Ubuntu and Communal Wellness: African Philosophies of Mental Health',
      description:
        'Introduces Ubuntu as a relational southern African philosophy and its significance for personhood, wellbeing, responsibility, and care.',
      status: 'In Development',
      publicationStatus: 'unpublished',
      estimatedTime: '50 to 65 minutes',
      prerequisite: null,
    },
    {
      number: 'Module 2',
      route: 'module-2',
      title: 'Stress, Stigma, and Strength: Rethinking Mental Health Narratives in African and Diaspora Communities',
      description:
        'Examines how stress, stigma, masculinity, family expectations, migration, and structural conditions such as inequality and racism shape mental health experiences.',
      status: 'Coming Soon',
      publicationStatus: 'unpublished',
      estimatedTime: '60 to 75 minutes',
      prerequisite: 'module-1',
    },
    {
      number: 'Module 3',
      route: 'module-3',
      title: 'Family Expectations and Cultural Scripts: Talking About Mental Health at Home',
      description:
        'Examines how family expectations and cultural scripts shape conversations about mental health at home and how learners can hold respectful, culturally grounded discussions.',
      status: 'Coming Soon',
      publicationStatus: 'unpublished',
      estimatedTime: '65 to 80 minutes',
      prerequisite: 'module-2',
    },
    {
      number: 'Module 4',
      route: 'module-4',
      title: 'Community Healing in Practice: Friendship Bench, StrongMinds, and Brother Be Well',
      description:
        'Explores task-sharing and community-based models that involve lay health workers, peer supporters, and community organizations in delivering mental health care.',
      status: 'Coming Soon',
      publicationStatus: 'unpublished',
      estimatedTime: '85 to 100 minutes',
      prerequisite: 'module-3',
    },
    {
      number: 'Module 5',
      route: 'module-5',
      title: 'Faith, Tradition, and Professional Care: Bridging Spiritual Supports and Clinical Pathways',
      description:
        'Examines how faith, tradition, and professional clinical care can work together rather than in opposition, with attention to safe referral and complementary support.',
      status: 'Coming Soon',
      publicationStatus: 'unpublished',
      estimatedTime: '95 to 115 minutes',
      prerequisite: 'module-4',
    },
    {
      number: 'Module 6',
      route: 'module-6',
      title: 'Building Culturally Affirming Systems: Policy, Media, and Youth Advocacy for Global Mental Health',
      description:
        'Examines how policy, media, and youth advocacy can build culturally affirming systems for global mental health.',
      status: 'Coming Soon',
      publicationStatus: 'unpublished',
      estimatedTime: '105 to 125 minutes',
      prerequisite: 'module-5',
    },
    {
      number: 'Module 7',
      route: 'module-7',
      title: 'Roots of Resilience: Storytelling, Survival, and Collective Healing',
      description:
        'Brings the course together through Roots of Resilience, integrating survival, storytelling, and collective healing across three linked sessions.',
      status: 'Coming Soon',
      publicationStatus: 'unpublished',
      estimatedTime: '150 to 180 minutes across three linked sessions',
      prerequisite: 'module-6',
    },
  ],
  milestone: {
    title: 'Applied Mental Health Education or Community Initiative',
    description:
      'In the eventual verified course, learners will design a small mental health education, storytelling, advocacy, or community-support initiative for a specific context. The submission system is not yet active.',
    status: 'Planned applied milestone (not yet active)',
  },
};

export function getMentalHealthCourse() {
  return MENTAL_HEALTH_COURSE;
}

export function getMentalHealthModule(courseSlug, moduleRoute) {
  if (courseSlug !== MENTAL_HEALTH_COURSE_SLUG) return null;
  const module = MENTAL_HEALTH_COURSE.modules.find((m) => m.route === moduleRoute);
  if (!module) return null;
  return { course: MENTAL_HEALTH_COURSE, module };
}