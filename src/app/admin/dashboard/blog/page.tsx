'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Plus,
  RefreshCw,
  Search,
  Edit,
  Trash2,
  CheckCircle2,
  Eye,
  Clock,
  Sparkles,
  Save,
  X,
  FileText,
  Calendar,
  Tag,
  SlidersHorizontal,
} from 'lucide-react';
import {
  getAdminBlogPosts,
  getAdminBlogCategories,
  getAdminBlogTags,
  createAdminBlogPost,
  updateAdminBlogPost,
  deleteAdminBlogPost,
  AdminBlogPostPayload,
} from '@/lib/api/admin';

interface AdminPostRow {
  id: string;
  key?: string;
  categoryId?: string | null;
  readingMinutes?: number | null;
  isFeatured?: boolean;
  createdAt?: string;
  translations: Array<{
    id?: string;
    locale: string;
    slug: string;
    title: string;
    excerpt?: string | null;
    body: string;
    status: 'DRAFT' | 'PUBLISHED' | 'IN_REVIEW' | 'ARCHIVED';
    publishedAt?: string | null;
    seoTitle?: string | null;
    seoDescription?: string | null;
  }>;
  category?: {
    id: string;
    slug: string;
    i18n?: Record<string, { name: string }>;
  } | null;
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<AdminPostRow[]>([]);
  const [categories, setCategories] = useState<Array<{ id: string; slug: string; name: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PUBLISHED' | 'DRAFT'>('ALL');

  // Editor Modal state
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<AdminPostRow | null>(null);
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Form fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [body, setBody] = useState('');
  const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED'>('PUBLISHED');
  const [isFeatured, setIsFeatured] = useState(false);
  const [readingMinutes, setReadingMinutes] = useState(5);
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');

  const modalRef = useRef<HTMLDivElement>(null);

  const fetchBlogData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [postsRes, catsRes] = await Promise.all([
        getAdminBlogPosts(),
        getAdminBlogCategories().catch(() => []),
      ]);

      const rawPosts = Array.isArray(postsRes)
        ? (postsRes as unknown as AdminPostRow[])
        : Array.isArray((postsRes as unknown as { data?: AdminPostRow[] })?.data)
        ? (postsRes as unknown as { data: AdminPostRow[] }).data
        : [];

      setPosts(rawPosts);

      const parsedCats = (Array.isArray(catsRes) ? catsRes : []).map((c: any) => ({
        id: c.id,
        slug: c.slug,
        name: c.i18n?.en?.name || c.slug,
      }));
      setCategories(parsedCats);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  // KPI counts
  const kpis = useMemo(() => {
    let published = 0;
    let drafts = 0;
    let featured = 0;

    posts.forEach((p) => {
      const en = p.translations.find((t) => t.locale === 'en') || p.translations[0];
      if (en?.status === 'PUBLISHED') published++;
      else drafts++;
      if (p.isFeatured) featured++;
    });

    return {
      total: posts.length,
      published,
      drafts,
      featured,
    };
  }, [posts]);

  // Filtered rows
  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      const en = p.translations.find((t) => t.locale === 'en') || p.translations[0];
      if (!en) return false;

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        en.title.toLowerCase().includes(q) ||
        en.slug.toLowerCase().includes(q) ||
        en.excerpt?.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === 'ALL' ||
        (statusFilter === 'PUBLISHED' && en.status === 'PUBLISHED') ||
        (statusFilter === 'DRAFT' && en.status !== 'PUBLISHED');

      return matchesSearch && matchesStatus;
    });
  }, [posts, searchQuery, statusFilter]);

  const notifySuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  // Auto-calculate reading time when body changes
  const handleBodyChange = (newBody: string) => {
    setBody(newBody);
    const words = newBody.trim().split(/\s+/).filter(Boolean).length;
    const est = Math.max(1, Math.ceil(words / 200));
    setReadingMinutes(est);
  };

  // Open Create Modal
  const handleAddNew = () => {
    setEditingPost(null);
    setTitle('');
    setSlug('');
    setCategoryId(categories[0]?.id || '');
    setExcerpt('');
    setBody('');
    setStatus('PUBLISHED');
    setIsFeatured(false);
    setReadingMinutes(5);
    setSeoTitle('');
    setSeoDescription('');
    setFormError(null);
    setActiveTab('write');
    setIsEditorOpen(true);
  };

  // Open Edit Modal
  const handleEdit = (p: AdminPostRow) => {
    setEditingPost(p);
    const en = p.translations.find((t) => t.locale === 'en') || p.translations[0];
    setTitle(en?.title || '');
    setSlug(en?.slug || '');
    setCategoryId(p.categoryId || '');
    setExcerpt(en?.excerpt || '');
    setBody(en?.body || '');
    setStatus(en?.status === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT');
    setIsFeatured(Boolean(p.isFeatured));
    setReadingMinutes(p.readingMinutes || 5);
    setSeoTitle(en?.seoTitle || '');
    setSeoDescription(en?.seoDescription || '');
    setFormError(null);
    setActiveTab('write');
    setIsEditorOpen(true);
  };

  // Save Article (Create or Update)
  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim() || !body.trim()) {
      setFormError('Article Title, URL Slug, and Body Content are required.');
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    const cleanSlug = slug
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-');

    const payload: AdminBlogPostPayload = {
      categoryId: categoryId || undefined,
      readingMinutes: Number(readingMinutes) || 5,
      isFeatured,
      translations: [
        {
          locale: 'en',
          slug: cleanSlug,
          title: title.trim(),
          excerpt: excerpt.trim() || undefined,
          body,
          status,
          seoTitle: seoTitle.trim() || undefined,
          seoDescription: seoDescription.trim() || undefined,
        },
      ],
    };

    try {
      if (editingPost) {
        await updateAdminBlogPost(editingPost.id, payload);
        notifySuccess('Article updated successfully!');
      } else {
        await createAdminBlogPost(payload);
        notifySuccess('New article published successfully!');
      }
      setIsEditorOpen(false);
      await fetchBlogData();
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : 'Failed to save blog post');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle status
  const handleToggleStatus = async (p: AdminPostRow) => {
    const en = p.translations.find((t) => t.locale === 'en') || p.translations[0];
    if (!en) return;
    const nextStatus = en.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';

    try {
      await updateAdminBlogPost(p.id, {
        translations: [
          {
            locale: en.locale,
            slug: en.slug,
            title: en.title,
            excerpt: en.excerpt || undefined,
            body: en.body,
            status: nextStatus,
          },
        ],
      });
      notifySuccess(`Status changed to ${nextStatus}!`);
      await fetchBlogData();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to update status');
    }
  };

  // Delete article
  const handleDelete = async (p: AdminPostRow) => {
    const en = p.translations.find((t) => t.locale === 'en') || p.translations[0];
    const confirmTitle = en?.title || 'this article';
    if (!window.confirm(`Are you sure you want to permanently delete "${confirmTitle}"?`)) return;

    try {
      await deleteAdminBlogPost(p.id);
      notifySuccess('Article deleted.');
      await fetchBlogData();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to delete article');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* ──────────────── Header Bar ──────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Content Engine
            </span>
            <span className="text-xs text-slate-500">· Technical Insights CMS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Blog &amp; Technical Publications
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage engineering deep-dives, architectural benchmarks, tags, and category taxonomies.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={fetchBlogData}
            disabled={loading}
            className="p-2.5 rounded-xl border border-slate-700 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-750 transition-colors cursor-pointer"
            title="Refresh articles"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            type="button"
            onClick={handleAddNew}
            className="px-4 py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25 inline-flex items-center gap-2 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Write New Article</span>
          </button>
        </div>
      </div>

      {/* ──────────────── Feedback Messages ──────────────── */}
      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold flex items-center gap-2">
          <span>{error}</span>
        </div>
      )}

      {/* ──────────────── 4 KPI Cards ──────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Total Articles
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-1">
            {kpis.total}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
          <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
            Published (Live)
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono mt-1">
            {kpis.published}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
          <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
            Draft Articles
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono mt-1">
            {kpis.drafts}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
          <div className="text-[11px] font-bold text-purple-400 uppercase tracking-wider">
            Featured Spotlight
          </div>
          <div className="text-2xl sm:text-3xl font-black text-purple-400 font-mono mt-1">
            {kpis.featured}
          </div>
        </div>
      </div>

      {/* ──────────────── Search & Filter Bar ──────────────── */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by title, slug..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          {(['ALL', 'PUBLISHED', 'DRAFT'] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                statusFilter === st
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* ──────────────── Articles Data Table ──────────────── */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-16 text-center text-xs text-slate-400">Loading publications...</div>
        ) : filteredPosts.length === 0 ? (
          <div className="p-16 text-center space-y-2">
            <BookOpen className="w-8 h-8 mx-auto text-slate-600" />
            <h4 className="text-sm font-bold text-white">No publications found</h4>
            <p className="text-xs text-slate-400">
              Create your first technical article or clear search filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] font-bold border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Publication Title</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4 text-center">Reading Time</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {filteredPosts.map((p) => {
                  const en = p.translations.find((t) => t.locale === 'en') || p.translations[0];
                  const isPub = en?.status === 'PUBLISHED';
                  const catName =
                    categories.find((c) => c.id === p.categoryId)?.name ||
                    p.category?.i18n?.en?.name ||
                    'General Engineering';

                  return (
                    <tr key={p.id} className="hover:bg-slate-850 transition-colors">
                      <td className="py-4 px-4">
                        <div className="font-bold text-white text-sm hover:text-blue-400 transition-colors">
                          <Link href={`/blog/${en?.slug}`} target="_blank">
                            {en?.title || 'Untitled Article'}
                          </Link>
                        </div>
                        <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                          /blog/{en?.slug}
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                          {catName}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(p)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors cursor-pointer ${
                            isPub
                              ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/25'
                              : 'bg-amber-500/15 text-amber-400 border-amber-500/30 hover:bg-amber-500/25'
                          }`}
                        >
                          {en?.status || 'DRAFT'}
                        </button>
                      </td>

                      <td className="py-4 px-4 text-center font-mono text-slate-400">
                        {p.readingMinutes || 5} min
                      </td>

                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/blog/${en?.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                            title="View Public Page"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleEdit(p)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-slate-800 transition-colors cursor-pointer"
                            title="Edit Article"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(p)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
                            title="Delete Article"
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
        )}
      </div>

      {/* ──────────────── Full Modal / Editor ──────────────── */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-150">
          <div
            ref={modalRef}
            className="w-full max-w-4xl max-h-[92vh] flex flex-col bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Modal Top Bar */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between shrink-0 bg-slate-900/90">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-400">
                  {editingPost ? 'Update Publication' : 'Write New Publication'}
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">
                  {title || 'Untitled Article'}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSaveArticle} className="flex-1 overflow-y-auto p-6 space-y-6">
              {formError && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
                  {formError}
                </div>
              )}

              {/* Title & Slug Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      if (!editingPost && !slug) {
                        setSlug(
                          e.target.value
                            .toLowerCase()
                            .trim()
                            .replace(/[^a-z0-9]+/g, '-')
                            .replace(/^-+|-+$/g, '')
                        );
                      }
                    }}
                    placeholder="e.g. Architecting Multi-Tenant Cloud SaaS"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:border-blue-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    URL Slug * (auto-sanitized)
                  </label>
                  <input
                    type="text"
                    required
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
                    placeholder="e.g. architecting-multi-tenant-cloud-saas"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-mono focus:border-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Category & Status Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Category
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:border-blue-500 focus:outline-hidden"
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
                    Publication Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as 'DRAFT' | 'PUBLISHED')}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:border-blue-500 focus:outline-hidden"
                  >
                    <option value="PUBLISHED">PUBLISHED (Live)</option>
                    <option value="DRAFT">DRAFT (Hidden)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Est. Reading Time (min)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={120}
                    value={readingMinutes}
                    onChange={(e) => setReadingMinutes(Number(e.target.value) || 5)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-mono focus:border-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Summary / Excerpt
                </label>
                <textarea
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Punchy 1-2 sentence overview displayed in social cards and search results..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:border-blue-500 focus:outline-hidden"
                />
              </div>

              {/* Body Editor with Write / Preview Tabs */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-300">
                    Article Body (Markdown Supported) *
                  </label>
                  <div className="flex items-center p-0.5 rounded-lg bg-slate-800 border border-slate-700 text-[11px]">
                    <button
                      type="button"
                      onClick={() => setActiveTab('write')}
                      className={`px-3 py-1 rounded-md font-semibold transition-all ${
                        activeTab === 'write' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Write
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('preview')}
                      className={`px-3 py-1 rounded-md font-semibold transition-all ${
                        activeTab === 'preview' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Preview
                    </button>
                  </div>
                </div>

                {activeTab === 'write' ? (
                  <textarea
                    rows={12}
                    required
                    value={body}
                    onChange={(e) => handleBodyChange(e.target.value)}
                    placeholder="Write article in markdown format (supports ## Headings, ```code blocks, bullet lists)..."
                    className="w-full px-3.5 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-mono leading-relaxed focus:border-blue-500 focus:outline-hidden"
                  />
                ) : (
                  <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed whitespace-pre-line min-h-[280px]">
                    {body || <span className="text-slate-600 italic">No content written yet.</span>}
                  </div>
                )}
              </div>

              {/* Toggles */}
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Feature in Spotlight Banner</div>
                  <div className="text-[11px] text-slate-400">
                    Highlight this article at the top of the engineering insights page.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 rounded-md accent-blue-600 cursor-pointer"
                />
              </div>

              {/* Submit Button Bar */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25 inline-flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSubmitting ? 'Saving...' : editingPost ? 'Update Publication' : 'Publish Article'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
