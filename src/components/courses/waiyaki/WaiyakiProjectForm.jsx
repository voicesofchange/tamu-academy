import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { WAIYAKI_COURSE_SLUG } from '@/lib/waiyaki-tracks';

const bodyText = {
  color: 'rgba(243,234,216,0.78)',
  fontSize: '0.97rem',
  lineHeight: 1.85,
  fontWeight: 300,
};

const fieldStyle = {
  width: '100%',
  boxSizing: 'border-box',
  backgroundColor: 'rgba(20,14,10,0.55)',
  border: '1px solid rgba(232,184,91,0.25)',
  borderRadius: '3px',
  color: '#f8f0df',
  fontSize: '0.95rem',
  lineHeight: 1.8,
  fontWeight: 300,
  padding: '0.85rem 1rem',
  fontFamily: "'DM Sans', sans-serif",
};

const countWords = (value) => value.trim().split(/\s+/).filter(Boolean).length;

/**
 * WaiyakiProjectForm — the written final project.
 *
 * The learner chooses one of the guide's four project options and writes their
 * work here. The minimum length is enforced on the server, so the word count
 * shown is a guide rather than the rule. Their project is saved privately to
 * their own account: it is never shared, published or shown to other learners,
 * and it is not printed on the certificate.
 */
export default function WaiyakiProjectForm({ options, project, canSave, onSaved }) {
  const [format, setFormat] = useState(project?.format || '');
  const [title, setTitle] = useState(project?.title || '');
  const [content, setContent] = useState(project?.content || '');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  if (!options || options.length === 0) return null;

  const selected = options.find((option) => option.id === format) || null;
  const wordCount = countWords(content);
  const meetsLength = selected ? wordCount >= selected.minWords : false;

  async function handleSave() {
    if (saving || !format) return;
    setSaving(true);
    setMessage(null);
    try {
      const res = await base44.functions.invoke('saveWaiyakiProject', {
        courseSlug: WAIYAKI_COURSE_SLUG,
        projectFormat: format,
        title,
        content,
      });
      const data = res && res.data ? res.data : null;
      if (data && data.saved) {
        setMessage({
          type: 'success',
          text: data.updated
            ? 'Your project has been updated. Your work is saved privately to your account.'
            : 'Your project has been submitted. Your work is saved privately to your account.',
        });
        if (onSaved) onSaved(data);
      } else {
        setMessage({ type: 'error', text: 'We could not save your project just now. Please try again.' });
      }
    } catch (err) {
      const detail = err?.response?.data;
      setMessage({
        type: 'error',
        text:
          detail && detail.message
            ? detail.message
            : 'We could not save your project just now. Please try again.',
      });
    } finally {
      setSaving(false);
    }
  }

  if (!canSave) {
    return (
      <p className="font-body" style={{ ...bodyText, fontStyle: 'italic', color: 'rgba(243,234,216,0.6)' }}>
        Enroll in the course to submit your written final project.
      </p>
    );
  }

  return (
    <div>
      <fieldset style={{ border: 'none', margin: '0 0 2rem', padding: 0 }}>
        <legend
          className="font-body"
          style={{
            color: '#e8b85b',
            fontSize: '0.62rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontWeight: 600,
            marginBottom: '0.9rem',
            padding: 0,
          }}
        >
          Choose one project
        </legend>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.85rem' }}>
          {options.map((option) => {
            const isSelected = format === option.id;
            return (
              <label
                key={option.id}
                style={{
                  display: 'block',
                  padding: '1.15rem 1.35rem',
                  border: `1px solid ${isSelected ? 'rgba(232,184,91,0.6)' : 'rgba(243,234,216,0.12)'}`,
                  borderRadius: '4px',
                  backgroundColor: isSelected ? 'rgba(232,184,91,0.06)' : 'transparent',
                  cursor: 'pointer',
                }}
              >
                <span style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <input
                    type="radio"
                    name="waiyaki-project-format"
                    value={option.id}
                    checked={isSelected}
                    onChange={() => setFormat(option.id)}
                    style={{ marginTop: '0.3rem', accentColor: '#e8b85b' }}
                  />
                  <span
                    className="font-body"
                    style={{ color: isSelected ? '#f8f0df' : '#e8b85b', fontSize: '0.95rem', fontWeight: 500, lineHeight: 1.5 }}
                  >
                    {option.title}
                  </span>
                </span>
                <span className="font-body" style={{ ...bodyText, fontSize: '0.89rem', display: 'block', marginLeft: '1.6rem' }}>
                  {option.guidance}
                </span>
                <span
                  className="font-body"
                  style={{
                    ...bodyText,
                    fontSize: '0.78rem',
                    color: 'rgba(243,234,216,0.5)',
                    display: 'block',
                    marginTop: '0.5rem',
                    marginLeft: '1.6rem',
                  }}
                >
                  {option.wordRange}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div style={{ marginBottom: '1.5rem' }}>
        <label
          htmlFor="waiyaki-project-title"
          className="font-body"
          style={{
            display: 'block',
            color: '#e8b85b',
            fontSize: '0.62rem',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            fontWeight: 600,
            marginBottom: '0.5rem',
          }}
        >
          Title (optional)
        </label>
        <input
          id="waiyaki-project-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={200}
          className="font-body"
          style={fieldStyle}
        />
      </div>

      <div style={{ marginBottom: '1.1rem' }}>
        <label
          htmlFor="waiyaki-project-content"
          className="font-body"
          style={{
            display: 'block',
            color: '#e8b85b',
            fontSize: '0.62rem',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            fontWeight: 600,
            marginBottom: '0.5rem',
          }}
        >
          Your project
        </label>
        <textarea
          id="waiyaki-project-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={16}
          placeholder={
            selected
              ? selected.guidance
              : 'Choose a project above, then write your work here.'
          }
          className="font-body"
          style={{ ...fieldStyle, resize: 'vertical' }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        <span
          className="font-body"
          style={{
            ...bodyText,
            fontSize: '0.84rem',
            margin: 0,
            color: selected && meetsLength ? '#e8b85b' : 'rgba(243,234,216,0.6)',
          }}
        >
          {wordCount} words
          {selected ? ` / ${selected.minWords} minimum` : ''}
        </span>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving || !format || !content.trim()}
          className="font-body"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            color: format && content.trim() ? '#24150f' : 'rgba(243,234,216,0.45)',
            backgroundColor: format && content.trim() ? '#e8b85b' : 'rgba(243,234,216,0.06)',
            border: format && content.trim() ? 'none' : '1px solid rgba(243,234,216,0.15)',
            borderRadius: '2px',
            padding: '0.8rem 1.7rem',
            fontSize: '0.78rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            fontWeight: 600,
            cursor: saving ? 'wait' : format && content.trim() ? 'pointer' : 'not-allowed',
            opacity: saving ? 0.6 : 1,
          }}
        >
          {saving ? 'Saving...' : project && project.submitted ? 'Update my project' : 'Submit my project'}
        </button>
      </div>

      <p className="font-body" style={{ ...bodyText, fontSize: '0.82rem', fontStyle: 'italic', color: 'rgba(243,234,216,0.5)' }}>
        Your project is saved privately to your account. It is not shared with other learners, not
        published, and not printed on your certificate. You can come back and revise it at any time.
      </p>

      {message && (
        <p
          className="font-body"
          role="status"
          style={{
            marginTop: '1rem',
            marginBottom: 0,
            fontSize: '0.9rem',
            color: message.type === 'error' ? '#e8955c' : '#e8b85b',
          }}
        >
          {message.text}
        </p>
      )}
    </div>
  );
}