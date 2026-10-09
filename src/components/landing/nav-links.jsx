import React from 'react';
import {
  Home,
  GraduationCap,
  LayoutDashboard,
  BookOpen,
  User,
  TrendingUp,
  Library,
  Landmark,
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
 * There are two menus rather than one. A visitor who is not signed in sees the
 * Academy's public pages only, in reading order. A signed-in learner sees their
 * own learning destinations first, then the same public pages, then the reading
 * collections — grouped, not blended, so each audience reads one clear menu.
 */

// The Academy's public pages — shown to everyone, in this order.
export const PUBLIC_LINKS = [
  { key: 'nav.home', to: '/', icon: Home },
  { key: 'nav.courses', to: '/courses', icon: GraduationCap },
  { key: 'nav.ourFoundation', to: '/academy', icon: Landmark },
  { key: 'nav.about', to: '/about', icon: Info },
  { key: 'nav.contact', to: '/contact', icon: Mail },
];

// Learner-only destinations, shown once signed in.
export const LEARNER_LINKS = [
  { key: 'nav.myCourses', to: '/my-courses', icon: LayoutDashboard },
  { key: 'nav.learnersGuide', to: '/learners-guide', icon: BookOpen },
  { key: 'nav.myProgress', to: '/my-progress', icon: TrendingUp },
  { key: 'nav.learningHub', to: '/learning-hub', icon: Library },
  { key: 'nav.myProfile', to: '/profile', icon: User },
];

// The learner's core destinations — the only tabs a signed-in learner who is
// not an administrator sees. Everything in the menus above stays with admins.
export const LEARNER_CORE_LINKS = [
  { key: 'nav.home', to: '/', icon: Home },
  { key: 'nav.courses', to: '/courses', icon: GraduationCap },
  { key: 'nav.myCourses', to: '/my-courses', icon: LayoutDashboard },
  { key: 'nav.myProgress', to: '/my-progress', icon: TrendingUp },
  { key: 'nav.myProfile', to: '/profile', icon: User },
];

// Reading and programme destinations.
export const READING_LINKS = [
  { key: 'nav.videos', to: '/videos', icon: Video },
  { key: 'nav.articles', to: '/articles', icon: FileText },
  { key: 'nav.resources', to: '/resources', icon: FolderOpen },
  { key: 'nav.remotePathway', to: '/remote-pathway', icon: Wifi },
  { key: 'nav.stories', to: '/stories', icon: Quote },
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