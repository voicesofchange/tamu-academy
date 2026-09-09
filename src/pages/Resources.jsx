import React from 'react';
import PageMeta from '@/components/seo/PageMeta';
import { motion } from 'framer-motion';
import PageLayout from '@/components/page/PageLayout';
import PageHero from '@/components/page/PageHero';
import PageSection from '@/components/page/PageSection';
import ResourceCard from '@/components/resources/ResourceCard';
import { RESOURCE_AREAS, getResourcesByArea, getActiveResourceCount } from '@/lib/resources-data';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

const CONTENT = {
  heroEyebrow: 'Resources',
  heroHeading: 'Learning Resources',
  heroSubheading: "A developing collection of educational materials connected to Tamu Academy's six learning areas, freely accessible and thoughtfully curated.",
  introP1: "As Tamu Academy's programmes develop, this space will grow into a public learning resource that is curated, connected to real conversations, and accessible to learners from different backgrounds and contexts.",
  introP2: 'Resources include open courses, articles, discussion materials, policy explainers, data tools, practical guides, and curated reading recommendations. Original Tamu Academy materials will be added as they become available.',
  areasHeading: 'Resource Areas',
  videoSeriesHeading: 'Tamu Academy Video Series',
  videoSeriesP: 'Tamu Academy is developing an original video series exploring public policy, global affairs, intercultural leadership, and the ideas shaping our world — in accessible and engaging formats for young people and curious learners.',
  videosComingSoon: 'Videos Coming Soon',
  externalNotice: "External resources are selected for their educational value and connection to Tamu Academy's learning areas. They are created and maintained by their respective organizations. Availability, content, and access requirements may change.",
};

const bodyText = { color: 'rgba(245,239,224,0.78)', fontSize: '0.95rem', lineHeight: 1.85, fontWeight: 300 };

export default function Resources() {
  const activeCount = getActiveResourceCount();
  const { content: c } = useTranslatedContent('resources', CONTENT);

  return (
    <PageLayout>
      <PageMeta
        title="Learning Resources | Tamu Academy"
        description="A curated collection of free educational resources across Tamu Academy's six learning areas — AI, intercultural leadership, policy, economics, climate, and communication."
        path="/resources"
      />
      <PageHero
        eyebrow={c.heroEyebrow}
        heading={c.heroHeading}
        subheading={c.heroSubheading}
      />

      {/* Introductory content */}
      <PageSection>
        <p className="font-body" style={{ ...bodyText, marginBottom: '1.25rem' }}>{c.introP1}</p>
        <p className="font-body" style={bodyText}>{c.introP2}</p>
      </PageSection>

      {/* Anchor navigation to resource areas */}
      <PageSection heading={c.areasHeading}>
        <nav aria-label="Jump to resource area" style={{ marginBottom: '3.5rem' }}>
          <ul
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.6rem',
              padding: 0,
              margin: 0,
              listStyle: 'none',
            }}
          >
            {RESOURCE_AREAS.map((area) => (
              <li key={area.id}>
                <a
                  href={`#${area.id}`}
                  className="font-body tamu-area-anchor"
                  style={{
                    display: 'inline-block',
                    color: 'rgba(245,239,224,0.72)',
                    fontSize: '0.68rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    fontWeight: 500,
                    padding: '0.45rem 0.9rem',
                    border: '1px solid rgba(212,161,42,0.18)',
                    borderRadius: '2px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span style={{ color: '#D4A12A', marginRight: '0.4rem' }}>{area.number}</span>
                  {area.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Resource areas with cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
          {RESOURCE_AREAS.map((area) => {
            const resources = getResourcesByArea(area.id);
            return (
              <section
                key={area.id}
                id={area.id}
                aria-labelledby={`${area.id}-heading`}
                style={{ scrollMarginTop: '100px' }}
              >
                <div style={{ marginBottom: '1.5rem' }}>
                  <span
                    className="font-heading"
                    style={{
                      color: '#D4A12A',
                      fontSize: '1.3rem',
                      fontWeight: 400,
                      opacity: 0.5,
                      display: 'block',
                      lineHeight: 1,
                      marginBottom: '0.4rem',
                    }}
                  >
                    {area.number}
                  </span>
                  <h3
                    id={`${area.id}-heading`}
                    className="font-heading"
                    style={{
                      color: '#F5EFE0',
                      fontSize: 'clamp(1.1rem, 2.4vw, 1.5rem)',
                      fontWeight: 400,
                      lineHeight: 1.25,
                      margin: '0 0 0.75rem',
                    }}
                  >
                    {area.title}
                  </h3>
                  <p
                    className="font-body"
                    style={{
                      color: 'rgba(245,239,224,0.65)',
                      fontSize: '0.88rem',
                      lineHeight: 1.75,
                      fontWeight: 300,
                      margin: 0,
                      maxWidth: '640px',
                    }}
                  >
                    {area.description}
                  </p>
                </div>

                {/* Resource cards grid */}
                <div className="tamu-resource-grid">
                  {resources.map((resource, i) => (
                    <ResourceCard key={resource.id} resource={resource} index={i} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </PageSection>

      {/* Tamu Video Series — prepared slot for original content */}
      <PageSection heading={c.videoSeriesHeading}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ padding: '2rem 2.25rem', border: '1px solid rgba(212,161,42,0.2)', borderRadius: '4px', backgroundColor: 'rgba(212,161,42,0.025)' }}
        >
          <p className="font-body" style={{ ...bodyText, marginBottom: '1rem' }}>
            {c.videoSeriesP}
          </p>
          <span className="font-body" style={{ color: 'rgba(245,239,224,0.35)', fontSize: '0.68rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 500 }}>
            {c.videosComingSoon}
          </span>
        </motion.div>
      </PageSection>

      {/* External resource notice */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ padding: '1.5rem 2rem', borderLeft: '2px solid rgba(212,161,42,0.28)', backgroundColor: 'rgba(212,161,42,0.02)', marginBottom: '3rem' }}
      >
        <p className="font-body" style={{ color: 'rgba(245,239,224,0.62)', fontSize: '0.85rem', lineHeight: 1.8, fontWeight: 300, margin: 0, fontStyle: 'italic' }}>
          {c.externalNotice}
        </p>
      </motion.div>

      {/* Responsive grid + anchor focus styles */}
      <style>{`
        .tamu-resource-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        @media (min-width: 640px) {
          .tamu-resource-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        .tamu-area-anchor:focus-visible {
          outline: 2px solid #D4A12A;
          outline-offset: 3px;
          border-radius: 2px;
        }
        .tamu-area-anchor:hover {
          color: #F5EFE0;
          border-color: rgba(212,161,42,0.4);
        }
      `}</style>
    </PageLayout>
  );
}