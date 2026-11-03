'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[MRM Application Error]:', error);
  }, [error]);

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-white dark:bg-[#07162C] text-[#071A35] dark:text-white transition-colors duration-150">
      <div className="max-w-lg w-full text-center bg-[#F4F8FC] dark:bg-[#0F2442] border border-[#E3EAF2] dark:border-[#103B68] rounded-2xl p-8 sm:p-10 shadow-xl">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center shadow-inner">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <span className="inline-block px-3 py-1 rounded-full bg-[#087FC4]/10 text-[#087FC4] dark:text-[#20B8D5] text-xs font-bold uppercase tracking-wider mb-3 border border-[#087FC4]/20">
          System Error • 500
        </span>

        <h1 className="text-2xl sm:text-3xl font-extrabold mb-3 text-slate-900 dark:text-white">
          Something Went Wrong
        </h1>

        <p className="text-sm sm:text-base text-[#66758A] dark:text-slate-300 mb-6 leading-relaxed">
          We encountered an unexpected technical issue while loading this page. Please try refreshing, or return to the homepage.
        </p>

        {error?.digest && (
          <p className="text-xs font-mono text-slate-400 dark:text-slate-500 mb-6 bg-slate-200/50 dark:bg-black/30 py-1.5 px-3 rounded-lg inline-block">
            Error Reference: {error.digest}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="px-6 py-3 rounded-xl bg-[#087FC4] hover:bg-[#087FC4]/90 text-white font-semibold text-sm inline-flex items-center gap-2 transition-all shadow-md cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-white dark:bg-[#071A35] border border-[#E3EAF2] dark:border-[#103B68] text-[#071A35] dark:text-white hover:border-[#087FC4] font-semibold text-sm inline-flex items-center gap-2 transition-all cursor-pointer shadow-xs"
          >
            <Home className="w-4 h-4 text-[#087FC4] dark:text-[#20B8D5]" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
