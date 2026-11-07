import React from 'react';
import type { Metadata } from 'next';
import { PublicApiService } from '@/services/public-api.service';
import BlogShowcaseClient, { BlogPostItem } from '@/components/public/blog/BlogShowcaseClient';

export const metadata: Metadata = {
  title: 'Engineering Blog & Insights | MRM InfoTech Ltd.',
  description:
    'Technical articles, software architecture insights, and system design benchmarks published by MRM InfoTech.',
  alternates: {
    canonical: '/blog',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const revalidate = 60;

export default async function BlogPage() {
  const rawPosts = await PublicApiService.getBlogPosts<any>('en');

  const posts: BlogPostItem[] = Array.isArray(rawPosts)
    ? rawPosts
    : Array.isArray(rawPosts?.data)
    ? rawPosts.data
    : [];

  return <BlogShowcaseClient initialPosts={posts} />;
}
