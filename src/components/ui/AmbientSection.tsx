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
}

/**
 * AmbientSection - Reusable High-Craft Dark UI Wrapper with Ambient Aurora Lighting
 * Enforces #06080d base background, section-by-section lighting variation,
 * and avoids flat repetitive black.
 */
export function AmbientSection({
  children,
  variant = 'center-orb',
  className = '',
  id,
}: AmbientSectionProps) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden bg-[#06080d] text-white border-b border-white/[0.08] ${className}`}
    >
      {/* 1. Variant: Hero Rays (Intense vertical volumetric light rays + center aurora) */}
      {variant === 'hero-rays' && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[95%] max-w-[1200px] h-[550px] bg-lime-400/25 rounded-full blur-[140px] z-0"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_32px,rgba(163,230,53,0.06)_32px,rgba(163,230,53,0.06)_33px)] [mask-image:radial-gradient(ellipse_at_bottom,black_35%,transparent_75%)] z-0"
          />
        </>
      )}

      {/* 2. Variant: Center Orb (Luminous radial glow directly behind content) */}
      {variant === 'center-orb' && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-400/15 rounded-full blur-[140px] z-0"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)] z-0"
          />
        </>
      )}

      {/* 3. Variant: Horizon (Wide flat radial gradient glowing from the bottom border + dot grid) */}
      {variant === 'horizon' && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 w-[850px] h-[280px] bg-lime-400/20 rounded-full blur-[130px] z-0"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_bottom,black_25%,transparent_75%)] z-0"
          />
        </>
      )}

      {/* 4. Variant: Dual Side (Mixing primary lime on left and secondary cyan/blue on right) */}
      {variant === 'dual-side' && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/4 -left-28 w-[500px] h-[500px] bg-lime-400/12 rounded-full blur-[140px] z-0"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-1/4 -right-28 w-[500px] h-[500px] bg-cyan-400/12 rounded-full blur-[140px] z-0"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)] z-0"
          />
        </>
      )}

      {/* 5. Variant: Top Spotlight (Glowing spotlight from top center downwards) */}
      {variant === 'top-spotlight' && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[320px] bg-lime-400/18 rounded-full blur-[130px] z-0"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)] z-0"
          />
        </>
      )}

      {/* 6. Variant: Bento Grid (Subtle cyber grid with radial mask) */}
      {variant === 'bento-grid' && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[750px] h-[400px] bg-lime-400/12 rounded-full blur-[150px] z-0"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] z-0"
          />
        </>
      )}

      {/* Main Content (Elevated above lighting effects) */}
      <div className="relative z-10">{children}</div>
    </section>
  );
}

export default AmbientSection;
