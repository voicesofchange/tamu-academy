import { useEffect } from 'react';

const ORGANIZATION_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Tamu Academy',
  url: 'https://tamuacademy.org/',
  description:
    'Tamu Academy is an emerging interdisciplinary learning platform that equips young people and emerging leaders with knowledge, dialogue skills, and practical tools for responsible leadership.',
  founder: {
    '@type': 'Person',
    name: 'Tex Wambui',
  },
  // Tamu Academy is an educational initiative of Waiyaki House LLC.
  parentOrganization: {
    '@type': 'Organization',
    name: 'Waiyaki House LLC',
  },
};

/**
 * Injects the Organization JSON-LD structured data block once on mount.
 * Removed on unmount to avoid duplication if the component remounts.
 */
export default function StructuredData() {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'tamu-org-ld';
    script.textContent = JSON.stringify(ORGANIZATION_LD);
    // Only inject if not already present
    if (!document.getElementById('tamu-org-ld')) {
      document.head.appendChild(script);
    }
    return () => {
      const el = document.getElementById('tamu-org-ld');
      if (el) el.remove();
    };
  }, []);

  return null;
}