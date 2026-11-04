'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, FileText } from 'lucide-react';
import GlassEmptyState from '@/components/ui/GlassEmptyState';

interface BlogPostData {
  slug: string;
  title: string;
  summary?: string;
  excerpt?: string;
  category?: string;
  categoryName?: string;
  readTimeMinutes?: number;
  publishedAt?: string;
}

interface LatestBlogProps {
  posts?: BlogPostData[];
}

export function LatestBlog({ posts }: LatestBlogProps) {
  const hasPosts = Boolean(posts && posts.length > 0);

  return (
    <section className="py-20 bg-white dark:bg-[#07162C] border-b border-[#E3EAF2] dark:border-[#1E3557] transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4F8FC] dark:bg-[#0B1E3B] border border-[#E3EAF2] dark:border-[#1E3557] text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] mb-3">
              <FileText className="w-3.5 h-3.5" />
              <span>INSIGHTS & ENGINEERING</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#15243A] dark:text-white tracking-tight">
              Technical Blog & Architecture Notes
            </h2>
            <p className="mt-3 text-base text-[#66758A] dark:text-slate-300">
              Read insights on distributed microservices, scalable database indexing, and modern web application patterns.
            </p>
          </div>

          {hasPosts && (
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#087FC4] dark:text-[#20B8D5] hover:gap-3 transition-all"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {hasPosts ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts!.slice(0, 3).map((item) => {
              const slug = item.slug || '';
              const title = item.title || 'Technical Article';
              const category = item.category || item.categoryName || 'Engineering';
              const summary = item.summary || item.excerpt || '';
              const readTime = item.readTimeMinutes ? `${item.readTimeMinutes} min read` : '5 min read';
              const date = item.publishedAt
                ? new Date(item.publishedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : 'Recently Published';

              return (
                <div
                  key={slug}
                  className="liquid-glass-card rounded-2xl p-7 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#087FC4]/10 dark:bg-[#20B8D5]/15 text-[#087FC4] dark:text-[#20B8D5]">
                        {category}
                      </span>
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{readTime}</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-black text-[#15243A] dark:text-white group-hover:text-[#087FC4] dark:group-hover:text-[#20B8D5] transition-colors leading-snug">
                        {title}
                      </h3>
                      {summary && (
                        <p className="mt-2 text-xs sm:text-sm text-[#66758A] dark:text-slate-300 leading-relaxed line-clamp-3">
                          {summary}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 dark:border-[#1E3557]/60 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">{date}</span>
                    <Link
                      href={`/blog/${slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] group-hover:gap-2.5 transition-all"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <GlassEmptyState
            badge="Engineering Notes"
            title="No Insights Published Yet"
            description="Our engineering team publishes technical deep-dives into microservices, Next.js architecture, and distributed databases. Check back soon for new articles."
            adminHref="/admin/dashboard/blog"
            adminLabel="Write First Article in Admin CMS"
            publicHref="/contact"
            publicLabel="Subscribe for Technology Updates"
          />
        )}
      </div>
    </section>
  );
}
