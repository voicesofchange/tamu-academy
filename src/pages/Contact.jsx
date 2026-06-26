import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/page/PageLayout';
import PageHero from '@/components/page/PageHero';
import PageSection from '@/components/page/PageSection';
import ContactInquiryForm from '@/components/forms/ContactInquiryForm';

const bodyText = { color: 'rgba(245,239,224,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };
const mutedText = { color: 'rgba(245,239,224,0.52)', fontSize: '0.85rem', lineHeight: 1.75, fontWeight: 300 };

export default function Contact() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Contact and Community"
        heading="Connect With Tamu Academy"
        subheading="Whether you are a prospective learner, educator, facilitator, community organization, potential partner, or supporter, we welcome thoughtful inquiries about the developing work of Tamu Academy."
      />

      <PageSection>
        <p className="font-body" style={bodyText}>
          Tamu Academy is an emerging organisation and we read every message carefully. We may not always be able to respond immediately, but we are committed to engaging seriously with everyone who reaches out in good faith.
        </p>
      </PageSection>

      {/* Who we hear from */}
      <PageSection heading="Who We Hear From">
        <p className="font-body" style={{ ...bodyText, marginBottom: '1.5rem' }}>
          We welcome inquiries from prospective learners, educators and facilitators, schools and universities, youth and community organisations, institutional partners, funders and supporters, and anyone curious about Tamu Academy's work.
        </p>
        <p className="font-body" style={mutedText}>
          For institutional partnership inquiries, you may also visit the{' '}
          <Link to="/partner" style={{ color: '#D4A12A', textDecoration: 'none' }}>Partnership page</Link>.
        </p>
      </PageSection>

      {/* Form section */}
      <PageSection heading="Send an Inquiry">
        {/* Pre-form notice */}
        <div style={{ marginBottom: '1.75rem', padding: '1rem 1.4rem', border: '1px solid rgba(212,161,42,0.16)', borderRadius: '3px', backgroundColor: 'rgba(212,161,42,0.025)' }}>
          <p className="font-body" style={{ color: 'rgba(245,239,224,0.65)', fontSize: '0.85rem', lineHeight: 1.7, fontWeight: 300, margin: '0 0 0.5rem' }}>
            This form is for general inquiries and expressions of interest. It is not a formal programme application.
          </p>
          <p className="font-body" style={{ color: 'rgba(245,239,224,0.45)', fontSize: '0.82rem', lineHeight: 1.6, fontWeight: 300, margin: 0 }}>
            Tamu Academy will review inquiries as capacity allows. Submission does not guarantee programme admission, partnership, funding, or participation.
          </p>
        </div>

        <ContactInquiryForm />
      </PageSection>

      {/* Community note — preserved */}
      <PageSection heading="Join the Community">
        <p className="font-body" style={{ ...bodyText, marginBottom: '1.25rem' }}>
          Tamu Academy's learning community is forming. We are bringing together young people, educators, facilitators, and supporters who are serious about learning, dialogue, and leadership across cultures.
        </p>
        <p className="font-body" style={bodyText}>
          If you want to be among the first to hear about upcoming programmes, pilot opportunities, and learning resources — please use the form above to let us know your interest.
        </p>
      </PageSection>

      {/* Related links */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', paddingTop: '1rem', borderTop: '1px solid rgba(212,161,42,0.1)' }}>
        <Link to="/programmes" style={{ color: '#D4A12A', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500 }}>
          Explore Programmes →
        </Link>
        <Link to="/partner" style={{ color: 'rgba(245,239,224,0.55)', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500 }}>
          Partner With Us →
        </Link>
        <Link to="/learning-areas" style={{ color: 'rgba(245,239,224,0.55)', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500 }}>
          Learning Areas →
        </Link>
      </div>
    </PageLayout>
  );
}