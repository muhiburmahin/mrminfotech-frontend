'use client';

import React, { useSyncExternalStore } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useThemeContext } from '@/context/ThemeContext';

const emptySubscribe = () => () => {};

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useThemeContext();
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // Avoid hydration mismatch by rendering a placeholder button with identical dimensions before client mount
  if (!isMounted) {
    return (
      <button
        type="button"
        className={`w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 border border-transparent transition-colors ${className}`}
        aria-label="Toggle color theme"
        disabled
      >
        <span className="w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-700 opacity-60 inline-block" />
      </button>
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 border border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)] text-[var(--theme-text-primary)] hover:text-[var(--theme-accent)] hover:border-[var(--theme-accent)]/50 hover:shadow-[0_0_14px_var(--theme-accent-glow)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)] active:scale-95 cursor-pointer ${className}`}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 transition-transform duration-200 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-[var(--theme-text-primary)] hover:text-[var(--theme-accent)] transition-transform duration-200 hover:-rotate-12" />
      )}
    </button>
  );
}
