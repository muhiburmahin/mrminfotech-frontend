'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  variant?: 'light' | 'dark';
  showTagline?: boolean;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export function Logo({
  variant = 'dark',
  showTagline = true,
  showText = true,
  size = 'md',
  className = '',
  onClick,
}: LogoProps) {
  const isLight = variant === 'light';

  // Compact, refined dimensions proportionate to modern 64px header
  const imageDimensions = {
    sm: { width: 30, height: 30, class: 'w-7 h-7 sm:w-7.5 sm:h-7.5' },
    md: { width: 36, height: 36, class: 'w-8 h-8 sm:w-9 sm:h-9' },
    lg: { width: 48, height: 48, class: 'w-11 h-11 sm:w-12 sm:h-12' },
  };

  const textSizes = {
    sm: 'text-sm sm:text-base',
    md: 'text-base sm:text-[17px]',
    lg: 'text-xl sm:text-2xl',
  };

  const taglineSizes = {
    sm: 'text-[7px]',
    md: 'text-[7.5px] sm:text-[8px]',
    lg: 'text-[9px] sm:text-[10px]',
  };

  return (
    <Link
      href="/"
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 group select-none ${className}`}
      aria-label="MRM InfoTech — IDEAS • PRODUCTS • IMPACT"
    >
      {/* Official MRM InfoTech Logo Emblem */}
      <div
        className={`relative flex-shrink-0 ${imageDimensions[size].class} rounded-lg overflow-hidden shadow-xs transition-transform duration-200 group-hover:scale-105 bg-[#07162C] ${
          isLight
            ? 'ring-1 ring-white/20'
            : 'ring-1 ring-slate-900/10 dark:ring-white/15'
        }`}
      >
        <Image
          src="/logo-icon.png"
          alt="MRM InfoTech Logo"
          width={imageDimensions[size].width}
          height={imageDimensions[size].height}
          className="w-full h-full object-cover"
          priority
        />
      </div>

      {/* Brand Typography Lockup */}
      {showText && (
        <div className="flex flex-col justify-center leading-tight">
          <div className="flex items-center">
            <span className={`font-black tracking-tight ${textSizes[size]} text-white`}>
              MRM{' '}
              <span className="text-[var(--theme-accent)]">
                InfoTech
              </span>
            </span>
          </div>

          {showTagline && (
            <span
              className={`font-extrabold tracking-[0.18em] uppercase ${taglineSizes[size]} text-white/50`}
            >
              IDEAS <span className="text-[var(--theme-accent)] font-black">•</span> PRODUCTS{' '}
              <span className="text-[var(--theme-accent)] font-black">•</span> IMPACT
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
