/**
 * Put a translated course's structure back exactly as it was.
 *
 * A page translates its course data for display, but every structural value —
 * the course slug and each module's route and number — must stay identical or
 * a card would link to a page that does not exist. The flatten step already
 * leaves those values out; this restores them for certain, so a course page
 * never depends on how a translation came back.
 */
export function restoreCourse(translated, original) {
  if (!original) return translated;

  const course = { ...translated, slug: original.slug };
  if (!Array.isArray(original.modules)) return course;

  const translatedModules = Array.isArray(translated.modules) ? translated.modules : [];
  course.modules = original.modules.map((module, index) => ({
    ...module,
    ...translatedModules[index],
    route: module.route,
    number: module.number,
  }));
  return course;
}

/** The same restoration for a course's learning tracks. */
export function restoreTracks(translated, original) {
  if (!Array.isArray(original)) return translated;

  const translatedTracks = Array.isArray(translated) ? translated : [];
  return original.map((track, index) => {
    const next = { ...track, ...translatedTracks[index], id: track.id };
    if (Array.isArray(track.modules)) {
      const translatedModules = Array.isArray(next.modules) ? next.modules : [];
      next.modules = track.modules.map((module, moduleIndex) => ({
        ...module,
        ...translatedModules[moduleIndex],
        route: module.route,
        track: module.track,
      }));
    }
    return next;
  });
}