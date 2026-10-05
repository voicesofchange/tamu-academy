import React from 'react';
import PageLayout from '@/components/page/PageLayout';
import PageMeta from '@/components/seo/PageMeta';
import PageHero from '@/components/page/PageHero';
import PathwayModeStatus from '@/components/remote/PathwayModeStatus';
import PathwayStateLegend from '@/components/remote/PathwayStateLegend';
import PathwayStage from '@/components/remote/PathwayStage';
import RemoteOfflinePlan from '@/components/remote/RemoteOfflinePlan';
import { PATHWAY_STAGES } from '@/lib/remote-pathway';

/**
 * RemotePathway — the whole Remote Learner journey on one page: setting the
 * learner group, studying text-first, taking material offline, learning with
 * other people, and finishing with a certificate.
 *
 * It introduces nothing new to learn from — every step points at a pathway,
 * guide or setting that already exists — and it labels each step with whether
 * the learner's work is saved to their account or only carried offline.
 */
export default function RemotePathway() {
  return (
    <PageLayout>
      <PageMeta
        title="The Remote Learner pathway | Tamu Academy"
        description="The full pathway for learning on a slow or intermittent connection: text-first study, printable material, an optional peer circle, and a certificate at the end."
        path="/remote-pathway"
      />

      <PageHero
        eyebrow="Remote Learners"
        heading="The Remote Learner pathway"
        subheading="Text-first study, material you can carry offline, and a clear line between what is saved to your account and what only exists on paper."
      />

      <PathwayModeStatus />
      <PathwayStateLegend />

      {PATHWAY_STAGES.map((stage) => (
        <PathwayStage key={stage.id} stage={stage} />
      ))}

      <RemoteOfflinePlan onPrint={() => window.print()} />
    </PageLayout>
  );
}