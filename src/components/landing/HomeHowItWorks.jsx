import React from 'react';
import { Compass, Eye, UserPlus, BadgeCheck } from 'lucide-react';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

/**
 * HomeHowItWorks — the four learner steps as one compact horizontal bar:
 * Explore → Preview Module 1 free → Create a free account → Earn a verified
 * certificate. Four columns on desktop, two on tablets, a vertical list on
 * phones.
 */

const CONTENT = {
  heading: 'How It Works',
  steps: [
    { title: 'Explore Courses', body: 'Browse six free courses across five learning areas.' },
    { title: 'Preview Module 1 Free', body: 'Read the first module of any course without an account.' },
    { title: 'Create a Free Account', body: 'Save your progress, take the knowledge checks and keep your work.' },
    { title: 'Earn a Verified Certificate', body: 'Finish every module for a certificate anyone can check by QR code.' },
  ],
};

const ICONS = [Compass, Eye, UserPlus, BadgeCheck];

export default function HomeHowItWorks() {
  const { content: c } = useTranslatedContent('home-how-it-works', CONTENT);
  return (
    <section className="home-how" aria-labelledby="home-how-heading">
      <style>{HOW_CSS}</style>
      <div className="hw-inner">
        <h2 id="home-how-heading" className="font-body hw-heading">{c.heading}</h2>
        <ol className="hw-steps">
          {c.steps.map((step, i) => {
            const Icon = ICONS[i];
            return (
              <li key={i} className="hw-step">
                <span className="hw-marker" aria-hidden="true">
                  <Icon size={18} strokeWidth={1.7} />
                </span>
                <div>
                  <p className="font-body hw-num" aria-hidden="true">0{i + 1}</p>
                  <h3 className="font-heading hw-title">{step.title}</h3>
                  <p className="font-body hw-body">{step.body}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

const HOW_CSS = `
.home-how { padding: clamp(2.5rem, 5vw, 3.5rem) clamp(1rem, 5vw, 4rem); }
.hw-inner { max-width: 1112px; margin: 0 auto; }
.hw-heading { color: #e8b85b; font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 600; margin: 0 0 1.25rem; }
.hw-steps { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); border: 1px solid rgba(232,184,91,0.2); border-radius: 10px; overflow: hidden; }
.hw-step { position: relative; display: flex; gap: 0.85rem; padding: 1.2rem 1.25rem; background: rgba(243,234,216,0.025); }
.hw-step + .hw-step { border-left: 1px solid rgba(232,184,91,0.2); }
.hw-marker { flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 999px; background: rgba(232,184,91,0.12); color: #e8b85b; }
.hw-num { color: rgba(232,184,91,0.8); font-size: 0.64rem; letter-spacing: 0.16em; margin: 0 0 0.15rem; }
.hw-title { color: #f8f0df; font-size: 1.05rem; font-weight: 500; line-height: 1.25; margin: 0 0 0.3rem; }
.hw-body { color: rgba(243,234,216,0.68); font-size: 0.82rem; line-height: 1.55; margin: 0; }
@media (max-width: 1023px) {
  .hw-steps { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .hw-step:nth-child(3) { border-left: none; }
  .hw-step:nth-child(n+3) { border-top: 1px solid rgba(232,184,91,0.2); }
}
@media (max-width: 639px) {
  .hw-steps { grid-template-columns: minmax(0, 1fr); }
  .hw-step + .hw-step { border-left: none; border-top: 1px solid rgba(232,184,91,0.2); }
}
`;
