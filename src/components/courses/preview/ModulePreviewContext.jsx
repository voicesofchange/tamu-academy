import { createContext, useContext } from 'react';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

/**
 * ModulePreviewContext — set by ModulePreviewGate when a visitor who is not
 * signed in opens a course's Module 1. The module page then asks the server
 * for the free preview, the course player shows a sign-up banner and footer,
 * and interactive sections (quizzes, action plans, labs, completion) ask the
 * visitor to create a free account instead of saving anything.
 */
export const ModulePreviewContext = createContext({ preview: false });

export function useModulePreview() {
  return useContext(ModulePreviewContext);
}

/** The preview's wording, in the reader's language. */
export const PREVIEW_LABELS = {
  bannerTitle: 'You are previewing Module 1 for free.',
  bannerBody: 'Read the lesson and watch the recorded material. Create a free account to save your progress, take the knowledge check and earn your certificate.',
  cta: 'Create Free Account to Save Progress & Earn Certificate',
  ctaShort: 'Create Free Account',
  signIn: 'Sign in',
  haveAccount: 'Already have an account?',
  gateTitle: 'Create a free account to continue',
  gateBody: 'This part of the course saves your work, so it needs a free Tamu Academy account. Your progress, answers and certificate are kept with your account.',
  sectionGated: 'Create a free account to use this part of the module.',
  footerNote: 'Save progress & earn your certificate',
  lockedNote: 'Free account needed',
  moduleGateTitle: 'This module is part of the full course',
  moduleGateBody: 'Module 1 is free to preview. Create a free account to open every module, save your progress and earn a QR-verified certificate.',
  previewModuleOne: 'Preview Module 1 for free',
};

export function usePreviewLabels() {
  return useTranslatedContent('module-preview', PREVIEW_LABELS).content;
}

/** Sign-up and sign-in links that bring the visitor back to `returnTo`. */
export function previewAuthLinks(returnTo) {
  const target = encodeURIComponent(returnTo);
  return { register: `/register?returnTo=${target}`, login: `/login?returnTo=${target}` };
}
