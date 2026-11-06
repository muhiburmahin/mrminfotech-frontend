'use client';

import React, { useState } from 'react';
import { Building2, Palette } from 'lucide-react';
import { CompanyProfileForm } from '@/components/admin/forms/CompanyProfileForm';
import { ThemeManagement } from '@/components/admin/ThemeManagement';

export function SettingsClient() {
  const [activeTab, setActiveTab] = useState<'company' | 'theme'>('company');

  return (
    <div className="space-y-6">
      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-[#1E3557] pb-3">
        <button
          type="button"
          onClick={() => setActiveTab('company')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'company'
              ? 'bg-[#087FC4] text-white shadow-md shadow-[#087FC4]/25'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#103B68]/40'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Company Profile &amp; Footer Info</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('theme')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'theme'
              ? 'bg-[#087FC4] text-white shadow-md shadow-[#087FC4]/25'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#103B68]/40'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>Brand Theme Palette</span>
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'company' && <CompanyProfileForm />}
      {activeTab === 'theme' && <ThemeManagement />}
    </div>
  );
}

export default SettingsClient;

