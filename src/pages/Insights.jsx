import React from 'react';
import { motion } from 'framer-motion';
import PageLayout from '@/components/page/PageLayout';
import PageHero from '@/components/page/PageHero';
import PageSection from '@/components/page/PageSection';

const CATEGORIES = [
  { title: 'Articles and Reflections', desc: 'Short and long-form writing on topics connected to Tamu Academy\'s learning areas — from AI and governance to climate, culture, and leadership.' },
  { title: 'Short Educational Videos', desc: 'Accessible video content introducing key ideas, frameworks, and questions across Tamu Academy\'s learning areas.' },
  { title: 'Interviews and Conversations', desc: 'Conversations with practitioners, researchers, educators, and community leaders working at the intersection of policy, technology, and social change.' },
  { title: 'Policy Explainers', desc: 'Plain-language breakdowns of significant policies, institutions, and governance mechanisms — designed for learners without prior technical background.' },
  { title: 'Discussion Guides', desc: 'Structured guides for facilitating conversations in classrooms, youth groups, community organisations, and informal learning spaces.' },
  { title: 'Youth Perspectives', desc: 'Writing, storytelling, and reflections contributed by young people engaged with Tamu Academy\'s learning areas.' },
  { title: 'Recommended Books and Readings', desc: 'Curated reading suggestions across Tamu Academy\'s six learning areas, for learners at different levels of prior knowledge.' },
  { title: 'Tamu Academy Video Series', desc: 'An original video series exploring public policy, governance, global issues, and interdisciplinary leadership through accessible and engaging conversations.' },
];

const bodyText = { color: 'rgba(245,239,224,0.78)', fontSize: '0.95rem', lineHeight: 1.85, fontWeight: 300 };

export default function Insights() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Insights and Resources"
        heading="Ideas, Articles, and Learning Resources"
        subheading="Tamu Academy's Insights and Resources section will bring together accessible ideas, conversations, and learning materials for young people who want to better understand the forces shaping their communities and the wider world."
      />

      <PageSection>
        <p className="font-body" style={{ ...bodyText, marginBottom: '0.5rem' }}>
          As Tamu Academy's programmes develop, this space will grow into a public learning resource — freely accessible, thoughtfully curated, and connected to real conversations happening in classrooms, communities, and public life.
        </p>
      </PageSection>

      {/* Content categories */}
      <PageSection heading="Content Areas">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.1rem' }}>
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: i * 0.05 }}
              style={{ padding: '1.5rem', border: '1px solid rgba(212,161,42,0.14)', borderRadius: '4px', backgroundColor: 'rgba(245,239,224,0.02)' }}
            >
              <h3 className="font-heading" style={{ color: '#F5EFE0', fontSize: '1.1rem', fontWeight: 400, margin: '0 0 0.6rem', lineHeight: 1.3 }}>{cat.title}</h3>
              <p className="font-body" style={{ color: 'rgba(245,239,224,0.62)', fontSize: '0.86rem', lineHeight: 1.7, fontWeight: 300, margin: '0 0 1rem' }}>{cat.desc}</p>
              <span className="font-body" style={{ color: 'rgba(245,239,224,0.35)', fontSize: '0.67rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500 }}>Coming Soon</span>
            </motion.div>
          ))}
        </div>
      </PageSection>

      {/* Newsletter placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ padding: '2rem 2.25rem', border: '1px solid rgba(212,161,42,0.18)', borderRadius: '4px', backgroundColor: 'rgba(212,161,42,0.025)' }}
      >
        <h2 className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', fontWeight: 400, margin: '0 0 0.75rem' }}>Stay Informed</h2>
        <p className="font-body" style={{ color: 'rgba(245,239,224,0.72)', fontSize: '0.95rem', lineHeight: 1.8, fontWeight: 300, margin: '0 0 1rem' }}>
          Tamu Academy will share updates, new resources, and invitations to participate as they become available. A newsletter and community updates channel are in development.
        </p>
        <span className="font-body" style={{ color: 'rgba(245,239,224,0.38)', fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500 }}>Sign-up coming soon — check back here or contact us to express interest</span>
      </motion.div>
    </PageLayout>
  );
}