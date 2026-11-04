/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Layers,
  Sparkles,
} from 'lucide-react';

interface ProductInteractiveGalleryProps {
  images: string[];
  title: string;
  stage?: string;
}

export default function ProductInteractiveGallery({
  images,
  title,
  stage = 'LIVE',
}: ProductInteractiveGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-80 rounded-3xl mrm-glass-card flex flex-col items-center justify-center p-8 text-center border border-white/20 dark:border-white/10">
        <div className="w-14 h-14 rounded-2xl bg-[#087FC4]/20 text-[#087FC4] dark:text-[#20B8D5] flex items-center justify-center mb-3">
          <Layers className="w-7 h-7" />
        </div>
        <h4 className="text-lg font-bold text-[var(--text-primary)]">{title}</h4>
        <p className="text-xs text-[var(--text-secondary)] mt-1 max-w-sm">
          Live software interface screenshots being rendered from the verified production cloud.
        </p>
      </div>
    );
  }

  const currentImage = images[selectedIndex] || images[0];

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="w-full space-y-4">
      {/* Main Showcase Frame */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-[#1E3557] bg-slate-950 shadow-2xl group/gallery aspect-[16/10] sm:aspect-[16/9]">
        <img
          src={currentImage}
          alt={`${title} screenshot ${selectedIndex + 1}`}
          className="w-full h-full object-cover transition-all duration-500 group-hover/gallery:scale-[1.02]"
        />

        {/* Ambient Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-extrabold uppercase tracking-wider text-white border border-white/10">
            {stage}
          </span>
          <span className="px-3 py-1 rounded-full bg-[#087FC4]/80 backdrop-blur-md text-[11px] font-bold text-white shadow-sm flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" />
            <span>Interactive View</span>
          </span>
        </div>

        {/* Top Right Controls (Counter & Fullscreen) */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-mono border border-white/10">
            {selectedIndex + 1} / {images.length}
          </span>
          <button
            type="button"
            onClick={() => setIsLightboxOpen(true)}
            className="p-2 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md text-white transition-colors cursor-pointer border border-white/10"
            title="Expand Fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Arrows (Visible when > 1 image) */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md border border-white/15 shadow-xl z-10"
              aria-label="Previous screenshot"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md border border-white/15 shadow-xl z-10"
              aria-label="Next screenshot"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Bottom Caption */}
        <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-white text-xs">
          <p className="truncate font-medium text-slate-200">
            {title} &mdash; Official Production Interface
          </p>
        </div>
      </div>

      {/* Thumbnail Carousel Selector Strip (Up to 10 Images) */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
          {images.map((img, idx) => {
            const isActive = idx === selectedIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={`relative w-24 h-16 sm:w-28 sm:h-18 rounded-xl overflow-hidden shrink-0 transition-all cursor-pointer border-2 bg-slate-900 ${
                  isActive
                    ? 'border-[#087FC4] dark:border-[#20B8D5] shadow-lg shadow-[#087FC4]/30 scale-105'
                    : 'border-slate-200 dark:border-[#1E3557] opacity-60 hover:opacity-100'
                }`}
                aria-label={`Select screenshot ${idx + 1}`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 right-1 px-1.5 py-0.2 rounded bg-black/70 text-[9px] font-mono text-white">
                  #{idx + 1}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer z-50 transition-colors"
            title="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="relative max-w-6xl max-h-[90vh] w-full h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentImage}
              alt={`${title} Fullscreen Screenshot`}
              className="max-h-[82vh] max-w-full object-contain rounded-2xl shadow-2xl border border-white/10"
            />

            {images.length > 1 && (
              <div className="flex items-center gap-4 mt-4">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-white text-xs font-mono">
                  {selectedIndex + 1} of {images.length}
                </span>
                <button
                  type="button"
                  onClick={handleNext}
                  className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
