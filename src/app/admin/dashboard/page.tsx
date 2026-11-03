import React from 'react';
import type { Metadata } from 'next';
import { DashboardStats } from '@/components/admin/DashboardStats';
import { ThemeConfigurator } from '@/components/admin/forms/ThemeConfigurator';

export const metadata: Metadata = {
  title: 'Dashboard Overview | MRM InfoTech Admin',
};

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Real-time summary of SaaS products, services, inquiries, and platform health.
        </p>
      </div>

      <DashboardStats />

      <ThemeConfigurator />
    </div>
  );
}
