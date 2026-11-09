'use client';

import React, { useState } from 'react';
import {
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  FileText,
  User,
  Mail,
  Phone,
  Link2,
} from 'lucide-react';
import { FieldError } from '@/components/ui/FieldError';
import { compactErrors, validateEmail, validateMessage, validateName, validatePhone } from '@/lib/validation/fields';
import { submitJobApplicationAction } from '@/actions/public.actions';

export function JobApplicationForm({ jobSlug, jobTitle }: { jobSlug: string; jobTitle: string }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<string, string>>>({});
  const [phone, setPhone] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [consentGiven, setConsentGiven] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const nextErrors = compactErrors({
      name: validateName(name),
      email: validateEmail(email),
      phone: validatePhone(phone),
      coverLetter: (coverLetter.trim() ? validateMessage(coverLetter, 1, 5000, 5) : null),
    });
    setFieldErrors(nextErrors);
    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      document.getElementById('job-' + firstInvalid)?.focus();
      return;
    }

    if (!consentGiven) {
      setError('Please acknowledge consent to process your application.');
      return;
    }

    setLoading(true);

    try {
      const res = await submitJobApplicationAction(jobSlug, {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        resumeUrl: resumeUrl.trim() || undefined,
        coverLetter: coverLetter.trim() || undefined,
        consentGiven,
      });

      if (res.success) {
        setSuccess(true);
      } else {
        setError(res.error || 'Failed to submit application. Please review form inputs.');
      }
    } catch {
      setError('An unexpected network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="liquid-glass rounded-2xl p-8 sm:p-10 text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          Application Received
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
          Thank you for applying for <strong className="text-slate-900 dark:text-white">{jobTitle}</strong>. Our engineering recruitment team will review your credentials and contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="liquid-glass rounded-2xl p-7 sm:p-8 space-y-5">
      <div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-[var(--theme-accent)]" />
          <span>Apply for this Role</span>
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Complete the form below to submit your application directly to our engineering team.
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span className="leading-relaxed font-medium">{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Full Name *
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
            id="job-name"
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? 'job-name-error' : undefined}
            onBlur={() => setFieldErrors((p) => ({ ...p, name: validateName(name) ?? undefined }))}
              type="text"
              required
              minLength={2}
              maxLength={100}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[var(--theme-bg-surface)] border border-slate-300 dark:border-[var(--theme-border-glass)] text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[var(--theme-accent)]"
            />
          <FieldError id="job-name-error" message={fieldErrors.name} />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
            id="job-email"
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? 'job-email-error' : undefined}
            onBlur={() => setFieldErrors((p) => ({ ...p, email: validateEmail(email) ?? undefined }))}
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[var(--theme-bg-surface)] border border-slate-300 dark:border-[var(--theme-border-glass)] text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[var(--theme-accent)]"
            />
          <FieldError id="job-email-error" message={fieldErrors.email} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
            id="job-phone"
            aria-invalid={Boolean(fieldErrors.phone)}
            aria-describedby={fieldErrors.phone ? 'job-phone-error' : undefined}
            onBlur={() => setFieldErrors((p) => ({ ...p, phone: validatePhone(phone) ?? undefined }))}
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+8801700000000"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[var(--theme-bg-surface)] border border-slate-300 dark:border-[var(--theme-border-glass)] text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[var(--theme-accent)]"
            />
          <FieldError id="job-phone-error" message={fieldErrors.phone} />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Resume / Portfolio URL
          </label>
          <div className="relative">
            <Link2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="url"
              value={resumeUrl}
              onChange={(e) => setResumeUrl(e.target.value)}
              placeholder="https://drive.google.com/..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[var(--theme-bg-surface)] border border-slate-300 dark:border-[var(--theme-border-glass)] text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[var(--theme-accent)]"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
          Cover Letter / Introduction
        </label>
        <textarea
            id="job-coverLetter"
            aria-invalid={Boolean(fieldErrors.coverLetter)}
            aria-describedby={fieldErrors.coverLetter ? 'job-coverLetter-error' : undefined}
            onBlur={() => setFieldErrors((p) => ({ ...p, coverLetter: (coverLetter.trim() ? validateMessage(coverLetter, 1, 5000, 5) : null) ?? undefined }))}
          rows={4}
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          placeholder="Briefly tell us about your technical background and why you want to join MRM InfoTech..."
          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[var(--theme-bg-surface)] border border-slate-300 dark:border-[var(--theme-border-glass)] text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[var(--theme-accent)]"
        />
          <FieldError id="job-coverLetter-error" message={fieldErrors.coverLetter} />
      </div>

      <div className="flex items-start gap-2.5 pt-1">
        <input
          type="checkbox"
          id="consent"
          required
          checked={consentGiven}
          onChange={(e) => setConsentGiven(e.target.checked)}
          className="mt-0.5 rounded text-[var(--theme-accent)] focus:ring-0"
        />
        <label htmlFor="consent" className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
          I consent to MRM InfoTech reviewing and storing my application credentials for recruitment purposes.
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold text-[var(--theme-accent-text)] bg-[var(--theme-accent)] hover:opacity-90 transition-all shadow-md shadow-[var(--theme-accent)]/20 disabled:opacity-50 cursor-pointer"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Submitting Application...</span>
          </>
        ) : (
          <>
            <span>Submit Application</span>
            <Send className="w-3.5 h-3.5" />
          </>
        )}
      </button>
    </form>
  );
}

