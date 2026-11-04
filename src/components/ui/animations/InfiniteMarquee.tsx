'use client';

import React from 'react';

interface InfiniteMarqueeProps {
  children: React.ReactNode;
  speed?: number; // in seconds per cycle
  pauseOnHover?: boolean;
  direction?: 'left' | 'right';
  className?: string;
}

export function InfiniteMarquee({
  children,
  speed = 28,
  pauseOnHover = true,
  direction = 'left',
  className = '',
}: InfiniteMarqueeProps) {
  const animDirection = direction === 'left' ? 'normal' : 'reverse';

  return (
    <div
      className={`relative overflow-hidden w-full ${className}`}
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      }}
    >
      <div
        className={`flex w-fit items-center ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
        style={{
          animation: `mrmMarquee ${speed}s linear infinite ${animDirection}`,
          willChange: 'transform',
        }}
      >
        <div className="flex shrink-0 items-center gap-8 sm:gap-12 pr-8 sm:pr-12">
          {children}
        </div>
        <div className="flex shrink-0 items-center gap-8 sm:gap-12 pr-8 sm:pr-12" aria-hidden="true">
          {children}
        </div>
      </div>

      <style jsx global>{`
        @keyframes mrmMarquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
      `}</style>
    </div>
  );
}
