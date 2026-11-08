'use client';

import React, { useState } from 'react';
import { Send, Loader2, CheckCircle2, AlertCircle, Copy, Check, MessageSquare } from 'lucide-react';
import { submitContactInquiryAction } from '@/actions/public.actions';

export function ContactInquiryForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [consentGiven, setConsentGiven] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{ referenceNumber?: string; message?: string } | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!consentGiven) {
      setError('Please acknowledge consent to receive communications.');
      return;
    }

    if (message.trim().length < 10) {
      setError('Please provide at least 10 characters in your message.');
      return;
    }

    setLoading(true);

    try {
      const res = await submitContactInquiryAction({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        subject: subject.trim() || undefined,
        message: message.trim(),
        consentGiven,
      });

      if (res.success) {
        const refNum = res.data?.referenceNumber || `MRM-INQ-${Date.now().toString().slice(-6)}`;
        setSuccessData({
          ...(res.data || {}),
          referenceNumber: refNum,
          message: res.data?.message || 'Message sent successfully.',
        });
      } else {
        setError(res.error || 'Failed to submit inquiry. Please review your input.');
      }
    } catch {
      setError('An unexpected network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyReference = (ref: string) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(ref);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  if (successData) {
    const refNum = successData.referenceNumber || 'MRM-INQ-CONFIRMED';

    return (
      <div className="liquid-glass rounded-2xl p-8 sm:p-10 space-y-5 text-center">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-7 h-7" />
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Inquiry Successfully Transmitted
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-md mx-auto leading-relaxed">
            Thank you for reaching out to MRM InfoTech. An engineering director has received your message and will follow up within 24 business hours.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] inline-flex items-center gap-3 shadow-md">
          <div className="text-left">
            <span className="text-[10px] font-bold text-[var(--theme-text-muted)] uppercase tracking-wider block">
              Reference Tracking ID
            </span>
            <code className="text-sm font-mono font-bold text-[var(--theme-accent)]">
              {refNum}
            </code>
          </div>
          <button
            type="button"
            onClick={() => copyReference(refNum)}
            className="p-2 rounded-lg text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)] hover:bg-[var(--theme-bg-card)] transition-colors"
            title="Copy Reference Number"
          >
            {copiedRef ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={() => {
              setSuccessData(null);
              setName('');
              setEmail('');
              setPhone('');
              setSubject('');
              setMessage('');
              setConsentGiven(false);
            }}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] hover:bg-[var(--theme-bg-surface)] transition-colors cursor-pointer border border-[var(--theme-border-glass)]"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl p-7 sm:p-8 space-y-4 bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] shadow-xl">
      <div>
        <h2 className="text-xl font-bold text-[var(--theme-text-primary)] flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-[var(--theme-accent)]" />
          <span>Send Us a Direct Message</span>
        </h2>
        <p className="text-xs text-[var(--theme-text-secondary)] mt-1">
          Connected to our live leads management API. We respond within 24 business hours.
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span className="leading-relaxed font-medium">{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-[var(--theme-text-primary)] mb-1">
            Your Name *
          </label>
          <input
            type="text"
            required
            minLength={2}
            maxLength={100}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Md. Tanvir Ahmed"
            className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-card)] text-[var(--theme-text-primary)] placeholder:text-[var(--theme-text-muted)] text-xs focus:outline-none focus:border-[var(--theme-accent)] transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-[var(--theme-text-primary)] mb-1">
            Corporate Email *
          </label>
          <input
            type="email"
            required
            maxLength={254}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tanvir@company.com"
            className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-card)] text-[var(--theme-text-primary)] placeholder:text-[var(--theme-text-muted)] text-xs focus:outline-none focus:border-[var(--theme-accent)] transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-[var(--theme-text-primary)] mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+8801700000000"
            className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-card)] text-[var(--theme-text-primary)] placeholder:text-[var(--theme-text-muted)] text-xs focus:outline-none focus:border-[var(--theme-accent)] transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-[var(--theme-text-primary)] mb-1">
            Subject
          </label>
          <input
            type="text"
            maxLength={150}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g. Enterprise ERP inquiry"
            className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-card)] text-[var(--theme-text-primary)] placeholder:text-[var(--theme-text-muted)] text-xs focus:outline-none focus:border-[var(--theme-accent)] transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-[var(--theme-text-primary)] mb-1">
          Project Details or Message * (minimum 10 characters)
        </label>
        <textarea
          rows={4}
          required
          minLength={10}
          maxLength={2000}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Briefly describe your requirements, current tech stack, or questions..."
          className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-card)] text-[var(--theme-text-primary)] placeholder:text-[var(--theme-text-muted)] text-xs focus:outline-none focus:border-[var(--theme-accent)] transition-colors"
        />
      </div>

      <div className="flex items-start gap-2.5 pt-1">
        <input
          type="checkbox"
          id="contact-consent"
          required
          checked={consentGiven}
          onChange={(e) => setConsentGiven(e.target.checked)}
          className="mt-0.5 rounded text-[var(--theme-accent)] focus:ring-0 cursor-pointer accent-[var(--theme-accent)]"
        />
        <label htmlFor="contact-consent" className="text-[11px] text-[var(--theme-text-secondary)] leading-snug cursor-pointer">
          I consent to MRM InfoTech contacting me regarding this inquiry.
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl font-bold text-[var(--theme-accent-text)] bg-[var(--theme-accent)] hover:brightness-110 transition-all shadow-md shadow-[var(--theme-accent-glow)] text-xs disabled:opacity-50 cursor-pointer w-full sm:w-auto"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Submitting Message...</span>
          </>
        ) : (
          <>
            <span>Submit Inquiry</span>
            <Send className="w-3.5 h-3.5" />
          </>
        )}
      </button>
    </form>
  );
}

