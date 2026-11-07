/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Save,
  X,
  Upload,
  Plus,
  Trash2,
  Eye,
  Star,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  Layers,
  Sparkles,
  ShieldCheck,
  Zap,
  Globe,
  Smartphone,
  ChevronDown,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import {
  createAdminProduct,
  updateAdminProduct,
  updateAdminProductSection,
  uploadMediaFiles,
} from '@/lib/api/admin';
import type {
  ProductRecord,
  ProductCategory,
  ProductMediaItem,
  ProductFeatureItem,
  ProductBenefitItem,
  ProductLinkItem,
  ProductDemoItem,
  ProductFaqItem,
  ProductStatus,
  LaunchStage,
  ProductSection,
} from '@/types/product.types';

interface ProductBuilderFormProps {
  initialData?: ProductRecord | null;
  categories: ProductCategory[];
  onSaved: () => void;
  onCancel: () => void;
  onPreview: (product: ProductRecord) => void;
}

export function ProductBuilderForm({
  initialData,
  categories,
  onSaved,
  onCancel,
  onPreview,
}: ProductBuilderFormProps) {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [productId, setProductId] = useState<string | undefined>(initialData?.id);
  const [isNew, setIsNew] = useState<boolean>(!initialData?.id);

  // Status feedback
  const [isSaving, setIsSaving] = useState(false);
  const [isSavingSection, setIsSavingSection] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Tab 1: Basic Info
  const [title, setTitle] = useState(initialData?.title || initialData?.name || '');
  const [slug, setSlug] = useState(
    (initialData?.slug || '')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-')
  );
  const [tagline, setTagline] = useState(initialData?.tagline || '');
  const [shortDescription, setShortDescription] = useState(initialData?.shortDescription || initialData?.summary || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [targetAudience, setTargetAudience] = useState(initialData?.targetAudience || '');
  const [problemsAddressed, setProblemsAddressed] = useState(initialData?.problemsAddressed || '');
  const [mainPurpose, setMainPurpose] = useState(initialData?.mainPurpose || '');
  const [categoryId, setCategoryId] = useState(initialData?.categoryId || '');
  const [productType, setProductType] = useState(initialData?.productType || 'SaaS');
  const [stage, setStage] = useState<LaunchStage>((initialData?.stage as LaunchStage) || 'LIVE');
  const [brandColor, setBrandColor] = useState(initialData?.brandColor || '#2563EB');
  const [version, setVersion] = useState(initialData?.version || '1.0.0');

  // Tab 2: Media Items
  const [mediaItems, setMediaItems] = useState<ProductMediaItem[]>(
    initialData?.mediaItems && initialData.mediaItems.length > 0
      ? initialData.mediaItems
      : (initialData?.images || []).map((url, idx) => ({
          url,
          mediaType: 'SCREENSHOT',
          title: `Screenshot ${idx + 1}`,
          isPrimary: idx === 0,
          displayOrder: idx + 1,
        }))
  );
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Tab 3: Features
  const [richFeatures, setRichFeatures] = useState<ProductFeatureItem[]>(
    initialData?.richFeatures || initialData?.features || []
  );

  // Tab 4: Benefits
  const [benefits, setBenefits] = useState<ProductBenefitItem[]>(initialData?.benefits || []);

  // Tab 5: Links
  const [links, setLinks] = useState<ProductLinkItem[]>(
    initialData?.links && initialData.links.length > 0
      ? initialData.links
      : [
          {
            title: 'Official Website',
            url: initialData?.liveUrl || '',
            linkType: 'OFFICIAL_WEBSITE',
            openInNewTab: true,
            isVisible: Boolean(initialData?.liveUrl),
            displayOrder: 1,
          },
        ]
  );

  // Tab 6: Demonstrations
  const [demonstrations, setDemonstrations] = useState<ProductDemoItem[]>(
    initialData?.demonstrations || []
  );

  // Tab 7: FAQs
  const [productFaqs, setProductFaqs] = useState<ProductFaqItem[]>(
    initialData?.productFaqs || initialData?.faqs || []
  );

  // Tab 8: Visibility & SEO
  const [status, setStatus] = useState<ProductStatus>((initialData?.status as ProductStatus) || 'PUBLISHED');
  const [isFeatured, setIsFeatured] = useState<boolean>(Boolean(initialData?.isFeatured));
  const [showOnHomepage, setShowOnHomepage] = useState<boolean>(initialData?.showOnHomepage ?? true);
  const [showOnProductsPage, setShowOnProductsPage] = useState<boolean>(initialData?.showOnProductsPage ?? true);
  const [showInNavDropdown, setShowInNavDropdown] = useState<boolean>(initialData?.showInNavDropdown ?? true);
  const [allowPublicDetail, setAllowPublicDetail] = useState<boolean>(initialData?.allowPublicDetail ?? true);
  const [enableGallery, setEnableGallery] = useState<boolean>(initialData?.enableGallery ?? true);
  const [enableCaseStudies, setEnableCaseStudies] = useState<boolean>(initialData?.enableCaseStudies ?? true);
  const [enableDemos, setEnableDemos] = useState<boolean>(initialData?.enableDemos ?? true);
  const [enableFaq, setEnableFaq] = useState<boolean>(initialData?.enableFaq ?? true);

  const [displayOrder, setDisplayOrder] = useState<number>(initialData?.displayOrder ?? 1);
  const [homepageOrder, setHomepageOrder] = useState<number>(initialData?.homepageOrder ?? 1);
  const [navOrder, setNavOrder] = useState<number>(initialData?.navOrder ?? 1);
  const [featuredOrder, setFeaturedOrder] = useState<number>(initialData?.featuredOrder ?? 1);

  const [seoTitle, setSeoTitle] = useState(initialData?.seoTitle || initialData?.seo?.seoTitle || '');
  const [seoDescription, setSeoDescription] = useState(initialData?.seoDescription || initialData?.seo?.seoDescription || '');
  const [seoKeywords, setSeoKeywords] = useState(initialData?.seoKeywords || initialData?.seo?.seoKeywords || '');
  const [canonicalUrl, setCanonicalUrl] = useState(initialData?.canonicalUrl || initialData?.seo?.canonicalUrl || '');
  const [ogTitle, setOgTitle] = useState(initialData?.ogTitle || initialData?.seo?.ogTitle || '');
  const [ogDescription, setOgDescription] = useState(initialData?.ogDescription || initialData?.seo?.ogDescription || '');
  const [noIndex, setNoIndex] = useState<boolean>(Boolean(initialData?.noIndex || initialData?.seo?.noIndex));

  // Auto-slug generator on title change for new records
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (isNew && !slug) {
      const generated = val
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setSlug(generated);
    }
  };

  const notifySuccess = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  // Compile full product object for preview or saving
  const getCurrentSnapshot = (): ProductRecord => ({
    id: productId || 'temp-id',
    slug,
    title,
    tagline,
    shortDescription,
    description,
    targetAudience,
    problemsAddressed,
    mainPurpose,
    productType,
    stage,
    status,
    version,
    categoryId: categoryId || undefined,
    categoryName: categories.find((c) => c.id === categoryId)?.name,
    brandColor,
    images: mediaItems.map((m) => m.url),
    mediaItems,
    richFeatures,
    features: richFeatures,
    benefits,
    links,
    demonstrations,
    productFaqs,
    faqs: productFaqs,
    isFeatured,
    showOnHomepage,
    showOnProductsPage,
    showInNavDropdown,
    allowPublicDetail,
    enableGallery,
    enableCaseStudies,
    enableDemos,
    enableFaq,
    displayOrder,
    homepageOrder,
    navOrder,
    featuredOrder,
    seoTitle,
    seoDescription,
    seoKeywords,
    canonicalUrl,
    ogTitle,
    ogDescription,
    noIndex,
  });

  // Strict sub-item sanitizers ensuring zero unwhitelisted properties reach NestJS API
  const sanitizeMedia = (items?: ProductMediaItem[]) => {
    if (!Array.isArray(items)) return [];
    return items.map((m, idx) => ({
      ...(m.id && typeof m.id === 'string' && m.id.length >= 32 ? { id: m.id } : {}),
      url: m.url,
      mediaType: m.mediaType || 'SCREENSHOT',
      title: m.title || `Screenshot ${idx + 1}`,
      caption: m.caption || '',
      altText: m.altText || '',
      isPrimary: Boolean(m.isPrimary),
      displayOrder: m.displayOrder ?? idx + 1,
    }));
  };

  const sanitizeFeatures = (items?: ProductFeatureItem[]) => {
    if (!Array.isArray(items)) return [];
    return items.map((f, idx) => ({
      ...(f.id && typeof f.id === 'string' && f.id.length >= 32 ? { id: f.id } : {}),
      title: f.title,
      shortDescription: f.shortDescription || (f as any).description || '',
      detailedDescription: f.detailedDescription || '',
      icon: f.icon || '',
      categoryName: f.categoryName || 'Core Features',
      isFeatured: Boolean(f.isFeatured),
      displayOrder: f.displayOrder ?? idx + 1,
    }));
  };

  const sanitizeBenefits = (items?: ProductBenefitItem[]) => {
    if (!Array.isArray(items)) return [];
    return items.map((b, idx) => ({
      ...(b.id && typeof b.id === 'string' && b.id.length >= 32 ? { id: b.id } : {}),
      title: b.title,
      description: b.description || (b as any).shortDescription || '',
      icon: b.icon || '',
      displayOrder: b.displayOrder ?? idx + 1,
    }));
  };

  const sanitizeLinks = (items?: ProductLinkItem[]) => {
    if (!Array.isArray(items)) return [];
    return items.map((l, idx) => ({
      ...(l.id && typeof l.id === 'string' && l.id.length >= 32 ? { id: l.id } : {}),
      title: l.title,
      url: l.url,
      linkType: l.linkType || 'OFFICIAL_WEBSITE',
      icon: l.icon || '',
      openInNewTab: l.openInNewTab ?? true,
      isVisible: l.isVisible ?? true,
      displayOrder: l.displayOrder ?? idx + 1,
    }));
  };

  const sanitizeDemos = (items?: ProductDemoItem[]) => {
    if (!Array.isArray(items)) return [];
    return items.map((d, idx) => ({
      ...(d.id && typeof d.id === 'string' && d.id.length >= 32 ? { id: d.id } : {}),
      title: d.title,
      description: d.description || '',
      demoType: d.demoType || 'DASHBOARD',
      mediaUrl: d.mediaUrl || '',
      caption: d.caption || '',
      displayOrder: d.displayOrder ?? idx + 1,
    }));
  };

  const sanitizeFaqs = (items?: ProductFaqItem[]) => {
    if (!Array.isArray(items)) return [];
    return items.map((fq, idx) => ({
      ...(fq.id && typeof fq.id === 'string' && fq.id.length >= 32 ? { id: fq.id } : {}),
      question: fq.question,
      answer: fq.answer,
      displayOrder: fq.displayOrder ?? idx + 1,
    }));
  };

  const sanitizeForApi = (snapshot: ProductRecord) => {
    const cleanSlug = (snapshot.slug || slug || '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    return {
      title: snapshot.title,
      slug: cleanSlug,
      tagline: snapshot.tagline || '',
      shortDescription: snapshot.shortDescription || '',
      description: snapshot.description || '',
      targetAudience: snapshot.targetAudience || '',
      problemsAddressed: snapshot.problemsAddressed || '',
      mainPurpose: snapshot.mainPurpose || '',
      productType: snapshot.productType || 'SaaS',
      stage: snapshot.stage || 'LIVE',
      status: snapshot.status || 'PUBLISHED',
      version: snapshot.version || '1.0.0',
      categoryId: snapshot.categoryId || undefined,
      brandColor: snapshot.brandColor || '#2563EB',
      isFeatured: Boolean(snapshot.isFeatured),
      showOnHomepage: snapshot.showOnHomepage ?? true,
      showOnProductsPage: snapshot.showOnProductsPage ?? true,
      showInNavDropdown: snapshot.showInNavDropdown ?? true,
      allowPublicDetail: snapshot.allowPublicDetail ?? true,
      enableGallery: snapshot.enableGallery ?? true,
      enableCaseStudies: snapshot.enableCaseStudies ?? true,
      enableDemos: snapshot.enableDemos ?? true,
      enableFaq: snapshot.enableFaq ?? true,
      displayOrder: Number(snapshot.displayOrder ?? 1),
      homepageOrder: Number(snapshot.homepageOrder ?? 1),
      navOrder: Number(snapshot.navOrder ?? 1),
      featuredOrder: Number(snapshot.featuredOrder ?? 1),
      seoTitle: snapshot.seoTitle || undefined,
      seoDescription: snapshot.seoDescription || undefined,
      seoKeywords: snapshot.seoKeywords || undefined,
      canonicalUrl: snapshot.canonicalUrl || undefined,
      ogTitle: snapshot.ogTitle || undefined,
      ogDescription: snapshot.ogDescription || undefined,
      noIndex: Boolean(snapshot.noIndex),
      mediaItems: sanitizeMedia(snapshot.mediaItems),
      richFeatures: sanitizeFeatures(snapshot.richFeatures),
      benefits: sanitizeBenefits(snapshot.benefits),
      links: sanitizeLinks(snapshot.links),
      demonstrations: sanitizeDemos(snapshot.demonstrations),
      productFaqs: sanitizeFaqs(snapshot.productFaqs),
    };
  };

  // Architectural Adjustment 2: Independent Section / Tab Save
  const handleSaveSection = async (section: ProductSection) => {
    const cleanSlug = slug
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    if (!title.trim() || !cleanSlug) {
      setErrorMsg('Product Title and Slug are required before saving any section.');
      return;
    }

    setIsSavingSection(true);
    setErrorMsg(null);

    try {
      // If product doesn't exist yet, create it as draft first
      let currentId = productId;
      if (!currentId) {
        const created = await createAdminProduct({
          title,
          slug: cleanSlug,
          tagline,
          shortDescription,
          description,
          productType,
          stage,
          status: 'DRAFT',
          categoryId: categoryId || undefined,
        });
        currentId = created.id;
        setProductId(created.id);
        setIsNew(false);
      }

      let sectionPayload: Record<string, unknown> = {};
      if (section === 'basic') {
        sectionPayload = {
          title,
          slug: cleanSlug,
          tagline,
          shortDescription,
          description,
          targetAudience,
          problemsAddressed,
          mainPurpose,
          productType,
          stage,
          brandColor,
          version,
          categoryId: categoryId || undefined,
        };
      } else if (section === 'media') {
        sectionPayload = { mediaItems: sanitizeMedia(mediaItems) };
      } else if (section === 'features') {
        sectionPayload = { richFeatures: sanitizeFeatures(richFeatures) };
      } else if (section === 'benefits') {
        sectionPayload = { benefits: sanitizeBenefits(benefits) };
      } else if (section === 'links') {
        sectionPayload = { links: sanitizeLinks(links) };
      } else if (section === 'demonstrations') {
        sectionPayload = { demonstrations: sanitizeDemos(demonstrations) };
      } else if (section === 'faqs') {
        sectionPayload = { productFaqs: sanitizeFaqs(productFaqs) };
      } else if (section === 'visibility') {
        sectionPayload = {
          status,
          isFeatured,
          showOnHomepage,
          showOnProductsPage,
          showInNavDropdown,
          allowPublicDetail,
          enableGallery,
          enableCaseStudies,
          enableDemos,
          enableFaq,
          displayOrder,
          homepageOrder,
          navOrder,
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

      await updateAdminProductSection(currentId, section, sectionPayload);
      notifySuccess(`Saved ${section.toUpperCase()} tab successfully!`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : `Failed to save ${section} tab`;
      setErrorMsg(msg);
    } finally {
      setIsSavingSection(false);
    }
  };

  // Full Save All
  const handleSaveAll = async () => {
    if (!title.trim() || !slug.trim()) {
      setErrorMsg('Product Name and URL Slug are mandatory.');
      setActiveTab(1);
      return;
    }

    setIsSaving(true);
    setErrorMsg(null);

    const snapshot = getCurrentSnapshot();
    const payload = sanitizeForApi(snapshot);

    try {
      if (productId) {
        await updateAdminProduct(productId, payload);
      } else {
        const created = await createAdminProduct(payload);
        setProductId(created.id);
      }
      notifySuccess('Complete product saved successfully!');
      onSaved();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save product';
      setErrorMsg(msg);
    } finally {
      setIsSaving(false);
    }
  };

  // Multi-image upload
  const handleFilesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploadingMedia(true);
    setErrorMsg(null);
    try {
      const uploadedUrls = await uploadMediaFiles(Array.from(files));
      const newItems: ProductMediaItem[] = uploadedUrls.map((url, idx) => ({
        url,
        mediaType: 'SCREENSHOT',
        title: `Screenshot ${mediaItems.length + idx + 1}`,
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

  const tabs = [
    { id: 1, name: 'Basic Info', section: 'basic' as ProductSection },
    { id: 2, name: 'Media Gallery', section: 'media' as ProductSection },
    { id: 3, name: 'Features', section: 'features' as ProductSection },
    { id: 4, name: 'Benefits', section: 'benefits' as ProductSection },
    { id: 5, name: 'Links & Demos', section: 'links' as ProductSection },
    { id: 6, name: 'Walkthroughs', section: 'demonstrations' as ProductSection },
    { id: 7, name: 'FAQs & Cases', section: 'faqs' as ProductSection },
    { id: 8, name: 'Ordering & SEO', section: 'seo' as ProductSection },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden mb-10 animate-in fade-in duration-200">
      {/* Builder Header Bar */}
      <div className="p-5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-slate-900/90 backdrop-blur-md sticky top-0 z-20">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {isNew ? 'Create New Product' : 'Product Builder & Editor'}
            </span>
            <span className="text-xs text-slate-500">· 8-Tab Modular CMS</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">
            {title ? title : 'Untitled Product'}
          </h2>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => onPreview(getCurrentSnapshot())}
            className="px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-800 text-slate-300 hover:text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live Preview</span>
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-3.5 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 text-xs font-bold transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSaveAll}
            disabled={isSaving}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/30 inline-flex items-center gap-1.5 transition-all disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? 'Saving All...' : 'Save Product'}</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {saveSuccessMsg && (
        <div className="mx-6 mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}
      {errorMsg && (
        <div className="mx-6 mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* 8 Tabs Navigation Strip */}
      <div className="px-6 pt-4 border-b border-slate-800 flex gap-2 overflow-x-auto bg-slate-950/40">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-xs font-bold whitespace-nowrap rounded-t-xl transition-all border-b-2 ${
              activeTab === tab.id
                ? 'text-blue-400 border-blue-500 bg-slate-800/60'
                : 'text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-800/30'
            }`}
          >
            {tab.id}. {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Panels Content */}
      <div className="p-6">
        {/* ==================== TAB 1: BASIC INFO ==================== */}
        {activeTab === 1 && (
          <div className="space-y-6 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. EduManage BD"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    URL Slug * (auto-generated)
                  </label>
                  <span className="text-[11px] text-blue-400 font-mono">
                    /products/{slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'product-slug'}
                  </span>
                </div>
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
                  onBlur={() =>
                    setSlug(
                      slug
                        .toLowerCase()
                        .trim()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/^-+|-+$/g, '')
                    )
                  }
                  placeholder="e.g. edumanage-bd"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm font-mono focus:border-blue-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Product Tagline / Punchline
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="e.g. Simplifying Education Management Through Modern Technology."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Product Category
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-hidden"
                >
                  <option value="">Select Category...</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Product Type
                </label>
                <select
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-hidden"
                >
                  <option value="SaaS">SaaS Platform</option>
                  <option value="ERP">Institutional ERP</option>
                  <option value="CRM">Enterprise CRM</option>
                  <option value="Healthcare Software">Healthcare Software</option>
                  <option value="Education Software">Education Software</option>
                  <option value="Website Platform">Website Platform</option>
                  <option value="Custom Software">Custom Enterprise Software</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Launch Stage
                </label>
                <select
                  value={stage}
                  onChange={(e) => setStage(e.target.value as LaunchStage)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-hidden"
                >
                  <option value="LIVE">LIVE</option>
                  <option value="BETA">BETA</option>
                  <option value="COMING_SOON">COMING SOON</option>
                  <option value="PLANNED">PLANNED</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Short Description (Cards & Previews)
              </label>
              <textarea
                rows={2}
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="Crisp 1-2 sentence elevator summary..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Full Description (Detailed Overview)
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Comprehensive technical and organizational overview..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:border-blue-500 focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Target Audience
                </label>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="e.g. Schools, Colleges, Universities"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:border-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Problems Addressed
                </label>
                <input
                  type="text"
                  value={problemsAddressed}
                  onChange={(e) => setProblemsAddressed(e.target.value)}
                  placeholder="e.g. Manual paper records, cash leakage"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:border-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Brand Accent Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={brandColor}
                    onChange={(e) => setBrandColor(e.target.value)}
                    className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={brandColor}
                    onChange={(e) => setBrandColor(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Independent Save Button for Tab 1 */}
            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => handleSaveSection('basic')}
                disabled={isSavingSection}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-400 border border-blue-500/30 text-xs font-bold flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Basic Info Section</span>
              </button>
            </div>
          </div>
        )}

        {/* ==================== TAB 2: MEDIA GALLERY ==================== */}
        {activeTab === 2 && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-white">Product Screenshots & Mockups</h3>
                <p className="text-xs text-slate-400">
                  Upload multiple high-resolution interface images. Choose one as Primary Cover.
                </p>
              </div>

              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFilesUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploadingMedia}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold inline-flex items-center gap-2 shadow-sm"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{isUploadingMedia ? 'Uploading...' : 'Upload Images'}</span>
                </button>
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {mediaItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-800 border border-slate-700 space-y-3 relative group"
                >
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-black/40">
                    <img src={item.url} alt={item.title || 'Product'} className="w-full h-full object-cover" />
                    {item.isPrimary && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-blue-600 text-white text-[10px] font-bold flex items-center gap-1 shadow-md">
                        <Star className="w-3 h-3 fill-white" />
                        <span>Cover</span>
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <input
                      type="text"
                      value={item.title || ''}
                      onChange={(e) => {
                        const copy = [...mediaItems];
                        copy[idx].title = e.target.value;
                        setMediaItems(copy);
                      }}
                      placeholder="Image Caption / Title"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                    />

                    <div className="flex items-center justify-between text-xs pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          const copy = mediaItems.map((m, mIdx) => ({
                            ...m,
                            isPrimary: mIdx === idx,
                          }));
                          setMediaItems(copy);
                        }}
                        className={`text-[11px] font-bold flex items-center gap-1 ${
                          item.isPrimary ? 'text-blue-400' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <Star className={`w-3.5 h-3.5 ${item.isPrimary ? 'fill-blue-400' : ''}`} />
                        <span>{item.isPrimary ? 'Primary Cover' : 'Set as Cover'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setMediaItems(mediaItems.filter((_, mIdx) => mIdx !== idx))}
                        className="text-red-400 hover:text-red-300 p-1"
                        title="Delete image"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {mediaItems.length === 0 && (
              <div className="text-center py-12 border-2 border-dashed border-slate-800 rounded-2xl">
                <Upload className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="text-xs text-slate-400">No images uploaded yet. Click above to upload.</p>
              </div>
            )}

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => handleSaveSection('media')}
                disabled={isSavingSection}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-400 border border-blue-500/30 text-xs font-bold flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Media Section</span>
              </button>
            </div>
          </div>
        )}

        {/* ==================== TAB 3: FEATURES ==================== */}
        {activeTab === 3 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Product Capabilities & Modules</h3>
                <p className="text-xs text-slate-400">
                  Group features into categories (Core, Automation, Security, etc.).
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setRichFeatures([
                    ...richFeatures,
                    {
                      title: '',
                      shortDescription: '',
                      categoryName: 'Core Features',
                      isFeatured: false,
                      displayOrder: richFeatures.length + 1,
                    },
                  ])
                }
                className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold inline-flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Feature</span>
              </button>
            </div>

            <div className="space-y-3">
              {richFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-800 border border-slate-700 space-y-3"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                      type="text"
                      value={feat.title}
                      onChange={(e) => {
                        const copy = [...richFeatures];
                        copy[idx].title = e.target.value;
                        setRichFeatures(copy);
                      }}
                      placeholder="Feature Title *"
                      className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-bold"
                    />

                    <input
                      type="text"
                      value={feat.categoryName}
                      onChange={(e) => {
                        const copy = [...richFeatures];
                        copy[idx].categoryName = e.target.value;
                        setRichFeatures(copy);
                      }}
                      placeholder="Category (e.g. Core Features, Security)"
                      className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                    />

                    <div className="flex items-center justify-between gap-2">
                      <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={feat.isFeatured}
                          onChange={(e) => {
                            const copy = [...richFeatures];
                            copy[idx].isFeatured = e.target.checked;
                            setRichFeatures(copy);
                          }}
                          className="rounded border-slate-700 text-blue-600"
                        />
                        <span>Featured Pill</span>
                      </label>

                      <button
                        type="button"
                        onClick={() => setRichFeatures(richFeatures.filter((_, fIdx) => fIdx !== idx))}
                        className="text-red-400 hover:text-red-300 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <textarea
                    rows={2}
                    value={feat.shortDescription}
                    onChange={(e) => {
                      const copy = [...richFeatures];
                      copy[idx].shortDescription = e.target.value;
                      setRichFeatures(copy);
                    }}
                    placeholder="Short description of this capability..."
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                  />
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => handleSaveSection('features')}
                disabled={isSavingSection}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-400 border border-blue-500/30 text-xs font-bold flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Features Section</span>
              </button>
            </div>
          </div>
        )}

        {/* ==================== TAB 4: BENEFITS ==================== */}
        {activeTab === 4 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Business & Practical Benefits</h3>
                <p className="text-xs text-slate-400">
                  Value proposition items explaining tangible organizational gains.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setBenefits([
                    ...benefits,
                    {
                      title: '',
                      description: '',
                      displayOrder: benefits.length + 1,
                    },
                  ])
                }
                className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold inline-flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Benefit</span>
              </button>
            </div>

            <div className="space-y-3">
              {benefits.map((b, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-800 border border-slate-700 space-y-2 relative"
                >
                  <div className="flex items-center justify-between gap-3">
                    <input
                      type="text"
                      value={b.title}
                      onChange={(e) => {
                        const copy = [...benefits];
                        copy[idx].title = e.target.value;
                        setBenefits(copy);
                      }}
                      placeholder="Benefit Title (e.g. Zero Cash Leakage) *"
                      className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-bold"
                    />

                    <button
                      type="button"
                      onClick={() => setBenefits(benefits.filter((_, bIdx) => bIdx !== idx))}
                      className="text-red-400 hover:text-red-300 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <textarea
                    rows={2}
                    value={b.description}
                    onChange={(e) => {
                      const copy = [...benefits];
                      copy[idx].description = e.target.value;
                      setBenefits(copy);
                    }}
                    placeholder="Clear explanation of the practical advantage..."
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                  />
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => handleSaveSection('benefits')}
                disabled={isSavingSection}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-400 border border-blue-500/30 text-xs font-bold flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Benefits Section</span>
              </button>
            </div>
          </div>
        )}

        {/* ==================== TAB 5: LINKS & DEMOS ==================== */}
        {activeTab === 5 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Product Links & External Resources</h3>
                <p className="text-xs text-slate-400">
                  Official website, live demo, request demo, docs, or app store links.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setLinks([
                    ...links,
                    {
                      title: '',
                      url: '',
                      linkType: 'OFFICIAL_WEBSITE',
                      openInNewTab: true,
                      isVisible: true,
                      displayOrder: links.length + 1,
                    },
                  ])
                }
                className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold inline-flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Link</span>
              </button>
            </div>

            <div className="space-y-3">
              {links.map((link, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-800 border border-slate-700 grid grid-cols-1 sm:grid-cols-4 gap-3 items-center"
                >
                  <input
                    type="text"
                    value={link.title}
                    onChange={(e) => {
                      const copy = [...links];
                      copy[idx].title = e.target.value;
                      setLinks(copy);
                    }}
                    placeholder="Link Label *"
                    className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-bold"
                  />

                  <input
                    type="url"
                    value={link.url}
                    onChange={(e) => {
                      const copy = [...links];
                      copy[idx].url = e.target.value;
                      setLinks(copy);
                    }}
                    placeholder="https://... *"
                    className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-mono"
                  />

                  <select
                    value={link.linkType}
                    onChange={(e) => {
                      const copy = [...links];
                      copy[idx].linkType = e.target.value as any;
                      setLinks(copy);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                  >
                    <option value="OFFICIAL_WEBSITE">Official Website</option>
                    <option value="LIVE_DEMO">Live Demo</option>
                    <option value="REQUEST_DEMO">Request a Demo</option>
                    <option value="DOCUMENTATION">Documentation</option>
                    <option value="LOGIN_PORTAL">Login Portal</option>
                    <option value="ANDROID_APP">Android App</option>
                    <option value="IOS_APP">iOS App</option>
                    <option value="GITHUB_REPO">GitHub Repository</option>
                    <option value="CUSTOM">Custom Link</option>
                  </select>

                  <div className="flex items-center justify-between gap-2">
                    <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={link.isVisible}
                        onChange={(e) => {
                          const copy = [...links];
                          copy[idx].isVisible = e.target.checked;
                          setLinks(copy);
                        }}
                        className="rounded border-slate-700 text-blue-600"
                      />
                      <span>Visible</span>
                    </label>

                    <button
                      type="button"
                      onClick={() => setLinks(links.filter((_, lIdx) => lIdx !== idx))}
                      className="text-red-400 hover:text-red-300 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => handleSaveSection('links')}
                disabled={isSavingSection}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-400 border border-blue-500/30 text-xs font-bold flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Links Section</span>
              </button>
            </div>
          </div>
        )}

        {/* ==================== TAB 6: WALKTHROUGHS ==================== */}
        {activeTab === 6 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Demonstrations & Walkthroughs</h3>
                <p className="text-xs text-slate-400">
                  Interactive UI showcases or video walkthrough embeds.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setDemonstrations([
                    ...demonstrations,
                    {
                      title: '',
                      description: '',
                      demoType: 'DASHBOARD',
                      mediaUrl: '',
                      displayOrder: demonstrations.length + 1,
                    },
                  ])
                }
                className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold inline-flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Walkthrough</span>
              </button>
            </div>

            <div className="space-y-4">
              {demonstrations.map((demo, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-800 border border-slate-700 space-y-3"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                      type="text"
                      value={demo.title}
                      onChange={(e) => {
                        const copy = [...demonstrations];
                        copy[idx].title = e.target.value;
                        setDemonstrations(copy);
                      }}
                      placeholder="Walkthrough Title *"
                      className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-bold"
                    />

                    <select
                      value={demo.demoType}
                      onChange={(e) => {
                        const copy = [...demonstrations];
                        copy[idx].demoType = e.target.value;
                        setDemonstrations(copy);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                    >
                      <option value="DASHBOARD">Dashboard Overview</option>
                      <option value="INTERFACE">Interface Workflow</option>
                      <option value="MOBILE">Mobile Screen</option>
                      <option value="VIDEO">Video Embed</option>
                    </select>

                    <button
                      type="button"
                      onClick={() =>
                        setDemonstrations(demonstrations.filter((_, dIdx) => dIdx !== idx))
                      }
                      className="text-red-400 hover:text-red-300 self-center justify-self-end p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <input
                    type="url"
                    value={demo.mediaUrl}
                    onChange={(e) => {
                      const copy = [...demonstrations];
                      copy[idx].mediaUrl = e.target.value;
                      setDemonstrations(copy);
                    }}
                    placeholder="Image URL or Video Embed URL *"
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-mono"
                  />

                  <textarea
                    rows={2}
                    value={demo.description || ''}
                    onChange={(e) => {
                      const copy = [...demonstrations];
                      copy[idx].description = e.target.value;
                      setDemonstrations(copy);
                    }}
                    placeholder="Description of the workflow displayed..."
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                  />
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => handleSaveSection('demonstrations')}
                disabled={isSavingSection}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-400 border border-blue-500/30 text-xs font-bold flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Walkthroughs Section</span>
              </button>
            </div>
          </div>
        )}

        {/* ==================== TAB 7: FAQS & CASE STUDIES ==================== */}
        {activeTab === 7 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Product FAQs</h3>
                <p className="text-xs text-slate-400">
                  Address common questions specific to this product.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setProductFaqs([
                    ...productFaqs,
                    {
                      question: '',
                      answer: '',
                      displayOrder: productFaqs.length + 1,
                    },
                  ])
                }
                className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold inline-flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add FAQ Item</span>
              </button>
            </div>

            <div className="space-y-3">
              {productFaqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-800 border border-slate-700 space-y-2 relative"
                >
                  <div className="flex items-center justify-between gap-3">
                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) => {
                        const copy = [...productFaqs];
                        copy[idx].question = e.target.value;
                        setProductFaqs(copy);
                      }}
                      placeholder="Question *"
                      className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-bold"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setProductFaqs(productFaqs.filter((_, fIdx) => fIdx !== idx))
                      }
                      className="text-red-400 hover:text-red-300 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <textarea
                    rows={2}
                    value={faq.answer}
                    onChange={(e) => {
                      const copy = [...productFaqs];
                      copy[idx].answer = e.target.value;
                      setProductFaqs(copy);
                    }}
                    placeholder="Clear and detailed answer..."
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                  />
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => handleSaveSection('faqs')}
                disabled={isSavingSection}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-400 border border-blue-500/30 text-xs font-bold flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save FAQs Section</span>
              </button>
            </div>
          </div>
        )}

        {/* ==================== TAB 8: ORDERING & SEO ==================== */}
        {activeTab === 8 && (
          <div className="space-y-6 max-w-4xl">
            {/* Visibility & Status Section */}
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white">Status & Visibility Controls</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Publication Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as ProductStatus)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm font-bold focus:border-blue-500 focus:outline-hidden"
                  >
                    <option value="PUBLISHED">PUBLISHED (Visible to Public)</option>
                    <option value="DRAFT">DRAFT (Admin Only)</option>
                    <option value="ARCHIVED">ARCHIVED (Deactivated)</option>
                  </select>
                </div>

                <div className="flex flex-col justify-end space-y-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                      className="rounded border-slate-700 text-blue-600"
                    />
                    <span>Featured Product (Spotlight on Products page)</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showOnHomepage}
                      onChange={(e) => setShowOnHomepage(e.target.checked)}
                      className="rounded border-slate-700 text-blue-600"
                    />
                    <span>Show on Homepage Product Showcase</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showInNavDropdown}
                    onChange={(e) => setShowInNavDropdown(e.target.checked)}
                    className="rounded border-slate-700 text-blue-600"
                  />
                  <span>Navbar Dropdown</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showOnProductsPage}
                    onChange={(e) => setShowOnProductsPage(e.target.checked)}
                    className="rounded border-slate-700 text-blue-600"
                  />
                  <span>Products Catalog</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableGallery}
                    onChange={(e) => setEnableGallery(e.target.checked)}
                    className="rounded border-slate-700 text-blue-600"
                  />
                  <span>Enable Gallery</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableFaq}
                    onChange={(e) => setEnableFaq(e.target.checked)}
                    className="rounded border-slate-700 text-blue-600"
                  />
                  <span>Enable FAQs</span>
                </label>
              </div>
            </div>

            {/* Display Ordering Priorities */}
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white">Display Priority Numbers (Lower = Appears First)</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Products Page Priority
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Homepage Priority
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={homepageOrder}
                    onChange={(e) => setHomepageOrder(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Navbar Dropdown Priority
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={navOrder}
                    onChange={(e) => setNavOrder(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-bold"
                  />
                </div>
              </div>
            </div>

            {/* SEO Metadata */}
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white">Independent SEO Metadata</h3>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">SEO Meta Title</label>
                <input
                  type="text"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  placeholder="e.g. EduManage BD | Enterprise Education ERP"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Meta Description (Under 160 characters)
                </label>
                <textarea
                  rows={2}
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  placeholder="Descriptive summary for search engines..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Canonical URL (Optional)
                  </label>
                  <input
                    type="text"
                    value={canonicalUrl}
                    onChange={(e) => setCanonicalUrl(e.target.value)}
                    placeholder="https://mrminfotech.com/products/..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono"
                  />
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={noIndex}
                      onChange={(e) => setNoIndex(e.target.checked)}
                      className="rounded border-slate-700 text-red-500"
                    />
                    <span>No-Index (Hide from Google Search)</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => handleSaveSection('seo')}
                disabled={isSavingSection}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-400 border border-blue-500/30 text-xs font-bold flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Ordering & SEO Section</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
