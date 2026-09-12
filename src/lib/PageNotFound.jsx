import React from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '@/components/seo/PageMeta';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

const CONTENT = {
  brand: 'Tamu Academy',
  title: 'Page Not Found',
  message: 'The page you are looking for could not be found. It may have moved, or the address may be incorrect.',
  returnHome: 'Return to Homepage',
  exploreCourses: 'Explore Courses',
};

export default function PageNotFound() {
  const { content: c } = useTranslatedContent('404', CONTENT);

  return (
    <div style={{ backgroundColor: '#24150f', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', fontFamily: "'DM Sans', sans-serif" }}>
      <PageMeta
        title="Page Not Found | Tamu Academy"
        description="The page you are looking for could not be found."
        path="/404"
        noindex={true}
      />
      <div style={{ maxWidth: '480px', width: '100%', textAlign: 'center' }}>
        <span
          className="font-body"
          style={{ color: '#e8b85b', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: '1.5rem' }}
        >
          {c.brand}
        </span>

        <p
          className="font-heading"
          style={{ color: 'rgba(243,234,216,0.3)', fontSize: '5rem', fontWeight: 300, lineHeight: 1, margin: '0 0 1rem' }}
          aria-hidden="true"
        >
          404
        </p>

        <h1
          className="font-heading"
          style={{ color: '#f8f0df', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 400, lineHeight: 1.25, margin: '0 0 1rem' }}
        >
          {c.title}
        </h1>

        <div
          aria-hidden="true"
          style={{ width: '40px', height: '1px', background: 'linear-gradient(90deg, transparent, #e8b85b 35%, #E2B652 50%, #e8b85b 65%, transparent)', margin: '0 auto 1.5rem', }}
        />

        <p
          className="font-body"
          style={{ color: 'rgba(243,234,216,0.62)', fontSize: '0.93rem', lineHeight: 1.8, fontWeight: 300, margin: '0 0 2rem' }}
        >
          {c.message}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', justifyContent: 'center' }}>
          <Link
            to="/"
            style={{ display: 'inline-flex', alignItems: 'center', color: '#24150f', backgroundColor: '#e8b85b', fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, border: '1px solid #e8b85b', borderRadius: '2px', padding: '0.65rem 1.2rem' }}
          >
            {c.returnHome}
          </Link>
          <Link
            to="/courses"
            style={{ display: 'inline-flex', alignItems: 'center', color: '#e8b85b', backgroundColor: 'transparent', fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500, border: '1px solid rgba(232,184,91,0.4)', borderRadius: '2px', padding: '0.65rem 1.2rem' }}
          >
            {c.exploreCourses}
          </Link>
        </div>
      </div>
    </div>
  );
}