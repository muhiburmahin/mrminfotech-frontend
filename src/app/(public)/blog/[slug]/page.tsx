import React from 'react';
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import {
  Clock,
  ArrowLeft,
  ArrowRight,
  Share2,
  Calendar,
  Sparkles,
  BookOpen,
  User,
  CheckCircle2,
} from 'lucide-react';
import { PublicApiService } from '@/services/public-api.service';
import BlogPostReadingView from '@/components/public/blog/BlogPostReadingView';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cleanSlug = decodeURIComponent(slug).trim().replace(/\s+/g, '-').replace(/-+/g, '-');
  const post: any = await PublicApiService.getBlogPostBySlug(cleanSlug, 'en');

  if (!post) {
    return { title: 'Post Not Found | MRM InfoTech' };
  }

  const title = post.seoTitle || `${post.title} | MRM InfoTech Insights`;
  const description =
    post.seoDescription ||
    post.excerpt ||
    post.summary ||
    'Read this technical publication and system design deep-dive by MRM InfoTech.';

  return {
    title,
    description: description.slice(0, 160),
    alternates: {
      canonical: `/blog/${cleanSlug}`,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.publishedAt,
    },
  };
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
    PublicApiService.getBlogPostBySlug<any>(cleanSlug, 'en'),
    PublicApiService.getBlogPosts<any>('en'),
  ]);

  if (!post) {
    notFound();
  }

  const recentPosts = (Array.isArray(allPosts) ? allPosts : Array.isArray(allPosts?.data) ? allPosts.data : [])
    .filter((p: any) => p.slug !== post.slug)
    .slice(0, 3);

  return <BlogPostReadingView post={post} recentPosts={recentPosts} />;
}
