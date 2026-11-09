import React from 'react';
import type { Metadata } from 'next';
import { PublicApiService } from '@/services/public-api.service';
import BlogShowcaseClient, { BlogPostItem } from '@/components/public/blog/BlogShowcaseClient';
import { unwrapList, type ListResponse } from '@/types/public-content';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: "Engineering Blog & Insights",
  description:
    "Technical articles on software architecture, cloud infrastructure and product engineering from the MRM InfoTech team.",
  path: "/blog",
});

export const revalidate = 60;

export default async function BlogPage() {
  const rawPosts = await PublicApiService.getBlogPosts<ListResponse<BlogPostItem>>('en');

  const posts: BlogPostItem[] = unwrapList(rawPosts);

  return <BlogShowcaseClient initialPosts={posts} />;
}
