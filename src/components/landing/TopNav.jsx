import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';
import { useTranslation } from '@/lib/i18n';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import DisplayModeToggle from '@/components/display/DisplayModeToggle';
import {
  PRIMARY_LINKS,
  AUTH_LINKS,
  CONTENT_LINKS,
  NavIcon,
  desktopTabStyle,
  mobileTabStyle,
  linkBaseStyle,
} from '@/components/landing/nav-links';

export default function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);
  const { isAuthenticated, logout } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Close the mobile menu on outside click
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

  // Close the mobile menu on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [menuOpen]);

  const handleSignOut = () => {
    setMenuOpen(false);
    logout();
  };

  const isActive = (to) =>
    location.pathname === to || (to !== '/' && location.pathname.startsWith(to + '/'));

  // Every destination is a tab: the fixed pages, the learner pages once signed
  // in, then the reading and programme pages.
  const mainTabs = [...PRIMARY_LINKS, ...(isAuthenticated ? AUTH_LINKS : [])];
  const mobileLinks = [...mainTabs, ...CONTENT_LINKS];

  const renderTab = ({ key, to, icon }, size) => {
    const active = isActive(to);
    return (
      <Link
        key={key}
        to={to}
        className="tamu-nav-tab"
        aria-current={active ? 'page' : undefined}
        style={desktopTabStyle(active)}
      >
        <NavIcon icon={icon} active={active} size={size} />
        <span>{t(key)}</span>
      </Link>
    );
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
        borderBottom: scrolled || menuOpen ? '1px solid rgba(232,184,91,0.12)' : '1px solid transparent',
        transition: 'background-color 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
      }}
    >
      {/* Utility bar — wordmark, account actions, display and language controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.85rem clamp(1.25rem, 5vw, 3.5rem)',
        }}
      >
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
          {/* Desktop account actions and controls */}
          <div
            className="tamu-desktop-nav"
            style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}
          >
            {isAuthenticated ? (
              <button
                onClick={handleSignOut}
                className="tamu-nav-tab"
                style={{ ...desktopTabStyle(false), cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}
              >
                <NavIcon icon={LogOut} />
                <span>{t('nav.signOut')}</span>
              </button>
            ) : (
              <>
                <Link to="/login" className="tamu-nav-tab" style={desktopTabStyle(false)}>
                  <NavIcon icon={LogIn} />
                  <span>{t('nav.signIn')}</span>
                </Link>
                <Link
                  to="/register"
                  style={{
                    ...linkBaseStyle,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    color: '#24150f',
                    backgroundColor: '#e8b85b',
                    border: '1px solid #e8b85b',
                    borderRadius: '999px',
                    padding: '0.42rem 0.9rem',
                  }}
                >
                  <NavIcon icon={UserPlus} />
                  <span>{t('nav.createAccount')}</span>
                </Link>
              </>
            )}
            <DisplayModeToggle />
            <LanguageSwitcher />
          </div>

          {/* Compact controls — mobile utility bar */}
          <div className="tamu-mobile-utils" style={{ display: 'none', alignItems: 'center', gap: '0.5rem' }}>
            <LanguageSwitcher variant="icon" />
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
                display: 'flex',
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
        </div>
      </div>

      {/* Tab bar — every destination, side by side */}
      <nav
        aria-label="Primary"
        className="tamu-tab-row"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
          padding: '0.4rem clamp(1.25rem, 5vw, 3.5rem) 0.55rem',
          overflowX: 'auto',
        }}
      >
        {mainTabs.map((link) => renderTab(link))}

        <span
          aria-hidden="true"
          style={{
            width: '1px',
            alignSelf: 'stretch',
            minHeight: '16px',
            backgroundColor: 'rgba(232,184,91,0.22)',
            margin: '0 0.5rem',
            flexShrink: 0,
          }}
        />

        {CONTENT_LINKS.map((link) => renderTab(link))}
      </nav>

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
        {mobileLinks.map(({ key, to, icon }, idx) => {
          const active = isActive(to);
          // Insert a section label before the first reading destination
          const showContentLabel = idx === mainTabs.length;
          return (
            <React.Fragment key={key}>
              {showContentLabel && (
                <span
                  style={{
                    color: 'rgba(232,184,91,0.72)',
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
                className="tamu-tab-mobile"
                aria-current={active ? 'page' : undefined}
                style={mobileTabStyle(active)}
              >
                <NavIcon icon={icon} active={active} size={16} />
                <span>{t(key)}</span>
              </Link>
            </React.Fragment>
          );
        })}
        {/* Auth actions in mobile menu */}
        {isAuthenticated ? (
          <button
            onClick={handleSignOut}
            className="tamu-tab-mobile"
            style={{
              ...mobileTabStyle(false),
              width: '100%',
              textAlign: 'left',
              cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <NavIcon icon={LogOut} size={16} />
            <span>{t('nav.signOut')}</span>
          </button>
        ) : (
          <>
            <Link to="/login" className="tamu-tab-mobile" style={mobileTabStyle(false)}>
              <NavIcon icon={LogIn} size={16} />
              <span>{t('nav.signIn')}</span>
            </Link>
            <Link
              to="/register"
              className="tamu-tab-mobile"
              style={{ ...mobileTabStyle(false), color: '#e8b85b' }}
            >
              <NavIcon icon={UserPlus} size={16} />
              <span>{t('nav.createAccount')}</span>
            </Link>
          </>
        )}
        {/* Global Standard / Data-Saver preference — applies across the whole app */}
        <DisplayModeToggle variant="row" />
      </nav>

      {/* Responsive style injection */}
      <style>{`
        .tamu-tab-row { scrollbar-width: none; -ms-overflow-style: none; }
        .tamu-tab-row::-webkit-scrollbar { display: none; }
        @media (max-width: 860px) {
          .tamu-desktop-nav { display: none !important; }
          .tamu-mobile-utils { display: flex !important; }
          .tamu-tab-row { display: none !important; }
        }
        @media (min-width: 861px) {
          .tamu-mobile-utils { display: none !important; }
          #tamu-mobile-menu { display: none !important; }
        }
        .tamu-mobile-menu-btn:focus-visible {
          outline: 2px solid #e8b85b;
          outline-offset: 4px;
          border-radius: 2px;
        }
        /* Active tab fills with brand gold; inactive tabs warm slightly on hover. */
        .tamu-nav-tab {
          transition: background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease;
        }
        .tamu-nav-tab:not([aria-current]):hover {
          background-color: rgba(232,184,91,0.16) !important;
          border-color: rgba(232,184,91,0.35) !important;
          color: #f8f0df !important;
        }
        .tamu-nav-tab[aria-current]:hover {
          background-color: #f0c674 !important;
          border-color: #f0c674 !important;
          color: #24150f !important;
        }
        /* Mobile rows: active row is accented and tinted. */
        .tamu-tab-mobile:not([aria-current]):hover {
          background-color: rgba(232,184,91,0.08) !important;
          color: #f8f0df !important;
        }
        .tamu-tab-mobile[aria-current]:hover {
          background-color: rgba(232,184,91,0.14) !important;
        }
      `}</style>
    </header>
  );
}