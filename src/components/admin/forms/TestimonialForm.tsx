/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Upload,
  Save,
  Loader2,
  XCircle,
  CheckCircle2,
  User,
  Star,
  Quote,
  Building,
  Briefcase,
  ShieldCheck,
  Calendar,
  Link as LinkIcon,
  Sparkles,
} from 'lucide-react';
import {
  createAdminTestimonial,
  updateAdminTestimonial,
  uploadHeroMedia,
  AdminTestimonialItem,
  AdminTestimonialPayload,
} from '@/lib/api/admin';

interface TestimonialFormProps {
  initialData?: AdminTestimonialItem | null;
  onSaved?: () => void;
  onCancel?: () => void;
}

const COMMON_SERVICES = [
  { slug: 'custom-software-development', title: 'Custom Software Development' },
  { slug: 'web-application-development', title: 'Web Application Development' },
  { slug: 'mobile-app-development', title: 'Mobile App Development' },
  { slug: 'saas-application-development', title: 'SaaS Architecture & Platforms' },
  { slug: 'cloud-devops-engineering', title: 'Cloud & DevOps Engineering' },
  { slug: 'seo-digital-growth', title: 'SEO & Digital Growth Strategy' },
];

const COMMON_PROJECTS = [
  { slug: 'edumanage-bd', title: 'EduManage BD' },
  { slug: 'medisheba-bd', title: 'MediSheba BD' },
  { slug: 'apex-logistics', title: 'Apex Logistics ERP' },
];

const SOURCES = ['Direct Client', 'Clutch', 'LinkedIn', 'Google Review', 'Upwork', 'Partner Referral'];

export function TestimonialForm({ initialData, onSaved, onCancel }: TestimonialFormProps) {
  const getInitialQuote = (data?: AdminTestimonialItem | null): string => {
    if (!data?.quote) return '';
    if (typeof data.quote === 'string') return data.quote;
    if (typeof data.quote === 'object') {
      return data.quote.en || Object.values(data.quote)[0] || '';
    }
    return '';
  };

  const [authorName, setAuthorName] = useState(initialData?.authorName || '');
  const [authorRole, setAuthorRole] = useState(initialData?.authorRole || '');
  const [companyName, setCompanyName] = useState(initialData?.companyName || '');
  const [avatarUrl, setAvatarUrl] = useState(initialData?.avatarUrl || '');
  const [rating, setRating] = useState<number>(initialData?.rating ?? 5);
  const [quote, setQuote] = useState(getInitialQuote(initialData));
  const [serviceSlug, setServiceSlug] = useState(initialData?.serviceSlug || '');
  const [projectSlug, setProjectSlug] = useState(initialData?.projectSlug || '');
  const [source, setSource] = useState(initialData?.source || 'Direct Client');
  const [evidenceNote, setEvidenceNote] = useState(initialData?.evidenceNote || 'Verified direct client feedback');
  const [sortOrder, setSortOrder] = useState<number>(initialData?.sortOrder ?? 1);
  const [isFeatured, setIsFeatured] = useState<boolean>(initialData?.isFeatured ?? false);
  const [isVerified, setIsVerified] = useState<boolean>(initialData?.isVerified ?? true);
  const [showOnSite, setShowOnSite] = useState<boolean>(initialData?.showOnSite ?? false);

  const [showManualUrl, setShowManualUrl] = useState(false);
  const [manualUrlInput, setManualUrlInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialData) {
      setAuthorName(initialData.authorName || '');
      setAuthorRole(initialData.authorRole || '');
      setCompanyName(initialData.companyName || '');
      setAvatarUrl(initialData.avatarUrl || '');
      setRating(initialData.rating ?? 5);
      setQuote(getInitialQuote(initialData));
      setServiceSlug(initialData.serviceSlug || '');
      setProjectSlug(initialData.projectSlug || '');
      setSource(initialData.source || 'Direct Client');
      setEvidenceNote(initialData.evidenceNote || 'Verified direct client feedback');
      setSortOrder(initialData.sortOrder ?? 1);
      setIsFeatured(initialData.isFeatured ?? false);
      setIsVerified(initialData.isVerified ?? true);
      setShowOnSite(initialData.showOnSite ?? false);
      setError(null);
    }
  }, [initialData]);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (JPG, PNG, WebP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be under 5MB.');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const res = await uploadHeroMedia(file);
      if (res?.url) {
        setAvatarUrl(res.url);
      } else {
        throw new Error('Upload succeeded but no URL was returned.');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to upload photo';
      setError(msg);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleManualUrlApply = () => {
    if (!manualUrlInput.trim()) return;
    try {
      new URL(manualUrlInput.trim());
      setAvatarUrl(manualUrlInput.trim());
      setShowManualUrl(false);
      setManualUrlInput('');
      setError(null);
    } catch {
      setError('Please enter a valid HTTP/HTTPS image URL.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setIsSubmitting(true);

    if (!authorName.trim()) {
      setError('Client / Author name is required.');
      setIsSubmitting(false);
      return;
    }

    if (!quote.trim()) {
      setError('Review quote text is required.');
      setIsSubmitting(false);
      return;
    }

    // Auto-fulfill database trust rule constraint when publishing
    const finalShowOnSite = showOnSite;
    const finalVerified = finalShowOnSite ? true : isVerified;
    const finalEvidence = evidenceNote.trim() || (finalShowOnSite ? 'Verified direct client feedback' : '');

    const payload: AdminTestimonialPayload = {
      authorName: authorName.trim(),
      authorRole: authorRole.trim() || null,
      companyName: companyName.trim() || null,
      avatarUrl: avatarUrl.trim() || null,
      rating: Number(rating) || 5,
      quote: quote.trim(),
      serviceSlug: serviceSlug.trim() || null,
      projectSlug: projectSlug.trim() || null,
      source: source.trim() || 'Direct Client',
      evidenceNote: finalEvidence || null,
      consentAt: finalShowOnSite ? new Date().toISOString() : null,
      sortOrder: Number(sortOrder) || 1,
      isFeatured,
      isVerified: finalVerified,
      showOnSite: finalShowOnSite,
    };

    try {
      if (initialData?.id) {
        await updateAdminTestimonial(initialData.id, payload);
        setSuccessMsg(`Testimonial from "${authorName}" updated successfully!`);
      } else {
        await createAdminTestimonial(payload);
        setSuccessMsg(`New testimonial from "${authorName}" added successfully!`);
      }

      setTimeout(() => {
        onSaved?.();
      }, 700);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save testimonial';
      if (
        msg.includes('401') ||
        msg.toLowerCase().includes('unauthorized') ||
        msg.toLowerCase().includes('authentication required')
      ) {
        setError('AUTH_EXPIRED: Authentication required or session expired. Please log in again.');
      } else {
        setError(msg);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-[#E1EAF3] dark:border-white/10 bg-white dark:bg-[#0B1D31] p-6 shadow-sm">
      <div className="flex items-center justify-between pb-5 border-b border-[#E1EAF3] dark:border-white/10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#087FC4]/10 text-[#087FC4]">
            <Quote className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#10243B] dark:text-white">
              {initialData ? 'Edit Testimonial' : 'Add New Client Testimonial'}
            </h3>
            <p className="text-xs text-slate-500">
              Manage client feedback, ratings, verification status, and site visibility.
            </p>
          </div>
        </div>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer"
          >
            Cancel
          </button>
        )}
      </div>

      {error && (
        <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs font-medium text-rose-600 dark:text-rose-400">
          <XCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        {/* Photo / Avatar Section */}
        <div className="rounded-xl border border-[#E1EAF3] dark:border-white/10 bg-[#F7FAFE] dark:bg-[#071321] p-5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#10243B] dark:text-slate-200 mb-3">
            Client Photo or Company Logo
          </label>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-[#087FC4] bg-white dark:bg-[#10243B] flex items-center justify-center shadow-md">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Client avatar" className="h-full w-full object-cover" />
              ) : (
                <User className="h-9 w-9 text-slate-400" />
              )}
            </div>

            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="client-avatar-upload"
                />
                <button
                  type="button"
                  disabled={isUploading}
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 rounded-xl bg-[#087FC4] hover:bg-[#0769a3] text-white px-4 py-2 text-xs font-bold transition-all disabled:opacity-60 cursor-pointer shadow-sm"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="h-3.5 w-3.5" />
                      <span>Upload Photo from Computer</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setShowManualUrl((prev) => !prev)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#087FC4] hover:underline cursor-pointer"
                >
                  <LinkIcon className="h-3.5 w-3.5" />
                  <span>{showManualUrl ? 'Hide URL input' : 'Add Image via URL'}</span>
                </button>

                {avatarUrl && (
                  <button
                    type="button"
                    onClick={() => setAvatarUrl('')}
                    className="text-xs font-semibold text-rose-500 hover:text-rose-700 cursor-pointer"
                  >
                    Remove Photo
                  </button>
                )}
              </div>

              {showManualUrl && (
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="url"
                    value={manualUrlInput}
                    onChange={(e) => setManualUrlInput(e.target.value)}
                    placeholder="https://example.com/photo.jpg"
                    className="flex-1 rounded-xl border border-[#E1EAF3] dark:border-white/10 bg-white dark:bg-[#0B1D31] px-3 py-2 text-xs text-[#10243B] dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={handleManualUrlApply}
                    className="rounded-xl bg-[#10243B] dark:bg-white/10 px-3 py-2 text-xs font-bold text-white hover:bg-black cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              )}
              <p className="text-[11px] text-slate-500">
                Recommended: 1:1 square photo or high-res brand logo (e.g. 400x400px).
              </p>
            </div>
          </div>
        </div>

        {/* Client Name, Role & Company */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#10243B] dark:text-slate-200 mb-1.5">
              Client Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                required
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="e.g. Kazi Mahbubul Alam"
                className="w-full rounded-xl border border-[#E1EAF3] dark:border-white/10 bg-[#F7FAFE] dark:bg-[#071321] pl-9 pr-3.5 py-2.5 text-xs text-[#10243B] dark:text-white focus:border-[#087FC4] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#10243B] dark:text-slate-200 mb-1.5">
              Designation / Role
            </label>
            <div className="relative">
              <Briefcase className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={authorRole}
                onChange={(e) => setAuthorRole(e.target.value)}
                placeholder="e.g. Managing Director / CTO"
                className="w-full rounded-xl border border-[#E1EAF3] dark:border-white/10 bg-[#F7FAFE] dark:bg-[#071321] pl-9 pr-3.5 py-2.5 text-xs text-[#10243B] dark:text-white focus:border-[#087FC4] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#10243B] dark:text-slate-200 mb-1.5">
              Company Name
            </label>
            <div className="relative">
              <Building className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Apex Logistics Ltd."
                className="w-full rounded-xl border border-[#E1EAF3] dark:border-white/10 bg-[#F7FAFE] dark:bg-[#071321] pl-9 pr-3.5 py-2.5 text-xs text-[#10243B] dark:text-white focus:border-[#087FC4] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Star Rating & Display Order */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
          <div>
            <label className="block text-xs font-semibold text-[#10243B] dark:text-slate-200 mb-1.5">
              Rating (1 - 5 Stars)
            </label>
            <div className="flex items-center gap-1.5 py-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="cursor-pointer transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-6 w-6 ${
                      star <= rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-300 dark:text-slate-600'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-xs font-bold text-slate-600 dark:text-slate-300">
                {rating} / 5
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#10243B] dark:text-slate-200 mb-1.5">
              Display Order Rank
            </label>
            <input
              type="number"
              min={1}
              value={sortOrder}
              onChange={(e) => setSortOrder(Number(e.target.value) || 1)}
              className="w-full rounded-xl border border-[#E1EAF3] dark:border-white/10 bg-[#F7FAFE] dark:bg-[#071321] px-3.5 py-2.5 text-xs text-[#10243B] dark:text-white focus:border-[#087FC4] focus:outline-none"
            />
            <p className="text-[11px] text-slate-500 mt-1">1 displays first.</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#10243B] dark:text-slate-200 mb-1.5">
              Review Source
            </label>
            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full rounded-xl border border-[#E1EAF3] dark:border-white/10 bg-[#F7FAFE] dark:bg-[#071321] px-3.5 py-2.5 text-xs text-[#10243B] dark:text-white focus:border-[#087FC4] focus:outline-none cursor-pointer"
            >
              {SOURCES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Review Quote Textarea */}
        <div>
          <label className="block text-xs font-semibold text-[#10243B] dark:text-slate-200 mb-1.5">
            Client Review Quote <span className="text-rose-500">*</span>
          </label>
          <textarea
            required
            rows={4}
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            placeholder="Share the genuine feedback, measurable impact, or testimonial given by the client..."
            className="w-full rounded-xl border border-[#E1EAF3] dark:border-white/10 bg-[#F7FAFE] dark:bg-[#071321] px-4 py-3 text-xs leading-relaxed text-[#10243B] dark:text-white focus:border-[#087FC4] focus:outline-none"
          />
        </div>

        {/* Related Service & Related Project */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#10243B] dark:text-slate-200 mb-1.5">
              Related Service (Optional)
            </label>
            <select
              value={serviceSlug}
              onChange={(e) => setServiceSlug(e.target.value)}
              className="w-full rounded-xl border border-[#E1EAF3] dark:border-white/10 bg-[#F7FAFE] dark:bg-[#071321] px-3.5 py-2.5 text-xs text-[#10243B] dark:text-white focus:border-[#087FC4] focus:outline-none cursor-pointer"
            >
              <option value="">None / General Review</option>
              {COMMON_SERVICES.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.title}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-500 mt-1">Allows displaying on related service page.</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#10243B] dark:text-slate-200 mb-1.5">
              Related Project / Product (Optional)
            </label>
            <select
              value={projectSlug}
              onChange={(e) => setProjectSlug(e.target.value)}
              className="w-full rounded-xl border border-[#E1EAF3] dark:border-white/10 bg-[#F7FAFE] dark:bg-[#071321] px-3.5 py-2.5 text-xs text-[#10243B] dark:text-white focus:border-[#087FC4] focus:outline-none cursor-pointer"
            >
              <option value="">None / General Review</option>
              {COMMON_PROJECTS.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.title}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-500 mt-1">Allows displaying on case study page.</p>
          </div>
        </div>

        {/* Written Evidence / Verification Note */}
        <div>
          <label className="block text-xs font-semibold text-[#10243B] dark:text-slate-200 mb-1.5">
            Internal Verification / Evidence Note
          </label>
          <input
            type="text"
            value={evidenceNote}
            onChange={(e) => setEvidenceNote(e.target.value)}
            placeholder="e.g. Verified from signed agreement / client confirmation email"
            className="w-full rounded-xl border border-[#E1EAF3] dark:border-white/10 bg-[#F7FAFE] dark:bg-[#071321] px-3.5 py-2.5 text-xs text-[#10243B] dark:text-white focus:border-[#087FC4] focus:outline-none"
          />
          <p className="text-[11px] text-slate-500 mt-1">Required for published reviews (ensures authentic client proof).</p>
        </div>

        {/* Status Toggles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <label className="flex items-center gap-3 p-3 rounded-xl border border-[#E1EAF3] dark:border-white/10 bg-[#F7FAFE] dark:bg-[#071321] cursor-pointer">
            <input
              type="checkbox"
              checked={showOnSite}
              onChange={(e) => {
                setShowOnSite(e.target.checked);
                if (e.target.checked) setIsVerified(true);
              }}
              className="h-4 w-4 rounded border-slate-300 text-[#087FC4] focus:ring-[#087FC4]"
            />
            <div>
              <span className="text-xs font-bold text-[#10243B] dark:text-white block">
                Publish on Website
              </span>
              <span className="text-[11px] text-slate-500">Visible to public visitors</span>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 rounded-xl border border-[#E1EAF3] dark:border-white/10 bg-[#F7FAFE] dark:bg-[#071321] cursor-pointer">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-[#087FC4] focus:ring-[#087FC4]"
            />
            <div>
              <span className="text-xs font-bold text-[#10243B] dark:text-white block">
                Featured Spotlight
              </span>
              <span className="text-[11px] text-slate-500">Prioritized on homepage</span>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 rounded-xl border border-[#E1EAF3] dark:border-white/10 bg-[#F7FAFE] dark:bg-[#071321] cursor-pointer">
            <input
              type="checkbox"
              checked={isVerified}
              onChange={(e) => setIsVerified(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-[#087FC4] focus:ring-[#087FC4]"
            />
            <div>
              <span className="text-xs font-bold text-[#10243B] dark:text-white block">
                Verified Client
              </span>
              <span className="text-[11px] text-slate-500">Shows verified badge</span>
            </div>
          </label>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E1EAF3] dark:border-white/10">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-xl px-5 py-2.5 text-xs font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#087FC4] to-[#103B68] hover:from-[#0769a3] hover:to-[#071A35] px-6 py-2.5 text-xs font-bold text-white shadow-md transition-all disabled:opacity-60 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>{initialData ? 'Update Testimonial' : 'Save Testimonial'}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
