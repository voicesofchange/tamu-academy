import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageLayout from '@/components/page/PageLayout';
import PageHero from '@/components/page/PageHero';
import PageSection from '@/components/page/PageSection';

const INQUIRY_TYPES = [
  'Prospective learner',
  'Parent or community member',
  'Educator or facilitator',
  'School or university',
  'Youth or community organisation',
  'Institutional partner',
  'Funder or supporter',
  'Media or interview inquiry',
  'General inquiry',
];

const bodyText = { color: 'rgba(245,239,224,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };

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

      {/* Inquiry types */}
      <PageSection heading="Who We Hear From">
        <p className="font-body" style={{ ...bodyText, marginBottom: '1.5rem' }}>
          We welcome inquiries from:
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '2rem' }}>
          {INQUIRY_TYPES.map((type) => (
            <span key={type} className="font-body" style={{ color: 'rgba(245,239,224,0.75)', fontSize: '0.83rem', border: '1px solid rgba(212,161,42,0.2)', borderRadius: '2px', padding: '0.35rem 0.85rem', fontWeight: 400 }}>
              {type}
            </span>
          ))}
        </div>
      </PageSection>

      {/* Contact method */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ padding: '2rem 2.25rem', border: '1px solid rgba(212,161,42,0.2)', borderRadius: '4px', backgroundColor: 'rgba(212,161,42,0.025)', marginBottom: '3rem' }}
      >
        <h2 className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', fontWeight: 400, margin: '0 0 1rem' }}>How to Reach Us</h2>
        <p className="font-body" style={{ color: 'rgba(245,239,224,0.72)', fontSize: '0.95rem', lineHeight: 1.8, fontWeight: 300, margin: '0 0 1.25rem' }}>
          A formal contact form is in development. In the meantime, please reach out through Tamu Academy's available social channels or through the Waiyaki House LLC contact information below.
        </p>
        <p className="font-body" style={{ color: 'rgba(245,239,224,0.45)', fontSize: '0.8rem', lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
          Contact details will be published here as they are confirmed. We do not publish contact information we are not authorised to share publicly.
        </p>
      </motion.div>

      {/* Community note */}
      <PageSection heading="Join the Community">
        <p className="font-body" style={{ ...bodyText, marginBottom: '1.25rem' }}>
          Tamu Academy's learning community is forming. We are bringing together young people, educators, facilitators, and supporters who are serious about learning, dialogue, and leadership across cultures.
        </p>
        <p className="font-body" style={bodyText}>
          If you want to be among the first to hear about upcoming programmes, pilot opportunities, and learning resources — please get in touch and let us know your interest.
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