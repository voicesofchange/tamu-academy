import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { useTranslation } from '@/lib/i18n';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const NAV_LINKS = [
  { key: 'nav.home', to: '/' },
  { key: 'nav.about', to: '/about' },
  { key: 'nav.courses', to: '/courses' },
  { key: 'nav.videos', to: '/videos' },
  { key: 'nav.articles', to: '/articles' },
  { key: 'nav.resources', to: '/resources' },
  { key: 'nav.stories', to: '/stories' },
  { key: 'nav.contact', to: '/contact' },
];

export default function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);
  const { isAuthenticated, logout } = useAuth();
  const { t } = useTranslation();
  const navLinks = isAuthenticated
    ? [...NAV_LINKS.slice(0, 3), { key: 'nav.myCourses', to: '/my-courses' }, { key: 'nav.insights', to: '/insights' }, ...NAV_LINKS.slice(3)]
    : NAV_LINKS;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  // Close menu on Escape key
  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [menuOpen]);

  const handleSignOut = () => {
    setMenuOpen(false);
    logout();
  };

  return (
    <header
      ref={menuRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: scrolled || menuOpen ? 'rgba(20,14,10,0.92)' : 'transparent',
        backdropFilter: scrolled || menuOpen ? 'blur(10px)' : 'none',
        borderBottom: scrolled || menuOpen ? '1px solid rgba(212,161,42,0.12)' : '1px solid transparent',
        transition: 'background-color 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
      }}
    >
      {/* Main bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem clamp(1.25rem, 5vw, 3.5rem)',
      }}>
        {/* Logo / wordmark */}
        <Link
          to="/"
          className="font-heading"
          style={{
            color: '#F5EFE0',
            fontSize: '1.15rem',
            letterSpacing: '0.04em',
            textDecoration: 'none',
            fontWeight: 500,
          }}
        >
          Tamu <span style={{ color: '#D4A12A' }}>Academy</span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.65rem, 1.8vw, 1.5rem)' }} className="tamu-desktop-nav">
          {navLinks.map(({ key, to }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={key}
                to={to}
                className="tamu-nav-link"
                aria-current={active ? 'page' : undefined}
                style={{
                  color: active ? '#D4A12A' : 'rgba(245,239,224,0.78)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                  borderBottom: active ? '1px solid rgba(212,161,42,0.5)' : '1px solid transparent',
                  paddingBottom: '2px',
                }}
              >
                {t(key)}
              </Link>
            );
          })}
          {/* Auth actions */}
          {isAuthenticated ? (
            <button
              onClick={handleSignOut}
              className="tamu-nav-link"
              style={{
                color: 'rgba(245,239,224,0.78)',
                fontSize: '0.68rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                fontWeight: 500,
                whiteSpace: 'nowrap',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                paddingBottom: '2px',
                borderBottom: '1px solid transparent',
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {t('nav.signOut')}
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="tamu-nav-link"
                style={{
                  color: 'rgba(245,239,224,0.78)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                }}
              >
                {t('nav.signIn')}
              </Link>
              <Link
                to="/register"
                style={{
                  color: '#1A130E',
                  backgroundColor: '#D4A12A',
                  fontSize: '0.68rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                  border: '1px solid #D4A12A',
                  borderRadius: '2px',
                  padding: '0.35rem 0.85rem',
                }}
              >
                {t('nav.createAccount')}
              </Link>
            </>
          )}
          <LanguageSwitcher />
        </nav>

        {/* Compact language switcher — mobile header bar */}
        <div className="tamu-mobile-lang" style={{ display: 'none' }}>
          <LanguageSwitcher variant="icon" />
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="tamu-mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
          className="tamu-mobile-menu-btn"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            display: 'none',
            flexDirection: 'column',
            gap: '5px',
            outline: 'none',
          }}
        >
          {/* Three lines that animate to X */}
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: 'block',
                width: '22px',
                height: '1.5px',
                backgroundColor: '#D4A12A',
                borderRadius: '2px',
                transition: 'transform 0.25s ease, opacity 0.25s ease',
                transform: menuOpen
                  ? i === 0 ? 'translateY(6.5px) rotate(45deg)'
                  : i === 1 ? 'opacity: 0'
                  : 'translateY(-6.5px) rotate(-45deg)'
                  : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <nav
        id="tamu-mobile-menu"
        aria-label="Mobile navigation"
        style={{
          display: menuOpen ? 'flex' : 'none',
          flexDirection: 'column',
          padding: '0.5rem clamp(1.25rem, 5vw, 3.5rem) 1.5rem',
          borderTop: '1px solid rgba(212,161,42,0.1)',
          gap: '0',
        }}
      >
        {navLinks.map(({ key, to }) => {
          const active = location.pathname === to;
          return (
            <Link
              key={key}
              to={to}
              className="tamu-nav-link"
              aria-current={active ? 'page' : undefined}
              style={{
                color: active ? '#D4A12A' : 'rgba(245,239,224,0.82)',
                fontSize: '0.8rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                fontWeight: 500,
                padding: '0.85rem 0',
                borderBottom: '1px solid rgba(212,161,42,0.07)',
                display: 'block',
              }}
            >
              {t(key)}
            </Link>
          );
        })}
        {/* Auth actions in mobile menu */}
        {isAuthenticated ? (
          <button
            onClick={handleSignOut}
            className="tamu-nav-link"
            style={{
              color: 'rgba(245,239,224,0.82)',
              fontSize: '0.8rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontWeight: 500,
              padding: '0.85rem 0',
              borderBottom: '1px solid rgba(212,161,42,0.07)',
              display: 'block',
              width: '100%',
              textAlign: 'left',
              background: 'none',
              border: 'none',
              borderBottomWidth: '1px',
              borderBottomStyle: 'solid',
              borderBottomColor: 'rgba(212,161,42,0.07)',
              fontFamily: "'DM Sans', sans-serif",
              cursor: 'pointer',
            }}
          >
            {t('nav.signOut')}
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="tamu-nav-link"
              style={{
                color: 'rgba(245,239,224,0.82)',
                fontSize: '0.8rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                fontWeight: 500,
                padding: '0.85rem 0',
                borderBottom: '1px solid rgba(212,161,42,0.07)',
                display: 'block',
              }}
            >
              {t('nav.signIn')}
            </Link>
            <Link
              to="/register"
              className="tamu-nav-link"
              style={{
                color: '#D4A12A',
                fontSize: '0.8rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                fontWeight: 500,
                padding: '0.85rem 0',
                display: 'block',
              }}
            >
              {t('nav.createAccount')}
            </Link>
          </>
        )}
      </nav>

      {/* Responsive style injection */}
      <style>{`
        @media (max-width: 860px) {
          .tamu-desktop-nav { display: none !important; }
          .tamu-mobile-menu-btn { display: flex !important; }
          .tamu-mobile-lang { display: inline-flex !important; }
        }
        @media (min-width: 861px) {
          #tamu-mobile-menu { display: none !important; }
        }
        .tamu-mobile-menu-btn:focus-visible {
          outline: 2px solid #D4A12A;
          outline-offset: 4px;
          border-radius: 2px;
        }
      `}</style>
    </header>
  );
}