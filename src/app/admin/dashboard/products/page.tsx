/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Layers,
  ExternalLink,
  Edit,
  Trash2,
  Plus,
  RefreshCw,
  Copy,
  Eye,
  CheckCircle2,
  Clock,
  Archive,
  Search,
  Move,
  Star,
  FileEdit,
  AlertCircle,
} from 'lucide-react';
import {
  getAdminProducts,
  getAdminProductCategories,
  getAdminProductById,
  deleteAdminProduct,
  duplicateAdminProduct,
  updateAdminProductStatus,
} from '@/lib/api/admin';
import type {
  ProductRecord,
  ProductCategory,
  ProductKpiStats,
  ProductStatus,
} from '@/types/product.types';
import { ProductKpiCards } from '@/components/admin/products/ProductKpiCards';
import { ProductReorderModal } from '@/components/admin/products/ProductReorderModal';
import { ProductPreviewModal } from '@/components/admin/products/ProductPreviewModal';
import { ProductBuilderForm } from '@/components/admin/products/ProductBuilderForm';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductRecord[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [kpi, setKpi] = useState<ProductKpiStats>({
    total: 0,
    published: 0,
    draft: 0,
    featured: 0,
    comingSoon: 0,
    archived: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  // Modals & Builders
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductRecord | null>(null);
  const [isReorderModalOpen, setIsReorderModalOpen] = useState(false);
  const [previewProduct, setPreviewProduct] = useState<ProductRecord | null>(null);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
  const [isDuplicatingId, setIsDuplicatingId] = useState<string | null>(null);

  const builderRef = useRef<HTMLDivElement>(null);

  const fetchProductsAndCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [prodRes, catList] = await Promise.all([
        getAdminProducts(),
        getAdminProductCategories().catch(() => []),
      ]);

      setProducts(prodRes.data || []);
      setKpi(prodRes.kpi || {
        total: 0,
        published: 0,
        draft: 0,
        featured: 0,
        comingSoon: 0,
        archived: 0,
      });
      setCategories(catList);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch products';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProductsAndCategories();
  }, [fetchProductsAndCategories]);

  // Open Form to Add New
  const handleAddNew = () => {
    setEditingProduct(null);
    setIsBuilderOpen(true);
    setTimeout(() => {
      builderRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Open Form to Edit
  const handleEdit = async (product: ProductRecord) => {
    try {
      const fullDetail = await getAdminProductById(product.id);
      setEditingProduct(fullDetail);
    } catch {
      setEditingProduct(product);
    }
    setIsBuilderOpen(true);
    setTimeout(() => {
      builderRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Duplicate Product
  const handleDuplicate = async (id: string) => {
    setIsDuplicatingId(id);
    try {
      await duplicateAdminProduct(id);
      await fetchProductsAndCategories();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to duplicate product');
    } finally {
      setIsDuplicatingId(null);
    }
  };

  // Toggle Publish / Draft Status
  const handleToggleStatus = async (product: ProductRecord) => {
    const nextStatus: ProductStatus =
      product.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
    try {
      await updateAdminProductStatus(product.id, nextStatus);
      await fetchProductsAndCategories();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to toggle product status');
    }
  };

  // Delete Product with confirmation
  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${name}"? This action cannot be undone.`)) {
      return;
    }

    setIsDeletingId(id);
    try {
      await deleteAdminProduct(id);
      if (editingProduct?.id === id) {
        setIsBuilderOpen(false);
        setEditingProduct(null);
      }
      await fetchProductsAndCategories();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to delete product');
    } finally {
      setIsDeletingId(null);
    }
  };

  // Filtered products list
  const filteredProducts = products.filter((p) => {
    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = (p.title || p.name || '').toLowerCase().includes(q);
      const matchSlug = p.slug.toLowerCase().includes(q);
      const matchDesc = (p.shortDescription || p.description || '').toLowerCase().includes(q);
      if (!matchTitle && !matchSlug && !matchDesc) return false;
    }

    // Category
    if (categoryFilter !== 'ALL' && p.categoryId !== categoryFilter && p.categorySlug !== categoryFilter) {
      return false;
    }

    // KPI / Status Pill filter
    if (statusFilter === 'PUBLISHED' && p.status !== 'PUBLISHED') return false;
    if (statusFilter === 'DRAFT' && p.status !== 'DRAFT') return false;
    if (statusFilter === 'ARCHIVED' && p.status !== 'ARCHIVED') return false;
    if (statusFilter === 'FEATURED' && !p.isFeatured) return false;
    if (statusFilter === 'COMING_SOON' && p.stage !== 'COMING_SOON' && p.stage !== 'PLANNED') return false;

    return true;
  });

  return (
    <div className="space-y-6 pb-20">
      {/* Top Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">Product Management</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
              CMS Engine
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Manage company software platforms, modules, media galleries, and display rankings.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setIsReorderModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold inline-flex items-center gap-2 transition-colors"
          >
            <Move className="w-3.5 h-3.5" />
            <span>Manage Display Order</span>
          </button>

          <button
            type="button"
            onClick={fetchProductsAndCategories}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            title="Refresh Products"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            type="button"
            onClick={handleAddNew}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-md shadow-blue-600/30 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* KPI Overview Strip */}
      <ProductKpiCards
        kpi={kpi}
        selectedFilter={statusFilter}
        onSelectFilter={(f) => setStatusFilter(f)}
      />

      {/* Product Builder Anchor */}
      <div ref={builderRef}>
        {isBuilderOpen && (
          <ProductBuilderForm
            key={editingProduct?.id || 'new'}
            initialData={editingProduct}
            categories={categories}
            onSaved={() => {
              setIsBuilderOpen(false);
              setEditingProduct(null);
              fetchProductsAndCategories();
            }}
            onCancel={() => {
              setIsBuilderOpen(false);
              setEditingProduct(null);
            }}
            onPreview={(product) => setPreviewProduct(product)}
          />
        )}
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by product name, slug or description..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-xs focus:border-blue-500 focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:border-blue-500 focus:outline-hidden"
          >
            <option value="ALL">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <span className="text-xs text-slate-400">
            Showing <strong className="text-white">{filteredProducts.length}</strong> products
          </span>
        </div>
      </div>

      {/* Products Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider font-bold text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4 w-12 text-center">Rank</th>
                <th className="py-3.5 px-4">Product Details</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4 text-center">Stage & Status</th>
                <th className="py-3.5 px-4 text-center">Placements</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredProducts.map((p, idx) => {
                const cover =
                  p.mediaItems?.find((m) => m.isPrimary)?.url ||
                  p.mediaItems?.[0]?.url ||
                  p.images?.[0] ||
                  null;

                return (
                  <tr key={p.id} className="hover:bg-slate-800/40 transition-colors group">
                    {/* Rank / Display Order */}
                    <td className="py-4 px-4 text-center">
                      <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-400 font-mono text-xs font-bold inline-flex items-center justify-center border border-slate-700/60">
                        {p.displayOrder || idx + 1}
                      </span>
                    </td>

                    {/* Product Name & Slug */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-10 rounded-lg overflow-hidden bg-slate-800 border border-slate-700 shrink-0">
                          {cover ? (
                            <img src={cover} alt={p.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-600">
                              <Layers className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                              {p.title || p.name}
                            </span>
                            {p.isFeatured && (
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                                <Star className="w-2.5 h-2.5 fill-amber-400" />
                                <span>Featured</span>
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-400 font-mono">/products/{p.slug}</span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700/60 whitespace-nowrap">
                        {p.category?.name || p.categoryName || 'Software Product'}
                      </span>
                    </td>

                    {/* Stage & Status */}
                    <td className="py-4 px-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                            p.status === 'PUBLISHED'
                              ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                              : p.status === 'DRAFT'
                              ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                              : 'bg-slate-500/15 text-slate-400 border-slate-500/30'
                          }`}
                        >
                          {p.status || 'PUBLISHED'}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase">{p.stage || 'LIVE'}</span>
                      </div>
                    </td>

                    {/* Placements */}
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5 text-[10px]">
                        <span
                          className={`px-1.5 py-0.5 rounded ${
                            p.showOnHomepage ? 'bg-blue-500/15 text-blue-400' : 'bg-slate-800 text-slate-600'
                          }`}
                          title={`Homepage order: ${p.homepageOrder}`}
                        >
                          Home #{p.homepageOrder || 1}
                        </span>
                        <span
                          className={`px-1.5 py-0.5 rounded ${
                            p.showInNavDropdown ? 'bg-cyan-500/15 text-cyan-400' : 'bg-slate-800 text-slate-600'
                          }`}
                          title={`Navbar order: ${p.navOrder}`}
                        >
                          Nav #{p.navOrder || 1}
                        </span>
                      </div>
                    </td>

                    {/* Row Actions */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {/* Live Preview Button */}
                        <button
                          type="button"
                          onClick={() => setPreviewProduct(p)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                          title="Preview Product"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {/* Edit Button */}
                        <button
                          type="button"
                          onClick={() => handleEdit(p)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-slate-800 transition-colors"
                          title="Edit in 8-Tab Builder"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        {/* Duplicate Button */}
                        <button
                          type="button"
                          onClick={() => handleDuplicate(p.id)}
                          disabled={isDuplicatingId === p.id}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-slate-800 transition-colors disabled:opacity-40"
                          title="Clone as New Draft"
                        >
                          <Copy className={`w-4 h-4 ${isDuplicatingId === p.id ? 'animate-spin' : ''}`} />
                        </button>

                        {/* Quick Status Toggle */}
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(p)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            p.status === 'PUBLISHED'
                              ? 'text-emerald-400 hover:bg-emerald-500/10'
                              : 'text-amber-400 hover:bg-amber-500/10'
                          }`}
                          title={p.status === 'PUBLISHED' ? 'Unpublish to Draft' : 'Publish Live'}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => handleDelete(p.id, p.title || p.slug)}
                          disabled={isDeletingId === p.id}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors disabled:opacity-40"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && !loading && (
          <div className="p-12 text-center text-slate-400">
            <Layers className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-sm font-semibold">No products match your search or filter.</p>
          </div>
        )}
      </div>

      {/* Display Order Manager Modal */}
      <ProductReorderModal
        products={products}
        isOpen={isReorderModalOpen}
        onClose={() => setIsReorderModalOpen(false)}
        onSuccess={() => fetchProductsAndCategories()}
      />

      {/* Draft Preview Modal */}
      <ProductPreviewModal
        product={previewProduct}
        isOpen={Boolean(previewProduct)}
        onClose={() => setPreviewProduct(null)}
      />
    </div>
  );
}
