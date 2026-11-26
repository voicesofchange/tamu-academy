import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { BadgeCheck, QrCode, ClipboardList } from 'lucide-react';
import TamuCertificateDocument from '@/components/certificates/TamuCertificateDocument';
import StatusBadge from '@/components/page/StatusBadge';
import { useTranslation } from '@/lib/i18n';

const SHEET_WIDTH = 880;

/**
 * ScaledCertificate — the real certificate document, laid out at a fixed
 * width and scaled down to fit its column, so the preview is the actual
 * design rather than a drawing of it.
 */
function ScaledCertificate({ courseTitle, learnerName }) {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const [box, setBox] = useState({ scale: 0.4, height: 0 });

  useEffect(() => {
    const measure = () => {
      if (!outerRef.current || !innerRef.current) return;
      const scale = Math.min(1, outerRef.current.clientWidth / SHEET_WIDTH);
      setBox({ scale, height: innerRef.current.offsetHeight * scale });
    };
    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro) {
      ro.observe(outerRef.current);
      ro.observe(innerRef.current);
    }
    window.addEventListener('resize', measure);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <div ref={outerRef} style={{ position: 'relative', width: '100%', height: box.height || undefined, overflow: 'hidden' }} aria-hidden="true">
      <div ref={innerRef} style={{ width: SHEET_WIDTH, transform: `scale(${box.scale})`, transformOrigin: 'top left', pointerEvents: 'none', userSelect: 'none' }}>
        <TamuCertificateDocument
          learnerName={learnerName}
          courseTitle={courseTitle}
          completedAt={null}
          certificateId="TAMU-XXXXXXXX"
        />
      </div>
    </div>
  );
}

/**
 * CourseCredentialPreview — the "Credential & Capstone" block of a course
 * page: on the left a scaled preview of the real Certificate of Completion
 * (marked as a sample, with its TAMU-XXXXXXXX verification code); on the
 * right the course's practical deliverable from its own data (the milestone
 * title, status, description and, where the course has them, the points the
 * final analysis covers). `children` adds course-specific detail under the
 * deliverable, such as Building Wealth Together's capstone options.
 */
export default function CourseCredentialPreview({ course, children }) {
  const { t } = useTranslation();
  const milestone = course.milestone || null;

  return (
    <div className="ccp">
      <style>{CCP_CSS}</style>
      <figure className="ccp-cert">
        <div className="ccp-sheet">
          <ScaledCertificate courseTitle={course.title} learnerName={t('course.sampleLearner')} />
          <span className="font-body ccp-sample">{t('course.sampleCertificate')}</span>
        </div>
        <figcaption className="font-body ccp-caption">
          <span className="ccp-id"><QrCode size={15} aria-hidden="true" /> TAMU-XXXXXXXX</span>
          <span>{t('course.certificateNote')}</span>
          <Link to="/verify" className="ccp-link">{t('course.verifyLink')} &rarr;</Link>
        </figcaption>
      </figure>

      {milestone && (
        <div className="ccp-deliverable">
          <p className="font-body ccp-eyebrow"><ClipboardList size={15} aria-hidden="true" /> {t('course.practicalDeliverable')}</p>
          <h3 className="font-heading ccp-title">{milestone.title}</h3>
          {milestone.status && <div style={{ marginBottom: '0.85rem' }}><StatusBadge label={milestone.status} tone="light" /></div>}
          {milestone.description && <p className="font-body ccp-body">{milestone.description}</p>}
          {Array.isArray(milestone.analysisPoints) && milestone.analysisPoints.length > 0 && (
            <>
              <p className="font-body ccp-sub">{t('course.finalAnalysis')}</p>
              <ul className="font-body ccp-points">
                {milestone.analysisPoints.map((point) => <li key={point}>{point}</li>)}
              </ul>
            </>
          )}
          {children}
          <p className="font-body ccp-earn"><BadgeCheck size={15} aria-hidden="true" /> {t('course.earnCertificate')}</p>
        </div>
      )}
    </div>
  );
}

const CCP_CSS = `
.ccp { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 1.5rem; align-items: start; }
.ccp-cert { margin: 0; }
.ccp-sheet { position: relative; border: 1px solid #dcc8a8; border-radius: 6px; padding: 10px; background: #fffaf1; box-shadow: 0 8px 24px rgba(57,37,27,0.1); }
.ccp-sample { position: absolute; top: 18px; right: 18px; background: #39251b; color: #f8f0df; font-size: 0.62rem; letter-spacing: 0.14em; text-transform: uppercase; font-weight: 700; padding: 0.3rem 0.6rem; border-radius: 999px; }
.ccp-caption { display: flex; flex-direction: column; gap: 0.35rem; margin-top: 0.85rem; color: #725a46; font-size: 0.85rem; line-height: 1.55; }
.ccp-id { display: inline-flex; align-items: center; gap: 0.4rem; align-self: flex-start; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 0.78rem; color: #39251b; background: #f3e6cc; border: 1px solid #dcc8a8; border-radius: 4px; padding: 0.2rem 0.5rem; }
.ccp-link { color: #9b5d1d; font-weight: 600; text-decoration: none; border-bottom: 1px solid #c18a36; align-self: flex-start; }
.ccp-link:focus-visible { outline: 2px solid #b97827; outline-offset: 2px; }
.ccp-deliverable { border: 1px solid #dcc8a8; border-radius: 8px; background: #fffaf1; padding: 1.5rem 1.6rem; }
.ccp-eyebrow { display: inline-flex; align-items: center; gap: 0.4rem; color: #b97827; font-size: 0.66rem; letter-spacing: 0.16em; text-transform: uppercase; font-weight: 600; margin: 0 0 0.6rem; }
.ccp-title { color: #39251b; font-size: 1.35rem; font-weight: 400; line-height: 1.25; margin: 0 0 0.75rem; }
.ccp-body { color: #725a46; font-size: 0.92rem; line-height: 1.7; margin: 0 0 1rem; }
.ccp-sub { color: #b97827; font-size: 0.64rem; letter-spacing: 0.16em; text-transform: uppercase; font-weight: 600; margin: 0 0 0.5rem; }
.ccp-points { color: #725a46; font-size: 0.88rem; line-height: 1.65; margin: 0 0 1rem; padding-left: 1.15rem; }
.ccp-earn { display: flex; align-items: center; gap: 0.45rem; color: #5f4531; font-size: 0.85rem; margin: 1rem 0 0; padding-top: 0.9rem; border-top: 1px solid #e8d9bf; }
.ccp-earn svg { color: #b97827; flex-shrink: 0; }
@media (max-width: 899px) { .ccp { grid-template-columns: minmax(0, 1fr); } }
`;
