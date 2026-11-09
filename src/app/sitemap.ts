import type { MetadataRoute } from 'next';
import { PublicApiService } from '@/services/public-api.service';

export const revalidate = 3600;

type Freq = 'daily' | 'weekly' | 'monthly';

type Entry = { path: string; priority: number; changeFrequency: Freq; lastModified?: Date };

const STATIC_ROUTES: Entry[] = [
  { path: '', priority: 1.0, changeFrequency: 'daily' },
  { path: '/products', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/services', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/projects', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/blog', priority: 0.85, changeFrequency: 'daily' },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/team', priority: 0.75, changeFrequency: 'monthly' },
  { path: '/careers', priority: 0.75, changeFrequency: 'weekly' },
  { path: '/contact', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/start-project', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/security', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/privacy-policy', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/terms', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/cookie-policy', priority: 0.5, changeFrequency: 'monthly' },
];

/** Accepts a bare array or the API's `{ data: [...] }` envelope. */
function unwrap(raw: unknown): Array<{ slug?: string; publishedAt?: string; updatedAt?: string }> {
  if (Array.isArray(raw)) return raw;
  const data = (raw as { data?: unknown } | null)?.data;
  return Array.isArray(data) ? data : [];
}

async function dynamicPaths(
  load: () => Promise<unknown>,
  prefix: string,
  priority: number,
): Promise<Entry[]> {
  try {
    return unwrap(await load())
      .filter((item) => typeof item.slug === 'string' && item.slug)
      .map((item) => {
        const stamp = item.updatedAt || item.publishedAt;
        return {
          path: `${prefix}/${item.slug}`,
          priority,
          changeFrequency: 'monthly' as const,
          lastModified: stamp ? new Date(stamp) : undefined,
        };
      });
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://mrminfotech.com').replace(/\/$/, '');

  const [projects, services, products, posts] = await Promise.all([
    dynamicPaths(() => PublicApiService.getProjects('en'), '/projects', 0.8),
    dynamicPaths(() => PublicApiService.getServices({ placement: 'catalog' }), '/services', 0.85),
    dynamicPaths(() => PublicApiService.getProducts(), '/products', 0.85),
    dynamicPaths(() => PublicApiService.getBlogPosts('en'), '/blog', 0.7),
  ]);

  const now = new Date();
  const entries: Entry[] = [...STATIC_ROUTES, ...services, ...products, ...projects, ...posts];
  return entries.map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified: r.lastModified && !Number.isNaN(r.lastModified.getTime()) ? r.lastModified : now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
