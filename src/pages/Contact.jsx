import React from 'react';
import PageMeta from '@/components/seo/PageMeta';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/page/PageLayout';
import PageHero from '@/components/page/PageHero';
import PageSection from '@/components/page/PageSection';
import ContactInquiryForm from '@/components/forms/ContactInquiryForm';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

const CONTENT = {
  heroEyebrow: 'Contact and Community',
  heroHeading: 'Connect With Tamu Academy',
  heroSubheading: 'Whether you are a prospective learner, educator, facilitator, community organization, potential partner, or supporter, we welcome thoughtful inquiries about the developing work of Tamu Academy.',
  introP: 'Tamu Academy is an emerging organisation and we read every message carefully. We may not always be able to respond immediately, but we are committed to engaging seriously with everyone who reaches out in good faith.',
  whoHeading: 'Who We Hear From',
  whoP1: 'We welcome inquiries from prospective learners, educators and facilitators, schools and universities, youth and community organisations, institutional partners, funders and supporters, and anyone curious about Tamu Academy\'s work.',
  whoP2Prefix: 'For institutional partnership inquiries, please use the inquiry form below and select',
  whoP2Em: 'University or Institutional Partnership',
  whoP2Suffix: 'as your inquiry type.',
  sendHeading: 'Send an Inquiry',
  formNotice1: 'This form is for general inquiries and expressions of interest. It is not a formal programme application.',
  formNotice2: 'Tamu Academy will review inquiries as capacity allows. Submission does not guarantee programme admission, partnership, funding, or participation.',
  communityHeading: 'Join the Community',
  communityP1: "Tamu Academy's learning community is forming. We are bringing together young people, educators, facilitators, and supporters who are serious about learning, dialogue, and leadership across cultures.",
  communityP2: 'If you want to be among the first to hear about upcoming programmes, pilot opportunities, and learning resources — please use the form above to let us know your interest.',
  linkProgrammes: 'Explore Programmes →',
  linkLearningAreas: 'Learning Areas →',
  linkResources: 'Resources →',
};

const bodyText = { color: 'rgba(245,239,224,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };
const mutedText = { color: 'rgba(245,239,224,0.52)', fontSize: '0.85rem', lineHeight: 1.75, fontWeight: 300 };

export default function Contact() {
  const { content: c } = useTranslatedContent('contact', CONTENT);

  return (
    <PageLayout>
      <PageMeta
        title="Contact | Tamu Academy"
        description="Contact Tamu Academy, express interest in proposed programmes, contribute as a facilitator, or discuss a community or institutional partnership."
        path="/contact"
      />
      <PageHero
        eyebrow={c.heroEyebrow}
        heading={c.heroHeading}
        subheading={c.heroSubheading}
      />

      <PageSection>
        <p className="font-body" style={bodyText}>{c.introP}</p>
      </PageSection>

      {/* Who we hear from */}
      <PageSection heading={c.whoHeading}>
        <p className="font-body" style={{ ...bodyText, marginBottom: '1.5rem' }}>{c.whoP1}</p>
        <p className="font-body" style={mutedText}>
          {c.whoP2Prefix} <em>{c.whoP2Em}</em> {c.whoP2Suffix}
        </p>
      </PageSection>

      {/* Form section */}
      <PageSection id="send-an-inquiry" heading={c.sendHeading}>
        {/* Pre-form notice */}
        <div style={{ marginBottom: '1.75rem', padding: '1rem 1.4rem', border: '1px solid rgba(212,161,42,0.16)', borderRadius: '3px', backgroundColor: 'rgba(212,161,42,0.025)' }}>
          <p className="font-body" style={{ color: 'rgba(245,239,224,0.65)', fontSize: '0.85rem', lineHeight: 1.7, fontWeight: 300, margin: '0 0 0.5rem' }}>
            {c.formNotice1}
          </p>
          <p className="font-body" style={{ color: 'rgba(245,239,224,0.45)', fontSize: '0.82rem', lineHeight: 1.6, fontWeight: 300, margin: 0 }}>
            {c.formNotice2}
          </p>
        </div>

        <ContactInquiryForm />
      </PageSection>

      {/* Community note — preserved */}
      <PageSection heading={c.communityHeading}>
        <p className="font-body" style={{ ...bodyText, marginBottom: '1.25rem' }}>{c.communityP1}</p>
        <p className="font-body" style={bodyText}>{c.communityP2}</p>
      </PageSection>

      {/* Related links */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', paddingTop: '1rem', borderTop: '1px solid rgba(212,161,42,0.1)' }}>
        <Link to="/programmes" style={{ color: '#D4A12A', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500 }}>
          {c.linkProgrammes}
        </Link>
        <Link to="/programmes#learning-areas" style={{ color: 'rgba(245,239,224,0.55)', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500 }}>
          {c.linkLearningAreas}
        </Link>
        <Link to="/resources" style={{ color: 'rgba(245,239,224,0.55)', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500 }}>
          {c.linkResources}
        </Link>
      </div>
    </PageLayout>
  );
}