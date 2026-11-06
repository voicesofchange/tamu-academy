import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { base44 } from '@/api/base44Client';
import PageLayout from '@/components/page/PageLayout';
import PageMeta from '@/components/seo/PageMeta';
import { useAuth } from '@/lib/AuthContext';
import TranslationCounts from '@/components/admin/TranslationCounts';
import TranslationRow from '@/components/admin/TranslationRow';
import TranslationCsvTools from '@/components/admin/TranslationCsvTools';
import {
  REVIEW_LANGUAGES,
  courseLabel,
  countTranslations,
} from '@/lib/translation-review';

const bodyText = { color: 'rgba(243,234,216,0.68)', fontSize: '0.95rem', lineHeight: 1.8, fontWeight: 300 };

/**
 * Translation Review — administrators only.
 *
 * The cached course translations, grouped by course and module for one
 * language, with the English each was made from. A translation can be corrected
 * and marked reviewed; a reviewed translation is never overwritten by the
 * translation run. When the English changes, the stored translation is flagged
 * outdated, redone, and comes back for a fresh review.
 */
export default function TranslationReview() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const [language, setLanguage] = useState('sw');
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [savingId, setSavingId] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  const load = useCallback(async (lang) => {
    setLoading(true);
    setError('');
    try {
      const res = await base44.functions.invoke('getTranslationReview', { language: lang });
      const data = (res && res.data) || {};
      if (data.error) throw new Error(data.error);
      setRows(Array.isArray(data.rows) ? data.rows : []);
    } catch (err) {
      setRows([]);
      setError(err?.message || 'The translations could not be loaded.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) load(language);
  }, [isAdmin, language, load]);

  const counts = useMemo(() => countTranslations(rows), [rows]);

  const groups = useMemo(() => {
    const byCourse = new Map();
    for (const row of rows) {
      const courseKey = row.course_slug || 'unknown';
      if (!byCourse.has(courseKey)) byCourse.set(courseKey, new Map());
      const modules = byCourse.get(courseKey);
      const moduleKey = row.module_slug || 'module';
      if (!modules.has(moduleKey)) modules.set(moduleKey, []);
      modules.get(moduleKey).push(row);
    }

    return [...byCourse.entries()]
      .sort((a, b) => courseLabel(a[0]).localeCompare(courseLabel(b[0])))
      .map(([slug, modules]) => ({
        slug,
        modules: [...modules.entries()]
          .sort((a, b) => a[0].localeCompare(b[0]))
          .map(([moduleSlug, items]) => ({
            slug: moduleSlug,
            title: items[0].module_title || moduleSlug,
            rows: [...items].sort((a, b) => a.field_path.localeCompare(b.field_path)),
          })),
      }));
  }, [rows]);

  const handleSave = async (row, text, status) => {
    setSavingId(row.id);
    setMessage('');
    try {
      const res = await base44.functions.invoke('saveTranslationReview', {
        id: row.id,
        translated_text: text,
        status,
      });
      const data = (res && res.data) || {};
      if (data.error) throw new Error(data.error);
      setRows((prev) =>
        prev.map((item) =>
          item.id === row.id
            ? {
                ...item,
                translated_text: data.row.translated_text,
                status: data.row.status,
                reviewed_at: data.row.reviewed_at,
                reviewed_by: data.row.reviewed_by,
              }
            : item,
        ),
      );
      setMessage(status === 'reviewed' ? 'Translation saved and marked reviewed.' : 'Translation reopened for review.');
    } catch (err) {
      setMessage(err?.message || 'That translation could not be saved.');
    } finally {
      setSavingId('');
    }
  };

  const handleExport = async () => {
    setBusy(true);
    setMessage('');
    try {
      const res = await base44.functions.invoke('exportTranslationCsv', { language });
      const data = (res && res.data) || {};
      if (data.error) throw new Error(data.error);

      const blob = new Blob([data.csv || ''], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `tamu-translations-${language}-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      setMessage(`Exported ${data.count || 0} translations for review.`);
    } catch (err) {
      setMessage(err?.message || 'The CSV could not be exported.');
    } finally {
      setBusy(false);
    }
  };

  const handleImport = async (file) => {
    setBusy(true);
    setMessage('');
    try {
      const text = await file.text();
      const res = await base44.functions.invoke('importTranslationCsv', { language, csv: text });
      const data = (res && res.data) || {};
      if (data.error) throw new Error(data.error);

      const parts = [`Imported ${data.updated || 0} reviewed translations.`];
      if (data.outdated) parts.push(`${data.outdated} outdated rows skipped — they will be redone and reviewed again.`);
      if (data.skipped) parts.push(`${data.skipped} unmatched rows skipped.`);
      setMessage(parts.join(' '));
      await load(language);
    } catch (err) {
      setMessage(err?.message || 'The CSV could not be imported.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <PageLayout>
      <PageMeta
        title="Translation Review | Tamu Academy"
        description="Review the cached course translations, correct them, and send them to outside reviewers."
        path="/admin/translation-review"
        noindex
      />

      <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '7rem clamp(1.25rem, 4vw, 3rem) 4rem' }}>
        <span
          className="font-body"
          style={{
            color: '#e8b85b',
            fontSize: '0.66rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            fontWeight: 500,
            display: 'block',
            marginBottom: '1rem',
          }}
        >
          Administration
        </span>
        <h1
          className="font-heading"
          style={{ color: '#f8f0df', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 400, lineHeight: 1.2, margin: '0 0 1rem' }}
        >
          Translation Review
        </h1>
        <p className="font-body" style={{ ...bodyText, maxWidth: '680px', marginBottom: '2rem' }}>
          The English course text beside each stored translation. Correct a translation and mark
          it reviewed; reviewed translations are never overwritten automatically. When the English
          changes, its translation is flagged outdated, redone, and returned for review.
        </p>

        {!isAdmin ? (
          <p className="font-body" style={{ ...bodyText, color: 'rgba(232,184,91,0.85)' }}>
            This page is available to administrators only.
          </p>
        ) : (
          <>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.85rem',
                marginBottom: '1.5rem',
                paddingBottom: '1.25rem',
                borderBottom: '1px solid rgba(232,184,91,0.14)',
              }}
            >
              <label
                className="font-body"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', color: 'rgba(243,234,216,0.7)', fontSize: '0.8rem' }}
              >
                Language
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  style={{
                    background: '#2a1f17',
                    color: '#f8f0df',
                    border: '1px solid rgba(232,184,91,0.3)',
                    borderRadius: '2px',
                    padding: '0.4rem 0.55rem',
                    fontSize: '0.8rem',
                    fontFamily: 'inherit',
                  }}
                >
                  {REVIEW_LANGUAGES.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>

              <TranslationCsvTools onExport={handleExport} onImport={handleImport} busy={busy || loading} />
            </div>

            {message && (
              <p
                className="font-body"
                role="status"
                style={{ color: 'rgba(232,184,91,0.9)', fontSize: '0.82rem', lineHeight: 1.6, margin: '0 0 1.25rem' }}
              >
                {message}
              </p>
            )}

            {loading ? (
              <p className="font-body" style={{ ...bodyText, fontStyle: 'italic' }}>
                Loading translations…
              </p>
            ) : error ? (
              <p className="font-body" style={{ ...bodyText, color: '#e08a6a' }}>
                {error}
              </p>
            ) : rows.length === 0 ? (
              <p className="font-body" style={{ ...bodyText, fontStyle: 'italic' }}>
                Nothing has been translated into this language yet. Translations appear here after
                a learner opens a course module in it.
              </p>
            ) : (
              <>
                <TranslationCounts counts={counts} />

                {groups.map((course) => (
                  <section key={course.slug} style={{ marginBottom: '2.5rem' }}>
                    <h2
                      className="font-heading"
                      style={{ color: '#f8f0df', fontSize: 'clamp(1.25rem, 2.6vw, 1.6rem)', fontWeight: 400, margin: '0 0 1rem' }}
                    >
                      {courseLabel(course.slug)}
                    </h2>

                    {course.modules.map((module) => (
                      <div key={module.slug} style={{ marginBottom: '1.5rem' }}>
                        <h3
                          className="font-body"
                          style={{
                            color: 'rgba(232,184,91,0.8)',
                            fontSize: '0.66rem',
                            letterSpacing: '0.18em',
                            textTransform: 'uppercase',
                            fontWeight: 500,
                            margin: '0 0 0.7rem',
                          }}
                        >
                          {module.title}
                        </h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                          {module.rows.map((row) => (
                            <TranslationRow
                              key={row.id}
                              row={row}
                              saving={savingId === row.id}
                              onSave={handleSave}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </section>
                ))}
              </>
            )}
          </>
        )}
      </div>
    </PageLayout>
  );
}