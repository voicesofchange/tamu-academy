import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageLayout from '@/components/page/PageLayout';
import PageHero from '@/components/page/PageHero';
import PageSection from '@/components/page/PageSection';
import StatusBadge from '@/components/page/StatusBadge';

const AREAS = [
  {
    number: '01',
    title: 'Artificial Intelligence and Digital Citizenship',
    summary: 'Examining how artificial intelligence shapes daily life, public discourse, identity, and human relationships — and developing the critical thinking needed to navigate digital spaces responsibly.',
    questions: [
      'Who benefits from AI systems, and who is harmed by them?',
      'How does algorithmic bias reproduce or amplify existing inequalities?',
      'What does it mean to be a responsible digital citizen in a globally connected world?',
      'How do we protect privacy, dignity, and truth in online spaces?',
    ],
    skills: ['AI literacy', 'Digital ethics', 'Misinformation analysis', 'Algorithmic awareness', 'Responsible technology use'],
    related: 'Tamu Intercultural AI Leadership Lab (Proposed Pilot)',
  },
  {
    number: '02',
    title: 'Intercultural Leadership and Peacebuilding',
    summary: 'Building the dialogue skills, cultural humility, and collaborative capacity needed to lead across differences — from local communities to international contexts.',
    questions: [
      'How do identity, belonging, and experience shape how we hear and are heard by others?',
      'What does meaningful dialogue across cultural and political difference actually require?',
      'How can communities move from conflict toward understanding without erasing real disagreements?',
      'What does leadership look like when it is accountable to communities rather than institutions?',
    ],
    skills: ['Facilitated dialogue', 'Active listening', 'Conflict transformation', 'Cultural dignity', 'Collaborative leadership'],
    related: 'Tamu Global Policy Lab (Future Concept)',
  },
  {
    number: '03',
    title: 'Public Policy and Governance',
    summary: 'Understanding how government decisions are made, how public institutions work, and how young people can meaningfully participate in shaping the policies that affect their lives.',
    questions: [
      'How does a policy actually move from an idea to a law or programme?',
      'What role do citizens, communities, and civil society play in governance?',
      'How do we evaluate whether a policy is working — and for whom?',
      'What makes institutions accountable, and what allows them to become corrupt?',
    ],
    skills: ['Policy analysis', 'Civic participation', 'Institutional understanding', 'Community advocacy', 'Research and writing'],
    related: 'Tamu Civic Leadership Fellowship (Future Concept)',
  },
  {
    number: '04',
    title: 'Economics and Opportunity',
    summary: 'Examining how economic systems distribute opportunity, how decisions made by governments and institutions affect livelihoods, and how young people can develop financial and economic literacy.',
    questions: [
      'Why do some people and communities have access to opportunity while others do not?',
      'How do trade, technology, and policy shape who gets to work and on what terms?',
      'What is the relationship between economic inequality and political power?',
      'What does entrepreneurship mean in different cultural and economic contexts?',
    ],
    skills: ['Economic reasoning', 'Financial literacy', 'Inequality analysis', 'Understanding trade', 'Entrepreneurship thinking'],
    related: 'Tamu Economics and Opportunity Lab (Future Concept)',
  },
  {
    number: '05',
    title: 'Climate and Sustainability',
    summary: 'Exploring the causes and consequences of climate change, environmental justice, and the challenge of building sustainable communities — with particular attention to communities on the frontlines of climate impact.',
    questions: [
      'How does climate change affect communities differently depending on geography, income, and power?',
      'What is environmental justice, and how do frontline communities organise around it?',
      'How do food systems, transportation, and urban design connect to sustainability?',
      'What does community resilience look like in the face of climate disruption?',
    ],
    skills: ['Climate literacy', 'Environmental justice analysis', 'Systems thinking', 'Community resilience', 'Sustainable design awareness'],
    related: 'Tamu Climate Leadership Lab (Future Concept)',
  },
  {
    number: '06',
    title: 'Writing, Storytelling, and Communication',
    summary: 'Developing the skills to communicate ideas clearly, tell authentic stories, and engage public audiences — across cultures, platforms, and purposes.',
    questions: [
      'How do narrative choices shape what audiences believe and feel?',
      'What does it mean to communicate across cultural difference with honesty and respect?',
      'How can personal story become a tool for public understanding?',
      'What makes writing persuasive, and who gets to decide what counts as good writing?',
    ],
    skills: ['Narrative writing', 'Policy communication', 'Persuasive argumentation', 'Media literacy', 'Digital storytelling'],
    related: 'Tamu Youth Writing Studio (Future Concept)',
  },
];

const bodyText = { color: 'rgba(245,239,224,0.78)', fontSize: '0.95rem', lineHeight: 1.85, fontWeight: 300 };

export default function LearningAreas() {
  const [expanded, setExpanded] = useState(null);

  return (
    <PageLayout>
      <PageHero
        eyebrow="Learning Areas"
        heading="What We Explore"
        subheading="Tamu Academy organises learning across six interconnected disciplines — bringing together the knowledge, conversations, and skills young people need to understand and shape a complex world."
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '4rem' }}>
        {AREAS.map((area, i) => {
          const open = expanded === i;
          return (
            <motion.div
              key={area.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.04 }}
              style={{ border: '1px solid rgba(212,161,42,0.16)', borderRadius: '4px', backgroundColor: 'rgba(245,239,224,0.02)', overflow: 'hidden' }}
            >
              <button
                onClick={() => setExpanded(open ? null : i)}
                aria-expanded={open}
                style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '1.75rem 2rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', textAlign: 'left' }}
              >
                <div>
                  <span className="font-heading" style={{ color: '#D4A12A', fontSize: '1.6rem', fontWeight: 400, opacity: 0.55, display: 'block', lineHeight: 1, marginBottom: '0.5rem' }}>{area.number}</span>
                  <h2 className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', fontWeight: 400, lineHeight: 1.25, margin: 0 }}>{area.title}</h2>
                </div>
                <span aria-hidden="true" style={{ color: '#D4A12A', fontSize: '1.2rem', marginTop: '0.25rem', flexShrink: 0, transition: 'transform 0.25s ease', transform: open ? 'rotate(45deg)' : 'none' }}>+</span>
              </button>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ padding: '0 2rem 2rem', borderTop: '1px solid rgba(212,161,42,0.1)' }}>
                      <p className="font-body" style={{ ...bodyText, margin: '1.5rem 0 1.5rem' }}>{area.summary}</p>

                      <h3 className="font-body" style={{ color: '#D4A12A', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, margin: '0 0 0.75rem' }}>Questions Learners May Examine</h3>
                      <ul style={{ margin: '0 0 1.5rem', paddingLeft: '1.25rem' }}>
                        {area.questions.map((q) => (
                          <li key={q} className="font-body" style={{ ...bodyText, marginBottom: '0.5rem' }}>{q}</li>
                        ))}
                      </ul>

                      <h3 className="font-body" style={{ color: '#D4A12A', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, margin: '0 0 0.75rem' }}>Skills Learners May Develop</h3>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        {area.skills.map((s) => (
                          <span key={s} className="font-body" style={{ color: 'rgba(245,239,224,0.7)', fontSize: '0.8rem', border: '1px solid rgba(212,161,42,0.2)', borderRadius: '2px', padding: '0.25rem 0.7rem', fontWeight: 400 }}>{s}</span>
                        ))}
                      </div>

                      <h3 className="font-body" style={{ color: '#D4A12A', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, margin: '0 0 0.5rem' }}>Related Programmes</h3>
                      <p className="font-body" style={{ ...bodyText, fontSize: '0.85rem', margin: 0 }}>{area.related}</p>

                      <p className="font-body" style={{ color: 'rgba(245,239,224,0.38)', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500, marginTop: '1.25rem' }}>In Development</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <PageSection heading="Why Interdisciplinary Learning Matters">
        <p className="font-body" style={bodyText}>
          Real community challenges do not respect subject boundaries. A young person trying to understand why their neighbourhood flooded needs to understand climate science, urban planning, government policy, community organising, and economic inequality all at once.
        </p>
        <p className="font-body" style={{ ...bodyText, marginTop: '1rem' }}>
          Tamu Academy's programmes deliberately combine multiple learning areas because that is how the world works — and because learners who can connect ideas across disciplines are better equipped to understand complexity and take meaningful action within it.
        </p>
      </PageSection>
    </PageLayout>
  );
}