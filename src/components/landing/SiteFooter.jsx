import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/lib/i18n';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

/**
 * SiteFooter — the footer on every page that uses the shared site frame:
 * the brand line, the main destinations (including certificate verification
 * and the Privacy Policy) and the copyright notice.
 */

const CONTENT = {
  navLabel: 'Footer',
  courses: 'Courses',
  about: 'About',
  verify: 'Verify Certificate',
  privacy: 'Privacy Policy',
  contact: 'Contact',
  copyright: '© {year} Waiyaki House LLC. All rights reserved.',
};

const LINKS = [
  { key: 'courses', to: '/courses' },
  { key: 'about', to: '/about' },
  { key: 'verify', to: '/verify' },
  { key: 'privacy', to: '/privacy' },
  { key: 'contact', to: '/contact' },
];

export default function SiteFooter() {
  const { t } = useTranslation();
  const { content: c } = useTranslatedContent('site-footer', CONTENT);
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <style>{FOOTER_CSS}</style>
      <span className="font-body site-footer-brand">{t('footer.brand')}</span>
      <nav aria-label={c.navLabel}>
        <ul className="font-body site-footer-links">
          {LINKS.map((link) => (
            <li key={link.key}>
              <Link to={link.to}>{c[link.key]}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <p className="font-body site-footer-copy">{String(c.copyright).replace('{year}', String(year))}</p>
    </footer>
  );
}

const FOOTER_CSS = `
.site-footer {
  position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; gap: 1.1rem;
  padding: 2.5rem 1.25rem 3rem; border-top: 1px solid rgba(232,184,91,0.12); text-align: center;
}
.site-footer-brand { color: #f8f0df; font-size: 0.62rem; letter-spacing: 0.3em; text-transform: uppercase; opacity: 0.55; font-weight: 500; }
.site-footer-links { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; justify-content: center; gap: 0.5rem 1.5rem; }
.site-footer-links a { color: rgba(243,234,216,0.75); font-size: 0.8rem; text-decoration: none; }
.site-footer-links a:hover { color: #e8b85b; }
.site-footer-links a:focus-visible { outline: 2px solid rgba(232,184,91,0.75); outline-offset: 3px; border-radius: 2px; }
.site-footer-copy { color: rgba(243,234,216,0.45); font-size: 0.72rem; margin: 0; }
`;
