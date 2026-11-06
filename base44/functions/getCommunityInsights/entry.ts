import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';
import { COURSE_REGISTRY, getRequiredModuleRoutes } from '../../shared/course-registry.js';

const COURSE_SLUGS = [
  'understanding-african-economies-and-the-global-system',
  'mental-health-community-and-culture',
];

/** "module-2" reads as "Module 2"; any other route is humanised. */
function moduleLabel(route) {
  const numbered = /^module-(\d+)$/.exec(route || '');
  if (numbered) return `Module ${numbered[1]}`;
  const text = String(route || '').replace(/-/g, ' ').trim();
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : '';
}

function monthKey(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return null;
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    const isAdmin = user.role === 'admin';

    // ContactInquiry is admin-only under RLS; only fetch it for admins so its
    // geographic distribution is never exposed to ordinary learners.
    const [enrollments, certificates, moduleProgress, moduleOpens, stories, inquiries] = await Promise.all([
      base44.asServiceRole.entities.CourseEnrollment.list('-created_date', 2000),
      base44.asServiceRole.entities.CourseCertificate.list('-created_date', 500),
      base44.asServiceRole.entities.ModuleProgress.list('-created_date', 2000),
      isAdmin
        ? base44.asServiceRole.entities.ModuleOpen.list('-opened_at', 5000)
        : Promise.resolve([]),
      base44.asServiceRole.entities.LearnerStory.list('-created_date', 500),
      isAdmin
        ? base44.asServiceRole.entities.ContactInquiry.list('-created_date', 500)
        : Promise.resolve([]),
    ]);

    // Totals
    const totalEnrollments = enrollments.length;
    const totalCompletions = enrollments.filter(e => e.status === 'completed').length;
    const totalCertificates = certificates.filter(c => c.status !== 'revoked').length;
    const approvedStories = stories.filter(s => s.status === 'approved' || s.status === 'featured');
    const activeLearners = enrollments.filter(e => e.status === 'active').length;
    const avgProgress = totalEnrollments > 0
      ? Math.round(enrollments.reduce((sum, e) => sum + (e.progress_percentage || 0), 0) / totalEnrollments)
      : 0;

    // Enrollment trend (by month)
    const trendMap = {};
    for (const e of enrollments) {
      const key = monthKey(e.enrolled_at || e.created_date);
      if (!key) continue;
      if (!trendMap[key]) trendMap[key] = { month: key, enrollments: 0, completions: 0 };
      trendMap[key].enrollments++;
    }
    for (const e of enrollments) {
      if (e.status === 'completed') {
        const key = monthKey(e.completed_at || e.updated_at || e.created_date);
        if (!key) continue;
        if (!trendMap[key]) trendMap[key] = { month: key, enrollments: 0, completions: 0 };
        trendMap[key].completions++;
      }
    }
    const enrollmentTrend = Object.values(trendMap).sort((a, b) => a.month.localeCompare(b.month));

    // Course breakdown
    const courseMap = {};
    for (const slug of COURSE_SLUGS) {
      courseMap[slug] = { slug, enrollments: 0, completions: 0, certificates: 0 };
    }
    for (const e of enrollments) {
      if (courseMap[e.course_slug]) {
        courseMap[e.course_slug].enrollments++;
        if (e.status === 'completed') courseMap[e.course_slug].completions++;
      }
    }
    for (const c of certificates) {
      if (courseMap[c.course_slug]) courseMap[c.course_slug].certificates++;
    }
    const courseBreakdown = Object.values(courseMap);

    // Module milestones
    const moduleMap = {};
    for (const mp of moduleProgress) {
      if (mp.status !== 'completed') continue;
      const key = `${mp.course_slug}::${mp.module_slug}`;
      if (!moduleMap[key]) moduleMap[key] = { slug: mp.course_slug, module: mp.module_slug, completions: 0 };
      moduleMap[key].completions++;
    }
    const moduleMilestones = Object.values(moduleMap).sort((a, b) => {
      if (a.slug !== b.slug) return a.slug.localeCompare(b.slug);
      return a.module.localeCompare(b.module);
    });

    // Learner funnel per course — administrators only. Every figure counts
    // distinct learners, and each module's opened figure comes from ModuleOpen,
    // which is written when that module is first opened, so it is never a
    // completion signal. A course appears once anyone has enrolled in it.
    let moduleFunnel = [];
    if (isAdmin) {
      // Administrator accounts are staff, not learners. Their enrollments,
      // module opens and module completions are left out of every funnel
      // figure, so the counts describe learners only. Existing records are
      // kept exactly as they are: nothing is deleted, only not counted.
      const adminRows = await base44.asServiceRole.entities.User.filter({ role: 'admin' });
      const adminIds = new Set((adminRows || []).map((row) => row.id));
      const learnerRows = (rows) => (rows || []).filter((row) => row && !adminIds.has(row.learner_id));

      const funnelEnrollments = learnerRows(enrollments);
      const funnelOpens = learnerRows(moduleOpens);
      const funnelProgress = learnerRows(moduleProgress);

      const learnersWhere = (rows, matches) => {
        const ids = new Set();
        for (const row of rows || []) {
          if (row && row.learner_id && matches(row)) ids.add(row.learner_id);
        }
        return ids;
      };

      const courseMap = new Map();
      for (const enrollment of funnelEnrollments) {
        if (!enrollment.course_slug || courseMap.has(enrollment.course_slug)) continue;
        courseMap.set(enrollment.course_slug, {
          slug: enrollment.course_slug,
          title: COURSE_REGISTRY[enrollment.course_slug]?.title || enrollment.course_slug,
          moduleRoutes: getRequiredModuleRoutes(enrollment.course_slug),
        });
      }

      moduleFunnel = [...courseMap.values()]
        .map((course) => ({
          slug: course.slug,
          title: course.title,
          enrolled: learnersWhere(funnelEnrollments, (e) => e.course_slug === course.slug).size,
          completedCourse: learnersWhere(
            funnelEnrollments,
            (e) => e.course_slug === course.slug && e.status === 'completed',
          ).size,
          modules: course.moduleRoutes.map((route) => ({
            slug: route,
            label: moduleLabel(route),
            opened: learnersWhere(
              funnelOpens,
              (m) => m.course_slug === course.slug && m.module_slug === route,
            ).size,
            completed: learnersWhere(
              funnelProgress,
              (m) =>
                m.course_slug === course.slug &&
                m.module_slug === route &&
                m.status === 'completed',
            ).size,
          })),
        }))
        .sort((a, b) => b.enrolled - a.enrolled);
    }

    // Geographic reach — derived from ContactInquiry (admin-only). Only
    // populated for admins; empty for ordinary learners.
    const geoMap = {};
    for (const inq of inquiries) {
      if (!inq.country) continue;
      if (!geoMap[inq.country]) geoMap[inq.country] = 0;
      geoMap[inq.country]++;
    }
    const geographicReach = isAdmin
      ? Object.entries(geoMap)
          .map(([country, count]) => ({ country, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10)
      : [];

    // Story stats
    const ratedStories = approvedStories.filter(s => s.rating && s.rating > 0);
    const avgRating = ratedStories.length > 0
      ? Math.round((ratedStories.reduce((sum, s) => sum + s.rating, 0) / ratedStories.length) * 10) / 10
      : 0;
    const storyStats = {
      total: approvedStories.length,
      avgRating,
      stories: approvedStories.filter(s => s.story_type === 'story').length,
      reviews: approvedStories.filter(s => s.story_type === 'review').length,
    };

    // Recent module completion milestones (for real-time feed)
    const recentMilestones = moduleProgress
      .filter(mp => mp.status === 'completed' && mp.completed_at)
      .sort((a, b) => new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime())
      .slice(0, 12)
      .map(mp => ({
        course_slug: mp.course_slug,
        module_slug: mp.module_slug,
        completed_at: mp.completed_at,
      }));

    return Response.json({
      totals: {
        enrollments: totalEnrollments,
        completions: totalCompletions,
        certificates: totalCertificates,
        stories: approvedStories.length,
        activeLearners,
        avgProgress,
      },
      enrollmentTrend,
      courseBreakdown,
      moduleMilestones,
      moduleFunnel,
      geographicReach,
      storyStats,
      recentMilestones,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}