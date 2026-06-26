import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MODULES = [
  {
    n: '01',
    title: 'Human Connection in the Age of AI',
    type: 'questions',
    items: [
      'What is the difference between communication and genuine connection?',
      'What happens when technology mediates more of our relationships?',
    ],
  },
  {
    n: '02',
    title: 'Understanding Artificial Intelligence and Digital Power',
    type: 'topics',
    items: ['Generative AI', 'Algorithms', 'Recommendation systems', 'Data', 'Privacy', 'Digital access'],
  },
  {
    n: '03',
    title: 'Culture, Identity, and Representation',
    type: 'topics',
    items: ['Cultural stereotypes', 'Whose knowledge is visible', 'Who gets to describe a community', 'Representation of African communities'],
  },
  {
    n: '04',
    title: 'Language, Translation, and Inclusion',
    type: 'topics',
    items: ['Kiswahili', 'African and Indigenous languages', 'Translation technology', 'Linguistic exclusion', 'Loss of context'],
  },
  {
    n: '05',
    title: 'Misinformation, Trust, and Polarization',
    type: 'topics',
    items: ['AI-generated content', 'Verification', 'Online hostility', 'Political and social narratives', 'Digital trust'],
  },
  {
    n: '06',
    title: 'Intercultural Dialogue and Conflict Transformation',
    type: 'topics',
    items: ['Listening', 'Respectful disagreement', 'Assumptions', 'Stereotyping', 'Empathy', 'Collaborative problem solving'],
  },
  {
    n: '07',
    title: 'Ethical and Civic Uses of AI',
    type: 'topics',
    items: ['Education', 'Accessibility', 'Community research', 'Cultural preservation', 'Public communication', 'Civic participation'],
  },
  {
    n: '08',
    title: 'Community Project Design',
    type: 'topics',
    items: ['Problem definition', 'Stakeholder understanding', 'Ethical project design', 'Teamwork', 'Communication', 'Implementation planning'],
  },
];

export default function LabCurriculum() {
  const [open, setOpen] = useState(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {MODULES.map((mod, i) => {
        const isOpen = open === i;
        return (
          <div key={mod.n} style={{ border: '1px solid rgba(212,161,42,0.15)', borderRadius: '4px', backgroundColor: 'rgba(245,239,224,0.02)', overflow: 'hidden' }}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', textAlign: 'left' }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
                <span className="font-heading" style={{ color: '#D4A12A', fontSize: '1.3rem', fontWeight: 400, opacity: 0.55, lineHeight: 1 }}>{mod.n}</span>
                <h3 className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', fontWeight: 400, margin: 0, lineHeight: 1.3 }}>{mod.title}</h3>
              </div>
              <span aria-hidden="true" style={{ color: '#D4A12A', fontSize: '1.1rem', flexShrink: 0, transition: 'transform 0.25s ease', transform: isOpen ? 'rotate(45deg)' : 'none' }}>+</span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{ padding: '0 1.5rem 1.5rem', borderTop: '1px solid rgba(212,161,42,0.08)' }}>
                    <p className="font-body" style={{ color: '#D4A12A', fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, margin: '1rem 0 0.65rem' }}>
                      {mod.type === 'questions' ? 'Key Questions' : 'Topics'}
                    </p>
                    <ul style={{ margin: 0, paddingLeft: '1.1rem' }}>
                      {mod.items.map((item) => (
                        <li key={item} className="font-body" style={{ color: 'rgba(245,239,224,0.7)', fontSize: '0.9rem', lineHeight: 1.75, fontWeight: 300, marginBottom: '0.35rem' }}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
      <p className="font-body" style={{ color: 'rgba(245,239,224,0.4)', fontSize: '0.78rem', lineHeight: 1.7, fontWeight: 300, marginTop: '0.75rem', fontStyle: 'italic' }}>
        This is a proposed curriculum that may be refined with facilitators, participants, community partners, and subject matter experts.
      </p>
    </div>
  );
}