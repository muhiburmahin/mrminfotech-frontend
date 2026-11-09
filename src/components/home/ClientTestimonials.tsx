/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useCallback, useRef } from 'react';
import { Star, ShieldCheck, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import type { TestimonialItem } from '@/lib/api/types';
import { AmbientSection } from '@/components/ui/AmbientSection';

interface ClientTestimonialsProps {
  testimonials: TestimonialItem[];
  eyebrow?: string;
  heading?: string;
  description?: string;
  /** `home` renders a full-bleed ambient section; `inline` is a compact block for detail pages. */
  variant?: 'home' | 'inline';
  id?: string;
}

const clampRating = (value: number | undefined | null) =>
  typeof value === 'number' && Number.isFinite(value) ? Math.min(5, Math.max(1, Math.round(value))) : null;

function formatReviewDate(value?: string | null): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`Rated ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          aria-hidden="true"
          className={`w-4 h-4 ${
            s <= rating ? 'fill-amber-400 text-amber-400' : 'text-[var(--theme-border)]'
          }`}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ t, carousel }: { t: TestimonialItem; carousel: boolean }) {
  const rating = clampRating(t.rating);
  const meta = [t.source, formatReviewDate(t.reviewDate)].filter(Boolean).join(' · ');
  const initials = t.authorName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  return (
    <figure
      role={carousel ? 'group' : undefined}
      aria-roledescription={carousel ? 'slide' : undefined}
      className={`group relative flex h-full flex-col justify-between rounded-2xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)]/70 p-7 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-[var(--theme-accent)]/60 hover:shadow-lg ${
        carousel ? 'w-[85%] shrink-0 snap-start sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]' : ''
      }`}
    >
      <div>
        <div className="mb-5 flex items-center justify-between">
          {rating ? <Stars rating={rating} /> : <span />}
          <Quote aria-hidden="true" className="h-6 w-6 text-[var(--theme-text-muted)] transition-colors group-hover:text-[var(--theme-accent)]" />
        </div>
        <blockquote className="text-sm leading-relaxed text-[var(--theme-text-secondary)]">
          &ldquo;{t.quote}&rdquo;
        </blockquote>
      </div>

      <figcaption className="mt-6 flex items-center justify-between gap-3 border-t border-[var(--theme-border-glass)] pt-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-[var(--theme-accent)] bg-[var(--theme-bg-canvas)]">
            {t.avatarUrl ? (
              <img src={t.avatarUrl} alt="" loading="lazy" className="h-full w-full object-cover" />
            ) : (
              <span aria-hidden="true" className="text-xs font-bold text-[var(--theme-accent)]">
                {initials}
              </span>
            )}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-[var(--theme-text-primary)]">{t.authorName}</p>
            {(t.authorRole || t.companyName) && (
              <p className="truncate text-xs text-[var(--theme-text-muted)]">
                {[t.authorRole, t.companyName].filter(Boolean).join(' · ')}
              </p>
            )}
            {meta && <p className="truncate text-[11px] text-[var(--theme-text-muted)]">{meta}</p>}
          </div>
        </div>
        {t.isVerified && (
          <span
            className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-500"
            title="Verified client feedback"
          >
            <ShieldCheck aria-hidden="true" className="h-4 w-4" />
            <span className="sr-only">Verified client feedback</span>
          </span>
        )}
      </figcaption>
    </figure>
  );
}

export function ClientTestimonials({
  testimonials,
  eyebrow = 'Client Feedback',
  heading = 'What Our Clients Say',
  description,
  variant = 'home',
  id = 'testimonials',
}: ClientTestimonialsProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByPage = useCallback((direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    track.scrollBy({ left: direction * track.clientWidth * 0.9, behavior: reduce ? 'auto' : 'smooth' });
  }, []);

  if (!testimonials || testimonials.length === 0) return null;

  // Only real ratings contribute to the summary; nothing is invented.
  const ratings = testimonials.map((t) => clampRating(t.rating)).filter((r): r is number => r !== null);
  const average = ratings.length ? ratings.reduce((a, b) => a + b, 0) / ratings.length : null;
  const useCarousel = testimonials.length > 3;
  const headingId = `${id}-heading`;

  const body = (
    <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
      <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)]/60 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[var(--theme-text-primary)]">
            <ShieldCheck aria-hidden="true" className="h-3.5 w-3.5 text-[var(--theme-accent)]" />
            <span>{eyebrow}</span>
          </div>
          <h2 id={headingId} className="text-3xl font-black tracking-tight text-[var(--theme-text-primary)] sm:text-4xl">
            {heading}
          </h2>
          {description && (
            <p className="text-sm leading-relaxed text-[var(--theme-text-secondary)] sm:text-base">{description}</p>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-4">
          {average !== null && (
            <div className="flex items-center gap-2">
              <Stars rating={Math.round(average)} />
              <span className="text-xs font-bold text-[var(--theme-text-secondary)]">
                {average.toFixed(1)} average · {ratings.length} {ratings.length === 1 ? 'review' : 'reviews'}
              </span>
            </div>
          )}
          {useCarousel && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollByPage(-1)}
                aria-label="Previous testimonials"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)] text-[var(--theme-text-primary)] transition-colors hover:border-[var(--theme-accent)] hover:text-[var(--theme-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--theme-accent)]"
              >
                <ChevronLeft aria-hidden="true" className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollByPage(1)}
                aria-label="Next testimonials"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)] text-[var(--theme-text-primary)] transition-colors hover:border-[var(--theme-accent)] hover:text-[var(--theme-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--theme-accent)]"
              >
                <ChevronRight aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {useCarousel ? (
        <div
          ref={trackRef}
          role="region"
          aria-roledescription="carousel"
          aria-labelledby={headingId}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') scrollByPage(1);
            if (e.key === 'ArrowLeft') scrollByPage(-1);
          }}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:thin] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--theme-accent)]"
        >
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} t={t} carousel />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} t={t} carousel={false} />
          ))}
        </div>
      )}
    </div>
  );

  if (variant === 'inline') {
    return (
      <section
        id={id}
        aria-labelledby={headingId}
        className="border-b border-[var(--theme-border-glass)] bg-[var(--theme-bg-canvas)] py-16 lg:py-20"
      >
        {body}
      </section>
    );
  }

  return (
    <AmbientSection id={id} variant="dual-side" className="border-b border-[var(--theme-border-glass)] py-24">
      {body}
    </AmbientSection>
  );
}
