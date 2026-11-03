import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import { getBlogPosts } from '@/lib/api/public';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const posts = await getBlogPosts('en');
  const post = posts.find((p) => p.slug === slug);
  if (!post) {
    return { title: 'Post Not Found | MRM InfoTech' };
  }
  return {
    title: `${post.title} | MRM InfoTech Blog`,
    description: post.summary,
  };
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const posts = await getBlogPosts('en');
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="w-full flex flex-col bg-white dark:bg-[#07162C] transition-colors duration-150">
      <section className="bg-slate-50 dark:bg-[#07162C] text-slate-900 dark:text-white pt-24 pb-20 border-b border-slate-200 dark:border-[#1E3557] transition-colors duration-150">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            {post.category && (
              <span className="px-2.5 py-1 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-[#087FC4] dark:text-[#00C2FF] font-bold">
                {post.category}
              </span>
            )}
            {post.readingTimeMinutes && (
              <div className="flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{post.readingTimeMinutes} min read</span>
              </div>
            )}
            <span>•</span>
            <span>
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-slate-900 dark:text-white">
            {post.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {post.summary}
          </p>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-[#07162C] transition-colors duration-150">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed text-base space-y-6">
            <p>
              In modern distributed systems, data integrity and response latency cannot be
              afterthoughts. In this technical post, MRM InfoTech explores our architectural
              findings while designing high-concurrency systems using NestJS, PostgreSQL connection
              pools, and Next.js server components.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Core Architectural Principles</h2>
            <p>
              When scaling institutional software, the primary bottleneck often originates from
              unindexed database queries and unbounded transaction blocks. By moving validation to
              the edge and structuring entities into strict domain modules, developers avoid cascade
              failure modes.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Summary & Next Steps</h2>
            <p>
              Software architecture is an ongoing discipline of balance—prioritizing developer
              productivity, runtime safety, and cost-efficient cloud scalability.
            </p>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="pt-6 border-t border-slate-200 dark:border-[#1E3557] flex flex-wrap gap-2">
              {post.tags.map((tg, idx) => (
                <span
                  key={idx}
                  className="text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-[#0B1E3B] border border-slate-200 dark:border-[#1E3557] px-3 py-1 rounded-full"
                >
                  #{tg}
                </span>
              ))}
            </div>
          )}

          <div className="pt-6 border-t border-slate-200 dark:border-[#1E3557] flex items-center justify-between">
            <Link
              href="/blog"
              className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-[#087FC4] dark:hover:text-[#00C2FF] transition-colors"
            >
              ← Back to all posts
            </Link>
            <Link
              href="/start-project"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-bold text-white bg-[#0052CC] hover:bg-[#0040A8] transition-colors"
            >
              <span>Discuss System Architecture</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
