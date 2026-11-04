/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ProductForm, AdminProductRecord } from '@/components/admin/forms/ProductForm';
import { getAdminProducts, deleteAdminProduct } from '@/lib/api/admin';
import {
  Layers,
  ExternalLink,
  Edit,
  Trash2,
  Plus,
  RefreshCw,
  Lock,
  Code2,
  Image as ImageIcon,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<AdminProductRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<AdminProductRecord | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const formRef = useRef<HTMLDivElement>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAdminProducts();
      const list = Array.isArray(data)
        ? (data as unknown as AdminProductRecord[])
        : ((data as { data?: AdminProductRecord[] })?.data || []);
      setProducts(list);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch products';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    getAdminProducts()
      .then((data) => {
        if (!active) return;
        const list = Array.isArray(data)
          ? (data as unknown as AdminProductRecord[])
          : ((data as { data?: AdminProductRecord[] })?.data || []);
        setProducts(list);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (!active) return;
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const handleEdit = (product: AdminProductRecord) => {
    setEditingProduct(product);
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDelete = async (product: AdminProductRecord) => {
    if (!product.id) return;
    const title = product.title || product.name || product.slug || 'this product';
    if (!confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) {
      return;
    }

    setIsDeleting(product.id);
    try {
      await deleteAdminProduct(product.id);
      if (editingProduct?.id === product.id) {
        setEditingProduct(null);
      }
      await fetchProducts();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to delete product');
    } finally {
      setIsDeleting(null);
    }
  };

  // Stats calculation
  const totalProducts = products.length;
  const liveProducts = products.filter((p) => p.stage === 'LIVE').length;
  const betaProducts = products.filter((p) => p.stage === 'BETA' || p.stage === 'COMING_SOON').length;
  const privateSourceCount = products.filter((p) => p.isSourcePrivate).length;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
            <Layers className="w-6 h-6 text-[#087FC4] dark:text-[#20B8D5]" />
            SaaS Products Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage proprietary software engines, multi-screenshot galleries, live URLs, and source code privacy.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchProducts}
            disabled={loading}
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Refresh Products"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            onClick={handleAddNew}
            className="px-4 py-2 rounded-xl bg-[#087FC4] hover:bg-[#103B68] text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Add New Product
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Products</span>
            <Layers className="w-4 h-4 text-[#087FC4]" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-2">{totalProducts}</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Live in Production</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-2">{liveProducts}</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Beta / Roadmap</span>
            <Clock className="w-4 h-4 text-cyan-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-2">{betaProducts}</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Private IP Repos</span>
            <Lock className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-2">{privateSourceCount}</p>
        </div>
      </div>

      {/* Products Catalog Table / List */}
      <div className="bg-white dark:bg-[#0B1E3B] rounded-2xl border border-slate-200 dark:border-[#1E3557] overflow-hidden shadow-xs">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-[#1E3557] flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#087FC4] dark:text-[#20B8D5]" />
            Active SaaS Products Catalog ({products.length})
          </h2>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 text-red-500 text-xs border-b border-red-500/20">
            {error}
          </div>
        )}

        {loading ? (
          <div className="p-12 text-center text-slate-400 text-xs flex flex-col items-center gap-3">
            <RefreshCw className="w-5 h-5 animate-spin text-[#087FC4]" />
            Loading products from database...
          </div>
        ) : products.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs">
            No products found in the database. Use the form below to create your first SaaS product.
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-[#1E3557]">
            {products.map((product) => {
              const title = product.title || product.name || product.slug || 'Untitled Product';
              const tagline = product.tagline || 'SaaS Product';
              const images = Array.isArray(product.images) && product.images.length > 0 ? product.images : [];
              const thumbnail = images[0] || null;

              return (
                <div
                  key={product.id || product.slug}
                  className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-[#07162C]/40 transition-colors"
                >
                  {/* Left: Thumbnail & Core Info */}
                  <div className="flex items-start sm:items-center gap-4 min-w-0">
                    <div className="w-16 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0 border border-slate-200 dark:border-[#1E3557] flex items-center justify-center relative">
                      {thumbnail ? (
                        <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
                      ) : (
                        <Layers className="w-6 h-6 text-slate-400" />
                      )}
                      {images.length > 1 && (
                        <span className="absolute bottom-0.5 right-0.5 px-1 rounded bg-black/70 text-[9px] text-white font-mono">
                          +{images.length}
                        </span>
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white truncate">
                          {title}
                        </h3>
                        <span
                          className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                            product.stage === 'LIVE'
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                              : product.stage === 'BETA'
                              ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20'
                              : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                          }`}
                        >
                          {product.stage || 'LIVE'}
                        </span>
                        {product.isSourcePrivate ? (
                          <span className="text-[10px] font-semibold text-amber-500 dark:text-amber-400 inline-flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded-md">
                            <Lock className="w-3 h-3" /> Private Repo
                          </span>
                        ) : product.sourceCodeUrl ? (
                          <a
                            href={product.sourceCodeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] font-semibold text-[#087FC4] dark:text-[#20B8D5] inline-flex items-center gap-1 hover:underline"
                          >
                            <Code2 className="w-3 h-3" /> Public Repo
                          </a>
                        ) : null}
                      </div>

                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {tagline}
                      </p>

                      <div className="flex items-center gap-3 text-[11px] text-slate-400 dark:text-slate-500 font-mono mt-1">
                        <span>slug: /{product.slug}</span>
                        {images.length > 0 && (
                          <span className="inline-flex items-center gap-1">
                            <ImageIcon className="w-3 h-3" /> {images.length} screenshots
                          </span>
                        )}
                        {product.liveUrl && (
                          <a
                            href={product.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#087FC4] dark:text-[#20B8D5] hover:underline inline-flex items-center gap-1"
                          >
                            Live Preview <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Action Buttons */}
                  <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
                    <button
                      onClick={() => handleEdit(product)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product)}
                      disabled={isDeleting === product.id}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 dark:text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-colors inline-flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      {isDeleting === product.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Form Anchor & Component with key for clean remount */}
      <div ref={formRef}>
        <ProductForm
          key={editingProduct?.id || 'new-product-form'}
          initialData={editingProduct}
          onSaved={fetchProducts}
          onCancel={() => setEditingProduct(null)}
        />
      </div>
    </div>
  );
}
