import React, { createContext, useContext } from 'react';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';
import { COURSE_PLAYER_LABELS } from '@/lib/course-player-labels';

/**
 * CoursePlayerLabelsProvider — the course player's interface labels in the
 * learner's selected language, for the outline sidebar, the progress bar and
 * the footer.
 *
 * One translatePageContent call per language, cached in sessionStorage, the
 * same way SokoLabelsProvider works. The default context value is the English
 * labels, so a player component rendered outside the provider still reads
 * correctly.
 */
const CoursePlayerLabelsContext = createContext(COURSE_PLAYER_LABELS);

export function CoursePlayerLabelsProvider({ children }) {
  const { content } = useTranslatedContent('course_player_ui', COURSE_PLAYER_LABELS);
  return (
    <CoursePlayerLabelsContext.Provider value={content}>{children}</CoursePlayerLabelsContext.Provider>
  );
}

export function useCoursePlayerLabels() {
  return useContext(CoursePlayerLabelsContext);
}
