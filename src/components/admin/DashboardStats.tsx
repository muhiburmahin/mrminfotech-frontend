import React from 'react';
import { Package, Layers, FolderGit2, Mail, TrendingUp } from 'lucide-react';

export function DashboardStats() {
  const cards = [
    { title: 'SaaS Products', count: '3', sub: '2 Live, 1 Beta', icon: Package, color: 'text-[#087FC4] dark:text-[#20B8D5]' },
    { title: 'Client Services', count: '14', sub: 'Active Disciplines', icon: Layers, color: 'text-[#087FC4]' },
    { title: 'Verified Projects', count: '12', sub: 'Production Deployments', icon: 'text-emerald-500 dark:text-emerald-400' },
    { title: 'New Inquiries', count: '8', sub: 'Pending Review', icon: Mail, color: 'text-amber-500 dark:text-amber-400' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((c, idx) => {
        const Icon = typeof c.icon === 'string' ? FolderGit2 : c.icon;
        return (
          <div
            key={idx}
            className="p-5 rounded-xl bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] space-y-3 shadow-xs transition-colors duration-150"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{c.title}</span>
              <Icon className={`w-4 h-4 ${c.color}`} />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">{c.count}</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-emerald-500 dark:text-emerald-400" />
              <span>{c.sub}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
