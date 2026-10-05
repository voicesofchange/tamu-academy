import React from 'react';
import {
  Home,
  GraduationCap,
  LayoutDashboard,
  BookOpen,
  User,
  Video,
  FileText,
  FolderOpen,
  Wifi,
  Quote,
  Info,
  Mail,
} from 'lucide-react';

/**
 * The header's navigation model and shared tab styling.
 *
 * Every destination is a first-class tab — nothing sits behind a menu — so the
 * whole site is visible at a glance and the page being read is always filled in
 * brand gold.
 */

// Always-visible destinations
export const PRIMARY_LINKS = [
  { key: 'nav.home', to: '/', icon: Home },
  { key: 'nav.courses', to: '/courses', icon: GraduationCap },
];

// Learner-only destinations, shown once signed in
export const AUTH_LINKS = [
  { key: 'nav.myCourses', to: '/my-courses', icon: LayoutDashboard },
  { key: 'nav.learnersGuide', to: '/learners-guide', icon: BookOpen },
  { key: 'nav.myProfile', to: '/profile', icon: User },
];

// Reading and programme destinations
export const CONTENT_LINKS = [
  { key: 'nav.videos', to: '/videos', icon: Video },
  { key: 'nav.articles', to: '/articles', icon: FileText },
  { key: 'nav.resources', to: '/resources', icon: FolderOpen },
  { key: 'nav.remotePathway', to: '/remote-pathway', icon: Wifi },
  { key: 'nav.stories', to: '/stories', icon: Quote },
  { key: 'nav.about', to: '/about', icon: Info },
  { key: 'nav.contact', to: '/contact', icon: Mail },
];

export const linkBaseStyle = {
  fontSize: '0.64rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  fontWeight: 500,
  whiteSpace: 'nowrap',
  textDecoration: 'none',
};

// One icon per tab, so every destination is recognisable at a glance.
export const NavIcon = ({ icon: Icon, active = false, size = 15 }) => (
  <Icon size={size} strokeWidth={active ? 2.1 : 1.75} aria-hidden="true" style={{ flexShrink: 0 }} />
);

// Desktop tab: icon + label, with the current destination filled in brand gold.
export const desktopTabStyle = (active) => ({
  ...linkBaseStyle,
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.35rem',
  borderRadius: '999px',
  padding: '0.38rem 0.62rem',
  color: active ? '#24150f' : 'rgba(243,234,216,0.78)',
  backgroundColor: active ? '#e8b85b' : 'transparent',
  border: `1px solid ${active ? '#e8b85b' : 'transparent'}`,
});

// Mobile tab row: icon + label, with the current destination tinted and accented.
export const mobileTabStyle = (active) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0.7rem',
  color: active ? '#e8b85b' : 'rgba(243,234,216,0.82)',
  backgroundColor: active ? 'rgba(232,184,91,0.09)' : 'transparent',
  fontSize: '0.8rem',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  textDecoration: 'none',
  fontWeight: 500,
  padding: '0.85rem 0.7rem',
  borderTop: '1px solid transparent',
  borderRight: '1px solid transparent',
  borderBottom: '1px solid rgba(232,184,91,0.07)',
  borderLeft: active ? '2px solid #e8b85b' : '2px solid transparent',
});