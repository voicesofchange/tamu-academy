import React from 'react';
import ModuleLessonSection from '@/components/courses/module/ModuleLessonSection';
import DecisionMap from '@/components/courses/module/DecisionMap';
import PolicyChoiceActivity from '@/components/courses/module/PolicyChoiceActivity';

const bodyText = { color: 'rgba(243,234,216,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };

/**
 * EconomicsAppliedActivity — the single applied-activity block for the
 * economics lessons. Each module keeps its own recorded activity shape (a
 * decision map, or a policy-choice exercise) and this renders it inside the
 * shared section frame, so the activity always sits in the same place in the
 * lesson and follows the same interaction pattern.
 */
export default function EconomicsAppliedActivity({ module, courseSlug, eyebrow, purposePrefix }) {
  const decisionMap = module.activity;
  const policyActivity = module.policyActivity;
  const activity = policyActivity || decisionMap;
  if (!activity) return null;

  return (
    <ModuleLessonSection eyebrow={eyebrow} heading={activity.title}>
      {activity.purpose && (
        <p className="font-body" style={{ ...bodyText, marginBottom: '0.5rem' }}>
          <span style={{ color: 'rgba(232,184,91,0.85)', fontWeight: 500 }}>{purposePrefix}: </span>
          {activity.purpose}
        </p>
      )}
      <div style={{ height: '1.6rem' }} />
      {policyActivity ? (
        <PolicyChoiceActivity policyActivity={policyActivity} />
      ) : (
        <DecisionMap activity={decisionMap} storageKey={`tamu-${courseSlug}-${module.route}-decisionmap`} />
      )}
    </ModuleLessonSection>
  );
}