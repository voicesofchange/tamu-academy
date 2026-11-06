/**
 * fillTemplate — inserts values into a translated string.
 *
 * A label that carries a variable ("Next: {number} — {title}") is translated
 * with its placeholder in place, then filled here, so the sentence order can
 * change with the language while the values stay where the translation puts
 * them. An unknown placeholder is left as written rather than blanked.
 *
 * @param {string} template
 * @param {Object} values
 * @returns {string}
 */
export function fillTemplate(template, values = {}) {
  return String(template).replace(/\{(\w+)\}/g, (match, key) =>
    values[key] === undefined || values[key] === null ? match : String(values[key]),
  );
}