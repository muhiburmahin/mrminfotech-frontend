import React from 'react';
import type { Metadata } from 'next';
import { ThemeConfigurator } from '@/components/admin/forms/ThemeConfigurator';

export const metadata: Metadata = {
  title: 'Settings & Theme Manager | MRM InfoTech Admin',
};

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">System Settings & Dynamic Theme Manager</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Configure corporate branding, public settings, and system environment flags.
        </p>
      </div>

      <ThemeConfigurator />
    </div>
  );
}
