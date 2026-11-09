'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, Clock, Calendar } from 'lucide-react';

export interface EditorialBlogPostItem {
  id?: string;
  slug: string;
  title?: string;
  excerpt?: string;
  publishedAt?: string;
  readingMinutes?: number;
  coverImage?: string | null;
  translations?: Array<{
    title?: string;
    excerpt?: string;
  }>;
}

interface InsightsEditorialSectionProps {
  posts: EditorialBlogPostItem[];
}

export function InsightsEditorialSection({ posts }: InsightsEditorialSectionProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="relative py-24 sm:py-32 bg-[var(--theme-bg-canvas)] border-b border-[var(--theme-border-glass)] overflow-hidden">
      {/* Background Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/3 w-[500px] h-[300px] bg-[var(--theme-accent)]/10 rounded-full blur-[140px] z-0"
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/20 text-xs font-bold text-[var(--theme-accent)] uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>INSIGHTS &amp; UPDATES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[var(--theme-text-primary)] tracking-tight leading-tight">
              Engineering Insights &amp;{' '}
              <span className="font-serif italic font-normal text-[var(--theme-accent)] neon-text-glow">
                Technical Articles.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-[var(--theme-text-secondary)] leading-relaxed">
              In-depth architectural breakdowns, database performance tuning, and technology perspectives written by the MRM InfoTech engineering team.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-[var(--theme-border-glass)] bg-[var(--theme-bg-surface)] text-sm font-bold text-[var(--theme-text-primary)] hover:border-[var(--theme-accent)]/50 hover:text-[var(--theme-accent)] transition-all shrink-0 self-start md:self-auto group"
          >
            <span>Read All Articles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Editorial Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {posts.slice(0, 3).map((post, idx) => {
            const rawTitle = post.title || post.translations?.[0]?.title || 'Technical Article';
            const rawExcerpt = post.excerpt || post.translations?.[0]?.excerpt || '';
            const readTime = post.readingMinutes ? `${post.readingMinutes} min read` : '5 min read';
            const dateStr = post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })
              : 'Recent';

            return (
              <motion.article
                key={post.id || post.slug || idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="rounded-3xl border border-[var(--theme-border-glass)] border-t-2 border-t-[var(--theme-accent)]/70 bg-[var(--theme-bg-surface)] p-7 flex flex-col justify-between shadow-md hover:border-[var(--theme-accent)] hover:shadow-xl hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.1),0_0_20px_var(--theme-accent-glow)] transition-all duration-300 group"
              >
                <div className="space-y-4">
                  {/* Meta Bar */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-[var(--theme-text-muted)] border-b border-[var(--theme-border-glass)] pb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                      {dateStr}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                      {readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition-colors line-clamp-2 leading-snug">
                    <Link href={`/blog/${post.slug}`}>
                      {rawTitle}
                    </Link>
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs sm:text-sm text-[var(--theme-text-secondary)] leading-relaxed line-clamp-3">
                    {rawExcerpt}
                  </p>
                </div>

                {/* Read Link */}
                <div className="pt-6 mt-6 border-t border-[var(--theme-border-glass)]">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[var(--theme-accent)] uppercase tracking-wider group-hover:gap-3 transition-all"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

