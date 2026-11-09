'use client';

import React, { useRef, useState } from 'react';
import { DESIGN_TOKENS } from '@/design-system/tokens';
import { CTAButton } from './CTAButton';

export interface GlassCardProps {
  title: string;
  subtitle?: string;
  description?: string;
  tag?: string;
  icon?: React.ReactNode;
  imageUrl?: string;
  ctaText?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  metaInfo?: React.ReactNode;
}

/**
 * GlassCard - 60-30-10 Glassmorphic Card Component
 * 
 * Specs:
 * - 60% Dominant: Background is semi-transparent Midnight Black (#0B0B0C at 40% opacity)
 * - 30% Structural: Subtle 1px Pure White border at 20% opacity (#FFFFFF at 20%)
 * - Backdrop filter blur: 16px
 * - Hover: 3D perspective tilt (5 degrees) + scale to 1.05 + elevated z-index
 * - Interactive CTA Button: 10% Lime Green (#C6F432) with bold #0B0B0C text
 * - All animation easings locked to 'cubic-bezier(0.4, 0, 0.2, 1)'
 */
export function GlassCard({
  title,
  subtitle,
  description,
  tag,
  icon,
  imageUrl,
  ctaText = 'Explore',
  ctaHref,
  onCtaClick,
  children,
  className = '',
  metaInfo,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // 3D Perspective Tilt calculations (locked to max 5 degrees tilt)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const maxTilt = DESIGN_TOKENS.motion.cardPerspectiveTiltDeg; // 5 degrees

    const tiltX = -((y - centerY) / centerY) * maxTilt;
    const tiltY = ((x - centerX) / centerX) * maxTilt;

    setRotateX(tiltX);
    setRotateY(tiltY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: 'var(--theme-bg-glass, rgba(15, 34, 61, 0.75))',
    borderColor: isHovered
      ? 'var(--theme-accent, #00E5FF)'
      : 'var(--theme-border-glass, rgba(30, 58, 95, 0.70))',
    backdropFilter: `blur(${DESIGN_TOKENS.glassmorphism.backdropBlur})`,
    WebkitBackdropFilter: `blur(${DESIGN_TOKENS.glassmorphism.backdropBlur})`,
    transform: isHovered
      ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${DESIGN_TOKENS.motion.cardHoverScale})`
      : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
    boxShadow: isHovered
      ? '0 30px 60px rgba(0,0,0,0.85), 0 0 30px var(--theme-accent-subtle, rgba(0, 229, 255, 0.15))'
      : '0 20px 40px rgba(0,0,0,0.5)',
    transition: `transform ${DESIGN_TOKENS.motion.durationSlow} ${DESIGN_TOKENS.motion.easing}, 
                 border-color ${DESIGN_TOKENS.motion.durationNormal} ${DESIGN_TOKENS.motion.easing}, 
                 box-shadow ${DESIGN_TOKENS.motion.durationNormal} ${DESIGN_TOKENS.motion.easing}`,
    zIndex: isHovered ? 20 : 1,
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={cardStyle}
      className={`
        relative flex flex-col justify-between overflow-hidden rounded-3xl p-7
        border text-[var(--theme-text-primary)]
        transition-all will-change-transform
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      {/* Top Header Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          {tag && (
            <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest text-[var(--theme-accent)] bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)] animate-pulse" />
              {tag}
            </span>
          )}

          {icon && (
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 border border-white/15 text-[var(--theme-accent)]">
              {icon}
            </div>
          )}
        </div>

        {imageUrl && (
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-canvas)]">
            {/* eslint-disable-next-line @next/next/no-img-element -- card images come from arbitrary CMS URLs */}
            <img
              src={imageUrl}
              alt={title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </div>
        )}

        <div>
          {subtitle && (
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--theme-accent)] mb-1">
              {subtitle}
            </p>
          )}
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-[var(--theme-text-primary)]">
            {title}
          </h3>
          {description && (
            <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-[var(--theme-text-secondary)] line-clamp-3">
              {description}
            </p>
          )}
        </div>

        {children}
      </div>

      {/* Card Footer: Meta Info & Conversion CTA */}
      <div className="mt-6 pt-5 border-t border-[var(--theme-border)]/40 flex items-center justify-between gap-4">
        {metaInfo ? (
          <div className="text-xs text-[var(--theme-text-secondary)] font-medium">{metaInfo}</div>
        ) : (
          <div className="text-[11px] font-bold text-[var(--theme-text-secondary)]/50 tracking-wider uppercase">
            60 • 30 • 10 SYSTEM
          </div>
        )}

        {(ctaText && (ctaHref || onCtaClick)) && (
          <CTAButton
            size="sm"
            href={ctaHref}
            onClick={onCtaClick}
          >
            {ctaText}
          </CTAButton>
        )}
      </div>
    </div>
  );
}

