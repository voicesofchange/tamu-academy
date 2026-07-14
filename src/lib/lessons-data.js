/**
 * Tamu Academy — Lessons 5–7 metadata
 *
 * Shared by the dedicated video pages (/videos/[slug]) and the
 * "Continue the Series" cards on the Videos page. The written
 * companions for these lessons live in articles-data.js.
 *
 * No statistics, dates, or sources have been invented. Thumbnail
 * uses the public YouTube thumbnail for each video.
 */

export const NEW_LESSONS = [
  {
    slug: "is-the-icc-biased-against-africa",
    label: "Lesson 5",
    title: "Is the ICC Biased Against Africa?",
    description: "The ICC's Africa-heavy record is real, but the deeper bias may lie in the court's jurisdiction, membership rules, and Security Council veto.",
    category: "Global Affairs",
    secondaryCategories: ["Public Policy", "International Justice"],
    tags: ["ICC", "International Criminal Court", "Africa", "Rome Statute", "UN Security Council", "International justice", "Global power", "Sovereignty"],
    videoId: "S4C8P-8QJKs",
    articleSlug: "is-the-icc-biased-against-africa",
    seoTitle: "Is the ICC Biased Against Africa? | Tamu Academy",
    seoDescription: "An African-centered analysis of whether the ICC is biased against Africa and how jurisdiction, global power, and the Security Council shape international justice.",
    thumbnail: "https://i.ytimg.com/vi/S4C8P-8QJKs/hqdefault.jpg",
    publicationDateISO: "2026-07-14",
  },
  {
    slug: "after-the-guns-go-silent",
    label: "Lesson 6",
    title: "After the Guns Go Silent",
    description: "Peace does not begin and end with disarmament. Durable peace requires reintegration, community ownership, truth, and repaired relationships.",
    category: "Global Affairs",
    secondaryCategories: ["Peacebuilding", "Governance", "Justice"],
    tags: ["Peacebuilding", "DDR", "Disarmament", "Reintegration", "Gacaca", "Ubuntu", "Restorative justice", "Post-conflict recovery", "Reconciliation"],
    videoId: "GosyUDP_4hE",
    articleSlug: "after-the-guns-go-silent",
    seoTitle: "After the Guns Go Silent | Tamu Academy",
    seoDescription: "An examination of DDR, Gacaca, Ubuntu, restorative justice, and why lasting peace requires reintegration and community-led repair after war.",
    thumbnail: "https://i.ytimg.com/vi/GosyUDP_4hE/hqdefault.jpg",
    publicationDateISO: "2026-07-14",
  },
  {
    slug: "climate-is-a-mental-health-crisis",
    label: "Lesson 7",
    title: "Climate Is a Mental Health Crisis",
    description: "Climate change is not only an environmental crisis. It is also a crisis of grief, identity, community, belonging, and mental health.",
    category: "Mind and Wellbeing",
    secondaryCategories: ["Environment", "Climate", "African Ways of Knowing"],
    tags: ["Climate change", "Mental health", "Solastalgia", "Climate grief", "Ubuntu", "Environmental loss", "Community healing", "Africa", "Collective action"],
    videoId: "zScIxcNwgFo",
    articleSlug: "climate-is-a-mental-health-crisis",
    seoTitle: "Climate Is a Mental Health Crisis | Tamu Academy",
    seoDescription: "An African-centered examination of solastalgia, climate grief, community healing, and the mental-health effects of environmental loss.",
    thumbnail: "https://i.ytimg.com/vi/zScIxcNwgFo/hqdefault.jpg",
    publicationDateISO: "2026-07-14",
  },
];

export function getLessonBySlug(slug) {
  return NEW_LESSONS.find((l) => l.slug === slug) ?? null;
}