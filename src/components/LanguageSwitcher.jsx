import React, { useState, useEffect, useRef } from 'react';
import { useTranslation, LANGUAGES } from '@/lib/i18n';

/**
 * Compact language switcher for the navigation bar.
 * Shows the current language code; opens a dropdown with all options.
 * Persists choice via the LanguageContext (localStorage).
 */
export default function LanguageSwitcher({ variant = 'desktop' }) {
  const { language, setLanguage } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const handleKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  const current = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  const baseStyle = {
    color: 'rgba(245,239,224,0.78)',
    fontSize: variant === 'mobile' ? '0.8rem' : '0.68rem',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    fontWeight: 500,
    whiteSpace: 'nowrap',
    background: 'none',
    border: variant === 'mobile' ? 'none' : '1px solid rgba(212,161,42,0.3)',
    borderRadius: '2px',
    padding: variant === 'mobile' ? '0.85rem 0' : '0.3rem 0.6rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.35rem',
    fontFamily: "'DM Sans', sans-serif",
    borderBottom: variant === 'mobile' ? '1px solid rgba(212,161,42,0.07)' : 'none',
    width: variant === 'mobile' ? '100%' : 'auto',
    justifyContent: variant === 'mobile' ? 'space-between' : 'flex-start',
  };

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block', width: variant === 'mobile' ? '100%' : 'auto' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
        style={baseStyle}
      >
        <span style={{ fontSize: '0.9em' }} aria-hidden="true">🌐</span>
        {current.nativeLabel}
        <span aria-hidden="true" style={{ fontSize: '0.8em', opacity: 0.6 }}>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div
          role="listbox"
          style={{
            position: variant === 'mobile' ? 'static' : 'absolute',
            top: variant === 'mobile' ? 'auto' : '100%',
            right: variant === 'mobile' ? 'auto' : 0,
            marginTop: variant === 'mobile' ? 0 : '0.4rem',
            minWidth: '140px',
            backgroundColor: 'rgba(20,14,10,0.96)',
            border: '1px solid rgba(212,161,42,0.2)',
            borderRadius: '4px',
            overflow: 'hidden',
            zIndex: 100,
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          }}
        >
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              role="option"
              aria-selected={lang.code === language}
              onClick={() => {
                setLanguage(lang.code);
                setOpen(false);
              }}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '0.65rem 1rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: lang.code === language ? '#D4A12A' : 'rgba(245,239,224,0.78)',
                fontSize: '0.78rem',
                fontWeight: 500,
                fontFamily: "'DM Sans', sans-serif",
                borderBottom: '1px solid rgba(212,161,42,0.08)',
              }}
            >
              {lang.nativeLabel}
              {lang.code !== 'en' && (
                <span style={{ marginLeft: '0.5rem', fontSize: '0.7em', opacity: 0.5 }}>{lang.label}</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}