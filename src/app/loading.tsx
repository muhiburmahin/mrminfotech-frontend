import React from 'react';

export default function GlobalLoading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 bg-[var(--theme-bg-canvas)] transition-colors duration-150">
      <div className="relative flex items-center justify-center">
        {/* Outer pulsating ring */}
        <div className="w-16 h-16 rounded-full border-4 border-[var(--theme-accent)]/20 border-t-[var(--theme-accent)] animate-spin" />
        {/* Inner brand glow dot */}
        <div className="absolute w-5 h-5 rounded-full bg-[var(--theme-accent)] animate-pulse shadow-md shadow-[var(--theme-accent-glow)]" />
      </div>
      <div className="mt-5 text-center space-y-1">
        <p className="text-xs font-bold uppercase tracking-widest text-[var(--theme-accent)]">
          MRM InfoTech
        </p>
        <p className="text-xs text-[var(--theme-text-muted)]">
          Loading platform content...
        </p>
      </div>
    </div>
  );
}
