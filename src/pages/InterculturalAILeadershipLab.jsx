import React from 'react';
import PageMeta from '@/components/seo/PageMeta';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageLayout from '@/components/page/PageLayout';
import PageSection from '@/components/page/PageSection';
import StatusBadge from '@/components/page/StatusBadge';
import LabPrinciples from '@/components/lab/LabPrinciples';
import LabLearningModel from '@/components/lab/LabLearningModel';
import LabCurriculum from '@/components/lab/LabCurriculum';
import LabFAQ from '@/components/lab/LabFAQ';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

const body = { color: 'rgba(243,234,216,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };
const bodyMuted = { color: 'rgba(243,234,216,0.58)', fontSize: '0.88rem', lineHeight: 1.8, fontWeight: 300 };

const CTAButton = ({ to, primary, children }) => (
  <Link
    to={to}
    style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
      color: primary ? '#24150f' : '#e8b85b',
      backgroundColor: primary ? '#e8b85b' : 'transparent',
      fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase',
      textDecoration: 'none', fontWeight: 500,
      border: '1px solid rgba(232,184,91,0.5)',
      borderRadius: '2px', padding: '0.65rem 1.3rem',
    }}
  >
    {children}
  </Link>
);

const CONTENT = {
  statusBadge: 'Proposed Initiative',
  disclosure: 'The Tamu Intercultural AI Leadership Lab is a proposed programme concept currently under development. It is not yet an active Tamu Academy programme.',
  heroHeading: 'Tamu Intercultural AI Leadership Lab',
  heroSubtitle: 'Human connection, cultural dignity, and responsible leadership in the age of artificial intelligence.',
  heroBody: 'Artificial intelligence is changing how young people communicate, learn, receive information, understand other communities, and participate in public life. This proposed programme places direct human dialogue at the centre of that change.',
  ctaExpress: 'Express Interest',
  ctaExploreProgramme: 'Explore the Programme ↓',
  coreQuote: 'Dialogue is the method. Artificial intelligence is the subject. Intercultural leadership is the outcome.',
  whyEyebrow: 'Context',
  whyHeading: 'Technology Connects Us, but Connection Is Not the Same as Understanding.',
  whyP1: 'AI systems and digital platforms increasingly shape the information young people encounter, how communities are described, which languages and knowledge systems are visible, and how people interpret cultural and political differences. They influence how misinformation spreads, who has access to new opportunities, and whether digital communication increases trust or deepens division.',
  whyP2: 'Artificial intelligence may support education, communication, translation, research, accessibility, and civic participation. Used thoughtfully, it can help young people learn, connect, and act across boundaries that might otherwise feel insurmountable.',
  whyP3: 'It may also reproduce stereotypes, exclude African languages and local knowledge systems, deepen digital inequality, and create the appearance of understanding without meaningful human engagement. The same technologies that seem to connect us can, without care, make it harder to genuinely see one another.',
  purposeEyebrow: 'Programme Purpose',
  purposeHeading: 'Learning to Lead Where Culture and Technology Meet.',
  purposeP1: 'The proposed Lab would equip young people with the knowledge, dialogue skills, and practical experience needed to examine artificial intelligence critically, communicate across cultural differences, and develop responsible community responses.',
  purposeP2: 'This programme is not intended to train software engineers. Its focus is on developing leaders who understand the human dimensions of technology — who can ask the right questions, facilitate honest conversations, and help their communities navigate a changing digital world with clarity and integrity.',
  purposeTags: ['AI literacy', 'Digital citizenship', 'Intercultural dialogue', 'Cultural representation', 'Ethical leadership', 'Misinformation and trust', 'Language inclusion', 'Community action'],
  participantsEyebrow: 'Participants',
  participantsHeading: 'Who the Lab Is Designed For',
  participantsP1: 'The proposed programme is intended for young people and emerging leaders from different cultural and ethnic communities, linguistic backgrounds, counties and geographic settings — including rural, peri-urban, and urban communities — and from varied educational pathways, socioeconomic circumstances, and levels of digital access and AI familiarity.',
  participantsTargetLabel: 'Proposed Target',
  participantsTargetValue: 'Approximately 25 to 30 participants',
  participantsNote: 'Final eligibility requirements, geographic scope, age range, programme dates, and participation process will be announced only after the pilot is confirmed.',
  principlesEyebrow: 'Programme Principles',
  principlesHeading: 'What the Lab Stands For',
  modelEyebrow: 'Learning Model',
  modelHeading: 'From Learning to Dialogue to Community Action',
  modelP: 'The proposed Lab is structured as a progression — from building trust and foundational knowledge, through critical examination and facilitated dialogue, toward youth-led creation, community action, and reflection.',
  curriculumEyebrow: 'Proposed Curriculum',
  curriculumHeading: 'Eight Proposed Learning Modules',
  curriculumP: 'The following modules represent the proposed curriculum arc. Each would be explored through discussion, case studies, cross-cultural exchange, and practical activity rather than conventional lecture.',
  signatureLabel: 'Signature Activity',
  signatureHeading: 'Human Before Machine',
  signatureQuote: 'What can another human being teach us that an algorithm cannot?',
  signatureP1: 'Each participant would be paired with someone from a different cultural, linguistic, geographic, or social background. Before consulting an AI system, the participants would interview one another about family, language, community, identity, traditions, misconceptions, belonging, and their hopes for the future.',
  signatureP2: 'Participants would then ask an AI system similar questions about the other person\'s community and compare the results. They would consider:',
  signatureQuestions: [
    'What did the direct conversation reveal?',
    'What did the AI describe accurately?',
    'What did the AI misunderstand?',
    'What cultural context was missing?',
    'What stereotypes or assumptions appeared?',
    'What could only be learned through trust and direct human engagement?',
    "How did the conversation alter the participant's own perspective?",
  ],
  signatureNote: 'This activity is not intended to reject AI. Its purpose is to demonstrate that technology can support learning but cannot replace lived experience, mutual trust, cultural context, or genuine dialogue.',
  timelineEyebrow: 'Proposed Timeline',
  timelineHeading: 'A Provisional Six-Month Structure',
  timelineIntro: 'The following represents a provisional sequence. Exact dates have not been set and will be confirmed only after the pilot is approved.',
  timeline: [
    { month: 'Month 1', label: 'Foundations', desc: 'Recruitment, orientation, facilitator preparation, and baseline reflection.' },
    { month: 'Month 2', label: 'Identity and Trust', desc: 'Story circles, human connection, intercultural trust building, and personal narrative.' },
    { month: 'Month 3', label: 'AI and Culture', desc: 'AI literacy, bias, cultural representation, language, and misinformation.' },
    { month: 'Month 4', label: 'Dialogue', desc: 'Human Before Machine exchanges, facilitated dialogue sessions, and digital storytelling.' },
    { month: 'Month 5', label: 'Action', desc: 'Youth team projects and community engagement design.' },
    { month: 'Month 6', label: 'Sharing and Reflection', desc: 'Public dialogue, youth recommendations, programme evaluation, and continued engagement planning.' },
  ],
  projectsEyebrow: 'Possible Youth-Led Projects',
  projectsHeading: 'What Participants Might Create',
  projectsIntro: 'The following are illustrative examples only. Actual participant projects would be shaped by community needs, participant interests, available resources, and facilitator guidance.',
  projects: [
    'A local-language digital story collection',
    'An AI misinformation workshop for students',
    'A youth guide to recognising cultural bias in AI',
    'A podcast about identity, technology, and belonging',
    'An intercultural dialogue club',
    'A responsible AI discussion guide',
    'A community archive of environmental or cultural knowledge',
    'A digital inclusion workshop for young people with limited AI access',
  ],
  outcomesEyebrow: 'Proposed Outcomes',
  outcomesHeading: 'What the Pilot Would Aim to Produce',
  outcomesIntro: 'All items below are proposed targets. None have been achieved yet.',
  outcomes: [
    'Approximately 25 to 30 participating youth leaders (proposed target)',
    'A structured intercultural AI learning curriculum',
    'Cross-cultural participant interviews',
    'Youth-led community projects',
    'A practical guide on culture, dialogue, and responsible AI',
    'A public youth dialogue or presentation forum',
    'Youth recommendations concerning culturally inclusive and human-centred AI',
    'A continuing community of participants and facilitators',
  ],
  identityEyebrow: 'Programme Identity',
  identityHeading: 'What Makes the Lab Different',
  identityNotHeading: 'The Lab is not',
  identityNotItems: [
    'A coding boot camp',
    'A conventional lecture course',
    'A technology promotion campaign',
    'A debate in which one side must win',
    'A programme that treats cultures as fixed or uniform',
  ],
  identityIsHeading: 'The Lab is',
  identityIsItems: [
    'A facilitated learning experience',
    'A space for serious dialogue',
    'An examination of technology through lived experience',
    'A leadership development programme',
    'A platform for youth-created community responses',
    'A model that values African languages, knowledge, and cultural diversity',
  ],
  facilitationEyebrow: 'Facilitation and Safeguarding',
  facilitationHeading: 'How a Confirmed Pilot Would Be Structured',
  facilitationIntro: 'The final pilot design would include:',
  facilitationItems: [
    'Trained facilitators',
    'Clear community agreements',
    'Respectful dialogue standards',
    'Protection of participant privacy',
    'Informed consent for recorded stories or media',
    'Appropriate safeguarding procedures',
    'Responsible handling of cultural and personal information',
    'Accessible participation arrangements',
  ],
  interestEyebrow: 'Get Involved',
  interestHeading: 'Express Your Interest',
  interestP: 'The Lab is at the proposal stage. We are not yet accepting applications. However, we welcome expressions of interest from prospective participants, facilitators, and partners.',
  interestPaths: [
    { role: 'Prospective Participant', desc: 'For young people interested in receiving updates if the proposed pilot is confirmed.', cta: 'Register Your Interest', to: '/contact?type=programme-interest&programme=intercultural-ai-leadership-lab' },
    { role: 'Educator or Facilitator', desc: 'For educators, researchers, practitioners, cultural leaders, and dialogue facilitators interested in contributing knowledge or facilitation.', cta: 'Connect as a Facilitator', to: '/contact?type=facilitator&programme=intercultural-ai-leadership-lab' },
    { role: 'Community or Institutional Partner', desc: 'For schools, universities, youth organisations, nonprofits, community groups, and supporters interested in programme collaboration or access.', cta: 'Discuss a Partnership', to: '/contact?type=partnership&programme=intercultural-ai-leadership-lab' },
  ],
  faqEyebrow: 'Frequently Asked Questions',
  faqHeading: 'Questions About the Programme',
  finalCtaHeading: 'Help Shape a More Human Future With Technology.',
  finalCtaBody: 'The future of artificial intelligence should not be determined only by engineers, companies, or institutions. Young people and communities should also have opportunities to examine how technology affects their identities, relationships, languages, and futures.',
  finalCtaPartner: 'Partner With Tamu Academy',
};

export default function InterculturalAILeadershipLab() {
  const { content: c } = useTranslatedContent('lab', CONTENT);

  return (
    <PageLayout>
      <PageMeta
        title="Tamu Intercultural AI Leadership Lab | Tamu Academy"
        description="Explore a proposed youth learning and dialogue programme focused on human connection, cultural representation, digital trust, and responsible leadership in the age of artificial intelligence."
        path="/programmes/intercultural-ai-leadership-lab"
        noindex={true}
      />

      {/* ── DISCLOSURE ───────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ padding: '1rem 1.4rem', border: '1px solid rgba(232,184,91,0.18)', borderRadius: '4px', backgroundColor: 'rgba(243,234,216,0.02)', marginBottom: '2.5rem' }}
      >
        <p className="font-body" style={{ color: 'rgba(243,234,216,0.62)', fontSize: '0.88rem', lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
          {c.disclosure}
        </p>
      </motion.div>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <div style={{ marginBottom: '4.5rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '1.25rem' }}
        >
          <StatusBadge label={c.statusBadge} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          className="font-heading"
          style={{ color: '#f8f0df', fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 400, lineHeight: 1.15, margin: '0 0 1rem', maxWidth: '720px' }}
        >
          {c.heroHeading}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.25 }}
          className="font-heading"
          style={{ color: 'rgba(232,184,91,0.88)', fontSize: 'clamp(1.05rem, 2.2vw, 1.35rem)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.6, margin: '0 0 1.25rem', maxWidth: '640px' }}
        >
          {c.heroSubtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0.4 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.35 }}
          aria-hidden="true"
          style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, transparent, #e8b85b 35%, #E2B652 50%, #e8b85b 65%, transparent)', margin: '0 0 1.75rem', transformOrigin: 'left' }}
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.45 }}
          className="font-body"
          style={{ ...body, maxWidth: '640px', marginBottom: '2rem' }}
        >
          {c.heroBody}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', alignItems: 'center' }}
        >
          <CTAButton to="/contact?type=programme-interest&programme=intercultural-ai-leadership-lab" primary>{c.ctaExpress}</CTAButton>
          <a
            href="#programme-model"
            className="font-body"
            style={{ color: 'rgba(243,234,216,0.65)', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500 }}
          >
            {c.ctaExploreProgramme}
          </a>
        </motion.div>
      </div>

      {/* ── CORE PRINCIPLE STATEMENT ─────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6 }}
        style={{ padding: '1.75rem 2rem', borderLeft: '2px solid rgba(232,184,91,0.45)', backgroundColor: 'rgba(232,184,91,0.04)', marginBottom: '4.5rem' }}
      >
        <p className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.05rem, 2.2vw, 1.3rem)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.7, margin: 0 }}>
          "{c.coreQuote}"
        </p>
      </motion.div>

      {/* ── WHY THIS MATTERS ─────────────────────────────────────── */}
      <PageSection eyebrow={c.whyEyebrow} heading={c.whyHeading}>
        <p className="font-body" style={{ ...body, marginBottom: '1.25rem' }}>{c.whyP1}</p>
        <p className="font-body" style={{ ...body, marginBottom: '1.25rem' }}>{c.whyP2}</p>
        <p className="font-body" style={body}>{c.whyP3}</p>
      </PageSection>

      {/* ── PROGRAMME PURPOSE ────────────────────────────────────── */}
      <PageSection eyebrow={c.purposeEyebrow} heading={c.purposeHeading}>
        <p className="font-body" style={{ ...body, marginBottom: '1.5rem' }}>{c.purposeP1}</p>
        <p className="font-body" style={{ ...body, marginBottom: '1.5rem' }}>{c.purposeP2}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem' }}>
          {c.purposeTags.map((t) => (
            <span key={t} className="font-body" style={{ color: 'rgba(243,234,216,0.75)', fontSize: '0.82rem', border: '1px solid rgba(232,184,91,0.22)', borderRadius: '2px', padding: '0.3rem 0.8rem', fontWeight: 400 }}>{t}</span>
          ))}
        </div>
      </PageSection>

      {/* ── PROPOSED PARTICIPANTS ────────────────────────────────── */}
      <PageSection eyebrow={c.participantsEyebrow} heading={c.participantsHeading}>
        <p className="font-body" style={{ ...body, marginBottom: '1.25rem' }}>{c.participantsP1}</p>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 1.5rem', border: '1px solid rgba(232,184,91,0.2)', borderRadius: '4px', backgroundColor: 'rgba(232,184,91,0.04)', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
          <span className="font-body" style={{ color: '#e8b85b', fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500 }}>{c.participantsTargetLabel}</span>
          <span className="font-heading" style={{ color: '#f8f0df', fontSize: '1.15rem', fontWeight: 400 }}>{c.participantsTargetValue}</span>
        </div>
        <p className="font-body" style={bodyMuted}>{c.participantsNote}</p>
      </PageSection>

      {/* ── PRINCIPLES ───────────────────────────────────────────── */}
      <PageSection eyebrow={c.principlesEyebrow} heading={c.principlesHeading}>
        <LabPrinciples />
      </PageSection>

      {/* ── LEARNING MODEL ───────────────────────────────────────── */}
      <PageSection id="programme-model" eyebrow={c.modelEyebrow} heading={c.modelHeading}>
        <p className="font-body" style={{ ...body, marginBottom: '2rem' }}>{c.modelP}</p>
        <LabLearningModel />
      </PageSection>

      {/* ── CURRICULUM ───────────────────────────────────────────── */}
      <PageSection eyebrow={c.curriculumEyebrow} heading={c.curriculumHeading}>
        <p className="font-body" style={{ ...body, marginBottom: '1.75rem' }}>{c.curriculumP}</p>
        <LabCurriculum />
      </PageSection>

      {/* ── HUMAN BEFORE MACHINE ─────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7 }}
        style={{ marginBottom: '4.5rem', padding: '2.5rem', border: '1px solid rgba(232,184,91,0.28)', borderRadius: '4px', backgroundColor: 'rgba(232,184,91,0.035)' }}
      >
        <span className="font-body" style={{ color: '#e8b85b', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.75rem' }}>{c.signatureLabel}</span>
        <h2 className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 400, lineHeight: 1.2, margin: '0 0 1rem' }}>{c.signatureHeading}</h2>
        <blockquote style={{ borderLeft: '2px solid rgba(232,184,91,0.4)', paddingLeft: '1.25rem', margin: '0 0 1.5rem' }}>
          <p className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.7, margin: 0 }}>
            "{c.signatureQuote}"
          </p>
        </blockquote>
        <p className="font-body" style={{ ...body, marginBottom: '1.25rem' }}>{c.signatureP1}</p>
        <p className="font-body" style={{ ...body, marginBottom: '1.5rem' }}>{c.signatureP2}</p>
        <ul style={{ margin: '0 0 1.5rem', paddingLeft: '1.25rem' }}>
          {c.signatureQuestions.map((q) => (
            <li key={q} className="font-body" style={{ color: 'rgba(243,234,216,0.72)', fontSize: '0.9rem', lineHeight: 1.8, fontWeight: 300, marginBottom: '0.4rem' }}>{q}</li>
          ))}
        </ul>
        <p className="font-body" style={bodyMuted}>{c.signatureNote}</p>
      </motion.section>

      {/* ── SIX-MONTH TIMELINE ───────────────────────────────────── */}
      <PageSection eyebrow={c.timelineEyebrow} heading={c.timelineHeading}>
        <p className="font-body" style={{ ...bodyMuted, marginBottom: '2rem' }}>{c.timelineIntro}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          {c.timeline.map(({ month, label, desc }, i) => (
            <motion.div
              key={month}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.07 }}
              style={{ padding: '1.35rem 1.5rem', border: '1px solid rgba(232,184,91,0.14)', borderRadius: '4px', backgroundColor: 'rgba(243,234,216,0.02)' }}
            >
              <span className="font-body" style={{ color: '#e8b85b', fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.4rem' }}>{month}</span>
              <h3 className="font-heading" style={{ color: '#f8f0df', fontSize: '1.1rem', fontWeight: 400, margin: '0 0 0.5rem' }}>{label}</h3>
              <p className="font-body" style={{ color: 'rgba(243,234,216,0.65)', fontSize: '0.87rem', lineHeight: 1.7, fontWeight: 300, margin: 0 }}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </PageSection>

      {/* ── POSSIBLE PROJECTS ────────────────────────────────────── */}
      <PageSection eyebrow={c.projectsEyebrow} heading={c.projectsHeading}>
        <p className="font-body" style={{ ...body, marginBottom: '1.5rem' }}>{c.projectsIntro}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem' }}>
          {c.projects.map((p) => (
            <div key={p} style={{ display: 'flex', gap: '0.7rem', alignItems: 'flex-start', padding: '1rem 1.2rem', border: '1px solid rgba(232,184,91,0.12)', borderRadius: '4px', backgroundColor: 'rgba(243,234,216,0.015)' }}>
              <span aria-hidden="true" style={{ color: '#e8b85b', opacity: 0.6, flexShrink: 0, marginTop: '0.15rem' }}>◆</span>
              <span className="font-body" style={{ color: 'rgba(243,234,216,0.72)', fontSize: '0.88rem', lineHeight: 1.65, fontWeight: 300 }}>{p}</span>
            </div>
          ))}
        </div>
      </PageSection>

      {/* ── PROPOSED OUTCOMES ────────────────────────────────────── */}
      <PageSection eyebrow={c.outcomesEyebrow} heading={c.outcomesHeading}>
        <p className="font-body" style={{ ...bodyMuted, marginBottom: '1.5rem' }}>{c.outcomesIntro}</p>
        <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {c.outcomes.map((o) => (
            <li key={o} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <span aria-hidden="true" style={{ color: '#e8b85b', opacity: 0.55, flexShrink: 0, marginTop: '0.2rem', fontSize: '0.75rem' }}>◆</span>
              <span className="font-body" style={{ color: 'rgba(243,234,216,0.75)', fontSize: '0.93rem', lineHeight: 1.7, fontWeight: 300 }}>{o}</span>
            </li>
          ))}
        </ul>
      </PageSection>

      {/* ── WHAT MAKES IT DIFFERENT ──────────────────────────────── */}
      <PageSection eyebrow={c.identityEyebrow} heading={c.identityHeading}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="lab-compare-grid">
          <div style={{ padding: '1.5rem', border: '1px solid rgba(232,184,91,0.12)', borderRadius: '4px', backgroundColor: 'rgba(243,234,216,0.015)' }}>
            <h3 className="font-body" style={{ color: 'rgba(243,234,216,0.6)', fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, margin: '0 0 1rem' }}>{c.identityNotHeading}</h3>
            {c.identityNotItems.map((s) => (
              <p key={s} className="font-body" style={{ color: 'rgba(243,234,216,0.55)', fontSize: '0.88rem', lineHeight: 1.6, fontWeight: 300, margin: '0 0 0.5rem' }}>— {s}</p>
            ))}
          </div>
          <div style={{ padding: '1.5rem', border: '1px solid rgba(232,184,91,0.22)', borderRadius: '4px', backgroundColor: 'rgba(232,184,91,0.03)' }}>
            <h3 className="font-body" style={{ color: '#e8b85b', fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, margin: '0 0 1rem' }}>{c.identityIsHeading}</h3>
            {c.identityIsItems.map((s) => (
              <p key={s} className="font-body" style={{ color: 'rgba(243,234,216,0.75)', fontSize: '0.88rem', lineHeight: 1.6, fontWeight: 300, margin: '0 0 0.5rem' }}>+ {s}</p>
            ))}
          </div>
        </div>
        <style>{`@media (max-width: 560px) { .lab-compare-grid { grid-template-columns: 1fr !important; } }`}</style>
      </PageSection>

      {/* ── FACILITATION & SAFEGUARDING ──────────────────────────── */}
      <PageSection eyebrow={c.facilitationEyebrow} heading={c.facilitationHeading}>
        <p className="font-body" style={{ ...body, marginBottom: '1.25rem' }}>{c.facilitationIntro}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
          {c.facilitationItems.map((item) => (
            <span key={item} className="font-body" style={{ color: 'rgba(243,234,216,0.72)', fontSize: '0.83rem', border: '1px solid rgba(232,184,91,0.18)', borderRadius: '2px', padding: '0.35rem 0.8rem', fontWeight: 300 }}>{item}</span>
          ))}
        </div>
      </PageSection>

      {/* ── EXPRESS INTEREST ─────────────────────────────────────── */}
      <PageSection eyebrow={c.interestEyebrow} heading={c.interestHeading}>
        <p className="font-body" style={{ ...body, marginBottom: '2rem' }}>{c.interestP}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.1rem' }}>
          {c.interestPaths.map(({ role, desc, cta, to }) => (
            <motion.div
              key={role}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              style={{ padding: '1.6rem', border: '1px solid rgba(232,184,91,0.18)', borderRadius: '4px', backgroundColor: 'rgba(243,234,216,0.02)', display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              <div>
                <h3 className="font-heading" style={{ color: '#f8f0df', fontSize: '1.1rem', fontWeight: 400, margin: '0 0 0.5rem' }}>{role}</h3>
                <p className="font-body" style={{ color: 'rgba(243,234,216,0.65)', fontSize: '0.87rem', lineHeight: 1.7, fontWeight: 300, margin: 0 }}>{desc}</p>
              </div>
              <CTAButton to={to}>{cta} →</CTAButton>
            </motion.div>
          ))}
        </div>
      </PageSection>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <PageSection eyebrow={c.faqEyebrow} heading={c.faqHeading}>
        <LabFAQ />
      </PageSection>

      {/* ── FINAL CTA ────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7 }}
        style={{ marginBottom: '2rem', padding: '2.5rem', border: '1px solid rgba(232,184,91,0.22)', borderRadius: '4px', backgroundColor: 'rgba(232,184,91,0.03)', textAlign: 'center' }}
      >
        <h2 className="font-heading" style={{ color: '#f8f0df', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 400, lineHeight: 1.25, margin: '0 0 1rem' }}>
          {c.finalCtaHeading}
        </h2>
        <p className="font-body" style={{ color: 'rgba(243,234,216,0.7)', fontSize: '0.97rem', lineHeight: 1.8, fontWeight: 300, maxWidth: '580px', margin: '0 auto 1.75rem' }}>
          {c.finalCtaBody}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <CTAButton to="/contact?type=programme-interest&programme=intercultural-ai-leadership-lab" primary>{c.ctaExpress}</CTAButton>
          <CTAButton to="/contact?type=partnership&programme=intercultural-ai-leadership-lab">{c.finalCtaPartner}</CTAButton>
        </div>
      </motion.div>

    </PageLayout>
  );
}