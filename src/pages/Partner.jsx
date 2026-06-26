import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageLayout from '@/components/page/PageLayout';
import PageHero from '@/components/page/PageHero';
import PageSection from '@/components/page/PageSection';

const PARTNERSHIP_AREAS = [
  {
    title: 'Programme Collaboration',
    desc: 'For schools, universities, nonprofits, and youth organisations interested in hosting or co-developing learning activities with Tamu Academy. This may include shared facilitation, curriculum development, participant recruitment, or co-hosting dialogue events.',
    ctaLabel: 'Discuss Programme Collaboration',
    ctaTo: '/contact?type=institutional-partnership',
  },
  {
    title: 'Facilitators and Subject Matter Experts',
    desc: "For educators, researchers, practitioners, writers, and community leaders interested in contributing knowledge, facilitating sessions, or supporting the development of learning materials in any of Tamu Academy's six learning areas.",
    ctaLabel: 'Express Facilitator Interest',
    ctaTo: '/contact?type=facilitator',
  },
  {
    title: 'Community Access',
    desc: 'For organisations that can help reach young people who may not otherwise have access to interdisciplinary learning opportunities — including community centres, youth groups, religious organisations, libraries, and local networks.',
    ctaLabel: 'Connect as a Community Partner',
    ctaTo: '/contact?type=community-organization',
  },
  {
    title: 'Research and Learning Resources',
    desc: "For partners who may contribute case studies, educational materials, speakers, discussion frameworks, or learning tools that can enrich Tamu Academy's programme content and participant experience.",
    ctaLabel: 'Discuss Research Partnership',
    ctaTo: '/contact?type=institutional-partnership',
  },
  {
    title: 'Programme Support',
    desc: "For institutions or individuals interested in supporting participant access, learning materials, transportation, connectivity, or programme delivery. Tamu Academy is committed to keeping its programmes as accessible as possible.",
    ctaLabel: 'Express Support Interest',
    ctaTo: '/contact?type=partnership',
  },
  {
    title: 'Media and Storytelling',
    desc: "For collaborators interested in interviews, educational video, youth storytelling, podcasting, documentation, or public communication that amplifies the voices and experiences of Tamu Academy learners.",
    ctaLabel: 'Get in Touch',
    ctaTo: '/contact?type=partnership',
  },
];

const bodyText = { color: 'rgba(245,239,224,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };

export default function Partner() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Partnerships"
        heading="Partner With Tamu Academy"
        subheading="Tamu Academy is developing relationships with educators, youth organizations, community groups, researchers, institutions, and supporters who share a commitment to accessible learning and responsible leadership."
      />

      <PageSection>
        <p className="font-body" style={{ ...bodyText, marginBottom: '1.25rem' }}>
          We believe that the kind of learning Tamu Academy aspires to create cannot be built by a single organisation working alone. It requires educators who want to share what they know, communities that want to open their doors, and institutions that are willing to support learning for its own sake.
        </p>
        <p className="font-body" style={bodyText}>
          We are at an early stage. We are being honest about that. We are not looking for partners who need us to already be large or established. We are looking for partners who share a commitment to what we are trying to build — and who want to help shape it from the beginning.
        </p>
      </PageSection>

      <PageSection heading="Areas of Partnership">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.1rem' }}>
          {PARTNERSHIP_AREAS.map((area, i) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: i * 0.06 }}
              style={{ padding: '1.6rem', border: '1px solid rgba(212,161,42,0.14)', borderRadius: '4px', backgroundColor: 'rgba(245,239,224,0.02)', display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              <div>
                <h3 className="font-heading" style={{ color: '#F5EFE0', fontSize: '1.1rem', fontWeight: 400, margin: '0 0 0.7rem', lineHeight: 1.3 }}>{area.title}</h3>
                <p className="font-body" style={{ color: 'rgba(245,239,224,0.65)', fontSize: '0.88rem', lineHeight: 1.75, fontWeight: 300, margin: 0 }}>{area.desc}</p>
              </div>
              <Link
                to={area.ctaTo}
                className="font-body"
                style={{ color: '#D4A12A', fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, marginTop: 'auto' }}
              >
                {area.ctaLabel} →
              </Link>
            </motion.div>
          ))}
        </div>
      </PageSection>

      {/* Partnership note — preserved */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ padding: '1.5rem 2rem', borderLeft: '2px solid rgba(212,161,42,0.35)', backgroundColor: 'rgba(212,161,42,0.025)', marginBottom: '3rem' }}
      >
        <p className="font-body" style={{ color: 'rgba(245,239,224,0.72)', fontSize: '0.92rem', lineHeight: 1.8, fontWeight: 300, margin: 0, fontStyle: 'italic' }}>
          "Partnerships will be considered based on alignment with Tamu Academy's mission, learner needs, ethical standards, and current capacity."
        </p>
      </motion.div>

      {/* Primary CTA */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
        <Link
          to="/contact?type=partnership"
          style={{ display: 'inline-flex', alignItems: 'center', color: '#1A130E', backgroundColor: '#D4A12A', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, border: '1px solid #D4A12A', borderRadius: '2px', padding: '0.65rem 1.3rem' }}
        >
          Discuss a Partnership →
        </Link>
      </div>
    </PageLayout>
  );
}