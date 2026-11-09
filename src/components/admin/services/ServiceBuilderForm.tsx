'use client';

import React, { useState, useRef } from 'react';
import { Save, X, Upload, Plus, Trash2, CheckCircle2, AlertCircle, Eye } from 'lucide-react';
import { omitKeys } from '@/lib/utils';
import {
  createAdminService,
  updateAdminService,
  updateAdminServiceSection,
  uploadMediaFiles,
} from '@/lib/api/admin';
import type {
  ServiceRecord,
  ServiceCategory,
  ServiceOfferingItem,
  ServiceBenefitItem,
  ServiceProcessStepItem,
  ServiceMediaItem,
  ServiceFaqItem,
  ServiceSection,
  ServiceStatus,
} from '@/types/service.types';

interface ServiceBuilderFormProps {
  initialData?: ServiceRecord | null;
  categories: ServiceCategory[];
  onSaved: () => void;
  onCancel: () => void;
}

export function ServiceBuilderForm({
  initialData,
  categories,
  onSaved,
  onCancel,
}: ServiceBuilderFormProps) {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isSavingSection, setIsSavingSection] = useState<boolean>(false);
  const [isUploadingMedia, setIsUploadingMedia] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Core Service Identity
  const [serviceId, setServiceId] = useState<string | undefined>(initialData?.id);
  const [isNew, setIsNew] = useState<boolean>(!initialData?.id);
  const [title, setTitle] = useState<string>(initialData?.title || initialData?.name || '');
  const [slug, setSlug] = useState<string>(initialData?.slug || '');
  const [tagline, setTagline] = useState<string>(initialData?.tagline || '');
  const [shortDescription, setShortDescription] = useState<string>(
    initialData?.shortDescription || initialData?.summary || ''
  );
  const [description, setDescription] = useState<string>(initialData?.description || '');
  const [serviceType, setServiceType] = useState<string>(
    initialData?.serviceType || 'Web Development'
  );
  const [status, setStatus] = useState<ServiceStatus>(initialData?.status || 'PUBLISHED');
  const [categoryId, setCategoryId] = useState<string>(initialData?.categoryId || '');
  const [icon, setIcon] = useState<string>(initialData?.icon || 'Code2');
  const [coverImage, setCoverImage] = useState<string>(
    initialData?.coverImage || initialData?.heroImage || ''
  );
  const [primaryColor, setPrimaryColor] = useState<string>(
    initialData?.primaryColor || '#2563EB'
  );

  // Tab 2: Offerings
  const [offerings, setOfferings] = useState<ServiceOfferingItem[]>(
    initialData?.offerings || []
  );

  // Tab 3: Benefits
  const [benefits, setBenefits] = useState<ServiceBenefitItem[]>(
    initialData?.benefits || []
  );

  // Tab 4: Process Steps
  const [processSteps, setProcessSteps] = useState<ServiceProcessStepItem[]>(
    initialData?.processSteps || []
  );

  // Tab 5: Tech Stack
  const [technologies, setTechnologies] = useState<string[]>(
    (initialData?.technologies || []).map((t) =>
      typeof t === 'string' ? t : t.name || t.slug || ''
    ).filter(Boolean)
  );
  const [techInput, setTechInput] = useState<string>('');

  // Tab 6: Media Gallery
  const [mediaItems, setMediaItems] = useState<ServiceMediaItem[]>(
    initialData?.mediaItems || []
  );

  // Tab 7: FAQs
  const [faqs, setFaqs] = useState<ServiceFaqItem[]>(
    initialData?.faqs || []
  );

  // Tab 8: Visibility, Priorities & SEO
  const [isFeatured, setIsFeatured] = useState<boolean>(initialData?.isFeatured ?? false);
  const [showOnServicesPage, setShowOnServicesPage] = useState<boolean>(
    initialData?.showOnServicesPage ?? true
  );
  const [showOnHomepage, setShowOnHomepage] = useState<boolean>(
    initialData?.showOnHomepage ?? true
  );
  const [showInNavbar, setShowInNavbar] = useState<boolean>(
    initialData?.showInNavbar ?? true
  );
  const [allowPublicDetail] = useState<boolean>(
    initialData?.allowPublicDetail ?? true
  );

  const [displayOrder] = useState<number>(
    initialData?.displayOrder ?? 0
  );
  const [servicesPageOrder, setServicesPageOrder] = useState<number>(
    initialData?.servicesPageOrder ?? 0
  );
  const [homepageOrder, setHomepageOrder] = useState<number>(
    initialData?.homepageOrder ?? 0
  );
  const [navbarOrder, setNavbarOrder] = useState<number>(
    initialData?.navbarOrder ?? 0
  );
  const [featuredOrder, setFeaturedOrder] = useState<number>(
    initialData?.featuredOrder ?? 0
  );

  // SEO
  const [seoTitle, setSeoTitle] = useState<string>(
    initialData?.seoTitle || initialData?.seo?.seoTitle || ''
  );
  const [seoDescription, setSeoDescription] = useState<string>(
    initialData?.seoDescription || initialData?.seo?.seoDescription || ''
  );
  const [seoKeywords, setSeoKeywords] = useState<string>(
    initialData?.seoKeywords || initialData?.seo?.seoKeywords || ''
  );
  const [canonicalUrl, setCanonicalUrl] = useState<string>(
    initialData?.canonicalUrl || initialData?.seo?.canonicalUrl || ''
  );
  const [ogTitle] = useState<string>(
    initialData?.ogTitle || initialData?.seo?.ogTitle || ''
  );
  const [ogDescription] = useState<string>(
    initialData?.ogDescription || initialData?.seo?.ogDescription || ''
  );
  const [noIndex] = useState<boolean>(
    initialData?.noIndex ?? initialData?.seo?.noIndex ?? false
  );

  // Auto-slug generator with space-stripping
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (isNew && !slug) {
      const generated = val
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .replace(/-+/g, '-');
      setSlug(generated);
    }
  };

  const notifySuccess = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(null), 4000);
  };

  // Clean sub-items of foreign keys, timestamps, and invalid temp IDs before API dispatch
  const sanitizeSubList = <T extends object>(list?: T[]) => {
    if (!Array.isArray(list)) return undefined;
    return list.map((item) => {
      const clean: Omit<T, 'serviceId' | 'createdAt' | 'updatedAt'> & { id?: unknown } = omitKeys(
        item as T & { serviceId?: string; createdAt?: string; updatedAt?: string; id?: unknown },
        ['serviceId', 'createdAt', 'updatedAt'],
      );
      if (clean.id && (typeof clean.id !== 'string' || clean.id.startsWith('temp-') || clean.id.length < 32)) {
        delete clean.id;
      }
      return clean;
    });
  };

  const sanitizeForApi = (snapshot: Partial<ServiceRecord>) => {
    const rest = omitKeys(snapshot, ['id', 'categoryName', 'category', 'createdAt', 'updatedAt']);

    return {
      ...rest,
      offerings: sanitizeSubList(snapshot.offerings),
      benefits: sanitizeSubList(snapshot.benefits),
      processSteps: sanitizeSubList(snapshot.processSteps),
      mediaItems: sanitizeSubList(snapshot.mediaItems),
      faqs: sanitizeSubList(snapshot.faqs),
    };
  };

  const getCurrentSnapshot = (): Partial<ServiceRecord> => ({
    id: serviceId,
    title,
    name: title,
    slug,
    tagline,
    shortDescription,
    description,
    serviceType,
    status,
    categoryId: categoryId || undefined,
    icon,
    coverImage,
    primaryColor,
    technologies,
    offerings,
    benefits,
    processSteps,
    mediaItems,
    faqs,
    isFeatured,
    showOnServicesPage,
    showOnHomepage,
    showInNavbar,
    allowPublicDetail,
    displayOrder,
    servicesPageOrder,
    homepageOrder,
    navbarOrder,
    featuredOrder,
    seoTitle,
    seoDescription,
    seoKeywords,
    canonicalUrl,
    ogTitle,
    ogDescription,
    noIndex,
  });

  // Architectural Adjustment 2: Independent Section / Tab Save
  const handleSaveSection = async (section: ServiceSection) => {
    if (!title.trim() || !slug.trim()) {
      setErrorMsg('Service Title and Slug are required before saving any section.');
      return;
    }

    setIsSavingSection(true);
    setErrorMsg(null);

    try {
      let currentId = serviceId;
      if (!currentId) {
        const created = await createAdminService({
          title,
          slug,
          tagline,
          shortDescription,
          description,
          serviceType,
          status: 'DRAFT',
          categoryId: categoryId || undefined,
        });
        currentId = created.id;
        setServiceId(created.id);
        setIsNew(false);
      }

      let sectionPayload: Record<string, unknown> = {};
      if (section === 'basic') {
        sectionPayload = {
          title,
          slug,
          tagline,
          shortDescription,
          description,
          serviceType,
          status,
          icon,
          coverImage,
          primaryColor,
          categoryId: categoryId || undefined,
        };
      } else if (section === 'offerings') {
        sectionPayload = { offerings: sanitizeSubList(offerings) };
      } else if (section === 'benefits') {
        sectionPayload = { benefits: sanitizeSubList(benefits) };
      } else if (section === 'process') {
        sectionPayload = { processSteps: sanitizeSubList(processSteps) };
      } else if (section === 'technologies') {
        sectionPayload = { technologies };
      } else if (section === 'media') {
        sectionPayload = { mediaItems: sanitizeSubList(mediaItems) };
      } else if (section === 'faqs') {
        sectionPayload = { faqs: sanitizeSubList(faqs) };
      } else if (section === 'visibility') {
        sectionPayload = {
          status,
          isFeatured,
          showOnServicesPage,
          showOnHomepage,
          showInNavbar,
          allowPublicDetail,
          displayOrder,
          servicesPageOrder,
          homepageOrder,
          navbarOrder,
          featuredOrder,
        };
      } else if (section === 'seo') {
        sectionPayload = {
          seoTitle,
          seoDescription,
          seoKeywords,
          canonicalUrl,
          ogTitle,
          ogDescription,
          noIndex,
        };
      }

      await updateAdminServiceSection(currentId, section, sectionPayload);
      notifySuccess(`Saved ${section.toUpperCase()} tab successfully!`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save section';
      setErrorMsg(msg);
    } finally {
      setIsSavingSection(false);
    }
  };

  // Full Save All
  const handleSaveAll = async () => {
    if (!title.trim() || !slug.trim()) {
      setErrorMsg('Service Title and Slug are required.');
      setActiveTab(1);
      return;
    }

    setIsSaving(true);
    setErrorMsg(null);

    const snapshot = getCurrentSnapshot();
    const payload = sanitizeForApi(snapshot);

    try {
      if (serviceId) {
        await updateAdminService(serviceId, payload);
      } else {
        const created = await createAdminService(payload);
        setServiceId(created.id);
        setIsNew(false);
      }
      notifySuccess('Complete service saved successfully!');
      onSaved();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save service';
      setErrorMsg(msg);
    } finally {
      setIsSaving(false);
    }
  };

  // Multi-image upload for media gallery
  const handleFilesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploadingMedia(true);
    setErrorMsg(null);
    try {
      const uploadedUrls = await uploadMediaFiles(Array.from(files));
      const newItems: ServiceMediaItem[] = uploadedUrls.map((url, idx) => ({
        url,
        mediaType: 'GALLERY',
        title: `Service Image ${mediaItems.length + idx + 1}`,
        isPrimary: mediaItems.length === 0 && idx === 0,
        displayOrder: mediaItems.length + idx + 1,
      }));
      setMediaItems((prev) => [...prev, ...newItems]);
      notifySuccess(`Uploaded ${uploadedUrls.length} image(s)!`);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Media upload failed');
    } finally {
      setIsUploadingMedia(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Tech stack tag helpers
  const handleAddTech = () => {
    const trimmed = techInput.trim();
    if (!trimmed) return;
    if (!technologies.includes(trimmed)) {
      setTechnologies([...technologies, trimmed]);
    }
    setTechInput('');
  };

  const handleRemoveTech = (item: string) => {
    setTechnologies(technologies.filter((t) => t !== item));
  };

  const tabs: Array<{ id: number; name: string; section: ServiceSection }> = [
    { id: 1, name: 'Basic Info', section: 'basic' },
    { id: 2, name: 'Offerings & Capabilities', section: 'offerings' },
    { id: 3, name: 'Benefits & Value', section: 'benefits' },
    { id: 4, name: 'Working Process', section: 'process' },
    { id: 5, name: 'Tech Stack & Tools', section: 'technologies' },
    { id: 6, name: 'Media Gallery', section: 'media' },
    { id: 7, name: 'FAQs', section: 'faqs' },
    { id: 8, name: 'Ordering & SEO', section: 'seo' },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden mb-10 animate-in fade-in duration-200">
      {/* Header Bar */}
      <div className="p-5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-slate-900/90 backdrop-blur-md sticky top-0 z-20">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold uppercase tracking-wider mb-1">
            <span>SERVICE BUILDER &amp; EDITOR</span>
            <span>• 8-Tab Modular CMS</span>
          </div>
          <h2 className="text-xl font-black text-white">
            {title || 'New Service Specification'}
          </h2>
        </div>

        <div className="flex items-center gap-2.5">
          {slug && (
            <a
              href={`/services/${slug}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-all border border-slate-700"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Live Preview</span>
            </a>
          )}

          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={isSaving}
            onClick={handleSaveAll}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/30 disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? 'Saving Service...' : 'Save Service'}</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {errorMsg && (
        <div className="m-5 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span className="leading-relaxed">{errorMsg}</span>
        </div>
      )}
      {saveSuccessMsg && (
        <div className="m-5 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex items-center overflow-x-auto border-b border-slate-800 bg-slate-950/40 px-5 scrollbar-thin">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3.5 text-xs font-bold whitespace-nowrap border-b-2 transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-400 bg-blue-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab.id}. {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="p-6">
        {/* =================================================================
            TAB 1: BASIC INFO
            ================================================================= */}
        {activeTab === 1 && (
          <div className="space-y-6 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">
                  Service Title / Name *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. Web Development"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">
                  URL Slug * (auto-generated)
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) =>
                    setSlug(
                      e.target.value
                        .toLowerCase()
                        .replace(/\s+/g, '-')
                        .replace(/[^a-z0-9-]/g, '')
                        .replace(/-+/g, '-')
                    )
                  }
                  placeholder="e.g. web-development"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm font-mono focus:border-blue-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">
                Service Tagline / Punchline
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="e.g. High-performance, scalable web platforms built for mission-critical operations"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">
                  Taxonomy Category
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-hidden"
                >
                  <option value="">-- No Category --</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">
                  Service Type / Group
                </label>
                <input
                  type="text"
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  placeholder="e.g. Engineering, Creative, Marketing"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">
                  Publishing Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as ServiceStatus)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-hidden"
                >
                  <option value="PUBLISHED">PUBLISHED (Live)</option>
                  <option value="DRAFT">DRAFT (Hidden)</option>
                  <option value="IN_REVIEW">IN REVIEW (Coming Soon)</option>
                  <option value="ARCHIVED">ARCHIVED</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">
                  Lucide Icon Identifier
                </label>
                <input
                  type="text"
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  placeholder="e.g. Globe, Code2, Smartphone, Palette, Search"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm font-mono focus:border-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">
                  Accent Color (Hex)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-10 h-9 rounded-lg bg-slate-800 border border-slate-700 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="flex-1 px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm font-mono focus:border-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">
                Cover / Header Graphic URL
              </label>
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">
                Short Description (Cards, Previews &amp; Bento Grid)
              </label>
              <textarea
                rows={2}
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="Brief editorial summary shown on the main /services overview cards..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">
                Full Description &amp; Architectural Scope
              </label>
              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Comprehensive overview of service methodology, capabilities, deliverables, and guarantees..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-hidden"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                disabled={isSavingSection}
                onClick={() => handleSaveSection('basic')}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all flex items-center gap-2"
              >
                <Save className="w-3.5 h-3.5 text-blue-400" />
                <span>Save Basic Info Tab Only</span>
              </button>
            </div>
          </div>
        )}

        {/* =================================================================
            TAB 2: OFFERINGS & CAPABILITIES
            ================================================================= */}
        {activeTab === 2 && (
          <div className="space-y-6 max-w-4xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Sub-Offerings &amp; Service Pillars</h3>
                <p className="text-xs text-slate-400">
                  Granular capabilities displayed in the &quot;What We Offer&quot; grid (e.g. E-Commerce, Landing Pages, SaaS)
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setOfferings([
                    ...offerings,
                    {
                      title: 'New Offering',
                      shortDescription: 'Scope description for this offering pillar.',
                      displayOrder: offerings.length + 1,
                      isVisible: true,
                    },
                  ])
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Offering</span>
              </button>
            </div>

            <div className="space-y-3">
              {offerings.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-mono font-bold text-blue-400">
                      Offering #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => setOfferings(offerings.filter((_, i) => i !== idx))}
                      className="text-slate-400 hover:text-rose-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => {
                        const copy = [...offerings];
                        copy[idx].title = e.target.value;
                        setOfferings(copy);
                      }}
                      placeholder="Offering Title (e.g. E-Commerce Solutions)"
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:border-blue-500 focus:outline-hidden"
                    />

                    <input
                      type="text"
                      value={item.icon || ''}
                      onChange={(e) => {
                        const copy = [...offerings];
                        copy[idx].icon = e.target.value;
                        setOfferings(copy);
                      }}
                      placeholder="Lucide Icon (e.g. ShoppingBag, Layers)"
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:border-blue-500 focus:outline-hidden"
                    />
                  </div>

                  <textarea
                    rows={2}
                    value={item.shortDescription}
                    onChange={(e) => {
                      const copy = [...offerings];
                      copy[idx].shortDescription = e.target.value;
                      setOfferings(copy);
                    }}
                    placeholder="Short description of deliverables and scope..."
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:border-blue-500 focus:outline-hidden"
                  />
                </div>
              ))}

              {offerings.length === 0 && (
                <div className="text-center py-8 text-slate-500 text-xs">
                  No sub-offerings yet. Click &quot;Add Offering&quot; above to create one.
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                disabled={isSavingSection}
                onClick={() => handleSaveSection('offerings')}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all flex items-center gap-2"
              >
                <Save className="w-3.5 h-3.5 text-blue-400" />
                <span>Save Offerings Tab Only</span>
              </button>
            </div>
          </div>
        )}

        {/* =================================================================
            TAB 3: BENEFITS & VALUE PROPOSITIONS
            ================================================================= */}
        {activeTab === 3 && (
          <div className="space-y-6 max-w-4xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Value Propositions &amp; Guarantees</h3>
                <p className="text-xs text-slate-400">
                  Key reasons why clients choose MRM for this specific service
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setBenefits([
                    ...benefits,
                    {
                      title: 'Engineering Rigor',
                      description: 'Bulletproof code without shortcuts or technical debt.',
                      displayOrder: benefits.length + 1,
                      isVisible: true,
                    },
                  ])
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Benefit</span>
              </button>
            </div>

            <div className="space-y-3">
              {benefits.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      Value Pillar #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => setBenefits(benefits.filter((_, i) => i !== idx))}
                      className="text-slate-400 hover:text-rose-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => {
                        const copy = [...benefits];
                        copy[idx].title = e.target.value;
                        setBenefits(copy);
                      }}
                      placeholder="Benefit Title (e.g. 99.98% SLA)"
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:border-emerald-500 focus:outline-hidden"
                    />

                    <input
                      type="text"
                      value={item.icon || ''}
                      onChange={(e) => {
                        const copy = [...benefits];
                        copy[idx].icon = e.target.value;
                        setBenefits(copy);
                      }}
                      placeholder="Lucide Icon (e.g. ShieldCheck, Zap)"
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:border-emerald-500 focus:outline-hidden"
                    />
                  </div>

                  <textarea
                    rows={2}
                    value={item.description}
                    onChange={(e) => {
                      const copy = [...benefits];
                      copy[idx].description = e.target.value;
                      setBenefits(copy);
                    }}
                    placeholder="Description of the business value and ROI..."
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:border-emerald-500 focus:outline-hidden"
                  />
                </div>
              ))}

              {benefits.length === 0 && (
                <div className="text-center py-8 text-slate-500 text-xs">
                  No benefits configured yet. Click &quot;Add Benefit&quot; above.
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                disabled={isSavingSection}
                onClick={() => handleSaveSection('benefits')}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all flex items-center gap-2"
              >
                <Save className="w-3.5 h-3.5 text-emerald-400" />
                <span>Save Benefits Tab Only</span>
              </button>
            </div>
          </div>
        )}

        {/* =================================================================
            TAB 4: WORKING PROCESS
            ================================================================= */}
        {activeTab === 4 && (
          <div className="space-y-6 max-w-4xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">6-Step Connected Engineering Process</h3>
                <p className="text-xs text-slate-400">
                  Step-by-step workflow ribbon rendered on both the main /services and detail pages
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setProcessSteps([
                    ...processSteps,
                    {
                      stepNumber: processSteps.length + 1,
                      title: `Step ${processSteps.length + 1}: Execution`,
                      description: 'Disciplined sprint-based execution and testing.',
                      displayOrder: processSteps.length + 1,
                    },
                  ])
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Process Step</span>
              </button>
            </div>

            <div className="space-y-3">
              {processSteps.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-mono font-bold text-amber-400">
                      Step #{item.stepNumber || idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => setProcessSteps(processSteps.filter((_, i) => i !== idx))}
                      className="text-slate-400 hover:text-rose-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="number"
                      min={1}
                      value={item.stepNumber}
                      onChange={(e) => {
                        const copy = [...processSteps];
                        copy[idx].stepNumber = parseInt(e.target.value) || 1;
                        setProcessSteps(copy);
                      }}
                      placeholder="Step #"
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:border-amber-500 focus:outline-hidden"
                    />

                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => {
                        const copy = [...processSteps];
                        copy[idx].title = e.target.value;
                        setProcessSteps(copy);
                      }}
                      placeholder="Step Title (e.g. Discovery & Architecture)"
                      className="sm:col-span-2 w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:border-amber-500 focus:outline-hidden"
                    />
                  </div>

                  <textarea
                    rows={2}
                    value={item.description}
                    onChange={(e) => {
                      const copy = [...processSteps];
                      copy[idx].description = e.target.value;
                      setProcessSteps(copy);
                    }}
                    placeholder="Step deliverables and execution milestones..."
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:border-amber-500 focus:outline-hidden"
                  />
                </div>
              ))}

              {processSteps.length === 0 && (
                <div className="text-center py-8 text-slate-500 text-xs">
                  No process steps configured. Click &quot;Add Process Step&quot; above.
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                disabled={isSavingSection}
                onClick={() => handleSaveSection('process')}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all flex items-center gap-2"
              >
                <Save className="w-3.5 h-3.5 text-amber-400" />
                <span>Save Process Tab Only</span>
              </button>
            </div>
          </div>
        )}

        {/* =================================================================
            TAB 5: TECH STACK & TOOLS
            ================================================================= */}
        {activeTab === 5 && (
          <div className="space-y-6 max-w-4xl">
            <div>
              <h3 className="text-sm font-bold text-white">Technologies, Frameworks &amp; Tools</h3>
              <p className="text-xs text-slate-400">
                Pill badges rendered on the individual service page (e.g. Next.js 16, NestJS, PostgreSQL, Redis, Docker)
              </p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTech();
                  }
                }}
                placeholder="Type tech name and press Enter (e.g. Next.js 16)"
                className="flex-1 px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-hidden"
              />
              <button
                type="button"
                onClick={handleAddTech}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-md shadow-blue-600/30"
              >
                Add Tech
              </button>
            </div>

            <div className="flex flex-wrap gap-2 min-h-24 p-4 rounded-xl bg-slate-800/40 border border-slate-700/50">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-mono text-slate-200"
                >
                  <span>{tech}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTech(tech)}
                    className="text-slate-400 hover:text-rose-400 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {technologies.length === 0 && (
                <span className="text-slate-500 text-xs self-center">
                  No technologies added yet. Type a technology name above.
                </span>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                disabled={isSavingSection}
                onClick={() => handleSaveSection('technologies')}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all flex items-center gap-2"
              >
                <Save className="w-3.5 h-3.5 text-blue-400" />
                <span>Save Technologies Tab Only</span>
              </button>
            </div>
          </div>
        )}

        {/* =================================================================
            TAB 6: MEDIA GALLERY
            ================================================================= */}
        {activeTab === 6 && (
          <div className="space-y-6 max-w-4xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Media Gallery &amp; Screenshots</h3>
                <p className="text-xs text-slate-400">
                  Interactive image showcase rendered on individual service pages with lightbox viewer
                </p>
              </div>

              <label className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all cursor-pointer shadow-md shadow-blue-600/30">
                <Upload className="w-3.5 h-3.5" />
                <span>{isUploadingMedia ? 'Uploading...' : 'Upload Images'}</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFilesUpload}
                  className="hidden"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mediaItems.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl bg-slate-800 border border-slate-700 overflow-hidden space-y-2.5 p-3 flex flex-col justify-between"
                >
                  <div className="aspect-video rounded-lg overflow-hidden bg-slate-900 border border-slate-700/50 relative group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.url}
                      alt={item.title || 'Service preview'}
                      className="w-full h-full object-cover"
                    />
                    {item.isPrimary && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-blue-600 text-white text-[10px] font-bold uppercase">
                        Primary Cover
                      </span>
                    )}
                  </div>

                  <input
                    type="text"
                    value={item.title || ''}
                    onChange={(e) => {
                      const copy = [...mediaItems];
                      copy[idx].title = e.target.value;
                      setMediaItems(copy);
                    }}
                    placeholder="Image Caption / Title"
                    className="w-full px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:border-blue-500 focus:outline-hidden"
                  />

                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        const copy = mediaItems.map((m, i) => ({
                          ...m,
                          isPrimary: i === idx,
                        }));
                        setMediaItems(copy);
                      }}
                      className={`text-[11px] font-semibold ${
                        item.isPrimary ? 'text-blue-400' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {item.isPrimary ? '★ Primary Cover' : 'Set as Primary'}
                    </button>

                    <button
                      type="button"
                      onClick={() => setMediaItems(mediaItems.filter((_, i) => i !== idx))}
                      className="text-slate-400 hover:text-rose-400 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}

              {mediaItems.length === 0 && (
                <div className="sm:col-span-2 lg:col-span-3 text-center py-12 text-slate-500 text-xs">
                  No images uploaded. Click &quot;Upload Images&quot; above.
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                disabled={isSavingSection}
                onClick={() => handleSaveSection('media')}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all flex items-center gap-2"
              >
                <Save className="w-3.5 h-3.5 text-blue-400" />
                <span>Save Media Tab Only</span>
              </button>
            </div>
          </div>
        )}

        {/* =================================================================
            TAB 7: FAQS
            ================================================================= */}
        {activeTab === 7 && (
          <div className="space-y-6 max-w-4xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Service-Specific FAQs</h3>
                <p className="text-xs text-slate-400">
                  Questions and answers addressing pricing, timelines, tech stacks, and guarantees
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setFaqs([
                    ...faqs,
                    {
                      question: 'What is the estimated delivery timeline?',
                      answer: 'Timeline depends on architectural scope and sprint cycles.',
                      displayOrder: faqs.length + 1,
                    },
                  ])
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add FAQ</span>
              </button>
            </div>

            <div className="space-y-3">
              {faqs.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-mono font-bold text-cyan-400">
                      FAQ #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => setFaqs(faqs.filter((_, i) => i !== idx))}
                      className="text-slate-400 hover:text-rose-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <input
                    type="text"
                    value={item.question}
                    onChange={(e) => {
                      const copy = [...faqs];
                      copy[idx].question = e.target.value;
                      setFaqs(copy);
                    }}
                    placeholder="Question (e.g. Do you sign non-disclosure agreements?)"
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:border-cyan-500 focus:outline-hidden"
                  />

                  <textarea
                    rows={2}
                    value={item.answer}
                    onChange={(e) => {
                      const copy = [...faqs];
                      copy[idx].answer = e.target.value;
                      setFaqs(copy);
                    }}
                    placeholder="Clear, authoritative answer..."
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:border-cyan-500 focus:outline-hidden"
                  />
                </div>
              ))}

              {faqs.length === 0 && (
                <div className="text-center py-8 text-slate-500 text-xs">
                  No FAQs configured yet. Click &quot;Add FAQ&quot; above.
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                disabled={isSavingSection}
                onClick={() => handleSaveSection('faqs')}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all flex items-center gap-2"
              >
                <Save className="w-3.5 h-3.5 text-cyan-400" />
                <span>Save FAQs Tab Only</span>
              </button>
            </div>
          </div>
        )}

        {/* =================================================================
            TAB 8: ORDERING, VISIBILITY & SEO
            ================================================================= */}
        {activeTab === 8 && (
          <div className="space-y-6 max-w-4xl">
            {/* Section A: Multi-Context Placements */}
            <div>
              <h3 className="text-sm font-bold text-white mb-1">
                Multi-Context Visibility Toggles
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Control where this service appears across the public website
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showOnServicesPage}
                    onChange={(e) => setShowOnServicesPage(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-0 cursor-pointer"
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Show on /services Showcase
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Renders in the main public services catalog
                    </span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showOnHomepage}
                    onChange={(e) => setShowOnHomepage(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-0 cursor-pointer"
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Show on Homepage Section 05
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Featured in the homepage client services showcase
                    </span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showInNavbar}
                    onChange={(e) => setShowInNavbar(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-0 cursor-pointer"
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Show in Header Navigation Menu
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Listed dynamically inside &quot;Services&quot; header dropdown
                    </span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-0 cursor-pointer"
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Featured Bento Spotlight
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Receives high-prominence 2-column spotlight span
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Section B: Display Sequence Priorities */}
            <div>
              <h3 className="text-sm font-bold text-white mb-1">
                Display Sequence Priorities (Lowest number = #1 Top Priority)
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Explicit ranking orders per placement context
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Services Page Order
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={servicesPageOrder}
                    onChange={(e) => setServicesPageOrder(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-mono text-white text-center"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Homepage Order
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={homepageOrder}
                    onChange={(e) => setHomepageOrder(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-mono text-white text-center"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Navbar Order
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={navbarOrder}
                    onChange={(e) => setNavbarOrder(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-mono text-white text-center"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Featured Order
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={featuredOrder}
                    onChange={(e) => setFeaturedOrder(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-mono text-white text-center"
                  />
                </div>
              </div>
            </div>

            {/* Section C: SEO Metadata */}
            <div className="space-y-4 pt-2 border-t border-slate-800">
              <h3 className="text-sm font-bold text-white">Search Engine Optimization (SEO)</h3>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">
                  Custom SEO Title Tag
                </label>
                <input
                  type="text"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  placeholder="e.g. Web Development Services | MRM InfoTech"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">
                  Meta Description (Recommended: 140-155 characters)
                </label>
                <textarea
                  rows={2}
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  placeholder="Concise, conversion-optimized meta description for search engine results..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-hidden"
                />
                <span className="text-[11px] font-mono text-slate-500 block mt-1">
                  Length: {seoDescription.length} characters
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">
                    Meta Keywords
                  </label>
                  <input
                    type="text"
                    value={seoKeywords}
                    onChange={(e) => setSeoKeywords(e.target.value)}
                    placeholder="e.g. Web Development, Next.js, NestJS, Bangladesh"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">
                    Canonical URL Override
                  </label>
                  <input
                    type="text"
                    value={canonicalUrl}
                    onChange={(e) => setCanonicalUrl(e.target.value)}
                    placeholder="https://mrminfotech.com/services/..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm font-mono focus:border-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                disabled={isSavingSection}
                onClick={() => handleSaveSection('seo')}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all flex items-center gap-2"
              >
                <Save className="w-3.5 h-3.5 text-blue-400" />
                <span>Save Ordering &amp; SEO Tab Only</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
