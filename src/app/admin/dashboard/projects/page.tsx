'use client';

/* eslint-disable @next/next/no-img-element -- admin previews render arbitrary editor-supplied image URLs */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import type { PublicGalleryItem } from '@/types/public-content';
import {
  getAdminProjects,
  getAdminProjectById,
  createAdminProject,
  updateAdminProject,
  deleteAdminProject,
  uploadHeroMedia,
  uploadMediaFiles,
  AdminProjectPayload,
  ProjectScreenshotItem,
} from '@/lib/api/admin';
import { FolderGit2, ExternalLink, Edit, Trash2, Plus, RefreshCw, Code2, CheckCircle2, Sparkles, ArrowUp, ArrowDown, Save, XCircle, Loader2, Upload, Image as ImageIcon, Calendar, Cpu, Search, Eye, Star, Check, X, FileText, Filter } from 'lucide-react';

interface ProjectTranslationRecord {
  locale?: string;
  title?: string;
  summary?: string;
  challenge?: string | null;
  solution?: string | null;
  result?: string | null;
  body?: Record<string, unknown> | null;
  status?: string;
  seoTitle?: string | null;
  seoDescription?: string | null;
}

/** Free-form editorial fields stored in the translation body JSON. */
interface ProjectBody {
  projectType?: string;
  clientName?: string;
  coverImageUrl?: string;
  startDate?: string;
  completionDate?: string;
  gallery?: ProjectScreenshotItem[];
  architecture?: string;
  keyFeatures?: string[];
}

interface ProjectRecord {
  id: string;
  slug: string;
  title?: string;
  summary?: string;
  sortOrder?: number;
  projectWorkStatus?: string;
  isFeatured?: boolean;
  liveUrl?: string | null;
  demoVideoUrl?: string | null;
  frontendRepoUrl?: string | null;
  backendRepoUrl?: string | null;
  showFrontendRepo?: boolean;
  showBackendRepo?: boolean;
  frontendTechSummary?: string[] | null;
  backendTechSummary?: string[] | null;
  dbToolsSummary?: string[] | null;
  metrics?: Array<{ label: string; value: string }> | null;
  translations?: ProjectTranslationRecord[];
  clientName?: string | null;
  cover?: { url?: string } | null;
  gallery?: PublicGalleryItem[];
  createdAt?: string;
  updatedAt?: string;
}

// Preset suggestions for tech stacks
const PRESET_FRONTEND = ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Framer Motion', 'Zustand', 'Shadcn UI'];
const PRESET_BACKEND = ['NestJS 11', 'Node.js', 'PostgreSQL 16', 'Prisma ORM', 'Redis', 'Docker Compose', 'REST API', 'WebSockets'];
const PRESET_DB_TOOLS = ['PostgreSQL 16', 'Redis Cache', 'Neon Serverless DB', 'Docker', 'Vercel Edge', 'Railway Cloud', 'Cloudflare CDN'];

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingProject, setEditingProject] = useState<ProjectRecord | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isUpdatingRank, setIsUpdatingRank] = useState<string | null>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState<string | null>(null);

  // Filter & Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterWorkStatus, setFilterWorkStatus] = useState('ALL');
  const [filterPubStatus, setFilterPubStatus] = useState('ALL');
  const [filterFeatured, setFilterFeatured] = useState('ALL');

  // Form active tab: 1 to 7
  const [activeTab, setActiveTab] = useState<number>(1);

  // Tab 1: Basic Information
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [summary, setSummary] = useState('');
  const [projectType, setProjectType] = useState('Client Project');
  const [clientName, setClientName] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [isUploadingCover, setIsUploadingCover] = useState(false);

  // Tab 2: Project Info & Schedule
  const [publicationStatus, setPublicationStatus] = useState<'PUBLISHED' | 'DRAFT'>('PUBLISHED');
  const [projectWorkStatus, setProjectWorkStatus] = useState('COMPLETED');
  const [startDate, setStartDate] = useState('');
  const [completionDate, setCompletionDate] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [sortOrder, setSortOrder] = useState<number>(1);

  // Tab 3: External Links & Repositories
  const [liveUrl, setLiveUrl] = useState('');
  const [demoVideoUrl, setDemoVideoUrl] = useState('');
  const [frontendRepoUrl, setFrontendRepoUrl] = useState('');
  const [backendRepoUrl, setBackendRepoUrl] = useState('');
  const [showFrontendRepo, setShowFrontendRepo] = useState(false);
  const [showBackendRepo, setShowBackendRepo] = useState(false);

  // Tab 4: Screenshot Gallery
  const [screenshots, setScreenshots] = useState<ProjectScreenshotItem[]>([]);
  const [isUploadingScreenshots, setIsUploadingScreenshots] = useState(false);
  const [manualImageUrl, setManualImageUrl] = useState('');

  // Tab 5: Technology Stack
  const [frontendTech, setFrontendTech] = useState<string[]>([]);
  const [newFrontendTag, setNewFrontendTag] = useState('');
  const [backendTech, setBackendTech] = useState<string[]>([]);
  const [newBackendTag, setNewBackendTag] = useState('');
  const [dbToolsTech, setDbToolsTech] = useState<string[]>([]);
  const [newDbToolsTag, setNewDbToolsTag] = useState('');

  // Tab 6: Case Study & Metrics
  const [challenge, setChallenge] = useState('');
  const [solution, setSolution] = useState('');
  const [result, setResult] = useState('');
  const [architecture, setArchitecture] = useState('');
  const [keyFeatures, setKeyFeatures] = useState<string[]>([]);
  const [newFeatureInput, setNewFeatureInput] = useState('');
  const [metrics, setMetrics] = useState<Array<{ label: string; value: string }>>([]);
  const [newMetricLabel, setNewMetricLabel] = useState('');
  const [newMetricValue, setNewMetricValue] = useState('');

  // Tab 7: SEO & Publishing
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const formRef = useRef<HTMLDivElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const multiFileInputRef = useRef<HTMLInputElement>(null);

  const sortProjectsByRank = (list: ProjectRecord[]) => {
    return [...list].sort((a, b) => {
      const orderA = typeof a.sortOrder === 'number' ? a.sortOrder : 999;
      const orderB = typeof b.sortOrder === 'number' ? b.sortOrder : 999;
      return orderA - orderB;
    });
  };

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAdminProjects();
      const list = Array.isArray(data)
        ? (data as unknown as ProjectRecord[])
        : ((data as unknown as { data?: ProjectRecord[] })?.data || []);
      setProjects(sortProjectsByRank(list));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    getAdminProjects()
      .then((data) => {
        if (!active) return;
        const list = Array.isArray(data)
          ? (data as unknown as ProjectRecord[])
          : ((data as unknown as { data?: ProjectRecord[] })?.data || []);
        setProjects(sortProjectsByRank(list));
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (!active) return;
        setError(err instanceof Error ? err.message : 'Failed to fetch projects');
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const resetForm = () => {
    setTitle('');
    setSlug('');
    setSummary('');
    setProjectType('Client Project');
    setClientName('');
    setCoverImageUrl('');

    setPublicationStatus('PUBLISHED');
    setProjectWorkStatus('COMPLETED');
    setStartDate('');
    setCompletionDate('');
    setIsFeatured(false);
    setSortOrder(projects.length + 1);

    setLiveUrl('');
    setDemoVideoUrl('');
    setFrontendRepoUrl('');
    setBackendRepoUrl('');
    setShowFrontendRepo(false);
    setShowBackendRepo(false);

    setScreenshots([]);
    setManualImageUrl('');

    setFrontendTech(['Next.js 16', 'TypeScript', 'Tailwind CSS v4']);
    setBackendTech(['NestJS 11', 'PostgreSQL 16', 'Prisma ORM']);
    setDbToolsTech(['PostgreSQL 16', 'Redis', 'Docker Compose']);

    setChallenge('');
    setSolution('');
    setResult('');
    setArchitecture('');
    setKeyFeatures([]);
    setMetrics([]);

    setSeoTitle('');
    setSeoDescription('');

    setFormSuccess(null);
    setFormError(null);
    setEditingProject(null);
    setActiveTab(1);
  };

  const handleEdit = async (proj: ProjectRecord) => {
    setEditingProject(proj);
    setFormSuccess(null);
    setFormError(null);
    setIsLoadingDetails(proj.id);

    try {
      // Fetch full details including challenge, solution, result, body
      let fullProj: ProjectRecord = proj;
      try {
        const fetched = await getAdminProjectById(proj.id);
        if (fetched) fullProj = fetched as unknown as ProjectRecord;
      } catch {
        // fallback to list proj
      }

      const activeTrans = fullProj.translations?.[0] || {};
      const projTitle = fullProj.title || activeTrans.title || fullProj.slug;
      const projSummary = fullProj.summary || activeTrans.summary || '';
      const bodyData = (typeof activeTrans.body === 'object' && activeTrans.body !== null ? activeTrans.body : {}) as ProjectBody;

      setTitle(projTitle);
      setSlug(fullProj.slug || '');
      setSummary(projSummary);
      setProjectType(bodyData.projectType || 'Client Project');
      setClientName(bodyData.clientName || fullProj.clientName || '');
      setCoverImageUrl(bodyData.coverImageUrl || fullProj.cover?.url || '');

      setPublicationStatus((activeTrans.status as 'PUBLISHED' | 'DRAFT') || 'PUBLISHED');
      setProjectWorkStatus(fullProj.projectWorkStatus || 'COMPLETED');
      setStartDate(bodyData.startDate || '');
      setCompletionDate(bodyData.completionDate || '');
      setIsFeatured(Boolean(fullProj.isFeatured));
      setSortOrder(typeof fullProj.sortOrder === 'number' ? fullProj.sortOrder : 1);

      setLiveUrl(fullProj.liveUrl || '');
      setDemoVideoUrl(fullProj.demoVideoUrl || '');
      setFrontendRepoUrl(fullProj.frontendRepoUrl || '');
      setBackendRepoUrl(fullProj.backendRepoUrl || '');
      setShowFrontendRepo(Boolean(fullProj.showFrontendRepo));
      setShowBackendRepo(Boolean(fullProj.showBackendRepo));

      // Screenshots
      let galleryList: ProjectScreenshotItem[] = [];
      if (Array.isArray(bodyData.gallery) && bodyData.gallery.length > 0) {
        galleryList = bodyData.gallery;
      } else if (Array.isArray(fullProj.gallery) && fullProj.gallery.length > 0) {
        galleryList = fullProj.gallery.map((g, i: number) => {
          const caption = typeof g.caption === 'object' ? g.caption?.description || '' : g.caption || '';
          return {
          id: g.id || `img-${i}`,
          url: g.url || g.media?.url || '',
          title: g.title || `Screen ${i + 1}`,
          subtitle: caption,
          caption,
          device: (g.device as ProjectScreenshotItem['device']) || 'Desktop',
          isFeatured: g.isFeatured || i === 0,
          order: i + 1,
          };
        });
      }
      setScreenshots(galleryList);

      // Tech Stacks
      const frontArr = Array.isArray(fullProj.frontendTechSummary)
        ? fullProj.frontendTechSummary
        : ['Next.js 16', 'TypeScript'];
      const backArr = Array.isArray(fullProj.backendTechSummary)
        ? fullProj.backendTechSummary
        : ['NestJS 11', 'PostgreSQL 16'];
      const dbArr = Array.isArray(fullProj.dbToolsSummary)
        ? fullProj.dbToolsSummary
        : ['PostgreSQL 16', 'Redis'];

      setFrontendTech(frontArr);
      setBackendTech(backArr);
      setDbToolsTech(dbArr);

      // Case Study & Narrative
      setChallenge(activeTrans.challenge || '');
      setSolution(activeTrans.solution || '');
      setResult(activeTrans.result || '');
      setArchitecture(bodyData.architecture || '');
      setKeyFeatures(Array.isArray(bodyData.keyFeatures) ? bodyData.keyFeatures : []);

      // Metrics
      if (Array.isArray(fullProj.metrics) && fullProj.metrics.length > 0) {
        setMetrics(fullProj.metrics);
      } else {
        setMetrics([]);
      }

      setSeoTitle(activeTrans.seoTitle || '');
      setSeoDescription(activeTrans.seoDescription || '');

      setActiveTab(1);
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    } finally {
      setIsLoadingDetails(null);
    }
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingProject) {
      const generated = val
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setSlug(generated);
    }
  };

  const handleUpdateRank = async (proj: ProjectRecord, newRank: number) => {
    if (!proj.id || newRank < 1) return;
    setIsUpdatingRank(proj.id);
    try {
      await updateAdminProject(proj.id, { sortOrder: newRank });
      await fetchProjects();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to update rank');
    } finally {
      setIsUpdatingRank(null);
    }
  };

  const handleMoveUp = (proj: ProjectRecord, currentIndex: number) => {
    if (currentIndex <= 0) return;
    const prevProj = projects[currentIndex - 1];
    const targetRank = prevProj.sortOrder ? Math.max(1, prevProj.sortOrder - 1) : 1;
    handleUpdateRank(proj, targetRank);
  };

  const handleMoveDown = (proj: ProjectRecord, currentIndex: number) => {
    if (currentIndex >= projects.length - 1) return;
    const nextProj = projects[currentIndex + 1];
    const targetRank = (nextProj.sortOrder ?? currentIndex + 1) + 1;
    handleUpdateRank(proj, targetRank);
  };

  const handleDelete = async (proj: ProjectRecord) => {
    if (!proj.id) return;
    const projTitle = proj.title || proj.slug;
    if (!confirm(`Delete project "${projTitle}"? This action cannot be undone.`)) return;

    setIsDeleting(proj.id);
    try {
      await deleteAdminProject(proj.id);
      if (editingProject?.id === proj.id) resetForm();
      await fetchProjects();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to delete project');
    } finally {
      setIsDeleting(null);
    }
  };

  // Upload Cover Image handler
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingCover(true);
    try {
      const res = await uploadHeroMedia(file);
      if (res?.url) {
        setCoverImageUrl(res.url);
      }
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Cover upload failed');
    } finally {
      setIsUploadingCover(false);
      if (coverInputRef.current) coverInputRef.current.value = '';
    }
  };

  // Upload Multiple Screenshots handler
  const handleMultipleScreenshotsUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploadingScreenshots(true);
    try {
      const uploadedUrls = await uploadMediaFiles(Array.from(files));
      const newItems: ProjectScreenshotItem[] = uploadedUrls.map((url, i) => ({
        id: `scr-${Date.now()}-${i}`,
        url,
        title: `Interface View ${screenshots.length + i + 1}`,
        subtitle: 'Production software interface',
        caption: 'Verified production system screenshot',
        device: 'Desktop',
        deviceType: 'Desktop',
        isFeatured: screenshots.length === 0 && i === 0,
        order: screenshots.length + i + 1,
      }));
      setScreenshots((prev) => [...prev, ...newItems]);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Screenshot batch upload failed');
    } finally {
      setIsUploadingScreenshots(false);
      if (multiFileInputRef.current) multiFileInputRef.current.value = '';
    }
  };

  // Add screenshot by direct URL
  const handleAddManualScreenshot = () => {
    if (!manualImageUrl.trim()) return;
    const newItem: ProjectScreenshotItem = {
      id: `scr-${Date.now()}`,
      url: manualImageUrl.trim(),
      title: `Screenshot ${screenshots.length + 1}`,
      subtitle: 'Interface View',
      caption: '',
      device: 'Desktop',
      deviceType: 'Desktop',
      isFeatured: screenshots.length === 0,
      order: screenshots.length + 1,
    };
    setScreenshots((prev) => [...prev, newItem]);
    setManualImageUrl('');
  };

  const handleRemoveScreenshot = (index: number) => {
    setScreenshots((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSetFeaturedScreenshot = (index: number) => {
    setScreenshots((prev) =>
      prev.map((s, i) => ({
        ...s,
        isFeatured: i === index,
      }))
    );
  };

  // Tags builders
  const addFrontendTag = (tag: string) => {
    const clean = tag.trim();
    if (clean && !frontendTech.includes(clean)) {
      setFrontendTech((prev) => [...prev, clean]);
    }
    setNewFrontendTag('');
  };

  const removeFrontendTag = (tag: string) => {
    setFrontendTech((prev) => prev.filter((t) => t !== tag));
  };

  const addBackendTag = (tag: string) => {
    const clean = tag.trim();
    if (clean && !backendTech.includes(clean)) {
      setBackendTech((prev) => [...prev, clean]);
    }
    setNewBackendTag('');
  };

  const removeBackendTag = (tag: string) => {
    setBackendTech((prev) => prev.filter((t) => t !== tag));
  };

  const addDbToolsTag = (tag: string) => {
    const clean = tag.trim();
    if (clean && !dbToolsTech.includes(clean)) {
      setDbToolsTech((prev) => [...prev, clean]);
    }
    setNewDbToolsTag('');
  };

  const removeDbToolsTag = (tag: string) => {
    setDbToolsTech((prev) => prev.filter((t) => t !== tag));
  };

  // Key Features builder
  const addKeyFeature = () => {
    if (!newFeatureInput.trim()) return;
    setKeyFeatures((prev) => [...prev, newFeatureInput.trim()]);
    setNewFeatureInput('');
  };

  const removeKeyFeature = (index: number) => {
    setKeyFeatures((prev) => prev.filter((_, i) => i !== index));
  };

  // Metrics builder
  const addMetric = () => {
    if (!newMetricLabel.trim() || !newMetricValue.trim()) return;
    setMetrics((prev) => [
      ...prev,
      { label: newMetricLabel.trim(), value: newMetricValue.trim() },
    ]);
    setNewMetricLabel('');
    setNewMetricValue('');
  };

  const removeMetric = (index: number) => {
    setMetrics((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);
    setFormSuccess(null);

    const validMetrics = metrics.filter((m) => m.label.trim() && m.value.trim());

    // Structured JSON body
    const bodyPayload = {
      projectType,
      clientName: clientName.trim() || undefined,
      startDate: startDate.trim() || undefined,
      completionDate: completionDate.trim() || undefined,
      coverImageUrl: coverImageUrl.trim() || undefined,
      gallery: screenshots,
      architecture: architecture.trim() || undefined,
      keyFeatures: keyFeatures.filter((f) => f.trim().length > 0),
    };

    const payload: AdminProjectPayload = {
      title: title.trim(),
      slug: slug.trim(),
      summary: summary.trim() || undefined,
      sortOrder: Number(sortOrder) || 1,
      projectWorkStatus,
      isFeatured,
      liveUrl: liveUrl.trim() || undefined,
      demoVideoUrl: demoVideoUrl.trim() || undefined,
      frontendRepoUrl: frontendRepoUrl.trim() || undefined,
      backendRepoUrl: backendRepoUrl.trim() || undefined,
      showFrontendRepo,
      showBackendRepo,
      frontendTechSummary: frontendTech.length > 0 ? frontendTech : undefined,
      backendTechSummary: backendTech.length > 0 ? backendTech : undefined,
      dbToolsSummary: dbToolsTech.length > 0 ? dbToolsTech : undefined,
      metrics: validMetrics.length > 0 ? validMetrics : undefined,
      status: publicationStatus,
      translations: [
        {
          locale: 'en',
          title: title.trim(),
          summary: summary.trim(),
          challenge: challenge.trim() || undefined,
          solution: solution.trim() || undefined,
          result: result.trim() || undefined,
          status: publicationStatus,
          seoTitle: seoTitle.trim() || undefined,
          seoDescription: seoDescription.trim() || undefined,
          body: bodyPayload,
        },
      ],
    };

    try {
      if (editingProject?.id) {
        await updateAdminProject(editingProject.id, payload);
        setFormSuccess(`Project "${payload.title}" updated successfully!`);
      } else {
        await createAdminProject(payload);
        setFormSuccess(`Project "${payload.title}" created successfully!`);
        resetForm();
      }
      await fetchProjects();
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : 'Failed to save project');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filtered projects computation
  const filteredProjects = projects.filter((p) => {
    const pTitle = (p.title || p.translations?.[0]?.title || '').toLowerCase();
    const pSlug = (p.slug || '').toLowerCase();
    const pSummary = (p.summary || p.translations?.[0]?.summary || '').toLowerCase();
    const q = searchQuery.toLowerCase().trim();

    if (q && !pTitle.includes(q) && !pSlug.includes(q) && !pSummary.includes(q)) {
      return false;
    }

    if (filterWorkStatus !== 'ALL' && p.projectWorkStatus !== filterWorkStatus) {
      return false;
    }

    if (filterPubStatus !== 'ALL') {
      const pStatus = p.translations?.[0]?.status || 'PUBLISHED';
      if (pStatus !== filterPubStatus) return false;
    }

    if (filterFeatured === 'FEATURED_ONLY' && !p.isFeatured) {
      return false;
    }

    return true;
  });

  // KPI calculations
  const totalCount = projects.length;
  const publishedCount = projects.filter((p) => (p.translations?.[0]?.status || 'PUBLISHED') === 'PUBLISHED').length;
  const draftCount = projects.filter((p) => p.translations?.[0]?.status === 'DRAFT').length;
  const featuredCount = projects.filter((p) => p.isFeatured).length;
  const ongoingCount = projects.filter((p) => p.projectWorkStatus === 'ONGOING' || p.projectWorkStatus === 'IN_DEVELOPMENT').length;
  const completedCount = projects.filter((p) => p.projectWorkStatus === 'COMPLETED').length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* ──────────────────────── Top Header ──────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] bg-[#087FC4]/10 border border-[#087FC4]/20 mb-2">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>PORTFOLIO &amp; ARCHITECTURE MANAGEMENT</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Client Projects &amp; Case Study Showcase
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage public portfolio case studies, verified production screenshots, architecture specifications, and live preview links.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={fetchProjects}
            disabled={loading}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-[#1E3557] hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors shadow-xs"
            title="Refresh List"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            type="button"
            onClick={() => {
              resetForm();
              formRef.current?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#087FC4] to-[#20B8D5] text-white font-bold text-xs shadow-md inline-flex items-center gap-1.5 hover:opacity-95 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            <span>New Project Showcase</span>
          </button>
        </div>
      </div>

      {/* ──────────────────────── KPI Dashboard Cards ──────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] shadow-xs">
          <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Total Projects</div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-1 font-mono">{totalCount}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Database records</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] shadow-xs">
          <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">Published</div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1 font-mono">{publishedCount}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Live on portfolio</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] shadow-xs">
          <div className="text-[11px] font-bold text-amber-500">Drafts</div>
          <div className="text-2xl font-black text-amber-500 mt-1 font-mono">{draftCount}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Pending review</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] shadow-xs">
          <div className="text-[11px] font-bold text-[#087FC4] dark:text-[#20B8D5]">Featured</div>
          <div className="text-2xl font-black text-[#087FC4] dark:text-[#20B8D5] mt-1 font-mono">{featuredCount}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Homepage spotlight</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] shadow-xs">
          <div className="text-[11px] font-bold text-blue-500">In Development</div>
          <div className="text-2xl font-black text-blue-500 mt-1 font-mono">{ongoingCount}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Active engineering</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] shadow-xs">
          <div className="text-[11px] font-bold text-purple-500">Completed</div>
          <div className="text-2xl font-black text-purple-500 mt-1 font-mono">{completedCount}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Delivered platforms</div>
        </div>
      </div>

      {/* ──────────────────────── Projects Filter & Search Bar ──────────────────────── */}
      <div className="bg-white dark:bg-[#0B1E3B] p-4 rounded-2xl border border-slate-200 dark:border-[#1E3557] shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by project title, slug, summary..."
              className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#087FC4]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Filter className="w-3.5 h-3.5" />
              <span>Filters:</span>
            </div>

            <select
              value={filterWorkStatus}
              onChange={(e) => setFilterWorkStatus(e.target.value)}
              className="px-2.5 py-2 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-xs text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              <option value="ALL">All Work Stages</option>
              <option value="COMPLETED">Completed</option>
              <option value="ONGOING">Ongoing</option>
              <option value="IN_DEVELOPMENT">In Development</option>
              <option value="INTERNAL">Internal</option>
            </select>

            <select
              value={filterPubStatus}
              onChange={(e) => setFilterPubStatus(e.target.value)}
              className="px-2.5 py-2 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-xs text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              <option value="ALL">All Publication</option>
              <option value="PUBLISHED">Published</option>
              <option value="DRAFT">Draft</option>
            </select>

            <select
              value={filterFeatured}
              onChange={(e) => setFilterFeatured(e.target.value)}
              className="px-2.5 py-2 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-xs text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              <option value="ALL">All Featured</option>
              <option value="FEATURED_ONLY">★ Featured Only</option>
            </select>

            {(searchQuery || filterWorkStatus !== 'ALL' || filterPubStatus !== 'ALL' || filterFeatured !== 'ALL') && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setFilterWorkStatus('ALL');
                  setFilterPubStatus('ALL');
                  setFilterFeatured('ALL');
                }}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-rose-500 hover:bg-rose-500/10 transition-colors"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ──────────────────────── Projects Catalog List ──────────────────────── */}
      <div className="bg-white dark:bg-[#0B1E3B] rounded-2xl border border-slate-200 dark:border-[#1E3557] overflow-hidden shadow-xs">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-[#1E3557] flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#087FC4] dark:text-[#20B8D5]" />
              Projects Catalog ({filteredProjects.length} of {projects.length})
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Rank #1 appears at the top of the homepage and public portfolio showcase.
            </p>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 text-red-500 text-xs border-b border-red-500/20">
            {error}
          </div>
        )}

        {loading ? (
          <div className="p-12 text-center text-slate-400 text-xs flex flex-col items-center gap-3">
            <RefreshCw className="w-5 h-5 animate-spin text-[#087FC4]" />
            Loading projects catalog from database...
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs">
            {searchQuery || filterWorkStatus !== 'ALL' || filterPubStatus !== 'ALL'
              ? 'No projects match your current filter criteria.'
              : 'No projects found in database. Create your first project using the form below.'}
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-[#1E3557]">
            {filteredProjects.map((proj, idx) => {
              const projTitle = proj.title || proj.translations?.[0]?.title || proj.slug;
              const projSummary = proj.summary || proj.translations?.[0]?.summary || '';
              const rank = typeof proj.sortOrder === 'number' ? proj.sortOrder : idx + 1;
              const pubStatus = proj.translations?.[0]?.status || 'PUBLISHED';
              const isSelected = editingProject?.id === proj.id;

              return (
                <div
                  key={proj.id || proj.slug}
                  className={`p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
                    isSelected
                      ? 'bg-[#087FC4]/5 dark:bg-[#087FC4]/10 border-l-4 border-l-[#087FC4]'
                      : 'hover:bg-slate-50/50 dark:hover:bg-[#07162C]/40'
                  }`}
                >
                  {/* Left: Rank & Info */}
                  <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0">
                    {/* Rank Stepper */}
                    <div className="flex flex-col items-center justify-center shrink-0 p-1.5 rounded-xl bg-slate-100 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557]">
                      <button
                        type="button"
                        disabled={idx === 0 || isUpdatingRank === proj.id}
                        onClick={() => handleMoveUp(proj, idx)}
                        className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 disabled:opacity-30 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                        title="Move to higher priority"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>

                      <span className="text-xs font-black text-[#087FC4] dark:text-[#20B8D5] py-0.5 px-1.5 font-mono">
                        #{rank}
                      </span>

                      <button
                        type="button"
                        disabled={idx === filteredProjects.length - 1 || isUpdatingRank === proj.id}
                        onClick={() => handleMoveDown(proj, idx)}
                        className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 disabled:opacity-30 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                        title="Move to lower priority"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#087FC4] to-[#20B8D5] text-white flex items-center justify-center shrink-0 shadow-sm">
                      <FolderGit2 className="w-6 h-6" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white truncate">
                          {projTitle}
                        </h3>

                        <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          {proj.projectWorkStatus || 'COMPLETED'}
                        </span>

                        {pubStatus === 'DRAFT' ? (
                          <span className="text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                            Draft
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-md border border-cyan-500/20">
                            Published
                          </span>
                        )}

                        {proj.isFeatured && (
                          <span className="text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20 inline-flex items-center gap-1">
                            <Star className="w-2.5 h-2.5 fill-amber-500" /> Featured
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5 max-w-xl">
                        {projSummary || 'No summary provided.'}
                      </p>

                      <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1 font-mono flex-wrap">
                        <span>slug: /{proj.slug}</span>
                        {proj.liveUrl && (
                          <>
                            <span>•</span>
                            <a
                              href={proj.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#087FC4] dark:text-[#20B8D5] hover:underline inline-flex items-center gap-0.5"
                            >
                              Live App <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          </>
                        )}
                        {proj.showFrontendRepo && proj.frontendRepoUrl && (
                          <>
                            <span>•</span>
                            <a
                              href={proj.frontendRepoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-slate-500 hover:text-slate-900 dark:hover:text-white inline-flex items-center gap-0.5"
                            >
                              <Code2 className="w-2.5 h-2.5" /> Frontend Repo
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                    <Link
                      href={`/projects/${proj.slug}`}
                      target="_blank"
                      className="p-2 rounded-xl border border-slate-200 dark:border-[#1E3557] hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                      title="View public case study"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      type="button"
                      disabled={isLoadingDetails === proj.id}
                      onClick={() => handleEdit(proj)}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-[#1E3557] hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                    >
                      {isLoadingDetails === proj.id ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Edit className="w-3.5 h-3.5" />
                      )}
                      <span>Edit</span>
                    </button>

                    <button
                      type="button"
                      disabled={isDeleting === proj.id}
                      onClick={() => handleDelete(proj)}
                      className="p-2 rounded-xl text-rose-500 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-colors disabled:opacity-50"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ──────────────────────── Project Form (7-Tab Master Editor) ──────────────────────── */}
      <div ref={formRef}>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white dark:bg-[#0B1E3B] p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-[#1E3557] shadow-sm transition-colors duration-150"
        >
          {/* Form Header */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#1E3557] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#087FC4] dark:text-[#20B8D5]">
                  Project Studio
                </span>
                {editingProject && (
                  <span className="text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                    Editing Mode
                  </span>
                )}
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                {editingProject ? `Edit Case Study: ${title || slug}` : 'Create New Project Showcase'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Complete the 7 modules below to configure architecture details, screenshot galleries, and live deployment links.
              </p>
            </div>

            {editingProject && (
              <button
                type="button"
                onClick={resetForm}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors inline-flex items-center gap-1.5"
              >
                <XCircle className="w-3.5 h-3.5" /> Cancel Edit
              </button>
            )}
          </div>

          {formError && (
            <div className="p-3.5 bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 rounded-xl text-xs flex items-center gap-2">
              <XCircle className="w-4 h-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {formSuccess && (
            <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{formSuccess}</span>
            </div>
          )}

          {/* ──────────────────────── 7-Tab Navigation Bar ──────────────────────── */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-100 dark:border-[#1E3557]">
            {[
              { id: 1, label: '1. Basic Info', icon: FolderGit2 },
              { id: 2, label: '2. Schedule & Status', icon: Calendar },
              { id: 3, label: '3. External Links', icon: ExternalLink },
              { id: 4, label: `4. Gallery (${screenshots.length})`, icon: ImageIcon },
              { id: 5, label: '5. Tech Stack', icon: Cpu },
              { id: 6, label: '6. Case Study & Metrics', icon: FileText },
              { id: 7, label: '7. SEO & Publish', icon: Sparkles },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#087FC4] to-[#20B8D5] text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#07162C]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* ════════════════════════ TAB 1: BASIC INFORMATION ════════════════════════ */}
          {activeTab === 1 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Project Name / Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. EduManage BD — Campus Cloud"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-[#087FC4]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    URL Slug <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="edumanage-bd-campus-cloud"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white text-xs sm:text-sm font-mono focus:outline-none focus:border-[#087FC4]"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    Route will be published at: <code className="font-mono text-[#087FC4]">/projects/{slug || 'project-slug'}</code>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Project Type
                  </label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-[#087FC4]"
                  >
                    <option value="Client Project">Client Project (Commercial Delivery)</option>
                    <option value="Own Product / SaaS">Own Product / SaaS Ecosystem</option>
                    <option value="Internal Platform">Internal Platform / Infrastructure</option>
                    <option value="Open Source">Open Source / Community Project</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Client Name / Organization (Optional)
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Dhaka Education Board / Private Enterprise"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-[#087FC4]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Short Description &amp; Overview <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Enterprise cloud-native school and university management ecosystem designed for multi-institutional governance..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-[#087FC4]"
                />
              </div>

              {/* Cover Image Uploader */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Primary Cover Image / Showcase Banner
                  </label>
                  {coverImageUrl && (
                    <button
                      type="button"
                      onClick={() => setCoverImageUrl('')}
                      className="text-xs text-rose-500 hover:underline inline-flex items-center gap-1"
                    >
                      <X className="w-3 h-3" /> Remove Cover
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  <div className="space-y-2">
                    <input
                      type="file"
                      ref={coverInputRef}
                      accept="image/*"
                      onChange={handleCoverUpload}
                      className="hidden"
                    />

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={isUploadingCover}
                        onClick={() => coverInputRef.current?.click()}
                        className="px-4 py-2 rounded-xl bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors inline-flex items-center gap-2"
                      >
                        {isUploadingCover ? (
                          <Loader2 className="w-4 h-4 animate-spin text-[#087FC4]" />
                        ) : (
                          <Upload className="w-4 h-4 text-[#087FC4]" />
                        )}
                        <span>{isUploadingCover ? 'Uploading...' : 'Upload Cover from Computer'}</span>
                      </button>
                    </div>

                    <p className="text-[11px] text-slate-400">
                      Or paste direct image URL below:
                    </p>

                    <input
                      type="url"
                      value={coverImageUrl}
                      onChange={(e) => setCoverImageUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#087FC4]"
                    />
                  </div>

                  {/* Cover Preview */}
                  <div className="h-32 rounded-xl border border-dashed border-slate-300 dark:border-[#1E3557] overflow-hidden bg-slate-100 dark:bg-[#0B1E3B] flex items-center justify-center">
                    {coverImageUrl ? (
                      <img
                        src={coverImageUrl}
                        alt="Project Cover Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center text-slate-400 text-xs flex flex-col items-center gap-1.5">
                        <ImageIcon className="w-6 h-6 opacity-40" />
                        <span>No cover image selected</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ════════════════════════ TAB 2: SCHEDULE & STATUS ════════════════════════ */}
          {activeTab === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Publication Status
                  </label>
                  <select
                    value={publicationStatus}
                    onChange={(e) => setPublicationStatus(e.target.value as 'PUBLISHED' | 'DRAFT')}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-[#087FC4]"
                  >
                    <option value="PUBLISHED">PUBLISHED (Live on Public Portfolio)</option>
                    <option value="DRAFT">DRAFT (Hidden from Public)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Work Status
                  </label>
                  <select
                    value={projectWorkStatus}
                    onChange={(e) => setProjectWorkStatus(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-[#087FC4]"
                  >
                    <option value="COMPLETED">COMPLETED (In Production)</option>
                    <option value="ONGOING">ONGOING (Active Retainer)</option>
                    <option value="IN_DEVELOPMENT">IN DEVELOPMENT (Sprint Phase)</option>
                    <option value="INTERNAL">INTERNAL (MRM Proprietary)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
                    <span>Display Serial (Rank)</span>
                    <span className="text-[10px] text-[#087FC4] dark:text-[#20B8D5] font-bold">#1 = Top Priority</span>
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={999}
                    value={sortOrder}
                    onChange={(e) => setSortOrder(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white text-xs sm:text-sm font-black focus:outline-none focus:border-[#087FC4]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Project Start Date (Optional)
                  </label>
                  <input
                    type="text"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="e.g. Q1 2024 or 2024-01-15"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-[#087FC4]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Delivery / Completion Date (Optional)
                  </label>
                  <input
                    type="text"
                    value={completionDate}
                    onChange={(e) => setCompletionDate(e.target.value)}
                    placeholder="e.g. Q3 2024 or 2024-09-30"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-[#087FC4]"
                  />
                </div>
              </div>

              {/* Featured Project Toggle */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Star className={`w-4 h-4 ${isFeatured ? 'text-amber-500 fill-amber-500' : 'text-slate-400'}`} />
                    <span>Featured Flagship Project</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Featured projects are pinned to the homepage showcase carousel with high-craft badges.
                  </p>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#087FC4]"></div>
                </label>
              </div>
            </div>
          )}

          {/* ════════════════════════ TAB 3: EXTERNAL LINKS ════════════════════════ */}
          {activeTab === 3 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Live Production Application URL
                  </label>
                  <input
                    type="url"
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    placeholder="https://client-portal.mrminfotech.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-[#087FC4]"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Displays as &quot;Live App&quot; button on public case study.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Video Walkthrough / Demo URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={demoVideoUrl}
                    onChange={(e) => setDemoVideoUrl(e.target.value)}
                    placeholder="https://youtube.com/watch?v=... or Loom"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-[#087FC4]"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Direct video link or Loom product walkthrough.</p>
                </div>
              </div>

              {/* Repositories */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557]">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Frontend Repository URL (GitHub / GitLab)
                  </label>
                  <input
                    type="url"
                    value={frontendRepoUrl}
                    onChange={(e) => setFrontendRepoUrl(e.target.value)}
                    placeholder="https://github.com/mrminfotech/frontend"
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#087FC4]"
                  />
                  <label className="flex items-center gap-2 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={showFrontendRepo}
                      onChange={(e) => setShowFrontendRepo(e.target.checked)}
                      className="w-3.5 h-3.5 rounded text-[#087FC4]"
                    />
                    <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                      Show frontend repo link publicly on case study
                    </span>
                  </label>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Backend Repository URL (GitHub / GitLab)
                  </label>
                  <input
                    type="url"
                    value={backendRepoUrl}
                    onChange={(e) => setBackendRepoUrl(e.target.value)}
                    placeholder="https://github.com/mrminfotech/backend"
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#087FC4]"
                  />
                  <label className="flex items-center gap-2 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={showBackendRepo}
                      onChange={(e) => setShowBackendRepo(e.target.checked)}
                      className="w-3.5 h-3.5 rounded text-[#087FC4]"
                    />
                    <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                      Show backend repo link publicly on case study
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* ════════════════════════ TAB 4: SCREENSHOT & MEDIA GALLERY ════════════════════════ */}
          {activeTab === 4 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Multi-Device Screenshot Showcase Gallery
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Upload multiple screenshots representing desktop, admin dashboards, and mobile views. These render dynamically in the public interactive lightbox.
                </p>
              </div>

              {/* Upload Controls */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] space-y-3">
                <input
                  type="file"
                  multiple
                  ref={multiFileInputRef}
                  accept="image/*"
                  onChange={handleMultipleScreenshotsUpload}
                  className="hidden"
                />

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    disabled={isUploadingScreenshots}
                    onClick={() => multiFileInputRef.current?.click()}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#087FC4] to-[#20B8D5] text-white text-xs font-bold shadow-xs hover:opacity-95 transition-opacity inline-flex items-center gap-2"
                  >
                    {isUploadingScreenshots ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Upload className="w-4 h-4" />
                    )}
                    <span>{isUploadingScreenshots ? 'Uploading Batch...' : 'Upload Multiple Screenshots from Computer'}</span>
                  </button>

                  <div className="flex items-center gap-2 flex-1 min-w-[280px]">
                    <input
                      type="url"
                      value={manualImageUrl}
                      onChange={(e) => setManualImageUrl(e.target.value)}
                      placeholder="Or enter image URL (https://...)"
                      className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#087FC4]"
                    />
                    <button
                      type="button"
                      onClick={handleAddManualScreenshot}
                      className="px-3.5 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors"
                    >
                      Add URL
                    </button>
                  </div>
                </div>
              </div>

              {/* Screenshots List */}
              {screenshots.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs border border-dashed border-slate-200 dark:border-[#1E3557] rounded-xl flex flex-col items-center gap-2">
                  <ImageIcon className="w-8 h-8 opacity-40" />
                  <span>No screenshots added yet. Upload files above or add direct image URLs.</span>
                </div>
              ) : (
                <div className="space-y-3">
                  {screenshots.map((s, idx) => (
                    <div
                      key={s.id || idx}
                      className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <img
                          src={s.url}
                          alt={s.title || 'Screenshot'}
                          className="w-16 h-12 object-cover rounded-lg border border-slate-200 dark:border-[#1E3557] shrink-0"
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1 min-w-0">
                          <input
                            type="text"
                            value={s.title || ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              setScreenshots((prev) =>
                                prev.map((item, i) => (i === idx ? { ...item, title: val } : item))
                              );
                            }}
                            placeholder="Screen Name / Title (e.g. ERP Cockpit)"
                            className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] text-xs text-slate-900 dark:text-white focus:outline-none"
                          />

                          <input
                            type="text"
                            value={s.subtitle || s.caption || ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              setScreenshots((prev) =>
                                prev.map((item, i) =>
                                  i === idx ? { ...item, subtitle: val, caption: val } : item
                                )
                              );
                            }}
                            placeholder="Subtitle / Caption description"
                            className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] text-xs text-slate-900 dark:text-white focus:outline-none"
                          />
                        </div>

                        <select
                          value={s.device || s.deviceType || 'Desktop'}
                          onChange={(e) => {
                            const val = e.target.value;
                            setScreenshots((prev) =>
                              prev.map((item, i) =>
                                i === idx ? { ...item, device: val, deviceType: val } : item
                              )
                            );
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] text-xs text-slate-700 dark:text-slate-300 focus:outline-none shrink-0"
                        >
                          <option value="Desktop">Desktop</option>
                          <option value="Dashboard">Dashboard</option>
                          <option value="Mobile">Mobile App</option>
                          <option value="Tablet">Tablet</option>
                        </select>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                        <button
                          type="button"
                          onClick={() => handleSetFeaturedScreenshot(idx)}
                          className={`p-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1 transition-colors ${
                            s.isFeatured
                              ? 'text-amber-500 bg-amber-500/10 border border-amber-500/30'
                              : 'text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                          title="Set as Primary / Featured Screenshot"
                        >
                          <Star className={`w-3.5 h-3.5 ${s.isFeatured ? 'fill-amber-500' : ''}`} />
                          <span className="text-[10px] hidden md:inline">
                            {s.isFeatured ? 'Featured' : 'Make Featured'}
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleRemoveScreenshot(idx)}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors"
                          title="Delete screenshot"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ════════════════════════ TAB 5: TECHNOLOGY STACK ════════════════════════ */}
          {activeTab === 5 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Frontend Tech */}
              <div className="space-y-2.5 p-4 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557]">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Frontend Technologies &amp; Client Frameworks
                </label>
                <div className="flex flex-wrap items-center gap-1.5 mb-2">
                  {frontendTech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#087FC4]/10 text-[#087FC4] dark:text-[#20B8D5] border border-[#087FC4]/20 inline-flex items-center gap-1.5"
                    >
                      {t}
                      <button
                        type="button"
                        onClick={() => removeFrontendTag(t)}
                        className="hover:text-red-500 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newFrontendTag}
                    onChange={(e) => setNewFrontendTag(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addFrontendTag(newFrontendTag);
                      }
                    }}
                    placeholder="Type technology name (e.g. Next.js 16) and press Enter"
                    className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#087FC4]"
                  />
                  <button
                    type="button"
                    onClick={() => addFrontendTag(newFrontendTag)}
                    className="px-4 py-2 rounded-xl bg-[#087FC4] text-white text-xs font-bold hover:opacity-95 transition-opacity"
                  >
                    Add Tag
                  </button>
                </div>

                {/* Suggested Chips */}
                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  <span className="text-[10px] text-slate-400">Suggestions:</span>
                  {PRESET_FRONTEND.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      disabled={frontendTech.includes(preset)}
                      onClick={() => addFrontendTag(preset)}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] text-slate-600 dark:text-slate-300 hover:border-[#087FC4] disabled:opacity-30 cursor-pointer"
                    >
                      + {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Backend Tech */}
              <div className="space-y-2.5 p-4 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557]">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Backend Architecture &amp; Server Technologies
                </label>
                <div className="flex flex-wrap items-center gap-1.5 mb-2">
                  {backendTech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 inline-flex items-center gap-1.5"
                    >
                      {t}
                      <button
                        type="button"
                        onClick={() => removeBackendTag(t)}
                        className="hover:text-red-500 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newBackendTag}
                    onChange={(e) => setNewBackendTag(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addBackendTag(newBackendTag);
                      }
                    }}
                    placeholder="Type technology name (e.g. NestJS 11) and press Enter"
                    className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#087FC4]"
                  />
                  <button
                    type="button"
                    onClick={() => addBackendTag(newBackendTag)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:opacity-95 transition-opacity"
                  >
                    Add Tag
                  </button>
                </div>

                {/* Suggested Chips */}
                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  <span className="text-[10px] text-slate-400">Suggestions:</span>
                  {PRESET_BACKEND.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      disabled={backendTech.includes(preset)}
                      onClick={() => addBackendTag(preset)}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] text-slate-600 dark:text-slate-300 hover:border-emerald-500 disabled:opacity-30 cursor-pointer"
                    >
                      + {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Database & Cloud Tools */}
              <div className="space-y-2.5 p-4 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557]">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Database, Cloud &amp; DevOps Infrastructure
                </label>
                <div className="flex flex-wrap items-center gap-1.5 mb-2">
                  {dbToolsTech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 inline-flex items-center gap-1.5"
                    >
                      {t}
                      <button
                        type="button"
                        onClick={() => removeDbToolsTag(t)}
                        className="hover:text-red-500 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newDbToolsTag}
                    onChange={(e) => setNewDbToolsTag(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addDbToolsTag(newDbToolsTag);
                      }
                    }}
                    placeholder="Type tool name (e.g. PostgreSQL 16) and press Enter"
                    className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#087FC4]"
                  />
                  <button
                    type="button"
                    onClick={() => addDbToolsTag(newDbToolsTag)}
                    className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold hover:opacity-95 transition-opacity"
                  >
                    Add Tag
                  </button>
                </div>

                {/* Suggested Chips */}
                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  <span className="text-[10px] text-slate-400">Suggestions:</span>
                  {PRESET_DB_TOOLS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      disabled={dbToolsTech.includes(preset)}
                      onClick={() => addDbToolsTag(preset)}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] text-slate-600 dark:text-slate-300 hover:border-purple-500 disabled:opacity-30 cursor-pointer"
                    >
                      + {preset}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ════════════════════════ TAB 6: CASE STUDY & METRICS ════════════════════════ */}
          {activeTab === 6 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* 3 Pillars */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  3-Pillar Execution Narrative
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-amber-500">
                      1. The Challenge (Problem Statement)
                    </label>
                    <textarea
                      rows={4}
                      value={challenge}
                      onChange={(e) => setChallenge(e.target.value)}
                      placeholder="Legacy paper grading and disconnected campuses caused 4+ hour reporting delays..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#087FC4]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#087FC4] dark:text-[#20B8D5]">
                      2. The Solution (Technical Architecture)
                    </label>
                    <textarea
                      rows={4}
                      value={solution}
                      onChange={(e) => setSolution(e.target.value)}
                      placeholder="Engineered a centralized multi-tenant Next.js & NestJS portal with real-time biometric sync..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#087FC4]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-emerald-500">
                      3. The Result (Measurable Business Impact)
                    </label>
                    <textarea
                      rows={4}
                      value={result}
                      onChange={(e) => setResult(e.target.value)}
                      placeholder="Achieved 99.98% uptime across 120 institutions, reducing student fee reconciliation to 60 seconds."
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#087FC4]"
                    />
                  </div>
                </div>
              </div>

              {/* Architecture & Engineering Highlights */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  System Architecture &amp; Security Protocols
                </label>
                <textarea
                  rows={3}
                  value={architecture}
                  onChange={(e) => setArchitecture(e.target.value)}
                  placeholder="Engineered with strict zero-trust boundary controllers, multi-tenant row-level tenant keys in PostgreSQL, and AES-256 encrypted payload transfers..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-[#087FC4]"
                />
              </div>

              {/* Key Features List */}
              <div className="space-y-2.5 p-4 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557]">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Key Enterprise Capabilities &amp; Features ({keyFeatures.length})
                </label>

                {keyFeatures.length > 0 && (
                  <div className="space-y-1.5 mb-2">
                    {keyFeatures.map((feat, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] text-xs text-slate-800 dark:text-slate-200 flex items-center justify-between"
                      >
                        <span className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>{feat}</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => removeKeyFeature(idx)}
                          className="text-slate-400 hover:text-rose-500 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newFeatureInput}
                    onChange={(e) => setNewFeatureInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addKeyFeature();
                      }
                    }}
                    placeholder="e.g. Automated bKash & Nagad MFS payment webhooks"
                    className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#087FC4]"
                  />
                  <button
                    type="button"
                    onClick={addKeyFeature}
                    className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                  >
                    Add Feature
                  </button>
                </div>
              </div>

              {/* Verified Metrics Builder */}
              <div className="space-y-2.5 p-4 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557]">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Verified Performance &amp; Production Metrics ({metrics.length})
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mb-2">
                  {metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] flex items-center justify-between"
                    >
                      <div>
                        <div className="text-base font-black text-[#087FC4] dark:text-[#20B8D5] font-mono">
                          {m.value}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">
                          {m.label}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeMetric(idx)}
                        className="text-slate-400 hover:text-rose-500 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newMetricLabel}
                    onChange={(e) => setNewMetricLabel(e.target.value)}
                    placeholder="Metric Label (e.g. Active Institutions)"
                    className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] text-xs text-slate-900 dark:text-white focus:outline-none"
                  />
                  <input
                    type="text"
                    value={newMetricValue}
                    onChange={(e) => setNewMetricValue(e.target.value)}
                    placeholder="Value (e.g. 120+)"
                    className="w-32 px-3 py-2 rounded-xl bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] text-xs text-slate-900 dark:text-white font-mono focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={addMetric}
                    className="px-4 py-2 rounded-xl bg-[#087FC4] text-white text-xs font-bold hover:opacity-95 transition-opacity"
                  >
                    Add Metric
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ════════════════════════ TAB 7: SEO & PUBLISHING ════════════════════════ */}
          {activeTab === 7 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      SEO Title (Meta Title)
                    </label>
                    <span className="text-[10px] text-slate-400">{seoTitle.length} / 70 chars</span>
                  </div>
                  <input
                    type="text"
                    maxLength={70}
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    placeholder={title ? `${title} | Case Study | MRM InfoTech` : 'e.g. EduManage BD | Enterprise School Cloud'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-[#087FC4]"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      SEO Meta Description
                    </label>
                    <span className="text-[10px] text-slate-400">{seoDescription.length} / 200 chars</span>
                  </div>
                  <input
                    type="text"
                    maxLength={200}
                    value={seoDescription}
                    onChange={(e) => setSeoDescription(e.target.value)}
                    placeholder="Short search engine description (under 160 chars recommended)..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-[#087FC4]"
                  />
                </div>
              </div>

              {/* Live Preview Card */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Public Card Preview Simulation
                </label>
                <div className="max-w-md p-5 rounded-2xl bg-white dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] shadow-md space-y-3">
                  <div className="h-44 rounded-xl overflow-hidden bg-slate-100 dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557]">
                    {coverImageUrl ? (
                      <img src={coverImageUrl} alt="Card preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                        [Banner Cover Image]
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      {projectWorkStatus}
                    </span>
                    {isFeatured && (
                      <span className="text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                        ★ Featured
                      </span>
                    )}
                  </div>

                  <h4 className="text-base font-black text-slate-900 dark:text-white">
                    {title || 'Project Title Preview'}
                  </h4>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {summary || 'Project summary description will display here on portfolio overview cards.'}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {frontendTech.slice(0, 3).map((t) => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ──────────────────────── Form Bottom Actions ──────────────────────── */}
          <div className="flex items-center justify-between pt-5 border-t border-slate-100 dark:border-[#1E3557]">
            {/* Quick module switchers */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={activeTab === 1}
                onClick={() => setActiveTab((prev) => Math.max(1, prev - 1))}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-[#1E3557] text-xs font-semibold text-slate-600 dark:text-slate-300 disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Previous Module
              </button>
              <button
                type="button"
                disabled={activeTab === 7}
                onClick={() => setActiveTab((prev) => Math.min(7, prev + 1))}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-[#1E3557] text-xs font-semibold text-slate-600 dark:text-slate-300 disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Next Module
              </button>
            </div>

            <div className="flex items-center gap-3">
              {editingProject && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#087FC4] to-[#20B8D5] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#087FC4]/25 hover:opacity-95 disabled:opacity-50 inline-flex items-center gap-2 cursor-pointer transition-all"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving Project...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>{editingProject ? 'Update Project Showcase' : 'Save & Publish Showcase'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
