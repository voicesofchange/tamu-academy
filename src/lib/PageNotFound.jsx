import React from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '@/components/seo/PageMeta';

export default function PageNotFound() {
  return (
    <div style={{ backgroundColor: '#1A130E', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', fontFamily: "'DM Sans', sans-serif" }}>
      <PageMeta
        title="Page Not Found | Tamu Academy"
        description="The page you are looking for could not be found."
        path="/404"
        noindex={true}
      />
      <div style={{ maxWidth: '480px', width: '100%', textAlign: 'center' }}>
        <span
          className="font-body"
          style={{ color: '#D4A12A', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '1.5rem' }}
        >
          Tamu Academy
        </span>

        <p
          className="font-heading"
          style={{ color: 'rgba(245,239,224,0.3)', fontSize: '5rem', fontWeight: 300, lineHeight: 1, margin: '0 0 1rem' }}
          aria-hidden="true"
        >
          404
        </p>

        <h1
          className="font-heading"
          style={{ color: '#F5EFE0', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 400, lineHeight: 1.25, margin: '0 0 1rem' }}
        >
          Page Not Found
        </h1>

        <div
          aria-hidden="true"
          style={{ width: '40px', height: '1px', background: 'linear-gradient(90deg, transparent, #D4A12A 35%, #E2B652 50%, #D4A12A 65%, transparent)', margin: '0 auto 1.5rem', }}
        />

        <p
          className="font-body"
          style={{ color: 'rgba(245,239,224,0.62)', fontSize: '0.93rem', lineHeight: 1.8, fontWeight: 300, margin: '0 0 2rem' }}
        >
          The page you are looking for could not be found. It may have moved, or the address may be incorrect.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', justifyContent: 'center' }}>
          <Link
            to="/"
            style={{ display: 'inline-flex', alignItems: 'center', color: '#1A130E', backgroundColor: '#D4A12A', fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, border: '1px solid #D4A12A', borderRadius: '2px', padding: '0.65rem 1.2rem' }}
          >
            Return to Homepage
          </Link>
          <Link
            to="/programmes"
            style={{ display: 'inline-flex', alignItems: 'center', color: '#D4A12A', backgroundColor: 'transparent', fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, border: '1px solid rgba(212,161,42,0.4)', borderRadius: '2px', padding: '0.65rem 1.2rem' }}
          >
            Explore Programmes
          </Link>
        </div>
      </div>
    </div>
  );
}