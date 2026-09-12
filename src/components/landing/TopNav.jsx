import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { useTranslation } from '@/lib/i18n';
import LanguageSwitcher from '@/components/LanguageSwitcher';

// Primary, always-visible destinations
const PRIMARY_LINKS = [
  { key: 'nav.home', to: '/' },
  { key: 'nav.courses', to: '/courses' },
];

// Learner-only destinations shown when authenticated
const AUTH_LINKS = [
  { key: 'nav.myCourses', to: '/my-courses' },
];

// Secondary content grouped under "Explore"
const EXPLORE_LINKS = [
  { key: 'nav.videos', to: '/videos' },
  { key: 'nav.articles', to: '/articles' },
  { key: 'nav.resources', to: '/resources' },
  { key: 'nav.stories', to: '/stories' },
  { key: 'nav.about', to: '/about' },
  { key: 'nav.contact', to: '/contact' },
];

const linkBaseStyle = {
  fontSize: '0.68rem',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  fontWeight: 500,
  whiteSpace: 'nowrap',
  textDecoration: 'none',
  paddingBottom: '2px',
};

export default function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);
  const exploreRef = useRef(null);
  const { isAuthenticated, logout } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMenuOpen(false);
    setExploreOpen(false);
  }, [location.pathname]);

  // Close mobile menu on outside click
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

  // Close explore dropdown on outside click
  useEffect(() => {
    if (!exploreOpen) return;
    const handleClick = (e) => {
      if (exploreRef.current && !exploreRef.current.contains(e.target)) {
        setExploreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [exploreOpen]);

  // Close menus on Escape key
  useEffect(() => {
    if (!menuOpen && !exploreOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setExploreOpen(false);
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [menuOpen, exploreOpen]);

  const handleSignOut = () => {
    setMenuOpen(false);
    logout();
  };

  const isActive = (to) =>
    location.pathname === to || (to !== '/' && location.pathname.startsWith(to + '/'));

  const exploreActive = EXPLORE_LINKS.some(({ to }) => isActive(to));

  // Full link list for mobile menu
  const mobileLinks = [
    ...PRIMARY_LINKS,
    ...(isAuthenticated ? AUTH_LINKS : []),
    ...EXPLORE_LINKS,
  ];

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
        borderBottom: scrolled || menuOpen ? '1px solid rgba(232,184,91,0.12)' : '1px solid transparent',
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
            color: '#f8f0df',
            fontSize: '1.15rem',
            letterSpacing: '0.04em',
            textDecoration: 'none',
            fontWeight: 500,
          }}
        >
          Tamu <span style={{ color: '#e8b85b' }}>Academy</span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.65rem, 1.8vw, 1.5rem)' }} className="tamu-desktop-nav">
          {/* Primary links */}
          {PRIMARY_LINKS.map(({ key, to }) => {
            const active = isActive(to);
            return (
              <Link
                key={key}
                to={to}
                className="tamu-nav-link"
                aria-current={active ? 'page' : undefined}
                style={{
                  ...linkBaseStyle,
                  color: active ? '#e8b85b' : 'rgba(243,234,216,0.78)',
                  borderBottom: active ? '1px solid rgba(232,184,91,0.5)' : '1px solid transparent',
                }}
              >
                {t(key)}
              </Link>
            );
          })}

          {/* Auth-only links */}
          {isAuthenticated && AUTH_LINKS.map(({ key, to }) => {
            const active = isActive(to);
            return (
              <Link
                key={key}
                to={to}
                className="tamu-nav-link"
                aria-current={active ? 'page' : undefined}
                style={{
                  ...linkBaseStyle,
                  color: active ? '#e8b85b' : 'rgba(243,234,216,0.78)',
                  borderBottom: active ? '1px solid rgba(232,184,91,0.5)' : '1px solid transparent',
                }}
              >
                {t(key)}
              </Link>
            );
          })}

          {/* Explore dropdown */}
          <div ref={exploreRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setExploreOpen((v) => !v)}
              aria-expanded={exploreOpen}
              aria-haspopup="true"
              className="tamu-nav-link"
              style={{
                ...linkBaseStyle,
                color: exploreActive ? '#e8b85b' : 'rgba(243,234,216,0.78)',
                borderBottom: exploreActive ? '1px solid rgba(232,184,91,0.5)' : '1px solid transparent',
                background: 'none',
                border: 'none',
                borderBottomWidth: '1px',
                borderBottomStyle: 'solid',
                borderBottomColor: exploreActive ? 'rgba(232,184,91,0.5)' : 'transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {t('nav.explore')}
              <span style={{ fontSize: '0.5rem', lineHeight: 1, transition: 'transform 0.2s ease', transform: exploreOpen ? 'rotate(180deg)' : 'none' }}>▾</span>
            </button>
            {exploreOpen && (
              <div
                role="menu"
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '0.6rem',
                  minWidth: '180px',
                  backgroundColor: 'rgba(20,14,10,0.96)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(232,184,91,0.18)',
                  borderRadius: '4px',
                  padding: '0.4rem 0',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.4)',
                }}
              >
                {EXPLORE_LINKS.map(({ key, to }) => {
                  const active = isActive(to);
                  return (
                    <Link
                      key={key}
                      to={to}
                      role="menuitem"
                      className="tamu-nav-link"
                      style={{
                        display: 'block',
                        color: active ? '#e8b85b' : 'rgba(243,234,216,0.75)',
                        fontSize: '0.68rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        fontWeight: 500,
                        textDecoration: 'none',
                        padding: '0.6rem 1.1rem',
                        borderLeft: active ? '2px solid #e8b85b' : '2px solid transparent',
                        transition: 'background-color 0.2s ease, color 0.2s ease',
                      }}
                    >
                      {t(key)}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Auth actions */}
          {isAuthenticated ? (
            <button
              onClick={handleSignOut}
              className="tamu-nav-link"
              style={{
                ...linkBaseStyle,
                color: 'rgba(243,234,216,0.78)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
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
                  ...linkBaseStyle,
                  color: 'rgba(243,234,216,0.78)',
                }}
              >
                {t('nav.signIn')}
              </Link>
              <Link
                to="/register"
                style={{
                  color: '#24150f',
                  backgroundColor: '#e8b85b',
                  fontSize: '0.68rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                  border: '1px solid #e8b85b',
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
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: 'block',
                width: '22px',
                height: '1.5px',
                backgroundColor: '#e8b85b',
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
          borderTop: '1px solid rgba(232,184,91,0.1)',
          gap: '0',
        }}
      >
        {mobileLinks.map(({ key, to }, idx) => {
          const active = isActive(to);
          // Insert a section label before the first Explore link
          const showExploreLabel = idx === PRIMARY_LINKS.length + (isAuthenticated ? AUTH_LINKS.length : 0);
          return (
            <React.Fragment key={key}>
              {showExploreLabel && (
                <span
                  style={{
                    color: 'rgba(232,184,91,0.5)',
                    fontSize: '0.58rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    padding: '1.1rem 0 0.3rem',
                    borderBottom: '1px solid rgba(232,184,91,0.07)',
                  }}
                >
                  {t('nav.explore')}
                </span>
              )}
              <Link
                to={to}
                className="tamu-nav-link"
                aria-current={active ? 'page' : undefined}
                style={{
                  color: active ? '#e8b85b' : 'rgba(243,234,216,0.82)',
                  fontSize: '0.8rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  fontWeight: 500,
                  padding: '0.85rem 0',
                  borderBottom: '1px solid rgba(232,184,91,0.07)',
                  display: 'block',
                }}
              >
                {t(key)}
              </Link>
            </React.Fragment>
          );
        })}
        {/* Auth actions in mobile menu */}
        {isAuthenticated ? (
          <button
            onClick={handleSignOut}
            className="tamu-nav-link"
            style={{
              color: 'rgba(243,234,216,0.82)',
              fontSize: '0.8rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontWeight: 500,
              padding: '0.85rem 0',
              borderBottom: '1px solid rgba(232,184,91,0.07)',
              display: 'block',
              width: '100%',
              textAlign: 'left',
              background: 'none',
              border: 'none',
              borderBottomWidth: '1px',
              borderBottomStyle: 'solid',
              borderBottomColor: 'rgba(232,184,91,0.07)',
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
                color: 'rgba(243,234,216,0.82)',
                fontSize: '0.8rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                fontWeight: 500,
                padding: '0.85rem 0',
                borderBottom: '1px solid rgba(232,184,91,0.07)',
                display: 'block',
              }}
            >
              {t('nav.signIn')}
            </Link>
            <Link
              to="/register"
              className="tamu-nav-link"
              style={{
                color: '#e8b85b',
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
          outline: 2px solid #e8b85b;
          outline-offset: 4px;
          border-radius: 2px;
        }
      `}</style>
    </header>
  );
}