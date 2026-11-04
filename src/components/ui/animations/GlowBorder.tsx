'use client';

import React from 'react';

interface GlowBorderProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export function GlowBorder({
  children,
  className = '',
  glowColor = 'rgba(8, 127, 196, 0.4)',
}: GlowBorderProps) {
  return (
    <div className={`relative p-[1px] rounded-2xl overflow-hidden group ${className}`}>
      {/* Moving Ambient Conic Beam */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-[150%] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `conic-gradient(from 0deg, transparent 0 340deg, ${glowColor} 360deg)`,
          animation: 'mrmSpinBeam 4s linear infinite',
        }}
      />

      {/* Content wrapper */}
      <div className="relative z-10 w-full h-full rounded-[inherit]">
        {children}
      </div>

      <style jsx global>{`
        @keyframes mrmSpinBeam {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
