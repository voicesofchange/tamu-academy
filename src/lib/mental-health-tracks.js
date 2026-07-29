/**
 * MENTAL HEALTH PILLAR — PUBLIC course preview metadata.
 *
 * Hierarchy:
 *   Learning Area (People & Prosperity)
 *     → Course (Ubuntu and Mental Health)
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
 * (already provisioned but intentionally empty in Phase 1) and be
 * released to a viewer only through the role-gated
 * `getMentalHealthModule` backend function.
 *
 * NEVER store or expose through this file: quiz answer keys, private
 * reflections, Care Map responses, diagnoses, trauma narratives, or
 * any mental health information.
 *
 * Source: Module titles and short descriptions are INFERRED from the
 * approved blueprint (Tamu-Academy-Mental-Health-Course-Blueprint.docx)
 * media placements and Core Course Learning Outcomes. They are subject
 * to editorial revision and are not yet final published module content.
 * Directly-sourced fields (course title, learning outcomes, sequence,
 * service delivery model) come from the blueprint. Inferred fields are
 * module titles and short descriptions and estimated times — clearly
 * flagged in editorial notes and revisable in Phase 2.
 *
 * Phase 1 status:
 *   Module 1    — "In Development"   (route opens to admin shell preview)
 *   Modules 2–7 — "Coming Soon"       (route opens to admin shell preview)
 *
 * This file is intentionally additive — it does not import from or write
 * to the Economics and Development metadata in economics-tracks.js.
 */

export const MENTAL_HEALTH_LEARNING_AREA = 'People & Prosperity';

export const MENTAL_HEALTH_COURSE_SLUG = 'ubuntu-and-mental-health';

export const MENTAL_HEALTH_COURSE = {
  slug: MENTAL_HEALTH_COURSE_SLUG,
  title: 'Ubuntu and Mental Health: Community, Culture, and Collective Healing',
  subtitle:
    'A seven-module course exploring relational personhood, mental health, community care, and collective healing across African and diaspora contexts.',
  learningArea: 'People & Prosperity',
  status: 'In Development',
  access: 'Coming Soon',
  certificate: 'Planned (not yet active)',
  modulesCount: 7,
  estimatedCompletion: 'Approximately 5–7 hours total (across seven short modules)',
  format: 'Self-paced with private reflection',
  level: 'Foundational',
  description:
    'Ubuntu and Mental Health: Community, Culture, and Collective Healing is a seven-module, culturally affirming course that explores how relational philosophies such as Ubuntu shape ideas of personhood, wellbeing, responsibility, and care, and how stress, stigma, family expectations, migration, racism, conflict, and inequality shape mental health experiences.',
  descriptionLong: [
    'Ubuntu and Mental Health explores how relational philosophies such as Ubuntu shape ideas of personhood, wellbeing, responsibility, and care.',
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
    'Relational Personhood',
    'Stress and Stigma',
    'Comparing Approaches',
    'Community Care Models',
    'Program Evaluation',
    'Youth, Racism, and Systems',
    'Resilience and Action',
  ],
  // Module preview metadata only. The full in-development module content
  // is server-side-only — see the doc comment at the top of this file.
  // Fields below (including publicationStatus and prerequisite) ARE the
  // full set permitted to live in the public browser bundle.
  modules: [
    {
      number: 'Module 1',
      route: 'module-1',
      title: 'Ubuntu and Relational Personhood',
      description:
        'Introduces Ubuntu as a relational southern African philosophy and its significance for personhood, wellbeing, responsibility, and care.',
      status: 'In Development',
      publicationStatus: 'unpublished',
      estimatedTime: 'Approximately 45–60 minutes',
      prerequisite: null,
    },
    {
      number: 'Module 2',
      route: 'module-2',
      title: 'Stress, Stigma, and Structural Conditions',
      description:
        'Examines how stress, stigma, masculinity, family expectations, migration, and structural conditions such as inequality and racism shape mental health experiences.',
      status: 'Coming Soon',
      publicationStatus: 'unpublished',
      estimatedTime: 'Approximately 45–60 minutes',
      prerequisite: 'module-1',
    },
    {
      number: 'Module 3',
      route: 'module-3',
      title: 'Comparing Approaches to Care',
      description:
        'Compares community-led, spiritual, digital, peer, and professional approaches and explores how they can work together rather than in competition.',
      status: 'Coming Soon',
      publicationStatus: 'unpublished',
      estimatedTime: 'Approximately 45–60 minutes',
      prerequisite: 'module-2',
    },
    {
      number: 'Module 4',
      route: 'module-4',
      title: 'Community Involvement in Mental Health Care',
      description:
        'Explores task-sharing and community-based models that involve lay health workers, peer supporters, and community organizations in delivering mental health care.',
      status: 'Coming Soon',
      publicationStatus: 'unpublished',
      estimatedTime: 'Approximately 45–60 minutes',
      prerequisite: 'module-3',
    },
    {
      number: 'Module 5',
      route: 'module-5',
      title: 'Evaluating Culturally Affirming Programs',
      description:
        'Develops a practical method for assessing whether a mental health program, message, or initiative is culturally affirming, youth-centered, safe, and connected to real care pathways.',
      status: 'Coming Soon',
      publicationStatus: 'unpublished',
      estimatedTime: 'Approximately 45–60 minutes',
      prerequisite: 'module-4',
    },
    {
      number: 'Module 6',
      route: 'module-6',
      title: 'Youth, Racism, and Health Systems',
      description:
        'Examines youth mental health, how racism and discrimination shape physical and mental health outcomes, and African system-strengthening responses.',
      status: 'Coming Soon',
      publicationStatus: 'unpublished',
      estimatedTime: 'Approximately 45–60 minutes',
      prerequisite: 'module-5',
    },
    {
      number: 'Module 7',
      route: 'module-7',
      title: 'Roots of Resilience: Recovery, Collective Healing, and Action',
      description:
        'Brings the course together through Roots of Resilience, integrating recovery, collective healing, and the design of small community-led or educational initiatives.',
      status: 'Coming Soon',
      publicationStatus: 'unpublished',
      estimatedTime: 'Approximately 60–75 minutes',
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