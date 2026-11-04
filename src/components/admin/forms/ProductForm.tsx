/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import { Plus, Trash2, Save, Loader2, ExternalLink, XCircle, CheckCircle2, Lock } from 'lucide-react';
import { createAdminProduct, updateAdminProduct, AdminProductPayload } from '@/lib/api/admin';

export interface AdminProductRecord {
  id?: string;
  title?: string;
  name?: string;
  slug?: string;
  tagline?: string;
  description?: string;
  summary?: string;
  images?: string[];
  liveUrl?: string;
  productSiteUrl?: string;
  demoUrl?: string;
  caseStudy?: string;
  sourceCodeUrl?: string;
  isSourcePrivate?: boolean;
  stage?: string;
}

interface ProductFormProps {
  initialData?: AdminProductRecord | null;
  onSaved?: () => void;
  onCancel?: () => void;
}

export function ProductForm({ initialData, onSaved, onCancel }: ProductFormProps) {
  const [title, setTitle] = useState(initialData?.title || initialData?.name || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [tagline, setTagline] = useState(initialData?.tagline || '');
  const [description, setDescription] = useState(initialData?.description || initialData?.summary || '');
  const [images, setImages] = useState<string[]>(
    Array.isArray(initialData?.images) && initialData.images.length > 0
      ? initialData.images
      : ['']
  );
  const [liveUrl, setLiveUrl] = useState(
    initialData?.liveUrl || initialData?.productSiteUrl || initialData?.demoUrl || ''
  );
  const [caseStudy, setCaseStudy] = useState(initialData?.caseStudy || '');
  const [sourceCodeUrl, setSourceCodeUrl] = useState(initialData?.sourceCodeUrl || '');
  const [isSourcePrivate, setIsSourcePrivate] = useState(Boolean(initialData?.isSourcePrivate));
  const [stage, setStage] = useState(initialData?.stage || 'LIVE');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const resetForm = () => {
    setTitle('');
    setSlug('');
    setTagline('');
    setDescription('');
    setImages(['']);
    setLiveUrl('');
    setCaseStudy('');
    setSourceCodeUrl('');
    setIsSourcePrivate(false);
    setStage('LIVE');
    setError(null);
    setSuccessMsg(null);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!initialData) {
      const generated = val
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setSlug(generated);
    }
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const addImageField = () => {
    if (images.length < 5) {
      setImages([...images, '']);
    }
  };

  const removeImageField = (index: number) => {
    if (images.length > 1) {
      setImages(images.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMsg(null);

    const filteredImages = images.map((s) => s.trim()).filter(Boolean);

    const payload: AdminProductPayload = {
      title: title.trim(),
      slug: slug.trim(),
      tagline: tagline.trim() || undefined,
      description: description.trim() || undefined,
      images: filteredImages,
      liveUrl: liveUrl.trim() || undefined,
      caseStudy: caseStudy.trim() || undefined,
      sourceCodeUrl: isSourcePrivate ? undefined : sourceCodeUrl.trim() || undefined,
      isSourcePrivate,
      stage,
    };

    try {
      if (initialData?.id) {
        await updateAdminProduct(initialData.id, payload);
        setSuccessMsg(`Product "${payload.title}" updated successfully!`);
      } else {
        await createAdminProduct(payload);
        setSuccessMsg(`Product "${payload.title}" created successfully!`);
        resetForm();
      }

      if (onSaved) {
        onSaved();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save product';
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white dark:bg-[#0B1E3B] p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-[#1E3557] shadow-sm transition-colors duration-150"
    >
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#1E3557] pb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
            {initialData ? `Edit Product: ${initialData.title || initialData.name || initialData.slug}` : 'Create New SaaS Product'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Configure dynamic multi-screenshot gallery, live preview links, and source code privacy.
          </p>
        </div>
        {initialData && (
          <button
            type="button"
            onClick={() => {
              resetForm();
              if (onCancel) onCancel();
            }}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors inline-flex items-center gap-1.5"
          >
            <XCircle className="w-3.5 h-3.5" /> Cancel Edit
          </button>
        )}
      </div>

      {error && (
        <div className="p-3.5 bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 rounded-xl text-xs flex items-center gap-2">
          <XCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Row 1: Product Name & Slug */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="e.g. EduManage BD"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#087FC4] dark:focus:border-[#20B8D5]"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Slug / URL Identifier <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
            placeholder="e.g. edumanage-bd"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white placeholder-slate-400 text-sm font-mono focus:outline-none focus:border-[#087FC4] dark:focus:border-[#20B8D5]"
          />
        </div>
      </div>

      {/* Row 2: Tagline & Stage */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Tagline / Category
          </label>
          <input
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="e.g. Comprehensive School & University ERP"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#087FC4] dark:focus:border-[#20B8D5]"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Release Stage
          </label>
          <select
            value={stage}
            onChange={(e) => setStage(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#087FC4] dark:focus:border-[#20B8D5]"
          >
            <option value="LIVE">LIVE (Public Ready)</option>
            <option value="BETA">BETA (Early Access)</option>
            <option value="COMING_SOON">COMING SOON (In Roadmap)</option>
          </select>
        </div>
      </div>

      {/* Row 3: Product Description / Summary */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
          Product Summary / Short Description
        </label>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="A brief overview of how this SaaS engine solves practical challenges for organizations..."
          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#087FC4] dark:focus:border-[#20B8D5]"
        />
      </div>

      {/* Row 4: Multiple Images URL Management (Up to 5) */}
      <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-[#07162C]/60 border border-slate-200/80 dark:border-[#1E3557]/80">
        <div className="flex items-center justify-between mb-2">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Product Images ({images.length}/5 Screenshots for Gallery / Slider)
            </label>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Add 2 to 5 high-resolution URLs. The homepage card and product page will feature an interactive switcher.
            </p>
          </div>
          {images.length < 5 && (
            <button
              type="button"
              onClick={addImageField}
              className="px-3 py-1.5 rounded-lg bg-[#087FC4]/10 dark:bg-[#20B8D5]/15 text-[#087FC4] dark:text-[#20B8D5] font-bold text-xs inline-flex items-center gap-1.5 hover:bg-[#087FC4]/20 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add URL
            </button>
          )}
        </div>

        <div className="space-y-3 mt-3">
          {images.map((img, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="flex-1 w-full flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-slate-200 dark:bg-slate-800 text-[11px] font-bold flex items-center justify-center shrink-0 text-slate-600 dark:text-slate-300">
                  #{index + 1}
                </span>
                <input
                  type="url"
                  value={img}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  placeholder={`https://images.unsplash.com/... or cloud screenshot URL #${index + 1}`}
                  className="flex-1 px-4 py-2 rounded-xl bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus:border-[#087FC4] dark:focus:border-[#20B8D5]"
                />
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                {/* Visual Thumbnail Preview if valid URL */}
                {img.trim() && (
                  <div className="w-10 h-7 rounded-md overflow-hidden bg-slate-200 dark:bg-slate-800 shrink-0 border border-slate-300 dark:border-slate-700 relative group">
                    <img
                      src={img}
                      alt={`Preview #${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}

                {images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImageField(index)}
                    className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors cursor-pointer"
                    title="Remove Image Field"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 5: Live Preview URL & Source Code Management */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Live Preview / Product Site URL
          </label>
          <div className="relative">
            <input
              type="url"
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
              placeholder="https://edumanagebd.com"
              className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#087FC4] dark:focus:border-[#20B8D5]"
            />
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#087FC4]"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Source Code Repository URL
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-[#087FC4] dark:text-[#20B8D5]">
              <input
                type="checkbox"
                checked={isSourcePrivate}
                onChange={(e) => setIsSourcePrivate(e.target.checked)}
                className="rounded border-slate-300 text-[#087FC4] focus:ring-[#087FC4]"
              />
              <Lock className="w-3.5 h-3.5" />
              <span>Mark Private</span>
            </label>
          </div>
          <input
            type="text"
            disabled={isSourcePrivate}
            value={isSourcePrivate ? '' : sourceCodeUrl}
            onChange={(e) => setSourceCodeUrl(e.target.value)}
            placeholder={isSourcePrivate ? '🔒 Source code is private (Protected IP)' : 'https://github.com/mrminfotech/...'}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#087FC4] dark:focus:border-[#20B8D5] disabled:opacity-60 disabled:cursor-not-allowed"
          />
        </div>
      </div>

      {/* Row 6: Case Study / Architecture Details */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
          Case Study &amp; Technical Architecture Overview
        </label>
        <textarea
          rows={4}
          value={caseStudy}
          onChange={(e) => setCaseStudy(e.target.value)}
          placeholder="Provide an architecture summary, target users, technology stack, and business impact for this product..."
          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#087FC4] dark:focus:border-[#20B8D5]"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#087FC4] to-[#20B8D5] hover:opacity-95 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{initialData ? 'Update Product' : 'Save SaaS Product'}</span>
        </button>

        {initialData && (
          <button
            type="button"
            onClick={() => {
              resetForm();
              if (onCancel) onCancel();
            }}
            className="px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ProductForm;
