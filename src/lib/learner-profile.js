/**
 * Learner profile options and helpers shared by the profile page,
 * the post-registration prompt, and certificate screens.
 *
 * Profile values live on the learner's own user record and are written
 * through base44.auth.updateMe. The platform returns them at the top
 * level of the user object; the `data` object is checked as well so the
 * helpers keep working whichever shape the record comes back in.
 */

export const AGE_RANGES = [
  'Under 18',
  '18-24',
  '25-34',
  '35-44',
  '45-54',
  '55-64',
  '65+',
  'Prefer not to say',
];

export const EDUCATION_LEVELS = [
  'Secondary school',
  'Undergraduate degree',
  'Postgraduate degree',
  'Doctorate',
  'Professional or vocational training',
  'Other',
  'Prefer not to say',
];

export const LANGUAGE_OPTIONS = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
  { value: 'sw', label: 'Kiswahili' },
];

export const PROFILE_FIELDS = [
  'preferred_full_name',
  'country',
  'city_or_community',
  'age_range',
  'preferred_language',
  'education_level',
  'self_described_identity',
];

function readField(user, field) {
  if (!user) return '';
  const direct = user[field];
  if (typeof direct === 'string' && direct.length > 0) return direct;
  const nested = user.data && typeof user.data === 'object' ? user.data[field] : undefined;
  if (typeof nested === 'string' && nested.length > 0) return nested;
  return '';
}

/** The learner's saved profile values, with unset fields as empty strings. */
export function getProfile(user) {
  const profile = {};
  for (const field of PROFILE_FIELDS) {
    profile[field] = readField(user, field);
  }
  const completed =
    (user && user.profile_completed_at) ||
    (user?.data && user.data.profile_completed_at) ||
    '';
  profile.profile_completed_at = completed;
  return profile;
}

/** The name to use for certificates: the learner's own choice, then the account name. */
export function getPreferredName(user) {
  const preferred = readField(user, 'preferred_full_name');
  if (preferred.trim().length > 0) return preferred.trim();
  const accountName = user && typeof user.full_name === 'string' ? user.full_name.trim() : '';
  return accountName;
}

/** A profile counts as set up once the learner has chosen how their name is written. */
export function hasCompletedProfile(user) {
  return getProfile(user).preferred_full_name.trim().length > 0 && Boolean(getProfile(user).profile_completed_at);
}