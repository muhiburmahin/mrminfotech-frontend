import React from 'react';
import type { Metadata } from 'next';
import { PublicApiService } from '@/services/public-api.service';
import BlogShowcaseClient, { BlogPostItem } from '@/components/public/blog/BlogShowcaseClient';
import { unwrapList, type ListResponse } from '@/types/public-content';

export const metadata: Metadata = {
  title: 'Engineering Blog & Insights | MRM InfoTech',
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
  const rawPosts = await PublicApiService.getBlogPosts<ListResponse<BlogPostItem>>('en');

  const posts: BlogPostItem[] = unwrapList(rawPosts);

  return <BlogShowcaseClient initialPosts={posts} />;
}
