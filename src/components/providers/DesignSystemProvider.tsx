'use client';

import React, { createContext, useContext, useEffect } from 'react';
import { DESIGN_TOKENS } from '@/design-system/tokens';

interface DesignSystemContextValue {
  tokens: typeof DESIGN_TOKENS;
  dominant60: string;
  structural30: string;
  accent10: string;
}

const DesignSystemContext = createContext<DesignSystemContextValue>({
  tokens: DESIGN_TOKENS,
  dominant60: DESIGN_TOKENS.dominant60.hex,
  structural30: DESIGN_TOKENS.structural30.hex,
  accent10: DESIGN_TOKENS.accent10.hex,
});

export const useDesignSystem = () => useContext(DesignSystemContext);

/**
 * DesignSystemProvider - Global Layout Wrapper
 * 
 * Injects CSS variables enforcing the 60-30-10 palette at the document root:
 * - 60% Dominant Background: Midnight Black (#0B0B0C)
 * - 30% Secondary Structural: Pure White (#FFFFFF)
 * - 10% Exclusive Accent: Lime Green (#C6F432)
 */
export function DesignSystemProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;

    // 60% Dominant Tokens
    root.style.setProperty('--dominant-60', DESIGN_TOKENS.dominant60.hex);
    root.style.setProperty('--dominant-60-rgb', DESIGN_TOKENS.dominant60.rgb);
    root.style.setProperty('--glass-surface', DESIGN_TOKENS.dominant60.glassSurface);

    // 30% Structural Tokens
    root.style.setProperty('--structural-30', DESIGN_TOKENS.structural30.hex);
    root.style.setProperty('--structural-30-rgb', DESIGN_TOKENS.structural30.rgb);
    root.style.setProperty('--glass-border', DESIGN_TOKENS.structural30.glassBorder);
    root.style.setProperty('--text-primary-30', DESIGN_TOKENS.structural30.textPrimary);
    root.style.setProperty('--text-secondary-30', DESIGN_TOKENS.structural30.textSecondary);
    root.style.setProperty('--text-muted-30', DESIGN_TOKENS.structural30.textMuted);

    // 10% Interactive Accent Tokens
    root.style.setProperty('--accent-10', DESIGN_TOKENS.accent10.hex);
    root.style.setProperty('--accent-10-rgb', DESIGN_TOKENS.accent10.rgb);
    root.style.setProperty('--accent-10-hover', DESIGN_TOKENS.accent10.hover);
    root.style.setProperty('--accent-10-active', DESIGN_TOKENS.accent10.active);
    root.style.setProperty('--accent-10-contrast', DESIGN_TOKENS.accent10.contrastText);
    root.style.setProperty('--accent-10-glow', DESIGN_TOKENS.accent10.glow);

    // Glassmorphism & Motion
    root.style.setProperty('--glass-blur', DESIGN_TOKENS.glassmorphism.backdropBlur);
    root.style.setProperty('--ease-locked', DESIGN_TOKENS.motion.easing);
  }, []);

  return (
    <DesignSystemContext.Provider
      value={{
        tokens: DESIGN_TOKENS,
        dominant60: DESIGN_TOKENS.dominant60.hex,
        structural30: DESIGN_TOKENS.structural30.hex,
        accent10: DESIGN_TOKENS.accent10.hex,
      }}
    >
      <div className="min-h-screen bg-[#0B0B0C] text-[#FFFFFF] antialiased selection:bg-[#C6F432] selection:text-[#0B0B0C]">
        {children}
      </div>
    </DesignSystemContext.Provider>
  );
}

