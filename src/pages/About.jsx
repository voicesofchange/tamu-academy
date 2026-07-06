import React from 'react';
import PageMeta from '@/components/seo/PageMeta';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageLayout from '@/components/page/PageLayout';
import PageHero from '@/components/page/PageHero';
import PageSection from '@/components/page/PageSection';

const PRINCIPLES = [
  { title: 'Human Dignity', desc: 'Every learner deserves to be seen, heard, and respected regardless of background, identity, or prior education.' },
  { title: 'Intellectual Curiosity', desc: 'We encourage asking difficult questions, sitting with complexity, and resisting easy answers.' },
  { title: 'Intercultural Understanding', desc: 'We learn from the perspectives of people whose experiences, languages, and contexts differ from our own.' },
  { title: 'Responsible Leadership', desc: 'Knowledge carries a responsibility to act thoughtfully, ethically, and with awareness of impact.' },
  { title: 'Accessible Learning', desc: 'Serious ideas should not be confined to exclusive institutions. We work to lower the barriers to quality learning.' },
  { title: 'Community Application', desc: 'What we learn should connect to the communities we live in and the challenges people actually face.' },
  { title: 'Ethical Use of Technology', desc: 'We examine the human dimensions of technology — its power, its risks, and its relationship to dignity and justice.' },
];

const APPROACH_METHODS = [
  'Facilitated dialogue', 'Interactive workshops', 'Case studies',
  'Research and reflection', 'Storytelling', 'Cross-cultural exchange',
  'Collaborative projects', 'Community application',
];

const bodyText = { color: 'rgba(245,239,224,0.78)', fontSize: '1rem', lineHeight: 1.85, fontWeight: 300, margin: '0 0 1.25rem' };
const bodyTextClass = 'font-body';

export default function About() {
  return (
    <PageLayout>
      <PageMeta
        title="About Tamu Academy | Learning Across Cultures"
        description="Learn why Tamu Academy is developing accessible, interdisciplinary education that helps young people think critically, communicate across differences, and lead responsibly."
        path="/about"
      />
      <PageHero
        eyebrow="About Tamu Academy"
        heading="Learning Should Help Us Understand the World and One Another."
        subheading="Tamu Academy was created to expand access to thoughtful, interdisciplinary learning that connects global questions with community realities."
      />

      {/* Why Tamu Exists */}
      <PageSection heading="Why Tamu Academy Exists">
        <p className={bodyTextClass} style={bodyText}>
          Serious conversations about artificial intelligence, public policy, economics, culture, climate change, leadership, and global affairs are often concentrated in universities, professional institutions, and exclusive networks. Access to these conversations — and the knowledge and confidence they build — is unequally distributed.
        </p>
        <p className={bodyTextClass} style={bodyText}>
          Tamu Academy seeks to make these conversations more accessible to young people and emerging leaders from different educational, cultural, and socioeconomic backgrounds. We believe that the ideas shaping our world should not belong only to those who can already access elite learning spaces.
        </p>
      </PageSection>

      {/* Our Belief */}
      <PageSection heading="Our Belief">
        <p className={bodyTextClass} style={bodyText}>
          The challenges facing communities do not fit neatly into isolated academic subjects. The boundaries that divide disciplines in formal education do not reflect how the world actually works.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', margin: '1.5rem 0 1.5rem' }}>
          {[
            ['Technology', 'affects culture.'],
            ['Economics', 'affects opportunity.'],
            ['Policy', 'affects daily life.'],
            ['Climate change', 'affects migration, health, food, and livelihoods.'],
            ['Communication', 'affects whether people cooperate or become divided.'],
          ].map(([subject, effect]) => (
            <div key={subject} style={{ padding: '1.25rem 1.5rem', border: '1px solid rgba(212,161,42,0.14)', borderRadius: '4px', backgroundColor: 'rgba(245,239,224,0.02)' }}>
              <span className="font-heading" style={{ color: '#E2B652', fontSize: '1rem', fontWeight: 500 }}>{subject}</span>
              <span className={bodyTextClass} style={{ color: 'rgba(245,239,224,0.72)', fontSize: '0.93rem', fontWeight: 300 }}> {effect}</span>
            </div>
          ))}
        </div>
        <p className={bodyTextClass} style={bodyText}>
          Tamu Academy therefore uses interdisciplinary learning to help participants understand the connections across issues — and to act with greater clarity as a result.
        </p>
      </PageSection>

      {/* Mission */}
      <PageSection eyebrow="Mission">
        <blockquote style={{ borderLeft: '2px solid rgba(212,161,42,0.45)', paddingLeft: '1.5rem', margin: '0' }}>
          <p className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(1.1rem, 2.2vw, 1.35rem)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.7, margin: 0 }}>
            "Tamu Academy expands access to interdisciplinary learning that helps young people think critically, communicate across differences, and lead responsibly in their communities and the wider world."
          </p>
        </blockquote>
      </PageSection>

      {/* Vision */}
      <PageSection eyebrow="Vision">
        <blockquote style={{ borderLeft: '2px solid rgba(212,161,42,0.45)', paddingLeft: '1.5rem', margin: '0' }}>
          <p className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(1.1rem, 2.2vw, 1.35rem)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.7, margin: 0 }}>
            "A world in which young people from every background can access the knowledge, relationships, and confidence needed to help shape a more peaceful, inclusive, and sustainable future."
          </p>
        </blockquote>
      </PageSection>

      {/* Guiding Principles */}
      <PageSection heading="Guiding Principles">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.1rem' }}>
          {PRINCIPLES.map(({ title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.06 }}
              style={{ padding: '1.5rem', border: '1px solid rgba(212,161,42,0.14)', borderRadius: '4px', backgroundColor: 'rgba(245,239,224,0.02)' }}
            >
              <h3 className="font-heading" style={{ color: '#F5EFE0', fontSize: '1.15rem', fontWeight: 500, margin: '0 0 0.6rem', lineHeight: 1.3 }}>{title}</h3>
              <p className={bodyTextClass} style={{ color: 'rgba(245,239,224,0.68)', fontSize: '0.88rem', lineHeight: 1.75, fontWeight: 300, margin: 0 }}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </PageSection>

      {/* Our Approach */}
      <PageSection heading="Our Approach to Learning">
        <p className={bodyTextClass} style={bodyText}>
          Tamu Academy's learning model draws on a range of methods that emphasise participation, dialogue, and real-world relevance. Learning may include:
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '0.5rem' }}>
          {APPROACH_METHODS.map((m) => (
            <span key={m} className={bodyTextClass} style={{ color: 'rgba(245,239,224,0.78)', fontSize: '0.82rem', letterSpacing: '0.06em', border: '1px solid rgba(212,161,42,0.22)', borderRadius: '2px', padding: '0.35rem 0.85rem', fontWeight: 400 }}>{m}</span>
          ))}
        </div>
      </PageSection>

      {/* African Roots */}
      <PageSection heading="African Roots and Global Perspective">
        <p className={bodyTextClass} style={bodyText}>
          Tamu Academy is rooted in an African understanding of community, knowledge, responsibility, and connection. The name <em style={{ color: '#E2B652' }}>Tamu</em> — meaning sweet in Swahili — reflects a belief that learning should be nourishing, not punishing; that knowledge should serve communities, not merely credentialise individuals.
        </p>
        <p className={bodyTextClass} style={bodyText}>
          Africa is not a single culture. It is a continent of extraordinary cultural, linguistic, geographic, and intellectual diversity — home to thousands of languages, communities, and traditions of knowledge and governance. Tamu Academy draws inspiration from that diversity while engaging with learners and issues from across the world.
        </p>
        <p className={bodyTextClass} style={bodyText}>
          We approach global issues through lenses that are often underrepresented in mainstream educational spaces — and we believe that doing so produces richer, more honest, and more useful learning for everyone.
        </p>
      </PageSection>

      {/* Current Stage */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ padding: '2rem 2.25rem', border: '1px solid rgba(212,161,42,0.2)', borderRadius: '4px', backgroundColor: 'rgba(212,161,42,0.03)', marginBottom: '2rem' }}
      >
        <span className={bodyTextClass} style={{ color: '#D4A12A', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.75rem' }}>Current Stage</span>
        <p className={bodyTextClass} style={{ color: 'rgba(245,239,224,0.78)', fontSize: '0.97rem', lineHeight: 1.8, fontWeight: 300, margin: '0 0 1.25rem' }}>
          Tamu Academy is currently developing its learning model, digital resources, partnerships, and pilot programmes. We are building thoughtfully and transparently, prioritising quality and integrity over speed.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          <Link to="/programmes" style={{ color: '#D4A12A', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500 }}>Explore Programmes →</Link>
          <Link to="/contact?type=partnership" style={{ color: 'rgba(245,239,224,0.6)', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500 }}>Partner With Us →</Link>
          <Link to="/contact" style={{ color: 'rgba(245,239,224,0.6)', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500 }}>Get in Touch →</Link>
        </div>
      </motion.div>
    </PageLayout>
  );
}