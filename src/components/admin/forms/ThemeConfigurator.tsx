'use client';

import React, { useState } from 'react';
import { Palette, Check, RotateCcw } from 'lucide-react';

export function ThemeConfigurator() {
  const [navy, setNavy] = useState('#07162C');
  const [blue, setBlue] = useState('#087FC4');
  const [cyan, setCyan] = useState('#20B8D5');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    document.documentElement.style.setProperty('--brand-navy', navy);
    document.documentElement.style.setProperty('--brand-blue', blue);
    document.documentElement.style.setProperty('--brand-cyan', cyan);
    alert('Brand theme palette updated in real-time!');
  };

  const handleReset = () => {
    setNavy('#07162C');
    setBlue('#087FC4');
    setCyan('#20B8D5');
  };

  return (
    <form onSubmit={handleSave} className="p-6 rounded-2xl bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] space-y-6 shadow-xs transition-colors duration-150">
      <div className="flex items-center gap-2 text-slate-900 dark:text-white">
        <Palette className="w-5 h-5 text-[#087FC4] dark:text-[#20B8D5]" />
        <h3 className="text-base font-bold">MRM InfoTech Dynamic Theme Configurator</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            Primary Dark Navy (Headers, Hero)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={navy}
              onChange={(e) => setNavy(e.target.value)}
              className="w-10 h-10 rounded border border-slate-200 dark:border-[#1E3557] bg-transparent cursor-pointer"
            />
            <input
              type="text"
              value={navy}
              onChange={(e) => setNavy(e.target.value)}
              className="px-3 py-2 rounded-lg bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-xs text-slate-900 dark:text-white font-mono"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            Corporate Blue (Buttons, CTAs)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={blue}
              onChange={(e) => setBlue(e.target.value)}
              className="w-10 h-10 rounded border border-slate-200 dark:border-[#1E3557] bg-transparent cursor-pointer"
            />
            <input
              type="text"
              value={blue}
              onChange={(e) => setBlue(e.target.value)}
              className="px-3 py-2 rounded-lg bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-xs text-slate-900 dark:text-white font-mono"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            Accent Cyan (Highlights, Glows)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={cyan}
              onChange={(e) => setCyan(e.target.value)}
              className="w-10 h-10 rounded border border-slate-200 dark:border-[#1E3557] bg-transparent cursor-pointer"
            />
            <input
              type="text"
              value={cyan}
              onChange={(e) => setCyan(e.target.value)}
              className="px-3 py-2 rounded-lg bg-slate-50 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-xs text-slate-900 dark:text-white font-mono"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-xs font-bold text-white bg-[#087FC4] hover:bg-[#103B68] transition-colors"
        >
          <Check className="w-3.5 h-3.5" />
          <span>Apply Changes</span>
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>
    </form>
  );
}
