import React from 'react';
import PageMeta from '@/components/seo/PageMeta';
import { motion } from 'framer-motion';
import PageLayout from '@/components/page/PageLayout';
import PageHero from '@/components/page/PageHero';
import PageSection from '@/components/page/PageSection';

const RESOURCE_CATEGORIES = [
  {
    number: '01',
    title: 'AI and Digital Citizenship',
    desc: 'Resources exploring how artificial intelligence shapes daily life, digital rights, algorithmic bias, misinformation, and responsible technology use.',
  },
  {
    number: '02',
    title: 'Intercultural Leadership and Peacebuilding',
    desc: 'Materials on dialogue across difference, cultural humility, conflict transformation, and community-led leadership.',
  },
  {
    number: '03',
    title: 'Public Policy and Governance',
    desc: 'Accessible guides, explainers, and learning materials on how governments work, how policies are made, and how citizens can engage meaningfully.',
  },
  {
    number: '04',
    title: 'Economics and Opportunity',
    desc: 'Resources on economic systems, inequality, financial literacy, trade, and entrepreneurship from diverse global perspectives.',
  },
  {
    number: '05',
    title: 'Climate and Sustainability',
    desc: 'Materials on climate science, environmental justice, community resilience, and sustainable design for learners on the frontlines of climate change.',
  },
  {
    number: '06',
    title: 'Writing, Storytelling, and Communication',
    desc: 'Resources for developing voice, narrative skill, persuasive writing, media literacy, and cross-cultural communication.',
  },
];

const bodyText = { color: 'rgba(245,239,224,0.78)', fontSize: '0.95rem', lineHeight: 1.85, fontWeight: 300 };

export default function Resources() {
  return (
    <PageLayout>
      <PageMeta
        title="Resources | Tamu Academy"
        description="Tamu Academy is developing a curated collection of educational resources across its six learning areas — AI, intercultural leadership, policy, economics, climate, and communication."
        path="/resources"
      />
      <PageHero
        eyebrow="Resources"
        heading="Learning Resources"
        subheading="A developing collection of educational materials connected to Tamu Academy's six learning areas — freely accessible and thoughtfully curated."
      />

      <PageSection>
        <p className="font-body" style={{ ...bodyText, marginBottom: '1.25rem' }}>
          As Tamu Academy's programmes develop, this space will grow into a public learning resource — curated, connected to real conversations, and accessible to learners from different backgrounds and contexts.
        </p>
        <p className="font-body" style={bodyText}>
          Resources will include original Tamu Academy video content, articles, discussion guides, policy explainers, and curated reading recommendations. Approved materials will be added here as they become available.
        </p>
      </PageSection>

      {/* Resource categories */}
      <PageSection heading="Resource Areas">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
          {RESOURCE_CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.number}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: i * 0.05 }}
              style={{ padding: '1.75rem 2rem', border: '1px solid rgba(212,161,42,0.14)', borderRadius: '4px', backgroundColor: 'rgba(245,239,224,0.02)' }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span className="font-heading" style={{ color: '#D4A12A', fontSize: '1.3rem', fontWeight: 400, opacity: 0.5, display: 'block', lineHeight: 1, marginBottom: '0.4rem' }}>{cat.number}</span>
                  <h3 className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(1rem, 2.2vw, 1.3rem)', fontWeight: 400, lineHeight: 1.25, margin: '0 0 0.75rem' }}>{cat.title}</h3>
                  <p className="font-body" style={{ color: 'rgba(245,239,224,0.65)', fontSize: '0.88rem', lineHeight: 1.75, fontWeight: 300, margin: 0 }}>{cat.desc}</p>
                </div>
                <span className="font-body" style={{ color: 'rgba(245,239,224,0.3)', fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, flexShrink: 0, paddingTop: '0.25rem' }}>
                  Resources Coming Soon
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </PageSection>

      {/* Tamu Video Series — prepared slot */}
      <PageSection heading="Tamu Academy Video Series">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ padding: '2rem 2.25rem', border: '1px solid rgba(212,161,42,0.2)', borderRadius: '4px', backgroundColor: 'rgba(212,161,42,0.025)' }}
        >
          <p className="font-body" style={{ ...bodyText, marginBottom: '1rem' }}>
            Tamu Academy is developing an original video series exploring public policy, global affairs, intercultural leadership, and the ideas shaping our world — in accessible and engaging formats for young people and curious learners.
          </p>
          <span className="font-body" style={{ color: 'rgba(245,239,224,0.35)', fontSize: '0.68rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500 }}>
            Videos Coming Soon
          </span>
        </motion.div>
      </PageSection>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ padding: '1.5rem 2rem', borderLeft: '2px solid rgba(212,161,42,0.28)', backgroundColor: 'rgba(212,161,42,0.02)', marginBottom: '3rem' }}
      >
        <p className="font-body" style={{ color: 'rgba(245,239,224,0.62)', fontSize: '0.85rem', lineHeight: 1.8, fontWeight: 300, margin: 0, fontStyle: 'italic' }}>
          Tamu Academy curates educational materials for learning purposes. Inclusion does not imply formal partnership, endorsement, or institutional affiliation. External content remains the responsibility of its original publisher.
        </p>
      </motion.div>
    </PageLayout>
  );
}