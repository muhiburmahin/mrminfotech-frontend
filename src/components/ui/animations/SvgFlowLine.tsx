'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface SvgFlowLineProps {
  className?: string;
}

export function SvgFlowLine({ className = '' }: SvgFlowLineProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className={`hidden lg:block absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none ${className}`}>
        <div className="w-full h-0.5 border-t border-dashed border-[#087FC4]/30" />
      </div>
    );
  }

  return (
    <div className={`hidden lg:block absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none z-0 ${className}`}>
      <svg className="w-full h-12 overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 48">
        <defs>
          <linearGradient id="mrmFlowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#087FC4" stopOpacity="0.1" />
            <stop offset="30%" stopColor="#087FC4" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#20B8D5" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#20B8D5" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Base Track */}
        <path
          d="M 50 24 Q 250 8, 500 24 T 950 24"
          fill="none"
          stroke="rgba(8, 127, 196, 0.15)"
          strokeWidth="2"
          strokeDasharray="4 4"
        />

        {/* Animated Glow Line Drawing */}
        <motion.path
          d="M 50 24 Q 250 8, 500 24 T 950 24"
          fill="none"
          stroke="url(#mrmFlowGradient)"
          strokeWidth="2.5"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        />
      </svg>
    </div>
  );
}
