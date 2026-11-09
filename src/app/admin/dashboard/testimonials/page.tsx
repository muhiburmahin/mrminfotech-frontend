/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Quote,
  Plus,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  Edit,
  Trash2,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Eye,
  EyeOff,
  Star,
  Building,
  User,
  Filter,
} from 'lucide-react';
import {
  getAdminTestimonials,
  updateAdminTestimonial,
  deleteAdminTestimonial,
  AdminTestimonialItem,
} from '@/lib/api/admin';
import Link from 'next/link';
import { TestimonialForm } from '@/components/admin/forms/TestimonialForm';
import { TestimonialsSectionSettings } from '@/components/admin/forms/TestimonialsSectionSettings';

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<AdminTestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<AdminTestimonialItem | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft' | 'featured' | 'verified'>('all');

  const formRef = useRef<HTMLDivElement>(null);

  const fetchTestimonials = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAdminTestimonials({ limit: 100 });
      const rawList = res?.data || [];
      // Sort by sortOrder rank
      const sorted = [...rawList].sort((a, b) => {
        const orderA = a.sortOrder ?? 999;
        const orderB = b.sortOrder ?? 999;
        return orderA - orderB;
      });
      setTestimonials(sorted);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to load testimonials';
      if (msg.includes('401') || msg.toLowerCase().includes('unauthorized')) {
        setError('AUTH_EXPIRED: Admin session expired. Please log in again.');
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleEdit = (item: AdminTestimonialItem) => {
    setEditingItem(item);
    setIsFormOpen(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setIsFormOpen(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleCancelForm = () => {
    setIsFormOpen(false);
    setEditingItem(null);
  };

  const handleFormSaved = () => {
    setIsFormOpen(false);
    setEditingItem(null);
    setSuccessMsg('Testimonial saved successfully!');
    fetchTestimonials();
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  const handleDelete = async (item: AdminTestimonialItem) => {
    if (!item.id) return;
    const author = item.authorName || 'this testimonial';
    if (!window.confirm(`Are you sure you want to delete the testimonial from "${author}"?`)) {
      return;
    }

    setIsDeleting(item.id);
    setError(null);
    try {
      await deleteAdminTestimonial(item.id);
      setSuccessMsg(`Testimonial from "${author}" was deleted.`);
      await fetchTestimonials();
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to delete testimonial';
      setError(msg);
    } finally {
      setIsDeleting(null);
    }
  };

  const handleTogglePublish = async (item: AdminTestimonialItem) => {
    if (!item.id) return;
    const nextStatus = !item.showOnSite;
    setIsUpdatingStatus(item.id);
    setError(null);

    try {
      await updateAdminTestimonial(item.id, {
        showOnSite: nextStatus,
        isVerified: nextStatus ? true : item.isVerified,
        evidenceNote: item.evidenceNote || (nextStatus ? 'Verified direct client testimonial' : null),
        consentAt: nextStatus ? (item.consentAt || new Date().toISOString()) : item.consentAt,
      });
      setSuccessMsg(
        `Testimonial "${item.authorName}" is now ${nextStatus ? 'PUBLISHED' : 'UNPUBLISHED (Draft)'}.`
      );
      await fetchTestimonials();
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update publication status';
      setError(msg);
    } finally {
      setIsUpdatingStatus(null);
    }
  };

  const handleToggleFeatured = async (item: AdminTestimonialItem) => {
    if (!item.id) return;
    const nextFeatured = !item.isFeatured;
    setIsUpdatingStatus(item.id);
    setError(null);

    try {
      await updateAdminTestimonial(item.id, {
        isFeatured: nextFeatured,
      });
      setSuccessMsg(
        `Testimonial "${item.authorName}" ${nextFeatured ? 'marked as FEATURED' : 'removed from featured'}.`
      );
      await fetchTestimonials();
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update featured status';
      setError(msg);
    } finally {
      setIsUpdatingStatus(null);
    }
  };

  const handleMoveRank = async (currentIndex: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= filteredTestimonials.length) return;

    const currentItem = filteredTestimonials[currentIndex];
    const targetItem = filteredTestimonials[targetIndex];
    if (!currentItem?.id || !targetItem?.id) return;

    const currentRank = currentItem.sortOrder ?? currentIndex + 1;
    const targetRank = targetItem.sortOrder ?? targetIndex + 1;

    setIsUpdatingStatus(currentItem.id);
    setError(null);

    try {
      await Promise.all([
        updateAdminTestimonial(currentItem.id, { sortOrder: targetRank }),
        updateAdminTestimonial(targetItem.id, { sortOrder: currentRank }),
      ]);
      setSuccessMsg('Display order updated.');
      await fetchTestimonials();
      setTimeout(() => setSuccessMsg(null), 2500);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to reorder testimonials';
      setError(msg);
    } finally {
      setIsUpdatingStatus(null);
    }
  };

  // Filtered list
  const filteredTestimonials = testimonials.filter((t) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = t.authorName.toLowerCase().includes(q);
      const matchCompany = (t.companyName || '').toLowerCase().includes(q);
      const matchRole = (t.authorRole || '').toLowerCase().includes(q);
      if (!matchName && !matchCompany && !matchRole) return false;
    }

    if (statusFilter === 'published') return t.showOnSite;
    if (statusFilter === 'draft') return !t.showOnSite;
    if (statusFilter === 'featured') return t.isFeatured;
    if (statusFilter === 'verified') return t.isVerified;

    return true;
  });

  const getQuoteText = (quote: Record<string, string> | string): string => {
    if (typeof quote === 'string') return quote;
    if (typeof quote === 'object' && quote !== null) {
      return quote.en || Object.values(quote)[0] || '';
    }
    return '';
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-[#10243B] dark:text-white">
              Client Testimonials & Reviews
            </h1>
            <span className="inline-flex items-center rounded-full bg-[#087FC4]/10 dark:bg-[#087FC4]/20 px-2.5 py-0.5 text-xs font-semibold text-[#087FC4]">
              {testimonials.length} Total
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Manage authenticated client reviews, star ratings, featured spotlights, and public visibility.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/#testimonials"
            target="_blank"
            className="flex items-center gap-1.5 rounded-xl border border-[#E1EAF3] dark:border-white/10 bg-white dark:bg-[#0B1D31] px-3.5 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span>View Public Section</span>
          </Link>

          <button
            onClick={fetchTestimonials}
            disabled={loading}
            className="flex items-center gap-1.5 rounded-xl border border-[#E1EAF3] dark:border-white/10 bg-white dark:bg-[#0B1D31] px-3.5 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer disabled:opacity-50"
            title="Refresh list"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Sync</span>
          </button>

          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#087FC4] to-[#103B68] hover:from-[#0769a3] hover:to-[#071A35] px-4 py-2 text-xs font-bold text-white shadow-sm transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Add Testimonial</span>
          </button>
        </div>
      </div>

      <TestimonialsSectionSettings />

      {/* Global Notifications */}
      {error && (
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs font-medium text-rose-600 dark:text-rose-400">
          {error}
        </div>
      )}

      {successMsg && (
        <div className="flex items-center gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs font-medium text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Form Drawer / Container */}
      {isFormOpen && (
        <div ref={formRef} className="scroll-mt-6">
          <TestimonialForm
            initialData={editingItem}
            onSaved={handleFormSaved}
            onCancel={handleCancelForm}
          />
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-2xl border border-[#E1EAF3] dark:border-white/10 bg-white dark:bg-[#0B1D31] p-3 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          {(
            [
              { id: 'all', label: 'All Reviews' },
              { id: 'published', label: 'Published' },
              { id: 'draft', label: 'Drafts' },
              { id: 'featured', label: 'Featured' },
              { id: 'verified', label: 'Verified' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                statusFilter === tab.id
                  ? 'bg-[#087FC4] text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by client or company..."
            className="w-full sm:w-64 rounded-xl border border-[#E1EAF3] dark:border-white/10 bg-[#F7FAFE] dark:bg-[#071321] px-3.5 py-1.5 text-xs text-[#10243B] dark:text-white placeholder-slate-400 focus:border-[#087FC4] focus:outline-none"
          />
        </div>
      </div>

      {/* Testimonials List */}
      <div className="rounded-2xl border border-[#E1EAF3] dark:border-white/10 bg-white dark:bg-[#0B1D31] shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-12 text-slate-400">
            <RefreshCw className="h-6 w-6 animate-spin mb-2 text-[#087FC4]" />
            <span className="text-xs">Loading testimonials...</span>
          </div>
        ) : filteredTestimonials.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#087FC4]/10 text-[#087FC4] mb-3">
              <Quote className="h-6 w-6" />
            </div>
            <h3 className="text-sm font-bold text-[#10243B] dark:text-white">No testimonials found</h3>
            <p className="mt-1 text-xs text-slate-500 max-w-sm">
              {searchQuery || statusFilter !== 'all'
                ? 'Try adjusting your search query or filter criteria.'
                : 'Click "Add Testimonial" above to create your first client review.'}
            </p>
            {!isFormOpen && (
              <button
                onClick={handleAddNew}
                className="mt-4 flex items-center gap-1.5 rounded-xl bg-[#087FC4] px-4 py-2 text-xs font-bold text-white hover:bg-[#0769a3] cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Add First Testimonial</span>
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-[#E1EAF3] dark:divide-white/10">
            {filteredTestimonials.map((item, index) => {
              const quoteText = getQuoteText(item.quote);
              const isFirst = index === 0;
              const isLast = index === filteredTestimonials.length - 1;

              return (
                <div
                  key={item.id}
                  className="flex flex-col lg:flex-row lg:items-center justify-between p-5 gap-4 hover:bg-slate-50/70 dark:hover:bg-white/[0.02] transition-colors"
                >
                  {/* Left: Reorder Controls + Avatar + Client Details */}
                  <div className="flex items-start gap-4 flex-1">
                    {/* Reorder Buttons */}
                    <div className="flex flex-col items-center gap-1 pt-1">
                      <button
                        type="button"
                        disabled={isFirst || isUpdatingStatus === item.id}
                        onClick={() => handleMoveRank(index, 'up')}
                        title="Move Up"
                        className="rounded-md p-1 text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-[#087FC4] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      >
                        <ArrowUp className="h-3.5 w-3.5" />
                      </button>
                      <span className="text-[10px] font-mono font-bold text-slate-400">
                        #{item.sortOrder ?? index + 1}
                      </span>
                      <button
                        type="button"
                        disabled={isLast || isUpdatingStatus === item.id}
                        onClick={() => handleMoveRank(index, 'down')}
                        title="Move Down"
                        className="rounded-md p-1 text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-[#087FC4] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      >
                        <ArrowDown className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {/* Avatar */}
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-[#087FC4]/30 bg-slate-100 dark:bg-[#10243B] flex items-center justify-center">
                      {item.avatarUrl ? (
                        <img
                          src={item.avatarUrl}
                          alt={item.authorName}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-xs font-bold text-[#087FC4]">
                          {item.authorName.slice(0, 2).toUpperCase()}
                        </span>
                      )}
                    </div>

                    {/* Info & Quote */}
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-sm font-bold text-[#10243B] dark:text-white truncate">
                          {item.authorName}
                        </h4>

                        {item.authorRole && (
                          <span className="text-xs text-slate-500">
                            • {item.authorRole}
                          </span>
                        )}

                        {item.companyName && (
                          <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 dark:bg-white/5 px-2 py-0.5 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                            <Building className="h-3 w-3" />
                            {item.companyName}
                          </span>
                        )}

                        {/* Star Rating */}
                        <div className="flex items-center gap-0.5 ml-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`h-3 w-3 ${
                                s <= (item.rating ?? 5)
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-slate-300 dark:text-slate-600'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Quote Snippet */}
                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 italic">
                        &ldquo;{quoteText}&rdquo;
                      </p>

                      {/* Tags & Metadata */}
                      <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-400">
                        {item.source && (
                          <span>Source: <strong className="text-slate-500">{item.source}</strong></span>
                        )}
                        {item.serviceSlug && (
                          <span className="rounded bg-[#087FC4]/10 text-[#087FC4] px-1.5 py-0.2">
                            {item.serviceSlug}
                          </span>
                        )}
                        {item.projectSlug && (
                          <span className="rounded bg-indigo-500/10 text-indigo-500 px-1.5 py-0.2">
                            {item.projectSlug}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Badges & Action Controls */}
                  <div className="flex items-center gap-3 self-end lg:self-center shrink-0">
                    {/* Status Badges */}
                    <button
                      type="button"
                      onClick={() => handleToggleFeatured(item)}
                      disabled={isUpdatingStatus === item.id}
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold transition-all cursor-pointer ${
                        item.isFeatured
                          ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                          : 'bg-slate-100 dark:bg-white/5 text-slate-400 hover:text-slate-600'
                      }`}
                      title="Click to toggle featured spotlight"
                    >
                      <Sparkles className="h-3 w-3" />
                      <span>{item.isFeatured ? 'Featured' : 'Not Featured'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleTogglePublish(item)}
                      disabled={isUpdatingStatus === item.id}
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold transition-all cursor-pointer ${
                        item.showOnSite
                          ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-slate-700'
                      }`}
                      title="Click to toggle public display"
                    >
                      {item.showOnSite ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                      <span>{item.showOnSite ? 'Published' : 'Draft'}</span>
                    </button>

                    {item.isVerified && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 px-2 py-0.5 text-[11px] font-semibold border border-blue-500/20">
                        <ShieldCheck className="h-3 w-3" />
                        <span>Verified</span>
                      </span>
                    )}

                    {/* Edit & Delete Action Buttons */}
                    <div className="flex items-center gap-1 ml-2 border-l border-[#E1EAF3] dark:border-white/10 pl-3">
                      <button
                        type="button"
                        onClick={() => handleEdit(item)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-[#087FC4] transition-colors cursor-pointer"
                        title="Edit testimonial"
                      >
                        <Edit className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        disabled={isDeleting === item.id}
                        onClick={() => handleDelete(item)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-600 transition-colors cursor-pointer disabled:opacity-50"
                        title="Delete testimonial"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
