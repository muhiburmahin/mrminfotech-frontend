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
import type { ProductMediaItem } from '@/types/product.types';

interface ProductInteractiveGalleryProps {
  images?: string[];
  mediaItems?: ProductMediaItem[];
  title: string;
  stage?: string;
}

export default function ProductInteractiveGallery({
  images,
  mediaItems,
  title,
  stage = 'LIVE',
}: ProductInteractiveGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Normalize image data
  const normalizedItems: Array<{
    url: string;
    title: string;
    caption?: string;
    mediaType?: string;
  }> = React.useMemo(() => {
    if (mediaItems && mediaItems.length > 0) {
      return mediaItems.map((m) => ({
        url: m.url,
        title: m.title || title,
        caption: m.caption,
        mediaType: m.mediaType,
      }));
    }
    if (images && images.length > 0) {
      return images.map((url, i) => ({
        url,
        title: `${title} screenshot ${i + 1}`,
      }));
    }
    return [];
  }, [mediaItems, images, title]);

  if (normalizedItems.length === 0) {
    return (
      <div className="w-full h-80 rounded-3xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-14 h-14 rounded-2xl bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] flex items-center justify-center mb-3 border border-[var(--theme-accent)]/30">
          <Layers className="w-7 h-7" />
        </div>
        <h4 className="text-lg font-bold text-[var(--theme-text-primary)]">{title}</h4>
        <p className="text-xs text-[var(--theme-text-muted)] mt-1 max-w-sm">
          Live software interface screenshots being rendered from the verified production cloud.
        </p>
      </div>
    );
  }

  const currentItem = normalizedItems[selectedIndex] || normalizedItems[0];

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev - 1 + normalizedItems.length) % normalizedItems.length);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % normalizedItems.length);
  };

  return (
    <div className="w-full space-y-4">
      {/* Main Showcase Frame */}
      <div className="relative rounded-3xl overflow-hidden border border-[var(--theme-border-glass)] bg-black/80 shadow-2xl group/gallery aspect-[16/10] sm:aspect-[16/9]">
        <img
          src={currentItem.url}
          alt={currentItem.title}
          className="w-full h-full object-cover object-top transition-all duration-500 group-hover/gallery:scale-[1.01]"
        />

        {/* Ambient Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-extrabold uppercase tracking-wider text-emerald-400 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block mr-1.5 animate-pulse" />
            {stage}
          </span>
          {currentItem.mediaType && (
            <span className="px-3 py-1 rounded-full bg-[var(--theme-accent)]/90 backdrop-blur-md text-[11px] font-bold text-[var(--theme-accent-text)] shadow-sm flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              <span>{currentItem.mediaType}</span>
            </span>
          )}
        </div>

        {/* Top Right Controls (Counter & Fullscreen) */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-mono border border-white/10">
            {selectedIndex + 1} / {normalizedItems.length}
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
        {normalizedItems.length > 1 && (
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
          <p className="truncate font-medium text-white/90">
            {currentItem.caption || currentItem.title}
          </p>
        </div>
      </div>

      {/* Thumbnail Carousel Selector Strip */}
      {normalizedItems.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 scrollbar-none">
          {normalizedItems.map((item, idx) => {
            const isActive = idx === selectedIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={`relative shrink-0 rounded-xl overflow-hidden border-2 transition-all cursor-pointer aspect-[16/10] w-20 sm:w-24 ${
                  isActive
                    ? 'border-[var(--theme-accent)] ring-2 ring-[var(--theme-accent)]/30 scale-105'
                    : 'border-[var(--theme-border-glass)] opacity-60 hover:opacity-100'
                }`}
              >
                <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
              </button>
            );
          })}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close fullscreen view"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="relative max-w-6xl max-h-[85vh] w-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentItem.url}
              alt={currentItem.title}
              className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl"
            />
            <div className="mt-4 text-center text-white space-y-1">
              <h5 className="font-bold text-base">{currentItem.title}</h5>
              {currentItem.caption && (
                <p className="text-xs text-white/70">{currentItem.caption}</p>
              )}
            </div>

            {normalizedItems.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute -left-4 sm:left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 hover:bg-black text-white cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute -right-4 sm:right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 hover:bg-black text-white cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
