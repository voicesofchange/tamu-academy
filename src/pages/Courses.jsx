import React, { useState, useEffect } from 'react';
import PageMeta from '@/components/seo/PageMeta';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SkipLink from '@/components/a11y/SkipLink';
import StructuredData from '@/components/seo/StructuredData';
import TopNav from '@/components/landing/TopNav';
import SiteFooter from '@/components/landing/SiteFooter';
import JourneyCourseCard from '@/components/courses/journey/JourneyCourseCard';
import JourneyTrackCard from '@/components/courses/journey/JourneyTrackCard';
import { ECONOMICS_DEVELOPMENT_TRACKS } from '@/lib/economics-tracks';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';
import TamuGuideWidget from '@/components/agent/TamuGuideWidget';

const HERO_IMG = 'https://media.base44.com/images/public/6a3c91b4c28c3d06e2889307/c5d7236bd_generated_12fdce95.jpg';
const LESSON_IMG = 'https://media.base44.com/images/public/6a3c91b4c28c3d06e2889307/43088212a_generated_88d7dc5c.jpg';
const PROGRESS_IMG = 'https://media.base44.com/images/public/6a3c91b4c28c3d06e2889307/992b69285_generated_83ba5579.jpg';

const CONTENT = {
  heroEyebrow: 'Courses',
  heroHeading: 'Courses Designed for Learning, Reflection and Application',
  heroSubheading: 'Tamu Academy is developing expert-led online courses with subject-matter experts, educators, researchers, and knowledge holders. Each course is designed to combine recorded lessons, written learning companions, reflection, practical activities, and resources for continued learning.',
  heritageLabel: 'Heritage and Leadership Collection',
  learningAreaLabel: 'Learning Area',
  heritageNote: 'A distinctive Tamu Academy collection bringing together research, oral history, and African-centered interpretation.',
  exploreCourse: 'Explore the Course',
  competencyTracks: 'Competency-Based Learning Tracks',
  nowAvailable: 'Now Available',
  courseDesignEyebrow: 'Course Design',
  courseDesignHeading: 'What a Complete Tamu Academy Course May Include',
  courseDesignIntro: 'Complete Tamu Academy courses are still under development. Final course packages may include:',
  openLearningEyebrow: 'Open Learning',
  openLearningHeading: 'Begin with Free Open Learning',
  openLearningBody: 'Begin with freely available Tamu Academy videos and articles exploring wellbeing, public policy, economics, institutions, culture, and global systems.',
  watchVideos: 'Watch Videos',
  readArticles: 'Read Articles',
  institutionsEyebrow: 'Institutions',
  institutionsHeading: 'Learning for Institutions',
  institutionsBody: 'Tamu Academy is developing course packages for universities, youth organizations, nonprofits, public institutions, and community programmes.',
  discussPartnership: 'Discuss a Partnership',
  courseAreas: [
    {
      id: 'mind-and-wellbeing',
      number: '01',
      area: 'Mind and Wellbeing',
      courses: [
        {
          title: 'Mental Health, Community and Culture',
          slug: 'mental-health-community-and-culture',
          status: 'Available',
          description:
            'A course examining mental health, stress, culture, family expectations, community support, structural conditions, and pathways to professional care.',
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
          status: 'Available',
          description:
            "A course introducing economic systems, development, inequality, trade, debt, institutions, and Africa's position within the global economy.",
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
          status: 'In Development',
          description:
            'A practical and critical introduction to generative AI, responsible use, bias, digital citizenship, work, governance, and technological change.',
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
          status: 'In Development',
          description:
            'A course exploring public policy, institutions, implementation, accountability, community participation, policy analysis, and writing for public decision-making.',
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
          status: 'In Development',
          description:
            'A research- and memory-based course exploring Waiyaki wa Hinga, colonial history, leadership, resistance, land, governance, oral history, and contemporary significance.',
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

  function statusFor(course) {
    if (!course.slug) return course.status;
    const ps = pubStatus[course.slug];
    if (ps && ps.isLive) return c.nowAvailable;
    return course.status;
  }

  return (
    <div style={{ background: '#24150f', minHeight: '100vh', overflowX: 'hidden' }}>
      <PageMeta
        title="Courses | Tamu Academy"
        description="Explore Tamu Academy's developing courses in mental health, economics, artificial intelligence, public policy, and the Waiyaki wa Hinga Heritage and Leadership Collection."
        path="/courses"
      />
      <SkipLink />
      <StructuredData />
      <TopNav />
      <main id="tamu-main" tabIndex={-1} style={{ outline: 'none' }}>

        {/* Hero */}
        <section style={{ position: 'relative', minHeight: '610px', padding: '130px clamp(1.5rem,6vw,88px) 82px', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
          <div aria-hidden style={{ position: 'absolute', inset: 0, background: `linear-gradient(90deg, rgba(36,21,15,0.97) 0%, rgba(36,21,15,0.78) 48%, rgba(36,21,15,0.25) 100%), url(${HERO_IMG}) center/cover`, opacity: 0.92 }} />
          <motion.div {...rise(0.2)} style={{ position: 'relative', zIndex: 1, maxWidth: '690px' }}>
            <span className="font-body" style={eyebrowStyle('#e8b85b')}>{c.heroEyebrow}</span>
            <h1 className="font-heading" style={{ fontWeight: 400, fontSize: 'clamp(2.4rem,5.2vw,68px)', lineHeight: 1.02, letterSpacing: '-0.035em', margin: '18px 0 25px', color: '#f8f0df' }}>{c.heroHeading}</h1>
            <p className="font-body" style={{ fontSize: 'clamp(1rem,1.5vw,18px)', lineHeight: 1.7, color: '#ddcfbb', maxWidth: '640px', margin: 0 }}>{c.heroSubheading}</p>
            <div style={{ display: 'flex', gap: '14px', marginTop: '32px', flexWrap: 'wrap' }}>
              <a href="#learning-areas" className="tamu-journey-primary font-body" style={{ padding: '14px 21px', borderRadius: '3px', textDecoration: 'none', fontSize: '12px', letterSpacing: '0.13em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center' }}>{c.exploreCourse} →</a>
              <Link to="/videos" className="tamu-journey-secondary font-body" style={{ padding: '14px 21px', borderRadius: '3px', textDecoration: 'none', fontSize: '12px', letterSpacing: '0.13em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center' }}>{c.watchVideos}</Link>
            </div>
          </motion.div>
          <motion.div {...rise(0.32)} style={{ position: 'relative', zIndex: 1, marginTop: '52px', display: 'flex', alignItems: 'center', gap: '13px', color: '#c6b59e', fontSize: '12px' }} className="font-body">
            <span>01</span>
            <div aria-hidden style={{ height: '2px', width: 'min(245px, 40vw)', background: 'linear-gradient(90deg, #d99b37 0 32%, rgba(243,234,216,0.2) 32%)', boxShadow: '0 0 10px rgba(217,155,55,0.28)' }} />
            <span>Learning journey</span>
          </motion.div>
        </section>

        {/* Learning Areas */}
        <section id="learning-areas" style={{ padding: '76px clamp(1.5rem,6vw,88px)', background: '#faf6ec', color: '#39251b', scrollMarginTop: '90px' }}>
          {c.courseAreas.map((area, ai) => (
            <div key={area.id} id={area.id} style={{ marginBottom: ai < c.courseAreas.length - 1 ? '3.5rem' : 0, scrollMarginTop: '90px' }}>
              <div style={{ marginBottom: '2rem' }}>
                <span className="font-body" style={eyebrowStyle('#b97827')}>{area.heritage ? c.heritageLabel : `${c.learningAreaLabel} ${area.number}`}</span>
                <h2 className="font-heading" style={{ fontSize: 'clamp(1.8rem,3.5vw,43px)', lineHeight: 1.08, fontWeight: 400, margin: '10px 0 0', color: '#39251b' }}>{area.area}</h2>
              </div>
              {area.heritage && (
                <p className="font-body" style={{ fontSize: '15px', lineHeight: 1.7, color: '#806b58', marginBottom: '1.5rem', fontStyle: 'italic', maxWidth: '640px' }}>{c.heritageNote}</p>
              )}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                {area.courses.map((course, ci) => (
                  <JourneyCourseCard key={course.title} number={area.number} course={course} status={statusFor(course)} exploreLabel={c.exploreCourse} index={ci} />
                ))}
              </div>
              {area.id === 'economics-and-development' && (
                <div style={{ marginTop: '2rem' }}>
                  <span className="font-body" style={{ color: '#b97827', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '1rem' }}>{c.competencyTracks}</span>
                  {ECONOMICS_DEVELOPMENT_TRACKS.map((track) => {
                    const econPs = pubStatus['understanding-african-economies-and-the-global-system'];
                    const trackStatus = econPs && econPs.isLive ? c.nowAvailable : track.status;
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
        </section>

        {/* Course Design / Lessons */}
        <section id="lessons" style={{ padding: '76px clamp(1.5rem,6vw,88px)', background: '#302018', color: '#f3ead8' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: '35px', marginBottom: '37px', flexWrap: 'wrap' }}>
            <div>
              <span className="font-body" style={eyebrowStyle('#e8b85b')}>{c.courseDesignEyebrow}</span>
              <h2 className="font-heading" style={{ fontSize: 'clamp(1.8rem,3.5vw,43px)', lineHeight: 1.08, fontWeight: 400, margin: '10px 0 0', color: '#f3ead8' }}>{c.courseDesignHeading}</h2>
            </div>
            <p className="font-body" style={{ maxWidth: '480px', color: '#cdbda7', fontSize: '15px', lineHeight: 1.7, margin: 0 }}>{c.courseDesignIntro}</p>
          </div>
          <div className="tamu-lesson-layout" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,300px) 1fr', gap: '42px', alignItems: 'start' }}>
            <aside style={{ border: '1px solid rgba(232,184,91,0.3)', background: 'rgba(255,255,255,0.045)', padding: '22px', borderRadius: '4px' }}>
              <h3 className="font-heading" style={{ fontWeight: 400, fontSize: '23px', margin: '0 0 21px', color: '#f3ead8' }}>Course Components</h3>
              {c.courseComponents.map((comp, ci) => (
                <div key={ci} className="font-body" style={{ display: 'flex', gap: '12px', padding: '15px 0', borderTop: ci === 0 ? '2px solid #d99b37' : '1px solid rgba(243,234,216,0.13)', fontSize: '13px', lineHeight: 1.45, color: '#f8f0df' }}>
                  <span aria-hidden style={{ width: '18px', height: '18px', border: '1px solid #d99b37', borderRadius: '50%', flex: 'none', marginTop: '1px', position: 'relative', background: '#d99b37' }}>
                    <span style={{ position: 'absolute', width: '7px', height: '3px', borderLeft: '2px solid #302018', borderBottom: '2px solid #302018', transform: 'rotate(-45deg)', left: '5px', top: '5px' }} />
                  </span>
                  <span>{comp}</span>
                </div>
              ))}
            </aside>
            <motion.article animate={{ y: [0, 8, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'relative', padding: '36px 42px', minHeight: '405px', border: '1px solid rgba(232,184,91,0.22)', borderRadius: '5px', overflow: 'hidden', background: '#3a261c' }}>
              <div aria-hidden style={{ position: 'absolute', inset: 0, background: `linear-gradient(rgba(58,38,28,0.84),rgba(58,38,28,0.94)), url(${LESSON_IMG}) center/cover`, opacity: 0.7 }} />
              <div style={{ position: 'relative' }}>
                <span className="font-body" style={eyebrowStyle('#e8b85b')}>{c.courseComponents[0]}</span>
                <h3 className="font-heading" style={{ fontSize: 'clamp(1.6rem,3vw,38px)', fontWeight: 400, lineHeight: 1.1, margin: '15px 0 18px', color: '#f8f0df' }}>{c.courseComponents[1]}</h3>
                <p className="font-body" style={{ maxWidth: '650px', fontSize: '15px', lineHeight: 1.8, color: '#d9cbb8', margin: '0 0 25px' }}>{c.courseComponents.slice(2).join(', ')}.</p>
                <div className="font-body" style={{ display: 'flex', gap: '28px', color: '#e8b85b', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', flexWrap: 'wrap' }}>
                  <span>{c.courseComponents.length} components</span>
                  <span>Under development</span>
                </div>
                <div className="font-body" style={{ marginTop: '30px', borderTop: '1px solid rgba(243,234,216,0.18)', paddingTop: '22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#e3d5c2', fontSize: '13px', flexWrap: 'wrap', gap: '8px' }}>
                  <span>What a complete course includes</span>
                  <strong style={{ color: '#e8b85b', fontWeight: 400 }}>{c.courseComponents.length} components</strong>
                </div>
              </div>
            </motion.article>
          </div>
        </section>

        {/* Open Learning / Progress */}
        <section id="progress" style={{ position: 'relative', padding: '76px clamp(1.5rem,6vw,88px)', background: '#e9dcc5', overflow: 'hidden' }}>
          <div aria-hidden style={{ position: 'absolute', right: 0, top: 0, width: '47%', height: '100%', background: `linear-gradient(90deg, #e9dcc5 0%, rgba(233,220,197,0.7) 28%, rgba(233,220,197,0.15)), url(${PROGRESS_IMG}) center/cover`, opacity: 0.75 }} />
          <div style={{ position: 'relative', maxWidth: '520px' }}>
            <span className="font-body" style={eyebrowStyle('#b97827')}>{c.openLearningEyebrow}</span>
            <h2 className="font-heading" style={{ fontWeight: 400, fontSize: 'clamp(1.8rem,3.5vw,43px)', lineHeight: 1.08, margin: '12px 0 19px', color: '#39251b' }}>{c.openLearningHeading}</h2>
            <p className="font-body" style={{ fontSize: '15px', lineHeight: 1.75, color: '#806b58', margin: '0 0 1.75rem' }}>{c.openLearningBody}</p>
            <div style={{ display: 'flex', gap: '48px', margin: '33px 0', flexWrap: 'wrap' }}>
              <div>
                <strong className="font-heading" style={{ display: 'block', fontSize: '38px', fontWeight: 400, color: '#a8671e' }}>{String(c.courseAreas.length).padStart(2, '0')}</strong>
                <span className="font-body" style={{ display: 'block', marginTop: '6px', color: '#806b58', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Learning Areas</span>
              </div>
              <div>
                <strong className="font-heading" style={{ display: 'block', fontSize: '38px', fontWeight: 400, color: '#a8671e' }}>{String(c.courseComponents.length).padStart(2, '0')}</strong>
                <span className="font-body" style={{ display: 'block', marginTop: '6px', color: '#806b58', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Course Components</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <Link to="/videos" className="tamu-journey-primary font-body" style={{ padding: '14px 21px', borderRadius: '3px', textDecoration: 'none', fontSize: '12px', letterSpacing: '0.13em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center' }}>{c.watchVideos} →</Link>
              <Link to="/articles" className="tamu-journey-secondary font-body" style={{ padding: '14px 21px', borderRadius: '3px', textDecoration: 'none', fontSize: '12px', letterSpacing: '0.13em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center' }}>{c.readArticles} →</Link>
            </div>
          </div>
        </section>

        {/* Course Components grid */}
        <section style={{ padding: '76px clamp(1.5rem,6vw,88px)', background: '#faf6ec', color: '#39251b' }}>
          <div style={{ marginBottom: '37px' }}>
            <span className="font-body" style={eyebrowStyle('#b97827')}>{c.courseDesignEyebrow}</span>
            <h2 className="font-heading" style={{ fontSize: 'clamp(1.8rem,3.5vw,43px)', lineHeight: 1.08, fontWeight: 400, margin: '10px 0 0', color: '#39251b' }}>Course Components</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
            {c.courseComponents.map((comp, ci) => (
              <div key={ci} className="font-body" style={{ border: '1px solid #dcc8a8', padding: '18px 20px', color: '#725a46', fontSize: '14px', background: '#fffaf1' }}>{comp}</div>
            ))}
          </div>
        </section>

        {/* Institutions / Final */}
        <section style={{ padding: '80px clamp(1.5rem,6vw,88px)', background: '#24150f', textAlign: 'center' }}>
          <span className="font-body" style={{ ...eyebrowStyle('#e8b85b'), display: 'block', marginBottom: '1rem' }}>{c.institutionsEyebrow}</span>
          <h2 className="font-heading" style={{ fontSize: 'clamp(2rem,4vw,47px)', fontWeight: 400, margin: '0 0 18px', color: '#f8f0df' }}>{c.institutionsHeading}</h2>
          <p className="font-body" style={{ maxWidth: '600px', margin: '0 auto 28px', color: '#cdbda7', fontSize: '15px', lineHeight: 1.7 }}>{c.institutionsBody}</p>
          <Link to="/contact?inquiry=university-or-institutional-partnership" className="tamu-journey-primary font-body" style={{ padding: '14px 21px', borderRadius: '3px', textDecoration: 'none', fontSize: '12px', letterSpacing: '0.13em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center' }}>{c.discussPartnership} →</Link>
        </section>

      </main>
      <SiteFooter />
      <TamuGuideWidget />
    </div>
  );
}