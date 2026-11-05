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
    backgroundColor: DESIGN_TOKENS.dominant60.glassSurface, // #0B0B0C at 40%
    borderColor: DESIGN_TOKENS.structural30.glassBorder,   // #FFFFFF at 20%
    backdropFilter: `blur(${DESIGN_TOKENS.glassmorphism.backdropBlur})`,
    WebkitBackdropFilter: `blur(${DESIGN_TOKENS.glassmorphism.backdropBlur})`,
    transform: isHovered
      ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${DESIGN_TOKENS.motion.cardHoverScale})`
      : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
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
        border border-white/20 text-white shadow-2xl
        transition-all will-change-transform
        ${isHovered ? 'shadow-[0_30px_60px_rgba(0,0,0,0.85),0_0_30px_rgba(198,244,50,0.08)] border-white/30' : ''}
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      {/* Top Header Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          {tag && (
            <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest text-[#FFFFFF] bg-white/10 border border-white/15">
              {tag}
            </span>
          )}

          {icon && (
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 border border-white/15 text-white">
              {icon}
            </div>
          )}
        </div>

        {imageUrl && (
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/15 bg-[#0B0B0C]">
            <img
              src={imageUrl}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </div>
        )}

        <div>
          {subtitle && (
            <p className="text-xs font-bold uppercase tracking-wider text-white/70 mb-1">
              {subtitle}
            </p>
          )}
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-[#FFFFFF]">
            {title}
          </h3>
          {description && (
            <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-white/70 line-clamp-3">
              {description}
            </p>
          )}
        </div>

        {children}
      </div>

      {/* Card Footer: Meta Info & Conversion CTA */}
      <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between gap-4">
        {metaInfo ? (
          <div className="text-xs text-white/60 font-medium">{metaInfo}</div>
        ) : (
          <div className="text-[11px] font-bold text-white/40 tracking-wider uppercase">
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

