'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  getAdminProjects,
  createAdminProject,
  updateAdminProject,
  deleteAdminProject,
  AdminProjectPayload,
} from '@/lib/api/admin';
import {
  FolderGit2,
  ExternalLink,
  Edit,
  Trash2,
  Plus,
  RefreshCw,
  Code2,
  CheckCircle2,
  Sparkles,
  ArrowUp,
  ArrowDown,
  Save,
  XCircle,
  Loader2,
} from 'lucide-react';

interface ProjectRecord {
  id?: string;
  slug: string;
  title?: string;
  summary?: string;
  sortOrder?: number;
  projectWorkStatus?: string;
  isFeatured?: boolean;
  liveUrl?: string | null;
  frontendRepoUrl?: string | null;
  backendRepoUrl?: string | null;
  showFrontendRepo?: boolean;
  showBackendRepo?: boolean;
  frontendTechSummary?: string[] | null;
  backendTechSummary?: string[] | null;
  dbToolsSummary?: string[] | null;
  translations?: Array<{
    title?: string;
    summary?: string;
    locale?: string;
  }>;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingProject, setEditingProject] = useState<ProjectRecord | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isUpdatingRank, setIsUpdatingRank] = useState<string | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [summary, setSummary] = useState('');
  const [sortOrder, setSortOrder] = useState<number>(1);
  const [projectWorkStatus, setProjectWorkStatus] = useState('COMPLETED');
  const [isFeatured, setIsFeatured] = useState(false);
  const [liveUrl, setLiveUrl] = useState('');
  const [frontendRepoUrl, setFrontendRepoUrl] = useState('');
  const [backendRepoUrl, setBackendRepoUrl] = useState('');
  const [showFrontendRepo, setShowFrontendRepo] = useState(false);
  const [showBackendRepo, setShowBackendRepo] = useState(false);
  const [techStackInput, setTechStackInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const formRef = useRef<HTMLDivElement>(null);

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
    setSortOrder(1);
    setProjectWorkStatus('COMPLETED');
    setIsFeatured(false);
    setLiveUrl('');
    setFrontendRepoUrl('');
    setBackendRepoUrl('');
    setShowFrontendRepo(false);
    setShowBackendRepo(false);
    setTechStackInput('');
    setFormSuccess(null);
    setFormError(null);
    setEditingProject(null);
  };

  const handleEdit = (proj: ProjectRecord) => {
    setEditingProject(proj);
    const projTitle = proj.title || proj.translations?.[0]?.title || '';
    const projSummary = proj.summary || proj.translations?.[0]?.summary || '';
    setTitle(projTitle);
    setSlug(proj.slug || '');
    setSummary(projSummary);
    setSortOrder(typeof proj.sortOrder === 'number' ? proj.sortOrder : 1);
    setProjectWorkStatus(proj.projectWorkStatus || 'COMPLETED');
    setIsFeatured(Boolean(proj.isFeatured));
    setLiveUrl(proj.liveUrl || '');
    setFrontendRepoUrl(proj.frontendRepoUrl || '');
    setBackendRepoUrl(proj.backendRepoUrl || '');
    setShowFrontendRepo(Boolean(proj.showFrontendRepo));
    setShowBackendRepo(Boolean(proj.showBackendRepo));

    const techArray = [
      ...(Array.isArray(proj.frontendTechSummary) ? proj.frontendTechSummary : []),
      ...(Array.isArray(proj.backendTechSummary) ? proj.backendTechSummary : []),
    ];
    setTechStackInput(techArray.join(', '));
    setFormSuccess(null);
    setFormError(null);
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
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
    if (!confirm(`Delete project "${projTitle}"? This cannot be undone.`)) return;

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);
    setFormSuccess(null);

    const techArray = techStackInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const payload: AdminProjectPayload = {
      title: title.trim(),
      slug: slug.trim(),
      summary: summary.trim() || undefined,
      sortOrder: Number(sortOrder) || 1,
      projectWorkStatus,
      isFeatured,
      liveUrl: liveUrl.trim() || undefined,
      frontendRepoUrl: frontendRepoUrl.trim() || undefined,
      backendRepoUrl: backendRepoUrl.trim() || undefined,
      showFrontendRepo,
      showBackendRepo,
      frontendTechSummary: techArray.length > 0 ? techArray : undefined,
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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Client Projects &amp; Architecture Portfolio
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Reorder client deployments by Display Serial/Rank (১ নম্বর সবার উপরে দেখাবে) and publish tech stacks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={fetchProjects}
            disabled={loading}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-[#1E3557] hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            title="Refresh List"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            type="button"
            onClick={resetForm}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#087FC4] to-[#20B8D5] text-white font-bold text-xs shadow-md inline-flex items-center gap-1.5 hover:opacity-95 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </button>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white dark:bg-[#0B1E3B] rounded-2xl border border-slate-200 dark:border-[#1E3557] overflow-hidden shadow-xs">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-[#1E3557] flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#087FC4] dark:text-[#20B8D5]" />
              Published Projects Catalog ({projects.length})
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Ranked by Serial Order (Serial #1 displays first at the top of homepage and portfolio page).
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
            Loading projects from live database...
          </div>
        ) : projects.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs">
            No projects found. Use the form below to create your first client project.
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-[#1E3557]">
            {projects.map((proj, idx) => {
              const projTitle = proj.title || proj.translations?.[0]?.title || proj.slug;
              const projSummary = proj.summary || proj.translations?.[0]?.summary || '';
              const rank = typeof proj.sortOrder === 'number' ? proj.sortOrder : idx + 1;

              return (
                <div
                  key={proj.id || proj.slug}
                  className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-[#07162C]/40 transition-colors"
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
                        title="Move Up (১ নম্বরে উপরে নিন)"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>

                      <span className="text-xs font-black text-[#087FC4] dark:text-[#20B8D5] py-0.5 px-1.5">
                        #{rank}
                      </span>

                      <button
                        type="button"
                        disabled={idx === projects.length - 1 || isUpdatingRank === proj.id}
                        onClick={() => handleMoveDown(proj, idx)}
                        className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 disabled:opacity-30 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                        title="Move Down (নিচে নামান)"
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

                        {proj.isFeatured && (
                          <span className="text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                            ★ Featured
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5 max-w-xl">
                        {projSummary || 'No summary provided.'}
                      </p>

                      <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1 font-mono">
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
                              Live Site <ExternalLink className="w-2.5 h-2.5" />
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
                    <button
                      type="button"
                      onClick={() => handleEdit(proj)}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-[#1E3557] hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5" />
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

      {/* Project Create / Edit Form */}
      <div ref={formRef}>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white dark:bg-[#0B1E3B] p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-[#1E3557] shadow-sm transition-colors duration-150"
        >
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#1E3557] pb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                {editingProject ? `Edit Project: ${title || slug}` : 'Add New Client Project'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Configure serial rank (১ নম্বর সবার উপরে দেখাবে), architecture specs, and live deployment links.
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

          {/* Row 1: Title & Slug */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Project Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Bangladesh Rural Health Network"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-[#087FC4]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Slug (URL Identifier) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="rural-health-network"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white text-xs sm:text-sm font-mono focus:outline-none focus:border-[#087FC4]"
              />
            </div>
          </div>

          {/* Row 2: Rank, Status & Live URL */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Display Serial (ক্রম)</span>
                <span className="text-[10px] text-[#087FC4] dark:text-[#20B8D5] font-bold">(১ = সবার উপরে)</span>
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

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Work Status
              </label>
              <select
                value={projectWorkStatus}
                onChange={(e) => setProjectWorkStatus(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-[#087FC4]"
              >
                <option value="COMPLETED">COMPLETED</option>
                <option value="ONGOING">ONGOING</option>
                <option value="INTERNAL">INTERNAL</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Live Preview URL
              </label>
              <input
                type="url"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                placeholder="https://example-client.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-[#087FC4]"
              />
            </div>
          </div>

          {/* Row 3: Summary */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Project Summary &amp; Overview
            </label>
            <textarea
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Enterprise architectural deployment engineered for high concurrency and localized workflows..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-[#087FC4]"
            />
          </div>

          {/* Row 4: Tech Stack Tags */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Technologies Used (Comma Separated)
            </label>
            <input
              type="text"
              value={techStackInput}
              onChange={(e) => setTechStackInput(e.target.value)}
              placeholder="Next.js, TypeScript, Tailwind CSS, NestJS, PostgreSQL, Redis"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-[#087FC4]"
            />
          </div>

          {/* Row 5: Repository URLs & Toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557]">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Frontend Repository URL
              </label>
              <input
                type="url"
                value={frontendRepoUrl}
                onChange={(e) => setFrontendRepoUrl(e.target.value)}
                placeholder="https://github.com/..."
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
                  Show frontend repository link publicly
                </span>
              </label>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Backend Repository URL
              </label>
              <input
                type="url"
                value={backendRepoUrl}
                onChange={(e) => setBackendRepoUrl(e.target.value)}
                placeholder="https://github.com/..."
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
                  Show backend repository link publicly
                </span>
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-[#1E3557]">
            {editingProject && (
              <button
                type="button"
                onClick={resetForm}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
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
                  <span>{editingProject ? 'Update Project' : 'Save & Publish Project'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
