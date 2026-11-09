'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { BookOpen, Clock, ArrowRight, Search, Mail, CheckCircle2 } from 'lucide-react';
import GlassEmptyState from '@/components/ui/GlassEmptyState';

export interface BlogPostItem {
  id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  readingMinutes?: number | null;
  isFeatured?: boolean;
  publishedAt?: string | Date | null;
  category?: { id?: string; slug?: string; name?: string } | string | null;
  categoryName?: string | null;
  tags?: Array<{ id?: string; slug?: string; name?: string }>;
}

interface BlogShowcaseClientProps {
  initialPosts: BlogPostItem[];
}

export default function BlogShowcaseClient({ initialPosts }: BlogShowcaseClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [subscriberEmail, setSubscriberEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Extract unique category names
  const categories = useMemo(() => {
    const set = new Set<string>();
    initialPosts.forEach((p) => {
      const cat =
        typeof p.category === 'string'
          ? p.category
          : p.category?.name || p.categoryName;
      if (cat) set.add(cat);
    });
    return ['all', ...Array.from(set)];
  }, [initialPosts]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const catName =
        typeof post.category === 'string'
          ? post.category
          : post.category?.name || post.categoryName;

      const catMatch =
        selectedCategory === 'all' ||
        (catName && catName.toLowerCase() === selectedCategory.toLowerCase());

      const query = searchQuery.trim().toLowerCase();
      const searchMatch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt?.toLowerCase().includes(query) ||
        post.tags?.some((t) => t.name?.toLowerCase().includes(query) || t.slug?.toLowerCase().includes(query));

      return catMatch && searchMatch;
    });
  }, [initialPosts, selectedCategory, searchQuery]);

  // Featured spotlight post
  const featuredPost = useMemo(() => {
    return filteredPosts.find((p) => p.isFeatured) || filteredPosts[0];
  }, [filteredPosts]);

  const regularPosts = useMemo(() => {
    if (!featuredPost) return filteredPosts;
    return filteredPosts.filter((p) => p.slug !== featuredPost.slug);
  }, [filteredPosts, featuredPost]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscriberEmail.trim()) return;
    setIsSubscribed(true);
  };

  return (
    <div className="w-full flex flex-col bg-[var(--theme-bg-canvas)] text-[var(--theme-text-primary)] transition-colors duration-200">
      {/* ──────────────────────── Top Editorial Hero ──────────────────────── */}
      <section className="relative pt-24 pb-16 border-b border-[var(--theme-border-glass)] overflow-hidden">
        {/* Ambient Gradient Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[var(--theme-accent)]/10 blur-[130px] rounded-full"
        />

        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full clear-glass-pill text-xs font-bold text-[var(--theme-accent)] tracking-widest uppercase border border-[var(--theme-accent)]/30 bg-[var(--theme-accent)]/10">
              <BookOpen className="w-3.5 h-3.5" />
              <span>ENGINEERING INSIGHTS &amp; SYSTEM DESIGN</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12]">
              Architectural Insights.{' '}
              <span className="font-serif italic font-normal text-[var(--theme-accent)] neon-text-glow">
                Technical Benchmarks.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[var(--theme-text-secondary)] leading-relaxed">
              In-depth articles on multi-tenant SaaS architecture, Next.js performance tuning, high-throughput PostgreSQL
              query optimization, and zero-trust cybersecurity by the MRM InfoTech engineering team.
            </p>
          </div>

          {/* Search & Category Filter Bar */}
          <div className="mt-12 pt-8 border-t border-[var(--theme-border-glass)] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                const label = cat === 'all' ? 'All Publications' : cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-[var(--theme-accent)] text-[var(--theme-accent-text)] shadow-md shadow-[var(--theme-accent-glow)]'
                        : 'bg-[var(--theme-bg-surface)] text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] border border-[var(--theme-border-glass)]'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[260px] md:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--theme-text-muted)] pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, architecture..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] text-xs text-[var(--theme-text-primary)] placeholder-[var(--theme-text-muted)] focus:outline-hidden focus:border-[var(--theme-accent)] transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)]"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────── Main Articles Area ──────────────────────── */}
      <section className="py-16 md:py-24 bg-[var(--theme-bg-surface)]/20 transition-colors duration-200">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {filteredPosts.length === 0 ? (
            <GlassEmptyState
              badge="Insights Filter"
              title="No Articles Found"
              description="No articles matched your selected filters. Please try another keyword or select All Publications."
              adminHref="/admin/dashboard/blog"
              adminLabel="Write in CMS"
              publicHref="/blog"
              publicLabel="All Articles"
            />
          ) : (
            <>
              {/* ──────────────── Featured Article Spotlight ──────────────── */}
              {featuredPost && (
                <div className="relative rounded-3xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] hover:border-[var(--theme-accent)]/50 shadow-2xl overflow-hidden transition-all duration-300 group">
                  <div className="p-8 sm:p-12 space-y-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[var(--theme-accent)] text-[var(--theme-accent-text)]">
                        Featured Publication
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-[var(--theme-text-muted)] font-medium">
                        <Clock className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                        <span>{featuredPost.readingMinutes || 6} min read</span>
                      </div>
                      <span className="text-[var(--theme-text-muted)]">&bull;</span>
                      <span className="text-xs text-[var(--theme-text-muted)] font-mono">
                        {featuredPost.publishedAt
                          ? new Date(featuredPost.publishedAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })
                          : 'Recent'}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-4xl font-black text-[var(--theme-text-primary)] tracking-tight group-hover:text-[var(--theme-accent)] transition-colors leading-tight max-w-4xl">
                      <Link href={`/blog/${featuredPost.slug}`}>
                        {featuredPost.title}
                      </Link>
                    </h2>

                    {featuredPost.excerpt && (
                      <p className="text-sm sm:text-base text-[var(--theme-text-secondary)] leading-relaxed max-w-3xl">
                        {featuredPost.excerpt}
                      </p>
                    )}

                    <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[var(--theme-accent)]/20 text-[var(--theme-accent)] flex items-center justify-center font-bold text-xs">
                          M
                        </div>
                        <span className="text-xs font-semibold text-[var(--theme-text-primary)]">
                          MRM Engineering Group
                        </span>
                      </div>

                      <Link
                        href={`/blog/${featuredPost.slug}`}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs bg-[var(--theme-accent)] text-[var(--theme-accent-text)] hover:shadow-lg hover:shadow-[var(--theme-accent-glow)] transition-all cursor-pointer"
                      >
                        <span>Read Full Deep-Dive</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* ──────────────── Regular Articles Grid ──────────────── */}
              {regularPosts.length > 0 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-[var(--theme-text-primary)] tracking-tight">
                    Latest Technical Insights ({filteredPosts.length})
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {regularPosts.map((post) => (
                      <div
                        key={post.slug}
                        className="p-7 rounded-3xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] hover:border-[var(--theme-accent)]/50 shadow-xl transition-all duration-200 flex flex-col justify-between group"
                      >
                        <div className="space-y-4">
                          <div className="flex items-center justify-between gap-2">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] border border-[var(--theme-accent)]/30">
                              Technical Article
                            </span>
                            <div className="flex items-center gap-1 text-[11px] text-[var(--theme-text-muted)] font-mono">
                              <Clock className="w-3 h-3 text-[var(--theme-accent)]" />
                              <span>{post.readingMinutes || 5}m read</span>
                            </div>
                          </div>

                          <div>
                            <h4 className="text-lg font-black text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition-colors leading-snug">
                              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                            </h4>
                            {post.excerpt && (
                              <p className="text-xs text-[var(--theme-text-secondary)] mt-2 leading-relaxed line-clamp-3">
                                {post.excerpt}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="pt-5 mt-6 border-t border-[var(--theme-border-glass)] flex items-center justify-between">
                          <span className="text-[11px] text-[var(--theme-text-muted)] font-mono">
                            {post.publishedAt
                              ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                })
                              : 'Published'}
                          </span>

                          <Link
                            href={`/blog/${post.slug}`}
                            className="text-xs font-bold text-[var(--theme-accent)] inline-flex items-center gap-1 hover:gap-2 transition-all cursor-pointer"
                          >
                            <span>Read Article</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* ──────────────── Tech Bulletin Newsletter Box ──────────────── */}
          <div className="rounded-3xl bg-linear-to-br from-[var(--theme-bg-surface)] to-[var(--theme-bg-canvas)] border border-[var(--theme-border-glass)] p-8 sm:p-12 relative overflow-hidden">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-10 -right-10 w-80 h-80 bg-[var(--theme-accent)]/15 rounded-full blur-[100px]"
            />

            <div className="max-w-2xl mx-auto text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-[var(--theme-accent)] bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/30">
                <Mail className="w-3.5 h-3.5" />
                <span>MRM ENGINEERING BULLETIN</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-[var(--theme-text-primary)] tracking-tight">
                Get Architecture Breakdowns Directly in Your Inbox
              </h3>

              <p className="text-xs sm:text-sm text-[var(--theme-text-secondary)] leading-relaxed">
                Zero spam. Only high-caliber architectural case studies, performance benchmarks, and SaaS system engineering lessons.
              </p>

              {isSubscribed ? (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Thank you! You are now subscribed to MRM Engineering Insights.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="pt-2 flex flex-col sm:flex-row items-center gap-2 max-w-md mx-auto">
                  <input
                    type="email"
                    required
                    value={subscriberEmail}
                    onChange={(e) => setSubscriberEmail(e.target.value)}
                    placeholder="engineer@company.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--theme-bg-surface)] border border-[var(--theme-border-glass)] text-xs text-[var(--theme-text-primary)] placeholder-[var(--theme-text-muted)] focus:outline-hidden focus:border-[var(--theme-accent)] transition-colors"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto shrink-0 px-6 py-2.5 rounded-xl font-bold text-xs bg-[var(--theme-accent)] text-[var(--theme-accent-text)] hover:shadow-lg hover:shadow-[var(--theme-accent-glow)] transition-all cursor-pointer"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
