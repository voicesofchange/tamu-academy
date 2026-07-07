import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReducedMotion, motion } from 'framer-motion';

const NODES = [
  {
    id: 'ai',
    label: 'AI and Digital\nCitizenship',
    shortLabel: 'AI & Digital Citizenship',
    desc: 'How artificial intelligence shapes daily life, identity, and human relationships — and what it means to navigate digital spaces responsibly.',
    angle: 270, // top
  },
  {
    id: 'intercultural',
    label: 'Intercultural\nLeadership',
    shortLabel: 'Intercultural Leadership',
    desc: 'Building dialogue skills and cultural humility to lead across differences — from local communities to international contexts.',
    angle: 330,
  },
  {
    id: 'policy',
    label: 'Public Policy\n& Governance',
    shortLabel: 'Public Policy & Governance',
    desc: 'Understanding how government decisions are made and how young people can meaningfully participate in shaping policies that affect their lives.',
    angle: 30,
  },
  {
    id: 'economics',
    label: 'Economics\n& Opportunity',
    shortLabel: 'Economics & Opportunity',
    desc: 'How economic systems distribute opportunity and what young people need to understand about inequality, trade, and financial life.',
    angle: 90, // bottom
  },
  {
    id: 'climate',
    label: 'Climate &\nSustainability',
    shortLabel: 'Climate & Sustainability',
    desc: 'The causes and consequences of climate change, environmental justice, and building sustainable communities — especially for those on the frontlines.',
    angle: 150,
  },
  {
    id: 'writing',
    label: 'Writing, Storytelling\n& Communication',
    shortLabel: 'Writing & Storytelling',
    desc: 'Communicating ideas clearly, telling authentic stories, and engaging across cultures — on every platform and for every purpose.',
    angle: 210,
  },
];

// Edges: pairs of node id's that are visually connected
const EDGES = [
  ['ai', 'intercultural'],
  ['ai', 'policy'],
  ['ai', 'writing'],
  ['intercultural', 'policy'],
  ['intercultural', 'climate'],
  ['intercultural', 'writing'],
  ['policy', 'economics'],
  ['policy', 'climate'],
  ['economics', 'climate'],
  ['economics', 'writing'],
  ['writing', 'ai'],
];

// Polar to cartesian
function polar(cx, cy, r, angleDeg) {
  const rad = (angleDeg - 90) * (Math.PI / 180);
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

const CX = 260;
const CY = 260;
const RADIUS = 185;

function getNodePos(node) {
  return polar(CX, CY, RADIUS, node.angle);
}

function isEdgeRelated(edge, nodeId) {
  return edge[0] === nodeId || edge[1] === nodeId;
}

export default function LivingKnowledgeMap() {
  const [active, setActive] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const reduceMotion = useReducedMotion();
  const navigate = useNavigate();
  const descRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleNodeActivate = (id) => {
    setActive((prev) => (prev === id ? null : id));
  };

  const handleNodeClick = (id) => {
    if (isMobile) {
      handleNodeActivate(id);
      return;
    }
    navigate('/programmes#learning-areas');
  };

  const handleNodeKeyDown = (e, id) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (isMobile) {
        handleNodeActivate(id);
      } else {
        navigate('/programmes#learning-areas');
      }
    }
  };

  const activeNode = NODES.find((n) => n.id === active);

  return (
    <section
      aria-labelledby="lkm-heading"
      style={{
        position: 'relative',
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 6vw, 6rem)',
        maxWidth: '1100px',
        margin: '0 auto',
        scrollMarginTop: '90px',
        overflow: 'hidden',
      }}
    >
      {/* CSS for animations */}
      <style>{`
        @keyframes lkmFloat0 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(2px,-4px)} }
        @keyframes lkmFloat1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(3px,2px)} }
        @keyframes lkmFloat2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-2px,3px)} }
        @keyframes lkmFloat3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-3px,-2px)} }
        @keyframes lkmFloat4 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(2px,3px)} }
        @keyframes lkmFloat5 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-2px,-3px)} }
        @keyframes lkmPulse { 0%,100%{stroke-opacity:0.18} 50%{stroke-opacity:0.42} }
        @keyframes lkmPulseActive { 0%,100%{stroke-opacity:0.6} 50%{stroke-opacity:0.95} }
        @keyframes lkmCenterBreathe { 0%,100%{opacity:0.85} 50%{opacity:1} }
        .lkm-node-btn { background:none; border:none; padding:0; cursor:pointer; outline:none; }
        .lkm-node-btn:focus-visible .lkm-node-ring {
          box-shadow: 0 0 0 3px rgba(212,161,42,0.85);
          border-color: rgba(212,161,42,0.9) !important;
        }
      `}</style>

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}
      >
        <p
          className="font-body"
          style={{ color: '#D4A12A', fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 500, marginBottom: '1rem' }}
        >
          Explore the Connections
        </p>
        <h2
          id="lkm-heading"
          className="font-heading"
          style={{ color: '#F5EFE0', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 400, lineHeight: 1.2, margin: '0 0 1.25rem', maxWidth: '620px' }}
        >
          Knowledge does not exist in isolation.
        </h2>
        <p
          className="font-body"
          style={{ color: 'rgba(245,239,224,0.72)', fontSize: 'clamp(0.92rem, 1.4vw, 1.05rem)', lineHeight: 1.85, fontWeight: 300, maxWidth: '620px', margin: 0 }}
        >
          Tamu Academy brings together ideas from technology, culture, public policy, economics, climate, and storytelling to help learners understand complex issues from multiple perspectives.
        </p>
      </motion.div>

      {/* ── DESKTOP: SVG radial map ── */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}
        >
          <div
            role="group"
            aria-label="Interactive knowledge map. Hover or focus a learning area to explore its connections."
            style={{ position: 'relative', width: '520px', maxWidth: '100%', aspectRatio: '1 / 1' }}
          >
            {/* SVG layer: connecting lines */}
            <svg
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 520 520"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
            >
              {/* Edges */}
              {EDGES.map(([a, b], i) => {
                const posA = getNodePos(NODES.find((n) => n.id === a));
                const posB = getNodePos(NODES.find((n) => n.id === b));
                const isRelated = active ? isEdgeRelated([a, b], active) : false;
                const isDimmed = active && !isRelated;
                return (
                  <line
                    key={`${a}-${b}`}
                    x1={posA.x} y1={posA.y}
                    x2={posB.x} y2={posB.y}
                    stroke="#D4A12A"
                    strokeWidth={isRelated ? 1.5 : 1}
                    strokeOpacity={isDimmed ? 0.05 : (isRelated ? 0.75 : 0.18)}
                    style={
                      reduceMotion ? {} :
                      isRelated
                        ? { animation: 'lkmPulseActive 2s ease-in-out infinite' }
                        : (!active ? { animation: `lkmPulse ${2.8 + (i % 3) * 0.5}s ease-in-out infinite`, animationDelay: `${i * 0.18}s` } : {})
                    }
                  />
                );
              })}
              {/* Spokes: center to each node */}
              {NODES.map((node) => {
                const pos = getNodePos(node);
                const isRelated = active === node.id;
                const isDimmed = active && active !== node.id;
                return (
                  <line
                    key={`spoke-${node.id}`}
                    x1={CX} y1={CY}
                    x2={pos.x} y2={pos.y}
                    stroke="#D4A12A"
                    strokeWidth={isRelated ? 1.5 : 0.8}
                    strokeOpacity={isDimmed ? 0.05 : (isRelated ? 0.6 : 0.12)}
                    strokeDasharray="3 5"
                    style={reduceMotion ? {} : {}}
                  />
                );
              })}
            </svg>

            {/* Center node */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                border: '1px solid rgba(212,161,42,0.45)',
                backgroundColor: 'rgba(212,161,42,0.07)',
                animation: reduceMotion ? 'none' : 'lkmCenterBreathe 4s ease-in-out infinite',
                zIndex: 2,
              }}
            >
              <span className="font-heading" style={{ color: '#E2B652', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.05em', textAlign: 'center', lineHeight: 1.3 }}>
                Tamu<br />Academy
              </span>
            </div>

            {/* Learning area nodes */}
            {NODES.map((node, i) => {
              const pos = getNodePos(node);
              const isActive = active === node.id;
              const isDimmed = active && !isActive;
              const floatAnim = `lkmFloat${i} ${4 + i * 0.4}s ease-in-out infinite`;

              return (
                <button
                  key={node.id}
                  className="lkm-node-btn"
                  aria-label={`${node.shortLabel}${isActive ? ' — selected' : ''}`}
                  aria-pressed={isActive}
                  onClick={() => handleNodeActivate(node.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleNodeActivate(node.id); }
                  }}
                  style={{
                    position: 'absolute',
                    left: `${(pos.x / 520) * 100}%`,
                    top: `${(pos.y / 520) * 100}%`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 3,
                    animation: reduceMotion ? 'none' : floatAnim,
                    animationDelay: `${i * 0.55}s`,
                    transition: 'opacity 0.3s ease',
                    opacity: isDimmed ? 0.28 : 1,
                  }}
                >
                  <div
                    className="lkm-node-ring"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: isActive ? '78px' : '70px',
                      height: isActive ? '78px' : '70px',
                      borderRadius: '50%',
                      border: isActive ? '1.5px solid rgba(212,161,42,0.75)' : '1px solid rgba(212,161,42,0.28)',
                      backgroundColor: isActive ? 'rgba(212,161,42,0.12)' : 'rgba(26,19,14,0.82)',
                      transition: 'all 0.25s ease',
                      padding: '8px',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    <span
                      className="font-body"
                      style={{
                        color: isActive ? '#E2B652' : 'rgba(245,239,224,0.82)',
                        fontSize: '0.58rem',
                        lineHeight: 1.35,
                        fontWeight: isActive ? 500 : 400,
                        letterSpacing: '0.04em',
                        textAlign: 'center',
                        whiteSpace: 'pre-line',
                        transition: 'color 0.25s ease',
                        userSelect: 'none',
                      }}
                    >
                      {node.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Description panel */}
          <div
            ref={descRef}
            aria-live="polite"
            aria-atomic="true"
            style={{
              minHeight: '80px',
              maxWidth: '520px',
              width: '100%',
              padding: activeNode ? '1.25rem 1.5rem' : '0',
              border: activeNode ? '1px solid rgba(212,161,42,0.2)' : '1px solid transparent',
              borderRadius: '4px',
              backgroundColor: activeNode ? 'rgba(212,161,42,0.03)' : 'transparent',
              transition: 'all 0.3s ease',
              textAlign: 'center',
            }}
          >
            {activeNode ? (
              <>
                <p className="font-body" style={{ color: '#D4A12A', fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, margin: '0 0 0.5rem' }}>
                  {activeNode.shortLabel}
                </p>
                <p className="font-body" style={{ color: 'rgba(245,239,224,0.78)', fontSize: '0.9rem', lineHeight: 1.75, fontWeight: 300, margin: '0 0 0.85rem' }}>
                  {activeNode.desc}
                </p>
                <button
                  onClick={() => navigate('/programmes#learning-areas')}
                  className="font-body"
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: '#D4A12A', fontSize: '0.68rem', letterSpacing: '0.18em',
                    textTransform: 'uppercase', fontWeight: 500, padding: 0,
                    textDecoration: 'underline', textUnderlineOffset: '3px',
                  }}
                >
                  Explore all Learning Areas →
                </button>
              </>
            ) : (
              <p className="font-body" style={{ color: 'rgba(245,239,224,0.35)', fontSize: '0.82rem', fontWeight: 300, margin: 0, paddingTop: '1rem' }}>
                Select a learning area to explore its focus and connections.
              </p>
            )}
          </div>
        </motion.div>
      )}

      {/* ── MOBILE: tap cards ── */}
      {isMobile && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="font-body" style={{ color: 'rgba(245,239,224,0.45)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500, marginBottom: '1.25rem', textAlign: 'center' }}>
            Tap a learning area to explore
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {NODES.map((node) => {
              const isActive = active === node.id;
              return (
                <button
                  key={node.id}
                  aria-expanded={isActive}
                  aria-controls={`lkm-mobile-desc-${node.id}`}
                  onClick={() => handleNodeActivate(node.id)}
                  className="font-body"
                  style={{
                    width: '100%',
                    background: 'none',
                    border: `1px solid ${isActive ? 'rgba(212,161,42,0.45)' : 'rgba(212,161,42,0.16)'}`,
                    borderRadius: '4px',
                    cursor: 'pointer',
                    padding: '1rem 1.25rem',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.75rem',
                    backgroundColor: isActive ? 'rgba(212,161,42,0.06)' : 'rgba(245,239,224,0.02)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span className="font-body" style={{ color: isActive ? '#E2B652' : 'rgba(245,239,224,0.85)', fontSize: '0.88rem', fontWeight: isActive ? 500 : 400, lineHeight: 1.35 }}>
                    {node.shortLabel}
                  </span>
                  <span
                    aria-hidden="true"
                    style={{
                      color: '#D4A12A',
                      fontSize: '1rem',
                      flexShrink: 0,
                      transition: 'transform 0.2s ease',
                      transform: isActive ? 'rotate(45deg)' : 'none',
                    }}
                  >
                    +
                  </span>
                </button>
              );
            })}

            {/* Description panels: all rendered, only active is visible — keeps aria-controls valid */}
            {NODES.map((node) => {
              const isActive = active === node.id;
              return (
                <div
                  key={node.id}
                  id={`lkm-mobile-desc-${node.id}`}
                  hidden={!isActive}
                  style={{
                    padding: '1.25rem 1.4rem',
                    border: '1px solid rgba(212,161,42,0.2)',
                    borderRadius: '4px',
                    backgroundColor: 'rgba(212,161,42,0.03)',
                    marginTop: '0.25rem',
                  }}
                >
                  <p className="font-body" style={{ color: 'rgba(245,239,224,0.78)', fontSize: '0.9rem', lineHeight: 1.75, fontWeight: 300, margin: '0 0 1rem' }}>
                    {node.desc}
                  </p>
                  <button
                    onClick={() => navigate('/programmes#learning-areas')}
                    className="font-body"
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: '#D4A12A', fontSize: '0.7rem', letterSpacing: '0.18em',
                      textTransform: 'uppercase', fontWeight: 500, padding: 0,
                    }}
                  >
                    Explore all Learning Areas →
                  </button>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Visually hidden text list: structural fallback — aria-hidden prevents duplicate announcements from the live region */}
      <ul
        aria-hidden="true"
        style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}
      >
        {NODES.map((n) => (
          <li key={n.id}>{n.shortLabel}: {n.desc}</li>
        ))}
      </ul>
    </section>
  );
}