import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  AGE_RANGES,
  LANGUAGE_OPTIONS,
  getProfile,
  hasSkippedProfilePrompt,
  needsBasicProfile,
} from '@/lib/learner-profile';
import { useTranslatedContent } from '@/lib/i18n/useTranslatedContent';

const CONTENT = {
  title: 'Tell us a little about yourself',
  description:
    'Three quick details help us understand who our learning community is. Your course is already open, so you can skip this and come back to it any time.',
  country: 'Country',
  ageRange: 'Age range',
  language: 'Preferred language',
  choose: 'Choose…',
  save: 'Save details',
  saving: 'Saving…',
  skip: 'Skip for now',
  error: 'We could not save your details. You can add them later from your profile.',
};

const labelClass = 'font-body text-[0.72rem] uppercase tracking-[0.08em] text-muted-foreground';
const selectClass =
  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';

/**
 * ProfileCompletionPrompt — the short, skippable prompt shown once a learner
 * enrolls in their first course. It listens for the enrollment event, asks for
 * country, age range and preferred language, and can always be skipped. It
 * never gates a course: the lesson behind it has already opened.
 */
export default function ProfileCompletionPrompt() {
  const { user, checkUserAuth } = useAuth();
  const { content: c } = useTranslatedContent('profile-completion-prompt', CONTENT);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ country: '', age_range: '', preferred_language: '' });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    async function onEnrolled() {
      if (!user || user.role === 'admin') return;
      if (!needsBasicProfile(user) || hasSkippedProfilePrompt(user)) return;

      // Only a learner's first course asks. A second enrollment stays quiet.
      const rows = await base44.entities.CourseEnrollment.filter({ learner_id: user.id });
      if (!Array.isArray(rows) || rows.length !== 1) return;

      const profile = getProfile(user);
      setForm({
        country: profile.country || '',
        age_range: profile.age_range || '',
        preferred_language: profile.preferred_language || '',
      });
      setStatus('idle');
      setError('');
      setOpen(true);
    }

    window.addEventListener('tamu:course-enrolled', onEnrolled);
    return () => window.removeEventListener('tamu:course-enrolled', onEnrolled);
  }, [user]);

  const set = (field) => (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));

  async function handleSave(event) {
    event.preventDefault();
    setStatus('saving');
    setError('');
    try {
      await base44.auth.updateMe({
        country: form.country.trim(),
        age_range: form.age_range,
        preferred_language: form.preferred_language,
      });
      await checkUserAuth();
      setOpen(false);
      setStatus('idle');
    } catch (_) {
      setStatus('idle');
      setError(c.error);
    }
  }

  async function handleSkip() {
    setOpen(false);
    try {
      await base44.auth.updateMe({ profile_prompt_skipped_at: new Date().toISOString() });
      await checkUserAuth();
    } catch (_) {
      // Nothing blocks on this; the reminder card simply will not appear.
    }
  }

  return (
    <Dialog open={open} onOpenChange={(next) => { if (!next) handleSkip(); }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl font-normal">{c.title}</DialogTitle>
          <DialogDescription className="font-body text-sm leading-relaxed text-muted-foreground">
            {c.description}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="prompt-country" className={labelClass}>{c.country}</label>
            <Input
              id="prompt-country"
              type="text"
              autoComplete="country-name"
              maxLength={80}
              value={form.country}
              onChange={set('country')}
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="prompt-age" className={labelClass}>{c.ageRange}</label>
            <select id="prompt-age" value={form.age_range} onChange={set('age_range')} className={selectClass}>
              <option value="">{c.choose}</option>
              {AGE_RANGES.map((range) => <option key={range} value={range}>{range}</option>)}
            </select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="prompt-language" className={labelClass}>{c.language}</label>
            <select id="prompt-language" value={form.preferred_language} onChange={set('preferred_language')} className={selectClass}>
              <option value="">{c.choose}</option>
              {LANGUAGE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          {error && (
            <p role="alert" className="font-body text-sm" style={{ color: '#e8955c', margin: 0 }}>{error}</p>
          )}

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Button type="submit" disabled={status === 'saving'}>
              {status === 'saving' ? c.saving : c.save}
            </Button>
            <Button type="button" variant="outline" onClick={handleSkip}>
              {c.skip}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}