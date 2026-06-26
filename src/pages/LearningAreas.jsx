import React from 'react';
import TopNav from '@/components/landing/TopNav';
import SiteFooter from '@/components/landing/SiteFooter';

export default function LearningAreas() {
  return (
    <div style={{ backgroundColor: '#1A130E', minHeight: '100vh', width: '100%', overflowX: 'hidden', fontFamily: "'DM Sans', sans-serif" }}>
      <TopNav />
      <main style={{ paddingTop: '8rem', paddingBottom: '6rem', maxWidth: '860px', margin: '0 auto', padding: '8rem clamp(1.5rem, 6vw, 4rem) 6rem' }}>
        <span style={{ color: '#D4A12A', fontSize: '0.7rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '1.25rem' }}>
          Learning Areas
        </span>
        <h1 className="font-heading" style={{ color: '#F5EFE0', fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 400, lineHeight: 1.2, marginBottom: '1.5rem' }}>
          What We Explore
        </h1>
        <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, transparent, #D4A12A 35%, #E2B652 50%, #D4A12A 65%, transparent)', marginBottom: '2.5rem' }} aria-hidden="true" />
        <p className="font-body" style={{ color: 'rgba(245,239,224,0.75)', fontSize: '1rem', lineHeight: 1.8, fontWeight: 300 }}>
          Tamu Academy organises learning across six interconnected disciplines — bringing together the knowledge, conversations, and skills young people need to understand and shape a complex world.
        </p>
        <p className="font-body" style={{ color: 'rgba(245,239,224,0.45)', fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '3rem', fontWeight: 500 }}>
          Content in development
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}