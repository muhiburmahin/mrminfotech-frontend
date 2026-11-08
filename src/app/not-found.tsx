import React from 'react';
import Link from 'next/link';
import { Home, Compass, Mail, FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-[var(--theme-bg-canvas)] text-[var(--theme-text-primary)] transition-colors duration-150">
      <div className="max-w-xl w-full text-center bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] rounded-3xl p-8 sm:p-12 shadow-2xl">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[var(--theme-accent)]/15 border border-[var(--theme-accent)]/30 text-[var(--theme-accent)] flex items-center justify-center shadow-inner">
          <FileQuestion className="w-8 h-8" />
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] text-xs font-bold uppercase tracking-wider mb-4 border border-[var(--theme-accent)]/20">
          <span>404 • Resource Not Found</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-[var(--theme-text-primary)] mb-3 tracking-tight">
          Page Not Found
        </h1>

        <p className="text-sm sm:text-base text-[var(--theme-text-secondary)] mb-8 max-w-md mx-auto leading-relaxed">
          The page or architectural resource you requested does not exist, has been removed, or has been relocated to another URL.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--theme-accent)] hover:opacity-90 text-[var(--theme-accent-text)] font-bold text-sm transition-all shadow-md shadow-[var(--theme-accent-glow)] cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--theme-bg-canvas)] border border-[var(--theme-border-glass)] text-[var(--theme-text-primary)] hover:border-[var(--theme-accent)]/50 font-semibold text-sm transition-all shadow-xs cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[var(--theme-accent)]" />
            <span>Explore Services</span>
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--theme-bg-canvas)] border border-[var(--theme-border-glass)] text-[var(--theme-text-primary)] hover:border-[var(--theme-accent)]/50 font-semibold text-sm transition-all shadow-xs cursor-pointer"
          >
            <Mail className="w-4 h-4 text-emerald-400" />
            <span>Contact Support</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
