'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import {
  getAdminServices,
  createAdminService,
  updateAdminService,
  deleteAdminService,
  AdminServicePayload,
} from '@/lib/api/admin';
import {
  Layers,
  ExternalLink,
  Edit,
  Trash2,
  Plus,
  RefreshCw,
  Code2,
  CheckCircle2,
  ArrowUp,
  ArrowDown,
  Save,
  XCircle,
  Loader2,
  Cpu,
  Globe,
  Smartphone,
  Cloud,
  ShieldCheck,
  Database,
  Palette,
  Workflow,
  ListOrdered,
} from 'lucide-react';

interface ServiceRecord {
  id?: string;
  slug: string;
  title?: string;
  name?: string;
  summary?: string;
  description?: string;
  icon?: string | null;
  sortOrder?: number;
  order?: number;
  isActive?: boolean;
  isPublished?: boolean;
  createdAt?: string;
  updatedAt?: string;
  translations?: Array<{
    name?: string;
    title?: string;
    summary?: string;
    status?: string;
    locale?: string;
  }>;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingService, setEditingService] = useState<ServiceRecord | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isUpdatingRank, setIsUpdatingRank] = useState<string | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('Code2');
  const [sortOrder, setSortOrder] = useState<number>(1);
  const [isPublished, setIsPublished] = useState<boolean>(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const formRef = useRef<HTMLDivElement>(null);

  const sortServicesByRank = (list: ServiceRecord[]) => {
    return [...list].sort((a, b) => {
      const orderA = typeof a.sortOrder === 'number' ? a.sortOrder : (typeof a.order === 'number' ? a.order : 999);
      const orderB = typeof b.sortOrder === 'number' ? b.sortOrder : (typeof b.order === 'number' ? b.order : 999);
      return orderA - orderB;
    });
  };

  const fetchServices = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAdminServices();
      const list = Array.isArray(data)
        ? (data as unknown as ServiceRecord[])
        : ((data as unknown as { data?: ServiceRecord[] })?.data || []);
      setServices(sortServicesByRank(list));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to fetch services');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    getAdminServices()
      .then((data) => {
        if (!active) return;
        const list = Array.isArray(data)
          ? (data as unknown as ServiceRecord[])
          : ((data as unknown as { data?: ServiceRecord[] })?.data || []);
        setServices(sortServicesByRank(list));
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (!active) return;
        setError(err instanceof Error ? err.message : 'Failed to fetch services');
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
    setDescription('');
    setIcon('Code2');
    setSortOrder(services.length + 1);
    setIsPublished(true);
    setFormSuccess(null);
    setFormError(null);
    setEditingService(null);
  };

  const handleEdit = (svc: ServiceRecord) => {
    setEditingService(svc);
    const svcTitle = svc.title || svc.name || svc.translations?.[0]?.name || svc.translations?.[0]?.title || '';
    const svcSummary = svc.summary || svc.translations?.[0]?.summary || '';
    setTitle(svcTitle);
    setSlug(svc.slug || '');
    setSummary(svcSummary);
    setDescription(svc.description || '');
    setIcon(svc.icon || 'Code2');
    setSortOrder(typeof svc.sortOrder === 'number' ? svc.sortOrder : (typeof svc.order === 'number' ? svc.order : 1));
    const isPub = svc.isPublished !== undefined ? svc.isPublished : (svc.isActive !== false);
    setIsPublished(isPub);

    setFormSuccess(null);
    setFormError(null);
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingService) {
      const generated = val
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setSlug(generated);
    }
  };

  const handleUpdateRank = async (svc: ServiceRecord, newRank: number) => {
    if (!svc.id || newRank < 1) return;
    setIsUpdatingRank(svc.id);
    try {
      await updateAdminService(svc.id, { sortOrder: newRank, order: newRank });
      await fetchServices();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to update serial rank');
    } finally {
      setIsUpdatingRank(null);
    }
  };

  const handleMoveUp = (svc: ServiceRecord, currentIndex: number) => {
    if (currentIndex <= 0) return;
    const prevSvc = services[currentIndex - 1];
    const prevRank = prevSvc.sortOrder ?? prevSvc.order ?? 1;
    const targetRank = Math.max(1, prevRank - 1);
    handleUpdateRank(svc, targetRank);
  };

  const handleMoveDown = (svc: ServiceRecord, currentIndex: number) => {
    if (currentIndex >= services.length - 1) return;
    const nextSvc = services[currentIndex + 1];
    const nextRank = nextSvc.sortOrder ?? nextSvc.order ?? (currentIndex + 1);
    const targetRank = nextRank + 1;
    handleUpdateRank(svc, targetRank);
  };

  const handleDelete = async (svc: ServiceRecord) => {
    if (!svc.id) return;
    const svcTitle = svc.title || svc.name || svc.slug;
    if (!confirm(`Delete service "${svcTitle}"? This cannot be undone.`)) return;

    setIsDeleting(svc.id);
    try {
      await deleteAdminService(svc.id);
      if (editingService?.id === svc.id) resetForm();
      await fetchServices();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to delete service');
    } finally {
      setIsDeleting(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim()) {
      setFormError('Service title and slug are required');
      return;
    }

    setIsSubmitting(true);
    setFormSuccess(null);
    setFormError(null);

    const payload: AdminServicePayload = {
      title: title.trim(),
      name: title.trim(),
      slug: slug.trim().toLowerCase(),
      summary: summary.trim(),
      description: description.trim(),
      icon: icon.trim() || null,
      sortOrder: Number(sortOrder) || 1,
      order: Number(sortOrder) || 1,
      isActive: isPublished,
      isPublished: isPublished,
      status: isPublished ? 'PUBLISHED' : 'DRAFT',
    };

    try {
      if (editingService?.id) {
        await updateAdminService(editingService.id, payload);
        setFormSuccess(`Service "${title}" updated successfully!`);
      } else {
        await createAdminService(payload);
        setFormSuccess(`Service "${title}" created successfully!`);
        resetForm();
      }
      await fetchServices();
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : 'Failed to save service');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getIconPreview = (iconName?: string | null) => {
    switch (iconName?.toLowerCase()) {
      case 'code2':
      case 'code':
        return <Code2 className="w-4 h-4 text-[#087FC4]" />;
      case 'cpu':
        return <Cpu className="w-4 h-4 text-violet-500" />;
      case 'globe':
      case 'web':
        return <Globe className="w-4 h-4 text-cyan-500" />;
      case 'smartphone':
      case 'mobile':
        return <Smartphone className="w-4 h-4 text-indigo-500" />;
      case 'cloud':
        return <Cloud className="w-4 h-4 text-sky-500" />;
      case 'shieldcheck':
      case 'shield':
        return <ShieldCheck className="w-4 h-4 text-rose-500" />;
      case 'database':
        return <Database className="w-4 h-4 text-amber-500" />;
      case 'palette':
      case 'design':
        return <Palette className="w-4 h-4 text-pink-500" />;
      case 'workflow':
        return <Workflow className="w-4 h-4 text-emerald-500" />;
      default:
        return <Layers className="w-4 h-4 text-[#087FC4]" />;
    }
  };

  const activeCount = services.filter((s) => s.isActive !== false && s.isPublished !== false).length;
  const draftCount = services.length - activeCount;
  const topService = services[0];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              Client Services Management
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#087FC4]/10 text-[#087FC4] dark:text-[#20B8D5]">
              CMS
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage company capabilities, display rankings (ক্রম/সিরিয়াল), status, and descriptions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={fetchServices}
            disabled={loading}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-[#1E3557] hover:bg-slate-100 dark:hover:bg-[#103B68]/40 text-slate-600 dark:text-slate-300 transition-colors"
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
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#087FC4] to-[#20B8D5] hover:opacity-95 text-white font-bold text-xs shadow-md shadow-[#087FC4]/25 flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New Service</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Services</div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">{services.length}</div>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-500">Active / Live</div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{activeCount}</div>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-amber-500">Drafts / Inactive</div>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">{draftCount}</div>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#087FC4]">Rank #1 (Top Priority)</div>
          <div className="text-sm font-extrabold text-[#087FC4] dark:text-[#20B8D5] mt-2 truncate">
            {topService ? (topService.title || topService.name || topService.slug) : 'None'}
          </div>
        </div>
      </div>

      {/* Create / Edit Form Card */}
      <div
        ref={formRef}
        className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] shadow-xs space-y-6"
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-[#1E3557]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#087FC4]/10 dark:bg-[#20B8D5]/15 flex items-center justify-center text-[#087FC4] dark:text-[#20B8D5]">
              {editingService ? <Edit className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                {editingService ? `Edit Service: ${editingService.title || editingService.name || editingService.slug}` : 'Create New Service'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Configure service title, display priority rank, icon, summary, and public status.
              </p>
            </div>
          </div>

          {editingService && (
            <button
              type="button"
              onClick={resetForm}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center gap-1 transition-colors"
            >
              <XCircle className="w-4 h-4" /> Cancel Edit
            </button>
          )}
        </div>

        {formSuccess && (
          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{formSuccess}</span>
          </div>
        )}

        {formError && (
          <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs font-semibold flex items-center gap-2">
            <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Service Name / Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Custom Software Development"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white font-medium focus:outline-none focus:border-[#087FC4]"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Slug (URL Identifier) <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. custom-software-development"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white font-mono focus:outline-none focus:border-[#087FC4]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
                <ListOrdered className="w-3.5 h-3.5 text-[#087FC4]" />
                Display Rank / Serial Number (ক্রম)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={1}
                  value={sortOrder}
                  onChange={(e) => setSortOrder(parseInt(e.target.value, 10) || 1)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white font-bold focus:outline-none focus:border-[#087FC4]"
                />
                <span className="absolute right-3 top-2.5 text-[11px] font-mono text-[#087FC4] dark:text-[#20B8D5] font-bold">
                  #{sortOrder}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">
                (১ = সবার উপরে হোমপেজে ও সার্ভিসে শীর্ষে থাকবে)
              </p>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Icon Identifier
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  placeholder="Code2, Cpu, Globe, Cloud, Database..."
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white font-medium focus:outline-none focus:border-[#087FC4]"
                />
                <div className="absolute left-3 top-2.5">
                  {getIconPreview(icon)}
                </div>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">
                Lucide icon name (e.g. Code2, Cpu, Globe, Cloud, ShieldCheck)
              </p>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Publication Status
              </label>
              <label className="flex items-center gap-2.5 mt-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="w-4 h-4 rounded text-[#087FC4] focus:ring-[#087FC4] accent-[#087FC4]"
                />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Published &amp; Active on Website
                </span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
              Short Summary (কার্ডে প্রদর্শনের জন্য বিবরণ)
            </label>
            <input
              type="text"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Tailor-made software solutions designed to solve complex business problems..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white font-medium focus:outline-none focus:border-[#087FC4]"
            />
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
              Detailed Description (সার্ভিস পেজের পূর্ণাঙ্গ বর্ণনা)
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Full architectural scope, development lifecycle, tech stacks, and delivery models..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white font-medium leading-relaxed focus:outline-none focus:border-[#087FC4]"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            {editingService && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#1E3557] text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#1E3557] font-semibold transition-colors"
              >
                Cancel
              </button>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#087FC4] to-[#20B8D5] hover:opacity-95 text-white font-bold shadow-md shadow-[#087FC4]/25 flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{editingService ? 'Update Service' : 'Create Service'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Services Table List */}
      <div className="rounded-2xl bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-[#1E3557] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              All Client Services ({services.length})
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Sorted by display rank (১ = সবার উপরে). Click ▲ / ▼ for instant reordering.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Live DB Sync</span>
          </div>
        </div>

        {loading ? (
          <div className="p-12 flex flex-col items-center justify-center text-slate-400 space-y-3">
            <div className="w-6 h-6 border-2 border-[#087FC4] border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-semibold">Loading services catalogue...</span>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-rose-500 text-xs font-semibold space-y-2">
            <p>{error}</p>
            <button
              onClick={fetchServices}
              className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold"
            >
              Try Again
            </button>
          </div>
        ) : services.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs">
            No services found. Click &quot;New Service&quot; above to create your first capability.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 dark:bg-[#07162C]/60 text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider text-[11px] border-b border-slate-200/80 dark:border-[#1E3557]">
                <tr>
                  <th className="py-3 px-4 w-28 text-center">Rank (সিরিয়াল)</th>
                  <th className="py-3 px-4">Service Name</th>
                  <th className="py-3 px-4">Slug</th>
                  <th className="py-3 px-4">Summary</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#1E3557]">
                {services.map((svc, index) => {
                  const svcTitle =
                    svc.title ||
                    svc.name ||
                    svc.translations?.[0]?.name ||
                    svc.translations?.[0]?.title ||
                    svc.slug;
                  const svcSummary = svc.summary || svc.translations?.[0]?.summary || '—';
                  const isPub = svc.isActive !== false && svc.isPublished !== false;
                  const rankNum = typeof svc.sortOrder === 'number' ? svc.sortOrder : (typeof svc.order === 'number' ? svc.order : index + 1);

                  return (
                    <tr
                      key={svc.id || svc.slug}
                      className="hover:bg-slate-50/60 dark:hover:bg-[#103B68]/20 transition-colors group"
                    >
                      {/* Rank & Reorder Controls */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center justify-center gap-1.5">
                          <span className="font-mono font-black text-xs px-2 py-0.5 rounded-md bg-[#087FC4]/10 text-[#087FC4] dark:text-[#20B8D5]">
                            #{rankNum}
                          </span>

                          <div className="flex flex-col gap-0.5">
                            <button
                              type="button"
                              onClick={() => handleMoveUp(svc, index)}
                              disabled={index === 0 || isUpdatingRank === svc.id}
                              title="Move Up (সবার উপরে আনুন)"
                              className="p-1 rounded hover:bg-slate-200 dark:hover:bg-[#1E3557] text-slate-500 hover:text-[#087FC4] dark:hover:text-[#20B8D5] disabled:opacity-20 cursor-pointer"
                            >
                              <ArrowUp className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleMoveDown(svc, index)}
                              disabled={index === services.length - 1 || isUpdatingRank === svc.id}
                              title="Move Down (নিচে নিন)"
                              className="p-1 rounded hover:bg-slate-200 dark:hover:bg-[#1E3557] text-slate-500 hover:text-[#087FC4] dark:hover:text-[#20B8D5] disabled:opacity-20 cursor-pointer"
                            >
                              <ArrowDown className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </td>

                      {/* Title & Icon */}
                      <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-[#103B68]/60 flex items-center justify-center shrink-0">
                            {getIconPreview(svc.icon)}
                          </div>
                          <span className="max-w-[200px] truncate">{svcTitle}</span>
                        </div>
                      </td>

                      {/* Slug */}
                      <td className="py-3.5 px-4 font-mono text-slate-500 text-[11px]">
                        /services/{svc.slug}
                      </td>

                      {/* Summary */}
                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 max-w-[260px] truncate">
                        {svcSummary}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                            isPub
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                              : 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${isPub ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                          {isPub ? 'LIVE' : 'DRAFT'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/services/${svc.slug}`}
                            target="_blank"
                            title="View Public Page"
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-[#1E3557] hover:bg-slate-100 dark:hover:bg-[#103B68]/40 text-slate-600 dark:text-slate-300 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleEdit(svc)}
                            title="Edit Service"
                            className="p-1.5 rounded-lg bg-[#087FC4]/10 hover:bg-[#087FC4]/20 text-[#087FC4] dark:text-[#20B8D5] transition-colors cursor-pointer"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(svc)}
                            disabled={isDeleting === svc.id}
                            title="Delete Service"
                            className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 transition-colors cursor-pointer disabled:opacity-40"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
