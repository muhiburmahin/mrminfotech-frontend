'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useSyncExternalStore,
} from 'react';
import type { BrandAppearanceConfig } from '@/types/homepage';
import { DEFAULT_BRAND_APPEARANCE } from '@/types/homepage';
import {
  ThemeId,
  ThemeDefinition,
  THEME_TEMPLATES,
  DEFAULT_THEME_ID,
  getTheme,
  isValidThemeId,
} from '@/lib/theme/themes';
import { authRequest } from '@/lib/api/auth.service';

export type Theme = 'light' | 'dark';

export interface ThemeContextValue {
  // Global 4-Theme Engine
  activeThemeId: ThemeId;
  previewThemeId: ThemeId | null;
  activeTheme: ThemeDefinition;
  setPreviewThemeId: (id: ThemeId | null) => void;
  setGlobalThemeId: (id: ThemeId) => Promise<boolean>;
  isApplying: boolean;

  // Backwards compatibility for light/dark & legacy appearance
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  brandAppearance: BrandAppearanceConfig;
  setBrandAppearance: (appearance: BrandAppearanceConfig) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const THEME_STORAGE_KEY = 'mrm_theme_mode';
const BRAND_STORAGE_KEY = 'mrm_brand_appearance';
export const ACTIVE_THEME_STORAGE_KEY = 'mrm_active_theme_id';

const emptySubscribe = () => () => {};

export function ThemeProvider({
  children,
  initialThemeId = DEFAULT_THEME_ID,
}: {
  children: React.ReactNode;
  initialThemeId?: ThemeId;
}) {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const [activeThemeId, setActiveThemeId] = useState<ThemeId>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(ACTIVE_THEME_STORAGE_KEY);
        if (saved && isValidThemeId(saved)) return saved as ThemeId;
      } catch {
        // Fallback
      }
    }
    return isValidThemeId(initialThemeId) ? initialThemeId : DEFAULT_THEME_ID;
  });

  const [previewThemeId, setPreviewThemeIdState] = useState<ThemeId | null>(null);
  const [isApplying, setIsApplying] = useState(false);

  // Light/dark mode support (persisted via localStorage)
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(THEME_STORAGE_KEY);
        if (saved === 'light' || saved === 'dark') return saved;
      } catch {
        // Fallback
      }
    }
    return 'dark';
  });
  const [brandAppearance, setBrandAppearanceState] = useState<BrandAppearanceConfig>(
    DEFAULT_BRAND_APPEARANCE
  );

  // Sync data-theme and light/dark classes on <html> whenever active/preview theme or mode changes
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const targetTheme = previewThemeId || activeThemeId;
    document.documentElement.setAttribute('data-theme', targetTheme);
    document.documentElement.setAttribute('data-mode', theme);
    const isDark = theme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.classList.toggle('light', !isDark);
  }, [activeThemeId, previewThemeId, theme]);

  // Listen to cross-tab storage / custom events
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleStorage = (e: StorageEvent) => {
      if (e.key === ACTIVE_THEME_STORAGE_KEY && e.newValue && isValidThemeId(e.newValue)) {
        setActiveThemeId(e.newValue as ThemeId);
      }
    };

    const handleCustomChange = (e: Event) => {
      const customEvent = e as CustomEvent<ThemeId>;
      if (customEvent.detail && isValidThemeId(customEvent.detail)) {
        setActiveThemeId(customEvent.detail);
      }
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('mrm_theme_changed', handleCustomChange);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('mrm_theme_changed', handleCustomChange);
    };
  }, []);

  const setPreviewThemeId = useCallback((id: ThemeId | null) => {
    setPreviewThemeIdState(id);
    if (typeof document !== 'undefined') {
      const target = id || activeThemeId;
      document.documentElement.setAttribute('data-theme', target);
    }
  }, [activeThemeId]);

  const setGlobalThemeId = useCallback(async (newId: ThemeId): Promise<boolean> => {
    if (!isValidThemeId(newId)) return false;
    setIsApplying(true);

    try {
      // Persist to backend database via SiteSetting key 'theme.active'
      try {
        await authRequest('/admin/site-settings/theme.active', {
          method: 'PATCH',
          body: JSON.stringify({
            group: 'appearance',
            value: newId,
            isPublic: true,
          }),
        });
      } catch (patchErr) {
        // Fallback to POST if setting record does not yet exist
        console.warn('PATCH /admin/site-settings/theme.active failed, trying POST:', patchErr);
        await authRequest('/admin/site-settings', {
          method: 'POST',
          body: JSON.stringify({
            key: 'theme.active',
            group: 'appearance',
            value: newId,
            isPublic: true,
          }),
        });
      }

      // Update local storage and in-memory state
      if (typeof window !== 'undefined') {
        localStorage.setItem(ACTIVE_THEME_STORAGE_KEY, newId);
        window.dispatchEvent(new CustomEvent('mrm_theme_changed', { detail: newId }));
      }

      setActiveThemeId(newId);
      setPreviewThemeIdState(null);
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', newId);
      }

      return true;
    } catch (err) {
      console.error('Failed to persist global theme to backend:', err);
      // Still update locally for user feedback
      setActiveThemeId(newId);
      setPreviewThemeIdState(null);
      if (typeof window !== 'undefined') {
        localStorage.setItem(ACTIVE_THEME_STORAGE_KEY, newId);
      }
      return false;
    } finally {
      setIsApplying(false);
    }
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      if (typeof document !== 'undefined') {
        const isDark = newTheme === 'dark';
        document.documentElement.setAttribute('data-mode', newTheme);
        document.documentElement.classList.toggle('dark', isDark);
        document.documentElement.classList.toggle('light', !isDark);
      }
    } catch {
      // Storage error ignored
    }
  }, []);

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
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        activeThemeId,
        previewThemeId,
        activeTheme: getTheme(previewThemeId || activeThemeId),
        setPreviewThemeId,
        setGlobalThemeId,
        isApplying,
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
