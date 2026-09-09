import React from 'react';
import PageMeta from '@/components/seo/PageMeta';
import PageLayout from '@/components/page/PageLayout';
import PageSection from '@/components/page/PageSection';
import LearnerStoryForm from '@/components/stories/LearnerStoryForm';
import FeaturedStories from '@/components/stories/FeaturedStories';
import { useTranslation } from '@/lib/i18n';

export default function LearnerStories() {
  const { t } = useTranslation();
  return (
    <PageLayout>
      <PageMeta
        title={`${t('stories.pageTitle')} — Tamu Academy`}
        description={t('stories.pageDescription')}
        path="/stories"
      />
      <PageSection
        eyebrow={t('stories.eyebrow')}
        heading={t('stories.heading')}
      >
        <p style={{ color: 'rgba(245,239,224,0.7)', fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', lineHeight: 1.7, maxWidth: '640px' }}>
          {t('stories.intro')}
        </p>
      </PageSection>

      <PageSection heading={t('stories.featuredHeading')}>
        <FeaturedStories />
      </PageSection>

      <PageSection heading={t('stories.submitHeading')}>
        <p style={{ color: 'rgba(245,239,224,0.6)', fontFamily: "'DM Sans', sans-serif", fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '640px' }}>
          {t('stories.submitIntro')}
        </p>
        <LearnerStoryForm />
      </PageSection>
    </PageLayout>
  );
}