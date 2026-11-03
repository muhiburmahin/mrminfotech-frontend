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
      className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 border border-slate-200/70 dark:border-slate-800 bg-slate-50 dark:bg-[#0B1E3B] text-slate-700 dark:text-slate-200 hover:text-[#087FC4] dark:hover:text-[#20B8D5] hover:border-[#087FC4]/30 dark:hover:border-[#20B8D5]/30 hover:bg-slate-100 dark:hover:bg-[#103B68]/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#087FC4] active:scale-95 cursor-pointer ${className}`}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 transition-transform duration-200 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-slate-700 hover:text-[#087FC4] transition-transform duration-200 hover:-rotate-12" />
      )}
    </button>
  );
}
