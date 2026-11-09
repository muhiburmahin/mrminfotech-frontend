'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, ArrowLeft, ArrowRight, Calendar, Copy, Check } from 'lucide-react';
import { LinkedinIcon, TwitterIcon } from '@/components/public/shared/SocialIcons';

interface BlogPostReadingViewProps {
  post: {
    id: string;
    slug: string;
    title: string;
    excerpt?: string | null;
    body?: string | null;
    readingMinutes?: number | null;
    publishedAt?: string | Date | null;
    category?: { name?: string } | string | null;
    categoryName?: string | null;
    tags?: Array<{ name?: string }>;
  };
  recentPosts: Array<{
    id: string;
    slug: string;
    title: string;
    excerpt?: string | null;
    readingMinutes?: number | null;
    publishedAt?: string | Date | null;
  }>;
}

export default function BlogPostReadingView({ post, recentPosts }: BlogPostReadingViewProps) {
  const [readingProgress, setReadingProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const title = post.title || 'Technical Article';
  const category =
    typeof post.category === 'string'
      ? post.category
      : post.category?.name || post.categoryName || 'Software Architecture';
  const readTime = post.readingMinutes || 6;
  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recently Published';

  const body = post.body || post.excerpt || '';

  return (
    <div className="w-full flex flex-col bg-[var(--theme-bg-canvas)] text-[var(--theme-text-primary)] transition-colors duration-200">
      {/* ──────────────── Top Reading Progress Bar ──────────────── */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-transparent">
        <div
          className="h-full bg-[var(--theme-accent)] transition-all duration-75"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* ──────────────── Top Article Header ──────────────── */}
      <section className="relative pt-24 pb-16 border-b border-[var(--theme-border-glass)] overflow-hidden">
        {/* Ambient Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-10 left-1/3 w-96 h-96 rounded-full bg-[var(--theme-accent)]/10 blur-[100px]"
        />

        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold text-[var(--theme-text-muted)] hover:text-[var(--theme-accent)] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Publications</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="px-3 py-1 rounded-full font-bold uppercase tracking-wider bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] border border-[var(--theme-accent)]/30">
              {category}
            </span>

            <div className="flex items-center gap-1.5 text-[var(--theme-text-muted)] font-medium">
              <Clock className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
              <span>{readTime} min read</span>
            </div>

            <span className="text-[var(--theme-text-muted)]">&bull;</span>

            <div className="flex items-center gap-1.5 text-[var(--theme-text-muted)] font-medium">
              <Calendar className="w-3.5 h-3.5" />
              <span>{publishedDate}</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.14]">
            {title}
          </h1>

          {post.excerpt && (
            <p className="text-base sm:text-lg text-[var(--theme-text-secondary)] leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {/* Author Card & Social Share Bar */}
          <div className="pt-6 border-t border-[var(--theme-border-glass)] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[var(--theme-accent)] text-[var(--theme-accent-text)] flex items-center justify-center font-black text-sm shadow-md shadow-[var(--theme-accent-glow)]">
                MRM
              </div>
              <div>
                <div className="text-xs font-bold text-[var(--theme-text-primary)]">
                  MRM InfoTech Engineering Team
                </div>
                <div className="text-[11px] text-[var(--theme-text-muted)]">
                  Systems Architects &amp; Software Engineers
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[var(--theme-bg-surface)] text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] border border-[var(--theme-border-glass)] transition-colors cursor-pointer"
                title="Copy Article Link"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>

              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.href : ''
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)] bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] transition-colors"
                title="Share on LinkedIn"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
              </a>

              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  title
                )}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)] bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] transition-colors"
                title="Share on X"
              >
                <TwitterIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── Article Body Reading Experience ──────────────── */}
      <section className="py-16 md:py-24 bg-[var(--theme-bg-canvas)] transition-colors duration-200">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Main Article Content Container */}
          <article className="p-8 sm:p-12 rounded-3xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] shadow-xl prose prose-invert max-w-none text-xs sm:text-sm text-[var(--theme-text-secondary)] leading-relaxed whitespace-pre-line space-y-6">
            {body}
          </article>

          {/* Author Bio Box */}
          <div className="p-8 rounded-3xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <div className="w-16 h-16 rounded-2xl bg-[var(--theme-accent)] text-[var(--theme-accent-text)] flex items-center justify-center font-black text-xl shadow-lg shadow-[var(--theme-accent-glow)] shrink-0">
              MRM
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-bold text-[var(--theme-text-primary)]">
                About the MRM Engineering Group
              </h3>
              <p className="text-xs text-[var(--theme-text-secondary)] leading-relaxed">
                The engineering team at MRM InfoTech designs high-performance cloud applications, multi-tenant databases,
                and scalable software solutions for institutional enterprises in Dhaka, Bangladesh.
              </p>
              <div className="pt-2 flex items-center justify-center sm:justify-start gap-3">
                <Link
                  href="/about"
                  className="text-xs font-bold text-[var(--theme-accent)] hover:underline"
                >
                  Our Philosophy &amp; Story &rarr;
                </Link>
                <Link
                  href="/projects"
                  className="text-xs font-bold text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)]"
                >
                  View Live Systems &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* ──────────────── Related Publications ──────────────── */}
          {recentPosts.length > 0 && (
            <div className="space-y-6 pt-6 border-t border-[var(--theme-border-glass)]">
              <h3 className="text-xl font-black text-[var(--theme-text-primary)] tracking-tight">
                Recommended Architectural Deep-Dives
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recentPosts.map((rPost) => (
                  <div
                    key={rPost.slug}
                    className="p-6 rounded-2xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] hover:border-[var(--theme-accent)]/50 transition-all flex flex-col justify-between group"
                  >
                    <div className="space-y-2">
                      <div className="text-[10px] font-mono text-[var(--theme-text-muted)] flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[var(--theme-accent)]" />
                        <span>{rPost.readingMinutes || 5}m read</span>
                      </div>
                      <h4 className="text-sm font-bold text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition-colors leading-snug">
                        <Link href={`/blog/${rPost.slug}`}>{rPost.title}</Link>
                      </h4>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[var(--theme-border-glass)]">
                      <Link
                        href={`/blog/${rPost.slug}`}
                        className="text-xs font-bold text-[var(--theme-accent)] inline-flex items-center gap-1 hover:gap-2 transition-all cursor-pointer"
                      >
                        <span>Read</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Consultation CTA */}
          <div className="p-8 sm:p-10 rounded-3xl bg-linear-to-br from-[var(--theme-bg-surface)] to-[var(--theme-bg-canvas)] border border-[var(--theme-border-glass)] text-center space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-[var(--theme-text-primary)]">
              Solving a Hard Engineering Problem?
            </h3>
            <p className="text-xs text-[var(--theme-text-secondary)] max-w-lg mx-auto leading-relaxed">
              Our lead engineers can help design and deploy high-availability architectures, PostgreSQL optimizations,
              or microservice platforms for your next venture.
            </p>
            <div className="pt-2">
              <Link
                href="/start-project"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs bg-[var(--theme-accent)] text-[var(--theme-accent-text)] hover:shadow-lg hover:shadow-[var(--theme-accent-glow)] transition-all cursor-pointer"
              >
                <span>Initiate Engineering Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

