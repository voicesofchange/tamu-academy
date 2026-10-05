/**
 * learner-name — resolves the name a learner wants used on their certificate.
 *
 * Imported ONLY by Base44 backend functions. Never imported by src/.
 *
 * The learner's preferred_full_name (set on their profile) always wins.
 * The built-in account full_name is used only as a fallback, so learners
 * who have not yet set a preferred name still receive a certificate.
 *
 * Profile values come back at the top level of the user object; the
 * nested `data` object is checked as well so this keeps working whichever
 * shape the record arrives in.
 */
export function resolvePreferredName(user, fallback = null) {
  if (!user) return fallback;

  const candidates = [
    user.preferred_full_name,
    user.data && typeof user.data === 'object' ? user.data.preferred_full_name : undefined,
    user.full_name,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === 'string' && candidate.trim().length > 0) {
      return candidate.trim();
    }
  }

  return fallback;
}