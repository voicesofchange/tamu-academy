import React from 'react';
import { Link } from 'react-router-dom';
import TopNav from '@/components/landing/TopNav';
import SiteFooter from '@/components/landing/SiteFooter';

export default function Programmes() {
  return (
    <div style={{ backgroundColor: '#1A130E', minHeight: '100vh', width: '100%', overflowX: 'hidden', fontFamily: "'DM Sans', sans-serif" }}>
      <TopNav />
      <main style={{ maxWidth: '860px', margin: '0 auto', padding: '8rem clamp(1.5rem, 6vw, 4rem) 6rem' }}>
        <span style={{ color: '#D4A12A', fontSize: '0.7rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '1.25rem' }}>
          Programmes
        </span>
        <h1 className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 400, lineHeight: 1.2, marginBottom: '1.5rem' }}>
          Our Programmes
        </h1>
        <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, transparent, #D4A12A 35%, #E2B652 50%, #D4A12A 65%, transparent)', marginBottom: '2.5rem' }} aria-hidden="true" />
        <p className="font-body" style={{ color: 'rgba(245,239,224,0.75)', fontSize: '1rem', lineHeight: 1.8, fontWeight: 300 }}>
          Tamu Academy develops learning programmes that combine intercultural dialogue, practical knowledge, and community action.
        </p>

        {/* Featured Programme */}
        <div style={{ marginTop: '3rem', padding: '2rem', border: '1px solid rgba(212,161,42,0.2)', borderRadius: '4px', backgroundColor: 'rgba(245,239,224,0.02)' }}>
          <span style={{ color: '#D4A12A', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500 }}>
            Proposed Pilot · Featured Initiative
          </span>
          <h2 className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(1.3rem, 3vw, 1.9rem)', fontWeight: 400, lineHeight: 1.3, margin: '0.75rem 0 1rem' }}>
            Tamu Intercultural AI Leadership Lab
          </h2>
          <p className="font-body" style={{ color: 'rgba(245,239,224,0.7)', fontSize: '0.93rem', lineHeight: 1.75, fontWeight: 300, marginBottom: '1.5rem' }}>
            A proposed youth learning and dialogue programme focused on human connection, cultural dignity, and responsible leadership in the age of artificial intelligence.
          </p>
          <Link
            to="/programmes/intercultural-ai-leadership-lab"
            style={{ color: '#D4A12A', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500 }}
          >
            Learn More →
          </Link>
        </div>

        <p className="font-body" style={{ color: 'rgba(245,239,224,0.45)', fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '3rem', fontWeight: 500 }}>
          Additional programmes in development
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}