'use client';

import React, { useState, useEffect } from 'react';
import {
  Building2,
  Mail,
  Phone,
  Globe,
  MapPin,
  Save,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import {
  FacebookIcon,
  LinkedinIcon,
  InstagramIcon,
  GithubIcon,
  TwitterIcon,
  YoutubeIcon,
  WhatsappIcon,
} from '@/components/public/shared/SocialIcons';
import { getAdminCompanyProfile, updateAdminCompanyProfile } from '@/lib/api/admin';
import {
  buildCompanyPatch,
  emptyCompanyForm,
  formFromServer,
  type CompanyProfileFormState,
} from '@/lib/company-profile';

export function CompanyProfileForm() {
  const [formData, setFormData] = useState<CompanyProfileFormState>(emptyCompanyForm());
  const [savedData, setSavedData] = useState<CompanyProfileFormState>(emptyCompanyForm());
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        setIsLoading(true);
        const data = await getAdminCompanyProfile();
        // Build from the stored record only: no demo/fallback text may leak into the editable form.
        const loaded = formFromServer(data as unknown as Record<string, unknown> | null);
        setFormData(loaded);
        setSavedData(loaded);
      } catch (err: unknown) {
        console.error('Failed to load company profile from admin API:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadProfile();
  }, []);

  const handleChange = (field: keyof CompanyProfileFormState, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const payload = buildCompanyPatch(formData);
      const saved = await updateAdminCompanyProfile(payload);
      // Sync the UI with what the server actually persisted.
      const persisted = formFromServer(saved?.value ?? null);
      setFormData(persisted);
      setSavedData(persisted);
      // Purge the public cache so the footer/contact page show the new values (best effort).
      try {
        await fetch('/api/revalidate', { method: 'POST' });
      } catch {
        /* non-fatal: public cache expires on its own within 60s */
      }
      setSuccessMessage('Company profile and footer information successfully saved to live database!');
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : 'Failed to save changes. Please check your credentials.';
      setErrorMessage(errorMsg);
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetToDefault = () => {
    if (confirm('Discard unsaved changes and restore the last saved values?')) {
      setFormData(savedData);
      setSuccessMessage(null);
      setErrorMessage(null);
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 rounded-2xl bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] flex items-center justify-center space-x-3 text-slate-500">
        <div className="w-5 h-5 border-2 border-[#087FC4] border-t-transparent rounded-full animate-spin" />
        <span className="text-sm font-medium">Loading live company settings...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Notifications */}
      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 flex items-center gap-3 animate-in fade-in duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 flex items-center gap-3 animate-in fade-in duration-200">
          <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{errorMessage}</span>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Brand & Identity */}
        <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-[#1E3557]">
            <Building2 className="w-5 h-5 text-[#087FC4] dark:text-[#20B8D5]" />
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Company Identity &amp; Footer Bio
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Primary corporate names and short bio displayed under the logo in the website footer.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Company Brand Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name || ''}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="MRM InfoTech"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white font-medium focus:outline-none focus:border-[#087FC4] dark:focus:border-[#20B8D5]"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Legal Entity Name
              </label>
              <input
                type="text"
                value={formData.legalName || ''}
                onChange={(e) => handleChange('legalName', e.target.value)}
                placeholder="MRM InfoTech"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white font-medium focus:outline-none focus:border-[#087FC4] dark:focus:border-[#20B8D5]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Tagline / Slogan
              </label>
              <input
                type="text"
                value={formData.tagline || ''}
                onChange={(e) => handleChange('tagline', e.target.value)}
                placeholder="IDEAS • PRODUCTS • IMPACT"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white font-medium focus:outline-none focus:border-[#087FC4] dark:focus:border-[#20B8D5]"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Founded Year
              </label>
              <input
                type="number"
                value={formData.foundedYear}
                onChange={(e) => handleChange('foundedYear', e.target.value)}
                placeholder="2024"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white font-medium focus:outline-none focus:border-[#087FC4] dark:focus:border-[#20B8D5]"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
              Footer Description / Bio Paragraph
            </label>
            <textarea
              rows={3}
              value={formData.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Building innovative software products and delivering high-impact digital solutions..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white font-medium leading-relaxed focus:outline-none focus:border-[#087FC4] dark:focus:border-[#20B8D5]"
            />
          </div>
        </div>

        {/* Section 2: Contact Details */}
        <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-[#1E3557]">
            <Mail className="w-5 h-5 text-[#087FC4] dark:text-[#20B8D5]" />
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Contact Channels &amp; Physical Address
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Official contact channels linked in the footer and contact sections across the site.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Primary Public Email <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={formData.email || ''}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="contact@mrminfotech.com"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white font-medium focus:outline-none focus:border-[#087FC4] dark:focus:border-[#20B8D5]"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Support / Inquiries Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  value={formData.supportEmail || ''}
                  onChange={(e) => handleChange('supportEmail', e.target.value)}
                  placeholder="support@mrminfotech.com"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white font-medium focus:outline-none focus:border-[#087FC4] dark:focus:border-[#20B8D5]"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Primary Phone Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={formData.phone || ''}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="+8801700000000"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white font-medium focus:outline-none focus:border-[#087FC4] dark:focus:border-[#20B8D5]"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                WhatsApp Hotline Number
              </label>
              <div className="relative">
                <WhatsappIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={formData.whatsapp || ''}
                  onChange={(e) => handleChange('whatsapp', e.target.value)}
                  placeholder="+8801700000000"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white font-medium focus:outline-none focus:border-[#087FC4] dark:focus:border-[#20B8D5]"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Headquarters / Physical Address
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={formData.address || formData.headquarters || ''}
                  onChange={(e) => {
                    handleChange('address', e.target.value);
                    handleChange('headquarters', e.target.value);
                  }}
                  placeholder="Dhaka, Bangladesh"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white font-medium focus:outline-none focus:border-[#087FC4] dark:focus:border-[#20B8D5]"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Official Website URL
              </label>
              <div className="relative">
                <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="url"
                  value={formData.website || ''}
                  onChange={(e) => handleChange('website', e.target.value)}
                  placeholder="https://mrminfotech.com"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white font-medium focus:outline-none focus:border-[#087FC4] dark:focus:border-[#20B8D5]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Social Media Links */}
        <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-[#1E3557]">
            <Globe className="w-5 h-5 text-[#087FC4] dark:text-[#20B8D5]" />
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Social Media Channels &amp; Profiles
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Official social profile links. Blank fields will not render an icon in the public footer.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Facebook Page URL
              </label>
              <div className="relative">
                <div className="w-5 h-5 text-[#1877F2] absolute left-3 top-2.5 flex items-center justify-center">
                  <FacebookIcon className="w-4 h-4" />
                </div>
                <input
                  type="url"
                  value={formData.facebookUrl || ''}
                  onChange={(e) => handleChange('facebookUrl', e.target.value)}
                  placeholder="https://facebook.com/mrminfotech"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white font-medium focus:outline-none focus:border-[#087FC4] dark:focus:border-[#20B8D5]"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                LinkedIn Company URL
              </label>
              <div className="relative">
                <div className="w-5 h-5 text-[#0A66C2] absolute left-3 top-2.5 flex items-center justify-center">
                  <LinkedinIcon className="w-4 h-4" />
                </div>
                <input
                  type="url"
                  value={formData.linkedinUrl || ''}
                  onChange={(e) => handleChange('linkedinUrl', e.target.value)}
                  placeholder="https://linkedin.com/company/mrminfotech"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white font-medium focus:outline-none focus:border-[#087FC4] dark:focus:border-[#20B8D5]"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Instagram URL
              </label>
              <div className="relative">
                <div className="w-5 h-5 text-[#E4405F] absolute left-3 top-2.5 flex items-center justify-center">
                  <InstagramIcon className="w-4 h-4" />
                </div>
                <input
                  type="url"
                  value={formData.instagramUrl || ''}
                  onChange={(e) => handleChange('instagramUrl', e.target.value)}
                  placeholder="https://instagram.com/mrminfotech"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white font-medium focus:outline-none focus:border-[#087FC4] dark:focus:border-[#20B8D5]"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                GitHub Organization URL
              </label>
              <div className="relative">
                <div className="w-5 h-5 text-slate-700 dark:text-slate-200 absolute left-3 top-2.5 flex items-center justify-center">
                  <GithubIcon className="w-4 h-4" />
                </div>
                <input
                  type="url"
                  value={formData.githubUrl || ''}
                  onChange={(e) => handleChange('githubUrl', e.target.value)}
                  placeholder="https://github.com/mrminfotech"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white font-medium focus:outline-none focus:border-[#087FC4] dark:focus:border-[#20B8D5]"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Twitter / X Profile URL
              </label>
              <div className="relative">
                <div className="w-5 h-5 text-slate-700 dark:text-slate-200 absolute left-3 top-2.5 flex items-center justify-center">
                  <TwitterIcon className="w-4 h-4" />
                </div>
                <input
                  type="url"
                  value={formData.twitterUrl || ''}
                  onChange={(e) => handleChange('twitterUrl', e.target.value)}
                  placeholder="https://x.com/mrminfotech"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white font-medium focus:outline-none focus:border-[#087FC4] dark:focus:border-[#20B8D5]"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                YouTube Channel URL
              </label>
              <div className="relative">
                <div className="w-5 h-5 text-[#FF0000] absolute left-3 top-2.5 flex items-center justify-center">
                  <YoutubeIcon className="w-4 h-4" />
                </div>
                <input
                  type="url"
                  value={formData.youtubeUrl || ''}
                  onChange={(e) => handleChange('youtubeUrl', e.target.value)}
                  placeholder="https://youtube.com/@mrminfotech"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white font-medium focus:outline-none focus:border-[#087FC4] dark:focus:border-[#20B8D5]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Legal & Copyright Bar */}
        <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] shadow-xs space-y-4 text-xs">
          <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
            Bottom Legal Bar Copyright Text
          </label>
          <input
            type="text"
            value={formData.copyrightText || ''}
            onChange={(e) => handleChange('copyrightText', e.target.value)}
            placeholder="MRM InfoTech. All rights reserved."
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white font-medium focus:outline-none focus:border-[#087FC4] dark:focus:border-[#20B8D5]"
          />
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Rendered automatically as &quot;© {new Date().getFullYear()} {formData.copyrightText || formData.legalName || 'MRM InfoTech. All rights reserved.'}&quot;
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <button
            type="button"
            onClick={handleResetToDefault}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1E3557] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" /> Discard Changes
          </button>

          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#087FC4] to-[#20B8D5] hover:opacity-95 text-white font-bold text-sm shadow-md shadow-[#087FC4]/25 flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Saving to Live Database...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Company Profile &amp; Footer</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Live Preview Card */}
      <div className="p-6 rounded-2xl mrm-glass-strong border border-[#087FC4]/20 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#087FC4] dark:text-[#20B8D5]">
            <Sparkles className="w-4 h-4" /> Live Footer Appearance Preview
          </div>
          <span className="text-[11px] text-slate-500">Real-time simulation</span>
        </div>

        <div className="p-5 rounded-xl bg-white/70 dark:bg-[#071A35]/70 border border-slate-200/80 dark:border-white/10 space-y-3.5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h4 className="text-base font-extrabold text-[#071A35] dark:text-white">
                {formData.name || 'MRM InfoTech'}
              </h4>
              <p className="text-[10px] text-[#087FC4] dark:text-[#20B8D5] font-bold tracking-widest uppercase">
                {formData.tagline || 'IDEAS • PRODUCTS • IMPACT'}
              </p>
            </div>
            <span className="text-xs text-slate-500 font-mono">
              {formData.foundedYear ? `Est. ${formData.foundedYear}` : ''}
            </span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg">
            {formData.description || 'Building innovative software products and delivering high-impact digital solutions...'}
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-600 dark:text-slate-300 pt-1">
            <div className="flex items-center gap-1.5 text-[#087FC4] dark:text-[#20B8D5]">
              <Mail className="w-3.5 h-3.5" />
              <span>{formData.email || 'contact@mrminfotech.com'}</span>
            </div>
            {formData.phone && (
              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                <Phone className="w-3.5 h-3.5" />
                <span>{formData.phone}</span>
              </div>
            )}
            {formData.address && (
              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                <MapPin className="w-3.5 h-3.5" />
                <span>{formData.address}</span>
              </div>
            )}
          </div>

          {/* Social Icons row preview */}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-200/70 dark:border-white/10">
            {formData.facebookUrl && (
              <div className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-[#103B68] flex items-center justify-center text-[#1877F2]">
                <FacebookIcon className="w-3.5 h-3.5" />
              </div>
            )}
            {formData.linkedinUrl && (
              <div className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-[#103B68] flex items-center justify-center text-[#0A66C2]">
                <LinkedinIcon className="w-3.5 h-3.5" />
              </div>
            )}
            {formData.instagramUrl && (
              <div className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-[#103B68] flex items-center justify-center text-[#E4405F]">
                <InstagramIcon className="w-3.5 h-3.5" />
              </div>
            )}
            {formData.githubUrl && (
              <div className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-[#103B68] flex items-center justify-center text-slate-800 dark:text-white">
                <GithubIcon className="w-3.5 h-3.5" />
              </div>
            )}
            {formData.twitterUrl && (
              <div className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-[#103B68] flex items-center justify-center text-slate-800 dark:text-white">
                <TwitterIcon className="w-3.5 h-3.5" />
              </div>
            )}
            {formData.youtubeUrl && (
              <div className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-[#103B68] flex items-center justify-center text-[#FF0000]">
                <YoutubeIcon className="w-3.5 h-3.5" />
              </div>
            )}
            {formData.whatsapp && (
              <div className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-[#103B68] flex items-center justify-center text-[#25D366]">
                <WhatsappIcon className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyProfileForm;
