'use client';

import React, { useEffect, useState } from 'react';
import { LayoutTemplate, Save, Loader2 } from 'lucide-react';
import { saveHomepageConfig } from '@/lib/api/admin';
import { getHomepageConfig } from '@/lib/api/public';
import type { HomepageConfig, TestimonialsSectionConfig } from '@/types/homepage';

/**
 * Controls the homepage "Testimonials" section: on/off switch and its copy. It reads and writes the
 * existing `homepage.sections` site setting (same store as every other homepage section).
 */
export function TestimonialsSectionSettings() {
  const [config, setConfig] = useState<HomepageConfig | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'ok' | 'error'; text: string } | null>(null);

  useEffect(() => {
    let alive = true;
    getHomepageConfig().then((c) => alive && setConfig(c));
    return () => {
      alive = false;
    };
  }, []);

  if (!config) return null;
  const section = config.testimonials;

  const update = (patch: Partial<TestimonialsSectionConfig>) => {
    setMessage(null);
    setConfig({ ...config, testimonials: { ...section, ...patch } });
  };

  const save = async () => {
    setSaving(true);
    setMessage(null);
    try {
      await saveHomepageConfig(config);
      try {
        await fetch('/api/revalidate', { method: 'POST' });
      } catch {
        /* public cache expires on its own within 60s */
      }
      setMessage({ type: 'ok', text: 'Homepage testimonials section saved.' });
    } catch (err: unknown) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to save section settings.' });
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    'w-full rounded-xl border border-[#E1EAF3] dark:border-white/10 bg-[#F7FAFE] dark:bg-[#0B1D31] px-3.5 py-2.5 text-xs text-[#10243B] dark:text-white focus:border-[#087FC4] focus:outline-none';

  return (
    <section
      aria-labelledby="testimonials-section-settings"
      className="rounded-2xl border border-[#E1EAF3] dark:border-white/10 bg-white dark:bg-[#0B1E3B] p-6 space-y-5"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <LayoutTemplate className="h-5 w-5 text-[#087FC4]" aria-hidden="true" />
          <div>
            <h2 id="testimonials-section-settings" className="text-sm font-bold text-[#10243B] dark:text-white">
              Homepage Testimonials Section
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Show or hide the section and edit its heading. Only published testimonials are ever displayed.
            </p>
          </div>
        </div>

        <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-[#10243B] dark:text-white">
          <input
            type="checkbox"
            role="switch"
            checked={section.enabled}
            onChange={(e) => update({ enabled: e.target.checked })}
            className="h-4 w-4 accent-[#087FC4]"
          />
          {section.enabled ? 'Visible' : 'Hidden'}
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 text-xs">
        <label className="space-y-1 font-semibold text-slate-700 dark:text-slate-300">
          Eyebrow
          <input className={inputClass} value={section.eyebrow} onChange={(e) => update({ eyebrow: e.target.value })} />
        </label>
        <label className="space-y-1 font-semibold text-slate-700 dark:text-slate-300">
          Max testimonials on homepage (1-12)
          <input
            type="number"
            min={1}
            max={12}
            className={inputClass}
            value={section.maxItems}
            onChange={(e) => update({ maxItems: Math.min(12, Math.max(1, parseInt(e.target.value, 10) || 1)) })}
          />
        </label>
        <label className="space-y-1 font-semibold text-slate-700 dark:text-slate-300 md:col-span-2">
          Heading
          <input className={inputClass} value={section.heading} onChange={(e) => update({ heading: e.target.value })} />
        </label>
        <label className="space-y-1 font-semibold text-slate-700 dark:text-slate-300 md:col-span-2">
          Description
          <textarea
            rows={2}
            className={inputClass}
            value={section.description}
            onChange={(e) => update({ description: e.target.value })}
          />
        </label>
      </div>

      <div className="flex items-center justify-between gap-4">
        <p
          role="status"
          className={`text-xs font-medium ${message?.type === 'error' ? 'text-rose-500' : 'text-emerald-600 dark:text-emerald-400'}`}
        >
          {message?.text}
        </p>
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#087FC4] to-[#103B68] px-4 py-2 text-xs font-bold text-white disabled:opacity-60 cursor-pointer"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save Section
        </button>
      </div>
    </section>
  );
}
