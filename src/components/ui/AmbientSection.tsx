'use client';

import React from 'react';

export type AmbientGlowVariant =
  | 'hero-rays'
  | 'center-orb'
  | 'horizon'
  | 'dual-side'
  | 'top-spotlight'
  | 'bento-grid';

interface AmbientSectionProps {
  children: React.ReactNode;
  variant?: AmbientGlowVariant;
  className?: string;
  id?: string;
  overflow?: 'hidden' | 'visible';
}

/**
 * AmbientSection - Reusable High-Craft Dark UI Wrapper with Ambient Aurora Lighting
 * Dynamically reacts to the active Global Theme variables (--theme-bg-canvas, --theme-accent, etc.)
 */
export function AmbientSection({
  children,
  variant = 'center-orb',
  className = '',
  id,
  overflow = 'hidden',
}: AmbientSectionProps) {
  const isVisible = overflow === 'visible';

  return (
    <section
      id={id}
      className={`relative ${
        isVisible ? 'overflow-visible' : 'overflow-hidden'
      } bg-[var(--theme-bg-canvas)] text-[var(--theme-text-primary)] border-b border-[var(--theme-border)]/60 ${className}`}
    >
      {/* Background Volumetric Ambient Lighting Effects (Always strictly clipped) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        {/* 1. Variant: Hero Rays (Intense vertical volumetric light rays + center aurora) */}
        {variant === 'hero-rays' && (
          <>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[95%] max-w-[1200px] h-[550px] bg-[var(--theme-accent-glow)] rounded-full blur-[140px] opacity-80"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_32px,var(--theme-accent-subtle)_32px,var(--theme-accent-subtle)_33px)] [mask-image:radial-gradient(ellipse_at_bottom,black_40%,transparent_80%)] opacity-75"
            />
          </>
        )}

        {/* 2. Variant: Center Orb (Luminous radial glow directly behind content) */}
        {variant === 'center-orb' && (
          <>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[var(--theme-accent-glow)] rounded-full blur-[140px] opacity-50"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
            />
          </>
        )}

        {/* 3. Variant: Horizon (Wide flat radial gradient glowing from the bottom border + dot grid) */}
        {variant === 'horizon' && (
          <>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 w-[850px] h-[280px] bg-[var(--theme-aurora-glow)] rounded-full blur-[130px] opacity-85"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_bottom,black_25%,transparent_75%)]"
            />
          </>
        )}

        {/* 4. Variant: Dual Side (Mixing primary accent on left and subtle complement on right) */}
        {variant === 'dual-side' && (
          <>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-1/4 -left-28 w-[500px] h-[500px] bg-[var(--theme-accent-glow)] rounded-full blur-[140px] opacity-40"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-1/4 -right-28 w-[500px] h-[500px] bg-[var(--theme-aurora-glow)] rounded-full blur-[140px] opacity-40"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]"
            />
          </>
        )}

        {/* 5. Variant: Top Spotlight (Glowing spotlight from top center downwards) */}
        {variant === 'top-spotlight' && (
          <>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[320px] bg-[var(--theme-accent-glow)] rounded-full blur-[130px] opacity-60"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]"
            />
          </>
        )}

        {/* 6. Variant: Bento Grid (Subtle cyber grid with radial mask) */}
        {variant === 'bento-grid' && (
          <>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[750px] h-[400px] bg-[var(--theme-accent-glow)] rounded-full blur-[150px] opacity-40"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"
            />
          </>
        )}
      </div>

      {/* Main Content (Elevated above lighting effects) */}
      <div className="relative z-10">{children}</div>
    </section>
  );
}

export default AmbientSection;
