/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useRef } from 'react';
import {
  Upload,
  Trash2,
  Save,
  Loader2,
  XCircle,
  CheckCircle2,
  User,
  Mail,
  Briefcase,
  Camera,
  Link as LinkIcon,
} from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '@/components/public/shared/SocialIcons';
import {
  createAdminTeamMember,
  updateAdminTeamMember,
  uploadHeroMedia,
  AdminTeamPayload,
} from '@/lib/api/admin';

export interface AdminTeamRecord {
  id?: string;
  name?: string;
  role?: string;
  photo?: string | null;
  photoUrl?: string | null;
  bio?: string | null;
  email?: string | null;
  showEmail?: boolean;
  linkedinUrl?: string | null;
  githubUrl?: string | null;
  order?: number;
  sortOrder?: number;
  department?: string | null;
  isActive?: boolean;
  slug?: string;
  translations?: Array<{
    name?: string;
    roleTitle?: string;
    bio?: string;
  }>;
}

interface TeamFormProps {
  initialData?: AdminTeamRecord | null;
  onSaved?: () => void;
  onCancel?: () => void;
}

export function TeamForm({ initialData, onSaved, onCancel }: TeamFormProps) {
  const [name, setName] = useState(
    initialData?.name || initialData?.translations?.[0]?.name || ''
  );
  const [role, setRole] = useState(
    initialData?.role || initialData?.translations?.[0]?.roleTitle || ''
  );
  const [photo, setPhoto] = useState<string>(
    initialData?.photo || initialData?.photoUrl || ''
  );
  const [bio, setBio] = useState(
    initialData?.bio || initialData?.translations?.[0]?.bio || ''
  );
  const [email, setEmail] = useState(initialData?.email || '');
  const [showEmail, setShowEmail] = useState(Boolean(initialData?.showEmail));
  const [linkedinUrl, setLinkedinUrl] = useState(initialData?.linkedinUrl || '');
  const [githubUrl, setGithubUrl] = useState(initialData?.githubUrl || '');
  const [department, setDepartment] = useState(initialData?.department || 'Engineering');
  const [order, setOrder] = useState<number>(
    initialData?.order ?? initialData?.sortOrder ?? 1
  );
  const [isActive, setIsActive] = useState<boolean>(
    initialData?.isActive !== undefined ? initialData.isActive : true
  );
  const [slug, setSlug] = useState(initialData?.slug || '');

  const [showManualUrl, setShowManualUrl] = useState(false);
  const [manualUrlInput, setManualUrlInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNameChange = (val: string) => {
    setName(val);
    if (!initialData) {
      const generated = val
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setSlug(generated);
    }
  };

  // ডেস্কটপ থেকে টিম মেম্বারের ছবি আপলোড হ্যান্ডলার
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // ফাইলের আকার ও টাইপ ভ্যালিডেশন
    if (!file.type.startsWith('image/')) {
      setError('অনুগ্রহ করে একটি ছবি ফাইল (JPG, PNG, WebP) নির্বাচন করুন।');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('ছবির সাইজ সর্বোচ্চ 5MB হতে পারে।');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const res = await uploadHeroMedia(file);
      const url = res.url || (res as unknown as { data?: { url?: string } })?.data?.url;
      if (url) {
        setPhoto(url);
        setSuccessMsg('ছবি সফলভাবে আপলোড হয়েছে!');
        setTimeout(() => setSuccessMsg(null), 3500);
      } else {
        setError('ছবি আপলোড সম্পন্ন হয়নি। আবার চেষ্টা করুন।');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'ছবি আপলোড করতে ব্যর্থ হয়েছে';
      if (msg.includes('401') || msg.toLowerCase().includes('unauthorized')) {
        setError('AUTH_EXPIRED: আপনার অ্যাডমিন সেশনের মেয়াদ শেষ হয়ে গেছে (401)। অনুগ্রহ করে পুনরায় লগইন করে চেষ্টা করুন।');
      } else {
        setError(msg);
      }
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleAddManualUrl = () => {
    const trimmed = manualUrlInput.trim();
    if (!trimmed) return;
    setPhoto(trimmed);
    setManualUrlInput('');
    setShowManualUrl(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMsg(null);

    // বাধ্যতামূলক ফিল্ড ভ্যালিডেশন
    if (!photo.trim()) {
      setError('টিম মেম্বারের ছবি (Photo) বাধ্যতামূলক। অনুগ্রহ করে একটি ছবি আপলোড করুন।');
      setIsSubmitting(false);
      return;
    }

    if (!name.trim()) {
      setError('টিম মেম্বারের নাম (Name) বাধ্যতামূলক।');
      setIsSubmitting(false);
      return;
    }

    if (!role.trim()) {
      setError('টিম মেম্বারের ভূমিকা / পদবি (Role) বাধ্যতামূলক।');
      setIsSubmitting(false);
      return;
    }

    const payload: AdminTeamPayload = {
      name: name.trim(),
      role: role.trim(),
      photo: photo.trim(),
      bio: bio.trim() || undefined,
      email: email.trim() || undefined,
      showEmail,
      linkedinUrl: linkedinUrl.trim() || undefined,
      githubUrl: githubUrl.trim() || undefined,
      department: department.trim() || undefined,
      order: Number(order) || 1,
      sortOrder: Number(order) || 1,
      isActive,
      isPublic: true,
      consentGiven: true,
      slug: slug.trim() || undefined,
    };

    try {
      if (initialData?.id) {
        await updateAdminTeamMember(initialData.id, payload);
        setSuccessMsg(`টিম মেম্বার "${name}" সফলভাবে আপডেট করা হয়েছে!`);
      } else {
        await createAdminTeamMember(payload);
        setSuccessMsg(`নতুন টিম মেম্বার "${name}" সফলভাবে যুক্ত করা হয়েছে!`);
      }

      setTimeout(() => {
        onSaved?.();
      }, 700);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'সংরক্ষণ করতে ব্যর্থ হয়েছে';
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 md:p-8 rounded-2xl bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] shadow-sm space-y-7"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#1E3557] pb-5">
        <div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <User className="w-5 h-5 text-[#087FC4] dark:text-[#20B8D5]" />
            {initialData?.id ? `Edit Member: ${initialData.name || 'Team Member'}` : 'Add New Team Member'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            টিম মেম্বারের ছবি, নাম ও পদবি বাধ্যতামূলক। মেম্বারদের ছবি নিখুঁত সার্কেল (Circular) স্টাইলে প্রদর্শিত হবে।
          </p>
        </div>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-[#1E3557] hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Notifications */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 font-medium">
          <div className="flex items-center gap-2">
            <XCircle className="w-4 h-4 shrink-0" />
            <span>{error.replace('AUTH_EXPIRED: ', '')}</span>
          </div>
          {error.includes('AUTH_EXPIRED') && (
            <a
              href="/admin/login"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 rounded-lg bg-rose-500 text-white font-bold text-xs hover:bg-rose-600 transition-colors shrink-0"
            >
              পুনরায় লগইন করুন ↗
            </a>
          )}
        </div>
      )}

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs flex items-center gap-2 font-medium">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Section 1: Circular Photo Upload & Live Circular Preview */}
      <div className="p-5 rounded-2xl bg-slate-50/70 dark:bg-[#07162C]/70 border border-slate-200/80 dark:border-[#1E3557] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-xs font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-[#087FC4] dark:text-[#20B8D5]" />
              টিম মেম্বারের ছবি (Member Photo) <span className="text-rose-500">*</span>
            </label>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              ডেস্কটপ থেকে সরাসরি পাসপোর্ট সাইজ বা পোর্ট্রেট ছবি আপলোড করুন। ওয়েবসাইট ও হোমপেজে সার্কুলার বর্ডারে শো করবে।
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowManualUrl(!showManualUrl)}
              className="text-[11px] font-semibold text-[#087FC4] dark:text-[#20B8D5] hover:underline flex items-center gap-1"
            >
              <LinkIcon className="w-3 h-3" />
              {showManualUrl ? 'Hide URL Input' : 'Add Image via URL'}
            </button>
          </div>
        </div>

        {/* Manual URL Input dropdown */}
        {showManualUrl && (
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="https://example.com/photo.jpg"
              value={manualUrlInput}
              onChange={(e) => setManualUrlInput(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-[#1E3557] bg-white dark:bg-[#0B1E3B] text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-[#087FC4]"
            />
            <button
              type="button"
              onClick={handleAddManualUrl}
              className="px-4 py-2 rounded-xl bg-[#087FC4] text-white text-xs font-semibold hover:bg-[#087FC4]/90 transition-colors"
            >
              Set Photo
            </button>
          </div>
        )}

        {/* Circular Avatar + Upload Action */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pt-2">
          {/* Circular Photo Container */}
          <div className="relative group shrink-0">
            <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-[#087FC4] to-[#20B8D5] shadow-lg shadow-[#087FC4]/15 flex items-center justify-center">
              <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-[#0B1E3B] flex items-center justify-center relative">
                {photo ? (
                  <img
                    src={photo}
                    alt={name || 'Preview'}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500">
                    <User className="w-10 h-10 stroke-[1.5]" />
                    <span className="text-[10px] font-bold mt-1 text-slate-400">Photo Required</span>
                  </div>
                )}
              </div>
            </div>

            {photo && (
              <button
                type="button"
                onClick={() => setPhoto('')}
                className="absolute top-0 right-0 p-1.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white shadow-md transition-all cursor-pointer"
                title="Remove Photo"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Desktop Upload Button & Format Hint */}
          <div className="flex-1 space-y-3 text-center sm:text-left">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/avif"
              onChange={handlePhotoUpload}
              className="hidden"
            />

            <button
              type="button"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#087FC4] to-[#20B8D5] hover:opacity-95 text-white text-xs font-bold shadow-md shadow-[#087FC4]/20 transition-all cursor-pointer disabled:opacity-50"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Uploading from Desktop...</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <span>ডেস্কটপ থেকে ছবি আপলোড করুন</span>
                </>
              )}
            </button>

            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              সুপারিশ: ১:১ স্কয়ার রেশিও (যেমন: 600x600px বা 800x800px)। ব্যাকগ্রাউন্ড ক্লিন পোর্ট্রেট ছবি সবচেয়ে প্রিমিয়াম লুক দেয়।
            </p>
          </div>
        </div>
      </div>

      {/* Section 2: Core Details (Name, Role, Order, Department) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Name (Mandatory) */}
        <div>
          <label className="block text-xs font-extrabold text-slate-800 dark:text-slate-200 mb-1.5">
            পূর্ণ নাম (Full Name) <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Md. Muhibur Rahman Mahin"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#1E3557] bg-white dark:bg-[#07162C] text-xs font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-[#087FC4]"
          />
        </div>

        {/* Role / Designation (Mandatory) */}
        <div>
          <label className="block text-xs font-extrabold text-slate-800 dark:text-slate-200 mb-1.5">
            ভূমিকা / পদবি (Role / Designation) <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Founder & Chief Systems Architect"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#1E3557] bg-white dark:bg-[#07162C] text-xs font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-[#087FC4]"
          />
        </div>

        {/* Display Serial / Priority Order Number */}
        <div>
          <label className="block text-xs font-extrabold text-slate-800 dark:text-slate-200 mb-1.5">
            সিরিয়াল / রেংক নম্বর (Display Order Rank)
          </label>
          <input
            type="number"
            min={1}
            value={order}
            onChange={(e) => setOrder(parseInt(e.target.value, 10) || 1)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#1E3557] bg-white dark:bg-[#07162C] text-xs font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-[#087FC4]"
          />
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            ১ নম্বর সিরিয়াল দিলে মেম্বার সবার উপরে/প্রথমে প্রদর্শিত হবে (১, ২, ৩... সাজানো)।
          </p>
        </div>

        {/* Department / Division */}
        <div>
          <label className="block text-xs font-extrabold text-slate-800 dark:text-slate-200 mb-1.5">
            বিভাগ (Department)
          </label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#1E3557] bg-white dark:bg-[#07162C] text-xs font-medium text-slate-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-[#087FC4]"
          >
            <option value="Executive">Executive &amp; Leadership</option>
            <option value="Engineering">Software Engineering</option>
            <option value="Architecture">Systems &amp; Cloud Architecture</option>
            <option value="Product">Product Strategy &amp; Design</option>
            <option value="AI / ML">AI &amp; Machine Learning</option>
            <option value="Quality Assurance">Quality Assurance &amp; Security</option>
            <option value="Operations">Operations &amp; Client Success</option>
          </select>
        </div>
      </div>

      {/* Section 3: Bio / Short Profile Description (Optional) */}
      <div>
        <label className="block text-xs font-extrabold text-slate-800 dark:text-slate-200 mb-1.5">
          সংক্ষিপ্ত পরিচিতি (Bio / Summary) <span className="text-slate-400 font-normal">(Optional)</span>
        </label>
        <textarea
          rows={3}
          placeholder="e.g. Leads core architectural decisions, high-concurrency distributed systems, and product innovation across MRM InfoTech."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#1E3557] bg-white dark:bg-[#07162C] text-xs font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-[#087FC4]"
        />
      </div>

      {/* Section 4: Social Links & Contact (LinkedIn, GitHub, Email) */}
      <div className="p-5 rounded-2xl bg-slate-50/70 dark:bg-[#07162C]/70 border border-slate-200/80 dark:border-[#1E3557] space-y-4">
        <h3 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <Briefcase className="w-4 h-4 text-[#087FC4] dark:text-[#20B8D5]" />
          কানেকশন ও সোশ্যাল প্রোফাইল (Social Profiles &amp; Contact)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* LinkedIn */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
              <LinkedinIcon className="w-3.5 h-3.5 text-[#0A66C2]" />
              LinkedIn URL
            </label>
            <input
              type="url"
              placeholder="https://linkedin.com/in/username"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-[#1E3557] bg-white dark:bg-[#0B1E3B] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-[#087FC4]"
            />
          </div>

          {/* GitHub */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
              <GithubIcon className="w-3.5 h-3.5 text-slate-900 dark:text-white" />
              GitHub URL
            </label>
            <input
              type="url"
              placeholder="https://github.com/username"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-[#1E3557] bg-white dark:bg-[#0B1E3B] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-[#087FC4]"
            />
          </div>

          {/* Work Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-amber-500" />
              অফিশিয়াল ইমেইল (Email)
            </label>
            <input
              type="email"
              placeholder="e.g. member@mrminfotech.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-[#1E3557] bg-white dark:bg-[#0B1E3B] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-[#087FC4]"
            />
          </div>

          {/* Show Email Toggle */}
          <div className="flex items-center gap-3 pt-6">
            <input
              type="checkbox"
              id="showEmail"
              checked={showEmail}
              onChange={(e) => setShowEmail(e.target.checked)}
              className="w-4 h-4 rounded text-[#087FC4] border-slate-300 focus:ring-[#087FC4]"
            />
            <label htmlFor="showEmail" className="text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
              পাবলিক ওয়েবসাইটে ইমেইল প্রদর্শন করুন (Show email publicly)
            </label>
          </div>
        </div>
      </div>

      {/* Section 5: Active Status & Submit */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-slate-100 dark:border-[#1E3557]">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="isActive"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="w-4 h-4 rounded text-[#087FC4] border-slate-300 focus:ring-[#087FC4]"
          />
          <label htmlFor="isActive" className="text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer">
            অ্যাক্টিভ প্রোফাইল (Active / Published on Public Site)
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isUploading}
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#087FC4] to-[#20B8D5] hover:opacity-95 text-white text-xs font-black shadow-md shadow-[#087FC4]/25 transition-all cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>সংরক্ষণ করা হচ্ছে...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>{initialData?.id ? 'আপডেট সংরক্ষণ করুন' : 'টিম মেম্বার সংরক্ষণ করুন'}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
