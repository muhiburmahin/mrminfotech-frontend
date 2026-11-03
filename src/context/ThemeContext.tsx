'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, useSyncExternalStore } from 'react';
import type { BrandAppearanceConfig } from '@/types/homepage';
import { DEFAULT_BRAND_APPEARANCE } from '@/types/homepage';

export type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  brandAppearance: BrandAppearanceConfig;
  setBrandAppearance: (appearance: BrandAppearanceConfig) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const THEME_STORAGE_KEY = 'mrm_theme_mode';
const BRAND_STORAGE_KEY = 'mrm_brand_appearance';
const emptySubscribe = () => () => {};

function applyThemeVariables(appearance: BrandAppearanceConfig, activeTheme: Theme) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;

  // Primary brand palette
  root.style.setProperty('--brand-navy', appearance.darkNavy);
  root.style.setProperty('--brand-secondary', appearance.secondaryColor);
  root.style.setProperty('--brand-blue', appearance.primaryColor);
  root.style.setProperty('--brand-cyan', appearance.accentColor);

  root.style.setProperty('--color-brand-navy', appearance.darkNavy);
  root.style.setProperty('--color-brand-secondary', appearance.secondaryColor);
  root.style.setProperty('--color-brand-blue', appearance.primaryColor);
  root.style.setProperty('--color-brand-cyan', appearance.accentColor);

  // Mode tokens
  if (activeTheme === 'dark') {
    root.style.setProperty('--background', appearance.darkBackground || '#07162C');
    root.style.setProperty('--surface', '#0B1E3B');
    root.style.setProperty('--foreground', '#F8FAFC');
    root.style.setProperty('--muted', '#94A3B8');
    root.style.setProperty('--border', '#1E3557');
  } else {
    root.style.setProperty('--background', appearance.lightBackground || '#FFFFFF');
    root.style.setProperty('--surface', '#F4F8FC');
    root.style.setProperty('--foreground', appearance.mainText || '#15243A');
    root.style.setProperty('--muted', appearance.mutedText || '#66758A');
    root.style.setProperty('--border', appearance.borderColor || '#E3EAF2');
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // Synchronous client initializer without effect cascading
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
        if (saved === 'light' || saved === 'dark') return saved;
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          return 'dark';
        }
      } catch {
        // Fallback
      }
    }
    return 'light';
  });

  const [brandAppearance, setBrandAppearanceState] = useState<BrandAppearanceConfig>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedBrand = localStorage.getItem(BRAND_STORAGE_KEY);
        if (savedBrand) return JSON.parse(savedBrand);
      } catch {
        // Fallback
      }
    }
    return DEFAULT_BRAND_APPEARANCE;
  });

  // Synchronize CSS class and CSS variables on mount or when theme/branding changes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', theme === 'dark');
      applyThemeVariables(brandAppearance, theme);
    }
  }, [theme, brandAppearance]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch {
      // Storage error ignored
    }
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      applyThemeVariables(brandAppearance, newTheme);
    }
  }, [brandAppearance]);

  const toggleTheme = useCallback(() => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  }, [theme, setTheme]);

  const setBrandAppearance = useCallback((appearance: BrandAppearanceConfig) => {
    setBrandAppearanceState(appearance);
    try {
      localStorage.setItem(BRAND_STORAGE_KEY, JSON.stringify(appearance));
    } catch {
      // Storage error ignored
    }
    applyThemeVariables(appearance, theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
        brandAppearance,
        setBrandAppearance,
      }}
    >
      <div className={isMounted ? '' : 'contents'}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useThemeContext must be used within ThemeProvider');
  }
  return ctx;
}
