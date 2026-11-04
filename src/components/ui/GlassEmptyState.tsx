import React from 'react';
import Link from 'next/link';
import { FolderPlus, ArrowRight, Sparkles } from 'lucide-react';

interface GlassEmptyStateProps {
  badge?: string;
  title: string;
  description: string;
  adminHref?: string;
  adminLabel?: string;
  publicHref?: string;
  publicLabel?: string;
}

export default function GlassEmptyState({
  badge = 'Live Database Connected',
  title,
  description,
  adminHref = '/admin/dashboard',
  adminLabel = 'Add from Admin CMS',
  publicHref = '/start-project',
  publicLabel = 'Start a Project With Us',
}: GlassEmptyStateProps) {
  return (
    <div className="liquid-glass rounded-2xl p-8 sm:p-14 text-center max-w-2xl mx-auto my-8 relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-[#20B8D5]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-[#087FC4]/10 blur-3xl pointer-events-none" />

      <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#087FC4]/20 to-[#20B8D5]/20 border border-[#20B8D5]/30 text-[#087FC4] dark:text-[#20B8D5] flex items-center justify-center mx-auto mb-5 shadow-inner">
        <Sparkles className="w-6 h-6" />
      </div>

      <span className="inline-block px-3.5 py-1 rounded-full bg-[#087FC4]/10 dark:bg-[#20B8D5]/15 text-[#087FC4] dark:text-[#20B8D5] text-[11px] font-bold uppercase tracking-widest mb-3">
        {badge}
      </span>

      <h3 className="text-xl sm:text-2xl font-extrabold text-[#15243A] dark:text-white mb-2.5">
        {title}
      </h3>

      <p className="text-sm sm:text-base text-[#66758A] dark:text-slate-300 max-w-lg mx-auto mb-8 leading-relaxed">
        {description}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3.5">
        {adminHref && (
          <Link
            href={adminHref}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#087FC4] to-[#20B8D5] text-white font-bold text-xs sm:text-sm inline-flex items-center gap-2 shadow-lg shadow-[#087FC4]/25 hover:opacity-95 transition-all"
          >
            <FolderPlus className="w-4 h-4" />
            <span>{adminLabel}</span>
          </Link>
        )}
        {publicHref && (
          <Link
            href={publicHref}
            className="px-5 py-2.5 rounded-xl liquid-glass-card text-[#15243A] dark:text-white font-semibold text-xs sm:text-sm inline-flex items-center gap-2"
          >
            <span>{publicLabel}</span>
            <ArrowRight className="w-4 h-4 text-[#20B8D5]" />
          </Link>
        )}
      </div>
    </div>
  );
}

