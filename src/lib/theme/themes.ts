/**
 * @file themes.ts
 * @description Centralized Single Source of Truth for MRM InfoTech's 4 Predefined Themes.
 * 
 * Each theme enforces a strict 60-30-10 color distribution:
 * - 60% Dominant Background: Canvas, panels, elevated surfaces, and dark cards.
 * - 30% Secondary Content: Primary headings, body/sub-text, and structural borders.
 * - 10% Exclusive Accent: High-conversion CTA buttons, interactive states, and glowing badges.
 */

export type ThemeId =
  | 'midnight-lime'
  | 'classic-navy-coral'
  | 'forest-purple'
  | 'it-blue';

export interface ThemeColorDistribution {
  dominant60: {
    name: string;
    canvasHex: string;
    surfaceHex: string;
    cardHex: string;
    glassBg: string;
  };
  structural30: {
    name: string;
    textPrimaryHex: string;
    textSecondaryHex: string;
    borderHex: string;
    borderGlass: string;
  };
  accent10: {
    name: string;
    hex: string;
    hoverHex: string;
    activeHex: string;
    contrastTextHex: string;
    glowRgba: string;
    subtleRgba: string;
  };
}

export interface ThemeDefinition {
  id: ThemeId;
  name: string;
  tagline: string;
  isDefault?: boolean;
  distribution: ThemeColorDistribution;
  cssVars: Record<string, string>;
}

export const THEME_TEMPLATES: Record<ThemeId, ThemeDefinition> = Object.freeze({
  /**
   * Theme 2: Classic Navy & Coral (DEFAULT ACTIVE THEME)
   * 60% Navy Blue (#0A192F), 30% Cream (#FAF5EE / #D6CBB8), 10% Punchy Coral (#FF6B6B)
   */
  'classic-navy-coral': Object.freeze({
    id: 'classic-navy-coral',
    name: 'Classic Navy & Coral',
    tagline: 'Deep corporate navy canvas with warm cream typography and punchy coral conversion accents.',
    isDefault: true,
    distribution: {
      dominant60: {
        name: 'Navy Blue',
        canvasHex: '#071324',
        surfaceHex: '#0A192F',
        cardHex: '#0F223D',
        glassBg: 'rgba(15, 34, 61, 0.75)',
      },
      structural30: {
        name: 'Cream & Slate Navy',
        textPrimaryHex: '#FAF5EE',
        textSecondaryHex: '#D6CBB8',
        borderHex: '#1E3A5F',
        borderGlass: 'rgba(30, 58, 95, 0.70)',
      },
      accent10: {
        name: 'Punchy Coral',
        hex: '#FF6B6B',
        hoverHex: '#FF8585',
        activeHex: '#E6474C',
        contrastTextHex: '#071324',
        glowRgba: 'rgba(255, 107, 107, 0.35)',
        subtleRgba: 'rgba(255, 107, 107, 0.15)',
      },
    },
    cssVars: {
      '--theme-bg-canvas': '#071324',
      '--theme-bg-surface': '#0A192F',
      '--theme-bg-card': '#0F223D',
      '--theme-bg-glass': 'rgba(15, 34, 61, 0.75)',
      '--theme-text-primary': '#FAF5EE',
      '--theme-text-secondary': '#D6CBB8',
      '--theme-text-muted': 'rgba(214, 203, 184, 0.65)',
      '--theme-border': '#1E3A5F',
      '--theme-border-glass': 'rgba(30, 58, 95, 0.70)',
      '--theme-accent': '#FF6B6B',
      '--theme-accent-hover': '#FF8585',
      '--theme-accent-active': '#E6474C',
      '--theme-accent-text': '#071324',
      '--theme-accent-glow': 'rgba(255, 107, 107, 0.35)',
      '--theme-accent-subtle': 'rgba(255, 107, 107, 0.15)',
      '--theme-aurora-glow': 'rgba(255, 107, 107, 0.25)',
    },
  }),

  /**
   * Theme 1: Midnight Black & Lime Green
   * 60% Midnight Black (#0B0B0C), 30% Pure White (#FFFFFF), 10% Vibrant Lime Green (#C6F432)
   */
  'midnight-lime': Object.freeze({
    id: 'midnight-lime',
    name: 'Midnight Black & Lime Green',
    tagline: 'High-contrast obsidian midnight canvas paired with electric lime green interactive triggers.',
    isDefault: false,
    distribution: {
      dominant60: {
        name: 'Midnight Black',
        canvasHex: '#0B0B0C',
        surfaceHex: '#121215',
        cardHex: '#17171C',
        glassBg: 'rgba(18, 18, 21, 0.75)',
      },
      structural30: {
        name: 'Pure White & Zinc',
        textPrimaryHex: '#FFFFFF',
        textSecondaryHex: '#A1A1AA',
        borderHex: '#27272A',
        borderGlass: 'rgba(39, 39, 42, 0.70)',
      },
      accent10: {
        name: 'Vibrant Lime Green',
        hex: '#C6F432',
        hoverHex: '#D4F755',
        activeHex: '#B2E022',
        contrastTextHex: '#0B0B0C',
        glowRgba: 'rgba(198, 244, 50, 0.35)',
        subtleRgba: 'rgba(198, 244, 50, 0.15)',
      },
    },
    cssVars: {
      '--theme-bg-canvas': '#0B0B0C',
      '--theme-bg-surface': '#121215',
      '--theme-bg-card': '#17171C',
      '--theme-bg-glass': 'rgba(18, 18, 21, 0.75)',
      '--theme-text-primary': '#FFFFFF',
      '--theme-text-secondary': '#A1A1AA',
      '--theme-text-muted': 'rgba(161, 161, 170, 0.65)',
      '--theme-border': '#27272A',
      '--theme-border-glass': 'rgba(39, 39, 42, 0.70)',
      '--theme-accent': '#C6F432',
      '--theme-accent-hover': '#D4F755',
      '--theme-accent-active': '#B2E022',
      '--theme-accent-text': '#0B0B0C',
      '--theme-accent-glow': 'rgba(198, 244, 50, 0.35)',
      '--theme-accent-subtle': 'rgba(198, 244, 50, 0.15)',
      '--theme-aurora-glow': 'rgba(198, 244, 50, 0.22)',
    },
  }),

  /**
   * Theme 3: Forest Green & Electric Purple
   * 60% Forest Green (#081C15), 30% Sand Beige (#F5EBE1), 10% Electric Purple (#B845FF)
   */
  'forest-purple': Object.freeze({
    id: 'forest-purple',
    name: 'Forest Green & Electric Purple',
    tagline: 'Deep organic evergreen background contrasted with warm sand beige and luminous electric purple.',
    isDefault: false,
    distribution: {
      dominant60: {
        name: 'Forest Green',
        canvasHex: '#061510',
        surfaceHex: '#0B2019',
        cardHex: '#112E24',
        glassBg: 'rgba(17, 46, 36, 0.75)',
      },
      structural30: {
        name: 'Sand Beige',
        textPrimaryHex: '#F5EBE1',
        textSecondaryHex: '#C4BAA9',
        borderHex: '#1C4738',
        borderGlass: 'rgba(28, 71, 56, 0.70)',
      },
      accent10: {
        name: 'Electric Purple',
        hex: '#BF5AF2',
        hoverHex: '#D07BFA',
        activeHex: '#9D2FE6',
        contrastTextHex: '#061510',
        glowRgba: 'rgba(191, 90, 242, 0.35)',
        subtleRgba: 'rgba(191, 90, 242, 0.15)',
      },
    },
    cssVars: {
      '--theme-bg-canvas': '#061510',
      '--theme-bg-surface': '#0B2019',
      '--theme-bg-card': '#112E24',
      '--theme-bg-glass': 'rgba(17, 46, 36, 0.75)',
      '--theme-text-primary': '#F5EBE1',
      '--theme-text-secondary': '#C4BAA9',
      '--theme-text-muted': 'rgba(196, 186, 169, 0.65)',
      '--theme-border': '#1C4738',
      '--theme-border-glass': 'rgba(28, 71, 56, 0.70)',
      '--theme-accent': '#BF5AF2',
      '--theme-accent-hover': '#D07BFA',
      '--theme-accent-active': '#9D2FE6',
      '--theme-accent-text': '#061510',
      '--theme-accent-glow': 'rgba(191, 90, 242, 0.35)',
      '--theme-accent-subtle': 'rgba(191, 90, 242, 0.15)',
      '--theme-aurora-glow': 'rgba(191, 90, 242, 0.22)',
    },
  }),

  /**
   * Theme 4: Professional IT Blue
   * 60% Dark Navy (#060D1D & #0A192F), 30% Pure White & Soft Grey (#8892B0), 10% Electric Cyan (#00D2FF)
   */
  'it-blue': Object.freeze({
    id: 'it-blue',
    name: 'Professional IT Blue',
    tagline: 'Modern enterprise IT architecture combining dark navy depth, soft grey telemetry, and electric cyan.',
    isDefault: false,
    distribution: {
      dominant60: {
        name: 'Dark Navy Blue',
        canvasHex: '#060D1D',
        surfaceHex: '#0A192F',
        cardHex: '#0D223F',
        glassBg: 'rgba(10, 25, 47, 0.75)',
      },
      structural30: {
        name: 'Soft Grey & Deep Blue Dividers',
        textPrimaryHex: '#FFFFFF',
        textSecondaryHex: '#8892B0',
        borderHex: '#1B2A4A',
        borderGlass: 'rgba(27, 42, 74, 0.70)',
      },
      accent10: {
        name: 'Electric Cyan-Blue',
        hex: '#00D2FF',
        hoverHex: '#007BFF',
        activeHex: '#0056B3',
        contrastTextHex: '#060D1D',
        glowRgba: 'rgba(0, 210, 255, 0.35)',
        subtleRgba: 'rgba(0, 210, 255, 0.15)',
      },
    },
    cssVars: {
      '--theme-bg-canvas': '#060D1D',
      '--theme-bg-surface': '#0A192F',
      '--theme-bg-card': '#0D223F',
      '--theme-bg-glass': 'rgba(10, 25, 47, 0.75)',
      '--theme-text-primary': '#FFFFFF',
      '--theme-text-secondary': '#8892B0',
      '--theme-text-muted': 'rgba(136, 146, 176, 0.65)',
      '--theme-border': '#1B2A4A',
      '--theme-border-glass': 'rgba(27, 42, 74, 0.70)',
      '--theme-accent': '#00D2FF',
      '--theme-accent-hover': '#007BFF',
      '--theme-accent-active': '#0056B3',
      '--theme-accent-text': '#060D1D',
      '--theme-accent-glow': 'rgba(0, 210, 255, 0.35)',
      '--theme-accent-subtle': 'rgba(0, 210, 255, 0.15)',
      '--theme-aurora-glow': 'rgba(0, 210, 255, 0.22)',
    },
  }),
});

export const DEFAULT_THEME_ID: ThemeId = 'classic-navy-coral';

export const THEME_LIST: ThemeDefinition[] = [
  THEME_TEMPLATES['classic-navy-coral'],
  THEME_TEMPLATES['midnight-lime'],
  THEME_TEMPLATES['forest-purple'],
  THEME_TEMPLATES['it-blue'],
];

export function getTheme(id?: string | null): ThemeDefinition {
  if (id && isValidThemeId(id)) {
    return THEME_TEMPLATES[id as ThemeId];
  }
  return THEME_TEMPLATES[DEFAULT_THEME_ID];
}

export function isValidThemeId(id: string): id is ThemeId {
  return id in THEME_TEMPLATES;
}

/**
 * Calculates the relative luminance of an sRGB color.
 */
export function getRelativeLuminance(hexColor: string): number {
  const cleanHex = hexColor.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

  const toLinear = (c: number) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

/**
 * Validates WCAG contrast ratio between text and background.
 * Must exceed 4.5:1 for normal text (WCAG AA).
 */
export function getContrastRatio(foregroundHex: string, backgroundHex: string): number {
  const lum1 = getRelativeLuminance(foregroundHex);
  const lum2 = getRelativeLuminance(backgroundHex);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}
