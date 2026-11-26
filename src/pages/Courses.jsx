import React, { useState, useEffect } from 'react';
import PageMeta from '@/components/seo/PageMeta';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SkipLink from '@/components/a11y/SkipLink';
import StructuredData from '@/components/seo/StructuredData';
import TopNav from '@/components/landing/TopNav';
import SiteFooter from '@/components/landing/SiteFooter';
import JourneyTrackCard from '@/components/courses/journey/JourneyTrackCard';
import CourseCard from '@/components/courses/shared/CourseCard';
import { useCourseFactText } from '@/components/courses/shared/useCourseFacts';
import { fillTemplate } from '@/lib/i18n/fill-template';
import { HOME_STATS } from '@/lib/home-course-catalog';
import { Check } from 'lucide-react';
import { ECONOMICS_DEVELOPMENT_TRACKS } from '@/lib/economics-tracks';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';
import TamuGuideWidget from '@/components/agent/TamuGuideWidget';
import PartnershipPathway from '@/components/partnerships/PartnershipPathway';

const HERO_IMG = 'https://media.base44.com/images/public/6a3c91b4c28c3d06e2889307/c5d7236bd_generated_12fdce95.jpg';
const PROGRESS_IMG = 'https://media.base44.com/images/public/6a3c91b4c28c3d06e2889307/992b69285_generated_83ba5579.jpg';

const CONTENT = {
  heroEyebrow: 'Courses',
  heroHeading: 'Courses Designed for Learning, Reflection and Application',
  heroSubheading: 'Six Tamu Academy courses are open for enrollment now, with more in development. Every course is built with subject-matter experts, educators, researchers, and knowledge holders, and combines recorded lessons, written learning companions, reflection, practical activities, and resources for continued learning.',
  heritageLabel: 'Heritage and Leadership Collection',
  learningAreaLabel: 'Learning Area',
  heritageNote: 'A distinctive Tamu Academy collection bringing together research, oral history, and African-centered interpretation.',
  heroStats: '{courses} live courses · {areas} learning areas · {modules} certificate modules',
  jumpLabel: 'Jump to a learning area',
  liveCount: '{count} live',
  comingSoon: 'Coming soon',
  competencyTracks: 'Competency-Based Learning Tracks',
  nowAvailable: 'Available now',
  courseDesignEyebrow: 'Course Design',
  courseDesignHeading: 'What a Complete Tamu Academy Course May Include',
  courseDesignIntro: 'Each open Tamu Academy course includes the following. Courses still in development will follow the same design:',
  openLearningEyebrow: 'Open Learning',
  openLearningHeading: 'Begin with Free Open Learning',
  openLearningBody: 'Begin with freely available Tamu Academy guides, worksheets, and reflective tools exploring wellbeing, public policy, economics, institutions, culture, and global systems.',
  viewResources: 'View Resources',
  statAreas: 'Learning Areas',
  statComponents: 'Course Components',
  courseAreas: [
    {
      id: 'mind-and-wellbeing',
      number: '01',
      area: 'Mind and Wellbeing',
      courses: [
        {
          title: 'Mental Health, Community and Culture',
          slug: 'mental-health-community-and-culture',
          status: 'Available now',
          description:
            'A course examining mental health, stress, culture, family expectations, community support, structural conditions, and pathways to professional care.',
          visual: {
            icon: 'Heart',
            accent: 'rgba(197,90,56,0.28)',
            meta: [
              { icon: 'Layers', label: '7 modules' },
              { icon: 'Clock', label: 'Self-paced' },
              { icon: 'BarChart', label: 'Introductory' },
            ],
          },
        },
      ],
      extra: null,
    },
    {
      id: 'economics-and-development',
      number: '02',
      area: 'Economics and Development',
      courses: [
        {
          title: 'Understanding African Economies and the Global System',
          slug: 'understanding-african-economies-and-the-global-system',
          status: 'Available now',
          description:
            "A course introducing economic systems, development, inequality, trade, debt, institutions, and Africa's position within the global economy.",
          visual: {
            icon: 'TrendingUp',
            accent: 'rgba(217,155,55,0.30)',
            meta: [
              { icon: 'Layers', label: '6 modules' },
              { icon: 'Clock', label: 'Self-paced' },
              { icon: 'BarChart', label: 'Introductory' },
            ],
          },
        },
        {
          title: 'Building Wealth Together: Money, Enterprise and Community Leadership',
          slug: 'building-wealth-together',
          status: 'Available now',
          description:
            'A nine-module course that starts with community: managing your own money, starting and sustaining an enterprise, and leading groups that handle shared money and shared risk.',
          visual: {
            icon: 'Users',
            accent: 'rgba(217,155,55,0.30)',
            meta: [
              { icon: 'Layers', label: '9 modules' },
              { icon: 'Clock', label: 'Self-paced' },
              { icon: 'BarChart', label: 'Applied' },
            ],
          },
        },
        {
          title: 'Sauti za Soko: Markets, Climate and Community Power',
          slug: 'sauti-za-soko',
          status: 'Available now',
          description:
            'A seven-module course built with young market vendors in Kiambu: markets as economies, cash and credit, weather risk, county decisions, collective action, and a plan that lasts.',
          visual: {
            icon: 'Store',
            accent: 'rgba(217,155,55,0.30)',
            meta: [
              { icon: 'Layers', label: '7 modules' },
              { icon: 'Clock', label: 'Self-paced' },
              { icon: 'BarChart', label: 'Applied' },
            ],
          },
        },
        {
          title: 'The Diaspora Remittance Economy',
          slug: 'diaspora-remittance-economy',
          status: 'Available now',
          description:
            'A three-module course on the money families send across borders: what a remittance actually is, what it costs to send, and what happens where it lands.',
          visual: {
            icon: 'Banknote',
            accent: 'rgba(217,155,55,0.30)',
            meta: [
              { icon: 'Layers', label: '3 modules' },
              { icon: 'Clock', label: 'Self-paced' },
              { icon: 'BarChart', label: 'Foundational' },
            ],
          },
        },
      ],
      extra: null,
    },
    {
      id: 'ai-technology-and-digital-futures',
      number: '03',
      area: 'AI, Technology and Digital Futures',
      courses: [
        {
          title: 'AI Literacy for African and Diaspora Leaders',
          status: 'In development',
          description:
            'A practical and critical introduction to generative AI, responsible use, bias, digital citizenship, work, governance, and technological change.',
          visual: {
            icon: 'Cpu',
            accent: 'rgba(86,128,138,0.26)',
            meta: [
              { icon: 'Clock', label: 'In development' },
              { icon: 'BarChart', label: 'Applied' },
            ],
          },
        },
      ],
      extra: null,
    },
    {
      id: 'public-policy-and-governance',
      number: '04',
      area: 'Public Policy and Governance',
      courses: [
        {
          title: 'Power, Policy and the Public Good',
          status: 'In development',
          description:
            'A course exploring public policy, institutions, implementation, accountability, community participation, policy analysis, and writing for public decision-making.',
          visual: {
            icon: 'Landmark',
            accent: 'rgba(122,90,56,0.28)',
            meta: [
              { icon: 'Clock', label: 'In development' },
              { icon: 'BarChart', label: 'Applied' },
            ],
          },
        },
      ],
      extra: {
        eyebrow: 'Proposed First Pilot',
        title: 'Ubuntu and the Public Good',
        badge: 'Proposed Pilot Programme',
        content:
          'A four-week applied learning experience examining how values, institutions, economics, and community knowledge shape public decisions. Participants develop a one-page community-centered policy memo as their final project.',
        details: [
          ['Intended audience', 'Young adults ages 18–30'],
          ['Proposed format', 'Four weekly facilitated sessions'],
          ['Proposed delivery', 'Online or partner-hosted'],
          ['Final learner product', 'One-page policy memo'],
          ['Current status', 'Under development — available for partnership discussion'],
        ],
        ctaLabel: 'Discuss a Pilot Partnership',
        ctaTo: '/contact?type=partnership&programme=ubuntu-and-the-public-good',
      },
    },
    {
      id: 'waiyaki-wa-hinga',
      number: '05',
      area: 'Waiyaki wa Hinga Heritage and Leadership Collection',
      heritage: true,
      courses: [
        {
          title: 'Waiyaki wa Hinga: Leadership, Resistance and Historical Memory',
          slug: 'waiyaki-wa-hinga',
          status: 'Available now',
          description:
            'A five-module research and memory course exploring Waiyaki wa Hinga, colonial history, leadership, resistance, land, governance, oral history, and contemporary significance.',
          visual: {
            icon: 'Scroll',
            accent: 'rgba(197,130,50,0.26)',
            meta: [
              { icon: 'Layers', label: '5 modules' },
              { icon: 'Clock', label: 'Self-paced' },
              { icon: 'BarChart', label: 'Research-based' },
            ],
          },
        },
      ],
      extra: null,
    },
  ],
  courseComponents: [
    'Recorded expert-led lessons',
    'Written lesson companions',
    'Transcripts and captions',
    'Reflection questions',
    'Knowledge checks',
    'Downloadable activities',
    'Course workbooks',
    'Practical assignments',
    'Facilitator materials for institutions',
  ],
};

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.8, ease: 'easeOut', delay },
});

const eyebrowStyle = (color) => ({ color, fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' });

export default function Courses() {
  const { content: c } = useTranslatedContent('courses', CONTENT);
  const facts = useCourseFactText();
  const [pubStatus, setPubStatus] = useState({});

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await base44.functions.invoke('getPublicationStatus', {});
        if (!cancelled && res && res.data && res.data.courses) {
          setPubStatus(res.data.courses);
        }
      } catch (err) {
        // Publication status unavailable — fall back to default labels.
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <div style={{ background: '#24150f', minHeight: '100vh', overflowX: 'hidden' }}>
      <PageMeta
        title="Courses | Tamu Academy"
        description="Explore Tamu Academy's open courses in mental health, economics, markets and heritage, and the courses in development across artificial intelligence and public policy."
        path="/courses"
      />
      <style>{CATALOG_CSS}</style>
      <SkipLink />
      <StructuredData />
      <TopNav />
      <main id="tamu-main" tabIndex={-1} style={{ outline: 'none' }}>

        {/* Hero */}
        <section className="cat-hero" aria-labelledby="courses-heading">
          <div aria-hidden className="cat-hero-bg" style={{ background: `linear-gradient(90deg, rgba(36,21,15,0.97) 0%, rgba(36,21,15,0.82) 52%, rgba(36,21,15,0.35) 100%), url(${HERO_IMG}) center/cover` }} />
          <motion.div {...rise(0.15)} className="cat-inner cat-hero-inner">
            <span className="font-body" style={eyebrowStyle('#e8b85b')}>{c.heroEyebrow}</span>
            <h1 id="courses-heading" className="font-heading cat-title">{c.heroHeading}</h1>
            <p className="font-body cat-sub">{c.heroSubheading}</p>
            <p className="font-body cat-stats">{fillTemplate(c.heroStats, { courses: HOME_STATS.liveCourses, areas: HOME_STATS.learningAreas, modules: HOME_STATS.certificateModules })}</p>
            <nav aria-label={c.jumpLabel} className="cat-jump">
              {c.courseAreas.map((area) => {
                const live = area.courses.filter((course) => course.slug).length;
                return (
                  <a key={area.id} href={`#${area.id}`} className="font-body cat-jump-link">
                    {facts.area(area.id) || area.area}
                    <span className="cat-jump-count">{live ? fillTemplate(c.liveCount, { count: live }) : c.comingSoon}</span>
                  </a>
                );
              })}
            </nav>
          </motion.div>
        </section>

        {/* Learning Areas */}
        <section id="learning-areas" style={{ padding: '64px clamp(1.25rem,5vw,4rem) 76px', background: '#faf6ec', color: '#39251b', scrollMarginTop: '90px' }}>
          <div className="cat-inner">
          {c.courseAreas.map((area, ai) => (
            <div key={area.id} id={area.id} style={{ marginBottom: ai < c.courseAreas.length - 1 ? '3.5rem' : 0, scrollMarginTop: '110px' }}>
              <div style={{ marginBottom: '2rem' }}>
                <span className="font-body" style={eyebrowStyle('#b97827')}>{area.heritage ? c.heritageLabel : `${c.learningAreaLabel} ${area.number}`}</span>
                <h2 className="font-heading" style={{ fontSize: 'clamp(1.8rem,3.5vw,43px)', lineHeight: 1.08, fontWeight: 400, margin: '10px 0 0', color: '#39251b' }}>{facts.area(area.id) || area.area}</h2>
              </div>
              {area.heritage && (
                <p className="font-body" style={{ fontSize: '15px', lineHeight: 1.7, color: '#806b58', marginBottom: '1.5rem', fontStyle: 'italic', maxWidth: '640px' }}>{c.heritageNote}</p>
              )}
              <ul className="cat-grid">
                {area.courses.map((course) => (
                  <li key={course.title}>
                    {course.slug ? (
                      <CourseCard slug={course.slug} />
                    ) : (
                      <CourseCard upcoming={{
                        title: course.title,
                        description: course.description,
                        areaId: area.id,
                        icon: course.visual && course.visual.icon,
                        accent: course.visual && course.visual.accent,
                      }}
                      />
                    )}
                  </li>
                ))}
              </ul>
              {area.id === 'economics-and-development' && (
                <div style={{ marginTop: '2rem' }}>
                  <span className="font-body" style={{ color: '#b97827', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '1rem' }}>{c.competencyTracks}</span>
                  {ECONOMICS_DEVELOPMENT_TRACKS.map((track) => {
                    const trackPs = pubStatus[track.courses?.[0]?.slug];
                    const trackStatus = trackPs && trackPs.isLive ? c.nowAvailable : track.status;
                    return <div key={track.slug} style={{ marginBottom: '1.25rem' }}><JourneyTrackCard track={{ ...track, status: trackStatus }} /></div>;
                  })}
                </div>
              )}
              {area.extra && (
                <motion.div {...rise()} className="tamu-course-card" style={{ marginTop: '2rem', padding: '28px', background: 'rgba(255,255,255,0.5)', border: '1px solid #dac7ab', borderRadius: '4px' }}>
                  <span className="font-body" style={{ color: '#b97827', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.75rem' }}>{area.extra.eyebrow}</span>
                  <div style={{ marginBottom: '0.85rem' }}>
                    <span className="font-body" style={{ color: '#9b5d1d', border: '1px solid #d7b57c', borderRadius: '20px', padding: '6px 10px', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{area.extra.badge}</span>
                  </div>
                  <h4 className="font-heading" style={{ color: '#39251b', fontSize: '24px', fontWeight: 400, lineHeight: 1.3, margin: '0 0 0.85rem' }}>{area.extra.title}</h4>
                  <p className="font-body" style={{ color: '#796552', fontSize: '14px', lineHeight: 1.7, marginBottom: '1.25rem' }}>{area.extra.content}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: '0.65rem', marginBottom: '1.5rem' }}>
                    {area.extra.details.map(([label, value], di) => (
                      <div key={di} style={{ padding: '14px 18px', border: '1px solid #dcc8a8', borderRadius: '4px', background: '#fffaf1' }}>
                        <span className="font-body" style={{ color: '#b97827', fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.3rem' }}>{label}</span>
                        <span className="font-body" style={{ color: '#725a46', fontSize: '13px', lineHeight: 1.6 }}>{value}</span>
                      </div>
                    ))}
                  </div>
                  <Link to={area.extra.ctaTo} className="font-body" style={{ display: 'inline-flex', alignItems: 'center', color: '#9b5d1d', fontSize: '11px', letterSpacing: '0.13em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, borderBottom: '1px solid #c18a36', paddingBottom: '2px', transition: 'color 0.25s ease' }}>{area.extra.ctaLabel} →</Link>
                </motion.div>
              )}
            </div>
          ))}
          </div>
        </section>

        {/* Course Design: what every course includes */}
        <section id="lessons" style={{ padding: '72px clamp(1.25rem,5vw,4rem)', background: '#302018', color: '#f3ead8' }}>
          <div className="cat-inner">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: '1.5rem 35px', marginBottom: '2rem', flexWrap: 'wrap' }}>
              <div>
                <span className="font-body" style={eyebrowStyle('#e8b85b')}>{c.courseDesignEyebrow}</span>
                <h2 className="font-heading" style={{ fontSize: 'clamp(1.8rem,3.5vw,43px)', lineHeight: 1.08, fontWeight: 400, margin: '10px 0 0', color: '#f3ead8' }}>{c.courseDesignHeading}</h2>
              </div>
              <p className="font-body" style={{ maxWidth: '480px', color: '#cdbda7', fontSize: '15px', lineHeight: 1.7, margin: 0 }}>{c.courseDesignIntro}</p>
            </div>
            <ul className="cat-components">
              {c.courseComponents.map((comp) => (
                <li key={comp} className="font-body">
                  <Check size={17} strokeWidth={2.2} aria-hidden="true" />
                  <span>{comp}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Open Learning / Progress */}
        <section id="progress" style={{ position: 'relative', padding: '72px clamp(1.25rem,5vw,4rem)', background: '#e9dcc5', overflow: 'hidden' }}>
          <div aria-hidden style={{ position: 'absolute', right: 0, top: 0, width: '47%', height: '100%', background: `linear-gradient(90deg, #e9dcc5 0%, rgba(233,220,197,0.7) 28%, rgba(233,220,197,0.15)), url(${PROGRESS_IMG}) center/cover`, opacity: 0.75 }} />
          <div className="cat-inner" style={{ position: 'relative' }}>
          <div style={{ maxWidth: '520px' }}>
            <span className="font-body" style={eyebrowStyle('#b97827')}>{c.openLearningEyebrow}</span>
            <h2 className="font-heading" style={{ fontWeight: 400, fontSize: 'clamp(1.8rem,3.5vw,43px)', lineHeight: 1.08, margin: '12px 0 19px', color: '#39251b' }}>{c.openLearningHeading}</h2>
            <p className="font-body" style={{ fontSize: '15px', lineHeight: 1.75, color: '#806b58', margin: '0 0 1.75rem' }}>{c.openLearningBody}</p>
            <div style={{ display: 'flex', gap: '48px', margin: '33px 0', flexWrap: 'wrap' }}>
              <div>
                <strong className="font-heading" style={{ display: 'block', fontSize: '38px', fontWeight: 400, color: '#a8671e' }}>{String(c.courseAreas.length).padStart(2, '0')}</strong>
                <span className="font-body" style={{ display: 'block', marginTop: '6px', color: '#806b58', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{c.statAreas}</span>
              </div>
              <div>
                <strong className="font-heading" style={{ display: 'block', fontSize: '38px', fontWeight: 400, color: '#a8671e' }}>{String(c.courseComponents.length).padStart(2, '0')}</strong>
                <span className="font-body" style={{ display: 'block', marginTop: '6px', color: '#806b58', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{c.statComponents}</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <Link to="/resources" className="tamu-journey-primary font-body" style={{ padding: '14px 21px', borderRadius: '3px', textDecoration: 'none', fontSize: '12px', letterSpacing: '0.13em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center' }}>{c.viewResources} →</Link>
            </div>
          </div>
          </div>
        </section>

        {/* Educators and Institutions — the partnership pathway */}
        <section id="partnerships" style={{ padding: '72px clamp(1.25rem,5vw,4rem)', background: '#24150f', scrollMarginTop: '90px' }}>
          <div className="cat-inner"><PartnershipPathway /></div>
        </section>

      </main>
      <SiteFooter />
      <TamuGuideWidget />
    </div>
  );
}
const CATALOG_CSS = `
.cat-inner { max-width: 1240px; margin: 0 auto; }
.cat-hero { position: relative; overflow: hidden; padding: 130px clamp(1.25rem,5vw,4rem) 56px; }
.cat-hero-bg { position: absolute; inset: 0; opacity: 0.92; }
.cat-hero-inner { position: relative; z-index: 1; }
.cat-title { font-weight: 400; font-size: clamp(2.2rem, 4.6vw, 56px); line-height: 1.05; letter-spacing: -0.03em; margin: 16px 0 18px; color: #f8f0df; max-width: 820px; }
.cat-sub { font-size: clamp(1rem, 1.4vw, 17px); line-height: 1.7; color: #ddcfbb; max-width: 700px; margin: 0; }
.cat-stats { color: #e8b85b; font-size: 0.82rem; letter-spacing: 0.08em; text-transform: uppercase; font-weight: 600; margin: 1.5rem 0 0; }
.cat-jump { display: flex; flex-wrap: wrap; gap: 0.55rem; margin-top: 1.25rem; }
.cat-jump-link { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0.95rem; border-radius: 999px; border: 1px solid rgba(232,184,91,0.4); background: rgba(36,21,15,0.55); color: #f8f0df; font-size: 0.82rem; text-decoration: none; }
.cat-jump-link:hover { border-color: #e8b85b; }
.cat-jump-link:focus-visible { outline: 2px solid #e8b85b; outline-offset: 2px; }
.cat-jump-count { color: #e8b85b; font-size: 0.7rem; letter-spacing: 0.06em; text-transform: uppercase; }
.cat-grid { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.25rem; }
.cat-grid > li { display: flex; }
.cat-grid > li > * { width: 100%; }
.cat-components { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0.75rem 1.5rem; }
.cat-components li { display: flex; gap: 0.6rem; align-items: flex-start; padding: 0.9rem 1rem; border: 1px solid rgba(232,184,91,0.2); border-radius: 8px; background: rgba(243,234,216,0.03); color: #f3ead8; font-size: 0.92rem; line-height: 1.5; }
.cat-components svg { color: #e8b85b; flex-shrink: 0; margin-top: 0.15rem; }
@media (max-width: 1023px) { .cat-grid, .cat-components { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 639px) {
  .cat-grid, .cat-components { grid-template-columns: minmax(0, 1fr); }
  .cat-hero { padding-top: 96px; }
}
`;
