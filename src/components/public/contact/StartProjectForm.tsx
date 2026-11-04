'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Rocket,
  ShieldCheck,
  Building,
  User,
  Mail,
  Phone,
} from 'lucide-react';
import { submitStartProjectAction } from '@/actions/public.actions';

interface StartProjectFormProps {
  services?: Array<{ slug: string; name?: string }>;
}

export function StartProjectForm({ services = [] }: StartProjectFormProps) {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get('service') || '';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [serviceInterested, setServiceInterested] = useState(preselectedService);
  const [budgetRange, setBudgetRange] = useState('$5,000 - $15,000');
  const [timeline, setTimeline] = useState('3-6 months');
  const [message, setMessage] = useState('');
  const [consentGiven, setConsentGiven] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{ referenceNumber?: string; message?: string } | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  const budgetOptions = [
    'Under $5,000 (BDT 5,00,000)',
    '$5,000 - $15,000 (BDT 5,00,000 - 18,00,000)',
    '$15,000 - $50,000 (BDT 18,00,000 - 60,00,000)',
    '$50,000+ Enterprise',
  ];

  const timelineOptions = [
    'Urgent (< 1 month)',
    '1 - 3 months',
    '3 - 6 months',
    '6+ months (Enterprise Roadmap)',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!consentGiven) {
      setError('Please provide consent to contact you regarding this project proposal.');
      return;
    }

    if (message.trim().length < 10) {
      setError('Please provide at least 10 characters describing your project vision.');
      return;
    }

    setLoading(true);

    try {
      const res = await submitStartProjectAction({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        company: company.trim() || undefined,
        serviceInterested: serviceInterested.trim() || undefined,
        budgetRange,
        timeline,
        message: message.trim(),
        consentGiven,
      });

      if (res.success) {
        setSuccessData(res.data || { message: 'Project inquiry submitted successfully.' });
      } else {
        setError(res.error || 'Failed to submit proposal request. Please review form inputs.');
      }
    } catch {
      setError('An unexpected network error occurred.');
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
    const refNum = successData.referenceNumber || 'MRM-PRJ-' + Math.floor(100000 + Math.random() * 900000);

    return (
      <div className="liquid-glass rounded-2xl p-8 sm:p-12 space-y-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#087FC4]/20 to-[#20B8D5]/20 text-[#0052CC] dark:text-[#20B8D5] flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-8 h-8 text-emerald-500" />
        </div>

        <div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">
            Project Proposal Request Logged
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-lg mx-auto leading-relaxed">
            Thank you, <strong className="text-slate-900 dark:text-white">{name}</strong>. Your project specifications have been dispatched to our principal solutions architect. We will review feasibility and contact you within 48 hours.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] inline-flex items-center gap-4">
          <div className="text-left">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Project Tracking Docket
            </span>
            <code className="text-sm font-mono font-bold text-[#0052CC] dark:text-[#20B8D5]">
              {refNum}
            </code>
          </div>
          <button
            type="button"
            onClick={() => copyReference(refNum)}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-[#0B1E3B] transition-colors"
            title="Copy Reference"
          >
            {copiedRef ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
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
              setCompany('');
              setMessage('');
              setConsentGiven(false);
            }}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#07162C] transition-colors cursor-pointer"
          >
            Submit Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="liquid-glass rounded-2xl p-7 sm:p-10 space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
          <Rocket className="w-6 h-6 text-[#087FC4]" />
          <span>Project Specifications & Scope</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Provide your specifications to receive an architectural estimate and implementation roadmap.
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span className="leading-relaxed font-medium">{error}</span>
        </div>
      )}

      {/* Contact Information */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Your Full Name *
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              required
              minLength={2}
              maxLength={100}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Md. Tariqul Islam"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-[#1E3557] bg-white dark:bg-[#07162C] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#087FC4]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Corporate Email Address *
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="email"
              required
              maxLength={254}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tariqul@enterprise.com"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-[#1E3557] bg-white dark:bg-[#07162C] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#087FC4]"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Phone / WhatsApp Number
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+8801700000000"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-[#1E3557] bg-white dark:bg-[#07162C] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#087FC4]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Organization or Company
          </label>
          <div className="relative">
            <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              maxLength={150}
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Apex Health Systems"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-[#1E3557] bg-white dark:bg-[#07162C] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#087FC4]"
            />
          </div>
        </div>
      </div>

      {/* Primary Service Selection */}
      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
          Service or Platform of Interest
        </label>
        <select
          value={serviceInterested}
          onChange={(e) => setServiceInterested(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-[#1E3557] bg-white dark:bg-[#07162C] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#087FC4]"
        >
          <option value="">Select a discipline or platform (optional)</option>
          <option value="edumanage-bd">EduManage BD (School / University ERP)</option>
          <option value="medisheba-bd">MediSheba BD (Healthcare & Lab System)</option>
          <option value="multi-institution-platform">Multi-Institution Web Platform</option>
          {services.map((svc) => (
            <option key={svc.slug} value={svc.slug}>
              {svc.name || svc.slug}
            </option>
          ))}
          <option value="custom-engineering">Custom Turnkey Engineering</option>
        </select>
      </div>

      {/* Budget & Timeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Estimated Budget Range
          </label>
          <select
            value={budgetRange}
            onChange={(e) => setBudgetRange(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-[#1E3557] bg-white dark:bg-[#07162C] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#087FC4]"
          >
            {budgetOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Target Delivery Timeline
          </label>
          <select
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-[#1E3557] bg-white dark:bg-[#07162C] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#087FC4]"
          >
            {timelineOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Project Vision & Requirements */}
      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
          Project Vision & Requirements * (minimum 10 characters)
        </label>
        <textarea
          rows={4}
          required
          minLength={10}
          maxLength={5000}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe the problem, target audience, core features, or current technology stack..."
          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-[#1E3557] bg-white dark:bg-[#07162C] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#087FC4]"
        />
      </div>

      <div className="flex items-start gap-2.5 pt-1">
        <input
          type="checkbox"
          id="project-consent"
          required
          checked={consentGiven}
          onChange={(e) => setConsentGiven(e.target.checked)}
          className="mt-0.5 rounded text-[#0052CC] focus:ring-0 cursor-pointer"
        />
        <label htmlFor="project-consent" className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug cursor-pointer">
          I consent to MRM InfoTech Ltd. reviewing these requirements and contacting me regarding this project proposal.
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white bg-[#0052CC] hover:bg-[#0040A8] transition-colors shadow-lg shadow-[#0052CC]/25 text-xs sm:text-sm disabled:opacity-50 cursor-pointer"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Transmitting Project Proposal Request...</span>
          </>
        ) : (
          <>
            <span>Submit Proposal Request</span>
            <Send className="w-4 h-4" />
          </>
        )}
      </button>

      <div className="pt-2 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        <span>Confidential & NDAs Honored Prior to Deep Discovery</span>
      </div>
    </form>
  );
}

