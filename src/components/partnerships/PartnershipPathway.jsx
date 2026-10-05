import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

/**
 * PartnershipPathway — the educator and institution pathway, in one place.
 *
 * The three ways an educator or an institution can work with Tamu Academy,
 * followed by what happens once an inquiry is submitted. Shared by the About
 * and Courses pages so both describe the same pathway in the same words.
 *
 * Each offer links to the contact form carrying the inquiry type (and, for the
 * pilot, the programme) that the form already knows how to pre-select.
 */
const CONTENT = {
  eyebrow: 'Partnerships',
  heading: 'Learning for Educators and Institutions',
  intro: 'Tamu Academy works with schools, universities, youth organisations, nonprofits, public institutions and community programmes. There are three ways to bring Tamu Academy learning to the people you serve.',
  offers: [
    {
      audience: 'Educators and facilitators',
      title: 'Run a cohort with our materials',
      desc: 'Facilitator materials accompany each course: lesson plans, session guides, discussion prompts, activity sheets and slides. You lead the learning with your own group, at a pace that suits them, alongside our written course companions.',
      cta: 'Connect as an Educator',
      to: '/contact?type=facilitator',
    },
    {
      audience: 'Institutions',
      title: 'Institutional cohort enrolment',
      desc: 'We enrol your students, staff or members in an open Tamu Academy course. Your learners study through the platform at their own pace and receive certificates, and we provide progress and completion reporting for your cohort.',
      cta: 'Discuss Institutional Access',
      to: '/contact?type=partnership',
    },
    {
      audience: 'Institutions and community programmes',
      title: 'Co-designed pilot programme',
      desc: 'Where a course is still in development, we can plan a pilot together, adapting its focus, examples and activities to your curriculum, learners or community. The proposed Ubuntu and the Public Good programme is prepared for this kind of collaboration.',
      cta: 'Discuss a Pilot Partnership',
      to: '/contact?type=partnership&programme=ubuntu-and-the-public-good',
    },
  ],
  stepsHeading: 'How a Partnership Begins',
  steps: [
    'Tell us about your learners and what you want them to gain, using the partnership inquiry form.',
    'We review your inquiry and reply using the contact details you provide. If it looks like a good fit, we agree the format together.',
    'We prepare the materials, enrolment or pilot and confirm what will be delivered before anything begins.',
  ],
  note: 'Tamu Academy is an emerging organisation, and partnership inquiries are reviewed as capacity allows. Submitting an inquiry does not guarantee a partnership, admission or funding.',
};

const cardStyle = {
  padding: '1.6rem',
  border: '1px solid rgba(232,184,91,0.18)',
  borderRadius: '4px',
  backgroundColor: 'rgba(243,234,216,0.02)',
  display: 'flex',
  flexDirection: 'column',
};

const ctaStyle = {
  color: 'var(--tamu-gold)',
  fontSize: '0.68rem',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  textDecoration: 'none',
  fontWeight: 500,
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
};

export default function PartnershipPathway() {
  const { content: c } = useTranslatedContent('partnerships-pathway', CONTENT);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <p
        className="font-body"
        style={{ color: 'var(--tamu-gold)', fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 500, margin: '0 0 0.85rem' }}
      >
        {c.eyebrow}
      </p>
      <h2
        className="font-heading"
        style={{ color: 'var(--tamu-ink)', fontSize: 'clamp(1.5rem, 3.2vw, 2.2rem)', fontWeight: 400, lineHeight: 1.2, margin: '0 0 1rem', maxWidth: '680px' }}
      >
        {c.heading}
      </h2>
      <p
        className="font-body"
        style={{ color: 'rgba(243,234,216,0.7)', fontSize: '0.97rem', lineHeight: 1.8, fontWeight: 300, margin: '0 0 2.25rem', maxWidth: '680px' }}
      >
        {c.intro}
      </p>

      {/* The three ways to partner */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.1rem' }}>
        {c.offers.map((offer, i) => (
          <motion.div
            key={offer.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.08 }}
            className="tamu-card"
            style={cardStyle}
          >
            <span
              className="font-body"
              style={{ color: 'var(--tamu-gold)', fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.7rem' }}
            >
              {offer.audience}
            </span>
            <h3
              className="font-heading"
              style={{ color: 'var(--tamu-ink)', fontSize: '1.15rem', fontWeight: 500, lineHeight: 1.3, margin: '0 0 0.7rem' }}
            >
              {offer.title}
            </h3>
            <p
              className="font-body"
              style={{ color: 'rgba(243,234,216,0.68)', fontSize: '0.88rem', lineHeight: 1.75, fontWeight: 300, margin: '0 0 1.4rem', flexGrow: 1 }}
            >
              {offer.desc}
            </p>
            <Link to={offer.to} className="font-body" style={ctaStyle}>
              {offer.cta} →
            </Link>
          </motion.div>
        ))}
      </div>

      {/* What happens after an inquiry */}
      <div style={{ marginTop: '3rem', paddingTop: '2.5rem', borderTop: '1px solid rgba(232,184,91,0.14)' }}>
        <h3
          className="font-heading"
          style={{ color: 'var(--tamu-ink)', fontSize: '1.25rem', fontWeight: 400, margin: '0 0 1.5rem' }}
        >
          {c.stepsHeading}
        </h3>
        <ol
          style={{ listStyle: 'none', padding: 0, margin: '0 0 1.75rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}
        >
          {c.steps.map((step, i) => (
            <li key={i}>
              <span
                className="font-heading"
                style={{ color: 'var(--tamu-gold)', fontSize: '1.35rem', fontWeight: 400, display: 'block', marginBottom: '0.5rem' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                className="font-body"
                style={{ color: 'rgba(243,234,216,0.7)', fontSize: '0.88rem', lineHeight: 1.75, fontWeight: 300 }}
              >
                {step}
              </span>
            </li>
          ))}
        </ol>
        <p
          className="font-body"
          style={{ color: 'rgba(243,234,216,0.5)', fontSize: '0.82rem', lineHeight: 1.7, fontWeight: 300, margin: 0 }}
        >
          {c.note}
        </p>
      </div>
    </div>
  );
}