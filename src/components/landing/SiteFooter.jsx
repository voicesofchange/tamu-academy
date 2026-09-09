import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/lib/i18n';

const LINKS = [
  { key: 'nav.home', to: '/' },
  { key: 'nav.about', to: '/about' },
  { key: 'nav.courses', to: '/courses' },
  { key: 'nav.videos', to: '/videos' },
  { key: 'nav.articles', to: '/articles' },
  { key: 'nav.resources', to: '/resources' },
  { key: 'nav.contact', to: '/contact' },
  { key: 'nav.privacy', to: '/privacy' },
];

export default function SiteFooter() {
  const { t } = useTranslation();
  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
        padding: '2.5rem 2rem 3rem',
        borderTop: '1px solid rgba(212,161,42,0.12)',
      }}
    >
      <nav aria-label="Footer navigation" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.25rem 1.5rem' }}>
        {LINKS.map(({ key, to }) => (
          <Link
            key={key}
            to={to}
            className="font-body tamu-nav-link"
            style={{
              color: 'rgba(245,239,224,0.6)',
              fontSize: '0.62rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              fontWeight: 500,
              padding: '0.3rem 0',
            }}
          >
            {t(key)}
          </Link>
        ))}
      </nav>

      <span
        className="font-body"
        style={{
          color: '#F5EFE0',
          fontSize: '0.62rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          opacity: 0.55,
          fontWeight: 500,
        }}
      >
        {t('footer.brand')}
      </span>
    </footer>
  );
}