'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import type { BlogPost } from '@/lib/api/types';

interface LatestBlogProps {
  posts?: BlogPost[];
}

export function LatestBlog({ posts }: LatestBlogProps) {
  const defaultPosts = [
    {
      slug: 'architecting-high-concurrency-nestjs-systems',
      title: 'Architecting High-Concurrency Systems: NestJS & PostgreSQL in Production',
      category: 'Software Architecture',
      date: 'May 12, 2026',
      readTime: '6 min read',
      excerpt:
        'A technical deep-dive into database connection pooling, Redis caching, and transaction isolation levels for mission-critical SaaS.',
    },
    {
      slug: 'the-future-of-school-automation-bangladesh',
      title: 'The Future of Educational Management: Beyond Basic Spreadsheets',
      category: 'EdTech & SaaS',
      date: 'April 28, 2026',
      readTime: '4 min read',
      excerpt:
        'How modern cloud ERP systems like EduManage BD empower institutional leadership with automated fee collection and instant analytics.',
    },
    {
      slug: 'modern-nextjs-app-router-best-practices',
      title: 'Next.js 16 App Router: Building Fast, Accessible Corporate Interfaces',
      category: 'Frontend Engineering',
      date: 'April 15, 2026',
      readTime: '5 min read',
      excerpt:
        'Key architectural patterns for combining Server Components, streaming SSR, and zero-hydration-mismatch corporate web design.',
    },
  ];

  const list = posts && posts.length >= 3 ? posts.slice(0, 3).map((p, idx) => ({
    ...defaultPosts[idx],
    slug: p.slug,
    title: p.title,
    excerpt: p.summary || defaultPosts[idx].excerpt,
  })) : defaultPosts;

  return (
    <section className="py-20 bg-white dark:bg-[#07162C] border-b border-[#E3EAF2] dark:border-[#1E3557] transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4F8FC] dark:bg-[#0B1E3B] border border-[#E3EAF2] dark:border-[#1E3557] text-xs font-bold text-[#087FC4] dark:text-[#20B8D5] mb-3">
              <span>THOUGHT LEADERSHIP</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#071A35] dark:text-white tracking-tight">
              Insights, Ideas & Updates
            </h2>
            <p className="mt-3 text-base text-[#66758A] dark:text-slate-300">
              Articles and perspectives on full-stack architecture, SaaS growth, and enterprise digital transformation.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#087FC4] dark:text-[#20B8D5] hover:text-[#103B68] dark:hover:text-white group self-start md:self-end transition-colors"
          >
            <span>Explore All Articles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {list.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col justify-between p-7 rounded-2xl bg-[#F4F8FC] dark:bg-[#0A1F3F] border border-[#E3EAF2] dark:border-[#1E3557] hover:bg-white dark:hover:bg-[#0F2748] hover:border-[#087FC4]/40 dark:hover:border-[#20B8D5]/40 hover:shadow-lg transition-all group"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-[#66758A] dark:text-slate-400 mb-3">
                  <span className="font-bold text-[#087FC4] dark:text-[#20B8D5] px-2 py-0.5 rounded bg-white dark:bg-[#07162C] border border-[#E3EAF2] dark:border-[#1E3557]">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#071A35] dark:text-white group-hover:text-[#087FC4] dark:group-hover:text-[#20B8D5] transition-colors leading-snug mb-3">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>

                <p className="text-xs text-[#66758A] dark:text-slate-400 leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E3EAF2] dark:border-[#1E3557] flex items-center justify-between text-xs">
                <span className="text-[#66758A] dark:text-slate-400">{post.date}</span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="font-bold text-[#087FC4] dark:text-[#20B8D5] hover:underline flex items-center gap-1 transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
