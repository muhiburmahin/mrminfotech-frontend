'use client';

import React, { useState, useCallback, useRef } from 'react';
import { Layers, ExternalLink, Edit, Trash2, Plus, RefreshCw, Copy, Search, Move, Star, Tag, Code2 } from 'lucide-react';
import {
  getAdminServices,
  getAdminServiceCategories,
  getAdminServiceById,
  deleteAdminService,
  duplicateAdminService,
  updateAdminServiceStatus,
} from '@/lib/api/admin';
import type {
  ServiceRecord,
  ServiceCategory,
  ServiceKpiStats,
} from '@/types/service.types';
import { ServiceBuilderForm } from '@/components/admin/services/ServiceBuilderForm';
import { ServiceReorderModal } from '@/components/admin/services/ServiceReorderModal';
import { ServiceCategoryModal } from '@/components/admin/services/ServiceCategoryModal';
import { useDeferredEffect } from '@/lib/hooks/useDeferredEffect';

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceRecord[]>([]);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [kpi, setKpi] = useState<ServiceKpiStats>({
    total: 0,
    published: 0,
    draft: 0,
    featured: 0,
    categories: 0,
    archived: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  // Modals & Form
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceRecord | null>(null);
  const [isReorderModalOpen, setIsReorderModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
  const [isDuplicatingId, setIsDuplicatingId] = useState<string | null>(null);

  const builderRef = useRef<HTMLDivElement>(null);

  const fetchServicesAndCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [svcRes, catList] = await Promise.all([
        getAdminServices(),
        getAdminServiceCategories().catch(() => []),
      ]);

      const dataList = svcRes.data || [];
      setServices(dataList);
      setCategories(catList);

      setKpi(
        svcRes.kpi || {
          total: dataList.length,
          published: dataList.filter((s) => s.status === 'PUBLISHED').length,
          draft: dataList.filter((s) => s.status === 'DRAFT').length,
          featured: dataList.filter((s) => s.isFeatured).length,
          categories: catList.length,
          archived: dataList.filter((s) => s.status === 'ARCHIVED').length,
        }
      );
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch services';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useDeferredEffect(() => fetchServicesAndCategories(), [fetchServicesAndCategories]);

  const handleCreateNew = () => {
    setEditingService(null);
    setIsBuilderOpen(true);
    setTimeout(() => {
      builderRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleEdit = async (svc: ServiceRecord) => {
    try {
      const full = await getAdminServiceById(svc.id);
      setEditingService(full);
      setIsBuilderOpen(true);
      setTimeout(() => {
        builderRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to load full service details');
    }
  };

  const handleDuplicate = async (svc: ServiceRecord) => {
    if (!confirm(`Duplicate service "${svc.title || svc.name || svc.slug}"? A copy will be created as a Draft.`)) {
      return;
    }
    setIsDuplicatingId(svc.id);
    try {
      await duplicateAdminService(svc.id);
      await fetchServicesAndCategories();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to duplicate service');
    } finally {
      setIsDuplicatingId(null);
    }
  };

  const handleDelete = async (svc: ServiceRecord) => {
    if (!confirm(`Are you sure you want to delete "${svc.title || svc.name || svc.slug}"? This cannot be undone.`)) {
      return;
    }
    setIsDeletingId(svc.id);
    try {
      await deleteAdminService(svc.id);
      if (editingService?.id === svc.id) {
        setIsBuilderOpen(false);
        setEditingService(null);
      }
      await fetchServicesAndCategories();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to delete service');
    } finally {
      setIsDeletingId(null);
    }
  };

  const handleToggleStatus = async (svc: ServiceRecord) => {
    const nextStatus = svc.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
    try {
      await updateAdminServiceStatus(svc.id, nextStatus);
      await fetchServicesAndCategories();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to update publishing status');
    }
  };

  // Filter logic
  const filteredServices = services.filter((svc) => {
    const titleMatch = (svc.title || svc.name || '')
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const slugMatch = (svc.slug || '')
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesSearch = titleMatch || slugMatch;

    const matchesStatus =
      statusFilter === 'ALL' || svc.status === statusFilter;

    const matchesCategory =
      categoryFilter === 'ALL' || svc.categoryId === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="space-y-8 select-none">
      {/* Top Banner & Primary Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Layers className="w-3.5 h-3.5" />
            <span>SERVICES MANAGEMENT &amp; SHOWCASE SYSTEM</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Client Services Catalog
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
            Manage public digital services, offerings, capability pillars, 6-step engineering workflows, and multi-placement priority ordering.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsCategoryModalOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all cursor-pointer"
          >
            <Tag className="w-3.5 h-3.5 text-cyan-400" />
            <span>Categories</span>
          </button>

          <button
            type="button"
            onClick={() => setIsReorderModalOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all cursor-pointer"
          >
            <Move className="w-3.5 h-3.5 text-blue-400" />
            <span>Priorities &amp; Reorder</span>
          </button>

          <button
            type="button"
            onClick={fetchServicesAndCategories}
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center border border-slate-700 transition-all cursor-pointer"
            title="Refresh Services"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            type="button"
            onClick={handleCreateNew}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Service</span>
          </button>
        </div>
      </div>

      {error && (
        <div role="alert" className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-xs font-medium text-rose-300">
          {error}
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Total Services
          </p>
          <p className="text-2xl font-black text-white mt-1">{kpi.total}</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <p className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
            Published (Live)
          </p>
          <p className="text-2xl font-black text-emerald-400 mt-1">{kpi.published}</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
            Draft
          </p>
          <p className="text-2xl font-black text-amber-400 mt-1">{kpi.draft}</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <p className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">
            Featured Bento
          </p>
          <p className="text-2xl font-black text-blue-400 mt-1">{kpi.featured}</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <p className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
            Categories
          </p>
          <p className="text-2xl font-black text-cyan-400 mt-1">{kpi.categories}</p>
        </div>
      </div>

      {/* Builder Form Container */}
      {isBuilderOpen && (
        <div ref={builderRef}>
          <ServiceBuilderForm
            initialData={editingService}
            categories={categories}
            onSaved={() => {
              setIsBuilderOpen(false);
              setEditingService(null);
              fetchServicesAndCategories();
            }}
            onCancel={() => {
              setIsBuilderOpen(false);
              setEditingService(null);
            }}
          />
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-[260px] bg-slate-950/70 border border-slate-800 px-3.5 py-2 rounded-xl">
          <Search className="w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search services by title or slug..."
            className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-hidden"
          >
            <option value="ALL">All Statuses</option>
            <option value="PUBLISHED">Published Only</option>
            <option value="DRAFT">Draft Only</option>
            <option value="IN_REVIEW">In Review</option>
            <option value="ARCHIVED">Archived</option>
          </select>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-hidden"
          >
            <option value="ALL">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Services Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Service</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Placements &amp; Order</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredServices.map((svc) => {
                const titleStr = svc.title || svc.name || svc.slug;
                const isPub = svc.status === 'PUBLISHED';
                const cat = categories.find((c) => c.id === svc.categoryId);

                return (
                  <tr
                    key={svc.id}
                    className="hover:bg-slate-800/40 transition-colors group"
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shrink-0 border border-white/10 shadow-sm"
                          style={{ backgroundColor: svc.primaryColor || '#2563EB' }}
                        >
                          <Code2 className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm truncate">
                              {titleStr}
                            </span>
                            {svc.isFeatured && (
                              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
                            )}
                          </div>
                          <span className="text-[11px] font-mono text-slate-400 block truncate">
                            /services/{svc.slug}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      {cat ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-200 text-[11px] font-semibold">
                          <Tag className="w-3 h-3 text-cyan-400" />
                          <span>{cat.name}</span>
                        </span>
                      ) : (
                        <span className="text-slate-500 text-[11px]">—</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2 flex-wrap">
                        {svc.showOnServicesPage && (
                          <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-mono">
                            Catalog #{svc.servicesPageOrder ?? 0}
                          </span>
                        )}
                        {svc.showOnHomepage && (
                          <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono">
                            Home #{svc.homepageOrder ?? 0}
                          </span>
                        )}
                        {svc.showInNavbar && (
                          <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[10px] font-mono">
                            Nav #{svc.navbarOrder ?? 0}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(svc)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border transition-all cursor-pointer ${
                          isPub
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isPub ? 'bg-emerald-400' : 'bg-amber-400'
                          }`}
                        />
                        <span>{svc.status || (isPub ? 'PUBLISHED' : 'DRAFT')}</span>
                      </button>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1">
                        <a
                          href={`/services/${svc.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                          title="View Live Page"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>

                        <button
                          type="button"
                          onClick={() => handleEdit(svc)}
                          className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-400 hover:text-blue-300 flex items-center justify-center transition-colors"
                          title="Edit in Modular Builder"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          disabled={isDuplicatingId === svc.id}
                          onClick={() => handleDuplicate(svc)}
                          className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors disabled:opacity-50"
                          title="Duplicate Service"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          disabled={isDeletingId === svc.id}
                          onClick={() => handleDelete(svc)}
                          className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-rose-400 hover:text-rose-300 flex items-center justify-center transition-colors disabled:opacity-50"
                          title="Delete Service"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredServices.length === 0 && !loading && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500">
                    No services match the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <ServiceReorderModal
        services={services}
        isOpen={isReorderModalOpen}
        onClose={() => setIsReorderModalOpen(false)}
        onSuccess={fetchServicesAndCategories}
      />

      <ServiceCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onSuccess={fetchServicesAndCategories}
      />
    </div>
  );
}
