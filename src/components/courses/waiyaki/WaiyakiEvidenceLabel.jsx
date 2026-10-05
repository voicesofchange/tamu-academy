import React from 'react';

/**
 * WaiyakiEvidenceLabel — the course's evidence vocabulary.
 *
 * The guide labels every claim in the course as DOCUMENTED (supported by
 * written records or reliable published research, with broad agreement among
 * sources), TRADITION (held in oral history, family memory, song or community
 * testimony), or CONTESTED (sources disagree, or the evidence is incomplete or
 * partisan). The label is rendered inline ahead of the claim it attaches to,
 * in the same place the guide puts it, so a learner can always see which kind
 * of evidence they are reading.
 */
const TONES = {
  DOCUMENTED: {
    word: 'Documented',
    color: '#8fc3a4',
    border: 'rgba(143,195,164,0.45)',
    background: 'rgba(143,195,164,0.08)',
  },
  TRADITION: {
    word: 'Tradition',
    color: '#e8b85b',
    border: 'rgba(232,184,91,0.45)',
    background: 'rgba(232,184,91,0.08)',
  },
  CONTESTED: {
    word: 'Contested',
    color: '#e8955c',
    border: 'rgba(232,149,92,0.45)',
    background: 'rgba(232,149,92,0.08)',
  },
};

export default function WaiyakiEvidenceLabel({ label }) {
  const tone = TONES[label];
  if (!tone) return null;

  return (
    <span
      className="font-body"
      style={{
        display: 'inline-block',
        color: tone.color,
        border: `1px solid ${tone.border}`,
        backgroundColor: tone.background,
        borderRadius: '2px',
        padding: '0.1rem 0.45rem',
        marginRight: '0.5rem',
        fontSize: '0.6rem',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        fontWeight: 600,
        whiteSpace: 'nowrap',
        verticalAlign: '0.08em',
      }}
    >
      {tone.word}
    </span>
  );
}