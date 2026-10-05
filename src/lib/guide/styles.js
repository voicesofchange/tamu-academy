/**
 * Shared text styles for the Safari ya Utu guide.
 *
 * Two surfaces: the deep brown page background (dark) and the cream answer
 * cards (cream). Gold is only ever used for small text on cream (#8A650B) or
 * for small text and rules on dark (#C9961A) — never for body copy on cream.
 */

export const darkText = {
  heading: { color: '#FBF5E8', fontWeight: 500 },
  body: { color: 'rgba(251,245,232,0.78)', fontSize: '0.95rem', lineHeight: 1.8, fontWeight: 300 },
  eyebrow: { color: '#C9961A', fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500 },
  rule: '1px solid rgba(201,150,26,0.2)',
};

export const creamText = {
  heading: { color: '#33241A', fontWeight: 500 },
  body: { color: '#2A2119', fontSize: '0.92rem', lineHeight: 1.8, fontWeight: 300 },
  label: { color: '#33241A', fontSize: '0.85rem', fontWeight: 500, display: 'block', marginBottom: '0.5rem' },
  hint: { color: '#6b5744', fontSize: '0.78rem', lineHeight: 1.6, margin: '0 0 0.6rem' },
  eyebrow: { color: '#8A650B', fontSize: '0.66rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500 },
};

export const GUIDE_PAGE_PADDING = 'clamp(1.25rem, 5vw, 4rem)';
export const GUIDE_MAX_WIDTH = '900px';

export const progressLabels = {
  not_started: 'Not started',
  in_progress: 'In progress',
  done: 'Done',
};