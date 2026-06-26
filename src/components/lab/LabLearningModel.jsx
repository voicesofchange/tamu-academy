import React from 'react';
import { motion } from 'framer-motion';

const STAGES = [
  {
    stage: 'Stage 1',
    label: 'Connect',
    desc: 'Participants build trust through intercultural story circles, introductions, personal reflection, and facilitated listening.',
  },
  {
    stage: 'Stage 2',
    label: 'Understand',
    desc: 'Participants develop accessible knowledge of generative AI, algorithms, digital information systems, misinformation, privacy, bias, and digital inequality.',
  },
  {
    stage: 'Stage 3',
    label: 'Examine',
    desc: 'Participants investigate how AI systems represent different communities, languages, traditions, histories, places, and forms of knowledge.',
  },
  {
    stage: 'Stage 4',
    label: 'Dialogue',
    desc: 'Participants discuss differences in lived experience, cultural interpretation, digital access, identity, language, and trust.',
  },
  {
    stage: 'Stage 5',
    label: 'Create',
    desc: 'Participants develop stories, guides, conversations, research reflections, or educational resources that place community knowledge in their own voices.',
  },
  {
    stage: 'Stage 6',
    label: 'Act',
    desc: 'Participants work in teams to design modest community activities responding to a problem they have identified.',
  },
  {
    stage: 'Stage 7',
    label: 'Share',
    desc: 'Participants present their learning and recommendations through a public dialogue, youth forum, or community presentation.',
  },
  {
    stage: 'Stage 8',
    label: 'Reflect',
    desc: 'Participants assess how their own perspectives changed and how they intend to lead more responsibly.',
  },
];

export default function LabLearningModel() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0', position: 'relative' }}>
      {/* Vertical connector line */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '1.45rem', top: '2.5rem', bottom: '2.5rem', width: '1px', background: 'linear-gradient(180deg, transparent, rgba(212,161,42,0.3) 10%, rgba(212,161,42,0.3) 90%, transparent)', pointerEvents: 'none' }} />
      {STAGES.map(({ stage, label, desc }, i) => (
        <motion.div
          key={stage}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: i * 0.07 }}
          style={{ display: 'flex', gap: '1.5rem', padding: '1.4rem 0', borderBottom: i < STAGES.length - 1 ? '1px solid rgba(212,161,42,0.07)' : 'none', alignItems: 'flex-start' }}
        >
          {/* Step indicator */}
          <div style={{ flexShrink: 0, width: '2.9rem', height: '2.9rem', border: '1px solid rgba(212,161,42,0.35)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(212,161,42,0.06)', position: 'relative', zIndex: 1 }}>
            <span className="font-heading" style={{ color: '#D4A12A', fontSize: '0.85rem', fontWeight: 500 }}>{i + 1}</span>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
              <span className="font-body" style={{ color: '#D4A12A', fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500 }}>{stage}</span>
              <h3 className="font-heading" style={{ color: '#F5EFE0', fontSize: '1.15rem', fontWeight: 400, margin: 0 }}>{label}</h3>
            </div>
            <p className="font-body" style={{ color: 'rgba(245,239,224,0.7)', fontSize: '0.9rem', lineHeight: 1.75, fontWeight: 300, margin: 0 }}>{desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}