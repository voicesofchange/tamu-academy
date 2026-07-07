import React, { useState } from 'react';
import PageMeta from '@/components/seo/PageMeta';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
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

const LEARNING_AREAS = [
  {
    number: '01',
    title: 'Technology and Digital Citizenship',
    summary: 'Examining how technology — from digital platforms to emerging tools — shapes daily life, public discourse, identity, and community participation, and developing the critical thinking needed to navigate digital spaces responsibly.',
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

const bodyText = { color: 'rgba(245,239,224,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };

export default function Programmes() {
  const [expanded, setExpanded] = useState(null);
  const reduceMotion = useReducedMotion();
  return (
    <PageLayout>
      <PageMeta
        title="Programmes | Tamu Academy"
        description="Explore proposed and developing Tamu Academy programmes designed to connect interdisciplinary learning, dialogue, leadership, and community action."
        path="/programmes"
      />
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

      {/* Learning Areas */}
      <PageSection id="learning-areas" heading="Learning Areas">
        <p className="font-body" style={{ ...bodyText, marginBottom: '2rem' }}>
          Tamu Academy organises learning across six interconnected disciplines — bringing together the knowledge, conversations, and skills young people need to understand and shape a complex world.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          {LEARNING_AREAS.map((area, i) => {
            const open = expanded === i;
            return (
              <motion.div
                key={area.number}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.45, ease: 'easeOut', delay: i * 0.04 }}
                style={{ border: '1px solid rgba(212,161,42,0.16)', borderRadius: '4px', backgroundColor: 'rgba(245,239,224,0.02)', overflow: 'hidden' }}
              >
                <button
                  onClick={() => setExpanded(open ? null : i)}
                  aria-expanded={open}
                  aria-controls={`area-panel-${i}`}
                  style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '1.5rem 1.75rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', textAlign: 'left' }}
                >
                  <div>
                    <span className="font-heading" style={{ color: '#D4A12A', fontSize: '1.3rem', fontWeight: 400, opacity: 0.5, display: 'block', lineHeight: 1, marginBottom: '0.4rem' }}>{area.number}</span>
                    <h3 className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(1rem, 2.2vw, 1.3rem)', fontWeight: 400, lineHeight: 1.25, margin: 0 }}>{area.title}</h3>
                  </div>
                  <span aria-hidden="true" style={{ color: '#D4A12A', fontSize: '1.2rem', marginTop: '0.25rem', flexShrink: 0, transition: 'transform 0.25s ease', transform: open ? 'rotate(45deg)' : 'none' }}>+</span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={`area-panel-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.32, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ padding: '0 1.75rem 1.75rem', borderTop: '1px solid rgba(212,161,42,0.1)' }}>
                        <p className="font-body" style={{ ...bodyText, fontSize: '0.92rem', margin: '1.25rem 0' }}>{area.summary}</p>
                        <h4 className="font-body" style={{ color: '#D4A12A', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, margin: '0 0 0.6rem' }}>Questions Learners May Examine</h4>
                        <ul style={{ margin: '0 0 1.25rem', paddingLeft: '1.25rem' }}>
                          {area.questions.map((q) => (
                            <li key={q} className="font-body" style={{ color: 'rgba(245,239,224,0.72)', fontSize: '0.88rem', lineHeight: 1.75, fontWeight: 300, marginBottom: '0.4rem' }}>{q}</li>
                          ))}
                        </ul>
                        <h4 className="font-body" style={{ color: '#D4A12A', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, margin: '0 0 0.6rem' }}>Skills Learners May Develop</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1.25rem' }}>
                          {area.skills.map((s) => (
                            <span key={s} className="font-body" style={{ color: 'rgba(245,239,224,0.7)', fontSize: '0.78rem', border: '1px solid rgba(212,161,42,0.2)', borderRadius: '2px', padding: '0.22rem 0.65rem', fontWeight: 400 }}>{s}</span>
                          ))}
                        </div>
                        <p className="font-body" style={{ color: 'rgba(245,239,224,0.45)', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500, margin: 0 }}>{area.related}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </PageSection>

      {/* Proposed Initiatives */}
      <PageSection heading="Proposed Initiatives">
        <p className="font-body" style={{ ...bodyText, marginBottom: '2rem' }}>
          The following represent programme concepts currently under development. None are active programmes. They are presented transparently as part of Tamu Academy's developing vision.
        </p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ padding: '2.25rem', border: '1px solid rgba(212,161,42,0.2)', borderRadius: '4px', backgroundColor: 'rgba(245,239,224,0.015)', marginBottom: '1rem' }}
        >
          <div style={{ marginBottom: '1rem' }}>
            <StatusBadge label="Proposed Initiative" />
          </div>
          <h3 className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', fontWeight: 400, lineHeight: 1.25, margin: '0 0 0.75rem' }}>
            Tamu Intercultural AI Leadership Lab
          </h3>
          <p className="font-body" style={{ color: 'rgba(245,239,224,0.65)', fontSize: '0.87rem', lineHeight: 1.7, fontWeight: 300, marginBottom: '1.25rem' }}>
            A proposed six-month learning and dialogue programme that would bring together culturally, linguistically, geographically, and socially diverse young people to examine how artificial intelligence affects identity, trust, language, misinformation, culture, and human relationships. This is a programme concept, not a currently active programme.
          </p>
          <Link
            to="/programmes/intercultural-ai-leadership-lab"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#D4A12A', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, border: '1px solid rgba(212,161,42,0.3)', borderRadius: '2px', padding: '0.55rem 1.1rem' }}
          >
            Read the Full Concept →
          </Link>
        </motion.div>
      </PageSection>

      {/* Future Labs */}
      <PageSection heading="Future Programme Concepts">
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
      {/* Programme Interest CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ padding: '2rem 2.25rem', border: '1px solid rgba(212,161,42,0.2)', borderRadius: '4px', backgroundColor: 'rgba(212,161,42,0.025)', marginBottom: '2rem' }}
      >
        <h2 className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', fontWeight: 400, margin: '0 0 0.75rem' }}>Interested in a Programme?</h2>
        <p className="font-body" style={{ ...bodyText, marginBottom: '1.25rem' }}>
          Tamu Academy is developing its programmes thoughtfully and transparently. If you are a prospective learner, educator, community organisation, or institution interested in participating or collaborating, we welcome you to get in touch.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          <Link
            to="/contact?type=lab-interest"
            style={{ display: 'inline-flex', alignItems: 'center', color: '#1A130E', backgroundColor: '#D4A12A', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, border: '1px solid #D4A12A', borderRadius: '2px', padding: '0.65rem 1.3rem' }}
          >
            Express Programme Interest →
          </Link>
          <Link
            to="/contact?type=facilitator"
            style={{ display: 'inline-flex', alignItems: 'center', color: '#D4A12A', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, border: '1px solid rgba(212,161,42,0.4)', borderRadius: '2px', padding: '0.65rem 1.3rem' }}
          >
            Facilitator Enquiry →
          </Link>
        </div>
      </motion.div>
    </PageLayout>
  );
}