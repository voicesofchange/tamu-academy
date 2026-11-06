import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import { useTranslation } from '@/lib/i18n';
import ModuleDevelopmentState from '@/components/courses/module/ModuleDevelopmentState';
import ModuleStartGate from '@/components/courses/ModuleStartGate';
import useCourseEnrollment from '@/hooks/useCourseEnrollment';
import SokoExpandedTemplate from '@/components/courses/soko/SokoExpandedTemplate';
import SokoFacilitatorPanel from '@/components/courses/soko/SokoFacilitatorPanel';
import {
  SAUTI_ZA_SOKO_COURSE,
  SAUTI_ZA_SOKO_PEER_COURSE_SLUG,
} from '@/lib/sauti-za-soko-tracks';

const COURSE_STUB = {
  slug: SAUTI_ZA_SOKO_PEER_COURSE_SLUG,
  title: 'Sauti za Soko Peer Facilitator',
  pillar: 'Economics and Development',
  track: 'African Economic Literacy and Systems Analysis',
};

/**
 * SokoPeerFacilitator — Module 8 of the optional Peer Facilitator track.
 * The learning content is the same template as the core modules; in place
 * of the My Soko Action Plan activity it renders the vendor-circle record
 * that a reviewer must approve before the module can be completed.
 */
export default function SokoPeerFacilitator() {
  const { language } = useTranslation();
  const { user } = useAuth();
  const [module, setModule] = useState(null);
  const [status, setStatus] = useState('loading');
  const [reloadToken, setReloadToken] = useState(0);
  const { status: enrollmentStatus, isAuthenticated } = useCourseEnrollment(SAUTI_ZA_SOKO_PEER_COURSE_SLUG);
  const autoStart = new URLSearchParams(window.location.search).get('enroll') === '1';

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await base44.functions.invoke('getSokoModule', {
          courseSlug: SAUTI_ZA_SOKO_PEER_COURSE_SLUG,
          moduleRoute: 'module-8',
          language,
        });
        if (cancelled) return;
        const data = res && res.data ? res.data : null;
        if (data && data.module) {
          setModule(data.module);
          setStatus('ready');
        } else {
          setStatus('denied');
        }
      } catch (err) {
        if (!cancelled) setStatus('denied');
      }
    })();
    return () => { cancelled = true; };
  }, [language, reloadToken]);

  if (status === 'loading') {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#24150f' }}>
        <div className="w-8 h-8 border-4 border-[rgba(232,184,91,0.2)] border-t-[#e8b85b] rounded-full animate-spin" aria-label="Loading module" />
      </div>
    );
  }

  if (status === 'denied') {
    const peerModule = { number: 'Module 8', route: 'module-8', title: 'Facilitating a Vendor Circle' };

    // Signed in but not enrolled: start the track here and load the module in
    // place. Unpublished modules and prerequisites keep their own state.
    if (isAuthenticated && enrollmentStatus === 'checking') {
      return (
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#24150f' }}>
          <div className="w-8 h-8 border-4 border-[rgba(232,184,91,0.2)] border-t-[#e8b85b] rounded-full animate-spin" aria-label="Checking your enrollment" />
        </div>
      );
    }
    if (isAuthenticated && enrollmentStatus === 'not_enrolled') {
      return (
        <ModuleStartGate
          course={COURSE_STUB}
          module={peerModule}
          autoStart={autoStart}
          onStarted={() => setReloadToken((token) => token + 1)}
        />
      );
    }

    return <ModuleDevelopmentState course={COURSE_STUB} module={peerModule} />;
  }

  const canSave = !!user;

  return (
    <SokoExpandedTemplate
      course={SAUTI_ZA_SOKO_COURSE}
      module={module}
      courseSlug={SAUTI_ZA_SOKO_PEER_COURSE_SLUG}
      moduleRoute="module-8"
      moduleIndex={0}
      moduleCount={1}
      prevModule={null}
      prevPath={null}
      nextModule={null}
      nextPath={null}
      nextLabel="Peer Facilitator certificate"
      canSave={canSave}
      facilitatorSlot={<SokoFacilitatorPanel canSave={canSave} />}
    />
  );
}