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
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-[var(--theme-bg-canvas)] text-[var(--theme-text-primary)] transition-colors duration-150">
      <div className="max-w-lg w-full text-center bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] rounded-2xl p-8 sm:p-10 shadow-2xl">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center shadow-inner">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <span className="inline-block px-3 py-1 rounded-full bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] text-xs font-bold uppercase tracking-wider mb-3 border border-[var(--theme-accent)]/20">
          System Error • 500
        </span>

        <h1 className="text-2xl sm:text-3xl font-extrabold mb-3 text-[var(--theme-text-primary)]">
          Something Went Wrong
        </h1>

        <p className="text-sm sm:text-base text-[var(--theme-text-secondary)] mb-6 leading-relaxed">
          We encountered an unexpected technical issue while loading this page. Please try refreshing, or return to the homepage.
        </p>

        {error?.digest && (
          <p className="text-xs font-mono text-[var(--theme-text-muted)] mb-6 bg-black/30 py-1.5 px-3 rounded-lg inline-block border border-[var(--theme-border-glass)]">
            Error Reference: {error.digest}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="px-6 py-3 rounded-xl bg-[var(--theme-accent)] hover:opacity-90 text-[var(--theme-accent-text)] font-semibold text-sm inline-flex items-center gap-2 transition-all shadow-md shadow-[var(--theme-accent-glow)] cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-[var(--theme-bg-canvas)] border border-[var(--theme-border-glass)] text-[var(--theme-text-primary)] hover:border-[var(--theme-accent)]/50 font-semibold text-sm inline-flex items-center gap-2 transition-all cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
