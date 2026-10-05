import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageMeta from '@/components/seo/PageMeta';
import PageLayout from '@/components/page/PageLayout';
import PageHero from '@/components/page/PageHero';
import PageSection from '@/components/page/PageSection';
import ProfileForm from '@/components/profile/ProfileForm';
import { useAuth } from '@/lib/AuthContext';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

const CONTENT = {
  heroEyebrow: 'Your Profile',
  heroHeading: 'How should we write your name?',
  heroSubheading:
    'Tell us how you would like your name written, and a little about where you are learning from. It takes a minute, and you can change it any time.',
  onboardingEyebrow: 'One Last Step',
  onboardingHeading: 'Welcome. Let us set up your profile.',
  onboardingSubheading:
    'Your name goes on your certificate exactly as you choose it. Add as much or as little as you like, then continue to your courses.',
  detailsEyebrow: 'Your Details',
  detailsHeading: 'Profile and preferences',
  detailsBody:
    'Only your name is required. Everything else is optional and helps Tamu Academy understand who our learning community is.',
  accountEyebrow: 'Account',
  accountHeading: 'Sign-in details',
  accountBody:
    'Your sign-in email and password are managed by Tamu Academy. Contact us if you need to change the email address on your account.',
  emailLabel: 'Email on your account',
};

export default function Profile() {
  const { content: c } = useTranslatedContent('profile', CONTENT);
  const { user } = useAuth();
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const isOnboarding = urlParams.get('onboarding') === '1';

  const handleSaved = () => {
    if (isOnboarding) {
      navigate('/welcome');
    }
  };

  return (
    <PageLayout>
      <PageMeta
        title="Your Profile — Tamu Academy"
        description="Choose how your name appears on your Tamu Academy certificates and tell us a little about yourself."
        path="/profile"
        noindex
      />
      <PageHero
        eyebrow={isOnboarding ? c.onboardingEyebrow : c.heroEyebrow}
        heading={isOnboarding ? c.onboardingHeading : c.heroHeading}
        subheading={isOnboarding ? c.onboardingSubheading : c.heroSubheading}
      />

      <PageSection
        eyebrow={c.detailsEyebrow}
        heading={c.detailsHeading}
        style={{ marginBottom: 0 }}
      >
        <p className="font-body" style={{ color: 'rgba(243,234,216,0.7)', fontSize: '0.95rem', lineHeight: 1.8, fontWeight: 300, marginBottom: '2rem', maxWidth: '640px' }}>
          {c.detailsBody}
        </p>
        <ProfileForm onSaved={handleSaved} />
      </PageSection>

      <PageSection eyebrow={c.accountEyebrow} heading={c.accountHeading} tone="tinted">
        <p className="font-body" style={{ color: 'rgba(243,234,216,0.7)', fontSize: '0.93rem', lineHeight: 1.8, fontWeight: 300, marginBottom: '1rem', maxWidth: '640px' }}>
          {c.accountBody}
        </p>
        <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '0.3rem', padding: '0.8rem 1.1rem', border: '1px solid rgba(232,184,91,0.22)', borderRadius: '3px', backgroundColor: 'rgba(243,234,216,0.02)' }}>
          <span className="font-body" style={{ color: 'rgba(243,234,216,0.5)', fontSize: '0.66rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500 }}>
            {c.emailLabel}
          </span>
          <span className="font-body" style={{ color: '#f8f0df', fontSize: '0.92rem', fontWeight: 400 }}>
            {user?.email || '—'}
          </span>
        </div>
      </PageSection>
    </PageLayout>
  );
}