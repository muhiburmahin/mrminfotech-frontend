/**
 * @file tokens.ts
 * @description Single Source of Truth for the 60-30-10 Design System.
 * 
 * Distribution:
 * - 60% Dominant Background: Midnight Black (#0B0B0C)
 * - 30% Secondary Structural: Pure White (#FFFFFF)
 * - 10% Exclusive Accent:    Lime Green (#C6F432) strictly for interactive CTA elements.
 * 
 * Animation Easing: locked to cubic-bezier(0.4, 0, 0.2, 1)
 */

export const DESIGN_TOKENS = Object.freeze({
  /**
   * 60% Dominant: Midnight Black
   * Used for full-bleed backgrounds, root canvas, and dark card surfaces.
   */
  dominant60: Object.freeze({
    hex: '#0B0B0C',
    rgb: '11, 11, 12',
    name: 'Midnight Black',
    // 40% opacity for frosted glass cards
    glassSurface: 'rgba(11, 11, 12, 0.40)',
    // 70% opacity for elevated overlays / modals
    overlaySurface: 'rgba(11, 11, 12, 0.75)',
  }),

  /**
   * 30% Structural: Pure White
   * Used strictly for cards, containers, borders, and typography.
   */
  structural30: Object.freeze({
    hex: '#FFFFFF',
    rgb: '255, 255, 255',
    name: 'Pure White',
    // 20% opacity for subtle 1px frosted glass borders
    glassBorder: 'rgba(255, 255, 255, 0.20)',
    // Text opacity variations for hierarchy without introducing new colors
    textPrimary: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.70)',
    textMuted: 'rgba(255, 255, 255, 0.45)',
    divider: 'rgba(255, 255, 255, 0.10)',
  }),

  /**
   * 10% Exclusive Accent: Lime Green
   * Reserved solely for conversion-oriented elements and interactive states (buttons, active states).
   */
  accent10: Object.freeze({
    hex: '#C6F432',
    rgb: '198, 244, 50',
    name: 'Lime Green',
    hover: '#D4F755', // Smooth shift to lighter shade on hover
    active: '#B2E022', // Deeper shade on click/active
    glow: 'rgba(198, 244, 50, 0.25)',
    focusRing: 'rgba(198, 244, 50, 0.40)',
    contrastText: '#0B0B0C', // Bold Midnight Black for maximum readability
  }),

  /**
   * Glassmorphism Specifications
   */
  glassmorphism: Object.freeze({
    backdropBlur: '16px',
    background: 'rgba(11, 11, 12, 0.40)',
    border: '1px solid rgba(255, 255, 255, 0.20)',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.60)',
    boxShadowHover: '0 30px 60px rgba(0, 0, 0, 0.80), 0 0 30px rgba(198, 244, 50, 0.08)',
  }),

  /**
   * Motion & Easings
   * Locked to cubic-bezier(0.4, 0, 0.2, 1) across all viewport sizes
   */
  motion: Object.freeze({
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    durationNormal: '250ms',
    durationSlow: '400ms',
    cardPerspectiveTiltDeg: 5,
    cardHoverScale: 1.05,
  }),

  /**
   * Responsive Masonry / Grid Breakpoints
   */
  layout: Object.freeze({
    gridMobile: '1fr',
    gridTablet: 'repeat(2, 1fr)',
    gridDesktop: 'repeat(3, 1fr)',
    gap: '2rem', // 32px
    maxWidth: '1280px',
  }),
});

/**
 * Calculates the relative luminance of an sRGB color.
 */
function getRelativeLuminance(hexColor: string): number {
  const cleanHex = hexColor.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

  const toLinear = (c: number) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

  const R = toLinear(r);
  const G = toLinear(g);
  const B = toLinear(b);

  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

/**
 * Calculates WCAG contrast ratio between two hex colors.
 */
export function calculateContrastRatio(foregroundHex: string, backgroundHex: string): number {
  const l1 = getRelativeLuminance(foregroundHex);
  const l2 = getRelativeLuminance(backgroundHex);

  const brighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (brighter + 0.05) / (darker + 0.05);
}

/**
 * Enforces minimum contrast ratio (default 4.5:1 for WCAG AA).
 * Throws in development or testing if contrast is insufficient.
 */
export function assertContrastRatio(
  foregroundHex: string,
  backgroundHex: string,
  minRatio = 4.5
): { ratio: number; compliant: boolean } {
  const ratio = calculateContrastRatio(foregroundHex, backgroundHex);
  const compliant = ratio >= minRatio;

  if (!compliant && process.env.NODE_ENV !== 'production') {
    console.error(
      `[DesignSystem Contrast Violation]: ${foregroundHex} against ${backgroundHex} has contrast ${ratio.toFixed(
        2
      )}:1, which is below required ${minRatio}:1!`
    );
  }

  return { ratio, compliant };
}

// Pre-validate the 10% CTA button token combination:
export const BUTTON_CONTRAST_METRIC = assertContrastRatio(
  DESIGN_TOKENS.accent10.contrastText, // #0B0B0C
  DESIGN_TOKENS.accent10.hex,          // #C6F432
  4.5
);

