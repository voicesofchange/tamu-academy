import React from 'react';
import ModuleLessonSection from '@/components/courses/module/ModuleLessonSection';

const bodyText = { color: 'rgba(243,234,216,0.78)', fontSize: '0.97rem', lineHeight: 1.85, fontWeight: 300 };
const quietBody = { ...bodyText, fontStyle: 'italic', color: 'rgba(243,234,216,0.62)' };

/**
 * ModuleTextSection — the shared text block used across the economics lesson
 * structure. It renders either a series of paragraphs or a list of strings
 * inside the standard lesson section frame, so every module keeps the same
 * section rhythm whatever shape its recorded content takes.
 *
 * Renders nothing when it has neither paragraphs, items, nor a placeholder.
 */
export default function ModuleTextSection({
  eyebrow,
  heading,
  paragraphs,
  items,
  intro,
  placeholder,
  ordered = true,
}) {
  const hasParagraphs = Array.isArray(paragraphs) && paragraphs.length > 0;
  const hasItems = Array.isArray(items) && items.length > 0;
  if (!hasParagraphs && !hasItems && !placeholder) return null;

  return (
    <ModuleLessonSection eyebrow={eyebrow} heading={heading}>
      {intro && (
        <p className="font-body" style={{ ...quietBody, marginBottom: '1.15rem' }}>{intro}</p>
      )}

      {hasParagraphs &&
        paragraphs.map((para, i) => (
          <p key={i} className="font-body" style={{ ...bodyText, marginBottom: '1.15rem' }}>{para}</p>
        ))}

      {!hasParagraphs && hasItems && ordered && (
        <ol className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem' }}>
          {items.map((item, i) => (
            <li key={i} style={{ marginBottom: '0.85rem' }}>{item}</li>
          ))}
        </ol>
      )}

      {!hasParagraphs && hasItems && !ordered && (
        <ul className="font-body" style={{ ...bodyText, margin: 0, paddingLeft: '1.4rem' }}>
          {items.map((item, i) => (
            <li key={i} style={{ marginBottom: '0.85rem' }}>{item}</li>
          ))}
        </ul>
      )}

      {!hasParagraphs && !hasItems && placeholder && (
        <p className="font-body" style={{ ...quietBody, margin: 0 }}>{placeholder}</p>
      )}
    </ModuleLessonSection>
  );
}