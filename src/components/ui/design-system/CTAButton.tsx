'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { DESIGN_TOKENS, calculateContrastRatio } from '@/design-system/tokens';

export interface CTAButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  'aria-label'?: string;
}

/**
 * CTAButton - Primary conversion-oriented interactive element
 * 
 * Enforces the 10% Lime Green (#C6F432) fill, bold Midnight Black (#0B0B0C) typography,
 * locked easing 'cubic-bezier(0.4, 0, 0.2, 1)', and minimum 4.5:1 contrast validation.
 */
export function CTAButton({
  children,
  href,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  size = 'md',
  fullWidth = false,
  icon,
  iconPosition = 'right',
  'aria-label': ariaLabel,
}: CTAButtonProps) {
  // Contrast ratio verification at runtime in non-production environments
  useMemo(() => {
    if (process.env.NODE_ENV !== 'production') {
      const contrast = calculateContrastRatio(
        DESIGN_TOKENS.accent10.contrastText, // #0B0B0C
        DESIGN_TOKENS.accent10.hex           // #C6F432
      );
      if (contrast < 4.5) {
        console.warn(
          `[CTAButton Contrast Warning]: Contrast ${contrast.toFixed(2)}:1 is below the 4.5:1 WCAG requirement.`
        );
      }
    }
  }, []);

  const sizeClasses = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  }[size];

  // Locked styling adhering rigidly to the 10% Lime Green interactive accent
  const baseClasses = `
    inline-flex items-center justify-center font-extrabold tracking-tight select-none
    rounded-full transition-all duration-250 cursor-pointer
    disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    focus-visible:ring-[#C6F432] focus-visible:ring-offset-[#0B0B0C]
    active:scale-98
  `;

  // Inline style guarantees locked token consumption & cubic-bezier(0.4, 0, 0.2, 1) easing
  const dynamicStyle: React.CSSProperties = {
    backgroundColor: DESIGN_TOKENS.accent10.hex, // #C6F432
    color: DESIGN_TOKENS.accent10.contrastText,  // #0B0B0C
    transitionTimingFunction: DESIGN_TOKENS.motion.easing, // cubic-bezier(0.4, 0, 0.2, 1)
    transitionDuration: DESIGN_TOKENS.motion.durationNormal,
  };

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="mr-2 inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="ml-2 inline-flex shrink-0">{icon}</span>}
    </>
  );

  const combinedClassName = `
    ${baseClasses}
    ${sizeClasses}
    ${fullWidth ? 'w-full' : ''}
    hover:bg-[#D4F755] hover:shadow-[0_0_24px_rgba(198,244,50,0.40)] hover:scale-[1.02]
    active:bg-[#B2E022] active:scale-[0.98]
    ${className}
  `.replace(/\s+/g, ' ').trim();

  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={combinedClassName}
        style={dynamicStyle}
        aria-label={ariaLabel}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClassName}
      style={dynamicStyle}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}

