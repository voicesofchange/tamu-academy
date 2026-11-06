import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';
import { localizeEmailCopy } from '../../shared/email-localization.js';
import { localizeCertificateLabels } from '../../shared/certificate-copy.js';
import {
  PROGRESS_COPY,
  WELCOME_COPY,
  buildProgressEmail,
  buildWelcomeEmail,
} from '../../shared/learner-emails.js';

// Temporary internal check: renders each message in a given language so the
// localization pipeline can be verified end to end. Not used by the app.
export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const language = body.language || 'fr';

    const welcomeCopy = await localizeEmailCopy(base44, language, WELCOME_COPY);
    const progressCopy = await localizeEmailCopy(base44, language, PROGRESS_COPY);
    const labels = await localizeCertificateLabels(base44, language);

    const welcome = buildWelcomeEmail(welcomeCopy, {
      learnerName: 'Amani Njeri',
      enrolledCourses: [
        { title: 'Building Wealth Together', url: 'https://tamuacademy.org/courses/building-wealth-together' },
      ],
      catalogueCourses: 'Course A and Course B',
      catalogueUrl: 'https://tamuacademy.org/courses',
    });

    const progress = buildProgressEmail(progressCopy, {
      firstName: 'Amani',
      courseTitle: 'Building Wealth Together',
      doneCount: 3,
      totalCount: 9,
      nextLabel: 'Module 4',
      url: 'https://tamuacademy.org/courses/building-wealth-together/module-4',
    });

    return Response.json({
      language,
      welcome_subject: welcome.subject,
      welcome_text: welcome.text.slice(0, 260),
      progress_subject: progress.subject,
      progress_text: progress.text.slice(0, 260),
      labels,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}