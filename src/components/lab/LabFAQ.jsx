import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const FAQS = [
  {
    q: 'Is the programme currently accepting applications?',
    a: 'Not yet. The programme is currently a proposed pilot. Interested individuals may contact Tamu Academy to receive future updates.',
  },
  {
    q: 'Is the programme affiliated with UNESCO?',
    a: 'No. Tamu Academy is independently developing this proposed programme. Any future institutional support or partnership would be announced only after it is formally confirmed.',
  },
  {
    q: 'Is this a coding programme?',
    a: 'No. The programme focuses on AI literacy, intercultural dialogue, ethical leadership, cultural representation, digital trust, and community action.',
  },
  {
    q: 'Do participants need prior AI experience?',
    a: 'No prior technical expertise is expected. The proposed programme is intended to include participants with different levels of digital experience.',
  },
  {
    q: 'Where would the programme take place?',
    a: 'The final location and delivery model have not yet been confirmed. The pilot may combine in-person and digital learning depending on resources, participant needs, and partnerships.',
  },
  {
    q: 'Who would be eligible?',
    a: 'Final age, location, and eligibility criteria will be published after the pilot is confirmed.',
  },
  {
    q: 'Would participation have a fee?',
    a: 'No fee structure has been announced. Any future costs, scholarships, or participation support would be clearly communicated before applications open.',
  },
  {
    q: 'How can an organisation support the programme?',
    a: 'Schools, youth organizations, educators, researchers, community groups, and institutional supporters may contact Tamu Academy through the Partner or Contact pages.',
  },
];

export default function LabFAQ() {
  const [open, setOpen] = useState(null);
  const reduceMotion = useReducedMotion();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
      {FAQS.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={i} style={{ border: '1px solid rgba(212,161,42,0.13)', borderRadius: '4px', overflow: 'hidden', backgroundColor: 'rgba(245,239,224,0.015)' }}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${i}`}
              style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '1.1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', textAlign: 'left' }}
            >
              <h3 className="font-heading" style={{ color: '#F5EFE0', fontSize: '1rem', fontWeight: 400, margin: 0, lineHeight: 1.4 }}>{faq.q}</h3>
              <span aria-hidden="true" style={{ color: '#D4A12A', fontSize: '1rem', flexShrink: 0, transition: 'transform 0.25s ease', transform: isOpen ? 'rotate(45deg)' : 'none' }}>+</span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-panel-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.28, ease: 'easeInOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{ padding: '0 1.5rem 1.25rem', borderTop: '1px solid rgba(212,161,42,0.08)' }}>
                    <p className="font-body" style={{ color: 'rgba(245,239,224,0.72)', fontSize: '0.9rem', lineHeight: 1.8, fontWeight: 300, margin: '1rem 0 0' }}>{faq.a}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}