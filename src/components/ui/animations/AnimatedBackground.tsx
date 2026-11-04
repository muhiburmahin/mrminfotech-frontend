'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface AnimatedBackgroundProps {
  className?: string;
  showGrid?: boolean;
  showOrbs?: boolean;
}

export function AnimatedBackground({
  className = '',
  showGrid = true,
  showOrbs = true,
}: AnimatedBackgroundProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* 1. Cyber Grid Layer */}
      {showGrid && (
        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(8, 127, 196, 0.4) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(8, 127, 196, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 25%, #000 60%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 25%, #000 60%, transparent 100%)',
          }}
        />
      )}

      {/* 2. Ambient Floating Radial Orbs */}
      {showOrbs && !shouldReduceMotion && (
        <>
          {/* Top-Right Cyan Glow */}
          <motion.div
            animate={{
              x: [0, 25, 0],
              y: [0, -30, 0],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -top-32 right-1/4 w-[520px] h-[520px] rounded-full bg-[#20B8D5]/15 dark:bg-[#20B8D5]/10 blur-[130px] will-change-transform"
          />

          {/* Top-Left Blue Glow */}
          <motion.div
            animate={{
              x: [0, -30, 0],
              y: [0, 25, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
            className="absolute -top-20 left-10 w-[450px] h-[450px] rounded-full bg-[#087FC4]/15 dark:bg-[#087FC4]/12 blur-[120px] will-change-transform"
          />

          {/* Subtle Deep Ambient Pulse */}
          <motion.div
            animate={{
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full bg-[#103B68]/15 dark:bg-[#103B68]/20 blur-[140px] will-change-transform"
          />
        </>
      )}

      {/* Static Fallback for reduced motion */}
      {showOrbs && shouldReduceMotion && (
        <div className="absolute -top-32 right-1/4 w-[520px] h-[520px] rounded-full bg-[#20B8D5]/15 dark:bg-[#20B8D5]/10 blur-[130px]" />
      )}
    </div>
  );
}
