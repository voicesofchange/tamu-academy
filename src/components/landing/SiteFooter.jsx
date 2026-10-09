import React from 'react';
import { useTranslation } from '@/lib/i18n';

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
        borderTop: '1px solid rgba(232,184,91,0.12)',
      }}
    >
      <span
        className="font-body"
        style={{
          color: '#f8f0df',
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