/**
 * @file tokens.ts
 * @description Design System Tokens synchronized with the Dynamic Theme Management System.
 * Default active theme: Theme 5 (Enterprise Royal Cobalt - it-blue).
 */

import {
  THEME_TEMPLATES,
  DEFAULT_THEME_ID,
  getContrastRatio,
  ThemeId,
  ThemeDefinition,
} from '@/lib/theme/themes';

export const ACTIVE_DEFAULT_THEME = THEME_TEMPLATES[DEFAULT_THEME_ID];

function hexToRgbString(hex: string): string {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16) || 0;
  const g = parseInt(cleanHex.substring(2, 4), 16) || 0;
  const b = parseInt(cleanHex.substring(4, 6), 16) || 0;
  return `${r}, ${g}, ${b}`;
}

export const DESIGN_TOKENS = Object.freeze({
  dominant60: Object.freeze({
    hex: ACTIVE_DEFAULT_THEME.distribution.dominant60.surfaceHex,
    canvasHex: ACTIVE_DEFAULT_THEME.distribution.dominant60.canvasHex,
    name: ACTIVE_DEFAULT_THEME.distribution.dominant60.name,
    glassSurface: ACTIVE_DEFAULT_THEME.distribution.dominant60.glassBg,
    rgb: hexToRgbString(ACTIVE_DEFAULT_THEME.distribution.dominant60.surfaceHex),
  }),

  structural30: Object.freeze({
    hex: ACTIVE_DEFAULT_THEME.distribution.structural30.textSecondaryHex,
    pureWhite: ACTIVE_DEFAULT_THEME.distribution.structural30.textPrimaryHex,
    name: ACTIVE_DEFAULT_THEME.distribution.structural30.name,
    border: ACTIVE_DEFAULT_THEME.distribution.structural30.borderHex,
    glassBorder: ACTIVE_DEFAULT_THEME.distribution.structural30.borderGlass,
    textPrimary: ACTIVE_DEFAULT_THEME.distribution.structural30.textPrimaryHex,
    textSecondary: ACTIVE_DEFAULT_THEME.distribution.structural30.textSecondaryHex,
    textMuted: 'rgba(214, 203, 184, 0.65)',
    divider: ACTIVE_DEFAULT_THEME.distribution.structural30.borderHex,
    rgb: hexToRgbString(ACTIVE_DEFAULT_THEME.distribution.structural30.textPrimaryHex),
  }),

  accent10: Object.freeze({
    hex: ACTIVE_DEFAULT_THEME.distribution.accent10.hex,
    name: ACTIVE_DEFAULT_THEME.distribution.accent10.name,
    hover: ACTIVE_DEFAULT_THEME.distribution.accent10.hoverHex,
    active: ACTIVE_DEFAULT_THEME.distribution.accent10.activeHex,
    contrastText: ACTIVE_DEFAULT_THEME.distribution.accent10.contrastTextHex,
    glow: ACTIVE_DEFAULT_THEME.distribution.accent10.glowRgba,
    subtle: ACTIVE_DEFAULT_THEME.distribution.accent10.subtleRgba,
    rgb: hexToRgbString(ACTIVE_DEFAULT_THEME.distribution.accent10.hex),
  }),

  glassmorphism: Object.freeze({
    backdropBlur: '16px',
    background: 'var(--theme-bg-glass, rgba(15, 34, 61, 0.75))',
    border: '1px solid var(--theme-border-glass, rgba(30, 58, 95, 0.70))',
    boxShadow: '0 20px 50px rgba(7, 19, 36, 0.70)',
    boxShadowHover: '0 30px 60px rgba(7, 19, 36, 0.90), 0 0 30px var(--theme-accent-subtle, rgba(255, 90, 95, 0.15))',
  }),

  motion: Object.freeze({
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    durationNormal: '250ms',
    durationSlow: '400ms',
    cardPerspectiveTiltDeg: 5,
    cardHoverScale: 1.05,
  }),

  layout: Object.freeze({
    gridMobile: '1fr',
    gridTablet: 'repeat(2, 1fr)',
    gridDesktop: 'repeat(3, 1fr)',
    gap: '2rem',
    maxWidth: '1280px',
  }),
});

export const CTA_BUTTON_CONTRAST_RATIO = getContrastRatio(
  ACTIVE_DEFAULT_THEME.distribution.accent10.contrastTextHex,
  ACTIVE_DEFAULT_THEME.distribution.accent10.hex
);

export function assertContrastRatio(
  foregroundHex: string,
  backgroundHex: string,
  minRatio = 4.5
): boolean {
  return getContrastRatio(foregroundHex, backgroundHex) >= minRatio;
}

export const calculateContrastRatio = getContrastRatio;

export { THEME_TEMPLATES, DEFAULT_THEME_ID, getContrastRatio };
export type { ThemeId, ThemeDefinition };
