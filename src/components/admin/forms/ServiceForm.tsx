'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Loader2, ListOrdered } from 'lucide-react';
import { createAdminService, updateAdminService, AdminServicePayload } from '@/lib/api/admin';

interface ServiceFormProps {
  initialData?: {
    id?: string;
    title?: string;
    name?: string;
    slug?: string;
    summary?: string;
    description?: string;
    icon?: string | null;
    sortOrder?: number;
    order?: number;
    isPublished?: boolean;
    isActive?: boolean;
  };
  onSuccess?: () => void;
}

export function ServiceForm({ initialData, onSuccess }: ServiceFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialData?.title || initialData?.name || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [summary, setSummary] = useState(initialData?.summary || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [order, setOrder] = useState<number>(initialData?.sortOrder ?? initialData?.order ?? 1);
  const [isPublished, setIsPublished] = useState<boolean>(
    initialData?.isPublished ?? initialData?.isActive ?? true
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!initialData) {
      const generated = val
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setSlug(generated);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const payload: AdminServicePayload = {
      title: title.trim(),
      name: title.trim(),
      slug: slug.trim().toLowerCase(),
      summary: summary.trim(),
      description: description.trim(),
      sortOrder: Number(order) || 1,
      order: Number(order) || 1,
      isActive: isPublished,
      isPublished: isPublished,
      status: isPublished ? 'PUBLISHED' : 'DRAFT',
    };

    try {
      if (initialData?.id) {
        await updateAdminService(initialData.id, payload);
      } else {
        await createAdminService(payload);
      }

      if (onSuccess) {
        onSuccess();
      } else {
        router.refresh();
        router.push('/admin/dashboard/services');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'সার্ভিস সেভ করতে ব্যর্থ হয়েছে');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white dark:bg-[#0F2442] p-8 rounded-2xl border border-slate-200 dark:border-[#1E3557] shadow-xl"
    >
      <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
        {initialData ? 'সার্ভিস এডিট করুন' : 'নতুন সার্ভিস যুক্ত করুন'}
      </h2>

      {error && (
        <div className="p-3 bg-red-500/10 text-red-500 rounded-xl text-xs font-semibold">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
            সার্ভিসের নাম
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="যেমন: Custom Software Development"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#087FC4]"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
            স্লাগ (Slug)
          </label>
          <input
            type="text"
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="যেমন: custom-software-development"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-[#087FC4]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
            <ListOrdered className="w-4 h-4 text-[#087FC4]" /> ডিসপ্লে সিরিয়াল / অর্ডার নম্বর
          </label>
          <input
            type="number"
            min={1}
            value={order}
            onChange={(e) => setOrder(Number(e.target.value))}
            placeholder="যেমন: 1, 2, 3..."
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white text-sm font-bold focus:outline-none focus:border-[#087FC4]"
          />
          <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
            ছোট নম্বরগুলো সবার আগে (উপরে) প্রদর্শিত হবে।
          </span>
        </div>
        <div className="flex items-center gap-3 pt-6">
          <input
            type="checkbox"
            id="isPublished"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="w-4 h-4 rounded text-[#087FC4] focus:ring-[#087FC4] accent-[#087FC4]"
          />
          <label htmlFor="isPublished" className="text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer">
            পাবলিক সাইটে দৃশ্যমান রাখুন (Published)
          </label>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
          সংক্ষিপ্ত সারসংক্ষেপ (Summary)
        </label>
        <input
          type="text"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="কার্ডে দেখানোর জন্য এক লাইনের সংক্ষিপ্ত বিবরণ..."
          className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#087FC4]"
        />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
          বিস্তারিত বর্ণনা (Description)
        </label>
        <textarea
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="সার্ভিস পেজের জন্য বিস্তারিত বর্ণনা লিখুন..."
          className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#087FC4]"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#087FC4] to-[#20B8D5] text-white font-bold text-sm shadow-lg hover:opacity-95 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
      >
        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
        সার্ভিস সেভ করুন
      </button>
    </form>
  );
}

export default ServiceForm;
