'use client';

import React from 'react';
import { DESIGN_TOKENS } from '@/design-system/tokens';

export interface MasonryGridProps {
  children: React.ReactNode;
  className?: string;
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  gap?: string;
  category?: 'Products' | 'Services' | 'Case Studies' | 'General';
}

/**
 * MasonryGrid - 60-30-10 Responsive Grid Component
 * 
 * Adapts from:
 * - 1 column on mobile (< 768px)
 * - 2 columns on tablet (768px - 1024px)
 * - 3-column layout on desktop (> 1024px)
 * 
 * Enforces rigid structural margins and full-bleed layout prioritization.
 */
export function MasonryGrid({
  children,
  className = '',
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 'gap-8',
  category,
}: MasonryGridProps) {
  const colClasses = `
    grid
    grid-cols-1
    ${columns.tablet === 2 ? 'md:grid-cols-2' : ''}
    ${columns.desktop === 3 ? 'lg:grid-cols-3' : ''}
  `.replace(/\s+/g, ' ').trim();

  return (
    <div
      data-category={category}
      className={`
        w-full
        ${colClasses}
        ${gap}
        items-stretch
        transition-all
        ${className}
      `.replace(/\s+/g, ' ').trim()}
      style={{
        transitionTimingFunction: DESIGN_TOKENS.motion.easing,
      }}
    >
      {children}
    </div>
  );
}
