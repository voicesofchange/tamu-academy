import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';

const COURSE_SLUGS = [
  'understanding-african-economies-and-the-global-system',
  'mental-health-community-and-culture',
];

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

    const [enrollments, certificates, moduleProgress, stories, inquiries] = await Promise.all([
      base44.asServiceRole.entities.CourseEnrollment.list('-created_date', 500),
      base44.asServiceRole.entities.CourseCertificate.list('-created_date', 500),
      base44.asServiceRole.entities.ModuleProgress.list('-created_date', 500),
      base44.asServiceRole.entities.LearnerStory.list('-created_date', 500),
      base44.asServiceRole.entities.ContactInquiry.list('-created_date', 500),
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

    // Geographic reach
    const geoMap = {};
    for (const inq of inquiries) {
      if (!inq.country) continue;
      if (!geoMap[inq.country]) geoMap[inq.country] = 0;
      geoMap[inq.country]++;
    }
    const geographicReach = Object.entries(geoMap)
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

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
      geographicReach,
      storyStats,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}