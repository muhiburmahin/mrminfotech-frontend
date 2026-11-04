import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, ArrowRight, ArrowLeft } from 'lucide-react';
import { PublicApiService } from '@/services/public-api.service';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await PublicApiService.getBlogPostBySlug(slug, 'en');
  if (!post) {
    return { title: 'Post Not Found | MRM InfoTech' };
  }
  return {
    title: `${post.title} | MRM InfoTech Blog`,
    description: post.summary || post.excerpt,
  };
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await PublicApiService.getBlogPostBySlug(slug, 'en');

  if (!post) {
    notFound();
  }

  const title = post.title || 'Technical Article';
  const category = post.category || post.categoryName || 'Software Architecture';
  const readTime = post.readingTimeMinutes || post.readTimeMinutes || 5;
  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recently Published';

  const body = post.content || post.body || post.summary || '';

  return (
    <div className="w-full flex flex-col bg-white dark:bg-[#07162C] transition-colors duration-150">
      <section className="bg-slate-50 dark:bg-[#07162C] text-slate-900 dark:text-white pt-24 pb-20 border-b border-slate-200 dark:border-[#1E3557] transition-colors duration-150">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-[#087FC4] dark:hover:text-[#20B8D5] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Insights</span>
          </Link>

          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-[#087FC4] dark:text-[#20B8D5] font-bold">
              {category}
            </span>
            <div className="flex items-center gap-1 font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span>{readTime} min read</span>
            </div>
            <span>&bull;</span>
            <span>{publishedDate}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-slate-900 dark:text-white">
            {title}
          </h1>
          {post.summary && (
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {post.summary}
            </p>
          )}
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-[#07162C] transition-colors duration-150">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="liquid-glass-card rounded-2xl p-8 sm:p-10">
            <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {body}
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 dark:border-[#1E3557] flex items-center justify-between">
            <Link
              href="/blog"
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white"
            >
              &larr; All Articles
            </Link>
            <Link
              href="/start-project"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-[#0052CC] hover:bg-[#0040A8] transition-colors text-xs"
            >
              <span>Discuss Engineering Solutions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
