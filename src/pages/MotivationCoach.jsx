import React from 'react';
import PageMeta from '@/components/seo/PageMeta';
import PageLayout from '@/components/page/PageLayout';
import MotivationChat from '@/components/agent/MotivationChat';

export default function MotivationCoach() {
  return (
    <>
      <PageMeta
        title="Motivation Coach | Tamu Academy"
        description="Feeling stuck in your course? Your Motivation Coach reviews your progress and helps you find your next step."
        path="/motivation-coach"
      />
      <PageLayout>
        <span className="font-body" style={{ color: '#D4A12A', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.75rem' }}>
          Learner Support
        </span>
        <h1 className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 400, lineHeight: 1.2, margin: '0 0 1rem' }}>
          Motivation Coach
        </h1>
        <p className="font-body" style={{ color: 'rgba(245,239,224,0.7)', fontSize: '1rem', lineHeight: 1.6, maxWidth: '620px', marginBottom: '2rem' }}>
          Every learner stalls sometimes. Your coach looks at where you are in your course, celebrates how far you have come, and helps you take the next step — without guilt, just encouragement.
        </p>
        <MotivationChat />
      </PageLayout>
    </>
  );
}