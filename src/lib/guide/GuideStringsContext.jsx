import React, { createContext, useContext, useMemo } from 'react';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';
import { FREQUENCY_SCALE, KIOO_STATEMENTS, RATING_SCALE } from './sections';

/**
 * GuideStringsProvider — translates the words the guide repeats on every
 * screen: the ten Kioo statements, the frequency and rating scale labels, and
 * the small interface labels. Section content itself is translated by
 * useTranslatedGuideSection.
 *
 * Only these labels are sent; a learner's saved answers are never part of the
 * payload, so what they wrote stays exactly as they wrote it.
 */
export const GUIDE_UI = {
  exercises: 'Exercises',
  writeAnswers: 'Write your answers',
  keyTakeaways: 'Key takeaways',
  closingReflection: 'Closing reflection',
  saving: 'Saving…',
  rateHint: '1 = not true yet · 5 = very true',
  frequencyAria: 'Frequency ratings',
  answerAll: 'Please answer all ten statements before saving.',
  notePrompt: 'Your note with this reflection',
  kiooEyebrow: 'Kioo',
  firstReflectionTitle: 'Your first reflection',
  firstReflectionInstructions:
    "Rate how often each statement is true of you. This becomes your starting point, and it is kept with today's date.",
  firstReflectionSubmit: 'Save my first reflection',
  returnReflectionTitle: 'Return reflection',
  returnReflectionInstructions:
    "Answer the same ten statements as honestly as you can today. This attempt is kept with today's date.",
  returnReflectionSubmit: 'Save this return reflection',
  saveFailed: 'Your reflection was not saved. Please try again.',
  keptEyebrow: 'First time · kioo cha kwanza',
  keptHeading: 'Your first reflection is kept',
  yourNote: 'Your note',
  sectionsEyebrow: 'The sections',
  sectionsHeading: 'Ten sections, one journey',
  sectionsIntro:
    'The guide runs in three phases. You can follow them in order, or step into whichever section meets you where you are.',
  openSection: 'Open section',
  inPreparation: 'In preparation',
  contentInPreparation: 'Content in preparation',
  exercise: 'exercise',
  exercises: 'exercises',
  tenStatements: 'Ten statements',
  compareAttempts: 'Compare attempts',
  writtenOn: 'Written on',
  ofFive: 'of 5',
  average: 'average',
  comparisonEyebrow: 'Linganisha · the comparison',
  comparisonHeading: 'Your first reflection beside your latest',
  statement: 'statement',
  statements: 'statements',
  movedUp: 'moved up, highlighted below.',
  nothingMovedUp: 'Nothing moved up this time, and that is information too — not a failure.',
  firstReflection: 'First reflection',
  latestReturn: 'Latest return',
  statementColumn: 'Statement',
  firstColumn: 'First',
  latestColumn: 'Latest',
  comparisonFooter:
    'Highlighted statements are the ones where you moved up. This comparison is private to you.',
  startWithMirror: 'Start with the mirror',
  startWithMirrorBody:
    'Your first reflection in Kioo becomes the starting point this section compares against. Take it once, then come back here.',
  openKioo: 'Open Kioo',
  kiooHistory: 'Your Kioo history',
  mirrorKept: 'The mirror, kept with its dates',
  firstTime: 'First time',
  returnLabel: 'Return',
  notReturnedYet:
    'You have not returned yet. Whenever you are ready, take the same ten statements again below.',
  cancel: 'Cancel',
  takeAgain: 'Take the reflection again',
  sectionLabel: 'Section',
  learnersGuideLabel: "Learner's Guide",
  markDone: 'Mark section as done',
  doneNote: 'Done — you marked this section as done. You can still write in it whenever you like.',
  guideHome: 'Guide home',
  backToGuideHome: 'Back to the guide home',
};

const STRINGS = (() => {
  const strings = {};
  FREQUENCY_SCALE.forEach((option, index) => {
    strings[`frequency.${index}`] = option.label;
  });
  RATING_SCALE.forEach((option, index) => {
    strings[`rating.${index}`] = option.label;
  });
  KIOO_STATEMENTS.forEach((statement, index) => {
    strings[`kioo.${index}`] = statement.text;
  });
  Object.entries(GUIDE_UI).forEach(([key, value]) => {
    strings[`ui.${key}`] = value;
  });
  return strings;
})();

const ENGLISH = {
  kiooStatements: KIOO_STATEMENTS,
  frequencyScale: FREQUENCY_SCALE,
  ratingScale: RATING_SCALE,
  ui: GUIDE_UI,
};

const GuideStringsContext = createContext(ENGLISH);

export function GuideStringsProvider({ children }) {
  const { content } = useTranslatedContent('guide-shared', STRINGS);

  const value = useMemo(() => {
    const ui = {};
    Object.keys(GUIDE_UI).forEach((key) => {
      ui[key] = content[`ui.${key}`] || GUIDE_UI[key];
    });
    return {
      kiooStatements: KIOO_STATEMENTS.map((statement, index) => ({
        ...statement,
        text: content[`kioo.${index}`] || statement.text,
      })),
      frequencyScale: FREQUENCY_SCALE.map((option, index) => ({
        ...option,
        label: content[`frequency.${index}`] || option.label,
      })),
      ratingScale: RATING_SCALE.map((option, index) => ({
        ...option,
        label: content[`rating.${index}`] || option.label,
      })),
      ui,
    };
  }, [content]);

  return <GuideStringsContext.Provider value={value}>{children}</GuideStringsContext.Provider>;
}

export function useGuideStrings() {
  return useContext(GuideStringsContext);
}