import React from 'react';
import { Link, useParams } from 'react-router-dom';
import PageLayout from '@/components/page/PageLayout';
import PageMeta from '@/components/seo/PageMeta';
import GuideSectionView from '@/components/guide/GuideSectionView';
import GuideSectionShell from '@/components/guide/GuideSectionShell';
import KiooSectionView from '@/components/guide/KiooSectionView';
import KurudiSectionView from '@/components/guide/KurudiSectionView';
import { getGuideSection } from '@/lib/guide/sections';
import { creamText } from '@/lib/guide/styles';

/**
 * GuideSection — one Safari ya Utu section, using the same template for every
 * section. Kioo and Kurudi carry their own comparison behaviour.
 */
export default function GuideSection() {
  const { sectionId } = useParams();
  const section = getGuideSection(sectionId);

  if (!section) {
    return (
      <PageLayout>
        <PageMeta title="Section not found | Tamu Academy" description="This Learner's Guide section could not be found." path={`/learners-guide/${sectionId}`} noindex />
        <div style={{ padding: 'clamp(7rem, 12vw, 9rem) clamp(1.25rem, 5vw, 4rem) 4rem', maxWidth: '860px', margin: '0 auto' }}>
          <section className="guide-card" style={{ padding: '2rem' }}>
            <h1 className="font-guide-heading" style={{ ...creamText.heading, fontSize: '1.5rem', margin: '0 0 0.75rem' }}>
              That section is not part of the guide
            </h1>
            <p className="font-guide-body" style={{ ...creamText.body, margin: '0 0 1.25rem' }}>
              The link may be out of date. Every section of Safari ya Utu is listed on the guide home.
            </p>
            <Link to="/learners-guide" className="font-guide-body guide-link" style={{ fontSize: '0.85rem' }}>
              Back to the guide home &rarr;
            </Link>
          </section>
        </div>
      </PageLayout>
    );
  }

  let body;
  if (section.special === 'kioo') body = <KiooSectionView section={section} />;
  else if (section.special === 'kurudi') body = <KurudiSectionView section={section} />;
  else if (section.available) body = <GuideSectionView section={section} />;
  else body = <GuideSectionShell section={section} />;

  return (
    <PageLayout>
      <PageMeta
        title={`${section.english} (${section.swahili}) — Safari ya Utu | Tamu Academy`}
        description={`${section.english} — ${section.swahili}. A section of the Safari ya Utu Learner's Guide.`}
        path={`/learners-guide/${section.id}`}
        noindex
      />
      <div style={{ padding: 'clamp(7rem, 12vw, 9rem) clamp(1.25rem, 5vw, 4rem) clamp(3rem, 6vw, 5rem)', maxWidth: '880px', margin: '0 auto' }}>
        {body}
      </div>
    </PageLayout>
  );
}