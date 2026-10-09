/**
 * The Our Foundation page reads its copy from one editable record. Everything
 * below is the page's default wording, shown whenever no record has been saved
 * yet or a field has been left empty — so the page is complete on its own and
 * an administrator only has to fill in what they want to change, from the
 * FoundationContent data editor.
 *
 * Paragraph fields hold plain text; a blank line separates paragraphs.
 */

export const FOUNDATION_KEY = 'our-foundation';

export const FOUNDATION_DEFAULTS = {
  hero_eyebrow: 'Our Academic Foundation',
  hero_heading: 'Education Built on Experience, Knowledge, and Community',
  intro_paragraphs: [
    'Tamu Academy is a free online educational platform developed through Waiyaki House, a company led by Tex Wambui, MPA, and Hussein Waiyaki.',
    'The platform builds on their shared commitment to education, community development, and expanding access to knowledge. Together, Tex and Hussein have helped develop Voices of Change, an initiative focused on youth empowerment, environmental sustainability, and community action in Kenya.',
    'Through Waiyaki House, Tex and Hussein are making educational resources freely accessible to learners interested in understanding economics, history, society, culture, and contemporary global issues.',
  ].join('\n\n'),

  people_heading: 'Meet the People Behind Tamu Academy',
  tex_name: 'Tex Wambui, MPA',
  tex_role: 'Co Managing Director, Waiyaki House | Academic Lead, Tamu Academy',
  tex_bio:
    'Tex Wambui, MPA, provides academic and educational leadership for Tamu Academy. He holds a Master of Public Administration from Clark Atlanta University and a Bachelor of Arts in Economics and History from the University of California, Davis. His experience in public policy, research, economic development, and community education informs the platform\u2019s educational direction and course development.',
  hussein_name: 'Hussein Waiyaki',
  hussein_role: 'Co Managing Director, Waiyaki House',
  hussein_bio:
    'Hussein Waiyaki works alongside Tex Wambui to develop community initiatives through Voices of Change and to support the mission of Waiyaki House and Tamu Academy.',

  relationship_heading: 'From Community Action to Accessible Education',
  relationship_paragraphs: [
    'Voices of Change represents their experience in community leadership and social impact.',
    'Waiyaki House provides the organizational foundation for their educational initiatives.',
    'Tamu Academy delivers free online educational content to learners.',
  ].join('\n\n'),
  relationship_note:
    'These are related but distinct efforts. Waiyaki House is the organization behind Tamu Academy, while Voices of Change is a community initiative. Voices of Change and Tamu Academy are not the same legal organization.',

  commitment_heading: 'Our Educational Commitment',
  commitment_paragraphs: [
    'Tamu Academy is built on a simple principle: meaningful education should be accessible, informed by credible knowledge, and connected to the experiences and realities of the communities it serves.',
    'Our courses are developed using academic research, professional knowledge, and practical experience, with an emphasis on critical thinking and lifelong learning.',
  ].join('\n\n'),

  navExplore: 'Our Foundation',
  navJoin: 'Start Learning',
  footerAttr: 'A Waiyaki House learning venture',
  footerCopy: '\u00a9 2026 Waiyaki House LLC. All rights reserved.',
  privacyPolicy: 'Privacy Policy',
};

// The photograph fields live only on the saved record — they hold links rather
// than prose, so they are kept out of the wording above and never translated.
export const FOUNDATION_PHOTO_FIELDS = ['tex_photo_url', 'hussein_photo_url'];

/** Splits a paragraph field into the paragraphs it holds. */
export function toParagraphs(text) {
  return String(text ?? '')
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean);
}

/**
 * Saved values win field by field; anything left empty keeps the wording above,
 * so a partly filled record still renders a complete page.
 */
export function mergeFoundationContent(saved, base = FOUNDATION_DEFAULTS) {
  const content = { ...base };
  if (!saved) return content;
  Object.keys(base).forEach((field) => {
    const value = saved[field];
    if (typeof value === 'string' && value.trim()) content[field] = value.trim();
  });
  return content;
}