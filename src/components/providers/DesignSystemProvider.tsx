'use client';

import React, { createContext, useContext, useEffect } from 'react';
import { useThemeContext } from '@/context/ThemeContext';
import { THEME_TEMPLATES, ThemeId } from '@/lib/theme/themes';

interface DesignSystemContextValue {
  dominant60: string;
  structural30: string;
  accent10: string;
}

const DesignSystemContext = createContext<DesignSystemContextValue>({
  dominant60: '#050C1A',
  structural30: '#F8FAFC',
  accent10: '#2563EB',
});

export const useDesignSystem = () => useContext(DesignSystemContext);

/**
 * DesignSystemProvider - Global Layout Wrapper
 * 
 * Synchronizes the 60-30-10 palette tokens dynamically with the currently
 * active theme (default: Enterprise Royal Cobalt) and responds instantly to theme switches.
 */
export function DesignSystemProvider({ children }: { children: React.ReactNode }) {
  const { activeThemeId, previewThemeId } = useThemeContext();
  const currentThemeId = (previewThemeId || activeThemeId || 'it-blue') as ThemeId;
  const currentTheme = THEME_TEMPLATES[currentThemeId] || THEME_TEMPLATES['it-blue'];

  const dominant60 = currentTheme.distribution.dominant60.canvasHex;
  const structural30 = currentTheme.distribution.structural30.textPrimaryHex;
  const accent10 = currentTheme.distribution.accent10.hex;

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;

    // 60% Dominant Tokens
    root.style.setProperty('--dominant-60', currentTheme.distribution.dominant60.canvasHex);
    root.style.setProperty('--glass-surface', currentTheme.distribution.dominant60.glassBg);

    // 30% Structural Tokens
    root.style.setProperty('--structural-30', currentTheme.distribution.structural30.textPrimaryHex);
    root.style.setProperty('--glass-border', currentTheme.distribution.structural30.borderGlass);
    root.style.setProperty('--text-primary-30', currentTheme.distribution.structural30.textPrimaryHex);
    root.style.setProperty('--text-secondary-30', currentTheme.distribution.structural30.textSecondaryHex);

    // 10% Interactive Accent Tokens
    root.style.setProperty('--accent-10', currentTheme.distribution.accent10.hex);
    root.style.setProperty('--accent-10-hover', currentTheme.distribution.accent10.hoverHex);
    root.style.setProperty('--accent-10-active', currentTheme.distribution.accent10.activeHex);
    root.style.setProperty('--accent-10-contrast', currentTheme.distribution.accent10.contrastTextHex);
    root.style.setProperty('--accent-10-glow', currentTheme.distribution.accent10.glowRgba);
  }, [currentTheme]);

  return (
    <DesignSystemContext.Provider
      value={{
        dominant60,
        structural30,
        accent10,
      }}
    >
      <div className="min-h-screen bg-[var(--theme-bg-canvas)] text-[var(--theme-text-primary)] antialiased selection:bg-[var(--theme-accent)] selection:text-[var(--theme-accent-text)] transition-colors duration-150">
        {children}
      </div>
    </DesignSystemContext.Provider>
  );
}

