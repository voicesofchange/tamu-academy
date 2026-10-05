import React from 'react';
import PageLayout from '@/components/page/PageLayout';
import PageMeta from '@/components/seo/PageMeta';
import WorkbookToolbar from '@/components/guide/print/WorkbookToolbar';
import WorkbookCover from '@/components/guide/print/WorkbookCover';
import WorkbookSection from '@/components/guide/print/WorkbookSection';
import { GUIDE_SECTIONS } from '@/lib/guide/sections';
import { GUIDE_PRINT_PATH } from '@/lib/guide/guide-pdf';

/**
 * GuidePrint — the printable edition of Safari ya Utu.
 *
 * It renders the live guide content as a blank workbook: every section shown
 * with its framework, exercises, takeaways and closing reflection, and space to
 * write. It never reads or changes what the learner has saved, so printing is
 * always safe. Pressing the button opens the browser print dialog, where the
 * learner prints it or saves it as a PDF.
 */
export default function GuidePrint() {
  return (
    <PageLayout>
      <PageMeta
        title="Printable workbook — Safari ya Utu | Tamu Academy"
        description="The complete Safari ya Utu Learner's Guide as a blank printable workbook: every section, exercise and reflection, with space to write."
        path={GUIDE_PRINT_PATH}
        noindex
      />

      <WorkbookToolbar onPrint={() => window.print()} />

      <div
        className="tamu-print-area tamu-workbook"
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          background: '#FBF5E8',
          border: '1px solid #e3d5ba',
          borderRadius: '3px',
          padding: 'clamp(1.5rem, 4vw, 2.75rem)',
          marginBottom: 'clamp(3rem, 6vw, 5rem)',
        }}
      >
        <WorkbookCover />
        {GUIDE_SECTIONS.map((section) => (
          <WorkbookSection key={section.id} section={section} />
        ))}
      </div>
    </PageLayout>
  );
}