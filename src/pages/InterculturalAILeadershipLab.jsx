import React from 'react';
import TopNav from '@/components/landing/TopNav';
import SiteFooter from '@/components/landing/SiteFooter';

export default function InterculturalAILeadershipLab() {
  return (
    <div style={{ backgroundColor: '#1A130E', minHeight: '100vh', width: '100%', overflowX: 'hidden', fontFamily: "'DM Sans', sans-serif" }}>
      <TopNav />
      <main style={{ maxWidth: '860px', margin: '0 auto', padding: '8rem clamp(1.5rem, 6vw, 4rem) 6rem' }}>
        <span style={{ color: '#D4A12A', fontSize: '0.7rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '0.75rem' }}>
          Proposed Pilot Programme
        </span>
        <h1 className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 400, lineHeight: 1.2, marginBottom: '1rem' }}>
          Tamu Intercultural AI Leadership Lab
        </h1>
        <p className="font-heading" style={{ color: 'rgba(212,161,42,0.85)', fontSize: 'clamp(1rem, 2vw, 1.3rem)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.5, marginBottom: '1.5rem' }}>
          Human connection, cultural dignity, and responsible leadership in the age of artificial intelligence.
        </p>
        <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, transparent, #D4A12A 35%, #E2B652 50%, #D4A12A 65%, transparent)', marginBottom: '2.5rem' }} aria-hidden="true" />
        <p className="font-body" style={{ color: 'rgba(245,239,224,0.75)', fontSize: '1rem', lineHeight: 1.8, fontWeight: 300 }}>
          A proposed youth learning and dialogue programme focused on human connection, cultural dignity, and responsible leadership in the age of artificial intelligence.
        </p>
        <div style={{ marginTop: '2.5rem', padding: '1.25rem 1.5rem', borderLeft: '2px solid rgba(212,161,42,0.4)', backgroundColor: 'rgba(212,161,42,0.04)' }}>
          <p className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.7, margin: 0 }}>
            "What can another human being teach us that an algorithm cannot?"
          </p>
        </div>
        <p className="font-body" style={{ color: 'rgba(245,239,224,0.45)', fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '3rem', fontWeight: 500 }}>
          Full programme details in development — this page will expand in a future phase
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}