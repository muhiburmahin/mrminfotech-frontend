'use client';

import React, { useEffect, useState, useCallback } from 'react';
import {
  Package,
  Layers,
  FolderGit2,
  Mail,
  FileText,
  Users,
  RefreshCw,
  TrendingUp,
} from 'lucide-react';
import { getDashboardMetricsAction } from '@/actions/auth.actions';
import type { DashboardMetrics } from '@/types/auth.types';

export function DashboardStats() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());

  const fetchMetrics = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getDashboardMetricsAction();
      if (res.success && res.data) {
        setMetrics(res.data);
        setLastRefreshed(new Date());
      }
    } catch {
      // Keep existing metrics or fallbacks
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    getDashboardMetricsAction()
      .then((res) => {
        if (!isMounted) return;
        if (res.success && res.data) {
          setMetrics(res.data);
          setLastRefreshed(new Date());
        }
      })
      .catch(() => {})
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const cards = [
    {
      title: 'Client Inquiries',
      count: metrics?.leads?.total ?? 0,
      sub: `${metrics?.leads?.new ?? 0} new pending`,
      icon: Mail,
      iconColor: 'text-amber-500 dark:text-amber-400',
      badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    },
    {
      title: 'SaaS Products',
      count: metrics?.products?.total ?? 0,
      sub: `${metrics?.products?.published ?? 0} published live`,
      icon: Package,
      iconColor: 'text-[#0052CC] dark:text-[#20B8D5]',
      badgeColor: 'bg-blue-500/10 text-[#0052CC] dark:text-[#20B8D5]',
    },
    {
      title: 'Client Services',
      count: metrics?.services?.total ?? 0,
      sub: `${metrics?.services?.published ?? 0} active offerings`,
      icon: Layers,
      iconColor: 'text-emerald-500 dark:text-emerald-400',
      badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    },
    {
      title: 'Case Studies & Projects',
      count: metrics?.projects?.total ?? 0,
      sub: `${metrics?.projects?.published ?? 0} showcased`,
      icon: FolderGit2,
      iconColor: 'text-purple-500 dark:text-purple-400',
      badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
    },
    {
      title: 'Blog Articles',
      count: metrics?.blogPosts?.total ?? metrics?.posts?.total ?? 0,
      sub: `${metrics?.blogPosts?.published ?? metrics?.posts?.published ?? 0} published`,
      icon: FileText,
      iconColor: 'text-cyan-500 dark:text-cyan-400',
      badgeColor: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
    },
    {
      title: 'Team & Admins',
      count: metrics?.users?.total ?? metrics?.teamMembers?.total ?? metrics?.team?.total ?? 0,
      sub: `${metrics?.users?.active ?? 0} active accounts`,
      icon: Users,
      iconColor: 'text-indigo-500 dark:text-indigo-400',
      badgeColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>
          Live Telemetry Data &bull; Last updated {lastRefreshed.toLocaleTimeString()}
        </span>
        <button
          type="button"
          onClick={fetchMetrics}
          disabled={loading}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:bg-slate-200 dark:hover:bg-[#07162C] transition-colors cursor-pointer text-slate-600 dark:text-slate-300 disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((c, idx) => {
          const Icon = c.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-[#071A35] border border-slate-200 dark:border-[#1E3557] space-y-3 shadow-xs transition-all duration-150 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {c.title}
                </span>
                <div className={`p-2 rounded-xl ${c.badgeColor}`}>
                  <Icon className={`w-4 h-4 ${c.iconColor}`} />
                </div>
              </div>
              <div className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {loading && !metrics ? (
                  <span className="inline-block w-12 h-8 bg-slate-200 dark:bg-[#07162C] rounded-md animate-pulse" />
                ) : (
                  c.count
                )}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-medium">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>{c.sub}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
