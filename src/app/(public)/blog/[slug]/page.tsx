import React from 'react';
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { PublicApiService } from '@/services/public-api.service';
import BlogPostReadingView from '@/components/public/blog/BlogPostReadingView';
import { unwrapList, type ListResponse, type PublicBlogPost } from '@/types/public-content';
import { buildMetadata } from '@/lib/seo';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cleanSlug = decodeURIComponent(slug).trim().replace(/\s+/g, '-').replace(/-+/g, '-');
  const post = await PublicApiService.getBlogPostBySlug<PublicBlogPost | null>(cleanSlug, 'en');

  if (!post) {
    return buildMetadata({ title: 'Post Not Found', description: 'This article could not be found.', path: `/blog/${cleanSlug}`, noIndex: true });
  }

  return buildMetadata({
    title: post.seoTitle || post.title,
    description:
      post.seoDescription ||
      post.excerpt ||
      post.summary ||
      'Technical insights and system design deep-dives from the MRM InfoTech engineering team.',
    path: `/blog/${cleanSlug}`,
    type: 'article',
    publishedTime: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
  });
}

export const revalidate = 60;

export default async function BlogPostDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const rawSlug = decodeURIComponent(slug);
  const cleanSlug = rawSlug.trim().replace(/\s+/g, '-').replace(/-+/g, '-');

  if (rawSlug !== cleanSlug) {
    redirect(`/blog/${cleanSlug}`);
  }

  const [post, allPosts] = await Promise.all([
    PublicApiService.getBlogPostBySlug<PublicBlogPost | null>(cleanSlug, 'en'),
    PublicApiService.getBlogPosts<ListResponse<PublicBlogPost>>('en'),
  ]);

  if (!post) {
    notFound();
  }

  const recentPosts = unwrapList(allPosts)
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return <BlogPostReadingView post={post} recentPosts={recentPosts} />;
}
