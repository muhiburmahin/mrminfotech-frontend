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
  badge = 'Live CMS Connected',
  title,
  description,
  adminHref = '/admin/dashboard',
  adminLabel = 'Add from Admin CMS',
  publicHref = '/start-project',
  publicLabel = 'Start a Project',
}: GlassEmptyStateProps) {
  return (
    <div className="mrm-glass-strong rounded-2xl p-8 sm:p-12 text-center max-w-2xl mx-auto relative overflow-hidden">
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#087FC4]/20 to-[#20B8D5]/20 border border-[#20B8D5]/30 text-[#087FC4] dark:text-[#20B8D5] flex items-center justify-center mx-auto mb-4">
        <Sparkles className="w-5 h-5" />
      </div>
      <span className="inline-block px-3 py-1 rounded-full bg-[#087FC4]/10 dark:bg-[#20B8D5]/15 text-[#087FC4] dark:text-[#20B8D5] text-[11px] font-bold uppercase tracking-widest mb-2.5">
        {badge}
      </span>
      <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--text-primary)] mb-2">
        {title}
      </h3>
      <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto mb-6 leading-relaxed">
        {description}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {adminHref && (
          <Link
            className="px-5 py-2.5 rounded-[10px] bg-gradient-to-r from-[#087FC4] to-[#20B8D5] text-white font-bold text-xs sm:text-sm inline-flex items-center gap-2 shadow-md hover:opacity-95 transition-all"
            href={adminHref}
          >
            <FolderPlus className="w-4 h-4" /> {adminLabel}
          </Link>
        )}
        {publicHref && (
          <Link
            className="px-5 py-2.5 rounded-[10px] mrm-glass-pill text-[var(--text-primary)] font-semibold text-xs sm:text-sm inline-flex items-center gap-2"
            href={publicHref}
          >
            {publicLabel} <ArrowRight className="w-4 h-4 text-[#087FC4] dark:text-[#20B8D5]" />
          </Link>
        )}
      </div>
    </div>
  );
}
