'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Monitor,
  Smartphone,
  Tablet,
  LayoutDashboard,
  Layers,
} from 'lucide-react';

export interface ProjectScreenshot {
  id?: string;
  url: string;
  title: string;
  subtitle?: string;
  caption?: string;
  alt?: string;
  device?: 'Desktop' | 'Mobile' | 'Tablet' | 'Dashboard' | 'Other';
  category?: string;
  isFeatured?: boolean;
  order?: number;
}

interface ProjectLightboxGalleryProps {
  screenshots: ProjectScreenshot[];
  projectTitle?: string;
}

export function ProjectLightboxGallery({
  screenshots,
  projectTitle = 'Project',
}: ProjectLightboxGalleryProps) {
  const [selectedDevice, setSelectedDevice] = useState<string>('ALL');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // Available devices
  const devices = [
    { id: 'ALL', label: 'All Screenshots', icon: Layers },
    { id: 'Desktop', label: 'Desktop', icon: Monitor },
    { id: 'Dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'Mobile', label: 'Mobile App', icon: Smartphone },
    { id: 'Tablet', label: 'Tablet', icon: Tablet },
  ];

  const filteredScreenshots = screenshots.filter((item) => {
    if (selectedDevice === 'ALL') return true;
    return (item.device || 'Desktop').toLowerCase() === selectedDevice.toLowerCase();
  });

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const nextImage = useCallback(() => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % filteredScreenshots.length : 0
    );
  }, [activeLightboxIndex, filteredScreenshots.length]);

  const prevImage = useCallback(() => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + filteredScreenshots.length) % filteredScreenshots.length : 0
    );
  }, [activeLightboxIndex, filteredScreenshots.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, nextImage, prevImage]);

  if (!screenshots || screenshots.length === 0) {
    return null;
  }

  const currentScreenshot =
    activeLightboxIndex !== null ? filteredScreenshots[activeLightboxIndex] : null;

  return (
    <div className="space-y-6">
      {/* Device Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-[var(--theme-border-glass)]">
        <div className="flex flex-wrap items-center gap-2">
          {devices.map((d) => {
            const Icon = d.icon;
            const count =
              d.id === 'ALL'
                ? screenshots.length
                : screenshots.filter(
                    (s) => (s.device || 'Desktop').toLowerCase() === d.id.toLowerCase()
                  ).length;

            if (count === 0 && d.id !== 'ALL') return null;

            const isActive = selectedDevice === d.id;

            return (
              <button
                key={d.id}
                onClick={() => setSelectedDevice(d.id)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[var(--theme-accent)] text-[var(--theme-accent-text)] shadow-[0_0_16px_var(--theme-accent-glow)]'
                    : 'bg-[var(--theme-bg-surface)] text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] border border-[var(--theme-border-glass)]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{d.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-black/20 text-white' : 'bg-white/10 text-[var(--theme-text-muted)]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="text-xs font-mono text-[var(--theme-text-muted)]">
          {filteredScreenshots.length} {filteredScreenshots.length === 1 ? 'Preview' : 'Previews'} Available
        </div>
      </div>

      {/* Screenshot Masonry / Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {filteredScreenshots.map((item, idx) => {
          const deviceLabel = item.device || 'Desktop';
          return (
            <div
              key={item.id || item.url + idx}
              onClick={() => openLightbox(idx)}
              className="group relative rounded-2xl overflow-hidden border border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)] shadow-lg hover:border-[var(--theme-accent)]/80 hover:shadow-2xl hover:shadow-[var(--theme-accent-glow)] transition-all duration-300 cursor-pointer flex flex-col"
            >
              {/* Window Frame Mockup Header */}
              <div className="px-4 py-2.5 bg-black/60 backdrop-blur-md border-b border-white/10 flex items-center justify-between z-10">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="text-[11px] font-mono text-white/50 ml-2 truncate max-w-[200px]">
                    {item.title}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/10 text-white/80 border border-white/15">
                    {deviceLabel}
                  </span>
                  <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center text-white/70 group-hover:bg-[var(--theme-accent)] group-hover:text-[var(--theme-accent-text)] transition-all">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Screenshot Image Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.url}
                  alt={item.alt || item.title || `${projectTitle} Screenshot`}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Subtle Hover Action Pill */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/90 text-slate-900 text-xs font-bold shadow-xl backdrop-blur-md">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>View High-Res Lightbox</span>
                  </span>
                </div>
              </div>

              {/* Title & Caption Bar */}
              <div className="p-4 bg-[var(--theme-bg-surface)] flex flex-col justify-between flex-1">
                <h4 className="text-sm font-bold text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition-colors">
                  {item.title}
                </h4>
                {(item.subtitle || item.caption) && (
                  <p className="text-xs text-[var(--theme-text-secondary)] mt-1 line-clamp-2">
                    {item.subtitle || item.caption}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeLightboxIndex !== null && currentScreenshot && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          {/* Top Bar */}
          <div
            className="w-full max-w-6xl flex items-center justify-between text-white pb-3 border-b border-white/15"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[var(--theme-accent)] text-[var(--theme-accent-text)]">
                {currentScreenshot.device || 'Desktop'}
              </span>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  {currentScreenshot.title}
                </h3>
                <p className="text-xs text-white/60 font-mono">
                  {projectTitle} • Image {activeLightboxIndex + 1} of {filteredScreenshots.length}
                </p>
              </div>
            </div>

            <button
              onClick={closeLightbox}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
              title="Close (Esc)"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Central High-Res Image Viewport with Previous & Next controls */}
          <div
            className="relative w-full max-w-6xl flex-1 flex items-center justify-center my-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous Button */}
            {filteredScreenshots.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-2 sm:left-4 z-20 p-3 rounded-2xl bg-black/70 hover:bg-[var(--theme-accent)] text-white hover:text-[var(--theme-accent-text)] transition-all cursor-pointer backdrop-blur-md border border-white/10 shadow-2xl"
                aria-label="Previous Screenshot"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Lightbox Main Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentScreenshot.url}
              alt={currentScreenshot.alt || currentScreenshot.title}
              className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl ring-1 ring-white/15"
            />

            {/* Next Button */}
            {filteredScreenshots.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-2 sm:right-4 z-20 p-3 rounded-2xl bg-black/70 hover:bg-[var(--theme-accent)] text-white hover:text-[var(--theme-accent-text)] transition-all cursor-pointer backdrop-blur-md border border-white/10 shadow-2xl"
                aria-label="Next Screenshot"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Bottom Caption Pill */}
          <div
            className="w-full max-w-3xl text-center py-2 px-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white/90 text-xs leading-relaxed"
            onClick={(e) => e.stopPropagation()}
          >
            {currentScreenshot.caption || currentScreenshot.subtitle || currentScreenshot.title}
          </div>
        </div>
      )}
    </div>
  );
}

