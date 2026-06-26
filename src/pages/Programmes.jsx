import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageLayout from '@/components/page/PageLayout';
import PageHero from '@/components/page/PageHero';
import PageSection from '@/components/page/PageSection';
import StatusBadge from '@/components/page/StatusBadge';

const FUTURE_LABS = [
  { title: 'Tamu Global Policy Lab', desc: 'A proposed interdisciplinary learning experience examining how international policy decisions are made and how young people can engage with global governance.' },
  { title: 'Tamu Climate Leadership Lab', desc: 'A proposed programme connecting climate literacy, environmental justice, and community-led action for young people on the frontlines of climate change.' },
  { title: 'Tamu Youth Writing Studio', desc: 'A proposed workshop series focused on helping young writers develop their voices for public communication, storytelling, and advocacy.' },
  { title: 'Tamu Economics and Opportunity Lab', desc: 'A proposed learning experience exploring economic systems, inequality, financial literacy, and pathways to opportunity for young people from diverse backgrounds.' },
  { title: 'Tamu Civic Leadership Fellowship', desc: 'A proposed programme for young people interested in civic engagement, public service, community advocacy, and democratic participation.' },
];

const MODEL_STEPS = [
  { label: 'Learn', desc: 'Engage with ideas, context, and evidence from multiple disciplines and perspectives.' },
  { label: 'Discuss', desc: 'Examine those ideas in dialogue with others whose backgrounds and views may differ.' },
  { label: 'Question', desc: 'Challenge assumptions, including your own. Ask who benefits, who is harmed, and what is missing.' },
  { label: 'Collaborate', desc: 'Work with others toward shared understanding or a shared project, navigating difference constructively.' },
  { label: 'Apply', desc: 'Connect learning to real situations — in your community, your work, or your personal decision-making.' },
  { label: 'Reflect', desc: 'Examine what changed in your thinking. Consider what you would do differently and what you still do not know.' },
];

const bodyText = { color: 'rgba(245,239,224,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };

export default function Programmes() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Programmes"
        heading="Our Programmes"
        subheading="Tamu Academy develops learning programmes that combine intercultural dialogue, practical knowledge, and community action."
      />

      {/* Programme Model */}
      <PageSection heading="The Tamu Academy Learning Model">
        <p className="font-body" style={{ ...bodyText, marginBottom: '2rem' }}>
          Every Tamu Academy programme is designed around a core sequence that moves learners from engagement with ideas toward real-world application and reflection.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          {MODEL_STEPS.map(({ label, desc }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: i * 0.07 }}
              style={{ padding: '1.4rem 1.6rem', border: '1px solid rgba(212,161,42,0.14)', borderRadius: '4px', backgroundColor: 'rgba(245,239,224,0.02)' }}
            >
              <span className="font-heading" style={{ color: '#D4A12A', fontSize: '1.15rem', fontWeight: 500, display: 'block', marginBottom: '0.5rem' }}>{label}</span>
              <p className="font-body" style={{ color: 'rgba(245,239,224,0.68)', fontSize: '0.87rem', lineHeight: 1.7, fontWeight: 300, margin: 0 }}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </PageSection>

      {/* Featured Programme */}
      <PageSection heading="Current Featured Programme">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ padding: '2.25rem', border: '1px solid rgba(212,161,42,0.28)', borderRadius: '4px', backgroundColor: 'rgba(212,161,42,0.03)' }}
        >
          <div style={{ marginBottom: '1rem' }}>
            <StatusBadge label="Proposed Pilot Programme" />
          </div>
          <h2 className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 400, lineHeight: 1.25, margin: '0 0 1rem' }}>
            Tamu Intercultural AI Leadership Lab
          </h2>
          <p className="font-body" style={{ ...bodyText, marginBottom: '1.5rem' }}>
            A proposed six-month learning and dialogue programme that will bring together culturally, linguistically, geographically, and socially diverse young people to examine how artificial intelligence affects identity, trust, language, misinformation, culture, and human relationships.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '1.75rem' }}>
            {[
              { label: 'Target Audience', value: 'Young people and emerging leaders' },
              { label: 'Format', value: 'Facilitated dialogue, workshops, cross-cultural exchange, collaborative research, and community projects' },
              { label: 'Core Themes', value: 'Human connection, cultural representation, responsible AI, digital trust, and intercultural leadership' },
            ].map(({ label, value }) => (
              <div key={label}>
                <span className="font-body" style={{ color: '#D4A12A', fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.4rem' }}>{label}</span>
                <p className="font-body" style={{ color: 'rgba(245,239,224,0.72)', fontSize: '0.87rem', lineHeight: 1.65, fontWeight: 300, margin: 0 }}>{value}</p>
              </div>
            ))}
          </div>
          <Link
            to="/programmes/intercultural-ai-leadership-lab"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#D4A12A', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, border: '1px solid rgba(212,161,42,0.35)', borderRadius: '2px', padding: '0.6rem 1.2rem', transition: 'border-color 0.25s ease' }}
          >
            Explore the Proposed Programme →
          </Link>
        </motion.div>
      </PageSection>

      {/* Future Labs */}
      <PageSection heading="Future Learning Labs">
        <p className="font-body" style={{ ...bodyText, marginBottom: '2rem' }}>
          The following represent possible future directions for Tamu Academy's programme work. None of these are currently operational. They are presented as part of a developing vision.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {FUTURE_LABS.map((lab, i) => (
            <motion.div
              key={lab.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: i * 0.06 }}
              style={{ padding: '1.5rem 1.75rem', border: '1px solid rgba(212,161,42,0.12)', borderRadius: '4px', backgroundColor: 'rgba(245,239,224,0.015)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <h3 className="font-heading" style={{ color: '#F5EFE0', fontSize: '1.15rem', fontWeight: 400, margin: 0 }}>{lab.title}</h3>
                <StatusBadge label="Future Programme Concept" />
              </div>
              <p className="font-body" style={{ color: 'rgba(245,239,224,0.65)', fontSize: '0.88rem', lineHeight: 1.7, fontWeight: 300, margin: 0 }}>{lab.desc}</p>
            </motion.div>
          ))}
        </div>
      </PageSection>
    </PageLayout>
  );
}