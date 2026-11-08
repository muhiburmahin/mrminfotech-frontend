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
  Lock,
  ArrowLeft,
  ArrowRight,
  ImageIcon,
} from 'lucide-react';
import {
  createAdminProduct,
  updateAdminProduct,
  uploadMediaFiles,
  AdminProductPayload,
} from '@/lib/api/admin';

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
  sortOrder?: number;
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
    Array.isArray(initialData?.images) && initialData.images.length > 0 ? initialData.images : []
  );
  const [liveUrl, setLiveUrl] = useState(
    initialData?.liveUrl || initialData?.productSiteUrl || initialData?.demoUrl || ''
  );
  const [caseStudy, setCaseStudy] = useState(initialData?.caseStudy || '');
  const [sourceCodeUrl, setSourceCodeUrl] = useState(initialData?.sourceCodeUrl || '');
  const [isSourcePrivate, setIsSourcePrivate] = useState(Boolean(initialData?.isSourcePrivate));
  const [stage, setStage] = useState(initialData?.stage || 'LIVE');
  const [sortOrder, setSortOrder] = useState<number>(initialData?.sortOrder ?? 1);

  const [manualUrlInput, setManualUrlInput] = useState('');
  const [showManualUrl, setShowManualUrl] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setTitle('');
    setSlug('');
    setTagline('');
    setDescription('');
    setImages([]);
    setLiveUrl('');
    setCaseStudy('');
    setSourceCodeUrl('');
    setIsSourcePrivate(false);
    setStage('LIVE');
    setSortOrder(1);
    setManualUrlInput('');
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

  // Desktop file upload handler (max 10 images)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const availableSlots = 10 - images.length;
    if (availableSlots <= 0) {
      setError('Maximum 10 images allowed. Please delete existing images to upload more.');
      return;
    }

    const filesToUpload = Array.from(files).slice(0, availableSlots);
    setIsUploading(true);
    setError(null);

    try {
      const uploadedUrls = await uploadMediaFiles(filesToUpload);
      if (uploadedUrls.length > 0) {
        setImages((prev) => [...prev, ...uploadedUrls].slice(0, 10));
        setSuccessMsg(`${uploadedUrls.length} image(s) uploaded successfully!`);
        setTimeout(() => setSuccessMsg(null), 4000);
      } else {
        setError('No images uploaded. Please try again.');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to upload image';
      setError(msg);
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
    if (images.length >= 10) {
      setError('Maximum 10 images permitted.');
      return;
    }
    setImages((prev) => [...prev, trimmed].slice(0, 10));
    setManualUrlInput('');
    setShowManualUrl(false);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const moveImage = (index: number, direction: 'left' | 'right') => {
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= images.length) return;
    const newImages = [...images];
    const [moved] = newImages.splice(index, 1);
    newImages.splice(targetIndex, 0, moved);
    setImages(newImages);
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
      sortOrder: Number(sortOrder) || 1,
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
            Configure direct desktop screenshots upload (up to 10 images), live preview links, and source code privacy.
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

      {/* Row 1: Title & Slug */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Product Name / Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="e.g. EduManage BD"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-[#087FC4]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Slug (URL identifier) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="edumanage-bd"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white text-xs sm:text-sm font-mono focus:outline-none focus:border-[#087FC4]"
          />
        </div>
      </div>

      {/* Row 2: Tagline, Stage & Serial Rank */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Tagline / Subheading
          </label>
          <input
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="Comprehensive School & University ERP"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-[#087FC4]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Product Stage
          </label>
          <select
            value={stage}
            onChange={(e) => setStage(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-[#087FC4]"
          >
            <option value="LIVE">LIVE (Production)</option>
            <option value="BETA">BETA</option>
            <option value="COMING_SOON">COMING SOON</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
            <span>Display Serial (Rank)</span>
            <span className="text-[10px] text-[#087FC4] dark:text-[#20B8D5] font-bold">(1 = Top priority)</span>
          </label>
          <div className="relative">
            <input
              type="number"
              min={1}
              max={999}
              value={sortOrder}
              onChange={(e) => setSortOrder(Math.max(1, parseInt(e.target.value) || 1))}
              placeholder="1"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white text-xs sm:text-sm font-black focus:outline-none focus:border-[#087FC4]"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#087FC4] dark:text-[#20B8D5]">
              #{sortOrder}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
          Short Description (Summary)
        </label>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Cloud-native educational management ecosystem designed for Bangladeshi schools, colleges, and universities..."
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-[#087FC4]"
        />
      </div>

      {/* MULTI-IMAGE DESKTOP FILE UPLOADER (UP TO 10 IMAGES) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 dark:bg-[#07162C]/80 border border-slate-200/80 dark:border-[#1E3557]/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-[#087FC4] dark:text-[#20B8D5]" />
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                Product Screenshots &amp; Gallery (Max 10 Images)
              </label>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#087FC4]/10 text-[#087FC4] dark:text-[#20B8D5]">
                {images.length}/10 Images
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Select directly from your desktop. These appear in the homepage switcher and product detail interactive gallery.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setShowManualUrl(!showManualUrl)}
              className="px-2.5 py-1.5 rounded-lg text-[11px] font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-[#1E3557] transition-colors"
            >
              {showManualUrl ? 'Hide URL Input' : '+ Add External URL'}
            </button>

            <button
              type="button"
              disabled={images.length >= 10 || isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-1.5 rounded-xl bg-[#087FC4] hover:bg-[#087FC4]/90 disabled:opacity-50 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload from Desktop</span>
                </>
              )}
            </button>
            <input
              type="file"
              ref={fileInputRef}
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </div>

        {/* Optional Manual URL Input */}
        {showManualUrl && (
          <div className="flex items-center gap-2 pt-1 animate-in fade-in duration-150">
            <input
              type="url"
              value={manualUrlInput}
              onChange={(e) => setManualUrlInput(e.target.value)}
              placeholder="Paste image URL (e.g. https://images.unsplash.com/...)"
              className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#087FC4]"
            />
            <button
              type="button"
              onClick={handleAddManualUrl}
              className="px-3 py-2 rounded-xl bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 text-white text-xs font-bold transition-colors"
            >
              Add
            </button>
          </div>
        )}

        {/* Thumbnail Grid & Reordering / Deletion */}
        {images.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-1">
            {images.map((url, index) => (
              <div
                key={index}
                className="group relative h-28 rounded-xl overflow-hidden border border-slate-200 dark:border-[#1E3557] bg-slate-900 shadow-xs"
              >
                <img
                  src={url}
                  alt={`Screenshot ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    // Fallback visual if broken image
                    (e.currentTarget as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop';
                  }}
                />

                {/* Index Badge */}
                <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-md bg-black/70 backdrop-blur-xs text-[10px] font-bold text-white tracking-wide">
                  #{index + 1}
                </span>

                {/* Top Action Overlay (Delete & Move) */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => moveImage(index, 'left')}
                          className="p-1 rounded bg-black/60 text-white hover:bg-black/90 transition-colors"
                          title="Move Left"
                        >
                          <ArrowLeft className="w-3 h-3" />
                        </button>
                      )}
                      {index < images.length - 1 && (
                        <button
                          type="button"
                          onClick={() => moveImage(index, 'right')}
                          className="p-1 rounded bg-black/60 text-white hover:bg-black/90 transition-colors"
                          title="Move Right"
                        >
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="p-1 rounded-md bg-rose-600 hover:bg-rose-700 text-white transition-colors"
                      title="Remove Image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-[9px] text-slate-200 truncate font-mono">
                    {url.split('/').pop()}
                  </p>
                </div>
              </div>
            ))}

            {images.length < 10 && (
              <label
                onClick={() => fileInputRef.current?.click()}
                className="h-28 rounded-xl border-2 border-dashed border-slate-300 dark:border-[#1E3557] hover:border-[#087FC4] dark:hover:border-[#20B8D5] flex flex-col items-center justify-center cursor-pointer bg-white/50 dark:bg-[#0B1E3B]/50 transition-colors group"
              >
                <Upload className="w-5 h-5 text-slate-400 group-hover:text-[#087FC4] mb-1 transition-colors" />
                <span className="text-[11px] font-bold text-slate-500 group-hover:text-[#087FC4] transition-colors">
                  Upload More
                </span>
                <span className="text-[9px] text-slate-400">({10 - images.length} slots left)</span>
              </label>
            )}
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="p-6 rounded-xl border-2 border-dashed border-slate-300 dark:border-[#1E3557] hover:border-[#087FC4] dark:hover:border-[#20B8D5] flex flex-col items-center justify-center cursor-pointer bg-white/50 dark:bg-[#0B1E3B]/50 transition-colors text-center"
          >
            <Upload className="w-8 h-8 text-[#087FC4] mb-2" />
            <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Click to upload desktop screenshots (up to 10 images)
            </p>
            <p className="text-[11px] text-slate-400 mt-1">PNG, JPG, WEBP, or SVG up to 10MB each</p>
          </div>
        )}
      </div>

      {/* Row 3: URLs (Live & Source Code) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Live Platform URL
          </label>
          <input
            type="url"
            value={liveUrl}
            onChange={(e) => setLiveUrl(e.target.value)}
            placeholder="https://edumanage.mrminfotech.com"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-[#087FC4]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Source Code / Repository URL
          </label>
          <input
            type="url"
            disabled={isSourcePrivate}
            value={isSourcePrivate ? '' : sourceCodeUrl}
            onChange={(e) => setSourceCodeUrl(e.target.value)}
            placeholder={isSourcePrivate ? 'Confidential / Private Source' : 'https://github.com/mrminfotech/edumanage'}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-[#087FC4] disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
      </div>

      {/* Source Privacy Checkbox */}
      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Lock className="w-4 h-4 text-amber-500" />
          <div>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Proprietary Intellectual Property (Lock Source Code)
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              When checked, public repository links will be disabled and display a &quot;Private&quot; badge.
            </p>
          </div>
        </div>
        <input
          type="checkbox"
          id="isSourcePrivate"
          checked={isSourcePrivate}
          onChange={(e) => setIsSourcePrivate(e.target.checked)}
          className="w-4 h-4 rounded text-[#087FC4] focus:ring-[#087FC4] cursor-pointer"
        />
      </div>

      {/* Case Study & Architectural Overview */}
      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
          Detailed Case Study, Architecture &amp; Solution Overview
        </label>
        <textarea
          rows={5}
          value={caseStudy}
          onChange={(e) => setCaseStudy(e.target.value)}
          placeholder="Describe how this SaaS product solves operational challenges, its system architecture, real-world deployment, and benefits..."
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-[#087FC4]"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-[#1E3557]">
        {initialData && (
          <button
            type="button"
            onClick={() => {
              resetForm();
              if (onCancel) onCancel();
            }}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          disabled={isSubmitting || isUploading}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#087FC4] to-[#20B8D5] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#087FC4]/25 hover:opacity-95 disabled:opacity-50 inline-flex items-center gap-2 cursor-pointer transition-all"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving Product...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>{initialData ? 'Update Product' : 'Save & Publish Product'}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
