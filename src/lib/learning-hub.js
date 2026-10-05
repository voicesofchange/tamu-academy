/**
 * Content for the Learner Hub.
 *
 * The hub is the participant's starting point: what each course sets out to
 * teach, how to work through it, and a summary of every course and module that
 * can be carried away for offline study.
 *
 * Course objectives and module summaries are read from the same public track
 * files that every course page uses, so the hub can never drift from the
 * courses it describes. Only the handbook (the practical guidance) is authored
 * here. Nothing in this file exposes protected curriculum: objectives,
 * descriptions and titles are exactly the published preview metadata.
 */
import { LEARNER_COURSES } from './learner-progress';

const SITE_URL = 'https://tamuacademy.org';

/** Practical guidance on using the courses, progress and certificates. */
export const HUB_HANDBOOK = [
  {
    title: 'Choose where to start',
    body: 'Every course is open and self-paced, and none of them assumes you have studied the subject before. If you are not sure which to begin with, pick the one whose opening question you would most like answered.',
  },
  {
    title: 'How a module works',
    body: 'A module opens with a short lesson and its key ideas, moves through a case or a set of sources, and closes with a knowledge check and a reflection. Work through it in one sitting or in several: your place is saved as you go.',
  },
  {
    title: 'Save your place',
    body: 'Progress is recorded module by module against your account, so you can leave and return without losing your work. My Progress shows exactly where you stopped and what comes next.',
  },
  {
    title: 'Your certificates',
    body: 'Each course issues its own certificate once every module is complete and any extra requirement is met. Set the name you want printed in your profile before you finish, and your certificate can be printed or kept on your device.',
  },
  {
    title: 'Studying on a slow connection',
    body: 'Switch on Data-Saver from the top of any page. Pages then render as text in a system font with decorative media removed, and a recording loads only when you press play. Printable material is available for offline study.',
  },
  {
    title: 'The companion guide',
    body: "Safari ya Utu is a private workbook you can work through alongside any course, or on its own. Its answers stay with you, and no one else reads them.",
  },
  {
    title: 'When something is unclear',
    body: 'The Tamu Guide on each page answers questions about the courses and where to find things. For anything about your account, a certificate or a partnership, use the contact page and a person will reply.',
  },
];

const COURSE_FACT_LABELS = { level: 'Level', format: 'Format', estimatedCompletion: 'Time' };

/** One course's objectives, keyed for both the page and the download. */
export function courseObjectives() {
  return LEARNER_COURSES.map((course) => ({
    slug: course.slug,
    title: course.title,
    subtitle: course.subtitle,
    facts: Object.entries(COURSE_FACT_LABELS)
      .map(([field, label]) => ({ label, value: course[field] }))
      .filter((fact) => Boolean(fact.value)),
    whoThisCourseIsFor: course.whoThisCourseIsFor,
    learningOutcomes: course.learningOutcomes || [],
    learningPath: course.learningPath || [],
  }));
}

/** One course's module summaries. */
export function courseSummaries() {
  return LEARNER_COURSES.map((course) => ({
    slug: course.slug,
    title: course.title,
    subtitle: course.subtitle,
    modulesCount: course.modulesCount,
    courseUrl: `${SITE_URL}/courses/${course.slug}`,
    modules: (course.modules || []).map((module) => ({
      number: module.number,
      title: module.title,
      description: module.description,
      estimatedTime: module.estimatedTime,
    })),
    milestone: course.milestone
      ? { title: course.milestone.title, description: course.milestone.description }
      : null,
  }));
}

/** Plain-text file contents, assembled from the same data the page renders. */
export function objectivesText() {
  const lines = [
    'Tamu Academy',
    'Course objectives — the Learner Hub',
    `For the full courses: ${SITE_URL}/courses`,
    '',
  ];
  for (const course of courseObjectives()) {
    lines.push(course.title, '-'.repeat(course.title.length), course.subtitle, '');
    for (const fact of course.facts) lines.push(`${fact.label}: ${fact.value}`);
    lines.push('');
    if (course.whoThisCourseIsFor) {
      lines.push('Who it is for', course.whoThisCourseIsFor, '');
    }
    if (course.learningOutcomes.length > 0) {
      lines.push('What you will be able to do');
      for (const outcome of course.learningOutcomes) lines.push(`- ${outcome}`);
      lines.push('');
    }
    if (course.learningPath.length > 0) {
      lines.push(`Learning path: ${course.learningPath.join(' → ')}`, '');
    }
    lines.push('');
  }
  return lines.join('\n');
}

export function summariesText() {
  const lines = [
    'Tamu Academy',
    'Course and module summaries — for offline study',
    `For the full courses: ${SITE_URL}/courses`,
    '',
  ];
  for (const course of courseSummaries()) {
    lines.push(course.title, '-'.repeat(course.title.length), course.subtitle, '');
    for (const module of course.modules) {
      lines.push(`${module.number}: ${module.title}`);
      if (module.description) lines.push(`  ${module.description}`);
      if (module.estimatedTime) lines.push(`  Time: ${module.estimatedTime}`);
      lines.push('');
    }
    if (course.milestone) {
      lines.push(`Applied milestone — ${course.milestone.title}`);
      if (course.milestone.description) lines.push(`  ${course.milestone.description}`);
      lines.push('');
    }
    lines.push('');
  }
  return lines.join('\n');
}

export function handbookText() {
  const lines = [
    'Tamu Academy',
    "Learner's handbook — how to work through the courses",
    `${SITE_URL}/learning-hub`,
    '',
  ];
  for (const item of HUB_HANDBOOK) {
    lines.push(item.title, `${item.body}`, '');
  }
  return lines.join('\n');
}

/** Save a piece of the hub to the learner's device as a plain-text file. */
export function downloadTextFile(filename, text) {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}