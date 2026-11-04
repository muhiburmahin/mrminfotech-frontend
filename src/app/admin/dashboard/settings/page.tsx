import React from 'react';
import type { Metadata } from 'next';
import { SettingsClient } from '@/components/admin/SettingsClient';

export const metadata: Metadata = {
  title: 'Settings & Company Profile | MRM InfoTech Admin',
};

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">System Settings &amp; Company Manager</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Manage live corporate contact info, footer social media links, company bios, and brand theme colors.
        </p>
      </div>

      <SettingsClient />
    </div>
  );
}
