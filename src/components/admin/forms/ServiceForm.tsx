'use client';

import React, { useState } from 'react';
import { Save } from 'lucide-react';

export function ServiceForm() {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [summary, setSummary] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Service saved');
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] space-y-5 shadow-xs transition-colors duration-150">
      <h3 className="text-base font-bold text-slate-900 dark:text-white">Create / Edit Service</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div>
          <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Service Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Custom Software Development"
            className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#087FC4] dark:focus:border-[#20B8D5]"
          />
        </div>
        <div>
          <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Slug</label>
          <input
            type="text"
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="custom-software-development"
            className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#087FC4] dark:focus:border-[#20B8D5]"
          />
        </div>
      </div>

      <div className="text-xs">
        <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Summary</label>
        <textarea
          rows={3}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Brief summary of service scope..."
          className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#087FC4] dark:focus:border-[#20B8D5]"
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold text-white bg-[#087FC4] hover:bg-[#103B68] transition-colors"
      >
        <Save className="w-3.5 h-3.5" />
        <span>Save Service</span>
      </button>
    </form>
  );
}
