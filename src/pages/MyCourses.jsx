import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import PageMeta from '@/components/seo/PageMeta';
import PageLayout from '@/components/page/PageLayout';
import JourneyHero from '@/components/courses/journey/JourneyHero';
import JourneyBand from '@/components/courses/journey/JourneyBand';
import JourneyCourseTile from '@/components/courses/journey/JourneyCourseTile';
import { MENTAL_HEALTH_COURSE } from '@/lib/mental-health-tracks';
import { ECONOMICS_COURSE } from '@/lib/economics-tracks';
import { SAUTI_ZA_SOKO_COURSE, SAUTI_ZA_SOKO_COURSE_SLUG } from '@/lib/sauti-za-soko-tracks';
import { WAIYAKI_COURSE, WAIYAKI_COURSE_SLUG } from '@/lib/waiyaki-tracks';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';
import TamuGuideWidget from '@/components/agent/TamuGuideWidget';
import GuideContinueCard from '@/components/guide/GuideContinueCard';
import DashboardLearnerTools from '@/components/dashboard/DashboardLearnerTools';
import DashboardGroupFilter from '@/components/dashboard/DashboardGroupFilter';
import DashboardFocusPanel from '@/components/dashboard/DashboardFocusPanel';
import DashboardRecommendations from '@/components/dashboard/DashboardRecommendations';
import DashboardThemeSection from '@/components/dashboard/DashboardThemeSection';
import { useAuth } from '@/lib/AuthContext';
import { useDisplayMode } from '@/lib/display-mode';
import { getProfile } from '@/lib/learner-profile';
import { DASHBOARD_GROUPS, DASHBOARD_FALLBACK, getDashboardGroup } from '@/lib/learner-dashboard';

// The same opening band the Courses page uses.
const HERO_IMG = 'https://media.base44.com/images/public/6a3c91b4c28c3d06e2889307/c5d7236bd_generated_12fdce95.jpg';

const COURSE_META = {
  [MENTAL_HEALTH_COURSE.slug]: MENTAL_HEALTH_COURSE,
  [ECONOMICS_COURSE.slug]: ECONOMICS_COURSE,
  [SAUTI_ZA_SOKO_COURSE_SLUG]: SAUTI_ZA_SOKO_COURSE,
  [WAIYAKI_COURSE_SLUG]: WAIYAKI_COURSE,
};

const ALL_COURSES = [MENTAL_HEALTH_COURSE, ECONOMICS_COURSE, SAUTI_ZA_SOKO_COURSE, WAIYAKI_COURSE];

// Each course keeps the same tile face it wears on the Courses page.
const COURSE_VISUALS = {
  [MENTAL_HEALTH_COURSE.slug]: {
    number: '01',
    icon: 'Heart',
    accent: 'rgba(197,90,56,0.28)',
    meta: [
      { icon: 'Layers', label: '7 modules' },
      { icon: 'Clock', label: 'Self-paced' },
      { icon: 'BarChart', label: 'Introductory' },
    ],
  },
  [ECONOMICS_COURSE.slug]: {
    number: '02',
    icon: 'TrendingUp',
    accent: 'rgba(217,155,55,0.30)',
    meta: [
      { icon: 'Layers', label: '6 modules' },
      { icon: 'Clock', label: 'Self-paced' },
      { icon: 'BarChart', label: 'Introductory' },
    ],
  },
  [SAUTI_ZA_SOKO_COURSE_SLUG]: {
    number: '02',
    icon: 'Store',
    accent: 'rgba(217,155,55,0.30)',
    meta: [
      { icon: 'Layers', label: '7 modules' },
      { icon: 'Clock', label: 'Self-paced' },
      { icon: 'BarChart', label: 'Applied' },
    ],
  },
  [WAIYAKI_COURSE_SLUG]: {
    number: '05',
    icon: 'Scroll',
    accent: 'rgba(197,130,50,0.26)',
    meta: [
      { icon: 'Layers', label: '5 modules' },
      { icon: 'Clock', label: 'Self-paced' },
      { icon: 'BarChart', label: 'Research-based' },
    ],
  },
};

const primaryButtonStyle = {
  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
  color: '#24150f', fontSize: '0.78rem', letterSpacing: '0.06em', textTransform: 'uppercase',
  fontWeight: 600, textDecoration: 'none', border: 'none', borderRadius: '2px',
  padding: '0.75rem 1.4rem', backgroundColor: '#e8b85b',
};

const CONTENT = {
  heroEyebrow: 'My Courses',
  heroHeading: 'Your Learning Journey',
  heroSubheading: 'Continue where you left off, track your progress across courses, and access your certificates of completion.',
  stepLabel: 'Your learning journey',
  myProgress: 'My Progress',
  resourcesEyebrow: 'Your Resources',
  resourcesHeading: 'Support for your learning',
  emptyEyebrow: 'Get Started',
  emptyHeading: "You haven't enrolled in a course yet",
  emptyBody: 'Browse available courses and enroll to start tracking your progress here. Your enrolled courses, module progress, and certificates will all appear on this page.',
  browseCourses: 'Browse Courses',
  resumeEyebrow: 'Continue Learning',
  resumeHeading: 'Pick up where you left off',
  progress: 'Progress',
  of: 'of',
  modules: 'modules',
  continueAt: 'Continue at',
  enrolledEyebrow: 'Your Courses',
  enrolledHeading: 'Enrolled Courses',
  resumeAt: 'Resume at',
  reviewCompletion: 'Review Course Completion',
  courseOverview: 'Course Overview',
  viewCertificate: 'View Certificate',
  nowAvailable: 'Available now',
  inDevelopment: 'In development',
  filterLabel: 'Dashboard view',
  filterNote: 'Switching the view only changes what this page emphasises. Your saved learner group, course access and progress stay exactly the same.',
  backToMyGroup: 'Back to my group',
  tailoredFor: 'Tailored for',
  previewing: 'Previewing',
  anchorLearning: 'Learning next steps',
  anchorCommunity: 'Community pathways',
  anchorImpact: 'Career and impact',
  setGroup: 'Set your learner group',
  recommendationsEyebrow: 'Next Steps',
  recommendationsHeading: 'Your next learning steps',
  resumeRecommendation: 'Resume learning',
  quickLinksLabel: 'Also in your dashboard:',
  dataSaverTitle: 'Reading on a slow connection?',
  dataSaverBody: 'Data-Saver keeps pages light: system text, no decorative media, and recordings load only when you press play.',
  dataSaverOn: 'Turn on Data-Saver',
  dataSaverOff: 'Turn off Data-Saver',
  communityEyebrow: 'Community',
  communityHeading: 'Community pathways',
  impactEyebrow: 'What Comes Next',
  impactHeading: 'Career and impact',
};

export default function MyCourses() {
  const { content: c } = useTranslatedContent('my-courses', CONTENT);
  const { user } = useAuth();
  const { isDataSaver, toggleMode } = useDisplayMode();
  // The saved learner group decides the opening view. The filter below can
  // preview another group without ever writing this field back.
  const savedGroup = getDashboardGroup(getProfile(user).learner_category);
  const [viewGroupId, setViewGroupId] = useState(null);
  const activeGroup = DASHBOARD_GROUPS.find((group) => group.id === viewGroupId) || savedGroup || DASHBOARD_FALLBACK;
  const isPreviewing = Boolean(viewGroupId) && viewGroupId !== savedGroup?.id;
  const focusLabels = {
    previewing: c.previewing,
    tailoredFor: c.tailoredFor,
    learning: c.anchorLearning,
    community: c.anchorCommunity,
    impact: c.anchorImpact,
    setGroup: c.setGroup,
  };
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [pubStatus, setPubStatus] = useState({});

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [mhRes, econRes, sokoRes, waiyakiRes, pubRes] = await Promise.all([
          base44.functions.invoke('getMentalHealthCourseCompletion', { courseSlug: MENTAL_HEALTH_COURSE.slug }),
          base44.functions.invoke('getEconomicsCourseCompletion', { courseSlug: ECONOMICS_COURSE.slug }),
          base44.functions.invoke('getSokoCourseCompletion', { courseSlug: SAUTI_ZA_SOKO_COURSE_SLUG }),
          base44.functions.invoke('getWaiyakiCourseCompletion', { courseSlug: WAIYAKI_COURSE_SLUG }),
          base44.functions.invoke('getPublicationStatus', {}),
        ]);
        if (cancelled) return;
        setPubStatus(pubRes?.data?.courses || {});
        const enrolled = [];
        if (mhRes?.data?.hasEnrollment) enrolled.push({ slug: MENTAL_HEALTH_COURSE.slug, completion: mhRes.data });
        if (econRes?.data?.hasEnrollment) enrolled.push({ slug: ECONOMICS_COURSE.slug, completion: econRes.data });
        if (sokoRes?.data?.hasEnrollment) enrolled.push({ slug: SAUTI_ZA_SOKO_COURSE_SLUG, completion: sokoRes.data });
        if (waiyakiRes?.data?.hasEnrollment) enrolled.push({ slug: WAIYAKI_COURSE_SLUG, completion: waiyakiRes.data });
        setCourses(enrolled);
      } catch (err) {
        // Not authenticated or error — empty state handles it.
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const resumeTarget = courses
    .map((c) => ({
      ...c,
      meta: COURSE_META[c.slug],
      firstIncomplete: c.completion?.incompleteModules?.[0] || null,
      completedCount: c.completion?.completedCount || 0,
    }))
    .filter((c) => c.firstIncomplete)
    .sort((a, b) => b.completedCount - a.completedCount)[0];

  const statusFor = (slug) => (pubStatus[slug]?.isLive ? c.nowAvailable : null);

  return (
    <PageLayout>
      <PageMeta
        title="My Courses | Tamu Academy"
        description="Track your enrolled courses, progress, and certificates at Tamu Academy."
        path="/my-courses"
      />

      <JourneyHero
        image={HERO_IMG}
        eyebrow={c.heroEyebrow}
        heading={c.heroHeading}
        subheading={c.heroSubheading}
        actions={[
          { label: c.browseCourses, to: '/courses' },
          { label: c.myProgress, to: '/my-progress', variant: 'secondary' },
        ]}
        step="02"
        stepLabel={c.stepLabel}
      />

      <JourneyBand tone="dark" eyebrow={c.resourcesEyebrow} heading={c.resourcesHeading}>
        <div style={{ marginBottom: '2.5rem' }}>
          <GuideContinueCard />
        </div>
        <DashboardLearnerTools />
      </JourneyBand>

      <JourneyBand tone="dark">
        <DashboardGroupFilter
          groups={DASHBOARD_GROUPS}
          activeId={activeGroup.id}
          isPreviewing={isPreviewing}
          onSelect={(id) => setViewGroupId(id === savedGroup?.id ? null : id)}
          onReset={() => setViewGroupId(null)}
          labels={{ label: c.filterLabel, note: c.filterNote, backToMyGroup: c.backToMyGroup }}
        />
        <DashboardFocusPanel group={activeGroup} isPreviewing={isPreviewing} labels={focusLabels} />
      </JourneyBand>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
          <div style={{ width: '2rem', height: '2rem', border: '3px solid rgba(232,184,91,0.2)', borderTopColor: '#e8b85b', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      ) : courses.length === 0 ? (
        <JourneyBand tone="parchment" eyebrow={c.emptyEyebrow} heading={c.emptyHeading} intro={c.emptyBody}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '2rem' }}>
            {ALL_COURSES.map((course, index) => (
              <JourneyCourseTile
                key={course.slug}
                index={index}
                number={COURSE_VISUALS[course.slug]?.number}
                title={course.title}
                description={course.subtitle}
                status={statusFor(course.slug)}
                visual={COURSE_VISUALS[course.slug]}
                actions={[{ label: c.courseOverview, to: `/courses/${course.slug}` }]}
              />
            ))}
          </div>
          <Link to="/courses" className="font-body" style={primaryButtonStyle}>
            {c.browseCourses} &rarr;
          </Link>
        </JourneyBand>
      ) : (
        <>
          {resumeTarget && (
            <JourneyBand tone="tint" eyebrow={c.resumeEyebrow} heading={c.resumeHeading}>
              <div style={{ maxWidth: '520px' }}>
                <JourneyCourseTile
                  number={COURSE_VISUALS[resumeTarget.slug]?.number}
                  title={`${resumeTarget.firstIncomplete.number}: ${resumeTarget.firstIncomplete.title}`}
                  description={resumeTarget.meta?.title}
                  status={statusFor(resumeTarget.slug)}
                  visual={COURSE_VISUALS[resumeTarget.slug]}
                  progress={{
                    completed: resumeTarget.completedCount,
                    total: resumeTarget.completion?.totalModules || 0,
                    label: c.progress,
                  }}
                  actions={[{
                    label: `${c.continueAt} ${resumeTarget.firstIncomplete.number}`,
                    to: `/courses/${resumeTarget.slug}/${resumeTarget.firstIncomplete.route}`,
                    primary: true,
                  }]}
                />
              </div>
            </JourneyBand>
          )}

          <JourneyBand tone="parchment" eyebrow={c.enrolledEyebrow} heading={c.enrolledHeading}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              {courses.map((enr, index) => {
                const meta = COURSE_META[enr.slug];
                const completedCount = enr.completion?.completedCount || 0;
                const totalModules = enr.completion?.totalModules || 0;
                const firstIncomplete = enr.completion?.incompleteModules?.[0] || null;
                const resumePath = firstIncomplete
                  ? `/courses/${enr.slug}/${firstIncomplete.route}`
                  : `/courses/${enr.slug}/completion`;
                const actions = [{
                  label: firstIncomplete ? `${c.resumeAt} ${firstIncomplete.number}` : c.reviewCompletion,
                  to: resumePath,
                  primary: true,
                }, {
                  label: c.courseOverview,
                  to: `/courses/${enr.slug}`,
                }];
                if (enr.completion?.certificateEligible) {
                  actions.push({ label: c.viewCertificate, to: `/courses/${enr.slug}/certificate` });
                }
                return (
                  <JourneyCourseTile
                    key={enr.slug}
                    index={index}
                    number={COURSE_VISUALS[enr.slug]?.number}
                    title={meta?.title}
                    description={meta?.subtitle}
                    status={statusFor(enr.slug)}
                    visual={COURSE_VISUALS[enr.slug]}
                    progress={{ completed: completedCount, total: totalModules, label: c.progress }}
                    actions={actions}
                  />
                );
              })}
            </div>
          </JourneyBand>
        </>
      )}

      <DashboardRecommendations
        id="dashboard-learning"
        eyebrow={c.recommendationsEyebrow}
        heading={c.recommendationsHeading}
        resume={resumeTarget ? {
          title: `${resumeTarget.firstIncomplete.number}: ${resumeTarget.firstIncomplete.title}`,
          body: resumeTarget.meta?.title,
          to: `/courses/${resumeTarget.slug}/${resumeTarget.firstIncomplete.route}`,
        } : null}
        items={activeGroup.learning}
        quickLinks={[...activeGroup.community, ...activeGroup.impact]}
        quickLinksLabel={c.quickLinksLabel}
        labels={{
          resume: c.resumeRecommendation,
          dataSaverTitle: c.dataSaverTitle,
          dataSaverBody: c.dataSaverBody,
          dataSaverOn: c.dataSaverOn,
          dataSaverOff: c.dataSaverOff,
        }}
        isDataSaver={isDataSaver}
        onToggleDataSaver={toggleMode}
      />

      <DashboardThemeSection id="dashboard-community" eyebrow={c.communityEyebrow} heading={c.communityHeading} items={activeGroup.community} />
      <DashboardThemeSection id="dashboard-impact" eyebrow={c.impactEyebrow} heading={c.impactHeading} items={activeGroup.impact} />

      <TamuGuideWidget />
    </PageLayout>
  );
}