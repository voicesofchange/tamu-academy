/**
 * Section anchors shared by the course player's outline and each course's
 * lesson layout: the outline links to `#tpl-step-<id>`, and the lesson puts
 * the same id on the section. The prefix is kept as it was first published so
 * existing links into a lesson still land.
 */
export const STEP_ANCHOR_PREFIX = 'tpl-step-';

export function stepAnchorId(id) {
  return `${STEP_ANCHOR_PREFIX}${id}`;
}
