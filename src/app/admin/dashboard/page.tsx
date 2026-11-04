import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Package, Mail, ShieldCheck, FileText, ArrowRight } from 'lucide-react';
import { DashboardStats } from '@/components/admin/DashboardStats';
import { ThemeConfigurator } from '@/components/admin/forms/ThemeConfigurator';

export const metadata: Metadata = {
  title: 'Dashboard Overview | MRM InfoTech Admin',
};

export default function DashboardOverviewPage() {
  const quickActions = [
    {
      title: 'New SaaS Product',
      desc: 'Catalog a new enterprise product or feature',
      href: '/admin/dashboard/products',
      icon: Package,
      actionText: 'Manage Products',
    },
    {
      title: 'Publish Blog Post',
      desc: 'Draft insights, engineering updates, or press releases',
      href: '/admin/dashboard/blog',
      icon: FileText,
      actionText: 'Write Article',
    },
    {
      title: 'Review Inquiries',
      desc: 'Inspect inbound business leads and client contacts',
      href: '/admin/dashboard/inquiries',
      icon: Mail,
      actionText: 'Open Leads',
    },
    {
      title: 'Security & 2FA',
      desc: 'Verify TOTP authenticator status and backup codes',
      href: '/admin/dashboard/security',
      icon: ShieldCheck,
      actionText: 'Security Hub',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Admin Control Center
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Real-time summary of SaaS products, client services, incoming leads, and infrastructure health.
        </p>
      </div>

      {/* Real-time KPI Cards */}
      <DashboardStats />

      {/* Quick Action Shortcuts */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white">
          Quick Administrative Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <Link
                key={idx}
                href={action.href}
                className="group p-5 rounded-2xl bg-white dark:bg-[#071A35] border border-slate-200 dark:border-[#1E3557] hover:border-[#0052CC] dark:hover:border-[#20B8D5] transition-all duration-150 shadow-xs hover:shadow-md flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-[#07162C] text-[#0052CC] dark:text-[#20B8D5] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#0052CC] dark:group-hover:text-[#20B8D5] transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                      {action.desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-semibold text-[#0052CC] dark:text-[#20B8D5] pt-1">
                  <span>{action.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Appearance & Theme Configurator */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white">
          Brand Appearance & Theme System
        </h2>
        <ThemeConfigurator />
      </div>
    </div>
  );
}
