'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertOctagon, RefreshCw, LayoutDashboard } from 'lucide-react';

export default function AdminErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[MRM Admin Dashboard Error]:', error);
  }, [error]);

  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-slate-100 dark:bg-[#040D1A] text-slate-900 dark:text-slate-100 min-h-[60vh] transition-colors duration-150">
      <div className="max-w-lg w-full text-center bg-white dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] rounded-2xl p-8 shadow-xl">
        <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center shadow-inner">
          <AlertOctagon className="w-7 h-7" />
        </div>

        <span className="inline-block px-3 py-1 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-wider mb-3 border border-red-500/20">
          Admin Module Error
        </span>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2">
          Dashboard Operation Interrupted
        </h2>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
          The requested admin view or data mutation encountered an unhandled exception. Your administrative session and sidebar navigation remain secure.
        </p>

        {error?.digest && (
          <p className="text-xs font-mono text-slate-400 mb-6 bg-slate-100 dark:bg-black/30 py-1.5 px-3 rounded-lg inline-block">
            Error Ref: {error.digest}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="px-5 py-2.5 rounded-xl bg-[#087FC4] hover:bg-[#06659c] text-white font-bold text-xs inline-flex items-center gap-2 transition-all shadow-md cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry Operation</span>
          </button>
          <Link
            href="/admin/dashboard"
            className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-[#07162C] border border-slate-200 dark:border-[#1E3557] text-slate-700 dark:text-slate-200 hover:border-[#087FC4] font-semibold text-xs inline-flex items-center gap-2 transition-all shadow-xs cursor-pointer"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-[#087FC4] dark:text-[#20B8D5]" />
            <span>Return to Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
