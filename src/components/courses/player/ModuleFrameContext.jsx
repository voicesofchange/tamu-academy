import { createContext, useContext } from 'react';

/**
 * ModuleFrameContext — lets a course route put an existing lesson into the
 * course player without that lesson knowing about the player.
 *
 * A route that provides it sets:
 *   renderFrame(children)  — returns the CoursePlayer around the lesson;
 *                            ModuleLessonLayout uses it instead of the
 *                            single reading column.
 *   inPlayer: true         — progress components hide their own "complete
 *                            module" button, because the player's footer
 *                            completes the module.
 *   onProgressLoaded(p)    — progress components report their progress
 *                            whenever it changes, so the outline ticks and
 *                            the footer stay current without a second fetch.
 *
 * Without a provider every lesson renders exactly as before.
 */
export const ModuleFrameContext = createContext(null);

export function useModuleFrame() {
  return useContext(ModuleFrameContext);
}
